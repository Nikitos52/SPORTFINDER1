let data = [];
fetch('json/lublinofb.json')
    .then(response => {

        if (!response.ok) {
            throw new Error('БД не найдена!');
        }

        return response.json();
    })
    .then(data => {
        const container = document.getElementById('card-container');
        data.forEach(item => {
            const card = createCard(item);
            container.className = 'container'
            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Произошла ошибка:', error);
    });

function createCard(item) {

    
    const card = document.createElement('div');
    const photo = document.createElement('img');
    const adress = document.createElement('h3');
    const description = document.createElement('h4');
    const place = document.createElement('img');
    const word = document.createElement('h5');
    place.src = item.place;
    place.className = 'place-img'; 
    const description_img = document.createElement('img');
    description_img.src = item.description_img;
    description_img.className = 'description-img'; 
    const line = document.createElement('hr');
    line.className = 'card-line';
    const share = document.createElement('img');
    share.className = 'card-share';

    const likeDiv = document.createElement('div');
    likeDiv.className = 'like';
    likeDiv.onclick = function () {
        toggleLike(this);
    };

    const heartIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    heartIcon.setAttribute("class", "heart-icon");
    heartIcon.setAttribute("viewBox", "0 0 24 24");
    heartIcon.innerHTML = `
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                 C13.09 3.81 14.76 3 16.5 3
                 19.58 3 22 5.42 22 8.5
                 c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke-width="2"/>
    `;
    likeDiv.appendChild(heartIcon);
    

    card.className = 'card';
    adress.textContent = item.adress;
    description.textContent = item.description;
    word.textContent = item.word;
    photo.src = item.photo;
    place.src = item.place;
    description_img.src = item.description_img;
    share.src = item.share;

    card.appendChild(photo);
    card.appendChild(adress);
    card.appendChild(description);
    card.appendChild(place);
    card.appendChild(description_img);
    card.appendChild(line);
    card.appendChild(share);
    card.appendChild(likeDiv);
    card.appendChild(word);
    

    card.addEventListener('click', (event) => {
        if (!event.target.closest('.like')) {
            window.location.href = item.link;
        }
    });

    return card;
}