const urlParams = new URLSearchParams(window.location.search);
// get id from url Params
const idOfHero = urlParams.get("id");

let xhttp = new XMLHttpRequest();
let loader = document.getElementsByClassName("loader")[0];
// show loader
loader.style.display = "block";
// search hero from his id
url = new URL(idOfHero, "https://www.superheroapi.com/api.php/2750506201844230/");
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

        let result = JSON.parse(xhttp.responseText);

        let container = document.getElementById("container");

        if (result.response == "success") {

            // hide loader
            loader.style.display = "none";
            // add info of superhero container   
            container.innerHTML = `  <div class="col-sm-5">
            <div class="container" >
              <h1 id="name">${result.name}</h1>
            <dl>
                <dt>Full Name</dt>
                <dd id="full-name">${result.biography["full-name"]}</dd>
                <dt>Place of Birth</dt>
                <dd id="place-of-birth">${result.biography["place-of-birth"]}</dd>
                <dt>First Appearance</dt>
                <dd id="first-appearance">${result.biography["first-appearance"]}</dd>
                <dt>Publisher</dt>
                <dd id="publisher">${result.biography.publisher}</dd>
            </dl>
            </div>
            </div>
            <div class="col-sm-5"><img
            src=${result.image.url} style="height:15em; padding:5px;" alt="profile pic of superhero">
            </div>`

        }
    }
};

xhttp.open("GET", url, true);
xhttp.send();
