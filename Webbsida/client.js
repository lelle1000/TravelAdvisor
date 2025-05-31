let loginStatusGlobal = false;
let userTrackId = null;
let userRate = 0;

const homePageDisplay = document.querySelector("#homepageContainer");
const friendsPageDisplay = document.querySelector("#friendsContainer");
const submenuFriendsButton = document.querySelector("#friends-button");

const headerLogoContainer = document.getElementById("HeaderLogoContainer")

const loginContainer = document.querySelector("#loginContainer");
let popupContainer = document.querySelector(".popup-main")
let loginButton = document.querySelector("#login-button");
let loginPopup = document.querySelector("#login-popup");
let logoutPopup = document.querySelector("#log-out-popup");
let logoutText = document.querySelector("#logout-p")
const signInPopupLink = document.querySelector("#signInLink");
let signInPopup = document.querySelector("#signin-popup");

const infoPageContainer = document.querySelector("#infoPageContainer");
const UiCardGrid = document.getElementById("grid-place-destination")

const logInButton = document.querySelector("#logInButton");
const logInNameInput = document.querySelector("#logInNameInput");
const logInPasswordInput = document.querySelector("#logInPasswordInput");
const loginMessage = document.querySelector("#login-error-message");

const signInButton = document.querySelector("#signInButton");
const signInNameInput = document.querySelector("#signInNameInput");
const signInPasswordInput = document.querySelector("#signInPasswordInput");
const signInEmailInput = document.querySelector("#signInEmailInput");
const signinMessage = document.querySelector("#signin-error-message");

const SearchButton = document.getElementById("icon-for-search")
const SearchLocation = document.getElementById("location-search")
const submenuContainer = document.querySelector("#submenuContainer")

const searchFriendsInput = document.querySelector("#search-friends-input");
const friendsDivsFrame = document.querySelector("#grid-friends-page-search");

const friendsPopupButton = document.querySelector("#add-friends-list");
const friendsPopup = document.querySelector("#add-friends-popup");

const menuButton = document.querySelector("#mainContainer");
const menuSubMenu = document.querySelector("#menuSubMenu");

const favoriteSubContainer = document.querySelector("#favoriteSubContainer")
const favoriteContainer = document.querySelector("#favoriteContainer")


headerLogoContainer.addEventListener("click", () => {
    submenuContainer.classList.add("hide");
    infoPageContainer.classList.add("hide");
    SearchLocation.value = ""
    popupContainer.classList.add("hide");
    homePageDisplay.classList.remove("hide");
    friendsPageDisplay.classList.add("hide");
})

loginContainer.addEventListener("click", () => {
    if (!loginStatusGlobal) {
        loginPopup.style.display = "flex";
    }
    else if (loginButton.textContent == "Log out") {
        logoutPopup.style.display = "flex";
        logoutText.textContent = `You succesfully logged out!`
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
        loginButton.textContent = "Log in"
        loginStatusGlobal = false;
    })
}


let onlyOneOfSameCountries = [];

