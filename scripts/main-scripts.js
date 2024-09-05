document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const languageSelect = document.getElementById('language-select');

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        updateThemeIcon();
    });

    function updateThemeIcon() {
        themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌓';
    }

    languageSelect.addEventListener('change', function() {
        console.log('Selected language:', languageSelect.value);
    });

    updateThemeIcon();
});