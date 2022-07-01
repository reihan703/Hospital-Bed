import { auth, onAuthStateChanged, db, set, ref, child, get, onValue } from "./config.js";

const addPost = (id) => {
  const input = document.getElementById("inputPost");
  const btn = document.getElementById("submitPost");
  onAuthStateChanged(auth, (user) => {
    
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      const name = user.displayName
      var dbRef = ref(db)
      var dbRef2 = ref(db, "hospitals/" + id + "/" + uid)
      const checkData = () => {
      get(child(dbRef, "hospitals/" + id))
      .then((snapshot) => {
        if (!snapshot.exists()) {
          // alert(
          //   "You have a review for this hospital already, go to Your Post to update it"
          // );
          set(ref(db, "hospitals/" + id + "/" + uid), {
						display_name: name,
						review: input.value,
					})
						.then(() => {
							alert("Review Posted");
              location.reload();
						})
						.catch((error) => {
							alert(error);
						});
          return;
        } else {
          alert('Your post is exists')
          location.reload();
          return;
          // set(ref(db, "hospitals/" + id + "/" + uid), {
					// 	display_name: name,
					// 	review: input.value,
					// })
					// 	.then(() => {
					// 		alert("Review Posted");
					// 	})
					// 	.catch((error) => {
					// 		alert(error);
					// 	});
        }
      })
      .catch((error) => {
        alert(error);
      });
    }
      btn.addEventListener('click', checkData)
      // ...
    } else {
      alert("No account logged in")
    }
  });

  // let userSession = auth.currentUser;
  // let dbRef = ref(db, "hospitals/" + id );
  // btn.addEventListener("click", ()=>{
  //   onValue(dbRef, (snapshot)=>{
  //     let userID = snapshot.val()
  //     for (let i in userID){
  //       if (userID[i]==userSession.uid){
  //         console.log('exists')
  //       }else{
  //         console.log('not exists');
  //       }
  //     }
  //   })
  // })
  
}

const useAddPost = () => {
  return {addPost}
}

export {useAddPost}