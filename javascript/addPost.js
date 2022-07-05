import {
	auth,
	onAuthStateChanged,
	db,
	set,
	ref,
	child,
	get,
} from "./config.js";

const addPost = (id, hospitalName) => {
	// CONNECT TO TH ELEMENT
	const input = document.getElementById("inputPost");
	const reviewFrom = document.getElementById("userReview");
	// CREATE THE BUTTON FOR SUBMIT
	let html = "";
	html = `<a class="btn btn-outline-primary btn-sm my-3" style="min-width: 200px;" role="button" id="submitPost">Post</a>`;
	// ADD THE CREATED BUTTON TO THE FORM
	reviewFrom.insertAdjacentHTML("beforeend", html);
	const btn = document.getElementById('submitPost')
	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			const uid = user.uid;
			const name = user.displayName;
			var dbRef = ref(db);
			// CHECK WHETHER THE USER HAS A POST FOR THAT PARTICULAR HOSPITAL
			const checkData = () => {
				get(child(dbRef, "hospitals/" + id + "/" + uid))
					.then((snapshot) => {
						// IF IT DOESNT EXISTS, THE USER CAN CREATE A POST
						if (!snapshot.exists()) {
							set(ref(db, "hospitals/" + id + "/" + uid), {
								display_name: name,
								review: input.value,
								hospital: hospitalName
							})
								.then(() => {
									alert("Review Posted");
								})
								.catch((error) => {
									alert(error);
								});
							return;
						} else {
							// STOP THE USER FROM POSTING IF EXIST
							alert("Your post is exists");
							return;
						}
					})
					.catch((error) => {
						alert(error);
					});
			};
			btn.addEventListener("click", checkData, true);
			// ...
		} else {
			alert("You're logged out");
		}
	});
};

const useAddPost = () => {
	return { addPost };
};

export { useAddPost };
