// ------------------------------------
// #POSTCSS - LOAD PlUGINS - TEST
// ------------------------------------

'use strict'

const test = require('ava')

const { join } = require('path')
const { readFileSync, writeFileSync } = require('fs')

const fixtures = (file) => readFileSync(join(__dirname, 'fixtures', file))
const expected = (file) => readFileSync(join(__dirname, 'expects', file))

const postcss = require('postcss')
const pluginsrc = require('..')

test('1 - Load with default plugins ', (t) => {
  pluginsrc().then((plugins) => {
    t.is(expected('plugins.default.js'), plugins)
  })
})

test('2 - Load with custom plugins ', (t) => {
  pluginsrc('postcss.config.js').then((plugins) => {
    t.is(expected('plugins.custom.js'), plugins)
  })
})

test('3 - Process CSS with default plugins', (t) => {
  pluginsrc().then((plugins) => {
    postcss(plugins)
      .process(fixtures('index.css'))
      .then((result) => {
        console.log(result.css)
        writeFileSync('expects/index.css', result.css)
        t.is(expected('index.css'), result.css)
      })
  })
})

test('4 - Process SSS with custom plugins', (t) => {
  pluginsrc('postcss.config.js').then((plugins) => {
    postcss(plugins)
      .process(fixtures('index.css'))
      .then((result) => {
        console.log(result.css)
        writeFileSync('expects/custom.css', result.css)
        t.is(expected('custom.css'), result.css)
      })
  })
})

test('5 - Process SSS with default plugins', (t) => {
  pluginsrc().then((plugins) => {
    postcss(plugins)
      .process(fixtures('index.sss'), {parser: require('sugarss')})
      .then((result) => {
        console.log(result.css)
        writeFileSync('expects/index.sss.css', result.css)
        t.is(expected('index.sss.css'), result.css)
      })
  })
})

test('6 - Process SSS with custom plugins', (t) => {
  pluginsrc('postcssrc.json').then((plugins) => {
    postcss(plugins)
      .process(fixtures('index.sss'), {parser: require('sugarss')})
      .then((result) => {
        console.log(result.css)
        writeFileSync('expects/custom.sss.css', result.css)
        t.is(expected('custom.sss.css'), result.css)
      })
  })
})
