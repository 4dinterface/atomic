var count=1;
var main=function() {        
  //сцена
  var stage=new atomic.Stage("your_canvas");  
  
  //материал
  var matherial=new atomic.Matherial({    
      program:new atomic.Program(),
      texture:new atomic.Texture()
  });
  
  /*var matherial2=new atomic.Matherial({    
      program:new atomic.Program(),
      texture:new atomic.Texture()
  });*/
    
    
  //Геометрия
  var geometry=new atomic.Cube();       
  var geometry2=new atomic.ModelFromJson('/ressources/dragon.json');       
  
  //первый шейп
  var sh=new Shape();
  sh.addComponent(matherial);
  sh.addComponent(geometry);      
  sh.translateX(-2);  
    
  //второй шейп
  var sh2=new Shape();  
  sh2.addComponent(matherial);
  sh2.addComponent(geometry2);    
  sh2.translateX(2);  

  //Добавим детей на сцену
  count++;
    
  stage.addChildren(sh2);  
 // stage.addChildren(sh);
 
 LIBS.translateZ(stage.VIEWMATRIX, -20);
 LIBS.translateY(stage.VIEWMATRIX, -4);
     
  var animate=function(time) {
    stage.update(time);
    window.requestAnimationFrame(animate);
  } 
  
  animate(0);
}