

let apiConfig =[
    {name:"登录", url:"/api/v1/backofficeUser/login"},

    //user
    {name:"用户列表", url:"/api/v1/user/getUserList"},
    {name:"用户详情", url:"/api/v1/user/getUserInfo"},
    {name:"修改用户状态", url:"/api/v1/user/updateStatus"},
    {name:"重置用户", url:"/api/v1/user/resetUser"},
    //tourist
    {name:"游客列表", url:"/api/v1/tourist/touristList"},
    {name:"游客报表", url: "/api/v1/tourist/touristStatisticsList"},
    //music
    {name:"审核音乐", url:"/api/v1/music/auditMusic"},
    {name:"音乐列表", url:"/api/v1/music/musicList"},
    {name:"添加音乐", url:"/api/v1/music/addMusic"},
    //label
    {name:"标签列表", url:"/api/v1/label/findLabelList"},
    {name:"添加标签", url:"/api/v1/label/addLabel"},
    {name:"删除标签", url:"/api/v1/label/delLabelList"},
    {name:"修改标签", url:"/api/v1/label/update"},
    //blogs
    {name:"动态列表", url:"/api/v1/blogs/blogsList"},
    {name:"动态审核", url:"/api/v1/blogs/approvalBlogs"},
    {name:"动态描述", url:"/api/v1/blogs/editBlogs"},
    {name:"动态详情", url:"/api/v1/blogs/blogsDetail"},
    {name:"评论列表", url:"/api/v1/blogs/commentList"},
    {name:"评论审核", url:"/api/v1/blogs/approvalComment"},
    //upload
    {name:"上传文件", url:"/api/v1/upload"},
    //banner
    {name:"新增横幅", url:"/api/v1/banner/insert"},
    {name:"删除横幅", url:"/api/v1/banner/delete"},
    {name:"查询横幅", url:"/api/v1/banner/findList"},
    {name:"更新横幅", url:"/api/v1/banner/update"},
    {name:"状态横幅", url:"/api/v1/banner/updateStatus"},
    //recommend
    {name:"视频推荐列表", url:"/api/v1/recommend/findVideoList"},
    {name:"视频推荐新增", url:"/api/v1/recommend/addVideo"},
    {name:"视频推荐删除", url:"/api/v1/recommend/deletedVideo"},
    {name:"用户推荐删除", url:"/api/v1/recommend/deletedUser"},
    {name:"用户推荐列表", url:"/api/v1/recommend/findUserList"},
    {name:"用户推荐新增", url:"/api/v1/recommend/addUser"},
    //report
    {name:"视频举报列表", url:"/api/v1/report/findVideoList"},
    {name:"用户举报列表", url:"/api/v1/report/findUserList"},
    {name:"评论举报列表", url:"/api/v1/report/findCommentList"},
    {name:"评论举报状态", url:"/api/v1/report/updateCommentHandel"},
    {name:"用户举报状态", url:"/api/v1/report/updateUserHandel"},
    {name:"视频举报状态", url:"/api/v1/report/updateVideoHandel"},
    //keyword
    {name:"敏感词状态", url:"/api/v1/keyword/updateStatus"},
    {name:"敏感词列表", url:"/api/v1/keyword/findList"},
    {name:"敏感词删除", url:"/api/v1/keyword/delete"},
    {name:"敏感词添加", url:"/api/v1/keyword/insert"},
    //feedback
    {name:"反馈查看", url:"/api/v1/feedback/check"},
    {name:"反馈删除", url:"/api/v1/feedback/delete"},
    {name:"反馈列表", url:"/api/v1/feedback/findList"},
    {name:"反馈回复", url:"/api/v1/feedback/reply"},

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