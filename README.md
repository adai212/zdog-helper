# ZdogHelper

main.js
```
import zdogHelper from 'zdog-helper'
import 'zdog-helper/dist/style.css'
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
