
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzRl1n37t51ElgkFIr9QQvY0Q6VNG1u04",
  authDomain: "quotes-app-9b456.firebaseapp.com",
  projectId: "quotes-app-9b456",
  storageBucket: "quotes-app-9b456.firebasestorage.app",
  messagingSenderId: "199115399958",
  appId: "1:199115399958:web:7201dedb2ad6810027a637",
  measurementId: "G-512SYBKFHM"
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

const quotesCollection = collection(db, "quotes");
export { app, db, analytics,quotesCollection, getDocs, addDoc  };