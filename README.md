# ZdogHelper

main.js
```
import zdogHelper from 'zdog-helper'
createApp(App)
  .use(zdogHelper)
  .mount('#app')
```

component.vue
```
const illo = new Zdog.Illustration({
  element: '.zdog-canvas'
});
this.$zdogHelper({
  modal: illo
})
```
