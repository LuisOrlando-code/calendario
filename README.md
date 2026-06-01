# 📅 Calendario iOS

Calendario estilo iOS construido con React 15, CSS puro y soporte para gestos táctiles (swipe). Permite navegar entre meses con flechas o deslizando el dedo, y seleccionar días individualmente.

---

## 🚀 Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| React | 15.4.2 | UI y manejo de estado |
| React Addons (CSSTransitionGroup) | 15.4.2 | Animación de transición entre meses |
| ReactDOM | 15.4.2 | Renderizado en el DOM |
| CSS3 | — | Estilos, animaciones, responsive |

---

## 📁 Estructura del proyecto

```
calendario-ios/
├── index.html     # Entrada principal, carga las dependencias
├── index.js       # Lógica React (componentes, estado, swipe)
└── style.css      # Estilos, animaciones de carrusel y responsive
```

---

## 🧩 Componentes

### `TituloMesAno`
Componente funcional. Muestra el mes y el año actuales en la parte superior del calendario.

### `TituloDiasSemana`
Componente funcional. Renderiza la fila de encabezados: Dom, Lun, Mar, Mié, Jue, Vie, Sáb.

### `CeldasDia`
Componente de clase. Calcula y renderiza todas las celdas del mes, incluyendo los espacios en blanco al inicio. Resalta el día seleccionado.

**Método principal:** `calcularCeldasDia(mes, ano)` — determina el primer día de la semana del mes, genera celdas vacías y celdas con número de día.

### `ControlesMes`
Componente de clase. Renderiza una flecha (`izquierda` / `derecha`) para navegar entre meses.

### `Calendario`
Componente raíz. Contiene el estado global y coordina todos los demás componentes.

**Estado:**
```js
{
  mes: Number,           // Mes actual (1–12)
  ano: Number,           // Año actual
  diaClickeado: String,  // ID del día seleccionado (ej: "1052026")
  mesAnterior: Number    // Para determinar dirección del carrusel
}
```

---

## ✨ Funcionalidades

- **Navegación por flechas** — botones izquierda/derecha para cambiar de mes
- **Swipe táctil** — deslizar horizontalmente en móvil para cambiar de mes
- **Selección de día** — clic o toque en cualquier día lo resalta en rojo
- **Animación de carrusel** — transición suave entre meses (entrada/salida)
- **Responsive** — diseño adaptado a pantallas menores de 768px
- **Día actual preseleccionado** al cargar la página

---



### `style.css`

| # | Descripción |
|---|---|
| 16 | `.nonthYearTitleContainer` — `n` en lugar de `m` en el selector |
| 17 | `.monthYearTitleContainer ,.yearWrap` — selector sin clase padre, no aplicaba estilos |
| 18 | `border-left: 2px soplid` — typo en `solid` |
| 19 | `.arroWrap` vs `.arro-wrap` — nombre de clase inconsistente entre CSS y JS |
| 20 | `.dayCellsViewPort` en CSS vs `.dayCellViewPort` en JS — nombre de clase inconsistente |

---

## ▶️ Cómo ejecutar

1. Clona el repositorio:
   ```bash
   git clone <url-del-repo>
   cd calendario-ios
   ```

2. Abre `index.html` directamente en el navegador, o usa un servidor local:
   ```bash
   npx serve .
   # o
   python3 -m http.server 3000
   ```

3. Visita `http://localhost:3000`

> No requiere instalación de dependencias — todas se cargan desde CDN.

---

## 📱 Compatibilidad

| Plataforma | Soporte |
|---|---|
| Desktop (Chrome, Firefox, Safari) | ✅ |
| Móvil (iOS Safari, Android Chrome) | ✅ con swipe |
| Pantallas < 768px | ✅ responsive |