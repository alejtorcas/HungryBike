import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";

// CREDENCIALES DE FIREBASE
const FirebaseConfig = {
    apiKey: "AIzaSyAr4tDH4dffk5WJG32SQRyLdzFYZrNuOSg",
    authDomain: "hungrybike-f795a.firebaseapp.com",
    projectId: "hungrybike-f795a",
    storageBucket: "hungrybike-f795a.appspot.com",
    messagingSenderId: "811541695869",
    appId: "1:811541695869:web:d5a5745282b869ba07d014",
    measurementId: "G-17KBL35TZ9"
}

// INICIALIZACIMOS LA APPLICACION Y LA EXPORTAMOS
const firebaseApp = initializeApp(FirebaseConfig)
const firestore = getFirestore(firebaseApp)

export default firebaseApp