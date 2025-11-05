// Configuración de Firebase (placeholder)
// Reemplaza con tu configuración real de Firebase

const firebaseConfig = {
    apiKey: "tu-api-key-aqui",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "tu-sender-id",
    appId: "tu-app-id"
};

// Nota: Para usar Firebase real, descomenta las siguientes líneas:
/*
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Ejemplo de función para cargar datos
async function loadFirebaseData() {
    try {
        const querySnapshot = await getDocs(collection(db, "metrics"));
        querySnapshot.forEach((doc) => {
            console.log("Datos de Firebase:", doc.id, " => ", doc.data());
        });
    } catch (error) {
        console.error("Error cargando datos de Firebase:", error);
    }
}
*/

console.log('Firebase config cargado (modo demo)');
