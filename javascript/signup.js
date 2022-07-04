import {
	auth,
	createUserWithEmailAndPassword,
	updateProfile,
} from "./config.js";

// SIGNUP BUTTON
const signup = () => {
	const createBtn = document.getElementById("btnCreateAcc");

	createBtn.addEventListener("click", (e) => {
		e.preventDefault();
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// const name = document.getElementById("nameInput").value;
				const user = userCredential.user;
				// updateProfile(auth.currentUser, {
				// 	displayName: name,
				// }).catch((error)=>{
				// 	console.log(error.message)
				// 	alert(error.message)
				// });
				// console.log(document.getElementById("nameInput").value);
				return updateProfile(user, {
					displayName: document.getElementById("nameInput").value
				}).then(()=>{
					window.location.href = "./home.html";
				})
				// console.log("created");
				// alert("Account created")
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// ..
				console.log(errorCode + errorMessage);
				// alert(errorMessage)
			});
	});
}
// END SIGNUP

const useSignup = () => {
	return {signup}
}

export {useSignup}
