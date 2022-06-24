import {
	auth,
	createUserWithEmailAndPassword,
} from "./config.js";

const createBtn = document.getElementById("btnCreateAcc");

createBtn.addEventListener("click", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			console.log("created");
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ..
			console.log(errorCode + errorMessage);
			alert("password should be at least 6 characters")
		});
})