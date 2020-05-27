const URL = "https://api.typeform.com/forms";
const TOKEN = "Bearer 567g2tjWHKDFnS2oVCZE6iVKYeSLWwSG9qAAbsdQJSDZ";
const URL_RESPONSES = "https://api.typeform.com/forms/{form_id}/responses";
const tbody = document.querySelector("#tbody");
let state = { data: [] };
main();

async function main() {
    const result = await getData();
    console.log(result);
    state = {...state, data: result.items };
    upDateTable();
}

function getResponses(formId) {
    const urlResponses = URL_RESPONSES.replace("{form_id}", formId);
    return fetch(urlResponses, {
        headers: {
            //read about headres in fetch documentation
            Authorization: TOKEN,
        },
    }).then((response) => response.json());
}

function getData() {
    return fetch(URL, {
        headers: {
            //read about headres in fetch documentation
            Authorization: TOKEN,
        },
    }).then((response) => response.json());
}

function upDateTable() {
    const { data } = state; //destricturing read about it
    tbody.innerHTML = null;
    data.forEach(async(obj) => {
        console.log(obj);
        const tr = document.createElement("tr");

        const tdTitle = document.createElement("td");
        const tdHref = document.createElement("td");
        const tdEdit = document.createElement("td");
        const tdRemove = document.createElement("td");
        const tdLastUpdate = document.createElement("td");
        const tdResponses = document.createElement("td");

        const hreflink = document.createElement("a");
        hreflink.setAttribute("href", obj.self.href);
        hreflink.innerText = obj.self.href;

        tdTitle.innerText = obj.title;

        const editLink = document.createElement("a");
        editLink.setAttribute("href", "/pages/edit.html?id="); //+ obj.id);
        editLink.innerText = "Edit";

        const removeLink = document.createElement("a");
        removeLink.setAttribute("href", "#");
        removeLink.innerText = "Remove";

        let lastUpdateFormatted = "";
        try {
            lastUpdate = new Date(obj.last_updated_at);
            lastUpdateFormatted = new Intl.DateTimeFormat("es-ES").format(lastUpdate);
        } catch (error) {}

        tdLastUpdate.innerText = lastUpdateFormatted;
        tdResponses.innerText = obj.responses;
        tr.appendChild(tdTitle);
        tr.appendChild(tdHref).appendChild(hreflink);
        tr.appendChild(tdLastUpdate);
        tr.appendChild(tdResponses);
        tr.appendChild(tdEdit).appendChild(editLink);
        tr.appendChild(tdRemove).appendChild(removeLink);
        removeLink.id = obj.id;

        removeLink.addEventListener("click", removeItem);

        tbody.appendChild(tr);
        const resultGetResponses = await getResponses(obj.id);
        console.log(resultGetResponses);
    });
}

function removeItem() {
    const { data } = state;
    console.log(state);
    const id = event.target.id;
    const upDatedData = data.filter((obj) => obj.id !== id);
    state = {...state, data: upDatedData };
    upDateTable();
    console.log(id);
}

//******* STEP 2 ***********