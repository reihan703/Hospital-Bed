import { auth, signInWithEmailAndPassword } from "./config.js";

const login = () => {
	const loginBtn = document.getElementById("btnLogin");

	loginBtn.addEventListener("click", function (e) {
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

}

const useLogin = () => {
	return {login}
}

export {useLogin}