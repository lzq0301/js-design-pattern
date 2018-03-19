var currying = function(fn){
    var args = [];
    return function(){
        if(arguments.length === 0){         // when run time no arguments
            return fn.apply(this,args);     // run the real count function
        }else{
            [].push.apply(args,arguments);  // curryed 
            console.log(arguments)
            return arguments.callee;
        }
    }
};

var cost = (function(){
    var money = 0;

    return function(){
        for (var i = 0; i < arguments.length; i++) {
            money += arguments[i];
        }
        return money;
    }
})();
// curring count function :cost
var cost = currying(cost);    // cost = curryed cost
cost(100);                    // when there is argument,do nothing but save the number
cost(200);
cost(300,150)(400);
console.log(cost());          // when no arguments,do the cost function