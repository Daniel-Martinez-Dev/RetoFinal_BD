import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";

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
  const app = initializeApp(firebaseConfig);

export const db = getFirestore();


// CLASES
/**
 * Save a New Class in Firestore
 * @param {string} Asignatura_nombre the title of the Task
 * @param {string} Asignatura_Descripción the description of the Task
 */

export const saveClase = (Asignatura_nombre, Asignatura_Descripción) => 
        addDoc(collection(db, "Clase"), { Asignatura_nombre, Asignatura_Descripción });

export const onGetClases = (callback) => 
        onSnapshot(collection(db, "Clase"), callback);


//Estudiante
export const saveEstudiante = (Estudiante_nombres, Estudiante_apellidos) => 
        addDoc(collection(db, "Estudiante"), { Estudiante_nombres, Estudiante_apellidos });

export const onGetEstudiantes = (callback) => 
        onSnapshot(collection(db, "Estudiante"), callback);

/**
 *
 * @param {string} id Task ID
 * @param {string} id Task ID
 */

// CLASES
export const deleteClase = (id) => 
    deleteDoc(doc(db, "Clase", id));

export const getClase = (id) => 
    getDoc(doc(db, "Clase", id));

export const updateClase = (id, newFields) => 
    updateDoc(doc(db, "Clase", id), newFields);

export const getClases = () => 
    getDocs(collection(db, "Clase"));


//Estudiante
export const deleteEstudiante = (id) => 
    deleteDoc(doc(db, "Estudiante", id));

export const getEstudiante = (id) => 
    getDoc(doc(db, "Estudiante", id));

export const updateEstudiante = (id, newFields) => 
    updateDoc(doc(db, "Estudiante", id), newFields);

export const getEstudiantes = () => 
    getDocs(collection(db, "Estudiante"));

//MATRICULAS
export const saveEnrollment = (Id_estudiante, Id_clase) => 
    addDoc(collection(db, "Matriculas"), { Id_estudiante, Id_clase });

export const onGetEnrollments = (callback) => 
    onSnapshot(collection(db, "Matriculas"), callback);

export const deleteEnrollment = (id) => 
    deleteDoc(doc(db, "Matriculas", id));