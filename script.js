//import Board from './Board.js'
//import Robot from './Robot.js'

window.onload = function () {
  let canvas = document.getElementById('mycanvas')
  let ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const X = canvas.width / 2
  const Y = canvas.height / 2

  let hue = 0

  var t = 0
  var ra = 150
  var rb = 150
  var rc = 150
  var steps = 1000
  var a = Math.ceil(Math.random() * 20-10)
  var b = Math.ceil(Math.random() * 20-10)
  var c = Math.ceil(Math.random() * 20-10)
  ctx.font = 'bold 48px serif';
  ctx.fillText(`a: ${a} b:${b} c:${c}`, canvas.width / 2, 50)

  function draw(a,b,c) {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    for (let theta = 0; theta <= 2 * Math.PI; theta += 2 * Math.PI / steps){

      //interesting figures when a,b,c is changed from 1,2,3,4,5,7
      let x = X + ra * Math.sin(a * theta) + rb * Math.sin(b * theta) + rc * Math.cos(c * theta)
      let y = Y + ra * Math.cos(a * theta) + rb * Math.cos(b * theta) + rc * Math.sin(c * theta)
      // let x=X+(ra-rb)*Math.sin(a*t)+rb*Math.sin(-1*b*t*(ra-rb)/rb)  +rc*Math.cos(c*t)
      // let y=Y+(ra-rb)*Math.cos(a*t)+rb*Math.cos(-1*b*t*(ra-rb)/rb)  +rc*Math.sin(c*t)
      ctx.strokeStyle = 'red'
      ctx.fillStyle = `hsl(${hue},100%,50%)`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(x, y, 2, 0, 2 * Math.PI, false)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    }
  }
  
  draw(a,b,c)

  let line1El = document.getElementById('line1')
  line1El.addEventListener('input',(el)=>{
    a= el.target.value
    document.getElementById('selectedline1').value=a
    draw(a,b,c)
  })
  let line2El = document.getElementById('line2')
  line2El.addEventListener('input',(el)=>{
    b= el.target.value
    document.getElementById('selectedline2').value=b
    draw(a,b,c)
  })
  let line3El = document.getElementById('line3')
  line3El.addEventListener('input',(el)=>{
    c= el.target.value
    document.getElementById('selectedline3').value=c
    draw(a,b,c)
  })

  document.addEventListener('mousemove',(e)=>{
    console.log(e.clientY)
    let display = e.clientY<400?'block':'none'
    document.getElementById('controls').style=`display:${display}`
  })
}
