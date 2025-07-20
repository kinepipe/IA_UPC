# Sitio Web: Análisis de Datos Cualitativos con IA

## Descripción

Este sitio web es una guía completa para integrar la inteligencia artificial en el análisis de datos cualitativos. Incluye información detallada sobre herramientas modernas como Gradio, APIs de IA, GitHub, LM Studio y flujos de trabajo con n8n.

## Características

- **Diseño Responsivo**: Optimizado para dispositivos móviles y de escritorio
- **Navegación Intuitiva**: Menú de navegación claro con secciones bien organizadas
- **Contenido Completo**: Guías detalladas con ejemplos de código prácticos
- **Imágenes Ilustrativas**: Visualizaciones que complementan el contenido textual
- **Interfaz Moderna**: Diseño limpio y profesional usando React y Tailwind CSS

## Secciones del Sitio

### 1. Inicio
- Introducción general al análisis de datos cualitativos con IA
- Navegación a las diferentes secciones
- Imagen principal ilustrativa

### 2. Análisis Cualitativo
- Fundamentos del análisis de datos cualitativos
- Integración de IA en el proceso de investigación
- Metodologías y mejores prácticas
- Herramientas recomendadas

### 3. Gradio
- Introducción a Gradio para crear interfaces web
- Ejemplos de código para análisis de texto
- Casos de uso en investigación
- Guías de instalación y configuración

### 4. APIs de IA
- Integración con OpenAI, Google AI y otros proveedores
- Ejemplos prácticos de uso
- Comparación de diferentes APIs
- Consideraciones de costo y privacidad

### 5. GitHub
- Control de versiones para proyectos de investigación
- Colaboración en equipos de investigación
- Automatización con GitHub Actions
- Mejores prácticas para investigadores

### 6. LM Studio
- Ejecución local de modelos de lenguaje
- Ventajas de la IA local vs. en la nube
- Guías de instalación y configuración
- Ejemplos de integración con Python

### 7. Flujos n8n
- Automatización de procesos de análisis
- Creación de workflows visuales
- Integración con múltiples servicios
- Casos de uso específicos para investigación

## Tecnologías Utilizadas

- **React 18**: Framework de JavaScript para la interfaz de usuario
- **Vite**: Herramienta de construcción rápida
- **Tailwind CSS**: Framework de CSS para estilos
- **Lucide React**: Iconos modernos
- **React Router**: Navegación entre páginas

## Estructura del Proyecto

```
analisis-datos-ia/
├── public/
│   └── index.html
├── src/
│   ├── assets/           # Imágenes y recursos
│   ├── components/       # Componentes React
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Home.jsx
│   │   ├── AnalisisCualitativo.jsx
│   │   ├── Gradio.jsx
│   │   ├── APIsIA.jsx
│   │   ├── GitHub.jsx
│   │   ├── LMStudio.jsx
│   │   └── FlujosN8N.jsx
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos globales
│   └── main.jsx         # Punto de entrada
├── dist/                # Build de producción
├── package.json
└── README.md
```

## Instalación y Desarrollo

### Prerrequisitos
- Node.js 18 o superior
- npm o yarn

### Instalación
```bash
# Clonar o descargar el proyecto
cd analisis-datos-ia

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

### Desarrollo Local
1. Ejecuta `npm run dev`
2. Abre http://localhost:5173 en tu navegador
3. Los cambios se reflejarán automáticamente

## Despliegue

### Opción 1: Archivos Estáticos
Los archivos en la carpeta `dist/` pueden ser servidos por cualquier servidor web estático:
- Apache
- Nginx
- GitHub Pages
- Netlify
- Vercel

### Opción 2: Servidor Node.js
```bash
# Instalar servidor estático
npm install -g serve

# Servir archivos de producción
serve -s dist -l 3000
```

### Opción 3: Docker
```dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Personalización

### Colores y Estilos
Los colores principales se definen en `src/App.css`:
- Primary: Azul (#3b82f6)
- Secondary: Rosa (#ec4899)
- Accent: Verde (#10b981)

### Contenido
Para modificar el contenido, edita los archivos en `src/components/`:
- Cada sección tiene su propio componente
- Las imágenes están en `src/assets/`
- Los estilos usan clases de Tailwind CSS

### Imágenes
Las imágenes están optimizadas y se incluyen en el build. Para cambiarlas:
1. Reemplaza los archivos en `src/assets/`
2. Actualiza las importaciones en los componentes
3. Reconstruye el proyecto

## Optimizaciones Incluidas

- **Code Splitting**: Carga optimizada de componentes
- **Lazy Loading**: Carga diferida de imágenes
- **Minificación**: CSS y JavaScript minificados
- **Compresión**: Assets optimizados para producción
- **SEO**: Meta tags y estructura semántica

## Soporte y Mantenimiento

### Actualizaciones
Para mantener el proyecto actualizado:
```bash
# Verificar dependencias desactualizadas
npm outdated

# Actualizar dependencias
npm update

# Actualizar dependencias principales
npm install react@latest react-dom@latest
```

### Problemas Comunes
1. **Imágenes no cargan**: Verificar rutas en `src/assets/`
2. **Estilos no aplican**: Verificar importación de Tailwind CSS
3. **Navegación no funciona**: Verificar configuración de React Router

## Licencia

Este proyecto está disponible bajo la licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente.

## Contacto

Para soporte técnico o consultas sobre el proyecto, puedes:
- Revisar la documentación incluida
- Consultar los comentarios en el código
- Verificar la estructura de componentes

---

**Nota**: Este sitio web fue creado como una guía educativa para investigadores interesados en integrar IA en sus procesos de análisis de datos cualitativos. El contenido incluye ejemplos prácticos y mejores prácticas basadas en herramientas actuales del mercado.

