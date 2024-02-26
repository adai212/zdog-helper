<template>
  <div class="helper-set-content">
    <div v-show="!setClose">
      <div v-if="modal.visible != null">
        <span class="title">visible:</span>
        <input class="hide-arrow" type="checkbox" v-model="modal.visible" @input="update">
      </div>
      <div v-if="modal.stroke != null">
        <span class="title">stroke:</span>
        <input style="margin-left: 13px;" class="hide-arrow" type="number" v-model="modal.stroke" @input="update"
          step="0.1">
      </div>
      <div v-if="modal.translate">
        <span class="title">translate:</span>
        <label>x</label>
        <input class="hide-arrow" type="number" v-model="modal.translate.x" @input="update" step="0.1">
        <label>y</label>
        <input class="hide-arrow" type="number" v-model="modal.translate.y" @input="update" step="0.1">
        <label>z</label>
        <input class="hide-arrow" type="number" v-model="modal.translate.z" @input="update" step="0.1">
      </div>
      <div v-if="modal.rotate">
        <span class="title">rotate:</span>
        <label>x</label>
        <input class="hide-arrow" type="number" v-model="modal.rotate.x" @input="update" step="0.1">
        <label>y</label>
        <input class="hide-arrow" type="number" v-model="modal.rotate.y" @input="update" step="0.1">
        <label>z</label>
        <input class="hide-arrow" type="number" v-model="modal.rotate.z" @input="update" step="0.1">
      </div>
      <div v-if="modal.scale">
        <span class="title">scale:</span>
        <label>x</label>
        <input class="hide-arrow" type="number" v-model="modal.scale.x" @input="update" step="0.1">
        <label>y</label>
        <input class="hide-arrow" type="number" v-model="modal.scale.y" @input="update" step="0.1">
        <label>z</label>
        <input class="hide-arrow" type="number" v-model="modal.scale.z" @input="update" step="0.1">
        <label>a</label>
        <input class="hide-arrow" type="number" v-model="all" @input="updateAll" step="0.1">
      </div>
      <div v-if="!isShape && modal.path">
        <div v-for="path in modal.path" :key="path">
          <span class="title" v-if="path.line || path.x != null || path.y != null || path.z != null">line:</span>
          <span class="title" v-if="path.move">move:</span>
          <span v-if="path.x != null || path.y != null || path.z != null">
            <label>x</label>
            <input class="hide-arrow" type="number" v-model="path.x" @input="update" step="0.1">
            <label>y</label>
            <input class="hide-arrow" type="number" v-model="path.y" @input="update" step="0.1">
            <label>z</label>
            <input class="hide-arrow" type="number" v-model="path.z" @input="update" step="0.1">
          </span>
          <span v-if="path.line">
            <label>x</label>
            <input class="hide-arrow" type="number" v-model="path.line.x" @input="update" step="0.1">
            <label>y</label>
            <input class="hide-arrow" type="number" v-model="path.line.y" @input="update" step="0.1">
            <label>z</label>
            <input class="hide-arrow" type="number" v-model="path.line.z" @input="update" step="0.1">
          </span>
          <span v-if="path.move">
            <label>x</label>
            <input class="hide-arrow" type="number" v-model="path.move.x" @input="update" step="0.1">
            <label>y</label>
            <input class="hide-arrow" type="number" v-model="path.move.y" @input="update" step="0.1">
            <label>z</label>
            <input class="hide-arrow" type="number" v-model="path.move.z" @input="update" step="0.1">
          </span>
          <div v-if="path.arc">
            <span class="title">arc:</span>
            <div v-for="(arc, i) in path.arc" :key="arc">
              <span class="title">{{ ['corner', 'end'][i] }}</span>
              <label>x</label>
              <input class="hide-arrow" type="number" v-model="arc.x" @input="update" step="0.1">
              <label>y</label>
              <input class="hide-arrow" type="number" v-model="arc.y" @input="update" step="0.1">
              <label>z</label>
              <input class="hide-arrow" type="number" v-model="arc.z" @input="update" step="0.1">
            </div>
          </div>
          <div v-if="path.bezier">
            <span class="title">bezier:</span>
            <div v-for="(bezier, i) in path.bezier" :key="bezier">
              <span class="title">{{ ['start', 'end', 'dest'][i] }}</span>
              <label>x</label>
              <input class="hide-arrow" type="number" v-model="bezier.x" @input="update" step="0.1">
              <label>y</label>
              <input class="hide-arrow" type="number" v-model="bezier.y" @input="update" step="0.1">
              <label>z</label>
              <input class="hide-arrow" type="number" v-model="bezier.z" @input="update" step="0.1">
            </div>
          </div>
        </div>
      </div>
      <div v-if="modal.width != null">
        <span class="title">width:</span>
        <input class="hide-arrow" type="number" v-model="modal.width" @input="update" step="0.1">
      </div>
      <div v-if="modal.height != null">
        <span class="title">height:</span>
        <input class="hide-arrow" type="number" v-model="modal.height" @input="update" step="0.1">
      </div>
      <div v-if="modal.cornerRadius != null">
        <span class="title">cornerRadius:</span>
        <input class="hide-arrow" type="number" v-model="modal.cornerRadius" @input="update" step="0.1">
      </div>
      <div v-if="modal.width == null && modal.height == null && modal.diameter != null">
        <span class="title">diameter:</span>
        <input class="hide-arrow" type="number" v-model="modal.diameter" @input="update" step="0.1">
      </div>
      <div v-if="modal.quarters != null">
        <span class="title">quarters:</span>
        <input class="hide-arrow" type="number" v-model="modal.quarters" @input="update" step="1" min="1" max="4">
      </div>
      <div v-if="modal.radius != null">
        <span class="title">radius:</span>
        <input class="hide-arrow" type="number" v-model="modal.radius" @input="update" step="0.1">
      </div>
      <div v-if="modal.sides != null">
        <span class="title">sides:</span>
        <input class="hide-arrow" type="number" v-model="modal.sides" @input="update" step="0.1">
      </div>
      <div v-if="modal.length != null">
        <span class="title">length:</span>
        <input class="hide-arrow" type="number" v-model="modal.length" @input="update" step="0.1">
      </div>
      <div v-if="modal.depth != null">
        <span class="title">depth:</span>
        <input class="hide-arrow" type="number" v-model="modal.depth" @input="update" step="0.1">
      </div>
      <div v-if="modal.fill != null">
        <span class="title">fill:</span>
        <input class="hide-arrow" type="checkbox" v-model="modal.fill" @input="update">
      </div>
      <div v-if="modal.closed != null">
        <span class="title">closed:</span>
        <input class="hide-arrow" type="checkbox" v-model="modal.closed" @input="update">
      </div>
    </div>
    <div class="bar" @click="setBarClick()"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      all: 1,
      setClose: false
    }
  },
  props: ['root', 'modal'],
  computed: {
    isShape() {
      return this.modal.width ??
        this.modal.height ??
        this.modal.cornerRadius ??
        this.modal.diameter ??
        this.modal.quarters ??
        this.modal.radius ??
        this.modal.sides ??
        this.modal.length ??
        this.modal.depth ??
        null
    },
    setPadding() {
      return this.setClose ? '0' : '10px'
    }
  },
  methods: {
    update() {
      this.modal.updatePath?.()
      this.root.updateRenderGraph?.()
    },
    updateAll(event) {
      this.modal.scale.x = this.modal.scale.y = this.modal.scale.z = parseFloat(event.target.value)
      this.root.updateRenderGraph?.()
    },
    reset() {
      this.all = 1
    },
    setBarClick() {
      this.setClose = !this.setClose
    }
  }
}
</script>

<style scoped>
.helper-set-content {
  padding: v-bind(setPadding);
}

.title {
  margin-right: 5px;
  width: 70px;
  display: inline-flex;
}

input {
  width: 30px;
  margin: 0 5px;
}

.hide-arrow::-webkit-inner-spin-button,
.hide-arrow::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.bar {
  position: fixed;
  width: 10px;
  height: 100%;
  background-color: #f40;
  top: 0;
  right: 0;
  cursor: pointer;
}
</style>