// 判断滚动到底部

let Stop =0;
let Sheight = 0;
let CHeight = 0;
export default function scrollTobottom(ele,fn) {
  ele.onscroll=function (e) {
    Stop = ele.scrollTop
    Sheight = ele.scrollHeight
    CHeight = ele.clientHeight
    if ((Stop + CHeight) === Sheight) {
      fn()
    }
  }
}