#!/usr/bin/env node

const argv = require('yargs/yargs')(process.argv.slice(2))
  .usage('Usage: $0 <command> [options]')
  .help('h')
  .option('config', {
    alias: 'c',
    type: 'string',
    default: './config',
    description: 'Configuration directory'
  })
  .argv

const mcServer = require('./')

const defaultSettings = require('./config/default-settings')

let settings

try {
  settings = require(`${argv.config}/settings`)

  Object.keys(defaultSettings).forEach(settingKey => {
    if (settings[settingKey] === undefined) {
      settings[settingKey] = defaultSettings[settingKey]
    }
  })
} catch (err) {
  settings = defaultSettings
}

module.exports = mcServer.createMCServer(settings)

process.on('unhandledRejection', err => {
  console.log(err.stack)
})

process.on('SIGINT', () => { // CTRL-C
  console.log('SIGINT signal received.')
  process.exit(1)
  // TODO: should properly save state, in production it would also "Server stopping in 10 seconds ..."
})