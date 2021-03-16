async function hash (s) {
    const hashBuffer = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(s));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function make_3w_ref (activity) {
    let strings = [];
    Array(
        "#activity+programme",
        "#activity+project",
        "#adm1+name",
        "#adm2+name",
        "#loc+name",
        "#org+impl+name",
        "#org+name+prog",
        "#org+name+funding",
        "#sector"
    ).forEach(key => {
        strings.push(activity[key]);
    });
        
    return await hash(strings.join("|||"));
}

function load_iati (url) {

    function populate_iati (data) {
        let list_node = document.getElementById("iati-activity-list");
        data.forEach(activity => {
            let activity_node = document.createElement("li");
            let link_node = document.createElement("a");
            link_node.setAttribute("href", "activity.html#" + encodeURI(activity.identifier));
            link_node.textContent = activity.orgs.reporting.name + ": " + activity.title;
            activity_node.appendChild(link_node);
            list_node.appendChild(activity_node);
        });
    }

    fetch(url)
        .then(response => response.json().then(data => populate_iati(data)))
        .catch(data => console.error(data));

}

async function load_3w (url) {

    async function populate_3w (data) {
        let list_node = document.getElementById("3w-activity-list");
        list_node.innerHTML = "";
        for (var i = 0; i < data.length; i++) {
            let activity = data[i];
            let activity_node = document.createElement("li");
            let link_node = document.createElement("a");
            link_node.setAttribute("href", "activity.html#" + encodeURI(await make_3w_ref(activity)));
            link_node.textContent = get_3w_org(activity) + ": " + activity["#activity+project"];
            activity_node.appendChild(link_node);
            list_node.appendChild(activity_node);
        }
    }

    function get_3w_org (activity) {
        if (activity["#org+impl+name"]) {
            return activity["#org+impl+name"];
        } else {
            return activity["#org+name+prog"];
        }
    }

    fetch(url)
        .then(response => response.json().then(data => populate_3w(data)))
        .catch(data => console.error(data));

}

async function load_3w_activity (url, identifier) {

    async function show_activity (data) {
        let activity_node = document.getElementById("3w-activity");
        activity_node.innerHTML = "";
        for (var i = 0; i < data.length; i++) {
            let activity = data[i];
            let ref = await make_3w_ref(activity);
            if (ref == identifier) {
                
                let title_node = document.createElement("h2");
                title_node.textContent = activity["#activity+project"];
                activity_node.appendChild(title_node);

                let local_node = document.createElement("p");
                local_node.textContent = "Organisation type(s): " + activity["#org+prog+type"];
                activity_node.appendChild(local_node);

                let org_node = document.createElement("p");
                let org = [];
                if (activity["#org+impl+name"]) {
                    org.push(activity["#org+impl+name"] + " (implementing)");
                }
                if (activity["#org+name+prog"]) {
                    org.push(activity["#org+name+prog"] + " (programming)");
                }
                if (activity["#org+funding+name"]) {
                    org.push(activity["#org+funding+name"] + " (funding)");
                }
                org_node.textContent = "Orgs: " + org.join(", ");
                activity_node.appendChild(org_node);

                let sector_node = document.createElement("p");
                sector_node.textContent = "Cluster: " + activity["#sector"];
                activity_node.appendChild(sector_node);

                if (activity["#activity+programme"]) {
                    let programme_node = document.createElement("p");
                    programme_node.textContent = "Programme: " + activity["#activity+programme"];
                    activity_node.appendChild(programme_node);
                }

                let location_node = document.createElement("p");
                let loc = []
                new Array("#loc+name", "#adm2+name", "#adm1+name").forEach(key => {
                    if (activity[key]) {
                        loc.push(activity[key]);
                    }
                });
                location_node.textContent = "Location: " + loc.join(", ");
                activity_node.appendChild(location_node);

                return;
            }
        }
        
    }

    fetch(url)
        .then (response => response.json().then(data => show_activity(data)));
}

function load_iati_activity (url, identifier) {

    function show_activity (data) {
        let activity_node = document.getElementById("iati-activity");
        activity_node.innerHTML = "";
        for (var i = 0; i < data.length; i++) {
            let activity = data[i];
            if (activity.identifier == identifier) {

                let title_node = document.createElement("h2");
                title_node.textContent = "[" + identifier + "] " + activity.title;
                activity_node.appendChild(title_node);

                let org_node = document.createElement("p");
                org_node.textContent = "Reported by " + activity.orgs.reporting.name;
                activity_node.appendChild(org_node);

                let locations_node = document.createElement("p");
                if (activity.locations.length > 0) {
                    let s = "Locations:";
                    activity.locations.forEach(location => {
                        s += " " + location;
                    });
                    locations_node.textContent = s;
                } else {
                    locations_node.textContent = "No locations specified";
                }
                activity_node.appendChild(locations_node);

                let description_node = document.createElement("p");
                description_node.classList.add("pre");
                description_node.textContent = activity.description;
                activity_node.appendChild(description_node);
                
                return;
            }
        }
    }
    
    fetch(url)
        .then (response => response.json().then(data => show_activity(data)));
}
