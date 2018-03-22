/* 
问题描述
　　n个人参加某项特殊考试。
　　为了公平，要求任何两个认识的人不能分在同一个考场。
　　求是少需要分几个考场才能满足条件。
输入格式
　　第一行，一个整数n(1<n<100)，表示参加考试的人数。
　　第二行，一个整数m，表示接下来有m行数据
　　以下m行每行的格式为：两个整数a，b，用空格分开 (1<=a,b<=n) 表示第a个人与第b个人认识。
输出格式
　　一行一个整数，表示最少分几个考场。
样例输入
5
8
1 2
1 3
1 4
2 3
2 4
2 5
3 4
4 5
样例输出
4
样例输入
5
10
1 2
1 3
1 4
1 5
2 3
2 4
2 5
3 4
3 5
4 5
样例输出
5 

Author ：Alex Lee
简单说明：
    class 考场:人的组合 class = [1,2,3,4,5]
    group 考场的组合 group = [class,class]
    分组情况 是group的组合 array = [group,group];

    所有人在一个考场为初始
    每个人判断是否能在此考场内，能就保留方案，不能就增加考场保留方案
    全部人员进行之后的方案取考场最小值为样例输出

*/
var minClass = function(n,m,arr){
    var mini = n,
        resultArray = [] ,                                  // 分组情况 [[[class0],[class1],[class2]],[[class0],[class1]]]   group的数组
        nArray = Array(n).fill(0).map((v,i)=>++i),          // n个数字的数组
        _self = this;
    // 初始分组length=1
    resultArray.push([deepCopy.call(null,nArray)]);
    // 初始分组length=1
    for(var k = 0;k < nArray.length;k++){                       // 依次提取n个数字进行比较
        var currentNum = nArray[k];                         // 当前数字
        var tempArray = [];
        for(var p = 0;p < resultArray.length;p++){          // 当前结果数组集合遍历
            let currentGroup = resultArray[p];
            let grouped = reGroup(currentNum,currentGroup); // 返回group的数组
            tempArray = tempArray.concat(grouped);
        }
        resultArray = tempArray;
    }

    for (let index = 0; index < resultArray.length; index++) {
        mini = resultArray[index].length<mini?resultArray[index].length:mini;
    }
    console.log(resultArray);

    /*  num 当前数字
        group class组合中的一种情况
        return group组，class组合的多种情况 */
    function reGroup(num,group){
        var retGroups = [];
        var groupWithOutNum = deepCopy(group,num);           // 删除num之后可能会有[]出现，所以为了index正确，在for之前也要运行一次deepcopy
        var newClassFlag = true;                             // 需要新考场flag
        
        for (let index = 0; index < groupWithOutNum.length; index++) {
            let _group = deepCopy(groupWithOutNum,num);
            let currentClass = _group[index];                // 当前比较的考场
            // 能在一起
            if(canBeTogether(num,currentClass)){
                newClassFlag = false;
                currentClass.push(num);
                currentClass.sort();
                retGroups.push(_group);
                continue;
            }
        }
        // 没有考场能进时，加入新考场
        if(newClassFlag){
            groupWithOutNum.push([num]);
            retGroups.push(groupWithOutNum);
        }
        return retGroups;
    }
    
    // 数组深拷贝，delNum可以为null
    function deepCopy(sourceArr,delNum){
        var copyArr = [];
        if(typeof(sourceArr.length)=="undefined"){
            return sourceArr;
        }else{
            sourceArr.forEach(function(item,index){
                let ret = deepCopy(item,delNum)
                // 数字时非当前数字，数组时非空
                if(delNum == undefined                                              // 没有delNum直接深拷贝
                    || (typeof(ret.length)=="undefined" && ret!=delNum)             // 非数组且非删除数字进行拷贝
                    || (typeof(ret.length)!="undefined" && ret.length!=0)){         // 数组时且数组不空时进行拷贝
                    copyArr.push(ret);
                }
            });
            return copyArr;
        }
    }
    function hasPair(targetArr){
        for (let index = 0; index < arr.length; index++) {
            var item = arr[index];
            let ret = item.indexOf(targetArr[0])!=-1 && item.indexOf(targetArr[1])!=-1;
            if(ret){
                return true;
            }
        }
        return false;
    }
    function canBeTogether(num,_class){
        for (let index = 0; index < _class.length; index++) {
            var item = _class[index];
            if(hasPair([num,item])){
                //console.log([num,item] + ' are familiar with each other')
                return false;
            }
        }
        //console.log(num + " , ["+_class + '] can be in the same class!')
        return true;
    }

    return mini;
}


var test = minClass(5,8,[[1,2],[1,3],[1,4],[2,3],[2,4],[2,5],[3,4],[3,5]]);
console.log(test);      // 4
var test1 = minClass(5,10,[[1,2],[1,3],[1,4],[1,5],[2,3],[2,4],[2,5],[3,4],[3,5],[4,5]]);
console.log(test1);     // 5
