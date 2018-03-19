Function.prototype.before = function(beforeFn){
    var _self = this;
    console.log('before this',this);      // func function ,who invoked before function
    console.log('before _self',_self);
    return function(){
        beforeFn.apply(this,arguments);
        return _self.apply(this,arguments);
    }
}
Function.prototype.after = function(afterFn){
    var _self = this;
    console.log('after',this);      // func function ,who invoked before function
    console.log('after _self',_self);
    return function(){
        var ret = _self.apply(this,arguments)
        afterFn.apply(this,arguments);
        return ret;
    }
}



var func = function(){
    console.log('func',this)        // global
    console.log(2);
}

func = func.before(function(){
    console.log('beforefn',this)   // global
    console.log(1);
}).after(function(){
    console.log('afterfn',this)   // global
    console.log(3);
});
func();