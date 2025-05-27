
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
    const data = await fetch("http://localhost:8000/homepage")
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

const SearchButton = document.getElementById("icon-for-search")
const SearchLocation = document.getElementById("location-search")
const submenuContainer = document.querySelector(".submenuContainer")

SearchButton.addEventListener("click", async () => {

    const response = await fetch(`http://localhost:8000/searchpage/loggedin?searchfield=${SearchLocation.value}`)
    const CountriesData = await response.json()
    
    submenuContainer.innerHTML = ""
    submenuContainer.classList.add("Reveal")

    for (let country of CountriesData) {
        const submenuItem = document.createElement("div")
        submenuItem.classList.add("submenuItem")

        submenuItem.innerHTML = `<div><span class="BOLD">${country.country.capital[0]}</span> ${country.country.name.common} ${country.country.continents[0]}</div> <img class="submenuImg" src="Images/icons8-search-50.png">`
        submenuContainer.append(submenuItem)
}

})
