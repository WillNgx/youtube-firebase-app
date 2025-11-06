import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDnBIQ42thRE1EMNXi0_k4SqCGwwwhJWZw",
    authDomain: "gallery-f8df4.firebaseapp.com",
    projectId: "gallery-f8df4",
    storageBucket: "gallery-f8df4.firebasestorage.app",
    messagingSenderId: "279586393057",
    appId: "1:279586393057:web:f507ce685d3b350e7ba0a0"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
