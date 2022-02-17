<template>
  <div class="page">
    <!--    <blog-header-bar>-->
    <!--      <template v-slot:center></template>-->
    <!--    </blog-header-bar>-->
    <div class="page-body">
      <div class="login-info">

        <div class="right">
          <div class="login-title">登录到后台管理系统</div>

          <div class="form">
            <div>
              <div class="babel">登陆账号：</div>
              <input type="text" class="input" v-model="form.username" placeholder="请输入登录账号" />
            </div>
            <div>
              <div class="babel">登陆密码：</div>
              <input type="password" class="input" v-model="form.password" placeholder="请输入登陆密码" />
            </div>
            <div>
              <div class="babel">验证码：</div>
              <div>
                <input type="text" class="verificationInput" v-model="verificationCode" placeholder="请输入验证码" />
                <canvas id="canvas" ref="canvas" @click="refreshVerification"></canvas>
              </div>
            </div>
            <div>
              <el-button @click="onSubmit" class="submit">立即登录</el-button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>



<script>


export default {
  name: "login",
  data () {
    return {
      form: {
        username: "",
        password: ""
      },
      verificationCode:"",
      show_num:[]
    }
  },
  mounted() {
    this.draw(this.show_num);
    console.log(this.show_num);
  },
  components: {

  },
  methods: {
    refreshVerification(){
      this.draw(this.show_num);
    },
    onSubmit(){
      // console.log(this.$getUrl("登录"));
      let ver = ""
      for(let i=0;i<this.show_num.length;i++){
        ver += this.show_num[i]
      }
      if(this.verificationCode.toLowerCase() === ver.toLowerCase()){
      //  验证码验证成功
        this.$axios.post(this.$getUrl("登录"),this.form,{
          transformRequest:[
            function(data){
              let params = "";
              var arr = [];
              for(var key in data){
                arr.push(key+"="+data[key]);
              }
              params = arr.join("&");
              return params;
            }
          ] }).then((res)=>{
          console.log(res);
          switch (res.data.code){
            case "200":
              this.$message.success("登录成功")
              sessionStorage.setItem("JSESSIONID",res.data.data)
              this.$router.push("/index")
                  break
            case "501":
              this.$message.error(res.data.message)
          }
        })

      }else {
      //  验证码验证失败
        this.$message.error('验证码错误');
        this.refreshVerification()
      }
      // console.log(this.show_num);
      ;},

    draw(show_num){
      var canvas_width=this.$refs.canvas.offsetWidth
      var canvas_height=this.$refs.canvas.height
      var canvas = document.getElementById("canvas");//获取到canvas的对象
      var context = canvas.getContext("2d");//获取到canvas画图的环境
      canvas.width = canvas_width;
      canvas.height = canvas_height;
      var sCode = "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
      var aCode = sCode.split(",");  //把字符串分割成字符串数组。
      var aLength = aCode.length;//获取到数组的长度
      for (var i = 0; i < 4; i++) { //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
        var j = Math.floor(Math.random() * aLength);//获取到随机的索引值,random() 方法可返回介于 0（包含） ~ 1（不包含） 之间的一个随机数。
        var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
        // var deg = Math.random() ; //产生一个随机弧度
        var txt = aCode[j];//得到随机的一个内容
        show_num[i] = txt.toLowerCase();
        var x = 10 + i * 30;//文字在canvas上的x坐标
        var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
        context.font = "bold 40px 微软雅黑";
        context.translate(x, y);
        // context.rotate(deg);
        context.fillStyle = this.randomColor();
        context.fillText(txt, 0, 40);
        // context.rotate(-deg);
        context.translate(-x, -y);
      }
      for (var i = 0; i <= 5; i++) { //验证码上显示线条
        context.strokeStyle = this.randomColor();
        context.beginPath();
        context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.stroke();
      }
      for (var i = 0; i <= 30; i++) { //验证码上显示小点
        context.strokeStyle = this.randomColor();
        context.beginPath();
        var x = Math.random() * canvas_width;
        var y = Math.random() * canvas_height;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
      }
    },
    randomColor() {
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      return "rgb(" + r + "," + g + "," + b + ")";
    }
  }
}
</script>

<style scoped  lang="less">
.page-body {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(187, 233, 255);

  .login-info {
    display: flex;
    width: 40rem;
    height: 35rem;
    background-color: rgba(0, 0, 0, 0.2);
    .right {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .no-account {
        color: var(--degui-header-color);
        text-align: right;
        cursor: pointer;
        user-select: none;
      }
      .login-title {
        font-size: 2.5rem;
        padding: 1rem;
        user-select: none;
      }
      .other {
        width: 80%;
        height: 4rem;
        position: relative;
        text-align: center;
        user-select: none;
        .other-login {
          padding: 1rem 0;
          color: #aaa;
          &::before {
            content: "";
            position: absolute;
            border-top: 0.1rem dashed #aaa;
            width: 20%;
            left: 4rem;
            top: calc(50% - 0.3rem);
          }
          &::after {
            content: "";
            position: absolute;
            border-top: 0.1rem dashed #aaa;
            width: 20%;
            right: 4rem;
            top: calc(50% - 0.3rem);
          }
        }

        .login-icon {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

          .iconfont {
            font-size: 2.5rem;
            padding: 0 0.5rem;
            cursor: pointer;
          }

          .iconweixin1 {
            color: #55ac33;
          }

          .iconqq {
            color: rgb(48, 139, 212);
            text-align: center;
          }
        }
      }
    }
  }
}
.form {
  .babel {
    font-size: 1.2rem;
    user-select: none;
  }
  .input {
    width: 19rem;
    padding: 0 0.5rem;
    height: 3rem;
    line-height: 3rem;
    border-radius: 0.2rem;
    background: #fff;
    outline: none;
    border: 0;
    border-bottom: 1px solid #ccc;
    margin: 1rem 0;
  }
  .verificationInput{
    float: left;
    width: 9rem;
    padding: 0 0.5rem;
    height: 3rem;
    line-height: 3rem;
    border-radius: 0.2rem;
    background: #fff;
    outline: none;
    border: 0;
    border-bottom: 1px solid #ccc;
    margin: 1rem 1rem 1rem 0;
  }
  #canvas{
    float: left;
    width: 9rem;
    height: 3rem;
    margin: 1rem 0;
    background-color: #fff;
  }
  .submit {
    width: 20rem;
    padding: 1rem;
    margin: 1rem 0;
    background-color: var(--degui-header-color);
    color: #ffffff;
    &:hover {
      background-color: var(--degui-second-color);
    }
  }
}
</style>