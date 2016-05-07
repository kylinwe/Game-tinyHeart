var aneObj=function(){
    //start point,contral point,end point(用正弦函数和二次贝塞尔曲线绘制摆动的海葵)
    //正弦函数用来确定摆动的结束点，二次贝塞尔曲线用来绘制摆动的海葵
	this.rootx=[];//海葵的位置
    this.headx=[];
    this.heady=[];
    this.angle=0;//正弦的角度
    this.amp=[];//振幅
	//this.length=[];//海葵的高度
}

aneObj.prototype.num=50;//prototype可为对象添加属性和方法,表示海葵的数量为50
aneObj.prototype.init=function(){
     for(var i=0;i<this.num;i++){
     	this.rootx[i]=i*16+Math.random()*20;
        this.headx[i]=this.rootx[i];//起始点
        this.heady[i]=canHeight-250+Math.random()*50;
        this.amp[i]=Math.random()*50+55;
     	//this.length[i]=200+Math.random()*50;
     }
}

aneObj.prototype.draw=function(){
     this.angle +=deltaTime*0.0008;
     var l=Math.sin(this.angle);
	 ctx2.save();
	 ctx2.globalAlpha=0.4;//这些不需要加在循环里面，以免增加运算量
	 ctx2.lineWidth=20;
     ctx2.shadowBlur=20;
     ctx2.shadowColor="rgba(138,43,226,0.4)";
     ctx2.lineCap="round";
     ctx2.strokeStyle="#3b154b";//要定义在stroke之前
      for(var i=0;i<this.num;i++){
     	//beginPath,moveto,lineto,stroke,strokeStyle(颜色),lineWidth,lineCap(样式),globlAlpha
     	ctx2.beginPath();
     	ctx2.moveTo(this.rootx[i],canHeight);
        //ctx2.lineTo(this.x[i],canHeight-this.length[i]);
        this.headx[i]=this.rootx[i]+l*this.amp[i];
        ctx2.quadraticCurveTo(this.rootx[i],canHeight-150,this.headx[i],this.heady[i]);
        ctx2.stroke();
     }
     ctx2.restore();//表示位于save和restore中间的这段代码只在这里起作用

}