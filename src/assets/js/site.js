document.querySelector('.user-dropdown').addEventListener('click', function (e) {
    [].map.call(document.querySelectorAll('.user-profile-list'), function (el) {
        el.classList.toggle('toggled');
    });
});