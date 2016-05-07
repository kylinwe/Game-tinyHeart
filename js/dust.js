var dustObj=function(){
	this.x=[];
	this.y=[];
	this.amp=[];
	this.No=[];

	this.angle=0;
}

dustObj.prototype.num=40;
dustObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.x[i]=Math.random()*canWidth;
		this.y[i]=Math.random()*canHeight-150*Math.random();
		this.amp[i]=20+Math.random()*25;
		this.No[i]=Math.floor(Math.random()*7);
	}
}

dustObj.prototype.draw=function(){
	this.angle +=deltaTime*0.0008;
	var l=Math.sin(this.angle);
	for(var i=0;i<this.num;i++){
		var no=this.No[i];
		ctx1.drawImage(dustPic[no],this.x[i]+l*this.amp[i],this.y[i]);
	}
}