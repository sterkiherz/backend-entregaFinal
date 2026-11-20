// 	Gestiona las peticiones relacionadas con productos



import * as productsService from "../services/products.service.js";

// Obtener todos los productos
export const getProducts = async (req, res, next) => {
    try {
        const products = await productsService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        const customError = new Error("Error al obtener los productos");
        customError.status = 500;
        next(customError);
    }
};

// Obtener un producto por ID
export const getProductById = async (req, res, next) => {
    try {
        const product = await productsService.getProductById(req.params.id);

        if (!product) {
            return res.status(404).json({
                error: "Producto no encontrado"
            });
        }

        res.status(200).json(product);

    } catch (error) {
        const customError = new Error("Error al obtener el producto");
        customError.status = 500;
        next(customError);
    }
};

// Crear un producto
/*------------------
Qué estoy validando
- name: que el producto tenga un nombre.
- price: que se haya enviado un precio.
- typeof price !== "number": que el precio sea numérico.
- price <= 0: que el precio sea mayor que cero.
- description: es opcional; si no se proporciona, guarda una cadena vacía.
------------------*/

export const createProduct = async (req, res, next) => {
    try {
        const { name, price, description } = req.body;

        // validar nombre y precio
        if (!name || price === undefined || price === null) {
            return res.status(400).json({
                error: "El nombre y el precio del producto son obligatorios"
            });
        }

        // validar que precio sea un número mayor que cero
        if (typeof price !== "number" || price <= 0) {
            return res.status(400).json({
                error: "El precio debe ser un número mayor que cero"
            });
        }

        const newProduct = await productsService.createProduct({
            name,
            price,
            description: description || ""
        });

        res.status(201).json({
            message: "Producto creado correctamente",
            product: newProduct
        });

    } catch (error) {
        const customError = new Error("Error al crear el producto");
        customError.status = 500;
        next(customError);
    }
};

// Eliminar un producto
export const deleteProduct = async (req, res, next) => {
    try {
        const deleted = await productsService.deleteProduct(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                error: "Producto no encontrado"
            });
        }

        res.status(200).json({
            message: "Producto eliminado correctamente"
        });

    } catch (error) {
        const customError = new Error("Error al eliminar el producto");
        customError.status = 500;
        next(customError);
    }
};

// Actualizar un producto
/*------------------
- Recibe el ID desde la URL (req.params.id).
- Recibe los nuevos datos desde el cuerpo de la solicitud (req.body).
- Valida que haya al menos un campo para actualizar.
- Comprueba que el precio sea válido si se proporciona.
- Si el producto no existe, devuelve un error 404.
- Si todo sale bien, devuelve 200.
------------------*/

export const updateProduct = async (req, res, next) => {
    try {
        const { name, price, description } = req.body;

        if (
            name === undefined &&
            price === undefined &&
            description === undefined
        ) {
            return res.status(400).json({
                error: "Debes proporcionar al menos un campo para actualizar"
            });
        }

        if (price !== undefined && (typeof price !== "number" || price <= 0)) {
            return res.status(400).json({
                error: "El precio debe ser un número mayor que cero"
            });
        }

        const updatedProduct = await productsService.updateProduct(
            req.params.id,
            req.body
        );

        if (!updatedProduct) {
            return res.status(404).json({
                error: "Producto no encontrado"
            });
        }

        res.status(200).json({
            message: "Producto actualizado correctamente",
            product: updatedProduct
        });

    } catch (error) {
        const customError = new Error("Error al actualizar el producto");
        customError.status = 500;
        next(customError);
    }
};