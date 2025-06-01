
const endpoints = {
    homePage: "http://localhost:8000/homepage", // Test 1
    homePageSignIn: "http://localhost:8000/homepage/signin", // Test 2
    homePageLoggedIn: "http://localhost:8000/searchpage/loggedin", // Test 3
    searchPageLoggedIn: "http://localhost:8000/searchpage/loggedin", // Test 4
    informationPageLoggedIn: "http://localhost:8000/informationpage/loggedin", // Test 5
    addDestinationWishlist: "http://localhost:8000/add/destination/wishlist", // Test 6
    friendsList: "http://localhost:8000/friends/list", // Test 7
    friendsListUser: "http://localhost:8000/friends/list/user", // Test 8
    favorites: "http://localhost:8000/favorites", // Test 9
    bookedLoggedIn: "http://localhost:8000/booked/loggedin" // Test 10
}

function responseCHECK(divId, color, response, endpoint) {
    const container = document.querySelector(`${divId}`);
    container.style.backgroundColor = color;
    container.innerHTML = `${response.status}, ${response.statusText}<br>${endpoint}`;
}

function catchError(divId, error) {
    const container = document.querySelector(`${divId}`);
    container.style.backgroundColor = "red";
    container.textContent = "ERRORRRR LINUS!!!", error;
}


async function Test1Get() {
    try {
        const response = await fetch(endpoints.homePage)
        console.log(response);
        if (response.ok) {
            console.log(endpoints.homePage)
            responseCHECK("#test1", "green", response, endpoints.homePage);
        } else {
            responseCHECK("#test1", "red", response, endpoints.homePage)
        }
    } catch (error) {
        catchError("#test1", error);
    }
}

async function Test1Post() {
    try {
        const response = await fetch(endpoints.homePageSignIn, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "hasse", password: "123456789%", email: "hasse@gmail.com" })
        })
        if (response.ok) {
            responseCHECK("#test2", "green", response, endpoints.homePageSignIn);
        } else {
            responseCHECK("#test2", "red", response, endpoints.homePageSignIn);
        }
    } catch (error) {
        catchError("#test2", error);
    }
}

async function Test2Post() {
    try {
        const response = await fetch(endpoints.homePageLoggedIn, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "hasse", password: "123456789%" })
        })
        if (response.ok) {
            responseCHECK("#test3", "green", response, endpoints.homePageLoggedIn);
        } else {
            responseCHECK("#test3", "red", response, endpoints.homePageLoggedIn);
        }
    } catch (error) {
        catchError("#test3", error);
    }
}

async function Test3Post() {
    try {
        const response = await fetch(endpoints.homePage, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    userId: 1,
                    data: {
                        "url": "https://images.unsplash.com/photo-1612810413509-cd39cf2d1697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTM3Njh8MHwxfHNlYXJjaHwxfHxNb2dhZGlzaHV8ZW58MHx8fHwxNzQ4NzgyOTM4fDA&ixlib=rb-4.1.0&q=80&w=400",
                        "capital": "Mogadishu",
                        "continent": "Africa",
                        "countryName": "Somalia"
                    }
                })
        })
        if (response.ok) {
            responseCHECK("#test4", "green", response, endpoints.homePage);
        } else {
            responseCHECK("#test4", "red", response, endpoints.homePage);
        }
    } catch (error) {
        catchError("#test4", error);
    }
}

async function Test4Get() {
    try {
        const response = await fetch(endpoints.searchPageLoggedIn)
        if (response.ok) {
            responseCHECK("#test5", "green", response, endpoints.searchPageLoggedIn);
        } else {
            responseCHECK("#test5", "red", response, endpoints.searchPageLoggedIn);
        }
    } catch (error) {
        catchError("#test5", error);
    }
}

async function Test5Post() {
    try {
        const response = await fetch(endpoints.informationPageLoggedIn, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ capital: "Mogadishu" })
        })
        if (response.ok) {
            responseCHECK("#test6", "green", response, endpoints.informationPageLoggedIn);
        } else {
            responseCHECK("#test6", "red", response, endpoints.informationPageLoggedIn);
        }
    } catch (error) {
        catchError("#test6", error);
    }
}

