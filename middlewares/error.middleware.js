/*----------
Qué hace
- err: contiene el error que ocurrió.
- req: contiene la solicitud del cliente.
- res: permite enviar la respuesta.
- next: permite pasar el error a otro middleware, si fuera necesario.
- console.error(): muestra los detalles del error en la consola.
- err.status || 500: utiliza el código de estado del error o, si no tiene uno, devuelve un 500.


ERRORES HTTP MÁS COMUNES
Código	Significado
400	    Bad Request -	La solicitud tiene datos faltantes o incorrectos.
401	    Unauthorized -	No se proporcionó un token válido o las credenciales son incorrectas.
403	    Forbidden -	El usuario está autenticado, pero no tiene permiso para realizar la acción.
404	    Not Found -	La ruta o el producto solicitado no existe.
500	    Internal Server Error -	Ocurrió un error interno del servidor.

Donde usé estos códigos de error
401 --> en el middleware JWT y el login.
404 --> en las rutas y en la búsqueda de productos.
500 --> en los controladores y el middleware de errores.

----------*/


export const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        error: err.message || "Error interno del servidor"
    });
};