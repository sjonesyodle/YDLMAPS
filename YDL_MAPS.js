;(function( $, window, undefined ){

    var
    libs = (function(){

    //Kernel JS - http://alanlindsay.me/kerneljs/
    ;(Kernel=function(){var m,c={},q={},s={},j={},a="main";function b(u){if(f(u)){u=[u]}return u}function f(u){return Object.prototype.toString.call(u)=="[object String]"}function p(w,v){var u,x;if(!w){return}for(u in w){if(w.hasOwnProperty(u)||v){if(u==="decorateMethod"||u==="decorateMethods"){return}if(!w._decoratedMethods){w._decoratedMethods={}}if(!w._decoratedMethods[u]){x=w[u];if(typeof x==="function"){w[u]=m.decorateMethod(w,u,x);w._decoratedMethods[u]=true}}}}}function e(u){a=u}function k(w){var v,x,u={};if(w.extend){v=b(w.extend);for(i=0;i<v.length;i+=1){x=v[i];x=q[x];if(x){Kernel.extend(u,x,true)}}}return Kernel.extend(u,w,true)}function n(v,u){q[v]=k(u)}function l(w,u){var z={event:0},v={event:0},y={event:0},x=u;x._internals={type:"hub"};x.id=w;x.broadcast=function(I,E,L,B){var F,C,G=j.event,N,K,A,J,H=0,M=[],D;if(x.beforeBroadcast){D=x.beforeBroadcast(I,E,B);if(D.type){I=D.type}if(D.data){E=D.data}}C=j[I];z[I]=z[I]||0;z[I]+=1;z.event+=1;v[I]=v[I]||0;y[I]=y[I]||0;if(C){for(F=0,N=C.length;F<N;F+=1){A=(new Date()).getTime();j[I][F].callback(E,B);J=(new Date()).getTime()-A;H+=J;y[I]+=J;y.event+=J;v[I]+=1;v.event+=1;M.push({id:j[I][F].id,elapseTime:J,callback:j[I][F].callback})}}if(G){K={type:I,data:E,time:new Date(),listeners:M,broadcastCount:z[I],callbackCount:v[I],elapseTime:H,totalElapseTime:y[I],all:{broadcastCount:z.event,callbackCount:v.event,totalElapseTime:y.event}};for(F=0,N=G.length;F<N;F+=1){j.event[F].callback(K)}}if(L){L()}};x.authorized=x.authorized||function(A,B){return true};x.listen=function(D,F,E){E=E||"hub-"+x.id;var C,B,A;D=b(D);for(C=0,B=D.length;C<B;C+=1){A=D[C];if(x.authorized(D,E)){j[A]=j[A]||[];j[A].push({callback:F,id:E})}}};x.getStats=function(){return{broadcastCount:z,callbackCount:v,totalElapseTime:y}};x.share=function(A){Kernel.extend(x,A)};p(x);c[w]=x}function t(v){try{if(v instanceof RegExp){return true}if(v instanceof Node){return true}if(v instanceof jQuery){return true}}catch(u){}return false}function o(B,A,v,z,w){var y,x,u;if(A===null){return B}if(typeof B!=="object"||!B){B=(A instanceof Array)?[]:{}}if(B._internals&&(B._internals.type==="module"||B._internals.type==="hub")){v=true;p(B,true)}if(B instanceof Array&&A instanceof Array&&(!w)){B=[]}for(y in A){if(A.hasOwnProperty(y)||z){if(B[y]===A[y]){continue}if(y==="_internals"){continue}if(y==="_parent"){continue}if(y==="_children"){continue}if(B===A[y]){continue}if(y==="hub"&&A[y]._internals&&A[y]._internals.type==="hub"){continue}if(t(A[y])){B[y]=A[y];continue}if(v&&typeof A[y]==="object"){B[y]=Kernel.extend(B[y],A[y],v,z,w)}else{if(B._internals&&B._internals.type==="Kernel"){switch(y){case"extend":case"decorateMethods":case"module":case"register":case"hub":case"start":case"stop":case"version":case"_internals":throw"You can't extend '"+y+"', it's part of Kernel's base functionality.";default:}}else{if(B._internals&&B._internals.type==="module"){if(y==="id"){throw"You can't overwrite a module instance id. ["+B.id+"]"}}}if(B instanceof Array&&A instanceof Array&&w){for(x=0,u=B.length;x<u;x+=1){if(B[x]===A[y]){continue}}B.push(A[y])}else{B[y]=A[y]}}}}return B}function g(B,z,y,w,v){var y=y||a,u;s[B]={hub:c[y],started:false,Definition:q[z]};try{u=Kernel.extend(k(s[B].Definition),s[B].Definition,true)}catch(A){throw"Couldn't register module: ["+B+"] - missing or broken Definition: "+A.message}if(w){Kernel.extend(u,w,true)}u._internals={type:"module",moduleType:z};u.kill=u.kill||function(){};u.id=B;var x=function(){};x.prototype=s[B].hub;u.hub=new x;u.hub.broadcast=function(C,D,E){s[B].hub.broadcast(C,D,E,B)};u.hub.listen=function(C,D){s[B].hub.listen(C,D,B)};u.hub._internals=Kernel.extend(s[B].hub._internals,{moduleId:B,moduleType:z});p(u,true);s[B].instance=u;if(v.onRegister){v.onRegister(s[B].instance)}if(s[B].instance.onRegister){s[B].instance.onRegister()}}function r(v){var u;v=v||function(w){return w.toString().replace(/([a-z])([A-Z])/g,"$1_$2").toLowerCase()};for(u in m._internals.modules){m.register(v(u),u)}}function d(u){if(s[u].instance.started){Kernel.stop(u)}delete s[u]}function h(w,v,u){if(u.module.isStarted(w)){return}if(v){o(s[w].instance,v,true)}s[w].started=true;return u.onStart(s[w].instance)}m={extend:o,decorateMethods:p,module:{define:n,get:function(u){if(!s[u]){throw"Couldn't get instance for: "+u+", is it registered?"}return s[u].instance},getDefinition:function(u){return q[u]},isStarted:function(u){return s[u].started}},hub:{define:l,get:function(u){return c[u]}},register:function(y,x,w,u){var v;if(f(y)){g(y,x,w,u,this)}else{for(v=0;v<y.length;v+=1){g(y[v].id,y[v].type,y[v].hub,y[v].config,this)}}},unregister:d,autoRegisterModules:r,start:function(w,u){var v;if(f(w)){return h(w,u,this)}else{for(v=0;v<w.length;v+=1){h(w[v].id,w[v].config,this)}}},startAll:function(){var u;for(u in s){h(u,null,this)}},onStart:function(u,v){u.init();if(v){v()}},decorateMethod:function(u,v,w){return function(){return w.apply(u,arguments)}},stop:function(y){var w,v,u,x;this.onStop(s[y].instance);for(w in j){for(v=0,u=j[w].length;v<u;v+=1){x=j[w][v];if(x.id===y){j[w].splice(v,1)}}}s[y].started=false},onStop:function(u){u.kill()},version:"2.7.5",_internals:{PRIVATE:"FOR DEBUGGING ONLY",type:"Kernel",hubs:c,modules:q,registered:s,listeners:j}};return m}());Kernel.hub.define("main",{});
        //end Kernel Js

        // underscore js
        (function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,h=e.reduce,v=e.reduceRight,d=e.filter,g=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,_=Object.keys,j=i.bind,w=function(n){return n instanceof w?n:this instanceof w?(this._wrapped=n,void 0):new w(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=w),exports._=w):n._=w,w.VERSION="1.4.4";var A=w.each=w.forEach=function(n,t,e){if(null!=n)if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a in n)if(w.has(n,a)&&t.call(e,n[a],a,n)===r)return};w.map=w.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e[e.length]=t.call(r,n,u,i)}),e)};var O="Reduce of empty array with no initial value";w.reduce=w.foldl=w.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduce===h)return e&&(t=w.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(O);return r},w.reduceRight=w.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduceRight===v)return e&&(t=w.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=w.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(O);return r},w.find=w.detect=function(n,t,r){var e;return E(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},w.filter=w.select=function(n,t,r){var e=[];return null==n?e:d&&n.filter===d?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&(e[e.length]=n)}),e)},w.reject=function(n,t,r){return w.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},w.every=w.all=function(n,t,e){t||(t=w.identity);var u=!0;return null==n?u:g&&n.every===g?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var E=w.some=w.any=function(n,t,e){t||(t=w.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};w.contains=w.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:E(n,function(n){return n===t})},w.invoke=function(n,t){var r=o.call(arguments,2),e=w.isFunction(t);return w.map(n,function(n){return(e?t:n[t]).apply(n,r)})},w.pluck=function(n,t){return w.map(n,function(n){return n[t]})},w.where=function(n,t,r){return w.isEmpty(t)?r?null:[]:w[r?"find":"filter"](n,function(n){for(var r in t)if(t[r]!==n[r])return!1;return!0})},w.findWhere=function(n,t){return w.where(n,t,!0)},w.max=function(n,t,r){if(!t&&w.isArray(n)&&n[0]===+n[0]&&65535>n.length)return Math.max.apply(Math,n);if(!t&&w.isEmpty(n))return-1/0;var e={computed:-1/0,value:-1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a>=e.computed&&(e={value:n,computed:a})}),e.value},w.min=function(n,t,r){if(!t&&w.isArray(n)&&n[0]===+n[0]&&65535>n.length)return Math.min.apply(Math,n);if(!t&&w.isEmpty(n))return 1/0;var e={computed:1/0,value:1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;e.computed>a&&(e={value:n,computed:a})}),e.value},w.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=w.random(r++),e[r-1]=e[t],e[t]=n}),e};var k=function(n){return w.isFunction(n)?n:function(t){return t[n]}};w.sortBy=function(n,t,r){var e=k(t);return w.pluck(w.map(n,function(n,t,u){return{value:n,index:t,criteria:e.call(r,n,t,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index<t.index?-1:1}),"value")};var F=function(n,t,r,e){var u={},i=k(t||w.identity);return A(n,function(t,a){var o=i.call(r,t,a,n);e(u,o,t)}),u};w.groupBy=function(n,t,r){return F(n,t,r,function(n,t,r){(w.has(n,t)?n[t]:n[t]=[]).push(r)})},w.countBy=function(n,t,r){return F(n,t,r,function(n,t){w.has(n,t)||(n[t]=0),n[t]++})},w.sortedIndex=function(n,t,r,e){r=null==r?w.identity:k(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;u>r.call(e,n[o])?i=o+1:a=o}return i},w.toArray=function(n){return n?w.isArray(n)?o.call(n):n.length===+n.length?w.map(n,w.identity):w.values(n):[]},w.size=function(n){return null==n?0:n.length===+n.length?n.length:w.keys(n).length},w.first=w.head=w.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:o.call(n,0,t)},w.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},w.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},w.rest=w.tail=w.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},w.compact=function(n){return w.filter(n,w.identity)};var R=function(n,t,r){return A(n,function(n){w.isArray(n)?t?a.apply(r,n):R(n,t,r):r.push(n)}),r};w.flatten=function(n,t){return R(n,t,[])},w.without=function(n){return w.difference(n,o.call(arguments,1))},w.uniq=w.unique=function(n,t,r,e){w.isFunction(t)&&(e=r,r=t,t=!1);var u=r?w.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:w.contains(a,r))||(a.push(r),i.push(n[e]))}),i},w.union=function(){return w.uniq(c.apply(e,arguments))},w.intersection=function(n){var t=o.call(arguments,1);return w.filter(w.uniq(n),function(n){return w.every(t,function(t){return w.indexOf(t,n)>=0})})},w.difference=function(n){var t=c.apply(e,o.call(arguments,1));return w.filter(n,function(n){return!w.contains(t,n)})},w.zip=function(){for(var n=o.call(arguments),t=w.max(w.pluck(n,"length")),r=Array(t),e=0;t>e;e++)r[e]=w.pluck(n,""+e);return r},w.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},w.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=w.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},w.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},w.range=function(n,t,r){1>=arguments.length&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=Array(e);e>u;)i[u++]=n,n+=r;return i},w.bind=function(n,t){if(n.bind===j&&j)return j.apply(n,o.call(arguments,1));var r=o.call(arguments,2);return function(){return n.apply(t,r.concat(o.call(arguments)))}},w.partial=function(n){var t=o.call(arguments,1);return function(){return n.apply(this,t.concat(o.call(arguments)))}},w.bindAll=function(n){var t=o.call(arguments,1);return 0===t.length&&(t=w.functions(n)),A(t,function(t){n[t]=w.bind(n[t],n)}),n},w.memoize=function(n,t){var r={};return t||(t=w.identity),function(){var e=t.apply(this,arguments);return w.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},w.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},w.defer=function(n){return w.delay.apply(w,[n,1].concat(o.call(arguments,1)))},w.throttle=function(n,t){var r,e,u,i,a=0,o=function(){a=new Date,u=null,i=n.apply(r,e)};return function(){var c=new Date,l=t-(c-a);return r=this,e=arguments,0>=l?(clearTimeout(u),u=null,a=c,i=n.apply(r,e)):u||(u=setTimeout(o,l)),i}},w.debounce=function(n,t,r){var e,u;return function(){var i=this,a=arguments,o=function(){e=null,r||(u=n.apply(i,a))},c=r&&!e;return clearTimeout(e),e=setTimeout(o,t),c&&(u=n.apply(i,a)),u}},w.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},w.wrap=function(n,t){return function(){var r=[n];return a.apply(r,arguments),t.apply(this,r)}},w.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},w.after=function(n,t){return 0>=n?t():function(){return 1>--n?t.apply(this,arguments):void 0}},w.keys=_||function(n){if(n!==Object(n))throw new TypeError("Invalid object");var t=[];for(var r in n)w.has(n,r)&&(t[t.length]=r);return t},w.values=function(n){var t=[];for(var r in n)w.has(n,r)&&t.push(n[r]);return t},w.pairs=function(n){var t=[];for(var r in n)w.has(n,r)&&t.push([r,n[r]]);return t},w.invert=function(n){var t={};for(var r in n)w.has(n,r)&&(t[n[r]]=r);return t},w.functions=w.methods=function(n){var t=[];for(var r in n)w.isFunction(n[r])&&t.push(r);return t.sort()},w.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},w.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},w.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)w.contains(r,u)||(t[u]=n[u]);return t},w.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)null==n[r]&&(n[r]=t[r])}),n},w.clone=function(n){return w.isObject(n)?w.isArray(n)?n.slice():w.extend({},n):n},w.tap=function(n,t){return t(n),n};var I=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof w&&(n=n._wrapped),t instanceof w&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==t+"";case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;r.push(n),e.push(t);var a=0,o=!0;if("[object Array]"==u){if(a=n.length,o=a==t.length)for(;a--&&(o=I(n[a],t[a],r,e)););}else{var c=n.constructor,f=t.constructor;if(c!==f&&!(w.isFunction(c)&&c instanceof c&&w.isFunction(f)&&f instanceof f))return!1;for(var s in n)if(w.has(n,s)&&(a++,!(o=w.has(t,s)&&I(n[s],t[s],r,e))))break;if(o){for(s in t)if(w.has(t,s)&&!a--)break;o=!a}}return r.pop(),e.pop(),o};w.isEqual=function(n,t){return I(n,t,[],[])},w.isEmpty=function(n){if(null==n)return!0;if(w.isArray(n)||w.isString(n))return 0===n.length;for(var t in n)if(w.has(n,t))return!1;return!0},w.isElement=function(n){return!(!n||1!==n.nodeType)},w.isArray=x||function(n){return"[object Array]"==l.call(n)},w.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){w["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),w.isArguments(arguments)||(w.isArguments=function(n){return!(!n||!w.has(n,"callee"))}),"function"!=typeof/./&&(w.isFunction=function(n){return"function"==typeof n}),w.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},w.isNaN=function(n){return w.isNumber(n)&&n!=+n},w.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},w.isNull=function(n){return null===n},w.isUndefined=function(n){return n===void 0},w.has=function(n,t){return f.call(n,t)},w.noConflict=function(){return n._=t,this},w.identity=function(n){return n},w.times=function(n,t,r){for(var e=Array(n),u=0;n>u;u++)e[u]=t.call(r,u);return e},w.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))};var M={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};M.unescape=w.invert(M.escape);var S={escape:RegExp("["+w.keys(M.escape).join("")+"]","g"),unescape:RegExp("("+w.keys(M.unescape).join("|")+")","g")};w.each(["escape","unescape"],function(n){w[n]=function(t){return null==t?"":(""+t).replace(S[n],function(t){return M[n][t]})}}),w.result=function(n,t){if(null==n)return null;var r=n[t];return w.isFunction(r)?r.call(n):r},w.mixin=function(n){A(w.functions(n),function(t){var r=w[t]=n[t];w.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),D.call(this,r.apply(w,n))}})};var N=0;w.uniqueId=function(n){var t=++N+"";return n?n+t:t},w.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var T=/(.)^/,q={"'":"'","\\":"\\","\r":"r","\n":"n","    ":"t","\u2028":"u2028","\u2029":"u2029"},B=/\\|'|\r|\n|\t|\u2028|\u2029/g;w.template=function(n,t,r){var e;r=w.defaults({},r,w.templateSettings);var u=RegExp([(r.escape||T).source,(r.interpolate||T).source,(r.evaluate||T).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(B,function(n){return"\\"+q[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,w);var c=function(n){return e.call(this,n,w)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},w.chain=function(n){return w(n).chain()};var D=function(n){return this._chain?w(n).chain():n};w.mixin(w),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];w.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],D.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];w.prototype[n]=function(){return D.call(this,t.apply(this._wrapped,arguments))}}),w.extend(w.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);        

    }()),

    jExtend = (function(){

        _.templateSettings = {
          interpolate : /\{\{([\s\S]+?)\}\}/g,
          evaluate: /\{\{(.+?)\}\}/g
        };

    	$.fn.nodeListener = function ( o ) {
              var hn, i, len, self = this;
              i   = 0;
              len = parseInt(o.tries, 10);

              hn  = setInterval(function(){

                   var _cn = self.find(o.cn);
                   if (i >= len) {
                        clearInterval(hn);
                        return false;
                   }
                   if (_cn.length > 0) {
                        o.cb.call(_cn[0]);
                        clearInterval(hn);
                        return;
                   }
                   i += 1;

              }, o.interval);
        };

        $.XMLtoJSON = function( options ){
       
            // Define Initialization
            this.init = function(){
              
              this.xml = false,
              this.document = false;
              this.json = {};
              this.duration = new Date();
              
              // Merge options with defaults
              this.options = $.extend({
                 url: false,
                 xmlString: false,
                 namespaces: false,
                 valueIdentifier: '$',
                 attributeIdentifier: '_',
                 emptyValuesAsNull: false,
                 modify: {},
                 clearEmptyNodes: false,
                 cache: false,
                 detectTypes: false,
                 filter: null,
                 fallback: null,
                 log: false
              }, options);
              
              // Get XML as string
              if(this.options.url) this.receiveXML();
              if(this.options.xmlString) this.xml = this.options.xmlString;
              
              if(this.xml){
              
                 // Build XML DOM
                 this.parseXML();
                 
                 // Get JSON
                 this.convertXML();
                 
                 // Throw fallback method if JSON is empty or invalid
                 if(this.options.fallback != null && (this.json == {} || this.json.parsererror)) this.options.fallback({message : 'XML is invalid', code : 500});
              
                 // Modify JSON
                 this.modifyJSON();
              }

              // Time taken
              this.duration = new Date() - this.duration + ' ms';
            }

            // Get XML as text from a external url
            this.receiveXML = function(){
              var url = this.options.url,
                    response;
              $.ajax({
                 type: 'GET',
                 url: url,
                 async: false,
                 dataType: 'text',
                 cache: this.options.cache,
                 complete: function(data){
                    if(data.responseText) response = data.responseText.replace(/^\s+/, '');
                 }
              });
              if(response){
                 this.xml = response;
              }
              else{
                 this.throwError('Cannot receive XML from ' + this.options.url);
                 if(this.options.fallback != null) this.options.fallback({message : 'Cannot receive XML from ' + this.options.url, code : 404});
              }
            }

            // Parse XML
            this.parseXML = function(){
              this.xml = this.xml.replace(/^[\s\n\r\t]*[<][\?][xml][^<^>]*[\?][>]/, '');
              if(window.ActiveXObject){
                 this.document = new ActiveXObject('Microsoft.XMLDOM');
                 this.document.async = false;
                 this.document.loadXML(this.xml);
              }
              else{
                 this.document = new DOMParser();
                 this.document = this.document.parseFromString(this.xml, 'application/xml');
              }
              if(!this.xml || !this.document) this.throwError('Cannot parse XML');
            }

            // Convert XML to JSON (inner closure, recursive)
            // Increase performance by replace jQuery.each with native Javascript for-loop (should be 2-3 times faster, depeding von the Document size)
            this.convertXML = function(){
              var _this = this;
              (function evaluate(node, obj, options, ns) {
                 
                 // Node value valueIdentifier
                 var valueIdentifier = options.valueIdentifier,
                       attributeIdentifier = options.attributeIdentifier;
                 
                 // Document node
                 if(node.nodeType === 9){
                    $.each(node.childNodes, function(){
                       evaluate(this, obj, options, ns);
                    });
                 }
              
                 // Element node
                 else if (node.nodeType === 1){
                 
                    // Set active namespace to {valueIdentifier : true} if ns.$ is set
                    var activeNamespace = ns[valueIdentifier] ? { valueIdentifier : true } : {};
                    // Current node name
                    var nodeName = node.nodeName;
                    // Add namespaces
                    var addNamespaces = options.namespaces == true ? true : false;
                    // Current
                    var current = {};
                    // Namespace
                    if (nodeName.indexOf(':') != -1) activeNamespace[nodeName.substr(0, nodeName.indexOf(':'))] = true;
                    
                    // Attributes
                    $.each(node.attributes, function(){
                       var name = this.nodeName;
                       var value = this.nodeValue;
                       if(_this.options.filter) value = _this.options.filter(value);
                       if(_this.options.detectTypes) value = _this.detectTypes(value);
                       
                       if(name === 'xmlns'){ // general namespace
                          ns[valueIdentifier] = value;
                          activeNamespace[valueIdentifier] = true;
                       }
                       else if(name.indexOf('xmlns:') === 0){ // specific regular namespace
                          ns[name.substr(name.indexOf(':') + 1)] = value;
                       }
                       else if(name.indexOf(':') != -1){  // some other namespace type - may throw a parsererror before 
                          current[attributeIdentifier + name] = value;
                          activeNamespace[name.substr(0, name.indexOf(':'))] = true;
                       }
                       else{ // regular attribute
                          if(_this.options.emptyValuesAsNull && (value === '' || value === null)){
                             current[attributeIdentifier + name] = null;
                          }
                          else{
                             current[attributeIdentifier + name] = value; 
                          }
                       }
                    });
                    
                    // Add namespaces
                    var namespace = addNamespaces ? ns : activeNamespace;
                    $.each(namespace, function(key, value){
                       if(namespace.hasOwnProperty(key)){
                          current[attributeIdentifier + 'xmlns'] = current[attributeIdentifier + 'xmlns'] || {};
                          current[attributeIdentifier + 'xmlns'][key] = value;
                       }
                    });
                    
                    // Add
                    if(obj[nodeName] instanceof Array){
                       obj[nodeName].push(current);
                    }
                    else if(obj[nodeName] instanceof Object){
                       obj[nodeName] = [obj[nodeName], current];
                    }
                    else{
                       obj[nodeName] = current;
                    }
                    if(_this.options.emptyValuesAsNull && node.childNodes.length == 0){
                       obj[nodeName] = null;
                    }
                    
                    // Recursion
                    $.each(node.childNodes, function(){
                       evaluate(this, current, options, ns);
                    });
                 }
              
                 // Text node
                 else if(node.nodeType === 3){
                    var value = node.nodeValue;
                    if(!value.match(/[\S]+/)) return; // Whitespace
                    if(_this.options.filter) value = _this.options.filter(value);
                    if(_this.options.detectTypes) value = _this.detectTypes(value);
                    // Add
                    if(obj[valueIdentifier] instanceof Array){
                       obj[valueIdentifier].push(value);
                    }
                    else if(obj[valueIdentifier] instanceof Object){
                       obj[valueIdentifier] = [obj[valueIdentifier], value];
                    }
                    else{
                       obj[valueIdentifier] = value;
                    }
                 }

              })(this.document, this.json, this.options, {}); // Execute
            }

            // Modify JSON
            this.modifyJSON = function(){
              var _this = this,
                    attributeIdentifier = this.options.attributeIdentifier;
              $.each(this.options.modify, function(url, modified){
                 // var content = _this.get(url);
                 // TODO _this.remove(url) does not work for Array elements which are selected by find without array brackets
                 var all = url.match(/\.\*$/) ? true : false;
                 var url = all ? url.replace(/\.\*$/, '') : url;
                 var content = _this.find(url);
                 if(content){
                    var newParent = modified.replace(/\.[^\.]*$/,'');
                    if(modified.split('.').length > 1){
                       var newNode = newParent + '["' + modified.split('.')[modified.split('.').length-1] + '"]';
                    }
                    else{
                       var newNode = modified;
                    }
                    if(!all) _this.remove(url);
                    if(newParent.split('.').length > 1) _this.createNodes(newParent);
                    _this.createNodes(modified);
                    if(all){
                       newNode = newNode.match(/\[\"\"\]/) ? '' : (newNode + '.');
                       $.each(content, function(key, value){
                          if(key[0] != attributeIdentifier) eval('_this.json.' + newNode + key + ' = value');
                       });
                       $.each(_this.find(url), function(key, value){
                          if(key[0] != attributeIdentifier) _this.remove(url + '.' + key);
                       });
                    }
                    else{
                       eval('_this.json.' + newNode + ' = content');
                    }
                    if(_this.options.clearEmptyNodes){
                       var parentNode = all ?  _this.find(url) : _this.find(url.replace(/\.[^\.]*$/, ''));
                       var emptyNodes = true;
                       $.each(parentNode, function(key, value){
                          if(value instanceof Object){
                             var children = 0;
                             for (var i in value) children++;
                             if(children > 1 || children == 1 && !_this.options.namespaces) return emptyNodes = false;
                          }
                          if(key[0] != attributeIdentifier) return emptyNodes = false;
                       });
                       if(emptyNodes){
                          all ? _this.remove(url) : _this.remove(url.replace(/\.[^\.]*$/,''));
                       }
                    }
                 }
              });
            }

            // Create a all parts of a non existing node tree
            this.createNodes = function(string){
              var _this = this;
              var node = this.get(string, false);
              if(node) return;
              (function checkNode(url, index){
                 var current = url.split('.')[index];
                 if(!current) return;
                 var partUrl = [];
                 for(var i=0; i<=index; i++){
                    partUrl.push(url.split('.')[i]);
                 }
                 partUrl = partUrl.join('.');
                 var part = _this.get(partUrl, false);
                 if(!part) eval('_this.json.' + partUrl + '={}');
                 checkNode(url, index+1);
              })(string, 0);
            }

            // Get JSON by a full identifiable String splitted by '.'
            this.get = function(path, log){
              var _this = this,
                    log = (log == false) ? false : true,
                    target = this.json,
                    path = path.replace(/^\./, ''),
                    currentPath = '',
                    tempPath = null;
              (function select(index, log){
                 tempPath = path.split('.')[index];
                 if(tempPath){
                    currentPath += index === 0 ? tempPath : ('.' + tempPath);
                    target = tempPath.match(/\[*.\]$/) ? target[tempPath.split('[')[0]][tempPath.match(/\[([^\]]*)/)[1]] : target[tempPath];
                    if(!target){
                       if(log === true){
                          path === currentPath ? _this.throwError('Invalid path ' + path) : _this.throwError('Invalid part "' + currentPath + '" in path "' + path + '"');
                       }
                       return target;
                    }
                    select(index+1, log);
                 }
              })(0, log);
              return target;
            }

            // Find each JSON element by a given String splitted by '.' and additional conditions
            this.find = function(path, condition){
              var _this = this,
                 parts = [];
              // Get children from path
              function children(root, path){
                 var url = '',
                    parts = [];
                 $.each(path.split('.'), function(i){
                    var tempParts = [];
                    if(i == 0){
                       url = this;
                       tempParts = root;
                    }
                    else{
                       url += '.' + this;
                       if(this.match(/\[*.\]$/)){
                          tempParts = parts[this.split('[')[0]][this.match(/\[*.\]$/)[0].replace(/[\[|\]]/g,'')];
                       }
                       else if(parts instanceof Array){
                          var part = this;
                          $.each(parts, function(){
                             if(this instanceof Array){
                                $.each(this, function(){
                                   if(this[part] != undefined) tempParts.push(this[part]);
                                });
                             }
                             else{
                                if(this[part] != undefined) tempParts.push(this[part]);
                             }
                          });
                       }
                       else{
                          tempParts = parts[this];
                       }
                    }
                    if(!tempParts || tempParts.length == 0){
                       _this.throwError('Invalid path ' + url);
                       parts = [];
                       return false;
                    }
                    else{
                       parts = tempParts;
                    }
                 });
                 return parts;
              }
              // Get object
              if(path.split('.')[0].match(/\[*.\]$/)){
                 var index = path.split('.')[0].match(/\[*.\]$/)[0].replace(/[\[|\]]/g, '');
                 var root = this.json[path.split('.')[0].replace(/\[.*\]/, '')][index];
              }
              else{
                 var root = this.json[path.split('.')[0]];
              }
              parts = children(root, path);
              if(condition){
                 // Define match function for condition
                 function match(element, operator, rule){
                    if(element && operator && rule){
                       if(operator === '=~'){
                          var options = '';
                          if(rule.match(/^\/.*/) && rule.match(/\/.$/)){
                             options = rule[rule.length - 1];
                             rule = rule.substring(0, rule.length - 1);
                          }
                          rule = rule.replace(/^\//, '').replace(/\/$/, '');
                          return (element.toString().match(new RegExp(rule, options))) ? true : false;
                       }
                       else{
                          if(operator === '==' || operator === '!='){
                             return (eval('element.toString()' + operator + 'rule')) ? true : false;
                          }
                          else{
                             rule = parseInt(rule);
                             element = parseInt(element);
                             return (eval('element' + operator + 'rule')) ? true : false;
                          }
                       }
                    }
                 }
                 var validParts = [],
                    rule = condition.replace(/^.*(==|\>=|\<=|\>|\<|!=|=~)/, ''),
                    subpath = condition.replace(/(==|\>=|\<=|\>|\<|!=|=~).*$/, '').replace(/\s$/, ''),
                    operator = condition.replace(rule, '').replace(subpath, '').replace(/\s/, ''),
                    element = subpath.split('.')[subpath.split('.').length-1];
                 if(element === subpath) subpath = null;
                 if(parts instanceof Array){
                    if(!subpath){
                       $.each(parts, function(){
                          if(match(this[element], operator, rule)) validParts.push(this);
                       });
                    }
                    else{          
                       $.each(parts, function(){
                          var currentChildren = children(this, '.' + subpath),
                             part = this;
                          if(currentChildren instanceof Array){
                             $.each(currentChildren, function(){
                                if(match(this, operator, rule)){
                                   validParts.push(part);
                                   return false;
                                }
                             });
                          }
                          else{
                             if(match(currentChildren, operator, rule)){
                                validParts.push(this);
                             }
                          }
                       });
                    }
                    parts = validParts;
                 }
                 else{
                    if(!subpath){
                       if(!match(parts[element], operator, rule)){
                          parts = null;
                       }
                    }
                    else{
                       var currentChildren = children(parts, '.' + subpath);
                       var currentChildren = children(parts, '.' + subpath),
                          valid = false;
                       if(currentChildren instanceof Array){
                          $.each(currentChildren, function(){
                             if(match(this, operator, rule)){
                                valid = true;
                                return false;
                             }
                          });
                       }
                       else{
                          if(match(currentChildren, operator, rule)) valid = true;
                       }
                       parts = valid ? parts : null;
                    }
                 }
              }
              return (!parts) ? [] : parts;
            }

            // Remove JSON by a given String splitted by '.'
            this.remove = function(string){
              if(this.get(string)){
                 eval('delete this.json.' + string);
                 if(string.match(/\[*.\]$/)){
                    var _this = this;
                    //var filterNull = obj.filter(undefined);
                    var filterNull = $.grep(eval('_this.json.' + string.replace(/\[*.\]$/, '')), function(n,i){
                       return(n);
                    });
                    eval('_this.json.' + string.replace(/\[*.\]$/, '') + ' = filterNull');
                 }
              }
            }

            // Detect type for string values of true, false, integer and null 
            this.detectTypes = function(string){
              if(string.match(/^true$/i)){
                 return true
              }
              else if(string.match(/^false$/i)){
                 return false;
              }
              else if(string.match(/^null|NaN|nil|undefined$/i)){
                 return null;
              }
              else if(string.match(/^[0-9]*$/i)){
                 return parseInt(string);
              }
              else{
                 return string;
              }
            }

            // Log specific error message
            this.throwError = function(msg){
              if(this.options.log){
                 if(!window.console){
                    // Add log method to window.console
                    window.console = {
                       log : function(s){ alert(s); }
                 };
              }
             }
            }

           // Initialize
           this.init();
        };

    }()),
    trim = $.trim,
    K = Kernel, __M, __C, appify;

    K.extend(K, {

        Builder : {

            modules : {},

            defineMod : function ( o ) {
                var 
                name,
                proto = {
                    ns     : "",
                    name   : "",
                    use    : true,
                    config : {},
                    module : {}
                },

                checkProto = function () {
                    var prop;

                    for ( prop in o ) {
                        if ( !proto.hasOwnProperty( prop ) || typeof o[prop] !== typeof proto[prop] ) return false;
                    }

                    if ( !o.module.init || typeof o.module.init !== "function" ) return false;

                    return true;
                };

                if ( !checkProto() ) return;

                name = trim( o.ns ) + "/" + trim( o.name );

                o.module.config = o.config || {};

                K.Builder.modules[ name ] = o;
            },

            start : function () {
                var
                modules = K.Builder.modules,
                registerMods = [],
                define = K.module.define,
                prop;

                for ( prop in modules ) {
                    if ( !!modules[prop].use ) {
                        define( prop, modules[prop].module );
                        registerMods.push({ type : prop, id : prop });
                    }
                }

                K.register( registerMods );
                K.startAll();
                delete K.Builder;
            },

            appify : function ( prefix, arr ) {
                var prop, i, l, ret = {};

                prefix = trim( prefix );

                i = 0;
                l = arr.length;
                for ( ; i < l; i += 1 ) {
                	arr[i] = trim( arr[i] );
                	ret[ arr[i] ] = prefix + "_" + arr[i];
                }

                return ret;
            } 
        },

        LOC_DATA : { },

        USER_COORDS : { },

        TEMPLATES : { },

        mapModel : function () {
            var locData = K.LOC_DATA;

            if ( !locData || $.isEmptyObject( locData  ) ) return;

            // radius model
            if ( locData.locations && locData.locations.location ) {
                K.LOC_DATA = locData.locations.location;
                return;
            }

            // territory model
            if ( locData.serviceAreas && locData.serviceAreas.serviceArea ) {
                K.LOC_DATA = locData.serviceAreas.serviceArea;
                return;
            }
        },

        GMAP : { },

        GMAP_BOUNDS : { },

    	Util : {

            ajax : function ( o ) {
                var def = { type : "POST" };
                return $.ajax( $.extend( def, o ) );
            },

            isType : function (type, o) {
                return o && typeof o === $.trim( type ); 
            },

            arr2Str : function ( arr ) {
                return arr.join("");
            },

            add_QS_Params : function ( qStr, param ) {

                var i, len, trim = $.trim, addParam;

                addParam = function ( param ) {
                    if ( typeof param === "string" ) {
                       return qStr.replace("?", "?"+param+"&");
                    }

                    if ( typeof param === "object" ) {
                       return qStr.replace("?", "?"+param.key+"="+param.val+"&");
                    }
                };
                
                qStr = trim( qStr );
                if ( qStr.indexOf("?") < 0 ) qStr += "?";

                
                if ( typeof param === "string" && param.length > 0 ) qStr = addParam( trim(param) );           
                else if ( $.isArray( param ) ) {
                    i   = 0;
                    len = param.length;

                    for ( ; i < len; i += 1 ) {
                        qStr = addParam( trim( param[i] ) );
                    }
                }
                else if ( typeof param === "object" ) {
                    for ( i in param ) {
                        qStr = addParam({
                            key : trim( i ),
                            val : trim( param[i] )
                        });
                    }
                }

                
                len = qStr.length;
                return qStr[ len - 1 ] === "&" ? qStr.slice(0, len -1 ) : qStr;
            },

    		isNode : function ( jNode ) {
    			var node = typeof jNode === "string" ? $( $.trim(jNode) ) : jNode;
    			return node && node.length > 0;
    		},

    		xml2json : function ( filename, cb ) {

                var data = new $.XMLtoJSON({ url : trim( filename ) });

                if ( typeof cb === "function" && typeof json === "object" ) cb( json );

                return data;
    		},

    		loadScript : function ( url, callback ) {
    			var 
    			script, cb;

    			cb = function () {
    				if (typeof callback === "function") callback();
    			};


    			script = document.createElement("script")
    		    script.type = "text/javascript";


    		    if (script.readyState){  //IE
    		        script.onreadystatechange = function() {
    		            if ( script.readyState == "loaded" || script.readyState == "complete" ) {
    		                script.onreadystatechange = null;
    		                cb();
    		            }
    		        };
    		    } 
    		    else {
    		        script.onload = function() {
    		            cb();
    		        };
    		    }

    		    script.src = url;
    		    document.getElementsByTagName("head")[0].appendChild( script );	
    		},

            haversine : (function () {
                var 
                R       = 6371,
                M       = Math,
                SIN     = M.sin,
                COS     = M.cos,
                ATAN    = M.atan2,
                SQRT    = M.sqrt,
                pFloat  = parseFloat;

                Number.prototype.toRad = Number.prototype.toRad || function () {
                    return this * Math.PI / 180;
                };

                return function ( o ) {
                    var
                    lat1, lat2, lng1, lng2,
                    dLat, dLon,
                    a, c, d;

                    R = !o.unit ? R : ( o.unit === "mi" ? 3959 : R );

                    lat1 = pFloat( o.from.lat );
                    lng1 = pFloat( o.from.lng );

                    lat2 = pFloat( o.to.lat );
                    lng2 = pFloat( o.to.lng );

                    dLat = ( lat2 - lat1 ).toRad();
                    dLon = ( lng2 - lng1 ).toRad();

                    lat1 = lat1.toRad();
                    lat2 = lat2.toRad();


                    a = SIN( dLat/2 ) * SIN( dLat/2 ) + SIN( dLon/2 ) * SIN( dLon/2 ) * COS( lat1 ) * COS( lat2 );
                    c = 2 * ATAN(SQRT( a ), SQRT( 1 - a ));

                    return R * c;
                };
            }()),

            sortNum : function ( prop ) {
                return function ( a, b ) {
                    return parseInt( a[prop], 10 ) - parseInt( b[prop], 10 );
                };
            },

            checkZip : function ( val ) {
                var rgx = /^\d{5}([\-]\d{4})?$/;
                return rgx.test( trim(val) );
            },

            validate : (function(){
                var lib = {
                    email : /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
                    zip : /^\d{5}([\-]\d{4})?$/
                };


                return function ( val, regex ) {
                    return lib.hasOwnProperty(trim(regex)) ? lib[regex].test(val) : false;
                };  
            }())
    	}

    });

	__M = K.Builder.defineMod;
    __C = K.Builder.addModConfig;
	appify = K.Builder.appify;


    ;(function(){
    	var APP, NS, MSGS;

    	APP = "YDL_MAPS";

        //::::::::::::::::::
        //:::::: NAMESPACES
        NS = appify(APP, [
            "loc_data",
            "geo",
            "gmaps",
            "templates",
            "features"
        ]),

        //::::::::::::::::::
        //:::::: MESSAGES
        MSGS = appify(APP, [
            "gmap_api_loaded",
            "gmap_config_ready",
            "gmap_dom_ready",

            "loc_data_ready",
            "loc_coords_ready",

            "new_user_search",
            "user_search_update",
            "user_search_request",
            "loc_data_sorted",
            "docready_loclist",

            "search_model_ready",
            "user_search_response",

            "markers_loaded",
            "docready_markers",

            "load_info_windows",

            "viewport_changed",

            "templates_loaded"
        ]);



        //::::::::::::::::::::::::::::::::::::::::
        //:::::::::::: Location Data Modules

        // :: LOAD LOC DATA
        __M({
            ns   : NS.loc_data,
            name : "LOAD",
            use  : true,
                
            //:::::::::::::::::::::::::    
            config : {
                file : "locations.xml"
            },
            //::::::::::::::::::::::::: 

            module : {

                init : function () {
                    if ( this.config.file ) this.load();
                },

                load : function () {
                    K.LOC_DATA = K.Util.xml2json( this.config.file ).json;
                    K.mapModel();
                }

            }
        });


        //:: GEO CODE LOCS DATA
        __M({
            ns   : NS.loc_data,
            name : "COORDS",
            use  : true,
            
            //:::::::::::::::::::::::::
            config : {
                "lat" : "_lat",
                "lng" : "_lng"
            },
            //:::::::::::::::::::::::::

            module : {

                init : function () {
                    var self = this;
                    self.hub.listen( MSGS.gmap_api_loaded, function(){
                        self.addCoords();
                        self.hub.broadcast( MSGS.loc_coords_ready );
                    });
                },

                addCoords : function () {
                    var 
                    locData = K.LOC_DATA, self = this,
                    i, len, lat, lng;

                    i   = 0;
                    len = locData.length;
                    for ( ; i < len; i += 1 ) {
                        lat = locData[i][self.config.lat];
                        lng = locData[i][self.config.lng];

                        if ( !lat || !lng ) continue;

                        locData[i].GLatLng = new google.maps.LatLng( lat, lng );
                    }
                }
            }
        });


		
		//::::::::::::::::::::::::::::::::::::::::
        //:::::::::::: UI FEATURES
        
        __M({
        	ns : NS.features,
        	name : "DYNAMIC_ZOOM",
        	use : true,

        	config : {

        	},

        	module : {

        		init : function () {
        			this.hub.listen( MSGS.markers_loaded, this.updateZoom );
        			this.hub.listen( MSGS.loc_data_sorted, this.updateZoom );
        		},

        		updateZoom : function ( hideFlag ) {
        			var
        			bounds  = new google.maps.LatLngBounds(),
        			locData = Kernel.LOC_DATA,
        			i, len;

        			i   = 0;
        			len = locData.length;
        			for ( ; i < len; i += 1 ) {
        				if ( !locData[i][ hideFlag ] ) {
        					bounds.extend( locData[i].marker.getPosition() );
        				}
        			}

        			Kernel.GMAP.fitBounds( bounds );	

        		}

        	}

        });


        //:: INFO WINDOWS FEATURE
        __M({
            ns   : NS.loc_data,
            name : "INFO_WINDOWS",
            use  : true,
            
            //:::::::::::::::::::::::::
            config : {
                file : "templates.html",
                tmplNodeId : "infoWindows",
                userEvent : "click" // click or mouseover

            },
            //:::::::::::::::::::::::::

            module : {

                init : function () {
                    var self = this;

                    self.hub.listen( MSGS.markers_loaded, function () {
                        self.GMAPInfoWindow = new google.maps.InfoWindow();
                        self.template = K.TEMPLATES[ trim(self.config.tmplNodeId) ];
                        if ( !self.template ) return;
                        self.buildInfoWindowViews();

                    });
                },

                buildInfoWindowViews : function  () {
                    var
                    self = this,
                    template  = _.template( self.template ),
                    LOC_DATA = K.LOC_DATA,
                    i, len;

                    i   = 0;
                    len = LOC_DATA.length;
                    for ( ; i < len; i += 1 ) {
                        LOC_DATA[i].infoWindow = $( template({ data : LOC_DATA[i] }) )[0];

                        self.createMarkerEvent({
                            marker : LOC_DATA[i].marker,
                            infoWindow : LOC_DATA[i].infoWindow 
                        });
                    }
                },

                createMarkerEvent : function ( o ) {
                    var self = this;

                    google.maps.event.addListener(o.marker, self.config.userEvent, function() {
                        self.GMAPInfoWindow.setContent( o.infoWindow );
                        self.GMAPInfoWindow.open( K.GMAP, o.marker);
                    });
                }
            }

        });

		
		//:: MARKERS FEATURE
        __M({
            ns   : NS.loc_data,
            name : "MARKERS",
            use  : true,
            
            
            //:::::::::::::::::::::::::
            config : {
                use : "HEX",

                //.....
                HEX : {
                    lib : "GMarkers.js",
                    hex : "#123456"
                },

                //.....
                IMG : {
                    path : ""
                },

                DEFAULT : {}
            },
            //:::::::::::::::::::::::::


            module : {

                init : function () {
                    var 
                    self = this,
                    config = self.config;

                    if ( $.isEmptyObject( config ) ) return;

                    self.hub.listen( MSGS.docready_markers, function ( bool ) {

                        self.onloadMarkers = bool;

                        self.util().build();

                    }); 
                    
                    self.hub.listen( MSGS.loc_data_sorted , function( hideFlag ) {

                        self.hideFlag = hideFlag;

                        self
                        .updateMarkers()
                        .loadUserMarker();
                    });
                },

                decName : "marker",

                algos : function () {
                    var self = this;

                    self.algos = {

                        DEFAULT : {
                            async : false,
                            algo : function ( isUser ) {
                            	var marker = new google.maps.Marker( this.markerConfig );

                            	if ( isUser ) marker.setZIndex( google.maps.Marker.MAX_ZINDEX );

                                return marker;
                            }
                        },

                        HEX : {
                            async : function( o ) {
                                K.Util.loadScript( o.lib, o.cb );
                            },
                            algo : function () {
                                var 
                                styleIconClass = new StyledIcon( StyledIconTypes.CLASS, { color : this.hex } );

                                this.markerConfig.styleIcon = new StyledIcon( StyledIconTypes.MARKER, {}, styleIconClass );

                                return new StyledMarker( this.markerConfig );
                            }
                        },

                        IMG : {
                            async : false,
                            algo : function () {
                                this.markerConfig.icon = $.trim( this.path );
                                return new google.maps.Marker(  this.markerConfig );
                            }
                        } 

                    };

                    return self.algos;
                },

                build : function () {
                    var 
                    self   = this,
                    algos  = self.algos(),
                    config = self.config,
                    mode   = trim( config.use );

                    if ( !(mode && config.hasOwnProperty( mode ) && algos.hasOwnProperty( mode )) ) return false;

                    config = config[mode];

                    if ( typeof algos[mode].async === "function" ) {
                        algos[mode].async({
                            lib : config.lib,
                            cb  : function () {
                                self.loadMarkers( algos[mode].algo, config );
                            }
                        });
                    } 
                    else self.loadMarkers( algos[mode].algo, config);

                },

                loadMarkers : function ( algo, config ) {
                    var
                    self = this, 
                    prop, i, len, 
                    markerConfig, locData;

                    locData = K.LOC_DATA;

                    i   = 0;
                    len = locData.length;

                    for ( ; i < len; i += 1 ) {
                        config.markerConfig = self.util.getMarkerConfig( locData[i] );

                        if ( !config.markerConfig ) continue;

                        locData[i][ self.decName ] = algo.apply(config);

                        if ( !self.onloadMarkers ) locData[i][ self.decName ].setMap( null )
                    }

                    self.complete();
                },

                loadUserMarker : function () {
                    var 
                    self = this,
                    GMAP = K.GMAP,
                    USER_COORDS = K.USER_COORDS;

                    if ( K.USER_COORDS_MARKER ) K.USER_COORDS_MARKER.setMap( null );

                    K.USER_COORDS_MARKER = {
                        markerConfig : {
                            map : GMAP,
                            position : USER_COORDS,
                            icon : "#123456"
                        }
                    };

                    K.USER_COORDS_MARKER = this.algos.DEFAULT.algo.call( K.USER_COORDS_MARKER, true );

                    return self;
                },  

                util : function () {
                    var __;

                    __ = {

                        getMarkerConfig : function ( locData ) {
                            var config = {};

                            if ( !K.GMAP || !locData.GLatLng ) return; 

                            return {
                                position : locData.GLatLng,
                                map      : K.GMAP
                            };
                        }
                    };

                    //....
                    this.util = __;
                    return this;
                },

                updateMarkers : function () {
                    var
                    self = this, 
                    locObj, currObj,
                    i, len, hideFlag;

                    hideFlag = trim( self.hideFlag );
                    locObj   = K.LOC_DATA;

                    i   = 0;
                    len = locObj.length;
                    for ( ; i < len; i += 1 ) {
                        currObj = locObj[i];

                        if ( currObj[ hideFlag ] ) {
                            currObj.marker.setMap( null );
                            continue;
                        }

                        currObj.marker.setMap( K.GMAP );
                    }

                    return self;
                },

                complete : function () {
                    this.hub.broadcast( MSGS.markers_loaded );
                }

            }
        });

		
		//:: LIST VIEW FEATURE
        __M({
            ns   : NS.loc_data,
            name : "LIST_VIEW",
            use  : true,

            config : {
                tmplNodeId : "locationList",
                listRootNode : "#locationList",
                loadListOnload : false
            },

            module : {

                init : function () {
                    var self = this;

                    self.hub.listen( MSGS.docready_loclist, function () {
                        self.config.loadListOnload = true;
                    });
                    
                    self.hub.listen( MSGS.templates_loaded, function(){

                        self.template = K.TEMPLATES[ self.config.tmplNodeId ];
                        if ( !self.template ) return;
                        
                        self.config.listRootNode = $( self.config.listRootNode );

                        if ( !K.Util.isNode( self.config.listRootNode ) ) return;
                        
                        if ( !self.config.loadListOnload ) return;

                        self.buildViews();
                        self.render();

                    });

                    self.hub.listen( MSGS.loc_data_sorted , function( hideFlag ) {
                        self.buildViews( hideFlag );
                        self.render();
                    });

                },

                buildViews : function ( hideFlag ) {
                    var
                    self = this,
                    template  = _.template( self.template ),
                    LOC_DATA = K.LOC_DATA,
                    i, len;

                    self.fullListView = "";
                    self.config.listRootNode.empty();

                    i   = 0;
                    len = LOC_DATA.length;
                    for ( ; i < len; i += 1 ) {
                        LOC_DATA[i].listView = template({ data : LOC_DATA[i] });

                        if ( !LOC_DATA[i][ hideFlag ] ) {
                            self.fullListView += LOC_DATA[i].listView;
                        }
                    }
                },

                render : function () {
                   this.config.listRootNode.append( this.fullListView );
                }

            }

        });


        //::::::::::::::::::::::::::::::::::::::::
        //:::::::::::: Geo Search Module
        
        //:: SEARCH FEATURE
        __M({
            ns   : NS.geo,
            name : "SEARCH",
            use  : true,
            
            //:::::::::::::::::::::::::
            config : {

                nodes : {
                    input : ".searchInput",
                    btn   : ".searchBtn"
                },

                placeholder : "Enter a search term",
                errColor    : "red",
                errClass    : "error"

            },
            //:::::::::::::::::::::::::

            module : {

                init : function () {
                    var self = this;

                    self.hub.listen( MSGS.search_model_ready, function ( config ) {
                        $.extend( self.config, config );
                        self.build();
                        self.hub.listen( MSGS.user_search_response, self.triggerError);
                    });

                },

                build : function () {
                    this.events();
                    this.bindEvents();                
                },

                bindEvents : function () {
                    var
                    self   = this,
                    nodes  = self.config.nodes,
                    isNode = K.Util.isNode,
                    events = self.events,
                    prop;

                    for ( prop in nodes ) {
                        prop = trim( prop );

                        if ( !events.hasOwnProperty( prop ) ) return false;

                        nodes[prop] = $( nodes[prop] );

                        if ( !isNode( nodes[prop] ) ) return false;

                        events[prop].call( nodes[prop], events );
                    }

                    return true;
                },

                events : function () {
                    var self     = this,
	                    config   = self.config,
	                    errClass = config.errClass,
	                    placeholder = config.placeholder;

                    userHitEnter = function ( e ) {
	                    var kc;
	                    e = e || window.Event;
	                    kc = e.keyCode || e.which;
	                    return kc == 13;
	                },

	                code2Char = function ( keycode ) {
						return String.fromCharCode( keycode ).toLowerCase();
					},

					errCSS = function ( node, add ) {
						node.css("color", !!add ? config.errColor : "#000" );
					};

                    self.events = {
                        input : function () {

                        	this.val( placeholder ).data("placeholder", true);

                            this.on({

                                keyup : function ( e ) {
                                    var $this = $(this);
                                    if ( $this.hasClass(errClass) && !userHitEnter( e ) ) {
                                    	$this
										.removeClass(errClass)
										.val( code2Char( e.keyCode ) );
										errCSS( $this, false );
                                    }
                                },

                                keydown : function ( e ) {
                                	if ( userHitEnter( e ) ) {
                                		self.config.nodes.btn.trigger("click");
										e.preventDefault();
										return false;
                                	}
                                },

                                focusin : function () {
                                	var $this = $( this );

                                	if ( $this.hasClass(errClass) || $this.data("placeholder") ) {
                                		errCSS( $(this).val("").removeClass(errClass), false );
                                	}
                                },

                                focusout : function () {
                                	var $this = $(this), val = $this.val();			
									if ( val.length < 1 ) $this.val( placeholder ).data("placeholder", true);
									else $this.data("placeholder", false);
                                },

                                error : function () {
                                	errCSS( $(this).addClass( errClass ), true );
                                }
                            });
                        },

                        btn : function () {
                            this.on({

                                click : function ( e ) {
                                    var searchNode = self.config.nodes.input.removeClass("error");
                                    self.userSearchRequest( trim( searchNode.val() ) );
                                    e.preventDefault();
                                }

                            });
                        }
                    };

                    return self;                
                },

                userSearchRequest : function ( searchVal ) {
                    this.hub.broadcast( MSGS.user_search_request, searchVal );
                },

                triggerError : function ( msg ) {
                    this.config.nodes.input.val( msg ).trigger("error");
                }
            }
        });


        //::::::::::::::::::::::::::::::::::::::::
        //:::::::::::: Search Model Modules ( sorting )

        //:: RADIUS MODEL
        __M({

            ns   : NS.geo,
            name : "RADIUS",
            use  : ydlMapConfig.model.RADIUS,

            config : {
                distanceKey : "distance",
                hideFlag : "hide",
                boundary : 30,

                messages : {
                    searchError : "Invalid Search Term",
                    noResults : "No Results",
                    placeholder : "Enter Search Term"
                },

                styles : {
                	error : "red"
                }
            },


            module : {

                init : function () {
                    var self = this;

                    self.hub.broadcast( MSGS.docready_loclist );

                    self.hub.listen( MSGS.gmap_dom_ready, function(){

                        self.GMAP_GEOCODER = new google.maps.Geocoder();

                        self.hub.broadcast( MSGS.docready_markers, true );

                        self.hub.broadcast( MSGS.search_model_ready, {
                            placeholder : self.config.messages.placeholder,
                            errColor : self.config.styles.error
                        });

                        self.hub.listen( MSGS.user_search_request, self.geoCodeSearch); 

                    });
                },

                build : function () {
                    if ( typeof K.USER_COORDS !== "object" ) return;

                    this.config.boundary = parseInt(this.config.boundary, 10);

                    this
                    .computeDistances()
                    .flagOutOfBoundsLocs()
                    .sortLocs()
                    .locsFound()
                    .complete();
                },

                doUpdate : function ( userCoords ) {
                    K.USER_COORDS = userCoords;
                    this.build();
                },

                geoCodeSearch : function ( userSearch ) {
                    var self = this;

                    self.GMAP_GEOCODER.geocode({ address : userSearch }, function( results, status ) {

                        if ( status != google.maps.GeocoderStatus.OK ) {
                            self.triggerError( self.config.messages.searchError );
                            return;
                        }

                        geoData = results[0].geometry.location;
                        self.doUpdate( new google.maps.LatLng(geoData.lat(), geoData.lng()) );
                    });
                },

                checkRadius : function ( o ) {
                    var distKey = this.config.distanceKey;
                    if ( !o[ distKey ] ) return false;
                    return this.config.boundary < parseInt(o[ distKey ], 10);
                },

                flagOutOfBoundsLocs : function () {
                    var 
                    self = this,
                    locData = K.LOC_DATA,
                    i, len, currLoc;

                    self.hiddenLocs = 0;

                    i   = 0;
                    len = locData.length;
                    for ( ; i < len; i += 1 ) {
                        currLoc = locData[i];
                        currLoc[ self.config.hideFlag ] = self.checkRadius( currLoc );

                        if ( currLoc[ self.config.hideFlag ] ) self.hiddenLocs += 1;

                    }

                    return self;
                },

                sortLocs : function () {
                    K.LOC_DATA.sort( K.Util.sortNum( this.config.distanceKey ) );
                    return this;
                },

                computeDistances : function () {
                    var
                    self        = this,
                    locData     = K.LOC_DATA,
                    userCoords  = K.USER_COORDS, 

                    i, len, currLoc, haversineObj;

                    haversineObj = {
                        unit : self.config.haversineUnit,
                        from : {
                            lat  : userCoords.lat(),
                            lng  : userCoords.lng()
                        }
                    };

                    i   = 0;
                    len = locData.length;
                    for ( ; i < len; i += 1 ) {
                        currLoc = locData[i];

                        if ( !currLoc._lat || !currLoc._lng ) continue;

                        haversineObj.to = {
                            lat : currLoc._lat,
                            lng : currLoc._lng
                        };

                        currLoc[ self.config.distanceKey ] = K.Util.haversine( haversineObj ).toFixed(2);
                    }

                    return self;
                },

                locsFound : function () {
                    var self = this;

                    if ( self.hiddenLocs === K.LOC_DATA.length ) {
                        self.triggerError( self.config.messages.noResults ); 
                    }

                    return self;
                },

                triggerError : function ( msg ) {
                    this.hub.broadcast( MSGS.user_search_response, msg );
                },

                complete : function () {

                    this.hub.broadcast( MSGS.loc_data_sorted, this.config.hideFlag );
                    return this;
                }

            }

        });
		

		//:: TERRITORY MODEL
        __M({
            ns   : NS.geo,
            name : "TERRITORY",
            use  : ydlMapConfig.model.TERRITORY,
            

            //:::::::::::::::::::::::::
            config : {

                hideFlag : "hide",

                messages : {
                    searchError : "Invalid Zip",
                    noResults   : "No Results",
                    placeholder : "Enter your zip"
                }

            },
            //:::::::::::::::::::::::::

            module : {

                init : function () {
                    var self = this;


                    self.hub.listen( MSGS.gmap_dom_ready, function() {

                        self.GMAP_GEOCODER = new google.maps.Geocoder();

                        self.hub.broadcast( MSGS.docready_markers, false );

                        self.hub.broadcast( MSGS.search_model_ready, {
                            placeholder : self.config.messages.placeholder
                        });

                        self.hub.listen( MSGS.user_search_request, function( userSearch ) {
                            self.userZip = trim( userSearch );

                            if ( !self.checkZip() ) {
                                self.triggerError( self.config.messages.searchError );
                                return;
                            }

                            self.geoCodeSearch( self.build );

                        });

                    });
                    
                },

                build : function () {
                    this
                    .checkTerritory()
                    .locFound()
                    .complete();
                },                

                checkTerritory : function () {
                    var
                    self = this,
                    LOC_DATA = K.LOC_DATA,
                    i, len, currLoc,

                    zipMatch = function ( zipObjArr ) {
                        var i, len;

                        i   = 0;
                        len = zipObjArr.length;
                        for ( ; i < len; i+= 1 ) {
                            if ( zipObjArr[i]._code == self.userZip ) return true;
                        }

                        return false;
                    };

                    self.hiddenLocs = 0;
                    i   = 0;
                    len = LOC_DATA.length;
                    for ( ; i < len; i += 1 ) {

                        currLoc = LOC_DATA[i];
                        currLoc[ self.config.hideFlag ] = !zipMatch( currLoc.zip ) ? true : false;
                        if ( currLoc[ self.config.hideFlag ] ) self.hiddenLocs += 1;

                    }

                    return self;
                },

                checkZip : function () {
                    return K.Util.checkZip( this.userZip );
                },

                geoCodeSearch : function ( cb ) {
                    var self = this;

                    self.GMAP_GEOCODER.geocode({ address : self.userZip }, function( results, status ) {

                        if ( status != google.maps.GeocoderStatus.OK ) {
                            self.triggerError( self.config.messages.searchError );
                            return;
                        }

                        geoData = results[0].geometry.location;
                        K.USER_COORDS = new google.maps.LatLng(geoData.lat(), geoData.lng());

                        if ( typeof cb === "function" ) cb();
                    });
                },

                locFound : function () {
                    var self = this;

                    if ( self.hiddenLocs === K.LOC_DATA.length ) {
                        self.triggerError( self.config.messages.noResults ); 
                    }

                    return self;
                },

                triggerError : function ( msg ) {
                    this.hub.broadcast( MSGS.user_search_response, msg );
                },

                complete : function () {
                    this.hub.broadcast( MSGS.loc_data_sorted, this.config.hideFlag );
                    return this;
                }

            }
        });

		
        //::::::::::::::::::::::::::::::::::::::::
        //:::::::::::: GMAPS API Modules


        //:: CANVAS
        __M({
            ns   : NS.gmaps,
            name : "CANVAS",
            use  : true,
            
            //:::::::::::::::::::::::::
            config : {
                mapNode : ".mapCanvas"
            },
            //:::::::::::::::::::::::::


            module : {
                
                init : function () {
                    var self = this;

                    self.hub.listen( MSGS.gmap_config_ready, function( config ){
                        self.build( config );
                        self.hub.broadcast( MSGS.gmap_dom_ready, K.GMAP);
                    });
                    
                },

                build : function ( config ) {
                    var node;

                    node = $( this.config.mapNode );
                    if ( !K.Util.isNode( node ) ) return false;

                    this.config.mapNode = node[0];
                    this.mapConfig      = config; 
                    this.loadMap();
                },

                loadMap : function () {
                    K.GMAP = new google.maps.Map( this.config.mapNode, this.mapConfig );
                    return K.GMAP;
                }

            }
        });

		
		//:: CANVAS
        __M({
            ns   : NS.gmaps,
            name : "CONFIG",
            use  : true,
            

            //:::::::::::::::::::::::::
            config : {
                mapTypeId : "ROADMAP",
                center : {
                    lat : window.ydlMapConfig.lat,
                    lng : window.ydlMapConfig.lng
                },
                zoom  : window.ydlMapConfig.zoom || 8
            },
            //:::::::::::::::::::::::::

            module : {

                init : function () {
                    var self = this;

                    self.hub.listen( MSGS.gmap_api_loaded, function () {
                        self.build();
                        self.hub.broadcast( MSGS.gmap_config_ready, self.config );
                    });
                },

                build : function () {
                    var 
                    config = {},
                    prop;

                    for ( prop in this.config ) {
                        if ( this.buildSettings.hasOwnProperty( prop ) ) {
                            config[prop] = this.buildSettings[prop]( this.config[prop] );
                        }
                        else config[prop] = this.config[prop];
                    }

                    this.config = config;
                },

                buildSettings : {

                    center : function ( coords ) {
                        return coords ? new google.maps.LatLng(coords.lat, coords.lng) : undefined;
                    },

                    mapTypeId : function ( type ) {
                        return type ? google.maps.MapTypeId[ type ] : undefined;
                    }

                }

            }
        });

		
		//:: GMAPS API
        __M({
            ns   : NS.gmaps,
            name : "API",
            use  : true,
            
            //:::::::::::::::::::::::::
            config : {
                file : "https://maps.googleapis.com/maps/api/js",
                params : {
                    sensor   : "false",
                    callback : "gmapscb"
                }
            },
            //:::::::::::::::::::::::::

            module : {

                init : function () {
                    window[ this.config.params.callback ] = this.complete;
                    this.load();
                },

                load : function () {
                    var file = K.Util.add_QS_Params( this.config.file, this.config.params );

                    K.Util.loadScript( file );
                },

                complete : function () {
                    this.hub.broadcast( MSGS.gmap_api_loaded );
                }

            }
        });


        //::::::::::::::::::::::::::::::::::::::::
        //:::::::::::: Templates Module


        //:: API LOADER
        __M({
            ns   : NS.templates,
            name : "LOAD",
            use  : true,

            //:::::::::::::::::::::::::
            config : {
                file : "templates.html"
            },
            //:::::::::::::::::::::::::

            module : {

                init : function () {
                    this.load();
                },

                load : function () {
                    var self = this;

                    K.Util.ajax({
                    	type : "GET",
                        url : trim( self.config.file ),
                        success : self.prepare
                    });
                },

                prepare : function ( tmplHTML ) {
                    var self = this;

                    $("<div />")
                    .append( tmplHTML )
                    .find("script")
                    .each(function(){
                        var 
                        $this   = $(this),
                        tmplId  = trim( $this.attr("id") ),
                        tmplTxt = trim( $this.html() );

                        K.TEMPLATES[ tmplId ] = tmplTxt.replace(/\>[\r\n|\n|\n\t ]+\</g, "><");
                    });

                    self.hub.broadcast( MSGS.templates_loaded );
                }
            }
        });

    }());


    //  _INIT
    $( K.Builder.start );

}( jQuery, window ));
