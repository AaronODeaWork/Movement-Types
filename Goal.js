/**
 * a class that contains the goal which the player must reach
 */
class Goal
{

    constructor(width,height)
    {	
		this.Position = [width-100,(height/2)-60] ; // set the position of the goal
        this.Size = [40,60]; // set the size of the goal of the level
   
    }
    
     /**
      * 
      * @param {canvas} ctx a instance of the canvas
      */
    draw(ctx,hit)
    {
        if(hit)
        {
        ctx.strokeStyle = "#FFFFFF"; // turn the goal to white
        ctx.strokeRect(this.Position[0],this.Position[1], this.Size[0], this.Size[1]);	//draw the goal	
        }
        if(!hit)
        {
            ctx.fillStyle = "#FFFFFF"; // turn the goal to white
            ctx.fillRect(this.Position[0],this.Position[1], this.Size[0], this.Size[1]);	//draw the goal	
        }
		
    }
}
