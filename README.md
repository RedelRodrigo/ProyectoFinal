# 🛒 Mi Tienda - E-commerce con React

Un proyecto de tienda online completo con carrito de compras, autenticación y panel de administración.

## 🚀 ¿Qué hace este proyecto?

Básicamente es una tienda online donde puedes:

- Ver productos en un catálogo con paginación
- Buscar productos por nombre o categoría
- Agregar productos al carrito
- Ver y gestionar tu carrito de compras
- Iniciar sesión como usuario normal o administrador

Si eres **administrador**, además puedes:

- Agregar nuevos productos
- Editar productos existentes
- Eliminar productos

## 🛠️ Tecnologías usadas

- **React** - El corazón del proyecto
- **Redux** - Para manejar el estado de los productos y paginación
- **Context API** - Para el carrito y autenticación
- **React Router** - Para navegar entre páginas
- **Bootstrap** - Para que se vea bonito
- **Axios** - Para conectarse con la API
- **MockAPI** - Donde se guardan los productos
- **Vite** - Para que todo cargue rápido

## 📦 Instalación

1. Clona el proyecto:

```bash
git clone <url-del-repo>
cd ProyectoFinal
```

2. Instala las dependencias:

```bash
npm install
```

3. Arranca el proyecto:

```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

## 🔐 Credenciales de prueba

**Usuario administrador:**

- Usuario: `admin`
- Contraseña: `admin123`

**Usuario normal:**

- Cualquier usuario/contraseña funciona

## 📁 Estructura del proyecto

```
src/
├── assets/          # Imágenes y estilos globales
├── components/      # Componentes reutilizables
│   ├── common/      # Botones, cards, modals, etc.
│   ├── layout/      # Navbar, Footer
│   ├── products/    # Todo lo de productos
│   ├── cart/        # Componentes del carrito
│   ├── auth/        # Login y rutas protegidas
│   └── search/      # Buscador y paginación
├── pages/           # Páginas de la app
│   ├── Home/
│   ├── Products/
│   ├── Cart/
│   ├── Login/
│   └── Admin/       # Panel de administración
├── context/         # Context API (Carrito y Auth)
├── redux/           # Redux (Productos y Paginación)
├── hooks/           # Custom hooks
├── services/        # Conexión con la API
├── utils/           # Funciones útiles
├── constants/       # Constantes y configuración
└── routes/          # Configuración de rutas
```

## 🎯 Funcionalidades principales

### Para todos los usuarios:

- ✅ Ver catálogo de productos (5 por página)
- ✅ Navegar entre páginas
- ✅ Buscar productos
- ✅ Agregar productos al carrito
- ✅ Ver carrito en un modal
- ✅ Eliminar productos del carrito
- ✅ Vaciar carrito completo
- ✅ Iniciar sesión

### Solo para administradores:

- ✅ Agregar nuevos productos
- ✅ Editar productos existentes
- ✅ Eliminar productos
- ✅ Validaciones en formularios

## 🔄 Cómo funciona

1. **Los productos** se obtienen de MockAPI y se guardan en Redux
2. **El carrito** se maneja con Context API y se guarda en localStorage
3. **La autenticación** también usa Context API y localStorage
4. **Las rutas protegidas** solo permiten acceso a usuarios logueados
5. **El panel de admin** solo es accesible si eres administrador

## 📝 Scripts disponibles

```bash
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Crea la versión de producción
npm run preview      # Previsualiza la build
npm run lint         # Revisa el código
```

## 🐛 Problemas conocidos

Si los productos no se muestran:

1. Verifica que MockAPI esté funcionando
2. Revisa la consola del navegador
3. Asegúrate de que la URL de la API sea correcta

## 📞 Contacto

Creado por **Redel Rodrigo** - Proyecto Final 2025

---

**Nota:** Este es un proyecto educativo. La autenticación es simulada y los datos se guardan en MockAPI (se borran periódicamente).
