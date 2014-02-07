var atomic=window.atomic||{};
+function(){    
    var Stage=function(){     
        this.childrens=[];      
    }    
    var p=Stage.prototype={};
    p.addChildren=function(child){
        this.childrens.push(child);
    }    
    
    atomic.Stage=Stage;
}();
