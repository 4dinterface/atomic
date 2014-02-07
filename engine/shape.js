 //========= Shape ===========//
  var Shape=function(GL){
    this.gl=GL;
    this.components=[];
        
    this.MOVEMATRIX=LIBS.get_I4();                        
    this.canvasTexture=document.getElementById("cool_canvas");
    this.context2D=this.canvasTexture.getContext("2d");    
  };

  var p=Shape.prototype;
  p.geometry=null;    
  
  p.update=function(){
    //LIBS.set_I4(MOVEMATRIX);//сброс матрицы
    var context2D=this.context2D;
    
    var r=Math.floor(256*Math.random()), g=Math.floor(256*Math.random()), b=Math.floor(256*Math.random());
    context2D.fillStyle="rgb("+r+","+g+","+b+")";
    var radius=10*Math.random();
    var x=radius+Math.random()*(512-2*radius), y=radius+Math.random()*(512-2*radius);
    context2D.beginPath();
    context2D.arc(x,y, radius, 0, 2 * Math.PI, false);
    context2D.fill();
    
    this.textureNeedUpdate=true;    
    
    for (var i=0,l=this.components.length;i<l;i++){
        if (this.components[i].update) this.components[i].update(this);
    }    
  }
    
  
  
  p.render=function(PROJMATRIX,VIEWMATRIX){            
    var GL=this.gl;
    
    var shaders=this.matherial.program,
        matherial=this.matherial,
        texture=this.matherial.texture;
    
    //Атрибуты шейдера
    var _Pmatrix=shaders._Pmatrix,
        _Vmatrix=shaders._Vmatrix,	
        _Mmatrix=shaders._Mmatrix,
        _position=shaders._position,
        _uv=shaders._uv;	    
    
    
    //перемещение
    GL.uniformMatrix4fv(_Pmatrix, false, PROJMATRIX);
    GL.uniformMatrix4fv(_Vmatrix, false, VIEWMATRIX);
    GL.uniformMatrix4fv(_Mmatrix, false, this.MOVEMATRIX);

    //установка текстуры    
    GL.activeTexture(GL.TEXTURE0);
    
    //если нужно обновить текстуру то обновим
    if(this.textureNeedUpdate==true){
        GL.bindTexture(GL.TEXTURE_2D, texture.texture);
        GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, this.canvasTexture);        
        this.textureNeedUpdate=false;
    }

    //устанавливае геометрию
    GL.vertexAttribPointer(_position, 3, GL.FLOAT, false,4*(3+2),0) ;
    GL.vertexAttribPointer(_uv, 2, GL.FLOAT, false,4*(3+2),3*4) ;        
    GL.bindBuffer(GL.ARRAY_BUFFER, this.geometry.CUBE_VERTEX);    
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.geometry.CUBE_FACES);
        
    
    //рисуем (6*2*3)
    GL.drawElements(GL.TRIANGLES, 6*2*3, GL.UNSIGNED_SHORT, 0);
  };

  p.texture=null;
  p.MOVEMATRIX=null

  p.rotateX=function(val){
    LIBS.rotateY(this.MOVEMATRIX, val);
  }
  p.rotateY=function(val){
    LIBS.rotateX(this.MOVEMATRIX, val);
  }
  p.translateZ=function(val){
      LIBS.translateZ(this.MOVEMATRIX, val);
  }
  p.translateX=function(val){
      LIBS.translateX(this.MOVEMATRIX, val);
  }
  
  //КОМПОНЕНТЫ
  p.components=null;
  p.addComponent=function(component){
    this.components.push(component);    
    
    if(component.isGeometry) this.geometry=component;
    if(component.isMatherial) this.matherial=component;        
    
    return component;
  }