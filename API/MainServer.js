

async function handler (request) {

    const url = new URL(request.url)

    const headersCORS = new Headers()
    headersCORS.set("Access-Contro-Allow-Origin", "*");
    headersCORS.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    headersCORS.set("Access-Control-Allow-Headers", "Content-Type");
    if (request.method === "OPTIONS") {
        return new Response(null, { headersCORS } )
    }
}



Deno.serve(handler)

https://restcountries.com/v3.1/all