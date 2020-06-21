import 'core-js'
import 'regenerator-runtime/runtime'
import 'xtend-library/src/polyfill.js'
import { Xt } from 'xtend-library/src/xt.js'
import 'xtend-library/src/xtend-core.js'
import 'xtend-library/src/addons/test.js' // example override file: check console.debug

import './scripts/structure.js'

/**
 * favicon
 */

const favicon = document.querySelector('#favicon')
const faviconDark = document.querySelector('#favicon-dark')

const colorSchemeMq = window.matchMedia('(prefers-color-scheme: dark)')

const changeMq = () => {
  if (colorSchemeMq.matches) {
    favicon.remove()
    document.head.append(faviconDark)
  } else {
    document.head.append(favicon)
    faviconDark.remove()
  }
}

colorSchemeMq.addListener(changeMq)
changeMq()
