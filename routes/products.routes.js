import { Router } from "express";

import {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
} from "../controllers/products.controller.js";

import {
    authMiddleware,
    authorizeRole
} from "../middlewares/auth.middleware.js";

const router = Router();

// Proteger todas las rutas de productos
//(Al colocarla antes de las rutas, Express ejecutará el middleware de autenticación antes de permitir el acceso a cualquiera de ellas.)
router.use(authMiddleware);

// Consultas: disponibles para cualquier usuario autenticado---
// Obtener todos los productos
router.get("/", getProducts);
// Obtener un producto por ID
router.get("/:id", getProductById);


// Modificaciones: exclusivas del administrador---
// Crear un producto
router.post("/create", authorizeRole("admin"), createProduct);
// Eliminar un producto
router.delete("/:id", authorizeRole("admin"), deleteProduct);
// Actualizar un producto
router.put("/:id", authorizeRole("admin"), updateProduct);

export default router;
