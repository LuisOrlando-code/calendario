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

## 🐛 Bugs corregidos (20)

### `index.js`

| # | Descripción |
|---|---|
| 1 | `TituloMesAno` usaba `props` suelto en lugar de `props.mes` y `props.ano` |
| 2 | `new Date(year, month - 1. 1)` — punto en lugar de coma |
| 3 | Variables `i`, `row` y `rows` no declaradas en `calcularCeldasDia` |
| 4 | `day & 7` — operador bitwise `&` en lugar de módulo `%` |
| 5 | `` `cell & ${flexOrder}` `` — `&` literal en el string del className |
| 6 | Estado `dayIsClciked` / setter `dayIsClicked` — typo inconsistente que impedía actualizar el estado |
| 7 | `onTuch` — faltaba la `h` en el nombre del evento táctil |
| 8 | `weekdaysTitle` con minúscula — componente no encontrado en el render |
| 9 | `handleSwupeEvent` — typo en el handler de `onTouchMove` |
| 10 | `"left;"` — punto y coma dentro del string de dirección |
| 11 | `transitionLeaceTimeout` — typo, debía ser `transitionLeaveTimeout` |
| 12 | Lógica del carrusel invertida para los cambios dic→ene y ene→dic |
| 13 | `DayCelss` — typo en el nombre del componente |
| 14 | El segundo `MonthControls` usaba `handleDayClicked` en lugar de `handleMonthChange` |
| 15 | `RecyDom.render` — typo, debía ser `ReactDOM.render` |

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