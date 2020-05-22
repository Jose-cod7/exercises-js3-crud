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

        const hreflink = document.createElement("a");
        hreflink.setAttribute("href", obj.href);
        hreflink.innerText = obj.href;

        thTitle.innerText = obj.title;

        const editLink = document.createElement("a");
        editLink.setAttribute("href", "edit.html?id=232454");
        editLink.innerText = "Edit";

        const removeLink = document.createElement("a");
        removeLink.innerText = "Remove";

        tr.appendChild(thTitle);
        tr.appendChild(thHref).appendChild(hreflink);
        tr.appendChild(thEdit).appendChild(editLink);
        tr.appendChild(thRemove).appendChild(removeLink);

        tbody.appendChild(tr);
    });
}