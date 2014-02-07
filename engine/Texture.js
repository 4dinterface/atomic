//текстура, webgl
var atomic=this.atomic||{};
+function(){
    function Texture(GL){
        //текстура
        var texture=GL.createTexture();
        GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, true);
        GL.bindTexture(GL.TEXTURE_2D, texture);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);

        GL.bindTexture(GL.TEXTURE_2D, null);	

        this.texture=texture;
    }
    var p=Texture.prototype;
    p.isTexture=true;
    
    atomic.Texture=Texture;
}();
