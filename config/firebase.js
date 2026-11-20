
// Importar funciones de Firebase Admin
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Leer las credenciales de Firebase
import { readFileSync } from "node:fs";

const serviceAccount = JSON.parse(
    readFileSync(
        new URL("./serviceAccountKey.json", import.meta.url),
        "utf8"
    )
);

// Inicializar Firebase
const firebaseApp = initializeApp({
    credential: cert(serviceAccount)
});

// Obtener la conexión con Firestore
const db = getFirestore(firebaseApp);

// Exportar la base de datos para utilizarla en otros archivos
export default db;
