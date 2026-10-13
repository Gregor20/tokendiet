<div align="center">

# ⚡ TokenDiet
### *Reduce tus facturas de API de IA y optimiza tu ventana de contexto minificando código al instante.*

[![Buy Me A Coffee](https://img.shields.io/badge/☕_Buy_Me_A_Coffee-gregor20-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/gregor20)
[![GitHub](https://img.shields.io/badge/GitHub-Gregor20-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Gregor20)
[![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Privacy First](https://img.shields.io/badge/100%25_Client--Side-Zero_Telemetry-10B981?style=for-the-badge&logo=shield&logoColor=white)](#-privacidad-100-local)

<p align="center">
  <b>Una herramienta web ultrarrápida que elimina el "impuesto invisible de tokens" en ChatGPT, Claude, Gemini y Cursor sin romper la semántica de tu código.</b>
</p>

[**Probar TokenDiet en Vivo**](http://localhost:4321/) • [**Reportar Bug**](https://github.com/Gregor20/tokendiet/issues) • [**Apoyar al Creador ☕**](https://buymeacoffee.com/gregor20)

---

</div>

## 💸 El Problema: El "Impuesto Invisible" de los LLMs

Cuando pegas código en herramientas como **ChatGPT**, **Claude 3.5 Sonnet**, **Gemini 1.5 Pro** o lo pasas a través de APIs automatizadas, estás pagando por cada carácter:

- ❌ Espacios en blanco repetitivos y tabulaciones profundas.
- ❌ Comentarios explicativos y docstrings obsoletos.
- ❌ Saltos de línea innecesarios.

Los modelos frontier cobran entre **$3.00 y $15.00+ por cada millón de tokens** en prompts. En proyectos reales con cientos de peticiones o contextos largos, entre el **30% y el 50% de ese coste son espacios vacíos y comentarios**.

Además, **agotas tu ventana de contexto útil**, provocando que el modelo "olvide" instrucciones previas.

---

## 🥗 La Solución: TokenDiet

**TokenDiet** es un optimizador semántico inteligente que procesa tu código en tiempo real antes de enviarlo a un LLM:

| Métrica | Antes (Código Crudo) | Después (TokenDiet) | Impacto |
| :--- | :--- | :--- | :--- |
| **Tokens Consumidos** | ~850 tokens | ~480 tokens | **-43% de reducción** 📉 |
| **Coste estimado (x10k reqs)** | $42.50 | $24.00 | **$18.50 ahorrados** 💰 |
| **Espacio de Contexto** | 45% saturado | 25% saturado | **Más memoria para razonamiento** 🧠 |

### ✨ Ejemplo Visual

```javascript
// CÓDIGO ORIGINAL (Espacios, comentarios y saltos)
function calculateDiscount(price, user) {
    // Si el usuario es VIP, aplica 20%
    if (user.isVIP) {
        return price * 0.80;
    }
    return price;
}
```

```javascript
// CON TOKENDIET (Idéntico para la IA, 50% menos tokens)
function calculateDiscount(price,user){if(user.isVIP){return price*0.8;}return price;}
```

---

## 🚀 Características Principales

- ⚡ **Minificación Inteligente Multi-Lenguaje**:
  - **JavaScript / TypeScript**: Limpieza de comentarios `//`, `/* */`, colapso de espaciado y bloques.
  - **Python**: Limpieza respetando la **indentación sintáctica obligatoria** (`preservePythonIndent`).
  - **JSON**: Compactación sin alterar strings ni claves.
  - **HTML**: Eliminación de comentarios y espacios entre tags.
- 📊 **Dashboard de Métricas en Vivo**: Muestra tokens originales, tokens optimizados, porcentaje de ahorro y proyección en dólares ahorrados.
- 🎯 **Detección Automática**: Identifica el lenguaje de programación al escribir o pegar.
- 📋 **Acciones en 1 Clic**: Botón de pegado directo, botón de ejemplo y copiado al portapapeles con feedback instantáneo.
- 🛡️ **Privacidad Absoluta (Zero Telemetry)**: **100% en tu navegador**. Ningún carácter sale jamás de tu equipo. Ideal para código propietario o sensible de empresas.

---

## 🔒 Privacidad 100% Local (Client-Side)

> [!IMPORTANT]
> **TokenDiet no tiene backend, bases de datos ni analíticas invasivas.**  
> Todo el proceso de análisis regex y minificación se ejecuta mediante Vanilla JavaScript y Web APIs en el hilo de ejecución de tu propio navegador. Puedes usarlo en modo avión o sin conexión una vez cargada la web.

---

## ☕ ¿Te Ahorró Tiempo o Dinero? ¡Invítame a un Café!

Si **TokenDiet** te ha ayudado a:
- Reducir tu factura de OpenAI, Anthropic o Google AI.
- Meter ese archivo extra en el contexto de Claude o Cursor.
- Ahorrar tiempo en tu flujo de trabajo diario de desarrollo.

Considera dejar una pequeña propina para apoyar el mantenimiento, alojamiento y desarrollo de nuevas funciones:

<div align="center">

[![Buy Me A Coffee](https://img.shields.io/badge/☕_Invítame_a_un_Café-Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/gregor20)

👉 **[buymeacoffee.com/gregor20](https://buymeacoffee.com/gregor20)** 👈

*¡Cualquier apoyo es enormemente agradecido y ayuda a mantener la herramienta 100% gratuita y sin anuncios molestos!*

</div>

---

## 🎁 Créditos de Cloud para Desarrolladores

Si necesitas desplegar tus propios modelos, APIs o bots de IA en infraestructura en la nube, puedes aprovechar esta promoción especial de patrocinio:

🚀 **[$200 en Créditos Gratuitos en DigitalOcean](https://m.do.co/c/51fb82b44217)**  
*Obtén $200 de saldo para crear Droplets, bases de datos gestionadas o clústeres Kubernetes para tus proyectos.*

---

## 🛠️ Tecnologías Utilizadas

- **Framework**: [Astro 5](https://astro.build/) (Static Site Generation ultra ligero)
- **Estilos**: [Tailwind CSS 3](https://tailwindcss.com/) (Tema Dark Mode con estética Emerald/Zinc)
- **Lógica**: TypeScript puro (Algoritmos semánticos basados en expresiones regulares optimizadas)
- **Despliegue**: [Vercel](https://vercel.com/) Edge Network

---

## 💻 Desarrollo Local

Para correr este proyecto en tu propia máquina:

```bash
# 1. Clonar el repositorio
git clone https://github.com/Gregor20/tokendiet.git

# 2. Entrar en la carpeta
cd tokendiet

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321) en tu navegador para ver la aplicación funcionando.

Para compilar la versión de producción:

```bash
npm run build
```

---

## 🗺️ Roadmap de Próximas Mejoras

- [ ] Soporte para código SQL, Rust y Go.
- [ ] Subida y procesamiento por lotes (Batch processing de múltiples archivos `.zip`).
- [ ] Extensión oficial para VS Code y Chrome.
- [ ] Exportación directa con formato Markdown optimizado para prompts de sistema.

---

## 👤 Autor

Creado con dedicación por **Gregor20**:
- 🐙 GitHub: [@Gregor20](https://github.com/Gregor20)
- ☕ Buy Me A Coffee: [buymeacoffee.com/gregor20](https://buymeacoffee.com/gregor20)

---

## 📄 Licencia

Este proyecto está bajo la Licencia [MIT](LICENSE). Siéntete libre de usarlo, bifurcarlo o contribuir.
