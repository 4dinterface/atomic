
  var shader_vertex_source="\n\
attribute vec3 position;\n\
uniform mat4 Pmatrix;\n\
uniform mat4 Vmatrix;\n\
uniform mat4 Mmatrix;\n\
attribute vec2 uv;\n\
varying vec2 vUV;\n\
void main(void) { //pre-built function\n\
gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);\n\
vUV=uv;\n\
}";
  
  var shader_fragment_source="\n\
precision mediump float;\n\
uniform sampler2D sampler;\n\
varying vec2 vUV;\n\
\n\
\n\
void main(void) {\n\
gl_FragColor = texture2D(sampler, vUV);\n\
}";

atomic=window.atomic||{};


+function(){
    
    function Program(GL){ 
      this.GL=GL;  
      
      //установим шейдеры
      var shader_vertex=this.compileShader(shader_vertex_source, GL.VERTEX_SHADER, "VERTEX");
      var shader_fragment=this.compileShader(shader_fragment_source, GL.FRAGMENT_SHADER, "FRAGMENT");

      //откомпилируем программу
      var SHADER_PROGRAM=GL.createProgram();
      GL.attachShader(SHADER_PROGRAM, shader_vertex);
      GL.attachShader(SHADER_PROGRAM, shader_fragment);  
      GL.linkProgram(SHADER_PROGRAM);


      this._Pmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Pmatrix");
      this._Vmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Vmatrix");
      this._Mmatrix = GL.getUniformLocation(SHADER_PROGRAM, "Mmatrix");

      this._sampler = GL.getUniformLocation(SHADER_PROGRAM, "sampler");
      this._uv = GL.getAttribLocation(SHADER_PROGRAM, "uv");
      this._position = GL.getAttribLocation(SHADER_PROGRAM, "position");

      GL.enableVertexAttribArray(this._uv);
      GL.enableVertexAttribArray(this._position);

      GL.useProgram(SHADER_PROGRAM);
      GL.uniform1i(this._sampler, 0);
    }
    
    //прототип
    var p=Program.prototype={};
    
    
    /**
     * метод компилирует шейдеры
     * @param {type} source
     * @param {type} type
     * @param {type} typeString
     * @returns {Program.prototype.get_shader.shader|Boolean}
     */
    p.compileShader=function(source, type, typeString) {
        var GL=this.GL;
        
        var shader = GL.createShader(type);
        GL.shaderSource(shader, source);
        GL.compileShader(shader);
        if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
          alert("ERROR IN "+typeString+ " SHADER : " + GL.getShaderInfoLog(shader));
          return false;
        }
        return shader;
    };
    
    atomic.Program=Program;
}()