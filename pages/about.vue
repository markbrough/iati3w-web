<template>
  <div class="container">
    <main>
      <section id="overview">
        <section id="background">
          <h2>About the prototype Somalia Local Activity Explorer</h2>
          <p>
            The 2016 <b><a
            href="https://interagencystandingcommittee.org/grand-bargain">Grand
            Bargain</a></b> committed signatories to <a
            href="https://interagencystandingcommittee.org/greater-transparency">Greater
            Transparency</a> and <a
            href="https://interagencystandingcommittee.org/more-support-and-funding-tools-for-local-and-national-responders">More
            support and funding tools for local and national
            responders</a> in humanitarian aid response. The transparency commitments included publication of data using the <b><a
            href="https://iatistandard.org">International Aid
            Transparency Initiative</a> (IATI)</b>.
            However, there is currently a limited coverage of activities
            from local and national responders in IATI data. As a result,
            much of their work remains effectively invisible internationally.
          </p>
          <p>
            Another useful source of aid-activity information is the
            humanitarian <b>3W</b> (Who? What? Where?) reports
            compiled by UN OCHA country offices. These contain much more
            information about local actors, and often report activities at
            a more local level than IATI. However, they're intended only
            as point-in-time operational snapshots, not as permanent
            transparency records, so they lack much of the information
            that IATI publishers include about their activities.
          </p>
          <b-alert variant="info" show>
            You can select the data source for the visualisations (between
            IATI, 3W and IATI + 3W) from the navigation bar at the top
            of the page.
          </b-alert>
          <p>
            This prototype explores the feasibility of combining the
            two information sources to provide a fuller picture of aid
            work in a country, <b>especially</b> those activities
            carried out by local and national actors at a local
            level. Often, international actors appear in both the IATI
            and 3W information, so the prototype is able to extract
            information about relationships of different kinds. For example:
          </p>
          <ul>
            <li>
              What sectors does a local/national actor typically work in?
            </li>
            <li>
              Where do local/national actors work most?
            </li>
            <li>
              What organisations do local/national actors most
              commonly partner with (both in Somalia and internationally)?
            </li>
            <li>
              What local/national actors does each
              regional/international actor typically partner with, and
              what kinds of work do they fund?
            </li>
          </ul>
          <b-alert variant="warning" show>
            Note that this site is still an early prototype, with limited
            or incomplete functionality. Quality and accuracy are not
            guaranteed.
          </b-alert>
          <p>
            We hope this information will be helpful primarily for
            local and national organisations, in helping to get the
            word out about the foundational aid work they do, and in
            helping them to discover new opportunities for partnership
            and funding. We also believe that this new way of looking
            at aid information &endash; as a network of relationships rather
            than a single chain of funding &endash; will be valuable for all
            aid actors, everywhere.
          </p>
          <hr />
          <h3>Feedback</h3>
          <p class="lead">We welcome your feedback! We're interested to hear if you
            have ideas about how we can improve the explorer, the data,
            or how this could be used in future. Get in touch with us:
            <a href="mailto:humportal@devinit.org">humportal@devinit.org</a>.
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

</style>
