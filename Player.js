class Player {
  constructor(player, destination, color, reached=0) {
    this.player = player
    this.destination = destination
    this.color = color
    this._reached = reached
  }
  addToReached(){
    this._reached=this._reached+1
    console.log(`Player ${this.player}: ${this._reached} robots reached.`)
  }
}
export default Player