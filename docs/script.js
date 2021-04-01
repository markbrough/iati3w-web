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
    local: "Local and national actor",
    regional: "Regional actor",
    international: "International actor",
    unknown: "Undetermined actor"
};

const SECTOR_TYPE_LABELS = {
    dac: "OECD-DAC purpose",
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
template_env.addFilter("join", (l, connector) => {
    if (! connector) {
        connector = ", ";
    }
    if (! l) {
        return "";
    } else {
        return l.join(connector);
    }
});

// Filter to extract one keyed value from each object in a list
template_env.addFilter("keyed", (l, key) => {
    return l.map(item => item[key]);
});

// Filters to look up human-readable labels for type codes
template_env.addFilter('role', code => { return ORG_ROLE_LABELS[code] });
template_env.addFilter('scope', code => { return ORG_SCOPE_LABELS[code] });
template_env.addFilter('sector', code => { return SECTOR_TYPE_LABELS[code] });
template_env.addFilter('location', code => { return LOCATION_TYPE_LABELS[code] });


//
// Rendering functions (called from static HTML pages)
//

// Render a list of organisations
export async function load_org_list () {
    const orgs = await fetch_json(DATA_URLS.org_index);
    const container = document.getElementById("content");
    container.innerHTML = render_template("template.orglist", {
        orgs: orgs
    });
}

// Render a single organisation, in detail
export async function load_org () {
    const org_name = new URLSearchParams(window.location.search).get('ref');
    const orgs = await fetch_json(DATA_URLS.org_index);
    const container = document.getElementById("content");
    if (org_name in orgs) {
        container.innerHTML = render_template("template.org", {
            org_name: org_name,
            info: orgs[org_name]
        });
    } else {
        console.error(org_name, " not found");
    }
}

// Render a list of sectors
export async function load_sector_list () {
    const sectors = await fetch_json(DATA_URLS.sector_index);
    const container = document.getElementById("content");
    container.innerHTML = render_template("template.sectorlist", {
        sectors: sectors
    });
}

// Render a single sector, in detail
export async function load_sector () {
    const sector_name = new URLSearchParams(window.location.search).get('ref');
    const sector_type = new URLSearchParams(window.location.search).get('type');
    const sectors = await fetch_json(DATA_URLS.sector_index);
    const container = document.getElementById("content");
    if (sector_type in sectors && sector_name in sectors[sector_type]) {
        container.innerHTML = render_template("template.sector", {
            sector_name: sector_name,
            sector_type: sector_type,
            info: sectors[sector_type][sector_name]
        });
    } else {
        // FIXME show error page
        console.error(sector_name, sector_type, " not found");
    }
}

// Render a list of locations
export async function load_location_list () {
    const locations = await fetch_json(DATA_URLS.location_index);
    const container = document.getElementById("content");
    container.innerHTML = render_template("template.locationlist", {
        locations: locations
    });
}

// Render a single location, in detail
export async function load_location () {
    const location_name = new URLSearchParams(window.location.search).get('ref');
    const location_type = new URLSearchParams(window.location.search).get('type');
    const locations = await fetch_json(DATA_URLS.location_index);
    const container = document.getElementById("content");
    if (location_type in locations && location_name in locations[location_type]) {
        container.innerHTML = render_template("template.location", {
            location_name: location_name,
            location_type: location_type,
            info: locations[location_type][location_name]
        });
    } else {
        // FIXME show error page
        console.error(location_name, location_type, " not found");
    }
}

// Render a single activity, in detail
export async function load_activity () {
    const identifier = new URLSearchParams(window.location.search).get('ref');
    const activities = await fetch_json(DATA_URLS.activities);
    const container = document.getElementById("content");
    for (var i = 0; i < activities.length; i++) {
        if (activities[i].identifier == identifier) {
            container.innerHTML = render_template("template.activity", {
                activity: activities[i]
            });
            return;
        }
    }
    // FIXME show error page
    console.error(identifier, " not found");
}


//
// General utility functions
//

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
