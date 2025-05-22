
const homePageRoute = new URLPattern({ pathname: "/homepage" });
const homePageSigninRoute = new URLPattern({ pathname: "/homepage/signin" });
const homePageLoginRoute = new URLPattern({ pathname: "/homepage/loggedoin" });
const searchPageRoute = new URLPattern({ pathname: "/searchpage/loggedin" })
const informationPageRoute = new URLPattern({ pathname: "/informationpage/loggedin" })

async function handler(request) {

    const url = new URL(request.url)

    const homePageMatch = homePageRoute.exec(url);
    const homePageSigninMatch = homePageSigninRoute.exec(url);
    const homePageLoginMatch = homePageLoginRoute.exec(url);
    const searchPageMatch = searchPageRoute.exec(url);
    const infoPageMatch = informationPageRoute.exec(url);

    const headersCORS = new Headers()
    headersCORS.set("Access-Control-Allow-Origin", "*");
    headersCORS.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    headersCORS.set("Access-Control-Allow-Headers", "Content-Type");
    if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: headersCORS })
    }


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
                        return { url: PhotoUrl, countryname: capital };

                    } else {
                        return null
                    }

                }

            }

            let RandomCountry = Countries[Math.floor(Countries.length * Math.random())]
            const result = await fetchCountryAndPhoto(RandomCountry);

            return new Response(JSON.stringify(result), {
                headers: headersCORS,
            });
        }
    }

    if (homePageSigninMatch) {
        if (request.method === "POST") {
            const contentType = request.headers.get("content-type");
            if (contentType === "application/json") {
                const requestData = await request.json();
                if (!requestData.name || !requestData.password || !requestData.email) {
                    return new Response(JSON.stringify(
                        { error: "Both inputs need to be filled in" }),
                        { headers: headersCORS, status: 409 }
                    )
                }
            }
        }
    }

    if (homePageLoginMatch) {
        if (request.method === "GET") {
            const contentType = request.headers.get("content-type");
            if (contentType === "application/json") {
                const requestData = await request.json();
                if (!requestData.name || !requestData.password) {
                    return new Response(JSON.stringify(
                        { error: "Both inputs need to be filled in" }),
                        { headers: headersCORS, status: 409 }
                    )
                }
            }
        }
    }

    if (searchPageMatch) {

    }

    if (infoPageMatch) {

    }

}



Deno.serve(handler)

//https://restcountries.com/v3.1/all