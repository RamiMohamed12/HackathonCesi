document.querySelectorAll('.search-tabs button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.search-tabs button.active').classList.remove('active');
        button.classList.add('active');
    });
});