async function getImages() {
    const response = await fetch("http://localhost:8000/homepage")
    if (!response.ok) {
        // window.history.pushState({}, "", "/homepage/country/photos");
    }
    const data = await response.json();
    if (!onlyOneOfSameCountries.includes(data.capital)) {
        onlyOneOfSameCountries.push(data.capital)

        let DestinationCard = document.createElement("div")
        DestinationCard.classList.add("destination-info-pic")

        DestinationCard.innerHTML = `
            <div class="top-image">
                <img src="${data.url}" alt="Picture of ${data.capital}">
            </div>
            <div class="bottom-info">
                Travel to ${data.capital}
                <img class="star-for-imgcard" id="${[data.url, data.capital]}" src="Images/star-svgrepo-com.svg">
            </div>`;
        UiCardGrid.append(DestinationCard)

        DestinationCard.addEventListener("click", async function () {

            let continentText = "";

            if (data.continent == "Europe") {
                continentText = "a culturally rich part of Europe with many astonishing monuments"
            } else if (data.continent == "Asia") {
                continentText = "a vast and diverse region in Asia"
            } else if (data.continent == "Africa") {
                continentText = "a vibrant and historic region in Africa with many beautiful sights"
            } else if (data.continent == "North America") {
                continentText = "a major area of North America stretching far and wide"
            } else if (data.continent == "South America") {
                continentText = "a colorful and energetic part of South America"
            } else if (data.continent == "Oceania") {
                continentText = "an island region in Oceania with many different animals worth to see"
            } else if (data.continent == "Antarctica") {
                continentText = "an icy region of Antarctica - only adventurers would dare to visit here!"
            } else {
                continentText = "a place with an unknown continent that will be difficult to travel too!"
            }

            document.querySelector("#image-box").innerHTML = `<img src="${data.url}" alt="Picture of ${data.capital}">`
            document.querySelector("#text-box").innerHTML = `<p>${data.capital} is the beautiful capital of ${data.countryName}, ${continentText}.</p> <button class="bookingButton"> Book Now! </button>`

            bookingButton = document.querySelector(".bookingButton")
            bookingButton.addEventListener("click", async function () {
                const bookingResponse = await fetch("http://localhost:8000/booked/loggedin", {
                    method: "POST",
                    headers: { "Content-Type" : "application/json" },
                    body: JSON.stringify({ userId: userTrackId, destination: data })
                })

                if(bookingResponse.status == 200) {
                    console.log("Destination have been booked!");
                } 
            })

            homePageDisplay.classList.add("hide");
            infoPageContainer.classList.remove("hide");

        })
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
            console.log(resource.body.id)
            console.log("You have logged in!");
            userTrackId = resource.body.id;
            loginMessage.textContent = "Success, you are logged in!";
            loginMessage.style.color = "Green"
            setTimeout(() => {
                loginPopup.style.display = "none";
                loginButton.textContent = "Log out"
                logInNameInput.value = "";
                logInPasswordInput.value = "";
                loginMessage.textContent = "";
            }, 2000);
        } else {
            loginMessage.textContent = resource.body.error
            console.log("Something went wrong!");
        }
    }
})


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
            console.log(resource);
            console.log(resource.body.id)
            userTrackId = resource.body.id;
            console.log("You have signed in!");
            signinMessage.textContent = "Success, account created!";
            signinMessage.style.color = "Green"
            setTimeout(() => {
                loginPopup.style.display = "none";
                signInPopup.style.display = "none";
                loginButton.textContent = "Log out"
                signInNameInput.value = "";
                signInPasswordInput.value = "";
                signInEmailInput.value = "";
                signinMessage.textContent = "";
            }, 2000);
        } else {
            signinMessage.textContent = resource.body.error
            console.log("Something went wrong!");
        }
    }
})

