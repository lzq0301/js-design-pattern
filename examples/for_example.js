var Type = {};
for (var index = 0,type;type=['String','Array','Number'][index++];) {
    (function(type){
        Type['is' + type] =function(obj){
            return Object.prototype.toString.call(obj)==='[object '+type+']';
        }
    })(type)
    
}
Type.isArray([]);
Type.isString('str');