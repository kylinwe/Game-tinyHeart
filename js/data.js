var dataObj=function(){
	this.fruitNum=0;//分值总数
	this.double=1;//分值加倍，蓝色果实
	this.score=0;
	this.gameOver=false;
	this.alpha=0;
}

dataObj.prototype.reset=function(){
	this.fruitNum=0;
	this.double=1;
}

dataObj.prototype.draw=function(){
	var w=can1.width;
	var h=can1.height;

	ctx1.save();
	ctx1.shadowBlur=10;//阴影模糊
	ctx1.shadowColor="white";//阴影的颜色
	ctx1.fillStyle="white";//显示的颜色
	//ctx1.fillText("num: "+this.fruitNum,w*0.5,h-50);
	//ctx1.fillText("double: "+this.double,w*0.5,h-80);
	ctx1.fillText("SCORE: "+this.score,w*0.5,h-20);
	if(this.gameOver){
		this.alpha +=deltaTime*0.0003;
		if(this.alpha>1){
			this.alpha=1;
		}
		ctx1.fillStyle="rgba(255,255,255,"+this.alpha+")";
		ctx1.fillText("GAMEOVER",w*0.5,h*0.5);
	}
	ctx1.restore();
}

dataObj.prototype.addScore=function(){
	this.score +=this.fruitNum*100*this.double;
	this.fruitNum=0;
	this.double=1;
}