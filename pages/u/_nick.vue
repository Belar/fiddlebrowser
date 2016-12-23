<template>
  <div>
    <hero-title>
      <h1 class="title">fiddleBrowser</h1>
      <h2 class="subtitle">jsFiddle profile browser</h2>
    </hero-title>

    <div class="container">
      <label for="username" class="label">Username</label>
      <p class="control has-addons">
        <input name="username" class="input is-expanded" type="text" v-model="nick" @keyup.enter="fetchFiddles()">
        <button class="button is-primary" :class="{'is-loading': loading, 'is-disabled' : loading }" @click="fetchFiddles()">Fetch fiddles</button>
      </p>
      <div class="columns">
        <div class="column is-8">
          <label for="search" class="label">Search phrase</label>
          <p class="control">
            <input name="search" class="input" type="text" v-model="search">
            <small>Searches through title, description and framework</small>
          </p>
        </div>
        <div class="column">
          <label for="limit" class="label">Fiddle limit</label>
          <p class="control">
            <span class="select is-fullwidth">
              <select name="limit" v-model="limit" @change="fetchFiddles()">
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="50">50</option>
                <option :value="100">100</option>
              </select>
            </span>
            <small>Auto-refetch included</small>
          </p>
        </div>
      </div>
      <projects-table :projects="projects"></projects-table>
    </div>
  </div>
</template>

<script>
import jsonp from 'jsonp';

import ProjectsTable from '~components/ProjectsTable';
import HeroTitle from '~components/HeroTitle';

export default {
  components: {
    ProjectsTable,
    HeroTitle
  },
  data: function({
    params,
    error
  }) {
    return {
      nick: params.nick,
      search: '',
      limit: 10,
      fiddles: [],
      loading: false
    }
  },
  computed: {
    projects: function() {
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
  methods: {
    fetchFiddles: function() {
      if (this.fiddles.length > this.limit) {
        return this.fiddles.splice(this.limit);
      }
      if (this.nick && this.limit > 0) {
        this.loading = true;

        jsonp('https://jsfiddle.net/api/user/' + this.nick + '/demo/list.json?limit=' + this.limit, {
          timeout: 5000
        }, (err, data) => {
          if (err) {
            this.loading = false;
          } else {
            this.fiddles = data.list;
            this.loading = false;
          }
        });
      }
    }
  },
  mounted: function() {
    this.fetchFiddles();
  }
}
</script>

<style>
</style>
