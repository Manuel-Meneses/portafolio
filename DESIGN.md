# Sistema de Diseño: Viaje Cuántico

Este documento centraliza los tokens de diseño y principios estéticos del portafolio.

## Paleta de Color (OKLCH)

El sistema utiliza una paleta bloqueada al modo oscuro profundo, evocando el espacio y la mecánica cuántica.

| Token | Valor | Hex (Aprox) | Uso |
| :--- | :--- | :--- | :--- |
| **Midnight Deep** (Background) | `oklch(0.14 0.02 250)` | `#1c212e` | Lienzo principal del universo. |
| **Slate Light** (Foreground) | `oklch(0.92 0.01 250)` | `#e8eaf1` | Texto principal, máxima legibilidad. |
| **Azul Cuántico / Cian** (Accent) | `oklch(0.75 0.18 230)` | `#30a8f8` | Enlaces, interacciones magnéticas, hover states. |
| **Grafito Azulado** (Muted) | `oklch(0.20 0.02 250)` | `#282e3f` | Textos secundarios, fondos de tarjetas atenuados. |
| **Bordes** (Border) | `oklch(0.24 0.03 250)` | `#32394d` | Divisiones estructurales. |

## Tipografía

- **Sans-serif (Geist Sans)**: Interfaz, navegación y textos de lectura técnica.
- **Monospace (Geist Mono)**: Etiquetas, metadatos, y el Modelo Estándar (stack tecnológico).

## Principios Estéticos (Taste)

1. **Inmersión Profunda**: Fondos predominantemente oscuros con un fuerte contraste luminoso para la tipografía.
2. **Espacio Negativo Masivo**: Elementos asimétricos con grandes márgenes (mínimo `pt-24` o `py-32`) emulando el vacío espacial.
3. **Físicas de Kowalski**: Todas las animaciones interactúan como masa y resortes (`stiffness: 0.08, damping: 0.78`).
4. **Minimalismo Abstraccionista**: Evitar logos corporativos. Todo se representa mediante nodos de información técnica.