SearchButton.addEventListener("click", async () => {

    const response = await fetch(`http://localhost:8000/searchpage/loggedin?searchfield=${SearchLocation.value}`)
    const CountriesData = await response.json()

    submenuContainer.innerHTML = ""
    submenuContainer.classList.remove("hide");
    for (let country of CountriesData) {
        const submenuItem = document.createElement("div")
        submenuItem.classList.add("submenuItem")

        submenuItem.innerHTML = `<div><span class="BOLD">${country.country.capital[0]}</span> ${country.country.name.common} (${country.country.continents[0]})</div> <img class="submenuImg" src="Images/icons8-search-50.png">`
        submenuContainer.append(submenuItem)

        submenuItem.addEventListener("click", async function () {
            const requestCapital = new Request(`http://localhost:8000/informationpage/loggedin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ capital: country.country.capital[0] })
            })

            const response = await fetch(requestCapital)
            if (!response.ok) {
                throw new Error(`Couldn't fetch Capital Data`)
            }

            const imgData = await response.json()

            let continentText = "";

            if (country.country.continents[0] == "Europe") {
                continentText = "a culturally rich part of Europe with many astonishing monuments"
            } else if (country.country.continents[0] == "Asia") {
                continentText = "a vast and diverse region in Asia"
            } else if (country.country.continents[0] == "Africa") {
                continentText = "a vibrant and historic region in Africa with many beautiful sights"
            } else if (country.country.continents[0] == "North America") {
                continentText = "a major area of North America stretching far and wide"
            } else if (country.country.continents[0] == "South America") {
                continentText = "a colorful and energetic part of South America"
            } else if (country.country.continents[0] == "Oceania") {
                continentText = "an island region in Oceania with many different animals worth to see"
            } else if (country.country.continents[0] == "Antarctica") {
                continentText = "an icy region of Antarctica - only adventurers would dare to visit here!"
            } else {
                continentText = "a place with an unknown continent that will be difficult to travel too!"
            }

            document.querySelector("#image-box").innerHTML = `<img src="${imgData.imgUrl}" alt="Picture of ${country.country.capital[0]}">`
            document.querySelector("#text-box").innerHTML = `<p>${country.country.capital[0]} is the beautiful capital of ${country.country.name.common}, ${continentText}.</p> <button class="bookingButton"> Book Now! </button>`

            submenuContainer.classList.add("hide");
            homePageDisplay.classList.add("hide");
            infoPageContainer.classList.remove("hide");
        })
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
                body: JSON.stringify({ countryName: countryName, imgurl: countryUrl, userId: userTrackId }),
                headers: { "Content-Type": "application/json" }
            })
            request.then(response => {
                if (response.ok) {
                    wish.style.backgroundColor = "yellow";
                    return response.json();
                } else {
                    console.log("Wish went wrong!");
                }
            }).then(response => console.log(response));

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

async function friendsSearch() {
    const response = await fetch("http://localhost:8000/friends/list")
    const userArray = await response.json();
    const userArrayParse = JSON.parse(userArray);
    const currentUserLoggedInList = userArrayParse.find(objekt => objekt.id == userTrackId);
    //console.log(userArrayParse)
    searchFriendsInput.addEventListener("keydown", (e) => {
        friendsDivsFrame.innerHTML = "";
        let newArray = [];
        if (e.target.value.length > 0) {
            newArray = userArrayParse.filter(objekt => {
                let username = objekt.username.includes(e.target.value);
                let email = objekt.gmail.includes(e.target.value);
                return username || email
            })
        }
        console.log(newArray);
        for (let arr of newArray) {
            const sharedWishes = arr.wishlist.filter(item =>
                currentUserLoggedInList.wishlist.includes(item)
            ).length;
            console.log(sharedWishes)
            const friendDiv = document.createElement("div");
            friendDiv.classList.add("friend-profiles");
            friendDiv.innerHTML = `
            <img src="Images/user-profile-icon-free-vector.jpg">
            <p>${arr.username},${arr.gmail}</p>Has same destinations in common ${sharedWishes}<p>
            `
            friendsDivsFrame.appendChild(friendDiv);
        }
    })

}

friendsSearch();

friendsPopupButton.addEventListener("click", () => {
    friendsPopup.style.display = "flex";
})

submenuFriendsButton.addEventListener("click", () => {
    homePageDisplay.style.display = "none";
    friendsPageDisplay.style.display = "block";
})


menuButton.addEventListener("click", () => {
    if (menuSubMenu.classList.contains("hide")) {
        menuSubMenu.classList.remove("hide");
    } else {
        menuSubMenu.classList.add("hide");
    }
})


favoriteSubContainer.addEventListener("click", async function () {
    const response = await fetch("http://localhost:8000/favorites", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(userTrackId)
    })

    const userData = await response.json()

    if(!response.ok) {
        return null
    }
    
    favoriteContainer.innerHTML = ""

    for (let favorite of userData.currentUser.wishlist) {
        let favoriteDestinationItem = document.createElement("div")
        favoriteDestinationItem.innerHTML = `<img id="favoriteImgBox" src="${favorite.imgurl}" alt="Picture of ${favorite.countryName}"><div id="favoriteTextBox">Your saved destination is the beautiful capital ${favorite.countryName}</div>`
        favoriteContainer.append(favoriteDestinationItem)
    }

})