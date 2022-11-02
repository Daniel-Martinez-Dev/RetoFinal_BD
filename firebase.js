// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAV9OMmHavHYoU6joAeyRSoFxybWqcW3so",
    authDomain: "retofinaldb.firebaseapp.com",
    projectId: "retofinaldb",
    storageBucket: "retofinaldb.appspot.com",
    messagingSenderId: "128583622015",
    appId: "1:128583622015:web:ded5346da530798e290e4a"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

//--------------------------------------------ESTUDIANTE------------------------------------------------------------------------

export const saveEstudiante = (nombre,apellido) => addDoc(collection(db, "Estudiantes"), {nombre,apellido });

export const onGetEstudiantes = (callback) => onSnapshot(collection(db, "Estudiantes"), callback);

export const deleteEstudiante = (id) => deleteDoc(doc(db, "Estudiantes", id));

export const getEstudiante = (id) => getDoc(doc(db, "Estudiantes", id));

export const updateEstudiante = (id, newFields) => updateDoc(doc(db, "Estudiantes", id), newFields);

//--------------------------------------------CLASE------------------------------------------------------------------------

export const saveClase = (titulo, descripcion) => addDoc(collection(db, "Clases"), { titulo, descripcion });

export const onGetClases = (callback) => onSnapshot(collection(db, "Clases"), callback);

export const deleteClase = (id) => deleteDoc(doc(db, "Clases", id));

export const getClase = (id) => getDoc(doc(db, "Clases", id));

export const updateClase = (id, newFields) => updateDoc(doc(db, "Clases", id), newFields);

//--------------------------------------------MATRICULA------------------------------------------------------------------------

export const saveMatricula = (Id_estudiante, Id_clase) => addDoc(collection(db, "Matriculas"), { Id_estudiante, Id_clase });

export const onGetMatriculas = (callback) => onSnapshot(collection(db, "Matriculas"), callback);

export const deleteMatricula = (id) => deleteDoc(doc(db, "Matriculas", id));

export const getMatricula = (id) => getDoc(doc(db, "Matriculas", id));

export const updateMatricula = (id, newFields) => updateDoc(doc(db, "Matriculas", id), newFields);