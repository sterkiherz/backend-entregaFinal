/* --------------------------
-REQUERIMIENTOS-

Requerimiento 1: Configuración inicial
-Crear el directorio del proyecto	
-Crear index.js	    
-Inicializar Node.js con npm	
-Configurar "type": "module"	
-Crear el script start      

Requerimiento 2: Instalación de dependencias
- express
- cors
- body-parser
- dotenv
- firebase (adicionalmente instalé y utilicé firebase-admin*)
- jsonwebtoken

...............................................................
* firebase vs firebase admin:
Firebase SDK (firebase)
Está pensado principalmente para aplicaciones cliente, como sitios web y aplicaciones móviles.
- Se conecta utilizando la configuración de una aplicación Firebase.
- Respeta las reglas de seguridad de Firestore.
- Permite autenticar usuarios finales con Firebase Authentication.

Firebase Admin SDK (firebase-admin)
Está pensado para entornos de servidor, como mi backend Node.js.
- Se conecta mediante una cuenta de servicio.
- Permite administrar Firestore desde el servidor.
- Tiene privilegios elevados y no depende de las reglas de seguridad de Firestore.

Asi que elegi firebase-admin para mi backend porque necesito un acceso completo a la base de datos y no quiero depender de las reglas de seguridad del cliente. Esto me permite realizar operaciones administrativas, como crear, actualizar y eliminar documentos, sin restricciones.
...............................................................


Requerimiento 3: configuración del servidor 
-Servidor Express funcionando.
-CORS configurado.
-Body-parser configurado.
-Variables de entorno configuradas.
-Middleware 404 comprobado.

Requerimiento 4: Rutas implementadas
 Método	    Endpoint	            Función	Estado
 GET	    /api/products	        Obtener todos los productos	
 GET	    /api/products/:id	    Obtener un producto	
 POST	    /api/products/create	Crear un producto	
 DELETE	    /api/products/:id	    Eliminar un producto	
 POST	    /auth/login	            Autenticar usuarios	
 PUT	    /api/products/:id	    Actualizar un producto	

Requerimiento 5: Controladores y Servicios
- Los controladores reciben las solicitudes, validan los datos y generan las respuestas. Los servicios contienen la lógica de negocio y se comunican con los modelos.

Requerimiento 6: Acceso a los datos
- Proyecto creado en Firebase.
- Base de datos Firestore configurada.
- Colección products.
- Documento inicial creado manualmente.
- Conexión mediante Firebase Admin SDK.
- Archivo config/firebase.js.
- Modelo products.model.js.
- Métodos para consultar, crear, actualizar y eliminar documentos.
- Servicios conectados con los modelos.

Requerimiento 7: Protección de rutas
- JWT mediante jsonwebtoken.
- Middleware authMiddleware.
- Middleware authorizeRole.
- Login con validación de credenciales.
- Generación de tokens con vencimiento de una hora.
- Diferenciación entre usuarios administradores y clientes.

----------------------------- */









// Importaciones
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { errorMiddleware } from "./middlewares/error.middleware.js";
import productsRoutes from "./routes/products.routes.js";
import authRoutes from "./routes/auth.routes.js";


// Cargar variables de entorno
dotenv.config();

// Crear aplicación Express
const app = express();

// Configurar middlewares globales
app.use(cors());
app.use(bodyParser.json());


// Ruta de prueba para verificar el middleware de errores (HTTP 500)
app.get("/test-error", (_req, _res, next) => {
    const error = new Error("Error interno de prueba");
    error.status = 500;
    next(error);
});
/*------------------
_req: solicitud, no utilizada.
_res: respuesta, no utilizada.
next: permite pasar el error al middleware centralizado.

Los mantengo porque express los necesita en el orden correcto (req, res, next) para que pueda reconocerlo como un middleware de manejo de errores. Si no se incluyen los tres parámetros, Express no lo tratará como un middleware de manejo de errores y no funcionará correctamente.
------------------*/


// Rutas de la aplicación
app.use("/api/products", productsRoutes);
app.use("/auth", authRoutes);

// Middleware para rutas inexistentes (404)
app.use((req, res) => {
    res.status(404).json({
        error: "Ruta no encontrada"
    });
});

app.use(errorMiddleware);

// Iniciar servidor
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
