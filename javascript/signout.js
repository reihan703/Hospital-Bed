import { auth, signOut } from "./config.js";

const signout = () => {
	// SIGNOUT BTN
	const outBtn = document.getElementById("logout");

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
}

const useSignout = () => {
	return {signout}
}

export {useSignout}

