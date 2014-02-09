var atomic=window.atomic||{};
+function(){    
    var Stage=function(id){     
        this.init(id)
    }    
    var p=Stage.prototype;
    
    p.init=function(id){
        //инициализация канваса
        var CANVAS=this.CANVAS=document.getElementById(id);
        CANVAS.width=window.innerWidth;
        CANVAS.height=window.innerHeight;        
        
        //матрица отображения
        this.PROJMATRIX=LIBS.get_projection(40, CANVAS.width/CANVAS.height, 1, 100);
        this.VIEWMATRIX=LIBS.get_I4();          
        LIBS.translateZ(this.VIEWMATRIX, -6);                        
        
        /*========================= GET WEBGL CONTEXT ========================= */
        try {
            atomic.GL= CANVAS.getContext("experimental-webgl", {antialias: true});            
            this.initWebGL(atomic.GL);                              
        } catch (e) {
            alert("You are not webgl compatible :(") ;
            return false;
        } ;
                               
        this.childrens=[];                              
    },
            
    p.initWebGL=function(gl){
         //подключим расширения (фрагмент для рендеринга ддракона)
         var EXT = gl.getExtension("OES_element_index_uint") ||
         gl.getExtension("MOZ_OES_element_index_uint") ||
         gl.getExtension("WEBKIT_OES_element_index_uint");
        
         //инициализация webGL
         gl.enable(gl.DEPTH_TEST);
         gl.depthFunc(gl.LEQUAL);
         gl.clearColor(0.0, 0.0, 0.0, 0.0);
         gl.clearDepth(1.0);                                    
         
         this.gl =gl;                
    },            
            
    p.addChildren=function(child){
        this.childrens.push(child);
    }      
    
    //Обновим сцену
    p.update=function(time){
        var GL=this.gl;

        //установка viewport, очистка канваса
        GL.viewport(0.0, 0.0, this.CANVAS.width, this.CANVAS.height);
        GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

            for(var i in this.childrens){
                    this.childrens[i].rotateX(0.01);
                    this.childrens[i].rotateY(0.01);                

                    this.childrens[i].update();
                    this.childrens[i].render(this.PROJMATRIX,this.VIEWMATRIX);                    
            }
            GL.flush();
        
    }
    
    atomic.Stage=Stage;
}();