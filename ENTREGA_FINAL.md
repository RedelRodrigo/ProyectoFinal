# **LISTA DETALLADA DE REQUERIMIENTOS DEL PROYECTO**

Link: [text](https://gamma.app/docs/Consignas-de-Entrega-Final-a5exr7gsxq6i2th?mode=doc)
Ecommerce: [text](https://ecommerce-react-2025.netlify.app)

## **1. GESTIÓN DEL CARRITO Y AUTENTICACIÓN DE USUARIOS**

### **1.1 Sistema de Carrito de Compras**

- **Gestión centralizada de estado** mediante Context API (CarritoContext)
- **Operaciones básicas del carrito:**
  - Agregar productos con cantidades específicas
  - Eliminar productos individuales
  - Vaciar carrito completo
  - Calcular totales automáticamente
- **Persistencia del carrito** (considerar localStorage para no perder datos)

### **1.2 Sistema de Autenticación**

- **AuthContext** para gestión global del estado de autenticación
- **Login simulado** con almacenamiento en localStorage
- **Rutas protegidas (Protected Routes):**
  - Acceso al carrito solo para usuarios autenticados
  - Redirección a login si no está autenticado
  - Panel de administración protegido
- **Gestión de sesión:** mantener usuario logueado entre recargas

---

## **2. CRUD COMPLETO DE PRODUCTOS CON MOCKAPI**

### **2.1 Creación de Productos**

- **Formulario controlado** con useState para inputs
- **Validaciones en tiempo real:**
  - Nombre: campo obligatorio
  - Precio: número mayor a 0
  - Descripción: mínimo 10 caracteres
  - Categoría: selección válida
- **Integración con MockAPI** mediante POST
- **Feedback visual** al usuario (éxito/error)

### **2.2 Lectura y Visualización**

- **Obtención de productos** desde MockAPI (GET)
- **Estados de carga:** mostrar loading mientras se obtienen datos
- **Manejo de respuestas vacías:** mensaje cuando no hay productos
- **Actualización automática** del catálogo tras operaciones CRUD

### **2.3 Actualización de Productos**

- **Formulario de edición** pre-cargado con datos existentes
- **Mismas validaciones** que en creación
- **Actualización mediante PUT/PATCH** a MockAPI
- **Confirmación visual** de cambios guardados

### **2.4 Eliminación de Productos**

- **Modal de confirmación** antes de eliminar (prevenir errores)
- **Eliminación mediante DELETE** a MockAPI
- **Actualización inmediata** de la interfaz
- **Mensaje de confirmación** tras eliminación exitosa

### **2.5 Manejo de Errores**

- **Captura de errores de red** (API caída, timeout)
- **Mensajes descriptivos** para cada tipo de error
- **Estados de error** en la UI con opción de reintentar
- **Validación de respuestas** de la API

---

## **3. OPTIMIZACIÓN DE DISEÑO Y RESPONSIVIDAD**

### **3.1 Sistema de Diseño Responsivo**

- **Bootstrap Grid System:**
  - Mobile-first approach
  - Breakpoints optimizados (xs, sm, md, lg, xl)
  - Contenedores fluidos y adaptativos
- **Styled-components:**
  - Estilos modulares y reutilizables
  - Tematización global (colores, tipografías)
  - Props dinámicos para variaciones de componentes

### **3.2 Experiencia de Usuario (UX)**

- **React Icons:**
  - Iconografía consistente en toda la aplicación
  - Botones con iconos descriptivos
  - Mejora visual de acciones
- **React Toastify:**
  - Notificaciones no invasivas
  - Diferentes tipos: success, error, warning, info
  - Posicionamiento estratégico
  - Auto-dismiss configurable

### **3.3 SEO y Accesibilidad**

- **React Helmet:**
  - Títulos dinámicos por página
  - Meta descriptions únicas
  - Open Graph tags para redes sociales
  - Favicon y metadatos adicionales
- **Accesibilidad (a11y):**
  - Etiquetas ARIA apropiadas
  - Navegación por teclado funcional
  - Contraste de colores adecuado
  - Labels semánticos en formularios

---

## **4. BÚSQUEDA Y PAGINACIÓN**

### **4.1 Sistema de Búsqueda**

- **Búsqueda en tiempo real** (filtrado mientras se escribe)
- **Criterios de búsqueda:**
  - Por nombre de producto
  - Por categoría
  - Búsqueda insensible a mayúsculas/minúsculas
- **Debounce** para optimizar rendimiento (evitar búsquedas excesivas)
- **Indicador visual** cuando hay búsqueda activa
- **Mensaje** cuando no hay resultados

### **4.2 Paginación de Productos**

- **Redux para gestión de estado:**
  - Estado de paginación global
  - Datos de productos en store
  - Acciones para CRUD sincronizadas
- **Componente paginador:**
  - Navegación entre páginas (anterior/siguiente)
  - Salto directo a página específica
  - Mostrar página actual y total
  - Configuración de items por página
- **Optimización:**
  - Cargar solo productos de página actual
  - Mantener scroll position al cambiar página
  - Indicador de carga entre páginas

---

## **5. PREPARACIÓN PARA DESPLIEGUE**

### **5.1 Testing y Compatibilidad**

- **Pruebas cross-browser:**
  - Chrome, Firefox, Safari, Edge
  - Versiones móviles de navegadores
- **Pruebas cross-device:**
  - Móviles (diferentes resoluciones)
  - Tablets (portrait y landscape)
  - Desktops (diferentes tamaños de pantalla)
- **Pruebas de rendimiento:**
  - Tiempos de carga aceptables
  - Optimización de imágenes
  - Lazy loading si es necesario

### **5.2 Optimización de Código**

- **Clean Code:**
  - Eliminar código muerto/comentado
  - Eliminar console.logs de desarrollo
  - Refactorizar código duplicado
- **Optimización de Estado:**
  - Revisar re-renders innecesarios
  - Context API vs Redux bien justificado
  - Memo/useMemo/useCallback donde corresponda
- **Build Optimization:**
  - Configuración de Vite optimizada
  - Code splitting si aplica
  - Minificación y tree-shaking

### **5.3 Documentación y Deploy**

- **README actualizado:**
  - Instrucciones de instalación
  - Variables de entorno necesarias
  - Scripts disponibles
- **Variables de entorno:**
  - URLs de API configurables
  - Separación dev/prod
- **Preparación para hosting:**
  - Build de producción funcional
  - Configuración de rutas (SPA)
  - Manejo de errores 404

---

## **RESUMEN DE TECNOLOGÍAS Y ARQUITECTURA**

### **Stack Tecnológico:**

- **Core:** React + Vite
- **Gestión de Estado:** Context API + Redux (híbrido)
- **Estilos:** Bootstrap + Styled-components
- **Routing:** React Router (rutas protegidas)
- **Backend:** MockAPI
- **Notificaciones:** React Toastify
- **Iconos:** React Icons
- **SEO:** React Helmet

### **Arquitectura Sugerida:**

```
- Context API: Carrito, Autenticación
- Redux: Productos, Paginación
- Custom Hooks: useAuth, useCart, useProducts
- Protected Routes: HOC o componente wrapper
- API Service: centralizar llamadas a MockAPI
- Validaciones: helpers/validators
- Constants: configuraciones globales
```

### **Priorización de Desarrollo:**

1. Autenticación básica y rutas protegidas
2. CRUD de productos con MockAPI
3. Carrito de compras funcional
4. Búsqueda y paginación
5. Optimización de diseño y responsividad
6. Testing y preparación para deploy

---

Esta estructura garantiza un proyecto escalable, mantenible y con buenas prácticas de desarrollo.
