# 移动端1px问题解决方案汇总.md

## 解决方案

* flexible (demo: /demos/flexible/)
* gradient (demo: /demos/gradient/ 原理是在`background-image`中写一个线性渐变`linear-gradient`，可以得到0.5倍的线，但在多倍屏上有局限性)
* postcss-write-svg

## 参考资料

* [使用Flexible实现手淘H5页面的终端适配](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)
* [再聊移动端页面的适配](https://www.w3cplus.com/css/vw-for-layout.html)
* [再谈Retina下1px的解决方案](https://www.w3cplus.com/css/fix-1px-for-retina.html)
