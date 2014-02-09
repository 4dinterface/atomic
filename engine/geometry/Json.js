atomic=this.atomic||{};
+function(){
    
    function ModelFromJson(path){    
      var GL=atomic.GL;            
      this.gl=atomic.GL;;
      
      LIBS.get_json(path, function(dragon){
      //LIBS.get_json("ressources/macbook.json", function(dragon){
          
        console.log(dragon);
        
        var CUBE_VERTEX= GL.createBuffer ();
        GL.bindBuffer(GL.ARRAY_BUFFER, CUBE_VERTEX);
        GL.bufferData(GL.ARRAY_BUFFER,
                      new Float32Array(dragon.vertices),
                      GL.STATIC_DRAW);

        //faces
        var CUBE_FACES=GL.createBuffer ();
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CUBE_FACES);
        GL.bufferData(GL.ELEMENT_ARRAY_BUFFER,
                      new Uint32Array(dragon.indices),
                      GL.STATIC_DRAW);

        
        //количество точек 
        this.NPOINTS=dragon.indices.length;
        
        //тип данных
        this.DATATYPE=GL.UNSIGNED_INT;        
        
        //вернем буферы
        this.CUBE_VERTEX=CUBE_VERTEX;
        this.CUBE_FACES=CUBE_FACES;          
        this.ready=true;
      }.bind(this));      
            
    }
    
    
    var p=ModelFromJson.prototype;
    //флаг указывает что компонент  является геометрией
    p.isGeometry=true;    
    //флаг готовности компонента к использования
    p.ready=false;
    
    //применяем геометрию
    p.applyGeometry=function(shaders){
        var GL=this.gl;
        GL.vertexAttribPointer(shaders._position, 3, GL.FLOAT, false,4*(3+3+2),0) ;
        GL.vertexAttribPointer(shaders._uv, 2, GL.FLOAT, false,4*(3+3+2),(3+3)*4) ;    
        GL.bindBuffer(GL.ARRAY_BUFFER, this.CUBE_VERTEX);    
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.CUBE_FACES);                    
    }

    
    atomic.ModelFromJson=ModelFromJson;
}()