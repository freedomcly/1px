# 移动端为什么有 1px 问题

## 一、为解决缩放问题，固定屏幕宽度

### 缩放

默认情况下，html 文件在移动端上是可以缩放的。

有两个 pixel 单位：

* device pixel，如`screen.width/screen.height`和`event.screenX/event.screenY`
* CSS pixel，其余大多数值，如`document.documentElement.clientWidth`

在屏幕上 device pixel 的长度是不变的，可以认为是设备属性。CSS pixel 的长度可以通过缩放改变。

缩放的本质就是 CSS pixel 和 device pixel 的比例改变。

CSS pixel 和 device pixel 的比例是 100%：

![](./assets/csspixels_100.gif)

放大：

![](./assets/csspixels_in.gif)

缩小：

![](./assets/csspixels_out.gif)

因此，默认情况下屏幕最小单位的 1px hairline，页面缩小到一定程度是会出现的。见 [demo: 1-zoom](./demos/flexible/1-zoom.html)。

### 屏幕宽度

由于存在两种 pixel 单位，屏幕宽度是多少呢？

* `screen.width`，用 device pixel 作为单位
* `document.documentElement.clientWidth`（或`window.innerWidth`)，用 CSS pixel 作为单位

iPhone 6 中：

```javascript
screen.width // 375
document.documentElement.clientWidth // 980
```

见 [demo: 2-device-width](./demos/flexible/2-device-width.html)。

### 禁止缩放

缩放让页面失控，为了提升用户体验，移动端通常会在 html 中引入这段代码：

    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">

这段代码中，

`user-scalable=no`表示禁止缩放。

`width=device-width`表示页面宽度设置为设备宽度，也就是把可变的 CSS pixel 设置为与 device pixel 相等，当然也就是把`document.documentElement.clientWidth`设置为与`screen.width`相等。

`initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0`表示每个 CSS pixel 放大倍数，如设置为 0.5，则`document.documentElement.clientWidth / screen.width === 2`。

scale 的优先级高于 `width=device-width`。

见 [demo: 3-scale](./demos/flexible/3-scale.html)。

在一段时间内，这种方法非常有效地提升了移动端的用户体验。但 retina 屏幕出现后，又出问题了。

retina 设备上引入这段代码后，1 个 device pixel 不是屏幕最小长度单位，而是`{{devicePixelRadio}}`个。若把可变的 CSS pixel 设置为与 device pixel 相等，1px 其实是 devicePixelRadio 倍的屏幕最小单位。

## 二、为解决 1px 问题，动态改变 scale

既然能拿到 devicePixelRadio，可以动态地设置 scale：

```javascript
var dpr = window.devicePixelRatio || 1
var scale = 1 / dpr
var content = 'width=device-width, initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=no'
var viewportEl = document.querySelector(flexible)

if (viewportEl) {
  viewportEl.setAttribute('content', content)
} else {
  viewportEl = document.createElement(flexible)
  viewportEl.setAttribute('name', 'viewport')
  viewportEl.setAttribute('content', content)
  document.head.appendChild(viewportEl)
}
```

见 [demo: 4-dynamic-scale](./demos/flexible/4-dynamic-scale.html)。

1px 的问题完美解决，然而又引入了新问题，px 单位长度在不同 dpr 的设备上非常的不同，因此用什么单位又成了问题。

## 三、为解决 px 单位问题，引入 rem 布局

引入动态 scale 后，在 iPhone 6 上，屏幕宽度 document.documentElement.clientWidth 是 750，在 iPhone 6 plus 上，屏幕宽度 document.documentElement.clientWidth 是 1242，同样 100px 的小方块，在两个屏幕上的占比非常不一样。因此，px 不再适用。

为了适配不同屏幕，可以引入 rem 布局。rem 在 html 中的 fontSize 值怎么确定呢？

为了方便计算，我们希望`1rem = 1px`。设计师的基准屏幕宽度是 750px。那么有以下公式：

屏幕宽度 / 750 = fontSize / 1，即 fontSize = 750 / 屏幕宽度。

问题又出现了，fontSize 不能小于 12px，否则直接设置为 12px，因此现在`1rem === 12px`。

见 [demo: 5-font-size](./demos/flexible/5-font-size.html)。

## 四、为解决 fontSize 过小问题，引入倍数

屏幕宽度 / 750 = fontSize / 1，这个公式建立在我们希望`1rem = 1px`。

如果`1rem = 12px`，问题得到解决。但是每次测量都需要把 px 值除以 12 才能得到 rem 值。

直接`1rem = 100px`，可以让换算过程更加简单。

到此为止，问题都得到很好的解决。见 [demo: 6-100](./demos/flexible/6-100.html)。

# 其他解决方案

* flexible
* gradient，原理是在`background-image`中写一个线性渐变`linear-gradient`，可以得到 0.5 倍的线，但在多倍屏上有局限性)
* postcss-write-svg

# 参考资料

* [https://quirksmode.org/mobile/viewports.html](https://quirksmode.org/mobile/viewports.html)
* [https://quirksmode.org/mobile/viewports2.html](https://quirksmode.org/mobile/viewports2.html)
* [使用Flexible实现手淘H5页面的终端适配](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)
* [再聊移动端页面的适配](https://www.w3cplus.com/css/vw-for-layout.html)
* [再谈Retina下1px的解决方案](https://www.w3cplus.com/css/fix-1px-for-retina.html)
