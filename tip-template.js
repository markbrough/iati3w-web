<div class="popup">
  <p>
    <a target="_blank" href="https://iati-3w.humportal.org/orgs/{{ org.info.stub }}">
      {{ org.info.name }}
    </a>
    {% if org.info.name != org.info.shortname %}
    ({{ org.info.shortname }})
    {% endif %}
  </p>
  <p>
    Scope: {{ org.info.scope }}
  </p>
</div>