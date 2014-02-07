var main=function() {
  var CANVAS=document.getElementById("your_canvas");
  CANVAS.width=window.innerWidth;
  CANVAS.height=window.innerHeight;
    
  
  /*========================= GET WEBGL CONTEXT ========================= */
  try {
    var GL = CANVAS.getContext("experimental-webgl", {antialias: true});
  } catch (e) {
    alert("You are not webgl compatible :(") ;
    return false;
  } ;
  
  
  /*========================= MATRIX ========================= */
  
  var PROJMATRIX=LIBS.get_projection(40, CANVAS.width/CANVAS.height, 1, 100);
  var VIEWMATRIX=LIBS.get_I4();  
  LIBS.translateZ(VIEWMATRIX, -6);
    
  //материал
  var matherial=new atomic.Matherial({
      GL:GL,
      program:new atomic.Program(GL),
      texture:new atomic.Texture(GL)
  });
  var geometry=new atomic.Cube(GL);
  var geometry2=new atomic.Cube2(GL);
  var stage=new atomic.Stage();
  
  //первый шейп
  var sh=new Shape(GL);
  sh.material=matherial;
  sh.geometry=geometry2;
  sh.translateX(-2);  
  stage.addChildren(sh);
    

  //второй шейп
  var sh=new Shape(GL);  
  sh.material=matherial;  
  sh.geometry=geometry;
  stage.addChildren(sh);
  sh.translateX(2);  

  /*========================= DRAWING ========================= */
  GL.enable(GL.DEPTH_TEST);
  GL.depthFunc(GL.LEQUAL);
  GL.clearColor(0.0, 0.0, 0.0, 0.0);
  GL.clearDepth(1.0);
  
  var time_old=0;

  //метод анимации
  var animate=function(time) {
    var dt=time-time_old;    
    time_old=time;
    
    //установка viewport, очистка канваса
    GL.viewport(0.0, 0.0, CANVAS.width, CANVAS.height);
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

	for(var i in stage.childrens){
		stage.childrens[i].rotateX(0.01);
		stage.childrens[i].rotateY(0.01);                
                
                stage.childrens[i].update();
		stage.childrens[i].render(PROJMATRIX,VIEWMATRIX);
	}
    
    GL.flush();
    window.requestAnimationFrame(animate);
  }
  animate(0);
}
