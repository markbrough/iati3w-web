

/**
 * Top-level namespace/package and variables
 */
let urls = {
    activities: "https://davidmegginson.github.io/iati3w-data/activities.json",
    org_index: "https://davidmegginson.github.io/iati3w-data/org-index.json",
    sector_index: "https://davidmegginson.github.io/iati3w-data/org-index.json",
    location_index: "https://davidmegginson.github.io/iati3w-data/org-index.json",
    data_iati: "https://davidmegginson.github.io/iati3w-data/iati-data.json",
    data_3w: "https://davidmegginson.github.io/iati3w-data/3w-data.json"
};

let cache = {};


/**
 * Fetch and cache JSON data.
 */
async function fetch_json (url) {

    // Download the data if it's not already in the cache.
    if (!(url in cache)) {
        const response = await fetch(url);
        cache[url] = response.json()
    }

    return cache[url];
}


/**
 * Normalise a string for search/index
 */
function normalize_string (s) {
    return s.replace(/\s+/g, " ").trim().toLowerCase();
}


/**
 * Make an element node with optional attributes and content
 */
function el (name, attributes, content) {
    let node = document.createElement(name);
    if (attributes) {
        for (var attribute in attributes) {
            node.setAttribute(attribute, attributes[attribute]);
        }
    }
    if (content) {
        node.textContent = content;
    }
    return node;
}


/**
 * Load a list or organisations
 */
export async function load_org_list () {

    function draw (org_name, org_data) {
        const node = el("p", {class: "org-summary"});
        const url = "org.html?ref=" + encodeURIComponent(org_name);
        node.appendChild(el("a", { class: "org_name", href: url }, org_name));

        let s = " Activities:";
        ["implementing", "programming", "funding"].forEach(role => {
            if (role in org_data.activities && org_data.activities[role].length > 0) {
                s += " " + org_data.activities[role].length + " (" + role + ")";
            }
        });
        node.appendChild(el("span", { class: "info" }, s));

        return node;
    };

    const orgs = await fetch_json(urls.org_index);
    const container = document.getElementById("content");
    container.innerHTML = "";
    Object.keys(orgs).sort().forEach(org_name => {
        if (org_name) {
            container.appendChild(draw(org_name, orgs[org_name]));
        }
    });
}


/**
 * Load an org
 */
export async function load_org () {

    function draw (org, container) {
        container.appendChild(el("h2", {}, "Organisation: " + org_name));

        // Partners
        let sect = el("section", {id: "partners"});
        let partners = Object.keys(org.partners).sort();
        let n = partners.length;
        sect.appendChild(el("h3", {}, "Partners"));
        if (n > 0) {
            sect.appendChild(el("p", {}, org_name + " works with " + n + (n > 1 ? " partners" : " partner") + " in Somalia:"));
            let list = el("ul");
            partners.forEach(partner => {
                let item = el("li");
                item.appendChild(el("a", {href: "org.html?ref=" + encodeURIComponent(partner)}, partner));
                item.appendChild(el("span", {class: "info"}, " (" + org.partners[partner] + ")"));
                list.appendChild(item);
            });
            sect.appendChild(list);
        } else {
            sect.appendChild(el("p", {}, "No known partners."));
        }
        container.appendChild(sect);

        // Sectors
        sect = el("section", {id: "sectors"});
        sect.appendChild(el("h3", {}, "Sectors"));
        let sectors = Object.keys(org.sectors).sort();
        if (sectors.length > 0) {
            sect.appendChild(el("p", {}, org_name + " works in " + sectors.length + (sectors.length > 1 ? " sectors" : " sector") + " in Somalia:"));
            let list = el("ul");
            sectors.forEach(sector => {
                let item = el("li");
                item.appendChild(el("a", {href: "../sectors/sector.html?ref=" + encodeURIComponent(sector)}, sector));
                list.appendChild(item);
            });
            sect.appendChild(list);
        }
        container.appendChild(sect);
        
        // Locations
        sect = el("section", {id: "locations"});
        sect.appendChild(el("h3", {}, "Locations"));
        let locations = Object.keys(org.locations).sort();
        if (locations.length > 0) {
            sect.appendChild(el("p", {}, org_name + " works in " + locations.length + (locations.length > 1 ? " locations" : " location") + " in Somalia:"));
            let list = el("ul");
            locations.forEach(location => {
                let item = el("li");
                item.appendChild(el("a", {href: "../locations/location.html?ref=" + encodeURIComponent(location)}, location));
                list.appendChild(item);
            });
            sect.appendChild(list);
        }
        container.appendChild(sect);
        
        // Activities
        sect = el("section", {id: "activities"});
        sect.appendChild(el("h3", {}, "Activities"));

        let unique_activities = new Set();
        ["implementing", "programming", "funding"].forEach(role => {
            if (role in org.activities) {
                org.activities[role].forEach(activity => {
                    unique_activities.add(activity.identifier);
                });
            }
        });
        n = unique_activities.size;
        sect.appendChild(el("p", {}, org_name + " participates in " + n + (n > 1 ? " activities" : " activity") + " in Somalia."));
        ["implementing", "programming", "funding"].forEach(role => {
            if (role in org.activities) {
                subsect = el("section", {id: "activities." + role});
                subsect.appendChild(el("h4", {}, "As " + role + " partner"));
                list = el("ul");
                console.log(role, org.activities);
                org.activities[role].forEach(activity => {
                    item = el("li", {});
                    item.appendChild(el("a", {href: "../activity.html#" + encodeURIComponent(activity.identifier)}, activity.title));
                    list.appendChild(item);
                });
                subsect.appendChild(list);
                sect.appendChild(subsect);
            }
        });

        container.appendChild(sect);
    }

    const org_name = new URLSearchParams(window.location.search).get('ref');
    const orgs = await fetch_json(urls.org_index);
    let container = document.getElementById("content");
    container.innerHTML = "";
    if (org_name in orgs) {
        draw(orgs[org_name], container);
    } else {
        console.error(org_name, " not found");
    }
}
