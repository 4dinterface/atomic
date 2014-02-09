var atomic=window.atomic||{};
+function(){    
    var image={};
    image.width=100;
    image.height=100;
    //alert(image.height);
    var Framebuffer=function(gl){ 
        
        this.gl = gl;
        
        // create 2 textures and attach them to framebuffers.
        var textures = [],
            framebuffers = [];
            
        for (var ii = 0; ii < 2; ++ii) {
          var texture = this.createAndSetupTexture(gl);
          textures.push(texture);

          // make the texture the same size as the image
          gl.texImage2D(
              gl.TEXTURE_2D, 0, gl.RGBA, image.width, image.height, 0,
              gl.RGBA, gl.UNSIGNED_BYTE, null);

          // Create a framebuffer
          var fbo = gl.createFramebuffer();
          framebuffers.push(fbo);
          gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);

          // Attach a texture to it.
          gl.framebufferTexture2D(
              gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
          }      
    }    
    var p=Framebuffer.prototype;
    
    //Создает текстуру
    p.createAndSetupTexture=function () {
        var gl=this.gl;
        
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        // Set up texture so we can render any size image and so we are
        // working with pixels.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        return texture;
    }    
    
    
    atomic.Framebuffer=Framebuffer;
}();
