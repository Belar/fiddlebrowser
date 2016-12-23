<template>
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
</template>

<script>
export default {
  props: ['projects']
}
</script>
