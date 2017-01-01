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
      // Limit amount of profiles
      this.showedProfiles = this.showedProfiles.slice(0, 4);
      this.showedProfiles.push(this.currentProfile);
    }
  },
  watch: {
    'currentProfile': function() {
      this.addShowedProfile();
    },
    'showedProfiles': function() {
      localStorage.setItem('recentProfiles', this.showedProfiles);
    }
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
