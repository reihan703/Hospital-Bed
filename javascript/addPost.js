import {
	auth,
	onAuthStateChanged,
	db,
	set,
	ref,
	child,
	get,
} from "./config.js";

const addPost = (id) => {
	const input = document.getElementById("inputPost");
	const btn = document.getElementById("submitPost");
	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			const uid = user.uid;
			const name = user.displayName;
			var dbRef = ref(db);
			const checkData = () => {
				get(child(dbRef, "hospitals/" + id + "/" + uid))
					.then((snapshot) => {
						if (!snapshot.exists()) {
							set(ref(db, "hospitals/" + id + "/" + uid), {
								display_name: name,
								review: input.value,
							})
								.then(() => {
									alert("Review Posted");
                  location.reload()
								})
								.catch((error) => {
									alert(error);
								});
							return;
						} else {
							alert("Your post is exists");
              location.reload()
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
