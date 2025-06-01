
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


async function Test1Get () {
    const response = await fetch(endpoints.homePage)
}

async function Test1Post () {
    const response = await fetch(endpoints.homePage, {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify()
    })
}

async function Test2Post () {
    const response = await fetch(endpoints.homePageSignIn, {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify()
    })
    
}

async function Test3Post () {
    const response = await fetch(endpoints.homePageLoggedIn, {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify()
    })
    
}

async function Test4Get () {
    const response = await fetch(endpoints.searchPageLoggedIn)
}

async function Test5Post () {
    const response = await fetch(endpoints.informationPageLoggedIn, {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify()
    })
}

async function Test6Post () {
    const response = await fetch(endpoints.addDestinationWishlist, {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify()
    })
}

async function Test7Get () {
    const response = await fetch(endpoints.friendsList)
}

async function Test7Post () {
    const response = await fetch(endpoints.friendsList, {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify()
    })
}

async function Test7Delete () {
    const response = await fetch(endpoints.friendsList, {
        method: "DELETE",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify()
    })
}

async function Test8Post () {
    const response = await fetch(endpoints.friendsListUser, {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify()
    })
}

async function Test9Post () {
    const response = await fetch(endpoints.favorites, {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify()
    })
}

async function Test9Delete () {
    const response = await fetch(endpoints.favorites, {
        method: "DELETE",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify()
    })
}

async function Test10Post () {
    const response = await fetch(endpoints.bookedLoggedIn, {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify()
    })
}