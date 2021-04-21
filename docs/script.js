////////////////////////////////////////////////////////////////////////
// Top-level browser-side module to render web pages.
//
// This module uses templates embedded in the static HTML pages
// themselves, together with the Nunjucks templating library.
//
// Started by David Megginson, 2021-03
////////////////////////////////////////////////////////////////////////

import * as Nunjucks from "./modules/nunjucks.min.js";


//
// Constants
//

const BASE_DATA_URL = "https://davidmegginson.github.io/iati3w-data/";
// const BASE_DATA_URL = "https://files.localdomain/DI/iati3w-data/output/"; // for local testing; change as needed

const DATA_URLS = {
    activities: BASE_DATA_URL + "activities.json",
    org_index: BASE_DATA_URL + "org-index.json",
    sector_index: BASE_DATA_URL + "sector-index.json",
    location_index: BASE_DATA_URL + "location-index.json"
};

const ORG_ROLE_LABELS = {
    implementing: "Implementing partner",
    programming: "Programming partner",
    funding: "Funding partner"
};

const ORG_SCOPE_LABELS = {
    local: "Local or national actor",
    regional: "Regional actor",
    international: "International actor",
    unknown: "Undetermined actor"
};

const SECTOR_TYPE_LABELS = {
    dac: "OECD-DAC purpose classification",
    humanitarian: "Humanitarian cluster"
};

const LOCATION_TYPE_LABELS = {
    admin1: "Region",
    admin2: "District",
    unclassified: "Unclassified location"
};


//
// Global variables
//

// Cache for loaded data
const cache = {};


//
// Nunjucks templating setup and custom filters
//

// install compability features with Jinja2
nunjucks.installJinjaCompat();

// default Nunjucks template environment
const template_env = new nunjucks.configure();

// Filter to URI encode a string
template_env.addFilter('urlenc', encodeURIComponent);

// Filter to choose singular or plural word
template_env.addFilter('plural', (n, singular, plural) => {
    if (n > 1) {
        return "" + n + " " + plural;
    } else {
        return "" + n + " " + singular;
    }
});

// Filter to truncate a string with ellipsis
template_env.addFilter('truncate', (s, length) => {
    if (! length) {
        length = 100;
    }
    if (s.length <= length) {
        return s;
    } else {
        return s.substring(0, length) + "…";
    }
});

// Filter to combine multiple strings with a connector
// If the arg is a map, join the values into a list
template_env.addFilter("join", (l, connector) => {
    if (! connector) {
        connector = ", ";
    }

    if (!l) {
        return "";
    } else {
        let values = [];
        if (Array.isArray(l)) {
            values = l;
        } else {
            for (var key in l) {
                values = values.concat(l[key]);
            }
        }
        return values.join(connector);
    }
});

// Filter to extract one keyed value from each object in a list
template_env.addFilter("keyed", (l, key) => {
    return l.map(item => item[key]);
});

// Flatten a categorised list (object with lists or objects as values)
// If the values are also objects, use the keys
template_env.addFilter("flatten", l => {
    let result = [];
    for (var key in l) {
        if (Array.isArray(l[key])) {
            result.concat(l[key]);
        } else if (l[key]) {
            result = result.concat(Object.keys(l[key]));
        }
    }
    return result;
})

// Filters to look up human-readable labels for type codes
template_env.addFilter('role', code => { return ORG_ROLE_LABELS[code] });
template_env.addFilter('scope', code => { return ORG_SCOPE_LABELS[code] });
template_env.addFilter('sector', code => { return SECTOR_TYPE_LABELS[code] });
template_env.addFilter('location', code => { return LOCATION_TYPE_LABELS[code] });


//
// Rendering functions (called from static HTML pages)
//

// Render a list of organisations
export function render_org_list () {
    const promise = get_org_index();

    promise.then(orgs => {
        content_node().innerHTML = render_template("template.orglist", {
            orgs: orgs
        });
    });

    // FIXME display in page
    promise.catch(error => {
        console.error(error);
    });
}

