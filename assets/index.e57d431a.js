import{n}from"./index.fd5955cd.js";var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"wrapper"},[e("div",{staticClass:"list"},[e("div",{staticClass:"avatar"},[t.user.avatar?e("img",{attrs:{src:t.user.avatar}}):e("i")]),e("p",{staticClass:"nickname"},[t._v(t._s(t.user.nickname))]),e("ul",t._l(t.links,function(r){return e("router-link",{key:r.title,class:{active:t.route.includes(r.to)},attrs:{to:r.to,tag:"li"}},[t._v(" "+t._s(r.title)+" ")])}),1)]),e("router-view",{staticClass:"container"})],1)},l=[];const o={name:"User",computed:{links(){return[{title:"\u6211\u7684\u8BA2\u5355",to:"/mall/user/order"},{title:"\u552E\u540E\u670D\u52A1",to:"/mall/user/support"},{title:"\u6211\u7684\u4F18\u60E0",to:"/mall/user/coupon"},{title:"\u8D26\u6237\u8D44\u6599",to:"/mall/user/information"},{title:"\u6536\u8D27\u5730\u5740",to:"/mall/user/address"}]},route(){return this.$route.path},user(){return this.$store.state.user.info}}},a={};var u=n(o,i,l,!1,c,"0c16a9f5",null,null);function c(t){for(let s in a)this[s]=a[s]}const v=function(){return u.exports}();export{v as default};
