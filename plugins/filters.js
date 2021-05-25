import Vue from "vue"

const ORG_ROLE_LABELS = {
    implementing: "Implementing partner",
    programming: "Programming partner",
    funding: "Funding partner"
}

const ORG_SCOPE_LABELS = {
    local: "local/national actor",
    regional: "regional actor",
    international: "international actor",
    unknown: "undetermined actor"
}

const SECTOR_TYPE_LABELS = {
    dac: "OECD-DAC sector",
    humanitarian: "Sector"
}

const LOCATION_TYPE_LABELS = {
    admin1: "Region",
    admin2: "District",
    unclassified: "Unclassified location"
}

Vue.filter('urlenc', encodeURIComponent);

Vue.filter('length', (value) => {
    if (!value) return 0
    return value.length
});

Vue.filter('capitalize', (value) => {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
});

Vue.filter('plural', (n, singular, plural) => {
    if (n > 1) {
        return "" + n + " " + plural;
    } else {
        return "" + n + " " + singular;
    }
})
Vue.filter('truncate', (s, length) => {
    if (! length) {
        length = 100;
    }
    if (s.length <= length) {
        return s;
    } else {
        return s.substring(0, length) + "…";
    }
})
Vue.filter("join", (l, connector) => {
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
})
Vue.filter("keyed", (l, key) => {
    return l.map(item => item[key]);
})
Vue.filter("flatten", l => {
    let result = [];
    for (var key in l) {
        if (Array.isArray(l[key])) {
            result = result.concat(l[key]);
        } else if (l[key]) {
            result = result.concat(Object.keys(l[key]));
        }
    }
    return result;
})

Vue.filter("role", code => { return ORG_ROLE_LABELS[code] })
Vue.filter('scope', code => { return ORG_SCOPE_LABELS[code] })
Vue.filter('sector', code => { return SECTOR_TYPE_LABELS[code] })
Vue.filter('location', code => { return LOCATION_TYPE_LABELS[code] })
