// ============================================================
//  FIREBASE CONFIG — Imagen Radiológica Diagnóstica S.A.S
//  Proyecto: modulo-citas-pacientes
// ============================================================

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyDeh9_bFkyyP2IIRyFVAr6mtXwU3WB0jnQ",
  authDomain:        "modulo-citas-pacientes.firebaseapp.com",
  projectId:         "modulo-citas-pacientes",
  storageBucket:     "modulo-citas-pacientes.firebasestorage.app",
  messagingSenderId: "768368783995",
  appId:             "1:768368783995:web:09db7bb4afc132e52de8de",
  measurementId:     "G-YXF7ELZH47"
};

// Firebase está configurado → activa la nube automáticamente
const FIREBASE_ENABLED = !FIREBASE_CONFIG.apiKey.includes("PEGA_AQUI");
