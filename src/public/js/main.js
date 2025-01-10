const { response } = require("express");

function getRandom() {
    fetch("https://motivational-quotes-api.onrender.com/quotes/random")
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("quote").innerHTML = data.quote
            document.getElementById("person").innerHTML = data.person
        })
        .catch((err) => console.log(err))
}
