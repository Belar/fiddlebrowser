<template>
  <ul>
    <li v-for="profile in showedProfiles" class="tag">
      {{profile}}
    </li>
  </ul>
</template>

<script>
export default {
  props: ['showedProfiles']
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
