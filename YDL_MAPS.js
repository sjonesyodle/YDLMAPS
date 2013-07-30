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

        $.XMLtoJSON = function(q){this.init=function(){this.document=this.xml=!1;this.json={};this.duration=new Date;this.options=$.extend({url:!1,xmlString:!1,namespaces:!1,valueIdentifier:"$",attributeIdentifier:"_",emptyValuesAsNull:!1,modify:{},clearEmptyNodes:!1,cache:!1,detectTypes:!1,filter:null,fallback:null,log:!1},q);this.options.url&&this.receiveXML();this.options.xmlString&&(this.xml=this.options.xmlString);this.xml&&(this.parseXML(),this.convertXML(),null!=this.options.fallback&&(this.json=={}|| this.json.parsererror)&&this.options.fallback({message:"XML is invalid",code:500}),this.modifyJSON());this.duration=new Date-this.duration+" ms"};this.receiveXML=function(){var a;$.ajax({type:"GET",url:this.options.url,async:!1,dataType:"text",cache:this.options.cache,complete:function(j){j.responseText&&(a=j.responseText.replace(/^\s+/,""))}});a?this.xml=a:(this.throwError("Cannot receive XML from "+this.options.url),null!=this.options.fallback&&this.options.fallback({message:"Cannot receive XML from "+ this.options.url,code:404}))};this.parseXML=function(){this.xml=this.xml.replace(/^[\s\n\r\t]*[<][\?][xml][^<^>]*[\?][>]/,"");window.ActiveXObject?(this.document=new ActiveXObject("Microsoft.XMLDOM"),this.document.async=!1,this.document.loadXML(this.xml)):(this.document=new DOMParser,this.document=this.document.parseFromString(this.xml,"application/xml"));(!this.xml||!this.document)&&this.throwError("Cannot parse XML")};this.convertXML=function(){var a=this;(function g(c,b,d,h){var e=d.valueIdentifier, f=d.attributeIdentifier;if(9===c.nodeType)$.each(c.childNodes,function(){g(this,b,d,h)});else if(1===c.nodeType){var m=h[e]?{valueIdentifier:!0}:{},k=c.nodeName,n=!0==d.namespaces?!0:!1,l={};-1!=k.indexOf(":")&&(m[k.substr(0,k.indexOf(":"))]=!0);$.each(c.attributes,function(){var b=this.nodeName,c=this.nodeValue;a.options.filter&&(c=a.options.filter(c));a.options.detectTypes&&(c=a.detectTypes(c));"xmlns"===b?(h[e]=c,m[e]=!0):0===b.indexOf("xmlns:")?h[b.substr(b.indexOf(":")+1)]=c:-1!=b.indexOf(":")? (l[f+b]=c,m[b.substr(0,b.indexOf(":"))]=!0):l[f+b]=a.options.emptyValuesAsNull&&(""===c||null===c)?null:c});var p=n?h:m;$.each(p,function(a,b){p.hasOwnProperty(a)&&(l[f+"xmlns"]=l[f+"xmlns"]||{},l[f+"xmlns"][a]=b)});b[k]instanceof Array?b[k].push(l):b[k]=b[k]instanceof Object?[b[k],l]:l;a.options.emptyValuesAsNull&&0==c.childNodes.length&&(b[k]=null);$.each(c.childNodes,function(){g(this,l,d,h)})}else 3===c.nodeType&&(c=c.nodeValue,c.match(/[\S]+/)&&(a.options.filter&&(c=a.options.filter(c)),a.options.detectTypes&& (c=a.detectTypes(c)),b[e]instanceof Array?b[e].push(c):b[e]=b[e]instanceof Object?[b[e],c]:c))})(this.document,this.json,this.options,{})};this.modifyJSON=function(){var a=this,j=this.options.attributeIdentifier;$.each(this.options.modify,function(g,c){var b=g.match(/\.\*$/)?!0:!1;g=b?g.replace(/\.\*$/,""):g;var d=a.find(g);if(d){var h=c.replace(/\.[^\.]*$/,""),e=1<c.split(".").length?h+'["'+c.split(".")[c.split(".").length-1]+'"]':c;b||a.remove(g);1<h.split(".").length&&a.createNodes(h);a.createNodes(c); b?(e=e.match(/\[\"\"\]/)?"":e+".",$.each(d,function(a){a[0]!=j&&eval("_this.json."+e+a+" = value")}),$.each(a.find(g),function(b){b[0]!=j&&a.remove(g+"."+b)})):eval("_this.json."+e+" = content");if(a.options.clearEmptyNodes){var d=b?a.find(g):a.find(g.replace(/\.[^\.]*$/,"")),f=!0;$.each(d,function(b,c){if(c instanceof Object){var d=0,e;for(e in c)d++;if(1<d||1==d&&!a.options.namespaces)return f=!1}if(b[0]!=j)return f=!1});f&&(b?a.remove(g):a.remove(g.replace(/\.[^\.]*$/,"")))}}})};this.createNodes= function(a){var j=this;this.get(a,!1)||function c(a,d){if(a.split(".")[d]){for(var h=[],e=0;e<=d;e++)h.push(a.split(".")[e]);h=h.join(".");j.get(h,!1)||eval("_this.json."+h+"={}");c(a,d+1)}}(a,0)};this.get=function(a,j){var g=this;j=!1==j?!1:!0;var c=this.json;a=a.replace(/^\./,"");var b="",d=null;(function e(f,j){if(d=a.split(".")[f]){b+=0===f?d:"."+d;c=d.match(/\[*.\]$/)?c[d.split("[")[0]][d.match(/\[([^\]]*)/)[1]]:c[d];if(!c)return!0===j&&(a===b?g.throwError("Invalid path "+a):g.throwError('Invalid part "'+ b+'" in path "'+a+'"')),c;e(f+1,j)}})(0,j);return c};this.find=function(a,j){function g(a,b){var d="",e=[];$.each(b.split("."),function(b){var f=[];if(0==b)d=this,f=a;else if(d+="."+this,this.match(/\[*.\]$/))f=e[this.split("[")[0]][this.match(/\[*.\]$/)[0].replace(/[\[|\]]/g,"")];else if(e instanceof Array){var g=this;$.each(e,function(){this instanceof Array?$.each(this,function(){void 0!=this[g]&&f.push(this[g])}):void 0!=this[g]&&f.push(this[g])})}else f=e[this];if(!f||0==f.length)return c.throwError("Invalid path "+ d),e=[],!1;e=f});return e}var c=this,b=[];a.split(".")[0].match(/\[*.\]$/)?(b=a.split(".")[0].match(/\[*.\]$/)[0].replace(/[\[|\]]/g,""),b=this.json[a.split(".")[0].replace(/\[.*\]/,"")][b]):b=this.json[a.split(".")[0]];b=g(b,a);if(j){var d=function(a,b,c){if(a&&b&&c){if("=~"===b)return b="",c.match(/^\/.*/)&&c.match(/\/.$/)&&(b=c[c.length-1],c=c.substring(0,c.length-1)),c=c.replace(/^\//,"").replace(/\/$/,""),a.toString().match(RegExp(c,b))?!0:!1;if("=="===b||"!="===b)return eval("element.toString()"+ b+"rule")?!0:!1;parseInt(c);parseInt(a);return eval("element"+b+"rule")?!0:!1}},h=[],e=j.replace(/^.*(==|\>=|\<=|\>|\<|!=|=~)/,""),f=j.replace(/(==|\>=|\<=|\>|\<|!=|=~).*$/,"").replace(/\s$/,""),m=j.replace(e,"").replace(f,"").replace(/\s/,""),k=f.split(".")[f.split(".").length-1];k===f&&(f=null);if(b instanceof Array)f?$.each(b,function(){var a=g(this,"."+f),b=this;a instanceof Array?$.each(a,function(){if(d(this,m,e))return h.push(b),!1}):d(a,m,e)&&h.push(this)}):$.each(b,function(){d(this[k],m, e)&&h.push(this)}),b=h;else if(f){var n=g(b,"."+f),n=g(b,"."+f),l=!1;n instanceof Array?$.each(n,function(){if(d(this,m,e))return l=!0,!1}):d(n,m,e)&&(l=!0);b=l?b:null}else d(b[k],m,e)||(b=null)}return!b?[]:b};this.remove=function(a){this.get(a)&&(eval("delete this.json."+a),a.match(/\[*.\]$/)&&($.grep(eval("_this.json."+a.replace(/\[*.\]$/,"")),function(a){return a}),eval("_this.json."+a.replace(/\[*.\]$/,"")+" = filterNull")))};this.detectTypes=function(a){return a.match(/^true$/i)?!0:a.match(/^false$/i)? !1:a.match(/^null|NaN|nil|undefined$/i)?null:a.match(/^[0-9]*$/i)?parseInt(a):a};this.throwError=function(){this.options.log&&!window.console&&(window.console={log:function(a){alert(a)}})};this.init()};

    }()),
    trim = $.trim,
    K = Kernel, __M, appify;

    K.extend(K, {

        Builder : {
            modules : {},
            aliases : {},
            defineMod : function ( o ) {
                var 
                name,
                proto = {
                    ns      : "",
                    name    : "",
                    use     : true,
                    config  : {},
                    module  : {},
                    aliases : []
                },

                checkProto = function () {
                    var prop;

                    for ( prop in o ) {
                        if ( !prop in proto || typeof o[prop] !== typeof proto[prop] ) return false;
                    }

                    if ( !o.module.init || typeof o.module.init !== "function" ) return false;

                    return true;
                };

                if ( !checkProto() ) return;

                name = trim( o.ns ) + "/" + trim( o.name );

                o.module.config  = o.config || {};
                if ( o.aliases ) {
                	K.Builder.createAliases( o.aliases, o.module.config );
                }

                K.Builder.modules[ name ] = o;
                delete K.Builder.modules[ name ].aliases;
            },

           	createAliases : function ( aliasCfg, configO ) {
           		var aliasCell, aliases, createLinks, getParentObjRef;

           		if ( !aliasCfg.length || typeof aliasCfg[0] !== "string" || typeof aliasCfg[1] !== "object"  ) return;


           		getParentObjRef = function ( propArr, objRef ) {
           			var o;

           			if ( !objRef ) {
           				o = configO[ propArr[0] ];
           				propArr.pop();
           			} 
           			else {
           				propArr.shift();
           				o = objRef[ propArr[0] ];
           			}
         			return propArr.length > 0 ? getParentObjRef( propArr, o ) : objRef;
           		};

           		createLinks = function () {
           			_.each( aliasCfg[1], function ( v, k, o ) {
           				var levels, updateProp, updateObj;
           				v = v.split(".");
           				levels = v.length;

           				if ( levels === 1 ) {
           					if ( v[0] in configO ) {
           						o[k] = [configO, v[0]];
           						return;
           					}
           				}

           				if ( levels > 1 ) {
           					updateProp = v[ levels - 1 ];
           					updateObj  = getParentObjRef( v );
           					if ( updateObj ) o[k] = [updateObj, updateProp];
           					else delete o[k];
           				}

           			});
           		};

           		createLinks();

           		Kernel.Builder.aliases[ trim(aliasCfg[0]) ] = aliasCfg[1];
           	},

            start : function ( cfg ) {
                var
                modules = K.Builder.modules,
                aliases = K.Builder.aliases,
                registerMods = [],
                define = K.module.define,
                prop,
                inArr = $.inArray;

                //use cfg to update mod configs using alias object
                if ( _.isObject( cfg.config) && !_.isEmpty( aliases ) ) {

                	_.each( cfg.config, function( aliasObj, aliasGroup ) {
                		aliasGroup = trim( aliasGroup );

                		if ( (aliasGroup in aliases) && !_.isEmpty( aliasObj )) {

                			_.each( aliasObj, function( aliasValue, aliasKey ){
                				var ln;
                				aliasKey = trim( aliasKey );
                				if ( aliasKey in aliases[aliasGroup]) {
                					ln = aliases[aliasGroup][aliasKey];
                					ln[0][ln[1]] = aliasValue;
                				}

                			})

                		}

                	});

                }

                for ( prop in modules ) {
                	if ( (cfg.use && inArr( prop.split("/")[1], cfg.use ) > -1) || !!modules[prop].use ) {
                        define( prop, modules[prop].module );
                        registerMods.push({ type : prop, id : prop });
                    }
                    else delete modules[prop];
                }

                K.register( registerMods );
                K.startAll();
                delete K.Builder;
            },

            appify : function ( prefix, arr ) {
                var ret = {};

                prefix = trim( prefix );

                _.each( arr, function( v, i ){
                	v = trim( v );
                	ret[ v ] = prefix + "_" + v;
                });

                return ret;
            } 
        },

    	Util : {

    		hasBoolProp : function ( obj, bool, retKey ) {
    			var test, needle;

    			test = _.find( obj, function( v, k ) {
    				if ( _.isBoolean( v ) && v === bool ) {
    					needle = k;
    					return true;
    				}
    			});

    			return !!test ? ( !!retKey ? needle : test ) : false;
    		},

    		createJNodes : function ( nodeObj, subObjProp ) {
                var prop, curr;

                if ( typeof nodeObj !== "object" ) return false;

                if ( subObjProp ) subObjProp = trim( subObjProp );

                for ( prop in nodeObj ) {
                    prop = trim( prop );

                    if ( subObjProp && typeof nodeObj[prop] == "object"  ) {

                        if ( !nodeObj[prop].hasOwnProperty( subObjProp ) ) return false;

                        curr = nodeObj[prop][subObjProp] = $( nodeObj[prop][subObjProp] );

                    }
                    else curr = nodeObj[prop] = $( nodeObj[prop] );


                    if ( !this.isNode( curr ) ) return false;
                }

                return true;
            },

            ajax : function ( o ) {
                var def = { type : "POST" };
                return $.ajax( $.extend( def, o ) );
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

    		loadScript : function ( url, cb ) {
    			var 
    			script, _cb;

    			_cb = function () {
    				if (typeof cb === "function") cb();
    			};

    			script = document.createElement("script")
    		    script.type = "text/javascript";

    		    if (script.readyState){  //IE
    		        script.onreadystatechange = function() {
    		            if ( script.readyState == "loaded" || script.readyState == "complete" ) {
    		                script.onreadystatechange = null;
    		                _cb();
    		            }
    		        };
    		    } 
    		    else script.onload = _cb;

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

            validate : (function(){
                var lib = {
                    email  : /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
                    zip    : /^\d{5}([\-]\d{4})?$/,
                    postal : /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?(\d[ABCEGHJKLMNPRSTVWXYZ]\d)?$/
                };

                return function ( val, regex ) {
 					return _.has( lib, trim(regex) ) ? lib[regex].test(val) : false; 
                };  
            }())
    	},

    	Bank : (function(){
    		var bank = {};

    		return {
    			add : function ( modID, k, v ) {
    				modID = trim( modID.slice( modID.indexOf("/") + 1 ) );
    				if ( !bank[ modID ] ) bank[ modID ] = {};
    				bank[ modID ][ k ] = v;
    			},

    			get : function ( modID, k ) {
    				return bank[ modID ] ? bank[ modID ][ k ] : undefined;
    			},

    			load : function ( obj, context ) {
    				var modID, bankProp, pass = true;

    				_.each( obj, function( v, k ) {
    					modID    = trim( v );
    					bankProp = trim( k );

    					if ( !_.has( bank, modID ) || !bank[ modID ][ bankProp ] ) {
    						pass = false;
    						return;
    					}

    					context[ bankProp ] = bank[ modID ][ bankProp ];
    				});

    				return pass;
    			}	

    		};

    	}()),

    	mapModel : function () {
            var locData = K.LOC_DATA;

            if ( !locData || $.isEmptyObject( locData  ) ) return;

            // radius model
            if ( locData.locations && locData.locations.location ) {
            	if ( !_.isArray( locData.locations.location ) ) {
            		locData.locations.location = [locData.locations.location];
            	}
                K.LOC_DATA = locData.locations.location;
                return;
            }

            // territory model
            if ( locData.serviceAreas && locData.serviceAreas.serviceArea ) {
                K.LOC_DATA = locData.serviceAreas.serviceArea;
                return;
            }
        },

    	LOC_DATA    : { },
        USER_COORDS : { },
        TEMPLATES   : { },
        GMAP        : { },

        GMARKERS_VIEWSTATE : (function () {
        	var
        	shown  = [],
        	hidden = [];

        	return {

        		clear : function () {
        			shown  = [];
        			hidden = [];
        		},

        		shown : function ( o ) {
        			shown.push( o );
        		},

        		hidden : function ( o ) {
        			hidden.push( o );
        		},

        		report : function () {
        			return {
        				shown  : shown,
        				hidden : hidden
        			};
        		}
        	};

        }())
    });

	__M = K.Builder.defineMod;
	appify = K.Builder.appify;


	// - METRO APP -
    ;(function(){
    	var APP, NS, MSGS;

    	APP = "YDL_MAPS";

        //::::::::::::::::::
        //:::::: NAMESPACES
        NS = appify(APP, [
            "LOC_DATA",
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
            "templates_loaded",
            "loc_list_render_update"
        ]);


        //::::::::::::::::::::::::::::::::::::::::
        //:::::::::::: Location Data Modules

        // :: LOAD LOC DATA
        __M({
            ns   : NS.LOC_DATA,
            name : "LOAD",
            use  : true,
                
            config : {
                file : "rad2.xml"
            },

            aliases : ["locData", {
            	"file" : "file"
            }],

            module : {

                init : function () {
                    if ( this.config.file ) {
                    	K.LOC_DATA = K.Util.xml2json( this.config.file ).json;
	                    K.mapModel();
                    }
                }

            }
        });


        //:: GEO CODE LOCS DATA
        __M({
            ns   : NS.LOC_DATA,
            name : "COORDS",
            use  : true,
            
            config : {
                lat : "_lat",
                lng : "_lng"
            },

            module : {

                init : function () {
                    var _I = this;
                    _I.hub.listen( MSGS.gmap_api_loaded, function(){
                        _I.addCoords();
                    });
                },

                addCoords : function () {
                    var 
                    _I     = this, 
                    config = _I.config,
                    lat    = config.lat, 
                    lng    = config.lng;

                    _.each( K.LOC_DATA, function( o ) {
                    	if ( o[lng] && o[lng] ) {
                    		o.GLatLng = new google.maps.LatLng( o[lat], o[lng] );
                    	}
                    });
                }
            }
        });

		
		//::::::::::::::::::::::::::::::::::::::::
        //:::::::::::: UI FEATURES
        
        //:: DYNAMIC ZOOM
        __M({
        	ns   : NS.features,
        	name : "DYNAMIC_ZOOM",
        	use  : true,

        	module : {

        		init : function () {
        			this.hub.listen( MSGS.markers_loaded, this.updateZoom );
        			this.hub.listen( MSGS.loc_data_sorted, this.updateZoom );
        		},

        		updateZoom : function ( hideFlag ) {
        			var 
        			bounds,
        			report = K.GMARKERS_VIEWSTATE.report();

        			if ( K.LOC_DATA.length < 2 ) {
        				K.GMAP.setCenter( K.LOC_DATA[0].marker.getPosition() );
        				return;
        			}

        			if ( report.shown.length === 1 ) {
        				K.GMAP.setCenter( report.shown[0].marker.getPosition() );
        				return;
        			}

        			if ( report.shown.length < 1  ) return;
        			
        			bounds = new google.maps.LatLngBounds();

        			_.each( K.LOC_DATA, function( o ) {
        				if ( !o[ hideFlag ] ) {
        					bounds.extend( o.marker.getPosition() );
        				}
        			});

        			K.GMAP.fitBounds( bounds );	
        		}

        	}

        });


        //:: INFO WINDOWS FEATURE
        __M({
            ns   : NS.LOC_DATA,
            name : "INFO_WINDOWS",
            use  : false,
            
            config : {
                tmplNodeId : "",
                userEvent  : "" // click or mouseover
            },

            aliases : ["infoWindows", {
            	tmplNodeId : "tmplNodeId",
            	mouseEvent : "userEvent"
            }],

            module : {

                init : function () {
                    var _I = this;

                    _I.hub.listen( MSGS.markers_loaded, function () {

                        _I.GMAPInfoWindow = new google.maps.InfoWindow();
                        _I.template       = K.TEMPLATES[ trim(_I.config.tmplNodeId) ];

                        if ( _I.template ) _I.buildInfoWindowViews();

                    });
                },

                buildInfoWindowViews : function  () {
                    var
                    _I     = this,
                    template = _.template( _I.template );

                    _.each( K.LOC_DATA, function( o ) {
                    	o.infoWindow = $( template({ data : o }) )[0];

                    	_I.createMarkerEvent({
                            marker     : o.marker,
                            infoWindow : o.infoWindow 
                        });
                    });
                },

                createMarkerEvent : function ( o ) {
                    var _I = this;
                    google.maps.event.addListener( o.marker, _I.config.userEvent, function() {

                        _I.GMAPInfoWindow.setContent( o.infoWindow );
                        _I.GMAPInfoWindow.open( K.GMAP, o.marker);

                    });
                }
            }

        });


		//:: MARKER STYLES
		__M({
			ns   : NS.LOC_DATA,
            name : "MARKER_STYLES",
            use  : true,

            config : {

            	markers : {

            		user : {
            			use : "hex",

            			hex : {
            				bgclr  : "000000",
            				txtclr : "000000"
            			},

            			img : ""
            		},

            		locs : {

            			use : "hex",

            			hex : {
            				bgclr  : "D96666",
            				txtclr : "FFFFFF"
            			},

            			img : "", 

            			sorting  : {
            				alpha   : false,
            				numeric : false,
            				img     : false
            			},

            			imgSortMap   : {
            				alphaLower : {
            					key   : "{a}",
            					alias : "alpha",
            					casing : "toLowerCase"
            				},

            				alphaUpper : {
            					key   : "{A}",
            					alias : "alpha",
            					casing : "toUpperCase"
            				},

            				num : {
            					key   : "{#}",
            					alias : "num" 
            				}
            			},

		            	imgSortKeyDef : "num",
		            	imgSortDefExt : ".png"
            		}
            	},

            	
            	styleKey   : "{{style}}",
            	HEX_MARKER : "https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld={{style}}"
            },

        	aliases : ["markerStyles", {
        		userType   : "markers.user.use",
        		userHexBG  : "markers.user.hex.bgclr",
        		userHexTxt : "markers.user.hex.txtclr",
        		userImgSrc : "markers.user.img",
        		locsType   : "markers.locs.use",
        		locsHexBG  : "markers.locs.hex.bgclr",
        		locsHexTxt : "markers.locs.hex.txtclr",
        		locsImgSrc : "markers.locs.img",

        		locSortImg : "markers.locs.sorting.img",
        		locsSortAlpha : "markers.locs.sorting.alpha",
        		locsSortNum : "markers.locs.sorting.numeric"
            }],

            module : {

            	init : function () {
            		this.buildMap();
            		this.userMarker();
            		this.locMarkers();
            		this.complete();
            	},

            	buildMap : function () {
            		var _I = this;
            		_I.buildMap = {
	            		hex : _I.buildHex,
	            		img : _I.buildImg,
	            		def : _I.buildHex
            		};
            	},

            	userMarker : function () {
            		var
            		style, 
            		cfg = this.config.markers.user;

            		if ( !cfg.use || !cfg.hasOwnProperty( cfg.use ) ) {
            			this.config.markers.user = this.buildMap["def"]( cfg );
            			return;
            		}

            		cfg = this.buildMap[ trim( cfg.use ) ]( cfg );

            		this.config.markers.user = cfg;
            	},

            	locMarkers : function () {
            		var
            		_I        = this,
            		alphabet  = "abcdefghijklmnopqrstuvwxyz".split(""),
            		markers   = _I.config.markers,
            		locsCfg   = markers.locs,
            		sortFuncs = {
        				alpha : function ( locList, updateProp ) {
        					_.each( locList, function( loc, i ){
        						loc[ updateProp ] = _I.buildHex( locsCfg, alphabet[ i ] );
        					});
        				},

        				numeric : function ( locList, updateProp ) {
        					_.each( locList, function( loc, i ){
        						loc[ updateProp ] = _I.buildHex( locsCfg, ( i + 1 ).toString() );
        					});
        				},

        				img : function ( locList, updateProp ) {
        					_.each( locList, function( loc, i ){
        						loc[ updateProp ] = _I.buildSortedImg({
        							num   : ( i + 1 ).toString(),
        							alpha : alphabet[ i ]
        						});
        					});
        				}
            		},

            		sorting = K.Util.hasBoolProp( locsCfg.sorting, true, true ),
            		use     = locsCfg.use ? trim( locsCfg.use ) : null;

            		// def
            		if ( !use ) {
            			markers.locs = this.buildMap["def"]( locsCfg );
            			return;
            		}

            		// img
            		if ( use === "img" && sorting !== "img" ) {
            			markers.locs = this.buildMap[ use ]( locsCfg );
            			return;
            		}
            		else if ( use === "img" && sorting === "img" ) {
            			this.buildSortedImg();
            		}

            		// return sort method
            		if ( sorting && sortFuncs[ sorting ] ) {
            			markers.locs = sortFuncs[ sorting ];
            			return;
            		}

            		//basic hex 
            		markers.locs = this.buildMap[ trim( use ) ]( locsCfg );
            		return;
            	},

            	buildHex : function ( cfg, sortChar ) {
            		var style = ( !!sortChar ? trim(sortChar)+"|" : "|" ) + trim( cfg.hex.bgclr.toUpperCase() ) +"|"+ trim( cfg.hex.txtclr.toUpperCase() );
            		return this.config.HEX_MARKER.replace( this.config.styleKey, style );
            	},

            	buildImg : function ( cfg ) {
            		return trim( cfg.img );
            	},

            	buildSortedImg : function () {
            		var
            		cfg       = this.config.markers.locs
            		img       = cfg.img, 
            		imgMap    = cfg.imgSortMap,
            		defSort   = cfg.imgSortKeyDef,
            		defExt    = cfg.imgSortDefExt,
            		imgKey    = (function(){
            			var i;

            			for ( i in imgMap ) {
            				if ( img.indexOf( imgMap[i].key ) > -1 ) {
            					return imgMap[i];
            				}	
            			}

            			img += imgMap[ defSort ].key + defExt;
            			return imgMap[ defSort ];
            		}());

            		this.buildSortedImg = function ( cfg ) {
            			var _img = img, val = cfg[ imgKey.alias ];

            			if ( imgKey.casing ) val = val[imgKey.casing]();

						return _img.replace( imgKey.key, val );
            		};
            		
            	},

            	complete : function () {
            		// value with either be string or func to be parsed by another module
            		Kernel.Bank.add( this.id, "marker_styles", this.config.markers );
            	}

            }

		});

	
		//:: MARKER BUILDER
		__M({
			ns   : NS.LOC_DATA,
            name : "MARKER_BUILD",
            use  : true,

            config : {

            	dpn : {
            		"marker_styles" : "MARKER_STYLES"
            	},

            	markerKey : "marker",
            	iconKey   : "icon",

            	userMarkerZ : true 

            },

            module : {

            	init : function () {
            		var _I = this;

            		if ( !Kernel.Bank.load( _I.config.dpn, _I ) ) return;

            		_I.hub.listen( MSGS.docready_markers, function ( bool ) {
                        _I.onloadMarkers = bool;
                        _I.build();
                        _I.complete();
                    }); 
                    
                    _I.hub.listen( MSGS.loc_data_sorted , function( hideFlag ) {
                        _I.hideFlag = hideFlag;
                        _I.buildLocPins();
                        _I.updateMarkers();
                        _I.loadUserMarker();
                    });

            	},

            	build : function () {
            		this.buildLocPins();
                	this.buildLocMarkers();
            	},

                buildLocPins : function () {
               		var 
               		locStyle = this.marker_styles.locs,
               		iconKey  = this.config.iconKey;

               		if ( typeof locStyle == "function" ) {
               			locStyle( K.LOC_DATA, iconKey );
               			return;	
               		}

               		if ( typeof locStyle === "string" ) {
               			_.each( K.LOC_DATA, function( o ) {
               				o[iconKey] = locStyle;
               			});
               		}
               	},

               	buildLocMarkers : function () {
               		var
               		_I      = this, 
               		markerKey = this.config.markerKey;

               		_.each( K.LOC_DATA, function( o ) {
               			o[ markerKey ] = _I.makeGMarker( o );
               			if ( !_I.onloadMarkers ) o[ markerKey ].setMap( null );
               		});
                },

                makeGMarker : function ( o ) {
                	return new google.maps.Marker({
                		map       : K.GMAP,
                		position  : o.GLatLng || o.position,
                		icon      : o[ this.config.iconKey ]
                	});
                },

            	updateMarkers : function () {
                    var
                    _I      = this, 
                    markerKey = this.config.markerKey,
                    hideFlag  = trim( _I.hideFlag );

                    _.each( K.LOC_DATA, function( o ) {

                    	if ( o[ hideFlag ] ) {
                            o[ markerKey ].setMap( null );
                            return;
                        }

                        o[markerKey].setIcon( o[ _I.config.iconKey ] );
                        o[markerKey].setMap( K.GMAP );

                    });

                    return _I;
                },

                loadUserMarker : function () {
                    var 
                    GMAP = K.GMAP,
                    USER_COORDS = K.USER_COORDS;

                    if ( K.USER_COORDS_MARKER ) K.USER_COORDS_MARKER.setMap( null );

                    K.USER_COORDS_MARKER = {
                        map      : GMAP,
                        position : USER_COORDS      
                    };

                    K.USER_COORDS_MARKER[ this.config.iconKey ] = this.marker_styles.user;

                    K.USER_COORDS_MARKER = this.makeGMarker( K.USER_COORDS_MARKER );

                    if ( this.config.userMarkerZ ) {
                    	K.USER_COORDS_MARKER.setZIndex( google.maps.Marker.MAX_ZINDEX - google.maps.Marker.MAX_ZINDEX );
                    }

                    return this;
                },

                complete : function () {
                    this.hub.broadcast( MSGS.markers_loaded );
                }

            }

		});

	
		//:: TOTAL LOCS COUNTER VIEW
        __M({
            ns   : NS.LOC_DATA,
            name : "TOTAL_LOCS",
            use  : false,

            config : {

                nodes : {
                    absNode    : "",
                    relNode    : "",
                    pluralLocs : ""
                },

                lockAttr : "lock"
            },

            aliases : ["locCounter", {
            	absNode    : "nodes.absNode",
            	relNode    : "nodes.relNode",
            	pluralLocs : "nodes.pluralLocs"
            }],

            module : {

                init: function() {
                    var _I = this;

                    _I.build();
                    _I.update();

                    _I.hub.listen( MSGS.loc_data_sorted, function( hideFlag ) {
                        _I.hideFlag = hideFlag;
                        _I.update();
                    });
                },

                build : function () {
                	var 
                	nodes  = this.config.nodes,
                	isNode = K.Util.isNode;

                	this.render();

                	_.each( nodes, function( node, key, all ){
                		node = $( node );
                		if ( isNode( node ) ) all[key] = node;
                		else delete all[key];
                	});
                },

                update : function () {
                	var 
                	_I   = this,
                	lock = this.config.lockAttr;

                	_.each( this.config.nodes, function( node, k, o ){
                		if ( !node.data( lock ) && ( k in _I.render ) ) {
                			_I.render[ k ].call( o[ k ] );
                		}
                	});
                },

                render : function () {
                    var _I = this;

                    _I.render = {

                        absNode : function () {
                            this.text( _I.totalLocs() ).data( _I.config.lockAttr, true );
                        },

                        relNode : function () {
                            this.text( _I.totalShownLocs() ); 
                        },

                        pluralLocs : function () {
                        	this.text( _I.totalShownLocs() > 1 ? "s" : "" );
                        }
                    };
                    
                },

                lockNode : function ( node, bool ) {
                    return node.data(this.config.lockAttr, bool);
                },

                totalLocs : function () {
                    return Kernel.LOC_DATA.length;
                },

                totalShownLocs : function () {
                	var i, l, x, hideFlag = this.hideFlag;

	                i = x = 0;
	                l = this.totalLocs();
	                for ( ; i < l; i += 1 ) {
	                    x += !!K.LOC_DATA[ i ][ hideFlag ] ? 0 : 1;
	                }

	                return x;
                }

            }

        });

		
		//:: LIST VIEW FEATURE
        __M({
            ns   : NS.LOC_DATA,
            name : "LIST_VIEW",
            use  : false,

            config : {
                tmplNodeId     : "",
                listRootNode   : "",
                loadListOnload : false,
                listPinsOnload : true
            },

            aliases : ["locListView", {
            	"tmplNodeId" : "tmplNodeId",
            	"listRootNode" : "listRootNode"
            }],

            module : {

                init : function () {
                    var _I = this, L = _I.hub.listen;
                    
                    L( MSGS.docready_loclist, function ( bool ) {
                        _I.config.loadListOnload = bool;
                    });
                    
                    L( MSGS.templates_loaded, function(){
                        _I.template = K.TEMPLATES[ _I.config.tmplNodeId ];
                        if ( !_I.template ) return;
                        
                        _I.config.listRootNode = $( _I.config.listRootNode );
                        if ( !K.Util.isNode( _I.config.listRootNode ) ) return;
                        if ( !_I.config.loadListOnload ) return;

                        _I.onloadBuild();
                    });

                    L( MSGS.loc_data_sorted , function( hideFlag ) {
                    	_I.hideFlag = hideFlag;
                        _I.buildViews();
                        _I.render();
                    });

                    L( MSGS.markers_loaded, function(){
                    	if ( _I.config.listPinsOnload && _I.config.loadListOnload ) {
	         				_I.buildViews();
		                    _I.render();
		                    _I.config.listPinsOnload = !_I.config.listPinsOnload;
	         			}
                    });

                },

                onloadBuild : function () {
                	if ( !this.config.listPinsOnload ) {
                		this.buildViews();
	                    this.render();
	                    return;
                	}
                },

                buildViews : function () {
                    var
                    _I          = this,
                    hideFlag    = this.hideFlag,
                    template    = _.template( _I.template );

                    _I.fullListView = "";
                    _I.config.listRootNode.empty();

                    _.each( K.LOC_DATA, function( o ) {
                    	o.listView = template({ data : o });
                    	if ( !o[ hideFlag ] ) _I.fullListView += o.listView;
                    });

                },

                render : function () {
                   this.config.listRootNode.append( this.fullListView );
                   this.hub.broadcast( MSGS.loc_list_render_update, this.hideFlag );
                }

            }

        });


        //::::::::::::::::::::::::::::::::::::::::
        //:::::::::::: Geo Search Module
        
        //:: SEARCH FEATURE
        __M({
            ns   : NS.geo,
            name : "SEARCH",
            use  : false,
            
            config : {

                nodes : {
                    input : "",
                    btn   : ""
                },

                placeholder : "",
                errColor    : "",
                errClass    : ""

            },

            aliases : ["userSearch", {
            	inputNode   : "nodes.input",
            	searchNode  : "nodes.btn",
            	placeHolder : "placeholder",
            	errColor    : "errColor",
            	errClass    : "errClass" 

            }],

            module : {

                init : function () {
                    var _I = this, L = _I.hub.listen;
                     
                    L( MSGS.search_model_ready, function ( config ) {
                        _I.build();
                        L( MSGS.user_search_response, _I.triggerError);
                    });

                },

                build : function () {
                    this.events();
                    this.bindEvents();                
                },

                bindEvents : function () {
                    var
                    _I     = this,
                    isNode = K.Util.isNode,
                    events = _I.events;

                    _.each( _I.config.nodes, function( v, k, nodes ) {
                    	k = trim( k );

                    	if ( !_.has( events, k ) ) return;

                    	nodes[ k ] = $( v );
                    	if ( !isNode( nodes[ k ] ) ) return;

                    	events[ k ].call( nodes[ k ], events );
                    });

                },

                events : function () {
                    var _I        = this,
	                    config      = _I.config,
	                    errClass    = config.errClass,
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

                    _I.events = {
                        input : function () {

                        	this.val( placeholder ).data("placeholder", true);

                            this.on({

                                keyup : function ( e ) {
                                    var $this = $( this );
                                    if ( $this.hasClass( errClass ) && !userHitEnter( e ) ) {
                                    	$this
										.removeClass( errClass )
										.val( code2Char( e.keyCode ) );
										errCSS( $this, false );
                                    }
                                },

                                keydown : function ( e ) {
                                	if ( userHitEnter( e ) ) {
                                		_I.config.nodes.btn.trigger("click");
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
                                	var $this = $( this ), val = $this.val();			
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
                                    var searchNode = _I.config.nodes.input.removeClass("error");
                                    _I.userSearchRequest( trim( searchNode.val() ) );
                                    e.preventDefault();
                                }

                            });
                        }
                    };

                    return _I;                
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
            use  : false,

            config : {
                distanceKey : "distance",
                hideFlag    : "hide",
                boundary    : 30,

                messages : {
                    searchError : "Invalid Search Term",
                    noResults   : "No Results"
                }, 

                coordKeys : {
                	lat : "_lat",
                	lng : "_lng"
                }
            },

            aliases : ["radius", {
            	distance : "boundary"
            }],

            module : {

                init : function () {
                    var _I = this, L = _I.hub.listen, B = _I.hub.broadcast;

                    B( MSGS.docready_loclist, true );

                    L( MSGS.gmap_dom_ready, function(){
                        _I.GMAP_GEOCODER = new google.maps.Geocoder();
                        B( MSGS.docready_markers, true );
                        B( MSGS.search_model_ready );
                        L( MSGS.user_search_request, _I.geoCodeSearch);
                    });
                },

                build : function () {
                    if ( typeof K.USER_COORDS !== "object" ) return;

                    this.config.boundary = parseInt( this.config.boundary, 10 );

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
                    var _I = this;

                    _I.GMAP_GEOCODER.geocode({ address : userSearch }, function( results, status ) {

                        if ( status != google.maps.GeocoderStatus.OK ) {
                            _I.triggerError( _I.config.messages.searchError );
                            return;
                        }

                        geoData = results[0].geometry.location;
                        _I.doUpdate( new google.maps.LatLng(geoData.lat(), geoData.lng()) );
                    });
                },

                checkRadius : function ( o ) {
                    var distKey = this.config.distanceKey;
                    return o[ distKey ] ? this.config.boundary < parseInt(o[ distKey ], 10) : false;
                },

                flagOutOfBoundsLocs : function () {
                    var _I = this, VIEWSTATE  = K.GMARKERS_VIEWSTATE;
    	
    				VIEWSTATE.clear();
                    _I.hiddenLocs = 0;

                    _.each( K.LOC_DATA, function( o ) {
                    	o[ _I.config.hideFlag ] = _I.checkRadius( o );

                    	if ( o[ _I.config.hideFlag ] ) {
                    		_I.hiddenLocs += 1;
                    		VIEWSTATE.hidden( o );
                    	}
                    	else VIEWSTATE.shown( o );

                    });


                    return _I;
                },

                sortLocs : function () {
                    K.LOC_DATA.sort( K.Util.sortNum( this.config.distanceKey ) );
                    return this;
                },

                computeDistances : function () {
                    var
                    _I          = this,
                    config      = _I.config,
                    userCoords  = K.USER_COORDS,

                    haversineObj,

                    lat = config.coordKeys.lat,
                    lng = config.coordKeys.lng,

                    haversineObj = {
                        unit : _I.config.haversineUnit,
                        from : {
                            lat  : userCoords.lat(),
                            lng  : userCoords.lng()
                        }
                    };

                    _.each( K.LOC_DATA, function( o ) {

                    	if ( o[ lat ] && o[ lng ] ) {

                    		haversineObj.to = {
	                            lat : o[ lat ],
	                            lng : o[ lng ]
	                        };

	                        o[ _I.config.distanceKey ] = K.Util.haversine( haversineObj ).toFixed(2);
                    	}

                    });

                    return _I;
                },

                locsFound : function () {
                    if ( this.hiddenLocs === K.LOC_DATA.length ) {
                        this.triggerError( this.config.messages.noResults ); 
                    }
                    return this;
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
            use  : false,
            
            config : {

                hideFlag : "hide",

                redirect : {
                	onSuccess : false,
                	uriProp   : "_url"
                },

                codeType : {
                	zip    : true,
                	postal : false,
                	custom : false
                },

                messages : {
                    searchError : "Invalid Zip/Postal",
                    noResults   : "No Results",
                    placeholder : "Enter Your Zip/Postal"
                }

            },

            aliases : ["territory", {
            	redirectOnSuccess : "redirect.onSuccess",
            	zip : "codeType.zip",
            	postal : "codeType.postal",
            	custom : "codeType.custom"
            }],

            module : {

                init : function () {
                    var _I = this, L = _I.hub.listen, B = _I.hub.broadcast;

                    _I.config.codeType = K.Util.hasBoolProp( _I.config.codeType, true, true );
                    if ( !_I.config.codeType ) return;

                    L( MSGS.gmap_dom_ready, function() {

                        _I.GMAP_GEOCODER = new google.maps.Geocoder();
                        B( MSGS.docready_markers, false );
                        B( MSGS.docready_loclist, false );

                        B( MSGS.search_model_ready, {
                            placeholder : _I.config.messages.placeholder
                        });

                        L( MSGS.user_search_request, function( userSearch ) {

                        	_I.userSearch = userSearch;
                        	_I.normalizeSearch();

                            if ( !_I.validateSearch() ) {
                                _I.triggerError( _I.config.messages.searchError );
                                return;
                            }

                            _I.geoCodeSearch( _I.build );
                        });
                    });
                    
                },

                normalizeSearch : function () {
                	this.userSearch = trim( this.userSearch ).toUpperCase();
                },

                build : function () {
                    this.checkTerritory();

                    if ( this.locFound() ) {
                    	this
                    	.sort()
                   		.complete();
                    }
                    
                },

                checkTerritory : function () {
                	var 
                	_I         = this,
                	codeArrKey = _I.config.codeType,
                	VIEWSTATE  = K.GMARKERS_VIEWSTATE,
                	foundLoc, foundLocIdx = -1;

                	VIEWSTATE.clear();

                	foundLoc = _.find( K.LOC_DATA, function( loc, i ){
                		foundLocIdx = i;
                		return _I.codeMatch( loc[ codeArrKey ] );
                	});


                	_.each( K.LOC_DATA, function( loc, i ) {

                		if ( foundLoc && i === foundLocIdx ) {
                			loc[ _I.config.hideFlag ] = false;
                			VIEWSTATE.shown( loc );
                		} 
                		else {
                			loc[ _I.config.hideFlag ] = true;
                			VIEWSTATE.hidden( loc );
                		}

                	});

                	return _I;
                },             	 

                codeMatch : function ( zipObjArr ) {
                	var _I = this;
                	return _.find( zipObjArr, function( v ){
                		return v._code === _I.userSearch || v === _I.userSearch;
                	});
                },

                validateSearch : function () {
                    return this.config.codeType !== "custom" ? K.Util.validate( this.userSearch, this.config.codeType ) : true;
                },

                geoCodeSearch : function ( cb ) {
                    var _I = this;

                    _I.GMAP_GEOCODER.geocode({ address : _I.userSearch }, function( results, status ) {

                        if ( status != google.maps.GeocoderStatus.OK ) {
                            _I.triggerError( _I.config.messages.searchError );
                            return;
                        }

                        geoData = results[0].geometry.location;
                        K.USER_COORDS = new google.maps.LatLng(geoData.lat(), geoData.lng());

                        if ( typeof cb === "function" ) cb();
                    });
                },

                locFound : function () {
                    if ( K.GMARKERS_VIEWSTATE.report().hidden.length === K.LOC_DATA.length ) {
                        this.triggerError( this.config.messages.noResults );
                        return false; 
                    }

                    return true;
                },

                sort : function () {
                	var 
                	report = K.GMARKERS_VIEWSTATE.report(),
                	locs   = [];
                	if ( report.shown.length > 0 ) {

                		_.each( report.shown, function ( loc ) {
                			locs.push( loc );
                		});

                		_.each( report.hidden, function ( loc ) {
                			locs.push( loc );
                		});
                	}

                	K.LOC_DATA = locs;
                	return this;
                },

                triggerError : function ( msg ) {
                    this.hub.broadcast( MSGS.user_search_response, msg );
                },

                complete : function () {

                	if ( !!this.config.redirect.onSuccess ) {
                		this.redirect();
                		return;
                	}

                    this.hub.broadcast( MSGS.loc_data_sorted, this.config.hideFlag );
                    return this;
                },

                redirect : function () {
                	var 
                	targetLoc = K.GMARKERS_VIEWSTATE.report().shown[0],
                	uriProp   = this.config.redirect.uriProp;
                	if ( uriProp in targetLoc ) window.location = targetLoc[ uriProp ];
                }

            }
        });

		
        //::::::::::::::::::::::::::::::::::::::::
        //:::::::::::: GMAPS API Modules


        //:: CANVAS
        __M({
            ns   : NS.gmaps,
            name : "CANVAS",
            use  : false,
            
            config : {
                mapNode : ""
            },

            aliases : ["mapCanvas", {
            	mapNode : "mapNode"
            }],

            module : {
                
                init : function () {
                    var _I = this;

                    _I.hub.listen( MSGS.gmap_config_ready, function( config ){
                        _I.build( config );
                        _I.hub.broadcast( MSGS.gmap_dom_ready, K.GMAP);
                    });
                    
                },

                build : function ( config ) {
                    var node = $( this.config.mapNode );

                    if ( K.Util.isNode( node ) ) {
                    	this.config.mapNode = node[0];
	                    this.mapConfig      = config; 
	                    this.loadMap();
                    }
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
            
            config : {
                mapTypeId : "",
                center : {
                    lat : 0,
                    lng : 0
                },
                zoom  : 10
            },

            aliases : ["mapConfig", {
            	mapType : "mapTypeId",
            	lat : "center.lat",
            	lng : "center.lng",
            	zoom : "zoom"
            }],

            module : {

                init : function () {
                    var _I = this;

                    _I.hub.listen( MSGS.gmap_api_loaded, function () {
                        _I.build();
                        _I.hub.broadcast( MSGS.gmap_config_ready, _I.config );
                    });
                },

                build : function () {
                	var buildConfig = this.buildConfig;

                	_.each( this.config, function( v, k, o ){
                		if ( buildConfig[ k ] ) o[ k ] = buildConfig[ k ]( v );
                	});

                },

                buildConfig : {

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
            
            config : {
                file : "https://maps.googleapis.com/maps/api/js",
                params : {
                    sensor   : "false",
                    callback : "gmapscb"
                }
            },

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

        //:: TEMPLATE LOADER
        __M({
            ns   : NS.templates,
            name : "TMPL",
            use  : false,

            config : {
                file : ""
            },

            aliases : ["templates", {
            	file : "file"
            }],

            module : {

                init : function () {
                    K.Util.ajax({
                    	type    : "GET",
                        url     : trim( this.config.file ),
                        success : this.prepare
                    });
                },

                prepare : function ( tmplHTML ) {
                    $("<tmpl />")
                    .append( tmplHTML )
                    .find("script")
                    .each(function(){
                        var 
                        $this   = $(this)[0],
                        tmplId  = trim( $this.id ),
                        tmplTxt = trim( $this.innerHTML );
                        K.TEMPLATES[ tmplId ] = tmplTxt.replace(/\>[\r\n|\n|\n\t ]+\</g, "><");
                    });

                    this.hub.broadcast( MSGS.templates_loaded );
                }
            }
        });

		
    }());
	// - / METRO APP -


	// INIT
	window.YDLMAPS = K.Builder.start;

}( jQuery, window ));
