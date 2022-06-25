import { ref, set, db, auth, onAuthStateChanged } from "./config.js";

const add = document.getElementById("btnAdd");

onAuthStateChanged(auth, (user) => {
	if (user) {
    
    
		add.addEventListener("click", () => {
			const item = document.getElementById("item").value;
      const uid = user.uid;
      const d = new Date();
      var time = d.getTime();
      console.log(time)

			set(ref(db, "cart/" + uid + "/" + time), {
				name: item,
			}).then(() => {
			alert("data inserted");
		})
		.catch((error) => {
			alert(error);
		});
		});
		// ...
	} else {
		// User is signed out
		// ...
		console.log("no user");
	}
});
