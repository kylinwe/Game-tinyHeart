var can1;
var can2;

var ctx1;//can1的场景
var ctx2;

var lastTime;//上一帧的执行时间
var deltaTime;//两帧间隔的时间差

var bgPic= new Image();
var ane;
var fruit;
var mom;
var mx;//鼠标的位置
var my;

var baby;

var canWidth;//画布的宽度
var canHeight;

var babyTail=[];
var babyEye=[];
var babyBody=[];

var momTail=[];
var momEye=[];
var momBodyBlue=[];
var momBodyOrange=[];

var data;
var wave;//大鱼吃掉果实时的白色小圈
var halo;//大鱼和小鱼接触时的黄色圆圈

var dust;//漂浮物
var dustPic=[];

document.body.onload=game;//不能有（），表示body加载完之后要执行的函数

function game(){
	//console.log("onload");//log会在后台显示
	init();
	lastTime=Date.now();
	deltaTime=0;
	gameloop();
}

function init(){
	//获得canvas中的content
	can1=document.getElementById("canvas1");//相当于画布,位于前面，用来绘制fishes,UI,dust,circles
	ctx1=can1.getContext('2d');//相当于画笔
	can2=document.getElementById("canvas2");//background,fruits,ane
	ctx2=can2.getContext('2d');

	can1.addEventListener("mousemove",onMouseMove,false);

	bgPic.src="./src/background.jpg";//初始化图像

	canWidth=can1.width;
	canHeight=can1.height;

	ane=new aneObj();
	ane.init();

	fruit=new fruitObj();
	fruit.init();

	mom=new momObj();
	mom.init();

	baby=new babyObj();
	baby.init();

	mx=canWidth*0.5;
	my=canHeight*0.5;

	for(var i=0;i<8;i++){//小鱼尾巴的序列帧放在数组里
		babyTail[i]= new Image();
		babyTail[i].src="./src/babyTail"+i+".png";
	}

	for(var i=0;i<2;i++){//小鱼眼睛的序列帧放在数组里
		babyEye[i]= new Image();
		babyEye[i].src="./src/babyEye"+i+".png";
	}

	for(var i=0;i<20;i++){//小鱼身体的序列帧放在数组里
		babyBody[i]= new Image();
		babyBody[i].src="./src/babyFade"+i+".png";
	}

	for(var i=0;i<8;i++){//大鱼尾巴帧放在数组里
		momTail[i]= new Image();
		momTail[i].src="./src/bigTail"+i+".png";
	}

	for(var i=0;i<2;i++){//大鱼眼睛的序列帧放在数组里
		momEye[i]= new Image();
		momEye[i].src="./src/bigEye"+i+".png";
	}

	data=new dataObj();

	for(var i=0;i<8;i++){
		momBodyOrange[i]=new Image();
		momBodyBlue[i]=new Image();
		momBodyOrange[i].src="./src/bigSwim"+i+".png";
		momBodyBlue[i].src="./src/bigSwimBlue"+i+".png";
	}

	ctx1.font="30px Verdana";
	ctx1.textAlign="center";

	wave=new waveObj();
	wave.init();

	halo=new haloObj();
	halo.init();

	for(var i=0;i<7;i++){
		dustPic[i]=new Image();
		dustPic[i].src="./src/dust"+i+".png";
	}
	dust=new dustObj();
	dust.init();

   
}

function gameloop(){
	requestAnimFrame(gameloop);//相对于setInterval,setTimeout更加科学，可以智能地根据机器的性能来确定间隔的时间
	var now=Date.now();
	deltaTime=now-lastTime;
	lastTime=now;
	if(deltaTime>40)  deltaTime=40;//因为当页面切换时，deltatime会变大，此时果实也会随着变大

	drawBackground();//绘制背景
	ane.draw();//绘制海葵
	fruit.draw();//绘制果实
	fruitMonitor();

	ctx1.clearRect(0,0,canWidth,canHeight);
	mom.draw();//绘制大鱼
	baby.draw();//绘制小鱼
	momFruitsCollision();//大鱼和果实的碰撞检测
	momBabyCollision();//大鱼和小鱼的碰撞检测

	data.draw();
	wave.draw();//绘制圆圈
	halo.draw();
	dust.draw();
}

function onMouseMove(e){
	if(!data.gameOver){
            if(e.offSetX||e.layerX){
		mx=e.offSetX==undefined?e.layerX:e.offSetX;
		my=e.offSetY==undefined?e.layerY:e.offSetY;
	}
  }
}