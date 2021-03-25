/**
 * Top-level namespace/package and variables
 */
let i3w = {
    urls: {
        activities: "https://davidmegginson.github.io/iati3w-data/activities.json",
        org_index: "https://davidmegginson.github.io/iati3w-data/org-index.json",
        sector_index: "https://davidmegginson.github.io/iati3w-data/org-index.json",
        location_index: "https://davidmegginson.github.io/iati3w-data/org-index.json",
        data_iati: "https://davidmegginson.github.io/iati3w-data/iati-data.json",
        data_3w: "https://davidmegginson.github.io/iati3w-data/3w-data.json"
    },
    cache: {}
};


/**
 * Fetch and cache JSON data.
 */
i3w.fetch_json = async function (url) {

    // Download the data if it's not already in the cache.
    if (!(url in i3w.cache)) {
        const response = await fetch(url);
        i3w.cache[url] = response.json()
    }

    return i3w.cache[url];
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
i3w.el = function (name, attributes, content) {
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
 * Load a list or organisations
 */
i3w.load_org_list = async function () {

    function draw (org_name, org_data) {
        const node = i3w.el("p", {class: "org-summary"});
        const url = "org.html#" + encodeURIComponent(org_name);
        node.appendChild(i3w.el("a", { class: "org_name", href: url }, org_name));

        let s = " Activities:";
        ["implementing", "programming", "funding"].forEach(role => {
            if (role in org_data.activities && org_data.activities[role].length > 0) {
                s += " " + org_data.activities[role].length + " (" + role + ")";
            }
        });
        node.appendChild(i3w.el("span", { class: "info" }, s));

        return node;
    };

    const orgs = await i3w.fetch_json(i3w.urls.org_index);
    const container = document.getElementById("content");
    container.innerHTML = "";
    Object.keys(orgs).sort().forEach(org_name => {
        if (org_name) {
            container.appendChild(draw(org_name, orgs[org_name]));
        }
    });
};


/**
 * Load an org
 */
i3w.load_org = async function (org_name) {

    function draw (org, container) {
        container.appendChild(i3w.el("h2", {}, "Organisation: " + org_name));

        // Partners
        let sect = i3w.el("section", {id: "partners"});
        let partners = Object.keys(org.partners).sort();
        let n = partners.length;
        sect.appendChild(i3w.el("h3", {}, "Partners"));
        if (n > 0) {
            sect.appendChild(i3w.el("p", {}, org_name + " works with " + n + (n > 1 ? " partners" : " partner") + " in Somalia:"));
            let list = i3w.el("ul");
            partners.forEach(partner => {
                let item = i3w.el("li");
                item.appendChild(i3w.el("a", {href: "org.html#" + encodeURIComponent(partner)}, partner));
                item.appendChild(i3w.el("span", {class: "info"}, " (" + org.partners[partner] + ")"));
                list.appendChild(item);
            });
            sect.appendChild(list);
        } else {
            sect.appendChild(i3w.el("p", {}, "No known partners."));
        }
        container.appendChild(sect);

        // Sectors
        sect = i3w.el("section", {id: "sectors"});
        sect.appendChild(i3w.el("h3", {}, "Sectors"));
        let sectors = Object.keys(org.sectors).sort();
        if (sectors.length > 0) {
            sect.appendChild(i3w.el("p", {}, org_name + " works in " + sectors.length + (sectors.length > 1 ? " sectors" : " sector") + " in Somalia:"));
            let list = i3w.el("ul");
            sectors.forEach(sector => {
                let item = i3w.el("li");
                item.appendChild(i3w.el("a", {href: "../sectors/sector.html#" + encodeURIComponent(sector)}, sector));
                list.appendChild(item);
            });
            sect.appendChild(list);
        }
        container.appendChild(sect);
        
        // Locations
        sect = i3w.el("section", {id: "locations"});
        sect.appendChild(i3w.el("h3", {}, "Locations"));
        let locations = Object.keys(org.locations).sort();
        if (locations.length > 0) {
            sect.appendChild(i3w.el("p", {}, org_name + " works in " + locations.length + (locations.length > 1 ? " locations" : " location") + " in Somalia:"));
            let list = i3w.el("ul");
            locations.forEach(location => {
                let item = i3w.el("li");
                item.appendChild(i3w.el("a", {href: "../locations/location.html#" + encodeURIComponent(location)}, location));
                list.appendChild(item);
            });
            sect.appendChild(list);
        }
        container.appendChild(sect);
        
        // Activities
        sect = i3w.el("section", {id: "activities"});
        sect.appendChild(i3w.el("h3", {}, "Activities"));

        let unique_activities = new Set();
        ["implementing", "programming", "funding"].forEach(role => {
            if (role in org.activities) {
                org.activities[role].forEach(activity => {
                    unique_activities.add(activity.identifier);
                });
            }
        });
        n = unique_activities.size;
        sect.appendChild(i3w.el("p", {}, org_name + " participates in " + n + (n > 1 ? " activities" : " activity") + " in Somalia."));
        ["implementing", "programming", "funding"].forEach(role => {
            if (role in org.activities) {
                subsect = i3w.el("section", {id: "activities." + role});
                subsect.appendChild(i3w.el("h4", {}, "As " + role + " partner"));
                list = i3w.el("ul");
                console.log(role, org.activities);
                org.activities[role].forEach(activity => {
                    item = i3w.el("li", {}, activity.title);
                    
                    list.appendChild(item);
                });
                subsect.appendChild(list);
                sect.appendChild(subsect);
            }
        });

        container.appendChild(sect);
    }

    const orgs = await i3w.fetch_json(i3w.urls.org_index);
    let container = document.getElementById("content");
    container.innerHTML = "";
    if (org_name in orgs) {
        draw(orgs[org_name], container);
    } else {
        console.error(org_name, " not found");
    }
};


/**
 * Load all 3W activities
 */
i3w.load_3w = async function () {
    const data = await i3w.fetch_json(i3w.urls.data_3w);
    i3w.show_activity_list(data, document.getElementById("activity-list"));
};

// FIXME - stupid way to do it
window.addEventListener("hashchange", () => window.location.reload(true));

