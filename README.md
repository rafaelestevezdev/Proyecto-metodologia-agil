# 🔐 Sistema de Login y Registro

Un sistema completo de autenticación con registro de usuarios, utilizando localStorage para almacenamiento local.

## 📁 Estructura del Proyecto

```
login/
├── index.html          # Página de redirección (punto de entrada)
├── login.html          # Página de inicio de sesión
├── register.html       # Página de registro de usuarios
├── dashboard.html      # Panel principal (requiere autenticación)
├── test.html           # Página de pruebas del sistema
├── css/
│   ├── style.css       # Estilos principales
│   └── register.css    # Estilos específicos del registro
└── js/
    ├── auth.js         # Módulo de autenticación
    ├── login.js        # Lógica del formulario de login
    ├── register.js     # Lógica del formulario de registro
    ├── dashboard.js    # Lógica del dashboard
    ├── utils.js        # Funciones utilitarias
    ├── main.js         # Lógica compartida
    └── dev-init.js     # Inicialización para desarrollo
```

## 🚀 Cómo usar

### 1. Servidor Local

```bash
# Navegar al directorio del proyecto
cd /ruta/al/proyecto/login

# Iniciar servidor HTTP (Python 3)
python3 -m http.server 8000

# O usar Node.js
npx http-server -p 8000
```

### 2. Acceder a la aplicación

- **URL principal**: http://localhost:8000
- **Login directo**: http://localhost:8000/login.html
- **Registro**: http://localhost:8000/register.html
- **Pruebas**: http://localhost:8000/test.html

## 👤 Usuarios de Prueba

El sistema crea automáticamente usuarios de prueba:

- **admin** / **1234**
- **user** / **user123**
- **test** / **test**

## ✨ Características

### 🔑 Sistema de Autenticación

- ✅ Registro de nuevos usuarios
- ✅ Inicio de sesión con validación
- ✅ Almacenamiento local con localStorage
- ✅ Protección de rutas (dashboard requiere login)
- ✅ Sesión persistente hasta logout

### 🎨 Interfaz de Usuario

- ✅ Diseño responsivo y moderno
- ✅ Validación en tiempo real
- ✅ Indicador de fortaleza de contraseña
- ✅ Mostrar/ocultar contraseña
- ✅ Mensajes de error y éxito
- ✅ Animaciones y transiciones suaves

### 🏗️ Arquitectura

- ✅ Estructura modular
- ✅ Separación de responsabilidades
- ✅ Código limpio y comentado
- ✅ Uso de ES6 modules
- ✅ Manejo de errores

## 📝 Uso del Sistema

### Registro de Usuario

1. Ir a la página de registro
2. Ingresar nombre de usuario (mín. 3 caracteres)
3. Ingresar contraseña (mín. 4 caracteres)
4. Hacer clic en "Registrarse"
5. Serás redirigido al login automáticamente

### Inicio de Sesión

1. Ir a la página de login
2. Ingresar credenciales
3. Hacer clic en "Iniciar Sesión"
4. Serás redirigido al dashboard

### Dashboard

- Página protegida que requiere autenticación
- Botón de logout para cerrar sesión
- Redirige al login si no estás autenticado

## 🛠️ Desarrollo

### Agregar Nuevas Funcionalidades

1. **Nuevos módulos**: Crear archivos en `/js/`
2. **Estilos**: Agregar en `/css/`
3. **Páginas**: Crear archivos HTML en la raíz

### Debugging

- Usar la consola del navegador para ver logs
- La página `test.html` permite pruebas rápidas
- Los usuarios se almacenan en localStorage del navegador

### Modificar Usuarios de Prueba

Editar el archivo `js/dev-init.js`:

```javascript
const testUsers = [
  { username: "nuevo", password: "contraseña" },
  // ... más usuarios
];
```

## 🔧 Solución de Problemas

### Los usuarios no se guardan

- Verificar que localStorage esté habilitado
- Comprobar la consola del navegador por errores
- Usar la página de pruebas para verificar

### Redirecciones no funcionan

- Verificar que el servidor esté corriendo
- Comprobar las rutas de los archivos
- Revisar la configuración de sessionStorage

### Estilos no se cargan

- Verificar rutas de archivos CSS
- Comprobar que el servidor sirva archivos estáticos
- Revisar la consola por errores 404

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
