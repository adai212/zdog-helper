import { createApp } from 'vue'
import ZdogHelper from './ZdogHelper.vue'

const ZdogHelperConstructor = ZdogHelper

const zdogHelper = function (options = {}) {
  const app = createApp(ZdogHelperConstructor, options)
  const zdogHelperInstance = document.createElement('div')
  app.mount(zdogHelperInstance)
  document.body.appendChild(zdogHelperInstance)

  return zdogHelperInstance
}

export default zdogHelper