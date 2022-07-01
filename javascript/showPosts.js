import {onValue, ref, db, } from './config.js'

const reviewsSection = document.getElementById('reviews')
function erase() {
  reviewsSection.innerHTML = '';
}

const showPosts = (id) => {
  const dbRef = ref(db, "hospitals/"+ id);
  onValue(dbRef, (snapshot) => {
    try {
      var posts = [];
      // console.log(snapshot);
      snapshot.forEach((childSnap) => {
        posts.push(childSnap.val());
      });
      erase()
      posts.forEach((post)=>{
        let html = '';
        html += '<div class="card w-50" style="min-width:300px"><div class="card-body">';
        html += '<h5 class="card-title">'+post.display_name+'</h5>';
        html += '<p class="card-text">'+post.review+'</p>';
        html += '</div> </div>';

        reviewsSection.insertAdjacentHTML("beforeend", html);
      })
      
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