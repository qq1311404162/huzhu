require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([1],[,,,,,,,,,,,,function(e,t,s){"use strict";var a=o(s(1)),r=o(s(13));function o(e){return e&&e.__esModule?e:{default:e}}Page((0,a.default)(r.default))},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(15),r=s.n(a),o=s(17),n=!1;var i=function(e){n||s(14)},l=s(0)(r.a,o.a,i,null,null);l.options.__file="Users/weiliang/Desktop/test/huzhu/client/huzhu/pages/register/index.vue",l.esModule&&Object.keys(l.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),l.options.functional&&console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions."),t.default=l.exports},function(e,t){},function(e,t,s){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a,r=s(16),o=(a=r)&&a.__esModule?a:{default:a};t.default={data:function(){return{mobile:"",username:"",password:"",realname:""}},methods:{register:function(){var t={mobile:this.mobile,username:this.username,password:this.password,realname:this.realname};e.request({url:o.default.server_url+"/api/register",data:t,success:function(e){console.log(e)},fail:function(e){console.log("err",JSON.stringify(e))}})}}}}).call(t,s(4).default)},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default={user_key:"USERS_KEY",version:"0.0.1",server_url:"http://localhost:8000"}},function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("view",{staticClass:"content"},[s("view",{staticClass:"input-group"},[s("view",{staticClass:"input-row border"},[s("text",{staticClass:"title"},[e._v("用户名：")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{type:"text",placeholder:"请输入用户名",eventid:"LRv-0"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}})]),s("view",{staticClass:"input-row border"},[s("text",{staticClass:"title"},[e._v("上级推荐人：")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{type:"text",placeholder:"请输入上级账号",eventid:"NGd-1"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}})]),s("view",{staticClass:"input-row border"},[s("text",{staticClass:"title"},[e._v("登录密码：")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"text",password:"true",placeholder:"请输入登录密码",eventid:"7C1-2"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),s("view",{staticClass:"input-row border"},[s("text",{staticClass:"title"},[e._v("确认密码：")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.repassword,expression:"repassword"}],attrs:{type:"text",password:"true",placeholder:"请输入确认密码",eventid:"61v-3"},domProps:{value:e.repassword},on:{input:function(t){t.target.composing||(e.repassword=t.target.value)}}})]),s("view",{staticClass:"input-row border"},[s("text",{staticClass:"title"},[e._v("真实姓名：")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.realname,expression:"realname"}],attrs:{type:"text",placeholder:"请输入真实姓名",eventid:"aT7-4"},domProps:{value:e.realname},on:{input:function(t){t.target.composing||(e.realname=t.target.value)}}})]),s("view",{staticClass:"input-row border"},[s("text",{staticClass:"title"},[e._v("手机号：")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.mobile,expression:"mobile"}],attrs:{type:"text",placeholder:"请输入手机号",eventid:"PXm-5"},domProps:{value:e.mobile},on:{input:function(t){t.target.composing||(e.mobile=t.target.value)}}})]),s("view",{staticClass:"input-row border"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.vcode,expression:"vcode"}],attrs:{type:"text",placeholder:"请输入验证码",eventid:"zmG-6"},domProps:{value:e.vcode},on:{input:function(t){t.target.composing||(e.vcode=t.target.value)}}}),s("text",{staticClass:"vcode"},[e._v("获取验证码")])])]),s("view",{staticClass:"btn-row"},[s("button",{staticClass:"primary",attrs:{type:"primary",eventid:"eIJ-7"},on:{tap:e.register}},[e._v("注册")])],1)])};a._withStripped=!0;var r={render:a,staticRenderFns:[]};t.a=r}],[12]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/register/index.js.map