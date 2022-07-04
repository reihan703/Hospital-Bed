import { auth, onAuthStateChanged, db, ref, onValue } from "./config.js";

const yourPosts = () => {
	const dbRef = ref(db, "hospitals");
  // CONNECT TO THE CONTAINER
	const tablerev = document.getElementById("table-review");
  // CLEAN THE CONTAINER EVERYTIME THE USER REOPEN THE 'YOUR POST' PAGE
	tablerev.innerHTML = "";

	const getPosts = () => {
		onAuthStateChanged(auth, (user) => {
			const uid = user.uid;
			if (user) {
				onValue(dbRef, (snapshot) => {
					var posts = [];
					// VARIABLE FOR DYNAMIC ID
					let counter = 1;

					snapshot.forEach((childSnap) => {
						// LOOP THROUGH ALL CHILD
						childSnap.forEach((child) => {
							// IF THE CHILD KEY IS THE SAME AS UID THEN CREATE HTML ELEMENTS
							if (child.key == uid) {
								let html = "";
								html += `<div class="row d-flex review my-2">
                    <div class="col p-4">
                        <h2>${child.val().hospital}</h2>
                        <div class="form-outline">
                            <label class="form-label" for="textAreaExample${counter}">Review</label>
                            <textarea class="form-control" id="textAreaExample${counter}" rows="4">${
									child.val().review
								}</textarea>
                          </div>
                        <div class="row my-3 mx-3">
                            <div class="col-lg-1 offset-10"><button class="btn btn-warning" id="updateBtn${counter}">Update</button></div>
                            <div class="col-lg-1"><button class="btn btn-danger" id="deleteBtn${counter}">Delete</button></div>
                        </div>
                    </div>
                </div>`;
								tablerev.insertAdjacentHTML("beforeend", html);
							}
							// INCREASE THE DYNAMIC ID
							counter++;
						});
					});
					// console.log(posts);
				});
			} else {
				console.log("Failed to retrieve data");
			}
		});
	};
	getPosts();
};
const useYourPosts = () => {
	return { yourPosts };
};

export { useYourPosts };
