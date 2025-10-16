# � Tienda de Productos Tecnológicos - Sistema de Autenticación

**Proyecto educativo** - Una plataforma de e-commerce de productos tecnológicos con sistema completo de autenticación, registro de usuarios y paneles diferenciados según rol (cliente y administrador).

## 📚 ¿Qué es este Proyecto?

Esta es una **tienda virtual de tecnología** educativa con dos niveles de acceso:

- **👥 Cliente/Usuario**: Se registra, inicia sesión y accede a su panel para explorar productos
- **👨‍💼 Administrador**: Acceso al dashboard administrativo para gestionar productos, órdenes, usuarios y ver estadísticas

### 🎓 Propósito Educativo

Diseñado para aprender conceptos fundamentales:

- ✅ Autenticación y autorización
- ✅ Control de acceso por roles (RBAC)
- ✅ Almacenamiento local (localStorage/sessionStorage)
- ✅ Arquitectura modular y responsabilidad única
- ✅ Validación de formularios en tiempo real
- ✅ Gestión de sesiones seguras
- ✅ Protección de rutas según rol
- ✅ Interfaz responsiva moderna
- ✅ JavaScript ES6+ y módulos

## 📁 Estructura del Proyecto

```
login/
├── index.html          # Página de redirección (punto de entrada)
├── login.html          # Experiencia unificada de login y registro
├── dashboard.html      # Panel admin moderno con sidebar funcional
├── tienda-productos.html # Tienda de productos para usuarios normales
├── css/
│   ├── style.css       # Estilos del login
│   ├── dashboard.css   # Estilos del dashboard
│   └── tienda-productos.css # Estilos de la tienda
└── js/
    ├── dashboard-main.js        # Orquestador principal (refactorizado)
    ├── auth.js                  # Módulo de autenticación
    ├── dashboard.js             # Lógica legacy del dashboard
    └── modules/
        └── user-shop-module.js  # Módulo de tienda de usuario
    ├── login.js                 # Lógica del formulario de login
    ├── utils.js                 # Funciones utilitarias
    ├── main.js                  # Lógica compartida
    ├── dev-init.js              # Inicialización para desarrollo
    └── modules/                 # Módulos especializados (NUEVO)
        ├── auth-module.js       # Autenticación (SRP)
        ├── profile-menu-module.js
        ├── logout-modal-module.js
        ├── theme-module.js
        └── sidebar-module.js    # Navegación y 5 vistas diferentes
```

## 🎯 Dashboard con Sidebar Funcional

El dashboard ahora cuenta con un **sidebar completamente funcional** con 5 vistas diferentes:

1. **Dashboard** - KPIs, gráficos y tabla de órdenes
2. **Analytics** - Estadísticas del sistema
3. **Usuarios** - Gestión y estadísticas de usuarios
4. **Contenido** - Gestión de contenidos
5. **Configuración** - Configuración del sistema

Cada vista tiene:

- ✅ Contenido único y simulado
- ✅ Tablas con datos de ejemplo
- ✅ Gráficos interactivos (Chart.js)
- ✅ Botones de acción
- ✅ Diseño responsivo

## 🏗️ Refactorización - Responsabilidad Única

El código ha sido **completamente refactorizado** siguiendo el principio de **Single Responsibility**:

| Módulo                     | Responsabilidad              | Líneas |
| -------------------------- | ---------------------------- | ------ |
| **auth-module.js**         | Autenticación y autorización | 42     |
| **profile-menu-module.js** | Gestionar menú de perfil     | 68     |
| **logout-modal-module.js** | Modal de confirmación        | 65     |
| **theme-module.js**        | Tema claro/oscuro            | 48     |
| **sidebar-module.js**      | Navegación y vistas          | 400+   |
| **dashboard-main.js**      | Orquestador principal        | 27     |

📖 Ver documentación completa en: **REFACTORING_MODULES.md**

## 🚀 Cómo Usar

