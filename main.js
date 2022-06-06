let infoContainer = document.querySelector("#info-container");
let charContainer = document.querySelector("#character-container");
let charNumber = 0;

charContainer.style.backgroundImage = "url('https://wallpapercave.com/wp/wp5063431.jpg')";


document.addEventListener("DOMContentLoaded", function () {
    fetch("https://rickandmortyapi.com/api/episode")
        .then(function (response) {
            return response.json();
        }).then(function (response) {
        response.results.forEach(function (episode) {
            charNumber = episode.characters.length;
            createEpisode(episode);
        });
    });
})

function createEpisodeContent(text) {
    let elem = document.createElement("div");
    elem.innerText = text;
    return elem;
}

function createEpisode(episode) {
    let episodeContainer = document.createElement("div");
    episodeContainer.className = "episodeInfo";
    let episodeName = createEpisodeContent(episode.name);
    episodeName.className = "episodeName";
    let episodeNumber = createEpisodeContent(episode.episode);
    episodeNumber.className = "episodeNumber";
    let episodeAirDate = createEpisodeContent(episode.air_date);
    episodeAirDate.className = "episodeDate";
    let episodeCharacters = document.createElement("div");
    episodeCharacters.className = "episodeCharacters";
    let actionText = document.createElement("span");
    actionText.innerText = "=== View " + charNumber + " characters ===";
    actionText.addEventListener("click", function () {
        charContainer.innerHTML = "";
        charContainer.style.backgroundImage = "linear-gradient(darkseagreen, black 50%)";
        getCharacters(episode);
    })
    episodeCharacters.appendChild(actionText);
    episodeContainer.appendChild(episodeName);
    episodeContainer.appendChild(episodeAirDate);
    episodeContainer.appendChild(episodeNumber);
    episodeContainer.appendChild(episodeCharacters);
    infoContainer.appendChild(episodeContainer);
}

function getCharacters(episode) {
    for (let i = 0; i < episode.characters.length; i++) {
        fetch(episode.characters[i])
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                let figureItem = document.createElement("figure");
                let childDiv = document.createElement("div");
                childDiv.style.color = "white";
                childDiv.innerText = response.name;
                let img = document.createElement("img");
                img.src = response.image;
                figureItem.appendChild(img);
                figureItem.appendChild(childDiv);
                charContainer.appendChild(figureItem);
            })
    }
}