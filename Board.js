class Board {
  constructor(n, obs = [], robots = []) {
    //save some values
    this.c = document.getElementById('mycanvas')
    this.ctx = this.c.getContext('2d')
    this.n = n
    this.arr = []

    //create an array to store data
    for (let i = 0; i < n; i++) {
      let a = []
      for (let j = 0; j < n; j++) {
        a.push(new Object({ obstruction: false, robothere: false }))
      }
      this.arr.push(a)
    }

    this.w = this.c.width / n
    this.h = this.c.height / n
    for (let i = 0; i < obs.length; i++) {
      let o = obs[i]
      //console.log(JSON.stringify(o))
      for (let x = o.x; x < o.x + o.w; x++) {
        for (let y = o.y; y < o.y + o.h; y++) {
          let obj = this.arr[x][y]
          obj.obstruction = true
        }
      }
    }

    //store players and robots
    this.robots = robots

    //object to store the player info for each player for easier access.
    //Here player id is the key
    this.players = {}
    this.robots.forEach(x => {
      let keys = Object.keys(this.players)
      if (!keys.includes(x.player)) {
        this.players[x.player] = {
          player: x.player,
          destination: x.destination,
          color: x.color
        }
      }
    })

    //initial robothere
    this.robots.forEach(robot => {
      this.arr[robot.x][robot.y].robothere=true
    })

  }

  displayGridLines() {
    this.ctx.fillStyle = "white"
    this.ctx.clearRect(0, 0, this.c.width, this.c.height)
    this.ctx.strokeStyle = "#fdfdfd"
    for (let x = 0; x < this.n; x++) {
      this.ctx.beginPath()
      this.ctx.moveTo(x * this.w, 0)
      this.ctx.lineTo(x * this.w, this.c.height)
      this.ctx.stroke()
    }
    for (let y = 0; y < this.n; y++) {
      this.ctx.beginPath()
      this.ctx.moveTo(0, y * this.h)
      this.ctx.lineTo(this.c.width, y * this.h)
      this.ctx.stroke()
    }
  }
  display() {

    this.displayGridLines()
    this.ctx.fillStyle = "#ffdddd"
    for (let x = 0; x < this.n; x++) {
      for (let y = 0; y < this.n; y++) {
        let obj = this.arr[x][y]
        if (obj.obstruction == true) {
          this.ctx.fillRect(x * this.w, y * this.h, this.w, this.h)
        }
      }
    }
    //we now do the following for each player
    //place each of the robots in their starting position
    for (let r = 0; r < this.robots.length; r++) {
      let robot = this.robots[r]
      this.ctx.fillStyle = robot.color
      this.ctx.fillRect(robot.x * this.w, robot.y * this.h, this.w, this.h)
    }

    //we now place the destination for each player
    let keys = Object.getOwnPropertyNames(this.players)
    keys.forEach(key => {
      let player = this.players[key]
      this.ctx.strokeStyle = player.color
      this.ctx.beginPath()
      this.ctx.arc(
        player.destination.x * this.w + this.w / 2,
        player.destination.y * this.h + this.h / 2,
        Math.min(this.h, this.w) / 2,
        0,
        2 * Math.PI,
        true
      )
      this.ctx.stroke()
    });
  }
  makeRandomSequenceArray(count){
    
    let rsa = []
    const num = 50  //number of times the sequence array will be shuffled
    for(let i=0;i<count;i++){
      rsa[i]=i
    }
    for (let i = 0; i < num; i++) {
      let j = Math.floor(Math.random() * count)
      let k = Math.floor(Math.random() * count)
      let temp = rsa[j]
      rsa[j] = rsa[k]
      rsa[k] = temp
    }
    return rsa
  }
  move() {
    let rsa = this.makeRandomSequenceArray(this.robots.length)
    rsa.forEach(index=>{
      let robot = this.robots[index]
      if (!robot.reached) {

        //preferred x direction
        let xdir = Math.sign(robot.destination.x - robot.x)
        //preferred y direction
        let ydir = Math.sign(robot.destination.y - robot.y)
        let xVal = Math.abs(robot.destination.x - robot.x)
        let yVal = Math.abs(robot.destination.y - robot.y)
        let del = false
        let orig_x, orig_y
        let next_x, next_y
        orig_x=robot.x
        orig_y=robot.y

        if (xVal >= yVal) {
          next_x = robot.x + xdir * 1
          next_y = robot.y
          if ((!this.arr[next_x][next_y].obstruction) && (!this.arr[next_x][next_y].robothere)) {
            robot.x = next_x
            del = true
          }
          next_x = robot.x
          next_y = robot.y + ydir * 1
          if ((!this.arr[next_x][next_y].obstruction) && (!this.arr[next_x][next_y].robothere)) {
            robot.y = next_y
            del = true
          }
        } else {
          next_x = robot.x
          next_y = robot.y + ydir * 1
          if ((!this.arr[next_x][next_y].obstruction) && (!this.arr[next_x][next_y].robothere)) {
            robot.y = next_y
            del = true
          }
          next_x = robot.x + xdir * 1
          next_y = robot.y
          if ((!this.arr[next_x][next_y].obstruction) && (!this.arr[next_x][next_y].robothere)) {
            robot.x = next_x
            del = true
          }
        }
        if (del) {
          if(!robot.reached){
            this.arr[next_x][next_y].robothere=true
          }
          this.arr[orig_x][orig_y].robothere=false
        } else{
          console.warn(`Robot of player: ${robot.player} could not move`)
        }
      }
    })
  }
  animate() {
    setInterval(() => {
      this.display()
      this.move()
      //requestAnimationFrame(this.animate)
    }, 500)
  }
}
export default Board