Function.prototype.uncurrying = function(){
    var self = this;
    return function(){
        var obj = [].shift.call(arguments);
        return self.apply(obj,arguments);
    };
};

Function.prototype.uncurrying2 = function(){
    var self = this;
    return function(){
        return Function.prototype.call.apply(self,arguments);
    }
}

var push = Array.prototype.push.uncurrying();
var push2 = Array.prototype.push.uncurrying2();
var obj = {
    "length" : 1,
    "0":1
};

push(obj,2);
console.log(obj);
push2(obj,3);
console.log(obj);
