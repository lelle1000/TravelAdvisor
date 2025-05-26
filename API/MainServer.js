import { LogIn } from "./Classes.js";
import { serveFile, serveDir } from "jsr:@std/http/file-server";

const Countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
    "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)",
    "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador",
    "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
    "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
    "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait",
    "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
    "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru",
    "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman",
    "Pakistan", "Palau", "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
    "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "São Tomé and Príncipe", "Saudi Arabia",
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
    "South Sudan", "South Korea", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
    "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
    "Vietnam", "Yemen", "Zambia", "Zimbabwe"
]


const homePageRoute = new URLPattern({ pathname: "/homepage" });
const homePageSigninRoute = new URLPattern({ pathname: "/homepage/signin" });
const homePageLoginRoute = new URLPattern({ pathname: "/homepage/loggedin" });
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
            const contentType = request.headers.get("Content-Type");
            if (contentType === "application/json") {
                const requestData = await request.json();
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
                    } else {
                        userArray.push(new LogIn(requestData.name, requestData.password, requestData.email));
                        await Deno.writeTextFile("./user.json", JSON.stringify(userArray, null, 2));
                        return new Response(JSON.stringify("Success!"), { headers: headersCORS });
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
                    if (userArray.some(objekt => {
                        let name = objekt.username == requestData.name;
                        let pass = objekt.password == requestData.password;
                        return name && pass;
                    })) {
                        return new Response(JSON.stringify("Login succes!"), {
                            status: 200,
                            headers: headersCORS
                        })
                    }
                }
            }
        }
    }

    if (searchPageMatch) {
        if (request.method == "GET") {
            const UnsplashKey = "RXfEp3EulaHn3LgZG-m4BEel7MWwBee2iFESNQ7eLoc"
            let results = [];
            const searchfield = url.searchParams.get("searchfield")

            if (!searchfield) {
                return new Response(JSON.stringify(
                    { error: "Searchfield needs to be used" }),
                    { headers: headersCORS, status: 400 }
                )
            }

            if (searchfield) {

                const CountriesResponse = await fetch("https://restcountries.com/v3.1/all")
                const CountryData = await CountriesResponse.json()

                for (let country of CountryData) {
                    if (country.name.common.toLocaleLowerCase().includes(searchfield.toLocaleLowerCase())) {

                        let countryCapital = country.capital[0]
                        const countryPictureResponse = await fetch(`https://api.unsplash.com/search/photos?query=${countryCapital}&client_id=${UnsplashKey}`)
                        const CapitalData = await countryPictureResponse.json()

                        if (CapitalData.results && CapitalData.results.length > 0) {
                            results.push({ country: country, imageURL: CapitalData.results[0].urls.regular })
                        }
                    }
                }
                return new Response(JSON.stringify(results,),
                    { headers: headersCORS, status: 200 }
                )
            }
        }
    }

    if (infoPageMatch) {

    }

}



Deno.serve(handler)

//https://restcountries.com/v3.1/all