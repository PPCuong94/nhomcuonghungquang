
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAK-a-2OPXKxIvEIGjdAlbTXBAJ8aZ0BH4",
  authDomain: "webtrungthu.firebaseapp.com",
  projectId: "webtrungthu",
  storageBucket: "webtrungthu.appspot.com",
  messagingSenderId: "888111855823",
  appId: "1:888111855823:web:b427939648633939501fba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;