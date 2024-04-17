import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBL2-eOyspcJbg8ZGjGJUywg_NGo_xr8d0",
  authDomain: "fir-course-20135.firebaseapp.com",
  projectId: "fir-course-20135",
  storageBucket: "fir-course-20135.appspot.com",
  messagingSenderId: "332920027316",
  appId: "1:332920027316:web:e15e4d2be7682c05397fe1",
  measurementId: "G-LXS65PFHGH"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
