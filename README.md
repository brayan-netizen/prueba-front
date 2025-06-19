# 🌐 Frontend - Plataforma de Productos y Usuarios

Este proyecto fue desarrollado con **React 16** y **TypeScript**, utilizando **GraphQL** para la comunicación con el backend. El diseño de componentes se realizó con **VTEX Styleguide**, **Tachyons** y la librería de utilidades **vtex-tachyons**.

---

## 🚀 Tecnologías utilizadas

| Tecnología      | Enlace a documentación                        |
| --------------- | --------------------------------------------- |
| React 16        | https://reactjs.org/docs/getting-started.html |
| TypeScript      | https://www.typescriptlang.org/docs/          |
| GraphQL         | https://graphql.org/                          |
| VTEX Styleguide | https://styleguide.vtex.com/                  |
| Tachyons        | https://tachyons.io/docs/                     |
| vtex-tachyons   | https://www.npmjs.com/package/vtex-tachyons   |

---

## 🌍 URL del sitio desplegado

Accede a la aplicación en producción desde:

> [`https://prueba-front-a894.onrender.com/`](https://prueba-front-a894.onrender.com/)

---

## 🔐 Autenticación

-   Login con correo y contraseña
-   El backend retorna un token JWT que se guarda localmente
-   Acceso condicionado por rol según permisos
-   Opciones de navegación aparecen solo si el usuario está autenticado

---

## 🛍 Página principal - Lista de productos

-   **Fuente de productos**: API pública de Offcorss VTEX  
    [`https://offcorss.myvtex.com/api/catalog_system/pub/products/search/`](https://offcorss.myvtex.com/api/catalog_system/pub/products/search/)
-   Se accede a través de GraphQL en el backend
-   Muestra productos con paginación, filtrado y búsqueda por:
    -   Nombre
    -   Marca
    -   Referencia

### 🔎 Filtros dinámicos

-   Input de búsqueda para filtrar productos por distintos campos
-   Campos mapeados desde GraphQL con opciones activables

### 🖼 Modal de información

-   Al hacer clic sobre la imagen de un producto:
    -   Se abre un modal con **toda la información detallada**
    -   Incluye opción para **imprimir** directamente desde el navegador

---

## 📤 Exportar CSV

-   Puedes descargar un archivo CSV con los **primeros 100 productos** mostrados en la lista
-   Selector **“ROW CSV”** te permite activar/desactivar los campos a incluir en la exportación
-   Todos los campos están seleccionados por defecto

---

## 👥 Gestión de usuarios

### 🔐 Menú de opciones (desplegable desde el ícono de usuario)

-   Ir al Home
-   Ver lista de usuarios (admin)
-   Editar perfil
-   Logout

### 👤 Lista de usuarios

-   Permite ver, crear y eliminar usuarios
-   Al crear un usuario:
    -   Solo se solicita correo y contraseña
    -   El usuario podrá completar su perfil después al iniciar sesión

### ✏️ Edición de perfil

-   Los usuarios autenticados pueden actualizar:
    -   Nombre
    -   Apellido
    -   Email
    -   Contraseña (opcional, con validación)
-   El campo de rol está presente pero oculto para no permitir su edición

---

## ⚙️ Configuración y uso

-   Comunicación con el backend GraphQL (`/graphql`)
-   Token guardado en `localStorage` y leído mediante Context API
-   Protecciones de ruta con redirección automática al login si no hay sesión activa
-   Contexto global para usuario, sesión y permisos

---

## 🧪 Requisitos

-   Node.js v16
-   .env:
