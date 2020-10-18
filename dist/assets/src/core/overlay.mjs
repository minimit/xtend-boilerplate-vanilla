import { Xt } from '../xt.mjs'
import './toggle.mjs'
import JSON5 from 'https://unpkg.com/json5/dist/index.min.mjs'

/**
 * Overlay
 */
class Overlay extends Xt.Toggle {
  /**
   * constructor
   * @param {Node|HTMLElement|EventTarget|Window} object Base node
   * @param {Object} optionsCustom User options
   * @constructor
   */
  constructor(object, optionsCustom = {}) {
    super(object, optionsCustom)
  }

  //
  // init
  //

  /**
   * init aria
   */
  initAriaRole() {
    const self = this
    const options = self.options
    // aria
    if (options.aria) {
      // role
      if (self.targets.length) {
        for (const el of self.elements) {
          const ariaEls = Xt.queryAll(el, options.ariaControls)
          const ariaEl = ariaEls.length ? ariaEls[0] : el
          ariaEl.setAttribute('aria-haspopup', 'dialog')
        }
        for (const tr of self.targets) {
          tr.setAttribute('role', 'dialog')
          tr.setAttribute('aria-modal', 'true')
        }
      } else {
        for (const el of self.elements) {
          el.setAttribute('role', 'dialog')
          el.setAttribute('aria-modal', 'true')
        }
      }
    }
  }

  //
}

//
// options
//

Overlay.componentName = 'xt-overlay'
Overlay.optionsDefault = {
  // element
  elements: ':scope > a, :scope > button',
  targets: ':scope > .overlay',
  // class
  class: 'active active-overlay',
  // quantity
  min: 0,
  max: 1,
  // event
  on: 'click',
  eventLimit: '.event-limit, :scope > .overlay-container > .overlay-inner > .card-overlay .card-content',
  // other
  backdrop: true,
  closeAuto: true,
  appendTo: 'body',
  classHtml: false,
  closeInside: '.overlay-dismiss, .backdrop, .btn-close',
  closeOnDisable: true,
  scrollbar: true,
  focusLimit: true,
}

//
// export
//

Xt.Overlay = Overlay

//
// observe
//

Xt.mount.push({
  matches: '[data-' + Xt.Overlay.componentName + ']',
  mount: object => {
    // vars

    const optionsMarkup = object.getAttribute('data-' + Xt.Overlay.componentName)
    const options = optionsMarkup ? JSON5.parse(optionsMarkup) : {}

    // init

    let self = new Xt.Overlay(object, options)

    // unmount

    const unmount = () => {
      self.destroy()
      self = null
    }
    return unmount
  },
})
