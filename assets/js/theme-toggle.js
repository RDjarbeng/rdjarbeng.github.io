document.addEventListener('DOMContentLoaded', () => {
    // Support multiple toggle buttons (mobile + desktop)
    const toggleBtns = document.querySelectorAll('.theme-toggle');
    const sunIcons = document.querySelectorAll('.sun-icon');
    const moonIcons = document.querySelectorAll('.moon-icon');
    const root = document.documentElement;

    function updateIcons() {
        const isLight = root.getAttribute('data-theme') === 'light';
        // When light theme, show Moon to allow switching to night
        // When dark theme, show Sun to allow switching to light
        sunIcons.forEach(icon => icon.style.display = isLight ? 'none' : 'block');
        moonIcons.forEach(icon => icon.style.display = isLight ? 'block' : 'none');
    }

    if (toggleBtns.length > 0) {
        updateIcons();
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const currentTheme = root.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                root.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateIcons();
            });
        });
    }
});
