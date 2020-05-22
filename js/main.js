const URL = "/json/list.json";
const tbody = document.querySelector("#tbody");

getData();

function getData() {
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            upDateTable(data);
        });
}

function upDateTable(data) {
    data.forEach((obj) => {
        console.log(obj);
        const tr = document.createElement("tr");
        const thTitle = document.createElement("th");
        const thHref = document.createElement("th");
        const thEdit = document.createElement("th");
        const thRemove = document.createElement("th");

        const link = document.createElement("a");
        link.setAttribute("href", obj.href);
        link.innerText = obj.href;

        thTitle.innerText = obj.title;
        tr.appendChild(thTitle);
        thHref.innerText = obj.href;
        tr.appendChild(link);

        tbody.appendChild(tr);
    });
}