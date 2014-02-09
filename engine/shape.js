 //========= Shape ===========//
  var Shape=function(){ this.init();   };

  var p=Shape.prototype;
  
  p.init=function(){
      var GL=this.gl=atomic.GL;
      this.components=[];

      this.MOVEMATRIX=LIBS.get_I4();                        
      this.canvasTexture=document.getElementById("cool_canvas");
      this.context2D=this.canvasTexture.getContext("2d");    

      //Эксперемент с фреймбуфером
      //this.framebuffer=new atomic.Framebuffer(GL);
  }
  
  
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

 
  /**
   * Рендеринг Shape
   * @param {type} PROJMATRIX
   * @param {type} VIEWMATRIX
   * @returns {undefined}
   */ 
  p.render=function(PROJMATRIX,VIEWMATRIX){            
    if(!this.geometry.ready) return;       
    
      
    var GL=this.gl,
        shaders=this.matherial.program,
        matherial=this.matherial,
        texture=this.matherial.texture;
        
    //GL.bindTexture(GL.TEXTURE_2D, texture.texture);    
          
    //перемещение
    GL.uniformMatrix4fv(shaders._Pmatrix, false, PROJMATRIX);
    GL.uniformMatrix4fv(shaders._Vmatrix, false, VIEWMATRIX);
    GL.uniformMatrix4fv(shaders._Mmatrix, false, this.MOVEMATRIX);

    //установка текстуры    
    GL.activeTexture(GL.TEXTURE0);
    
    //если нужно обновить текстуру то обновим
    if(this.textureNeedUpdate==true){
        GL.bindTexture(GL.TEXTURE_2D, texture.texture);
        GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, this.canvasTexture);        
        this.textureNeedUpdate=false;
    }
    //this.setFramebuffer(null, this.canvasTexture.width, this.canvasTexture.height);              

    //устанавливае геометрию    
    this.geometry.applyGeometry(shaders);                       
    GL.drawElements(GL.TRIANGLES, this.geometry.NPOINTS, this.geometry.DATATYPE, 0);
  };
  
  p.setFramebuffer=function(fbo, width, height) {
        var GL=this.gl;
        // make this the framebuffer we are rendering to.
        GL.bindFramebuffer(GL.FRAMEBUFFER, fbo);        
        // Tell the shader the resolution of the framebuffer.
        //GL.uniform2f(resolutionLocation, width, height);
        // Tell webgl the viewport setting needed for framebuffer.
        //GL.viewport(0, 0, width, height);
  } 

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