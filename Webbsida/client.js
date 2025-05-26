
const loginButton = document.querySelector("#login-button");
let loginPopup = document.querySelector("#login-popup");
const signInPopupLink = document.querySelector("#signInLink");
let signInPopup = document.querySelector("#signin-popup");
loginButton.addEventListener("click", () => {
    loginPopup.style.display = "flex";
})
signInPopupLink.addEventListener("click", () => {
    signInPopup.style.display = "flex";
})













const UiCardGrid = document.getElementById("grid-place-destination")

async function getImages() {
    const data = await fetch("http://localhost:8000/homepage/country/photos")
    if (data.ok) {
        // window.history.pushState({}, "", "/homepage/country/photos");
    }
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
    const image5 = await getImages();
    const image6 = await getImages();
    const image7 = await getImages();
    const image8 = await getImages();
    const image9 = await getImages();
    const image10 = await getImages();
    const image11 = await getImages();
    const image12 = await getImages();
}

getAllImages();



const logInButton = document.querySelector("#logInButton");
const logInNameInput = document.querySelector("#logInNameInput");
const logInPasswordInput = document.querySelector("#logInPasswordInput");
const signInMessage = document.querySelector("#error-message");

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
            signInMessage.textContent = "Success, you are logged in!";
            setTimeout(() => {
                loginPopup.style.display = "none";
                loginButton.textContent = "Log out"
            }, 2000);
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
            signInMessage.textContent = "Success, account created!";
            setTimeout(() => {
                loginPopup.style.display = "none";
                signInPopup.style.display = "none";
                loginButton.textContent = "Log out"
            }, 2000);
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
        locationImageBox.innerHTML = `<img src="${country.imageURL}" alt="${country.country.capital[0]}">`
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
