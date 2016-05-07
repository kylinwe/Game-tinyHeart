var fruitObj=function(){
	this.alive=[];//bool
	this.x=[]//furit 的横坐标
	this.y=[];//纵坐标
	this.l=[];//图片的长度
	this.aneNo=[];//海葵的位置
	this.speed=[];//果实的上升速度和成长速度
	this.fruitType=[];
	this.orange=new Image();
	this.blue=new Image();
}
fruitObj.prototype.num=30;
fruitObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.alive[i]=false;
		this.x[i]=0;
		this.y[i]=0;
		this.l[i]=0;
		//this.aneNo[i]=0;
		this.speed[i]=Math.random()*0.017+0.003;//使每个果实都有不同的速度
		//this.born(i);//初始化时让每一个果实都出生
		this.fruitType[i]="";
	}
	this.orange.src="./src/fruit.png";
	this.blue.src="./src/blue.png";
}

fruitObj.prototype.born=function(i){
	//this.aneNo[i]=Math.floor(Math.random()*ane.num);
	var aneID=Math.floor(Math.random()*ane.num);
	this.x[i]=ane.headx[aneID];
	this.y[i]=ane.heady[aneID];
	this.l[i]=0;
	this.alive[i]=true;
	var ran=Math.random();
	if(ran<0.2){
		this.fruitType[i]="blue";
	}else{
		this.fruitType[i]="orange";
	}
}

fruitObj.prototype.draw=function(){
	//ctx2.save();
    for(var i=0;i<this.num;i++){
    	//draw>find an ane>grow>fly up
    	if(this.fruitType[i]=="blue"){
             var pic=this.blue;
    	}else{
    		var pic=this.orange;
    	}
    	if(this.alive[i]){
    		    if(this.l[i]<=14){
    		    	//var N=this.aneNo[i];
    		    	//this.x[i]=ane.headx[N];
    		    	//this.y[i]=ane.heady[N];
    		        this.l[i] += this.speed[i]*deltaTime;//使时间过度的更加平滑
    		       //ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
    	         }else{
    		             //var N=this.aneNo[i];
    		    	     //this.x[i]=ane.headx[N];
    		             this.y[i] -= this.speed[i]*7*deltaTime;
    		            
    	             }
    	              ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
    	              
         if(this.y[i]<10){
         	this.alive[i]=false;
         }
       }
    }
    //ctx2.restore();
}


fruitObj.prototype.dead=function(i){
    this.alive[i]=false;
}

function fruitMonitor(){
	var num=0;
	for(var i=0;i<fruit.num;i++){
		if(fruit.alive[i]) num++;
	}
	if(num<15){
		sendFruit();
		return;
	}
}

function sendFruit(){
	for(var i=0;i<fruit.num;i++){
		if(!fruit.alive[i]){//修改!
			fruit.born(i);
		    return;
		}
	}
}