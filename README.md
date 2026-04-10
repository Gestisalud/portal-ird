# Portal de Citas Médicas 🏥

Sitio web para consulta y confirmación de citas médicas preagendadas. Desarrollado como portal beta para demostración.

## 🚀 Cómo usar

### Ver en local
Abre el archivo `index.html` directamente en tu navegador — no se requiere servidor.

### Hospedar en GitHub Pages (gratis)

1. **Crea un repositorio** en GitHub (ej: `portal-citas` o `clinica-citas`)
2. **Sube todos los archivos** de esta carpeta a ese repositorio
3. Ve a **Settings → Pages**
4. En *Source* selecciona `main` branch, directorio `/ (root)`
5. Haz clic en **Save**
6. ¡Listo! En 1–2 minutos tendrás tu URL: `https://TU_USUARIO.github.io/portal-citas/`

> Los datos de pacientes viven en `data/patients.js` — cualquier cambio que hagas y subas a GitHub quedará activo inmediatamente.

---

## 📋 Agregar / Editar Pacientes

Abre `data/patients.js` y sigue el formato existente:

```js
"CC-1234567890": {           // Clave: "<TipoDoc>-<NumDoc>"
  nombres:   "Juan",
  apellidos: "Pérez García",
  docType:   "CC",
  docNumber: "1234567890",
  edad:       45,
  sexo:      "Masculino",
  eps:       "Sanitas",
  celular:   "3001234567",
  direccion: "Cll 50 # 20-15, Bogotá",
  estudio: {
    tipo:    "Ecografía",
    detalle: "Renal bilateral",
    icono:   "📡"         // Emoji que aparece en la tarjeta
  },
  cita: {
    fecha:  "lunes, 21 de abril de 2026",
    hora:   "09:00 a.m.",
    sede:   "Sede Norte – Sala Eco-2",
    medico: "Dr. Carlos Suárez"
  }
}
```

### Tipos de documento disponibles
| Código | Descripción |
|--------|-------------|
| `CC`   | Cédula de Ciudadanía |
| `CE`   | Cédula de Extranjería |
| `TI`   | Tarjeta de Identidad |
| `PA`   | Pasaporte |
| `RC`   | Registro Civil |
| `NIT`  | NIT |

### Iconos sugeridos por tipo de estudio
| Estudio | Emoji |
|---------|-------|
| Resonancia Magnética | 🧲 |
| Tomografía | 🧠 |
| Radiografía | 🩻 |
| Ecografía | 📡 |
| Mamografía | 🔬 |
| Endoscopia | 🔭 |

---

## 🖼️ Logo de la empresa

Coloca tu logo en la raíz del proyecto con el nombre **`logo.png`**.
- Si no se encuentra, el sitio muestra un ícono 🏥 de respaldo.
- Recomendado: imagen cuadrada, mínimo 200×200 px, fondo transparente.

---

## 📁 Estructura de archivos

```
clinica-citas/
├── index.html          ← Página principal
├── styles.css          ← Estilos (glassmorphism + animaciones)
├── app.js              ← Lógica de búsqueda y confirmación
├── logo.png            ← Logo de la empresa (coloca aquí el tuyo)
├── data/
│   └── patients.js     ← BASE DE DATOS de pacientes y citas
└── README.md           ← Este archivo
```

---

## ✨ Funcionalidades

- 🎬 **Animación de entrada** sofisticada con logo, anillo giratorio y barra de carga
- 🔍 **Búsqueda** por tipo + número de documento
- 📋 **Ficha completa**: nombre, edad, sexo, EPS, celular, dirección, estudio, fecha, hora, sede, médico
- ✅ **Confirmación** de asistencia o reporte de datos incorrectos
- 📱 **Totalmente responsivo** (móvil y escritorio)
- 💾 **Sin servidor** — datos en el repositorio, siempre activos

---

*Portal Beta – Centro de Imágenes Diagnósticas*
