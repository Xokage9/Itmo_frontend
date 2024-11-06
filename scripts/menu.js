console.log(document.location.href);

const menuItems = document.getElementsByClassName('menuitem');
for (let item of menuItems) {
    console.log(item.className);
    if (item.href == document.location.href) {
        item.classList.remove('menuitem');
        item.classList.add('activeitem');
        break
    }
}
