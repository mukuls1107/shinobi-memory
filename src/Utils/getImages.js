
export default function loadData(endpoint) {

    const API_URL = `https://dattebayo-api.onrender.com/${endpoint}/0`
    const MAX_CHARACTERS = 10;

    fetch(API_URL).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP Error! Status is: ${response.status}`)
        }

        return response
    }).then((response) => {
        const data = response.json()
        // return data.
        return data
    }).then((jsonData) => {
        console.log(jsonData)

    })
}


