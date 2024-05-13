(function(g,h,l){g.SPR||(g.SPR={provide:function(a,b){c[a]||(c[a]=b,"function"===typeof c[a].init&&c[a].init())}});var c=g.SPR;c.provide("Common",{random:function(){return Math.floor(8675309*Math.random())},isArray:function(a){return Array.isArray?Array.isArray(a):"[object Array]"===Object.prototype.toString.call(a)},isString:function(a){return"[object String]"===Object.prototype.toString.call(a)},hasOwnProperty:function(a,b){return Object.prototype.hasOwnProperty.call(a,b)}});c.provide("DOM",{init:function(){function a(){c.DOM.flush();
g.removeEventListener("DOMContentLoaded",a,!1)}function b(){/loaded|interactive|complete/.test(h.readyState)&&(h.detachEvent("onreadystatechange",b),d&&(d=!1,c.DOM.flush()))}c.DOM.on=c.DOM.attachEvent;c.DOM.off=c.DOM.detachEvent;var d=!0;g.addEventListener&&g.addEventListener("DOMContentLoaded",a);h.attachEvent&&h.attachEvent("onreadystatechange",b)},addScript:function(a){var b=h.createElement("script");b.type="text/javascript";b.setAttribute("async",!0);b.setAttribute("name","spr");b.src=a;c.DOM.onReady(function(){setTimeout(function(){c.DOM.$("HEAD")[0].appendChild(b)},
1)});return b},queue:[],ready:/loaded|interactive|complete/.test(h.readyState),flush:function(){var a=c.DOM.queue.shift();for(c.DOM.ready=!0;a;)a(),a=c.DOM.queue.shift()},onReady:function(a){c.DOM.ready?(c.DOM.queue.push(a),c.DOM.flush()):h.documentElement.doScroll?g.self===g.top?function(){if(!h.uniqueID&&h.expando)return c.DOM.queue.push(a);try{h.documentElement.doScroll("left"),a()}catch(b){setTimeout(arguments.callee,0)}}():c.DOM.queue.push(a):c.DOM.queue.push(a)},attachEvent:function(a,b,d){a.addEventListener?
a.addEventListener(b,d,!1):a.attachEvent("on"+b,d);return a},detachEvent:function(a,b,d){a.addEventListener?a.removeEventListener(b,d,!1):a.detachEvent("on"+b,d);return a},top:function(a){return a?a.y?a.y:a.offsetTop+c.DOM.top(a.offsetParent):0},left:function(a){return a?a.x?a.x:a.offsetLeft+c.DOM.left(a.offsetParent):0},height:function(a){return Math.max(a.scrollHeight||0,a.offsetHeight||0,a.clientHeight||0)},width:function(a){return Math.max(a.scrollWidth||0,a.offsetWidth||0,a.clientWidth||0)},
scroll:function(){var a=0;return a=g.pageYOffset?g.pageYOffset:h.documentElement?h.documentElement.scrollTop:0},viewport:function(){var a=0,b=0,b=h.documentElement;if(g.innerWidth)a=g.innerWidth,b=g.innerHeight;else{if(!b||!b.clientWidth)b=c.$("BODY")[0];a=b.clientWidth;b=b.clientHeight}return{w:a,h:b}},getsupportedprop:function(a){for(var b=h.documentElement,d=0;d<a.length;d++)if("string"==typeof b.style[a[d]])return a[d]},$:function(a){var b=[],d,c=0,f;if(!a)return[];if("string"!==typeof a)return[a];
switch(a.charAt(0)){case "#":b.push(h.getElementById(a.substring(1)));break;case ".":d=h.getElementsByTagName("*");for(f=" "+a.substring(1)+" ";c<d.length;c+=1)a=(" "+d[c].className+" ").replace(/[\n\t\r]/g," "),-1<a.indexOf(f)&&b.push(d[c]);break;default:b=h.getElementsByTagName(a)}return b}});c.provide("QS",{escape:function(a){return encodeURIComponent(a)},unescape:function(a){return decodeURIComponent(a)},encode:function(a,b){var d=c.QS,e=[];if(c.Common.isArray(a))for(var f=0,j;f<a.length;f+=1)j=
a[f],/\[\]$/.test(b)?e.push(d.escape(b)+"="+d.escape(j)):e.push(d.encode(j,b+"["+("object"===typeof j?f:"")+"]"));else if("object"===typeof a&&null!==a&&!("nodeType"in a))for(f in a)Object.prototype.hasOwnProperty.call(a,f)&&(b?e.push(d.encode(a[f],b+"["+f+"]")):e.push(d.encode(a[f],f)));else e.push(d.escape(b)+"="+d.escape(a));return e.join("&")},decode:function(a){var b={},d=0,e={"true":!0,"false":!1,"null":null};for(a=a.replace(/\+/g," ").split("&");d<a.length;d+=1){var f=a[d].split("="),j=c.QS.unescape(f[0]),
k=b,h=0,g=j.split("]["),m=g.length-1;/\[/.test(g[0])&&/\]$/.test(g[m])?(g[m]=g[m].replace(/\]$/,""),g=g.shift().split("[").concat(g),m=g.length-1):m=0;if(2===f.length)if(f=(f=c.QS.unescape(f[1]))&&!isNaN(f)?+f:"undefined"===f?void 0:void 0!==e[f]?e[f]:f,m)for(;h<=m;h+=1)j=""===g[h]?k.length:g[h],k=k[j]=h<m?k[j]||(g[h+1]&&isNaN(g[h+1])?{}:[]):f;else c.Common.isArray(b[j])?b[j].push(f):b[j]=void 0!==b[j]?[b[j],f]:f;else j&&(b[j]=void 0)}return b}});c.provide("API",{callbacks:{},jsonp:function(a,b,d,
e,f){e=e||l;f||(f="cb");var g="cb"+c.Common.random(),k=c.API;d[f]="SPR.API.callbacks."+g;f=h.location.protocol+"//";"file://"===f&&(f="http://");d=c.QS.encode(d);var n=c.DOM.addScript(f+a+b+"?"+d);k.callbacks[g]=function(a){setTimeout(function(){n.parentNode.removeChild(n)},0);e(a);try{delete k.callbacks[g]}catch(b){k.callbacks[g]=null}}}});c.provide("XD",{callbacks:{},xport:null,init:function(){c.XD.xport=g.postMessage?c.XD.PM:c.XD.Fragment;c.XD.xport.init()},send:function(a,b,d,e){e=e||{};e.__message__=
d;c.XD.xport.send(a,b,c.QS.encode(e))},recv:function(a){a=c.QS.decode(a);var b=c.XD.callbacks[a.__message__],d=0;if(b)for(;d<b.length;d+=1)if("function"===typeof b[d])b[d](a)},on:function(a,b){b=b||l;c.XD.callbacks[a]=c.XD.callbacks[a]||[];c.XD.callbacks[a].push(b)},once:function(a,b){b=b||l;c.XD.on(a,function(a){b(a);b=l})},PM:{init:function(){c.DOM.attachEvent(g,"message",function(a){c.XD.recv(a.data)})},send:function(a,b,d){a.postMessage(d,h.location.protocol+"//"+(b.host||b))}},Fragment:{init:function(){function a(){var f=
h.location.hash;f!==d&&b.test(f)&&(c.XD.recv(f.replace(b,"")),h.location.hash=d);(f=e.queue.shift())&&e.setHash.apply(null,f);e.interval=setTimeout(a,e.delay)}var b,d,e=c.XD.Fragment;d=h.location.hash;b=/.*&\d{11,15}data:/;a()},delay:100,queue:[],send:function(a){c.XD.Fragment.queue.push(arguments)},setHash:function(a,b,d){var c;c=(b.hash||"").replace(/^#+/,"");b=b.location||"";c=c+"&"+ +new Date+"data:"+d;a.location=b+"#"+c}}});c.provide("Cookie",{patterns:{},get:function(a){var b=h.cookie||"",d=
c.Cookie.patterns[a];d||(d=a.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g,"\\$1"),d=RegExp("(?:^|;)\\s?"+d+"=(.*?)(?:;|$)","i"),c.Cookie.patterns[a]=d);return(a=b.match(d))&&c.QS.unescape(a[1])},set:function(a,b,d){var c="";d&&(c="; expires="+d.toGMTString());h.cookie=a+"="+b+c+"; path=/"},del:function(a){c.Cookie.set(a,"",new Date(1982,5,13))}});c.provide("FX",{init:function(){c.FX.Animation.prototype={add:function(a){for(var b,d,e=0;e<a.length;e+=1)d=a[e],b=d.fx?c.FX.Easing[d.fx]:c.FX.Easing.ease,this.queue.push(new c.FX.Tween(this.el.style,
d.type,b,d.from,d.to,d.duration,"px"))},run:function(a){for(var b=0,d=this.queue,c=0,f=function(){c+=1;c===d.length&&"function"===typeof a&&a()};b<d.length;b+=1)d[b].start(f)}};c.FX.Tween.prototype={func:function(a,b,d,c){return d*a/c+b},setTime:function(a){this.prevTime=this._time;a>this._duration?this.looping?(this.rewind(a-this._duration),this.update()):(this._time=this._duration,this.update(),this.stop(),this.callback()):(0>a?this.rewind():this._time=a,this.update())},setPosition:function(a){var b=
""!==this.suffixe?this.suffixe:"";this.prevPos=this._pos;this.obj[this.prop]=Math.round(a)+b;this._pos=a},getPosition:function(a){a||(a=this._time);return this.func(a,this.begin,this.change,this._duration)},init:function(a,b,d,e,f,g,k){arguments.length&&(k&&(this.suffixe=k),this.callback=l,this.obj=a,this.prop=b,this.begin=e,this.finish=f,this._pos=e,this._duration=!g||0>=g?1E5:g,this.func=d||c.FX.Easing.none,this.change=f-this.begin)},start:function(a){"function"===typeof a&&(this.callback=a);this.begin||
(this._pos=this.begin=parseInt(this.obj[this.prop],10),this.change=this.finish-this.begin);this.rewind();this.stop();this.isPlaying=!0;this.onEnterFrame()},rewind:function(a){this.stop();this._time=!a?0:a;this.fixTime();this.update()},update:function(){this.setPosition(this.getPosition(this._time))},onEnterFrame:function(){var a=this;a.isPlaying&&(a.nextFrame(),setTimeout(function(){a.onEnterFrame()},0))},nextFrame:function(){this.setTime((this.getTimer()-this._startTime)/1E3)},stop:function(){this.isPlaying=
!1},fixTime:function(){this._startTime=this.getTimer()-1E3*this._time},getTimer:function(){return(new Date).getTime()-this._time}}},Animation:function(a,b){this.queue=[];this.el=a;this.add(b)},Tween:function(a,b,d,c,f,g,k){this.obj={};this.prop="";this.prevPos=this.prevTime=this.change=0;this.looping=!1;this._finish=this._startTime=this._position=this._pos=this._time=this._duration=0;this.suffixe=this.name="";this.init(a,b,d,c,f,g,k)},Easing:{none:function(a,b,d,c){return d*a/c+b},ease:function(a,
b,d,c){return 1>(a/=c/2)?d/2*a*a*a*a*a+b:d/2*((a-=2)*a*a*a*a+2)+b},bounce:function(a,b,d,c){var f=0.867;return 1>(a/=c/2)?d/2*a*a*(((f*=1.525)+1)*a-f)+b:d/2*((a-=2)*a*(((f*=1.525)+1)*a+f)+2)+b}}});c.provide("de",{api:"feeds.delicious.com",apiPath:"/v2/json/urlinfo/data",collect:function(a){var b=c.de;c.API.jsonp(b.api,b.apiPath,{url:a.url},function(b){c.API.jsonp("cc.simplereach.com","/event",{event:"s",url:a.url,cid:a.id,pid:a.pid,sn:"de",data:b})},"callback")}});c.provide("dg",{api:"services.digg.com",
apiPath:"/stories/",collect:function(a){var b=c.dg;c.API.jsonp(b.api,b.apiPath,{type:"javascript",link:a.url},function(b){c.API.jsonp("cc.simplereach.com","/event",{event:"s",url:a.url,cid:a.id,pid:a.pid,sn:"dg",data:b})},"callback")}});c.provide("fb",{api:"graph.facebook.com",apiPath:"/fql",collect:function(a){var b=c.fb;c.API.jsonp(b.api,b.apiPath,{q:'SELECT url,total_count,share_count,comment_count,like_count,click_count,commentsbox_count FROM link_stat WHERE url in ("'+a.url+'")'},function(b){c.API.jsonp("cc.simplereach.com",
"/event",{event:"s",url:a.url,cid:a.id,pid:a.pid,sn:"fb",data:b})},"callback")}});c.provide("gp",{api:"clients6.google.com",apiPath:"rpc",collect:function(){}});c.provide("li",{api:"www.linkedin.com",apiPath:"/countserv/count/share",collect:function(a){var b=c.li;c.API.jsonp(b.api,b.apiPath,{url:a.url},function(b){c.API.jsonp("cc.simplereach.com","/event",{event:"s",url:a.url,cid:a.id,pid:a.pid,sn:"li",data:b})},"callback")}});c.provide("rd",{api:"www.reddit.com",apiPath:"/api/info.json",collect:function(a){var b=
c.rd;c.API.jsonp(b.api,b.apiPath,{url:a.url},function(b){c.API.jsonp("cc.simplereach.com","/event",{event:"s",url:a.url,cid:a.id,pid:a.pid,sn:"rd",data:b})},"jsonp")}});c.provide("pi",{api:"partners-api.pinterest.com",apiPath:"/v1/urls/count.json",collect:function(a){var b=c.pi;c.API.jsonp(b.api,b.apiPath,{url:a.url},function(b){c.API.jsonp("cc.simplereach.com","/event",{event:"s",url:a.url,cid:a.id,pid:a.pid,sn:"pi",data:b})},"callback")}});c.provide("su",{api:"www.stumbleupon.com",apiPath:"/services/1.01/badge.getinfo",
collect:function(a){var b=c.su;c.API.jsonp(b.api,b.apiPath,{url:a.url},function(b){c.API.jsonp("cc.simplereach.com","/event",{event:"s",url:a.url,cid:a.id,pid:a.pid,sn:"su",data:b})})}});c.provide("tw",{api:"urls.api.twitter.com",apiPath:"/1/urls/count.json",collect:function(a){var b=c.tw;c.API.jsonp(b.api,b.apiPath,{url:a.url},function(b){c.API.jsonp("cc.simplereach.com","/event",{event:"s",url:a.url,cid:a.id,pid:a.pid,sn:"tw",data:b})},"callback")}});c.provide("Reach",{api:"cc.simplereach.com",
cdn:"d8rk54i4mohrb.cloudfront.net",config:{},init:function(){if(g.location.host!==c.Reach.cdn)try{var a=c.Reach,b=g.__reach_config||g.__spr_config,d=a.config||{},e;for(e in b)void 0===d[e]&&(d[e]=b[e]);d.ckw&&(d.tags=d.ckw.split(" "));d.pub&&(d.date=d.pub);d.cat&&(d.channels=d.cat.split(" "));if(!0===d.no_slide||1===d.no_slide)d.slide_active=!1;a.config=d;a.collect(d)}catch(f){c.DOM.onReady(function(){var a=h.createElement("img");a.src="http://cc.simplereach.com/pixel?bad=true&error="+f.message;a.setAttribute("width",
"1px");h.body.appendChild(a)})}},collect:function(a){function b(a){"string"===typeof a&&(a=a.split(","));if(c.Common.isArray(a)){for(var b=0;b<a.length;b+=1)"string"===typeof a[b]&&(a[b]=a[b].replace(/^\s*/,"").replace(/\s*$/,"").replace(/\|/,""));return a.join("|")}return a}var d=c.Reach,e={};e.pid=a.pid;e.url=a.url;e.title=a.title;e.date=a.date;e.domain=a.domain;e.ref_url=a.ref_url;e.referrer=h.referrer;a.authors&&(e.authors=b(a.authors));a.channels&&(e.channels=b(a.channels));a.tags&&(e.tags=b(a.tags));
a.brand_tags&&(e.brand_tags=b(a.brand_tags));a.date&&"string"!==typeof a.date&&(e.date=a.date.toString());if(!e.pid||!e.url||!e.date){if(!a.ignore_errors)try{console.log("SPR-ERROR: Please provide pid, url and date in the configuration")}catch(f){}}else{if(0===e.url.indexOf("http%3"))try{e.url=decodeURIComponent(e.url)}catch(g){e.url=unescape(e.url)}a.url=e.url;c.API.jsonp(d.api,"/n",e,function(a){if(!1!==a.slide){var b=!1;!0===d.config.slide_active?b=!0:!1!==d.config.slide_active&&!0===a.slide&&
(b=!0);c.Slide&&(!0===b&&!1===c.Slide.enabled)&&c.Slide.enable(a.id)}a.de&&c.de.collect(a);a.dg&&c.dg.collect(a);a.fb&&c.fb.collect(a);a.gp&&c.gp.collect(a);a.li&&c.li.collect(a);a.rd&&c.rd.collect(a);a.su&&c.su.collect(a);a.tw&&c.tw.collect(a);a.pi&&c.pi.collect(a)})}}});c.provide("Slide",{domain:c.Reach.cdn,api:"slide.simplereach.com",template:"/slides/slide.html?"+c.Common.random(),cookie:"__sruid",optOutCookie:"__spr_opt_out",config:{},isHost:!0,recommendations:null,remote:null,hasOpened:!1,evtopts:{},
debug:!1,enabled:!1,cid:null,fx:{},init:function(){function a(a){c.XD.on(a,function(c){b[a](c)})}var b=c.Slide,d=c.Cookie;g.location.host!==b.domain&&b.createConfig();if(!b.config.no_slide&&"true"!==d.get(b.optOutCookie)){g.location.host===b.domain&&b.localInit();for(var d="recommend setState help setOptOut run setCookie setOptOutCookie open close slideIn toggleHelp showShares".split(" "),e=0;e<d.length;e+=1)a(d[e])}},createConfig:function(){for(var a=g.__reach_config||g.__spr_config||{},b=c.Reach.config,
d={},e="pid offset disallow_opt_out slide_logo header css uid no_slide loc bg_color_code header_color_code box_shadow_opacity".split(" "),f,h,k=e.length-1;0<=k;k--)f=e[k],h=void 0,void 0!==b[f]?h=b[f]:void 0!==a[f]?h=a[f]:"slide_logo"===f?h=!0:"uid"===f&&(h=c.Cookie.get(c.Slide.cookie)),void 0!==h&&(d[f]=h);c.Slide.config=d},enable:function(a){c.DOM.onReady(function(){c.Slide.remoteInit(a)})},localInit:function(){var a=c.Slide,b=c.QS.decode(g.location.hash.substring(1));a.isHost=!1;a.domain=b.host;
a.hash=b.hash;a.location=b.location;a.remote=g.parent},remoteInit:function(a){var b=c.DOM,d=c.Slide,e=d.config.loc,f=b.$("body")[0];"string"===typeof e&&(-1===e.indexOf("#")&&-1===e.indexOf("."))&&(e="#"+e);d.enabled=!0;d.content=b.$(e)[0]||f;d.mult=d.content===f?0.55:0.95;d.cid=a;d.recommend()},xd:function(a,b){c.XD.send(c.Slide.remote,{location:c.Slide.location,host:c.Slide.domain,hash:c.Slide.hash},a,b)},recommend:function(a){var b=c.Slide,d=c.QS,e=c.DOM,f=c.XD,j=c.API;if(b.isHost)j.jsonp(b.api,
"/p/n",{pid:b.config.pid,cid:b.cid},function(a){var c;if(a.hl&&0!==a.hl.length){var e=d.encode({host:g.location.host,hash:g.location.hash,location:g.location.href});c=h.location.protocol+"//"+b.domain+b.template;b.frame=b.createFrame(c+"#"+e);b.remote=b.frame.contentWindow;b.location=c;f.once("slide-init",function(c){var d={};if(b.config.offset){var e=parseInt(b.config.offset,10);"undefined"!==typeof c.start.top&&(c.start.top=e+"px");"undefined"!==typeof c.start.bottom&&(c.start.bottom=e+"px")}b.fx=
c;b.setCookie(a.uid)||(d.setCookie={uid:a.uid});a.pid=b.config.pid;b.evtopts={uid:a.uid,tid:a.tid,pid:b.config.pid,a:a.hl[0].id};d.recommend={res:a,config:b.config};b.xd("run",d);b.bindEvents()})}});else e.onReady(function(){var c=a.res.hl[0];b.config=a.config;b.hl=c;b.evtopts={uid:a.res.uid,tid:a.res.tid,pid:a.config.pid,a:c.id};e.$("#simplereach-slide-link")[0].href=c.u;e.$("#simplereach-slide-link")[0].innerHTML=c.t;b.config.disallow_opt_out&&(e.$("#simplereach-slide-help-button")[0].style.display=
"none");!1===b.config.slide_logo?e.$("#logo")[0].style.display="none":e.$("#logo")[0].style.display="block";b.config.header&&(e.$("#simplereach-slide-title")[0].innerHTML=b.config.header);b.config.css&&(c=h.createElement("link"),c.rel="stylesheet",c.type="text/css",c.href=b.config.css,e.$("HEAD")[0].appendChild(c));b.config.bg_color_code&&(e.$("#simplereach-slide-element")[0].style.backgroundColor=b.config.bg_color_code);b.config.header_color_code&&(e.$("#simplereach-slide-title")[0].style.color=
b.config.header_color_code);b.bindEvents()})},createFrame:function(a){var b=h.createElement("iframe"),d=h.createElement("div"),e=c.DOM.getsupportedprop(["boxShadow","MozBoxShadow","WebkitBoxShadow"]);d.setAttribute("id","simplereach-slide-element");d.style.position="fixed";d.style.left=0;d.style.right=0;d.style.width="100%";d.style.height=0;d.style.zIndex=8675309;d.style.overflow="visible";d.style.bottom=0;b.scrolling="no";b.frameBorder="0";b.src=a;b.style.position="absolute";b.style.display="none";
b.style.border="none";b.style[e]="0px 0px 10px #000";c.Slide.config.box_shadow_opacity&&(b.style[e]="0px 0px 10px rgba(0,0,0,"+c.Slide.config.box_shadow_opacity+")");b.allowtransparency="true";d.appendChild(b);c.DOM.$("BODY")[0].appendChild(d);return b},bindEvents:function(){var a=c.Slide,b=c.DOM;a.isHost?(b.on(g,"scroll",a.onScroll),"true"===c.Cookie.get(a.optOutCookie)&&(a.optedOut=!0)):(b.on(b.$("#simplereach-slide-close-button")[0],"click",function(){a.close({detach:!0})}),b.on(b.$("#simplereach-slide-open-button")[0],
"click",function(){a.open()}),b.on(b.$("#simplereach-slide-help-button")[0],"click",function(){a.help()}),b.on(b.$("#simplereach-slide-link")[0],"click",function(){var d="?u="+a.hl.eu+"&"+c.QS.encode(a.evtopts);b.$("#simplereach-slide-link")[0].href=h.location.protocol+"//"+a.api+"/p/c"+d}),!1!==a.config.slide_logo&&(b.$("#logo-link")[0].href="http://simplereach.com?ref="+a.domain,b.$("#logo-link-f")[0].href="http://simplereach.com?ref="+a.domain),b.on(b.$("#save")[0],"click",function(){var d=b.$("#opt-out-n")[0].checked;
a.setOptOutCookie({tf:d});a.setOptOut();c.API.jsonp(a.api,d?"/p/oo":"/p/oi",a.evtopts)}),a.setOptOut())},setOptOut:function(a){var b=c.Slide,d=c.DOM;b.isHost?(a="true"===c.Cookie.get(b.optOutCookie),b.xd("setOptOut",{oo:a})):a?(b.optedOut=a.oo,d.$("#opt-out-y")[0].checked=!b.optedOut,d.$("#opt-out-n")[0].checked=b.optedOut,b.close({detach:!0},function(){b.optedOut||b.open()})):b.xd("setOptOut",{})},show_fb:function(){if(!(-1!==navigator.appVersion.indexOf("MSIE 7.")||-1!==navigator.appVersion.indexOf("MSIE 8."))){var a=
c.Slide;if(!a.isHost){var b=c.DOM,d=b.$("#fb-root")[0];b.addScript(h.location.protocol+"//connect.facebook.net/en_US/all.js");d.style.display="block";d.innerHTML='<fb:like href="'+a.hl.u+'" layout="button_count" show-faces="false" action="like" colorscheme="light"></fb:like>';g.fbAsyncInit=function(){g.FB.init({appId:"200433859985229",status:!0,cookie:!0,xfbml:!0})}}}},show_tw:function(){var a=c.Slide;if(!a.isHost){var b=c.DOM,d=b.$("#tw-root")[0],e=h.createElement("a");d.style.display="block";b.addScript(h.location.protocol+
"//platform.twitter.com/widgets.js",!0);e.setAttribute("href","http://twitter.com/share");e.setAttribute("class","twitter-share-button");e.setAttribute("data-url",a.hl.su||a.hl.u);e.setAttribute("data-counturl",a.hl.u);e.setAttribute("data-text",a.hl.t);d.appendChild(e)}},show_goog:function(){if(!c.Slide.isHost){var a=c.DOM,b=a.$("#goog-root")[0];b.style.display="block";b.innerHTML='<g:plusone size="medium" href="'+c.Slide.hl.u+'"></g:plusone>';a.addScript(h.location.protocol+"//apis.google.com/js/plusone.js",
!0)}},show_img:function(){var a=c.Slide;if(!a.isHost&&a.hl.i){var b=c.DOM,d=b.$("#icon-link")[0],e=b.$("#simplereach-slide-image")[0];d.style.display="block";d.href=a.hl.u;d.alt=a.hl.t;e.src=h.location.protocol+"//"+c.Reach.cdn+a.hl.i;b.on(d,"click",function(){var d="?u="+a.hl.eu+"&"+c.QS.encode(a.evtopts);b.$("#simplereach-slide-link")[0].href=h.location.protocol+"//"+a.api+"/p/c"+d})}},help:function(){var a=c.Slide,b=c.DOM;a.isHost?a.close({detach:!0},function(){(new c.FX.Animation(a.frame,a.fx.slideHelp)).run();
a.setState({state:"open",toggleHelp:{state:"visible"}})}):(b.$("#simplereach-slide-help-header")[0].innerHTML="OPTIONS FOR "+a.domain.toUpperCase(),a.xd("help"))},onScroll:function(){var a=c.Slide,b=c.DOM,d=b.height(a.content)+b.top(a.content);b.viewport().h*a.mult+b.scroll()>d*a.mult?a.open():a.close()},showShares:function(){var a=c.Slide;if(a.isHost)a.xd("showShares");else for(var b=0;b<a.hl.st.length;b+=1)a["show_"+a.hl.st[b]]()},slideIn:function(){var a=c.Slide;if(a.isHost){if(!a.inMotion){var b,
d=new c.FX.Animation(a.frame,a.fx.slideIn),e="open";a.optedOut&&(d.add(a.fx.slideClose),e="closed");a.frame.style.display="block";for(b in a.fx.start)Object.prototype.hasOwnProperty.call(a.fx.start,b)&&(a.frame.style[b]=a.fx.start[b]);a.inMotion=!0;d.run(function(){a.inMotion=!1;a.hasShown=!0;a.setState({state:e});a.optedOut?c.DOM.off(g,"scroll",a.onScroll):(c.API.jsonp(a.api,"/p/i",a.evtopts),a.impression=!0,a.showShares())})}}else a.xd("slideIn")},open:function(a,b){var d=c.Slide;if(d.isHost)if(d.hasShown){if(!d.inMotion&&
d.isClosed&&!d.isOpen){var e=new c.FX.Animation(d.frame,d.fx.slideOpen);d.inMotion=!0;e.run(function(){d.inMotion=!1;d.setState({state:"open"});a&&a.detach&&c.DOM.off(g,"scroll",d.onScroll);d.impression||(c.API.jsonp(d.api,"/p/i",d.evtopts),d.impression=!0);b&&b()})}}else d.slideIn();else d.xd("open")},close:function(a,b){var d=c.Slide;if(d.isHost)if(!d.inMotion&&!d.isClosed&&d.isOpen){var e=new c.FX.Animation(d.frame,d.fx.slideClose);d.inMotion=!0;e.run(function(){d.inMotion=!1;d.setState({state:"closed"});
a&&a.detach&&c.DOM.off(g,"scroll",d.onScroll);b&&b()})}else d.inMotion||b&&b();else d.xd("close",a)},toggleHelp:function(a){var b=c.Slide,d=c.DOM;if(b.isHost&&!a.noSend)b.xd("toggleHelp",a);else{var e=d.$("#simplereach-slide-content")[0].style,f=d.$("#simplereach-slide-help-button")[0].style,g=d.$("#simplereach-slide-footer")[0].style,h=d.$("#simplereach-slide-help")[0].style,l=d.$("#simplereach-slide-help-header")[0].style,d=d.$("#simplereach-slide-title")[0].style;"hidden"===a.state?(e.display=
"block",b.config.disallow_opt_out||(f.display="block"),h.display="none",g.display="block",l.display="none",d.display="block"):(e.display="none",f.display="none",h.display="block",g.display="none",l.display="block",d.display="none")}},setState:function(a){var b=c.Slide,d=c.DOM.$,e=a.state;b.isHost?(d={setState:{state:e}},"closed"===e?(b.isClosed=!0,b.isOpen=!1,d.toggleHelp={state:"hidden"}):"open"===e&&(b.isClosed=!1,b.isOpen=!0),a.toggleHelp&&(d.toggleHelp=a.toggleHelp),d.toggleHelp&&(d.toggleHelp.noSend=
!0),b.xd("run",d)):(a=d("#simplereach-slide-close-button")[0],b=d("#simplereach-slide-open-button")[0],"closed"===e?(a.style.display="none",b.style.display="block"):"open"===e&&(b.style.display="none",a.style.display="block"))},run:function(a){var b=c.Slide,d,e;for(e in a)c.Common.hasOwnProperty(a,e)&&(d=b[e])&&d(a[e])},setCookie:function(a){var b=c.Slide;c.Cookie.set(b.cookie,a.uid||a,new Date(2032,5,13));return!b.isHost},setOptOutCookie:function(a){var b=c.Slide,d=c.Cookie;b.isHost?a.tf?d.set(b.optOutCookie,
"true"):d.del(b.optOutCookie):b.xd("setOptOutCookie",a)}})})(window,document,function(){});
