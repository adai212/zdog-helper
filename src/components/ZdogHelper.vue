<template>
  <helper-menu ref="helperMenu" class="helper-menu" :modal="modal" :level="0" :selectedId="selectedId" @update="update"
    :menuClose="menuClose" @menuBarUpdate="menuBarUpdate"></helper-menu>
  <helper-set ref="helperSet" v-if="selected" class="helper-set" :root="modal" :modal="selected"></helper-set>
</template>

<script>
import HelperMenu from './HelperMenu.vue'
import HelperSet from './HelperSet.vue'

export default {
  data() {
    return {
      selected: null,
      selectedId: '',
      menuClose: false
    }
  },
  props: ['modal'],
  mounted() {
    this.selected = this.modal
    this.selectedId = this.$refs.helperMenu.id
  },
  components: { HelperMenu, HelperSet },
  methods: {
    update(id, modal) {
      this.selectedId = id
      this.selected = modal
      this.$refs.helperSet.reset()
    },
    menuBarUpdate() {
      this.menuClose = !this.menuClose
    }
  }
}
</script>

<style>
.helper-menu {
  position: absolute;
  top: 0;
  left: 0;
  height: calc(100% - 20px);
  overflow: auto;
  background-color: rgba(144, 147, 153, 0.3);
  padding: 10px 10px;
}

.helper-set {
  position: absolute;
  top: 0;
  right: 0;
  height: calc(100% - 20px);
  overflow: auto;
  background-color: rgba(144, 147, 153, 0.3);
  padding: 10px 10px;
}
</style>