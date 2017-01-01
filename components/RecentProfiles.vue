<template>
  <ul>
    <li v-for="profile in showedProfiles" class="tag">
      {{profile}}
    </li>
  </ul>
</template>

<script>
export default {
  props: ['currentProfile'],
  data: function() {
    return {
      showedProfiles: []
    }
  },
  methods: {
    addShowedProfile: function() {
      // Check if profile already present
      if (this.showedProfiles.indexOf(this.currentProfile) === -1) {
        // Limit amount of profiles
        this.showedProfiles = this.showedProfiles.slice(0, 4);
        this.showedProfiles.push(this.currentProfile);
        localStorage.setItem('recentProfiles', JSON.stringify(this.showedProfiles));
      }
    },
    getRecentProfilesStorage: function() {
      if (typeof localStorage !== 'undefined') {
        let recentProfilesStorage = JSON.parse(localStorage.getItem('recentProfiles'));

        if (recentProfilesStorage) {
          this.showedProfiles = recentProfilesStorage;
        }
      }
    }
  },
  watch: {
    'currentProfile': function() {
      this.addShowedProfile();
    }
  },
  mounted: function() {
    this.getRecentProfilesStorage();
  }
}
</script>

<style scoped>
ul {
  margin-bottom: .5rem;
}

.tag {
  margin-right: .5rem;
}
</style>
