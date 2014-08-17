function Character(canvas,x,y,width,height,imgsrc) {
	//JAVASCRIPT GAME I MADE AGES AGO
	//You can make a new character just with new Character(params)
	// then you can do that character you created.render() and so on

	 
	this.canvas = canvas;
	this.ap=0; /* Armor Points */
	this.hp=this.ap+20;
	this.fullHp=this.ap+20;
	this.x = x;
	this.y = y;
	this.deltaX= 0;
	this.speed = 8;
	this.damageValue = 1;
	this.deltaY= 0;
	this.rotation = 0;
	this.width = width;
	this.height = height;
	this.image = new Image();
	this.image.src = imgsrc;
}
Character.prototype = {
	render: function() {
		this.x += this.deltaX;
		this.y += this.deltaY;
		
		// ROTATION CODE
		ctx.save();
		ctx.translate(this.x, this.y);

		ctx.rotate(this.rotation * (Math.PI/180));
		ctx.drawImage(this.image, -(this.width/2), -(this.height/2));
		ctx.restore();
		// End 
		
	}
}