var haloObj=function(){
	this.x=[];//圆圈的位置
	this.y=[];
	this.alive=[];//圆圈是否闲置
	this.r=[];//圆圈的半径
}

haloObj.prototype.num=5;
haloObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		 this.alive[i]=false;
		 this.r[i]=0;
	}
}

haloObj.prototype.draw=function(){
	ctx1.save();
	ctx1.lineWidth=2;
	ctx1.shadowBlur=10;
	ctx1.shadowColor="rgba(203,91,0)";
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			//draw
			this.r[i] +=deltaTime*0.05;//半径随着时间增大
			if(this.r[i]>100){
				 this.alive[i]=false;
				 break;
			}
			var alpha=1-this.r[i]/100;//透明度
            ctx1.beginPath();//开始绘制半径
            ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
            ctx1.closePath();
            ctx1.strokeStyle="rgba(203,91,0,"+alpha+")";
            ctx1.stroke();
		}
	}
	ctx1.restore();
}

haloObj.prototype.born=function(x,y){
	for(var i=0;i<this.num;i++){
		if(!this.alive[i]){//如果为false，证明没被使用
			//born
			this.alive[i]=true;
			this.r[i]=10;
			this.x[i]=x;
			this.y[i]=y;
			//return;//跳出循环，因为每次只需要一个圆圈
		}
	}
}