var atomic=window.atomic||{};
+function(){    
    var Matherial=function(prop){ 
      this.gl = atomic.GL; //TODO отказаться от atomic.GL
      this.program = prop.program;
      this.texture= prop.texture;
    }    
    var p=Matherial.prototype;
    p.isMatherial=true;
    
    p.applyMatherial=function(){
        
    };
    
    atomic.Matherial=Matherial;
}();
