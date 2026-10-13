/**
 * TokenDiet - Core Minifier & Token Estimation Logic
 * Client-Side regex-based semantic minification for LLM prompts.
 */

export type SupportedLanguage = 'auto' | 'javascript' | 'python' | 'json' | 'html';

export interface MinifyOptions {
  language: SupportedLanguage;
  removeComments: boolean;
  collapseWhitespace: boolean;
  removeBlankLines: boolean;
  preservePythonIndent: boolean;
}

export interface MinifyStats {
  originalChars: number;
  minifiedChars: number;
  originalTokens: number;
  minifiedTokens: number;
  tokensSaved: number;
  reductionPercentage: number;
  savedDollars: number; // Based on $5 per 1M tokens ($0.000005/token)
}

/**
 * Standard Token Estimation:
 * 1 token ~= 4 characters for English and code text.
 */
export function estimateTokens(text: string): number {
  if (!text || text.length === 0) return 0;
  return Math.max(1, Math.ceil(text.length / 4));
}

/**
 * Auto-detect programming language based on content hints.
 */
export function detectLanguage(code: string): SupportedLanguage {
  const trimmed = code.trim();
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try {
      JSON.parse(trimmed);
      return 'json';
    } catch {
      // not strict json
    }
  }
  if (/<!DOCTYPE\s+html|<html|<div|<head|<body/i.test(trimmed)) {
    return 'html';
  }
  if (/(def\s+\w+\(|import\s+sys|import\s+os|elif\s|:\s*$|#!\/usr\/bin\/env python)/m.test(trimmed)) {
    return 'python';
  }
  if (/(const\s+\w+|let\s+\w+|function\s+\w+|import\s+.*from|export\s+|=>|\bconsole\.log)/m.test(trimmed)) {
    return 'javascript';
  }
  return 'auto';
}

/**
 * Safely removes comments from JavaScript/TypeScript/C-style code
 * preserving string literals and template literals.
 */
function removeJsComments(code: string): string {
  // Matches strings ('...', "...", `...`) in group 1, or comments (//..., /*...*/) in group 3
  const regex = /((["'])(?:\\.|(?!\2)[^\\\r\n])*\2|`(?:\\.|[^`\\])*`)|(\/\*[\s\S]*?\*\/|\/\/[^\r\n]*)/g;
  return code.replace(regex, (match, stringLiteral, _quote, comment) => {
    if (stringLiteral) return stringLiteral;
    if (comment) {
      // If it's a multiline block comment that spans newlines, keep a single newline if needed
      return '';
    }
    return match;
  });
}

/**
 * Safely removes comments from Python code
 * preserving string literals and multiline docstrings.
 */
function removePythonComments(code: string): string {
  const regex = /(("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'))|(#.*$)/gm;
  return code.replace(regex, (match, stringLiteral, _quote, comment) => {
    if (stringLiteral) return stringLiteral;
    if (comment) return '';
    return match;
  });
}

/**
 * Safely removes comments from HTML/XML.
 */
function removeHtmlComments(code: string): string {
  return code.replace(/<!--[\s\S]*?-->/g, '');
}

/**
 * Universal comment stripper for unknown code (handles //, /* *\/, <!-- -->, #)
 * while protecting quotes.
 */
function removeUniversalComments(code: string): string {
  // Protect strings first
  const regex = /((["'])(?:\\.|(?!\2)[^\\\r\n])*\2|`(?:\\.|[^`\\])*`)|(\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->|\/\/[^\r\n]*|#[^\r\n]*)/g;
  return code.replace(regex, (match, stringLiteral, _quote, comment) => {
    if (stringLiteral) return stringLiteral;
    if (comment) return '';
    return match;
  });
}

/**
 * Main minifier entry point.
 */
export function minifyCode(
  source: string,
  options: MinifyOptions = {
    language: 'auto',
    removeComments: true,
    collapseWhitespace: true,
    removeBlankLines: true,
    preservePythonIndent: true,
  }
): string {
  if (!source || source.trim().length === 0) {
    return '';
  }

  let code = source;
  const detectedLang = options.language === 'auto' ? detectLanguage(code) : options.language;

  // 1. JSON optimization shortcut if requested and valid
  if (detectedLang === 'json') {
    try {
      // If JSON has comments, clean comments first
      const cleaned = options.removeComments ? removeJsComments(code) : code;
      const parsed = JSON.parse(cleaned);
      return JSON.stringify(parsed);
    } catch {
      // If invalid JSON, proceed with general minification
    }
  }

  // 2. Remove comments
  if (options.removeComments) {
    switch (detectedLang) {
      case 'javascript':
        code = removeJsComments(code);
        break;
      case 'python':
        code = removePythonComments(code);
        break;
      case 'html':
        code = removeHtmlComments(code);
        break;
      default:
        code = removeUniversalComments(code);
        break;
    }
  }

  // 3. Process lines for whitespace & indentation
  const lines = code.split(/\r?\n/);
  const processedLines: string[] = [];

  for (let line of lines) {
    // If preserving Python indentation, don't strip leading spaces in python mode
    if (detectedLang === 'python' && options.preservePythonIndent) {
      // Trim right only, collapse internal consecutive spaces
      line = line.trimEnd();
      if (options.collapseWhitespace) {
        // preserve leading indentation, collapse rest
        const indentMatch = line.match(/^(\s*)/);
        const indent = indentMatch ? indentMatch[1] : '';
        const rest = line.slice(indent.length).replace(/[ \t]{2,}/g, ' ');
        line = indent + rest;
      }
    } else {
      if (options.collapseWhitespace) {
        // Trim both ends and collapse multiple spaces/tabs into single space
        line = line.trim().replace(/[ \t]{2,}/g, ' ');
      } else {
        line = line.trimEnd();
      }
    }

    if (options.removeBlankLines) {
      if (line.trim().length > 0) {
        processedLines.push(line);
      }
    } else {
      processedLines.push(line);
    }
  }

  let result = processedLines.join('\n');

  // Additional HTML tag whitespace reduction
  if (detectedLang === 'html' && options.collapseWhitespace) {
    result = result.replace(/>\s+</g, '><');
  }

  return result;
}

/**
 * Calculates metrics comparing original code with minified code.
 */
export function calculateStats(original: string, minified: string): MinifyStats {
  const originalChars = original.length;
  const minifiedChars = minified.length;
  const originalTokens = estimateTokens(original);
  const minifiedTokens = originalChars > 0 ? estimateTokens(minified) : 0;
  
  const tokensSaved = Math.max(0, originalTokens - minifiedTokens);
  const reductionPercentage = originalTokens > 0 
    ? Math.round((tokensSaved / originalTokens) * 1000) / 10 
    : 0;

  // Calculation reference: $5.00 per 1,000,000 tokens ($0.000005 per token)
  const COST_PER_TOKEN = 5 / 1000000;
  const savedDollars = Number((tokensSaved * COST_PER_TOKEN).toFixed(6));

  return {
    originalChars,
    minifiedChars,
    originalTokens,
    minifiedTokens,
    tokensSaved,
    reductionPercentage,
    savedDollars,
  };
}
