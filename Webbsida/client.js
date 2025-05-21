import { Countries } from "../API/CountriesArray.js"

const UiCardGrid = document.getElementById("grid-place-destination")


const UnsplashKey = "RXfEp3EulaHn3LgZG-m4BEel7MWwBee2iFESNQ7eLoc"

async function getCapitalPhoto (capitalName) { // hämtar en bild till staden
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${capitalName}&client_id=${UnsplashKey}`)
    const data = await response.json()

    if(data.results && data.results.length > 0) {
        return data.results[0].urls.small;
    }
    return null;
    
}

async function fetchCountryAndPhoto(Country) { // skriver ut staden baserat på land och en url med en bild på staden.
    const CountryResponse = await fetch(`https://restcountries.com/v3.1/name/${Country}`)
    const CountryData = await CountryResponse.json()

    if (CountryData.length > 0) {
        const capital = CountryData[0].capital[0]
        const PhotoUrl = await getCapitalPhoto(capital)

        if (PhotoUrl) {
            let DestinationCard = document.createElement("div")
                DestinationCard.classList.add("destination-info-pic")

                DestinationCard.innerHTML = `
                    <div class="top-image">
                        <img src="${PhotoUrl}" alt="Picture of ${capital}">
                    </div>
                    <div class="bottom-info">xxx</div>
                    `;
                UiCardGrid.append(DestinationCard)
            
        } else {
            return null
        }
    }
}

let RandomCountry = Countries[Math.floor(Countries.length * Math.random())]

fetchCountryAndPhoto(RandomCountry)

