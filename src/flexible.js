(function (window, document) {
  'use strict'

  var flexible = {};

  (function () {
    var viewportEl = document.querySelector('meta[name="viewport"]')
    var dpr = window.devicePixelRatio || 1

    dpr = dpr >= 3 ? 3 : (dpr >= 2 ? 2 : 1)

    document.documentElement.setAttribute('data-dpr', dpr)
    flexible.dpr = dpr

    var scale = 1 / dpr
    var content = 'width=device-width, initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=no'

    if (viewportEl) {
      viewportEl.setAttribute('content', content)
    } else {
      viewportEl = document.createElement('meta')
      viewportEl.setAttribute('name', 'viewport')
      viewportEl.setAttribute('content', content)
      document.head.appendChild(viewportEl)
    }
  })()

  flexible.mresize = function () {
    // 核心方法
    var innerWidth = document.documentElement.getBoundingClientRect().width || window.innerWidth

    if (!innerWidth) { return false }

    // 对于iphone6，1rem = 100px
    document.documentElement.style.fontSize = (innerWidth / 750 * 100) + 'px'
  }

  // 直接调用
  flexible.mresize()

  // resize时调用
  window.addEventListener('resize', function () {
    clearTimeout(flexible.tid)
    flexible.tid = setTimeout(flexible.mresize, 33)
  }, false)

  // load时调用，防止兼容性问题
  window.addEventListener('load', flexible.mresize, false)

  // 异步调用，防止兼容性问题
  setTimeout(function () {
    flexible.mresize()
  }, 333)

  window.flexible = flexible
})(window, document)
