import {onValue, ref, db, } from './config.js'

const showPosts = (id) => {
  const dbRef = ref(db, "hospitals/"+ id);
  onValue(dbRef, (snapshot) => {
    try {
      var posts = [];
      // console.log(snapshot);
      snapshot.forEach((childSnap) => {
        posts.push(childSnap.val());
      });
      console.log(posts);
    } catch (error) {
      console.log(error)
      alert("Failed to retrieve posts")
    }
    
  });
}

const useShowPosts = () => {
  return {showPosts}
}

export {useShowPosts}