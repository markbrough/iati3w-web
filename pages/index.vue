<template>
  <div class="container">
    <main>
      <section id="overview">
        <b-jumbotron>
          <template #header>Top-down meets bottom-up</template>
          <template #lead>
            This prototype throws an international spotlight on the work
            of local and national aid actors in Somalia, and their
            relationships with regional and international partners.
            It combines the monthly humanitarian <a
            href="https://data.humdata.org/dataset/somalia-operational-presence"
            target="_blank">Somalia 3W</a> (who? what? where?)
            reports compiled by UN OCHA, and the the Somalia-focused
            activities that organisations self-publish through the <a
            href="https://iatistandard.org"
            target="_blank">International Aid Transparency
            Initiative</a> (IATI).
          </template>
          <hr />
          <p class="lead text-md-center">
            Explore the data on Somalia's aid response:
          </p>
          <b-row>
            <b-col md="4" class="mb-2">
              <b-btn block variant="primary" :to="{name: 'organisations'}">Who? (Organisations)</b-btn>
            </b-col>
            <b-col md="4" class="mb-2">
              <b-btn block variant="primary" :to="{name: 'sectors'}">What? (Sectors)</b-btn>
            </b-col>
            <b-col md="4" class="mb-2">
              <b-btn block variant="primary" :to="{name: 'locations'}">Where? (Places)</b-btn>
            </b-col>
          </b-row>
        </b-jumbotron>
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
