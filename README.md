# Rutina Interactiva de Espalda 🧘‍♀️

Una aplicación web ligera y orientada al rendimiento, diseñada específicamente para ayudar a aliviar y prevenir dolores de espalda. Este proyecto nació como una herramienta personalizada para mi esposa, adaptando sus rutinas de ejercicios y descansos a su ciclo laboral específico (3 días de turno, 1 día libre).

🔗 **[Ver Demo en Vivo (GitHub Pages)](https://xiscob.github.io/ejercicios-espalda-guiados/)** 

## 💡 Motivación y Contexto

A veces, las mejores soluciones no requieren infraestructuras complejas. Este proyecto busca resolver un problema real del día a día (mejorar la adherencia a una rutina de salud y fisioterapia) de la manera más rápida, accesible y libre de fricciones posible. 

La aplicación fue desarrollada buscando el pragmatismo: ofrecer una herramienta útil, sin distracciones, que funcionara inmediatamente desde cualquier dispositivo móvil sin tiempos de carga prolongados.

## 🛠️ Stack Tecnológico

* **Frontend:** HTML5 semántico, CSS3 moderno, Vanilla JavaScript (ES6+).
* **Gráficos:** [Chart.js](https://www.chartjs.org/) para la visualización del progreso.
* **Optimización Media:** [lite-youtube-embed](https://github.com/paulirish/lite-youtube-embed) para la carga ultra-eficiente de tutoriales en vídeo.
* **Zero Build-Step:** Sin configuraciones de Webpack, Vite, Node.js ni frameworks reactivos. Puramente nativo.

## 🚀 Decisiones Técnicas Destacadas

Aunque es un proyecto personal de alcance limitado, se ha abordado aplicando buenas prácticas de desarrollo frontend (Performance y UX):

* **Web Audio API:** Para mantener el peso del repositorio al mínimo y evitar peticiones HTTP innecesarias de archivos `.mp3` o `.wav`, los sonidos y notificaciones del temporizador se generan proceduralmente en tiempo real usando osciladores de la API nativa de Audio del navegador.
* **Carga de Vídeo Optimizada:** Para no penalizar el *Time to Interactive* (TTI) cargando pesados iframes de YouTube al inicio, se utiliza `lite-youtube-embed`, cargando los recursos de vídeo de forma diferida solo cuando el usuario interactúa.
* **CSS Moderno & Glassmorphism:** Interfaz estilizada con variables CSS (`:root`), uso extensivo de `backdrop-filter` para crear profundidad visual (efecto cristal), e implementación de animaciones vanguardistas vinculadas al scroll mediante `@supports (animation-timeline: view())`.
* **Diseño Fluido y Semántico:** Arquitectura HTML basada en etiquetas semánticas para facilitar la accesibilidad, envuelta en un diseño *Mobile-First* sin utilizar librerías de estilos externas como Bootstrap o Tailwind.

## 📦 Ejecución Local

Dada su naturaleza Vanilla, el proyecto no requiere de instalación de dependencias ni procesos de compilación.

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/ejercicios-espalda-guiados.git
   ```
2. Simplemente abre el archivo `index.html` en cualquier navegador web moderno, o sírvelo mediante extensiones como *Live Server* en tu editor de código.

---
*Diseñado y programado con ❤️.*
