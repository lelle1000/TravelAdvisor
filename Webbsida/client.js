

const UiCardGrid = document.getElementById("grid-place-destination")

async function getImages() {
    const data = await fetch("http://localhost:8000/homepage")
    const response = await data.json();

    let DestinationCard = document.createElement("div")
    DestinationCard.classList.add("destination-info-pic")

    DestinationCard.innerHTML = `
                         <div class="top-image">
                             <img src="${response.url}" alt="Picture of ${response.countryname}">
                         </div>
                         <div class="bottom-info">
                         Flyg till ${response.countryname}</div>`;
    UiCardGrid.append(DestinationCard)
}

async function getAllImages() {
    const image1 = await getImages();
    const image2 = await getImages();
    const image3 = await getImages();
    const image4 = await getImages();
}

getAllImages();

// for (let i = 0; i < 5; i++) {
//     let RandomCountry = Countries[Math.floor(Countries.length * Math.random())]
//     fetchCountryAndPhoto(RandomCountry)
// }


