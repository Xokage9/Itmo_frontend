let generateAgility = (imgSrc, HeroName) => {
    let template = document.getElementById('agility-template');
    let element = document.createElement('div');

    element.setAttribute('class', 'hero')

    element.append(template.content.cloneNode(true));
    element.querySelector('img').setAttribute('src', imgSrc);
    element.querySelector('div').innerText = HeroName;

    return element;
};
let generateStrength = (imgSrc, HeroName) => {
    let template = document.getElementById('strength-template');
    let element = document.createElement('div');

    element.setAttribute('class', 'hero')

    element.append(template.content.cloneNode(true));
    element.querySelector('img').setAttribute('src', imgSrc);
    element.querySelector('div').innerText = HeroName;

    return element;
};
let generateInt = (imgSrc, HeroName) => {
    let template = document.getElementById('intelligense-hero-template');
    let element = document.createElement('div');

    element.setAttribute('class', 'hero')

    element.append(template.content.cloneNode(true));
    element.querySelector('img').setAttribute('src', imgSrc);
    element.querySelector('div').innerText = HeroName;

    return element;
};
let generateUniversal = (imgSrc, HeroName) => {
    let template = document.getElementById('universal-template');
    let element = document.createElement('div');

    element.setAttribute('class', 'hero')

    element.append(template.content.cloneNode(true));
    element.querySelector('img').setAttribute('src', imgSrc);
    element.querySelector('div').innerText = HeroName;

    return element;
};
document.addEventListener('DOMContentLoaded', () => {
    const intGrid = document.querySelector('.intelligense-container');
    const intLoader = document.getElementById('int-loader')
    let albumId = Math.floor(Math.random() * (10 - 1) + 1);
    fetch("https://jsonplaceholder.typicode.com/photos?albumId=" + albumId)
        .then(response => response.json())
        .catch(err => {
            intLoader.remove();
            Toastify({
                text: "Could not find any manga :(",
                duration: 3000,
                style: {
                    background: "#D80032",
                },
                gravity: "bottom",
            }).showToast();
            console.log(err);
        })
        .then(json => json.forEach(element => {
            let view = generateInt(element["thumbnailUrl"], element["title"]);
            intGrid.appendChild(view);
            intLoader.remove();
        }));

        const strengthGrid = document.querySelector('.strength-container')
        const strengthLoader = document.getElementById('str-loader')
        albumId = Math.floor(Math.random() * (10 - 1) + 1);
        fetch("https://jsonplaceholder.typicode.com/photos?albumId=" + albumId)
        .then(response => response.json())
        .catch(err => {
            strengthLoader.remove();
            Toastify({
                text: "Could not find any manga :(",
                duration: 3000,
                style: {
                    background: "#D80032",
                },
                gravity: "bottom",
            }).showToast();
            console.log(err);
        })
        .then(json => json.forEach(element => {
            let view = generateStrength(element["thumbnailUrl"], element["title"]);
            strengthGrid.appendChild(view);
            strengthLoader.remove();
        }));

        const agilityGrid = document.querySelector('.agility-container');
        const agilityLoader = document.getElementById('ag-loader');
        albumId = Math.floor(Math.random() * (10 - 1) + 1);
        fetch("https://jsonplaceholder.typicode.com/photos?albumId=" + albumId)
        .then(response => response.json())
        .catch(err => {
            agilityLoader.remove();
            Toastify({
                text: "Could not find any manga :(",
                duration: 3000,
                style: {
                    background: "#D80032",
                },
                gravity: "bottom",
            }).showToast();
            console.log(err);
        })
        .then(json => json.forEach(element => {
            let view = generateStrength(element["thumbnailUrl"], element["title"]);
            agilityGrid.appendChild(view);
            agilityLoader.remove();
        }));

        const universalGrid = document.querySelector('.universal-container');
        const universalLoader = document.getElementById('uni-loader');
        albumId = Math.floor(Math.random() * (10 - 1) + 1);
        fetch("https://jsonplaceholder.typicode.com/photos?albumId=" + albumId)
        .then(response => response.json())
        .catch(err => {
            universalLoader.remove();
            Toastify({
                text: "Could not find any manga :(",
                duration: 3000,
                style: {
                    background: "#D80032",
                },
                gravity: "bottom",
            }).showToast();
            console.log(err);
        })
        .then(json => json.forEach(element => {
            let view = generateStrength(element["thumbnailUrl"], element["title"]);
            universalGrid.appendChild(view);
            universalLoader.remove();
        }));
})