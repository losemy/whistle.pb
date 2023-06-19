var map={};

//设置map里面的值
function setMap(id,newsObj) {
  //如果key也是动态的，则如下处理
  let key=id;
  map[key]=newsObj;
}

function getMap(id) {
  return map[id]
}

//删除map里面的元素
function deleteMap(id){
  delete map[id];
}

exports.set = setMap
exports.get = getMap
exports.del = deleteMap
