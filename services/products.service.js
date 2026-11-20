// Importa todas las funciones exportadas por mi modelo y las agrupa bajo el nombre productsModel
import * as productsModel from "../models/products.model.js";

// Obtener todos los productos
export const getAllProducts = async () => {
    return await productsModel.getAllProducts();
};

/* ------
Cuando alguien solicita todos los productos:
1. El controlador llama a getAllProducts() del servicio.
2. El servicio llama a getAllProducts() del modelo.
3. El modelo consulta Firestore.
4. El resultado vuelve al servicio y después al controlador.
-------*/


// Obtener un producto por ID
export const getProductById = async (id) => {
    return await productsModel.getProductById(id);
};

// Crear un producto
export const createProduct = async (productData) => {
    return await productsModel.createProduct(productData);
};

// Eliminar un producto
export const deleteProduct = async (id) => {
    return await productsModel.deleteProduct(id);
};

// Actualizar un producto
/*------
-Recibe el ID del producto y sus nuevos datos.
-Llama a updateProduct del modelo.
-Devuelve el resultado de la operación.
------*/
export const updateProduct = async (id, productData) => {
    return await productsModel.updateProduct(id, productData);
};