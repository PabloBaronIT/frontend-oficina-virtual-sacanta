"use strict";(self["webpackChunkoficina_vue"]=self["webpackChunkoficina_vue"]||[]).push([[836],{1751:function(e,a,s){s.r(a),s.d(a,{default:function(){return v}});var t=s(3396),i=s(7139),o=s.p+"img/logoSacanta.da1b4923.svg";const r=e=>((0,t.dD)("data-v-407b9fc0"),e=e(),(0,t.Cn)(),e),n={class:"container"},l={key:0,class:"spinner-border loading",role:"status"},d=r((()=>(0,t._)("span",{class:"sr-only"},null,-1))),c=[d],u={key:1,class:"container"},h=r((()=>(0,t._)("br",null,null,-1))),g=r((()=>(0,t._)("h2",null,"Gracias por utilizar la oficina virtual de Sacanta",-1))),m=r((()=>(0,t._)("img",{src:o,alt:"Sacanta",class:"imagenlogo"},null,-1)));function p(e,a,s,o,r,d){const p=(0,t.up)("router-link");return(0,t.wg)(),(0,t.iD)("div",n,[this.loading?((0,t.wg)(),(0,t.iD)("div",l,c)):((0,t.wg)(),(0,t.iD)("div",u,[(0,t._)("h1",null,[(0,t.Uk)((0,i.zw)(this.message)+" ",1),h]),g,m,(0,t.Wm)(p,{to:"/munienlinea",class:"bn3"},{default:(0,t.w5)((()=>[(0,t.Uk)(" Inicio ")])),_:1})]))])}var f=s(70),w=s(8713),I=s(5939),k=s(9306),P={name:"Pago-exitoso",created(){this.IdResultado=this.$route.query.IdResultado,this.IdReferenciaOperacion=this.$route.query.IdReferenciaOperacion,this.loading=!0,this.setPayment(),this.getMyProfile()},data(){return{IdResultado:"",IdReferenciaOperacion:"",message:"",loading:!1,user:"",cidiCookie:""}},methods:{setPayment(){console.log(this.IdResultado,this.IdReferenciaOperacion,"soy el idResutado y el IdReferencia");const e=f.ZP.create({baseURL:k._n,withCredentials:!1,headers:{"auth-header":localStorage.getItem("token"),"access-user-header":"^Yh19S&^8$yl01&Fagyg8eLxrI8uxypiCpdUdRscjF!xKSSqq"}});e.post("/confirm-payment/"+this.IdReferenciaOperacion).then((e=>{console.log(e.data),this.message=e.data.message,this.loading=!1})).catch((e=>{console.log(e),this.message=e.response.data.message,this.loading=!1,500===e.response.status&&("Token de usuario expirado"===e.response.data.message&&((0,w.Z)(),this.setPayment()),"Token de representante expirado"===e.response.data.message&&((0,I.Z)(),this.setPayment()))}))},dispatchLogin(){this.$store.dispatch("mockLoginAction",this.user)},dispatchCidi(){this.$store.dispatch("mockCidiAction",this.cidiCookie)},dispatchLoginTrue(){this.$store.dispatch("mockPaseAction")},getMyProfile(){const e=f.ZP.create({baseURL:k._n,withCredentials:!1,headers:{"auth-header":localStorage.getItem("token")}});e.get("/oficina/user/profile").then((e=>{console.log(e.data,"datos de usuariodb"),this.user=e.data.UserProfile.user,this.user.cidiCookie=this.cidiCookie,this.dispatchLogin(),this.dispatchLoginTrue(),window.localStorage.setItem("role",e.data.UserProfile.user.role||null),window.localStorage.setItem("name",e.data.UserProfile.user.firstname||null),window.localStorage.setItem("lastname",e.data.UserProfile.user.lastname||null),window.localStorage.setItem("cuil",e.data.UserProfile.user.cuil||null),window.localStorage.setItem("adress",e.data.UserProfile.user.adress||null),window.localStorage.setItem("email",e.data.UserProfile.user.email||null),window.localStorage.setItem("id",e.data.UserProfile.user.id||null),window.localStorage.setItem("fecha-creacion",e.data.UserProfile.user.created_at||null),window.localStorage.setItem("nivel",e.data.UserProfile.user.level.level||null)})).catch((e=>{console.log(e),500===e.response.status&&("Token de usuario expirado"===e.response.data.message&&((0,w.Z)(),this.getMyProfile()),"Token de representante expirado"===e.response.data.message&&((0,I.Z)(),this.getMyProfile()))}))}}},y=s(89);const S=(0,y.Z)(P,[["render",p],["__scopeId","data-v-407b9fc0"]]);var v=S}}]);
//# sourceMappingURL=836.fd4a2c0c.js.map