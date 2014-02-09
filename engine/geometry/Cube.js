atomic=this.atomic||{};
+function(){
    function Cube(){    
      var GL=atomic.GL;
      this.gl=GL;
      /*========================= THE CUBE ========================= */
      //POINTS :
      var cube_vertex=[
        -1,-1,-1,    0,0,
        1,-1,-1,     1,0,
        1, 1,-1,     1,1,
        -1, 1,-1,    0,1,

        -1,-1, 1,    0,0,
        1,-1, 1,     1,0,
        1, 1, 1,     1,1,
        -1, 1, 1,    0,1,

        -1,-1,-1,    0,0,
        -1, 1,-1,    1,0,
        -1, 1, 1,    1,1,
        -1,-1, 1,    0,1,

        1,-1,-1,     0,0,
        1, 1,-1,     1,0,
        1, 1, 1,     1,1,
        1,-1, 1,     0,1,

        -1,-1,-1,    0,0,
        -1,-1, 1,    1,0,
        1,-1, 1,     1,1,
        1,-1,-1,     0,1,

        -1, 1,-1,    0,0,
        -1, 1, 1,    1,0,
        1, 1, 1,     1,1,
        1, 1,-1,     0,1
      ];

      var CUBE_VERTEX= GL.createBuffer ();
      GL.bindBuffer(GL.ARRAY_BUFFER, CUBE_VERTEX);
      GL.bufferData(GL.ARRAY_BUFFER,
                    new Float32Array(cube_vertex),
                    GL.STATIC_DRAW);

      //FACES :
      var cube_faces = [
        0,1,2,
        0,2,3,

        4,5,6,
        4,6,7,

        8,9,10,
        8,10,11,

        12,13,14,
        12,14,15,

        16,17,18,
        16,18,19,

        20,21,22,
        20,22,23

      ];
      var CUBE_FACES= GL.createBuffer ();
      GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, CUBE_FACES);
      GL.bufferData(GL.ELEMENT_ARRAY_BUFFER,
                    new Uint16Array(cube_faces),
                    GL.STATIC_DRAW);

      //вернем буферы
      this.CUBE_VERTEX=CUBE_VERTEX;
      this.CUBE_FACES=CUBE_FACES;  
      
      //тип данных для рендера
      this.DATATYPE=GL.UNSIGNED_SHORT;      
      
      //количество точек
      this.NPOINTS=6*2*3;              
    }
    var p=Cube.prototype;
    p.isGeometry=true;
    p.ready=true;
    
    //применяем геометрию
    p.applyGeometry=function(shaders){
        var GL=this.gl;
        GL.vertexAttribPointer(shaders._position, 3, GL.FLOAT, false,4*(3+2),0);
        GL.vertexAttribPointer(shaders._uv, 2, GL.FLOAT, false,4*(3+2),3*4);        
        GL.bindBuffer(GL.ARRAY_BUFFER, this.CUBE_VERTEX);    
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.CUBE_FACES);                    
    }

       
    atomic.Cube=Cube;
}()