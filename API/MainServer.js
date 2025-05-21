
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
    headersCORS.set("Access-Contro-Allow-Origin", "*");
    headersCORS.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    headersCORS.set("Access-Control-Allow-Headers", "Content-Type");
    if (request.method === "OPTIONS") {
        return new Response(null, { headersCORS })
    }


    if (homePageMatch) {

    }

    if (homePageSigninMatch) {

    }

    if (homePageLoginMatch) {

    }

    if (searchPageMatch) {

    }

    if (infoPageMatch) {

    }

}



Deno.serve(handler)

//https://restcountries.com/v3.1/all