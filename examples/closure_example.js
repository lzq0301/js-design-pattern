var mult = (function(){
    var cache = {};
    var calculate = function(){
        var a = 1;
        for (var i = 0,l=arguments.length; i < l; i++) {
            a = a*arguments[i];
        }
        return a;
    }

    return function(){
        console.log(cache);
        var args = Array.prototype.join.call(arguments,',');
        if(args in cache){
            return cache[args];
        }
        return cache[args]=calculate.apply(null,arguments);
    }
})();