### 1. Iniciar el Servidor Local

```bash
# Navegar al directorio del proyecto
cd /home/rafadev/Projects/login

# Opción 1: Python 3
python3 -m http.server 8000

# Opción 2: Node.js
npx http-server -p 8000
```

Acceder a: **http://localhost:8000**

### 2. Flujo de la Tienda

**Para Clientes:**

1. Ir a la página principal (index.html)
2. Hacer clic en **"Registrarse"** para crear una nueva cuenta
3. Completar el formulario con usuario y contraseña
4. **Iniciar sesión** con las credenciales registradas
5. Acceder al **panel de usuario** para explorar productos

**Para Administradores:**

1. Ir a la página de login
2. Usar credenciales de administrador
3. Acceder al **dashboard admin** con sidebar funcional
4. Gestionar productos, pedidos, usuarios y estadísticas

## 👤 Credenciales de Prueba

| Usuario         | Contraseña         | Rol   | Acceso             |
| --------------- | ------------------ | ----- | ------------------ |
| `administrator` | `Admin@2025Secure` | Admin | Dashboard completo |
| `test`          | `test`             | User  | Panel de usuario   |

**Crear nuevas cuentas:** Usar la opción "Registrarse" en la página de login (automáticamente se asigna rol "user")

## ✨ Características Principales

### 🛍️ Panel de Cliente

- ✅ Catálogo de productos tecnológicos
- ✅ Visualización de detalles del producto
- ✅ Carrito de compras
- ✅ Historial de órdenes
- ✅ Perfil de usuario personalizado

### 🔑 Sistema de Autenticación

- ✅ Registro de nuevos usuarios
- ✅ Inicio de sesión seguro
- ✅ Almacenamiento local con localStorage
- ✅ Protección de rutas según rol
- ✅ Sesión persistente hasta logout
- ✅ Validación de credenciales

### 📊 Panel Administrativo

- ✅ Dashboard con KPIs y estadísticas
- ✅ Gestión de productos
- ✅ Gestión de órdenes
- ✅ Gestión de usuarios
- ✅ Sidebar con 5 vistas funcionales
- ✅ Tema claro/oscuro
- ✅ Gráficos interactivos
- ✅ Tablas con datos de ejemplo

### 🎨 Interfaz de Usuario

- ✅ Diseño responsivo y moderno
- ✅ Paleta SAGE/RUSK/PIPE elegante
- ✅ Validación en tiempo real
- ✅ Indicador de fortaleza de contraseña
- ✅ Mensajes de éxito y error
- ✅ Animaciones suaves

### 🏗️ Arquitectura Técnica

- ✅ Código modular (SRP)
- ✅ Separación de responsabilidades
- ✅ JavaScript ES6+ y módulos
- ✅ Código limpio y comentado
- ✅ Manejo robusto de errores

## 🛠️ Desarrollo

### Agregar Nuevas Funcionalidades

1. **Nuevos módulos**: Crear archivos en `/js/modules/`
2. **Estilos**: Agregar en `/css/`
3. **Páginas**: Crear archivos HTML en la raíz

### Debugging

- Abrir consola del navegador (F12) para ver logs
- localStorage contiene los datos de usuarios y órdenes
- sessionStorage mantiene la sesión actual

## 📝 Notas Educativas

⚠️ **Este es un proyecto educativo** - Diseñado para aprender:

- **Autenticación básica**: Cómo registrar y validar usuarios
- **Control de acceso**: Diferentes permisos según rol
- **Almacenamiento web**: localStorage para datos persistentes
- **Protección de rutas**: Redirecciones según autenticación
- **Arquitectura modular**: Organización de código escalable

⚠️ **No recomendado para producción sin mejoras de seguridad**:

- Las contraseñas no están encriptadas
- No implementa HTTPS
- No tiene validación CSRF
- El almacenamiento es local sin servidor backend

## 📄 Licencia

Código abierto disponible para uso educativo - MIT

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
