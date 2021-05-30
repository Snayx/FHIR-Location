!function(){function n(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function t(n,t){for(var e=0;e<t.length;e++){var o=t[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}(self.webpackChunkfhir_location=self.webpackChunkfhir_location||[]).push([[352],{7352:function(e,o,i){"use strict";i.r(o),i.d(o,{AboutModule:function(){return _},routes:function(){return C}});var a=i(1116),r=i(5366),c=i(345),s=i(9119),g=i(2797),u=i(7843);function l(n,t){1&n&&r._UZ(0,"app-background")}var p,b=function(){var e=function(){function e(t){n(this,e),this.responsiveService=t,this._subscriptions=[],this.fhirURL="http://www.hl7.org/fhir/location.html",this.githubURL="https://github.com/Csaki95/fhir-location-vaccination",this.interfaceCode="\n  export interface Location {\n    id?: string,\n    status?: Status,\n    operationalStatus?: OperationalStatus,\n    name: string,\n    description?: string,\n    type?: Type[],\n    telekom?: ContactPoint,\n    address: Address,\n    physicalType?: PhysicalType,\n    managingOrganization?: string,\n    partOf?: string\n  }\n  "}var o,i,a;return o=e,(i=[{key:"ngOnInit",value:function(){this.screenSizeCheck()}},{key:"ngOnDestroy",value:function(){var n;null===(n=this._subscriptions)||void 0===n||n.forEach(function(n){return n.unsubscribe()})}},{key:"reference",value:function(){window.open(this.fhirURL)}},{key:"git",value:function(){window.open(this.githubURL)}},{key:"screenSizeCheck",value:function(){var n=this;this._subscriptions.push(this.responsiveService.isMobile$.subscribe(function(t){n.isMobile=t}))}}])&&t(o.prototype,i),a&&t(o,a),e}();return e.\u0275fac=function(n){return new(n||e)(r.Y36(c.k))},e.\u0275cmp=r.Xpm({type:e,selectors:[["app-about"]],decls:12,vars:2,consts:[[4,"ngIf"],[1,"about-container","centering",3,"ngClass"],[1,"about"],[1,"top-spacing"]],template:function(n,t){1&n&&(r._UZ(0,"app-navbar"),r.YNc(1,l,1,0,"app-background",0),r.TgZ(2,"div",1),r.TgZ(3,"mat-card",2),r.TgZ(4,"mat-card-header"),r.TgZ(5,"mat-card-title"),r._uU(6,"FHIR Location"),r.qZA(),r.TgZ(7,"mat-card-subtitle"),r._uU(8,"Angular 11 application"),r.qZA(),r.qZA(),r.TgZ(9,"mat-card-content",3),r.TgZ(10,"p"),r._uU(11,"Reny\xe1k D\xe1vid Istv\xe1n"),r.qZA(),r.qZA(),r.qZA(),r.qZA()),2&n&&(r.xp6(1),r.Q6J("ngIf",t.isMobile),r.xp6(1),r.Q6J("ngClass",t.isMobile?"bottom":"top"))},directives:[s.S,a.O5,a.mk,g.a8,g.dk,g.n5,g.$j,g.dn,u.S],styles:["*[_ngcontent-%COMP%]{box-sizing:border-box}html[_ngcontent-%COMP%]{height:100vh}body[_ngcontent-%COMP%]{margin:0;background:#f7f7f7;font-family:Roboto,Helvetica Neue,sans-serif}[_ngcontent-%COMP%]::-webkit-scrollbar{width:5px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background:rgba(20,20,150,.8);border-radius:5px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background:#4691f3}.centering[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:-webkit-fill-available;height:-moz-available;height:stretch}.spacer[_ngcontent-%COMP%]{flex:1 1 auto}.full-width[_ngcontent-%COMP%]{width:100%}.top-spacing[_ngcontent-%COMP%]{margin-top:1rem}.vertical-spacing[_ngcontent-%COMP%]{margin-top:1rem;margin-bottom:1rem}.horizontal-spacing[_ngcontent-%COMP%]{margin-left:1rem;margin-right:1rem}.mat-flat-button[_ngcontent-%COMP%]{color:#1414c8;background-color:#f7f7f7;font-size:1rem;padding:.25rem}.angular-icon[_ngcontent-%COMP%]{font-size:1.5rem;color:red}.mat-button-focus-overlay[_ngcontent-%COMP%]{background-color:transparent!important}.about-container[_ngcontent-%COMP%]{margin:2rem}.about-container[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%]{padding:2rem;min-width:80%}.about-container[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%]{max-height:70vh;max-width:80%;margin-top:1rem;margin-bottom:1rem}.about-container[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%]   .footer[_ngcontent-%COMP%]{margin:1rem}.about-container[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%]   .footer[_ngcontent-%COMP%]   .about-button[_ngcontent-%COMP%]{width:35vw}.top[_ngcontent-%COMP%]{padding-top:4rem;padding-bottom:1rem}.bottom[_ngcontent-%COMP%]{padding-top:1rem;padding-bottom:5rem}"]}),e}(),f=i(7765),h=i(1097),m=i(1937),d=i(766),C=[{path:"",component:b}],_=((p=function t(){n(this,t)}).\u0275fac=function(n){return new(n||p)},p.\u0275mod=r.oAB({type:p}),p.\u0275inj=r.cJS({imports:[[a.ez,f.q,m.W,h.z,d.Bz.forChild(C)]]}),p)}}])}();