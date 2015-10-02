function prefixZero(i)
{
    var curTime;
    curTime = "";

    if(i < 10)
        curTime += "00:0"+i.toString();                           
    else if (i < 60)
        curTime += "00:"+i.toString();          
    else if (60 <= i < 600){
        tmp = i%60;
        if (tmp < 10)
            curTime += "0"+Math.floor(i/60)+":0"+tmp;
        else 
            curTime += "0"+Math.floor(i/60)+":"+tmp;
    }
    else if (i >= 600){
        tmp = i%60;
        if (tmp < 10)
            curTime += Math.floor(i/60)+":0"+tmp;
        else 
            curTime += Math.floor(i/60)+":"+tmp;
    }
    
    return curTime;
}