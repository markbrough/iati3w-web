window.onhashchange = (event) => {
    console.log(location.hash);
};

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

function load_3w (url) {

    function populate_3w (data) {
        let list_node = document.getElementById("3w-activity-list");
        list_node.innerHTML = "";
        data.forEach(activity => {
            activity.ref = make_ref(activity);
            let activity_node = document.createElement("li");
            let link_node = document.createElement("a");
            link_node.setAttribute("href", "activity.html?ref=" + encodeURI(make_ref(activity)));
            link_node.textContent = get_3w_org(activity) + ": " + activity["#activity+project"];
            activity_node.appendChild(link_node);
            list_node.appendChild(activity_node);
        });
    }

    function make_ref (activity) {
        return "foo";
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
