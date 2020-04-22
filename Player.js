/**
 * a class which contains the player which the user controls 
 */
class Player {
	/**
	 * 
	 * @param {int} height the height of the player
	 * @param {int} width the width of the player
	 * @param {float} x the x postion of the player
	 * @param {float} y the y postion of the player
	 */
	constructor() {

		this.Position = [0, 0]; // set the position of the ground 
		this.LastPosition = [0, 0];

		this.gravity = .98;
		this.velocity = [0, 0];
		this.acceleration = [0, 0];

		this.Size = [40, 60]; // set the size of the ground of the level
		this.Speed = .5;//speed of player 
		this.VSides = false;
		this.HSides = false;

		this.moveLeft = false;
		this.moveRight = false;
		this.jump = false;
		this.maxSpeed = 10;
		this.leftKeyPressedTime = 0;
		this.rightKeyPressedTime = 0;

		this.envelope = 0;

	}

	/**
 	* 
	 * @param {canvas} ctx  an instance of the canvas
 	*/
	draw(ctx) {
		ctx.fillStyle = "#FF0000";// color the player to red
		ctx.fillRect(this.Position[0], this.Position[1], this.Size[0], this.Size[1]);	//draw player
	}
	update(deltaTime) {
		this.LastPosition[0] = this.Position[0];
		this.LastPosition[1] = this.Position[1];

		this.velocity[1] += this.gravity;

		if (this.moveRight === true) {
			this.rightKeyPressedTime += deltaTime;
			if(this.envelope === 0)
			{
				this.getMarioVelocity(deltaTime);
			}
			else if(this.envelope === 1)
			{
				this.getDonkeyVelocity(deltaTime);
			}
			else if(this.envelope === 2)
			{
				this.getOrganicVelocity(deltaTime);
			}
			
			this.rightKeyPressedTime = this.getMTime();

			//	console.log(this.rightKeyPressedTime + ":" + this.velocity[0]);

			this.velocity[0] += this.acceleration[0];
			if (this.velocity[0] >= this.maxSpeed) {
				this.velocity[0] = this.maxSpeed;
			}
			this.Position[0] += this.velocity[0];
		}
		else if (this.moveRight === false) {
			this.rightKeyPressedTime = 0;
		}

		if (this.moveLeft === true) {
			this.leftKeyPressedTime += deltaTime;
			if(this.envelope === 0)
			{
				this.getMarioVelocity(deltaTime);
			}
			else if(this.envelope === 1)
			{
				this.getDonkeyVelocity(deltaTime);
			}
			else if(this.envelope === 2)
			{
				this.getOrganicVelocity(deltaTime);
			}
		

			this.leftKeyPressedTime = this.getMTime();

			this.velocity[0] += this.acceleration[0];
			if (this.velocity[0] >= this.maxSpeed) {
				this.velocity[0] = this.maxSpeed;
			}

			this.Position[0] -= this.velocity[0];
		}
		else if (this.moveLeft === false) {
			this.leftKeyPressedTime = 0;
		}

		if (!this.moveLeft && !this.moveRight) {


			if (this.velocity[0] > 1) {
				this.velocity[0] -= this.acceleration[0];
			}
			if (this.velocity[0] < 1) {
				this.velocity[0] += this.acceleration[0];
			}

		}
		this.Position[1] += this.velocity[1];


		if (this.jump === true) {
			this.velocity[1] = +this.maxSpeed;

			this.envelope++;
			if (this.envelope > 2)
			{
				this.envelope = 0;
			}
			this.jump = false;
		}

		console.log(this.envelope);
	}

	obsticleHit(ObsticlePosition, ObsticlerSize, height) {
		this.VSides = false;
		this.HSides = false;

		if ((this.Position[0] + (this.Size[0])) > (ObsticlePosition[0]) &&
			(this.Position[0]) < (ObsticlePosition[0] + (ObsticlerSize[0]))) {
			this.VSides = true;
		}

		if ((this.Position[1] + (this.Size[1])) > (ObsticlePosition[1]) &&
			(this.Position[1]) < (ObsticlePosition[1] + (ObsticlerSize[1]))) {
			this.HSides = true;
		}

		if (this.HSides == true && this.VSides == true) {
			this.Position[1] = this.LastPosition[1];
			this.velocity[1] = 0;
		}

		if (this.VSides == true && (this.Position[1] + (this.Size[1])) > (ObsticlePosition[1]) + .5 && (this.Position[1]) < (ObsticlePosition[1] + (ObsticlerSize[1]))) {
			this.Position[0] = this.LastPosition[0];
			this.velocity[0] = 0;
		}

		if ((this.Position[1] + (this.Size[1]) > height / 2))//hit detection between ground and player
		{
			this.Position[1] = this.LastPosition[1];
			this.velocity[1] = 0;
		}


	}

	getMarioVelocity(t) {
		this.acceleration[0] = (this.maxSpeed / 750) * t;
	}
	getDonkeyVelocity(t) {
		this.acceleration[0] = (this.maxSpeed / 450) * t;
	}
	getOrganicVelocity(t) {
		this.acceleration[0] = ((this.maxSpeed / 750)*t)*((this.maxSpeed / 750)*t);
	}
	getMTime() {
		var t = this.velocity[0] / this.acceleration[0];
		return t;
	}
	goalHit(GoalPosition, GoalSize) {
		if (
			(this.Position[0] + (this.Size[0] / 2)) > (GoalPosition[0] - (GoalSize[0] / 2)) &&
			(this.Position[0] - (this.Size[0] / 2)) < (GoalPosition[0] + (GoalSize[0] / 2)) &&
			(this.Position[1] + (this.Size[1] / 2)) > (GoalPosition[1] - (GoalSize[1] / 2)) &&
			(this.Position[1] - (this.Size[1] / 2)) < (GoalPosition[1] + (GoalSize[1] / 2))
		) {
			return false;
		}
		else {
			return true;
		}
	}
}
