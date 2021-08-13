<template>
  <div class="home">
      <SelectionTable></SelectionTable>
  </div>
</template>

<script>
// @ is an alias to /src
import SelectionTable from '../components/SelectionTable.vue'

export default {
  name: 'Home',
  components: {
    SelectionTable
  }
}
</script>
