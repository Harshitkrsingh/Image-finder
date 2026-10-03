const ACCESS_TOKEN = "tSmFQoHtOtVnZLGPQvEgGzi-RkeCYeY-liO471STvwU";

let keyword = document.getElementById("user-name");
let btn = document.getElementById("btn");
let secdiv = document.getElementById("sec-div");
let loadmore = document.getElementById("loadmorebtn");

let page = 1;
let val = "nature";

window.addEventListener("load", () => {
    fetchdata(val);
});
btn.addEventListener("click", () => {
    page = 1;
    secdiv.innerHTML = "";
    val = keyword.value.trim();
    keyword.value = "";
    if (val === "") {
        val = "nature";
    }
    fetchdata(val);
});


async function fetchdata(val) {

    let response = await fetch(
        `https://api.unsplash.com/search/photos?query=${val}&page=${page}&client_id=${ACCESS_TOKEN}`
    );
    let result = await response.json();
    if (result.results.length < 1) {
        secdiv.innerHTML = "<h2>Not Found</h2>";
    } else {
        displayimg(result);
    }
}


function displayimg(res) {

    res.results.map((data) => {

        let div = document.createElement("div");

        div.setAttribute("class", "box1");

        div.innerHTML = `
            <div class="sec-pfl">
                <img src="${data.user.profile_image.large}" alt="">
                <p>${data.user.name}</p>
            </div>

            <div class="sec-img">
                <img src="${data.urls.regular}" alt="">
            </div>

            <p>${data.alt_description || "Beautiful image from Unsplash"}</p>
        `;

        secdiv.append(div);

    });

    secdiv.appendChild(loadmore);

    loadmore.classList.add("visible");
}
loadmore.addEventListener("click", () => {

    page++;

    fetchdata(val);

});