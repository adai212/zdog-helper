import zdogHelper from './ZdogHelper.js'

const install = function (app) {
  if (install.installed) return
  install.installed = true

  app.config.globalProperties.$zdogHelper = zdogHelper
}

export default {
  install,
};