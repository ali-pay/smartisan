import{n as r}from"./index.7707aae4.js";const n=""+new URL("alipay.16881970.png",import.meta.url).href,o=""+new URL("wechat.e72e53b7.png",import.meta.url).href,c=""+new URL("huabei.84c57cf4.png",import.meta.url).href,_=""+new URL("huabei-quota.d2562d63.png",import.meta.url).href;var u=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"wrapper"},[t("sm-box",{staticClass:"payment",attrs:{title:"\u652F\u4ED8\u8BA2\u5355"}},[t("div",{staticClass:"payment-wrapper"},[t("div",{staticClass:"info"},[t("p",{staticClass:"title"},[a._v("\u63D0\u4EA4\u8BA2\u5355\u6210\u529F\uFF0C\u8BF7\u9009\u62E9\u652F\u4ED8\u65B9\u5F0F")]),t("p",{staticClass:"tip"},[a._v("\u8BF7\u5728 "),t("span",{staticClass:"red"},[a._v("2 \u5C0F\u65F6\u5185")]),a._v(" \u5B8C\u6210\u652F\u4ED8\uFF0C\u8D85\u65F6\u8BA2\u5355\u5C06\u81EA\u52A8\u53D6\u6D88\u3002")])]),t("t-tabs",{model:{value:a.tab,callback:function(s){a.tab=s},expression:"tab"}},[t("t-tab-panel",{attrs:{value:"\u7EBF\u4E0A\u652F\u4ED8",label:"\u7EBF\u4E0A\u652F\u4ED8"}},[t("ul",{staticClass:"platforms"},[t("li",{staticClass:"platform",class:{active:a.platform==="\u652F\u4ED8\u5B9D"},on:{click:function(s){a.platform="\u652F\u4ED8\u5B9D"}}},[t("img",{attrs:{src:n}})]),t("li",{staticClass:"platform",class:{active:a.platform==="\u5FAE\u4FE1\u652F\u4ED8"},on:{click:function(s){a.platform="\u5FAE\u4FE1\u652F\u4ED8"}}},[t("img",{attrs:{src:o}})])])]),t("t-tab-panel",{attrs:{value:"\u5206\u671F\u4ED8\u6B3E",label:"\u5206\u671F\u4ED8\u6B3E"}},[t("ul",{staticClass:"platforms"},[t("li",{staticClass:"platform active"},[t("img",{attrs:{src:c}})])]),t("div",{staticClass:"detail"},[t("sm-radio-group",{staticClass:"quotas",model:{value:a.quota,callback:function(s){a.quota=s},expression:"quota"}},a._l(a.quotas,function(s,i){return t("sm-radio",{key:i,staticClass:"quota",attrs:{title:s.title}},[a._v(" "+a._s(s.value)+" ")])}),1),t("i"),t("img",{attrs:{src:_}})],1)])],1)],1),t("div",{staticClass:"bar-wrapper"},[t("div",{staticClass:"prices"},[t("span",{staticClass:"tip"},[a._v("\u5408\u8BA1\uFF1A")]),t("span",{staticClass:"discount"},[t("i",[a._v("\xA5")]),a._v(a._s(a.totalPayment.toFixed(2)))])]),t("sm-button",{attrs:{color:"red",width:120,height:35,size:14},on:{click:a.submit}},[a._v("\u7ACB\u5373\u652F\u4ED8")])],1)])],1)},p=[];const m={name:"Payment",data(){return{tab:"\u7EBF\u4E0A\u652F\u4ED8",platform:"\u5FAE\u4FE1\u652F\u4ED8",quota:3}},computed:{totalPayment(){return this.$route.params.totalPayment||0},quotas(){return[{title:3,value:"3 \u671F\uFF0C\u6BCF\u671F\u91D1\u989D\u7EA6\u4E3A \xA543.99 \uFF0C\u6BCF\u671F\u82B1\u5457\u6536\u53D6\u624B\u7EED\u8D39\u7EA6\u4E3A \xA50.99 \uFF0C\u8D39\u7387 2.3%"},{title:6,value:"6 \u671F\uFF0C\u6BCF\u671F\u91D1\u989D\u7EA6\u4E3A \xA522.47 \uFF0C\u6BCF\u671F\u82B1\u5457\u6536\u53D6\u624B\u7EED\u8D39\u7EA6\u4E3A \xA50.97 \uFF0C\u8D39\u7387 4.5%"},{title:9,value:"12 \u671F\uFF0C\u6BCF\u671F\u91D1\u989D\u7EA6\u4E3A \xA511.56 \uFF0C\u6BCF\u671F\u82B1\u5457\u6536\u53D6\u624B\u7EED\u8D39\u7EA6\u4E3A \xA50.81 \uFF0C\u8D39\u7387 7.5%"}]}},methods:{submit(){console.log("submit")}}},l={};var v=r(m,u,p,!1,f,"0ab70e94",null,null);function f(a){for(let e in l)this[e]=l[e]}const b=function(){return v.exports}();export{b as default};
