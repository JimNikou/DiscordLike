const toggleBtn = document.querySelector('#toggle-btn');
const sidebar = document.querySelector('#sidebar');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

function menuBtnFunction(menuBtn) {
  menuBtn.classList.toggle("active");
  sidebar.classList.toggle("active");
}
