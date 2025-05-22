
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
        const response = await fetch("http://localhost:8000/homepage/loggedoin", {
            method: "GET",
            body: JSON.stringify({ name: logInNameInput.value, password: logInPasswordInput.value }),
            headers: { "content-type": "application/json" } 
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
        const response = await fetch("http://localhost:8000/homepage/loggedoin", {
            method: "POST",
            body: JSON.stringify({ name: signInNameInput.value, password: signInPasswordInput.value, email: signInEmailInput.value }),
            headers: { "content-type": "application/json" } 
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