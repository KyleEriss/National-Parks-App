const apiKey = "p1SOAI5F7toQx0FrMpVfCmD8rP6Ir7eUuMHaEDba";

function getState(userInput, maxResults) {
    let dynamicUrl = `https://developer.nps.gov/api/v1/parks?stateCode=${userInput}&api_key=${apiKey}`;

    fetch(dynamicUrl)
        .then(handleErrors)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson, maxResults))
        .catch(error => {
            if (error.missingName) {
                alert("Sorry, GitHub not found. Please check spelling.");
            }
            else {
                alert("Something went wrong, try again later.");
            }
        });
}



function handleErrors(response) {
    if (!response.ok) {
        let error = Error(response.statusText);
        error.missingName = true;
        throw error;
    }
    return response;
}


function displayResults(responseJson, maxResults) {
    console.log(responseJson);
    if (maxResults < responseJson.data.length) {
        for (let i = 0; i < maxResults; i++) {
            $('.results-list').append(`<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
            <p>${responseJson.data[i].description}</p></li>`);
        }
    }
    else {
        for (let i = 0; i < responseJson.data.length; i++) {
            $('.results-list').append(`<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
            <p>${responseJson.data[i].description}</p></li>`);
        }
    }
    $(".results").removeClass("hidden");
};



function watchForm() {
    $("form").on("click","#npsList", (event) => {
        event.preventDefault();
        $(".results-list").empty();
        let userInput = document.getElementById("npsList").value;
        let maxResults = $('#js-max-results').val();
        getState(userInput, maxResults);
    });
}


$(watchForm)