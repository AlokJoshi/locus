import Player from './player.js'
class Robot extends Player{
  constructor(player,location,destination,color) {
    super(player,destination,color)
    //starting location
    this._location = location
    this._reached = false
  }
  set location(value){
    this._location=value
  }
  get location(){
    return this._location
  }  
  get x(){
    return this._location.x
  }
  set x(value){
    this._location.x=value
    this.updateReached()
  }
  get y(){
    return this._location.y
  }
  set y(value){
    this._location.y=value
    this.updateReached()
  }
  updateReached(){
    if(this._location.x==this.destination.x && this._location.y==this.destination.y) {
      //console.log(`Robot for Player${this.player} reached`)
      this._reached=true
      let e = new Event('reached')

    }
  }
  get reached(){
    return this._reached
  }
  
  
}
export default Robot