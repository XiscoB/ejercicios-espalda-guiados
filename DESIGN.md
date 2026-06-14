# Design System: Ejercicios de Espalda para Gina

Este documento define las bases visuales y de interacción (UI/UX) para la aplicación web.

## 1. Filosofía de Diseño
- **Premium & Moderno:** Uso intensivo de *Dark Mode*, *Glassmorphism* y micro-animaciones para una sensación fluida.
- **Accesible & Claro:** Textos legibles y contrastes adecuados, con botones grandes para uso táctil.
- **Dinámico:** Animaciones basadas en scroll para revelar contenido de forma orgánica.

## 2. Tipografía
Se utilizará **Inter** o **Outfit** a través de Google Fonts por su excelente legibilidad en pantallas digitales.
- **Headings (h1, h2, h3):** Pesos Bold (700) y Semi-Bold (600).
- **Body Text:** Peso Regular (400) y Medium (500).

## 3. Paleta de Colores (Dark Mode)
El esquema se basa en fondos muy oscuros para descansar la vista, contrastados con colores de acento vibrantes que evocan salud y vitalidad.

| Token | Propósito | Valor (Hex / HSL) |
| :--- | :--- | :--- |
| `--bg-base` | Fondo principal (muy oscuro) | `#0B0F19` |
| `--bg-surface` | Fondo de tarjetas (Glass) | `rgba(255, 255, 255, 0.05)` |
| `--text-primary` | Texto principal | `#F1F5F9` (Slate 50) |
| `--text-secondary`| Texto secundario | `#94A3B8` (Slate 400) |
| `--accent-primary`| Botones, destacados (Esmeralda) | `#10B981` (Emerald 500)|
| `--accent-glow` | Resplandor / Sombras de acento | `rgba(16, 185, 129, 0.2)` |
| `--border-subtle` | Bordes de tarjetas | `rgba(255, 255, 255, 0.1)` |

## 4. Estructura y Espaciado
- Uso de **CSS Grid** y **Flexbox**.
- El layout principal será de una sola columna optimizada para móviles (100% de ancho) y un máximo de ancho (`max-width: 800px`) en escritorio, centrando el contenido para simular una experiencia tipo App.
- **Border Radius:** Curvas suaves (`16px` o `24px`) para tarjetas y botones.

## 5. Efectos Visuales
- **Glassmorphism:** Las tarjetas utilizarán `backdrop-filter: blur(12px)` para crear profundidad sobre fondos abstractos o degradados muy oscuros.
- **Scroll-driven Animations:** Las tarjetas de ejercicios tendrán un efecto de *Fade In + Scale Up* usando animaciones nativas de CSS ligadas al scroll (`animation-timeline: view()`).
- **Hover States:** Los elementos interactivos (tarjetas, botones) se elevarán sutilmente (`transform: translateY(-4px)`) y aumentarán el brillo de sus bordes o sombras en desktop.

## 6. Componentes Principales
1. **Hero Header:** Título, saludo motivacional y fondo con degradado radial sutil.
2. **Exercise Card:**
   - Contenedor con efecto Glass.
   - iFrame de YouTube embebido directamente con `aspect-ratio: 16/9` y `border-radius`.
   - Título y descripción.
3. **Timer Overlay/Bar:** Un control flotante o fijo para iniciar el temporizador, con progreso visual y retroalimentación sonora.
