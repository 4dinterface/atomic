var atomic=window.atomic||{};
+function(){    
    var Matherial=function(prop){ 
      var GL=this.GL = prop.GL;      
      this.program = prop.program;
      this.texture= prop.texture;
    }    
    
    atomic.Matherial=Matherial;
}();
