# API REST - Tienda Ficticia "Dulce Encanto"

API REST desarrollada con **Node.js y Express** para administrar el
catálogo de productos de una tienda de golosinas ficticia llamada **Dulce Encanto**.
La información se almacena en **Cloud Firestore (Firebase)** y las rutas
protegidas utilizan autenticación mediante **JSON Web Tokens (JWT)**.

## Características

-   Operaciones CRUD para productos: consultar, crear, actualizar y
    eliminar.
-   Persistencia de datos en Firestore.
-   Autenticación mediante JWT.
-   Autorización por roles: `admin` y `user`.
-   Arquitectura organizada en rutas, controladores, servicios, modelos,
    middlewares y configuración.
-   Manejo de errores HTTP `400`, `401`, `403`, `404` y `500`.
-   Variables sensibles almacenadas en un archivo `.env`.

## Tecnologías y dependencias

-   Node.js
-   Express
-   CORS
-   Body-parser
-   dotenv
-   Firebase
-   Firebase Admin SDK (`firebase-admin`)
-   jsonwebtoken

> **Nota sobre Firebase:** el proyecto utiliza Firebase Admin SDK para
> que el backend Node.js acceda a Firestore mediante una cuenta de
> servicio. El paquete `firebase` también se conserva como dependencia
> del proyecto (para cumplir con la consigna).

## Estructura del proyecto

``` text
archivos/
├── config/
│   ├── firebase.js
│   └── serviceAccountKey.json
├── controllers/
│   ├── products.controller.js
│   └── auth.controller.js
├── middlewares/
│   ├── auth.middleware.js
│   └── error.middleware.js
├── models/
│   └── products.model.js
├── routes/
│   ├── products.routes.js
│   └── auth.routes.js
├── services/
│   ├── products.service.js
│   └── auth.service.js
├── .env
├── .gitignore
├── index.js
└── package.json
```

### Responsabilidad de cada capa

  -----------------------------------------------------------------------
  Capa                                Responsabilidad
  ----------------------------------- -----------------------------------
  `config`                            Configuración y conexión con
                                      servicios externos, en este caso
                                      Firebase.

  `routes`                            Define los endpoints y los
                                      middlewares que protegen cada ruta.

  `controllers`                       Recibe las solicitudes HTTP, valida
                                      los datos y construye las
                                      respuestas.

  `services`                          Contiene la lógica de aplicación y
                                      conecta los controladores con los
                                      modelos.

  `models`                            Realiza las operaciones de lectura
                                      y escritura en Firestore.

  `middlewares`                       Gestiona la autenticación,
                                      autorización y los errores.

  -----------------------------------------------------------------------

## Requisitos previos

Antes de ejecutar el proyecto, se necesita:

-   Node.js y npm instalados.
-   Un proyecto creado en Firebase con Cloud Firestore habilitado.
-   Una cuenta de servicio de Firebase Admin SDK para conectar el
    backend con Firestore.

## Instalación y configuración

1.  Clonar o descargar el proyecto.
2.  Abrir una terminal en el directorio del proyecto.
3.  Instalar las dependencias:

``` bash
npm install
```

4.  Crear el archivo `.env` en la raíz del proyecto y configurar las
    variables necesarias:

``` env
PORT=3000

ADMIN_USER=admin
ADMIN_PASSWORD=tu_contraseña_de_administrador

USER_USER=client
USER_PASSWORD=tu_contraseña_de_usuario

JWT_SECRET=una_clave_secreta_larga_y_segura
```

Reemplazar los valores de ejemplo por credenciales propias. No compartir
el archivo `.env` ni subirlo al repositorio.

5.  Descargar la clave privada de una cuenta de servicio desde la
    configuración del proyecto Firebase, sección **Cuentas de servicio
    \> Firebase Admin SDK**. Guardar el archivo JSON como:

``` text
config/serviceAccountKey.json
```

Este archivo contiene credenciales privadas. No debe compartirse ni
subirse al repositorio.

6.  Verificar que el archivo `.gitignore` excluya los archivos
    sensibles:

``` gitignore
node_modules/
.env
config/serviceAccountKey.json
```

7.  Ejecutar el servidor:

``` bash
npm run start
```

El servidor utiliza el puerto definido en `PORT`; si no se especifica,
utiliza el puerto `3000`.

Al iniciar, la API queda disponible, por defecto, en:

``` text
http://localhost:3000
```

La ruta raíz (`GET /`) devuelve un mensaje que indica que la API está
funcionando.

## Configuración de Firestore

La aplicación utiliza una colección llamada:

``` text
products
```

Cada documento representa un producto. Los documentos manejan los
siguientes campos:

  Campo           Tipo     Descripción
  --------------- -------- ---------------------------
  `name`          String   Nombre del producto.
  `price`         int64    Precio del producto.
  `description`   String   Descripción del producto.

El identificador del documento es proporcionado por Firestore y se
devuelve como `id` en las respuestas de la API.

Ejemplo de documento:

``` json
{
  "name": "ChocoCaramel",
  "price": 2500,
  "description": "Chocolate con leche relleno de caramelo cremoso"
}
```

## Endpoints

### Autenticación

  -----------------------------------------------------------------------
  Método            Endpoint          Descripción       Acceso
  ----------------- ----------------- ----------------- -----------------
  `POST`            `/auth/login`     Valida las        Público
                                      credenciales y    
                                      devuelve un JWT.  

  -----------------------------------------------------------------------

#### Iniciar sesión

**Solicitud**

``` http
POST /auth/login
Content-Type: application/json
```

``` json
{
  "username": "admin",
  "password": "tu_contraseña_de_administrador"
}
```

