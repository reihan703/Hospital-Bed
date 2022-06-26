import { auth, signOut, onAuthStateChanged } from "./config.js";

// SIGNOUT BTN
const outBtn = document.getElementById("btnSignout");

outBtn.addEventListener("click", () => {
	signOut(auth)
		.then(() => {
			// Sign-out successful.
			window.location.href = "../html/login.html";
		})
		.catch((error) => {
			// An error happened.
			alert("failed");
		});
});
