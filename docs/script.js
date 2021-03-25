import * as Nunjucks from "./modules/nunjucks.min.js";

var env = new nunjucks.configure();

env.addFilter('urlenc', encodeURIComponent);


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
 * Render a template in an HTML <script> element and return the text.
 */
function render_template (template_id, data) {
    return nunjucks.renderString(document.getElementById(template_id).innerHTML, data);
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
    const org_name = new URLSearchParams(window.location.search).get('ref');
    const orgs = await fetch_json(urls.org_index);
    const container = document.getElementById("content");
    if (org_name in orgs) {
        console.log(orgs[org_name]);
        container.innerHTML = render_template("template.org", {
            org_name: org_name,
            info: orgs[org_name]
        });
    } else {
        console.error(org_name, " not found");
    }
}
