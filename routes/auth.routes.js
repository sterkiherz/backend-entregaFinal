
// Esta ruta recibirá las credenciales del usuario y delegará su validación al controlador login

import { Router } from "express";
import { login } from "../controllers/auth.controller.js";

const router = Router();

// Iniciar sesión
router.post("/login", login);

export default router;

