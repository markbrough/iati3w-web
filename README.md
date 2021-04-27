Frontend web site for connecting IATI and local 3W activities
=============================================================

_*Note:* This code is in an alpha state, and should not yet be used for any
purpose but evaluation of the prototype itself._

This repository contains the code for a prototype website that
combines activity data from the [International Aid Transparency
Initiative](https://iatistandard.org) (IATI) and UN OCHA's [Who? What?
Where?](https://data.humdata.org/dataset/somalia-operational-presence)
(3W) data for Somalia with the goal of connecting the work of local
and national aid actors with the funding and programming of
international and regional aid actors, and increasing the
international visibility of those local and national actors.

The prototype is being implemented by [Development
Initiatives](https://www.devinit.org/) on behalf of the [Grand
Bargain](https://interagencystandingcommittee.org/grand-bargain)
Transparency Workstream.

This repository is paired with
[iati3w-data](https://github.com/davidmegginson/iati3w-data), which
handles the backend data preparation.

## ## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


---

NB: the below documentation needs to be updated, as this site is now generated using the [Nuxt.js](https://nuxtjs.org) framework.

---


## Overview

This web site will render entirely on in the browser. It depends on
prepared data stored in JSON format at
https://davidmegginson.github.io/iati3w-data/ and will load and render
that data as needed.

The file ``docs/script.js`` is the top-level Javascript module for
rendering pages. Most HTML pages inside ``docs/`` contain a
[Nunjucks](https://mozilla.github.io/nunjucks/) template inside an
HTML _script_ element, and them make a call out to a rendering
function from ``docs/script.js`` to use the template to render content
on the page.  For example, a (simplified) template might look like this:

```
<script id="template.demo" type="template">
  <ul>
    {% for name in names %}
    <li>Name: {{ name }}</li
    {% endfor %}
  </ul>
{% endfor %}
</script>
```

And the call to render the template might look like this:

```
<script type="module" defer="defer">
  import { render_demo } from "./script.js";
  render_demo();
</script>
```

The rendered content will replace the HTML element with the identifier
"content", and the rest of the HTML page will stay the same:

```
<main>
  <section id="content">
    <p class="loading">Loading…</p>
  </section>
</main>
```

All paths in links are relative, so that you can run this when it's
not at the root of a web site (useful for development).

## Credits

David Megginson wrote the initial prototype, with support from Mark
Brough and the team at Development Initiatives. Special thanks to the
individuals and organisations in the humanitarian community who have
provided information, made suggests, and given feedback, and special
thanks to the many organisations who publish their activities in IATI
and/or via the monthly 3W report that OCHA Somalia publishes.

And finally, thanks to GitHub for providing free hosting.
