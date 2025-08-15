document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleBtn = document.getElementById('toggleBtn');
    const btnIcon = toggleBtn.querySelector('.btn-icon');

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('collapsed');
        btnIcon.textContent = sidebar.classList.contains('collapsed') ? '☰' : '✕';
    });

    // Start collapsed on small screens
    if (window.innerWidth <= 768) {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('collapsed');
        btnIcon.textContent = '☰';
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('collapsed');
            btnIcon.textContent = '☰';
        } else {
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('collapsed');
            btnIcon.textContent = '✕';
        }
    });
});