**Respuesta exitosa (`200 OK`)**

``` json
{
  "message": "Autenticación exitosa",
  "token": "TOKEN_JWT"
}
```

Las credenciales se configuran mediante las variables de entorno. La API
contempla dos roles: `admin` y `user`.

### Productos

Todas las rutas de productos requieren autenticación mediante un token
JWT. Para enviar el token, configurar el encabezado:

``` http
Authorization: Bearer TOKEN_JWT
```

  ------------------------------------------------------------------------------
  Método            Endpoint                 Descripción       Acceso
  ----------------- ------------------------ ----------------- -----------------
  `GET`             `/api/products`          Devuelve todos    Usuario
                                             los productos.    autenticado

  `GET`             `/api/products/:id`      Devuelve un       Usuario
                                             producto por su   autenticado
                                             ID.               

  `POST`            `/api/products/create`   Crea un producto. Administrador

  `PUT`             `/api/products/:id`      Actualiza uno o   Administrador
                                             más campos de un  
                                             producto.         

  `DELETE`          `/api/products/:id`      Elimina un        Administrador
                                             producto.    

  ------------------------------------------------------------------------------

#### Consultar todos los productos

``` http
GET /api/products
Authorization: Bearer TOKEN_JWT
```

#### Consultar un producto por ID

``` http
GET /api/products/ID_DEL_PRODUCTO
Authorization: Bearer TOKEN_JWT
```

#### Crear un producto

``` http
POST /api/products/create
Authorization: Bearer TOKEN_JWT
Content-Type: application/json
```

``` json
{
  "name": "Gomitas Frutales",
  "price": 1400,
  "description": "Gomitas de frutas surtidas"
}
```

El nombre y el precio son obligatorios. El precio debe ser un número
mayor que cero.

#### Actualizar un producto

``` http
PUT /api/products/ID_DEL_PRODUCTO
Authorization: Bearer TOKEN_JWT
Content-Type: application/json
```

``` json
{
  "price": 1500
}
```

Se debe enviar al menos un campo para actualizar. Los campos no enviados
conservan sus valores actuales.

#### Eliminar un producto

``` http
DELETE /api/products/ID_DEL_PRODUCTO
Authorization: Bearer TOKEN_JWT
```

## Autenticación y autorización

El inicio de sesión valida las credenciales configuradas en `.env`. Si
son correctas, genera un JWT firmado con `JWT_SECRET` y con una duración
de una hora.

El middleware `authMiddleware` verifica el token recibido en el
encabezado `Authorization` y almacena la información del usuario
autenticado en `req.user`.

El middleware `authorizeRole` comprueba si el rol del usuario permite
realizar la operación solicitada.

  Operación                    `admin`   `user`
  --------------------------- --------- --------
  Consultar productos            Sí        Sí
  Consultar producto por ID      Sí        Sí
  Crear productos                Sí        No
  Actualizar productos           Sí        No
  Eliminar productos             Sí        No

## Manejo de errores

La API contempla los siguientes códigos de estado HTTP:

  -----------------------------------------------------------------------
  Código                  Significado             Ejemplo
  ----------------------- ----------------------- -----------------------
  `400`                   Bad Request             Faltan datos
                                                  obligatorios o los
                                                  datos enviados no son
                                                  válidos.

  `401`                   Unauthorized            No se envió un token,
                                                  el token es inválido o
                                                  las credenciales son
                                                  incorrectas.

  `403`                   Forbidden               El usuario autenticado
                                                  no tiene permisos para
                                                  realizar la operación.

  `404`                   Not Found               La ruta o el producto
                                                  solicitado no existe.

  `500`                   Internal Server Error   Ocurrió un error
                                                  inesperado en el
                                                  servidor o al acceder a
                                                  un servicio externo.
                                                  
  -----------------------------------------------------------------------

Los errores inesperados de los controladores se envían mediante
`next(error)` al middleware centralizado `errorMiddleware`.

### Ruta de prueba del error 500

Se incluye el endpoint `GET /test-error` para comprobar el
funcionamiento del middleware centralizado de errores.

``` http
GET /test-error
```

La ruta responde con estado `500` y un mensaje de prueba. No requiere
token. Se conserva para facilitar la verificación del proyecto durante
la evaluación.

## Pruebas

Los endpoints pueden probarse con herramientas como **Thunder Client** o
**Postman**. En este caso, utilicé Thunder Client (extension presente en VS code)

Para probar las rutas protegidas:

1.  Ejecutar `POST /auth/login` con las credenciales configuradas.
2.  Copiar el token devuelto.
3.  En las solicitudes a `/api/products`, configurar el encabezado
    `Authorization` con el formato `Bearer TOKEN_JWT`.
4.  Para probar las operaciones de escritura, iniciar sesión con el
    usuario administrador.
5.  Para comprobar los permisos, iniciar sesión con el usuario `client`
    e intentar crear, actualizar o eliminar un producto. La API debe
    responder `403`.

También se pueden comprobar los errores `400`, `401`, `404` y `500`
mediante solicitudes con datos incompletos, sin token, identificadores o
rutas inexistentes y el endpoint `/test-error`, respectivamente.

------------------------------------------------------------------------

**Objetivo:** El objetivo del proyecto es desarrollar una API REST utilizando Node.js y Express para administrar un catálogo de productos, implementar operaciones CRUD mediante los métodos HTTP (GET, POST, PUT y DELETE), almacenar y gestionar los datos en Firebase Firestore y proteger las rutas mediante autenticación JWT y autorización por roles. Además, se busca aplicar una arquitectura en capas y gestionar los errores mediante los correspondientes códigos de estado HTTP.
