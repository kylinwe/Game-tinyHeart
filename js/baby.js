var babyObj=function(){
	this.x;
	this.y;
	this.angle;
	//this.babyEye=new Image();
	//this.babyBody=new Image();
	//this.babyTail=new Image();

	//小鱼的动画
	this.babyTailTimer=0;//计时器
	this.babyTailCount=0;//计数器，记录小鱼的图片执行到哪一帧

	this.babyEyeTimer=0;//计时器
	this.babyEyeCount=0;//计数器，记录小鱼的图片执行到哪一帧
	this.babyEyeInterval=1000;//表示当前图片需要持续多长时间

	this.babyBodyTimer=0;//计时器
	this.babyBodyCount=0;//计数器，记录小鱼的图片执行到哪一帧
}

babyObj.prototype.init=function(){
	this.x=canWidth*0.5-50;
	this.y=canHeight*0.5+50;
	this.angle=0;
	//this.babyEye.src="./src/babyEye0.png";
	//this.babyBody.src="./src/babyFade0.png";
	//this.babyTail.src="./src/babyTail0.png";
}

babyObj.prototype.draw=function(){
	//ctx1
	this.x=lerpDistance(mom.x-50,this.x,0.98);
	this.y=lerpDistance(mom.y+50,this.y,0.98);

    var deltaY=mom.y-this.y;
	var deltaX=mom.x-this.x;
	var beta =Math.atan2(deltaY,deltaX)+Math.PI;//鱼相对于坐标的角度

	//使鱼的角度追随鼠标相对的角度
	this.angle=lerpAngle(beta,this.angle,0.6);

	//小鱼的尾巴计数,baby tail
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer>50){
		this.babyTailCount=(this.babyTailCount+1)%8;//对8取模
		this.babyTailTimer %=50;
	}

    //baby eye
	this.babyEyeTimer += deltaTime;
	if(this.babyEyeTimer>this.babyEyeInterval){
		this.babyEyeCount=(this.babyEyeCount+1)%2;
		this.babyEyeTimer %=this.babyEyeInterval;

		if(this.babyEyeCount==0){
			this.babyEyeInterval=Math.random()*1500+2000;
		}else{
			this.babyEyeInterval=200;
		}
	}

    //baby body
	this.babyBodyTimer +=deltaTime;
	if(this.babyBodyTimer>400){
		this.babyBodyCount=this.babyBodyCount+1;
		this.babyBodyTimer %=400;
		if(this.babyBodyCount>19){
			this.babyBodyCount=19;
			//game over
			data.gameOver=true;
		}
	}


	ctx1.save();
	ctx1.translate(this.x,this.y);
	//层叠，先画的在下面，后画的在上面
	ctx1.rotate(this.angle);

	var babyTailCount= this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+23,-babyTail[babyTailCount].height*0.5);
	var babyBodyCount=this.babyBodyCount;
	ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);
	var babyEyeCount=this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);
	ctx1.restore();
}