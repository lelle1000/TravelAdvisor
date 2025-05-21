const UnsplashKey = "RXfEp3EulaHn3LgZG-m4BEel7MWwBee2iFESNQ7eLoc"

async function getCapitalPhoto (capitalName) { // hämtar en bild till staden
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${capitalName}&client_id=${UnsplashKey}`)
    const data = await response.json()

    if(data.results & data.results.length > 0) {
        return data.results.urls.small
    }
    return null;
    
}

async function fetchCountryAndPhoto() { // skriver ut staden baserat på land och en url med en bild på staden.
    const CountryResponse = await fetch("https://restcountries.com/v3.1/capital/stockholm")
    const CountryData = await CountryResponse.json()

    if (CountryData.length > 0) {
        const capital = countries[0].capital[0]
        const PhotoUrl = await getCapitalPhoto(capital)

        if (PhotoUrl) {
            return capital, PhotoUrl
        } else {
            return null
        }
    }
}

fetchCountryAndPhoto()