(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{245:function(t,n,e){"use strict";var r={data:function(){return{}},props:{name:String,stub:String,type:String}},o=e(53),component=Object(o.a)(r,(function(){var t=this,n=t.$createElement;return(t._self._c||n)("nuxt-link",{attrs:{to:{name:"locations-type-stub",params:{stub:t.stub,type:t.type}}}},[t._v("\n  "+t._s(t.name)+" "+t._s(t._f("capitalize")(t._f("location")(t.type)))+"\n")])}),[],!1,null,null,null);n.a=component.exports},246:function(t,n,e){var r=e(26);t.exports=function(t,n){if(!r(t)||t._t!==n)throw TypeError("Incompatible receiver, "+n+" required!");return t}},247:function(t,n,e){"use strict";e(166);var r=e(245),o={data:function(){return{}},props:{stub:String,name:String,type:String,org_count:{type:Number,default:-1},activity_count:{type:Number,default:-1}},components:{LocationLink:r.a}},c=e(53),component=Object(c.a)(o,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"item"},[e("LocationLink",{attrs:{stub:t.stub,name:t.name,type:t.type}}),t._v(" "),t.org_count>-1?e("span",{staticClass:"info"},[t._v("\n    "+t._s(t._f("plural")(t.org_count,"organisation","organisations"))+"\n  ")]):t._e(),t._v(" "),t.activity_count>-1?e("span",{staticClass:"info"},[t._v("\n    "+t._s(t._f("plural")(t.activity_count,"activity","activities"))+"\n  ")]):t._e()],1)}),[],!1,null,null,null);n.a=component.exports},248:function(t,n,e){"use strict";e(166);var r={data:function(){return{}},props:{org:Object,activity_count:Number}},o=e(53),component=Object(o.a)(r,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"item"},[e("nuxt-link",{attrs:{title:t.org.info.stub,to:{name:"orgs-stub",params:{stub:t.org.info.stub}}}},[t._v(t._s(t.org.info.name))]),t._v(" "),e("span",{staticClass:"info"},[e("b",[t._v("Source:")]),t._v(" "+t._s(t._f("join")(t.org.sources)))]),t._v(" "),e("span",{staticClass:"info"},[t._v(t._s(t._f("plural")(t.activity_count,"activity","activities")))])],1)}),[],!1,null,null,null);n.a=component.exports},249:function(t,n,e){"use strict";var strong=e(250),r=e(246);t.exports=e(251)("Set",(function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}}),{add:function(t){return strong.def(r(this,"Set"),t=0===t?0:t,t)}},strong)},250:function(t,n,e){"use strict";var r=e(29).f,o=e(75),c=e(169),l=e(48),_=e(167),f=e(168),v=e(117),h=e(171),m=e(118),d=e(27),y=e(115).fastKey,O=e(246),j=d?"_s":"size",k=function(t,n){var e,r=y(n);if("F"!==r)return t._i[r];for(e=t._f;e;e=e.n)if(e.k==n)return e};t.exports={getConstructor:function(t,n,e,v){var h=t((function(t,r){_(t,h,n,"_i"),t._t=n,t._i=o(null),t._f=void 0,t._l=void 0,t[j]=0,null!=r&&f(r,e,t[v],t)}));return c(h.prototype,{clear:function(){for(var t=O(this,n),data=t._i,e=t._f;e;e=e.n)e.r=!0,e.p&&(e.p=e.p.n=void 0),delete data[e.i];t._f=t._l=void 0,t[j]=0},delete:function(t){var e=O(this,n),r=k(e,t);if(r){var o=r.n,c=r.p;delete e._i[r.i],r.r=!0,c&&(c.n=o),o&&(o.p=c),e._f==r&&(e._f=o),e._l==r&&(e._l=c),e[j]--}return!!r},forEach:function(t){O(this,n);for(var e,r=l(t,arguments.length>1?arguments[1]:void 0,3);e=e?e.n:this._f;)for(r(e.v,e.k,this);e&&e.r;)e=e.p},has:function(t){return!!k(O(this,n),t)}}),d&&r(h.prototype,"size",{get:function(){return O(this,n)[j]}}),h},def:function(t,n,e){var r,o,c=k(t,n);return c?c.v=e:(t._l=c={i:o=y(n,!0),k:n,v:e,p:r=t._l,n:void 0,r:!1},t._f||(t._f=c),r&&(r.n=c),t[j]++,"F"!==o&&(t._i[o]=c)),t},getEntry:k,setStrong:function(t,n,e){v(t,n,(function(t,e){this._t=O(t,n),this._k=e,this._l=void 0}),(function(){for(var t=this,n=t._k,e=t._l;e&&e.r;)e=e.p;return t._t&&(t._l=e=e?e.n:t._t._f)?h(0,"keys"==n?e.k:"values"==n?e.v:[e.k,e.v]):(t._t=void 0,h(1))}),e?"entries":"values",!e,!0),m(n)}}},251:function(t,n,e){"use strict";var r=e(19),o=e(14),c=e(30),l=e(169),meta=e(115),_=e(168),f=e(167),v=e(26),h=e(23),m=e(116),d=e(74),y=e(119);t.exports=function(t,n,e,O,j,k){var w=r[t],x=w,C=j?"set":"add",P=x&&x.prototype,S={},L=function(t){var n=P[t];c(P,t,"delete"==t||"has"==t?function(a){return!(k&&!v(a))&&n.call(this,0===a?0:a)}:"get"==t?function(a){return k&&!v(a)?void 0:n.call(this,0===a?0:a)}:"add"==t?function(a){return n.call(this,0===a?0:a),this}:function(a,b){return n.call(this,0===a?0:a,b),this})};if("function"==typeof x&&(k||P.forEach&&!h((function(){(new x).entries().next()})))){var $=new x,E=$[C](k?{}:-0,1)!=$,A=h((function(){$.has(1)})),N=m((function(t){new x(t)})),D=!k&&h((function(){for(var t=new x,n=5;n--;)t[C](n,n);return!t.has(-0)}));N||((x=n((function(n,e){f(n,x,t);var r=y(new w,n,x);return null!=e&&_(e,j,r[C],r),r}))).prototype=P,P.constructor=x),(A||D)&&(L("delete"),L("has"),j&&L("get")),(D||E)&&L(C),k&&P.clear&&delete P.clear}else x=O.getConstructor(n,t,j,C),l(x.prototype,e),meta.NEED=!0;return d(x,t),S[t]=x,o(o.G+o.W+o.F*(x!=w),S),k||O.setStrong(x,t,j),x}},252:function(t,n,e){"use strict";e(10),e(4),e(5);var r=e(11),o=e(0),c=(e(47),e(3),e(170),e(9),e(13),e(2),e(49),e(40),e(15),e(41),e(249),e(1),e(62));function l(object,t){var n=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),n.push.apply(n,e)}return n}var _={data:function(){return{busy:!0}},props:{activity:Object},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(n){Object(o.a)(t,n,source[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(source,n))}))}return t}({orgNames:function(){var t=this;return 0==Object.keys(this.orgs).length?"":this.unique(Object.entries(this.activity.orgs).reduce((function(summary,n){n[0];return n[1].map((function(n){n in t.orgs&&summary.push(t.orgs[n].info.name)})),summary}),[]))},locationNames:function(){var t=this;return 0==Object.keys(this.locations).length?"":this.unique(Object.entries(this.activity.locations).reduce((function(summary,n){var e=n[0];return n[1].map((function(n){if("countries"==e)return summary.push(n),summary;null!=t.locations[e][n]?summary.push(t.locations[e][n].info.name):summary.push(n)})),summary}),[]))}},Object(c.b)(["orgs","locations"])),methods:{unique:function(t){return Array.from(new Set(t.filter((function(t){return""!=t}))))}},mounted:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.$store.dispatch("loadOrgs");case 2:return n.next=4,t.$store.dispatch("loadLocations");case 4:t.busy=!1;case 5:case"end":return n.stop()}}),n)})))()}},f=e(53),v={data:function(){return{perPage:50,page:1}},components:{Activity:Object(f.a)(_,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return 0==this.busy?e("div",{staticClass:"item"},[e("nuxt-link",{attrs:{title:t.activity.title,to:{name:"activities-identifier",params:{identifier:t.activity.identifier}}}},[t._v("\n    "+t._s(t._f("truncate")(t.activity.title))+"\n  ")]),t._v(" "),e("span",{staticClass:"info"},[e("b",[t._v("Who:")]),t._v(" "+t._s(t._f("truncate")(t._f("join")(t.orgNames))))]),t._v(" "),e("span",{staticClass:"info"},[e("b",[t._v("Where:")]),t._v(" "+t._s(t._f("truncate")(t._f("join")(t.locationNames))))]),t._v(" "),e("span",{staticClass:"info"},[e("b",[t._v("Source:")]),t._v(" "+t._s(t.activity.source))])],1):t._e()}),[],!1,null,null,null).exports},props:{activities:Object,activitiesList:Array},computed:{totalRows:function(){return this.activitiesList.length},filteredActivities:function(){return this.activitiesList.slice((this.page-1)*this.perPage,this.perPage*this.page)}},watch:{perPage:function(){this.page=1}}},h=Object(f.a)(v,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[t.totalRows>t.perPage?e("b-row",{staticClass:"mb-2"},[e("b-col",{staticClass:"my-1",attrs:{md:"6"}},[e("b-form-group",{staticClass:"mb-0",attrs:{label:"Activities per page","label-for":"per-page","label-class":"mb-0","label-size":"sm"}},[e("b-form-select",{staticClass:"my-0",attrs:{id:"per-page",size:"sm",options:[50,100,200,500,1e3]},model:{value:t.perPage,callback:function(n){t.perPage=n},expression:"perPage"}})],1)],1),t._v(" "),e("b-col",{staticClass:"my-1",attrs:{md:"6"}},[e("b-form-group",{staticClass:"mb-0",attrs:{label:"Page","label-size":"sm","label-class":"mb-1"}},[e("b-pagination",{staticClass:"my-0",attrs:{"total-rows":t.totalRows,"per-page":t.perPage,align:"fill",size:"sm"},model:{value:t.page,callback:function(n){t.page=n},expression:"page"}})],1)],1)],1):t._e(),t._v(" "),e("hr"),t._v(" "),e("section",{attrs:{id:"content"}},[e("div",{staticClass:"inline-list wide"},t._l(t.filteredActivities,(function(n){return e("Activity",{key:n,attrs:{activity:t.activities[n]}})})),1)])],1)}),[],!1,null,null,null);n.a=h.exports},253:function(t,n,e){"use strict";e(166);var r={data:function(){return{}},props:{name:String,type:String,stub:String,org_count:{type:Number,default:-1},activity_count:{type:Number,default:-1}}},o=e(53),component=Object(o.a)(r,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"item"},[e("nuxt-link",{attrs:{to:{name:"sectors-type-stub",params:{type:t.type,stub:t.stub}}}},[t._v(t._s(t.name))]),t._v(" "),t.org_count>-1?[e("span",{staticClass:"info"},[t._v(t._s(t._f("plural")(t.org_count,"organisation","organisations")))])]:t._e(),t._v(" "),t.activity_count>-1?[e("span",{staticClass:"info"},[t._v(t._s(t._f("plural")(t.activity_count,"activity","activities")))])]:t._e()],2)}),[],!1,null,null,null);n.a=component.exports},407:function(t,n,e){"use strict";e.r(n);e(2),e(1),e(4),e(5);var r=e(11),o=e(0),c=(e(47),e(3),e(62)),l=e(248),_=e(253),f=e(245),v=e(247),h=e(252);function m(object,t){var n=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),n.push.apply(n,e)}return n}var d={data:function(){return{org:{sectors:[],partners:{local:{},regional:{},international:{},unknown:{}},locations:{admin1:[]},activities:[]},busy:!0}},components:{Org:l.a,Sector:_.a,LocationLink:f.a,Location:v.a,ActivitiesList:h.a},methods:{urlenc:function(t){return this.$options.filters.urlenc(t)}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(n){Object(o.a)(t,n,source[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(source,n))}))}return t}({sector_count:function(){return this.$options.filters.flatten(this.org.sectors).length},partner_count:function(){return this.$options.filters.flatten(this.org.partners).length},region_count:function(){return Object.keys(this.org.locations.admin1).length},activity_count:function(){return this.$options.filters.flatten(this.org.activities).length}},Object(c.b)(["orgs","activities","locations","sectors"])),mounted:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.$store.dispatch("loadOrgs");case 2:return t.org=t.orgs[t.$route.params.stub],t.$store.dispatch("loadLocations"),n.next=6,t.$store.dispatch("loadActivities");case 6:return n.next=8,t.$store.dispatch("loadSectors");case 8:t.busy=!1;case 9:case"end":return n.stop()}}),n)})))()}},y=e(53),component=Object(y.a)(d,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"container"},[t.busy?e("main",[e("div",{staticClass:"d-flex justify-content-center mb-3"},[e("b-spinner",{attrs:{variant:"secondary",label:"Loading..."}})],1)]):e("main",[e("section",{attrs:{id:"content"}},[e("h2",[t._v("\n      "+t._s(t.org.info.name)+"\n      "),t.org.info.name!=t.org.info.shortname?[t._v("\n      ("+t._s(t.org.info.shortname)+")\n      ")]:t._e()],2),t._v(" "),e("p",[t._v("\n      According to the "+t._s(t._f("join")(t.org.sources," and "))+" data,\n      "+t._s(t._f("scope")(t.org.info.scope))+" "),e("b",[t._v(t._s(t.org.info.name))]),t._v("\n      works\n      "),t.region_count>0?[t._v("\n      in "),e("nuxt-link",{attrs:{to:{name:"orgs-stub",params:{stub:t.org.info.stub},hash:"#locations"}}},[t._v(t._s(t._f("plural")(t.region_count,"region","regions")))]),t._v(" of Somalia,\n      ")]:t._e(),t._v(" "),t.sector_count>0?[t._v("\n      through "),e("nuxt-link",{attrs:{to:{name:"orgs-stub",params:{stub:t.org.info.stub},hash:"#sectors"}}},[t._v(t._s(t._f("plural")(t.sector_count,"sector","sectors")))]),t._v(",\n      ")]:t._e(),t._v(" "),t.partner_count>0?[t._v("\n      collaborating with "),e("nuxt-link",{attrs:{to:{name:"orgs-stub",params:{stub:t.org.info.stub},hash:"#partners"}}},[t._v(t._s(t._f("plural")(t.partner_count,"partner organisation","partner organisations")))]),t._v(",\n      ")]:t._e(),t._v("\n      on a total of "),e("nuxt-link",{attrs:{to:{name:"orgs-stub",params:{stub:t.org.info.stub},hash:"#activities"}}},[t._v(t._s(t._f("plural")(t.activity_count,"aid activity","aid activities")))]),t._v(" "),t.org.humanitarian?[t._v("\n      (including humanitarian activities).\n      ")]:[t._v("\n      (none flagged as humanitarian).\n      ")]],2),t._v(" "),t.org.info.synonyms.length>0?[e("p",[t._v("\n      Alternative names: "),e("i",[t._v(t._s(t._f("truncate")(t._f("join")(t.org.info.synonyms))))])])]:t._e(),t._v(" "),t.org.info.iati_id?[e("p",[t._v("\n      IATI organisation identifier: "),e("a",{attrs:{href:"https://d-portal.org/ctrack.html?reporting_ref="+t.urlenc(t.org.info.iati_id),target:"_blank"}},[t._v(t._s(t.org.info.iati_id))]),t._v(" (link opens in D-Portal).\n    ")])]:t._e(),t._v(" "),t.org.info.url?[e("p",[t._v("\n      You can learn more about "+t._s(t.org.info.shortname)+" at "),e("a",{attrs:{href:t.org.info.url,target:"_blank",rel:"nofollow"}},[t._v(t._s(t.org.info.url))])])]:t._e(),t._v(" "),e("hr"),t._v(" "),e("section",{attrs:{id:"partners"}},[e("h3",[t._v("Organisations who partner with "+t._s(t.org.info.shortname))]),t._v(" "),t.partner_count>0?t._l(["local","regional","international","unknown"],(function(n){return e("div",{key:n},[Object.keys(t.org.partners[n]).length>0?e("section",{attrs:{id:"partners."+n}},[e("h4",[t._v(t._s(t._f("capitalize")(t._f("scope")(n)))+"s")]),t._v(" "),e("div",{staticClass:"inline-list"},t._l(Object.keys(t.org.partners[n]).sort(),(function(r){return e("Org",{key:r,attrs:{org:t.orgs[r],activity_count:t.org.partners[n][r]}})})),1)]):t._e()])})):[e("p",{staticClass:"notice"},[t._v("(No partner organisations found for "+t._s(t.org.info.name)+".)")])],t._v(" "),e("hr")],2),t._v(" "),e("section",{attrs:{id:"sectors"}},[e("h3",[t._v("Sectors where "+t._s(t.org.info.shortname)+" works")]),t._v(" "),t.sector_count>0?t._l(Object.keys(t.org.sectors),(function(n){return Object.keys(t.org.sectors[n]).length>0?e("div",{key:n},[e("section",{attrs:{id:"sectors."+n}},[e("h4",[t._v(t._s(t._f("sector")(n))+"s")]),t._v(" "),e("div",{staticClass:"inline-list"},t._l(Object.keys(t.org.sectors[n]).sort(),(function(r){return e("Sector",{key:r,attrs:{stub:r,name:t.sectors[n][r].name,type:n,activity_count:t.org.sectors[n][r]}})})),1)])]):t._e()})):[e("p",{staticClass:"notice"},[t._v("(No sectors found for "+t._s(t.org.info.name)+".)")])],t._v(" "),e("hr")],2),t._v(" "),t.region_count>0?e("section",{attrs:{id:"locations"}},[e("h3",[t._v("Regions where "+t._s(t.org.info.shortname)+" works")]),t._v(" "),t._l(Object.keys(t.org.locations.admin1).sort(),(function(n){return e("div",{key:n},[e("h4",[e("LocationLink",{attrs:{stub:n,name:t.locations.admin1[n].info.name,type:"admin1"}}),t._v("\n          ("+t._s(t._f("plural")(t.org.locations.admin1[n],"activity","activities"))+")\n        ")],1),t._v(" "),e("div",{staticClass:"inline-list"},t._l(Object.keys(t.org.locations.admin2).sort(),(function(r){return t.locations.admin2[r].info.admin1==n?e("Location",{key:r,attrs:{name:t.locations.admin2[r].info.name,stub:r,type:"admin2",activity_count:t.org.locations.admin2[r]}}):t._e()})),1)])})),t._v(" "),e("hr")],2):t._e(),t._v(" "),e("section",{attrs:{id:"activities"}},[e("h3",[t._v("Activities involving "+t._s(t.org.info.shortname))]),t._v(" "),t._l(Object.keys(t.org.activities),(function(n){return t.org.activities[n].length>0?e("section",{key:n,attrs:{id:"activities."+n}},[e("h4",[t._v(t._s(t.org.info.shortname)+" as "+t._s(t._f("role")(n))+" ("+t._s(t.org.activities[n].length)+")")]),t._v(" "),e("ActivitiesList",{attrs:{activities:t.activities,activitiesList:t.org.activities[n]}})],1):t._e()}))],2)],2)])])}),[],!1,null,null,null);n.default=component.exports}}]);