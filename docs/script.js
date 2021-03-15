window.onhashchange = (event) => {
    console.log(location.hash);
};

fetch("data/somalia-iati-activities-2020.json")
    .then(response => response.json().then(data => populate_iati(data)))
    .catch(data => console.error(data))

function populate_iati (data) {
    let list_node = document.getElementById("iati-activity-list");
    data.forEach(item => {
        child_node = document.createElement("li");
        child_node.textContent = item.orgs.reporting.name + ": " + item.title;
        list_node.appendChild(child_node);
    });
}

fetch("data/som-3w-consolidated.json")
    .then(response => response.json().then(data => populate_3w(data)))
    .catch(data => console.error(data))

function populate_3w (data) {
    let list_node = document.getElementById("3w-activity-list");
    data.forEach(item => {
        child_node = document.createElement("li");
        child_node.textContent = get_3w_org(item) + ": " + item["#activity+project"];
        list_node.appendChild(child_node);
    });
}

function get_3w_org (activity) {
    if (activity["#org+impl+name"]) {
        return activity["#org+impl+name"];
    } else {
        return activity["#org+name+prog"];
    }
}

