<template>
  <table class="table" v-show="filteredFiddles.length > 0">
    <thead>
      <tr>
        <th>Title</th>
        <th>Framework</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="fiddle in filteredFiddles">
        <td>{{fiddle.title}}</td>
        <td>{{fiddle.description}}</td>
        <td>{{fiddle.framework}}</td>
        <td class="is-icon">
          <a :href="fiddle.url" rel="no">
            <i class="fa fa-link"></i>
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['fiddles', 'search'],
  computed: {
    filteredFiddles: function() {
      let fiddles = this.fiddles;
      let searchData = this.search.toLowerCase();

      function searchPhrase(fiddle) {
        if (fiddle.title.toLowerCase().indexOf(searchData) !== -1 || fiddle.description.toLowerCase().indexOf(searchData) !== -1 || fiddle.framework.toLowerCase().indexOf(searchData) !== -1) {
          return true;
        }
      }
      return fiddles.filter(searchPhrase);
    }
  },
}
</script>
