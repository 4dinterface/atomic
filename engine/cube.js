atomic=this.atomic||{};
+function(){
    function Cube(GL){    
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
    }
    
    atomic.Cube=Cube;
}()


atomic=this.atomic||{};
+function(){
    function Cube2(GL){    
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

        -1, 1,1,    0,0,
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
    }    
    atomic.Cube2=Cube2;
}()