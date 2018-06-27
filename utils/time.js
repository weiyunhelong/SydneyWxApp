
//判断时间结束
const TimeIsEnd = (date,fen,miao) => {
  var min=date.split(':')[0];//分钟 
  min=parseInt(min);
  var sec = date.split(':')[1];//秒
  sec = parseInt(sec);

  if (min == fen && miao==sec){
    return true;
  }else{
    return false;
  }
}

//得到时间的秒数
const StringToTimeSec = date => {
  var sec = date.split(':')[1];//秒
  sec = parseInt(sec);
  return sec;
}

//有数字转为时间字符串
const TimeToString = (min,sec) => {
  if(sec<10){
    sec="0"+sec;
  }else if(sec==60){
    min = min+1;
  }else{
    sec =sec;
  }

  if(min<10){
    min = "0" + min;
  }
  return min+":"+sec;
}

module.exports = {
  TimeIsEnd: TimeIsEnd,//获取分钟
  TimeToString: TimeToString,//时间转换字符串
}
