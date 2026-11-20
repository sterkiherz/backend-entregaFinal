
// Gestiona el inicio de sesión
/*-----------
Errores:
- Si falta el usuario o la contraseña, devuelve 400.
- Si ambos campos están presentes, pero las credenciales son incorrectas, devuelve 401.
- Si ocurre un error inesperado, devuelve 500.
-----------*/


import * as authService from "../services/auth.service.js";

// Iniciar sesión
export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Valida que se hayan enviado las credenciales
        if (!username || !password) {
            return res.status(400).json({
                error: "El usuario y la contraseña son obligatorios"
            });
        }

        // Valida las credenciales y generar el token
        const token = await authService.login(username, password);

        if (!token) {
            return res.status(401).json({
                error: "Credenciales incorrectas"
            });
        }

        // Devuelve el token si la autenticación fue exitosa
        res.status(200).json({
            message: "Autenticación exitosa",
            token: token
        });

    } catch (error) {
        const customError = new Error("Error durante la autenticación");
        customError.status = 500;
        next(customError);
    }
};



