// Importar funciones de Firebase Admin
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Cargar las variables de entorno del archivo .env
import "dotenv/config";

// Leer las credenciales de Firebase desde un archivo local
import { readFileSync } from "node:fs";

let serviceAccount;

// Obtener las credenciales de Firebase
// En Vercel se utiliza una variable de entorno.
// En el entorno local se utiliza el archivo JSON.
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
    serviceAccount = JSON.parse(
        readFileSync(
            new URL("./serviceAccountKey.json", import.meta.url),
            "utf8"
        )
    );
}

// Inicializar Firebase con las credenciales obtenidas
const firebaseApp = initializeApp({
    credential: cert(serviceAccount)
});

// Obtener la conexión con Firestore
const db = getFirestore(firebaseApp);

// Exportar la base de datos para utilizarla en otros archivos
export default db;