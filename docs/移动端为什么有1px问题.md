# 移动端为什么有1px问题

## 缩放

默认情况下，html文件在移动端上是可以缩放的。

页面中有两个pixel单位：

* device pixel (`screen.width/screen.height`和`event.screenX/event.screenY`)
* CSS pixel (其余大多值)

其中device pixel是不变的，可以认为是设备属性。CSS pixel在默认情况下可以变化。

缩放的本质就是CSS pixel和device pixel的比例改变。

CSS pixel和device pixel的比例是100%：

![](../assets/csspixels_100.gif)

放大：

![](../assets/csspixels_in.gif)

缩小：

![](../assets/csspixels_out.gif)

因此，默认情况下1px的hairline在页面缩小的情况下可以出现。

## 屏幕宽度

由于存在两种pixel单位，屏幕宽度是多少呢？

* screen.width，即用device pixel作为单位
* document.documentElement.clientWidth（或window.innerWidth)，即用CSS pixel作为单位

## 禁止缩放

移动端为了提升用户体验，通常会在html中引入这段代码：

    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">

这段代码中，

* `user-scalable=no`表示禁止缩放
* `width=device-width`表示页面宽度设置为设备宽度，也就是把`document.documentElement.clientWidth`设置为与`screen.width`相等
* `initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0`表示每个CSS pixel放大倍数

在一段时间内，这种方法非常有效地提升了移动端的用户体验。但retina屏幕出现后，又出问题了。

## retina设备

retina设备上引入这段代码后，1个CSS pixel不是占据一个1个device pixel，而是`{{devicePixelRadio}}`个。

因此，在style中写的1px（单位为CSS pixel）其实是`{{devicePixelRadio}}px`。

## 参考资料

[https://quirksmode.org/mobile/viewports.html](https://quirksmode.org/mobile/viewports.html)
[https://quirksmode.org/mobile/viewports2.html](https://quirksmode.org/mobile/viewports2.html)