async function Test6Post() {
    try {
        const response = await fetch(endpoints.addDestinationWishlist, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                countryCapital: "Mogadishu",
                imgurl: "https://images.unsplash.com/photo-1612810413509-cd39cf2d1697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTM3Njh8MHwxfHNlYXJjaHwxfHxNb2dhZGlzaHV8ZW58MHx8fHwxNzQ4NzgyOTM4fDA&ixlib=rb-4.1.0&q=80&w=400",
                userId: 1
            })
        })
        if (response.ok) {
            responseCHECK("#test7", "green", response, endpoints.addDestinationWishlist);
        } else {
            responseCHECK("#test7", "red", response, endpoints.addDestinationWishlist);
        }
    } catch (error) {
        catchError("#test7", error);
    }
}

async function Test7Get() {
    try {
        const response = await fetch(endpoints.friendsList)
        if (response.ok) {
            responseCHECK("#test8", "green", response, endpoints.friendsList);
        } else {
            responseCHECK("#test8", "red", response, endpoints.friendsList);
        }
    } catch (error) {
        catchError("#test8", error);
    }
}

async function Test7Post() {
    try {
        const response = await fetch(endpoints.friendsList, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: 1 })
        })
        if (response.ok) {
            responseCHECK("#test9", "green", response, endpoints.friendsList);
        } else {
            responseCHECK("#test9", "red", response, endpoints.friendsList);
        }
    } catch (error) {
        catchError("#test9", error);
    }
}

async function Test7Delete() {
    try {
        const response = await fetch(endpoints.friendsList, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ friendId: 2, currentUserId: 1 })
        })
        if (response.ok) {
            responseCHECK("#test10", "green", response, endpoints.friendsList);
        } else {
            responseCHECK("#test10", "red", response, endpoints.friendsList);
        }
    } catch (error) {
        catchError("#test10", error);
    }
}

async function Test8Post() {
    try {
        const response = await fetch(endpoints.friendsListUser, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: 2 })
        })
        if (response.ok) {
            responseCHECK("#test11", "green", response, endpoints.friendsListUser);
        } else {
            responseCHECK("#test11", "red", response, endpoints.friendsListUser);
        }
    } catch (error) {
        catchError("#test11", error);
    }
}

async function Test9Post() {
    try {
        const response = await fetch(endpoints.favorites, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(1)
        })
        if (response.ok) {
            responseCHECK("#test12", "green", response, endpoints.favorites);
        } else {
            responseCHECK("#test12", "red", response, endpoints.favorites);
        }
    } catch (error) {
        catchError("#test12", error);
    }
}

async function Test9Delete() {
    try {
        const response = await fetch(endpoints.favorites, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: 1, countryCapital: "Mogadishu" })
        })
        if (response.ok) {
            responseCHECK("#test13", "green", response, endpoints.favorites);
        } else {
            responseCHECK("#test13", "red", response, endpoints.favorites);
        }
    } catch (error) {
        catchError("#test13", error);
    }
}

async function Test10Post() {
    try {
        const response = await fetch(endpoints.bookedLoggedIn, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: 1, destination: "Mogadishu" })
        })
        if (response.ok) {
            responseCHECK("#test14", "green", response, endpoints.bookedLoggedIn);
        } else {
            responseCHECK("#test14", "red", response, endpoints.bookedLoggedIn);
        }
    } catch (error) {
        catchError("#test14", error);
    }
}


async function driverFunction() {
    await Test1Get();
    await Test1Post();
    await Test2Post();
    await Test3Post();
    await Test4Get();
    await Test5Post();
    await Test6Post();
    await Test7Get();
    await Test7Post();
    await Test7Delete();
    await Test8Post();
    await Test9Post();
    await Test9Delete();
    await Test10Post()
}

driverFunction();