import { initializeApp } from "firebase/app";
import { initializeAuth, indexedDBLocalPersistence, browserLocalPersistence, inMemoryPersistence,
         createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,
         signOut, onAuthStateChanged, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore/lite";
window.FirebaseSDK = { initializeApp, initializeAuth, indexedDBLocalPersistence, browserLocalPersistence, inMemoryPersistence,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged,
  deleteUser, EmailAuthProvider, reauthenticateWithCredential, getFirestore, doc, getDoc, setDoc, deleteDoc, serverTimestamp };
