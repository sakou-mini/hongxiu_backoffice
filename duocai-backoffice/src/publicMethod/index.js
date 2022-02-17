export default {
    getNDayDate (num) {
        var date1 = new Date();
        var time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate()
        var date2 = new Date(date1);
        date2.setDate(date1.getDate() + num);
        var m;
        var d;
        if (date2.getMonth() + 1 < 10) m = "0" + (date2.getMonth() + 1);
        else m = date2.getMonth() + 1;
        if (date2.getDate() < 10) d = "0" + date2.getDate();
        else d = date2.getDate();
        var time2 = date2.getFullYear() + "-" + m + "-" + d;
        return time2;
    },
    fmtDate (fmt, t) {
        var date = new Date(t);
        var ret;
        var opt = {
            "Y+": date.getFullYear().toString(),
            "m+": (date.getMonth() + 1).toString(),
            "d+": date.getDate().toString(),
            "H+": date.getHours().toString(),
            "M+": date.getMinutes().toString(),
            "S+": date.getSeconds().toString()
        };
        for (var k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            }
        }
        return fmt;
    },
    getTimeForDateAndTime(t){
        return this.fmtDate("YYYY-mm-dd HH:MM:SS",t)
    },
    getTimeForDate(t){
        return this.fmtDate("YYYY-mm-dd",t)
    },
    getTimeForTime(t){
        return this.fmtDate("HH:MM:SS",t)
    },
    formatSeconds (value) {
    if (value === 0 || value === undefined || value === "" || value === "0") {
        return "00:00:00"
    }
    var theTime = parseInt(value / 1000);// 需要转换的时间秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    var theTime3 = 0;// 天
    if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
        }
    }
    var result = '';
    theTime = theTime < 10 ? "0" + theTime : theTime + ""
    theTime1 = theTime1 < 10 ? "0" + theTime1 : theTime1 + ""
    theTime2 = theTime2 < 10 ? "0" + theTime2 : theTime2 + ""
    result = "" + theTime;
    result = "" + theTime1 + ":" + result;
    result = "" + theTime2 + ":" + result;
    return result;
},
    getDaysBetweenByToday(date){
    var  endDate = new Date().getTime()
    var days=(endDate - date)/(24*60*60*1000);
    return  Math.ceil(days);
},
    clearEmpty(obj) {
        if (!(typeof obj == 'object')) {
            return;
        }
        for(let key in obj) {
            if (obj.hasOwnProperty(key)
                && (obj[key] == null || obj[key] === undefined || obj[key] === '')) {
                delete obj[key];
            }
        }
        return obj;
    }
}