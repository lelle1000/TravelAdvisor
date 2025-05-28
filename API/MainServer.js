import { LogIn } from "./Classes.js";

const homePageRoute = new URLPattern({ pathname: "/homepage" });
const homePageSigninRoute = new URLPattern({ pathname: "/homepage/signin" });
const homePageLoginRoute = new URLPattern({ pathname: "/homepage/loggedin" });
const searchPageRoute = new URLPattern({ pathname: "/searchpage/loggedin" })
const informationPageRoute = new URLPattern({ pathname: "/informationpage/loggedin" })
const wishListRoute = new URLPattern({ pathname: "/add/destination/wishlist" });

async function handler(request) {

    const url = new URL(request.url)

    const homePageMatch = homePageRoute.exec(url);
    const homePageSigninMatch = homePageSigninRoute.exec(url);
    const homePageLoginMatch = homePageLoginRoute.exec(url);
    const searchPageMatch = searchPageRoute.exec(url);
    const infoPageMatch = informationPageRoute.exec(url);
    const wishListMatch = wishListRoute.exec(url);

    const headersCORS = new Headers()
    headersCORS.set("Access-Control-Allow-Origin", "*");
    headersCORS.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    headersCORS.set("Access-Control-Allow-Headers", "Content-Type");
    if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: headersCORS })
    }

    console.log("Request received at:", url.pathname);



    if (homePageMatch) {
        if (request.method === "GET") {
            const UnsplashKey = "RXfEp3EulaHn3LgZG-m4BEel7MWwBee2iFESNQ7eLoc"

            async function getCapitalPhoto(capitalName) { // hämtar en bild till staden
                const response = await fetch(`https://api.unsplash.com/search/photos?query=${capitalName}&client_id=${UnsplashKey}`)
                const data = await response.json()

                if (data.results && data.results.length > 0) {
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
                        return { url: PhotoUrl, countryCapital: capital };

                    } else {
                        return null
                    }

                }

            }
            const countriesJson = await Deno.readTextFile("./countries.json");
            const countriesArray = JSON.parse(countriesJson);

            let RandomCountry = countriesArray[Math.floor(countriesArray.length * Math.random())]
            const result = await fetchCountryAndPhoto(RandomCountry);

            return new Response(JSON.stringify(result), {
                headers: headersCORS,
            });
        }
    }

    if (homePageSigninMatch) {
        if (request.method === "POST") {
            const contentType = request.headers.get("Content-Type");
            if (contentType === "application/json") {
                const requestData = await request.json();
                let passwordCharacters = ["%", "!", "/", "€", "#", "&"];
                if (!requestData.name || !requestData.password || !requestData.email) {
                    return new Response(JSON.stringify(
                        { error: "Both inputs need to be filled in" }),
                        { headers: headersCORS, status: 409 }
                    )
                }
                else {
                    const userJson = await Deno.readTextFile("./user.json");
                    const userArray = JSON.parse(userJson);
                    if (userArray.some(objekt => {
                        let name = objekt.username == requestData.name;
                        let pass = objekt.password == requestData.password;
                        let mail = objekt.gmail == requestData.email;
                        return name && pass && mail;
                    })) {
                        return new Response(JSON.stringify(
                            { error: "Account already exists!" }),
                            { headers: headersCORS, status: 409 }
                        )
                    } else if (!passwordCharacters.some(character => requestData.password.includes(character)) || requestData.password.length < 8) {
                        return new Response(JSON.stringify(
                            { error: "Password input is false!" }),
                            { headers: headersCORS, status: 409 }
                        )
                    } else if (!requestData.email.includes("@")) {
                        return new Response(JSON.stringify(
                            { error: "Email input is false!" }),
                            { headers: headersCORS, status: 409 }
                        )
                    }
                    else {
                        const newUser = new LogIn(requestData.name, requestData.password, requestData.email);
                        userArray.push(newUser);
                        await Deno.writeTextFile("./user.json", JSON.stringify(userArray, null, 2));
                        return new Response(JSON.stringify({ id: newUser.id }), { headers: headersCORS });
                    }
                }
            }
        }
    }

    if (homePageLoginMatch) {
        if (request.method === "POST") {
            const contentType = request.headers.get("Content-Type");
            if (contentType === "application/json") {
                const requestData = await request.json();
                if (!requestData.name || !requestData.password) {
                    return new Response(JSON.stringify(
                        { error: "Both inputs need to be filled in" }),
                        { headers: headersCORS, status: 409 }
                    )
                } else {
                    const userJson = await Deno.readTextFile("./user.json");
                    const userArray = JSON.parse(userJson);
                    const objektId = userArray.find(objekt => objekt.username == requestData.name);
                    if (userArray.some(objekt => {
                        let name = objekt.username == requestData.name;
                        let pass = objekt.password == requestData.password;
                        return name && pass
                    })) {
                        return new Response(JSON.stringify({ id: objektId.id }), {
                            status: 200,
                            headers: headersCORS
                        })
                    } else {
                        return new Response(JSON.stringify(
                            { error: "Wrong input!" }),
                            { headers: headersCORS, status: 409 }
                        )
                    }
                }
            }
        }
    }

    if (searchPageMatch) {
        if (request.method == "GET") {
            let results = [];
            const searchfield = url.searchParams.get("searchfield")

            if (!searchfield) {
                return new Response(JSON.stringify(
                    { error: "Searchfield needs to be used or no country matches your" }),
                    { headers: headersCORS, status: 400 }
                )
            }

            if (searchfield) {

                const CountriesResponse = await fetch("https://restcountries.com/v3.1/all")
                const CountryData = await CountriesResponse.json()

                for (let country of CountryData) {
                    if (country.name.common.toLocaleLowerCase().includes(searchfield.toLocaleLowerCase())) {
                        console.log(country.name.common);

                        results.push({ country: country })
                    }
                }
                return new Response(JSON.stringify(results),
                    { headers: headersCORS, status: 200 }
                )
            }
        }
    }

    if (wishListMatch) {
        if (request.method == "POST") {
            const requestData = await request.json();
            const userJson = await Deno.readTextFile("./user.json");
            const userArray = JSON.parse(userJson);
            const userIndex = userArray.findIndex(objekt => objekt.id == requestData.userId);
            userArray[userIndex].wishlist.push(requestData);
            await Deno.writeTextFile("./user.json", JSON.stringify(userArray, null, 2));
            return new Response(JSON.stringify("Wish added in list!"), { status: 200, headers: headersCORS });
        }
    }






    if (infoPageMatch) {
        if(request.method == "POST") {
            const UnsplashKey = "RXfEp3EulaHn3LgZG-m4BEel7MWwBee2iFESNQ7eLoc"

            const requestData = await request.json()
            const capitalName = requestData.capital

            const response = await fetch(`https://api.unsplash.com/search/photos?query=${capitalName}&client_id=${UnsplashKey}`)
            if(!response.ok) {
                 return new Response(JSON.stringify({ error: "Failed to fetch image" }), { status: 500, headers: headersCORS})
            }
            const imgUrlData = await response.json()
            
            return new Response(JSON.stringify({ imgUrl: imgUrlData.results[0].urls.full }), { status: 200, headers: headersCORS})
        }
    }

}



Deno.serve(handler)
