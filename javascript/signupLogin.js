import {
	auth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "./config.js";

// SIGNUP BUTTON
const createBtn = document.getElementById("btnCreateAcc");

createBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			console.log("created");
			alert("Created")
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ..
			console.log(errorCode + errorMessage);
			alert("password should be at least 6 characters")
		});
});
// END SIGNUO

// LOGIN BUTTON
const loginBtn = document.getElementById("btnLogin");

loginBtn.addEventListener("click", (e) => {
	e.preventDefault();
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			console.log("Logged in");
			window.location.href = "home.html";
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ..
			console.log(errorCode + errorMessage);
			alert("Check again");
		});
});
// END LOGIN


