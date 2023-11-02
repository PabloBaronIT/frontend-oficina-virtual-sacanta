"use strict";(self["webpackChunkoficina_vue"]=self["webpackChunkoficina_vue"]||[]).push([[679],{4671:function(e,a,s){s.d(a,{Z:function(){return N}});var l=s(3396),t=s(7139);const i=e=>((0,l.dD)("data-v-519a7535"),e=e(),(0,l.Cn)(),e),o={class:"container"},n={class:"interno"},r={class:"row"},d={class:"col"},m={class:"col"},u={class:"row"},c={class:"col"},p={class:"col"},h={class:"row"},g={class:"col"},v={class:"col"},b={class:"row"},_={class:"col-6"},C=i((()=>(0,l._)("option",{selected:""},"soy...",-1))),f=i((()=>(0,l._)("option",{value:"1"},"Persona Fisica",-1))),V=i((()=>(0,l._)("option",{value:"0"},"Persona Juridica",-1))),w=[C,f,V],y={class:"col-6"},q={class:"row"},I={class:"col"},P={class:"col"},U={key:0,class:"creado"};function D(e,a,s,i,C,f){const V=(0,l.up)("FormKit");return(0,l.wg)(),(0,l.iD)("div",o,[(0,l.Wm)(V,{type:"form",id:"registration-example",actions:!1,"incomplete-message":"Aun no has completado todos los campos."},{default:(0,l.w5)((()=>[(0,l._)("div",n,[(0,l._)("div",r,[(0,l._)("div",d,[(0,l.Wm)(V,{modelValue:this.firstname,"onUpdate:modelValue":a[0]||(a[0]=e=>this.firstname=e),type:"text",name:"name",label:"Nombre",placeholder:"Nombre",validation:"required|length:3,30|alpha:latin","validation-messages":{required:"Ingresa un nombre",length:"El nombre debe tener entre 3 y 30 letras",alpha:"No se admiten nùmeros ni sìmbolos"}},null,8,["modelValue"])]),(0,l._)("div",m,[(0,l.Wm)(V,{modelValue:this.lastname,"onUpdate:modelValue":a[1]||(a[1]=e=>this.lastname=e),type:"text",name:"lastname",label:"Apellido",placeholder:"Apellido",validation:"required|length:3,30|text|alpha:latin","validation-messages":{required:"Ingresa un apellido",length:"El apellido debe tener entre 3 y 30 letras",alpha:"No se admiten nùmeros ni sìmbolos"}},null,8,["modelValue"])])]),(0,l._)("div",u,[(0,l._)("div",c,[(0,l.Wm)(V,{modelValue:this.cuil,"onUpdate:modelValue":a[2]||(a[2]=e=>this.cuil=e),type:"number",name:"cuil",label:"CUIL",placeholder:"CUIL",validation:"required|number|length:11,11",help:"Ingresar solo numeros","validation-messages":{required:"Ingresa el CUIL sin simbolos ni espacios",number:"Ingresar solo nùmeros",length:"El CUIL debe tener 11 caracteres"}},null,8,["modelValue"])]),(0,l._)("div",p,[(0,l.Wm)(V,{modelValue:this.postCode,"onUpdate:modelValue":a[3]||(a[3]=e=>this.postCode=e),type:"number",name:"postCode",label:"Codigo Postal",placeholder:"Codigo Postal",validation:"required|number|length:4,4",help:"Ingresar solo numeros","validation-messages":{required:"Ingresa codigo postal sin simbolos ni espacios",number:"Ingresar solo nùmeros",length:"El Código Postal debe tener 4 caracteres"}},null,8,["modelValue"])])]),(0,l._)("div",h,[(0,l._)("div",g,[(0,l.Wm)(V,{modelValue:this.adress,"onUpdate:modelValue":a[4]||(a[4]=e=>this.adress=e),type:"text",name:"adress",label:"Direccion",placeholder:"Direccion",validation:"required|length:3,30","validation-messages":{required:"Ingresa una dirección",length:"Debe tener entre 3 a 30 caracteres"}},null,8,["modelValue"])]),(0,l._)("div",v,[(0,l.Wm)(V,{modelValue:this.city,"onUpdate:modelValue":a[5]||(a[5]=e=>this.city=e),type:"text",name:"city",label:"Ciudad",placeholder:"Ciudad",validation:"required|length:3,30","validation-messages":{required:"Ingresa una Ciudad",length:"Debe tener entre 3 a 30 caracteres"}},null,8,["modelValue"])])]),(0,l._)("div",b,[(0,l._)("div",_,[(0,l._)("select",{onChange:a[6]||(a[6]=e=>f.isPerson(e)),name:"",id:"",class:"form-select","aria-label":"Default select example"},w,32)]),(0,l._)("div",y,[(0,l.Wm)(V,{modelValue:this.email,"onUpdate:modelValue":a[7]||(a[7]=e=>this.email=e),type:"email",name:"email",label:"Tu email",placeholder:"ejemplo@ejemplo.com",validation:"required|email","validation-messages":{required:"Ingresa tu email",email:"Email invalido"}},null,8,["modelValue"])])]),(0,l._)("div",q,[(0,l._)("div",I,[(0,l.Wm)(V,{modelValue:this.password,"onUpdate:modelValue":a[8]||(a[8]=e=>this.password=e),type:"password",name:"password",label:"Contraseña",validation:"required|length:8,30","validation-messages":{length:"Debe ser mayor a 8 caracteres",required:"Ingresa una contraseña"},placeholder:"Your password"},null,8,["modelValue"])]),(0,l._)("div",P,[(0,l.Wm)(V,{modelValue:this.confirmPassword,"onUpdate:modelValue":a[9]||(a[9]=e=>this.confirmPassword=e),type:"password",name:"password_confirm",label:"Confirmar contraseña",placeholder:"Confirmar contraseña",validation:"required|confirm","validation-messages":{required:"Repite la contraseña",confirm:"Las contraseñas no coinciden"}},null,8,["modelValue"])])]),(0,l._)("div",null,[(0,l._)("input",{class:"btn btn-primary btn-lg botonSubmit",type:"button",value:"Registrar",onClick:a[10]||(a[10]=(...e)=>f.registrar&&f.registrar(...e))}),this.registrado?((0,l.wg)(),(0,l.iD)("div",U,(0,t.zw)(this.message),1)):(0,l.kq)("",!0)])])])),_:1})])}s(7658);var W=s(8713),k=s(5939),x=s(70),Z=s(9306),L={name:"RegisterComponent",data(){return{firstname:"",lastname:"",email:"",password:"",cuil:null,confirmPassword:"",adress:"",iSperson:null,city:"",postCode:"",registrado:!1,message:""}},methods:{isPerson(e){"0"===e.target.value?this.isPerson=!1:this.isPerson=!0},registrar(){let e={firstname:this.firstname,lastname:this.lastname,password:this.password,email:this.email,cuil:this.cuil,city:this.city,postCode:this.postCode,adress:this.adress,isPerson:this.isPerson};const a=x.ZP.create({baseURL:Z._n,withCredentials:!1,headers:{"auth-header":localStorage.getItem("token")}});a.post("/auth/signUp",e).then((e=>{console.log(e.data),this.registrado=!0,this.message=e.data.message,this.firstname="",this.lastname="",this.cuil="",this.postCode="",this.adress="",this.city="",this.iSperson="",this.email="",this.confirmPassword="",this.password="",setTimeout((()=>{this.$router.push("/munienlinea")}),2e3)})).catch((function(e){500===e.response.status&&("Token de usuario expirado"===e.response.data.message&&((0,W.Z)(),this.registrar()),"Token de representante expirado"===e.response.data.message&&((0,k.Z)(),this.registrar()))}))}}},R=s(89);const E=(0,R.Z)(L,[["render",D],["__scopeId","data-v-519a7535"]]);var N=E},9679:function(e,a,s){s.r(a),s.d(a,{default:function(){return u}});var l=s(3396);const t=e=>((0,l.dD)("data-v-c3674460"),e=e(),(0,l.Cn)(),e),i=t((()=>(0,l._)("h1",null,"Crear cuenta",-1)));function o(e,a,s,t,o,n){const r=(0,l.up)("RegisterComponentVue");return(0,l.wg)(),(0,l.iD)("div",null,[(0,l._)("section",null,[i,(0,l.Wm)(r)])])}var n=s(4671),r={name:"CuentaUsuario",components:{RegisterComponentVue:n.Z}},d=s(89);const m=(0,d.Z)(r,[["render",o],["__scopeId","data-v-c3674460"]]);var u=m}}]);
//# sourceMappingURL=679.bf307703.js.map