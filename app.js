const apiKey = "p1SOAI5F7toQx0FrMpVfCmD8rP6Ir7eUuMHaEDba";

function getRepo() {
    let userInput = document.getElementById("npsList").value;
    let dynamicUrl = `https://developer.nps.gov/api/v1/parks?stateCode=${userInput}&api_key=${apiKey}`;
    
    //fetch URL
    fetch(dynamicUrl)
    .then(handleErrors)
    .then(response => console.log("ok") )
    .catch(error => alert("Sorry, GitHub not found. Please check spelling."));
        
        // Resume program if file found
    fetch(dynamicUrl)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert("Something went wrong. Try again later."));
}



    /*.then(response => {
        if (response.ok) {
            return respnse.json();
        }
        thro new Erro(response.statusText);
    })
    .then (responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });*/


function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}


function displayResults(responseJson) {
    let userInput = document.getElementById("npsList").value;
    console.log(userInput);
    console.log(responseJson);
    for (let i = 0; i < responseJson.data.length; i++) {
        $('.results-list').append(`<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
        <p>${responseJson.data[i].description}</p></li>`);
    }
    $(".results").removeClass("hidden");
  };



function watchForm() {
    $("form").submit(event => {
        event.preventDefault();
        //let maxResults = $('#js-max-results').val();
        if (document.getElementById("npsList").value === 0) {
            return alert("Please enter GitHub handle");
        }
        $(".results-list").empty();
        getRepo();
    });
}


$(watchForm)