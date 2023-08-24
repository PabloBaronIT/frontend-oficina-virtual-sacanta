"use strict";(self["webpackChunkoficina_vue"]=self["webpackChunkoficina_vue"]||[]).push([[21],{3021:function(e,t,s){s.r(t),s.d(t,{default:function(){return Be}});var i=s(3396);const a=e=>((0,i.dD)("data-v-183c2199"),e=e(),(0,i.Cn)(),e),n={key:0},o=a((()=>(0,i._)("div",{class:"top"},[(0,i._)("h1",null,"Mis trámites")],-1)));function r(e,t,s,a,r,l){const c=(0,i.up)("Tabla");return l.setPermission?((0,i.wg)(),(0,i.iD)("main",n,[o,(0,i.Wm)(c,{color:"var(--green)"})])):(0,i.kq)("",!0)}var l=s(7139),c=s(9242),d=s(5860),u=s(1661),p=s(6385),h=s(4535),m=s(8031);const g=e=>((0,i.dD)("data-v-16f15856"),e=e(),(0,i.Cn)(),e),w={class:"tabla-container"},k={style:{display:"flex","flex-direction":"row","justify-content":"space-around",background:"gray",color:"aliceblue",padding:"0.5rem"}},f=g((()=>(0,i._)("p",null,"Titulo",-1))),_=g((()=>(0,i._)("p",null,"Estado",-1))),y=g((()=>(0,i._)("p",null,"Más",-1))),v=g((()=>(0,i._)("p",null,"Historial",-1))),D={class:"encabezado"},b=["onClick"],q=["onClick"],T=["onClick"],z={key:0},R={key:1},C=["onClick"],P={key:2},F=["onClick"],x={class:"modalRespuesta"},S={key:0,class:"modal-content"},M={class:"modal-top"},Z={key:0},U={key:0,class:"response"},A=g((()=>(0,i._)("label",{for:"asunto"},"Respuesta",-1))),L={class:"file-container2"},I={key:0,class:"file-intro"},B={key:0,src:u,alt:"",id:"img-preview",class:"imgFile"},H=g((()=>(0,i._)("hr",null,null,-1))),E={class:"fileup"},j={key:1,class:"cargado"},N=g((()=>(0,i._)("img",{src:p,alt:"",id:"img-preview",class:"imgFile"},null,-1))),O=g((()=>(0,i._)("p",null,"Archivo cargado",-1))),V=[N,O],$={key:1,class:"enviado"},Y={key:0,class:"grafico-container"},K={class:"modal-top"},W={class:"data-container"},Q=g((()=>(0,i._)("br",null,null,-1))),G={key:0,class:"requerimiento"},J={key:1,class:"divDocumentos"},X=g((()=>(0,i._)("h5",null,"Documentación disponible para descargar",-1))),ee=["href"],te={key:1,class:"grafico-container pdf"},se={key:0,style:{width:"90%",margin:"auto"},id:"content1"},ie={class:"modal-top"},ae={style:{width:"100%"}},ne={key:1,id:"content2",style:{width:"90%",margin:"auto"}},oe={class:"modal-top"},re={style:{width:"100%"}},le={key:2,id:"content3",style:{width:"90%",margin:"auto"}},ce={class:"modal-top"},de={style:{width:"100%"}},ue={style:{width:"50%",display:"flex","flex-direction":"row","justify-content":"space-around"}},pe={class:"loader"},he={key:0,class:"spinner-grow text-secondary",role:"status"},me=g((()=>(0,i._)("span",{class:"sr-only"},null,-1))),ge=[me],we={key:1,class:"spinner-grow text-secondary",role:"status"},ke=g((()=>(0,i._)("span",{class:"sr-only"},null,-1))),fe=[ke],_e={key:2,class:"spinner-grow text-secondary",role:"status"},ye=g((()=>(0,i._)("span",{class:"sr-only"},null,-1))),ve=[ye],De={key:3,class:"sinTramites"},be={class:"filtro-filas"},qe={class:"nav"},Te={class:"pagNum"},ze={key:0,class:"cant"};function Re(e,t,s,a,n,o){const r=(0,i.up)("P");return(0,i.wg)(),(0,i.iD)("div",w,[(0,i._)("div",k,[f,(0,i.Wm)(r,null,{default:(0,i.w5)((()=>[(0,i.Uk)("ID")])),_:1}),(0,i.Wm)(r,null,{default:(0,i.w5)((()=>[(0,i.Uk)("asunto")])),_:1}),_,y,v]),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(this.activos,((e,t)=>((0,i.wg)(),(0,i.iD)("div",{key:t},[(0,i._)("div",D,[(0,i._)("p",null,(0,l.zw)(e.titulo),1),(0,i._)("p",null,(0,l.zw)(e.id),1),(0,i._)("p",null,(0,l.zw)(e.categoria),1),(0,i._)("p",null,(0,l.zw)(e.estado),1),(0,i._)("p",{style:{cursor:"pointer","text-decoration":"underline"},onClick:t=>o.verTramite(e.id)}," Ver Tramite ",8,b),(0,i._)("p",{onClick:t=>this.open(e.id),style:{cursor:"pointer","text-decoration":"underline"}}," ver ",8,q)]),(0,i._)("div",{class:(0,l.C_)(e.open?"open":"noOpen")},[(0,i._)("p",null,"Historial del tramite "+(0,l.zw)(e.id)+":",1),(0,i._)("p",null,[(0,i.Uk)(" Fecha de presentación: "+(0,l.zw)(new Date(this.presentacionTramite).toLocaleDateString())+" ",1),(0,i._)("i",{class:"bi bi-arrow-down-square",onClick:t=>o.createPDFsubmitt(e.id)},null,8,T)]),this.inicioTramite?((0,i.wg)(),(0,i.iD)("p",z," Fecha de Inicio: "+(0,l.zw)(new Date(this.inicioTramite).toLocaleDateString()),1)):(0,i.kq)("",!0),this.requerimientoTramite?((0,i.wg)(),(0,i.iD)("div",R,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(this.requerimientoTramite,(t=>((0,i.wg)(),(0,i.iD)("p",{key:t.id},[(0,i.Uk)(" Fecha de Requerimiento/s: "+(0,l.zw)(new Date(t.created_at).toLocaleDateString())+" - ",1),(0,i._)("i",{class:"bi bi-arrow-down-square",onClick:s=>o.createPDFrequirement(e.id,t.id)},null,8,C)])))),128))])):(0,i.kq)("",!0),this.finalizacionTramite?((0,i.wg)(),(0,i.iD)("p",P,[(0,i.Uk)(" Fecha de Finalización: "+(0,l.zw)(new Date(this.finalizacionTramite).toLocaleDateString())+" ",1),(0,i._)("i",{class:"bi bi-arrow-down-square",onClick:t=>o.createPDFfinalized(e.id)},null,8,F)])):(0,i.kq)("",!0)],2)])))),128)),(0,i._)("div",x,[!0===this.modalresponse?((0,i.wg)(),(0,i.iD)("div",S,[(0,i._)("div",M,[this.message?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)("h3",Z,"Enviar respuesta")),(0,i._)("p",null,"Nº Tramite: "+(0,l.zw)(this.idTramite),1),(0,i._)("img",{onClick:t[0]||(t[0]=e=>o.CloseModalRespuesta(e)),class:"svg",src:d,alt:""})]),e.message?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)("div",U,[A,(0,i.wy)((0,i._)("textarea",{"aria-multiline":"true",name:"asunto",id:"","onUpdate:modelValue":t[1]||(t[1]=e=>this.respuestaA=e)},null,512),[[c.nr,this.respuestaA]]),(0,i._)("div",L,[n.asd?((0,i.wg)(),(0,i.iD)("div",j,V)):((0,i.wg)(),(0,i.iD)("div",I,[this.messageResponse?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)("img",B)),H,(0,i._)("input",{accept:".jpg, .jpeg, .png, .webp",type:"file",id:"img-uploader",onChange:t[2]||(t[2]=e=>o.selectFile(e))},null,32),(0,i._)("div",E,[this.file?((0,i.wg)(),(0,i.iD)("input",{key:0,class:"m-2 btn btn-secondary",type:"button",value:"Subir archivo",onClick:t[3]||(t[3]=e=>o.postFile())})):(0,i.kq)("",!0)])]))]),this.respuestaA||this.respuestaB?((0,i.wg)(),(0,i.iD)("input",{key:0,class:"botonSubmit",type:"button",value:"Enviar",onClick:t[4]||(t[4]=(...e)=>o.sentRespuesta&&o.sentRespuesta(...e))})):(0,i.kq)("",!0)])),e.message?((0,i.wg)(),(0,i.iD)("p",$,(0,l.zw)(this.message),1)):(0,i.kq)("",!0)])):(0,i.kq)("",!0)]),n.modalVista?((0,i.wg)(),(0,i.iD)("div",Y,[(0,i._)("div",K,[(0,i._)("h3",null,(0,l.zw)(this.selectTramite.procedure.category.title),1),(0,i._)("img",{onClick:t[5]||(t[5]=e=>this.modalVista=!1),class:"svg",src:d,alt:""})]),(0,i._)("div",W,[(0,i._)("div",null,"Tramite n°:"+(0,l.zw)(this.selectTramite.procedure.id),1),(0,i._)("p",null,[(0,i.Uk)(" Nombre de trámite: "+(0,l.zw)(this.selectTramite.procedure.procedure.title)+" ",1),Q,(0,i.Uk)(" Estado:"+(0,l.zw)(this.selectTramite.procedure.status.status),1)]),this.selectTramite.procedure.requirementHistory.length>=1&&!0===this.selectTramite.procedure.requirementHistory[this.selectTramite.procedure.requirementHistory.length-1].active?((0,i.wg)(),(0,i.iD)("div",G,[(0,i._)("p",null,[(0,i.Uk)(" Requerimiento: "),(0,i._)("strong",null,(0,l.zw)(this.selectTramite.procedure.requirementHistory[this.selectTramite.procedure.requirementHistory.length-1].info_req),1)]),(0,i._)("input",{type:"button",value:"Responder",onClick:t[6]||(t[6]=e=>o.OpenModalRespuesta(this.selectTramite.procedure.requirementHistory[this.selectTramite.procedure.requirementHistory.length-1].id)),class:"botonSubmit"})])):(0,i.kq)("",!0),this.selectTramite.procedure.documents.length>=1?((0,i.wg)(),(0,i.iD)("div",J,[X,((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(this.selectTramite.procedure.documents,(e=>((0,i.wg)(),(0,i.iD)("div",{key:e.id,style:{display:"flex","flex-direction":"row"}},[(0,i._)("p",null,"*"+(0,l.zw)(e.title),1),(0,i._)("a",{target:"_blank",href:`${e.link}`},"Descargar ",8,ee)])))),128))])):(0,i.kq)("",!0)])])):(0,i.kq)("",!0),!0===n.modalPDF?((0,i.wg)(),(0,i.iD)("div",te,[n.pdfSubmitt?((0,i.wg)(),(0,i.iD)("div",se,[(0,i._)("div",ie,[(0,i._)("h3",null,"Constancia de trámite Nº: "+(0,l.zw)(this.pdfSubmitt.id),1)]),(0,i._)("h5",null,"Nombre: "+(0,l.zw)(this.pdfSubmitt.procedure.title),1),(0,i._)("p",null," Fecha de creación: "+(0,l.zw)(new Date(this.pdfSubmitt?.created_at).toLocaleDateString()),1),(0,i._)("p",ae,(0,l.zw)(this.pdfSubmitt.communication[0].message),1),(0,i._)("p",null,[(0,i.Uk)(" Usuario Municipal asignado: "),(0,i._)("strong",null,(0,l.zw)(this.pdfSubmitt.userMuni.firstname)+" "+(0,l.zw)(this.pdfSubmitt.userMuni.lastname),1)]),(0,i._)("p",null," Fecha de emisión: "+(0,l.zw)(new Date(this.pdfSubmitt?.actual_date).toLocaleDateString()),1)])):(0,i.kq)("",!0),n.pdfRequirement?((0,i.wg)(),(0,i.iD)("div",ne,[(0,i._)("div",oe,[(0,i._)("h3",null," Constancia de requerimiento Nº: "+(0,l.zw)(this.pdfRequirement.procedureHistory.id),1)]),(0,i._)("h5",null,"Nombre: "+(0,l.zw)(this.pdfRequirement.title),1),(0,i._)("p",null," Fecha de creación: "+(0,l.zw)(new Date(this.pdfRequirement?.created_at).toLocaleDateString()),1),(0,i._)("p",null," Fecha de cierre de requerimiento: "+(0,l.zw)(new Date(this.pdfRequirement?.finalized_at).toLocaleDateString()),1),(0,i._)("p",re,(0,l.zw)(this.pdfRequirement.info_req),1),(0,i._)("p",null," Fecha de emisión: "+(0,l.zw)(new Date(this.pdfRequirement?.actual_date).toLocaleDateString()),1)])):(0,i.kq)("",!0),this.pdfFinalized?((0,i.wg)(),(0,i.iD)("div",le,[(0,i._)("div",ce,[(0,i._)("h3",null," Constancia de finalización trámite Nº: "+(0,l.zw)(this.pdfFinalized.id),1)]),(0,i._)("h5",null,"Nombre: "+(0,l.zw)(this.pdfFinalized.procedure.title),1),(0,i._)("p",null," Fecha de finalización: "+(0,l.zw)(new Date(this.pdfFinalized?.resolution__date).toLocaleDateString()),1),(0,i._)("p",de,(0,l.zw)(this.pdfFinalized.communication[0].message),1),(0,i._)("p",null,[(0,i.Uk)(" Usuario Municipal asignado: "),(0,i._)("strong",null,(0,l.zw)(this.pdfFinalized.userMuni.firstname)+" "+(0,l.zw)(this.pdfFinalized.userMuni.lastname),1)]),(0,i._)("p",null," Fecha de emisión: "+(0,l.zw)(new Date(this.pdfFinalized?.actual_date).toLocaleDateString()),1)])):(0,i.kq)("",!0),(0,i._)("div",ue,[(0,i._)("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal",onClick:t[7]||(t[7]=e=>this.modalPDF=!1)}," Cerrar "),(0,i._)("button",{type:"button",onClick:t[8]||(t[8]=e=>o.download(this.content)),class:"btn btn-primary"}," Descargar ")])])):(0,i.kq)("",!0),(0,i._)("div",pe,[1==this.loading&&""===this.msj?((0,i.wg)(),(0,i.iD)("div",he,ge)):(0,i.kq)("",!0),1==this.loading&&""===this.msj?((0,i.wg)(),(0,i.iD)("div",we,fe)):(0,i.kq)("",!0),1==this.loading&&""===this.msj?((0,i.wg)(),(0,i.iD)("div",_e,ve)):(0,i.kq)("",!0),""!==this.msj?((0,i.wg)(),(0,i.iD)("h2",De,(0,l.zw)(this.msj),1)):(0,i.kq)("",!0)]),(0,i._)("div",be,[(0,i._)("div",qe,[this.pagina>1?((0,i.wg)(),(0,i.iD)("img",{key:0,class:"svg",onClick:t[9]||(t[9]=(...e)=>o.backTramites&&o.backTramites(...e)),src:h,alt:""})):(0,i.kq)("",!0),(0,i._)("div",Te,(0,l.zw)(this.pagina),1),this.l>5?((0,i.wg)(),(0,i.iD)("img",{key:1,onClick:t[10]||(t[10]=(...e)=>o.nextPag&&o.nextPag(...e)),class:"svg",src:m,alt:""})):(0,i.kq)("",!0)]),""==this.msj?((0,i.wg)(),(0,i.iD)("div",ze,[(0,i._)("p",null,[(0,i.Uk)(" Cantidad total de tramites: "),(0,i._)("b",null,(0,l.zw)(this.activos.length),1)])])):(0,i.kq)("",!0)])])}s(7658);var Ce=s(70),Pe=s(8713),Fe=s(5939),xe=s(9306),Se=s(8914),Me={props:{color:String},data(){return{loading:!1,msj:"",length:null,activos:[],cont:0,l:0,paginas:null,modalComunicaciones:!1,modalVista:!1,modalresponse:!1,selectTramite:null,selectRequerimiento:null,respuestaA:null,respuestaB:[],asd:!1,file:"",pagina:1,idTramite:null,comunicaciones:"",presentacionTramite:null,inicioTramite:null,requerimientoTramite:null,finalizacionTramite:null,pdfSubmitt:null,pdfRequirement:null,pdfFinalized:null,modalPDF:!1,content:""}},created(){this.getMyProcedure()},methods:{download(e){let t=document.getElementById("content"+e);var s=new Se.ZP("p","pt","A4");s.html(t,{y:2,x:2,callback:function(e){e.save("Constancia.pdf")}})},verTramite(e){this.idTramite=e;const t=Ce.ZP.create({baseURL:xe._n,withCredentials:!1,headers:{"auth-header":localStorage.getItem("token")}});t.get("/oficina/procedures/my-procedure/"+e).then((e=>{console.log(e.data),this.selectTramite=e.data.MyProcedure,this.modalVista=!0})).catch((t=>{500===t.response.status&&("Token de usuario expirado"===t.response.data.message&&((0,Pe.Z)(),this.verTramite(e)),"Token de representante expirado"===t.response.data.message&&((0,Fe.Z)(),this.verTramite(e)))}))},getMyProcedure(){this.activos=[];const e=Ce.ZP.create({baseURL:xe._n,withCredentials:!1,headers:{"auth-header":localStorage.getItem("token")}});e.get(`/oficina/procedures/history/my-procedures?page=${this.pagina}`).then((e=>{let t=e.data.MyProcedures;console.log(e+"mis tramites"),this.l=t.length;for(let s=0;s<t.length;s++){let e={id:null,fecha:null,categoria:"",estado:"",color:"",titulo:"",comunicaciones:null,open:!1},i=t[s].updated_at,a=new Date(i);const n=a.getDate(),o=a.getMonth()+1,r=a.getFullYear();switch(e.id=t[s].id,e.fecha=`${n}/${o}/${r}`,e.categoria=t[s].category.title,e.estado=t[s].status.status,e.titulo=t[s].procedure.title,e.comunicaciones=t[s].communicationCount,e.estado){case"PRESENTADO":e.color="var(--green)";break;case"EN PROCESO":e.color="var(--yellow)";break;case"PAUSADO POR REQUERIMIENTO":e.color="var(--red)",e.requerido=!0;break;case"FINALIZADO":e.color="var(--lblue)";break;default:break}this.activos.push(e)}this.length=e.data.MyProcedures.length,this.loading=!1})).catch((e=>{console.log(e),500===e.response.status&&("Token de usuario expirado"===e.response.data.message&&((0,Pe.Z)(),this.getMyProcedure()),"Token de representante expirado"===e.response.data.message&&((0,Fe.Z)(),this.getMyProcedure())),401===e.response.status&&this.$router.push("micuenta-update")}))},getComunicaciones(e){const t=Ce.ZP.create({baseURL:xe._n,withCredentials:!1,headers:{"auth-header":localStorage.getItem("token")}});t.get("/oficina/procedures/my-procedure/"+e).then((t=>{console.log(t.data),this.comunicaciones=t.data.MyProcedure.procedure.communication[t.data.MyProcedure.procedure.communication.length-1],this.openModalComunicaciones(e)})).catch((t=>{500===t.response.status&&("Token de usuario expirado"===t.response.data.message&&((0,Pe.Z)(),this.getComunicaciones(e)),"Token de representante expirado"===t.response.data.message&&((0,Fe.Z)(),this.getComunicaciones(e)))}))},openModalComunicaciones(e){this.selectTramite=e,this.modalComunicaciones=!this.modalComunicaciones},OpenModalRespuesta(e){this.selectRequerimiento=e,this.modalresponse=!this.modalresponse,console.log(this.selectRequerimiento)},CloseModalRespuesta(){this.modalresponse=!1,this.respuestaA="",this.respuestaB=""},selectFile(e){const t=document.getElementById("img-preview");this.file=e.target.files[0];const s=URL.createObjectURL(this.file);t.src=s,console.log(this.file,"soy el archivo")},postFile:async function(){let e="lylceews",t="https://api.cloudinary.com/v1_1/ddko88otf/image/upload";const s=new FormData;s.append("file",this.file),s.append("upload_preset",e),await fetch(t,{method:"POST",body:s}).then((e=>e.json())).then((e=>{this.respuestaB.push({file:e.secure_url}),console.log(e.secure_url,"secure_url"),console.log(e),this.fileSelect=null,this.asd=!0}))},sentRespuesta(){const e=Ce.ZP.create({baseURL:xe._n,withCredentials:!1,headers:{"auth-header":localStorage.getItem("token")}});this.respuestaA&&this.respuestaB.length>=1&&e.post("/requirements/answer-requirement/"+this.selectRequerimiento,{answer:this.respuestaA,documentRequirement:this.respuestaB}).then((e=>{200===e.status&&(this.message="Respuesta enviada!",this.activos=[],this.getMyProcedure(),this.modalComunicaciones=!1,this.respuestaA="",this.respuestaB="")})).catch((e=>{console.log(e.response),500===e.response.status&&("Token de usuario expirado"===e.response.data.message&&((0,Pe.Z)(),this.sentRespuesta()),"Token de representante expirado"===e.response.data.message&&((0,Fe.Z)(),this.sentRespuesta()))})),this.respuestaA&&0===this.respuestaB.length&&e.post("/requirements/answer-requirement/"+this.selectRequerimiento,{answer:this.respuestaA}).then((e=>{200===e.status&&(this.message="Respuesta enviada!",this.getMyProcedure(),this.modalComunicaciones=!1,this.respuestaA="",this.respuestaB="")})).catch((e=>{console.log(e),500===e.response.status&&("Token de usuario expirado"===e.response.data.message&&((0,Pe.Z)(),this.sentRespuesta()),"Token de representante expirado"===e.response.data.message&&((0,Fe.Z)(),this.sentRespuesta()))})),!this.respuestaA&&Array.isArray(this.respuestaB)?e.post("/requirements/answer-requirement/"+this.selectRequerimiento,{documentRequirement:this.respuestaB}).then((e=>{200===e.status&&(this.message="Respuesta enviada!",this.getMyProcedure(),this.modalComunicaciones=!1,this.respuestaA="",this.respuestaB="")})).catch((e=>{500===e.response.status&&("Token de usuario expirado"===e.response.data.message&&((0,Pe.Z)(),this.sentRespuesta()),"Token de representante expirado"===e.response.data.message&&((0,Fe.Z)(),this.sentRespuesta()))})):this.messageResponse=!0,console.log(this.respuestaA,this.respuestaB)},nextPag(){this.pagina++,this.getMyProcedure()},backTramites(){this.pagina--,this.getMyProcedure()},open(e){this.activos.forEach((t=>{t.id===e?t.open=!t.open:t.open=!1,!0===t.open&&this.getHistory(e)}))},getHistory(e){const t=Ce.ZP.create({baseURL:xe._n,withCredentials:!1,headers:{"auth-header":localStorage.getItem("token")}});t.get("/oficina/procedures/timeline/"+e).then((e=>{console.log(e.data),this.presentacionTramite=e.data.CreatedDate,this.inicioTramite=e.data.InProcessDate,this.requerimientoTramite=e.data.RequirementDates,this.finalizacionTramite=e.data.FinalizedDate}))},createPDFsubmitt(e){const t=Ce.ZP.create({baseURL:xe._n,withCredentials:!1,headers:{"auth-header":localStorage.getItem("token")}});t.get("/oficina/procedures/submitted-procedure-data/"+e).then((e=>{this.pdfSubmitt=e.data,this.pdfRequirement=null,this.pdfFinalized=null,this.content="1",this.modalPDF=!0,console.log(e.data)})).catch((t=>{console.log(t.response),500===t.response.status&&("Token de usuario expirado"===t.response.data.message&&((0,Pe.Z)(),this.createPDFsubmitt(e)),"Token de representante expirado"===t.response.data.message&&((0,Fe.Z)(),this.createPDFsubmitt(e)))}))},createPDFrequirement(e,t){console.log(e,t,"soy el tramite y el requer");const s=Ce.ZP.create({baseURL:xe._n,withCredentials:!1,headers:{"auth-header":localStorage.getItem("token")}});s.get("/oficina/procedures/requirement-procedure-data/"+e+"/"+t).then((e=>{console.log(e.data),this.pdfRequirement=e.data,this.pdfSubmitt=null,this.pdfFinalized=null,this.content="2",this.modalPDF=!0})).catch((s=>{console.log(s.response),500===s.response.status&&("Token de usuario expirado"===s.response.data.message&&((0,Pe.Z)(),this.createPDFrequirement(e,t)),"Token de representante expirado"===s.response.data.message&&((0,Fe.Z)(),this.createPDFrequirement(e,t)))}))},createPDFfinalized(e){const t=Ce.ZP.create({baseURL:xe._n,withCredentials:!1,headers:{"auth-header":localStorage.getItem("token")}});t.get("/oficina/procedures/finalized-procedure-data/"+e).then((e=>{console.log(e),this.pdfFinalized=e.data,this.pdfSubmitt=null,this.pdfRequirement=null,this.content="3",this.modalPDF=!0})).catch((t=>{console.log(t.response),500===t.response.status&&("Token de usuario expirado"===t.response.data.message&&((0,Pe.Z)(),this.createPDFfinalized(e)),"Token de representante expirado"===t.response.data.message&&((0,Fe.Z)(),this.createPDFfinalized(e)))}))}}},Ze=s(89);const Ue=(0,Ze.Z)(Me,[["render",Re],["__scopeId","data-v-16f15856"]]);var Ae=Ue,Le={name:"TramitesView",components:{Tabla:Ae},computed:{setPermission(){return!0===this.$store.state.loggedIn}}};const Ie=(0,Ze.Z)(Le,[["render",r],["__scopeId","data-v-183c2199"]]);var Be=Ie},5860:function(e,t,s){e.exports=s.p+"img/close.90ff7eac.svg"},8031:function(e,t,s){e.exports=s.p+"img/next.1e590530.svg"},4535:function(e,t,s){e.exports=s.p+"img/previous.f2eb8db4.svg"},6385:function(e,t,s){e.exports=s.p+"img/red-check-mark-icon.dd8d0a39.svg"},1661:function(e,t,s){e.exports=s.p+"img/tramite-logo.2e93d658.svg"}}]);
//# sourceMappingURL=21.b8d3da71.js.map