/**
 * Top-level namespace/package and variables
 */
let i3w = {
    urls: {
        data_iati: "https://davidmegginson.github.io/iati3w-data/iati-data.json",
        data_3w: "https://davidmegginson.github.io/iati3w-data/3w-data.json"
    }
};


/**
 * Normalise a string for search/index
 */
i3w.normalize_string = function (s) {
    return s.replace(/\s+/g, " ").trim().toLowerCase();
};


/**
 * Make an element node with optional attributes and content
 */
i3w.make_element = function (name, attributes, content) {
    let node = document.createElement(name);
    if (attributes) {
        for (attribute in attributes) {
            node.setAttribute(attribute, attributes[attribute]);
        }
    }
    if (content) {
        node.textContent = content;
    }
    return node;
};


/**
 * Load all IATI activities
 */
i3w.load_iati = async function () {

    function populate_iati (data) {
        let node = document.getElementById("iati-activity-list");
        i3w.show_activity_list(data, node);
    }

    fetch(i3w.urls.data_iati)
        .then(response => response.json().then(data => populate_iati(data)))
        .catch(data => console.error(data));

};


/**
 * Load all 3W activities
 */
i3w.load_3w = async function () {

    function populate_3w (data) {
        let node = document.getElementById("3w-activity-list");
        return i3w.show_activity_list(data, node);
    }

    fetch(i3w.urls.data_3w)
        .then(response => response.json().then(data => populate_3w(data)))
        .catch(data => console.error(data));

};


/**
 * Load a specific IATI activity
 */
i3w.load_iati_activity = async function (identifier) {

    function show_activity (data) {
        let activity_node = document.getElementById("iati-activity");
        activity_node.innerHTML = "";
        for (var i = 0; i < data.length; i++) {
            if (data[i].identifier == identifier) {
                return i3w.show_activity(data[i], activity_node);
            } else {
                activity_node.appendChild(i3w.make_element(
                    "p", { class: "error" }, "IATI activity " + identifier + " not found"
                ));
            }
        }
    }
    
    fetch(i3w.urls.data_iati)
        .then (response => response.json().then(data => show_activity(data)));
}


/**
 * Load a specific 3W activity
 */
i3w.load_3w_activity = async function (identifier) {

    function show_activity (data) {
        let node = document.getElementById("3w-activity");
        for (var i = 0; i < data.length; i++) {
            if (data[i].identifier == identifier) {
                return i3w.show_activity(data[i], node);
            }
            node.appendChild(i3w.make_element(
                "p", { class: "error" }, "3W activity " + identifier + " not found."
            ));
        }
    }
    
    fetch(i3w.urls.data_3w)
        .then (response => response.json().then(data => show_activity(data)));
}


/**
 * Draw a list of IATI or 3W activities on an HTML page inside the DOM node provided.
 */
i3w.show_activity_list = function (activities, node) {

    node.innerHTML = "";

    activities.forEach(activity => {
        let item_node = i3w.make_element(
            "li", {}, (activity.source == "IATI" ? activity.reported_by : activity.orgs.programming[0]) + ": "
        );
        item_node.appendChild(i3w.make_element(
            "a", { href: "activity.html#" + encodeURI(activity.identifier) }, activity.title
        ));
        node.appendChild(item_node);
    });
    
};


/**
 * Draw an IATI or 3W activity on an HTML page inside the DOM node provided.
 */
i3w.show_activity = function (activity, node) {

    node.innerHTML = "";

    node.appendChild(i3w.make_element(
        "h2", {}, activity.title
    ));

    node.appendChild(i3w.make_element(
        "p", {}, "Activity identifier: " + activity.identifier
    ));

    node.appendChild(i3w.make_element(
        "p", {}, "Reported by: " + activity.reported_by
    ));

    node.appendChild(i3w.make_element(
        "p", {}, "Admin 1: " + activity.locations.admin1.join(", ")
    ));

    node.appendChild(i3w.make_element(
        "p", {}, "Admin 2: " + activity.locations.admin2.join(", ")
    ));

    node.appendChild(i3w.make_element(
        "p", {}, "Locations: " + activity.locations.unclassified.join(", ")
    ));

    node.appendChild(i3w.make_element(
        "p", {}, "DAC sectors: " + activity.dac_sectors.join(", ")
    ));

    node.appendChild(i3w.make_element(
        "p", {}, "Humanitarian clusters: " + activity.humanitarian_clusters.join(", ")
    ));

    node.appendChild(i3w.make_element(
        "h3", {}, "Description"
    ));

    node.appendChild(i3w.make_element(
        "p", { class: "pre" }, activity.description
    ));
    
};
