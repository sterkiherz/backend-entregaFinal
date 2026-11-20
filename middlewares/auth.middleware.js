/*---------
Qué hace este middleware
- req.headers.authorization: obtiene el encabezado donde el cliente envía el token.
- jwt.verify(): comprueba que el token sea válido y que no haya expirado.
- req.user: guarda la información del usuario contenida en el token.
- next(): permite continuar hacia el controlador si la autenticación fue exitosa.
- 401: devuelve un error si no se proporciona un token válido.
---------*/


import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    // Obtener el token del encabezado Authorization
    const authHeader = req.headers.authorization;

    // Comprobar que se haya enviado un token
    if (!authHeader) {
        return res.status(401).json({
            error: "No se proporcionó un token de autenticación"
        });
    }

    // Separar la palabra Bearer del token
    const token = authHeader.split(" ")[1];

    try {
        // Verificar que el token sea válido
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Guardar los datos del usuario en la solicitud
        req.user = decoded;

        // Continuar con la siguiente función
        next();

    } catch (error) {
        return res.status(401).json({
            error: "Token inválido o expirado"
        });
    }
};

/*----------
Cómo funciona
- allowedRoles recibe los roles autorizados para una ruta.
- req.user.role consulta el rol que viene dentro del token JWT.
- Si el rol no está autorizado, devuelve un error 403 Forbidden.
- Si tiene permiso, ejecuta next() y continúa con la solicitud.
----------*/
export const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                error: "No tenés permisos para realizar esta acción"
            });
        }

        next();
    };
};