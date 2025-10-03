# 🚀 Guía Rápida de Uso

## 📋 Cómo Usar el Sistema de Login

### 1️⃣ Iniciar Sesión

1. Abre `login.html` en tu navegador
2. Ingresa uno de los usuarios registrados:
   - **admin** / **1234**
   - **usuario1** / **pass123**
   - **test** / **test123**
   - **demo** / **demo123**

### 2️⃣ Validación en Tiempo Real

#### Campo de Usuario

- **Mientras escribes**, el sistema verifica:
  - ✅ Longitud mínima (3 caracteres)
  - ✅ Caracteres válidos (letras, números, guión bajo)
  - ✅ Si el usuario está registrado

#### Campo de Contraseña

- **Cuando ingresas un usuario válido**:
  - El sistema verifica si la contraseña coincide
  - ✓ **Verde**: Contraseña correcta
  - ✗ **Rojo**: Contraseña incorrecta

#### Indicador de Seguridad

- Muestra qué tan segura es tu contraseña:
  - 🔴 **Débil**: Mejora tu contraseña
  - 🟡 **Media**: Buena contraseña
  - 🟢 **Fuerte**: ¡Excelente!

### 3️⃣ Mensajes de Error Específicos

El sistema te dirá exactamente qué está mal:

| Situación             | Mensaje                                    |
| --------------------- | ------------------------------------------ |
| Usuario no existe     | "Usuario no registrado en el sistema"      |
| Contraseña incorrecta | "La contraseña no coincide con el usuario" |
| Campos vacíos         | "Por favor, completa todos los campos"     |

### 4️⃣ Después del Login

Una vez que inicies sesión correctamente:

1. ✨ **Animación de éxito** con partículas
2. 🎉 **Redirección al Dashboard** (automática)
3. 👤 **Bienvenida personalizada** con tu nombre
4. 📊 **Tarjetas animadas** con información

### 5️⃣ Dashboard

En el dashboard puedes:

- 📊 Ver tus **estadísticas**
- ⚡ Revisar tu **actividad**
- 🎯 Consultar tus **objetivos**
- 🔔 Ver **notificaciones**
- 🚪 **Cerrar sesión** de forma segura

### 6️⃣ Cerrar Sesión

1. Haz clic en el botón **"Cerrar Sesión"**
2. Confirma la acción
3. Serás redirigido al login

---

## 🔍 Casos de Prueba

### ✅ Caso 1: Login Exitoso

```
Usuario: admin
Contraseña: 1234
Resultado: ✓ Acceso al dashboard
```

### ❌ Caso 2: Usuario No Registrado

```
Usuario: noexiste
Contraseña: cualquiera
Resultado: ✗ "Usuario no registrado en el sistema"
```

### ❌ Caso 3: Contraseña Incorrecta

```
Usuario: admin
Contraseña: incorrecta
Resultado: ✗ "La contraseña no coincide con el usuario"
```

### ⚠️ Caso 4: Campos Vacíos

```
Usuario: (vacío)
Contraseña: (vacío)
Resultado: ⚠️ "Por favor, completa todos los campos"
```

---

## 💡 Tips

### Para Probar la Validación

1. **Escribe un usuario que no exista**: Verás el mensaje en rojo
2. **Escribe "admin"**: Verás el mensaje en verde
3. **Escribe una contraseña incorrecta**: Verás que no coincide
4. **Escribe "1234"**: Verás que es correcta ✓

### Para Ver Animaciones

1. **En el login**: Observa el efecto glassmorphism y animaciones suaves
2. **En el dashboard**: Disfruta de las partículas y efectos de entrada
3. **Hover en tarjetas**: Mueve el mouse sobre las tarjetas para ver el efecto

### Para Desarrolladores

- 🔍 Abre la **Consola del navegador** (F12)
- 📝 Verás mensajes informativos del sistema
- 🎯 Todos los eventos están logueados para debugging

---

## 🎨 Personalización

### Agregar Nuevos Usuarios

Edita `escrip.js` y agrega usuarios en la base de datos:

```javascript
const USERS_DATABASE = [
  { username: "admin", password: "1234", name: "Administrador" },
  { username: "tunombre", password: "tupass", name: "Tu Nombre" },
];
```

### Cambiar Colores

Edita las variables CSS en `index.css`:

```css
:root {
  --color-primary: #87ceeb; /* Cambia este color */
  --color-primary-dark: #5dade2;
}
```

---

## ⚡ Atajos de Teclado

- **Enter**: Enviar formulario (en cualquier campo)
- **Tab**: Navegar entre campos
- **Esc**: (En dashboard) Cerrar notificaciones

---

## 🐛 Solución de Problemas

### El dashboard no carga

- Verifica que hayas iniciado sesión correctamente
- El sistema te redirigirá automáticamente al login si no hay sesión

### Las validaciones no funcionan

- Asegúrate de que JavaScript esté habilitado
- Limpia la caché del navegador (Ctrl + F5)

### Los iconos no se ven

- Verifica tu conexión a internet
- Font Awesome se carga desde un CDN

---

¡Disfruta del sistema de login más avanzado! 🎉
