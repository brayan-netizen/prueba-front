# Prueba para Desarrollador Fullstack Vélez 2024

## Objetivo
Desarrollar una página web utilizando: React.js + TypeScript, Node.js + TypeScript + GraphQL, y MongoDB.

### Base de Datos:
- Crear una colección en MongoDB para almacenar los datos de una compra, incluyendo:
    - ID del pedido
    - Fecha de compra
    - Documento del cliente
    - IDs de los productos
    - Cantidad de productos
    - Precio total de la compra

### Back-end:
- Implementar un endpoint en Node.js que permita consumir consultas GraphQL.
- Crear los esquemas necesarios para realizar consultas GraphQL sobre la colección de compras en MongoDB.
- Usando los datos de la siguiente [API](https://qacuerosvelez.vtexcommercestable.com.br/api/catalog_system/pub/products/search/), diseñar el esquema adecuado para realizar consultas GraphQL sobre los productos y obtener la información necesaria.

### Front-end:
En este repositorio encontrarás un template básico de React.js + TypeScript con las versiones necesarias de las librerías para funcionar correctamente. Este incluye la librería [VTEX STYLE GUIDE](https://styleguide.vtex.com/), que proporciona componentes predefinidos, y el framework [CSS Tachyons](https://tachyons.io/#style), que ofrece clases reutilizables para estilos. A continuación, se detallan las tareas a realizar:

1. Crear un dashboard en la URL "/admin" donde se puedan visualizar los pedidos realizados, mostrando en una tabla los siguientes datos:
     - ID del pedido
     - Fecha de compra
     - Documento del cliente
     - Cantidad de productos
     - Precio total de la compra

    Ejemplo de cómo se visualizaría la tabla:
    ![VTEX TABLE](https://qacuerosvelez.vtexassets.com/assets/vtex.file-manager-graphql/images/e533d854-e264-4528-84b1-fb5b0686d03c___2a59e76c4e43dc24e92c01a9a0881351.png)

2. Crear una página de inicio (Home Page) según el siguiente Mockup:

    - **Versión Desktop**  
    ![Desktop](https://qacuerosvelez.vtexassets.com/assets/vtex.file-manager-graphql/images/936480a6-74c7-4a77-8cb3-d5dae8d346fb___255447a52203bc4e30cc4e362f74cfd9.jpg)
    
    - **Versión Mobile**  
    ![Mobile](https://qacuerosvelez.vtexassets.com/assets/vtex.file-manager-graphql/images/71cd6c66-376e-4ba1-8c3a-a3c72226a6cd___fca530bbc25b241786e15412b89d76bb.jpg)

    **Descripción de las tareas:**
    - Crear un navbar fijo que permanezca visible al hacer scroll. Este debe incluir:
        - Botones "MUJER" y "HOMBRE" a la izquierda.
        - Logo de VÉLEZ en el centro [URL LOGO](https://cuerosvelezco.vtexassets.com/assets/vtex/assets-builder/cuerosvelezco.storetheme/1.0.17/svgs/logo-velez___809b118a59d617f3ad6fbebb950fdb8f.svg).
        - A la derecha, un botón con el icono de una bolsa de compras [URL BOLSA](https://cuerosvelezco.vtexassets.com/arquivos/miniCart2.svg) con funcionalidad, y un botón con el icono de login [URL LOGIN](https://cuerosvelezco.vtexassets.com/arquivos/account02.svg).
        - Al hacer clic en la bolsa, se debe abrir un modal que muestre los productos agregados al carrito, con la opción de eliminar productos. Al hacer clic en "Finalizar", se solicitará el documento del cliente y se guardarán los datos en MongoDB.
        ![MOKUP BOLSA](https://qacuerosvelez.vtexassets.com/assets/vtex.file-manager-graphql/images/22c57923-5479-4649-a0bc-f53656c5a125___d434dc79ae21314599e7e33570588e83.png)
    - En la primera sección del mockup, agregar un botón como se indica en la imagen [URL VIDEO DESKTOP](https://cuerosvelezco.vtexcommercestable.com.br/api/dataentities/AA/documents/876/video/attachments/cap1_ban_desktp.mp4) [URL VIDEO MOBILE](https://cuerosvelezco.vtexcommercestable.com.br/api/dataentities/AA/documents/877/video/attachments/cap1_ban_mbile.mp4).
    - Los botones "MUJER" y "HOMBRE" deben cambiar la imagen al hacer clic: [URL IMAGEN MUJER](https://cuerosvelezco.vtexassets.com/assets/vtex.file-manager-graphql/images/c8c9872d-c9ac-4156-8410-01c780c569c5___607cd69d7a9fb84838e4923578621b85.jpg) y [URL IMAGEN HOMBRE](https://cuerosvelezco.vtexassets.com/assets/vtex.file-manager-graphql/images/13c6de0e-6d36-4bbb-9c75-82457ce8df70___000e8dd8c03ebbbf633733626b307dce.jpg).
    - Obtener los productos mediante una consulta GraphQL y mostrarlos con su imagen. Al hacer hover, se debe mostrar un recuadro con el nombre del producto, precio y botón para agregar al carrito. Al hacer clic en el botón del carrito, se debe guardar el estado del producto en local para persistir los datos.
    - En la tercera imagen del mockup, agregar un botón como se indica [URL IMAGEN](https://cuerosvelezco.vtexassets.com/assets/vtex.file-manager-graphql/images/0d4ff15f-3e84-4962-a45b-8b5580ae7770___1af093372608055184268a51e91ab168.jpg).
    - Implementar el footer como se muestra en el mockup, con íconos de redes sociales y otros elementos:
        - [ICON INSTAGRAM](https://cuerosvelezco.vtexassets.com/assets/vtex/assets-builder/cuerosvelezco.storetheme/1.0.17/svgs/home/outline-instagram___617fd1332ff0715da96f9446696122f7.svg)
        - [ICON FACEBOOK](https://cuerosvelezco.vtexassets.com/assets/vtex/assets-builder/cuerosvelezco.storetheme/1.0.17/svgs/home/outline-facebook___6e1615d55aac55794435fe8d695c0a7e.svg)
        - [ICON TIKTOK](https://cuerosvelezco.vtexassets.com/assets/vtex/assets-builder/cuerosvelezco.storetheme/1.0.17/svgs/home/outline-tiktok___572da0db9892477e37214a7a21ae0490.svg)
        - [ICON YOUTUBE](https://cuerosvelezco.vtexassets.com/assets/vtex/assets-builder/cuerosvelezco.storetheme/1.0.17/svgs/home/outline-youtube___263827c4c87b0364f40c7d6f68fefab5.svg)
        - [ICON LINKEDIN](https://cuerosvelezco.vtexassets.com/assets/vtex/assets-builder/cuerosvelezco.storetheme/1.0.17/svgs/home/outline-linkedin___420948e38707c9909ee65de29cdbca49.svg)
        - [ICON PINTEREST](https://cuerosvelezco.vtexassets.com/assets/vtex/assets-builder/cuerosvelezco.storetheme/1.0.17/svgs/home/outline-pinterest___fcd9ac31e61143fec4a187d0bdc23098.svg)
        - [ICON INDUSTRIA Y COMERCIO](https://cuerosvelezco.vtexassets.com/arquivos/logo-sic.png)
      
      **Nota:** Utilizar preferiblemente la versión de node v16.20.2.

### Publicación:
- **Back-end:** Publicar en [Render (Opcional)](https://render.com/).
- **Front-end:** Publicar en [GitHub Pages (Opcional)](https://pages.github.com/).

**Nota:** Es necesario compartir el repositorio.

### Recomendaciones:
1. Evitar el "copy-paste" de código externo, se valorará la originalidad.
2. Desarrollos adicionales y módulos personalizados son bienvenidos.
3. Incorporar transiciones, efectos y mejores prácticas en HTML.
4. Considerar integraciones con desarrollos externos (Apps externas).
5. Utilizar medidas responsive para la pagina de inicio.
6. Saber manejar los errores adecuadamente

**Tiempo de Desarrollo:** 5 horas.
