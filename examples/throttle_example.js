// 函数节流的代码实现
var throttle = function(fn,interval){

    var _self = fn,                 // 保存需要被延迟执行的函数引用
        timer,                      // 定时器
        firstTime = true;           // 是否是第一次调用
    
    return function(){
        var args = arguments,
            _me = this;
        
        if(firstTime){
            _self.apply(_me,args);
            return firstTime = false;
        }

        if (timer) {
            return false;
        }

        timer = setTimeout(function() {
            clearTimeout(timer);
            timer = null;
            _self.apply(_me,args);
        }, interval || 500);
    };
};

window.onresize = throttle(function(){
    console.log(1);
},500);