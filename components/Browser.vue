<template>
  <div class="container">
    <label for="username" class="label">Username</label>
    <div class="control has-addons">
      <input name="username" class="input is-expanded" type="text" v-model="nick" @keyup.enter="fetchFiddles()">
      <button class="button is-primary" :class="{'is-loading': loading, 'is-disabled' : loading }" @click="fetchFiddles()">Fetch fiddles</button>
    </div>
    <recent-profiles :currentProfile="currentProfile"></recent-profiles>
    <div class="columns">
      <div class="column is-8">
        <label for="search" class="label">Search phrase</label>
        <div class="control">
          <input name="search" class="input" type="text" v-model="search">
          <small>Searches through title, description and framework</small>
        </div>
      </div>
      <div class="column">
        <label for="limit" class="label">Fiddle limit</label>
        <div class="control">
          <span class="select is-fullwidth">
            <select name="limit" v-model="limit" @change="fetchFiddles()">
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
            </select>
          </span>
          <small>Auto-refetch included</small>
        </div>
      </div>
    </div>
    <projects-table :fiddles="fiddles" :search="search"></projects-table>
  </div>
</template>

<script>
import jsonp from 'jsonp';

import ProjectsTable from '~components/ProjectsTable';
import RecentProfiles from '~components/RecentProfiles';

export default {
  props: ['nickParam'],
  components: {
    ProjectsTable,
    RecentProfiles
  },
  data: function() {
    return {
      nick: this.nickParam ? this.nickParam : '',
      currentProfile: '',
      search: '',
      limit: 10,
      fiddles: [],
      loading: false
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
            this.currentProfile = this.nick;
          }
        });
      }
    }
  },
  mounted: function() {
    if (this.nick.length > 0) {
      this.fetchFiddles();
    }
  }
}
</script>

<style>
</style>
