const toggleBtn = document.querySelector('#toggle-btn');
const closeBtn = document.querySelector('#close-btn');
const sidebar = document.querySelector('#sidebar');

toggleBtn.addEventListener('click', () => {
	sidebar.classList.toggle('active');
});

closeBtn.addEventListener('click', () => {
	sidebar.classList.remove('active');
});
