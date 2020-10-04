document.body.addEventListener('click', e => {
    const target = e.target;

    const toggleButton = target.closest('.toggle-menu');
    toggleButton && toggleSidebar();

    const sidebar = target.closest('.sidebar')
    sidebar && toggleSidebar();
})

const toggleSidebar = () => {
    document.body.classList.toggle('sidebar-open')
}