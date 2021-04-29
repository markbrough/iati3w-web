<template>
  <div class="container">
    <main>
      <section id="overview">
        <h2>About the prototype IATI/3W explorer</h2>

        <p>
          This prototype throws an international spotlight on the work
          of local and national aid actors in Somalia, and their
          relationships with regional and international partners.
        </p>
        <p>
          Start by looking at the <nuxt-link :to="{name: 'orgs'}">Organisations</nuxt-link>
          (who), <nuxt-link :to="{name: 'sectors'}">Sectors</nuxt-link> (what), or the
          <nuxt-link :to="{name: 'locations'}">Places</nuxt-link> (where) active in Somalia's aid
          response, then follow the connections.
        </p>
        <dl>
          <dt>Goal</dt>
          <dd>
            Improve the international visibility of local and national
            humanitarian responders and their activities.
          </dd>
          <dt>Focus country</dt>
          <dd>
            Somalia
          </dd>
          <dt>Approach</dt>
          <dd>
            Combine two sources of aid-activity information: the
            monthly humanitarian <a
            href="https://data.humdata.org/dataset/somalia-operational-presence"
            target="_blank">Somalia 3W</a> (who? what?  where?)
            reports compiled by UN OCHA, and the the Somalia-focused
            activities that organisations self-publish through the <a
            href="https://iatistandard.org"
            target="_blank">International Aid Transparency
            Initiative</a> (IATI).
          </dd>
          <dt>Status</dt>
          <dd>
            Prototype. Quality and accuracy are not guaranteed.
          </dd>
          <dt>Creator</dt>
          <dd>
            <a href="https://www.devinit.org/"
            target="_blank">Development Initiatives</a>, with funding
            from the <a
            href="https://www.government.nl/ministries/ministry-of-foreign-affairs"
            target="_blank">Netherlands Ministry of Foreign
            Affairs</a> on behalf of the <a
            href="https://interagencystandingcommittee.org/greater-transparency"
            target="_blank">Grand Bargain Transparency Workstream</a>.
          </dd>
        </dl>

        <section id="background">
          <h3>Background</h3>
          <p>
            The 2016 <b><a
            href="https://interagencystandingcommittee.org/grand-bargain">Grand
            Bargain</a></b> promises <i><a
            href="https://interagencystandingcommittee.org/greater-transparency">Greater
            Transparency</a></i> and <i><a
            href="https://interagencystandingcommittee.org/more-support-and-funding-tools-for-local-and-national-responders">More
            support and funding tools for local and national
            responders</a></i> in humanitarian aid response.
          </p>
          <p>
            The Grand Bargain uses <b><a
            href="https://iatistandard.org">International Aid
            Transparency Initiative</a></b> (IATI) for transparency,
            but unfortunately, the current IATI ecosystem seriously
            underreports the activities of local and national
            responders, so much of their work remains effectively
            invisible internationally.
          </p>
          <p>
            Another useful source of aid-activity information is the
            humanitarian <b>3W</b> (Who? What? Where?) reports
            compiled by UN OCHA country offices. These contain much
            more information about local actors, and often report
            activities at a more local level than IATI; however,
            they're intended only as point-in-time operational
            snapshots, not as permanent transparency records, so they
            lack much of the information that IATI publishers include
            about their activities.
          </p>
          <p>
            This prototype explores the feasibility of combining the
            two information sources to provide a fuller picture of aid
            work in a country, <i>especially</i> those activities
            carried out by local and national actors at a local
            level. Often, international actors appear in both the IATI
            and 3W information, so the prototype is able to extract
            information about relationships of different kinds:
          </p>
          <ul>
            <li>
              What sectors does a local/national actor typically work in?
            </li>
            <li>
              What locations does a local/national actor work in most?
            </li>
            <li>
              Who are a local/national actor's most-common partner
              organisations (both in Somalia and internationally)?
            </li>
            <li>
              What local/national actors does each
              regional/international actor typically partner with, and
              what kinds of work do they fund?
            </li>
          </ul>
          <p>
            We hope this information will be helpful primarily for
            local and national organisations, in helping to get the
            word out about the foundational aid work they do, and it
            helping them to discover new opportunities for partnership
            and funding. We also believe that this new way of looking
            at aid information — as a network of relationships rather
            than a single chain of funding — will be valuable for all
            aid actors, everywhere.
          </p>
        </section>
      </section>
    </main>
  </div>
</template>

<script>

export default {
  components: {
  }
}
</script>

<style scoped>
dt {
  padding-right: 15px;
}
</style>
