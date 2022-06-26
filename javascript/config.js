// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";

import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	updateProfile,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

import {
	getDatabase,
	ref,
	set,
	child,
	update,
	remove,
	get,
	onValue,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBn6_1ev47gRJSeH2cD0IHSmJu5oG_xUpk",
	authDomain: "hospitalbed-cc609.firebaseapp.com",
	projectId: "hospitalbed-cc609",
	storageBucket: "hospitalbed-cc609.appspot.com",
	messagingSenderId: "273820684139",
	appId: "1:273820684139:web:c78731181216a7133bc62e",
	measurementId: "G-Q67WQ1MJWN",
	databaseURL:
		"https://hospitalbed-cc609-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export {
	ref,
	set,
	child,
	update,
	remove,
	get,
	onValue,
	db,
	auth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	updateProfile,
};
