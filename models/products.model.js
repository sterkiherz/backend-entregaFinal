// Este archivo sera responsable de interactuar con Firestore


/* --------------------------
Firestore organiza los datos mediante colecciones y documentos:

products (coleccion)
|-producto_1 (documento)
|-producto_2 (documento)
|-producto_3 (documento)


Un documento podría contener:
{
    "name": "Teclado mecanico",
    "price": 45000,
    "category": "Perifericos"
}


Cada documento representa un producto y tiene un identificador unico generado por Firestore!

----------------------------- */



import db from "../config/firebase.js";

// Referencia a la colección de productos
const productsCollection = db.collection("products");

// Obtener todos los productos
export const getAllProducts = async () => {
    const snapshot = await productsCollection.get();

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

// Obtener un producto por ID
export const getProductById = async (id) => {
    const doc = await productsCollection.doc(id).get();

    if (!doc.exists) {
        return null;
    }

    return {
        id: doc.id,
        ...doc.data()
    };
};

// Crear un producto
export const createProduct = async (productData) => {
    const docRef = await productsCollection.add(productData);

    return {
        id: docRef.id,
        ...productData
    };
};

// Eliminar un producto
export const deleteProduct = async (id) => {
    const docRef = productsCollection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
        return false;
    }

    await docRef.delete();

    return true;
};

// actualizar producto
export const updateProduct = async (id, productData) => {
    const docRef = productsCollection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
        return null;
    }

    await docRef.update(productData);

    return {
        id: doc.id,
        ...doc.data(),
        ...productData
    };
};