// Render a single organisation, in detail
export function render_org () {
    const org_name = new URLSearchParams(window.location.search).get('ref');
    const promise = Promise.all([
        get_org_index(),
        get_activities()
    ]);

    promise.then(results => {
        const [orgs, activities] = results;
        if (org_name in orgs) {
            content_node().innerHTML = render_template("template.org", {
                org: orgs[org_name],
                orgs: orgs,
                activities: activities
            });
        } else {
            // FIXME display in page
            console.error(org_name, " not found");
        }
    });

    // FIXME display in page
    promise.catch(error => {
        console.error(error);
    });
}

// Render a list of sectors
export function render_sector_list () {
    const promise = get_sector_index();

    promise.then(sectors => {
        content_node().innerHTML = render_template("template.sectorlist", {
            sectors: sectors
        });
    });

    // FIXME display in page
    promise.catch(error => {
        console.error(error);
    });
}

// Render a single sector, in detail
export function render_sector () {
    const sector_name = new URLSearchParams(window.location.search).get('ref');
    const sector_type = new URLSearchParams(window.location.search).get('type');
    const promise = Promise.all([
        get_sector_index(),
        get_activities(),
        get_org_index(),
        get_location_index()
    ]);

    promise.then(results => {
        const [sectors, activities, orgs, locations] = results;
        if (sector_type in sectors && sector_name in sectors[sector_type]) {
            content_node().innerHTML = render_template("template.sector", {
                sector_name: sector_name,
                sector_type: sector_type,
                sector: sectors[sector_type][sector_name],
                activities: activities,
                orgs: orgs,
                locations: locations
            });
        } else {
            // FIXME display in page
            console.error(sector_name, sector_type, " not found");
        }
    });

    // FIXME display in page
    promise.catch(error => {
        console.error(error);
    });
}

// Render a list of locations
export function render_location_list () {
    const promise = get_location_index();

    promise.then(locations => {
        content_node().innerHTML = render_template("template.locationlist", {
            locations: locations
        });
    });

    // FIXME display in page
    promise.catch(error => {
        console.error(error);
    });
}

// Render a single location, in detail
export function render_location () {
    const location_name = new URLSearchParams(window.location.search).get('ref');
    const location_type = new URLSearchParams(window.location.search).get('type');
    const promise = Promise.all([
        get_location_index(),
        get_activities(),
        get_org_index()
    ]);


    promise.then(results => {
        const [locations, activities, orgs] = results;
        console.log(locations[location_type][location_name]);
        if (location_type in locations && location_name in locations[location_type]) {
            console.log(locations[location_type][location_name]);
            content_node().innerHTML = render_template("template.location", {
                location_name: location_name,
                location_type: location_type,
                info: locations[location_type][location_name],
                activities: activities,
                locations: locations,
                orgs: orgs
            });
        } else {
            // FIXME display in page
            console.error(location_name, location_type, " not found");
        }
    });

    // FIXME display in page
    promise.catch(error => {
        console.error(error);
    });
}

// Render a single activity, in detail
export function render_activity () {
    const identifier = new URLSearchParams(window.location.search).get('ref');
    const promise = get_activities();


    promise.then(activities => {
        if (identifier in activities) {
            const container = document.getElementById("content");
            container.innerHTML = render_template("template.activity", {
                activity: activities[identifier]
            });
        } else {
            // FIXME display in page
            console.error(identifier, " not found");
        }
    });

    // FIXME display in page
    promise.catch(error => {
        console.error(error);
    });
}


//
// Accessors
//

// fetch the org index
async function get_org_index () {
    return fetch_json(DATA_URLS.org_index);
}

// fetch the sector index
async function get_sector_index () {
    return fetch_json(DATA_URLS.sector_index);
}

// fetch the location index
async function get_location_index () {
    return fetch_json(DATA_URLS.location_index);
}

// fetch the activity list
async function get_activities () {
    return fetch_json(DATA_URLS.activities);
}


//
// General utility functions
//

// Get the element node with id "content"
function content_node() {
    return document.getElementById("content");
}

// Fetch and cache JSON data (uses global "cache" variable)
async function fetch_json (url) {

    // Download the data if it's not already in the cache.
    if (!(url in cache)) {
        const response = await fetch(url);
        cache[url] = response.json()
    }

    return cache[url];
}


// Render a template in an HTML <script> element with template_id and return the rendered text.
function render_template (template_id, data) {
    return nunjucks.renderString(document.getElementById(template_id).innerHTML, data);
}

// end
