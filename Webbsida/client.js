const headerLogoContainer = document.getElementById("HeaderLogoContainer")
headerLogoContainer.addEventListener("click", () => {
    submenuContainer.style.display = "none"
    popupContainer.style.display = "none"
})

let loginStatusGlobal = false;
let usernameTrack = "";
let userRate = 0;
const loginContainer = document.querySelector("#loginContainer");
let popupContainer = document.querySelector(".popup-main")
let loginButton = document.querySelector("#login-button");
let loginPopup = document.querySelector("#login-popup");
let logoutPopup = document.querySelector("#log-out-popup");
let logoutText = document.querySelector("#logout-p")
const signInPopupLink = document.querySelector("#signInLink");
let signInPopup = document.querySelector("#signin-popup");
loginContainer.addEventListener("click", () => {
    if (!loginStatusGlobal) {
        loginPopup.style.display = "flex";
    }
    else if (loginButton.textContent == "Log out") {
        logoutPopup.style.display = "flex";
        logoutText.textContent = `You succesfully loged out ${usernameTrack}!`
    }
})
signInPopupLink.addEventListener("click", () => {
    signInPopup.style.display = "flex";
})

const allRates = document.querySelectorAll(".rate")
for (let rate of allRates) {
    rate.addEventListener("click", () => {
        userRate = rate.id;
        console.log(userRate);
        logoutPopup.style.display = "none";
    })
}





let onlyOneOfSameCountries = [];
const UiCardGrid = document.getElementById("grid-place-destination")

async function getImages() {
    const response = await fetch("http://localhost:8000/homepage")
    if (!response.ok) {
        // window.history.pushState({}, "", "/homepage/country/photos");
    }
    const data = await response.json();
    if (!onlyOneOfSameCountries.includes(data.countryCapital)) {
        onlyOneOfSameCountries.push(data.countryCapital)   
        
        let DestinationCard = document.createElement("div")
        DestinationCard.classList.add("destination-info-pic")

        DestinationCard.innerHTML = `
            <div class="top-image">
                <img src="${data.url}" alt="Picture of ${data.countryCapital}">
            </div>
            <div class="bottom-info">
                Travel to ${data.countryCapital}
                <img class="star-for-imgcard" id="${[data.url, data.countryCapital]}" src="Images/star-svgrepo-com.svg">
            </div>`;
        UiCardGrid.append(DestinationCard)
    } else {
        return null
    }
    
}



async function getAllImages() {
    let addedImages = 0;

    while (addedImages < 12) {
        const result = await getImages()
        if (result !== null) {
            addedImages++
        }
    }
    wishCheck();
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
            loginStatusGlobal = true;
            usernameTrack = logInNameInput.value;
            console.log(usernameTrack)
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
            loginStatusGlobal = true;
            usernameTrack = signInNameInput.value;
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
    submenuContainer.style.display = "flex"
    for (let country of CountriesData) {
        const submenuItem = document.createElement("div")
        submenuItem.classList.add("submenuItem")

        submenuItem.innerHTML = `<div><span class="BOLD">${country.country.capital[0]}</span> ${country.country.name.common} (${country.country.continents[0]})</div> <img class="submenuImg" src="Images/icons8-search-50.png">`
        submenuContainer.append(submenuItem)
    }

})




async function wishCheck() {
    const wishListStar = document.querySelectorAll(".star-for-imgcard");
    for (let wish of wishListStar) {
        wish.addEventListener("click", () => {
            const idSplit = wish.id.split(",");
            const countryName = idSplit[1];
            const countryUrl = idSplit[0];
            console.log(countryName)
            console.log(countryUrl)
            const request = fetch("http://localhost:8000/add/destination/wishlist", {
                method: "POST",
                body: JSON.stringify({ countryName: countryName, imgurl: countryUrl }),
                headers: { "Content-Type": "application/json" }
            })
            request.then(response => response.json()).then(response => console.log(response));
        })
    }
}

window.addEventListener("scroll", () => {
    const NavigationHeader = document.querySelector("#NavigationHeader");
    if (window.scrollY > 0) {
        NavigationHeader.classList.add("scrolled");
    } else {
        NavigationHeader.classList.remove("scrolled");
    }
})






















const menuButton = document.querySelector("#mainContainer");
const menuSubMenu = document.querySelector("#menuSubMenu");
menuButton.addEventListener("click", () => {
    if (menuSubMenu.classList.contains("hide")) {
        menuSubMenu.classList.remove("hide");
    } else {
        menuSubMenu.classList.add("hide");
    }
})