<template>
  <div class="zdog-helper-li" :class="{ 'menu-root': level === 0 }">
    <div :id="id" class="tab" :class="{ active: id === selectedId }" @click="handleClick(id, modal)"
      @mouseenter="mouseenter" @mouseleave="mouseleave" v-show="!menuClose">
      <div v-if="modal.children && modal.children.length" class="triangle" :class="{ collapse: collapse }"
        @click="collapse = !collapse"></div>
      <span v-if="level == 0">Illustration</span>
      <span v-else-if="modal.visible == null">Anchor</span>
      <span v-else-if="modal.path == null && !modal.leftFace">Group</span>
      <span v-else>
        <span v-if="modal.cornerRadius">RoundedRect</span>
        <span v-else-if="modal.diameter && modal.quarters && modal.renderCentroid && !modal.length">Hemisphere</span>
        <span v-else-if="modal.diameter && modal.quarters && modal.renderCentroid && modal.length">Cone</span>
        <span v-else-if="modal.diameter && modal.quarters">Ellipse</span>
        <span v-else-if="modal.sides">Polygon</span>
        <span v-else-if="modal.length">Cylinder</span>
        <span v-else-if="modal.leftFace">Box</span>
        <span v-else-if="modal.width && modal.height">Rect</span>
        <span v-else-if="modal.path && (modal.path.length > 1 || JSON.stringify(modal.path) !== '[{}]')">Path</span>
        <span v-else>Shape</span>
      </span>
    </div>
    <helper-menu v-show="!collapse" :modal="modal" :level="level + 1" :selectedId="selectedId" @update="update"
      v-for="modal in modal.children" :key="modal" :menuClose="menuClose"></helper-menu>
    <div v-if="level === 0" class="bar" @click="menuBarClick()"></div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

let COLOR_CLICK = 'rgba(59, 117, 233, 0.8)'
let COLOR_HOVER = 'rgba(59, 117, 233, 0.5)'

export default {
  data() {
    return {
      collapse: false,
      colorClick: null,
      colorHover: null
    }
  },
  props: ['modal', 'level', 'selectedId', 'menuClose'],
  computed: {
    id() {
      return uuidv4()
    },
    menuPadding() {
      return this.menuClose ? '0' : '10px 0 10px 20px'
    },
    liPadding() {
      return this.menuClose ? '0' : '20px'
    }
  },
  watch: {
    // selectedId() {
    //   if (!this.modal.color) return
    //   if (this.id === this.selectedId) {
    //     this.colorClick = this.colorHover
    //     this.modal.color = COLOR_CLICK
    //   } else if (this.modal.color === COLOR_CLICK) {
    //     this.modal.color = this.colorClick
    //   }
    // }
  },
  methods: {
    handleClick() {
      if (this.id === this.selectedId) return
      console.log(this.modal)
      this.$emit('update', this.id, this.modal)
    },
    update(id, modal) {
      this.$emit('update', id, modal)
    },
    mouseenter() {
      if (!this.modal.color) return
      this.colorHover = this.modal.color
      this.modal.color = COLOR_HOVER
    },
    mouseleave() {
      if (!this.modal.color || this.modal.color === COLOR_CLICK) return
      this.modal.color = this.colorHover
    },
    hex3ToHex6(hex3) {
      return '#' + hex3[1] + hex3[1] + hex3[2] + hex3[2] + hex3[3] + hex3[3];
    },
    hexToRGBA(hex, alpha) {
      hex = hex.length === 4 ? this.hex3ToHex6(hex) : hex;
      hex = hex.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },
    menuBarClick() {
      this.$emit('menuBarUpdate')
    }
  }
}
</script>

<style scoped>
.zdog-helper-li {
  color: #333;
  padding-left: v-bind(liPadding);
}

.menu-root {
  padding: v-bind(menuPadding);
}

.tab {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.87);
  padding-right: 8px;
}

.tab:hover {
  background-color: rgba(144, 147, 153, 0.3);
}

.tab.active {
  background-color: rgba(144, 147, 153, 0.6);
}

.triangle {
  padding: 6px 0;
}

.triangle::before {
  display: block;
  content: "";
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid #333;
  margin: 0 8px;
  transform: rotate(90deg);
  transition-duration: 0.3s;
}

.triangle.collapse::before {
  transform: rotate(0deg);
}

.bar {
  position: fixed;
  width: 10px;
  height: 100%;
  background-color: #f40;
  top: 0;
  left: 0;
  cursor: pointer;
}
</style>