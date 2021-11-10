const { response } = require("express");

function getRandom() {
    fetch("link")
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("quote").innerHTML = data.quote
            document.getElementById("person").innerHTML = data.person
            getInfo(data.quote)
        })
        .catch((err) => console.log(err))
}