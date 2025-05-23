
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
            Flyg till ${response.countryname}
        </div>`;
    UiCardGrid.append(DestinationCard)
}

async function getAllImages() {
    const image1 = await getImages();
    const image2 = await getImages();
    const image3 = await getImages();
    const image4 = await getImages();
}

getAllImages();



const logInButton = document.querySelector("#logInButton");
const logInNameInput = document.querySelector("#logInNameInput");
const logInPasswordInput = document.querySelector("#logInPasswordInput");

logInButton.addEventListener("click", () => {
    async function logIn() {
        const response = await fetch("http://localhost:8000/homepage/loggedin", {
            method: "POST",
            body: JSON.stringify({ name: logInNameInput.value, password: logInPasswordInput.value }),
            headers: { "Content-Type": "application/json" }
        })
        const resourceBody = await response.json();
        return { status: response.status, ok: response.ok, body: resourceBody };
    }
    logIn().then(logInCheck)
    function logInCheck(resource) {
        if (resource.ok) {
            console.log("You have logged in!");
        } else {
            console.log("Something went wrong!");
        }
    }
})

const signInButton = document.querySelector("#signInButton");
const signInNameInput = document.querySelector("#signInNameInput");
const signInPasswordInput = document.querySelector("#signInPasswordInput");
const signInEmailInput = document.querySelector("#signInEmailInput");

signInButton.addEventListener("click", () => {
    async function signIn() {
        const response = await fetch("http://localhost:8000/homepage/signin", {
            method: "POST",
            body: JSON.stringify({ name: signInNameInput.value, password: signInPasswordInput.value, email: signInEmailInput.value }),
            headers: { "Content-Type": "application/json" }
        })
        const resourceBody = await response.json();
        return { status: response.status, ok: response.ok, body: resourceBody };
    }
    signIn().then(signInCheck)
    function signInCheck(resource) {
        if (resource.ok) {
            console.log("You have signed in!");
        } else {
            console.log("Something went wrong!");
        }
    }
})


const SearchButton = document.getElementById("SearchButton")
const SearchLocation = document.getElementById("location-search")
const LocationContainer = document.getElementById("all-locations")

SearchButton.addEventListener("click", async () => {

    const response = await fetch(`http://localhost:8000/searchpage/loggedin?searchfield=${SearchLocation.value}`)
    const CountriesData = await response.json()

    LocationContainer.innerHTML = ""

    for (let country of CountriesData) {
        const boxAround = document.createElement("div")
        boxAround.classList.add("box-around")
        LocationContainer.append(boxAround)

        const locationImageBox = document.createElement("div")
        locationImageBox.classList.add("location-image-box")
        locationImageBox.innerHTML = `<img src="${country.ImageURL}" alt="${country.country.capital[0]}">`
        boxAround.append(locationImageBox)

        const textBoxContainer = document.createElement("div")
        textBoxContainer.classList.add("textBoxContainer")
        textBoxContainer.innerHTML = `
                <div class="textBoxInformationContainer"> <p class="textBoxInformation"> Travel to ${country.country.capital[0]} in ${country.country.name.common} for a relaxing trip with family and friends!</p> </div>
                <div class="textBoxButtonContainer"> <button class="button">Book now</button> <button class="button">Read more</button> </div>
            `
        boxAround.append(textBoxContainer)

    }

})
