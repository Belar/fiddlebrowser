<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">fiddleBrowser</h1>
          <h2 class="subtitle">jsFiddle profile browser</h2>
        </div>
      </div>
    </section>

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

      <table class="table" v-show="projects.length > 0">
        <thead>
          <tr>
            <th>Title</th>
            <th>Framework</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fiddle in projects">
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
    </div>
  </div>
</template>

<script>
import jsonp from 'jsonp';

export default {
  data: function() {
    return {
      nick: '',
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
  }
}
</script>

<style>
</style>
