import {
	auth,
	createUserWithEmailAndPassword,
	updateProfile,
} from "./config.js";

// SIGNUP BUTTON
const createBtn = document.getElementById("btnCreateAcc");

createBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const name = document.getElementById("name").value;
			const user = userCredential.user;
			updateProfile(auth.currentUser, {
				displayName: name,
			}).catch((error)=>{
				console.log(error.message)
			});
			console.log("created");
			alert("Account created")
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
// END SIGNUP

