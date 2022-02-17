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
    }
}