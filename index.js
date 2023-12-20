$(function() {
/* nav toggle*/
$("#nav_toggle").on("click", function(event) {
  event.preventDefault();

  $(this).toggleClass("active");
  $("#nav").toggleClass("active");
});

});


async function fetchPosts() {
  const postsContainer = document.getElementById('postsContainer');
  const loader = document.getElementById('loader');

  try {
    loader.style.display = 'block';

    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();

    postsContainer.innerHTML = ''; // Clear previous posts

    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.innerHTML = `<h2>ID: ${post.id} - ${post.title}</h2><p>${post.body}</p><hr>`;
      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
  } finally {
    loader.style.display = 'none';
  }
}

function filterPosts() {
  const postIdInput = document.getElementById('postIdInput');
  const postId = postIdInput.value.trim();

  if (!postId || isNaN(postId)) {
    alert('Please enter a valid Post ID');
    return;
  }

  const postsContainer = document.getElementById('postsContainer');
  const postElements = postsContainer.getElementsByTagName('div');

  for (const postElement of postElements) {
    const postIdInPost = postElement.querySelector('h2').textContent.match(/\d+/);
    if (postIdInPost && postIdInPost[0] === postId) {
      postElement.style.display = 'block';
    } else {
      postElement.style.display = 'none';
    }
  }
}
