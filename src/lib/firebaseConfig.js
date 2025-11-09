// lib/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase config from environment variables. Set these in .env:
// REACT_APP_FIREBASE_API_KEY, REACT_APP_FIREBASE_AUTH_DOMAIN,
// REACT_APP_FIREBASE_PROJECT_ID, REACT_APP_FIREBASE_STORAGE_BUCKET,
// REACT_APP_FIREBASE_MESSAGING_SENDER_ID, REACT_APP_FIREBASE_APP_ID

const firebaseConfig = {
    apiKey: "AIzaSyDnBIQ42thRE1EMNXi0_k4SqCGwwwhJWZw",
    authDomain: "gallery-f8df4.firebaseapp.com",
    projectId: "gallery-f8df4",
    storageBucket: "gallery-f8df4.firebasestorage.app",
    messagingSenderId: "279586393057",
    appId: "1:279586393057:web:f507ce685d3b350e7ba0a0"
};

if (!firebaseConfig.apiKey) {
 console.warn('Firebase config missing. Make sure to set REACT_APP_FIREBASE_* env vars.');
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
