import * as Nunjucks from "./modules/nunjucks.min.js";

const ORG_ROLE_LABELS = {
    implementing: "Implementing partner",
    programming: "Programming partner",
    funding: "Funding partner"
};

const SECTOR_TYPE_LABELS = {
    dac: "OECD sectors",
    humanitarian: "Humanitarian clusters"
};

const LOCATION_TYPE_LABELS = {
    admin1: "Regions",
    admin2: "Districts",
    unclassified: "Unclassified"
};

nunjucks.installJinjaCompat();

var env = new nunjucks.configure();

env.addFilter('urlenc', encodeURIComponent);

env.addFilter('plural', (n, singular, plural) => {
    if (n > 1) {
        return "" + n + " " + plural;
    } else {
        return "" + n + " " + singular;
    }
});

env.addFilter('role', code => { return ORG_ROLE_LABELS[code] });
env.addFilter('sector', code => { return SECTOR_TYPE_LABELS[code] });
env.addFilter('location', code => { return LOCATION_TYPE_LABELS[code] });


/**
 * Top-level namespace/package and variables
 */
let urls = {
    activities: "https://davidmegginson.github.io/iati3w-data/activities.json",
    org_index: "https://davidmegginson.github.io/iati3w-data/org-index.json",
    sector_index: "https://davidmegginson.github.io/iati3w-data/sector-index.json",
    location_index: "https://davidmegginson.github.io/iati3w-data/location-index.json",
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
 * Load a list of organisations
 */
export async function load_org_list () {
    const orgs = await fetch_json(urls.org_index);
    const container = document.getElementById("content");
    container.innerHTML = render_template("template.orglist", {
        orgs: orgs
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

/**
 * Load a list of sectors
 */
export async function load_sector_list () {
    const sectors = await fetch_json(urls.sector_index);
    console.log(sectors);
    const container = document.getElementById("content");
    container.innerHTML = render_template("template.sectorlist", {
        sectors: sectors
    });
}


/**
 * Load a sector
 */
export async function load_sector () {
    const sector_name = new URLSearchParams(window.location.search).get('ref');
    const sectors = await fetch_json(urls.sector_index);
    const container = document.getElementById("content");
    console.log(sectors);
    if (sector_name in sectors.humanitarian) {
        container.innerHTML = render_template("template.sector", {
            sector_name: sector_name,
            info: sectors.humanitarian[sector_name]
        });
        // FIXME!!!
    } else if (sector_name in sectors.dac) {
        container.innerHTML = render_template("template.sector", {
            sector_name: sector_name,
            info: sectors.dac[sector_name]
        });
    } else {
        console.error(sector_name, " not found");
    }
}

/**
 * Load an activity
 */
export async function load_activity () {
    const identifier = new URLSearchParams(window.location.search).get('ref');
    const activities = await fetch_json(urls.activities);
    const container = document.getElementById("content");
    for (var i = 0; i < activities.length; i++) {
        if (activities[i].identifier == identifier) {
            container.innerHTML = render_template("template.activity", {
                activity: activities[i]
            });
            console.log(activities[i]);
            return;
        }
    }
    console.error(identifier, " not found");
}
