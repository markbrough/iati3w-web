(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{254:function(t,n,o){"use strict";o(167);var e={data:function(){return{}},props:{name:String,type:String,stub:String,org_count:{type:Number,default:-1},activity_count:{type:Number,default:-1}}},r=o(54),component=Object(r.a)(e,(function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",{staticClass:"item"},[o("nuxt-link",{attrs:{to:{name:"sectors-type-stub",params:{type:t.type,stub:t.stub}}}},[t._v(t._s(t.name))]),t._v(" "),t.org_count>-1?[o("span",{staticClass:"info"},[t._v(t._s(t._f("plural")(t.org_count,"organisation","organisations")))])]:t._e(),t._v(" "),t.activity_count>-1?[o("span",{staticClass:"info"},[t._v(t._s(t._f("plural")(t.activity_count,"activity","activities")))])]:t._e()],2)}),[],!1,null,null,null);n.a=component.exports},419:function(t,n,o){"use strict";o.r(n);o(2),o(1),o(4),o(5);var e=o(11),r=o(0),c=(o(47),o(17),o(3),o(13),o(395)),l=o.n(c),_=o(48),v=o(253),f=o(254),y=o(246),m=o(252),h=o(396);function d(object,t){var n=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),n.push.apply(n,o)}return n}var O={data:function(){return{busy:!0,location:{}}},components:{Org:v.a,Sector:f.a,LocationLink:y.a,Location:m.a,ActivitiesList:h.a},methods:{flatten:function(t){return this.$options.filters.flatten(t)},handleScroll:function(){var t=this.$route.hash.split("#")[1];this.$route.hash&&setTimeout((function(){var n=document.getElementById(t);l.a.scrollTo(n,500)}),300)}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(n){Object(r.a)(t,n,source[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(source,n))}))}return t}({sector_count:function(){return this.$options.filters.flatten(this.org.sectors).length},partner_count:function(){return this.$options.filters.flatten(this.org.partners).length},region_count:function(){return Object.keys(this.org.locations.admin1).length},activity_count:function(){return this.$options.filters.flatten(this.org.activities).length},location_name:function(){if(Object.keys(this.locations).length>0)return this.locations[this.$route.params.type][this.$route.params.stub].info.name},location_type:function(){return this.$route.params.type},stub:function(){return this.$route.params.stub}},Object(_.b)(["orgs","activities","locations","sectors","source"])),mounted:function(){var t=this;return Object(e.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.$store.dispatch("loadOrgs");case 2:return n.next=4,t.$store.dispatch("loadLocations");case 4:return n.next=6,t.$store.dispatch("loadActivities");case 6:return n.next=8,t.$store.dispatch("loadSectors");case 8:t.location=t.locations[t.$route.params.type][t.$route.params.stub],t.busy=!1,t.handleScroll();case 11:case"end":return n.stop()}}),n)})))()}},k=o(54),component=Object(k.a)(O,(function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",{staticClass:"container"},[t.busy?o("main",[o("div",{staticClass:"d-flex justify-content-center mb-3"},[o("b-spinner",{attrs:{variant:"secondary",label:"Loading..."}})],1)]):o("main",[o("section",{attrs:{id:"content"}},[o("nav",{staticClass:"secondary"},["admin1"==t.location_type?[o("nuxt-link",{attrs:{to:{name:"locations-type-stub",params:{stub:t.location.info.stub,type:t.location_type},hash:"#districts"}}},[t._v("Districts")])]:t._e(),t._v(" "),o("nuxt-link",{attrs:{to:{name:"locations-type-stub",params:{stub:t.location.info.stub,type:t.location_type},hash:"#orgs"}}},[t._v("Organisations")]),t._v(" "),o("nuxt-link",{attrs:{to:{name:"locations-type-stub",params:{stub:t.location.info.stub,type:t.location_type},hash:"#sectors"}}},[t._v("Sectors")]),t._v(" "),o("nuxt-link",{attrs:{to:{name:"locations-type-stub",params:{stub:t.location.info.stub,type:t.location_type},hash:"#activities"}}},[t._v("Activities")])],2),t._v(" "),o("h2",[t._v(t._s(t.location_name)+" "+t._s(t._f("capitalize")(t._f("location")(t.location_type))))]),t._v(" "),t._l(["admin1","admin2"],(function(n){return t.location.info[n]?o("div",{key:n},[o("p",[o("b",[t._v(t._s(t._f("location")(n))+": ")]),t._v(" "),o("nuxt-link",{attrs:{to:{name:"locations-type-stub",params:{stub:t.location.info[n],type:n}}}},[t._v("\n            "+t._s(t.locations[n][t.location.info[n]].info.name)+"\n          ")])],1)]):t._e()})),t._v(" "),"admin1"==t.location_type?o("section",{attrs:{id:"districts"}},[o("h3",[t._v("Districts of "+t._s(t.location_name))]),t._v(" "),o("div",{staticClass:"inline-list"},t._l(Object.keys(t.locations.admin2).sort(),(function(n){return t.locations.admin2[n].info.admin1==t.stub?o("Location",{key:n,attrs:{stub:n,name:t.locations.admin2[n].info.name,type:"admin2",org_count:t.flatten(t.locations.admin2[n].orgs).length,activity_count:t.locations.admin2[n].activities.length}}):t._e()})),1)]):t._e(),t._v(" "),o("section",{attrs:{id:"orgs"}},[o("h3",[t._v("Organisations working in "+t._s(t.location_name))]),t._v(" "),t._l(["local","regional","international","unknown"],(function(n){return Object.keys(t.location.orgs[t.source][n]).length>0?o("section",{attrs:{id:"orgs."+n}},[o("h4",[t._v(t._s(t._f("capitalize")(t._f("scope")(n)))+"s")]),t._v(" "),o("b-card-group",{attrs:{columns:""}},t._l(Object.keys(t.location.orgs[t.source][n]).sort(),(function(e){return o("Org",{key:e,attrs:{org:t.orgs[e],activity_count:t.location.orgs[t.source][n][e]}})})),1)],1):t._e()}))],2),t._v(" "),o("section",{attrs:{id:"sectors"}},[o("h3",[t._v("Sectors active in "+t._s(t.location_name))]),t._v(" "),t._l(Object.keys(t.location.sectors[t.source]),(function(n){return o("div",{key:n},[Object.keys(t.location.sectors[t.source][n]).length>0?o("section",{attrs:{id:"sectors."+n}},[o("h4",[t._v(t._s(t._f("sector")(n))+"s")]),t._v(" "),o("div",{staticClass:"inline-list"},t._l(Object.keys(t.location.sectors[t.source][n]).sort(),(function(e){return o("Sector",{key:e,attrs:{stub:e,name:t.sectors[n][e].name,type:n,activity_count:t.location.sectors[t.source][n][e]}})})),1)]):t._e()])}))],2),t._v(" "),o("section",{attrs:{id:"activities"}},[o("h3",[t._v("Aid activities in "+t._s(t.location_name))]),t._v(" "),o("ActivitiesList",{attrs:{activities:t.activities,activitiesList:t.location.activities}})],1)],2)])])}),[],!1,null,null,null);n.default=component.exports}}]);