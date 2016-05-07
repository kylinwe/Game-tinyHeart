var momObj=function(){
	this.x;//鱼的坐标
	this.y;
	this.angle;//鱼的角度
	//this.bigEye=new Image();
	//this.bigBody=new Image();
	//this.bigTail=new Image();

	this.momTailTimer=0;
	this.momTailCount=0;

	this.momEyeTimer=0;
	this.momEyeCount=0;
	this.momEyeInterval=1000;

	this.momBodyCount=0;
}

momObj.prototype.init=function(){
	this.x=canWidth*0.5;
	this.y=canHeight*0.5;
	this.angle=0;
	//this.bigEye.src="./src/bigEye0.png";
	//this.bigBody.src="./src/bigSwim0.png";
	//this.bigTail.src="./src/bigTail0.png";
}

momObj.prototype.draw=function(){
	//lerp x,y使某一个物体追随另一个物体。
	this.x=lerpDistance(mx,this.x,0.92);//使鱼追随鼠标的移动而移动,lerpDistance(aim, cur, ratio)
	this.y=lerpDistance(my,this.y,0.92);

	//delta angle
	//Math.atan2(y,x),返回以弧度表示的反正切值，范围为  -π/2 至 π/2 之间。
	var deltaY=my-this.y;
	var deltaX=mx-this.x;
	var beta =Math.atan2(deltaY,deltaX)+Math.PI;//鱼相对于坐标的角度

	//使鱼的角度追随鼠标相对的角度
	this.angle=lerpAngle(beta,this.angle,0.6);//修改数值0.6,控制小鱼的速度

	this.momTailTimer +=deltaTime;
	if(this.momTailTimer>50){//修改数字50，控制尾巴的摆动速度
		this.momTailCount=(this.momTailCount+1)%8;
		this.momTailTimer %=50;
	}

	this.momEyeTimer += deltaTime;
	if(this.momEyeTimer>this.momEyeInterval){
		this.momEyeCount=(this.momEyeCount+1)%2;
		this.momEyeTimer %=this.momEyeInterval;

		if(this.momEyeCount==0){
			this.momEyeInterval=Math.random()*1500+2000;
		}else{
			this.momEyeInterval=200;
		}
	}

	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	var momTailCount=this.momTailCount;
	ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+30,-momTail[momTailCount].height*0.5);
	var momBodyCount=this.momBodyCount;
	if(data.double==1){
            ctx1.drawImage(momBodyOrange[momBodyCount],-momBodyOrange[momBodyCount].width*0.5,-momBodyOrange[momBodyCount].height*0.5);
	}else{
		    ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5);
}
    var momEyeCount=this.momEyeCount;
    ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);
    ctx1.restore();
}