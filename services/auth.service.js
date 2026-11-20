/* ------
Qué hace este servicio
1. Validar las credenciales: compara el usuario y la contraseña recibidos con los valores configurados en mi archivo .env.
2. Generar el token: si las credenciales son correctas, utiliza jsonwebtoken para crear un JWT que tendrá una duración de una hora.
Si las credenciales son incorrectas, devuelve null.
-------*/


import jwt from "jsonwebtoken";

// Validar credenciales y generar token
export const login = async (username, password) => {
    let role;
    // Comprobar las credenciales del usuario (diferencia entre admin y usuario comun que puede ver pero no modficar productos)
    if (
        username === process.env.ADMIN_USER &&
        password === process.env.ADMIN_PASSWORD
    ) {
        role = "admin"; //asigna rol de administrador
    } else if (
        username === process.env.USER_USER &&
        password === process.env.USER_PASSWORD
    ) {
        role = "user"; //asigna rol de usuario comun
    } else {
        return null;
    }
    // Generar el token JWT
    const token = jwt.sign(
        { username, role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return token;
};
