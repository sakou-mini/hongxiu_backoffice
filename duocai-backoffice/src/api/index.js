

let apiConfig =[
    {name:"登录后台", url:"/v1/backofficeUser/login"},

    {name:"直播监控", url:"/v1/live/liveMonitor"},
    {name:"直播关闭", url:"/v1/live/closeLive"},

    {name:"主播列表", url:"/v1/liveUser/liveUserList"},
    {name:"修改状态", url:"/v1/liveUser/updateStatus"},
    {name:"主播详情", url:"/v1/liveUser/liveUserDetail"},
    {name:"修改密码", url:"/v1/liveUser/updatePassword"},

    {name:"直播记录", url:"/v1/live/liveRecord"},
    {name:"CDN列表", url:"/v1/cdn/cdnList"},
    {name:"CDN状态修改", url:"/v1/cdn/enableOrClose"},

    {name:"域名列表", url:"/v1/domainConfig/domainList"},
    {name:"添加域名", url:"/v1/domainConfig/addDomain"},
    {name:"修改域名", url:"/v1/domainConfig/updateDomain"},
    {name:"删除域名", url:"/v1/domainConfig/deleteDomain"},

    {name:"直播详情", url:"/v1/live/liveDetail"},

    {name:"查询登录信息", url:"/v1/backofficeUser/loginUserInfo"},
    {name:"查询后台列表", url:"/v1/backofficeUser/userList"},
    {name:"修改后台状态", url:"/v1/backofficeUser/enableOrClose"},
    {name:"添加后台用户", url:"/v1/backofficeUser/add"},
    {name:"修改后台用户", url:"/v1/backofficeUser/update"},
    {name:"查询后台登录", url:"/v1/backofficeUser/loginUserInfo"},


    {name:"组别列表", url:"/v1/role/findConditionList"},
    {name:"组别启用关闭", url:"/v1/role/enableOrClose"},
    {name:"组别对应菜单", url:"/v1/role/roleMenu"},
    {name:"组别修改", url:"/v1/role/roleUpdate"},
    {name:"组别添加", url:"/v1/role/addRole"},
    {name:"组别下拉选项", url:"/v1/role/roleItem"},

    {name:"记录列表", url:"/v1/backOfficeLog/logList"},



]


export default  {
    getUrl(name){
        for(let i = 0;i<apiConfig.length;i++){
            if(name === apiConfig[i].name){
                return apiConfig[i].url
            }
        }
        return "no config"
    },
    getApiObj(name){
        for(let i = 0;i<apiConfig.length;i++){
            if(name === apiConfig[i].name){
                return apiConfig[i]
            }
        }
        return "no config"
    }
}