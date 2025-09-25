import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD8cSB203QfKb-XKc26iKv3-UfYmtnlzPU",
  authDomain: "furadeira-475d9.firebaseapp.com",
  databaseURL: "https://furadeira-475d9-default-rtdb.firebaseio.com",
  projectId: "furadeira-475d9",
  storageBucket: "furadeira-475d9.firebasestorage.app",
  messagingSenderId: "396147605681",
  appId: "1:396147605681:web:4b952f7aed5913bb5b2290",
  measurementId: "G-ZYZNN4WV9Q"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

export{database}