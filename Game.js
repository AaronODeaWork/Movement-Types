
/**
 * main game class for runing the game 
 */
class Game
{
    /**
     * a constructor ffor the main loop class 
     * @param {float} width  // width of screen
     * @param {Float} height //height of screen
     */
    constructor(width,height)
    {
        this.boundRecursiveUpdate = this.update.bind(this);//bind update to this  when it goes out tof scope
        
        this.canvasWidth = width; // assign the width of the screen
        this.canvasHeight = height; // assign the height of the screen
        this.ctx={};//create a canvas var 
        this.event ;
        this.initWorld();//call initialise canvas 
        this.player = new Player(50,50,100,100,10);
        this.goal = new Goal(window.innerWidth,window.innerHeight);
        this.ground = new Ground(window.innerWidth,window.innerHeight);
        this.previousTime = new Date()  ;
        this.graphpoint = [10,500];

    }
    /**
     * a function which initialises the canvas and key listiner 
     */
    initWorld()//prints out “Initialising game”
    {
        document.addEventListener("keydown", this.keyDownHandler.bind(null, this));
        document.addEventListener("keyup", this.keyUpHandler.bind(null, this));

        console.log("Initialising game world")
        var canvas = document.createElement("canvas");	// make a canvas
        canvas.id = 'mycanvas'; // name the canvas
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
        this.ctx = canvas.getContext("2d"); //assign it to ctx
        document.body.appendChild(canvas);
        document.body.style.backgroundColor = "gray";
        
    }
    /**
     * update for the game 
     */
    update()
    {
        var deltaTime = (new Date() - this.previousTime);
        this.draw();     
        this.player.update(deltaTime);


        window.requestAnimationFrame(this.boundRecursiveUpdate);// call game update
        this.player.obsticleHit(this.ground.Position,this.ground.Size, window.innerHeight,);
        

        this.graphpoint[1] = 500-((this.player.velocity[0]/this.player.maxSpeed)*100);
        this.graphpoint[0] += 2;

        this.previousTime = new Date();
    }
    /**
     * function which draws on the canvas
     */
    draw()
    {
     this.ctx.clearRect(0,0,innerWidth,innerHeight/2);
      if(this.graphpoint[0] > innerWidth)
     {
        this.ctx.clearRect(0,0,innerWidth,innerHeight);
        this.graphpoint[0] = 0
     }
     this.ctx.fillStyle = "#FFFFFF";// color the player to red
     this.ctx.fillRect(this.graphpoint[0], this.graphpoint[1], 2, 2);	//draw player
     this.player.draw(this.ctx);// draw the player
     this.goal.draw(this.ctx,this.player.goalHit(this.goal.Position,this.goal.Size));   
     this.ground.draw(this.ctx);   

     console.log(this.graphpoint[0] );
     console.log(innerWidth);

    
     if(this.player.envelope === 0)
     {
        this.ctx.fillStyle = "#FFFFFF";// color the player to white
     }
     if(this.player.envelope === 1)
     {
        this.ctx.fillStyle = "#FF0000";// color the player to red
     }
     if(this.player.envelope === 2)
     {
        this.ctx.fillStyle = "#FFF000";// color the player to yellow
     }
     this.ctx.fillRect(this.graphpoint[0], this.graphpoint[1], 2, 2);	//draw player

    }
 
    /**
    * 
    * @param {event} e  an event eg a key press that is checked
    */
    keyDownHandler(game, e)
	{
	//code triggered when Left arrow is pressed
	if(e.keyCode === 37)
	{
       game.player.moveLeft = true;
    }
	 //code triggered when Right arrow is pressed
	if(e.keyCode === 39)
	{
        game.player.moveRight = true;
    }

    if(e.keyCode === 38 && game.player.velocity[1] === 0)
	{
        game.player.jump = true;
    }
    if([32,37,38,39,40].indexOf(e.keyCode) > -1)
    {
        e.preventDefault();
    }
    }
    keyUpHandler(game, e)
	{
 	
	//code triggered when Left arrow is pressed
	if(e.keyCode === 37)
	{
       game.player.moveLeft = false;
    }
	//code triggered when Right arrow is pressed
	if(e.keyCode === 39)
	{
        game.player.moveRight = false;
    }
    if([32,37,38,39,40].indexOf(e.keyCode) > -1)
    {
        e.preventDefault();
    }
    }
}

