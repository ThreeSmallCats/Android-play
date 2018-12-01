// 上下左右滑动
let startX = 0
let endX = 0
let startY = 0
let endY = 0
export default function touch(left,right,up,down) {
  document.addEventListener('touchstart',function (e) {
    startX = e.touches[0].clientX
    startY = e.touches[0].clientY
  })
  document.addEventListener('touchend', function (e) {
    endX = e.changedTouches[0].clientX
    endY = e.changedTouches[0].clientY
    if (endX > startX && Math.abs(endX - startX) > 20 && Math.abs(startY - endY) < 20) {
      right()
    } else if (endX < startX && Math.abs(endX - startX)>20&&Math.abs(startY-endY)<20) {
      left()
    }else if(endY>startY&&Math.abs(endY-startY)>20&&Math.abs(endX-startX)<20){
      down()
    }else if(endY<startY&&Math.abs(endY-startY)>20&&Math.abs(endX-startX)<20){
      up()
    }
  })
  
}