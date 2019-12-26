import { Builder, Capabilities } from 'selenium-webdriver'

export const buildDriver = () => {
  const capabilities = Capabilities.chrome()
  const options = {
    args: [
      '--disable-notifications',
      '--no-sandbox',
      '--headless',
      '--disable-gpu'
    ]
  }

  capabilities.set('chromeOptions', options)

  return new Builder()
    .withCapabilities(capabilities)
    .build()
}
