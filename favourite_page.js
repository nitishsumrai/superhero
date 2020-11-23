const listOfIds = JSON.parse(localStorage.getItem("idlist"));
const container = document.getElementById("container");
var loader = document.getElementsByClassName("loader")[0];
var favList = JSON.parse(localStorage.getItem("idlist"));
// show loader
loader.style.display = "block";
// favlist is not created,create one
if (!favList) {
    favList = {
        "id": []
    };
    localStorage.setItem("idlist", JSON.stringify(favList));
}

document.addEventListener("click", function (e) {
    let ele = e.target;
    // remove elem from favourite list
    if (ele.className.includes("favourite")) {
        favList.id.pop(ele.id);
        let itemToDelete = document.getElementById("item-" + ele.id);
        itemToDelete.parentElement.removeChild(itemToDelete);
    }
    localStorage.setItem("idlist", JSON.stringify(favList));
    console.log(localStorage.getItem("idlist"));

});
// call getEleOFContainer function for each superhero to add them in container
for (let x of listOfIds.id) {
    getEleOFContainer(x)
}

async function getEleOFContainer(id) {
    let result = await makeRequest("GET", "https://www.superheroapi.com/api.php/2750506201844230/" + id);
    
    if (result.response == "success") {
        // hide loader
        loader.style.display = "none";
        //   add each hero in list
        container.innerHTML += `<span id="item-${result.id}"><div  class="col-sm-5" >
       <h3 id="name"> <a href="/superhero.html?id=${result.id}">${result.name}</a></h3>
       <dl>
           <dt>Full Name</dt>
           <dd id="full-name">${result.biography["full-name"]}
           </dd>
           <dt>Place Of Birth</dt>
           <dd id="city">${result.biography["place-of-birth"]}</dd>
           <dt>Publisher</dt>
           <dd id="publisher">${result.biography.publisher}</dd>
       </dl>
       </div>
       <div class="col-sm-4" id="profile-pic"><a href="/superhero.html?id=${result.id}"><img
               src=${result.image.url} style="height:15em; padding:5px;" alt="profile pic of superhero"></a></div>
       <div class="col-sm-2"><i class="fa fa-remove  favourite"style="color:black" aria-hidden="true" id=${result.id}></i>
       </div> </span>`;
    }
}
function makeRequest(method, url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                // resolved
                resolve(JSON.parse(xhr.responseText));
            } else {
                // rejected
                reject({
                    "response": this.status,
                    "statusText": xhr.statusText
                })
            }
        };
        xhr.onerror = function () {
            // rejected
            reject({
                "status": this.status,
                "statusText": xhr.statusText
            })
        }
        xhr.send();
    });
}
