/**
 * a class that contains the ground which the player walks on
 */
class Ground
{
  
    constructor(width,height)
    {
        this.Position = [0,height/2] ; // set the position of the ground 
        this.Size = [width,80]; // set the size of the ground of the level
    }
    
    draw(ctx)
    {
		ctx.fillStyle = "black"; // turn the ground to black
		ctx.fillRect( this.Position[0], this.Position[1], this.Size[0], this.Size[1]);	//draw the ground	
    }
}
