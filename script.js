const apiUrl = 'http://localhost:3000/api/articles';
let posts = [];

document.addEventListener('DOMContentLoaded', () => {

//navbar toggler 
let navToggler = document.getElementById('navbar-toggler');
let navCollapse = document.querySelector('.navbar-collapse');

navToggler.addEventListener('click', () => {
    navCollapse.classList.toggle('showNav');
});

// category filter 
let filterBtns = document.querySelectorAll('.btns-group button');
let filterImgs = document.querySelectorAll('.imgs-group div');

filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        changeFilterBtn();
        btn.classList.add('btn-active');
        let filterID = btn.id;

        filterImgs.forEach((img) => {
            if(img.classList.contains(filterID)){
                img.style.display = "block";
                window.setTimeout(() => {
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                }, 0);
            } else {
                img.style.opacity = '0';
                img.style.transform = 'scale(0)';
                window.setTimeout(() => {
                    img.style.display = "none";
                }, 0);
            }
        });
    });
});

function changeFilterBtn(){
    filterBtns.forEach((btn) => {
        btn.classList.remove('btn-active');
    });
}

const links = document.querySelectorAll('.navbar-nav .nav-item');

for(const link of links){
    link.addEventListener('click', clickHandler);
}

function clickHandler(e){
    e.preventDefault();
    const href = this.firstElementChild.getAttribute("href");
    document.querySelector(href).scrollIntoView({
        behavior: "smooth"
    });
}
fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Process the data from the API
            console.log('API Data:', data);
            // For simplicity, let's log the data to the console
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        
            console.error(error);
        });
        
});

// ... (existing code)

function fetchPosts() {
    fetch('http://localhost:3000/posts')
      .then(response => response.json())
      .then(posts => displayPosts(posts));
  }
  
  function displayPosts(posts) {
    const postList = document.getElementById('postList');
    postList.innerHTML = '';
    posts.forEach(post => {
      const li = document.createElement('li');
      li.textContent = `${post.title}: ${post.content}`;
      postList.appendChild(li);
    });
  }
  
  function createPost() {
    const postTitle = document.getElementById('postTitle').value;
    const postContent = document.getElementById('postContent').value;
  
    const post = {
      title: postTitle,
      content: postContent
    };
  
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(() => fetchPosts());
  }

  function fetchPosts() {
    fetch('http://localhost:3000/posts')
      .then(response => response.json())
      .then(postsData => {
        posts = postsData;
        displayPosts(posts);
      });
  }

  function displayPosts(posts) {
    const postList = document.getElementById('postList');
    postList.innerHTML = '';
    posts.forEach((post, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${post.title}</strong>: ${post.content}
        <button onclick="deletePost(${index})">Delete</button>`;
      postList.appendChild(li);
    });
  }

  function createPost() {
    const postTitle = document.getElementById('postTitle').value;
    const postContent = document.getElementById('postContent').value;

    const post = {
      title: postTitle,
      content: postContent
    };

    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(() => fetchPosts());
  }

  function deletePost(index) {
    const postId = posts[index].id; // Assuming your posts have an id property
    fetch(`http://localhost:3000/posts/${postId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => fetchPosts());
  }

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('API Data:', data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

  