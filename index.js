var xhttp = new XMLHttpRequest();
var input = document.getElementById("superhero-name");
var favList = JSON.parse(localStorage.getItem("idlist"));
var loader = document.getElementsByClassName("loader")[0];

// favlist is not created, create one
if (!favList) {
    favList = {
        "id": []
    };
    localStorage.setItem("idlist", JSON.stringify(favList));
}
document.addEventListener("click", function (e) {
    let ele = e.target;
    // superhero is favourite
    if (ele.className.includes("favourite")) {
        if (ele.style.color == "black") {
            // favourite superhero
            ele.style.color = "yellow";
            favList.id.push(ele.id);

        } else {
            // Unfavourite superhero
            ele.style.color = "black";
            favList.id.pop(ele.id);

        }
        localStorage.setItem("idlist", JSON.stringify(favList));
        console.log(localStorage.getItem("idlist"));
    }
    console.log(ele)
});
// as user typed this function would be called
input.addEventListener("input", function (eve) {
    // show loader
    loader.style.display = "block";
    url = new URL(input.value, "https://www.superheroapi.com/api.php/2750506201844230/search/");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
           
            let result = JSON.parse(xhttp.responseText);
            // results found on typed name
            let container = document.getElementById("ul");
            let itemOfContainer = "";
            if (result.response == "success") {
                for (var x of result.results) {
                    console.log(x.name);

                    itemOfContainer += `<span id="item-${x.id}"> <div  class="col-sm-5" id="item+${x.id}" >
                    <h3 id="name"> <a href="/superhero.html?id=${x.id}">${x.name}</a></h3>
                    <dl>
                        <dt>Full Name</dt>
                        <dd id="full-name">${x.biography["full-name"]}
                        </dd>
                        <dt>Place Of Birth</dt>
                        <dd id="city">${x.biography["place-of-birth"]}</dd>
                        <dt>Publisher</dt>
                        <dd id="publisher">${x.biography.publisher}</dd>
                    </dl>
                </div>
                <div class="col-sm-4" id="profile-pic"><a href="/superhero.html?id=${x.id}"><img
                            src=${x.image.url} style="height:15em; padding:5px;" alt="profile pic of superhero"></a></div>
                <div class="col-sm-2"><i class="fa fa-star  favourite"style="color:black" aria-hidden="true" id=${x.id}></i>
                </div> </span>`
                }
            } else {
                // no result found
                itemOfContainer = "sorry!,No result found for typed name."
            }
            // hide loader
             loader.style.display = "none";
            container.innerHTML = itemOfContainer;
            
        }
    };

    xhttp.open("GET", url, true);
    xhttp.send();
});

