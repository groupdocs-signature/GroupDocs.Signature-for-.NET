/*
 * jQuery UI Touch Punch 0.2.2
 *
 * Copyright 2011, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
(function(b){b.support.touch="ontouchend" in document;if(!b.support.touch){return;}var c=b.ui.mouse.prototype,e=c._mouseInit,a;function d(g,h){if(g.originalEvent.touches.length>1){return;}g.preventDefault();var i=g.originalEvent.changedTouches[0],f=document.createEvent("MouseEvents");f.initMouseEvent(h,true,true,window,1,i.screenX,i.screenY,i.clientX,i.clientY,false,false,false,false,0,null);g.target.dispatchEvent(f);}c._touchStart=function(g){var f=this;if(a||!f._mouseCapture(g.originalEvent.changedTouches[0])){return;}a=true;f._touchMoved=false;d(g,"mouseover");d(g,"mousemove");d(g,"mousedown");};c._touchMove=function(f){if(!a){return;}this._touchMoved=true;d(f,"mousemove");};c._touchEnd=function(f){if(!a){return;}d(f,"mouseup");d(f,"mouseout");if(!this._touchMoved){d(f,"click");}a=false;};c._mouseInit=function(){var f=this;f.element.bind("touchstart",b.proxy(f,"_touchStart")).bind("touchmove",b.proxy(f,"_touchMove")).bind("touchend",b.proxy(f,"_touchEnd"));e.call(f);};})(jQuery);
JsInject={Container:function(){this.serviceEntries=[];this.disposables=[]}};JsInject.Container.prototype.Resolve=function(a,c,b,d,e,f,g,h,i,j){return this.ResolveInternal(a,!0,c,b,d,e,f,g,h,i,j)};JsInject.Container.prototype.TryResolve=function(a,c,b,d,e,f,g,h,i,j){return this.ResolveInternal(a,!1,c,b,d,e,f,g,h,i,j)};
JsInject.Container.prototype.RegisterInternal=function(a,c,b,d){if(this.RegisteredInternal(a))throw"Factory with name '"+a+"' alredy registered";this.serviceEntries[a]={factory:c,scope:b,owner:d,instance:null}};JsInject.Container.prototype.Dispose=function(){for(var a in this.disposables)this.disposables[a].Dispose()};
JsInject.Container.prototype.ResolveInternal=function(a,c,b,d,e,f,g,h,i,j,k){if(!this.RegisteredInternal(a))if(c)throw"Factory with name '"+a+"' is not registered";else return null;a=this.serviceEntries[a];if(a.scope==="container"){if(a.instance===null)a.instance=this.CreateInstanceInternal(a.factory,a.owner,b,d,e,f,g,h,i,j,k);return a.instance}return this.CreateInstanceInternal(a.factory,a.owner,b,d,e,f,g,h,i,j,k)};
JsInject.Container.prototype.CreateInstanceInternal=function(a,c,b,d,e,f,g,h,i,j,k){a=a(this,b,d,e,f,g,h,i,j,k);c==="container"&&typeof a.Dispose==="function"&&this.disposables.push(a);return a};JsInject.Container.prototype.RegisteredInternal=function(a){return this.serviceEntries[a]!==void 0};JsInject.Registration=function(a,c){this.name=a;this.factory=c;this.scope="none";this.owner="consumer"};JsInject.Registration.prototype.Reused=function(){this.scope="container";this.Owned();return this};
JsInject.Registration.prototype.Owned=function(){this.owner="container";return this};JsInject.ContainerBuilder=function(){this.registrations=[]};JsInject.ContainerBuilder.prototype.Register=function(a,c){var b=new JsInject.Registration(a,c);this.registrations.push(b);return b};JsInject.ContainerBuilder.prototype.Create=function(){var a=new JsInject.Container,c;for(c in this.registrations){var b=this.registrations[c];a.RegisterInternal(b.name,b.factory,b.scope,b.owner)}return a};
JsInject.Container.prototype.Register=function(a,c,b){a=new JsInject.Registration(a,c);b&&a.Reused();this.RegisterInternal(a.name,a.factory,a.scope,a.owner)};
/*!
* Bootstrap.js by @fat & @mdo
* Copyright 2012 Twitter, Inc. - 2.3.2
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/
!function(e){"use strict";e(function(){e.support.transition=function(){var e=function(){var e=document.createElement("bootstrap"),t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},n;for(n in t)if(e.style[n]!==undefined)return t[n]}();return e&&{end:e}}()})}(window.jQuery),!function(e){"use strict";var t='[data-dismiss="alert"]',n=function(n){e(n).on("click",t,this.close)};n.prototype.close=function(t){function s(){i.trigger("closed").remove()}var n=e(this),r=n.attr("data-target"),i;r||(r=n.attr("href"),r=r&&r.replace(/.*(?=#[^\s]*$)/,"")),i=e(r),t&&t.preventDefault(),i.length||(i=n.hasClass("alert")?n:n.parent()),i.trigger(t=e.Event("close"));if(t.isDefaultPrevented())return;i.removeClass("in"),e.support.transition&&i.hasClass("fade")?i.on(e.support.transition.end,s):s()};var r=e.fn.alert;e.fn.alert=function(t){return this.each(function(){var r=e(this),i=r.data("alert");i||r.data("alert",i=new n(this)),typeof t=="string"&&i[t].call(r)})},e.fn.alert.Constructor=n,e.fn.alert.noConflict=function(){return e.fn.alert=r,this},e(document).on("click.alert.data-api",t,n.prototype.close)}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.options=e.extend({},e.fn.button.defaults,n)};t.prototype.setState=function(e){var t="disabled",n=this.$element,r=n.data(),i=n.is("input")?"val":"html";e+="Text",r.resetText||n.data("resetText",n[i]()),n[i](r[e]||this.options[e]),setTimeout(function(){e=="loadingText"?n.addClass(t).attr(t,t):n.removeClass(t).removeAttr(t)},0)},t.prototype.toggle=function(){var e=this.$element.closest('[data-toggle="buttons-radio"]');e&&e.find(".active").removeClass("active"),this.$element.toggleClass("active")};var n=e.fn.button;e.fn.button=function(n){return this.each(function(){var r=e(this),i=r.data("button"),s=typeof n=="object"&&n;i||r.data("button",i=new t(this,s)),n=="toggle"?i.toggle():n&&i.setState(n)})},e.fn.button.defaults={loadingText:"loading..."},e.fn.button.Constructor=t,e.fn.button.noConflict=function(){return e.fn.button=n,this},e(document).on("click.button.data-api","[data-toggle^=button]",function(t){var n=e(t.target);n.hasClass("btn")||(n=n.closest(".btn")),n.button("toggle")})}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.$indicators=this.$element.find(".carousel-indicators"),this.options=n,this.options.pause=="hover"&&this.$element.on("mouseenter",e.proxy(this.pause,this)).on("mouseleave",e.proxy(this.cycle,this))};t.prototype={cycle:function(t){return t||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(e.proxy(this.next,this),this.options.interval)),this},getActiveIndex:function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},to:function(t){var n=this.getActiveIndex(),r=this;if(t>this.$items.length-1||t<0)return;return this.sliding?this.$element.one("slid",function(){r.to(t)}):n==t?this.pause().cycle():this.slide(t>n?"next":"prev",e(this.$items[t]))},pause:function(t){return t||(this.paused=!0),this.$element.find(".next, .prev").length&&e.support.transition.end&&(this.$element.trigger(e.support.transition.end),this.cycle(!0)),clearInterval(this.interval),this.interval=null,this},next:function(){if(this.sliding)return;return this.slide("next")},prev:function(){if(this.sliding)return;return this.slide("prev")},slide:function(t,n){var r=this.$element.find(".item.active"),i=n||r[t](),s=this.interval,o=t=="next"?"left":"right",u=t=="next"?"first":"last",a=this,f;this.sliding=!0,s&&this.pause(),i=i.length?i:this.$element.find(".item")[u](),f=e.Event("slide",{relatedTarget:i[0],direction:o});if(i.hasClass("active"))return;this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid",function(){var t=e(a.$indicators.children()[a.getActiveIndex()]);t&&t.addClass("active")}));if(e.support.transition&&this.$element.hasClass("slide")){this.$element.trigger(f);if(f.isDefaultPrevented())return;i.addClass(t),i[0].offsetWidth,r.addClass(o),i.addClass(o),this.$element.one(e.support.transition.end,function(){i.removeClass([t,o].join(" ")).addClass("active"),r.removeClass(["active",o].join(" ")),a.sliding=!1,setTimeout(function(){a.$element.trigger("slid")},0)})}else{this.$element.trigger(f);if(f.isDefaultPrevented())return;r.removeClass("active"),i.addClass("active"),this.sliding=!1,this.$element.trigger("slid")}return s&&this.cycle(),this}};var n=e.fn.carousel;e.fn.carousel=function(n){return this.each(function(){var r=e(this),i=r.data("carousel"),s=e.extend({},e.fn.carousel.defaults,typeof n=="object"&&n),o=typeof n=="string"?n:s.slide;i||r.data("carousel",i=new t(this,s)),typeof n=="number"?i.to(n):o?i[o]():s.interval&&i.pause().cycle()})},e.fn.carousel.defaults={interval:5e3,pause:"hover"},e.fn.carousel.Constructor=t,e.fn.carousel.noConflict=function(){return e.fn.carousel=n,this},e(document).on("click.carousel.data-api","[data-slide], [data-slide-to]",function(t){var n=e(this),r,i=e(n.attr("data-target")||(r=n.attr("href"))&&r.replace(/.*(?=#[^\s]+$)/,"")),s=e.extend({},i.data(),n.data()),o;i.carousel(s),(o=n.attr("data-slide-to"))&&i.data("carousel").pause().to(o).cycle(),t.preventDefault()})}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.options=e.extend({},e.fn.collapse.defaults,n),this.options.parent&&(this.$parent=e(this.options.parent)),this.options.toggle&&this.toggle()};t.prototype={constructor:t,dimension:function(){var e=this.$element.hasClass("width");return e?"width":"height"},show:function(){var t,n,r,i;if(this.transitioning||this.$element.hasClass("in"))return;t=this.dimension(),n=e.camelCase(["scroll",t].join("-")),r=this.$parent&&this.$parent.find("> .accordion-group > .in");if(r&&r.length){i=r.data("collapse");if(i&&i.transitioning)return;r.collapse("hide"),i||r.data("collapse",null)}this.$element[t](0),this.transition("addClass",e.Event("show"),"shown"),e.support.transition&&this.$element[t](this.$element[0][n])},hide:function(){var t;if(this.transitioning||!this.$element.hasClass("in"))return;t=this.dimension(),this.reset(this.$element[t]()),this.transition("removeClass",e.Event("hide"),"hidden"),this.$element[t](0)},reset:function(e){var t=this.dimension();return this.$element.removeClass("collapse")[t](e||"auto")[0].offsetWidth,this.$element[e!==null?"addClass":"removeClass"]("collapse"),this},transition:function(t,n,r){var i=this,s=function(){n.type=="show"&&i.reset(),i.transitioning=0,i.$element.trigger(r)};this.$element.trigger(n);if(n.isDefaultPrevented())return;this.transitioning=1,this.$element[t]("in"),e.support.transition&&this.$element.hasClass("collapse")?this.$element.one(e.support.transition.end,s):s()},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()}};var n=e.fn.collapse;e.fn.collapse=function(n){return this.each(function(){var r=e(this),i=r.data("collapse"),s=e.extend({},e.fn.collapse.defaults,r.data(),typeof n=="object"&&n);i||r.data("collapse",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.collapse.defaults={toggle:!0},e.fn.collapse.Constructor=t,e.fn.collapse.noConflict=function(){return e.fn.collapse=n,this},e(document).on("click.collapse.data-api","[data-toggle=collapse]",function(t){var n=e(this),r,i=n.attr("data-target")||t.preventDefault()||(r=n.attr("href"))&&r.replace(/.*(?=#[^\s]+$)/,""),s=e(i).data("collapse")?"toggle":n.data();n[e(i).hasClass("in")?"addClass":"removeClass"]("collapsed"),e(i).collapse(s)})}(window.jQuery),!function(e){"use strict";function r(){e(".dropdown-backdrop").remove(),e(t).each(function(){i(e(this)).removeClass("open")})}function i(t){var n=t.attr("data-target"),r;n||(n=t.attr("href"),n=n&&/#/.test(n)&&n.replace(/.*(?=#[^\s]*$)/,"")),r=n&&e(n);if(!r||!r.length)r=t.parent();return r}var t="[data-toggle=dropdown]",n=function(t){var n=e(t).on("click.dropdown.data-api",this.toggle);e("html").on("click.dropdown.data-api",function(){n.parent().removeClass("open")})};n.prototype={constructor:n,toggle:function(t){var n=e(this),s,o;if(n.is(".disabled, :disabled"))return;return s=i(n),o=s.hasClass("open"),r(),o||("ontouchstart"in document.documentElement&&e('<div class="dropdown-backdrop"/>').insertBefore(e(this)).on("click",r),s.toggleClass("open")),n.focus(),!1},keydown:function(n){var r,s,o,u,a,f;if(!/(38|40|27)/.test(n.keyCode))return;r=e(this),n.preventDefault(),n.stopPropagation();if(r.is(".disabled, :disabled"))return;u=i(r),a=u.hasClass("open");if(!a||a&&n.keyCode==27)return n.which==27&&u.find(t).focus(),r.click();s=e("[role=menu] li:not(.divider):visible a",u);if(!s.length)return;f=s.index(s.filter(":focus")),n.keyCode==38&&f>0&&f--,n.keyCode==40&&f<s.length-1&&f++,~f||(f=0),s.eq(f).focus()}};var s=e.fn.dropdown;e.fn.dropdown=function(t){return this.each(function(){var r=e(this),i=r.data("dropdown");i||r.data("dropdown",i=new n(this)),typeof t=="string"&&i[t].call(r)})},e.fn.dropdown.Constructor=n,e.fn.dropdown.noConflict=function(){return e.fn.dropdown=s,this},e(document).on("click.dropdown.data-api",r).on("click.dropdown.data-api",".dropdown form",function(e){e.stopPropagation()}).on("click.dropdown.data-api",t,n.prototype.toggle).on("keydown.dropdown.data-api",t+", [role=menu]",n.prototype.keydown)}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.options=n,this.$element=e(t).delegate('[data-dismiss="modal"]',"click.dismiss.modal",e.proxy(this.hide,this)),this.options.remote&&this.$element.find(".modal-body").load(this.options.remote)};t.prototype={constructor:t,toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var t=this,n=e.Event("show");this.$element.trigger(n);if(this.isShown||n.isDefaultPrevented())return;this.isShown=!0,this.escape(),this.backdrop(function(){var n=e.support.transition&&t.$element.hasClass("fade");t.$element.parent().length||t.$element.appendTo(document.body),t.$element.show(),n&&t.$element[0].offsetWidth,t.$element.addClass("in").attr("aria-hidden",!1),t.enforceFocus(),n?t.$element.one(e.support.transition.end,function(){t.$element.focus().trigger("shown")}):t.$element.focus().trigger("shown")})},hide:function(t){t&&t.preventDefault();var n=this;t=e.Event("hide"),this.$element.trigger(t);if(!this.isShown||t.isDefaultPrevented())return;this.isShown=!1,this.escape(),e(document).off("focusin.modal"),this.$element.removeClass("in").attr("aria-hidden",!0),e.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal()},enforceFocus:function(){var t=this;e(document).on("focusin.modal",function(e){t.$element[0]!==e.target&&!t.$element.has(e.target).length&&t.$element.focus()})},escape:function(){var e=this;this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.modal",function(t){t.which==27&&e.hide()}):this.isShown||this.$element.off("keyup.dismiss.modal")},hideWithTransition:function(){var t=this,n=setTimeout(function(){t.$element.off(e.support.transition.end),t.hideModal()},500);this.$element.one(e.support.transition.end,function(){clearTimeout(n),t.hideModal()})},hideModal:function(){var e=this;this.$element.hide(),this.backdrop(function(){e.removeBackdrop(),e.$element.trigger("hidden")})},removeBackdrop:function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},backdrop:function(t){var n=this,r=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var i=e.support.transition&&r;this.$backdrop=e('<div class="modal-backdrop '+r+'" />').appendTo(document.body),this.$backdrop.click(this.options.backdrop=="static"?e.proxy(this.$element[0].focus,this.$element[0]):e.proxy(this.hide,this)),i&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in");if(!t)return;i?this.$backdrop.one(e.support.transition.end,t):t()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),e.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(e.support.transition.end,t):t()):t&&t()}};var n=e.fn.modal;e.fn.modal=function(n){return this.each(function(){var r=e(this),i=r.data("modal"),s=e.extend({},e.fn.modal.defaults,r.data(),typeof n=="object"&&n);i||r.data("modal",i=new t(this,s)),typeof n=="string"?i[n]():s.show&&i.show()})},e.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0},e.fn.modal.Constructor=t,e.fn.modal.noConflict=function(){return e.fn.modal=n,this},e(document).on("click.modal.data-api",'[data-toggle="modal"]',function(t){var n=e(this),r=n.attr("href"),i=e(n.attr("data-target")||r&&r.replace(/.*(?=#[^\s]+$)/,"")),s=i.data("modal")?"toggle":e.extend({remote:!/#/.test(r)&&r},i.data(),n.data());t.preventDefault(),i.modal(s).one("hide",function(){n.focus()})})}(window.jQuery),!function(e){"use strict";var t=function(e,t){this.init("tooltip",e,t)};t.prototype={constructor:t,init:function(t,n,r){var i,s,o,u,a;this.type=t,this.$element=e(n),this.options=this.getOptions(r),this.enabled=!0,o=this.options.trigger.split(" ");for(a=o.length;a--;)u=o[a],u=="click"?this.$element.on("click."+this.type,this.options.selector,e.proxy(this.toggle,this)):u!="manual"&&(i=u=="hover"?"mouseenter":"focus",s=u=="hover"?"mouseleave":"blur",this.$element.on(i+"."+this.type,this.options.selector,e.proxy(this.enter,this)),this.$element.on(s+"."+this.type,this.options.selector,e.proxy(this.leave,this)));this.options.selector?this._options=e.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(t){return t=e.extend({},e.fn[this.type].defaults,this.$element.data(),t),t.delay&&typeof t.delay=="number"&&(t.delay={show:t.delay,hide:t.delay}),t},enter:function(t){var n=e.fn[this.type].defaults,r={},i;this._options&&e.each(this._options,function(e,t){n[e]!=t&&(r[e]=t)},this),i=e(t.currentTarget)[this.type](r).data(this.type);if(!i.options.delay||!i.options.delay.show)return i.show();clearTimeout(this.timeout),i.hoverState="in",this.timeout=setTimeout(function(){i.hoverState=="in"&&i.show()},i.options.delay.show)},leave:function(t){var n=e(t.currentTarget)[this.type](this._options).data(this.type);this.timeout&&clearTimeout(this.timeout);if(!n.options.delay||!n.options.delay.hide)return n.hide();n.hoverState="out",this.timeout=setTimeout(function(){n.hoverState=="out"&&n.hide()},n.options.delay.hide)},show:function(){var t,n,r,i,s,o,u=e.Event("show");if(this.hasContent()&&this.enabled){this.$element.trigger(u);if(u.isDefaultPrevented())return;t=this.tip(),this.setContent(),this.options.animation&&t.addClass("fade"),s=typeof this.options.placement=="function"?this.options.placement.call(this,t[0],this.$element[0]):this.options.placement,t.detach().css({top:0,left:0,display:"block"}),this.options.container?t.appendTo(this.options.container):t.insertAfter(this.$element),n=this.getPosition(),r=t[0].offsetWidth,i=t[0].offsetHeight;switch(s){case"bottom":o={top:n.top+n.height,left:n.left+n.width/2-r/2};break;case"top":o={top:n.top-i,left:n.left+n.width/2-r/2};break;case"left":o={top:n.top+n.height/2-i/2,left:n.left-r};break;case"right":o={top:n.top+n.height/2-i/2,left:n.left+n.width}}this.applyPlacement(o,s),this.$element.trigger("shown")}},applyPlacement:function(e,t){var n=this.tip(),r=n[0].offsetWidth,i=n[0].offsetHeight,s,o,u,a;n.offset(e).addClass(t).addClass("in"),s=n[0].offsetWidth,o=n[0].offsetHeight,t=="top"&&o!=i&&(e.top=e.top+i-o,a=!0),t=="bottom"||t=="top"?(u=0,e.left<0&&(u=e.left*-2,e.left=0,n.offset(e),s=n[0].offsetWidth,o=n[0].offsetHeight),this.replaceArrow(u-r+s,s,"left")):this.replaceArrow(o-i,o,"top"),a&&n.offset(e)},replaceArrow:function(e,t,n){this.arrow().css(n,e?50*(1-e/t)+"%":"")},setContent:function(){var e=this.tip(),t=this.getTitle();e.find(".tooltip-inner")[this.options.html?"html":"text"](t),e.removeClass("fade in top bottom left right")},hide:function(){function i(){var t=setTimeout(function(){n.off(e.support.transition.end).detach()},500);n.one(e.support.transition.end,function(){clearTimeout(t),n.detach()})}var t=this,n=this.tip(),r=e.Event("hide");this.$element.trigger(r);if(r.isDefaultPrevented())return;return n.removeClass("in"),e.support.transition&&this.$tip.hasClass("fade")?i():n.detach(),this.$element.trigger("hidden"),this},fixTitle:function(){var e=this.$element;(e.attr("title")||typeof e.attr("data-original-title")!="string")&&e.attr("data-original-title",e.attr("title")||"").attr("title","")},hasContent:function(){return this.getTitle()},getPosition:function(){var t=this.$element[0];return e.extend({},typeof t.getBoundingClientRect=="function"?t.getBoundingClientRect():{width:t.offsetWidth,height:t.offsetHeight},this.$element.offset())},getTitle:function(){var e,t=this.$element,n=this.options;return e=t.attr("data-original-title")||(typeof n.title=="function"?n.title.call(t[0]):n.title),e},tip:function(){return this.$tip=this.$tip||e(this.options.template)},arrow:function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(t){var n=t?e(t.currentTarget)[this.type](this._options).data(this.type):this;n.tip().hasClass("in")?n.hide():n.show()},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}};var n=e.fn.tooltip;e.fn.tooltip=function(n){return this.each(function(){var r=e(this),i=r.data("tooltip"),s=typeof n=="object"&&n;i||r.data("tooltip",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.tooltip.Constructor=t,e.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},e.fn.tooltip.noConflict=function(){return e.fn.tooltip=n,this}}(window.jQuery),!function(e){"use strict";var t=function(e,t){this.init("popover",e,t)};t.prototype=e.extend({},e.fn.tooltip.Constructor.prototype,{constructor:t,setContent:function(){var e=this.tip(),t=this.getTitle(),n=this.getContent();e.find(".popover-title")[this.options.html?"html":"text"](t),e.find(".popover-content")[this.options.html?"html":"text"](n),e.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var e,t=this.$element,n=this.options;return e=(typeof n.content=="function"?n.content.call(t[0]):n.content)||t.attr("data-content"),e},tip:function(){return this.$tip||(this.$tip=e(this.options.template)),this.$tip},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}});var n=e.fn.popover;e.fn.popover=function(n){return this.each(function(){var r=e(this),i=r.data("popover"),s=typeof n=="object"&&n;i||r.data("popover",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.popover.Constructor=t,e.fn.popover.defaults=e.extend({},e.fn.tooltip.defaults,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),e.fn.popover.noConflict=function(){return e.fn.popover=n,this}}(window.jQuery),!function(e){"use strict";function t(t,n){var r=e.proxy(this.process,this),i=e(t).is("body")?e(window):e(t),s;this.options=e.extend({},e.fn.scrollspy.defaults,n),this.$scrollElement=i.on("scroll.scroll-spy.data-api",r),this.selector=(this.options.target||(s=e(t).attr("href"))&&s.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.$body=e("body"),this.refresh(),this.process()}t.prototype={constructor:t,refresh:function(){var t=this,n;this.offsets=e([]),this.targets=e([]),n=this.$body.find(this.selector).map(function(){var n=e(this),r=n.data("target")||n.attr("href"),i=/^#\w/.test(r)&&e(r);return i&&i.length&&[[i.position().top+(!e.isWindow(t.$scrollElement.get(0))&&t.$scrollElement.scrollTop()),r]]||null}).sort(function(e,t){return e[0]-t[0]}).each(function(){t.offsets.push(this[0]),t.targets.push(this[1])})},process:function(){var e=this.$scrollElement.scrollTop()+this.options.offset,t=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,n=t-this.$scrollElement.height(),r=this.offsets,i=this.targets,s=this.activeTarget,o;if(e>=n)return s!=(o=i.last()[0])&&this.activate(o);for(o=r.length;o--;)s!=i[o]&&e>=r[o]&&(!r[o+1]||e<=r[o+1])&&this.activate(i[o])},activate:function(t){var n,r;this.activeTarget=t,e(this.selector).parent(".active").removeClass("active"),r=this.selector+'[data-target="'+t+'"],'+this.selector+'[href="'+t+'"]',n=e(r).parent("li").addClass("active"),n.parent(".dropdown-menu").length&&(n=n.closest("li.dropdown").addClass("active")),n.trigger("activate")}};var n=e.fn.scrollspy;e.fn.scrollspy=function(n){return this.each(function(){var r=e(this),i=r.data("scrollspy"),s=typeof n=="object"&&n;i||r.data("scrollspy",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.scrollspy.Constructor=t,e.fn.scrollspy.defaults={offset:10},e.fn.scrollspy.noConflict=function(){return e.fn.scrollspy=n,this},e(window).on("load",function(){e('[data-spy="scroll"]').each(function(){var t=e(this);t.scrollspy(t.data())})})}(window.jQuery),!function(e){"use strict";var t=function(t){this.element=e(t)};t.prototype={constructor:t,show:function(){var t=this.element,n=t.closest("ul:not(.dropdown-menu)"),r=t.attr("data-target"),i,s,o;r||(r=t.attr("href"),r=r&&r.replace(/.*(?=#[^\s]*$)/,""));if(t.parent("li").hasClass("active"))return;i=n.find(".active:last a")[0],o=e.Event("show",{relatedTarget:i}),t.trigger(o);if(o.isDefaultPrevented())return;s=e(r),this.activate(t.parent("li"),n),this.activate(s,s.parent(),function(){t.trigger({type:"shown",relatedTarget:i})})},activate:function(t,n,r){function o(){i.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),t.addClass("active"),s?(t[0].offsetWidth,t.addClass("in")):t.removeClass("fade"),t.parent(".dropdown-menu")&&t.closest("li.dropdown").addClass("active"),r&&r()}var i=n.find("> .active"),s=r&&e.support.transition&&i.hasClass("fade");s?i.one(e.support.transition.end,o):o(),i.removeClass("in")}};var n=e.fn.tab;e.fn.tab=function(n){return this.each(function(){var r=e(this),i=r.data("tab");i||r.data("tab",i=new t(this)),typeof n=="string"&&i[n]()})},e.fn.tab.Constructor=t,e.fn.tab.noConflict=function(){return e.fn.tab=n,this},e(document).on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(t){t.preventDefault(),e(this).tab("show")})}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.options=e.extend({},e.fn.typeahead.defaults,n),this.matcher=this.options.matcher||this.matcher,this.sorter=this.options.sorter||this.sorter,this.highlighter=this.options.highlighter||this.highlighter,this.updater=this.options.updater||this.updater,this.source=this.options.source,this.$menu=e(this.options.menu),this.shown=!1,this.listen()};t.prototype={constructor:t,select:function(){var e=this.$menu.find(".active").attr("data-value");return this.$element.val(this.updater(e)).change(),this.hide()},updater:function(e){return e},show:function(){var t=e.extend({},this.$element.position(),{height:this.$element[0].offsetHeight});return this.$menu.insertAfter(this.$element).css({top:t.top+t.height,left:t.left}).show(),this.shown=!0,this},hide:function(){return this.$menu.hide(),this.shown=!1,this},lookup:function(t){var n;return this.query=this.$element.val(),!this.query||this.query.length<this.options.minLength?this.shown?this.hide():this:(n=e.isFunction(this.source)?this.source(this.query,e.proxy(this.process,this)):this.source,n?this.process(n):this)},process:function(t){var n=this;return t=e.grep(t,function(e){return n.matcher(e)}),t=this.sorter(t),t.length?this.render(t.slice(0,this.options.items)).show():this.shown?this.hide():this},matcher:function(e){return~e.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(e){var t=[],n=[],r=[],i;while(i=e.shift())i.toLowerCase().indexOf(this.query.toLowerCase())?~i.indexOf(this.query)?n.push(i):r.push(i):t.push(i);return t.concat(n,r)},highlighter:function(e){var t=this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");return e.replace(new RegExp("("+t+")","ig"),function(e,t){return"<strong>"+t+"</strong>"})},render:function(t){var n=this;return t=e(t).map(function(t,r){return t=e(n.options.item).attr("data-value",r),t.find("a").html(n.highlighter(r)),t[0]}),t.first().addClass("active"),this.$menu.html(t),this},next:function(t){var n=this.$menu.find(".active").removeClass("active"),r=n.next();r.length||(r=e(this.$menu.find("li")[0])),r.addClass("active")},prev:function(e){var t=this.$menu.find(".active").removeClass("active"),n=t.prev();n.length||(n=this.$menu.find("li").last()),n.addClass("active")},listen:function(){this.$element.on("focus",e.proxy(this.focus,this)).on("blur",e.proxy(this.blur,this)).on("keypress",e.proxy(this.keypress,this)).on("keyup",e.proxy(this.keyup,this)),this.eventSupported("keydown")&&this.$element.on("keydown",e.proxy(this.keydown,this)),this.$menu.on("click",e.proxy(this.click,this)).on("mouseenter","li",e.proxy(this.mouseenter,this)).on("mouseleave","li",e.proxy(this.mouseleave,this))},eventSupported:function(e){var t=e in this.$element;return t||(this.$element.setAttribute(e,"return;"),t=typeof this.$element[e]=="function"),t},move:function(e){if(!this.shown)return;switch(e.keyCode){case 9:case 13:case 27:e.preventDefault();break;case 38:e.preventDefault(),this.prev();break;case 40:e.preventDefault(),this.next()}e.stopPropagation()},keydown:function(t){this.suppressKeyPressRepeat=~e.inArray(t.keyCode,[40,38,9,13,27]),this.move(t)},keypress:function(e){if(this.suppressKeyPressRepeat)return;this.move(e)},keyup:function(e){switch(e.keyCode){case 40:case 38:case 16:case 17:case 18:break;case 9:case 13:if(!this.shown)return;this.select();break;case 27:if(!this.shown)return;this.hide();break;default:this.lookup()}e.stopPropagation(),e.preventDefault()},focus:function(e){this.focused=!0},blur:function(e){this.focused=!1,!this.mousedover&&this.shown&&this.hide()},click:function(e){e.stopPropagation(),e.preventDefault(),this.select(),this.$element.focus()},mouseenter:function(t){this.mousedover=!0,this.$menu.find(".active").removeClass("active"),e(t.currentTarget).addClass("active")},mouseleave:function(e){this.mousedover=!1,!this.focused&&this.shown&&this.hide()}};var n=e.fn.typeahead;e.fn.typeahead=function(n){return this.each(function(){var r=e(this),i=r.data("typeahead"),s=typeof n=="object"&&n;i||r.data("typeahead",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',item:'<li><a href="#"></a></li>',minLength:1},e.fn.typeahead.Constructor=t,e.fn.typeahead.noConflict=function(){return e.fn.typeahead=n,this},e(document).on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(t){var n=e(this);if(n.data("typeahead"))return;n.typeahead(n.data())})}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.options=e.extend({},e.fn.affix.defaults,n),this.$window=e(window).on("scroll.affix.data-api",e.proxy(this.checkPosition,this)).on("click.affix.data-api",e.proxy(function(){setTimeout(e.proxy(this.checkPosition,this),1)},this)),this.$element=e(t),this.checkPosition()};t.prototype.checkPosition=function(){if(!this.$element.is(":visible"))return;var t=e(document).height(),n=this.$window.scrollTop(),r=this.$element.offset(),i=this.options.offset,s=i.bottom,o=i.top,u="affix affix-top affix-bottom",a;typeof i!="object"&&(s=o=i),typeof o=="function"&&(o=i.top()),typeof s=="function"&&(s=i.bottom()),a=this.unpin!=null&&n+this.unpin<=r.top?!1:s!=null&&r.top+this.$element.height()>=t-s?"bottom":o!=null&&n<=o?"top":!1;if(this.affixed===a)return;this.affixed=a,this.unpin=a=="bottom"?r.top-n:null,this.$element.removeClass(u).addClass("affix"+(a?"-"+a:""))};var n=e.fn.affix;e.fn.affix=function(n){return this.each(function(){var r=e(this),i=r.data("affix"),s=typeof n=="object"&&n;i||r.data("affix",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.affix.Constructor=t,e.fn.affix.defaults={offset:0},e.fn.affix.noConflict=function(){return e.fn.affix=n,this},e(window).on("load",function(){e('[data-spy="affix"]').each(function(){var t=e(this),n=t.data();n.offset=n.offset||{},n.offsetBottom&&(n.offset.bottom=n.offsetBottom),n.offsetTop&&(n.offset.top=n.offsetTop),t.affix(n)})})}(window.jQuery);
// Knockout JavaScript library v2.2.1
// (c) Steven Sanderson - http://knockoutjs.com/
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

(function() {function j(w){throw w;}var m=!0,p=null,r=!1;function u(w){return function(){return w}};var x=window,y=document,ga=navigator,F=window.jQuery,I=void 0;
function L(w){function ha(a,d,c,e,f){var g=[];a=b.j(function(){var a=d(c,f)||[];0<g.length&&(b.a.Ya(M(g),a),e&&b.r.K(e,p,[c,a,f]));g.splice(0,g.length);b.a.P(g,a)},p,{W:a,Ka:function(){return 0==g.length||!b.a.X(g[0])}});return{M:g,j:a.pa()?a:I}}function M(a){for(;a.length&&!b.a.X(a[0]);)a.splice(0,1);if(1<a.length){for(var d=a[0],c=a[a.length-1],e=[d];d!==c;){d=d.nextSibling;if(!d)return;e.push(d)}Array.prototype.splice.apply(a,[0,a.length].concat(e))}return a}function S(a,b,c,e,f){var g=Math.min,
h=Math.max,k=[],l,n=a.length,q,s=b.length,v=s-n||1,G=n+s+1,J,A,z;for(l=0;l<=n;l++){A=J;k.push(J=[]);z=g(s,l+v);for(q=h(0,l-1);q<=z;q++)J[q]=q?l?a[l-1]===b[q-1]?A[q-1]:g(A[q]||G,J[q-1]||G)+1:q+1:l+1}g=[];h=[];v=[];l=n;for(q=s;l||q;)s=k[l][q]-1,q&&s===k[l][q-1]?h.push(g[g.length]={status:c,value:b[--q],index:q}):l&&s===k[l-1][q]?v.push(g[g.length]={status:e,value:a[--l],index:l}):(g.push({status:"retained",value:b[--q]}),--l);if(h.length&&v.length){a=10*n;var t;for(b=c=0;(f||b<a)&&(t=h[c]);c++){for(e=
0;k=v[e];e++)if(t.value===k.value){t.moved=k.index;k.moved=t.index;v.splice(e,1);b=e=0;break}b+=e}}return g.reverse()}function T(a,d,c,e,f){f=f||{};var g=a&&N(a),g=g&&g.ownerDocument,h=f.templateEngine||O;b.za.vb(c,h,g);c=h.renderTemplate(c,e,f,g);("number"!=typeof c.length||0<c.length&&"number"!=typeof c[0].nodeType)&&j(Error("Template engine must return an array of DOM nodes"));g=r;switch(d){case "replaceChildren":b.e.N(a,c);g=m;break;case "replaceNode":b.a.Ya(a,c);g=m;break;case "ignoreTargetNode":break;
default:j(Error("Unknown renderMode: "+d))}g&&(U(c,e),f.afterRender&&b.r.K(f.afterRender,p,[c,e.$data]));return c}function N(a){return a.nodeType?a:0<a.length?a[0]:p}function U(a,d){if(a.length){var c=a[0],e=a[a.length-1];V(c,e,function(a){b.Da(d,a)});V(c,e,function(a){b.s.ib(a,[d])})}}function V(a,d,c){var e;for(d=b.e.nextSibling(d);a&&(e=a)!==d;)a=b.e.nextSibling(e),(1===e.nodeType||8===e.nodeType)&&c(e)}function W(a,d,c){a=b.g.aa(a);for(var e=b.g.Q,f=0;f<a.length;f++){var g=a[f].key;if(e.hasOwnProperty(g)){var h=
e[g];"function"===typeof h?(g=h(a[f].value))&&j(Error(g)):h||j(Error("This template engine does not support the '"+g+"' binding within its templates"))}}a="ko.__tr_ambtns(function($context,$element){return(function(){return{ "+b.g.ba(a)+" } })()})";return c.createJavaScriptEvaluatorBlock(a)+d}function X(a,d,c,e){function f(a){return function(){return k[a]}}function g(){return k}var h=0,k,l;b.j(function(){var n=c&&c instanceof b.z?c:new b.z(b.a.d(c)),q=n.$data;e&&b.eb(a,n);if(k=("function"==typeof d?
d(n,a):d)||b.J.instance.getBindings(a,n)){if(0===h){h=1;for(var s in k){var v=b.c[s];v&&8===a.nodeType&&!b.e.I[s]&&j(Error("The binding '"+s+"' cannot be used with virtual elements"));if(v&&"function"==typeof v.init&&(v=(0,v.init)(a,f(s),g,q,n))&&v.controlsDescendantBindings)l!==I&&j(Error("Multiple bindings ("+l+" and "+s+") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.")),l=s}h=2}if(2===h)for(s in k)(v=b.c[s])&&"function"==
typeof v.update&&(0,v.update)(a,f(s),g,q,n)}},p,{W:a});return{Nb:l===I}}function Y(a,d,c){var e=m,f=1===d.nodeType;f&&b.e.Ta(d);if(f&&c||b.J.instance.nodeHasBindings(d))e=X(d,p,a,c).Nb;e&&Z(a,d,!f)}function Z(a,d,c){for(var e=b.e.firstChild(d);d=e;)e=b.e.nextSibling(d),Y(a,d,c)}function $(a,b){var c=aa(a,b);return c?0<c.length?c[c.length-1].nextSibling:a.nextSibling:p}function aa(a,b){for(var c=a,e=1,f=[];c=c.nextSibling;){if(H(c)&&(e--,0===e))return f;f.push(c);B(c)&&e++}b||j(Error("Cannot find closing comment tag to match: "+
a.nodeValue));return p}function H(a){return 8==a.nodeType&&(K?a.text:a.nodeValue).match(ia)}function B(a){return 8==a.nodeType&&(K?a.text:a.nodeValue).match(ja)}function P(a,b){for(var c=p;a!=c;)c=a,a=a.replace(ka,function(a,c){return b[c]});return a}function la(){var a=[],d=[];this.save=function(c,e){var f=b.a.i(a,c);0<=f?d[f]=e:(a.push(c),d.push(e))};this.get=function(c){c=b.a.i(a,c);return 0<=c?d[c]:I}}function ba(a,b,c){function e(e){var g=b(a[e]);switch(typeof g){case "boolean":case "number":case "string":case "function":f[e]=
g;break;case "object":case "undefined":var h=c.get(g);f[e]=h!==I?h:ba(g,b,c)}}c=c||new la;a=b(a);if(!("object"==typeof a&&a!==p&&a!==I&&!(a instanceof Date)))return a;var f=a instanceof Array?[]:{};c.save(a,f);var g=a;if(g instanceof Array){for(var h=0;h<g.length;h++)e(h);"function"==typeof g.toJSON&&e("toJSON")}else for(h in g)e(h);return f}function ca(a,d){if(a)if(8==a.nodeType){var c=b.s.Ua(a.nodeValue);c!=p&&d.push({sb:a,Fb:c})}else if(1==a.nodeType)for(var c=0,e=a.childNodes,f=e.length;c<f;c++)ca(e[c],
d)}function Q(a,d,c,e){b.c[a]={init:function(a){b.a.f.set(a,da,{});return{controlsDescendantBindings:m}},update:function(a,g,h,k,l){h=b.a.f.get(a,da);g=b.a.d(g());k=!c!==!g;var n=!h.Za;if(n||d||k!==h.qb)n&&(h.Za=b.a.Ia(b.e.childNodes(a),m)),k?(n||b.e.N(a,b.a.Ia(h.Za)),b.Ea(e?e(l,g):l,a)):b.e.Y(a),h.qb=k}};b.g.Q[a]=r;b.e.I[a]=m}function ea(a,d,c){c&&d!==b.k.q(a)&&b.k.T(a,d);d!==b.k.q(a)&&b.r.K(b.a.Ba,p,[a,"change"])}var b="undefined"!==typeof w?w:{};b.b=function(a,d){for(var c=a.split("."),e=b,f=0;f<
c.length-1;f++)e=e[c[f]];e[c[c.length-1]]=d};b.p=function(a,b,c){a[b]=c};b.version="2.2.1";b.b("version",b.version);b.a=new function(){function a(a,d){if("input"!==b.a.u(a)||!a.type||"click"!=d.toLowerCase())return r;var c=a.type;return"checkbox"==c||"radio"==c}var d=/^(\s|\u00A0)+|(\s|\u00A0)+$/g,c={},e={};c[/Firefox\/2/i.test(ga.userAgent)?"KeyboardEvent":"UIEvents"]=["keyup","keydown","keypress"];c.MouseEvents="click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" ");
for(var f in c){var g=c[f];if(g.length)for(var h=0,k=g.length;h<k;h++)e[g[h]]=f}var l={propertychange:m},n,c=3;f=y.createElement("div");for(g=f.getElementsByTagName("i");f.innerHTML="\x3c!--[if gt IE "+ ++c+"]><i></i><![endif]--\x3e",g[0];);n=4<c?c:I;return{Na:["authenticity_token",/^__RequestVerificationToken(_.*)?$/],o:function(a,b){for(var d=0,c=a.length;d<c;d++)b(a[d])},i:function(a,b){if("function"==typeof Array.prototype.indexOf)return Array.prototype.indexOf.call(a,b);for(var d=0,c=a.length;d<
c;d++)if(a[d]===b)return d;return-1},lb:function(a,b,d){for(var c=0,e=a.length;c<e;c++)if(b.call(d,a[c]))return a[c];return p},ga:function(a,d){var c=b.a.i(a,d);0<=c&&a.splice(c,1)},Ga:function(a){a=a||[];for(var d=[],c=0,e=a.length;c<e;c++)0>b.a.i(d,a[c])&&d.push(a[c]);return d},V:function(a,b){a=a||[];for(var d=[],c=0,e=a.length;c<e;c++)d.push(b(a[c]));return d},fa:function(a,b){a=a||[];for(var d=[],c=0,e=a.length;c<e;c++)b(a[c])&&d.push(a[c]);return d},P:function(a,b){if(b instanceof Array)a.push.apply(a,
b);else for(var d=0,c=b.length;d<c;d++)a.push(b[d]);return a},extend:function(a,b){if(b)for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);return a},ka:function(a){for(;a.firstChild;)b.removeNode(a.firstChild)},Hb:function(a){a=b.a.L(a);for(var d=y.createElement("div"),c=0,e=a.length;c<e;c++)d.appendChild(b.A(a[c]));return d},Ia:function(a,d){for(var c=0,e=a.length,g=[];c<e;c++){var f=a[c].cloneNode(m);g.push(d?b.A(f):f)}return g},N:function(a,d){b.a.ka(a);if(d)for(var c=0,e=d.length;c<e;c++)a.appendChild(d[c])},
Ya:function(a,d){var c=a.nodeType?[a]:a;if(0<c.length){for(var e=c[0],g=e.parentNode,f=0,h=d.length;f<h;f++)g.insertBefore(d[f],e);f=0;for(h=c.length;f<h;f++)b.removeNode(c[f])}},bb:function(a,b){7>n?a.setAttribute("selected",b):a.selected=b},D:function(a){return(a||"").replace(d,"")},Rb:function(a,d){for(var c=[],e=(a||"").split(d),f=0,g=e.length;f<g;f++){var h=b.a.D(e[f]);""!==h&&c.push(h)}return c},Ob:function(a,b){a=a||"";return b.length>a.length?r:a.substring(0,b.length)===b},tb:function(a,b){if(b.compareDocumentPosition)return 16==
(b.compareDocumentPosition(a)&16);for(;a!=p;){if(a==b)return m;a=a.parentNode}return r},X:function(a){return b.a.tb(a,a.ownerDocument)},u:function(a){return a&&a.tagName&&a.tagName.toLowerCase()},n:function(b,d,c){var e=n&&l[d];if(!e&&"undefined"!=typeof F){if(a(b,d)){var f=c;c=function(a,b){var d=this.checked;b&&(this.checked=b.nb!==m);f.call(this,a);this.checked=d}}F(b).bind(d,c)}else!e&&"function"==typeof b.addEventListener?b.addEventListener(d,c,r):"undefined"!=typeof b.attachEvent?b.attachEvent("on"+
d,function(a){c.call(b,a)}):j(Error("Browser doesn't support addEventListener or attachEvent"))},Ba:function(b,d){(!b||!b.nodeType)&&j(Error("element must be a DOM node when calling triggerEvent"));if("undefined"!=typeof F){var c=[];a(b,d)&&c.push({nb:b.checked});F(b).trigger(d,c)}else"function"==typeof y.createEvent?"function"==typeof b.dispatchEvent?(c=y.createEvent(e[d]||"HTMLEvents"),c.initEvent(d,m,m,x,0,0,0,0,0,r,r,r,r,0,b),b.dispatchEvent(c)):j(Error("The supplied element doesn't support dispatchEvent")):
"undefined"!=typeof b.fireEvent?(a(b,d)&&(b.checked=b.checked!==m),b.fireEvent("on"+d)):j(Error("Browser doesn't support triggering events"))},d:function(a){return b.$(a)?a():a},ua:function(a){return b.$(a)?a.t():a},da:function(a,d,c){if(d){var e=/[\w-]+/g,f=a.className.match(e)||[];b.a.o(d.match(e),function(a){var d=b.a.i(f,a);0<=d?c||f.splice(d,1):c&&f.push(a)});a.className=f.join(" ")}},cb:function(a,d){var c=b.a.d(d);if(c===p||c===I)c="";if(3===a.nodeType)a.data=c;else{var e=b.e.firstChild(a);
!e||3!=e.nodeType||b.e.nextSibling(e)?b.e.N(a,[y.createTextNode(c)]):e.data=c;b.a.wb(a)}},ab:function(a,b){a.name=b;if(7>=n)try{a.mergeAttributes(y.createElement("<input name='"+a.name+"'/>"),r)}catch(d){}},wb:function(a){9<=n&&(a=1==a.nodeType?a:a.parentNode,a.style&&(a.style.zoom=a.style.zoom))},ub:function(a){if(9<=n){var b=a.style.width;a.style.width=0;a.style.width=b}},Lb:function(a,d){a=b.a.d(a);d=b.a.d(d);for(var c=[],e=a;e<=d;e++)c.push(e);return c},L:function(a){for(var b=[],d=0,c=a.length;d<
c;d++)b.push(a[d]);return b},Pb:6===n,Qb:7===n,Z:n,Oa:function(a,d){for(var c=b.a.L(a.getElementsByTagName("input")).concat(b.a.L(a.getElementsByTagName("textarea"))),e="string"==typeof d?function(a){return a.name===d}:function(a){return d.test(a.name)},f=[],g=c.length-1;0<=g;g--)e(c[g])&&f.push(c[g]);return f},Ib:function(a){return"string"==typeof a&&(a=b.a.D(a))?x.JSON&&x.JSON.parse?x.JSON.parse(a):(new Function("return "+a))():p},xa:function(a,d,c){("undefined"==typeof JSON||"undefined"==typeof JSON.stringify)&&
j(Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js"));return JSON.stringify(b.a.d(a),d,c)},Jb:function(a,d,c){c=c||{};var e=c.params||{},f=c.includeFields||this.Na,g=a;if("object"==typeof a&&"form"===b.a.u(a))for(var g=a.action,h=f.length-1;0<=h;h--)for(var k=b.a.Oa(a,f[h]),l=k.length-1;0<=l;l--)e[k[l].name]=k[l].value;d=b.a.d(d);var n=y.createElement("form");
n.style.display="none";n.action=g;n.method="post";for(var w in d)a=y.createElement("input"),a.name=w,a.value=b.a.xa(b.a.d(d[w])),n.appendChild(a);for(w in e)a=y.createElement("input"),a.name=w,a.value=e[w],n.appendChild(a);y.body.appendChild(n);c.submitter?c.submitter(n):n.submit();setTimeout(function(){n.parentNode.removeChild(n)},0)}}};b.b("utils",b.a);b.b("utils.arrayForEach",b.a.o);b.b("utils.arrayFirst",b.a.lb);b.b("utils.arrayFilter",b.a.fa);b.b("utils.arrayGetDistinctValues",b.a.Ga);b.b("utils.arrayIndexOf",
b.a.i);b.b("utils.arrayMap",b.a.V);b.b("utils.arrayPushAll",b.a.P);b.b("utils.arrayRemoveItem",b.a.ga);b.b("utils.extend",b.a.extend);b.b("utils.fieldsIncludedWithJsonPost",b.a.Na);b.b("utils.getFormFields",b.a.Oa);b.b("utils.peekObservable",b.a.ua);b.b("utils.postJson",b.a.Jb);b.b("utils.parseJson",b.a.Ib);b.b("utils.registerEventHandler",b.a.n);b.b("utils.stringifyJson",b.a.xa);b.b("utils.range",b.a.Lb);b.b("utils.toggleDomNodeCssClass",b.a.da);b.b("utils.triggerEvent",b.a.Ba);b.b("utils.unwrapObservable",
b.a.d);Function.prototype.bind||(Function.prototype.bind=function(a){var b=this,c=Array.prototype.slice.call(arguments);a=c.shift();return function(){return b.apply(a,c.concat(Array.prototype.slice.call(arguments)))}});b.a.f=new function(){var a=0,d="__ko__"+(new Date).getTime(),c={};return{get:function(a,d){var c=b.a.f.la(a,r);return c===I?I:c[d]},set:function(a,d,c){c===I&&b.a.f.la(a,r)===I||(b.a.f.la(a,m)[d]=c)},la:function(b,f){var g=b[d];if(!g||!("null"!==g&&c[g])){if(!f)return I;g=b[d]="ko"+
a++;c[g]={}}return c[g]},clear:function(a){var b=a[d];return b?(delete c[b],a[d]=p,m):r}}};b.b("utils.domData",b.a.f);b.b("utils.domData.clear",b.a.f.clear);b.a.F=new function(){function a(a,d){var e=b.a.f.get(a,c);e===I&&d&&(e=[],b.a.f.set(a,c,e));return e}function d(c){var e=a(c,r);if(e)for(var e=e.slice(0),k=0;k<e.length;k++)e[k](c);b.a.f.clear(c);"function"==typeof F&&"function"==typeof F.cleanData&&F.cleanData([c]);if(f[c.nodeType])for(e=c.firstChild;c=e;)e=c.nextSibling,8===c.nodeType&&d(c)}
var c="__ko_domNodeDisposal__"+(new Date).getTime(),e={1:m,8:m,9:m},f={1:m,9:m};return{Ca:function(b,d){"function"!=typeof d&&j(Error("Callback must be a function"));a(b,m).push(d)},Xa:function(d,e){var f=a(d,r);f&&(b.a.ga(f,e),0==f.length&&b.a.f.set(d,c,I))},A:function(a){if(e[a.nodeType]&&(d(a),f[a.nodeType])){var c=[];b.a.P(c,a.getElementsByTagName("*"));for(var k=0,l=c.length;k<l;k++)d(c[k])}return a},removeNode:function(a){b.A(a);a.parentNode&&a.parentNode.removeChild(a)}}};b.A=b.a.F.A;b.removeNode=
b.a.F.removeNode;b.b("cleanNode",b.A);b.b("removeNode",b.removeNode);b.b("utils.domNodeDisposal",b.a.F);b.b("utils.domNodeDisposal.addDisposeCallback",b.a.F.Ca);b.b("utils.domNodeDisposal.removeDisposeCallback",b.a.F.Xa);b.a.ta=function(a){var d;if("undefined"!=typeof F)if(F.parseHTML)d=F.parseHTML(a);else{if((d=F.clean([a]))&&d[0]){for(a=d[0];a.parentNode&&11!==a.parentNode.nodeType;)a=a.parentNode;a.parentNode&&a.parentNode.removeChild(a)}}else{var c=b.a.D(a).toLowerCase();d=y.createElement("div");
c=c.match(/^<(thead|tbody|tfoot)/)&&[1,"<table>","</table>"]||!c.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!c.indexOf("<td")||!c.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||[0,"",""];a="ignored<div>"+c[1]+a+c[2]+"</div>";for("function"==typeof x.innerShiv?d.appendChild(x.innerShiv(a)):d.innerHTML=a;c[0]--;)d=d.lastChild;d=b.a.L(d.lastChild.childNodes)}return d};b.a.ca=function(a,d){b.a.ka(a);d=b.a.d(d);if(d!==p&&d!==I)if("string"!=typeof d&&(d=d.toString()),
"undefined"!=typeof F)F(a).html(d);else for(var c=b.a.ta(d),e=0;e<c.length;e++)a.appendChild(c[e])};b.b("utils.parseHtmlFragment",b.a.ta);b.b("utils.setHtml",b.a.ca);var R={};b.s={ra:function(a){"function"!=typeof a&&j(Error("You can only pass a function to ko.memoization.memoize()"));var b=(4294967296*(1+Math.random())|0).toString(16).substring(1)+(4294967296*(1+Math.random())|0).toString(16).substring(1);R[b]=a;return"\x3c!--[ko_memo:"+b+"]--\x3e"},hb:function(a,b){var c=R[a];c===I&&j(Error("Couldn't find any memo with ID "+
a+". Perhaps it's already been unmemoized."));try{return c.apply(p,b||[]),m}finally{delete R[a]}},ib:function(a,d){var c=[];ca(a,c);for(var e=0,f=c.length;e<f;e++){var g=c[e].sb,h=[g];d&&b.a.P(h,d);b.s.hb(c[e].Fb,h);g.nodeValue="";g.parentNode&&g.parentNode.removeChild(g)}},Ua:function(a){return(a=a.match(/^\[ko_memo\:(.*?)\]$/))?a[1]:p}};b.b("memoization",b.s);b.b("memoization.memoize",b.s.ra);b.b("memoization.unmemoize",b.s.hb);b.b("memoization.parseMemoText",b.s.Ua);b.b("memoization.unmemoizeDomNodeAndDescendants",
b.s.ib);b.Ma={throttle:function(a,d){a.throttleEvaluation=d;var c=p;return b.j({read:a,write:function(b){clearTimeout(c);c=setTimeout(function(){a(b)},d)}})},notify:function(a,d){a.equalityComparer="always"==d?u(r):b.m.fn.equalityComparer;return a}};b.b("extenders",b.Ma);b.fb=function(a,d,c){this.target=a;this.ha=d;this.rb=c;b.p(this,"dispose",this.B)};b.fb.prototype.B=function(){this.Cb=m;this.rb()};b.S=function(){this.w={};b.a.extend(this,b.S.fn);b.p(this,"subscribe",this.ya);b.p(this,"extend",
this.extend);b.p(this,"getSubscriptionsCount",this.yb)};b.S.fn={ya:function(a,d,c){c=c||"change";var e=new b.fb(this,d?a.bind(d):a,function(){b.a.ga(this.w[c],e)}.bind(this));this.w[c]||(this.w[c]=[]);this.w[c].push(e);return e},notifySubscribers:function(a,d){d=d||"change";this.w[d]&&b.r.K(function(){b.a.o(this.w[d].slice(0),function(b){b&&b.Cb!==m&&b.ha(a)})},this)},yb:function(){var a=0,b;for(b in this.w)this.w.hasOwnProperty(b)&&(a+=this.w[b].length);return a},extend:function(a){var d=this;if(a)for(var c in a){var e=
b.Ma[c];"function"==typeof e&&(d=e(d,a[c]))}return d}};b.Qa=function(a){return"function"==typeof a.ya&&"function"==typeof a.notifySubscribers};b.b("subscribable",b.S);b.b("isSubscribable",b.Qa);var C=[];b.r={mb:function(a){C.push({ha:a,La:[]})},end:function(){C.pop()},Wa:function(a){b.Qa(a)||j(Error("Only subscribable things can act as dependencies"));if(0<C.length){var d=C[C.length-1];d&&!(0<=b.a.i(d.La,a))&&(d.La.push(a),d.ha(a))}},K:function(a,b,c){try{return C.push(p),a.apply(b,c||[])}finally{C.pop()}}};
var ma={undefined:m,"boolean":m,number:m,string:m};b.m=function(a){function d(){if(0<arguments.length){if(!d.equalityComparer||!d.equalityComparer(c,arguments[0]))d.H(),c=arguments[0],d.G();return this}b.r.Wa(d);return c}var c=a;b.S.call(d);d.t=function(){return c};d.G=function(){d.notifySubscribers(c)};d.H=function(){d.notifySubscribers(c,"beforeChange")};b.a.extend(d,b.m.fn);b.p(d,"peek",d.t);b.p(d,"valueHasMutated",d.G);b.p(d,"valueWillMutate",d.H);return d};b.m.fn={equalityComparer:function(a,
b){return a===p||typeof a in ma?a===b:r}};var E=b.m.Kb="__ko_proto__";b.m.fn[E]=b.m;b.ma=function(a,d){return a===p||a===I||a[E]===I?r:a[E]===d?m:b.ma(a[E],d)};b.$=function(a){return b.ma(a,b.m)};b.Ra=function(a){return"function"==typeof a&&a[E]===b.m||"function"==typeof a&&a[E]===b.j&&a.zb?m:r};b.b("observable",b.m);b.b("isObservable",b.$);b.b("isWriteableObservable",b.Ra);b.R=function(a){0==arguments.length&&(a=[]);a!==p&&(a!==I&&!("length"in a))&&j(Error("The argument passed when initializing an observable array must be an array, or null, or undefined."));
var d=b.m(a);b.a.extend(d,b.R.fn);return d};b.R.fn={remove:function(a){for(var b=this.t(),c=[],e="function"==typeof a?a:function(b){return b===a},f=0;f<b.length;f++){var g=b[f];e(g)&&(0===c.length&&this.H(),c.push(g),b.splice(f,1),f--)}c.length&&this.G();return c},removeAll:function(a){if(a===I){var d=this.t(),c=d.slice(0);this.H();d.splice(0,d.length);this.G();return c}return!a?[]:this.remove(function(d){return 0<=b.a.i(a,d)})},destroy:function(a){var b=this.t(),c="function"==typeof a?a:function(b){return b===
a};this.H();for(var e=b.length-1;0<=e;e--)c(b[e])&&(b[e]._destroy=m);this.G()},destroyAll:function(a){return a===I?this.destroy(u(m)):!a?[]:this.destroy(function(d){return 0<=b.a.i(a,d)})},indexOf:function(a){var d=this();return b.a.i(d,a)},replace:function(a,b){var c=this.indexOf(a);0<=c&&(this.H(),this.t()[c]=b,this.G())}};b.a.o("pop push reverse shift sort splice unshift".split(" "),function(a){b.R.fn[a]=function(){var b=this.t();this.H();b=b[a].apply(b,arguments);this.G();return b}});b.a.o(["slice"],
function(a){b.R.fn[a]=function(){var b=this();return b[a].apply(b,arguments)}});b.b("observableArray",b.R);b.j=function(a,d,c){function e(){b.a.o(z,function(a){a.B()});z=[]}function f(){var a=h.throttleEvaluation;a&&0<=a?(clearTimeout(t),t=setTimeout(g,a)):g()}function g(){if(!q)if(n&&w())A();else{q=m;try{var a=b.a.V(z,function(a){return a.target});b.r.mb(function(c){var d;0<=(d=b.a.i(a,c))?a[d]=I:z.push(c.ya(f))});for(var c=s.call(d),e=a.length-1;0<=e;e--)a[e]&&z.splice(e,1)[0].B();n=m;h.notifySubscribers(l,
"beforeChange");l=c}finally{b.r.end()}h.notifySubscribers(l);q=r;z.length||A()}}function h(){if(0<arguments.length)return"function"===typeof v?v.apply(d,arguments):j(Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.")),this;n||g();b.r.Wa(h);return l}function k(){return!n||0<z.length}var l,n=r,q=r,s=a;s&&"object"==typeof s?(c=s,s=c.read):(c=c||{},s||(s=c.read));"function"!=typeof s&&j(Error("Pass a function that returns the value of the ko.computed"));
var v=c.write,G=c.disposeWhenNodeIsRemoved||c.W||p,w=c.disposeWhen||c.Ka||u(r),A=e,z=[],t=p;d||(d=c.owner);h.t=function(){n||g();return l};h.xb=function(){return z.length};h.zb="function"===typeof c.write;h.B=function(){A()};h.pa=k;b.S.call(h);b.a.extend(h,b.j.fn);b.p(h,"peek",h.t);b.p(h,"dispose",h.B);b.p(h,"isActive",h.pa);b.p(h,"getDependenciesCount",h.xb);c.deferEvaluation!==m&&g();if(G&&k()){A=function(){b.a.F.Xa(G,arguments.callee);e()};b.a.F.Ca(G,A);var D=w,w=function(){return!b.a.X(G)||D()}}return h};
b.Bb=function(a){return b.ma(a,b.j)};w=b.m.Kb;b.j[w]=b.m;b.j.fn={};b.j.fn[w]=b.j;b.b("dependentObservable",b.j);b.b("computed",b.j);b.b("isComputed",b.Bb);b.gb=function(a){0==arguments.length&&j(Error("When calling ko.toJS, pass the object you want to convert."));return ba(a,function(a){for(var c=0;b.$(a)&&10>c;c++)a=a();return a})};b.toJSON=function(a,d,c){a=b.gb(a);return b.a.xa(a,d,c)};b.b("toJS",b.gb);b.b("toJSON",b.toJSON);b.k={q:function(a){switch(b.a.u(a)){case "option":return a.__ko__hasDomDataOptionValue__===
m?b.a.f.get(a,b.c.options.sa):7>=b.a.Z?a.getAttributeNode("value").specified?a.value:a.text:a.value;case "select":return 0<=a.selectedIndex?b.k.q(a.options[a.selectedIndex]):I;default:return a.value}},T:function(a,d){switch(b.a.u(a)){case "option":switch(typeof d){case "string":b.a.f.set(a,b.c.options.sa,I);"__ko__hasDomDataOptionValue__"in a&&delete a.__ko__hasDomDataOptionValue__;a.value=d;break;default:b.a.f.set(a,b.c.options.sa,d),a.__ko__hasDomDataOptionValue__=m,a.value="number"===typeof d?
d:""}break;case "select":for(var c=a.options.length-1;0<=c;c--)if(b.k.q(a.options[c])==d){a.selectedIndex=c;break}break;default:if(d===p||d===I)d="";a.value=d}}};b.b("selectExtensions",b.k);b.b("selectExtensions.readValue",b.k.q);b.b("selectExtensions.writeValue",b.k.T);var ka=/\@ko_token_(\d+)\@/g,na=["true","false"],oa=/^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i;b.g={Q:[],aa:function(a){var d=b.a.D(a);if(3>d.length)return[];"{"===d.charAt(0)&&(d=d.substring(1,d.length-1));a=[];for(var c=
p,e,f=0;f<d.length;f++){var g=d.charAt(f);if(c===p)switch(g){case '"':case "'":case "/":c=f,e=g}else if(g==e&&"\\"!==d.charAt(f-1)){g=d.substring(c,f+1);a.push(g);var h="@ko_token_"+(a.length-1)+"@",d=d.substring(0,c)+h+d.substring(f+1),f=f-(g.length-h.length),c=p}}e=c=p;for(var k=0,l=p,f=0;f<d.length;f++){g=d.charAt(f);if(c===p)switch(g){case "{":c=f;l=g;e="}";break;case "(":c=f;l=g;e=")";break;case "[":c=f,l=g,e="]"}g===l?k++:g===e&&(k--,0===k&&(g=d.substring(c,f+1),a.push(g),h="@ko_token_"+(a.length-
1)+"@",d=d.substring(0,c)+h+d.substring(f+1),f-=g.length-h.length,c=p))}e=[];d=d.split(",");c=0;for(f=d.length;c<f;c++)k=d[c],l=k.indexOf(":"),0<l&&l<k.length-1?(g=k.substring(l+1),e.push({key:P(k.substring(0,l),a),value:P(g,a)})):e.push({unknown:P(k,a)});return e},ba:function(a){var d="string"===typeof a?b.g.aa(a):a,c=[];a=[];for(var e,f=0;e=d[f];f++)if(0<c.length&&c.push(","),e.key){var g;a:{g=e.key;var h=b.a.D(g);switch(h.length&&h.charAt(0)){case "'":case '"':break a;default:g="'"+h+"'"}}e=e.value;
c.push(g);c.push(":");c.push(e);e=b.a.D(e);0<=b.a.i(na,b.a.D(e).toLowerCase())?e=r:(h=e.match(oa),e=h===p?r:h[1]?"Object("+h[1]+")"+h[2]:e);e&&(0<a.length&&a.push(", "),a.push(g+" : function(__ko_value) { "+e+" = __ko_value; }"))}else e.unknown&&c.push(e.unknown);d=c.join("");0<a.length&&(d=d+", '_ko_property_writers' : { "+a.join("")+" } ");return d},Eb:function(a,d){for(var c=0;c<a.length;c++)if(b.a.D(a[c].key)==d)return m;return r},ea:function(a,d,c,e,f){if(!a||!b.Ra(a)){if((a=d()._ko_property_writers)&&
a[c])a[c](e)}else(!f||a.t()!==e)&&a(e)}};b.b("expressionRewriting",b.g);b.b("expressionRewriting.bindingRewriteValidators",b.g.Q);b.b("expressionRewriting.parseObjectLiteral",b.g.aa);b.b("expressionRewriting.preProcessBindings",b.g.ba);b.b("jsonExpressionRewriting",b.g);b.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson",b.g.ba);var K="\x3c!--test--\x3e"===y.createComment("test").text,ja=K?/^\x3c!--\s*ko(?:\s+(.+\s*\:[\s\S]*))?\s*--\x3e$/:/^\s*ko(?:\s+(.+\s*\:[\s\S]*))?\s*$/,ia=K?/^\x3c!--\s*\/ko\s*--\x3e$/:
/^\s*\/ko\s*$/,pa={ul:m,ol:m};b.e={I:{},childNodes:function(a){return B(a)?aa(a):a.childNodes},Y:function(a){if(B(a)){a=b.e.childNodes(a);for(var d=0,c=a.length;d<c;d++)b.removeNode(a[d])}else b.a.ka(a)},N:function(a,d){if(B(a)){b.e.Y(a);for(var c=a.nextSibling,e=0,f=d.length;e<f;e++)c.parentNode.insertBefore(d[e],c)}else b.a.N(a,d)},Va:function(a,b){B(a)?a.parentNode.insertBefore(b,a.nextSibling):a.firstChild?a.insertBefore(b,a.firstChild):a.appendChild(b)},Pa:function(a,d,c){c?B(a)?a.parentNode.insertBefore(d,
c.nextSibling):c.nextSibling?a.insertBefore(d,c.nextSibling):a.appendChild(d):b.e.Va(a,d)},firstChild:function(a){return!B(a)?a.firstChild:!a.nextSibling||H(a.nextSibling)?p:a.nextSibling},nextSibling:function(a){B(a)&&(a=$(a));return a.nextSibling&&H(a.nextSibling)?p:a.nextSibling},jb:function(a){return(a=B(a))?a[1]:p},Ta:function(a){if(pa[b.a.u(a)]){var d=a.firstChild;if(d){do if(1===d.nodeType){var c;c=d.firstChild;var e=p;if(c){do if(e)e.push(c);else if(B(c)){var f=$(c,m);f?c=f:e=[c]}else H(c)&&
(e=[c]);while(c=c.nextSibling)}if(c=e){e=d.nextSibling;for(f=0;f<c.length;f++)e?a.insertBefore(c[f],e):a.appendChild(c[f])}}while(d=d.nextSibling)}}}};b.b("virtualElements",b.e);b.b("virtualElements.allowedBindings",b.e.I);b.b("virtualElements.emptyNode",b.e.Y);b.b("virtualElements.insertAfter",b.e.Pa);b.b("virtualElements.prepend",b.e.Va);b.b("virtualElements.setDomNodeChildren",b.e.N);b.J=function(){this.Ha={}};b.a.extend(b.J.prototype,{nodeHasBindings:function(a){switch(a.nodeType){case 1:return a.getAttribute("data-bind")!=
p;case 8:return b.e.jb(a)!=p;default:return r}},getBindings:function(a,b){var c=this.getBindingsString(a,b);return c?this.parseBindingsString(c,b,a):p},getBindingsString:function(a){switch(a.nodeType){case 1:return a.getAttribute("data-bind");case 8:return b.e.jb(a);default:return p}},parseBindingsString:function(a,d,c){try{var e;if(!(e=this.Ha[a])){var f=this.Ha,g,h="with($context){with($data||{}){return{"+b.g.ba(a)+"}}}";g=new Function("$context","$element",h);e=f[a]=g}return e(d,c)}catch(k){j(Error("Unable to parse bindings.\nMessage: "+
k+";\nBindings value: "+a))}}});b.J.instance=new b.J;b.b("bindingProvider",b.J);b.c={};b.z=function(a,d,c){d?(b.a.extend(this,d),this.$parentContext=d,this.$parent=d.$data,this.$parents=(d.$parents||[]).slice(0),this.$parents.unshift(this.$parent)):(this.$parents=[],this.$root=a,this.ko=b);this.$data=a;c&&(this[c]=a)};b.z.prototype.createChildContext=function(a,d){return new b.z(a,this,d)};b.z.prototype.extend=function(a){var d=b.a.extend(new b.z,this);return b.a.extend(d,a)};b.eb=function(a,d){if(2==
arguments.length)b.a.f.set(a,"__ko_bindingContext__",d);else return b.a.f.get(a,"__ko_bindingContext__")};b.Fa=function(a,d,c){1===a.nodeType&&b.e.Ta(a);return X(a,d,c,m)};b.Ea=function(a,b){(1===b.nodeType||8===b.nodeType)&&Z(a,b,m)};b.Da=function(a,b){b&&(1!==b.nodeType&&8!==b.nodeType)&&j(Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node"));b=b||x.document.body;Y(a,b,m)};b.ja=function(a){switch(a.nodeType){case 1:case 8:var d=b.eb(a);if(d)return d;
if(a.parentNode)return b.ja(a.parentNode)}return I};b.pb=function(a){return(a=b.ja(a))?a.$data:I};b.b("bindingHandlers",b.c);b.b("applyBindings",b.Da);b.b("applyBindingsToDescendants",b.Ea);b.b("applyBindingsToNode",b.Fa);b.b("contextFor",b.ja);b.b("dataFor",b.pb);var fa={"class":"className","for":"htmlFor"};b.c.attr={update:function(a,d){var c=b.a.d(d())||{},e;for(e in c)if("string"==typeof e){var f=b.a.d(c[e]),g=f===r||f===p||f===I;g&&a.removeAttribute(e);8>=b.a.Z&&e in fa?(e=fa[e],g?a.removeAttribute(e):
a[e]=f):g||a.setAttribute(e,f.toString());"name"===e&&b.a.ab(a,g?"":f.toString())}}};b.c.checked={init:function(a,d,c){b.a.n(a,"click",function(){var e;if("checkbox"==a.type)e=a.checked;else if("radio"==a.type&&a.checked)e=a.value;else return;var f=d(),g=b.a.d(f);"checkbox"==a.type&&g instanceof Array?(e=b.a.i(g,a.value),a.checked&&0>e?f.push(a.value):!a.checked&&0<=e&&f.splice(e,1)):b.g.ea(f,c,"checked",e,m)});"radio"==a.type&&!a.name&&b.c.uniqueName.init(a,u(m))},update:function(a,d){var c=b.a.d(d());
"checkbox"==a.type?a.checked=c instanceof Array?0<=b.a.i(c,a.value):c:"radio"==a.type&&(a.checked=a.value==c)}};b.c.css={update:function(a,d){var c=b.a.d(d());if("object"==typeof c)for(var e in c){var f=b.a.d(c[e]);b.a.da(a,e,f)}else c=String(c||""),b.a.da(a,a.__ko__cssValue,r),a.__ko__cssValue=c,b.a.da(a,c,m)}};b.c.enable={update:function(a,d){var c=b.a.d(d());c&&a.disabled?a.removeAttribute("disabled"):!c&&!a.disabled&&(a.disabled=m)}};b.c.disable={update:function(a,d){b.c.enable.update(a,function(){return!b.a.d(d())})}};
b.c.event={init:function(a,d,c,e){var f=d()||{},g;for(g in f)(function(){var f=g;"string"==typeof f&&b.a.n(a,f,function(a){var g,n=d()[f];if(n){var q=c();try{var s=b.a.L(arguments);s.unshift(e);g=n.apply(e,s)}finally{g!==m&&(a.preventDefault?a.preventDefault():a.returnValue=r)}q[f+"Bubble"]===r&&(a.cancelBubble=m,a.stopPropagation&&a.stopPropagation())}})})()}};b.c.foreach={Sa:function(a){return function(){var d=a(),c=b.a.ua(d);if(!c||"number"==typeof c.length)return{foreach:d,templateEngine:b.C.oa};
b.a.d(d);return{foreach:c.data,as:c.as,includeDestroyed:c.includeDestroyed,afterAdd:c.afterAdd,beforeRemove:c.beforeRemove,afterRender:c.afterRender,beforeMove:c.beforeMove,afterMove:c.afterMove,templateEngine:b.C.oa}}},init:function(a,d){return b.c.template.init(a,b.c.foreach.Sa(d))},update:function(a,d,c,e,f){return b.c.template.update(a,b.c.foreach.Sa(d),c,e,f)}};b.g.Q.foreach=r;b.e.I.foreach=m;b.c.hasfocus={init:function(a,d,c){function e(e){a.__ko_hasfocusUpdating=m;var f=a.ownerDocument;"activeElement"in
f&&(e=f.activeElement===a);f=d();b.g.ea(f,c,"hasfocus",e,m);a.__ko_hasfocusUpdating=r}var f=e.bind(p,m),g=e.bind(p,r);b.a.n(a,"focus",f);b.a.n(a,"focusin",f);b.a.n(a,"blur",g);b.a.n(a,"focusout",g)},update:function(a,d){var c=b.a.d(d());a.__ko_hasfocusUpdating||(c?a.focus():a.blur(),b.r.K(b.a.Ba,p,[a,c?"focusin":"focusout"]))}};b.c.html={init:function(){return{controlsDescendantBindings:m}},update:function(a,d){b.a.ca(a,d())}};var da="__ko_withIfBindingData";Q("if");Q("ifnot",r,m);Q("with",m,r,function(a,
b){return a.createChildContext(b)});b.c.options={update:function(a,d,c){"select"!==b.a.u(a)&&j(Error("options binding applies only to SELECT elements"));for(var e=0==a.length,f=b.a.V(b.a.fa(a.childNodes,function(a){return a.tagName&&"option"===b.a.u(a)&&a.selected}),function(a){return b.k.q(a)||a.innerText||a.textContent}),g=a.scrollTop,h=b.a.d(d());0<a.length;)b.A(a.options[0]),a.remove(0);if(h){c=c();var k=c.optionsIncludeDestroyed;"number"!=typeof h.length&&(h=[h]);if(c.optionsCaption){var l=y.createElement("option");
b.a.ca(l,c.optionsCaption);b.k.T(l,I);a.appendChild(l)}d=0;for(var n=h.length;d<n;d++){var q=h[d];if(!q||!q._destroy||k){var l=y.createElement("option"),s=function(a,b,c){var d=typeof b;return"function"==d?b(a):"string"==d?a[b]:c},v=s(q,c.optionsValue,q);b.k.T(l,b.a.d(v));q=s(q,c.optionsText,v);b.a.cb(l,q);a.appendChild(l)}}h=a.getElementsByTagName("option");d=k=0;for(n=h.length;d<n;d++)0<=b.a.i(f,b.k.q(h[d]))&&(b.a.bb(h[d],m),k++);a.scrollTop=g;e&&"value"in c&&ea(a,b.a.ua(c.value),m);b.a.ub(a)}}};
b.c.options.sa="__ko.optionValueDomData__";b.c.selectedOptions={init:function(a,d,c){b.a.n(a,"change",function(){var e=d(),f=[];b.a.o(a.getElementsByTagName("option"),function(a){a.selected&&f.push(b.k.q(a))});b.g.ea(e,c,"value",f)})},update:function(a,d){"select"!=b.a.u(a)&&j(Error("values binding applies only to SELECT elements"));var c=b.a.d(d());c&&"number"==typeof c.length&&b.a.o(a.getElementsByTagName("option"),function(a){var d=0<=b.a.i(c,b.k.q(a));b.a.bb(a,d)})}};b.c.style={update:function(a,
d){var c=b.a.d(d()||{}),e;for(e in c)if("string"==typeof e){var f=b.a.d(c[e]);a.style[e]=f||""}}};b.c.submit={init:function(a,d,c,e){"function"!=typeof d()&&j(Error("The value for a submit binding must be a function"));b.a.n(a,"submit",function(b){var c,h=d();try{c=h.call(e,a)}finally{c!==m&&(b.preventDefault?b.preventDefault():b.returnValue=r)}})}};b.c.text={update:function(a,d){b.a.cb(a,d())}};b.e.I.text=m;b.c.uniqueName={init:function(a,d){if(d()){var c="ko_unique_"+ ++b.c.uniqueName.ob;b.a.ab(a,
c)}}};b.c.uniqueName.ob=0;b.c.value={init:function(a,d,c){function e(){h=r;var e=d(),f=b.k.q(a);b.g.ea(e,c,"value",f)}var f=["change"],g=c().valueUpdate,h=r;g&&("string"==typeof g&&(g=[g]),b.a.P(f,g),f=b.a.Ga(f));if(b.a.Z&&("input"==a.tagName.toLowerCase()&&"text"==a.type&&"off"!=a.autocomplete&&(!a.form||"off"!=a.form.autocomplete))&&-1==b.a.i(f,"propertychange"))b.a.n(a,"propertychange",function(){h=m}),b.a.n(a,"blur",function(){h&&e()});b.a.o(f,function(c){var d=e;b.a.Ob(c,"after")&&(d=function(){setTimeout(e,
0)},c=c.substring(5));b.a.n(a,c,d)})},update:function(a,d){var c="select"===b.a.u(a),e=b.a.d(d()),f=b.k.q(a),g=e!=f;0===e&&(0!==f&&"0"!==f)&&(g=m);g&&(f=function(){b.k.T(a,e)},f(),c&&setTimeout(f,0));c&&0<a.length&&ea(a,e,r)}};b.c.visible={update:function(a,d){var c=b.a.d(d()),e="none"!=a.style.display;c&&!e?a.style.display="":!c&&e&&(a.style.display="none")}};b.c.click={init:function(a,d,c,e){return b.c.event.init.call(this,a,function(){var a={};a.click=d();return a},c,e)}};b.v=function(){};b.v.prototype.renderTemplateSource=
function(){j(Error("Override renderTemplateSource"))};b.v.prototype.createJavaScriptEvaluatorBlock=function(){j(Error("Override createJavaScriptEvaluatorBlock"))};b.v.prototype.makeTemplateSource=function(a,d){if("string"==typeof a){d=d||y;var c=d.getElementById(a);c||j(Error("Cannot find template with ID "+a));return new b.l.h(c)}if(1==a.nodeType||8==a.nodeType)return new b.l.O(a);j(Error("Unknown template type: "+a))};b.v.prototype.renderTemplate=function(a,b,c,e){a=this.makeTemplateSource(a,e);
return this.renderTemplateSource(a,b,c)};b.v.prototype.isTemplateRewritten=function(a,b){return this.allowTemplateRewriting===r?m:this.makeTemplateSource(a,b).data("isRewritten")};b.v.prototype.rewriteTemplate=function(a,b,c){a=this.makeTemplateSource(a,c);b=b(a.text());a.text(b);a.data("isRewritten",m)};b.b("templateEngine",b.v);var qa=/(<[a-z]+\d*(\s+(?!data-bind=)[a-z0-9\-]+(=(\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind=(["'])([\s\S]*?)\5/gi,ra=/\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g;b.za={vb:function(a,
d,c){d.isTemplateRewritten(a,c)||d.rewriteTemplate(a,function(a){return b.za.Gb(a,d)},c)},Gb:function(a,b){return a.replace(qa,function(a,e,f,g,h,k,l){return W(l,e,b)}).replace(ra,function(a,e){return W(e,"\x3c!-- ko --\x3e",b)})},kb:function(a){return b.s.ra(function(d,c){d.nextSibling&&b.Fa(d.nextSibling,a,c)})}};b.b("__tr_ambtns",b.za.kb);b.l={};b.l.h=function(a){this.h=a};b.l.h.prototype.text=function(){var a=b.a.u(this.h),a="script"===a?"text":"textarea"===a?"value":"innerHTML";if(0==arguments.length)return this.h[a];
var d=arguments[0];"innerHTML"===a?b.a.ca(this.h,d):this.h[a]=d};b.l.h.prototype.data=function(a){if(1===arguments.length)return b.a.f.get(this.h,"templateSourceData_"+a);b.a.f.set(this.h,"templateSourceData_"+a,arguments[1])};b.l.O=function(a){this.h=a};b.l.O.prototype=new b.l.h;b.l.O.prototype.text=function(){if(0==arguments.length){var a=b.a.f.get(this.h,"__ko_anon_template__")||{};a.Aa===I&&a.ia&&(a.Aa=a.ia.innerHTML);return a.Aa}b.a.f.set(this.h,"__ko_anon_template__",{Aa:arguments[0]})};b.l.h.prototype.nodes=
function(){if(0==arguments.length)return(b.a.f.get(this.h,"__ko_anon_template__")||{}).ia;b.a.f.set(this.h,"__ko_anon_template__",{ia:arguments[0]})};b.b("templateSources",b.l);b.b("templateSources.domElement",b.l.h);b.b("templateSources.anonymousTemplate",b.l.O);var O;b.wa=function(a){a!=I&&!(a instanceof b.v)&&j(Error("templateEngine must inherit from ko.templateEngine"));O=a};b.va=function(a,d,c,e,f){c=c||{};(c.templateEngine||O)==I&&j(Error("Set a template engine before calling renderTemplate"));
f=f||"replaceChildren";if(e){var g=N(e);return b.j(function(){var h=d&&d instanceof b.z?d:new b.z(b.a.d(d)),k="function"==typeof a?a(h.$data,h):a,h=T(e,f,k,h,c);"replaceNode"==f&&(e=h,g=N(e))},p,{Ka:function(){return!g||!b.a.X(g)},W:g&&"replaceNode"==f?g.parentNode:g})}return b.s.ra(function(e){b.va(a,d,c,e,"replaceNode")})};b.Mb=function(a,d,c,e,f){function g(a,b){U(b,k);c.afterRender&&c.afterRender(b,a)}function h(d,e){k=f.createChildContext(b.a.d(d),c.as);k.$index=e;var g="function"==typeof a?
a(d,k):a;return T(p,"ignoreTargetNode",g,k,c)}var k;return b.j(function(){var a=b.a.d(d)||[];"undefined"==typeof a.length&&(a=[a]);a=b.a.fa(a,function(a){return c.includeDestroyed||a===I||a===p||!b.a.d(a._destroy)});b.r.K(b.a.$a,p,[e,a,h,c,g])},p,{W:e})};b.c.template={init:function(a,d){var c=b.a.d(d());if("string"!=typeof c&&!c.name&&(1==a.nodeType||8==a.nodeType))c=1==a.nodeType?a.childNodes:b.e.childNodes(a),c=b.a.Hb(c),(new b.l.O(a)).nodes(c);return{controlsDescendantBindings:m}},update:function(a,
d,c,e,f){d=b.a.d(d());c={};e=m;var g,h=p;"string"!=typeof d&&(c=d,d=c.name,"if"in c&&(e=b.a.d(c["if"])),e&&"ifnot"in c&&(e=!b.a.d(c.ifnot)),g=b.a.d(c.data));"foreach"in c?h=b.Mb(d||a,e&&c.foreach||[],c,a,f):e?(f="data"in c?f.createChildContext(g,c.as):f,h=b.va(d||a,f,c,a)):b.e.Y(a);f=h;(g=b.a.f.get(a,"__ko__templateComputedDomDataKey__"))&&"function"==typeof g.B&&g.B();b.a.f.set(a,"__ko__templateComputedDomDataKey__",f&&f.pa()?f:I)}};b.g.Q.template=function(a){a=b.g.aa(a);return 1==a.length&&a[0].unknown||
b.g.Eb(a,"name")?p:"This template engine does not support anonymous templates nested within its templates"};b.e.I.template=m;b.b("setTemplateEngine",b.wa);b.b("renderTemplate",b.va);b.a.Ja=function(a,b,c){a=a||[];b=b||[];return a.length<=b.length?S(a,b,"added","deleted",c):S(b,a,"deleted","added",c)};b.b("utils.compareArrays",b.a.Ja);b.a.$a=function(a,d,c,e,f){function g(a,b){t=l[b];w!==b&&(z[a]=t);t.na(w++);M(t.M);s.push(t);A.push(t)}function h(a,c){if(a)for(var d=0,e=c.length;d<e;d++)c[d]&&b.a.o(c[d].M,
function(b){a(b,d,c[d].U)})}d=d||[];e=e||{};var k=b.a.f.get(a,"setDomNodeChildrenFromArrayMapping_lastMappingResult")===I,l=b.a.f.get(a,"setDomNodeChildrenFromArrayMapping_lastMappingResult")||[],n=b.a.V(l,function(a){return a.U}),q=b.a.Ja(n,d),s=[],v=0,w=0,B=[],A=[];d=[];for(var z=[],n=[],t,D=0,C,E;C=q[D];D++)switch(E=C.moved,C.status){case "deleted":E===I&&(t=l[v],t.j&&t.j.B(),B.push.apply(B,M(t.M)),e.beforeRemove&&(d[D]=t,A.push(t)));v++;break;case "retained":g(D,v++);break;case "added":E!==I?
g(D,E):(t={U:C.value,na:b.m(w++)},s.push(t),A.push(t),k||(n[D]=t))}h(e.beforeMove,z);b.a.o(B,e.beforeRemove?b.A:b.removeNode);for(var D=0,k=b.e.firstChild(a),H;t=A[D];D++){t.M||b.a.extend(t,ha(a,c,t.U,f,t.na));for(v=0;q=t.M[v];k=q.nextSibling,H=q,v++)q!==k&&b.e.Pa(a,q,H);!t.Ab&&f&&(f(t.U,t.M,t.na),t.Ab=m)}h(e.beforeRemove,d);h(e.afterMove,z);h(e.afterAdd,n);b.a.f.set(a,"setDomNodeChildrenFromArrayMapping_lastMappingResult",s)};b.b("utils.setDomNodeChildrenFromArrayMapping",b.a.$a);b.C=function(){this.allowTemplateRewriting=
r};b.C.prototype=new b.v;b.C.prototype.renderTemplateSource=function(a){var d=!(9>b.a.Z)&&a.nodes?a.nodes():p;if(d)return b.a.L(d.cloneNode(m).childNodes);a=a.text();return b.a.ta(a)};b.C.oa=new b.C;b.wa(b.C.oa);b.b("nativeTemplateEngine",b.C);b.qa=function(){var a=this.Db=function(){if("undefined"==typeof F||!F.tmpl)return 0;try{if(0<=F.tmpl.tag.tmpl.open.toString().indexOf("__"))return 2}catch(a){}return 1}();this.renderTemplateSource=function(b,c,e){e=e||{};2>a&&j(Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later."));
var f=b.data("precompiled");f||(f=b.text()||"",f=F.template(p,"{{ko_with $item.koBindingContext}}"+f+"{{/ko_with}}"),b.data("precompiled",f));b=[c.$data];c=F.extend({koBindingContext:c},e.templateOptions);c=F.tmpl(f,b,c);c.appendTo(y.createElement("div"));F.fragments={};return c};this.createJavaScriptEvaluatorBlock=function(a){return"{{ko_code ((function() { return "+a+" })()) }}"};this.addTemplate=function(a,b){y.write("<script type='text/html' id='"+a+"'>"+b+"\x3c/script>")};0<a&&(F.tmpl.tag.ko_code=
{open:"__.push($1 || '');"},F.tmpl.tag.ko_with={open:"with($1) {",close:"} "})};b.qa.prototype=new b.v;w=new b.qa;0<w.Db&&b.wa(w);b.b("jqueryTmplTemplateEngine",b.qa)}"function"===typeof require&&"object"===typeof exports&&"object"===typeof module?L(module.exports||exports):"function"===typeof define&&define.amd?define(["exports"],L):L(x.ko={});m;
})();

/*
===============================================================================
    Author:     Eric M. Barnard - @ericmbarnard                                
    License:    MIT (http://opensource.org/licenses/mit-license.php)           
                                                                               
    Description: Validation Library for KnockoutJS                             
===============================================================================
*/

(function (factory) {
    // Module systems magic dance.

    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // CommonJS or Node: hard-coded dependency on "knockout"
        factory(require("knockout"), exports);
    } else if (typeof define === "function" && define["amd"]) {
        // AMD anonymous module with hard-coded dependency on "knockout"
        define(["knockout", "exports"], factory);
    } else {
        // <script> tag: use the global `ko` object, attaching a `mapping` property
        factory(ko, ko.validation = {});
    }
}(function (ko, exports) {

    if (typeof (ko) === undefined) { throw 'Knockout is required, please ensure it is loaded before loading this validation plug-in'; }

    // create our namespace object
    var validation = exports;
    ko.validation = validation;

    var defaults = {
        registerExtenders: true,
        messagesOnModified: false,
        errorsAsTitle: true,  			// enables/disables showing of errors as title attribute of the target element.
        errorsAsTitleOnModified: false, // shows the error when hovering the input field (decorateElement must be true)
        messageTemplate: null,
        insertMessages: true,           // automatically inserts validation messages as <span></span>
        parseInputAttributes: false,    // parses the HTML5 validation attribute from a form element and adds that to the object
        writeInputAttributes: false,    // adds HTML5 input validation attributes to form elements that ko observable's are bound to
        decorateElement: false,         // false to keep backward compatibility
        errorClass: null,               // single class for error message and element
        errorElementClass: 'validationElement',  // class to decorate error element
        errorMessageClass: 'validationMessage',  // class to decorate error message
        grouping: {
            deep: false,        //by default grouping is shallow
            observable: true    //and using observables
        }
    };

    // make a copy  so we can use 'reset' later
    var configuration = ko.utils.extend({}, defaults);

    var html5Attributes = ['required', 'pattern', 'min', 'max', 'step'];
    var html5InputTypes = ['email', 'number', 'date'];

    var async = function (expr) {
        if (window.setImmediate) { window.setImmediate(expr); }
        else { window.setTimeout(expr, 0); }
    };

    //#region Utilities

    var utils = (function () {
        var seedId = new Date().getTime();

        var domData = {}; //hash of data objects that we reference from dom elements
        var domDataKey = '__ko_validation__';

        return {
            isArray: function (o) {
                return o.isArray || Object.prototype.toString.call(o) === '[object Array]';
            },
            isObject: function (o) {
                return o !== null && typeof o === 'object';
            },
            values: function (o) {
                var r = [];
                for (var i in o) {
                    if (o.hasOwnProperty(i)) {
                        r.push(o[i]);
                    }
                }
                return r;
            },
            getValue: function (o) {
                return (typeof o === 'function' ? o() : o);
            },
            hasAttribute: function (node, attr) {
                return node.getAttribute(attr) !== null;
            },
            getAttribute: function (element, attr) {
                return element.getAttribute(attr);
            },
            setAttribute: function (element, attr, value) {
                return element.setAttribute(attr, value);
            },
            isValidatable: function (o) {
                return o && o.rules && o.isValid && o.isModified;
            },
            insertAfter: function (node, newNode) {
                node.parentNode.insertBefore(newNode, node.nextSibling);
            },
            newId: function () {
                return seedId += 1;
            },
            getConfigOptions: function (element) {
                var options = utils.contextFor(element);

                return options || configuration;
            },
            setDomData: function (node, data) {
                var key = node[domDataKey];

                if (!key) {
                    node[domDataKey] = key = utils.newId();
                }

                domData[key] = data;
            },
            getDomData: function (node) {
                var key = node[domDataKey];

                if (!key) {
                    return undefined;
                }

                return domData[key];
            },
            contextFor: function (node) {
                switch (node.nodeType) {
                    case 1:
                    case 8:
                        var context = utils.getDomData(node);
                        if (context) return context;
                        if (node.parentNode) return utils.contextFor(node.parentNode);
                        break;
                }
                return undefined;
            },
            isEmptyVal: function (val) {
                if (val === undefined) {
                    return true;
                }
                if (val === null) {
                    return true;
                }
                if (val === "") {
                    return true;
                }
            }
        };
    }());

    //#endregion

    //#region Public API
    var api = (function () {

        var isInitialized = 0;

        return {
            utils: utils,

            //Call this on startup
            //any config can be overridden with the passed in options
            init: function (options, force) {
                //done run this multiple times if we don't really want to
                if (isInitialized > 0 && !force) {
                    return;
                }

                //becuase we will be accessing options properties it has to be an object at least
                options = options || {};
                //if specific error classes are not provided then apply generic errorClass
                //it has to be done on option so that options.errorClass can override default
                //errorElementClass and errorMessage class but not those provided in options
                options.errorElementClass = options.errorElementClass || options.errorClass || configuration.errorElementClass;
                options.errorMessageClass = options.errorMessageClass || options.errorClass || configuration.errorMessageClass;

                ko.utils.extend(configuration, options);

                if (configuration.registerExtenders) {
                    exports.registerExtenders();
                }

                isInitialized = 1;
            },
            // backwards compatability
            configure: function (options) { exports.init(options); },

            // resets the config back to its original state
            reset: function () { configuration = $.extend(configuration, defaults); },

            // recursivly walks a viewModel and creates an object that
            // provides validation information for the entire viewModel
            // obj -> the viewModel to walk
            // options -> {
            //      deep: false, // if true, will walk past the first level of viewModel properties
            //      observable: false // if true, returns a computed observable indicating if the viewModel is valid
            // }
            group: function group(obj, options) { // array of observables or viewModel
                var options = ko.utils.extend(configuration.grouping, options),
                validatables = ko.observableArray([]),
                result = null,

                //anonymous, immediate function to traverse objects hierarchically
                //if !options.deep then it will stop on top level
                traverse = function traverse(obj, level) {
                    var objValues = [],
                        val = ko.utils.unwrapObservable(obj);

                    //default level value depends on deep option.
                    level = (level !== undefined ? level : options.deep ? 1 : -1);

                    // if object is observable then add it to the list
                    if (ko.isObservable(obj)) {

                        //make sure it is validatable object
                        if (!obj.isValid) obj.extend({ validatable: true });
                        validatables.push(obj);
                    }

                    //get list of values either from array or object but ignore non-objects
                    if (val) {
                        if (utils.isArray(val)) {
                            objValues = val;
                        } else if (utils.isObject(val)) {
                            objValues = utils.values(val);
                        }
                    }

                    //process recurisvely if it is deep grouping
                    if (level !== 0) {
                        ko.utils.arrayForEach(objValues, function (observable) {

                            //but not falsy things and not HTML Elements
                            if (observable && !observable.nodeType) traverse(observable, level + 1);
                        });
                    }
                };

                //if using observables then traverse structure once and add observables
                if (options.observable) {

                    traverse(obj);

                    result = ko.computed(function () {
                        var errors = [];
                        ko.utils.arrayForEach(validatables(), function (observable) {
                            if (!observable.isValid()) {
                                errors.push(observable.error);
                            }
                        });
                        return errors;
                    });

                } else { //if not using observables then every call to error() should traverse the structure
                    result = function () {
                        var errors = [];
                        validatables([]); //clear validatables
                        traverse(obj); // and traverse tree again
                        ko.utils.arrayForEach(validatables(), function (observable) {
                            if (!observable.isValid()) {
                                errors.push(observable.error);
                            }
                        });
                        return errors;
                    };


                }

                result.showAllMessages = function (show) { // thanks @heliosPortal
                    if (show == undefined) //default to true
                        show = true;

                    // ensure we have latest changes
                    result();

                    ko.utils.arrayForEach(validatables(), function (observable) {
                        observable.isModified(show);
                    });
                };

                obj.errors = result;
                obj.isValid = function () {
                    return obj.errors().length === 0;
                };
                obj.isAnyMessageShown = function () {
                    var invalidAndModifiedPresent = false;

                    // ensure we have latest changes
                    result();

                    ko.utils.arrayForEach(validatables(), function (observable) {
                        if (!observable.isValid() && observable.isModified()) {
                            invalidAndModifiedPresent = true;
                        }
                    });
                    return invalidAndModifiedPresent;
                };

                return result;
            },

            formatMessage: function (message, params) {
                if (typeof (message) === 'function')
                    return message(params);
                return message.replace(/\{0\}/gi, params);
            },

            // addRule:
            // This takes in a ko.observable and a Rule Context - which is just a rule name and params to supply to the validator
            // ie: ko.validation.addRule(myObservable, {
            //          rule: 'required',
            //          params: true
            //      });
            //
            addRule: function (observable, rule) {
                observable.extend({ validatable: true });

                //push a Rule Context to the observables local array of Rule Contexts
                observable.rules.push(rule);
                return observable;
            },

            // addAnonymousRule:
            // Anonymous Rules essentially have all the properties of a Rule, but are only specific for a certain property
            // and developers typically are wanting to add them on the fly or not register a rule with the 'ko.validation.rules' object
            //
            // Example:
            // var test = ko.observable('something').extend{(
            //      validation: {
            //          validator: function(val, someOtherVal){
            //              return true;
            //          },
            //          message: "Something must be really wrong!',
            //          params: true
            //      }
            //  )};
            addAnonymousRule: function (observable, ruleObj) {
                var ruleName = utils.newId();

                if (ruleObj['message'] === undefined) {
                    ruleObj['message'] = 'Error';
                }

                //Create an anonymous rule to reference
                exports.rules[ruleName] = ruleObj;

                //add the anonymous rule to the observable
                exports.addRule(observable, {
                    rule: ruleName,
                    params: ruleObj.params
                });
            },

            addExtender: function (ruleName) {
                ko.extenders[ruleName] = function (observable, params) {
                    //params can come in a few flavors
                    // 1. Just the params to be passed to the validator
                    // 2. An object containing the Message to be used and the Params to pass to the validator
                    // 3. A condition when the validation rule to be applied
                    //
                    // Example:
                    // var test = ko.observable(3).extend({
                    //      max: {
                    //          message: 'This special field has a Max of {0}',
                    //          params: 2,
                    //          onlyIf: function() {
                    //                      return specialField.IsVisible();
                    //                  }
                    //      }
                    //  )};
                    //
                    if (params.message || params.onlyIf) { //if it has a message or condition object, then its an object literal to use
                        return exports.addRule(observable, {
                            rule: ruleName,
                            message: params.message,
                            params: utils.isEmptyVal(params.params) ? true : params.params,
                            condition: params.onlyIf
                        });
                    } else {
                        return exports.addRule(observable, {
                            rule: ruleName,
                            params: params
                        });
                    }
                };
            },

            // loops through all ko.validation.rules and adds them as extenders to
            // ko.extenders
            registerExtenders: function () { // root extenders optional, use 'validation' extender if would cause conflicts
                if (configuration.registerExtenders) {
                    for (var ruleName in exports.rules) {
                        if (exports.rules.hasOwnProperty(ruleName)) {
                            if (!ko.extenders[ruleName]) {
                                exports.addExtender(ruleName);
                            }
                        }
                    }
                }
            },

            //creates a span next to the @element with the specified error class
            insertValidationMessage: function (element) {
                var span = document.createElement('SPAN');
                span.className = utils.getConfigOptions(element).errorMessageClass;
                utils.insertAfter(element, span);
                return span;
            },

            // if html-5 validation attributes have been specified, this parses
            // the attributes on @element
            parseInputValidationAttributes: function (element, valueAccessor) {
                ko.utils.arrayForEach(html5Attributes, function (attr) {
                    if (utils.hasAttribute(element, attr)) {
                        exports.addRule(valueAccessor(), {
                            rule: attr,
                            params: element.getAttribute(attr) || true
                        });
                    }
                });

                var currentType = element.getAttribute('type');
                ko.utils.arrayForEach(html5InputTypes, function (type) {
                    if (type == currentType) {
                        exports.addRule(valueAccessor(), {
                            rule: (type == 'date') ? 'dateISO' : type,
                            params: true
                        });
                    }
                });
            },

            // writes html5 validation attributes on the element passed in
            writeInputValidationAttributes: function (element, valueAccessor) {
                var observable = valueAccessor();

                if (!observable || !observable.rules) {
                    return;
                }

                var contexts = observable.rules(); // observable array

                // loop through the attributes and add the information needed
                ko.utils.arrayForEach(html5Attributes, function (attr) {
                    var params;
                    var ctx = ko.utils.arrayFirst(contexts, function (ctx) {
                        return ctx.rule.toLowerCase() === attr.toLowerCase();
                    });

                    if (!ctx)
                        return;

                    params = ctx.params;

                    // we have to do some special things for the pattern validation
                    if (ctx.rule == "pattern") {
                        if (ctx.params instanceof RegExp) {
                            params = ctx.params.source; // we need the pure string representation of the RegExpr without the //gi stuff
                        }
                    }

                    // we have a rule matching a validation attribute at this point
                    // so lets add it to the element along with the params
                    element.setAttribute(attr, params);
                });

                contexts = null;
            }
        };
    }());

    // expose api publicly
    ko.utils.extend(validation, api);
    //#endregion

    //#region Core Validation Rules

    //Validation Rules:
    // You can view and override messages or rules via:
    // ko.validation.rules[ruleName]
    //
    // To implement a custom Rule, simply use this template:
    // ko.validation.rules['<custom rule name>'] = {
    //      validator: function (val, param) {
    //          <custom logic>
    //          return <true or false>;
    //      },
    //      message: '<custom validation message>' //optionally you can also use a '{0}' to denote a placeholder that will be replaced with your 'param'
    // };
    //
    // Example:
    // ko.validation.rules['mustEqual'] = {
    //      validator: function( val, mustEqualVal ){
    //          return val === mustEqualVal;
    //      },
    //      message: 'This field must equal {0}'
    // };
    //
    validation.rules = {};
    validation.rules['required'] = {
        validator: function (val, required) {
            var stringTrimRegEx = /^\s+|\s+$/g,
                testVal;

            if (val === undefined || val === null) {
                return !required;
            }

            testVal = val;
            if (typeof (val) == "string") {
                testVal = val.replace(stringTrimRegEx, '');
            }

            if (!required) // if they passed: { required: false }, then don't require this
                return true;

            return ((testVal + '').length > 0);
        },
        message: 'This field is required.'
    };

    validation.rules['min'] = {
        validator: function (val, min) {
            return utils.isEmptyVal(val) || val >= min;
        },
        message: 'Please enter a value greater than or equal to {0}.'
    };

    validation.rules['max'] = {
        validator: function (val, max) {
            return utils.isEmptyVal(val) || val <= max;
        },
        message: 'Please enter a value less than or equal to {0}.'
    };

    validation.rules['minLength'] = {
        validator: function (val, minLength) {
            return utils.isEmptyVal(val) || val.length >= minLength;
        },
        message: 'Please enter at least {0} characters.'
    };

    validation.rules['maxLength'] = {
        validator: function (val, maxLength) {
            return utils.isEmptyVal(val) || val.length <= maxLength;
        },
        message: 'Please enter no more than {0} characters.'
    };

    validation.rules['pattern'] = {
        validator: function (val, regex) {
            return utils.isEmptyVal(val) || val.toString().match(regex) != null;
        },
        message: 'Please check this value.'
    };

    validation.rules['step'] = {
        validator: function (val, step) {

            // in order to handle steps of .1 & .01 etc.. Modulus won't work
            // if the value is a decimal, so we have to correct for that
            return utils.isEmptyVal(val) || (val * 100) % (step * 100) === 0;
        },
        message: 'The value must increment by {0}'
    };

    validation.rules['email'] = {
        validator: function (val, validate) {
            if (!validate) return true;

            //I think an empty email address is also a valid entry
            //if one want's to enforce entry it should be done with 'required: true'
            return utils.isEmptyVal(val) || (
                // jquery validate regex - thanks Scott Gonzalez
            //  validate && /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(val)
                validate && /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum|guru)$/i.test(val)
            );
        },
        message: 'Please enter a proper email address'
    };

    validation.rules['date'] = {
        validator: function (value, validate) {
            if (!validate) return true;
            return utils.isEmptyVal(value) || (validate && !/Invalid|NaN/.test(new Date(value)));
        },
        message: 'Please enter a proper date'
    };

    validation.rules['dateISO'] = {
        validator: function (value, validate) {
            if (!validate) return true;
            return utils.isEmptyVal(value) || (validate && /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value));
        },
        message: 'Please enter a proper date'
    };

    validation.rules['number'] = {
        validator: function (value, validate) {
            if (!validate) return true;
            return utils.isEmptyVal(value) || (validate && /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value));
        },
        message: 'Please enter a number'
    };

    validation.rules['digit'] = {
        validator: function (value, validate) {
            if (!validate) return true;
            return utils.isEmptyVal(value) || (validate && /^\d+$/.test(value));
        },
        message: 'Please enter a digit'
    };

    validation.rules['phoneUS'] = {
        validator: function (phoneNumber, validate) {
            if (!validate) return true;
            if (typeof (phoneNumber) !== 'string') { return false; }
            if (utils.isEmptyVal(phoneNumber)) { return true; } // makes it optional, use 'required' rule if it should be required
            phoneNumber = phoneNumber.replace(/\s+/g, "");
            return validate && phoneNumber.length > 9 && phoneNumber.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
        },
        message: 'Please specify a valid phone number'
    };

    validation.rules['equal'] = {
        validator: function (val, params) {
            var otherValue = params;
            return val === utils.getValue(otherValue);
        },
        message: 'Values must equal'
    };

    validation.rules['notEqual'] = {
        validator: function (val, params) {
            var otherValue = params;
            return val !== utils.getValue(otherValue);
        },
        message: 'Please choose another value.'
    };

    //unique in collection
    // options are:
    //    collection: array or function returning (observable) array
    //              in which the value has to be unique
    //    valueAccessor: function that returns value from an object stored in collection
    //              if it is null the value is compared directly
    //    external: set to true when object you are validating is automatically updating collection
    validation.rules['unique'] = {
        validator: function (val, options) {
            var c = utils.getValue(options.collection),
                external = utils.getValue(options.externalValue),
                counter = 0;

            if (!val || !c) return true;

            ko.utils.arrayFilter(ko.utils.unwrapObservable(c), function (item) {
                if (val === (options.valueAccessor ? options.valueAccessor(item) : item)) counter++;
            });
            // if value is external even 1 same value in collection means the value is not unique
            return counter < (external !== undefined && val !== external ? 1 : 2);
        },
        message: 'Please make sure the value is unique.'
    };


    //now register all of these!
    (function () {
        validation.registerExtenders();
    }());

    //#endregion

    //#region Knockout Binding Handlers

    // The core binding handler
    // this allows us to setup any value binding that internally always
    // performs the same functionality
    ko.bindingHandlers['validationCore'] = (function () {

        return {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var config = utils.getConfigOptions(element);

                // parse html5 input validation attributes, optional feature
                if (config.parseInputAttributes) {
                    async(function () { exports.parseInputValidationAttributes(element, valueAccessor) });
                }

                // if requested insert message element and apply bindings
                if (config.insertMessages && utils.isValidatable(valueAccessor())) {

                    // insert the <span></span>
                    var validationMessageElement = exports.insertValidationMessage(element);

                    // if we're told to use a template, make sure that gets rendered
                    if (config.messageTemplate) {
                        ko.renderTemplate(config.messageTemplate, { field: valueAccessor() }, null, validationMessageElement, 'replaceNode');
                    } else {
                        ko.applyBindingsToNode(validationMessageElement, { validationMessage: valueAccessor() });
                    }
                }

                // write the html5 attributes if indicated by the config
                if (config.writeInputAttributes && utils.isValidatable(valueAccessor())) {

                    exports.writeInputValidationAttributes(element, valueAccessor);
                }

                // if requested, add binding to decorate element
                if (config.decorateElement && utils.isValidatable(valueAccessor())) {
                    ko.applyBindingsToNode(element, { validationElement: valueAccessor() });
                }
            },

            update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                // hook for future extensibility
            }
        };

    }());

    // override for KO's default 'value' binding
    (function () {
        var init = ko.bindingHandlers['value'].init;

        ko.bindingHandlers['value'].init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

            init(element, valueAccessor, allBindingsAccessor);

            return ko.bindingHandlers['validationCore'].init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
        };
    }());


    ko.bindingHandlers['validationMessage'] = { // individual error message, if modified or post binding
        update: function (element, valueAccessor) {
            var obsv = valueAccessor(),
                config = utils.getConfigOptions(element),
                val = ko.utils.unwrapObservable(obsv),
                msg = null,
                isModified = false,
                isValid = false;

            obsv.extend({ validatable: true });

            isModified = obsv.isModified();
            isValid = obsv.isValid();

            // create a handler to correctly return an error message
            var errorMsgAccessor = function () {
                if (!config.messagesOnModified || isModified) {
                    return isValid ? null : obsv.error;
                } else {
                    return null;
                }
            };

            //toggle visibility on validation messages when validation hasn't been evaluated, or when the object isValid
            var visiblityAccessor = function () {
                return (!config.messagesOnModified || isModified) ? !isValid : false;
            };

            ko.bindingHandlers.text.update(element, errorMsgAccessor);
            ko.bindingHandlers.visible.update(element, visiblityAccessor);
        }
    };

    ko.bindingHandlers['validationElement'] = {
        update: function (element, valueAccessor) {
            var obsv = valueAccessor(),
                config = utils.getConfigOptions(element),
                val = ko.utils.unwrapObservable(obsv),
                msg = null,
                isModified = false,
                isValid = false;

            obsv.extend({ validatable: true });

            isModified = obsv.isModified();
            isValid = obsv.isValid();

            // create an evaluator function that will return something like:
            // css: { validationElement: true }
            var cssSettingsAccessor = function () {
                var css = {};

                var shouldShow = (isModified ? !isValid : false);

                if (!config.decorateElement) { shouldShow = false; }

                // css: { validationElement: false }
                css[config.errorElementClass] = shouldShow;

                return css;
            };

            //add or remove class on the element;
            ko.bindingHandlers.css.update(element, cssSettingsAccessor);
            if (!config.errorsAsTitle) return;

            var origTitle = utils.getAttribute(element, 'data-orig-title'),
                elementTitle = element.title,
                titleIsErrorMsg = utils.getAttribute(element, 'data-orig-title') == "true";

            var errorMsgTitleAccessor = function () {
                if (!config.errorsAsTitleOnModified || isModified) {
                    if (!isValid) {
                        return { title: obsv.error, 'data-orig-title': origTitle || elementTitle };
                    } else {
                        return { title: origTitle || elementTitle, 'data-orig-title': null };
                    }
                }
            };
            ko.bindingHandlers.attr.update(element, errorMsgTitleAccessor);
        }
    };

    // ValidationOptions:
    // This binding handler allows you to override the initial config by setting any of the options for a specific element or context of elements
    //
    // Example:
    // <div data-bind="validationOptions: { insertMessages: true, messageTemplate: 'customTemplate', errorMessageClass: 'mySpecialClass'}">
    //      <input type="text" data-bind="value: someValue"/>
    //      <input type="text" data-bind="value: someValue2"/>
    // </div>
    ko.bindingHandlers['validationOptions'] = (function () {
        return {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var options = ko.utils.unwrapObservable(valueAccessor());
                if (options) {
                    var newConfig = ko.utils.extend({}, configuration);
                    ko.utils.extend(newConfig, options);

                    //store the validation options on the node so we can retrieve it later
                    utils.setDomData(element, newConfig);
                }
            }
        };
    }());
    //#endregion

    //#region Knockout Extenders

    // Validation Extender:
    // This is for creating custom validation logic on the fly
    // Example:
    // var test = ko.observable('something').extend{(
    //      validation: {
    //          validator: function(val, someOtherVal){
    //              return true;
    //          },
    //          message: "Something must be really wrong!',
    //          params: true
    //      }
    //  )};
    ko.extenders['validation'] = function (observable, rules) { // allow single rule or array
        ko.utils.arrayForEach(utils.isArray(rules) ? rules : [rules], function (rule) {
            // the 'rule' being passed in here has no name to identify a core Rule,
            // so we add it as an anonymous rule
            // If the developer is wanting to use a core Rule, but use a different message see the 'addExtender' logic for examples
            exports.addAnonymousRule(observable, rule);
        });
        return observable;
    };

    //This is the extender that makes a Knockout Observable also 'Validatable'
    //examples include:
    // 1. var test = ko.observable('something').extend({validatable: true});
    // this will ensure that the Observable object is setup properly to respond to rules
    //
    // 2. test.extend({validatable: false});
    // this will remove the validation properties from the Observable object should you need to do that.
    ko.extenders['validatable'] = function (observable, enable) {
        if (enable && !utils.isValidatable(observable)) {

            observable.error = null; // holds the error message, we only need one since we stop processing validators when one is invalid

            // observable.rules:
            // ObservableArray of Rule Contexts, where a Rule Context is simply the name of a rule and the params to supply to it
            //
            // Rule Context = { rule: '<rule name>', params: '<passed in params>', message: '<Override of default Message>' }
            observable.rules = ko.observableArray(); //holds the rule Contexts to use as part of validation

            //in case async validation is occuring
            observable.isValidating = ko.observable(false);

            //the true holder of whether the observable is valid or not
            observable.__valid__ = ko.observable(true);

            observable.isModified = ko.observable(false);

            // we use a computed here to ensure that anytime a dependency changes, the
            // validation logic evaluates
            var h_obsValidationTrigger = ko.computed(function () {
                var obs = observable(),
                    ruleContexts = observable.rules();

                exports.validateObservable(observable);

                return true;
            });

            // a semi-protected observable
            observable.isValid = ko.computed(function () {
                return observable.__valid__();
            });

            //subscribe to changes in the observable
            var h_change = observable.subscribe(function () {
                observable.isModified(true);
            });

            observable._disposeValidation = function () {
                //first dispose of the subscriptions
                observable.isValid.dispose();
                observable.rules.removeAll();
                observable.isModified._subscriptions['change'] = [];
                observable.isValidating._subscriptions['change'] = [];
                observable.__valid__._subscriptions['change'] = [];
                h_change.dispose();
                h_obsValidationTrigger.dispose();

                delete observable['rules'];
                delete observable['error'];
                delete observable['isValid'];
                delete observable['isValidating'];
                delete observable['__valid__'];
                delete observable['isModified'];
            };
        } else if (enable === false && utils.isValidatable(observable)) {

            if (observable._disposeValidation) {
                observable._disposeValidation();
            }
        }
        return observable;
    };

    function validateSync(observable, rule, ctx) {
        //Execute the validator and see if its valid
        if (!rule.validator(observable(), ctx.params === undefined ? true : ctx.params)) { // default param is true, eg. required = true

            //not valid, so format the error message and stick it in the 'error' variable
            observable.error = exports.formatMessage(ctx.message || rule.message, ctx.params);
            observable.__valid__(false);
            return false;
        } else {
            return true;
        }
    }

    function validateAsync(observable, rule, ctx) {
        observable.isValidating(true);

        var callBack = function (valObj) {
            var isValid = false,
                msg = '';

            if (!observable.__valid__()) {

                // since we're returning early, make sure we turn this off
                observable.isValidating(false);

                return; //if its already NOT valid, don't add to that
            }

            //we were handed back a complex object
            if (valObj['message']) {
                isValid = valObj.isValid;
                msg = valObj.message;
            } else {
                isValid = valObj;
            }

            if (!isValid) {
                //not valid, so format the error message and stick it in the 'error' variable
                observable.error = exports.formatMessage(msg || ctx.message || rule.message, ctx.params);
                observable.__valid__(isValid);
            }

            // tell it that we're done
            observable.isValidating(false);
        };

        //fire the validator and hand it the callback
        rule.validator(observable(), ctx.params || true, callBack);
    }

    validation.validateObservable = function (observable) {
        var i = 0,
            rule, // the rule validator to execute
            ctx, // the current Rule Context for the loop
            ruleContexts = observable.rules(), //cache for iterator
            len = ruleContexts.length; //cache for iterator

        for (; i < len; i++) {

            //get the Rule Context info to give to the core Rule
            ctx = ruleContexts[i];

            // checks an 'onlyIf' condition
            if (ctx.condition && !ctx.condition())
                continue;

            //get the core Rule to use for validation
            rule = exports.rules[ctx.rule];

            if (rule['async'] || ctx['async']) {
                //run async validation
                validateAsync(observable, rule, ctx);

            } else {
                //run normal sync validation
                if (!validateSync(observable, rule, ctx)) {
                    return false; //break out of the loop
                }
            }
        }
        //finally if we got this far, make the observable valid again!
        observable.error = null;
        observable.__valid__(true);
        return true;
    };

    //#endregion

    //#region Validated Observable

    ko.validatedObservable = function (initialValue) {
        if (!exports.utils.isObject(initialValue)) { return ko.observable(initialValue).extend({ validatable: true }); }

        var obsv = ko.observable(initialValue);
        obsv.errors = exports.group(initialValue);
        obsv.isValid = ko.computed(function () {
            return obsv.errors().length === 0;
        });

        return obsv;
    };

    //#endregion

    //#region Localization

    //quick function to override rule messages
    validation.localize = function (msgTranslations) {

        var msg, rule;

        //loop the properties in the object and assign the msg to the rule
        for (rule in msgTranslations) {
            if (exports.rules.hasOwnProperty(rule)) {
                exports.rules[rule].message = msgTranslations[rule];
            }
        }
    };
    //#endregion

    //#region ApplyBindings Added Functionality
    ko.applyBindingsWithValidation = function (viewModel, rootNode, options) {
        var len = arguments.length,
            node, config;

        if (len > 2) { // all parameters were passed
            node = rootNode;
            config = options;
        } else if (len < 2) {
            node = document.body;
        } else { //have to figure out if they passed in a root node or options
            if (arguments[1].nodeType) { //its a node
                node = rootNode;
            } else {
                config = arguments[1];
            }
        }

        exports.init();

        if (config) { exports.utils.setDomData(node, config); }

        ko.applyBindings(viewModel, rootNode);
    };

    //override the original applyBindings so that we can ensure all new rules and what not are correctly registered
    var origApplyBindings = ko.applyBindings;
    ko.applyBindings = function (viewModel, rootNode) {

        exports.init();

        origApplyBindings(viewModel, rootNode);
    };

    //#endregion
}));
// REPEAT binding for Knockout http://knockoutjs.com/
// (c) Michael Best
// License: MIT (http://www.opensource.org/licenses/mit-license.php)
// Version 2.0.0

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // [1] AMD anonymous module
        define(['knockout'], factory);
    } else {
        // [2] No module loader (plain <script> tag) - put directly in global namespace
        factory(window.ko);
    }
})(function (ko) {

    if (!ko.virtualElements)
        throw Error('Repeat requires at least Knockout 2.1');

    var ko_bindingFlags = ko.bindingFlags || {};
    var ko_unwrap = ko.utils.unwrapObservable;

    var koProtoName = '__ko_proto__';

    if (ko.version >= "3.0.0") {
        // In Knockout 3.0.0, use the node preprocessor to replace a node with a repeat binding with a virtual element
        var provider = ko.bindingProvider.instance, previousPreprocessFn = provider.preprocessNode;
        provider.preprocessNode = function (node) {
            var newNodes, nodeBinding;
            if (!previousPreprocessFn || !(newNodes = previousPreprocessFn.call(this, node))) {
                if (node.nodeType === 1 && (nodeBinding = node.getAttribute('data-bind'))) {
                    if (/^\s*repeat\s*:/.test(nodeBinding)) {
                        var leadingComment = document.createComment('ko ' + nodeBinding),
                            trailingComment = document.createComment('/ko');
                        node.parentNode.insertBefore(leadingComment, node);
                        node.parentNode.insertBefore(trailingComment, node.nextSibling);
                        node.removeAttribute('data-bind');
                        newNodes = [leadingComment, node, trailingComment];
                    }
                }
            }
            return newNodes;
        };
    }

    ko.virtualElements.allowedBindings.repeat = true;
    ko.bindingHandlers.repeat = {
        flags: ko_bindingFlags.contentBind | ko_bindingFlags.canUseVirtual,
        init: function (element, valueAccessor, allBindingsAccessor, xxx, bindingContext) {

            // Read and set fixed options--these options cannot be changed
            var repeatParam = ko_unwrap(valueAccessor());
            if (repeatParam && typeof repeatParam == 'object' && !('length' in repeatParam)) {
                var repeatIndex = repeatParam.index,
                    repeatData = repeatParam.item,
                    repeatStep = repeatParam.step,
                    repeatReversed = repeatParam.reverse,
                    repeatBind = repeatParam.bind,
                    repeatInit = repeatParam.init,
                    repeatUpdate = repeatParam.update;
            }
            // Set default values for options that need it
            repeatIndex = repeatIndex || '$index';
            repeatData = repeatData || ko.bindingHandlers.repeat.itemName || '$item';
            repeatStep = repeatStep || 1;
            repeatReversed = repeatReversed || false;

            var parent = element.parentNode, placeholder;
            if (element.nodeType == 8) {    // virtual element
                // Extract the "children" and find the single element node
                var childNodes = ko.utils.arrayFilter(ko.virtualElements.childNodes(element), function (node) { return node.nodeType == 1; });
                if (childNodes.length !== 1) {
                    throw Error("Repeat binding requires a single element to repeat");
                }
                ko.virtualElements.emptyNode(element);

                // The placeholder is the closing comment normally, or the opening comment if reversed
                placeholder = repeatReversed ? element : element.nextSibling;
                // The element to repeat is the contained element
                element = childNodes[0];
            } else {    // regular element
                // First clean the element node and remove node's binding
                var origBindString = element.getAttribute('data-bind');
                ko.cleanNode(element);
                element.removeAttribute('data-bind');

                // Original element is no longer needed: delete it and create a placeholder comment
                placeholder = document.createComment('ko_repeatplaceholder ' + origBindString);
                parent.replaceChild(placeholder, element);
            }

            // extract and remove a data-repeat-bind attribute, if present
            if (!repeatBind) {
                repeatBind = element.getAttribute('data-repeat-bind');
                if (repeatBind) {
                    element.removeAttribute('data-repeat-bind');
                }
            }

            // Make a copy of the element node to be copied for each repetition
            var cleanNode = element.cloneNode(true);
            if (typeof repeatBind == "string") {
                cleanNode.setAttribute('data-bind', repeatBind);
                repeatBind = null;
            }

            // Set up persistent data
            var lastRepeatCount = 0,
                notificationObservable = ko.observable(),
                repeatArray, arrayObservable;

            if (repeatInit) {
                repeatInit(parent);
            }

            var subscribable = ko.computed(function () {
                function makeArrayItemAccessor(index) {
                    var f = function (newValue) {
                        var item = repeatArray[index];
                        // Reading the value of the item
                        if (!arguments.length) {
                            notificationObservable();   // for dependency tracking
                            return ko_unwrap(item);
                        }
                        // Writing a value to the item
                        if (ko.isObservable(item)) {
                            item(newValue);
                        } else if (arrayObservable && arrayObservable.splice) {
                            arrayObservable.splice(index, 1, newValue);
                        } else {
                            repeatArray[index] = newValue;
                        }
                        return this;
                    };
                    // Pretend that our accessor function is an observable
                    f[koProtoName] = ko.observable;
                    return f;
                }

                function makeBinding(item, index, context) {
                    return repeatArray
                        ? function () { return repeatBind.call(bindingContext.$data, item, index, context); }
                        : function () { return repeatBind.call(bindingContext.$data, index, context); }
                }

                // Read and set up variable options--these options can change and will update the binding
                var paramObservable = valueAccessor(), repeatParam = ko_unwrap(paramObservable), repeatCount = 0;
                if (repeatParam && typeof repeatParam == 'object') {
                    if ('length' in repeatParam) {
                        repeatArray = repeatParam;
                        repeatCount = repeatArray.length;
                    } else {
                        if ('foreach' in repeatParam) {
                            repeatArray = ko_unwrap(paramObservable = repeatParam.foreach);
                            if (repeatArray && typeof repeatArray == 'object' && 'length' in repeatArray) {
                                repeatCount = repeatArray.length || 0;
                            } else {
                                repeatCount = repeatArray || 0;
                                repeatArray = null;
                            }
                        }
                        // If a count value is provided (>0), always output that number of items
                        if ('count' in repeatParam)
                            repeatCount = ko_unwrap(repeatParam.count) || repeatCount;
                        // If a limit is provided, don't output more than the limit
                        if ('limit' in repeatParam)
                            repeatCount = Math.min(repeatCount, ko_unwrap(repeatParam.limit)) || repeatCount;
                    }
                    arrayObservable = repeatArray && ko.isObservable(paramObservable) ? paramObservable : null;
                } else {
                    repeatCount = repeatParam || 0;
                }

                // Remove nodes from end if array is shorter
                for (; lastRepeatCount > repeatCount; lastRepeatCount -= repeatStep) {
                    ko.removeNode(repeatReversed ? placeholder.nextSibling : placeholder.previousSibling);
                }

                // Notify existing nodes of change
                notificationObservable.notifySubscribers();

                // Add nodes to end if array is longer (also initially populates nodes)
                for (; lastRepeatCount < repeatCount; lastRepeatCount += repeatStep) {
                    // Clone node and add to document
                    var newNode = cleanNode.cloneNode(true);
                    parent.insertBefore(newNode, repeatReversed ? placeholder.nextSibling : placeholder);
                    newNode.setAttribute('data-repeat-index', lastRepeatCount);

                    // Apply bindings to inserted node
                    if (repeatArray && repeatData == '$data') {
                        var newContext = bindingContext.createChildContext(makeArrayItemAccessor(lastRepeatCount));
                    } else {
                        var newContext = bindingContext.extend();
                        if (repeatArray)
                            newContext[repeatData] = makeArrayItemAccessor(lastRepeatCount);
                    }
                    newContext[repeatIndex] = lastRepeatCount;
                    if (repeatBind) {
                        var result = ko.applyBindingsToNode(newNode, makeBinding(newContext[repeatData], lastRepeatCount, newContext), newContext, true),
                            shouldBindDescendants = result && result.shouldBindDescendants;
                    }
                    if (!repeatBind || (result && shouldBindDescendants !== false)) {
                        ko.applyBindings(newContext, newNode);
                    }
                }
                if (repeatUpdate) {
                    repeatUpdate(parent);
                }
            }, null, { disposeWhenNodeIsRemoved: placeholder });

            return { controlsDescendantBindings: true, subscribable: subscribable };
        }
    };
});
// -- Sammy.js -- /sammy.js
// http://sammyjs.org
// Version: 0.7.1
// Built: Sat Mar 31 23:41:58 -0400 2012
(function(h,j){var p,g="([^/]+)",k=/:([\w\d]+)/g,l=/\?([^#]*)?$/,c=function(q){return Array.prototype.slice.call(q)},d=function(q){return Object.prototype.toString.call(q)==="[object Function]"},m=function(q){return Object.prototype.toString.call(q)==="[object Array]"},i=function(q){return decodeURIComponent((q||"").replace(/\+/g," "))},b=encodeURIComponent,f=function(q){return String(q).replace(/&(?!\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},n=function(q){return function(r,s){return this.route.apply(this,[q,r,s])}},a={},o=!!(j.history&&history.pushState),e=[];p=function(){var r=c(arguments),s,q;p.apps=p.apps||{};if(r.length===0||r[0]&&d(r[0])){return p.apply(p,["body"].concat(r))}else{if(typeof(q=r.shift())=="string"){s=p.apps[q]||new p.Application();s.element_selector=q;if(r.length>0){h.each(r,function(t,u){s.use(u)})}if(s.element_selector!=q){delete p.apps[q]}p.apps[s.element_selector]=s;return s}}};p.VERSION="0.7.1";p.addLogger=function(q){e.push(q)};p.log=function(){var q=c(arguments);q.unshift("["+Date()+"]");h.each(e,function(s,r){r.apply(p,q)})};if(typeof j.console!="undefined"){if(d(j.console.log.apply)){p.addLogger(function(){j.console.log.apply(j.console,arguments)})}else{p.addLogger(function(){j.console.log(arguments)})}}else{if(typeof console!="undefined"){p.addLogger(function(){console.log.apply(console,arguments)})}}h.extend(p,{makeArray:c,isFunction:d,isArray:m});p.Object=function(q){return h.extend(this,q||{})};h.extend(p.Object.prototype,{escapeHTML:f,h:f,toHash:function(){var q={};h.each(this,function(s,r){if(!d(r)){q[s]=r}});return q},toHTML:function(){var q="";h.each(this,function(s,r){if(!d(r)){q+="<strong>"+s+"</strong> "+r+"<br />"}});return q},keys:function(q){var r=[];for(var s in this){if(!d(this[s])||!q){r.push(s)}}return r},has:function(q){return this[q]&&h.trim(this[q].toString())!==""},join:function(){var r=c(arguments);var q=r.shift();return r.join(q)},log:function(){p.log.apply(p,arguments)},toString:function(q){var r=[];h.each(this,function(t,s){if(!d(s)||q){r.push('"'+t+'": '+s.toString())}});return"Sammy.Object: {"+r.join(",")+"}"}});p.DefaultLocationProxy=function(r,q){this.app=r;this.is_native=false;this.has_history=o;this._startPolling(q)};p.DefaultLocationProxy.fullPath=function(q){var r=q.toString().match(/^[^#]*(#.+)$/);var s=r?r[1]:"";return[q.pathname,q.search,s].join("")};p.DefaultLocationProxy.prototype={bind:function(){var r=this,s=this.app,q=p.DefaultLocationProxy;h(j).bind("hashchange."+this.app.eventNamespace(),function(u,t){if(r.is_native===false&&!t){r.is_native=true;j.clearInterval(q._interval)}s.trigger("location-changed")});if(o&&!s.disable_push_state){h(j).bind("popstate."+this.app.eventNamespace(),function(t){s.trigger("location-changed")});h("a").live("click.history-"+this.app.eventNamespace(),function(u){if(u.isDefaultPrevented()){return}var t=q.fullPath(this);if(this.hostname==j.location.hostname&&s.lookupRoute("get",t)){u.preventDefault();r.setLocation(t);return false}})}if(!q._bindings){q._bindings=0}q._bindings++},unbind:function(){h(j).unbind("hashchange."+this.app.eventNamespace());h(j).unbind("popstate."+this.app.eventNamespace());h("a").die("click.history-"+this.app.eventNamespace());p.DefaultLocationProxy._bindings--;if(p.DefaultLocationProxy._bindings<=0){j.clearInterval(p.DefaultLocationProxy._interval)}},getLocation:function(){return p.DefaultLocationProxy.fullPath(j.location)},setLocation:function(q){if(/^([^#\/]|$)/.test(q)){if(o){q="/"+q}else{q="#!/"+q}}if(q!=this.getLocation()){if(o&&/^\//.test(q)){history.pushState({path:q},j.title,q);this.app.trigger("location-changed")}else{return(j.location=q)}}},_startPolling:function(s){var r=this;if(!p.DefaultLocationProxy._interval){if(!s){s=10}var q=function(){var t=r.getLocation();if(typeof p.DefaultLocationProxy._last_location=="undefined"||t!=p.DefaultLocationProxy._last_location){j.setTimeout(function(){h(j).trigger("hashchange",[true])},0)}p.DefaultLocationProxy._last_location=t};q();p.DefaultLocationProxy._interval=j.setInterval(q,s)}}};p.Application=function(q){var r=this;this.routes={};this.listeners=new p.Object({});this.arounds=[];this.befores=[];this.namespace=(new Date()).getTime()+"-"+parseInt(Math.random()*1000,10);this.context_prototype=function(){p.EventContext.apply(this,arguments)};this.context_prototype.prototype=new p.EventContext();if(d(q)){q.apply(this,[this])}if(!this._location_proxy){this.setLocationProxy(new p.DefaultLocationProxy(this,this.run_interval_every))}if(this.debug){this.bindToAllEvents(function(t,s){r.log(r.toString(),t.cleaned_type,s||{})})}};p.Application.prototype=h.extend({},p.Object.prototype,{ROUTE_VERBS:["get","post","put","delete"],APP_EVENTS:["run","unload","lookup-route","run-route","route-found","event-context-before","event-context-after","changed","error","check-form-submission","redirect","location-changed"],_last_route:null,_location_proxy:null,_running:false,element_selector:"body",debug:false,raise_errors:false,run_interval_every:50,disable_push_state:false,template_engine:null,toString:function(){return"Sammy.Application:"+this.element_selector},$element:function(q){return q?h(this.element_selector).find(q):h(this.element_selector)},use:function(){var q=c(arguments),s=q.shift(),r=s||"";try{q.unshift(this);if(typeof s=="string"){r="Sammy."+s;s=p[s]}s.apply(this,q)}catch(t){if(typeof s==="undefined"){this.error("Plugin Error: called use() but plugin ("+r.toString()+") is not defined",t)}else{if(!d(s)){this.error("Plugin Error: called use() but '"+r.toString()+"' is not a function",t)}else{this.error("Plugin Error",t)}}}return this},setLocationProxy:function(q){var r=this._location_proxy;this._location_proxy=q;if(this.isRunning()){if(r){r.unbind()}this._location_proxy.bind()}},log:function(){p.log.apply(p,Array.prototype.concat.apply([this.element_selector],arguments))},route:function(u,r,w){var t=this,v=[],q,s;if(!w&&d(r)){r=u;w=r;u="any"}u=u.toLowerCase();if(r.constructor==String){k.lastIndex=0;while((s=k.exec(r))!==null){v.push(s[1])}r=new RegExp(r.replace(k,g)+"$")}if(typeof w=="string"){w=t[w]}q=function(x){var y={verb:x,path:r,callback:w,param_names:v};t.routes[x]=t.routes[x]||[];t.routes[x].push(y)};if(u==="any"){h.each(this.ROUTE_VERBS,function(y,x){q(x)})}else{q(u)}return this},get:n("get"),post:n("post"),put:n("put"),del:n("delete"),any:n("any"),mapRoutes:function(r){var q=this;h.each(r,function(s,t){q.route.apply(q,t)});return this},eventNamespace:function(){return["sammy-app",this.namespace].join("-")},bind:function(q,s,u){var t=this;if(typeof u=="undefined"){u=s}var r=function(){var x,v,w;x=arguments[0];w=arguments[1];if(w&&w.context){v=w.context;delete w.context}else{v=new t.context_prototype(t,"bind",x.type,w,x.target)}x.cleaned_type=x.type.replace(t.eventNamespace(),"");u.apply(v,[x,w])};if(!this.listeners[q]){this.listeners[q]=[]}this.listeners[q].push(r);if(this.isRunning()){this._listen(q,r)}return this},trigger:function(q,r){this.$element().trigger([q,this.eventNamespace()].join("."),[r]);return this},refresh:function(){this.last_location=null;this.trigger("location-changed");return this},before:function(q,r){if(d(q)){r=q;q={}}this.befores.push([q,r]);return this},after:function(q){return this.bind("event-context-after",q)},around:function(q){this.arounds.push(q);return this},isRunning:function(){return this._running},helpers:function(q){h.extend(this.context_prototype.prototype,q);return this},helper:function(q,r){this.context_prototype.prototype[q]=r;return this},run:function(q){if(this.isRunning()){return false}var r=this;h.each(this.listeners.toHash(),function(s,t){h.each(t,function(v,u){r._listen(s,u)})});this.trigger("run",{start_url:q});this._running=true;this.last_location=null;if(!(/\#(.+)/.test(this.getLocation()))&&typeof q!="undefined"){this.setLocation(q)}this._checkLocation();this._location_proxy.bind();this.bind("location-changed",function(){r._checkLocation()});this.bind("submit",function(t){var s=r._checkFormSubmission(h(t.target).closest("form"));return(s===false)?t.preventDefault():false});h(j).bind("unload",function(){r.unload()});return this.trigger("changed")},unload:function(){if(!this.isRunning()){return false}var q=this;this.trigger("unload");this._location_proxy.unbind();this.$element().unbind("submit").removeClass(q.eventNamespace());h.each(this.listeners.toHash(),function(r,s){h.each(s,function(u,t){q._unlisten(r,t)})});this._running=false;return this},bindToAllEvents:function(r){var q=this;h.each(this.APP_EVENTS,function(s,t){q.bind(t,r)});h.each(this.listeners.keys(true),function(t,s){if(h.inArray(s,q.APP_EVENTS)==-1){q.bind(s,r)}});return this},routablePath:function(q){return q.replace(l,"")},lookupRoute:function(w,u){var v=this,t=false,s=0,q,r;if(typeof this.routes[w]!="undefined"){q=this.routes[w].length;for(;s<q;s++){r=this.routes[w][s];if(v.routablePath(u).match(r.path)){t=r;break}}}return t},runRoute:function(s,F,u,x){var t=this,D=this.lookupRoute(s,F),r,A,v,z,E,B,y,C,q;this.log("runRoute",[s,F].join(" "));this.trigger("run-route",{verb:s,path:F,params:u});if(typeof u=="undefined"){u={}}h.extend(u,this._parseQueryString(F));if(D){this.trigger("route-found",{route:D});if((C=D.path.exec(this.routablePath(F)))!==null){C.shift();h.each(C,function(G,H){if(D.param_names[G]){u[D.param_names[G]]=i(H)}else{if(!u.splat){u.splat=[]}u.splat.push(i(H))}})}r=new this.context_prototype(this,s,F,u,x);v=this.arounds.slice(0);E=this.befores.slice(0);y=[r].concat(u.splat);A=function(){var G;while(E.length>0){B=E.shift();if(t.contextMatchesOptions(r,B[0])){G=B[1].apply(r,[r]);if(G===false){return false}}}t.last_route=D;r.trigger("event-context-before",{context:r});G=D.callback.apply(r,y);r.trigger("event-context-after",{context:r});return G};h.each(v.reverse(),function(G,H){var I=A;A=function(){return H.apply(r,[I])}});try{q=A()}catch(w){this.error(["500 Error",s,F].join(" "),w)}return q}else{return this.notFound(s,F)}},contextMatchesOptions:function(r,t,y){var z=t;if(typeof z==="undefined"||h.isPlainObject(z)){return true}if(typeof y==="undefined"){y=true}if(typeof z==="string"||d(z.test)){z={path:z}}if(m(z.path)){var x,u,q;x=[];for(u in z.path){q=h.extend({},z,{path:z.path[u]});x.push(this.contextMatchesOptions(r,q))}var s=h.inArray(true,x)>-1?true:false;return y?s:!s}if(z.only){return this.contextMatchesOptions(r,z.only,true)}else{if(z.except){return this.contextMatchesOptions(r,z.except,false)}}var v=true,w=true;if(z.path){if(!d(z.path.test)){z.path=new RegExp(z.path.toString()+"$")}v=z.path.test(r.path)}if(z.verb){if(typeof z.verb==="string"){w=z.verb===r.verb}else{w=z.verb.indexOf(r.verb)>-1}}return y?(w&&v):!(w&&v)},getLocation:function(){return this._location_proxy.getLocation()},setLocation:function(q){return this._location_proxy.setLocation(q)},swap:function(r,s){var q=this.$element().html(r);if(d(s)){s(r)}return q},templateCache:function(q,r){if(typeof r!="undefined"){return a[q]=r}else{return a[q]}},clearTemplateCache:function(){return a={}},notFound:function(s,r){var q=this.error(["404 Not Found",s,r].join(" "));return(s==="get")?q:true},error:function(r,q){if(!q){q=new Error()}q.message=[r,q.message].join(" ");this.trigger("error",{message:q.message,error:q});if(this.raise_errors){throw (q)}else{this.log(q.message,q)}},_checkLocation:function(){var q,r;q=this.getLocation();if(!this.last_location||this.last_location[0]!="get"||this.last_location[1]!=q){this.last_location=["get",q];r=this.runRoute("get",q)}return r},_getFormVerb:function(s){var r=h(s),t,q;q=r.find('input[name="_method"]');if(q.length>0){t=q.val()}if(!t){t=r[0].getAttribute("method")}if(!t||t==""){t="get"}return h.trim(t.toString().toLowerCase())},_checkFormSubmission:function(s){var q,t,v,u,r;this.trigger("check-form-submission",{form:s});q=h(s);t=q.attr("action")||"";v=this._getFormVerb(q);this.log("_checkFormSubmission",q,t,v);if(v==="get"){u=this._serializeFormParams(q);if(u!==""){t+="?"+u}this.setLocation(t);r=false}else{u=h.extend({},this._parseFormParams(q));r=this.runRoute(v,t,u,s.get(0))}return(typeof r=="undefined")?false:r},_serializeFormParams:function(r){var t="",q=r.serializeArray(),s;if(q.length>0){t=this._encodeFormPair(q[0].name,q[0].value);for(s=1;s<q.length;s++){t=t+"&"+this._encodeFormPair(q[s].name,q[s].value)}}return t},_encodeFormPair:function(q,r){return b(q)+"="+b(r)},_parseFormParams:function(q){var t={},s=q.serializeArray(),r;for(r=0;r<s.length;r++){t=this._parseParamPair(t,s[r].name,s[r].value)}return t},_parseQueryString:function(t){var v={},s,r,u,q;s=t.match(l);if(s){r=s[1].split("&");for(q=0;q<r.length;q++){u=r[q].split("=");v=this._parseParamPair(v,i(u[0]),i(u[1]||""))}}return v},_parseParamPair:function(s,q,r){if(typeof s[q]!=="undefined"){if(m(s[q])){s[q].push(r)}else{s[q]=[s[q],r]}}else{s[q]=r}return s},_listen:function(q,r){return this.$element().bind([q,this.eventNamespace()].join("."),r)},_unlisten:function(q,r){return this.$element().unbind([q,this.eventNamespace()].join("."),r)}});p.RenderContext=function(q){this.event_context=q;this.callbacks=[];this.previous_content=null;this.content=null;this.next_engine=false;this.waiting=false};p.RenderContext.prototype=h.extend({},p.Object.prototype,{then:function(s){if(!d(s)){if(typeof s==="string"&&s in this.event_context){var r=this.event_context[s];s=function(t){return r.apply(this.event_context,[t])}}else{return this}}var q=this;if(this.waiting){this.callbacks.push(s)}else{this.wait();j.setTimeout(function(){var t=s.apply(q,[q.content,q.previous_content]);if(t!==false){q.next(t)}},0)}return this},wait:function(){this.waiting=true},next:function(q){this.waiting=false;if(typeof q!=="undefined"){this.previous_content=this.content;this.content=q}if(this.callbacks.length>0){this.then(this.callbacks.shift())}},load:function(q,r,t){var s=this;return this.then(function(){var u,v,x,w;if(d(r)){t=r;r={}}else{r=h.extend({},r)}if(t){this.then(t)}if(typeof q==="string"){x=(q.match(/\.json$/)||r.json);u=((x&&r.cache===true)||r.cache!==false);s.next_engine=s.event_context.engineFor(q);delete r.cache;delete r.json;if(r.engine){s.next_engine=r.engine;delete r.engine}if(u&&(v=this.event_context.app.templateCache(q))){return v}this.wait();h.ajax(h.extend({url:q,data:{},dataType:x?"json":"text",type:"get",success:function(y){if(u){s.event_context.app.templateCache(q,y)}s.next(y)}},r));return false}else{if(q.nodeType){return q.innerHTML}if(q.selector){s.next_engine=q.attr("data-engine");if(r.clone===false){return q.remove()[0].innerHTML.toString()}else{return q[0].innerHTML.toString()}}}})},loadPartials:function(r){var q;if(r){this.partials=this.partials||{};for(q in r){(function(t,s){t.load(r[s]).then(function(u){this.partials[s]=u})})(this,q)}}return this},render:function(q,s,t,r){if(d(q)&&!s){return this.then(q)}else{return this.loadPartials(r).load(q).interpolate(s,q).then(t)}},partial:function(q,r,s){if(d(s)){return this.render(q,r).swap(s)}else{if(!s&&d(r)){return this.render(q).swap(r)}else{return this.render(q,r).swap()}}},send:function(){var s=this,r=c(arguments),q=r.shift();if(m(r[0])){r=r[0]}return this.then(function(t){r.push(function(u){s.next(u)});s.wait();q.apply(q,r);return false})},collect:function(u,t,q){var s=this;var r=function(){if(d(u)){t=u;u=this.content}var v=[],w=false;h.each(u,function(x,z){var y=t.apply(s,[x,z]);if(y.jquery&&y.length==1){y=y[0];w=true}v.push(y);return y});return w?v:v.join("")};return q?r():this.then(r)},renderEach:function(q,r,s,t){if(m(r)){t=s;s=r;r=null}return this.load(q).then(function(v){var u=this;if(!s){s=m(this.previous_content)?this.previous_content:[]}if(t){h.each(s,function(w,y){var z={},x=this.next_engine||q;r?(z[r]=y):(z=y);t(y,u.event_context.interpolate(v,z,x))})}else{return this.collect(s,function(w,y){var z={},x=this.next_engine||q;r?(z[r]=y):(z=y);return this.event_context.interpolate(v,z,x)},true)}})},interpolate:function(t,s,q){var r=this;return this.then(function(v,u){if(!t&&u){t=u}if(this.next_engine){s=this.next_engine;this.next_engine=false}var w=r.event_context.interpolate(v,t,s,this.partials);return q?u+w:w})},swap:function(q){return this.then(function(r){this.event_context.swap(r,q);return r}).trigger("changed",{})},appendTo:function(q){return this.then(function(r){h(q).append(r)}).trigger("changed",{})},prependTo:function(q){return this.then(function(r){h(q).prepend(r)}).trigger("changed",{})},replace:function(q){return this.then(function(r){h(q).html(r)}).trigger("changed",{})},trigger:function(q,r){return this.then(function(s){if(typeof r=="undefined"){r={content:s}}this.event_context.trigger(q,r);return s})}});p.EventContext=function(u,t,r,s,q){this.app=u;this.verb=t;this.path=r;this.params=new p.Object(s);this.target=q};p.EventContext.prototype=h.extend({},p.Object.prototype,{$element:function(){return this.app.$element(c(arguments).shift())},engineFor:function(s){var r=this,q;if(d(s)){return s}s=(s||r.app.template_engine).toString();if((q=s.match(/\.([^\.\?\#]+)$/))){s=q[1]}if(s&&d(r[s])){return r[s]}if(r.app.template_engine){return this.engineFor(r.app.template_engine)}return function(t,u){return t}},interpolate:function(s,t,r,q){return this.engineFor(r).apply(this,[s,t,q])},render:function(q,s,t,r){return new p.RenderContext(this).render(q,s,t,r)},renderEach:function(q,r,s,t){return new p.RenderContext(this).renderEach(q,r,s,t)},load:function(q,r,s){return new p.RenderContext(this).load(q,r,s)},partial:function(q,r,s){return new p.RenderContext(this).partial(q,r,s)},send:function(){var q=new p.RenderContext(this);return q.send.apply(q,arguments)},redirect:function(){var y,w=c(arguments),v=this.app.getLocation(),r=w.length;if(r>1){var u=0,z=[],q=[],t={},x=false;for(;u<r;u++){if(typeof w[u]=="string"){z.push(w[u])}else{h.extend(t,w[u]);x=true}}y=z.join("/");if(x){for(var s in t){q.push(this.app._encodeFormPair(s,t[s]))}y+="?"+q.join("&")}}else{y=w[0]}this.trigger("redirect",{to:y});this.app.last_location=[this.verb,this.path];this.app.setLocation(y);if(new RegExp(y).test(v)){this.app.trigger("location-changed")}},trigger:function(q,r){if(typeof r=="undefined"){r={}}if(!r.context){r.context=this}return this.app.trigger(q,r)},eventNamespace:function(){return this.app.eventNamespace()},swap:function(q,r){return this.app.swap(q,r)},notFound:function(){return this.app.notFound(this.verb,this.path)},json:function(q){return h.parseJSON(q)},toString:function(){return"Sammy.EventContext: "+[this.verb,this.path,this.params].join(" ")}});h.sammy=j.Sammy=p})(jQuery,window);
// Knockout Mapping plugin v2.0.1
// (c) 2011 Steven Sanderson, Roy Jacobs - http://knockoutjs.com/
// License: Ms-Pl (http://www.opensource.org/licenses/ms-pl.html)

ko.exportSymbol=function(g,q){for(var k=g.split("."),i=window,e=0;e<k.length-1;e++)i=i[k[e]];i[k[k.length-1]]=q};ko.exportProperty=function(g,q,k){g[q]=k};
(function(){function g(a,c){for(var b in c)c.hasOwnProperty(b)&&c[b]&&(a[b]&&!(a[b]instanceof Array)?g(a[b],c[b]):a[b]=c[b])}function q(a,c){var b={};g(b,a);g(b,c);return b}function k(a){return a&&typeof a==="object"&&a.constructor==(new Date).constructor?"date":typeof a}function i(a,c){a=a||{};if(a.create instanceof Function||a.update instanceof Function||a.key instanceof Function||a.arrayChanged instanceof Function)a={"":a};if(c)a.ignore=e(c.ignore,a.ignore),a.include=e(c.include,a.include),a.copy=
e(c.copy,a.copy);a.ignore=e(a.ignore,j.ignore);a.include=e(a.include,j.include);a.copy=e(a.copy,j.copy);a.mappedProperties=a.mappedProperties||{};return a}function e(a,c){a instanceof Array||(a=k(a)==="undefined"?[]:[a]);c instanceof Array||(c=k(c)==="undefined"?[]:[c]);return a.concat(c)}function J(a,c){var b=ko.dependentObservable;ko.dependentObservable=function(b,c,d){var d=d||{},k=d.deferEvaluation;b&&typeof b=="object"&&(d=b);var t=!1,e=function(b){var c=n({read:function(){t||(ko.utils.arrayRemoveItem(a,
b),t=!0);return b.apply(b,arguments)},write:function(a){return b(a)},deferEvaluation:!0});c.__ko_proto__=n;return c};d.deferEvaluation=!0;b=new n(b,c,d);b.__ko_proto__=n;k||(a.push(b),b=e(b));return b};var d=c();ko.dependentObservable=b;return d}function z(a,c,b,d,f,e){var y=ko.utils.unwrapObservable(c)instanceof Array,e=e||"";if(ko.mapping.isMapped(a))var r=ko.utils.unwrapObservable(a)[m],b=q(r,b);var t=function(){return b[d]&&b[d].create instanceof Function},j=function(a){return J(C,function(){return b[d].create({data:a||
c,parent:f})})},g=function(){return b[d]&&b[d].update instanceof Function},o=function(a,K){var e={data:K||c,parent:f,target:ko.utils.unwrapObservable(a)};if(ko.isWriteableObservable(a))e.observable=a;return b[d].update(e)};if(A.get(c))return a;d=d||"";if(y){var y=[],r=!1,h=function(a){return a};if(b[d]&&b[d].key)h=b[d].key,r=!0;if(!ko.isObservable(a))a=ko.observableArray([]),a.mappedRemove=function(b){var c=typeof b=="function"?b:function(a){return a===h(b)};return a.remove(function(a){return c(h(a))})},
a.mappedRemoveAll=function(b){var c=w(b,h);return a.remove(function(a){return ko.utils.arrayIndexOf(c,h(a))!=-1})},a.mappedDestroy=function(b){var c=typeof b=="function"?b:function(a){return a===h(b)};return a.destroy(function(a){return c(h(a))})},a.mappedDestroyAll=function(b){var c=w(b,h);return a.destroy(function(a){return ko.utils.arrayIndexOf(c,h(a))!=-1})},a.mappedIndexOf=function(b){var c=w(a(),h),b=h(b);return ko.utils.arrayIndexOf(c,b)},a.mappedCreate=function(b){if(a.mappedIndexOf(b)!==
-1)throw Error("There already is an object with the key that you specified.");var c=t()?j(b):b;g()&&(b=o(c,b),ko.isWriteableObservable(c)?c(b):c=b);a.push(c);return c};var l=w(ko.utils.unwrapObservable(a),h).sort(),i=w(c,h);r&&i.sort();for(var r=ko.utils.compareArrays(l,i),l={},i=[],n=0,v=r.length;n<v;n++){var u=r[n],s,p=e+"["+n+"]";switch(u.status){case "added":var x=B(ko.utils.unwrapObservable(c),u.value,h);s=ko.utils.unwrapObservable(z(void 0,x,b,d,a,p));p=F(ko.utils.unwrapObservable(c),x,l);i[p]=
s;l[p]=!0;break;case "retained":x=B(ko.utils.unwrapObservable(c),u.value,h);s=B(a,u.value,h);z(s,x,b,d,a,p);p=F(ko.utils.unwrapObservable(c),x,l);i[p]=s;l[p]=!0;break;case "deleted":s=B(a,u.value,h)}y.push({event:u.status,item:s})}a(i);b[d]&&b[d].arrayChanged&&ko.utils.arrayForEach(y,function(a){b[d].arrayChanged(a.event,a.item)})}else if(D(c)){a=ko.utils.unwrapObservable(a);if(!a)if(t())return l=j(),g()&&(l=o(l)),l;else{if(g())return o(l);a={}}g()&&(a=o(a));A.save(c,a);G(c,function(d){var f=e.length?
e+"."+d:d;if(ko.utils.arrayIndexOf(b.ignore,f)==-1)if(ko.utils.arrayIndexOf(b.copy,f)!=-1)a[d]=c[d];else{var h=A.get(c[d])||z(a[d],c[d],b,d,a,f);if(ko.isWriteableObservable(a[d]))a[d](ko.utils.unwrapObservable(h));else a[d]=h;b.mappedProperties[f]=!0}})}else switch(k(c)){case "function":g()?ko.isWriteableObservable(c)?(c(o(c)),a=c):a=o(c):a=c;break;default:ko.isWriteableObservable(a)?g()?a(o(a)):a(ko.utils.unwrapObservable(c)):(a=t()?j():ko.observable(ko.utils.unwrapObservable(c)),g()&&a(o(a)))}return a}
function F(a,c,b){for(var d=0,f=a.length;d<f;d++)if(b[d]!==!0&&a[d]===c)return d;return null}function H(a,c){var b;c&&(b=c(a));k(b)==="undefined"&&(b=a);return ko.utils.unwrapObservable(b)}function B(a,c,b){a=ko.utils.arrayFilter(ko.utils.unwrapObservable(a),function(a){return H(a,b)===c});if(a.length==0)throw Error("When calling ko.update*, the key '"+c+"' was not found!");if(a.length>1&&D(a[0]))throw Error("When calling ko.update*, the key '"+c+"' was not unique!");return a[0]}function w(a,c){return ko.utils.arrayMap(ko.utils.unwrapObservable(a),
function(a){return c?H(a,c):a})}function G(a,c){if(a instanceof Array)for(var b=0;b<a.length;b++)c(b);else for(b in a)c(b)}function D(a){var c=k(a);return c==="object"&&a!==null&&c!=="undefined"}function I(){var a=[],c=[];this.save=function(b,d){var f=ko.utils.arrayIndexOf(a,b);f>=0?c[f]=d:(a.push(b),c.push(d))};this.get=function(b){b=ko.utils.arrayIndexOf(a,b);return b>=0?c[b]:void 0}}ko.mapping={};var m="__ko_mapping__",n=ko.dependentObservable,E=0,C,A,v={include:["_destroy"],ignore:[],copy:[]},
j=v;ko.mapping.isMapped=function(a){return(a=ko.utils.unwrapObservable(a))&&a[m]};ko.mapping.fromJS=function(a){if(arguments.length==0)throw Error("When calling ko.fromJS, pass the object you want to convert.");window.setTimeout(function(){E=0},0);E++||(C=[],A=new I);var c,b;arguments.length==2&&(arguments[1][m]?b=arguments[1]:c=arguments[1]);arguments.length==3&&(c=arguments[1],b=arguments[2]);b&&(c=q(c,b[m]));c=i(c);var d=z(b,a,c);b&&(d=b);--E||window.setTimeout(function(){ko.utils.arrayForEach(C,
function(a){a&&a()})},0);d[m]=q(d[m],c);return d};ko.mapping.fromJSON=function(a){var c=ko.utils.parseJson(a);arguments[0]=c;return ko.mapping.fromJS.apply(this,arguments)};ko.mapping.updateFromJS=function(){throw Error("ko.mapping.updateFromJS, use ko.mapping.fromJS instead. Please note that the order of parameters is different!");};ko.mapping.updateFromJSON=function(){throw Error("ko.mapping.updateFromJSON, use ko.mapping.fromJSON instead. Please note that the order of parameters is different!");
};ko.mapping.toJS=function(a,c){j||ko.mapping.resetDefaultOptions();if(arguments.length==0)throw Error("When calling ko.mapping.toJS, pass the object you want to convert.");if(!(j.ignore instanceof Array))throw Error("ko.mapping.defaultOptions().ignore should be an array.");if(!(j.include instanceof Array))throw Error("ko.mapping.defaultOptions().include should be an array.");if(!(j.copy instanceof Array))throw Error("ko.mapping.defaultOptions().copy should be an array.");c=i(c,a[m]);return ko.mapping.visitModel(a,
function(a){return ko.utils.unwrapObservable(a)},c)};ko.mapping.toJSON=function(a,c){var b=ko.mapping.toJS(a,c);return ko.utils.stringifyJson(b)};ko.mapping.defaultOptions=function(){if(arguments.length>0)j=arguments[0];else return j};ko.mapping.resetDefaultOptions=function(){j={include:v.include.slice(0),ignore:v.ignore.slice(0),copy:v.copy.slice(0)}};ko.mapping.visitModel=function(a,c,b){b=b||{};b.visitedObjects=b.visitedObjects||new I;b.parentName||(b=i(b));var d,f=ko.utils.unwrapObservable(a);
if(D(f))c(a,b.parentName),d=f instanceof Array?[]:{};else return c(a,b.parentName);b.visitedObjects.save(a,d);var e=b.parentName;G(f,function(a){if(!(b.ignore&&ko.utils.arrayIndexOf(b.ignore,a)!=-1)){var g=f[a],i=b,j=e||"";f instanceof Array?e&&(j+="["+a+"]"):(e&&(j+="."),j+=a);i.parentName=j;if(!(ko.utils.arrayIndexOf(b.copy,a)===-1&&ko.utils.arrayIndexOf(b.include,a)===-1&&f[m]&&f[m].mappedProperties&&!f[m].mappedProperties[a]&&!(f instanceof Array)))switch(k(ko.utils.unwrapObservable(g))){case "object":case "undefined":i=
b.visitedObjects.get(g);d[a]=k(i)!=="undefined"?i:ko.mapping.visitModel(g,c,b);break;default:d[a]=c(g,b.parentName)}}});return d};ko.exportSymbol("ko.mapping",ko.mapping);ko.exportSymbol("ko.mapping.fromJS",ko.mapping.fromJS);ko.exportSymbol("ko.mapping.fromJSON",ko.mapping.fromJSON);ko.exportSymbol("ko.mapping.isMapped",ko.mapping.isMapped);ko.exportSymbol("ko.mapping.defaultOptions",ko.mapping.defaultOptions);ko.exportSymbol("ko.mapping.toJS",ko.mapping.toJS);ko.exportSymbol("ko.mapping.toJSON",
ko.mapping.toJSON);ko.exportSymbol("ko.mapping.updateFromJS",ko.mapping.updateFromJS);ko.exportSymbol("ko.mapping.updateFromJSON",ko.mapping.updateFromJSON);ko.exportSymbol("ko.mapping.visitModel",ko.mapping.visitModel)})();

//hitch plugin
(function ($) {
    $.fn.hitch = function (ev, fn, scope, data) {
        return this.bind(ev, data, function () {
            return fn.apply(scope || this, Array.prototype.slice.call(arguments));
        });
    };
})(jQuery);


//convert JSON data to string representation
(function ($) {
    $.fn.q = function (q) {
        var result = {};
        if (q)
        {
            var q = q.replace(/^\?/, '').replace(/\&$/, '');
            $.each(q.split('&'), function () {
                var key = this.split('=')[0];
                var val = this.split('=')[1];
                // convert floats
                if (/^[0-9.]+$/.test(val)) {
                    val = parseFloat(val);
                }
                // ingnore empty values
                if (val) {
                    result[key] = val;
                }
            });
        }
        return result;
    };
})(jQuery);

//buttons and links disabler/enabler
(function ($) {
    var killEvent = function (e) {
        e.preventDefault();
    };

    var killAction = function (e) {
        e.click(killEvent);
        if (e.is("input[type='submit'],input[type='button']")) {
            e.attr("disabled", "disabled");
        }
    };
    
    var disable = function (e, cl, tip) {
        var c = e.data("clone");
        if (!c) {
            c = e.clone(false);

            $.each(c[0].attributes, function(index, attr) {
                if (attr != null && attr.name != "class") {
                    c.attr(attr.name, "");
                }
            }); 

            if (cl != "") {
                c.addClass(cl);
            }
            killAction(c);
            e.data("clone", c);
            e.after(c);
        }
        c.attr("title", tip);
        e.hide();
        c.show();
    };

    var enable = function (e) {
        var clone = e.data("clone");
        if (clone) {
            e.show();
            clone.hide();
        }
    };

    $.fn.activator = function (options) {
        return this.each(function () {
            var e = $(this);

            if (options.action == "enable") {
                enable(e);
                return;
            }

            if (options.action == "disable"){
                disable(e, options.cl, options.tip);
            }
        })
    };
    $.fn.isEnable = function() {
        var e = $(this);
        var clone = e.data('clone');
        if (clone && clone.is(':visible')){
            return false;
        }
        return true;
    };
})(jQuery);



// Simple Set Clipboard System
// Author: Joseph Huckaby

var ZeroClipboard = {

    version: "1.0.7",
    clients: {}, // registered upload clients on page, indexed by id
    moviePath: 'ZeroClipboard.swf', // URL to movie
    nextId: 1, // ID of next movie

    $: function (thingy) {
        // simple DOM lookup utility function
        if (typeof (thingy) == 'string') thingy = document.getElementById(thingy);
        if (!thingy.addClass) {
            // extend element with a few useful methods
            thingy.hide = function () { this.style.display = 'none'; };
            thingy.show = function () { this.style.display = ''; };
            thingy.addClass = function (name) { this.removeClass(name); this.className += ' ' + name; };
            thingy.removeClass = function (name) {
                var classes = this.className.split(/\s+/);
                var idx = -1;
                for (var k = 0; k < classes.length; k++) {
                    if (classes[k] == name) { idx = k; k = classes.length; }
                }
                if (idx > -1) {
                    classes.splice(idx, 1);
                    this.className = classes.join(' ');
                }
                return this;
            };
            thingy.hasClass = function (name) {
                return !!this.className.match(new RegExp("\\s*" + name + "\\s*"));
            };
        }
        return thingy;
    },

    setMoviePath: function (path) {
        // set path to ZeroClipboard.swf
        this.moviePath = path;
    },

    dispatch: function (id, eventName, args) {
        // receive event from flash movie, send to client		
        var client = this.clients[id];
        if (client) {
            client.receiveEvent(eventName, args);
        }
    },

    register: function (id, client) {
        // register new client to receive events
        this.clients[id] = client;
    },

    getDOMObjectPosition: function (obj, stopObj) {
        // get absolute coordinates for dom element
        var info = {
            left: 0,
            top: 0,
            width: obj.width ? obj.width : obj.offsetWidth,
            height: obj.height ? obj.height : obj.offsetHeight
        };

//        while (obj && (obj != stopObj)) {
//            info.left += obj.offsetLeft;
//            info.top += obj.offsetTop;
//            obj = obj.offsetParent;
//        }

        return info;
    },

    Client: function (elem) {
        // constructor for new simple upload client
        this.handlers = {};

        // unique ID
        this.id = ZeroClipboard.nextId++;
        this.movieId = 'ZeroClipboardMovie_' + this.id;

        // register client with singleton to receive flash events
        ZeroClipboard.register(this.id, this);

        // create movie
        if (elem) this.glue(elem);
    }
};

ZeroClipboard.Client.prototype = {

    id: 0, // unique ID for us
    ready: false, // whether movie is ready to receive events or not
    movie: null, // reference to movie object
    clipText: '', // text to copy to clipboard
    handCursorEnabled: true, // whether to show hand cursor, or default pointer cursor
    cssEffects: true, // enable CSS mouse effects on dom container
    handlers: null, // user event handlers

    glue: function (elem, appendElem, stylesToAdd) {
        // glue to DOM element
        // elem can be ID or actual DOM element object
        this.domElement = ZeroClipboard.$(elem);

        // float just above object, or zIndex 99 if dom element isn't set
        var zIndex = 99;
        if (this.domElement.style.zIndex) {
            zIndex = parseInt(this.domElement.style.zIndex, 10) + 1;
        }

        if (typeof (appendElem) == 'string') {
            appendElem = ZeroClipboard.$(appendElem);
        }
        else if (typeof (appendElem) == 'undefined') {
            appendElem = document.getElementsByTagName('body')[0];
        }

        // find X/Y position of domElement
        var box = ZeroClipboard.getDOMObjectPosition(this.domElement, appendElem);

        // create floating DIV above element
        this.div = document.createElement('div');
        var style = this.div.style;
        style.position = 'absolute';
        style.left = '' + box.left + 'px';
        style.top = '' + box.top + 'px';
        style.width = '' + box.width + 'px';
        style.height = '' + (box.height * 2) + 'px';
        style.zIndex = zIndex;

        if (typeof (stylesToAdd) == 'object') {
            for (addedStyle in stylesToAdd) {
                style[addedStyle] = stylesToAdd[addedStyle];
            }
        }

        // style.backgroundColor = '#f00'; // debug

        appendElem.appendChild(this.div);

        this.div.innerHTML = this.getHTML(box.width, box.height);
    },

    getHTML: function (width, height) {
        // return HTML for movie
        var html = '';
        var flashvars = 'id=' + this.id +
			'&width=' + width +
			'&height=' + height;

        if (navigator.userAgent.match(/MSIE/)) {
            // IE gets an OBJECT tag
            var protocol = location.href.match(/^https/i) ? 'https://' : 'http://';
            html += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + protocol + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + width + '" height="' + (height * 2) + '" id="' + this.movieId + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + ZeroClipboard.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + flashvars + '"/><param name="wmode" value="transparent"/></object>';
        }
        else {
            // all other browsers get an EMBED tag
            html += '<embed id="' + this.movieId + '" src="' + ZeroClipboard.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + width + '" height="' + (height * 2) + '" name="' + this.movieId + '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + flashvars + '" wmode="transparent" />';
        }
        return html;
    },

    hide: function () {
        // temporarily hide floater offscreen
        if (this.div) {
            this.div.style.left = '-2000px';
        }
    },

    show: function () {
        // show ourselves after a call to hide()
        this.reposition();
    },

    destroy: function () {
        // destroy control and floater
        if (this.domElement && this.div) {
            this.hide();
            this.div.innerHTML = '';

            var body = document.getElementsByTagName('body')[0];
            try { body.removeChild(this.div); } catch (e) { ; }

            this.domElement = null;
            this.div = null;
        }
    },

    reposition: function (elem) {
        // reposition our floating div, optionally to new container
        // warning: container CANNOT change size, only position
        if (elem) {
            this.domElement = ZeroClipboard.$(elem);
            if (!this.domElement) this.hide();
        }

        if (this.domElement && this.div) {
            var box = ZeroClipboard.getDOMObjectPosition(this.domElement);
            var style = this.div.style;
            style.left = '' + box.left + 'px';
            style.top = '' + box.top + 'px';
        }
    },

    setText: function (newText) {
        // set text to be copied to clipboard
        this.clipText = newText;
        if (this.ready) this.movie.setText(newText);
    },

    addEventListener: function (eventName, func) {
        // add user event listener for event
        // event types: load, queueStart, fileStart, fileComplete, queueComplete, progress, error, cancel
        eventName = eventName.toString().toLowerCase().replace(/^on/, '');
        if (!this.handlers[eventName]) this.handlers[eventName] = [];
        this.handlers[eventName].push(func);
    },

    setHandCursor: function (enabled) {
        // enable hand cursor (true), or default arrow cursor (false)
        this.handCursorEnabled = enabled;
        if (this.ready) this.movie.setHandCursor(enabled);
    },

    setCSSEffects: function (enabled) {
        // enable or disable CSS effects on DOM container
        this.cssEffects = !!enabled;
    },

    receiveEvent: function (eventName, args) {
        // receive event from flash
        eventName = eventName.toString().toLowerCase().replace(/^on/, '');

        // special behavior for certain events
        switch (eventName) {
            case 'load':
                // movie claims it is ready, but in IE this isn't always the case...
                // bug fix: Cannot extend EMBED DOM elements in Firefox, must use traditional function
                this.movie = document.getElementById(this.movieId);
                if (!this.movie) {
                    var self = this;
                    setTimeout(function () { self.receiveEvent('load', null); }, 1);
                    return;
                }

                // firefox on pc needs a "kick" in order to set these in certain cases
                if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
                    var self = this;
                    setTimeout(function () { self.receiveEvent('load', null); }, 100);
                    this.ready = true;
                    return;
                }

                this.ready = true;
                this.movie.setText(this.clipText);
                this.movie.setHandCursor(this.handCursorEnabled);
                break;

            case 'mouseover':
                if (this.domElement && this.cssEffects) {
                    this.domElement.addClass('hover');
                    if (this.recoverActive) this.domElement.addClass('active');
                }
                break;

            case 'mouseout':
                if (this.domElement && this.cssEffects) {
                    this.recoverActive = false;
                    if (this.domElement.hasClass('active')) {
                        this.domElement.removeClass('active');
                        this.recoverActive = true;
                    }
                    this.domElement.removeClass('hover');
                }
                break;

            case 'mousedown':
                if (this.domElement && this.cssEffects) {
                    this.domElement.addClass('active');
                }
                break;

            case 'mouseup':
                if (this.domElement && this.cssEffects) {
                    this.domElement.removeClass('active');
                    this.recoverActive = false;
                }
                break;
        } // switch eventName

        if (this.handlers[eventName]) {
            for (var idx = 0, len = this.handlers[eventName].length; idx < len; idx++) {
                var func = this.handlers[eventName][idx];

                if (typeof (func) == 'function') {
                    // actual function reference
                    func(this, args);
                }
                else if ((typeof (func) == 'object') && (func.length == 2)) {
                    // PHP style object + method, i.e. [myObject, 'myMethod']
                    func[0][func[1]](this, args);
                }
                else if (typeof (func) == 'string') {
                    // name of function
                    window[func](this, args);
                }
            } // foreach event handler defined
        } // user defined handler for event
    }

};

/*
 * jCacher - Client-side Cache Plugin for jQuery
 * Version: 1.0.0 (2010-03-03)
 *
 * Author: Andreas Brantmo
 * Website: http://plugins.jquery.com/project/jCacher
 *
 * Dual licensed under:
 * MIT: http://www.opensource.org/licenses/mit-license.php
 * GPL Version 2: http://www.opensource.org/licenses/gpl-3.0.html
 */

// moved to jGroupdocs.ArrayExtensions.js
// breaks Sharepoint ribbon when using using installable Viewer
//if (!Array.prototype.indexOf) {
//    Array.prototype.indexOf = function (elt /*, from*/) {
//        var len = this.length;

//        var from = Number(arguments[1]) || 0;
//        from = (from < 0)
//         ? Math.ceil(from)
//         : Math.floor(from);
//        if (from < 0)
//            from += len;

//        for (; from < len; from++) {
//            if (from in this &&
//          this[from] === elt)
//                return from;
//        }
//        return -1;
//    };
//}


(function($, undefined) {

    // Create the cache manager and attach it to the
    // global object, e.g jQuery.
    $.jCacher = new function() {

        // Save a reference to the current object
        var cache = this;

        // Reference to the current jQuery instance of 
        // the jCacher object.
        var $this = $(this);

        // Set current version
        cache.version = "1.0.0";

        // The number of items in the cache
        cache.count = 0;

        //var useLocalStorage = false;

        // Id for the current setTimeout.
        var currentTimeout;

        // The key of the next item to be removed from the
        // cache, based on last schedule.
        var nextKey;

        // Next scheduled check.
        var nextCheck;

        // Data storage object
        var store = new storage(false);

        // Adds the specified number of seconds
        // to a date object.
        var addMilliseconds = function(date, milliseconds) {

            return new Date(date.getTime() + milliseconds);

        };

        // Internal function for removing an item from cache.
        var removeItem = function(key, reason) {

            var itm = store.getCacheItem(key);

            if (key !== null && key !== undefined && itm !== null) {

                cache.count--;

                // Get dependency mappings for the cache item
                var mappings = store.getDependencyMappings(key);

                // Remove the cache item from storage
                store.removeCacheItem(key);

                // Trigger itemremoved event
                onitemremoved(itm, reason);

                // Loop through the mappings and request them to be removed
                for (var i = 0; i < mappings.length; i++) {

                    removeItem(mappings[i], "dependencyChanged");

                }

            }

            return itm !== undefined;

        };

        // Goes through all items in the cache and removes
        // them if expired.
        var validate = function() {

            var now = new Date();
            var items = store.getCacheItems();
            var rebuildSchedule = false;

            for (var i = 0; i < items.length; i++) {

                var item = items[i];

                if (item.expires <= now) {

                    rebuildSchedule = true;
                    removeItem(item.key, "expired");

                }
            }

            // Rebuild the schedule if items were removed
            if (rebuildSchedule) {
                schedule();
            }
        };

        // Calculates the next check
        var schedule = function(item) {

            // If no cacheitem is passed to the function,
            // calculate next check based on all
            // existing items in the cache.
            if (item === undefined) {

                nextCheck = null;
                nextKey = null;

                // Clear the current timeout
                if (currentTimeout) {

                    clearTimeout(currentTimeout);

                }

                var items = store.getCacheItems();

                // Calculate next expire based on existing cache items.
                for (var i = 0; i < items.length; i++) {
                    var itm = items[i];
                    if (nextCheck) {
                        if (itm.expires < nextCheck) {
                            nextCheck = itm.expires;
                            nextKey = itm.key;
                        }
                    }
                    else {
                        nextCheck = itm.expires;
                        nextKey = itm.key;
                    }
                }

                if (nextCheck) {

                    setTimer();

                }
                else {

                    currentTimeout = null;

                }
            }

            // If a cacheitem is passed to the function,
            // set the timer to its expire value if it's
            // earlier than nextCheck or if nextCheck is
            // undefined.
            else if (nextCheck == undefined || (nextCheck && item.expires < nextCheck)) {

                // Clear the current timeout
                if (currentTimeout) {

                    clearTimeout(currentTimeout);

                }

                nextCheck = item.expires;

                setTimer();

            }

        };

        var setTimer = function() {

            if (nextCheck) {

                var now = new Date();

                // Calculate time in milliseconds from now until next check
                var timeUntilNextCheck = nextCheck.getTime() - now.getTime() + 100;

                // Init a setTimeout if next check is in the future
                if (timeUntilNextCheck > 0) {

                    currentTimeout = setTimeout(validate, timeUntilNextCheck);

                }

                // Otherwise do the validation immediately
                else {

                    validate();

                }

            }

        }

        // Triggers itemremoved event
        var onitemremoved = function(item, reason) {

            $this.trigger("itemremoved", [item, reason]);

        };

        cache.itemremoved = function(fn) {

            $this.bind("itemremoved", fn);

        };

        // Adds a new item to the cache
        cache.add = function(key, value, slidingExpiration, absoluteExpiration, dependencies, onRemoved) {

            if (value !== undefined) {

                // Increase item count if key is not already in the cache
                //if (store.getCacheKeys().indexOf(key) == -1) {
                if ($.inArray(key, store.getCacheKeys()) == -1) {
                    cache.count++;

                }

                // Calculate the expire date.
                var expires;
                if (slidingExpiration || absoluteExpiration) {

                    if (slidingExpiration) {

                        expires = addMilliseconds(new Date(), (slidingExpiration * 1000));

                    }

                    else if (absoluteExpiration) {

                        expires = absoluteExpiration;
                    }
                }

                // Register dependencies
                if (dependencies) {

                    store.registerDependencies(key, dependencies);

                }

                var item = new cacheItem(key, value, expires, slidingExpiration)

                // Adds the cache item to the cache.
                store.addCacheItem(item);

                // If the item is set to expire, rebuild the schedule, but 
                // only if it's earlier than nextCheck.
                if (expires && (nextCheck === undefined || expires < nextCheck) || (nextKey == key || nextCheck === null)) {

                    schedule(item);

                }
            }

        };

        // Gets an item from the cache. If the key does not exist or if 
        // the item has expired, return null.
        cache.get = function(key) {

            // Get item from storage
            var itm = store.getCacheItem(key);

            if (itm) {

                // Current timestamp
                var now = new Date();

                // If the item has sliding expiration, change the expires property
                // and rebuild the schedule.
                if (itm.slidingExpiration) {

                    itm.expires = addMilliseconds(now, (itm.slidingExpiration * 1000));

                    // Only rebuild the schedule if it expires earlier than nextCheck
                    if ((key == nextKey) || (nextCheck && itm.expires < nextCheck)) {

                        schedule();

                    }
                    else {
                        var b = true;
                    }
                }

                // If the item has expired, return null
                if (itm.expires && itm.expires < now) {

                    return null;

                }

                return itm;

            }

            return null;

        };

        // Removes an item from the cache
        cache.remove = function(key) {

            if (key !== undefined && key !== null && key !== NaN && cache.count > 0) {

                return removeItem(key, "removed");

                // Rebuild the schedule if next check
                // is based on this cache item.
                if (nextKey == key) {

                    schedule();

                }
            }
        };

        // Removes all items from the cache
        cache.clear = function() {

            if (cache.count > 0) {

                cache.count = 0;

                store.clear();

                if (currentTimeout !== null) {

                    clearTimeout(currentTimeout);

                    currentTimeout = null;

                }

            }

        };

        // Build the schedule if items exist in the cache
        if (store.getCacheItems().length > 0) {

            schedule();

        }
    }

    // Represents a cache item.
    function cacheItem(key, value, expires, slidingExpiration) {

        this.key = key;

        this.value = value;

        this.expires = expires;

        this.slidingExpiration = slidingExpiration;
    }

    // Represents a dependency mapper
    function dependencyMapper(key, mappings) {

        this.key = key;

        this.mappings = mappings;
    }

    function storage(useLocalStorage) {

        // The cache items
        var _items = [];

        // The cache keys
        var _keys = [];

        // The cache dependency mappings
        var _dependencyMappings = [];

        (function() {

            if (useLocalStorage && window.localStorage) {

                // Create an empty object in localStorage if undefined
                if (!window.localStorage.jCacher) {
                    window.localStorage.jCacher = jQuery.toJSON({ items: [], dependencyMappings: [] });
                }

                // Else get the cache object from local storage
                else {

                    var cacheItem = jQuery.parseJSON(window.localStorage.jCacher);

                    // Loop all items and make the expires property to a Date
                    for (var i = 0; i < cacheItem.items.length; i++) {
                        var item = cacheItem.items[i];
                        item.expires = new Date(item.expires);
                        _items.push(item);
                    }
                    _dependencyMappings = cacheItem.dependencyMappings;

                }

                for (var i = 0; i < _items.length; i++) {

                    _keys.push(_items[i].key);

                }
            }

        })();
        
        // Gets a cache item by key
        this.getCacheItem = function(key) {
            //var index = _keys.indexOf(key);
            var index = $.inArray(key, _keys);
            return index > -1 ? _items[index] : null;
        };

        // Gets all cache items
        this.getCacheItems = function() {

            return _items;

        };

        // Removes a cache item from storage
        this.removeCacheItem = function(key) {

            //var indexToRemove = _keys.indexOf(key);
            var indexToRemove = $.inArray(key, _keys);
            
            if (useLocalStorage && window.localStorage) {

                // Get cache object from localStorage
                var cacheItem = jQuery.parseJSON(window.localStorage.jCacher);

                // Remove from local storage object
                cacheItem.dependencyMappings.splice(indexToRemove, 1);
                cacheItem.items.splice(indexToRemove, 1);

                // Put the JSONized object to localStorage
                window.localStorage.jCacher = jQuery.toJSON(cacheItem);

            }

            // Remove from local objects
            _items.splice(indexToRemove, 1);
            _keys.splice(indexToRemove, 1);
            _dependencyMappings.splice(indexToRemove, 1);

        };

        // Adds a cache item to storage
        this.addCacheItem = function(value) {

            //var index = _keys.indexOf(value.key);
            var index = $.inArray(value.key, _keys);
            
            if (index == -1) {

                var mapper = new dependencyMapper(value.key, []);

                _items.push(value);
                _keys.push(value.key);
                _dependencyMappings.push(mapper);

                if (useLocalStorage && window.localStorage) {

                    var cacheItem = jQuery.parseJSON(window.localStorage.jCacher);

                    var jsonValue = (function() {

                        var obj = new Object();
                        obj.expires = value.expires.getTime();
                        obj.key = value.key;
                        obj.value = value.value;
                        obj.slidingExpiration = value.slidingExpiration;
                        return obj;

                    })();

                    cacheItem.items.push(jsonValue);
                    cacheItem.dependencyMappings.push(mapper);
                    window.localStorage.jCacher = jQuery.toJSON(cacheItem);
                }

            }
            else {

                _items[index] = value;

                if (useLocalStorage && window.localStorage) {

                    var cacheItem = jQuery.parseJSON(window.localStorage.jCacher);

                    cacheItem.items[index] = value;

                    window.localStorage.jCacher = jQuery.toJSON(cacheItem);
                }

            }

        };

        // Gets all cache keys
        this.getCacheKeys = function() {

            return _keys;

        };

        // Register dependencies to storage
        this.registerDependencies = function(key, dependencies) {

            for (var i = 0; i < dependencies.length; i++) {

                //var mappingsIndex = _keys.indexOf(dependencies[i]);
                var mappingsIndex = $.inArray(dependencies[i], _keys);

                if (mappingsIndex != -1) {

                    //if (_dependencyMappings[mappingsIndex].mappings.indexOf(key) == -1) {
                    if ($.inArray(key, _dependencyMappings[mappingsIndex].mappings) == -1) {
                    

                        _dependencyMappings[mappingsIndex].mappings.push(key);

                        if (useLocalStorage && window.localStorage) {

                            var cacheItem = jQuery.parseJSON(window.localStorage.jCacher);

                            cacheItem.dependencyMappings[mappingsIndex].mappings.push(key);

                            window.localStorage.jCacher = jQuery.toJSON(cacheItem);

                        }

                    }
                }
            }

        };

        // Gets dependency mappings for the specified cache key
        this.getDependencyMappings = function(key) {

            //var index = _keys.indexOf(key);
            var index = $.inArray(key, _keys);
            return index > -1 ? _dependencyMappings[index].mappings : null;

        };

        // Clears all items in the storage.
        this.clear = function() {

            if (window.localStorage) {

                window.localStorage.removeItem("jCacher");

            }

            _items = [];
            _dependencyMappings = [];
            _keys = [];

        };

    };

})(jQuery);
(function () {

    var special = jQuery.event.special,
        uid1 = 'D' + (+new Date()),
        uid2 = 'D' + (+new Date() + 1);

    special.scrollstart = {
        setup: function () {

            var timer,
                handler = function (evt) {

                    var _self = this,
                        _args = arguments;

                    if (timer) {
                        clearTimeout(timer);
                    } else {
                        evt.type = 'scrollstart';
                        $(_self).trigger("scrollstart");
                        //jQuery.event.handle.apply(_self, _args);
                    }

                    timer = setTimeout(function () {
                        timer = null;
                    }, special.scrollstop.latency);

                };

            jQuery(this).bind('scroll', handler).data(uid1, handler);

        },
        teardown: function () {
            jQuery(this).unbind('scroll', jQuery(this).data(uid1));
        }
    };

    special.scrollstop = {
        latency: 300,
        setup: function () {

            var timer,
                    handler = function (evt) {

                        var _self = this,
                        _args = arguments;

                        if (timer) {
                            clearTimeout(timer);
                        }

                        timer = setTimeout(function () {

                            timer = null;
                            evt.type = 'scrollstop';
                            $(_self).trigger("scrollstop");
                            //jQuery.event.handle.apply(_self, _args);

                        }, special.scrollstop.latency);

                    };

            jQuery(this).bind('scroll', handler).data(uid2, handler);

        },
        teardown: function () {
            jQuery(this).unbind('scroll', jQuery(this).data(uid2));
        }
    };

})();
// Copyright (c) Microsoft Corporation.  All rights reserved.
// This code is licensed by Microsoft Corporation under the terms
// of the MICROSOFT REACTIVE EXTENSIONS FOR JAVASCRIPT AND .NET LIBRARIES License.
// See http://go.microsoft.com/fwlink/?LinkId=186234.

(function(){var a;var b;var c=this;var d="Index out of range";if(typeof ProvideCustomRxRootObject =="undefined")b=c.Rx={}; else b=ProvideCustomRxRootObject();var e=function(){};var f=function(){return new Date().getTime();};var g=function(r0,s0){return r0===s0;};var h=function(r0){return r0;};var i=function(r0){return {Dispose:r0};};var j={Dispose:e};b.Disposable={Create:i,Empty:j};var k=b.BooleanDisposable=function(){var r0=false;this.GetIsDisposed=function(){return r0;};this.Dispose=function(){r0=true;};};var l=function(r0){var s0=false;r0.a++;this.Dispose=function(){var t0=false;if(!r0.b){if(!this.c){this.c=true;r0.a--;if(r0.a==0&&r0.d){r0.b=true;t0=true;}}}if(t0)r0.e.Dispose();};};var m=b.RefCountDisposable=function(r0){this.d=false;this.b=false;this.e=r0;this.a=0;this.Dispose=function(){var s0=false;if(!this.b){if(!this.d){this.d=true;if(this.a==0){this.b=true;s0=true;}}}if(s0)this.e.Dispose();};this.GetDisposable=function(){if(this.b)return j; else return new l(this);};};var n=b.CompositeDisposable=function(){var r0=new q();for(var s0=0;s0<arguments.length;s0++) r0.Add(arguments[s0]);var t0=false;this.GetCount=function(){return r0.GetCount();};this.Add=function(u0){if(!t0)r0.Add(u0); else u0.Dispose();};this.Remove=function(u0,v0){if(!t0){var w0=r0.Remove(u0);if(!v0&w0)u0.Dispose();}};this.Dispose=function(){if(!t0){t0=true;this.Clear();}};this.Clear=function(){for(var u0=0;u0<r0.GetCount();u0++) r0.GetItem(u0).Dispose();r0.Clear();};};var o=b.MutableDisposable=function(){var r0=false;var s0;this.Get=function(){return s0;},this.Replace=function(t0){if(r0&&t0!==a)t0.Dispose(); else{if(s0!==a)s0.Dispose();s0=t0;}};this.Dispose=function(){if(!r0){r0=true;if(s0!==a)s0.Dispose();}};};var p=function(r0){var s0=[];for(var t0=0;t0<r0.length;t0++) s0.push(r0[t0]);return s0;};var q=b.List=function(r0){var s0=[];var t0=0;var u0=r0!==a?r0:g;this.Add=function(v0){s0[t0]=v0;t0++;};this.RemoveAt=function(v0){if(v0<0||v0>=t0)throw d;if(v0==0){s0.shift();t0--;}else{s0.splice(v0,1);t0--;}};this.IndexOf=function(v0){for(var w0=0;w0<t0;w0++){if(u0(v0,s0[w0]))return w0;}return -1;};this.Remove=function(v0){var w0=this.IndexOf(v0);if(w0==-1)return false;this.RemoveAt(w0);return true;};this.Clear=function(){s0=[];t0=0;};this.GetCount=function(){return t0;};this.GetItem=function(v0){if(v0<0||v0>=t0)throw d;return s0[v0];};this.SetItem=function(v0,w0){if(v0<0||v0>=t0)throw d;s0[v0]=w0;};this.ToArray=function(){var v0=[];for(var w0=0;w0<this.GetCount();w0++) v0.push(this.GetItem(w0));return v0;};};var r=function(r0){if(r0===null)r0=g;this.f=r0;var s0=4;this.g=new Array(s0);this.h=0;};r.prototype.i=function(r0,s0){return this.f(this.g[r0],this.g[s0])<0;};r.prototype.j=function(r0){if(r0>=this.h||r0<0)return;var s0=r0-1>>1;if(s0<0||s0==r0)return;if(this.i(r0,s0)){var t0=this.g[r0];this.g[r0]=this.g[s0];this.g[s0]=t0;this.j(s0);}};r.prototype.k=function(r0){if(r0===a)r0=0;var s0=2*r0+1;var t0=2*r0+2;var u0=r0;if(s0<this.h&&this.i(s0,u0))u0=s0;if(t0<this.h&&this.i(t0,u0))u0=t0;if(u0!=r0){var v0=this.g[r0];this.g[r0]=this.g[u0];this.g[u0]=v0;this.k(u0);}};r.prototype.GetCount=function(){return this.h;};r.prototype.Peek=function(){if(this.h==0)throw "Heap is empty.";return this.g[0];};r.prototype.Dequeue=function(){var r0=this.Peek();this.g[0]=this.g[--this.h];delete this.g[this.h];this.k();return r0;};r.prototype.Enqueue=function(r0){var s0=this.h++;this.g[s0]=r0;this.j(s0);};var s=b.Scheduler=function(r0,s0,t0){this.Schedule=r0;this.ScheduleWithTime=s0;this.Now=t0;this.ScheduleRecursive=function(u0){var v0=this;var w0=new n();var x0;x0=function(){u0(function(){var y0=false;var z0=false;var A0;A0=v0.Schedule(function(){x0();if(y0)w0.Remove(A0); else z0=true;});if(!z0){w0.Add(A0);y0=true;}});};w0.Add(v0.Schedule(x0));return w0;};this.ScheduleRecursiveWithTime=function(u0,v0){var w0=this;var x0=new n();var y0;y0=function(){u0(function(z0){var A0=false;var B0=false;var C0;C0=w0.ScheduleWithTime(function(){y0();if(A0)x0.Remove(C0); else B0=true;},z0);if(!B0){x0.Add(C0);A0=true;}});};x0.Add(w0.ScheduleWithTime(y0,v0));return x0;};};var t=b.VirtualScheduler=function(r0,s0,t0,u0){var v0=new s(function(w0){return this.ScheduleWithTime(w0,0);},function(w0,x0){return this.ScheduleVirtual(w0,u0(x0));},function(){return t0(this.l);});v0.ScheduleVirtual=function(w0,x0){var y0=new k();var z0=s0(this.l,x0);var A0=function(){if(!y0.IsDisposed)w0();};var B0=new y(A0,z0);this.m.Enqueue(B0);return y0;};v0.Run=function(){while(this.m.GetCount()>0){var w0=this.m.Dequeue();this.l=w0.n;w0.o();}};v0.RunTo=function(w0){while(this.m.GetCount()>0&&this.f(this.m.Peek().n,w0)<=0){var x0=this.m.Dequeue();this.l=x0.n;x0.o();}};v0.GetTicks=function(){return this.l;};v0.l=0;v0.m=new r(function(w0,x0){return r0(w0.n,x0.n);});v0.f=r0;return v0;};var u=b.TestScheduler=function(){var r0=new t(function(s0,t0){return s0-t0;},function(s0,t0){return s0+t0;},function(s0){return new Date(s0);},function(s0){if(s0<=0)return 1;return s0;});return r0;};var v=new s(function(r0){return this.ScheduleWithTime(r0,0);},function(r0,s0){var t0=this.Now()+s0;var u0=new y(r0,t0);if(this.m===a){var v0=new w();try{this.m.Enqueue(u0);v0.p();}finally{v0.q();}}else this.m.Enqueue(u0);return u0.r();},f);v.s=function(r0){if(this.m===a){var s0=new w();try{r0();s0.p();}finally{s0.q();}}else r0();};s.CurrentThread=v;var w=function(){v.m=new r(function(r0,s0){try{return r0.n-s0.n;}catch(t0){debugger;}});this.q=function(){v.m=a;};this.p=function(){while(v.m.GetCount()>0){var r0=v.m.Dequeue();if(!r0.t()){while(r0.n-v.Now()>0);if(!r0.t())r0.o();}}};};var x=0;var y=function(r0,s0){this.u=x++;this.o=r0;this.n=s0;this.v=new k();this.t=function(){return this.v.GetIsDisposed();};this.r=function(){return this.v;};};var z=new s(function(r0){r0();return j;},function(r0,s0){while(this.Now<s0);r0();},f);s.Immediate=z;var A=new s(function(r0){var s0=c.setTimeout(r0,0);return i(function(){c.clearTimeout(s0);});},function(r0,s0){var t0=c.setTimeout(r0,s0);return i(function(){c.clearTimeout(t0);});},f);s.Timeout=A;var B=b.Observer=function(r0,s0,t0){this.OnNext=r0===a?e:r0;this.OnError=s0===a?function(u0){throw u0;}:s0;this.OnCompleted=t0===a?e:t0;this.AsObserver=function(){var u0=this;return new B(function(v0){u0.OnNext(v0);},function(v0){u0.OnError(v0);},function(){u0.OnCompleted();});};};var C=B.Create=function(r0,s0,t0){return new B(r0,s0,t0);};var D=b.Observable=function(r0){this.w=r0;};var E=D.CreateWithDisposable=function(r0){return new D(r0);};var F=D.Create=function(r0){return E(function(s0){return i(r0(s0));});};var G=function(){return this.Select(function(r0){return r0.Value;});};D.prototype={Subscribe:function(r0,s0,t0){var u0;if(arguments.length==0||arguments.length>1||typeof r0 =="function")u0=new B(r0,s0,t0); else u0=r0;return this.x(u0);},x:function(r0){var s0=false;var t0=new o();var u0=this;v.s(function(){var v0=new B(function(w0){if(!s0)r0.OnNext(w0);},function(w0){if(!s0){s0=true;t0.Dispose();r0.OnError(w0);}},function(){if(!s0){s0=true;t0.Dispose();r0.OnCompleted();}});t0.Replace(u0.w(v0));});return new n(t0,i(function(){s0=true;}));},Select:function(r0){var s0=this;return E(function(t0){var u0=0;return s0.Subscribe(new B(function(v0){var w0;try{w0=r0(v0,u0++);}catch(x0){t0.OnError(x0);return;}t0.OnNext(w0);},function(v0){t0.OnError(v0);},function(){t0.OnCompleted();}));});},Let:function(r0,s0){if(s0===a)return r0(this);var t0=this;return E(function(u0){var v0=s0();var w0;try{w0=r0(v0);}catch(A0){return L(A0).Subscribe(u0);}var x0=new o();var y0=new o();var z0=new n(y0,x0);x0.Replace(w0.Subscribe(function(A0){u0.OnNext(A0);},function(A0){u0.OnError(A0);z0.Dispose();},function(){u0.OnCompleted();z0.Dispose();}));y0.Replace(t0.Subscribe(v0));return z0;});},MergeObservable:function(){var r0=this;return E(function(s0){var t0=false;var u0=new n();var v0=new o();u0.Add(v0);v0.Replace(r0.Subscribe(function(w0){var x0=new o();u0.Add(x0);x0.Replace(w0.Subscribe(function(y0){s0.OnNext(y0);},function(y0){s0.OnError(y0);},function(){u0.Remove(x0);if(u0.GetCount()==1&&t0)s0.OnCompleted();}));},function(w0){s0.OnError(w0);},function(){t0=true;if(u0.GetCount()==1)s0.OnCompleted();}));return u0;});},y:function(r0,s0){var t0=p(s0);t0.unshift(this);return r0(t0);},Concat:function(){return this.y(I,arguments);},Merge:function(){return this.y(H,arguments);},Catch:function(){return this.y(P,arguments);},OnErrorResumeNext:function(){return this.y(V,arguments);},Zip:function(r0,s0){var t0=this;return E(function(u0){var v0=false;var w0=[];var x0=[];var y0=false;var z0=false;var A0=new n();var B0=function(C0){A0.Dispose();w0=a;x0=a;u0.OnError(C0);};A0.Add(t0.Subscribe(function(C0){if(z0){u0.OnCompleted();return;}if(x0.length>0){var D0=x0.shift();var E0;try{E0=s0(C0,D0);}catch(F0){A0.Dispose();u0.OnError(F0);return;}u0.OnNext(E0);}else w0.push(C0);},B0,function(){if(z0){u0.OnCompleted();return;}y0=true;}));A0.Add(r0.Subscribe(function(C0){if(y0){u0.OnCompleted();return;}if(w0.length>0){var D0=w0.shift();var E0;try{E0=s0(D0,C0);}catch(F0){A0.Dispose();u0.OnError(F0);return;}u0.OnNext(E0);}else x0.push(C0);},B0,function(){if(y0){u0.OnCompleted();return;}z0=true;}));return A0;});},CombineLatest:function(r0,s0){var t0=this;return E(function(u0){var v0=false;var w0=false;var x0=false;var y0;var z0;var A0=false;var B0=false;var C0=new n();var D0=function(E0){C0.Dispose();u0.OnError(E0);};C0.Add(t0.Subscribe(function(E0){if(B0){u0.OnCompleted();return;}if(x0){var F0;try{F0=s0(E0,z0);}catch(G0){C0.Dispose();u0.OnError(G0);return;}u0.OnNext(F0);}y0=E0;w0=true;},D0,function(){if(B0){u0.OnCompleted();return;}A0=true;}));C0.Add(r0.Subscribe(function(E0){if(A0){u0.OnCompleted();return;}if(w0){var F0;try{F0=s0(y0,E0);}catch(G0){C0.Dispose();u0.OnError(G0);return;}u0.OnNext(F0);}z0=E0;x0=true;},D0,function(){if(A0){u0.OnCompleted();return;}B0=true;}));});},Switch:function(){var r0=this;return E(function(s0){var t0=false;var u0=new o();var v0=new o();v0.Replace(r0.Subscribe(function(w0){if(!t0){var x0=new o();x0.Replace(w0.Subscribe(function(y0){s0.OnNext(y0);},function(y0){v0.Dispose();u0.Dispose();s0.OnError(y0);},function(){u0.Replace(a);if(t0)s0.OnCompleted();}));u0.Replace(x0);}},function(w0){u0.Dispose();s0.OnError(w0);},function(){t0=true;if(u0.Get()===a)s0.OnCompleted();}));return new n(v0,u0);});},TakeUntil:function(r0){var s0=this;return E(function(t0){var u0=new n();u0.Add(r0.Subscribe(function(){t0.OnCompleted();u0.Dispose();},function(v0){t0.OnError(v0);},function(){}));u0.Add(s0.Subscribe(t0));return u0;});},SkipUntil:function(r0){var s0=this;return E(function(t0){var u0=true;var v0=new n();v0.Add(r0.Subscribe(function(){u0=false;},function(w0){t0.OnError(w0);},e));v0.Add(s0.Subscribe(new B(function(w0){if(!u0)t0.OnNext(w0);},function(w0){t0.OnError(w0);},function(){if(!u0)t0.OnCompleted();})));return v0;});},Scan1:function(r0){var s0=this;return O(function(){var t0;var u0=false;return s0.Select(function(v0){if(u0)t0=r0(t0,v0); else{t0=v0;u0=true;}return t0;});});},Scan:function(r0,s0){var t0=this;return O(function(){var u0;var v0=false;return t0.Select(function(w0){if(v0)u0=s0(u0,w0); else{u0=s0(r0,w0);v0=true;}return u0;});});},Scan0:function(r0,s0){var t0=this;return E(function(u0){var v0=r0;var w0=true;return t0.Subscribe(function(x0){if(w0){w0=false;u0.OnNext(v0);}try{v0=s0(v0,x0);}catch(y0){u0.OnError(y0);return;}u0.OnNext(v0);},function(x0){if(w0)u0.OnNext(v0);u0.OnError(x0);},function(){if(w0)u0.OnNext(v0);u0.OnCompleted();});});},Finally:function(r0){var s0=this;return F(function(t0){var u0=s0.Subscribe(t0);return function(){try{u0.Dispose();r0();}catch(v0){r0();throw v0;}};});},Do:function(r0,s0,t0){var u0;if(arguments.length==0||arguments.length>1||typeof r0 =="function")u0=new B(r0,s0!==a?s0:e,t0); else u0=r0;var v0=this;return E(function(w0){return v0.Subscribe(new B(function(x0){try{u0.OnNext(x0);}catch(y0){w0.OnError(y0);return;}w0.OnNext(x0);},function(x0){if(s0!==a)try{u0.OnError(x0);}catch(y0){w0.OnError(y0);return;}w0.OnError(x0);},function(){if(t0!==a)try{u0.OnCompleted();}catch(x0){w0.OnError(x0);return;}w0.OnCompleted();}));});},Where:function(r0){var s0=this;return E(function(t0){var u0=0;return s0.Subscribe(new B(function(v0){var w0=false;try{w0=r0(v0,u0++);}catch(x0){t0.OnError(x0);return;}if(w0)t0.OnNext(v0);},function(v0){t0.OnError(v0);},function(){t0.OnCompleted();}));});},Take:function(r0,s0){if(s0===a)s0=z;var t0=this;return E(function(u0){if(r0<=0){t0.Subscribe().Dispose();return N(s0).Subscribe(u0);}var v0=r0;return t0.Subscribe(new B(function(w0){if(v0-->0){u0.OnNext(w0);if(v0==0)u0.OnCompleted();}},function(w0){u0.OnError(w0);},function(){u0.OnCompleted();}));});},GroupBy:function(r0,s0,t0){if(r0===a)r0=h;if(s0===a)s0=h;if(t0===a)t0=function(v0){return v0.toString();};var u0=this;return E(function(v0){var w0={};var x0=new o();var y0=new m(x0);x0.Replace(u0.Subscribe(function(z0){var A0;try{A0=r0(z0);}catch(G0){for(var H0 in w0) w0[H0].OnError(G0);v0.OnError(G0);return;}var B0=false;var C0;try{var D0=t0(A0);if(w0[D0]===a){C0=new i0();w0[D0]=C0;B0=true;}else C0=w0[D0];}catch(G0){for(var H0 in w0) w0[H0].OnError(G0);v0.OnError(G0);return;}if(B0){var E0=E(function(G0){return new n(y0.GetDisposable(),C0.Subscribe(G0));});E0.Key=A0;v0.OnNext(E0);}var F0;try{F0=s0(z0);}catch(G0){for(var H0 in w0) w0[H0].OnError(G0);v0.OnError(G0);return;}C0.OnNext(F0);},function(z0){for(var A0 in w0) w0[A0].OnError(z0);v0.OnError(z0);},function(){for(var z0 in w0) w0[z0].OnCompleted();v0.OnCompleted();}));return y0;});},TakeWhile:function(r0){var s0=this;return E(function(t0){var u0=true;return s0.Subscribe(new B(function(v0){if(u0){try{u0=r0(v0);}catch(w0){t0.OnError(w0);return;}if(u0)t0.OnNext(v0); else t0.OnCompleted();}},function(v0){t0.OnError(v0);},function(){t0.OnCompleted();}));});},SkipWhile:function(r0){var s0=this;return E(function(t0){var u0=false;return s0.Subscribe(new B(function(v0){if(!u0)try{u0=!r0(v0);}catch(w0){t0.OnError(w0);return;}if(u0)t0.OnNext(v0);},function(v0){t0.OnError(v0);},function(){t0.OnCompleted();}));});},Skip:function(r0){var s0=this;return E(function(t0){var u0=r0;return s0.Subscribe(new B(function(v0){if(u0--<=0)t0.OnNext(v0);},function(v0){t0.OnError(v0);},function(){t0.OnCompleted();}));});},SelectMany:function(r0){return this.Select(r0).MergeObservable();},TimeInterval:function(r0){if(r0===a)r0=z;var s0=this;return O(function(){var t0=r0.Now();return s0.Select(function(u0){var v0=r0.Now();var w0=v0-t0;t0=v0;return {Interval:w0,Value:u0};});});},RemoveInterval:G,Timestamp:function(r0){if(r0===a)r0=z;return this.Select(function(s0){return {Timestamp:r0.Now(),Value:s0};});},RemoveTimestamp:G,Materialize:function(){var r0=this;return E(function(s0){return r0.Subscribe(new B(function(t0){s0.OnNext(new h0("N",t0));},function(t0){s0.OnNext(new h0("E",t0));s0.OnCompleted();},function(){s0.OnNext(new h0("C"));s0.OnCompleted();}));});},Dematerialize:function(){return this.SelectMany(function(r0){return r0;});},AsObservable:function(){var r0=this;return E(function(s0){return r0.Subscribe(s0);});},Delay:function(r0,s0){if(s0===a)s0=A;var t0=this;return E(function(u0){var v0=[];var w0=false;var x0=new o();var y0=t0.Materialize().Timestamp().Subscribe(function(z0){if(z0.Value.Kind=="E"){u0.OnError(z0.Value.Value);v0=[];if(w0)x0.Dispose();return;}v0.push({Timestamp:s0.Now()+r0,Value:z0.Value});if(!w0){x0.Replace(s0.ScheduleRecursiveWithTime(function(A0){var B0;do{B0=a;if(v0.length>0&&v0[0].Timestamp<=s0.Now())B0=v0.shift().Value;if(B0!==a)B0.Accept(u0);}while(B0!==a);if(v0.length>0){A0(Math.max(0,v0[0].Timestamp-s0.Now()));w0=true;}else w0=false;},r0));w0=true;}});return new n(y0,x0);});},Throttle:function(r0,s0){if(s0===a)s0=A;var t0=this;return E(function(u0){var v0;var w0=false;var x0=new o();var y0=0;var z0=t0.Subscribe(function(A0){w0=true;v0=A0;y0++;var B0=y0;x0.Replace(s0.ScheduleWithTime(function(){if(w0&&y0==B0)u0.OnNext(v0);w0=false;},r0));},function(A0){x0.Dispose();u0.OnError(A0);w0=false;y0++;},function(){x0.Dispose();if(w0)u0.OnNext(v0);u0.OnCompleted();w0=false;y0++;});return new n(z0,x0);});},Timeout:function(r0,s0,t0){if(t0===a)t0=A;if(s0===a)s0=L("Timeout",t0);var u0=this;return E(function(v0){var w0=new o();var x0=new o();var y0=0;var z0=y0;var A0=false;x0.Replace(t0.ScheduleWithTime(function(){A0=y0==z0;if(A0)w0.Replace(s0.Subscribe(v0));},r0));w0.Replace(u0.Subscribe(function(B0){var C0=0;if(!A0){y0++;C0=y0;v0.OnNext(B0);x0.Replace(t0.ScheduleWithTime(function(){A0=y0==C0;if(A0)w0.Replace(s0.Subscribe(v0));},r0));}},function(B0){if(!A0){y0++;v0.OnError(B0);}},function(){if(!A0){y0++;v0.OnCompleted();}}));return new n(w0,x0);});},Sample:function(r0,s0){if(s0===a)s0=A;var t0=this;return E(function(u0){var v0=false;var w0;var x0=false;var y0=new n();y0.Add(Y(r0,s0).Subscribe(function(z0){if(v0){u0.OnNext(w0);v0=false;}if(x0)u0.OnCompleted();},function(z0){u0.OnError(z0);},function(){u0.OnCompleted();}));y0.Add(t0.Subscribe(function(z0){v0=true;w0=z0;},function(z0){u0.OnError(z0);y0.Dispose();},function(){x0=true;}));return y0;});},Repeat:function(r0,s0){var t0=this;if(s0===a)s0=z;if(r0===a)r0=-1;return E(function(u0){var v0=r0;var w0=new o();var x0=new n(w0);var y0=function(z0){w0.Replace(t0.Subscribe(function(A0){u0.OnNext(A0);},function(A0){u0.OnError(A0);},function(){if(v0>0){v0--;if(v0==0){u0.OnCompleted();return;}}z0();}));};x0.Add(s0.ScheduleRecursive(y0));return x0;});},Retry:function(r0,s0){var t0=this;if(s0===a)s0=z;if(r0===a)r0=-1;return E(function(u0){var v0=r0;var w0=new o();var x0=new n(w0);var y0=function(z0){w0.Replace(t0.Subscribe(function(A0){u0.OnNext(A0);},function(A0){if(v0>0){v0--;if(v0==0){u0.OnError(A0);return;}}z0();},function(){u0.OnCompleted();}));};x0.Add(s0.ScheduleRecursive(y0));return x0;});},BufferWithTime:function(r0,s0,t0){if(t0===a)t0=A;if(s0===a)s0=r0;var u0=this;return E(function(v0){var w0=new q();var x0=t0.Now();var y0=function(){var C0=[];for(var D0=0;D0<w0.GetCount();D0++){var E0=w0.GetItem(D0);if(E0.Timestamp-x0>=0)C0.push(E0.Value);}return C0;};var z0=new n();var A0=function(C0){v0.OnError(C0);};var B0=function(){v0.OnNext(y0());v0.OnCompleted();};z0.Add(u0.Subscribe(function(C0){w0.Add({Value:C0,Timestamp:t0.Now()});},A0,B0));z0.Add(a0(r0,s0,t0).Subscribe(function(C0){var D0=y0();var E0=t0.Now()+s0-r0;while(w0.GetCount()>0&&w0.GetItem(0).Timestamp-E0<=0)w0.RemoveAt(0);v0.OnNext(D0);x0=E0;},A0,B0));return z0;});},BufferWithTimeOrCount:function(r0,s0,t0){if(t0===a)t0=A;var u0=this;return E(function(v0){var w0=0;var x0=new q();var y0=function(){v0.OnNext(x0.ToArray());x0.Clear();w0++;};var z0=new o();var A0;A0=function(C0){var D0=t0.ScheduleWithTime(function(){var E0=false;var F0=0;if(C0==w0){y0();F0=w0;E0=true;}if(E0)A0(F0);},r0);z0.Replace(D0);};A0(w0);var B0=u0.Subscribe(function(C0){var D0=false;var E0=0;x0.Add(C0);if(x0.GetCount()==s0){y0();E0=w0;D0=true;}if(D0)A0(E0);},function(C0){v0.OnError(C0);x0.Clear();},function(){v0.OnNext(x0.ToArray());w0++;v0.OnCompleted();x0.Clear();});return new n(B0,z0);});},BufferWithCount:function(r0,s0){if(s0===a)s0=r0;var t0=this;return E(function(u0){var v0=[];var w0=0;return t0.Subscribe(function(x0){if(w0==0)v0.push(x0); else w0--;var y0=v0.length;if(y0==r0){var z0=v0;v0=[];var A0=Math.min(s0,y0);for(var B0=A0;B0<y0;B0++) v0.push(z0[B0]);w0=Math.max(0,s0-r0);u0.OnNext(z0);}},function(x0){u0.OnError(x0);},function(){if(v0.length>0)u0.OnNext(v0);u0.OnCompleted();});});},StartWith:function(r0,s0){if(!(r0 instanceof Array))r0=[r0];if(s0===a)s0=z;var t0=this;return E(function(u0){var v0=new n();var w0=0;v0.Add(s0.ScheduleRecursive(function(x0){if(w0<r0.length){u0.OnNext(r0[w0]);w0++;x0();}else v0.Add(t0.Subscribe(u0));}));return v0;});},DistinctUntilChanged:function(r0,s0){if(r0===a)r0=h;if(s0===a)s0=g;var t0=this;return E(function(u0){var v0;var w0=false;return t0.Subscribe(function(x0){var y0;try{y0=r0(x0);}catch(A0){u0.OnError(A0);return;}var z0=false;if(w0)try{z0=s0(v0,y0);}catch(A0){u0.OnError(A0);return;}if(!w0||!z0){w0=true;v0=y0;u0.OnNext(x0);}},function(x0){u0.OnError(x0);},function(){u0.OnCompleted();});});},Publish:function(r0){if(r0===a)return new q0(this,new i0());var s0=this;return E(function(t0){var u0=new q0(s0,new i0());return new n(r0(u0).Subscribe(B),u0.Connect());});},Prune:function(r0,s0){if(s0===a)s0=z;if(r0===a)return new q0(this,new k0(s0));var t0=this;return E(function(u0){var v0=new q0(t0,new k0(s0));return new n(r0(v0).Subscribe(B),v0.Connect());});},Replay:function(r0,s0,t0,u0){if(u0===a)u0=v;if(r0===a)return new q0(this,new m0(s0,t0,u0));var v0=this;return E(function(w0){var x0=new q0(v0,new m0(s0,t0,u0));return new n(r0(x0).Subscribe(B),x0.Connect());});},SkipLast:function(r0){var s0=this;return E(function(t0){var u0=[];return s0.Subscribe(function(v0){u0.push(v0);if(u0.length>r0)t0.OnNext(u0.shift());},function(v0){t0.OnError(v0);},function(){t0.OnCompleted();});});},TakeLast:function(r0){var s0=this;return E(function(t0){var u0=[];return s0.Subscribe(function(v0){u0.push(v0);if(u0.length>r0)u0.shift();},function(v0){t0.OnError(v0);},function(){while(u0.length>0)t0.OnNext(u0.shift());t0.OnCompleted();});});}};var H=D.Merge=function(r0,s0){if(s0===a)s0=z;return J(r0,s0).MergeObservable();};var I=D.Concat=function(r0,s0){if(s0===a)s0=z;return E(function(t0){var u0=new o();var v0=0;var w0=s0.ScheduleRecursive(function(x0){if(v0<r0.length){var y0=r0[v0];v0++;var z0=new o();u0.Replace(z0);z0.Replace(y0.Subscribe(function(A0){t0.OnNext(A0);},function(A0){t0.OnError(A0);},x0));}else t0.OnCompleted();});return new n(u0,w0);});};var J=D.FromArray=function(r0,s0){if(s0===a)s0=z;return E(function(t0){var u0=0;return s0.ScheduleRecursive(function(v0){if(u0<r0.length){t0.OnNext(r0[u0++]);v0();}else t0.OnCompleted();});});};var K=D.Return=function(r0,s0){if(s0===a)s0=z;return E(function(t0){return s0.Schedule(function(){t0.OnNext(r0);t0.OnCompleted();});});};var L=D.Throw=function(r0,s0){if(s0===a)s0=z;return E(function(t0){return s0.Schedule(function(){t0.OnError(r0);});});};var M=D.Never=function(){return E(function(r0){return j;});};var N=D.Empty=function(r0){if(r0===a)r0=z;return E(function(s0){return r0.Schedule(function(){s0.OnCompleted();});});};var O=D.Defer=function(r0){return E(function(s0){var t0;try{t0=r0();}catch(u0){s0.OnError(u0);return j;}return t0.Subscribe(s0);});};var P=D.Catch=function(r0,s0){if(s0===a)s0=z;return E(function(t0){var u0=new o();var v0=0;var w0=s0.ScheduleRecursive(function(x0){var y0=r0[v0];v0++;var z0=new o();u0.Replace(z0);z0.Replace(y0.Subscribe(function(A0){t0.OnNext(A0);},function(A0){if(v0<r0.length)x0(); else t0.OnError(A0);},function(){t0.OnCompleted();}));});return new n(u0,w0);});};var Q=D.Using=function(r0,s0){return E(function(t0){var u0;var v0=j;try{var w0=r0();if(w0!==a)v0=w0;u0=s0(w0);}catch(x0){return new n(Throw(x0).Subscribe(t0),v0);}return new n(u0.Subscribe(t0),v0);});};var R=D.Range=function(r0,s0,t0){if(t0===a)t0=z;var u0=r0+s0-1;return T(r0,function(v0){return v0<=u0;},function(v0){return v0+1;},h,t0);};var S=D.Repeat=function(r0,s0,t0){if(t0===a)t0=z;if(s0===a)s0=-1;var u0=s0;return E(function(v0){return t0.ScheduleRecursive(function(w0){v0.OnNext(r0);if(u0>0){u0--;if(u0==0){v0.OnCompleted();return;}}w0();});});};var T=D.Generate=function(r0,s0,t0,u0,v0){if(v0===a)v0=z;return E(function(w0){var x0=r0;var y0=true;return v0.ScheduleRecursive(function(z0){var A0=false;var B0;try{if(y0)y0=false; else x0=t0(x0);A0=s0(x0);if(A0)B0=u0(x0);}catch(C0){w0.OnError(C0);return;}if(A0){w0.OnNext(B0);z0();}else w0.OnCompleted();});});};var U=D.GenerateWithTime=function(r0,s0,t0,u0,v0,w0){if(w0===a)w0=A;return new E(function(x0){var y0=r0;var z0=true;var A0=false;var B0;var C0;return w0.ScheduleRecursiveWithTime(function(D0){if(A0)x0.OnNext(B0);try{if(z0)z0=false; else y0=t0(y0);A0=s0(y0);if(A0){B0=u0(y0);C0=v0(y0);}}catch(E0){x0.OnError(E0);return;}if(A0)D0(C0); else x0.OnCompleted();},0);});};var V=D.OnErrorResumeNext=function(r0,s0){if(s0===a)s0=z;return E(function(t0){var u0=new o();var v0=0;var w0=s0.ScheduleRecursive(function(x0){if(v0<r0.length){var y0=r0[v0];v0++;var z0=new o();u0.Replace(z0);z0.Replace(y0.Subscribe(function(A0){t0.OnNext(A0);},x0,x0));}else t0.OnCompleted();});return new n(u0,w0);});};var W=D.Amb=function(){var r0=arguments;return E(function(s0){var t0=new n();var u0=new o();u0.Replace(t0);var v0=false;for(var w0=0;w0<r0.length;w0++){var x0=r0[w0];var y0=new o();var z0=new B(function(A0){if(!v0){t0.Remove(this.z,true);t0.Dispose();u0.Replace(this.z);v0=true;}s0.OnNext(A0);},function(A0){s0.OnError(A0);u0.Dispose();},function(){s0.OnCompleted();u0.Dispose();});z0.z=y0;y0.Replace(x0.Subscribe(z0));t0.Add(y0);}return u0;});};var X=D.ForkJoin=function(){var r0=arguments;return E(function(s0){var t0=[];var u0=[];var v0=[];var w0=new n();for(var x0=0;x0<r0.length;x0++) (function(y0){w0.Add(r0[y0].Subscribe(function(z0){t0[y0]=true;v0[y0]=z0;},function(z0){s0.OnError(z0);},function(z0){if(!t0[y0]){s0.OnCompleted();v0=a;t0=a;return;}u0[y0]=true;var A0=true;for(var B0=0;B0<r0.length;B0++){if(!u0[B0])A0=false;}if(A0){s0.OnNext(v0);s0.OnCompleted();v0=a;u0=a;t0=a;}}));})(x0);return w0;});};var Y=D.Interval=function(r0,s0){return a0(r0,r0,s0);};var Z=function(r0){return Math.max(0,r0);};var a0=D.Timer=function(r0,s0,t0){if(t0===a)t0=A;if(r0===a)return M();if(r0 instanceof Date)return O(function(){return D.Timer(r0-new Date(),s0,t0);});var u0=Z(r0);if(s0===a)return E(function(w0){return t0.ScheduleWithTime(function(){w0.OnNext(0);w0.OnCompleted();},u0);});var v0=Z(s0);return E(function(w0){var x0=0;return t0.ScheduleRecursiveWithTime(function(y0){w0.OnNext(x0++);y0(v0);},u0);});};var b0=D.While=function(r0,s0){return E(function(t0){var u0=new o();var v0=new n(u0);v0.Add(z.ScheduleRecursive(function(w0){var x0;try{x0=r0();}catch(y0){t0.OnError(y0);return;}if(x0)u0.Replace(s0.Subscribe(function(y0){t0.OnNext(y0);},function(y0){t0.OnError(y0);},function(){w0();})); else t0.OnCompleted();}));return v0;});};var c0=D.If=function(r0,s0,t0){if(t0===a)t0=N();return O(function(){return r0()?s0:t0;});};var d0=D.DoWhile=function(r0,s0){return I([r0,b0(s0,r0)]);};var e0=D.Case=function(r0,s0,t0,u0){if(u0===a)u0=z;if(t0===a)t0=N(u0);return O(function(){var v0=s0[r0()];if(v0===a)v0=t0;return v0;});};var f0=D.For=function(r0,s0){return E(function(t0){var u0=new n();var v0=0;u0.Add(z.ScheduleRecursive(function(w0){if(v0<r0.length){var x0;try{x0=s0(r0[v0]);}catch(y0){t0.OnError(y0);return;}u0.Add(x0.Subscribe(function(y0){t0.OnNext(y0);},function(y0){t0.OnError(y0);},function(){v0++;w0();}));}else t0.OnCompleted();}));return u0;});};var g0=D.Let=function(r0,s0){return O(function(){return s0(r0);});};var h0=b.Notification=function(r0,s0){this.Kind=r0;this.Value=s0;this.toString=function(){return this.Kind+": "+this.Value;};this.Accept=function(t0){switch(this.Kind){case "N":t0.OnNext(this.Value);break;case "E":t0.OnError(this.Value);break;case "C":t0.OnCompleted();break;}return j;};this.w=function(t0){var u0=this.Accept(t0);if(r0=="N")t0.OnCompleted();return u0;};};h0.prototype=new D;var i0=b.Subject=function(){var r0=new q();var s0=false;this.OnNext=function(t0){if(!s0){var u0=r0.ToArray();for(var v0=0;v0<u0.length;v0++){var w0=u0[v0];w0.OnNext(t0);}}};this.OnError=function(t0){if(!s0){var u0=r0.ToArray();for(var v0=0;v0<u0.length;v0++){var w0=u0[v0];w0.OnError(t0);}s0=true;r0.Clear();}};this.OnCompleted=function(){if(!s0){var t0=r0.ToArray();for(var u0=0;u0<t0.length;u0++){var v0=t0[u0];v0.OnCompleted();}s0=true;r0.Clear();}};this.w=function(t0){if(!s0){r0.Add(t0);return i(function(){r0.Remove(t0);});}else return j;};};i0.prototype=new D;for(var j0 in B.prototype) i0.prototype[j0]=B.prototype[j0];var k0=b.AsyncSubject=function(r0){var s0=new q();var t0;var u0=false;if(r0===a)r0=z;this.OnNext=function(v0){if(!u0)t0=new h0("N",v0);};this.OnError=function(v0){if(!u0){t0=new h0("E",v0);var w0=s0.ToArray();for(var x0=0;x0<w0.length;x0++){var y0=w0[x0];if(y0!==a)y0.OnError(v0);}u0=true;s0.Clear();}};this.OnCompleted=function(){if(!u0){if(t0===a)t0=new h0("C");var v0=s0.ToArray();for(var w0=0;w0<v0.length;w0++){var x0=v0[w0];if(x0!==a)t0.w(x0);}u0=true;s0.Clear();}};this.w=function(v0){if(!u0){s0.Add(v0);return i(function(){s0.Remove(v0);});}else return r0.Schedule(function(){t0.w(v0);});};};k0.prototype=new i0;var l0=b.BehaviorSubject=function(r0,s0){var t0=new m0(1,-1,s0);t0.OnNext(r0);return t0;};var m0=b.ReplaySubject=function(r0,s0,t0){var u0=new q();var v0=new q();var w0=false;if(t0===a)t0=v;var x0=s0>0;var y0=function(z0,A0){v0.Add({Value:new h0(z0,A0),Timestamp:t0.Now()});};this.A=function(){if(r0!==a)while(v0.GetCount()>r0)v0.RemoveAt(0);if(x0)while(v0.GetCount()>0&&t0.Now()-v0.GetItem(0).Timestamp>s0)v0.RemoveAt(0);};this.OnNext=function(z0){if(!w0){var A0=u0.ToArray();for(var B0=0;B0<A0.length;B0++){var C0=A0[B0];C0.OnNext(z0);}y0("N",z0);}};this.OnError=function(z0){if(!w0){var A0=u0.ToArray();for(var B0=0;B0<A0.length;B0++){var C0=A0[B0];C0.OnError(z0);}w0=true;u0.Clear();y0("E",z0);}};this.OnCompleted=function(){if(!w0){var z0=u0.ToArray();for(var A0=0;A0<z0.length;A0++){var B0=z0[A0];B0.OnCompleted();}w0=true;u0.Clear();y0("C");}};this.w=function(z0){var A0=new n0(this,z0);var B0=new n(A0);var C0=this;B0.Add(t0.Schedule(function(){if(!A0.B){C0.A();for(var D0=0;D0<v0.GetCount();D0++) v0.GetItem(D0).Value.Accept(z0);u0.Add(z0);A0.C=true;}}));return B0;};this.D=function(z0){u0.Remove(z0);};};m0.prototype=new i0;var n0=function(r0,s0){this.E=r0;this.F=s0;this.C=false;this.B=false;this.Dispose=function(){if(this.C)this.E.D(this.F);this.B=true;};};var o0=D.ToAsync=function(r0,s0){if(s0===a)s0=A;return function(){var t0=new k0(s0);var u0=function(){var x0;try{x0=r0.apply(this,arguments);}catch(y0){t0.OnError(y0);return;}t0.OnNext(x0);t0.OnCompleted();};var v0=this;var w0=p(arguments);s0.Schedule(function(){u0.apply(v0,w0);});return t0;};};var p0=D.Start=function(r0,s0,t0,u0){if(t0===a)t0=[];return o0(r0,u0).apply(s0,t0);};var q0=b.ConnectableObservable=function(r0,s0){if(s0===a)s0=new i0();this.E=s0;this.G=r0;this.H=false;this.Connect=function(){var t0;var u0=false;if(!this.H){this.H=true;var v0=this;t0=new n(i(function(){v0.H=false;}));this.I=t0;t0.Add(r0.Subscribe(this.E));}return this.I;};this.w=function(t0){return this.E.Subscribe(t0);};this.RefCount=function(){var t0=0;var u0=this;var v0;return F(function(w0){var x0=false;t0++;x0=t0==1;var y0=u0.Subscribe(w0);if(x0)v0=u0.Connect();return function(){y0.Dispose();t0--;if(t0==0)v0.Dispose();};});};};q0.prototype=new D;})();
// Copyright (c) Microsoft Corporation.  All rights reserved.
// This code is licensed by Microsoft Corporation under the terms
// of the MICROSOFT REACTIVE EXTENSIONS FOR JAVASCRIPT AND .NET LIBRARIES License.
// See http://go.microsoft.com/fwlink/?LinkId=186234.

(function()
{
    var _jQuery = jQuery;
    var proto = _jQuery.fn;
    var global = this;
    var root;
    if (typeof ProvideCustomRxRootObject == "undefined")
    {
        root = global.Rx;
    }
    else
    {
        root = ProvideCustomRxRootObject();
    }
    var observable = root.Observable;
    var asyncSubject = root.AsyncSubject;
    var observableCreate = observable.Create;
    var disposableEmpty = root.Disposable.Empty;

    proto.toObservable = function(eventType, eventData)
    {
        var parent = this;
        return observableCreate(function(observer)
        {
            var handler = function(eventObject)
            {
                observer.OnNext(eventObject);
            };
            parent.bind(eventType, eventData, handler);
            return function()
            {
                parent.unbind(eventType, handler);
            };
        });
    };

    proto.toLiveObservable = function(eventType, eventData)
    {
        var parent = this;
        return observableCreate(function(observer)
        {
            var handler = function(eventObject)
            {
                observer.OnNext(eventObject);
            };
            parent.live(eventType, eventData, handler);
            return function()
            {
                parent.die(eventType, handler);
            };
        });
    };

    proto.hideAsObservable = function(duration)
    {
        var subject = new asyncSubject();
        this.hide(duration, function()
        {
            subject.OnNext(this);
            subject.OnCompleted();
        });
        return subject;
    }

    proto.showAsObservable = function(duration)
    {
        var subject = new asyncSubject();
        this.show(duration, function()
        {
            subject.OnNext(this);
            subject.OnCompleted();
        });
        return subject;
    }

    proto.animateAsObservable = function(properties, duration, easing)
    {
        var subject = new asyncSubject();
        this.animate(properties, duration, easing, function()
        {
            subject.OnNext(this);
            subject.OnCompleted();
        });
        return subject;
    }

    proto.fadeInAsObservable = function(duration)
    {
        var subject = new asyncSubject();
        this.fadeIn(duration, function()
        {
            subject.OnNext(this);
            subject.OnCompleted();
        });
        return subject;
    }

    proto.fadeToAsObservable = function(duration, opacity)
    {
        var subject = new asyncSubject();
        this.fadeTo(duration, opacity, function()
        {
            subject.OnNext(this);
            subject.OnCompleted();
        });
        return subject;
    }

    proto.fadeOutAsObservable = function(duration)
    {
        var subject = new asyncSubject();
        this.fadeOut(duration, function()
        {
            subject.OnNext(this);
            subject.OnCompleted();
        });
        return subject;
    }

    proto.slideDownAsObservable = function(duration)
    {
        var subject = new asyncSubject();
        this.slideDown(duration, function()
        {
            subject.OnNext(this);
            subject.OnCompleted();
        });
        return subject;
    }

    proto.slideUpAsObservable = function(duration)
    {
        var subject = new asyncSubject();
        this.slideUp(duration, function()
        {
            subject.OnNext(this);
            subject.OnCompleted();
        });
        return subject;
    }

    proto.slideToggleAsObservable = function(duration)
    {
        var subject = new asyncSubject();
        this.slideToggle(duration, function()
        {
            subject.OnNext(this);
            subject.OnCompleted();
        });
        return subject;
    }

    var ajaxAsObservable = _jQuery.ajaxAsObservable = function(settings)
    {
        var internalSettings = {};
        for (var k in settings)
        {
            internalSettings[k] = settings[k];
        }
        var subject = new asyncSubject();
        internalSettings.success = function(data, textStatus, xmlHttpRequest)
        {
            subject.OnNext({ data: data, textStatus: textStatus, xmlHttpRequest: xmlHttpRequest });
            subject.OnCompleted();
        };
        internalSettings.error = function(xmlHttpRequest, textStatus, errorThrown)
        {
            subject.OnError({ xmlHttpRequest: xmlHttpRequest, textStatus: textStatus, errorThrown: errorThrown });
        };
        _jQuery.ajax(internalSettings);
        return subject;
    };

    _jQuery.getJSONAsObservable = function(url, data)
    {
        return ajaxAsObservable({ url: url, dataType: 'json', data: data });
    };

    _jQuery.getScriptAsObservable = function(url, data)
    {
        return ajaxAsObservable({ url: url, dataType: 'script', data: data });
    };

    _jQuery.postAsObservable = function(url, data)
    {
        return ajaxAsObservable({ url: url, type: 'POST', data: data });
    };

    proto.loadAsObservable = function(url, params)
    {
        var subject = new asyncSubject();
        var callback = function(response, status, xmlHttpRequest)
        {
            if (status === "error") 
            {
                subject.OnError({ response : response, status : status, xmlHttpRequest: xmlHttpRequest });
            } 
            else 
            {
               subject.OnNext({ response : response, status : status, xmlHttpRequest: xmlHttpRequest });
               subject.OnCompleted();
            }
        };
        this.load(url, params, callback);
        return subject;        
    };       
    
    _jQuery.getScriptAsObservable = function(url)
    {
        return ajaxAsObservable({ url: url, dataType: 'script'});
    };    
    
    _jQuery.postAsObservable = function(url, data, type )
    {
        return ajaxAsObservable({ url : url, dataType : type, data : data, type : "POST" });
    };

})();
/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};


/* A JavaScript implementation of the SHA family of hashes, as defined in FIPS
 * PUB 180-2 as well as the corresponding HMAC implementation as defined in
 * FIPS PUB 198a
 *
 * Version 1.3 Copyright Brian Turek 2008-2010
 * Distributed under the BSD License
 * See http://jssha.sourceforge.net/ for more information
 *
 * Several functions taken from Paul Johnson
 */
(function(){var charSize=8,b64pad="",hexCase=0,str2binb=function(a){var b=[],mask=(1<<charSize)-1,length=a.length*charSize,i;for(i=0;i<length;i+=charSize){b[i>>5]|=(a.charCodeAt(i/charSize)&mask)<<(32-charSize-(i%32))}return b},hex2binb=function(a){var b=[],length=a.length,i,num;for(i=0;i<length;i+=2){num=parseInt(a.substr(i,2),16);if(!isNaN(num)){b[i>>3]|=num<<(24-(4*(i%8)))}else{return"INVALID HEX STRING"}}return b},binb2hex=function(a){var b=(hexCase)?"0123456789ABCDEF":"0123456789abcdef",str="",length=a.length*4,i,srcByte;for(i=0;i<length;i+=1){srcByte=a[i>>2]>>((3-(i%4))*8);str+=b.charAt((srcByte>>4)&0xF)+b.charAt(srcByte&0xF)}return str},binb2b64=function(a){var b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"+"0123456789+/",str="",length=a.length*4,i,j,triplet;for(i=0;i<length;i+=3){triplet=(((a[i>>2]>>8*(3-i%4))&0xFF)<<16)|(((a[i+1>>2]>>8*(3-(i+1)%4))&0xFF)<<8)|((a[i+2>>2]>>8*(3-(i+2)%4))&0xFF);for(j=0;j<4;j+=1){if(i*8+j*6<=a.length*32){str+=b.charAt((triplet>>6*(3-j))&0x3F)}else{str+=b64pad}}}return str},rotl=function(x,n){return(x<<n)|(x>>>(32-n))},parity=function(x,y,z){return x^y^z},ch=function(x,y,z){return(x&y)^(~x&z)},maj=function(x,y,z){return(x&y)^(x&z)^(y&z)},safeAdd_2=function(x,y){var a=(x&0xFFFF)+(y&0xFFFF),msw=(x>>>16)+(y>>>16)+(a>>>16);return((msw&0xFFFF)<<16)|(a&0xFFFF)},safeAdd_5=function(a,b,c,d,e){var f=(a&0xFFFF)+(b&0xFFFF)+(c&0xFFFF)+(d&0xFFFF)+(e&0xFFFF),msw=(a>>>16)+(b>>>16)+(c>>>16)+(d>>>16)+(e>>>16)+(f>>>16);return((msw&0xFFFF)<<16)|(f&0xFFFF)},coreSHA1=function(f,g){var W=[],a,b,c,d,e,T,i,t,appendedMessageLength,H=[0x67452301,0xefcdab89,0x98badcfe,0x10325476,0xc3d2e1f0],K=[0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6];f[g>>5]|=0x80<<(24-(g%32));f[(((g+65)>>9)<<4)+15]=g;appendedMessageLength=f.length;for(i=0;i<appendedMessageLength;i+=16){a=H[0];b=H[1];c=H[2];d=H[3];e=H[4];for(t=0;t<80;t+=1){if(t<16){W[t]=f[t+i]}else{W[t]=rotl(W[t-3]^W[t-8]^W[t-14]^W[t-16],1)}if(t<20){T=safeAdd_5(rotl(a,5),ch(b,c,d),e,K[t],W[t])}else if(t<40){T=safeAdd_5(rotl(a,5),parity(b,c,d),e,K[t],W[t])}else if(t<60){T=safeAdd_5(rotl(a,5),maj(b,c,d),e,K[t],W[t])}else{T=safeAdd_5(rotl(a,5),parity(b,c,d),e,K[t],W[t])}e=d;d=c;c=rotl(b,30);b=a;a=T}H[0]=safeAdd_2(a,H[0]);H[1]=safeAdd_2(b,H[1]);H[2]=safeAdd_2(c,H[2]);H[3]=safeAdd_2(d,H[3]);H[4]=safeAdd_2(e,H[4])}return H},jsSHA=function(a,b){this.sha1=null;this.strBinLen=null;this.strToHash=null;if("HEX"===b){if(0!==(a.length%2)){return"TEXT MUST BE IN BYTE INCREMENTS"}this.strBinLen=a.length*4;this.strToHash=hex2binb(a)}else if(("ASCII"===b)||('undefined'===typeof(b))){this.strBinLen=a.length*charSize;this.strToHash=str2binb(a)}else{return"UNKNOWN TEXT INPUT TYPE"}};jsSHA.prototype={getHash:function(a){var b=null,message=this.strToHash.slice();switch(a){case"HEX":b=binb2hex;break;case"B64":b=binb2b64;break;default:return"FORMAT NOT RECOGNIZED"}if(null===this.sha1){this.sha1=coreSHA1(message,this.strBinLen)}return b(this.sha1)},getHMAC:function(a,b,c){var d,keyToUse,i,retVal,keyBinLen,keyWithIPad=[],keyWithOPad=[];switch(c){case"HEX":d=binb2hex;break;case"B64":d=binb2b64;break;default:return"FORMAT NOT RECOGNIZED"}if("HEX"===b){if(0!==(a.length%2)){return"KEY MUST BE IN BYTE INCREMENTS"}keyToUse=hex2binb(a);keyBinLen=a.length*4}else if("ASCII"===b){keyToUse=str2binb(a);keyBinLen=a.length*charSize}else{return"UNKNOWN KEY INPUT TYPE"}if(64<(keyBinLen/8)){keyToUse=coreSHA1(keyToUse,keyBinLen);keyToUse[15]&=0xFFFFFF00}else if(64>(keyBinLen/8)){keyToUse[15]&=0xFFFFFF00}for(i=0;i<=15;i+=1){keyWithIPad[i]=keyToUse[i]^0x36363636;keyWithOPad[i]=keyToUse[i]^0x5C5C5C5C}retVal=coreSHA1(keyWithIPad.concat(this.strToHash),512+this.strBinLen);retVal=coreSHA1(keyWithOPad.concat(retVal),672);return(d(retVal))}};window.jsSHA=jsSHA}());


$.extend(String.prototype, {
    trim: function (target) {
        return jSaaspose.string.trim(this, target)
    },
    trimStart: function (target) {
        return jSaaspose.string.trimStart(this, target);
    },
    trimEnd: function (target) {
        return jSaaspose.string.trimEnd(this, target);
    },
    contains: function (substring) {
        return this.indexOf(substring) != -1;
    },
    format: function () {
        var s = this,
            i = arguments.length;

        while (i--) {
            s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
        }
        return s;
    },
    endsWith: function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    }
});

if (!window.jGroupdocs)
    window.jGroupdocs = {};

window.jGroupdocs.stringExtensions = {
    format: function (sourceString) {
        var argumentsExceptThis = Array.prototype.slice.call(arguments);
        argumentsExceptThis.shift();
        return String.prototype.format.apply(sourceString, argumentsExceptThis);
    }
};

// moved to jGroupdocs.ArrayExtensions.js
// breaks Sharepoint ribbon when using using installable Viewer
//$.extend(Array.prototype, {
//    removeItem: function (val) {
//        for (var i = 0; i < this.length; i++) {
//            if (this[i] == val) {
//                this.splice(i, 1);
//                break;
//            }
//        }
//    }
//});

var jSaaspose = function() {
};

jSaaspose.string = {
    trim: function (string, target) {
        var regex = new RegExp("^[" + target + "]+|[" + target + "]+$", "g");
        return string.replace(regex, '');
    },
    trimStart: function (string, target) {
        var regex = new RegExp("^[" + target + "]+", "g");
        return string.replace(regex, '');
    },
    trimEnd: function (string, target) {
        var regex = new RegExp("[" + target + "]+$", "g");
        return string.replace(regex, '');
    }
}

jSaaspose.event = {
    add: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        }
    }
}

jSaaspose.html = {
    elementFromString: function (string) {
        var wrapper = document.createElement("div");
        wrapper.innerHTML = string;

        var element = wrapper.firstChild;
        wrapper.removeChild(element);

        return element;
    },

    toText: function (html) {
        return html.replace(/<\/div>|<\/li>|<\/ul>|<\/p>|<br\s*[\/]?>/ig, '\n')
            .replace(/<li>/ig, '  *  ')
            .replace(/<[^>]+>/ig, '');
    }
}

jSaaspose.http = {
    buildUrl: function (baseUrl, relativeUrl, params) {
        var url = jSaaspose.string.trimEnd(baseUrl, '/');

        if (relativeUrl && relativeUrl.length > 0) {
            url += '/' + jSaaspose.string.trimStart(relativeUrl, '/');
        }

        if (params) {
            url += (url.contains('&') || url.contains('?') ? '&' : '?') + jQuery.param(params);
        }

        return url;
    },

    getUrlSignature: function (url, key) {
        var urlParts = jSaaspose.http.splitUrl(url);
        var sha = new jsSHA(urlParts.pathAndQuery, "ASCII");
        var hash = sha.getHMAC(key, "ASCII", "B64");

        return encodeURIComponent(hash);
    },

    signUrl: function (url, key) {
        var urlParts = jSaaspose.http.splitUrl(url);
        //var hash = Crypto.HMAC(Crypto.SHA1, "Message", "Key", { asBytes: true }); // Crypto.HMAC(Crypto.SHA1, "urlParts.pathAndQuery.trim('\s')", key, { asBytes: true });
        //var signature = Crypto.util.bytesToBase64(hash);

        var signature = Container.Resolve('HttpProvider').getUrlSignature(url, key);

        return url +
            (urlParts.query == null || urlParts.query.length == 0 ? '?' : '&') +
            "signature=" + signature;
    },

    testURL: function (url) {
        var regex = /^(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,4}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?$/; 
        return regex.test(url);
    },

    splitUrl: (function () {
        var regex = new RegExp("(\\w+)://([^/]+)([^\?]*)([\?].+)?");

        return function (url) {
            var matches = url.match(regex);
            var path = (matches.length > 3 ? matches[3] : null);
            var query = (matches.length > 4 ? matches[4] : null);

            return {
                "schema": matches[1],
                "authority": (matches.length > 2 ? matches[2] : null),
                "path": path,
                "query": query,
                "queryDict": $.fn.q(query),
                "pathAndQuery": (query ? (path + query) : path)
            };
        };
    })(),

    getUrlParams: function (url) {
        var map = {};
        var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            map[key] = value;
        });

        return map;
    }
}

jSaaspose.utils = {
    getHexColor: function (color) {
        return '#' + ('000000' + (color && color.toString ? color.toString(16) : '')).substr(-6);
    },

    getSequenceNumber: (function () {
        var sn = 1000;
        return function () { return ++sn; };
    })(),

    getName: function (path) {
        return path != null ? path.replace(/.*(\/|\\)/, '') : '';
    },

    getExt: function (path) {
        var name = Container.Resolve('PathProvider').getName(path);
        return name.replace(/.*[\.]/, '');
    },

    getCorrectedURL: function (path) {
        if (path.indexOf('http://') == -1 && path.indexOf('https://') == -1) {
            return 'http://' + path;
        }
        return path;
    },

    getShortenedURLPath: function (path, length, slash) {
        if (path && path.length > length) {
            var http = path.indexOf('http://') != -1;
            var https = path.indexOf('https://') != -1;
            path = path.replace('http://', '').replace('https://', '');
            length = length - (http ? 7 : (https ? 8 : 0));
            return (http ? 'http://' : '') + (https ? 'https://' : '') + jSaaspose.utils.getShortenedPath(path, length, slash);
        }
        return path;
    },

    getShortenedPath: function (path, length, slash) {
        if (path && path.length > length) {
            path = path.replace('\\', slash).replace('/', slash);
            var splitted = path.split(slash);
            var shortened = jSaaspose.utils._cutRecurrently(splitted, length, slash, splitted.length > 2);
            return shortened;
        }
        return path;
    },

    getDocumentViewerUrl: function (fileId, fileVersion) {
        return this.getDocumentViewerUrlInternal(fileId, fileVersion, 1);
    },

    getDocumentViewerV2Url: function (fileId, fileVersion) {
        return this.getDocumentViewerUrlInternal(fileId, fileVersion, 2);
    },

    getDocumentViewerUrlInternal: function (fileId, fileVersion, userInterfaceVersion) {
        return $.url().attr("base") + '/document-viewer' + (userInterfaceVersion == 2 ? '2' : '') + '/' + fileId + '/' + (fileVersion ? fileVersion : '');
    },

    getDocumentViewerEmbedUrl: function (url, guid) {
        return url + 'document-viewer/embed/' + guid;
    },

    getDocumentViewerEmbedLiteUrl: function (url, fileId) {
        return url + 'document-viewer/embedlite/' + fileId;
    },

    getDocumentAnnotationEmbedUrl: function (url, guid) {
        return this._getDocumentAnnotationEmbedUrl(url, guid, 1);
    },

    getDocumentAnnotation2EmbedUrl: function (url, guid) {
        return this._getDocumentAnnotationEmbedUrl(url, guid, 2);
    },

    _getDocumentAnnotationEmbedUrl: function (url, guid, version) {
        return url + 'document-annotation' + (version == 2 ? '2' : '') + '/embed/' + guid;
    },

    _cutRecurrently: function (splitted, length, slash, multiple) {
        if (splitted.length > 2) {
            var mid = Math.ceil(splitted.length / 2) - 1;
            splitted[mid] = '...';
            var joined = splitted.join(slash);
            if (joined.length > length) {
                splitted.splice(mid, 1);
                return jSaaspose.utils._cutRecurrently(splitted, length, slash, true);
            }
            else {
                return joined;
            }
        }
        else {
            if (splitted.length == 2) {
                var maxw = { w: splitted[0], s: true }, minw = { w: splitted[1], s: false };
                if (splitted[0].length < splitted[1].length) {
                    maxw = { w: splitted[1], s: false }, minw = { w: splitted[0], s: true };
                }
                var ratio = maxw.w.length / minw.w.length;
                var lengthcut = (splitted[0] + (multiple ? (slash + '...' + slash) : slash) + splitted[1]).length - length;
                if (lengthcut > 0) {
                    var maxcut = Math.round((lengthcut + 6) * ratio / (1 + ratio));
                    var mincut = (lengthcut + 6) - maxcut;
                    if (maxw.s) {
                        maxw.w = maxw.w.substring(0, maxw.w.length - maxcut - 1) + (maxcut ? '...' : '');
                        minw.w = (mincut ? '...' : '') + minw.w.substring(mincut - 1, minw.w.length);
                    }
                    else {
                        maxw.w = (maxcut ? '...' : '') + maxw.w.substring(maxcut - 1, maxw.w.length);
                        minw.w = minw.w.substring(0, minw.w.length - mincut - 1) + (mincut ? '...' : '');
                    }
                }
                var midpart = (multiple ? (slash + '...' + slash) : slash);
                return maxw.s ? (maxw.w + midpart + minw.w) : (minw.w + midpart + maxw.w);
            }
            else {
                var only = splitted[0];
                if (only.length > (length - 3)) {
                    only = only.substring(0, only.length / 2 - (only.length - (length - 3)) / 2) + '...' + only.substring(only.length / 2 + (only.length - (length - 3)) / 2, only.length);
                }
                return only;
            }
        }
    },

    test_strength: function (password, options) {
        var score = 0;

        if (password.length < options.shortLimit) {
            return score;
        }

        if (options.regime == 'light') {
            return 100;
        }

        //password length
        score += password.length * 4;
        score += (jSaaspose.utils._checkRepetition(1, password).length - password.length) * 1;
        score += (jSaaspose.utils._checkRepetition(2, password).length - password.length) * 1;
        score += (jSaaspose.utils._checkRepetition(3, password).length - password.length) * 1;
        score += (jSaaspose.utils._checkRepetition(4, password).length - password.length) * 1;

        //password has 3 numbers
        if (password.match(/(.*[0-9].*[0-9].*[0-9])/)) {
            score += 5;
        }

        //password has 2 symbols
        if (password.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)) {
            score += 5;
        }

        //password has Upper and Lower chars
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
            score += 10;
        }

        //password has number and chars
        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
            score += 15;
        }

        //
        //password has number and symbol
        if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([0-9])/)) {
            score += 15;
        }

        //password has char and symbol
        if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([a-zA-Z])/)) {
            score += 15;
        }

        //password is just a numbers or chars
        if (password.match(/^\w+$/) || password.match(/^\d+$/)) {
            score -= 10;
        }

        //verifying 0 < score < 100
        if (score < 0) {
            score = 0;
        }

        if (score > 100) {
            score = 100;
        }

        return score;
    },

    _checkRepetition: function (pLen, str) {
        var res = "";

        for (var i = 0; i < str.length; i++) {
            var repeated = true;

            for (var j = 0; j < pLen && (j + i + pLen) < str.length; j++) {
                repeated = repeated && (str.charAt(j + i) == str.charAt(j + i + pLen));
            }

            if (j < pLen) {
                repeated = false;
            }

            if (repeated) {
                i += pLen - 1;
                repeated = false;
            }
            else {
                res += str.charAt(i);
            }
        }

        return res;
    },

    validateEmail: function (str) {
        var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return re.test(str);
    },

    validateCardNumber: function (str) {
        if (str && !str.replace(/ /g, "").match(/^[0-9]{8,32}$/)) {
            return false;
        }
        return true;
    },

    validateCVV: function (str) {
        if (str && !str.match(/^[0-9]{3,4}$/)) {
            return false;
        }
        return true;
    }
}

if (!window.jGroupdocs)
    window.jGroupdocs = {};

jGroupdocs.html = {
    toText: function (html) {
        return (html && html.length ? html.replace(/<div>|<li>|<ul>|<p>|<br\s*[\/]?>/ig, '\n')
            .replace(/<li>/ig, '  *  ')
            .replace(/<[^>]+>/ig, '') : '');
    },

    textWidth: function (text, fontProp) {
		var tag = document.createElement("div");
		tag.style.position = "absolute";
		tag.style.left = "-999em";
		tag.style.whiteSpace = "nowrap";
		tag.style.font = fontProp;
		tag.innerHTML = text;

		document.body.appendChild(tag);

		var result = tag.clientWidth;

		document.body.removeChild(tag);

		return result;
	}
};
var Applications = {
    None: 0,
    Annotation: 1,
    Assembly: 2,
    Comparison: 4,
    Signature: 8,
    Viewer: 16
};


jSaaspose.AppsConfig = function () {
    this.init();
}

$.extend(jSaaspose.AppsConfig.prototype, {
    _applications: null,

    init: function () {
        var self = this;
        $.ajax({
            type: 'GET',
            url: '/applications.json',
            dataType: 'json',
            success: function (data) {
                self._applications = data;
            },
            data: {},
            async: false
        });
    },

    getSupportedApps: function (docType, fileType) {
        if (!this._applications) {
            return Applications.None;
        }

        var result = Applications.None;
        docType = (docType ? docType.toLowerCase() : docType);
        fileType = (fileType ? fileType.toLowerCase() : fileType);

        for (var app in Applications) {
            var appConfig = this._applications[app.toLowerCase()];
            if (appConfig) {
                result |= ($.inArray(docType, appConfig.docTypes) != -1 ? Applications[app] : Applications.None);
                result |= ($.inArray(fileType, appConfig.fileTypes) != -1 ? Applications[app] : Applications.None);
            }
        }

        return result;
    }
});

jSaaspose.PortalService = function (applicationPath, useHttpHandlers) {
    this._init(gdSignatureHostUrl + applicationPath, useHttpHandlers);
};

$.extend(jSaaspose.PortalService.prototype, {
    _urlSuffix: "",
    _lastError: null,
    _service: null,
    _cacheTimeout: 300,
    applicationPath: null,
    useJSONP: false,
    _init: function (applicationPath, useHttpHandlers) {
        this.applicationPath = applicationPath;
        if (useHttpHandlers)
            this._urlSuffix = "";
        if ($.browser.msie)
            this.useJSONP = true;
    },
    /*
    viewDocumentAsHtml: function (userId, privateKey, guid, index, count, successCallback, errorCallback, useCache) {
        var data = JSON.stringify({ userId: userId, privateKey: privateKey, guid: guid, convertToHtml: true, index: index, count: count });
        this._runServiceAsync(this.applicationPath + 'ViewDocument' + this._urlSuffix, data, successCallback, errorCallback, useCache != null ? useCache : true);
    },

    getDocumentPageHtml: function (path, pageIndex, successCallback, errorCallback) {
        var data = JSON.stringify({ path: path, pageIndex: pageIndex });
        this._runServiceAsync(this.applicationPath + 'GetDocumentPageHtml' + this._urlSuffix, data, successCallback, errorCallback, false);
    },
    */
    viewEmbedDocumentAllAsync: function (userId, privateKey, path, width, quality, usePdf, preloadPagesCount, password, fileDisplayName, successCallback, errorCallback, useCache) {
        var data = JSON.stringify({ userId: userId, privateKey: privateKey, path: path, width: width, quality: quality, usePdf: usePdf, preloadPagesCount: preloadPagesCount, password: password, fileDisplayName: fileDisplayName });
        this._runServiceAsync(this.applicationPath + 'ViewDocument' + this._urlSuffix, data, successCallback, errorCallback, useCache != null ? useCache : true);
    },

    getPdf2XmlSync: function (userId, privateKey, guid) {
        var data = JSON.stringify({ userId: userId, privateKey: privateKey, guid: guid });
        return this._runServiceSync(this.applicationPath + 'document-viewer/GetPdf2Xml' + this._urlSuffix, data, false);
    },

    getPdf2XmlAsync: function (userId, privateKey, guid, successCallback, errorCallback) {
        var data = JSON.stringify({ userId: userId, privateKey: privateKey, guid: guid });
        return this._runServiceAsync(this.applicationPath + 'document-viewer/GetPdf2Xml' + this._urlSuffix, data, successCallback, errorCallback, false, true);
    },
    /*
    getImageUrlsAsync: function (userId, privateKey, guid, dimension, token, firstPage, pageCount, quality, usePdf, docVersion,
                                 watermarkText, watermarkColor, useHtmlBasedEngine, successCallback, errorCallback) {
        var data = JSON.stringify({
            userId: userId, privateKey: privateKey, guid: guid, dimension: dimension, token: token, firstPage: firstPage, pageCount: pageCount, quality: quality, usePdf: usePdf, docVersion: docVersion,
            watermarkText: watermarkText, watermarkColor: watermarkColor, useHtmlBasedEngine: useHtmlBasedEngine
        });
        return this._runServiceAsync(this.applicationPath + 'GetImageUrls' + this._urlSuffix, data, successCallback, errorCallback, false);
    },
    */

    getImageUrlsAsync: function (userId, privateKey, path, dimension, token, firstPage, pageCount, quality, usePdf, docVersion,
                                 watermarkText, watermarkColor, watermarkPosition, watermarkFontSize,
                                 ignoreDocumentAbsence,
                                 useHtmlBasedEngine, supportPageRotation,
                                 successCallback, errorCallback,
                                 instanceIdToken, locale) {
        var data = {
            userId: userId,
            privateKey: privateKey,
            path: path,
            dimension: dimension,
            token: token,
            firstPage: firstPage,
            pageCount: pageCount,
            quality: quality,
            usePdf: usePdf,
            docVersion: docVersion,
            watermarkText: watermarkText,
            watermarkColor: watermarkColor,
            watermarkPosition: watermarkPosition,
            watermarkFontSize: watermarkFontSize,
            ignoreDocumentAbsence: ignoreDocumentAbsence,
            useHtmlBasedEngine: useHtmlBasedEngine,
            supportPageRotation: supportPageRotation,
            instanceIdToken: instanceIdToken,
            locale: locale
        };
        return this._runServiceAsync(this.applicationPath + 'GetImageUrls' + this._urlSuffix, JSON.stringify(data), successCallback, errorCallback, false);
    },

    loadFileBrowserTreeData: function (userId, privateKey, path, pageIndex, pageSize, orderBy, orderAsc, filter, fileTypes, extended, successCallback, errorCallback, useCache) {
        var data = JSON.stringify({ userId: userId, privateKey: privateKey, path: path, pageIndex: pageIndex, pageSize: pageSize, orderBy: orderBy, orderAsc: orderAsc, filter: filter, fileTypes: fileTypes, extended: extended });
        return this._runServiceAsync(this.applicationPath + 'document-viewer/LoadFileBrowserTreeData' + this._urlSuffix, data, successCallback, errorCallback, useCache != null ? useCache : true);
    },

    _runServiceSync: function (url, data, useCache) {
        var r = null;
        var serviceCallEnded = false;
        var successCallback = function (response) {
            serviceCallEnded = true;
            r = response.data;
        };
        this._runService(url, data, false, successCallback, null, useCache);
        return r;
    },

    _runServiceAsync: function (url, data, successCallback, errorCallback, useCache, convertToXml) {
        return this._runService(url, data, true, successCallback, errorCallback, useCache, convertToXml);
    },

    _runService: function (url, data, mode, successCallback, errorCallback, useCache, convertToXml) {
        var cacher = Container.Resolve("Cacher");
        if (useCache) {
            var cacheItem = cacher.get(url + data);
            if (cacheItem) {
                cacheItem.value.Subscribe(function (response) {
                    this._successHandler(response, successCallback);
                } .bind(this), function (ex) { this._errorHandler(ex, errorCallback, false); } .bind(this));
                return cacheItem.value;
            }
        }
        var requestObservable = Container.Resolve("RequestObservable")({
            url: url,
            type: this.useJSONP ? "GET" : "POST",
            contentType: "application/json; charset=utf-8",
            dataType: this.useJSONP ? "jsonp" + (convertToXml ? " xml" : "") : null,
            data: this.useJSONP ? ("data=" + data.toString()) : data,
            async: mode
        });
        var finalHandler = Container.Resolve("AsyncSubject");
        requestObservable.Finally = function (method) {
            finalHandler.Subscribe(method);
        };
        requestObservable.Subscribe(
            function (response) {
                this._successHandler(response, successCallback);
                finalHandler.OnNext();
                finalHandler.OnCompleted();
            } .bind(this),
            function (ex) {
                this._errorHandler(ex, errorCallback, false);
                finalHandler.OnNext();
                finalHandler.OnCompleted();
            } .bind(this));
        cacher.add(url + data, requestObservable, this._cacheTimeout);
        return requestObservable;
    },

    _errorHandler: function (ex, errorCallback, alertError) {
        if (ex.xmlHttpRequest.readyState == 0) {
            return;
        }

        if (ex.xmlHttpRequest.status == 401) {
            window.location = Container.Resolve("HttpProvider").buildUrl("/", "sign-in", { 'returnUrl': window.location.href });
            return;
        }

        var error;
        var errorCode = 0;
        if (ex.xmlHttpRequest.responseText != '') {
            var msg = '';
            try {
                error = eval('(' + ex.xmlHttpRequest.responseText + ')');
            }
            catch (e) {
                error = { Reason: ex.xmlHttpRequest.responseText };
            }
            errorCode = 500;
        }
        else {
            errorCode = 404;
            error = { Reason: 'Service link is not found' };
        }

        if (this._lastError != 404 && alertError) {
            this._lastError = errorCode;
            if (errorCode == 404) {
                jerror(error.Reason);
            }
            else {
                jerror();
            }
        }

        try {
            if (errorCallback) {
                errorCallback(error);
            }
        }
        catch (e) { }
    },
    _successHandler: function (response, successCallback) {
        if (successCallback) {
            if (response.xmlHttpRequest.responseText == '') {
                response.data = null;
            }

            successCallback(response);
        }
    }
});


var OverrideMode = {
    Override: 0,
    Rename: 1,
    Break: 2,
    Skip: 3
};

(function ($, undefined) {
    $.widget('ui.uploader', {
        _appender: null,
        _handler: null,
        options: {
            multiple: true,
            userId: undefined,
            key: '',
            url: '',
            proxy: '',
            fld: 'documents',
            formats: '',
            onComplete: null,
            onStart: null,
            addFileBtn: null,
            skipErrors: false,
            delayedStart: false,
            isForUserStorage: false,
            overrideMode: OverrideMode.Override
        },
        _initHandler: function () {
            if (this._handler == null) {
                var action = Container.Resolve('HttpProvider').buildUrl(this.options.url, this.options.proxy, { 'user_id': this.options.userId, 'fld': this.options.fld });
                this._handler = $.handlerFactory.get({
                    multiple: this.options.multiple,
                    baseServerHost: this.options.url,
                    isForUserStorage: this.options.isForUserStorage,
                    folder: this.options.fld,
                    action: (this.options.key ? Container.Resolve('HttpProvider').signUrl(action, this.options.key) : action),
                    skipErrors: this.options.skipErrors,
                    overrideMode: this.options.overrideMode
                });

                $(this._handler).hitch('onComplete', this._onComplete, this);
                $(this._handler).hitch('onProgress', this._onProgress, this);
                $(this._handler).hitch('onStart', this._onStart, this);
            }
        },
        _initAppender: function () {
            if (this._appender == null) {
                var self = this;
                this._appender = new FileAppender({ container: this.element,
                    multiple: !this._handler.sync, _addFileBtn: this.options.addFileBtn,
                    onAddItemAction: function (item) {
                        if (self.options.delayedStart) {
                            $(self.element).trigger('onFileSelected', [$.fileInputUtils.getName(item), item]);
                        }
                        else {
                            self._uploadFile(item);
                        }
                    }
                });
            }
        },
        _create: function () {

            this._initHandler();
            this._initAppender();
        },
        _onCancel: function (e) {
            var id = e.data;
            this._handler.cancel(id);
        },
        _onComplete: function (e, id, result) {
            //console.log(result);
            if (this.options.onComplete) {
                this.options.onComplete.apply(this, [id, result]);
            }
            else {
                $(this.element).trigger('onComplete', [id, result]);
            }
        },
        _beforeStart: function (path) {
            if (this.options.beforeStart) {
                return this.options.beforeStart(path);
            }
            else {
                return true;
            }
        },
        _onStart: function (e, id, fileName, fileSize) {
            if (this.options.onStart) {
                this.options.onStart.apply(this, [id, fileName, fileSize]);
            }
            else {
                $(this.element).trigger('onStart', [id, fileName, fileSize]);
            }
        },
        _onProgress: function (e, id, fileName, loaded, total, bytesPerMSec, remainTime) {
            if (this.options.onProgress) {
                this.options.onProgress.apply(this, [id, fileName, loaded, total, bytesPerMSec, remainTime]);
            }
            else {
                $(this.element).trigger('onProgress', [id, fileName, loaded, total, bytesPerMSec, remainTime]);
            }
        },
        _uploadFile: function (input, overrideMode) {
            var id = this._handler.add(input, jSaaspose.utils.getSequenceNumber());
            var path = this._handler.getPath(id);

            if (typeof overrideMode !== "undefined") {
                this._handler.overrideMode = overrideMode;
            }

            if (!this._beforeStart(path)) {
                this._handler.cancel(id);
                return;
            }

            //first, add file html item to the page
            var item = this._addFileItem(id, path);

            if (this.options.formats == '' || this.options.formats.indexOf(item.ext.toLowerCase()) != -1) {
                $(this.element).trigger('onAdded', [item, null]);
                //then upload
                this._handler.upload(id);
            }
            else {
                $(this.element).trigger('onAdded', [null, 'Not allowed format']);
            }
            return id;
        },
        upload: function (id, input) {
            throw new 'not implemented';
        },
        uploadFile: function (input, overrideMode) {
            return this._uploadFile(input, overrideMode);
        },
        cancelUploadFile: function (id) {
            this._handler.cancel(id);
        },
        _addFileItem: function (id, path) {
            var item = { id: id, name: path, ext: this._getExt(path) };
            return item;
        },
        _getExt: function (path) {
            return Container.Resolve('PathProvider').getExt(path).toUpperCase();
        },
        _setOption: function (key, value) {
            $.Widget.prototype._setOption.call(this, key, value);

            if (key === 'fld') {
                this._handler = null;
                this._initHandler();
            }
        }
    });


    UploadHandlerBasic = function (options) {
        $.extend(this, options);
    };

    $.extend(UploadHandlerBasic.prototype, {
        action: '',
        _inputs: {},
        sync: true,
        skipErrors: false,

        getPath: function (id) {
            return $.fileInputUtils.getPath(this._inputs[id]);
        },
        getSize: function (id) {
            var input = this._inputs[id];
            return $.fileInputUtils.getSize(input);
        },
        add: function (fileInput, id) {
            this._inputs[id] = fileInput;
            $(fileInput).detach();
            return id;
        },
        upload: function (id) {
            this._upload(id);
        },
        cancel: function (id) {
            this._cancel(id);
        },
        _parseResponse: function (html) {
            try {
                var result = eval('(' + html + ')');
            } catch (ex) {
                throw 'Error in file processing at server side:' + html;
            }
            return result;
        },
        _upload: function (id) { },
        _cancel: function (id) { }
    });

    //with iframe we can send only one file at a time
    IFrameHandler = function (options) {
        UploadHandlerBasic.apply(this, arguments);
    };

    $.extend(IFrameHandler.prototype, UploadHandlerBasic.prototype, {
        _upload: function (id) {
            var fileInput = this._inputs[id];
            var fileName = Container.Resolve('PathProvider').getName(this.getPath(id));
            $(fileInput).attr('name', fileName);
            var form = this._createForm(id);
            var iframe = this._createIFrame(id);
            form.append(fileInput);
            var doc = iframe.get(0).document ? iframe.get(0).document : (iframe.get(0).contentDocument ? iframe.get(0).contentDocument : iframe.get(0).contentWindow.document);
            doc.body.appendChild(form.get(0));

            iframe.hitch('load', function () {
                var response = this._getIframeContentJSON(iframe[0]);
                $(this).trigger('onComplete', [id, (response.success ? response.parsed : null)]);
                delete this._inputs[id];
                setTimeout(function () {
                    iframe.remove();
                }, 1);
            }, this);

            $(this).trigger('onStart', [id, fileName]);

            form.submit();
            form.remove();
        },
        _createForm: function (id) {
            var form = $('<form method="post" enctype="multipart/form-data" style="display:none"></form>');
            form.attr('id', 'form' + id);
            form.attr('target', 'iframe' + id);
            form.attr('action', this.isForUserStorage ? this._buildUriForIframeAction() : this.action);

            return form;
        },
        _buildUriForIframeAction: function () {
            var _action = '';
            $.ajax({
                url: this.baseServerHost + "\getFileUploadUrl",
                data: "path=" + this.folder + "&forIframe=true",
                async: false,
                success: function (text) {
                    _action = text;
                }
            });
            return _action;
        },
        _createIFrame: function (id) {
            var iframe = $('<iframe src="javascript:false;" name="iframe' + id + '" style="display:none" />').appendTo('body');
            iframe.attr('id', 'iframe' + id);
            return iframe;
        },
        _cancel: function (id) {
            $('iframe' + id).remove();
            delete this._inputs[id];
        },
        _getIframeContentJSON: function (iframe) {
            try {
                if (!iframe.parentNode) {
                    return;
                }

                if (iframe.contentDocument &&
                    iframe.contentDocument.body &&
                    iframe.contentDocument.body.innerHTML == "false") {
                    return;
                }

                var doc = iframe.contentDocument ? iframe.contentDocument : iframe.contentWindow.document;
                var content = doc.body.innerHTML.replace(/^<[^>]+>|<[^>]+>$/g, '');
                var parsed = this.isForUserStorage ?
                    this._correctDataFromIframe(this._parseResponse(content)) : this._parseResponse(content);

                return { success: true, parsed: parsed };
            }
            catch (e) {
                //jerror(e);
            }
            return { success: false, parsed: undefined };
        },

        _correctDataFromIframe: function (response) {
            var correctResponce = {};
            correctResponce.code = response.status;
            correctResponce.error = response.error_message;
            correctResponce.id = response.result.upload_Request_Results[0].id;
            correctResponce.fileType = response.result.upload_Request_Results[0].file_type;
            correctResponce.docType = response.result.upload_Request_Results[0].type.toLowerCase();
            correctResponce.guid = response.result.upload_Request_Results[0].guid;
            correctResponce.thumbnail = response.result.upload_Request_Results[0].thumbnail;
            correctResponce.upload_time = response.result.upload_Request_Results[0].upload_time;
            correctResponce.viewJobId = response.result.upload_Request_Results[0].view_job_id;
            correctResponce.size = response.result.upload_Request_Results[0].size;
            correctResponce.name = response.result.upload_Request_Results[0].adj_name;
            correctResponce.version = response.result.upload_Request_Results[0].version;
            correctResponce.url = response.result.upload_Request_Results[0].url;
            correctResponce.field_count = 0;
            correctResponce.supportedTypes = {};
            $.ajax({
                type: "POST",
                url: this.baseServerHost + "\getJsonFileInfo",
                data: { fileType: response.result.upload_Request_Results[0].file_type },
                async: false,
                success: function (result) {
                    correctResponce.supportedTypes = result;
                }
            });
            return correctResponce;
        }
    });

    AjaxHandler = function (options) {
        UploadHandlerBasic.apply(this, arguments);
        this.sync = false;
        this._xhrs = {};
    };

    $.extend(AjaxHandler.prototype, UploadHandlerBasic.prototype, {

        updateProgress: function (evt) {
            if (evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total;
                //console.log('percentComplete=' + percentComplete);
            }
        },

        _upload: function (id) {
            var file = this._inputs[id];
            var self = this;
            var fileName = UploadHandlerBasic.prototype.getPath.apply(this, [id]);
            var size = UploadHandlerBasic.prototype.getSize.apply(this, [id]);
            //xhr object is used as jQuery doesn't allow yet to upload input file via ajax
            var xhr = self._xhrs[id] = new XMLHttpRequest();
            //xhr.addEventListener("progress", this.updateProgress, false);

            var startTime = new Date().getTime();

            xhr.upload.onprogress = function (e) {
                if (e.lengthComputable) {
                    var passed = new Date().getTime() - startTime;
                    var bytesPerMSec = e.loaded / passed;
                    var remainTime = ((e.total - e.loaded) * passed) / e.loaded;
                    $(self).trigger('onProgress', [id, fileName, e.loaded, e.total, bytesPerMSec, remainTime]);
                }
            };

            var isForStorage = this.isForUserStorage;
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 0 && xhr['canceled']) {
                        $(self).trigger('onComplete', [id, 'canceled']);
                        return;
                    }

                    if (xhr.status == 0) {
                        //jerror();
                        $(self).trigger('onComplete', [id, null]);
                        return;
                    }

                    var passed = new Date().getTime() - startTime;
                    var bytesPerMSec = size / passed;
                    $(self).trigger('onProgress', [id, fileName, size, size, bytesPerMSec, 0]);

                    var parsed = null;
                    if (xhr.status == 200) {
                        try {
                            if (isForStorage) {
                                parsed = self._correctData(self._parseResponse(xhr.responseText));
                            } else {
                                parsed = self._parseResponse(xhr.responseText);
                            }

                            if (parsed.code == 'Unauthorized') {
                                window.location = Container.Resolve("HttpProvider").buildUrl("/", "sign-in", { 'returnUrl': window.location.href });
                                return;
                            }
                            if (!self.skipErrors) {
                                if (parsed.code == 'Forbidden') {
                                    throw parsed;
                                }
                                if (parsed.code == 'QuotaExceeded') {
                                    throw parsed;
                                }
                                if (parsed.code == 'StorageLimitExceeded') {
                                    throw parsed;
                                }
                            }
                        }
                        catch (e) {
                            jerror(parsed.error);
                            parsed = null;
                        }
                    }

                    $(self).trigger('onComplete', [id, parsed]);

                    delete self._inputs[id];
                    delete self._xhrs[id];
                }
            };

            if (this.overrideMode == OverrideMode.Rename) {
                $(this).trigger('onStart', [id, fileName + " (new copy)", size]);
            } else {
                $(this).trigger('onStart', [id, fileName, size]);
            }

            if (this.isForUserStorage) {
                xhr.open('POST', self._buildUriForUserStorage(fileName), true);
                this.overrideMode = OverrideMode.Override;
            } else {
                xhr.open('POST', self._buildUri(fileName), true);
            }

            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.setRequestHeader('X-File-Name', encodeURIComponent(fileName));
            xhr.setRequestHeader('Content-Type', 'application/octet-stream');
            xhr.send(file);
        },

        _correctData: function (response) {
            var correctResponce = {};
            correctResponce.id = response.result.id;
            correctResponce.code = response.result.status;
            correctResponce.fileType = response.result.file_type;
            correctResponce.docType = response.result.type.toLowerCase(); ;
            correctResponce.guid = response.result.guid;
            correctResponce.thumbnail = response.result.thumbnail;
            correctResponce.upload_time = response.result.upload_time;
            correctResponce.viewJobId = response.result.view_job_id;
            correctResponce.size = response.result.size;
            correctResponce.name = response.result.adj_name;
            correctResponce.version = response.result.version;
            correctResponce.url = response.result.url;
            correctResponce.error = response.result.error_message;
            correctResponce.field_count = 0;
            correctResponce.supportedTypes = {};
            $.ajax({
                type: "POST",
                url: this.baseServerHost + "\getJsonFileInfo",
                data: { fileType: response.result.file_type },
                async: false,
                success: function (result) {
                    correctResponce.supportedTypes = result;
                }
            });
            return correctResponce;
        },

        _buildUri: function (fileName) {
            return this.action + '&' + $.param({ fileName: fileName, multiple: true });
        },

        _buildUriForUserStorage: function (fileName) {
            var _action = '';
            $.ajax({
                url: this.baseServerHost + "\getFileUploadUrl",
                data: "path=" + this.folder + "&" + "filename=" + encodeURIComponent(fileName) + "&" + "overrideMode=" + this.overrideMode,
                async: false,
                success: function (text) {
                    _action = text;
                }
            });
            return _action;
        },
        _cancel: function (id) {
            if (this._inputs[id]) {
                delete this._inputs[id];
            }

            if (this._xhrs[id]) {
                this._xhrs[id]['canceled'] = true;
                this._xhrs[id].abort();
                delete this._xhrs[id];
            }
        }
    });

    /*LinkHandler = function (options) {
    UploadHandlerBasic.apply(this, arguments);
    };


    $.extend(LinkHandler.prototype, UploadHandlerBasic.prototype, {
    _portalService: Container.Resolve("PortalService"),
    userId: null,
    key: '',
    getPath: function (id) {
    return this._inputs[id];
    },
    getSize: function (id) {
    return 0;
    },
    add: function (path, id) {
    this._inputs[id] = path;
    return id;
    },
    uploadSync: function (id) {
    var path = this._inputs[id];
    $(this).trigger('onStart', [id, path]);
    try {
    var fid = this._portalService.uploadLink(this.userId, this.key, path);
    this._onCompleted(id, fid, undefined);
    return fid;
    }
    catch (error) {
    this._onCompleted(id, undefined, { Reason: error });
    return 0;
    }
    },
    _upload: function (id) {
    var path = this._inputs[id];
    $(this).trigger('onStart', [id, path]);
    this._portalService.uploadLinkAsync(this.userId, this.key, path, function (response) { this._onCompleted(id, response, undefined); } .bind(this),
    function (error) { this._onCompleted(id, undefined, error); } .bind(this));
    },
    _onCompleted: function (id, response, error) {
    if (error) {
    jerror();
    }
    $(this).trigger('onComplete', [id, response]);
    }
    });*/


    HandleFactory = function () {
    };

    $.extend(HandleFactory.prototype, {
        get: function (options) {
            if (options.multiple && this._isXHRSupported()) {
                return new AjaxHandler(options);
            }
            return new IFrameHandler(options);
        },
        //to determine if xhr is available in current browser
        _isXHRSupported: function () {
            var input = $('<input type="file" />');
            return (
                'multiple' in input[0] &&
                typeof File != "undefined" &&
                typeof (new XMLHttpRequest()).upload != "undefined");
        }
    });

    ItemAppender = function (options) {
        $.extend(this, options);
        this._init();
        this._subscribe();
    };

    $.extend(ItemAppender.prototype, {
        container: null,
        template: '',
        onAddItemAction: null,
        multiple: false,

        _addFileBtn: null,
        _input: null,

        _init: function () {
            this._input = $('#input', this.container);
            if (this._addFileBtn == null) {
                this._addFileBtn = $('#button', this.container);
            }
        },
        _subscribe: function () {
        }
    });


    FileAppender = function (options) {
        ItemAppender.apply(this, arguments);
    };

    $.extend(FileAppender.prototype, ItemAppender.prototype, {
        _init: function () {
            ItemAppender.prototype._init.apply(this);
            //input is setup with opacity=0 that's why it's invisible but anyway it covers the button
            //and handles all input events
            this._input = this._createInput().prependTo(this._addFileBtn);
        },
        _createInput: function () {
            var input = $('<input type="file" class="file-input"></input>');
            if (this.multiple) {
                input.attr('multiple', 'multiple');
            }
            return input;
        },
        _subscribe: function () {
            this._input.hitch('change', this._onChange, this);
        },
        _onChange: function (e) {
            var self = this;
            if (this.multiple) {
                $.each(e.target.files, function () { self.onAddItemAction(this) });
                $(e.target).remove();
            }
            else {
                this.onAddItemAction(e.target);
            }

            //add input again
            this._input = this._createInput().prependTo(this._addFileBtn);
            this._subscribe();
        }
    });

    InputTypeFile = function (options) {
        $.extend(this, options);
        this._init();
        this._subscribe();
    };

    $.extend(InputTypeFile.prototype, {
        onFileSelected: null,
        //multiple: false,
        name: null,

        element: null,
        _input: null,

        _init: function () {
            this._input = this._createInput().prependTo(this.element);
        },
        _createInput: function () {
            var input = $('<input type="file" class="file-input"></input>');
            //if (this.multiple) {
            //    input.attr('multiple', 'multiple');
            //}
            input.attr('name', this.name);
            return input;
        },
        _subscribe: function () {
            this._input.hitch('change', this._onChange, this);
        },
        _onChange: function (e) {
            var self = this;
            //if (this.multiple) {
            //    $.each(e.target.files, function () { self.onFileSelected(this) });
            //    $(e.target).remove();
            //}
            //else {
            this.onFileSelected(e.target);
            //}
        }
    });

    IFrame = function (options) {
        $.extend(this, options);
        this._init();
    };

    $.extend(IFrame.prototype, {
        values: null,
        elements: null,
        action: null,
        onComplete: null,

        _init: function () {
            var form = this._createForm();
            var iframe = this._createIFrame();

            $.each(this.values, function () {
                var e = $('<input type="hidden" value="' + this.value + '" name="' + this.name + '"></input>');
                form.append(e);
            });

            $.each(this.elements, function () {
                form.append(this);
            });

            var doc = iframe.get(0).document ? iframe.get(0).document : (iframe.get(0).contentDocument ? iframe.get(0).contentDocument : iframe.get(0).contentWindow.document);
            doc.body.appendChild(form.get(0));

            iframe.hitch('load', function () {
                var response = this._getIframeContentJSON(iframe[0]);
                if (this.onComplete) this.onComplete(response.parsed);
                //delete this._inputs[id];
                setTimeout(function () {
                    iframe.remove();
                }, 1);
            }, this);

            //$(this).trigger('onStart', [id, fileName]);

            form.submit();
            form.remove();
        },
        _createForm: function () {
            var form = $('<form method="post" enctype="multipart/form-data" style="display:none"></form>');
            form.attr('action', _buildUriForIframeAction());
            form.attr('target', 'iframe');
            return form;
        },
        _buildUriForIframeAction: function () {
            var _action = '';
            $.ajax({
                url: "getFileUploadUrl",
                data: "path=" + this.folder + "&forIframe=true",
                async: false,
                success: function (text) {
                    _action = text;
                }
            });
            return _action;
        },
        _createIFrame: function () {
            var iframe = $('<iframe src="javascript:false;" name="iframe" style="display:none" />').appendTo('body');
            return iframe;
        },
        _getIframeContentJSON: function (iframe) {
            try {

                if (!iframe.parentNode) {
                    return;
                }

                if (iframe.contentDocument &&
                    iframe.contentDocument.body &&
                    iframe.contentDocument.body.innerHTML == "false") {
                    return;
                }

                var doc = iframe.contentDocument ? iframe.contentDocument : iframe.contentWindow.document;
                var parsed = this._parseResponse(doc.body.innerHTML);
                return { success: true, parsed: parsed };
            }
            catch (e) {
                jerror();
            }
            return { success: false, parsed: undefined };
        },
        _parseResponse: function (html) {
            try {
                var result = eval('(' + html + ')');
            } catch (ex) {
                throw 'Error in file processing at server side:' + html;
            }
            return result;
        }
    });


    FileInputUntils = function () { };
    $.extend(FileInputUntils.prototype, {
        getPath: function (input) {
            var s = input.fullPath;
            if (s) {
                s = s.trimStart('/');
                return s.replace(/\//g, '\\');
            }

            return (input.fileName || input.name || input.value);
        },

        getName: function (input) {
            return Container.Resolve('PathProvider').getName(this.getPath(input));
        },

        getSize: function (input) {
            return input.fileSize != null ? input.fileSize : input.size;
        }
    });


    $.handlerFactory = new HandleFactory();
    $.fileInputUtils = new FileInputUntils();

})(jQuery);



ItemViewModel = function (item) {
    this.item = ko.observable(item);
    this.types = ko.observableArray([]);
    this.typesCaption = ko.observable('Please Select...');
    this.inedit = ko.observable(false);
    this.inprogress = ko.observable(false);
    this.selected = ko.observable(false);
};

jSaaspose._defaultModel = {
    inedit: false,
    inprogress: false,
    selected: false,
    changed: false
};

ko.createViewModel = function (model) {
    var united = $.extend({}, model, jSaaspose._defaultModel);
    var viewModel = ko.mapping.fromJS(united);
    for (prop in model) {
        if (viewModel[prop].subscribe && (prop !== 'changed')) {
            viewModel[prop].subscribe(function () {
                viewModel.changed(true);
            } .bind(viewModel));
        }
    }
    viewModel.reset = function (props) {
        for (var i = 0; i < props.length; i++) {
            var df = null;
            switch (typeof model[props[i]]) {
                case 'string': df = ''; break;
                case 'number': df = 0; break;
                case 'boolean': df = false; break;
                case 'object':
                    if (model[props[i]] instanceof Array) df = []; break;
            }
            viewModel[props[i]](df);
        }
    }
    return viewModel;
};


//new handlers
ko.bindingHandlers.btnEnable = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor(), allBindings = allBindingsAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(value);
        if (valueUnwrapped) {
            $(element).activator({ action: 'enable' });
        }
        else {
            $(element).activator({ action: 'disable', cl: 'disable', tip: allBindings.disableTip });
        }
    }
},

ko.bindingHandlers.name = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor(), allBindings = allBindingsAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(value);
        $(element).attr('name', valueUnwrapped);
    }
}

ko.bindingHandlers.href = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor(), allBindings = allBindingsAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(value);
        if (valueUnwrapped) {
            $(element).attr('href', valueUnwrapped);
        }
    }
}

ko.bindingHandlers.dataUrl = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor(), allBindings = allBindingsAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(value);
        $(element).attr('data-url', valueUnwrapped);
    }
}

ko.bindingHandlers.title = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor(), allBindings = allBindingsAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(value);
        $(element).attr('title', valueUnwrapped);
    }
}

ko.bindingHandlers.focus = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor(), allBindings = allBindingsAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(value);
        if (valueUnwrapped) {
            $(element).trigger('focus');
        }
    }
}

ko.bindingHandlers.src = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor(), allBindings = allBindingsAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(value);
        $(element).attr('src', valueUnwrapped);
    }
}

ko.bindingHandlers.enter = {
    'init': function (element, valueAccessor, allBindingsAccessor, viewModel) {
        if (typeof valueAccessor() != "function")
            throw new Error("The value for a keypress binding must be a function to invoke on submit");
        ko.utils.registerEventHandler(element, "keypress", function (event) {
            if (event.keyCode == 13) {
                var handlerReturnValue;
                var value = valueAccessor();
                try { handlerReturnValue = value.call(viewModel, element); }
                finally {
                    if (handlerReturnValue !== true) { // Normally we want to prevent default action. Developer can override this be explicitly returning true.
                        if (event.preventDefault)
                            event.preventDefault();
                        else
                            event.returnValue = false;
                    }
                }
            }
        });
    }
};

//'value' handler is extanded with ability to configure list of events to follow for updates
ko.bindingHandlers['value'].init = function (element, valueAccessor, allBindingsAccessor) {
    var eventNames = allBindingsAccessor()["valueUpdate"] || ["change"];
    var signal = allBindingsAccessor()["updateSignal"];

    // The syntax "after<eventname>" means "run the handler asynchronously after the event"
    // This is useful, for example, to catch "keydown" events after the browser has updated the control
    // (otherwise, ko.selectExtensions.readValue(this) will receive the control's value *before* the key event)
    $.each(eventNames, function (index, eventName) {
        var handleEventAsynchronously = false;
        if (ko.utils.stringStartsWith(eventName, "after")) {
            handleEventAsynchronously = true;
            eventName = eventName.substring("after".length);
        }
        var runEventHandler = handleEventAsynchronously ? function (handler) { setTimeout(handler, 0) }
                                                            : function (handler) { handler() };

        ko.utils.registerEventHandler(element, eventName, function (event) {
            var handler = function () {
                var modelValue = valueAccessor();
                var elementValue = ko.selectExtensions.readValue(element);
                if (ko.isWriteableObservable(modelValue))
                    modelValue(elementValue);
                else {
                    var allBindings = allBindingsAccessor();
                    if (allBindings['_ko_property_writers'] && allBindings['_ko_property_writers']['value'])
                        allBindings['_ko_property_writers']['value'](elementValue);
                }
            };
            if (eventName == 'keypress' && signal) {
                if (event.keyCode == signal || event.charCode == signal) {
                    runEventHandler(handler);
                }
            }
            else {
                runEventHandler(handler);
            }
        });
    });
}

ko.bindingHandlers.draggable = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor(), allBindings = allBindingsAccessor();

        var onDropped = ko.utils.unwrapObservable(value.onDropped);
        var onDragStarted = ko.utils.unwrapObservable(value.onDragStarted);

        $(element).data('item', value.item);

        if (!ko.utils.unwrapObservable(value.disabled)) {
            $(element).draggable({
                opacity: 0.5,
                revert: 'invalid',
                revertDuration: 250,
                delay: 500,
                distance: 20,
                // axis: "y",
                containment: 'window',
                appendTo: 'body',
                start: function (event, ui) {
                    if (onDragStarted) {
                        onDragStarted.apply(this);
                    }
                    else {
                        $(element).trigger('onDragStarted');
                    }
                },
                //helper: 'clone'
                helper: function () {
                    var items = ($(this).find('.listbox').is('.ui-selected') ? $('.ui-selected').parent().parent() : $(this));
                    var container = $('<div><ul id="centermainlist"></ul></div>').attr('id', 'dragdrop-container');
                    container.children('ul').append(items.clone());
                    return container;
                }
            });
        }

        $(element).droppable({
            tolerance: 'pointer',
            accept: function (draggable) {
                return (this !== draggable && $(this).find('.listbox').hasClass('selected') === false);
            },
            drop: function (event, ui) {
                var items = ($(ui.draggable).find('.listbox').hasClass('ui-selected') ?
                    $.map($(ui.draggable).parent().parent().find('.ui-selected'), function (element) { return $(element).parent().parent().data('item'); }) : [$(ui.draggable).data('item')]);

                if (onDropped) {
                    onDropped.apply(this, [items]);
                }
                else {
                    $(element).trigger('onDropped', [items]);
                }
            }
        });
    }/*,

    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor();
        // var valueUnwrapped = ko.utils.unwrapObservable(value);
        var disabled = ko.utils.unwrapObservable(value.disabled) || false;

        $(element).draggable('option', 'disabled', disabled);
    }*/
}

ko.bindingHandlers.resizable = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor(), allBindings = allBindingsAccessor();

        $(element).resizable({
            handles: 'all',
            disabled: ko.utils.unwrapObservable(value.disabled),
            stop: function () {
                //ko.utils.unwrapObservable(value.onResized),
                console.log('stopped');
            },
            start: function () {
                console.log('started');
            },
            resize: function (event, ui) {
            console.log('resizing');
            }
        });
    },

    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor();
        var disabled = ko.utils.unwrapObservable(value.disabled) || false;

        $(element).resizable('option', 'disabled', disabled);
    }
}

ko.bindingHandlers.ellipsis = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        $(element).ellipsis();
    }
};

ko.bindingHandlers.hover = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor();
        var onIn = value.onIn ? value.onIn : function () { };
        var onOut = value.onOut ? value.onOut : function () { };
        $(element).hover(onIn, onOut);
    }
};

ko.bindingHandlers.makeColorPicker = {
    init: function (element, valueAccessor, allBindingsAccessor, data) {
        if (valueAccessor()) {
            $(element).ColorPicker({
                onSubmit: function (hsb, hex, rgb, pickerElement) {
                    var integerColor = (rgb.r * 65536) + (rgb.g * 256) + rgb.b;
                    var property = valueAccessor();
                    property(integerColor);
                    $(pickerElement).ColorPickerHide();
                }
            });
        }
    }
};

//range addition method into underline array with signaling of mutation after, added for optimization
ko.utils.arrayPushAllOptimized = function (array, valuesToPush) {
    var underlyingArray = array();
    for (var i = 0, j = valuesToPush.length; i < j; i++)
        underlyingArray.push(valuesToPush[i]);
    array.valueHasMutated();
};

ko.utils.stringStartsWith = function (string, startsWith) {
    string = string || "";
    if (startsWith.length > string.length)
        return false;
    return string.substring(0, startsWith.length) === startsWith;
};

ko.bindingHandlers.pressKey = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        ko.utils.registerEventHandler(element, 'keydown', function (evt) {
            var value = valueAccessor();
            console.log(value);
            if (evt.keyCode === value.keyCode) {
                evt.preventDefault();
                evt.target.blur();
                value.action.call(viewModel, bindingContext.$data);
            }
        });
    }
};
//
// Point class
//
jSaaspose.Point = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

$.extend(jSaaspose.Point.prototype, {
    x: 0,
    y: 0,

    clone: function () {
        return new jSaaspose.Point(this.x, this.y);
    },

    round: function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);

        return this;
    }
});


//
// Rectangle class
//
jSaaspose.Rect = function (x1, y1, x2, y2, normalize) {
    this.set(x1, y1, x2, y2, normalize);
}

$.extend(jSaaspose.Rect.prototype, {
    topLeft: null,
    bottomRight: null,

    clone: function () {
        return new jSaaspose.Rect(this.topLeft.x, this.topLeft.y, this.bottomRight.x, this.bottomRight.y, false);
    },

    set: function (x1, y1, x2, y2, normalize) {
        if (!this.topLeft) {
            this.topLeft = new jSaaspose.Point();
        }

        if (!this.bottomRight) {
            this.bottomRight = new jSaaspose.Point();
        }

        this.topLeft.x = x1;
        this.topLeft.y = y1;

        this.bottomRight.x = x2;
        this.bottomRight.y = y2;

        return (normalize ? this.normalize() : this);
    },

    add: function (point) {
        this.topLeft.x += point.x;
        this.topLeft.y += point.y;

        this.bottomRight.x += point.x;
        this.bottomRight.y += point.y;

        return this;
    },

    subtract: function (point) {
        this.topLeft.x -= point.x;
        this.topLeft.y -= point.y;

        this.bottomRight.x -= point.x;
        this.bottomRight.y -= point.y;

        return this;
    },

    scale: function (factor) {
        this.topLeft.x *= factor;
        this.topLeft.y *= factor;

        this.bottomRight.x *= factor;
        this.bottomRight.y *= factor;

        return this;
    },

    round: function () {
        this.topLeft = this.topLeft.round();
        this.bottomRight = this.bottomRight.round();

        return this;
    },

    left: function () {
        return this.topLeft.x;
    },

    top: function () {
        return this.topLeft.y;
    },

    right: function () {
        return this.bottomRight.x;
    },

    bottom: function () {
        return this.bottomRight.y;
    },

    width: function () {
        return (this.bottomRight.x - this.topLeft.x);
    },

    height: function () {
        return (this.bottomRight.y - this.topLeft.y);
    },

    setLeft: function (x) {
        this.topLeft.x = x;
    },

    setTop: function (y) {
        this.topLeft.y = y;
    },

    setRight: function (x) {
        this.bottomRight.x = x;
    },

    setBottom: function (y) {
        this.bottomRight.y = y;
    },

    contains: function (point) {
        return (
            this.topLeft.x <= point.x && point.x <= this.bottomRight.x &&
            this.topLeft.y <= point.y && point.y <= this.bottomRight.y);
    },

    includes: function (rect) {
        return (
            this.contains(rect.topLeft) &&
            this.contains(rect.bottomRight));
    },

    intersects: function (rect) {
        return !(this.topLeft.x > rect.bottomRight.x ||
           this.bottomRight.x < rect.topLeft.x ||
           this.topLeft.y > rect.bottomRight.y ||
           this.bottomRight.y < rect.topLeft.y);
    },

    normalize: function () {
        if (this.topLeft.x > this.bottomRight.x)
            this.bottomRight.x = [this.topLeft.x, this.topLeft.x = this.bottomRight.x][0];

        if (this.topLeft.y > this.bottomRight.y)
            this.bottomRight.y = [this.topLeft.y, this.topLeft.y = this.bottomRight.y][0];

        return this;
    }
});

$(function () {
    $(".dropdown_menu_button").click(function () {
        var button = $(".dropdown_menu_button.active");
        $(button).next(".dropdown_menu").hide();
        if ($(this).hasClass("active")) {
            $(this).next(".dropdown_menu").hide('blind', 'fast');
            $(this).removeClass("active");
        } else {
            $(this).addClass('active');
            $(this).next(".dropdown_menu").show('blind', 'fast');
        }
    });
    $('html').click(function () {
        if ($(".dropdown_menu_button").hasClass('active')) {
            $(".dropdown_menu_button.active").next(".dropdown_menu").hide('blind', 'fast');
            $(".dropdown_menu_button.active").removeClass("active");
        }
    });
    $('.dropdown_menu_button').click(function (event) {
        event.stopPropagation();
    });
});
/*!
 * AmplifyJS 1.1.0 - Core, Store, Request
 * 
 * Copyright 2011 appendTo LLC. (http://appendto.com/team)
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 * 
 * http://amplifyjs.com
 */
/*!
 * Amplify Core 1.1.0
 * 
 * Copyright 2011 appendTo LLC. (http://appendto.com/team)
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 * 
 * http://amplifyjs.com
 */
(function( global, undefined ) {

var slice = [].slice,
	subscriptions = {};

var amplify = global.amplify = {
	publish: function( topic ) {
		var args = slice.call( arguments, 1 ),
			topicSubscriptions,
			subscription,
			length,
			i = 0,
			ret;

		if ( !subscriptions[ topic ] ) {
			return true;
		}

		topicSubscriptions = subscriptions[ topic ].slice();
		for ( length = topicSubscriptions.length; i < length; i++ ) {
			subscription = topicSubscriptions[ i ];
			ret = subscription.callback.apply( subscription.context, args );
			if ( ret === false ) {
				break;
			}
		}
		return ret !== false;
	},

	subscribe: function( topic, context, callback, priority ) {
		if ( arguments.length === 3 && typeof callback === "number" ) {
			priority = callback;
			callback = context;
			context = null;
		}
		if ( arguments.length === 2 ) {
			callback = context;
			context = null;
		}
		priority = priority || 10;

		var topicIndex = 0,
			topics = topic.split( /\s/ ),
			topicLength = topics.length,
			added;
		for ( ; topicIndex < topicLength; topicIndex++ ) {
			topic = topics[ topicIndex ];
			added = false;
			if ( !subscriptions[ topic ] ) {
				subscriptions[ topic ] = [];
			}
	
			var i = subscriptions[ topic ].length - 1,
				subscriptionInfo = {
					callback: callback,
					context: context,
					priority: priority
				};
	
			for ( ; i >= 0; i-- ) {
				if ( subscriptions[ topic ][ i ].priority <= priority ) {
					subscriptions[ topic ].splice( i + 1, 0, subscriptionInfo );
					added = true;
					break;
				}
			}

			if ( !added ) {
				subscriptions[ topic ].unshift( subscriptionInfo );
			}
		}

		return callback;
	},

	unsubscribe: function( topic, callback ) {
		if ( !subscriptions[ topic ] ) {
			return;
		}

		var length = subscriptions[ topic ].length,
			i = 0;

		for ( ; i < length; i++ ) {
			if ( subscriptions[ topic ][ i ].callback === callback ) {
				subscriptions[ topic ].splice( i, 1 );
				break;
			}
		}
	}
};

}( this ) );
/*!
 * Amplify Store - Persistent Client-Side Storage 1.1.0
 * 
 * Copyright 2011 appendTo LLC. (http://appendto.com/team)
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 * 
 * http://amplifyjs.com
 */
(function( amplify, undefined ) {

var store = amplify.store = function( key, value, options, type ) {
	var type = store.type;
	if ( options && options.type && options.type in store.types ) {
		type = options.type;
	}
	return store.types[ type ]( key, value, options || {} );
};

store.types = {};
store.type = null;
store.addType = function( type, storage ) {
	if ( !store.type ) {
		store.type = type;
	}

	store.types[ type ] = storage;
	store[ type ] = function( key, value, options ) {
		options = options || {};
		options.type = type;
		return store( key, value, options );
	};
}
store.error = function() {
	return "amplify.store quota exceeded"; 
};

var rprefix = /^__amplify__/;
function createFromStorageInterface( storageType, storage ) {
	store.addType( storageType, function( key, value, options ) {
		var storedValue, parsed, i, remove,
			ret = value,
			now = (new Date()).getTime();

		if ( !key ) {
			ret = {};
			remove = [];
			i = 0;
			try {
				// accessing the length property works around a localStorage bug
				// in Firefox 4.0 where the keys don't update cross-page
				// we assign to key just to avoid Closure Compiler from removing
				// the access as "useless code"
				// https://bugzilla.mozilla.org/show_bug.cgi?id=662511
				key = storage.length;

				while ( key = storage.key( i++ ) ) {
					if ( rprefix.test( key ) ) {
						parsed = JSON.parse( storage.getItem( key ) );
						if ( parsed.expires && parsed.expires <= now ) {
							remove.push( key );
						} else {
							ret[ key.replace( rprefix, "" ) ] = parsed.data;
						}
					}
				}
				while ( key = remove.pop() ) {
					storage.removeItem( key );
				}
			} catch ( error ) {}
			return ret;
		}

		// protect against name collisions with direct storage
		key = "__amplify__" + key;

		if ( value === undefined ) {
			storedValue = storage.getItem( key );
			parsed = storedValue ? JSON.parse( storedValue ) : { expires: -1 };
			if ( parsed.expires && parsed.expires <= now ) {
				storage.removeItem( key );
			} else {
				return parsed.data;
			}
		} else {
			if ( value === null ) {
				storage.removeItem( key );
			} else {
				parsed = JSON.stringify({
					data: value,
					expires: options.expires ? now + options.expires : null
				});
				try {
					storage.setItem( key, parsed );
				// quota exceeded
				} catch( error ) {
					// expire old data and try again
					store[ storageType ]();
					try {
						storage.setItem( key, parsed );
					} catch( error ) {
						throw store.error();
					}
				}
			}
		}

		return ret;
	});
}

// localStorage + sessionStorage
// IE 8+, Firefox 3.5+, Safari 4+, Chrome 4+, Opera 10.5+, iPhone 2+, Android 2+
for ( var webStorageType in { localStorage: 1, sessionStorage: 1 } ) {
	// try/catch for file protocol in Firefox
	try {
		if ( window[ webStorageType ].getItem ) {
			createFromStorageInterface( webStorageType, window[ webStorageType ] );
		}
	} catch( e ) {}
}

// globalStorage
// non-standard: Firefox 2+
// https://developer.mozilla.org/en/dom/storage#globalStorage
if ( window.globalStorage ) {
	// try/catch for file protocol in Firefox
	try {
		createFromStorageInterface( "globalStorage",
			window.globalStorage[ window.location.hostname ] );
		// Firefox 2.0 and 3.0 have sessionStorage and globalStorage
		// make sure we default to globalStorage
		// but don't default to globalStorage in 3.5+ which also has localStorage
		if ( store.type === "sessionStorage" ) {
			store.type = "globalStorage";
		}
	} catch( e ) {}
}

// userData
// non-standard: IE 5+
// http://msdn.microsoft.com/en-us/library/ms531424(v=vs.85).aspx
(function() {
	// IE 9 has quirks in userData that are a huge pain
	// rather than finding a way to detect these quirks
	// we just don't register userData if we have localStorage
	if ( store.types.localStorage ) {
		return;
	}

	// append to html instead of body so we can do this from the head
	var div = document.createElement( "div" ),
		attrKey = "amplify";
	div.style.display = "none";
	document.getElementsByTagName( "head" )[ 0 ].appendChild( div );

	// we can't feature detect userData support
	// so just try and see if it fails
	// surprisingly, even just adding the behavior isn't enough for a failure
	// so we need to load the data as well
	try {
		div.addBehavior( "#default#userdata" );
		div.load( attrKey );
	} catch( e ) {
		div.parentNode.removeChild( div );
		return;
	}

	store.addType( "userData", function( key, value, options ) {
		div.load( attrKey );
		var attr, parsed, prevValue, i, remove,
			ret = value,
			now = (new Date()).getTime();

		if ( !key ) {
			ret = {};
			remove = [];
			i = 0;
			while ( attr = div.XMLDocument.documentElement.attributes[ i++ ] ) {
				parsed = JSON.parse( attr.value );
				if ( parsed.expires && parsed.expires <= now ) {
					remove.push( attr.name );
				} else {
					ret[ attr.name ] = parsed.data;
				}
			}
			while ( key = remove.pop() ) {
				div.removeAttribute( key );
			}
			div.save( attrKey );
			return ret;
		}

		// convert invalid characters to dashes
		// http://www.w3.org/TR/REC-xml/#NT-Name
		// simplified to assume the starting character is valid
		// also removed colon as it is invalid in HTML attribute names
		key = key.replace( /[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g, "-" );

		if ( value === undefined ) {
			attr = div.getAttribute( key );
			parsed = attr ? JSON.parse( attr ) : { expires: -1 };
			if ( parsed.expires && parsed.expires <= now ) {
				div.removeAttribute( key );
			} else {
				return parsed.data;
			}
		} else {
			if ( value === null ) {
				div.removeAttribute( key );
			} else {
				// we need to get the previous value in case we need to rollback
				prevValue = div.getAttribute( key );
				parsed = JSON.stringify({
					data: value,
					expires: (options.expires ? (now + options.expires) : null)
				});
				div.setAttribute( key, parsed );
			}
		}

		try {
			div.save( attrKey );
		// quota exceeded
		} catch ( error ) {
			// roll the value back to the previous value
			if ( prevValue === null ) {
				div.removeAttribute( key );
			} else {
				div.setAttribute( key, prevValue );
			}

			// expire old data and try again
			store.userData();
			try {
				div.setAttribute( key, parsed );
				div.save( attrKey );
			} catch ( error ) {
				// roll the value back to the previous value
				if ( prevValue === null ) {
					div.removeAttribute( key );
				} else {
					div.setAttribute( key, prevValue );
				}
				throw store.error();
			}
		}
		return ret;
	});
}() );

// in-memory storage
// fallback for all browsers to enable the API even if we can't persist data
(function() {
	var memory = {},
		timeout = {};

	function copy( obj ) {
		return obj === undefined ? undefined : JSON.parse( JSON.stringify( obj ) );
	}

	store.addType( "memory", function( key, value, options ) {
		if ( !key ) {
			return copy( memory );
		}

		if ( value === undefined ) {
			return copy( memory[ key ] );
		}

		if ( timeout[ key ] ) {
			clearTimeout( timeout[ key ] );
			delete timeout[ key ];
		}

		if ( value === null ) {
			delete memory[ key ];
			return null;
		}

		memory[ key ] = value;
		if ( options.expires ) {
			timeout[ key ] = setTimeout(function() {
				delete memory[ key ];
				delete timeout[ key ];
			}, options.expires );
		}

		return value;
	});
}() );

}( this.amplify = this.amplify || {} ) );
/*!
 * Amplify Request 1.1.0
 * 
 * Copyright 2011 appendTo LLC. (http://appendto.com/team)
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 * 
 * http://amplifyjs.com
 */
(function( amplify, undefined ) {

function noop() {}
function isFunction( obj ) {
	return ({}).toString.call( obj ) === "[object Function]";
}

function async( fn ) {
	var isAsync = false;
	setTimeout(function() {
		isAsync = true;
	}, 1 );
	return function() {
		var that = this,
			args = arguments;
		if ( isAsync ) {
			fn.apply( that, args );
		} else {
			setTimeout(function() {
				fn.apply( that, args );
			}, 1 );
		}
	};
}

amplify.request = function( resourceId, data, callback ) {
	// default to an empty hash just so we can handle a missing resourceId
	// in one place
	var settings = resourceId || {};

	if ( typeof settings === "string" ) {
		if ( isFunction( data ) ) {
			callback = data;
			data = {};
		}
		settings = {
			resourceId: resourceId,
			data: data || {},
			success: callback
		};
	}

	var request = { abort: noop },
		resource = amplify.request.resources[ settings.resourceId ],
		success = settings.success || noop,
		error = settings.error || noop;
	settings.success = async( function( data, status ) {
		status = status || "success";
		amplify.publish( "request.success", settings, data, status );
		amplify.publish( "request.complete", settings, data, status );
		success( data, status );
	});
	settings.error = async( function( data, status ) {
		status = status || "error";
		amplify.publish( "request.error", settings, data, status );
		amplify.publish( "request.complete", settings, data, status );
		error( data, status );
	});

	if ( !resource ) {
		if ( !settings.resourceId ) {
			throw "amplify.request: no resourceId provided";
		}
		throw "amplify.request: unknown resourceId: " + settings.resourceId;
	}

	if ( !amplify.publish( "request.before", settings ) ) {
		settings.error( null, "abort" );
		return;
	}

	amplify.request.resources[ settings.resourceId ]( settings, request );
	return request;
};

amplify.request.types = {};
amplify.request.resources = {};
amplify.request.define = function( resourceId, type, settings ) {
	if ( typeof type === "string" ) {
		if ( !( type in amplify.request.types ) ) {
			throw "amplify.request.define: unknown type: " + type;
		}

		settings.resourceId = resourceId;
		amplify.request.resources[ resourceId ] =
			amplify.request.types[ type ]( settings );
	} else {
		// no pre-processor or settings for one-off types (don't invoke)
		amplify.request.resources[ resourceId ] = type;
	}
};

}( amplify ) );





(function( amplify, $, undefined ) {

var xhrProps = [ "status", "statusText", "responseText", "responseXML", "readyState" ],
    rurlData = /\{([^\}]+)\}/g;

amplify.request.types.ajax = function( defnSettings ) {
	defnSettings = $.extend({
		type: "GET"
	}, defnSettings );

	return function( settings, request ) {
		var xhr,
			url = defnSettings.url,
			abort = request.abort,
			ajaxSettings = $.extend( true, {}, defnSettings, { data: settings.data } ),
			aborted = false,
			ampXHR = {
				readyState: 0,
				setRequestHeader: function( name, value ) {
					return xhr.setRequestHeader( name, value );
				},
				getAllResponseHeaders: function() {
					return xhr.getAllResponseHeaders();
				},
				getResponseHeader: function( key ) {
					return xhr.getResponseHeader( key );
				},
				overrideMimeType: function( type ) {
					return xhr.overrideMideType( type );
				},
				abort: function() {
					aborted = true;
					try {
						xhr.abort();
					// IE 7 throws an error when trying to abort
					} catch( e ) {}
					handleResponse( null, "abort" );
				},
				success: function( data, status ) {
					settings.success( data, status );
				},
				error: function( data, status ) {
					settings.error( data, status );
				}
			};

		amplify.publish( "request.ajax.preprocess",
			defnSettings, settings, ajaxSettings, ampXHR );

		$.extend( ajaxSettings, {
			success: function( data, status ) {
				handleResponse( data, status );
			},
			error: function( _xhr, status ) {
				handleResponse( null, status );
			},
			beforeSend: function( _xhr, _ajaxSettings ) {
				xhr = _xhr;
				ajaxSettings = _ajaxSettings;
				var ret = defnSettings.beforeSend ?
					defnSettings.beforeSend.call( this, ampXHR, ajaxSettings ) : true;
				return ret && amplify.publish( "request.before.ajax",
					defnSettings, settings, ajaxSettings, ampXHR );
			}
		});
		$.ajax( ajaxSettings );

		function handleResponse( data, status ) {
			$.each( xhrProps, function( i, key ) {
				try {
					ampXHR[ key ] = xhr[ key ];
				} catch( e ) {}
			});
			// Playbook returns "HTTP/1.1 200 OK"
			// TODO: something also returns "OK", what?
			if ( /OK$/.test( ampXHR.statusText ) ) {
				ampXHR.statusText = "success";
			}
			if ( data === undefined ) {
				// TODO: add support for ajax errors with data
				data = null;
			}
			if ( aborted ) {
				status = "abort";
			}
			if ( /timeout|error|abort/.test( status ) ) {
				ampXHR.error( data, status );
			} else {
				ampXHR.success( data, status );
			}
			// avoid handling a response multiple times
			// this can happen if a request is aborted
			// TODO: figure out if this breaks polling or multi-part responses
			handleResponse = $.noop;
		}

		request.abort = function() {
			ampXHR.abort();
			abort.call( this );
		};
	};
};



amplify.subscribe( "request.ajax.preprocess", function( defnSettings, settings, ajaxSettings ) {
	var mappedKeys = [],
		data = ajaxSettings.data;

	if ( typeof data === "string" ) {
		return;
	}

	data = $.extend( true, {}, defnSettings.data, data );

	ajaxSettings.url = ajaxSettings.url.replace( rurlData, function ( m, key ) {
		if ( key in data ) {
		    mappedKeys.push( key );
		    return data[ key ];
		}
	});

	// We delete the keys later so duplicates are still replaced
	$.each( mappedKeys, function ( i, key ) {
		delete data[ key ];
	});

	ajaxSettings.data = data;
});



amplify.subscribe( "request.ajax.preprocess", function( defnSettings, settings, ajaxSettings ) {
	var data = ajaxSettings.data,
		dataMap = defnSettings.dataMap;

	if ( !dataMap || typeof data === "string" ) {
		return;
	}

	if ( $.isFunction( dataMap ) ) {
		ajaxSettings.data = dataMap( data );
	} else {
		$.each( defnSettings.dataMap, function( orig, replace ) {
			if ( orig in data ) {
				data[ replace ] = data[ orig ];
				delete data[ orig ];
			}
		});
		ajaxSettings.data = data;
	}
});



var cache = amplify.request.cache = {
	_key: function( resourceId, url, data ) {
		data = url + data;
		var length = data.length,
			i = 0,
			checksum = chunk();

		while ( i < length ) {
			checksum ^= chunk();
		}

		function chunk() {
			return data.charCodeAt( i++ ) << 24 |
				data.charCodeAt( i++ ) << 16 |
				data.charCodeAt( i++ ) << 8 |
				data.charCodeAt( i++ ) << 0;
		}

		return "request-" + resourceId + "-" + checksum;
	},

	_default: (function() {
		var memoryStore = {};
		return function( resource, settings, ajaxSettings, ampXHR ) {
			// data is already converted to a string by the time we get here
			var cacheKey = cache._key( settings.resourceId,
					ajaxSettings.url, ajaxSettings.data ),
				duration = resource.cache;

			if ( cacheKey in memoryStore ) {
				ampXHR.success( memoryStore[ cacheKey ] );
				return false;
			}
			var success = ampXHR.success;
			ampXHR.success = function( data ) {
				memoryStore[ cacheKey ] = data;
				if ( typeof duration === "number" ) {
					setTimeout(function() {
						delete memoryStore[ cacheKey ];
					}, duration );
				}
				success.apply( this, arguments );
			};
		};
	}())
};

if ( amplify.store ) {
	$.each( amplify.store.types, function( type ) {
		cache[ type ] = function( resource, settings, ajaxSettings, ampXHR ) {
			var cacheKey = cache._key( settings.resourceId,
					ajaxSettings.url, ajaxSettings.data ),
				cached = amplify.store[ type ]( cacheKey );

			if ( cached ) {
				ajaxSettings.success( cached );
				return false;
			}
			var success = ampXHR.success;
			ampXHR.success = function( data ) {	
				amplify.store[ type ]( cacheKey, data, { expires: resource.cache.expires } );
				success.apply( this, arguments );
			};
		};
	});
	cache.persist = cache[ amplify.store.type ];
}

amplify.subscribe( "request.before.ajax", function( resource ) {
	var cacheType = resource.cache;
	if ( cacheType ) {
		// normalize between objects and strings/booleans/numbers
		cacheType = cacheType.type || cacheType;
		return cache[ cacheType in cache ? cacheType : "_default" ]
			.apply( this, arguments );
	}
});



amplify.request.decoders = {
	// http://labs.omniti.com/labs/jsend
	jsend: function( data, status, ampXHR, success, error ) {
		if ( data.status === "success" ) {
			success( data.data );
		} else if ( data.status === "fail" ) {
			error( data.data, "fail" );
		} else if ( data.status === "error" ) {
			delete data.status;
			error( data, "error" );
		}
	}
};

amplify.subscribe( "request.before.ajax", function( resource, settings, ajaxSettings, ampXHR ) {
	var _success = ampXHR.success,
		_error = ampXHR.error,
		decoder = $.isFunction( resource.decoder )
			? resource.decoder
			: resource.decoder in amplify.request.decoders
				? amplify.request.decoders[ resource.decoder ]
				: amplify.request.decoders._default;

	if ( !decoder ) {
		return;
	}

	function success( data, status ) {
		_success( data, status );
	}
	function error( data, status ) {
		_error( data, status );
	}
	ampXHR.success = function( data, status ) {
		decoder( data, status, ampXHR, success, error );
	};
	ampXHR.error = function( data, status ) {
		decoder( data, status, ampXHR, success, error );
	};
});

}( amplify, jQuery ) );

//     Underscore.js 1.4.4
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var push             = ArrayProto.push,
      slice            = ArrayProto.slice,
      concat           = ArrayProto.concat,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.4.4';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? null : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See: https://bugs.webkit.org/show_bug.cgi?id=80797
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        index : index,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index < right.index ? -1 : 1;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(obj, value, context, behavior) {
    var result = {};
    var iterator = lookupIterator(value || _.identity);
    each(obj, function(value, index) {
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
    });
    return result;
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
    });
  };

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key) {
      if (!_.has(result, key)) result[key] = 0;
      result[key]++;
    });
  };

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    each(input, function(value) {
      if (_.isArray(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(concat.apply(ArrayProto, arguments));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(args, "" + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, l = list.length; i < l; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, l = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < l; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    var args = slice.call(arguments, 2);
    return function() {
      return func.apply(context, args.concat(slice.call(arguments)));
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, result;
    var previous = 0;
    var later = function() {
      previous = new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var values = [];
    for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var pairs = [];
    for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] == null) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent, but `Object`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                               _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
        return false;
      }
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(n);
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);

/**
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * @name timeago
 * @version 0.11.1
 * @requires jQuery v1.2.3+
 * @author Ryan McGeary
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Copyright (c) 2008-2011, Ryan McGeary (ryanonjavascript -[at]- mcgeary [*dot*] org)
 */
(function($) {
  $.timeago = function(timestamp) {
    if (timestamp instanceof Date) {
      return inWords(timestamp);
    } else if (typeof timestamp === "string") {
      return inWords($.timeago.parse(timestamp));
    } else {
      return inWords($.timeago.datetime(timestamp));
    }
  };
  var $t = $.timeago;

  $.extend($.timeago, {
    settings: {
      refreshMillis: 60000,
      allowFuture: false,
      titleAttribute: 'title',
      strings: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: "ago",
        suffixFromNow: "from now",
        seconds: "about a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years",
        wordSeparator: " ",
        numbers: []
      }
    },
    inWords: function(distanceMillis) {
      var $l = this.settings.strings;
      var prefix = $l.prefixAgo;
      var suffix = $l.suffixAgo;
      if (this.settings.allowFuture) {
        if (distanceMillis < 0) {
          prefix = $l.prefixFromNow;
          suffix = $l.suffixFromNow;
        }
      }

      var seconds = Math.abs(distanceMillis) / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      function substitute(stringOrFunction, number) {
        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
        var value = ($l.numbers && $l.numbers[number]) || number;
        return string.replace(/%d/i, value);
      }

      var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute($l.minute, 1) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute($l.hour, 1) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        hours < 42 && substitute($l.day, 1) ||
        days < 30 && substitute($l.days, Math.round(days)) ||
        days < 45 && substitute($l.month, 1) ||
        days < 365 && substitute($l.months, Math.round(days / 30)) ||
        years < 1.5 && substitute($l.year, 1) ||
        substitute($l.years, Math.round(years));

      var separator = $l.wordSeparator === undefined ?  " " : $l.wordSeparator;
      return $.trim([prefix, words, suffix].join(separator));
    },
    parse: function(iso8601) {
      var s = $.trim(iso8601);
      s = s.replace(/\.\d\d\d+/,""); // remove milliseconds
      s = s.replace(/-/,"/").replace(/-/,"/");
      s = s.replace(/T/," ").replace(/Z/," UTC");
      s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
      return new Date(s);
    },
    datetime: function(elem) {
      // jQuery's `is()` doesn't play well with HTML5 in IE
      var isTime = $(elem).get(0).tagName.toLowerCase() === "time"; // $(elem).is("time");
      var iso8601 = isTime ? $(elem).attr("datetime") : $(elem).attr($t.settings.titleAttribute);
      return $t.parse(iso8601);
    }
  });

  $.fn.timeago = function() {
    var self = this;
    self.each(refresh);

    var $s = $t.settings;
    if ($s.refreshMillis > 0) {
      setInterval(function() { self.each(refresh); }, $s.refreshMillis);
    }
    return self;
  };

  function refresh() {
    var data = prepareData(this);
    if (!isNaN(data.datetime)) {
      $(this).text(inWords(data.datetime));
    }
    return this;
  }

  function prepareData(element) {
    element = $(element);
    if (!element.data("timeago")) {
      element.data("timeago", { datetime: $t.datetime(element) });
      var text = $.trim(element.text());
      if (text.length > 0) {
          console.log($t.settings);
          element.attr($t.settings.titleAttribute, text);
      }
    }
    return element.data("timeago");
  }

  function inWords(date) {
    return $t.inWords(distance(date));
  }

  function distance(date) {
    return (new Date().getTime() - date.getTime());
  }

  // fix for IE6 suckage
  document.createElement("abbr");
  document.createElement("time");
}(jQuery));

// By: Hans Fjällemark and John Papa
// https://github.com/CodeSeven/KoLite

(function (ko) {
    ko.command = function (options) {
        var
            self = function () {
                return self.execute.apply(this, arguments);
            },
            canExecuteDelegate = options.canExecute,
            executeDelegate = options.execute;

        self.canExecute = ko.computed(function () {
            return canExecuteDelegate ? canExecuteDelegate() : true;
        });

        self.execute = function (arg1, arg2) {
            // Needed for anchors since they don't support the disabled state
            if (!self.canExecute()) return

            return executeDelegate.apply(this, [arg1, arg2]);
        };

        return self;
    };

    ko.asyncCommand = function (options) {
        var
            self = function () {
                return self.execute.apply(this, arguments);
            },
            canExecuteDelegate = options.canExecute,
            executeDelegate = options.execute,

            completeCallback = function () {
                self.isExecuting(false);
            };

        self.isExecuting = ko.observable();

        self.canExecute = ko.computed(function () {
            return canExecuteDelegate ? canExecuteDelegate(self.isExecuting()) : !self.isExecuting();
        });

        self.execute = function (arg1, arg2) {
            // Needed for anchors since they don't support the disabled state
            if (!self.canExecute()) return

            var args = []; // Allow for these arguments to be passed on to execute delegate

            if (executeDelegate.length >= 2) {
                args.push(arg1);
            }

            if (executeDelegate.length >= 3) {
                args.push(arg2);
            }

            args.push(completeCallback);
            self.isExecuting(true);
            return executeDelegate.apply(this, args);
        };

        return self;
    };
})(ko);

; (function (ko) {
    ko.utils.wrapAccessor = function (accessor) {
        return function () {
            return accessor;
        };
    };

    ko.bindingHandlers.command = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var
                value = valueAccessor(),
                commands = value.execute ? { click: value } : value,

                isBindingHandler = function (handler) {
                    return ko.bindingHandlers[handler] !== undefined;
                },

                initBindingHandlers = function () {
                    for (var command in commands) {
                        if (!isBindingHandler(command)) {
                            continue;
                        };

                        ko.bindingHandlers[command].init(
                            element,
                            ko.utils.wrapAccessor(commands[command].execute),
                            allBindingsAccessor,
                            viewModel
                        );
                    }
                },

                initEventHandlers = function () {
                    var events = {};

                    for (var command in commands) {
                        if (!isBindingHandler(command)) {
                            events[command] = commands[command].execute;
                        }
                    }

                    ko.bindingHandlers.event.init(
                        element,
                        ko.utils.wrapAccessor(events),
                        allBindingsAccessor,
                        viewModel);
                };

            initBindingHandlers();
            initEventHandlers();
        },

        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var commands = valueAccessor();
            var canExecute = commands.canExecute;

            if (!canExecute) {
                for (var command in commands) {
                    if (commands[command].canExecute) {
                        canExecute = commands[command].canExecute;
                        break;
                    }
                }
            }

            if (!canExecute) {
                return;
            }

            ko.bindingHandlers.enable.update(element, canExecute, allBindingsAccessor, viewModel);
        }
    };
})(ko);
; (function (ko, $) {
    $.fn.modal.Constructor.prototype.enforceFocus = function () { };
    $.fn.reverse = [].reverse;
    ko.bindingHandlers.modal = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var allBindings = allBindingsAccessor();
            var $element = $(element);
            $element.addClass('hide modal');

            $element.on('show', function() {
                $("html").css("overflow","hidden");
            }).on("hide", function () {
                $("html").css("overflow","");
                return true;
            });
            
            if (allBindings.modalOptions) {
                if (allBindings.modalOptions.beforeShow) {
                    $element.on('show', function () {
                        return allBindings.modalOptions.beforeShow();
                    });
                }
                if (allBindings.modalOptions.beforeClose) {
                    $element.on('hide', function () {
                        return allBindings.modalOptions.beforeClose();
                    });
                }
                if (allBindings.modalOptions.afterShow) {
                    $element.on('shown', function () {
                        return allBindings.modalOptions.afterShow();
                    });
                }
            }
        },
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            if (value) {
                $(element).modal('show');
            } else {
                $(element).modal('hide');
            }
        }
    };
    
    ko.bindingHandlers.tooltip = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            $(element).tooltip();
        }
    };
    ko.bindingHandlers.jqTabs = {
        init: function (element, valueAccessor) {
            var options = valueAccessor() || {};
            setTimeout(function () { $(element).tabs(options); }, 0);
        }
    };
    ko.bindingHandlers.toggle = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var $element = $(element);
            
            $element.click(function() {
                var value = valueAccessor();
                $element.toggleClass("thumbs_btn_slide", 'slow');
                $(value).toggle('slide', 'slow');
                return false;
            });
        }
    };    
    ko.bindingHandlers.dropdownButton = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var $element = $(element);
            var selector = ko.utils.unwrapObservable(valueAccessor());
            var buttonSelector = selector + "-button";

            $element.find(buttonSelector).click(function (event) {
                var $button = $(buttonSelector + ".active");
                var $this = $(this);
                var $target = $this.parent().find(selector);
                var clearAllActive = function () {
                    var $el1 = $button.parent().find(selector);
                    if ($el1.is(":visible")) {
                        $el1.hide("blind", "fast");
                    }
                    $button.removeClass("active");
                };

                if ($target.is(":visible") && $this.hasClass("active") ) {
                    clearAllActive();
                } else {
                    clearAllActive();
                    $this.addClass('active');
                    $target.show('blind', 'fast');
                }
                
                $(".toolTip").tooltip('hide');
                return false;
            });
        }
    };
    
    ko.bindingHandlers.stopBindings = {
        init: function () {
            return { controlsDescendantBindings: true };
        }
    };    
    ko.virtualElements.allowedBindings.stopBindings = true;
    
    ko.bindingHandlers.diffMarker = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            $(element).toggle(value);
        },
        update: function (element, valueAccessor, allBindingsAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            var container = allBindingsAccessor().container || document;
            if (!value) {
                $(element).stop(true, true).hide();
            } else {
                $(element).show();
                $(container).scrollTo($(element), 100, { offset: -100 });
                $(element).stop(true, true).effect("pulsate", { times: 3 }, 500, function() {
                    $(element).fadeTo(200, 0.5);
                });
            }
        }
    };

    ko.bindingHandlers.diffType = {
        update: function (element, valueAccessor, allBindingsAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            var $element = $(element);
            switch(value) {
                case "Deleted": //delete
                    $element.addClass("striked");
                    break;
                case "Inserted": //insert
                    $element.addClass("underlined");
                    break;
            	case "ChangedStyle": //stylechange
                    $element.addClass("double-underlined");
                    break;
            }
        }
    };
    
    ko.bindingHandlers.slideVisible = {
        init: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            $(element).toggle(value);
        },

        update: function (element, valueAccessor, allBindingsAccessor) {
  
            var value = valueAccessor(), allBindings = allBindingsAccessor();
            var valueUnwrapped = ko.utils.unwrapObservable(value);
            var duration = allBindings.slideDuration || 400; // 400ms is default duration unless otherwise specified

            function scrollBarUpdate() {
            }

            if (valueUnwrapped == true)
                $(element).slideDown(duration, scrollBarUpdate); // Make the element visible
            else
                $(element).slideUp(duration, scrollBarUpdate);   // Make the element invisible

        }
    };

    ko.bindingHandlers.calculatePosition = {
        update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var location = ko.dataFor(element);
            var field = ko.contextFor(element).$parents[1];
            if (location == null || field == null) return;
            var page = $(element).closest(".doc-page");
            var imageOffset = $(".page-image", page).offset();
            var pageOffset = $(page).offset();
            var imageWidth = ko.utils.unwrapObservable(bindingContext.$root.pageWidth);
            var imageHeight = ko.utils.unwrapObservable(bindingContext.$root.pageHeight);
            var leftPadding = imageOffset.left - pageOffset.left;
            var topPadding = imageOffset.top - pageOffset.top;
            var x = Math.round(location.locationX() * imageWidth + leftPadding);
            var y = Math.round(location.locationY() * imageHeight /*+ topPadding*/);
            $(element).css({ left: x + "px", top: y + "px" });
            if (location.locationHeight() != 0) {
                //$(element).css({ height: Math.round(location.locationHeight() * bindingContext.$root.scale()) + 'px' });
                //console.log(location.locationHeight());
                var absoluteHeight = location.locationHeight() / ((bindingContext.$root.originalPageWidth * bindingContext.$root.heightWidthRatio) / (bindingContext.$root.pageImageWidth * bindingContext.$root.heightWidthRatio));
                $(element).css({ height: Math.round(absoluteHeight * bindingContext.$root.scale()) + 'px' });
            } else {
                $(element).css({ height: 'auto' });
            }
            if (bindingContext.$parents[2].viewerAction == 'sign' &&
                field.fieldType() == bindingContext.$parents[2].config.signatureFieldType.Signature &&
                bindingContext.$parents[2].config.checkBrowserForSvgSupport() &&
                field.data() != '' &&
                field.data().indexOf('<text')>0 &&
                field.settings()!=null && field.settings().matchHeight()) {
                var signatureHeight = $($(field.data())[0]).prop("viewBox").baseVal.height;
                var signatureWidth = $($(field.data())[0]).prop("viewBox").baseVal.width / (signatureHeight / $(element).height());
                $(element).css({ width: Math.round(signatureWidth /* * bindingContext.$root.scale()*/) + 'px' });
            } else {
                if (location.locationWidth() != 0) {
                    //$(element).css({ width: Math.round(location.locationWidth() * bindingContext.$root.scale()) + 'px' });
                    var absoluteWidth = location.locationWidth() / (bindingContext.$root.originalPageWidth / bindingContext.$root.pageImageWidth);
                    $(element).css({ width: Math.round(absoluteWidth * bindingContext.$root.scale()) + 'px' });
                } else {
                    $(element).css({ width: 'auto'});
                }
            }
        }
    };

    ko.bindingHandlers.calculateFieldSize = {
        update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var location = ko.dataFor(element);
            var field = ko.contextFor(element).$parents[1];
            if (location == null || field == null) return;
            if (location.locationHeight() != 0) {
                //$(element).css({ height: Math.round(location.locationHeight() * bindingContext.$root.scale()) + 'px' });
                var absoluteHeight = location.locationHeight() / ((bindingContext.$root.originalPageWidth * bindingContext.$root.heightWidthRatio) / (bindingContext.$root.pageImageWidth * bindingContext.$root.heightWidthRatio));
                $(element).css({ height: Math.round(absoluteHeight * bindingContext.$root.scale()) + 'px' });
            }
            if (!(bindingContext.$parents[2].viewerAction == 'sign' && field.fieldType() == bindingContext.$parents[2].config.signatureFieldType.Signature))
            {
                if (location.locationWidth() != 0) {
                    //$(element).css({ width: Math.round(location.locationWidth() * bindingContext.$root.scale()) + 'px' });
                    var absoluteWidth = location.locationWidth() / (bindingContext.$root.originalPageWidth / bindingContext.$root.pageImageWidth);
                    $(element).css({ width: Math.round(absoluteWidth * bindingContext.$root.scale()) + 'px' });
                }
            }
        }
    };

    ko.bindingHandlers.signatureFieldStyle = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            var allBindings = allBindingsAccessor();

            //$(element).toggle(value);
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var location = ko.utils.unwrapObservable(valueAccessor());
            if (location == null) return;
            var $element = $(element);
            
            $element.css({ padding: '0px' });
            if (location.fontSize()>0)
                $element.css({ fontSize: Math.round(location.fontSize() * bindingContext.$root.scale()) + 'px' });
            if (location.locationHeight() != 0) {
                //$element.css({ height: Math.round(location.locationHeight() * bindingContext.$root.scale()) + 'px' });
                var absoluteHeight = location.locationHeight() / ((bindingContext.$root.originalPageWidth * bindingContext.$root.heightWidthRatio) / (bindingContext.$root.pageImageWidth * bindingContext.$root.heightWidthRatio));
                $element.css({ height: Math.round(absoluteHeight * bindingContext.$root.scale()) + 'px' });
            }
            if (location.locationWidth() != 0) {
                //$element.css({ width: Math.round(location.locationWidth() * bindingContext.$root.scale()) + 'px' });
                var absoluteWidth = location.locationWidth() / (bindingContext.$root.originalPageWidth / bindingContext.$root.pageImageWidth);
                $element.css({ width: Math.round(absoluteWidth * bindingContext.$root.scale()) + 'px' });
            }
            if (location.fontName() != "")
                $element.css({ fontFamily: location.fontName() });
            if (location.fontColor() != "")
                $element.css({ color: location.fontColor() });
            if (location.fontBold())
                $element.css({ "font-weight": "bold" });
            else
                $element.css({ "font-weight": "" });
            if (location.fontItalic())
                $element.css({ "font-style": "italic" });
            else
                $element.css({ "font-style": "" });
            if (location.fontUnderline())
                $element.css({ "text-decoration": "underline" });
            else
                $element.css({ "text-decoration": "" });
            $element.css({ "text-align": "" });
            switch (location.align()) {
                case 0:
                    $element.css({ "text-align": "left" });
                    break;
                case 1:
                    $element.css({ "text-align": "center" });
                    break;
                case 2:
                    $element.css({ "text-align": "right" });
                    break;
            }
        }
    };
    
    ko.bindingHandlers.dropField = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

            var overlaps = (function () {
                function getPositions(elem) {
                    var pos = $(elem).position();
                    var width = $(elem).width();
                    var height = $(elem).height();
                    var top = pos.top;
                    var left = pos.left;
                    if ($(elem).context==null) {
                        var page = $(element);
                        var pageImage = $(".page-image", page);
                        var parentOffset = pageImage.offset();
                        top = top - parentOffset.top;
                        left = left - parentOffset.left;
                    }
                    return [[left, left + width], [top, top + height]];
                }
                function comparePositions(p1, p2) {
                    var r1 = p1[0] < p2[0] ? p1 : p2;
                    var r2 = p1[0] < p2[0] ? p2 : p1;
                    return r1[1] > r2[0] || r1[0] === r2[0];
                }
                return function (a, b) {
                    var pos1 = getPositions(a),
                        pos2 = getPositions(b);
                    return comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);
                };
            })();

            $(element).droppable({
                accept: ".signature_field, .signature_doc_field",
                tolerance:"fit",
                drop: function (event, ui) {
                    var page = $(element);
                    var pageId = allBindingsAccessor().pageId;
                    var obj = $(ui.draggable);
                    var fieldId = $(obj).attr("fieldId");
                    var fieldType = $(obj).attr("fieldType");
                    var pageImage = $(".page-image", page);
                    var parentOffset = pageImage.offset();
                    var pageNum = pageId;
                    var imageWidth = pageImage.width();
                    var imageHeight = pageImage.height();
                    var pos = $(ui.helper).offset();
                    var x = pos.left - parentOffset.left;
                    var y = pos.top - parentOffset.top;
                    var relativeX = x / imageWidth;
                    var relativeY = y / imageHeight;

                    if ($(ui.helper).hasClass('signature_doc_field')) { // old field moved to another page
                        var location = ko.dataFor(ui.draggable.context);
                        setTimeout((function () {
                                $(this).draggable("destroy");
                                location.locationX(relativeX);
                                location.locationY(relativeY);
                                location.page(pageNum);
                                bindingContext.$root.vm.updateFieldLocation(location);
                        }).bind(ui.draggable), 50);
                    } else { // new field added to a page
                        var isOverlap = false;
                        page.find(".signature_doc_field").each(function (i, val) {
                            if (overlaps(val, ui.helper)) {
                                bindingContext.$root.vm.config.alert({ title: "Error", message: "Locations should not be overlapped" });
                                isOverlap = true;
                                return false;
                            }
                        });
                        if (isOverlap) return false;

                        var height, width;
                        switch (parseInt(fieldType)) {
                            case 1: //signature
                                height = 46;
                                width = 138;
                                break;
                            case 6: //checkbox
                                height = 25;
                                width = 25;
                                break;
                            default:
                                height = $(ui.helper).height();
                                width = $(ui.helper).width();
                                break;
                        }
                        var relativeWidth = width * (bindingContext.$root.originalPageWidth / bindingContext.$root.pageImageWidth);
                        var relativeHeight = height * ((bindingContext.$root.originalPageWidth * bindingContext.$root.heightWidthRatio) / (bindingContext.$root.pageImageWidth * bindingContext.$root.heightWidthRatio));
                        bindingContext.$root.vm.addField(fieldId, pageNum, relativeX, relativeY, relativeHeight, relativeWidth, true, '');
                    }
                }
            });
        }
    };
    var droppableShouldCancel;
    ko.bindingHandlers.moveExistingField = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var valueUnwrapped = ko.utils.unwrapObservable(valueAccessor());            
            if (valueUnwrapped.enable != null && !valueUnwrapped.enable) return;
            if (ko.dataFor(element).locked != null && ko.dataFor(element).locked()) return;
            var location = ko.dataFor(element);
            var docPage = $("#" + bindingContext.$root.docViewerId + " .doc-page");

            var leftPos, topPos;
            if (bindingContext.$root.vm.config.isDownloadable) {
                leftPos = $(docPage).first().offset().left + $("#" + bindingContext.$root.docViewerId + " .doc-page .page-image").first().offset().left;
                topPos = $("#" + bindingContext.$root.docViewerId + " .doc-page .page-image").first().offset().top;
            } else {
                leftPos = $(docPage).first().offset().left;
                topPos = $(docPage).first().offset().top + 1;
            }
            var dragArea = [
                leftPos,
                topPos,
                leftPos + $(docPage).last().width() - ((location.locationWidth() / (bindingContext.$root.originalPageWidth / bindingContext.$root.pageImageWidth)) * bindingContext.$root.scale()),
                $(docPage).first().offset().top + ko.utils.unwrapObservable(bindingContext.$root.pageHeight) * bindingContext.$root.pageCount() - (location.locationHeight() / (bindingContext.$root.originalPageWidth / (bindingContext.$root.pageImageWidth * bindingContext.$root.heightWidthRatio)))
            ];
            $(element).mousemove(function(event) {
                if (event.ctrlKey && !bindingContext.$root.vm.config.isDownloadable) {
                    $(this).draggable({ helper: "clone" });
                } else
                    $(this).draggable({ helper: "" });
            }).draggable({
                scroll: false,
                zIndex: 2700,
                grid: [1, 1],
                cancel: '',
                containment: dragArea,
                stop: function(event, ui) {
                    $(".toolTip").tooltip('enable');
                    var field = ko.contextFor(element).$parents[1];
                    var obj = $(element).parent().parent();
                    var pageImage = $(".page-image", obj);
                    var parentOffset = pageImage.offset();
                    var pageNum = parseInt($(obj).attr("id").replace(bindingContext.$parents[4].pagePrefix, ""));
                    var imageWidth = pageImage.width();
                    var imageHeight = pageImage.height();
                    var pos = $(ui.helper).offset();
                    var y = pos.top - parentOffset.top;
                    if (y < 0 || y / imageHeight > 1) { //page number correction
                        obj = y < 0 ? obj.prev() : obj.next();
                        pageImage = $(".page-image", obj);
                        parentOffset = pageImage.offset();
                        pageNum = parseInt($(obj).attr("id").replace(bindingContext.$parents[4].pagePrefix, ""));
                        imageWidth = pageImage.width();
                        imageHeight = pageImage.height();
                        pos = $(ui.helper).offset();
                        y = pos.top - parentOffset.top;
                    }
                    var x = pos.left - parentOffset.left;

                    var relativeX = x / imageWidth;
                    var relativeY = y / imageHeight;
                    var fieldId = location.fieldId ? location.fieldId() : location.fieldGuid();
                    if (event.ctrlKey && !bindingContext.$root.vm.config.isDownloadable) {
                        var relativeWidth = $(element).width() * (bindingContext.$root.originalPageWidth / bindingContext.$root.pageImageWidth);
                        var relativeHeight = $(element).height() * ((bindingContext.$root.originalPage * bindingContext.$root.heightWidthRatio) / (bindingContext.$root.pageImageWidth * bindingContext.$root.heightWidthRatio));
                        if ((location.dirtyFlag && location.dirtyFlag().isDirty()) || (field.dirtyFlag && field.dirtyFlag().isDirty())) return;
                        bindingContext.$root.vm.addField(fieldId, pageNum, relativeX, relativeY, relativeHeight, relativeWidth, false, field.name());
                    } else {
                        location.locationX(relativeX);
                        location.locationY(relativeY);
                        location.page(pageNum);
                        //location.locationWidth($(element).width());
                        //location.locationHeight($(element).height());
                        bindingContext.$root.vm.updateFieldLocation(location);
                    }
                },
                start: function (event, ui) {
                    $(".toolTip").tooltip('hide');
                    $(".toolTip").tooltip('disable');
                    if ($(event.originalEvent.target).hasClass('text_area_toolbar') || $(event.originalEvent.target).parents('.text_area_toolbar').length > 0) {
                        return $(event.originalEvent.target).hasClass("ta_move");
                    }
                },
                revert: function () {
                    if (droppableShouldCancel) {
                        droppableShouldCancel = false;
                        return true;
                    } else {
                        return false;
                    }
                }
            });
            $(element).droppable({
                tolerance: "touch",
                over: function () {
                    droppableShouldCancel = true;
                },
                out: function () {
                    droppableShouldCancel = false;
                }
            });
        }
    };
    
    ko.bindingHandlers.dragField = {
        init: function (element, valueAccessor) {
            $(element).draggable({
                scroll: false,
                appendTo: 'body',
                revert: false,
                zIndex: 2700,
                cursor: "move",
                cursorAt: { left: 0 },
               // containment: ".doc-page",
                helper: function (event) {
                    switch (event.currentTarget.attributes['fieldType'].value) {
                        case "1":
                            return $("<div class='tool_field_helper' style='width:138px;height:46px'>" + $(this).attr("drag-helpertext") + "</div>");
                        default:
                            return $("<div class='tool_field_helper' style='width:205px;'>" + $(this).attr("drag-helpertext") + "</div>");
                    }
                    
                    
                },
                grid: [1, 1],
                cancel: false,
                start: function (event, ui) {
                    $(".toolTip").tooltip('hide');
                    $(".toolTip").tooltip('disable');
                },
                stop: function(event, ui) {
                    $(".toolTip").tooltip('enable');
                }
            });
        }
    };

    var resizeField = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        if ($(element).data('uiResizable') != null) {
            $(element).resizable("destroy");
        }
        var valueUnwrapped = ko.utils.unwrapObservable(valueAccessor());
        if (valueUnwrapped.enable != null && !valueUnwrapped.enable) return;
        var location = ko.dataFor(element);
        var field = ko.contextFor(element).$parents[1];
        //var pageImageHeight = $("#pages-container #" + bindingContext.$root.docViewerId + "-img-" + location.page() + ".page-image").height();
        if (location.locked != null && location.locked()) return;
        var page = $(element).closest(".doc-page");
        var overlaps = (function () {
            function getPositions(elem) {
                var pos = $(elem).position();
                var width = $(elem).width();
                var height = $(elem).height();
                var top = pos.top;
                var left = pos.left;
                return [[left, left + width], [top, top + height]];
            }
            function comparePositions(p1, p2) {
                var r1 = p1[0] < p2[0] ? p1 : p2;
                var r2 = p1[0] < p2[0] ? p2 : p1;
                return r1[1] > r2[0] || r1[0] === r2[0];
            }
            return function (a, b) {
                var pos1 = getPositions(a),
                    pos2 = getPositions(b);
                return comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);
            };
        })();
        var resizeOptions = {
            stop: function (event, ui) {
                var fields = page.find(".signature_doc_field").not(this);
                var isOverlap = false;
                fields.each(function (i, val) {
                    if (overlaps(val, ui.helper)) {
                        bindingContext.$root.vm.config.alert({ title: "Error", message: "Locations should not be overlapped" });
                        isOverlap = true;
                        return false;
                    }
                });
                if (isOverlap) {
                    $(this).css({ 'width': ui.originalSize.width + 'px' });
                    $(this).css({ 'height': ui.originalSize.height + 'px' });
                    return false;
                }

                var pageImageWidth = $("#pages-container #" + bindingContext.$root.docViewerId + "-img-" + location.page() + ".page-image").width();
                var pageImageHeight = ko.utils.unwrapObservable(bindingContext.$root.pageHeight);
                if (pageImageWidth * location.locationX() + ui.size.width > pageImageWidth) {
                    $(this).css({ 'width': ui.originalSize.width + 'px' });
                    return false;
                }
                if (pageImageHeight * location.locationY() + ui.size.height >= pageImageHeight) {
                    $(this).css({ 'height': ui.originalSize.height + 'px' });
                    return false;
                }

                //location.locationWidth(ui.size.width / bindingContext.$root.scale());
                //location.locationHeight(ui.size.height / bindingContext.$root.scale());
                var relativeWidth = (ui.size.width * (bindingContext.$root.originalPageWidth / bindingContext.$root.pageImageWidth)) / bindingContext.$root.scale();
                var relativeHeight = (ui.size.height * ((bindingContext.$root.originalPageWidth * bindingContext.$root.heightWidthRatio) / (bindingContext.$root.pageImageWidth * bindingContext.$root.heightWidthRatio))) / bindingContext.$root.scale();
                location.locationWidth(relativeWidth);
                location.locationHeight(relativeHeight);
                bindingContext.$root.vm.updateFieldLocation(location);
                $(".toolTip").tooltip('enable');
            },
            start: function(event, ui) {
                $(".toolTip").tooltip('hide');
                $(".toolTip").tooltip('disable');
            },
            resize: function (e, ui) {
                var pageImageWidth = $("#pages-container #" + bindingContext.$root.docViewerId + "-img-" + location.page() + ".page-image").width();
                var pageImageHeight = ko.utils.unwrapObservable(bindingContext.$root.pageHeight);

                var directionRight = ui.originalSize.width < ui.size.width;
                if (directionRight && (pageImageWidth * location.locationX() + ui.size.width >= pageImageWidth - 5))
                    $(this).resizable('widget').trigger('mouseup');

                var directionDown = ui.originalSize.height < ui.size.height;
                if (directionDown && (pageImageHeight * location.locationY() + ui.size.height >= pageImageHeight - 5))
                    $(this).resizable('widget').trigger('mouseup');
            }
        };
        var signatureField = ko.utils.arrayFirst(ko.contextFor(element).$parents[2].signatureFields(), function(item) {
            return item.fieldType() == field.fieldType();
        });
        resizeOptions.minHeight = signatureField != null ? signatureField.minGraphSizeH() : 30;
        resizeOptions.minWidth = signatureField != null ? signatureField.minGraphSizeW() : 90;
        switch (parseInt(field.fieldType())) {
        case 1:
            //signature
            resizeOptions.aspectRatio = 3;
            break;
        case 6:
            //checkbox
            resizeOptions.aspectRatio = 1;
            break;
        default:
            break;
        }
        //resizeOptions.containment = ".doc-page";
        $(element).resizable(resizeOptions);
    };
    ko.bindingHandlers.resizeField = {
        update: resizeField,
        init: resizeField
    };
    
    ko.bindingHandlers.dateString = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            requirejs(['core/utils'], function(utils) {

                var value = valueAccessor(), allBindings = allBindingsAccessor();
                var valueUnwrapped = ko.utils.unwrapObservable(value);
                var pattern = allBindings.datePattern || 'MM/dd/yyyy';
                try {
                    $(element).text(utils.dateFromIso(valueUnwrapped,pattern));
                } catch(e) {
                    $(element).text("---");
                } 
            });
            
        }
    };
    
    ko.bindingHandlers.fieldSettingsToolbar = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var location = ko.dataFor(element);
            var field = ko.contextFor(element).$parents[1];
            $(element).find(".dropdown_menu_button").click(function (event) {
                var button = $(".dropdown_menu_button.active");
                $(button).next(".dropdown_menu").hide();

                if ($(this).hasClass("active")) {
                    $(this).next(".dropdown_menu").hide('blind', 'fast');
                    $(this).removeClass("active");
                } else {
                    $(this).addClass('active');
                    $(this).next(".dropdown_menu").show('blind', 'fast');
                }
                $(".toolTip").tooltip('hide');
                return false;
            });
            if (field.fieldType() == 1) {
                $(element).css("width", "60px").addClass("small-toolbar");
            } else if (field.fieldType() == 6) {
                $(element).css("width", "93px").addClass("small-toolbar");
            } else if (field.fieldType() == 8) {
                $(element).css("width", "60px").addClass("small-toolbar");
            }            //$(element).find(".font_size").delegate("li", "click", function () {
            //    var size = ko.dataFor(this);
            //    location.fontSize(size);
            //});
            $(element).find(".ta_plus").click(function () {
                var fontSizes = bindingContext.$root.vm.config.fontSizes;
                var maxFontSize = Math.max.apply(null, fontSizes);
                if (location.fontSize() < maxFontSize)
                    location.fontSize(location.fontSize() + 1);
            });
            $(element).find(".ta_minus").click(function () {
                var fontSizes = bindingContext.$root.vm.config.fontSizes;
                var minFontSize = Math.min.apply(null, fontSizes);
                if (location.fontSize() > minFontSize)
                    location.fontSize(location.fontSize() - 1);
            });
           // $(element).find(".font_name").delegate("li", "click", function () {
           //     var name = ko.dataFor(this);
           //     location.fontName(name);
           // });
            //$(element).find(".font_color").delegate("li", "click", function () {
            //    var name = ko.dataFor(this);
            //    location.fontColor(name);
            //});

        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            
            if ($(element).is(':visible')) {
                $(element).parents(".field_in_document").tooltip('enable');
            } else {
                $(element).parents(".field_in_document").tooltip('hide');
                $(element).parents(".field_in_document").tooltip('disable');
            }
        }
    };
    
    var datePickerIsOpen = false;
    var moveInViewportScrollDuration = 200;
    ko.bindingHandlers.datePicker = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var valueUnwrapped = ko.utils.unwrapObservable(valueAccessor());
            var field = ko.contextFor(element).$parents[1];
            if (field)
                field.settings().showMonthYearDropdowns();
            var minYear = field &&  field.settings() != null && field.settings().minYear() != null ? field.settings().minYear() : "c-99";
            var maxYear = field &&  field.settings() != null && field.settings().minYear() != null ? field.settings().maxYear() : "c+30";
            var options = {
                dateFormat: "dd.mm.yy",
                changeMonth: field && field.settings() != null && field.settings().showMonthYearDropdowns() != null ? field.settings().showMonthYearDropdowns() : true,
                changeYear: field && field.settings() != null && field.settings().showMonthYearDropdowns() != null ? field.settings().showMonthYearDropdowns() : true,
                yearRange: minYear + ":" + maxYear,
                maxDate: new Date(maxYear, 11, 31),
                minDate: new Date(minYear, 0, 1),
                beforeShow: function (inp, obj) {
                    $(element).tooltip('hide');
                    $(element).tooltip('disable');
                    var height = $(inp).height() + 2;
                    setTimeout(function() {
                        $(obj.dpDiv).css({ left: '0px', top: height + 'px' });
                    }, 0);
                    $(inp).after(obj.dpDiv);
                    setTimeout(function () {
                        datePickerIsOpen = true;
                    }, moveInViewportScrollDuration);
                    
                },
                onClose: function() {
                    $(element).tooltip('enable');
                    datePickerIsOpen = false;
                }
            };
            if (valueUnwrapped.dateFormat != null) options.dateFormat = ko.utils.unwrapObservable(valueUnwrapped.dateFormat);
            $(element).datepicker(options).click(function () {
                if (!($.browser.msie && $.browser.version=="8.0"))
                    $(element).datepicker("show");
            }).keyup(function (e) {
                if (e.keyCode == 8 || e.keyCode == 46) {
                    $.datepicker._clearDate(this);
                }
            });
            $(".fod_icon_date").click(function () {
                if (($.browser.msie && $.browser.version == "8.0"))
                    $(element).next(".ui-datepicker").toggle();
            });
        }
    };
   
    ko.bindingHandlers.fieldCheckbox = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var field = ko.contextFor(element).$parents[1];
            
            $(element).addClass(field.data() == 'on' ? "checked" : "unchecked");
            $(element).addClass("checkbox"+field.id());
            $(element).click(function () {
                if (field.data() == null) return;
                $(element).toggleClass("unchecked");
                $(element).toggleClass("checked");
                if (field.data() == 'on') {
                    field.data('off');
                } else {
                    field.data('on');
                    if (field.groupName() && field.groupName() != '') {
                        var allFields = ko.contextFor(element).$parentContext.$parentContext.$parents[0].fields();
                        var signDocument = ko.contextFor(element).$parentContext.$parentContext.$parents[0].signDocument();
                        var documentId, documentFields;
                        if (signDocument.documentId) {
                            documentId = signDocument.documentId();
                            documentFields = ko.utils.arrayFilter(allFields, function (fld) {
                                return fld.locations() && fld.locations()[0] && fld.locations()[0].documentId() == documentId;
                            });
                        } else {
                            documentId = signDocument.documentGuid();
                            documentFields = ko.utils.arrayFilter(allFields, function (fld) {
                                return fld.locations() && fld.locations()[0] && fld.locations()[0].documentGuid() == documentId;
                            });
                        }
                        ko.utils.arrayForEach(documentFields, function (fld) {
                            if (fld.id() != field.id() && fld.groupName() == field.groupName() && fld.data() == 'on' && (fld.recipientId== null || fld.recipientId()==field.recipientId() ) ) {
                                var resetCheckbox = $(".checkbox" + fld.id());
                                resetCheckbox.toggleClass("unchecked");
                                resetCheckbox.toggleClass("checked");
                                fld.data('off');
                                resetCheckbox.trigger('change');
                            }
                        });
                    }
                }
                $(this).trigger('change');
            });
        }
    };
    
    ko.bindingHandlers.sortableList = {
        init: function (element, valueAccessor,allBindingsAccessor, viewModel) {
            $(element).sortable({
                update: function (event, ui) {
                    var list = valueAccessor();
                    //retrieve our actual data item
                    var item = ko.dataFor(ui.item.get(0));
                    //figure out its new position
                    var position = ko.utils.arrayIndexOf(ui.item.parent().children(":visible"), ui.item[0]);
                    //remove the item and add it back in the right spot
                    if (position >= 0) {
                        list.remove(item);
                        list.splice(position, 0, item);
                    }
                    if (typeof(item.dirtyFlag) == "function")
                        item.dirtyFlag().forceDirty();
                    ui.item.remove();
                    $(window).resize();
                },
                opacity: 0.5,
                scroll: false,
                handle: ".dots",
                appendTo: 'body',
                helper: 'clone',
                start: function (e, u) {
                    u.placeholder.css("height", u.item.css("height").replace("px", "") *0.25 + "px");
                }
            });
            $(element).mousedown(function() {
                $(".toolTip").tooltip('hide');
                $(".toolTip").tooltip('disable');
            });
            $(element).mouseup(function () {
                $(".toolTip").tooltip('enable');
            });
        }
    };

    ko.bindingHandlers.reorderList = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            $(element).sortable({
                update: function (event, ui) {
                    var value = ko.utils.unwrapObservable(valueAccessor());
                    //retrieve our actual data item
                    var item = ko.dataFor(ui.item.get(0));
                    //figure out its new position
                    var position = ko.utils.arrayIndexOf(ui.item.parent().children(":visible"), ui.item[0]);
                    if (value.updateFunction != null) {
                        value.updateFunction(item, position);
                    }
                },
                opacity: 0.5,
                scroll: false,
                handle: ".dots",
                appendTo: 'body',
                helper: 'clone',
                start: function (e, u) {
                    u.placeholder.css("height", u.item.css("height").replace("px", "") * 0.25 + "px");
                }
            });
            $(element).mousedown(function () {
                $(".toolTip").tooltip('hide');
                $(".toolTip").tooltip('disable');
            });
            $(element).mouseup(function () {
                $(".toolTip").tooltip('enable');
            });
        }
    };

    ko.bindingHandlers.selectedCheckbox = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            $(element).click(function() {
                var item = ko.dataFor(element);
                item.selected(!item.selected());
                if (item.selected()) {
                    $(this).removeClass("unchecked");
                    $(this).addClass("checked");
                } else {
                    $(this).addClass("unchecked");
                    $(this).removeClass("checked");
                }
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var item = ko.dataFor(element);
            if (item.selected()) {
                $(element).removeClass("unchecked");
                $(element).addClass("checked");
            } else {
                $(element).addClass("unchecked");
                $(element).removeClass("checked");
            }
        }
    };

    ko.bindingHandlers.fieldTooltipText = {
        update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var field = ko.contextFor(element).$parents[1];
            var isOwn = bindingContext.$root.vm.isOwnField(field);
            var viewerAction = ko.utils.unwrapObservable(bindingContext.$root.vm.viewerAction);
            if (viewerAction == 'prepare') {
                $(element).attr('data-original-title', field.name() + (field.tooltip() != '' && field.tooltip() != field.name() ? ' ' + field.tooltip() : ''));
            } else {
                if (isOwn) {
                    if (field.dirtyFlag().isDirty() && !field.data.isValid()) {
                        $(element).attr('data-original-title', field.data.error);
                    } else
                        $(element).attr('data-original-title', field.name() + (field.tooltip() != '' && field.tooltip() != field.name() ? ' ' + field.tooltip() : ''));
                    if (field.mandatory())
                        $(element).attr('data-mandatory', field.mandatory());
                } else {
                    if (bindingContext.$root.vm.getRecipientNameById!=null)
                        $(element).attr('data-original-title', 'Field for ' + bindingContext.$root.vm.getRecipientNameById(field.recipientId()));
                }
            }
        }
    };

    ko.bindingHandlers.enableSign = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = valueAccessor(), allBindings = allBindingsAccessor();
            var valueUnwrapped = ko.utils.unwrapObservable(value);
            var fieldsLeft = valueUnwrapped.fieldsLeft;
            var app = valueUnwrapped.app;
            var recipientStatus = valueUnwrapped.recipientStatus != null ? valueUnwrapped.recipientStatus : 0;
            if (fieldsLeft == 0 && recipientStatus == 1) {
                $(element).attr("data-original-title", "Click to sign the "+app);
                $(element).removeClass('disabled');
            }
            else {            
                if (recipientStatus == 4)
                    $(element).attr("data-original-title", "Recipient already signed");
                else {
                    if (fieldsLeft > 0) {
                        $(element).attr("data-original-title", "<span class='edit_invalid_field' style='color: white; cursor: pointer; text-decoration: underline'>Please complete the remaining " + fieldsLeft + " required " + (fieldsLeft == 1 ? " field" : " fields</span"));
                    }
                }
                $(element).addClass('disabled');
            }
        }
    };
    
    ko.bindingHandlers.moveInViewport = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var location = ko.dataFor(element);
            if (!location || !location.selected()) return;
            var page = $(element).closest(".doc-page");
            var wrapper = $(page).closest(".signature-viewer").parent();
            var center = $(wrapper).height() / 2;
            var $targetField = $(element).parent();
            if ($targetField.length == 0) return;
            if (datePickerIsOpen) return;
            var targetFieldPosition = $targetField.position();

            if (bindingContext.$root.vm.config.isDownloadable) {
                var yPos = targetFieldPosition.top + $targetField.height() / 2;
                var topPos = yPos + page.position().top;
                var targetScrollTopPos = topPos - center;
                if (topPos > center)
                    $(wrapper).stop(true, true).animate({ scrollTop: targetScrollTopPos }, { duration: moveInViewportScrollDuration });
                else
                    $(wrapper).stop(true, true).animate({ scrollTop: 0 }, { duration: moveInViewportScrollDuration });
            } else {
                var $nextLink = $("#next_field_marker");
                var imageOffset = $(".page-image", page).offset();
                var imageWidth = ko.utils.unwrapObservable(bindingContext.$root.pageWidth);
                var nextLinkX = imageOffset.left + imageWidth - $nextLink.width() / 2;
                $nextLink.css("left", nextLinkX + "px");

                var y = targetFieldPosition.top + $targetField.height() / 2 - $nextLink.height() / 2;
                var top = y + page.position().top;
                var targetScrollTop = top - center;

                var showNextLink = function() {
                    var $activeInput = $(document.activeElement);
                    var $targetInput = $("input,textarea,select", $targetField);
                    if ($activeInput.length > 0 && $targetInput.length > 0 && $activeInput[0] !== $targetInput[0]) {
                        $activeInput.blur();
                        $targetInput.focus();
                    }
                    if ($targetInput.length == 0) $activeInput.blur();

                    var targetFieldOffset = $targetField.offset();

                    var y1 = targetFieldOffset.top + $targetField.height() / 2 - $nextLink.height() / 2;
                    $nextLink.css({ top: y1 + "px" }).show();

                    $nextLink.unbind('click');
                    if (bindingContext.$root.vm.hasNextLocation()) {
                        $nextLink.removeClass('embed_next_field_empty');
                        if (!$nextLink.hasClass("embed_next_field"))
                            $nextLink.addClass("embed_next_field");
                        $nextLink.click(function() {
                            bindingContext.$root.vm.activateNextLocation();
                            return false;
                        });
                    } else {
                        $nextLink.addClass('embed_next_field_empty');
                        $nextLink.removeClass('embed_next_field');
                        $nextLink.click(function() {
                            $(".sign_envelope").tooltip('show');
                            return false;
                        });

                    }
                };
                if (top > center)
                    $(wrapper).stop(true, true).animate({ scrollTop: targetScrollTop }, { duration: moveInViewportScrollDuration, complete: showNextLink });
                else
                    $(wrapper).stop(true, true).animate({ scrollTop: 0 }, { duration: moveInViewportScrollDuration, complete: showNextLink });
            }
        }
    };

    ko.bindingHandlers.textFill = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

            var valueUnwrapped = ko.utils.unwrapObservable(valueAccessor());
            var maxFontSize = 60;
            if (typeof (valueUnwrapped) != "undefined" && valueUnwrapped.maxFontSize != null) maxFontSize = valueUnwrapped.maxFontSize;
            if (typeof (valueUnwrapped) == "boolean" && !valueUnwrapped) return;
            var $element = $(element);
            var parent = $element.parent();
            if (bindingContext.$root.matchWidth()) {
                $(parent).css('width', '228px');
                var elementWidth = $element.width() || 1;
                
                var maxWidth;
                if ($element.css('fontFamily').indexOf('Herr Von Muellerhoff') > -1 ||
                    $element.css('fontFamily').indexOf('Tangerine') > -1 ||
                    $element.css('fontFamily').indexOf('Kristi') > -1)
                    maxWidth = parent.width() - 20;
                else
                    maxWidth = parent.width();
                var fontSizeWidth = parseInt($element.css("fontSize"), 10),
                    multiplierWidth = maxWidth / elementWidth,
                    newSizeWidth = fontSizeWidth * multiplierWidth;
                $element.css(
                    "fontSize",
                    (maxFontSize > 0 && newSizeWidth > maxFontSize) ?
                    maxFontSize :
                        newSizeWidth
                );
            } else {
                var elementHeight = $element.height() || 1;
                var padding = 3;
                if ($element.css('fontFamily').indexOf('Herr Von Muellerhoff') > -1 ||
                    $element.css('fontFamily').indexOf('Tangerine') > -1 ||
                    $element.css('fontFamily').indexOf('Kristi') > -1 ||
                    $element.css('fontFamily').indexOf('Homemade Apple') > -1 ||
                    $element.css('fontFamily').indexOf('Lobster') > -1)
                    padding = 20;
                if ($element.css('fontFamily').indexOf('Calligraffitti') > -1)
                    padding = 30;
                var fontSize = parseInt($element.css("fontSize"), 10),
                    multiplier = parent.height() / elementHeight,
                    newSize = fontSize * multiplier;
                $element.css(
                    "fontSize",
                    (maxFontSize > 0 && newSize > maxFontSize) ?
                        maxFontSize :
                        newSize
                ).css('padding-left', padding).css('padding-right', padding);
            }
        }
    };

    ko.bindingHandlers.signaturesCarousel = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            $(element).bind('mousemove', function(e) {
                var itemToMove = $(this).closest(".signature-carousel-container").children().first();
                var coorX = e.pageX - $(this).closest(".signature-carousel-container").offset().left;
                var maxWidth = 0;
                $(this).parent().find(".signature-carousel").each(function () {
                    if (this.scrollWidth > maxWidth) maxWidth = this.scrollWidth;
                });
                var maxOffset = maxWidth - $(this).closest(".signature-carousel-container").width();
                var animationSpeed = 600;
                $(itemToMove).stop();
                if (coorX < 61) {
                    animationSpeed = -(parseInt($(itemToMove).css('margin-left')));
                    $(itemToMove).stop(true, true).animate({ 'margin-left': '0' }, animationSpeed);
                }
                if (coorX > 507) {
                    animationSpeed = maxOffset + parseInt($(this).css('margin-left'));
                    $(itemToMove).stop(true, true).animate({ 'margin-left': -maxOffset }, animationSpeed);
                }
                e.preventDefault();
            })
            .bind('mouseleave', function(e) {
                $(this).stop();
            });

            var startX, startMargin;
            $(element).bind('touchstart', function (event) {
                startX = event.originalEvent.touches[0].pageX;
                var itemToMove = $(this).closest(".signature-carousel-container").children().first();
                startMargin = parseInt($(itemToMove).css('margin-left'));
            });
            $(element).bind('touchmove', function (event) {
                var maxWidth = 0;
                $(this).parent().find(".signature-carousel").each(function () {
                    if (this.scrollWidth > maxWidth) maxWidth = this.scrollWidth;
                });
                var maxOffset = maxWidth - $(this).closest(".signature-carousel-container").width();
                var coorX = event.originalEvent.touches[0].pageX;
                if (startMargin - (startX - coorX) <= 0 && startMargin - (startX - coorX) >= -(maxOffset))
                    $(this).css('margin-left', startMargin - ( startX-coorX));
                event.preventDefault();
            });

            $(element).closest('.modal-body').bind('keyup', function (event) {
                var lastItem = $(element).find(".signature-carousel .signature-carousel-item").last();
                if (lastItem.offset().left < 0) {
                    $(element).css('margin-left', 0);
                }
            });
        }
    };

    ko.bindingHandlers.signatureCreateDialog = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            $(element).find('.popexpand').click(function (e) {
                var collapsedWidth = 264;
                var collapsedHeight = 88;
                var expandedWidth = 497;
                var expandedHeight = 165;
                var padCanvas;
                if ($(element).hasClass('expanded')) {
                    $(element).removeClass('expanded');
                    $("#signature-draw-container-" + viewModel.padIndex()).css("width", collapsedWidth + "px").css("height", collapsedHeight + "px").css("margin-top", "20px");
                    $("#signature-draw-container-" + viewModel.padIndex() + " svg.pad").attr("width", collapsedWidth).attr("height", collapsedHeight);
                    $(element).find("#signatureUpload" + viewModel.padIndex() + " .image-container, #signatureUpload" + viewModel.padIndex() + " .image-container img").css("width", collapsedWidth + "px").css("height", collapsedHeight + "px");
                    $("#signatureType" + viewModel.padIndex()+ " .signature-types:first").css("height", "88px");
                    $("#signatureMy" + viewModel.padIndex() + " .signature-types:first").css("height", "110px");

                    $(element).find("#signature-pad-" + viewModel.padIndex()).css("width", collapsedWidth + "px").css("height", collapsedHeight + "px");
                    padCanvas = $(element).find("#signature-pad-" + viewModel.padIndex() + " canvas");
                    if (padCanvas.length > 0) {
                        padCanvas.attr("width", collapsedWidth).attr("height", collapsedHeight).css("width", collapsedWidth + "px").css("height", collapsedHeight + "px");
                        //padCanvas[0].getContext("2d")._resize(collapsedWidth, collapsedHeight);
                    }
                } else {
                    $(element).addClass('expanded');
                    $("#signature-draw-container-" + viewModel.padIndex()).css("width", expandedWidth + "px").css("height", expandedHeight + "px").css("margin-top", "35px");
                    $("#signature-draw-container-" + viewModel.padIndex() + " svg.pad").attr("width", expandedWidth).attr("height", expandedHeight);
                    $(element).find("#signatureUpload" + viewModel.padIndex() + " .image-container, #signatureUpload" + viewModel.padIndex()+ " .image-container img").css("width", expandedWidth + "px").css("height", expandedHeight + "px");
                    $("#signatureType" + viewModel.padIndex() + " .signature-types:first").css("height", "176px");
                    $("#signatureMy" + viewModel.padIndex() + " .signature-types:first").css("height", "230px");

                    $(element).find("#signature-pad-" + viewModel.padIndex()).css("width", expandedWidth + "px").css("height", expandedHeight + "px");
                    padCanvas = $(element).find("#signature-pad-" + viewModel.padIndex() + " canvas:visible");
                    if (padCanvas.length > 0) {
                        padCanvas.attr("width", expandedWidth).attr("height", expandedHeight).css("width", expandedWidth + "px").css("height", expandedHeight + "px");
                        padCanvas[0].getContext("2d")._resize(expandedWidth, expandedHeight);
                    }
                }
                viewModel.expanded($(element).hasClass('expanded'));
            });
        }
    };

    ko.bindingHandlers.clearUploaded = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var val = ko.utils.unwrapObservable(valueAccessor());
            if (!val) return;
            var $el = $(element);
            var id = $el.attr("id");
            if (!$el.attr("src") || $el.attr("src") == "") return;
            var imgUrl = $el.attr("src");
            var canvasId = id + "-canvas";
            var $canvas = $("#"+canvasId);
            var imageWidth = $el.width();
            var imageHeight = $el.height();
            if ($canvas.length == 0) {
                $("<canvas />").attr("id", canvasId)
                    .attr("width", imageWidth)
                    .attr("height", imageHeight)
                    .insertAfter($el);
                $canvas = $("#" + canvasId);
            }
            var canvas = $canvas[0];
            var context = canvas.getContext("2d");
            var binaryEroder = function(data) {
                for (var x = 0; x < data.width; x++) {
                    for (var y = 0; y < data.height; y++) {
                        var i = x * 4 + y * 4 * data.width;
                        var luma = Math.floor(data.data[i] * 299 / 1000 +
                            data.data[i + 1] * 587 / 1000 +
                            data.data[i + 2] * 114 / 1000);

                        data.data[i] = luma;
                        data.data[i + 1] = luma;
                        data.data[i + 2] = luma;
                        data.data[i + 3] = 255;
                    }
                }
            };
            var img = new Image();
            img.onload = function() {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage($el[0], 0, 0, canvas.width, canvas.height);
                var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                binaryEroder(imageData);
                context.putImageData(imageData, 0, 0);
            };
            img.src = imgUrl;
            //console.log("Processing image "+id+" with dimensions "+imageWidth+"x"+imageHeight);
        }
    };
    
    ko.bindingHandlers.popover = {
        update: function (element, valueAccessor, allBindingsAccessor) {
            $(element).popover({
                trigger: 'click',
                container: false,
                template: '<div class="popover popover-additional"><div class="arrow"></div><div class="popover-inner"><div class="popover-content"><p></p></div></div></div>'
            });
            $(element).click(function () {
                $("[rel='popover']").not(this).popover('hide');
            });
        }
    };

    ko.bindingHandlers.fieldToken = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var accessor = valueAccessor();
            $(element).val(ko.utils.unwrapObservable(accessor.value()));
            $(element).parent().delegate('input[type="hidden"]', 'change', function (e) {
                var value = $(e.delegateTarget).find('input[type="hidden"]').val();
                accessor.value(value);
            });
            var settings = {};
            if (accessor.regex) 
                settings.regex = accessor.regex;
            if (accessor.unique)
                settings.unique = accessor.unique;
            $(element).tokenField(settings);        
        }
    };

    ko.bindingHandlers.svgFieldCheckbox = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var field = ko.contextFor(element).$parents[1];
            var location = ko.dataFor(element);
            $(element).addClass("checkbox" + field.id());
            $(element).find("svg>path").css("fill", location.fontColor()!='' ? location.fontColor() : "#000000");
            $(element).click(function () {
                if (field.data() == null) return;
                if (field.data() == 'on') {
                    field.data('off');
                } else {
                    field.data('on');
                    if (field.groupName() && field.groupName() != '') {
                        var allFields = ko.contextFor(element).$parentContext.$parentContext.$parents[0].fields();
                        var signDocument = ko.contextFor(element).$parentContext.$parentContext.$parents[0].signDocument();
                        var documentId, documentFields;
                        if (signDocument.documentId) {
                            documentId = signDocument.documentId();
                            documentFields = ko.utils.arrayFilter(allFields, function (fld) {
                                return fld.locations() && fld.locations()[0] && fld.locations()[0].documentId() == documentId;
                            });
                        } else {
                            documentId = signDocument.documentGuid();
                            documentFields = ko.utils.arrayFilter(allFields, function (fld) {
                                return fld.locations() && fld.locations()[0] && fld.locations()[0].documentGuid() == documentId;
                            });
                        }
                        ko.utils.arrayForEach(documentFields, function (fld) {
                            if (fld.id() != field.id() && fld.groupName() == field.groupName()  && (fld.recipientId == null || fld.recipientId() == field.recipientId())) {
                                var resetCheckbox = $(".checkbox" + fld.id());
                                if (fld.data() == 'on' || fld.data() == '') {
                                    fld.data('off');
                                    resetCheckbox.trigger('change');
                                }
                            }
                        });
                    }
                }
                $(this).trigger('change');
            });
        }
    };
    ko.bindingHandlers.bindChildren = {
        init: function (element, valueAcessor, allBindings, vm, bindingContext) {
            //bind children first
            ko.applyBindingsToDescendants(bindingContext, element);

            //tell KO not to bind the children itself
            return { controlsDescendantBindings: true };
        }
    };

    ko.bindingHandlers.ckEditor = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var txtBoxId = $(element).attr("id");            
            // handle disposal (if KO removes by the template binding)
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                if (CKEDITOR.instances[txtBoxId]) {
                    CKEDITOR.remove(CKEDITOR.instances[txtBoxId]);
                }
            });
            CKEDITOR.replace(txtBoxId,{
                fullPage: true,
                allowedContent: true
            });
            CKEDITOR.instances[txtBoxId].on('blur', function () {
                var observable = valueAccessor();
                observable($('<div/>').text(CKEDITOR.instances[txtBoxId].getData()).html());
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var txtBoxId = $(element).attr("id");
            var val = ko.utils.unwrapObservable(valueAccessor());
            CKEDITOR.instances[txtBoxId].setData($('<div/>').html(val).text());
        }
    }

    ko.bindingHandlers.svgDisplayInserted = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var val = ko.utils.unwrapObservable(valueAccessor());
            if (val) {
                $("[compare-class='added']").show();
            } else {
                $("[compare-class='added']").hide();
            }
        }
    };

    ko.bindingHandlers.svgTransform = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var $container = $(element);
            var svgGroup = $("g", element)[0];
            $(svgGroup).attr("transform", viewModel.transformMatrix());
            
            if (viewModel.svgDisplayInserted()) {
                $("[compare-class='added']", $container).show();
            } else {
                $("[compare-class='added']", $container).hide();
            }

            if (viewModel.svgDisplayDeleted()) {
                $("[compare-class='deleted']", $container).show();
            } else {
                $("[compare-class='deleted']", $container).hide();
            }
        }
    };

    ko.bindingHandlers.svgDocument = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var val = ko.utils.unwrapObservable(valueAccessor());
            if (val !== '') {
                $(element).html(val);
                var $svg = $("svg", element);
                $svg.css("width", "100%").css("height", "100%");
                var manager = viewModel.svgManager;

                var previousX;
                var previousY;
                
                $svg.bind("mousewheel", function(e) {
                    var delta = e.originalEvent.wheelDelta / 60;
                    manager.svgZoom(manager.svgZoom() + delta);
                    e.preventDefault();
                }).bind("mousedown", function(e) {
                    e.preventDefault();
                    previousX = e.clientX;
                    previousY = e.clientY;
                }).bind("mousemove", function(e) {
                    if (e.which==1) {
                        e.preventDefault();
                        var deltaX = (e.clientX - previousX);
                        var deltaY = (e.clientY - previousY);
                        manager.svgTranslate(deltaX, deltaY);
                        previousX = e.clientX;
                        previousY = e.clientY;
                    }
                });

                ko.applyBindingsToNode($svg[0], {
                    svgTransform: true,
                }, viewModel.svgManager);
            }
            return { controlsDescendantBindings: true };
        }
    };

    ko.bindingHandlers.updateLocationOnImageLoad = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            var location = value.location;
            $(element).on("load", function() {
                var relativeWidth = ($(this)[0].naturalWidth * (bindingContext.$root.originalPageWidth / bindingContext.$root.pageImageWidth)) / bindingContext.$root.scale();
                var relativeHeight = ($(this)[0].naturalHeight * ((bindingContext.$root.originalPageWidth * bindingContext.$root.heightWidthRatio) / (bindingContext.$root.pageImageWidth * bindingContext.$root.heightWidthRatio))) / bindingContext.$root.scale();
                location.locationWidth(relativeWidth);
                location.locationHeight(relativeHeight);
            });
        }
    };

    ko.bindingHandlers.localize = {
        init: function(element, valueAccessor, allBindingAcessors, viewModel) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            if (!value) {
                return;
            }
            var processingTheEvent = false;

            $(element).bind("DOMNodeInserted", function() {
                if (processingTheEvent === true) {
                    return;
                }
                processingTheEvent = true;
                var localizedStrings = viewModel.localization;
                if (localizedStrings != null) {
                    $(this).find("[data-localize],[data-localize-ph],[data-localize-tooltip],[data-localize-title]").each(function() {
                        var that = $(this);
                        var localizationKey = that.attr("data-localize");
                        var localizationTextValue;
                        if (localizationKey) {
                            localizationTextValue = localizedStrings[localizationKey];
                            that.text(localizationTextValue);
                            that.removeAttr("data-localize");
                        }
                        localizationKey = that.attr("data-localize-ph");
                        if (localizationKey) {
                            localizationTextValue = localizedStrings[localizationKey];
                            that.attr("placeholder", localizationTextValue);
                            that.removeAttr("data-localize-ph");
                        }
                        localizationKey = that.attr("data-localize-title");
                        if (localizationKey) {
                            localizationTextValue = localizedStrings[localizationKey];
                            that.attr("title", localizationTextValue);
                            that.removeAttr("data-localize-title");
                        }
                        localizationKey = that.attr("data-localize-tooltip");
                        if (localizationKey) {
                            localizationTextValue = localizedStrings[localizationKey];
                            that.attr("data-tooltip", localizationTextValue);
                            that.removeAttr("data-localize-tooltip");
                        }
                    });
                }

                processingTheEvent = false;
            });
        }
    };

    ko.bindingHandlers.fieldDropdown = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var field = ko.utils.unwrapObservable(valueAccessor());
            $(element).find("ul").delegate("li", "click", function () {
                field.data(ko.contextFor(this).$data);
                $(element).trigger('change');
            });
        }
    };
})(ko, jQuery);

; (function (ko, $, _) {

    ko.extenders.defaultIfNull = function (target, defaultValue) {
        target.subscribe(function (newValue) {
            if (newValue == '')
                target(defaultValue);
        });
        return target;
    };
    ko.extenders.noSpaces = function (target) {
        target.subscribe(function (newValue) {
            if (newValue && typeof(newValue) != "undefined")
                target(newValue.replace(/ /g,''));
        });
        return target;
    };
    
    ko.escapedObservable = function (initialValue) {
        var observableVal = ko.observable(_.escape(initialValue)),

        result = ko.computed({
            read: function () {
                return observableVal();
            },
            write: function (newValue) {
                if (newValue != null) {
                    observableVal(newValue.replace(/(<([^>]+)>)/ig, ""));
                }
                /*
                var value = _.unescape(newValue);
                observableVal(_.escape(value));
                */
            }
        });

        result.unescaped = ko.computed(function () {
            return _.unescape(observableVal());
        });

        return result;
    };
    ko.observableArray.fn.filterByProperty = function(propName, matchValue) {
        return ko.computed(function() {
            var allItems = this(), matchingItems = [];
            for (var i = 0; i < allItems.length; i++) {
                var current = allItems[i];
                if (current[propName]() === matchValue)
                    matchingItems.push(current);
            }
            return matchingItems;
        }, this);
    };

    ko.subscribable.fn.subscribeChanged = function (callback) {
        var oldValue;
        this.subscribe(function (_oldValue) {
            oldValue = _oldValue;
        }, this, 'beforeChange');

        this.subscribe(function (newValue) {
            callback(newValue, oldValue);
        });
    };
})(ko, jQuery, _);

// By: Hans Fjällemark and John Papa
// https://github.com/CodeSeven/KoLite
//
// Knockout.DirtyFlag
//
// John Papa 
//          http://johnpapa.net
//          http://twitter.com/@john_papa
//
// Depends on scripts:
//          Knockout 
//
//  Notes:
//          Special thanks to Steve Sanderson and Ryan Niemeyer for 
//          their influence and help.
//
//  Usage:      
//          To Setup Tracking, add this tracker property to your viewModel    
//              ===> viewModel.dirtyFlag = new ko.DirtyFlag(viewModel.model);
//
//          Hook these into your view ...
//              Did It Change?          
//              ===> viewModel.dirtyFlag().isDirty();
//
//          Hook this into your view model functions (ex: load, save) ...
//              Resync Changes
//              ===> viewModel.dirtyFlag().reset();
//
//          Optionally, you can pass your own hashFunction for state tracking.
//
////////////////////////////////////////////////////////////////////////////////////////
;(function (ko) {
        ko.DirtyFlag = function (objectToTrack, isInitiallyDirty, hashFunction) {

            hashFunction = hashFunction || ko.toJSON;

            var
                _objectToTrack = objectToTrack,
                _lastCleanState = ko.observable(hashFunction(_objectToTrack)),
                _isInitiallyDirty = ko.observable(isInitiallyDirty),

                result = function () {
                    var self = this;

                    self.forceDirty = function () {
                        _isInitiallyDirty(true);
                    };
                    
                    self.isDirty = ko.computed(function () {
                        return _isInitiallyDirty() || hashFunction(_objectToTrack) !== _lastCleanState();
                    });

                    self.reset = function () {
                        _lastCleanState(hashFunction(_objectToTrack));
                        _isInitiallyDirty(false);
                    };

                    return self;
                };
            
            return result;
        };
    })(ko);
/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);
(function ($) {
    $.confirm = function (params) {
        $("#confirm-modal").remove();

        var zIndex = "";
        if (params.zIndex != null) zIndex = "z-index: " + params.zIndex +";";

        var markup = [
            '<div class="modal fade modal2 " id="confirm-modal" tabindex="-1" style="'+ zIndex +' outline: none;">',
                '<div class="modal_inner_wrapper">',
                    params.showCloseButton==null || params.showCloseButton ? '<a class="popclose" data-dismiss="modal"></a>' : '',
                    '<div class="modal_header">',
                        '<h3>', params.title, '</h3>',
                    '</div>',
                    '<div class="modal_content">',
                        '<div class="modal_input_wrap_full">',
                            '<p class="modaltext left">', params.message, '</p>',
                        "</div>",
                    "</div>",
                    "<div class='modal_footer'>",
                        "<div class='modal_btn_wrapper'>",
                        params.showCheckbox != null && params.showCheckbox ? "<span class='checkbox unchecked'><input type='checkbox' class='checkbox'></span><span style='position: relative; top:10px;'>"+params.checkboxText+"</span>" : "",
                        "</div>",
                    '</div>',
                '</div>',
            "</div>"
        ].join('');

        $(markup).appendTo('body');

        $.each(params.buttons, function (name, obj) {
            if (!obj.action) {
                obj.action = function () {
                };
            }

            var cssClass = "";
            if (name === "Yes" || obj.isYes) cssClass = "red_button right";
            else if (name === "No" || obj.isNo) cssClass = "text_btn right";

            if (obj["class"]) {
                cssClass = obj["class"];
            }

            $("<a />")
                .addClass(cssClass)
                .attr("href", "#")
                .html(name)
                .click(function () {
                    var checked = undefined;
                    if (params.showCheckbox) {
                        checked = $(".modal_footer span.checkbox").hasClass("checked");
                    }
                    $.confirm.hide();
                    obj.action(checked);
                    return false;
                }).appendTo("#confirm-modal .modal_btn_wrapper");
        });
        if ( params.keyboard!=null )
            $("#confirm-modal").modal({ keyboard: params.keyboard });
        $("#confirm-modal").on("hide",function() {
            $(".modal-backdrop").remove();
            $("#confirm-modal").remove();
            if (params.onclose != null)
                params.onclose();
        }).modal("show");
        $(".modal_footer span.checkbox").click(function () {
            if ($(this).hasClass("unchecked")) {
                $(this).removeClass("unchecked");
                $(this).addClass("checked");
            } else {
                $(this).addClass("unchecked");
                $(this).removeClass("checked");
            }
        });
    };
    
    $.confirm.hide = function () {
        $("#confirm-modal").modal("hide");
    };
})(jQuery);
(function($, undefined) {
/*
    TrafficCop
    Author: Jim Cowart
    License: Dual licensed MIT (http://www.opensource.org/licenses/mit-license) & GPL (http://www.opensource.org/licenses/gpl-license)
    Version 0.3.0
*/

var inProgress = {};

$.trafficCop = function(url, options) {
    var reqOptions = url, key;
    if(arguments.length === 2) {
        reqOptions = $.extend(true, options, { url: url });
    }
    key = JSON.stringify(reqOptions);
    if (key in inProgress) {
        for (i in {success: 1, error: 1, complete: 1}) {
            inProgress[key][i](reqOptions[i]);
        }
    } else {
        inProgress[key] = $.ajax(reqOptions).always(function () { delete inProgress[key]; });
    }
    return inProgress[key];
};

})(jQuery);

(function($, global, undefined) {
/*
    infuser.js
    Author: Jim Cowart
    License: Dual licensed MIT (http://www.opensource.org/licenses/mit-license) & GPL (http://www.opensource.org/licenses/gpl-license)
    Version 0.2.0
*/
var hashStorage = {
    templates: {},

    storeTemplate: function(templateId, templateContent) {
        this.templates[templateId] = templateContent;
    },

    getTemplate: function(templateId) {
        return this.templates[templateId];
    },

    purge: function() {
        this.templates = {};
    }
};
var scriptStorage = {
    templateIds: [],
    storeTemplate: function(templateId, templateContent) {
        var node = document.getElementById(templateId);
        if(node === null) {
            this.templateIds.push(templateId);
            node = document.createElement("script");
            node.type = "text/html";
            node.id = templateId;
            document.body.appendChild(node);
        }
        node.text = templateContent;
    },

    getTemplate: function(templateId) {
        return document.getElementById(templateId);
    },

    purge: function() {
        for(var i = 0; i < this.templateIds.length; i++) {
            document.body.removeChild(document.getElementById(this.templateIds[i]));
        }
        this.templateIds = [];
    }
};
var errorHtml = "<div class='infuser-error'>The template <a href='{TEMPLATEURL}'>{TEMPLATEID}</a> could not be loaded. {STATUS}</div>",
    returnErrorTemplate = function(status, templateId, templatePath) {
        return errorHtml.replace('{STATUS}', status).replace('{TEMPLATEID}', templateId).replace('{TEMPLATEURL}', templatePath);
    },
    errors = [];
var helpers = {
    getTemplatePath: function(templateOptions) {
        var templateFile = templateOptions.templatePrefix + templateOptions.templateId + templateOptions.templateSuffix;
        return templateOptions.templateUrl === undefined || templateOptions.templateUrl === "" ?
                templateFile : templateOptions.templateUrl + "/" + templateFile;
    },
    templateGetSuccess: function(templateId, callback) {
        return function(response) {
            infuser.store.storeTemplate(templateId, response);
            callback(infuser.store.getTemplate(templateId));
        };
    },
    templateGetError: function(templateId, templatePath, callback) {
        return function(exception) {
            if($.inArray(templateId, errors) === -1) {
                errors.push(templateId);
            }
            var templateHtml = returnErrorTemplate("HTTP Status code: " + exception.status, templateId, templatePath);
            infuser.store.storeTemplate(templateId, templateHtml);
            callback(infuser.store.getTemplate(templateId));
        };
    },
    getAjaxOptions: function(templateOptions) {

    }
},
infuserOptions = ['target','loadingTemplate','postRender','preRender','render','bindingInstruction','useLoadingTemplate','model','templateUrl','templateSuffix','templatePrefix',''];
var infuser = {
    storageOptions: {
        hash: hashStorage,
        script: scriptStorage
    },

    store: hashStorage,

    defaults: {
        // Template name conventions
        templateUrl: "",
        templateSuffix: ".html",
        templatePrefix: "",
        // AJAX Options
        ajax: {
            "async": true,
            "dataType": "html",
            "type": "GET"
        },
        // infuse() specific options - NOT used for "get" or "getSync"
        target:  function(templateId) { return "#" + templateId }, // DEFAULT MAPPING
        loadingTemplate:    {
                                content:        '<div class="infuser-loading">Loading...</div>',
                                transitionIn:   function(target, content) {
                                                    var tgt = $(target);
                                                    tgt.hide();
                                                    tgt.html(content);
                                                    tgt.fadeIn();
                                                },
                                transitionOut:  function(target) {
                                                    $(target).html("");
                                                }
                            },
        postRender:         function(targetElement) { }, // NO_OP effectively by default
        preRender:          function(targetElement, template) { }, // NO_OP effectively by default
        render:             function(target, template) {
                                var tgt = $(target);
                                if(tgt.children().length === 0) {
                                    tgt.append($(template));
                                }
                                else {
                                    tgt.children().replaceWith($(template));
                                }
                            },
        bindingInstruction:  function(template, model) { return template; }, // NO_OP effectively by default
        useLoadingTemplate: true // true/false
    },

    get: function(options, callback) {
        var templateOptions = $.extend({}, infuser.defaults, (typeof options === "object" ? options : { templateId: options })),
            template;
        templateOptions.ajax.url = helpers.getTemplatePath(templateOptions);
        template = infuser.store.getTemplate(templateOptions.ajax.url);
        if(!template || $.inArray(templateOptions.ajax.url, errors) !== -1) {
            templateOptions.ajax.success = helpers.templateGetSuccess(templateOptions.ajax.url, callback);
            templateOptions.ajax.error = helpers.templateGetError(templateOptions.templateId, templateOptions.ajax.url, callback);
            $.trafficCop(templateOptions.ajax);
        }
        else {
            callback(template);
        }
    },

    getSync: function(options) {
        var templateOptions = $.extend({}, infuser.defaults, (typeof options === "object" ? options : { templateId: options }), { ajax: { async: false } }),
            template,
            templateHtml;
        templateOptions.ajax.url = helpers.getTemplatePath(templateOptions);
        template = infuser.store.getTemplate(templateOptions.ajax.url);
        if(!template || $.inArray(templateOptions.ajax.url, errors) !== -1) {
            templateHtml = null;
            templateOptions.ajax.success = function(response) { templateHtml = response; };
            templateOptions.ajax.error = function(exception) {
                if($.inArray(templateOptions.ajax.url) === -1) {
                    errors.push(templateOptions.ajax.url);
                }
                templateHtml = returnErrorTemplate("HTTP Status code: exception.status", templateOptions.templateId, templateOptions.ajax.url);
            };
            $.ajax(templateOptions.ajax);
            if(templateHtml === null) {
                templateHtml = returnErrorTemplate("An unknown error occurred.", templateOptions.templateId, templateOptions.ajax.url);
            }
            else {
                infuser.store.storeTemplate(templateOptions.ajax.url, templateHtml);
                template = infuser.store.getTemplate(templateOptions.ajax.url);
            }
        }
        return template;
    },

    infuse: function(templateId, renderOptions) {
        var templateOptions = $.extend({}, infuser.defaults, (typeof templateId === "object" ? templateId : renderOptions), (typeof templateId === "string" ? { templateId: templateId } : undefined )),
            targetElement = typeof templateOptions.target === 'function' ? templateOptions.target(templateId) : templateOptions.target;
        if(templateOptions.useLoadingTemplate) {
            templateOptions.loadingTemplate.transitionIn(targetElement, templateOptions.loadingTemplate.content);
        }
        infuser.get(templateOptions, function(template) {
            var _template = template;
            templateOptions.preRender(targetElement, _template);
            _template = templateOptions.bindingInstruction(_template, templateOptions.model);
            if(templateOptions.useLoadingTemplate) {
                templateOptions.loadingTemplate.transitionOut(targetElement);
            }
            templateOptions.render(targetElement, _template);
            templateOptions.postRender(targetElement);
        });
    }
};
global.infuser = infuser; })(jQuery, window);


// Knockout External Template Engine
// Author: Jim Cowart
// License: MIT (http://www.opensource.org/licenses/mit-license)
// Version 2.0.4


(function ( global, ko, jQuery, infuser, undefined ) {

	var ExternalTemplateSource = function(templateId, options) {
	    var self = this, origAfterRender;
	    self.templateId = templateId;
	    self.loaded = false;
	    self.template = ko.observable(infuser.defaults.useLoadingTemplate ? infuser.defaults.loadingTemplate.content : undefined);
	    self.template.data = {};
	    self.options = ko.utils.extend({},options);
	    self.options.templateId = templateId;
	    if(self.options && self.options.afterRender) {
	        origAfterRender = self.options.afterRender;
	        self.options.afterRender = function() {
	            if(self.loaded) {
	                origAfterRender.apply(self.options, arguments);
	            }
	        }
	    }
	};
	
	ko.utils.extend(ExternalTemplateSource.prototype, {
	    data: function(key, value) {
	        if (arguments.length === 1) {
	            if(key === "precompiled") {
	                this.template();
	            }
	            return this.template.data[key];
	        }
	        this.template.data[key] = value;
	    },
	
	    text: function(value) {
	        if (!this.loaded) {
	           this.getTemplate();
	        }
	
	        if (arguments.length === 0) {
	            return this.template();
	        } else {
	           this.template(arguments[0]);
	        }
	    },
	
	    getTemplate: function() {
	        var self = this;
	        infuser.get(self.options, function(tmpl) {
	            self.data("precompiled",null);
	            self.template(tmpl);
	            self.loaded = true;
	        });
	    }
	});
	var KoExternalTemplateEngine = function(koEngineType) {
	    var engine = koEngineType ? new koEngineType() : new ko.nativeTemplateEngine();
	    engine.templates = {};
	    engine.makeTemplateSource = function(template, bindingContext, options) {
	        // Named template
	        if (typeof template == "string") {
	            var elem = document.getElementById(template);
	            if (elem)
	                return new ko.templateSources.domElement(elem);
	            else {
	                if(!engine.templates[template]) {
	                    engine.templates[template] = new ExternalTemplateSource(template, options);
	                }
	                return engine.templates[template];
	            }
	        }
	        else if ((template.nodeType == 1) || (template.nodeType == 8)) {
	            // Anonymous template
	            return new ko.templateSources.anonymousTemplate(template);
	        }
	        
	    };
	
	    engine.renderTemplate = function (template, bindingContext, options) {
	        var templateSource = engine.makeTemplateSource(template, bindingContext, options);
	        return engine.renderTemplateSource(templateSource, bindingContext, options);
	    };
	
	    return engine;
	};
	
	ko.KoExternalTemplateEngine = KoExternalTemplateEngine;
	
	if (jQuery['tmpl'] && jQuery['tmpl']['tag']['tmpl']['open'].toString().indexOf('__') >= 0) {
	    ko.setTemplateEngine(new KoExternalTemplateEngine(ko.jqueryTmplTemplateEngine));
	}
	else {
	    ko.setTemplateEngine(new KoExternalTemplateEngine());
	}

})( window, ko, jQuery, infuser );
;(function($) {

	$.desknoty = function(options) {

		var defaults = {
			icon: null,
			title: "",
			body: "",
			timeout: 5000,
			sticky: false,
			id: null,
			type: 'normal',
			url: '',
			dir: '',
			onClick: function() {},
			onShow: function() {},
			onClose: function() {},
			onError: function() {}
		};

		var p = this, noti = null;

	    p.set = { };

	    var init = function() {
	        p.set = $.extend({ }, defaults, options);
	        if (isSupported) {
	            if (window.webkitNotifications.checkPermission() != 0) {
	                getPermissions(init);
	            } else {
	                if (p.set.type === 'normal') createNoti();
	                else if (p.set.type === 'html') createNotiHtml();
	            }
	        } else {
	            alert("Desktop notifications are not supported!");
	        }
	    };

	    var createNoti = function() {
	        noti = window.webkitNotifications.createNotification(p.set.icon, p.set.title, p.set.body);
	        if (p.set.dir) noti.dir = p.set.dir;
	        if (p.set.onclick) noti.onclick = p.set.onclick;
	        if (p.set.onshow) noti.onshow = p.set.onshow;
	        if (p.set.onclose) noti.onclose = p.set.onclose;
	        if (p.set.onerror) noti.onerror = p.set.onerror;
	        if (p.set.id) noti.replaceId = p.set.id;
	        noti.show();
	        if (!p.set.sticky) setTimeout(function() { noti.cancel(); }, p.set.timeout);
	    };
	    var createNotiHtml = function() {
	        noti = window.webkitNotifications.createHTMLNotification(p.set.url);
	        if (p.set.dir) noti.dir = p.set.dir;
	        if (p.set.onclick) noti.onclick = p.set.onclick;
	        if (p.set.onshow) noti.onshow = p.set.onshow;
	        if (p.set.onclose) noti.onclose = p.set.onclose;
	        if (p.set.onerror) noti.onerror = p.set.onerror;
	        if (p.set.id) noti.replaceId = p.set.id;
	        noti.show();
	        if (!p.set.sticky) setTimeout(function() { noti.cancel(); }, p.set.timeout);
	    };

	    var isSupported = function() {
	        if (window.webkitNotifications) return true;
	        else return false;
	    };
	    var getPermissions = function(callback) {
	        window.webkitNotifications.requestPermission(callback);
	    };
		init();
	}
})(jQuery);
/************************************************************************
*************************************************************************
@Name :       	jNotify - jQuery Plugin
@Revison :    	2.1
@Date : 		01/2011
@Author:     	ALPIXEL - (www.myjqueryplugins.com - www.alpixel.fr)
@Support:    	FF, IE7, IE8, MAC Firefox, MAC Safari
@License :		Open Source - MIT License : http://www.opensource.org/licenses/mit-license.php

**************************************************************************
*************************************************************************/
(function($){

	$.jNotify = {
		defaults: {
			/** VARS - OPTIONS **/
			autoHide : true,				// Notify box auto-close after 'TimeShown' ms ?
			clickOverlay : false,			// if 'clickOverlay' = false, close the notice box on the overlay click ?
			MinWidth : 200,					// min-width CSS property
			TimeShown : 1500, 				// Box shown during 'TimeShown' ms
			ShowTimeEffect : 200, 			// duration of the Show Effect
			HideTimeEffect : 200, 			// duration of the Hide effect
			LongTrip : 15,					// in pixel, length of the move effect when show and hide
			HorizontalPosition : 'right', 	// left, center, right
			VerticalPosition : 'bottom',	 // top, center, bottom
			ShowOverlay : true,				// show overlay behind the notice ?
			ColorOverlay : '#000',			// color of the overlay
			OpacityOverlay : 0.3,			// opacity of the overlay
			
			/** METHODS - OPTIONS **/
			onClosed : null,
			onCompleted : null
		},

		/*****************/
		/** Init Method **/
		/*****************/
		init:function(msg, options, id) {
			opts = $.extend({}, $.jNotify.defaults, options);

			/** Box **/
			if($("#"+id).length == 0)
				$Div = $.jNotify._construct(id, msg);

			// Width of the Brower
			WidthDoc = parseInt($(window).width());
			HeightDoc = parseInt($(window).height());

			// Scroll Position
			ScrollTop = parseInt($(window).scrollTop());
			ScrollLeft = parseInt($(window).scrollLeft());

			// Position of the jNotify Box
			posTop = $.jNotify.vPos(opts.VerticalPosition);
			posLeft = $.jNotify.hPos(opts.HorizontalPosition);

			// Show the jNotify Box
			if(opts.ShowOverlay && $("#jOverlay").length == 0)
				$.jNotify._showOverlay($Div);

			$.jNotify._show(msg);
		},

		/*******************/
		/** Construct DOM **/
		/*******************/
		_construct:function(id, msg) {
			$Div = 
			$('<div id="'+id+'"/>')
			.css({opacity : 0,minWidth : opts.MinWidth})
			.html(msg)
			.appendTo('body');
			return $Div;
		},

		/**********************/
		/** Postions Methods **/
		/**********************/
		vPos:function(pos) {
			switch(pos) {
				case 'top':
					var vPos = ScrollTop + parseInt($Div.outerHeight(true)/2);
					break;
				case 'center':
					var vPos = ScrollTop + (HeightDoc/2) - (parseInt($Div.outerHeight(true))/2);
					break;
				case 'bottom':
					var vPos = ScrollTop + HeightDoc - parseInt($Div.outerHeight(true));
					break;
			}
			return vPos;
		},

		hPos:function(pos) {
			switch(pos) {
				case 'left':
					var hPos = ScrollLeft;
					break;
				case 'center':
					var hPos = ScrollLeft + (WidthDoc/2) - (parseInt($Div.outerWidth(true))/2);
					break;
				case 'right':
					var hPos = ScrollLeft + WidthDoc - parseInt($Div.outerWidth(true));
					break;
			}
			return hPos;
		},

		/*********************/
		/** Show Div Method **/
		/*********************/
		_show:function(msg) {
			$Div
			.css({
				top: posTop,
				left : posLeft
			});
			switch (opts.VerticalPosition) {
				case 'top':
					$Div.animate({
						top: posTop + opts.LongTrip,
						opacity:1
					},opts.ShowTimeEffect,function(){
						if(opts.onCompleted) opts.onCompleted();
					});
					if(opts.autoHide)
						$.jNotify._close();
					else
						$Div.css('cursor','pointer').click(function(e){
							$.jNotify._close();
						});
					break;
				case 'center':
					$Div.animate({
						opacity:1
					},opts.ShowTimeEffect,function(){
						if(opts.onCompleted) opts.onCompleted();
					});
					if(opts.autoHide)
						$.jNotify._close();
					else
						$Div.css('cursor','pointer').click(function(e){
							$.jNotify._close();
						});
					break;
				case 'bottom' :
					$Div.animate({
						top: posTop - opts.LongTrip,
						opacity:1
					},opts.ShowTimeEffect,function(){
						if(opts.onCompleted) opts.onCompleted();
					});
					if(opts.autoHide)
						$.jNotify._close();
					else
						$Div.css('cursor','pointer').click(function(e){
							$.jNotify._close();
						});
					break;
			}
		},

		_showOverlay:function(el){
			var overlay = 
			$('<div id="jOverlay" />')
			.css({
				backgroundColor : opts.ColorOverlay,
				opacity: opts.OpacityOverlay
			})
			.appendTo('body')
			.show();

			if(opts.clickOverlay)
			overlay.click(function(e){
				e.preventDefault();
				opts.TimeShown = 0;
				$.jNotify._close();
			});
		},


		_close:function(){
				switch (opts.VerticalPosition) {
					case 'top':
						if(!opts.autoHide)
							opts.TimeShown = 0;
						$Div.stop(true, true).delay(opts.TimeShown).animate({
							top: posTop-opts.LongTrip,
							opacity:0
						},opts.HideTimeEffect,function(){
							$(this).remove();
							if(opts.ShowOverlay && $("#jOverlay").length > 0)
								$("#jOverlay").remove();
								if(opts.onClosed) opts.onClosed();
						});
						break;
					case 'center':
						if(!opts.autoHide)
							opts.TimeShown = 0;
						$Div.stop(true, true).delay(opts.TimeShown).animate({
							opacity:0
						},opts.HideTimeEffect,function(){
							$(this).remove();
							if(opts.ShowOverlay && $("#jOverlay").length > 0)
								$("#jOverlay").remove();
								if(opts.onClosed) opts.onClosed();
						});
						break;
					case 'bottom' :
						if(!opts.autoHide)
							opts.TimeShown = 0;
						$Div.stop(true, true).delay(opts.TimeShown).animate({
							top: posTop+opts.LongTrip,
							opacity:0
						},opts.HideTimeEffect,function(){
							$(this).remove();
							if(opts.ShowOverlay && $("#jOverlay").length > 0)
								$("#jOverlay").remove();
								if(opts.onClosed) opts.onClosed();
						});
						break;
				}
		},

		_isReadable:function(id){
			if($('#'+id).length > 0)
				return false;
			else
				return true;
		}
	};

	/** Init method **/
	jNotify = function(msg,options) {
		if($.jNotify._isReadable('jNotify'))
			$.jNotify.init(msg,options,'jNotify');
	};

	jSuccess = function(msg,options) {
		if($.jNotify._isReadable('jSuccess'))
			$.jNotify.init(msg,options,'jSuccess');
	};

	jError = function(msg,options) {
		if($.jNotify._isReadable('jError'))
			$.jNotify.init(msg,options,'jError');
	};
})(jQuery);
(function ($, undefined) {
    $.widget("ui.dvselectable", $.ui.mouse, {
        customArea: [],
        search: null,
        lasso: null,
        pages: [],
        prevProportions: 1,
        prevCustomTemplateProportions: 1,
        searchProportions: 1,
        selectedRowsCoordinates: [],
        highlightPaneContainer: null,
        highlightSearchPaneContainer: null,
        buttonPaneContainer: null,
        template: "<div id={0} class='highlight selection-highlight' style='top: {1}px; height: {2}px; width: {3}px; left: {4}px;'></div>",
        searchTemplate: "<div id={0} class='highlight search-highlight {1}' style='top: {2}px; height: {3}px; width: {4}px; left: {5}px;' {6}></div>",
        addTemplate: "<div id={0} class='{3}' style='top: {1}px; left: {2}px;' index='{4}'></div>",
        cAreaPageIndex: 0,
        cAreaFieldIndex: 0,

        annotationContainer: "<div id={0} style='position:relative'>{1}</div>",
        annotationTemplate: "<div class='highlight annotation-highlight' style='top: {0}px; height: {1}px; width: {2}px; left: {3}px;'></div>",

        timeouts: [],
        flag: 0,
        options: {
            appendTo: "body",
            txtarea: "",
            pdf2XmlWrapper: null,
            startNumbers: null,
            pagesCount: 0,
            proportion: 1,
            cancel: ':input,option,.comment',
            bookLayout: false,
            docSpace: '',
            highlightColor: null
        },

        _initialized: false,
        _textSelectionByCharModeEnabled: false,
        _canvasOffset: null,
        _canvasScroll: null,
        _mouseStartPos: null,
        _selectionInfo: {
            position: -1,
            length: 0
        },
        _enabled: true,

        SelectionModes: { SelectText: 0, SelectRectangle: 1, SelectTextToStrikeout: 2, ClickPoint: 3, TrackMouseMovement: 4, DoNothing: 5 },
        _mode: null,
        _lassoCssElement: null,
        rightMargin: 35,
        parentElement: null,
        _viewModel: null,
        selectionCounter: 0,
        _selectionBottomIncrease: 0,
        _selectionTopIncreaseWhenFindingRects: 0,
        _selectionTopIncreaseWhenCreatingAreas: 0,

        _create: function () {
            this._initialized = false;
            this.initCanvasOffset();

            if (!this.options.initializeStorageOnly) {
                this.dragged = false;

                if (this.options.preventTouchEventsBubbling) {
                    function preventEventBubble(event) {
                        event.preventBubble();
                    }

                    this.element.bind({
                        touchstart: preventEventBubble,
                        touchmove: preventEventBubble,
                        touchend: preventEventBubble
                    });
                }

                this._mouseInit();
                this.helper = $("<div class='ui-selectable-helper'></div>");
                this.createEventHandlers();
                this.setMode(this.SelectionModes.SelectText);
                this.pagePrefix = this.options.pagePrefix;
            }
        },

        createEventHandlers: function () {
            var self = this;
            $.ctrl('C', function () {
                var activeElement = $(document.activeElement);
                var activeElementId = activeElement.attr('id');
                var activeElementName = activeElement.attr('name');
                if ((activeElementId !== self.options.txtarea.attr('id') || activeElementName !== self.options.txtarea.attr('name'))
                    && (activeElement.is("input") || activeElement.is("textarea")))
                    return;
                self.options.txtarea.focus().select();
            });

            $(self.element).bind({
                click: function (e) {
                    return self.mouseClickHandler(e);
                    //self.clearShown();
                }
            });
        },

        _init: function () {
            this._initialized = false;
            if (this.options.pdf2XmlWrapper == null)
                return;

            this.initStorage();
            this.search = [];
            if (this.options.initStorageOnMouseStart)
                this._initialized = false;
        },

        destroy: function () {
            this._mouseDestroy();
            return this;
        },

        initStorage: function () {
            if (this._initialized)
                return;

            this._initialized = true;

            var locations;
            if (this.options.useVirtualScrolling) {
                this.pageLocations = $.map(this.options.pageLocations,
                    function (page) {
                        return new jSaaspose.Point(page.left, page.top());
                    });
            }
            else
                this.pageLocations = this._getPageLocations();
            locations = this.pageLocations;

            if (this.options.pdf2XmlWrapper != null) {
                if (this.options.bookLayout /*|| this.options.useVirtualScrolling*/) {
                    this.pages = this.options.pdf2XmlWrapper.getPages(this.options.proportion, locations,
                        this.options.startNumbers.start - 1, this.options.startNumbers.end - 1, this.options.useVirtualScrolling, !this.options.bookLayout);
                }
                else {
                    this.pages = this.options.pdf2XmlWrapper.getPages(this.options.proportion, locations, 0, this.options.pagesCount - 1, undefined, true);
                }
            }
        },

        initCanvasOffset: function () {
            this.parentElement = this.options.docSpace.parent();
            var offset = this.element.parent().offset();
            var offsetX = offset.left, offsetY = offset.top;

            if (this.options.bookLayout)
                offsetY = this.parentElement.offset().top;
            this._canvasOffset = new jSaaspose.Point(offsetX, offsetY);
        },

        getPages: function () {
            this.initStorage();
            return this.pages;
        },

        _getPageLocations: function () {
            var self = this;
            var docSpaceId = this.options.docSpace.attr("id");
            var imagesSelector = ".page-image";
            var images = this.element.find(imagesSelector);
            if (this.options.bookLayout) {
                images = images.filter("[id='" + docSpaceId + "-img-" + this.options.startNumbers.start.toString() +
                                 "'],[id='" + docSpaceId + "-img-" + this.options.startNumbers.end.toString() + "']");
            }

            this._canvasScroll = this.getCanvasScroll();

            return $.map(images, function (img) {
                var imgJquery = $(img);
                var x = imgJquery.offset().left - self._canvasOffset.x + self._canvasScroll.x;
                var y = (self.options.bookLayout ? 0 : (imgJquery.offset().top - self.element.offset().top));
                return new jSaaspose.Point(x, y);
            });
        },

        getCanvasScroll: function () {
            if (this.options.bookLayout)
                return new jSaaspose.Point(this.parentElement.scrollLeft(), this.parentElement.scrollTop());
            else
                return new jSaaspose.Point(this.element.parent().scrollLeft(), this.element.parent().scrollTop());
        },

        clearSelection: function () {
            this.element.find(".selection-highlight:not(.static)").remove();
        },

        clearSelectionOnPage: function (pageNumber) {
            this.element.find("#" + this.pagePrefix + (pageNumber + 1) + " > .highlight-pane > .selection-highlight:not(.static)").remove();
        },

        _mouseCapture: function (event) {
            var page = null;

            this._canvasScroll = this.getCanvasScroll();
            this._mouseStartPos = new jSaaspose.Point(
                event.pageX - this._canvasOffset.x + this._canvasScroll.x,
                event.pageY - this._canvasOffset.y + this._canvasScroll.y);

            return (this._mode != this.SelectionModes.DoNothing &&
                this._findPageAt(this._mouseStartPos) != null)
        },

        _mouseStart: function (event) {
            this.options.docSpace.focus();
            this.initStorage();
            this.clearSelection();

            if (this._mode == this.SelectionModes.DoNothing) {
                return false;
            }
            this.selectionCounter++;

            //this._canvasScroll = new jSaaspose.Point(this.parentElement.scrollLeft(), this.parentElement.scrollTop());
            this._canvasScroll = this.getCanvasScroll();
            if (this.options.bookLayout)
                this._canvasScroll.y += this.parentElement.parent().scrollTop();

            if (this.checkMouseIsInEdgeInBookMode(this._mouseStartPos.x, this._mouseStartPos.y))
                return false;

            if (this._mode == this.SelectionModes.TrackMouseMovement) {
                var top = this._mouseStartPos.y;
                var page = this.findPageAtVerticalPosition(top);
                var pageNumber = parseInt(page.pageId) - 1;

                this.element.trigger("onMouseMoveStarted", [pageNumber, { left: this._mouseStartPos.x, top: top }]);
            } else {
                this.element.append(this.helper);
                this.helper.css({
                    "left": this._mouseStartPos.x,
                    "top": this._mouseStartPos.y,
                    "width": 0,
                    "height": 0
                });
            }

            this.options.txtarea.val("");
            this.lasso = new jSaaspose.Rect();
        },

        _mouseDrag: function (event) {
            if (this._mode == this.SelectionModes.DoNothing || this.checkMouseIsInEdgeInBookMode(this._mouseStartPos.x, this._mouseStartPos.y))
                return false;

            var x1 = this._mouseStartPos.x, y1 = this._mouseStartPos.y,
                x2 = event.pageX - this._canvasOffset.x + this._canvasScroll.x,
                y2 = event.pageY - this._canvasOffset.y + this._canvasScroll.y;
            var currentX = x2,
                currentY = y2;

            if (this._findPageAt(new jSaaspose.Point(currentX, currentY)) != this._findPageAt(new jSaaspose.Point(x1, y1))) {
                return false;
            };

            if (!this._findPageAt(new jSaaspose.Point(currentX, currentY)))
                return false;

            this.dragged = true;

            if (x1 > x2) { var tmp = x2; x2 = x1; x1 = tmp; }
            if (y1 > y2) { var tmp = y2; y2 = y1; y1 = tmp; }

            this.lasso.set(x1, y1, x2, y2);

            if (this._mode != this.SelectionModes.ClickPoint && this._mode != this.SelectionModes.TrackMouseMovement) {
                this.helper.css({ left: x1, top: y1, width: this.lasso.width(), height: this.lasso.height() });
            }

            this.findSelectedPages(false, null, undefined, this.options.highlightColor);

            this.element.trigger("onMouseDrag", [{ left: currentX, top: currentY }]);
            return false;
        },

        _mouseStop: function (event) {
            if (this._mode == this.SelectionModes.DoNothing)
                return false;

            this.helper.remove();

            var page = this._findPageAt(this.lasso.topLeft) || this.pages[0];
            if (typeof (page) === "undefined") return false;

            var pageOffset;
            var pageNumber = parseInt(page.pageId) - 1;
            var originalRects = null;

            if (pageNumber < 0) return false;

            if (this._mode == this.SelectionModes.SelectText || this._mode == this.SelectionModes.SelectTextToStrikeout) {
                if (!this.dragged) {
                    return false;
                }

                var self = this;
                this.dragged = false;

                var rects = self._getDocumentHighlightRects();
                if (!rects || rects.length == 0) {
                    return false;
                }

                var text = '';
                var bounds = (this.options.storeAnnotationCoordinatesRelativeToPages ?
                    this.convertRectToRelativeToPageUnscaledCoordinates(this.lasso) :
                    this.convertRectToAbsoluteCoordinates(this.lasso));

                var top = bounds.top(), bottom = bounds.bottom();
                bounds = rects[0].originalRect;

                var left = bounds.left(), right = bounds.right();
                var highestTop = bounds.top();
                var lowestBottom = bounds.bottom();
                var pos = rects[0].position, len = rects[rects.length - 1].position + rects[rects.length - 1].length - pos;
                originalRects = [];

                for (var i = 0; i < rects.length; i++) {
                    text += rects[i].text;
                    text += ((i > 0 && (rects[i - 1].page != rects[i].page || rects[i - 1].row != rects[i].row)) ? '\r\n' : ' ');

                    bounds = rects[i].originalRect;
                    originalRects.push(bounds);

                    left = Math.min(left, bounds.left());
                    right = Math.max(right, bounds.right());
                    highestTop = Math.min(highestTop, bounds.top());
                    lowestBottom = Math.max(lowestBottom, bounds.bottom());
                }

                var scale = this.options.proportion;
                if (this.options.storeAnnotationCoordinatesRelativeToPages) {
                    top = Math.min(highestTop, top);
                    bottom = Math.max(lowestBottom, bottom);
                }
                else {
                    pageOffset = pageNumber * this.options.pageHeight;
                    pageOffset /= scale;

                    top = Math.max(pageOffset + highestTop, top);
                    bottom = Math.min(pageOffset + lowestBottom, bottom);
                }
                var selectionBounds = new jSaaspose.Rect(left, top, right, bottom);
                var selectionBoundsScaled = selectionBounds.clone();

                this.options.txtarea.val($.trim(text));
            }

            switch (this._mode) {
                case this.SelectionModes.SelectText:
                    this.element.trigger('onTextSelected', [pageNumber, selectionBoundsScaled, pos, len, this.selectionCounter, originalRects]);
                    break;

                case this.SelectionModes.SelectTextToStrikeout:
                    this.element.trigger('onTextToStrikeoutSelected', [pageNumber, selectionBoundsScaled, pos, len, this.selectionCounter, originalRects]);
                    break;

                case this.SelectionModes.SelectRectangle:
                    var selectedRectangle;
                    if (this.options.storeAnnotationCoordinatesRelativeToPages) {
                        selectedRectangle = this.convertRectToRelativeToPageUnscaledCoordinates(this.lasso, this._mouseStartPos);
                    }
                    else {
                        selectedRectangle = this.convertRectToAbsoluteCoordinates(this.lasso, this._mouseStartPos);
                    }
                    this.element.trigger('onRectangleSelected', [pageNumber, selectedRectangle]);
                    break;

                case this.SelectionModes.ClickPoint:
                    this.mouseClickHandler(event);
                    break;

                case this.SelectionModes.TrackMouseMovement:
                    $(this.element).trigger('onMouseMoveStopped', []);
                    break;

                default:
                    break;
            }
            return false;
        },

        mouseClickHandler: function (event) {
            //*********************
            //Fixed ANNOTATION-1107
            if (event.toElement == undefined) {
                event.toElement = event.target;
            }
            if (event.target.className != "doc_text_area_text mousetrap") {
                this.options.docSpace.focus();
            }
            //*********************

            //*********************
            //Fixed ANNOTATION-970
            if (this._mode == this.SelectionModes.SelectText) {
                var widgetTooltipClicked = false;
                if (event && event.originalEvent && event.originalEvent.path) {
                    $.each(event.originalEvent.path, function(index, val) {
                        if (val.className == "widget-tooltip") {
                            widgetTooltipClicked = true;
                        }
                    });
                }

                if (widgetTooltipClicked) {
                    this.destroy();
                    this._enabled = false;
                } else if (this._enabled == false) {
                    this.destroy();
                    $(this.element).unbind();
                    this._enabled = true;
                    this._create();
                }
            }
            //************************

            if (this._mode == this.SelectionModes.ClickPoint) {
                this.initStorage();
                this._canvasScroll = this.getCanvasScroll();

                var lastX = event.pageX - this._canvasOffset.x + this._canvasScroll.x;
                var lastY = event.pageY - this._canvasOffset.y + this._canvasScroll.y;
                var lastPoint = new jSaaspose.Rect(lastX, lastY, lastX, lastY);
                var page = this._findPageAt(lastPoint.topLeft);

                if (!page)
                    return true;

                var pageNumber = parseInt(page.pageId) - 1;
                if (this.options.storeAnnotationCoordinatesRelativeToPages) {
                    lastPoint = this.convertRectToRelativeToPageUnscaledCoordinates(lastPoint);
                }
                else {
                    lastPoint = this.convertRectToAbsoluteCoordinates(lastPoint);
                }

                this.element.trigger('onPointClicked', [pageNumber, lastPoint]);
                return false;
            }

            return true;
        },

        checkMouseIsInEdgeInBookMode: function (mouseX, mouseY) {
            var elementWidth = this.element.width();
            var elementHeight = this.element.height();
            var edgeWidth = 100, edgeHeight = 100;
            if (this.options.bookLayout &&
                    ((mouseX > elementWidth - edgeWidth && mouseY < edgeHeight) ||
                    (mouseX > elementWidth - edgeWidth && mouseY > elementHeight - edgeHeight) ||
                    (mouseX < edgeWidth && mouseY < edgeHeight) ||
                    (mouseX < edgeWidth && mouseY > elementHeight - edgeHeight)
                    ))
                return true;
            else
                return false;
        },

        convertRectToAbsoluteCoordinates: function (rect, position) {
            this.initStorage();

            var selectedRectangle = rect.clone();
            var scale = this.options.proportion;
            var page = null;
            if (position)
                page = this._findPageNearby(position);
            else
                page = this._findPageNearby(selectedRectangle.topLeft);
            selectedRectangle.subtract(page.rect.topLeft);

            var pageNumber = parseInt(page.pageId) - 1;
            var pageOffset = pageNumber * this.options.pageHeight;
            pageOffset /= scale;
            selectedRectangle.scale(1 / scale);
            selectedRectangle.add(new jSaaspose.Point(0, pageOffset));
            return selectedRectangle;
        },

        convertRectToScreenCoordinates: function (rect) {
            this.initStorage();

            var bounds = rect.clone().scale(this.options.proportion);
            if (bounds.top() < 0)
                bounds.setTop(0);

            var pageHeight = this.options.pageHeight;
            var pageNumber = Math.floor(bounds.top() / pageHeight);
            bounds.subtract(new jSaaspose.Point(0, pageNumber * pageHeight));
            if (this.pages.length != 0)
                bounds.add(this.pages[pageNumber].rect.topLeft);
            return bounds;
        },

        convertRectToRelativeToPageUnscaledCoordinates: function (rect, position) {
            this.initStorage();

            var sourceRectangle = rect.clone();
            var scale = this.options.proportion;
            var page = null;
            if (position)
                page = this._findPageNearby(position);
            else
                page = this._findPageNearby(sourceRectangle.topLeft);
            sourceRectangle.subtract(page.rect.topLeft);
            sourceRectangle.scale(1 / scale);
            return sourceRectangle;
        },

        convertPageAndRectToScreenCoordinates: function (pageNumber, rect) {
            this.initStorage();

            var bounds = rect.clone().scale(this.options.proportion);
            if (bounds.top() < 0)
                bounds.setTop(0);
            if (this.pages.length != 0)
                bounds.add(this.pages[pageNumber].rect.topLeft);
            return bounds;
        },

        highlightPredefinedArea: function (rect, clickHandler, pageNumber, selectionCounter, color, hoverHandlers) {
            this.initStorage();
            this.dragged = true;

            if (this.options.storeAnnotationCoordinatesRelativeToPages) {
                this.lasso = this.convertPageAndRectToScreenCoordinates(pageNumber, rect);
            }
            else {
                this.lasso = this.convertRectToScreenCoordinates(rect);
            }
            this.selectionCounter++;
            var page = this._findPageAt(this.lasso.topLeft) || this.pages[0];

            var pageNumbers = this.options.startNumbers;
            this.options.startNumbers = { start: parseInt(page.pageId), end: parseInt(page.pageId) };

            this.findSelectedPages(true, clickHandler, selectionCounter, color || this.options.highlightColor, hoverHandlers);

            this.options.startNumbers = pageNumbers;
            this.dragged = false;
            if (typeof selectionCounter == "undefined")
                return this.selectionCounter;
            else {
                return selectionCounter;
            }
        },

        unhighlightPredefinedArea: function (rect, deleteStatic, pageNumber, selectionCounter) {
            if (this.options.storeAnnotationCoordinatesRelativeToPages) {
                this.lasso = this.convertPageAndRectToScreenCoordinates(pageNumber, rect);
            }
            else {
                this.lasso = this.convertRectToScreenCoordinates(rect);
            }
            var rects = this._getDocumentHighlightRects();

            if (!rects || rects.length == 0) {
                return;
            }

            if (typeof selectionCounter == "undefined")
                selectionCounter = "";

            for (var i = 0; i < rects.length; i++) {
                var pageId = rects[i].page + 1;
                var rowId = rects[i].row + 1;
                //var elementSelector = "#" + this.pagePrefix + pageId + "-highlight-" + rowId;
                var elementSelector = "#" + this.pagePrefix + pageId + "-highlight-" + rowId + "-" + selectionCounter;
                if (deleteStatic) {
                    elementSelector += ".static";
                }
                else {
                    elementSelector += ":not(.static)";
                }
                $(elementSelector).remove();
            }
        },

        setVisiblePagesNumbers: function (vPagesNumbers) {
            this.options.startNumbers = vPagesNumbers;
        },

        handleDoubleClick: function (event) {
            this.lasso = new jSaaspose.Rect(event.pageX, event.pageY, event.pageX, event.pageY);
            this.initStorage();
            this.findSelectedPages();
        },

        initHighlightSearchPaneContainer: function () {
            var containers = this._getElementsByClassName('search-pane', document.getElementById(this.options.docSpace.attr('id') + '-pages-container'));
            var len = containers.length;
            for (var i = len; i--;)
                if (containers[i].children.length != 0)
                    containers[i].innerHTML = '';
            this.highlightSearchPaneContainer = containers;
        },

        initButtonPaneContainer: function () {
            var containers = this._getElementsByClassName('button-pane', document.getElementById(this.options.docSpace.attr('id') + '-pages-container'));
            var len = containers.length;
            for (var i = len; i--;)
                if (containers[i].children.length != 0)
                    containers[i].innerHTML = '';
            this.buttonPaneContainer = containers;
        },

        reInitPages: function (scaleFactor, visiblePagesNumbers, scrollPosition, pageHeight, pageLocations) {
            this._initialized = false;

            this.options.startNumbers = visiblePagesNumbers;
            this.options.proportion = scaleFactor;
            this.options.pageHeight = pageHeight;

            this.initCanvasOffset();
            this.initStorage();
        },

        changeSelectedRowsStyle: function (proportions) {
            this.changeCustomAreasStyle(proportions);
            this.changeSearchStyle(proportions);

            var highlights = this.element.find('.highlight-pane .highlight');
            this.options.proportion = proportions;

            var self = this;
            $.each(highlights, function () {
                var highlightedAreaJquery = $(this);
                var rect = highlightedAreaJquery.data("gd-rect"); // gd means Groupdocs
                var originalRect = rect.originalRect;

                highlightedAreaJquery.css({
                    top: originalRect.top() * proportions + 
                        self._selectionTopIncreaseWhenFindingRects + self._selectionTopIncreaseWhenCreatingAreas,
                    left: originalRect.left() * proportions,
                    width: originalRect.width() * proportions,
                    height: originalRect.height() * proportions + self._selectionBottomIncrease - self._selectionTopIncreaseWhenFindingRects
                });
            });
        },

        performSearch: function (originalSearchValue, zoomValue, isCaseSensitive,
                                 searchForSeparateWords, treatPhrasesInDoubleQuotesAsExact, useAccentInsensitiveSearch) {
            var searchValue;
            var phraseIsInDoubleQuotes = false;
            if (isCaseSensitive)
                searchValue = originalSearchValue;
            else
                searchValue = originalSearchValue.toLowerCase();

            if (searchForSeparateWords && treatPhrasesInDoubleQuotesAsExact) {
                var trimmedText = searchValue.replace(/^[\r\n\s]+|[\r\n\s]+$/g, "");
                if (trimmedText.length >= 2 && trimmedText[0] == '"' && trimmedText[trimmedText.length - 1] == '"') {
                    searchForSeparateWords = false;
                    searchValue = trimmedText.substr(1, trimmedText.length - 2);
                    searchValue = searchValue.replace(/^[\r\n\s]+|[\r\n\s]+$/g, "");
                    phraseIsInDoubleQuotes = true;
                }
            }

            this.search.length = 0;
            this.initHighlightSearchPaneContainer();
            this.search.scaledRelativeToBeginningAreas = null;
            if (searchValue == '')
                return -1;
            this.searchProportions = zoomValue;
            var pages = this.pages;
            var pagesLen = pages.length;
            var pageWords = [], pageWordsUnscaled = [];
            var pageWordsScaledRelativeToBeginning = [];
            var searchWords = [];
            var searchWordsLen, wordsLen;
            var startIndex, endIndex, wordId;
            var seachCountItem = 0;
            var startingCharacterInWordNum;
            var searchValueWithAccentedWords;
            var row, rowText;

            if (useAccentInsensitiveSearch) {
                searchValueWithAccentedWords = new RegExp(window.jGroupdocs.stringExtensions.getAccentInsensitiveRegexFromString(searchValue));
            }
            var r;

            if (searchForSeparateWords) {
                searchWords = this.getWords(searchValue);
                if (useAccentInsensitiveSearch) {
                    var wordsWithAccentedChars = new Array();
                    for (var wordNum = 0; wordNum < words.length; wordNum++) {
                        wordsWithAccentedChars.push(
                                    new RegExp(window.jGroupdocs.stringExtensions.getAccentInsensitiveRegexFromString(searchWords[wordNum])));
                    }
                    searchWords = wordsWithAccentedChars;
                }
                searchWordsLen = searchWords.length;
            }

            var currentImageWidth;
            if (this.options.searchPartialWords)
                currentImageWidth = this.options.proportion * this.options.pdf2XmlWrapper.getPageSize().width;

            var searchHighlightNum = 0;
            for (var pageId = 0; pageId < pagesLen; pageId++) {
                var rows = pages[pageId].rows;
                var rowsLen = rows.length;
                var PageId = pageId + 1;
                var rowWords, rowWordsLen;
                var rowPositionsInText = new Array();
                var summaryText = "";
                var searchValueRemainderLength = 0;
                var searchValueRemainder = null;
                if (!searchForSeparateWords && this.options.searchPartialWords) {
                    for (var rowNum = 0; rowNum < rowsLen; rowNum++) {
                        row = rows[rowNum];
                        rowPositionsInText.push(summaryText.length);
                        if (isCaseSensitive)
                            rowText = row.text;
                        else
                            rowText = row.text.toLowerCase();
                        summaryText += $.trim(rowText);
                        if (rowNum < rowsLen - 1)
                            summaryText += " ";
                    }
                }

                for (var rowId = 0; rowId < rowsLen; rowId++) {
                    var left = 0, right = 0;
                    row = rows[rowId];
                    if (isCaseSensitive)
                        rowText = row.text;
                    else
                        rowText = row.text.toLowerCase();

                    if (searchForSeparateWords) {
                        if (searchWordsLen == 0)
                            break;
                        rowWords = row.words;
                        rowWordsLen = rowWords.length;

                        var rowWordIndex, searchWordIndex;
                        for (rowWordIndex = 0; rowWordIndex < rowWordsLen; rowWordIndex++) {
                            for (searchWordIndex = 0; searchWordIndex < searchWordsLen; searchWordIndex++) {
                                var searchWord = $.trim(searchWords[searchWordIndex]);
                                var rowWord = rowWords[rowWordIndex].text;
                                if (!isCaseSensitive) {
                                    searchWord = searchWord.toLowerCase();
                                    rowWord = rowWord.toLowerCase();
                                }
                                startingCharacterInWordNum = rowWord.indexOf(searchWord);
                                if (startingCharacterInWordNum != -1) {
                                    var characterCoordinates = this.options.pdf2XmlWrapper.getRowCharacterCoordinates(pageId, rowId);
                                    var firstWordLeft = rowWords[rowWordIndex].originalRect.left();

                                    var firstWordStartPosition = 0;
                                    for (var charNum = 0; charNum < characterCoordinates.length; charNum++) {
                                        var characterCoordinate = characterCoordinates[charNum];
                                        if (Math.round(characterCoordinate) >= Math.round(firstWordLeft)) {
                                            firstWordStartPosition = charNum;
                                            break;
                                        }
                                    }

                                    var searchStartPosition = firstWordStartPosition + startingCharacterInWordNum;
                                    if (searchStartPosition < characterCoordinates.length) {
                                        left = characterCoordinates[searchStartPosition];
                                    }
                                    else
                                        left = firstWordLeft;
                                    if (left < firstWordLeft || left > wordRight)
                                        left = firstWordLeft;

                                    searchEndPosition = searchStartPosition + searchWord.length;
                                    if (searchEndPosition >= characterCoordinates.length)
                                        right = row.originalRect.right();
                                    else
                                        right = characterCoordinates[searchEndPosition];

                                    var rowWordDesc = rowWords[rowWordIndex];
                                    var scale = currentImageWidth / pages[pageId].originalWidth;
                                    this.createSearchHitDescription(scale, left, right, rowWordDesc, null, pageWords, pageWordsScaledRelativeToBeginning, pageWordsUnscaled);
                                }
                            }
                        }
                    } // end: if (searchForSeparateWords)
                    else {
                        if (this.options.searchPartialWords) {
                            var rowPositionInText = rowPositionsInText[rowId];
                            var rowEndPositionInText;
                            if (rowId < rowsLen - 1)
                                rowEndPositionInText = rowPositionsInText[rowId + 1];
                            else
                                rowEndPositionInText = summaryText.length;
                        }

                        var textPosition;
                        var searchValueForThisRow;
                        if (useAccentInsensitiveSearch) {
                            searchValueForThisRow = searchValueRemainder ? searchValueRemainder : searchValueWithAccentedWords;
                            textPosition = summaryText.search(searchValueForThisRow, rowPositionInText);
                        }
                        else {
                            searchValueForThisRow = searchValueRemainder ? searchValueRemainder : searchValue;
                            textPosition = summaryText.indexOf(searchValueForThisRow, rowPositionInText);
                        }

                        if (textPosition < rowPositionInText || textPosition >= rowEndPositionInText)
                            textPosition = -1;
                        else
                            textPosition -= rowPositionInText;

                        while (textPosition != -1) {
                            rowWords = row.words;
                            if (this.options.searchPartialWords) {
                                var spaceCountRegex = /\s/g;
                                var initialSubstring = rowText.substring(0, textPosition);
                                var searchValueThatOverlapsRowLength = rowText.length - textPosition;
                                var searchValueThatOverlapsRow = searchValueForThisRow.substr(0, searchValueThatOverlapsRowLength);
                                searchValueRemainderLength = searchValueForThisRow.length - searchValueThatOverlapsRowLength;
                                if (searchValueRemainderLength > 0)
                                    searchValueRemainder = searchValueForThisRow.substr(searchValueThatOverlapsRowLength + 1); // +1 for space between words
                                else {
                                    searchValueRemainder = null;
                                }
                                var initialWords = initialSubstring.match(spaceCountRegex);
                                var overlappedWords = searchValueThatOverlapsRow.match(spaceCountRegex);
                                var firstWordNumber = 0, overlappedWordCount = 0;
                                if (initialWords)
                                    firstWordNumber = initialWords.length;
                                if (overlappedWords)
                                    overlappedWordCount = overlappedWords.length;
                                var lastWordNumber = firstWordNumber + overlappedWordCount;
                                var characterCoordinates = this.options.pdf2XmlWrapper.getRowCharacterCoordinates(pageId, rowId);
                                var firstWordLeft = rowWords[firstWordNumber].originalRect.left();
                                var lastWordLeft = rowWords[lastWordNumber].originalRect.left();

                                var wordRight = rowWords[lastWordNumber].originalRect.right();
                                var rowRight = row.originalRect.right();

                                startingCharacterInWordNum = initialSubstring.length - initialSubstring.lastIndexOf(" ") - 1;
                                var firstWordStartPosition = 0, lastWordStartPosition = 0;

                                var foundFirstWordStartPosition = false;
                                for (var charNum = 0; charNum < characterCoordinates.length; charNum++) {
                                    var characterCoordinate = characterCoordinates[charNum];
                                    if (!foundFirstWordStartPosition && Math.round(characterCoordinate) >= Math.round(firstWordLeft)) {
                                        firstWordStartPosition = charNum;
                                        foundFirstWordStartPosition = true;
                                    }
                                    if (Math.round(characterCoordinate) >= Math.round(lastWordLeft)) {
                                        lastWordStartPosition = charNum;
                                        break;
                                    }
                                }

                                var searchStartPosition = firstWordStartPosition + startingCharacterInWordNum;
                                if (searchStartPosition < characterCoordinates.length) {
                                    left = characterCoordinates[searchStartPosition];
                                }
                                else
                                    left = firstWordLeft;
                                if (left < firstWordLeft || left > wordRight)
                                    left = firstWordLeft;

                                var lastSpacePosition = searchValueThatOverlapsRow.lastIndexOf(" ");
                                var lastWordOfSearchPhrase = searchValueThatOverlapsRow.substring(lastSpacePosition + 1, searchValueThatOverlapsRow.length);
                                var searchEndPosition;
                                if (firstWordNumber == lastWordNumber)
                                    searchEndPosition = searchStartPosition + searchValueThatOverlapsRow.length;
                                else
                                    searchEndPosition = lastWordStartPosition + lastWordOfSearchPhrase.length;
                                var lastWordMatches = true;
                                if (searchEndPosition < characterCoordinates.length) {
                                    var lastWordText = rowWords[lastWordNumber].text.toLowerCase();
                                    if (lastWordText.substring(lastWordText.length - lastWordOfSearchPhrase.length, lastWordText.length) == lastWordOfSearchPhrase)
                                        right = wordRight;
                                    else {
                                        right = characterCoordinates[searchEndPosition];
                                        lastWordMatches = false;
                                    }
                                }
                                else
                                    right = rowRight;
                                if (right < left)
                                    right = rowRight;

                                if (!treatPhrasesInDoubleQuotesAsExact || !phraseIsInDoubleQuotes || lastWordMatches) {
                                    var scale = currentImageWidth / pages[pageId].originalWidth;
                                    var rowWordDesc = rowWords[firstWordNumber];
                                    this.createSearchHitDescription(scale, left, right, rowWordDesc, searchHighlightNum, pageWords, pageWordsScaledRelativeToBeginning, pageWordsUnscaled);
                                }

                                if (searchValueRemainderLength <= 0) {
                                    if (useAccentInsensitiveSearch)
                                        searchValueForThisRow = searchValueWithAccentedWords;
                                    else
                                        searchValueForThisRow = searchValue;
                                }

                                if (searchValueRemainder == null)
                                    searchHighlightNum++;

                                textPosition = rowText.indexOf(searchValueForThisRow, textPosition + searchValue.length);
                            }
                            else {
                                searchWords = this.getWords(searchValue);
                                searchWordsLen = searchWords.length;
                                if (searchWordsLen == 0)
                                    break;
                                rowWordsLen = rowWords.length;
                                if (searchWordsLen == 1) {
                                    for (wordId = 0; wordId < rowWordsLen; wordId++) {
                                        if (rowWords[wordId].text.toLowerCase() == $.trim(searchWords[0].toLowerCase())) {
                                            r = rowWords[wordId].rect.clone();
                                            r.subtract(rowWords[wordId].pageLocation);
                                            pageWords.push(r);
                                        }
                                    }

                                }
                                else {
                                    startIndex = 0;
                                    endIndex = searchWordsLen - 1;
                                    for (wordId = 0; wordId < rowWordsLen; wordId++) {
                                        if (rowWords[wordId].text.toLowerCase() == $.trim(searchWords[startIndex].toLowerCase())) {
                                            r = rowWords[wordId].rect.clone();
                                            r.subtract(rowWords[wordId].pageLocation);
                                            r.setRight(r.left() + rowWords[wordId + endIndex].rect.right() - rowWords[wordId].rect.left());
                                            pageWords.push(r);
                                        }
                                    }
                                }
                                textPosition = -1;
                            }
                        }
                    }
                }

                if (pageWords.length > 0) {
                    this.search.push({
                        PageId: PageId, pageWords: pageWords.slice(0),
                        pageWordsUnscaled: pageWordsUnscaled.slice(0),
                        pageWordsScaledRelativeToBeginning: pageWordsScaledRelativeToBeginning.slice(0)
                    });
                    seachCountItem += pageWords.length;
                    pageWords.length = 0;
                    pageWordsUnscaled.length = 0;
                    pageWordsScaledRelativeToBeginning.length = 0;
                }
            }

            this.sortHighlightedSearchAreas();
            this.highlightSearch(null, null);
            return seachCountItem;
        },

        sortHighlightedSearchAreas: function () {
            if (!this.options.useVirtualScrolling)
                return;

            var searchHits = this.search;
            var areas = searchHits.scaledRelativeToBeginningAreas;
            if (areas == null) {
                areas = new Array();
                for (var pageNum = 0; pageNum < searchHits.length; pageNum++) {
                    var hitsForPage = searchHits[pageNum].pageWordsScaledRelativeToBeginning;
                    for (var i = 0; i < hitsForPage.length; i++) {
                        hitsForPage[i].pageNum = searchHits[pageNum].PageId - 1;
                        hitsForPage[i].pageWidth = this.pages[pageNum].originalWidth;
                    }

                    areas = areas.concat(hitsForPage);
                }
            }

            var currentImageWidth = this.options.proportion * this.options.pdf2XmlWrapper.getPageSize().width;
            var scale;

            var unscaledRect;
            for (var areaNum = 0; areaNum < areas.length; areaNum++) {
                scale = currentImageWidth / areas[areaNum].pageWidth;
                unscaledRect = areas[areaNum].unscaledRect;
                areas[areaNum].rect = new jSaaspose.Rect(unscaledRect.left() * scale,
                    unscaledRect.top() * scale,
                    unscaledRect.right() * scale,
                    unscaledRect.bottom() * scale);
                areas[areaNum].rect.add(this.pageLocations[areas[areaNum].pageNum]);
            }

            areas.sort(function (areaRect1, areaRect2) {
                var verticalDifference = Math.floor(areaRect1.rect.top()) - Math.floor(areaRect2.rect.top());
                if (Math.abs(verticalDifference) >= 1)
                    return verticalDifference;
                else
                    return areaRect1.rect.left() - areaRect2.rect.left();
            });
            searchHits.scaledRelativeToBeginningAreas = areas;
            this.element.trigger("searchAreasPositions.groupdocs", [areas]);
        },

        createSearchHitDescription: function (scale,
                                              left,
                                              right,
                                              rowWordDesc,
                                              searchHighlightNum,
                                              pageWords,
                                              pageWordsScaledRelativeToBeginning,
                                              pageWordsUnscaled) {
            var r;
            r = rowWordDesc.rect.clone();
            r.subtract(rowWordDesc.pageLocation);
            var scaledLeft = left * scale;
            var scaledRight = right * scale;
            r.setLeft(scaledLeft);
            r.setRight(scaledRight);
            if (typeof searchHighlightNum != "undefined" && searchHighlightNum !== null)
                r.searchHighlightNum = searchHighlightNum;
            pageWords.push(r);

            var areaDesc = new Object();
            r = r.clone();
            r.setTop(rowWordDesc.originalRect.top() * scale);
            r.setBottom(rowWordDesc.originalRect.bottom() * scale);
            r.add(rowWordDesc.pageLocation);
            areaDesc.rect = r;
            if (typeof searchHighlightNum != "undefined" && searchHighlightNum !== null)
                areaDesc.searchHighlightNum = searchHighlightNum;
            pageWordsScaledRelativeToBeginning.push(areaDesc);

            r = rowWordDesc.originalRect.clone();
            r.setLeft(left);
            r.setRight(right);
            pageWordsUnscaled.push(r);
            areaDesc.unscaledRect = r;
        },

        getWords: function (phrase) {
            var words = $.map(phrase.split(' '),
                function (val, index) {
                    if (val != '') {
                        return val;
                    }
                });
            return words;
        },

        highlightSearch: function (startPage, endPage) {
            if (!this.search)
                return;
            var data = this.search;
            this.initHighlightSearchPaneContainer();
            var pageWord;
            var searchHighlightNumString;
            var searchHitsForPage;
            for (var i = 0; i < data.length; i++) {
                searchHitsForPage = data[i];
                var pageId = searchHitsForPage.PageId;
                if (startPage === null || endPage === null ||
                     (pageId - 1 >= startPage && pageId - 1 <= endPage)) {
                    var pageWords = searchHitsForPage.pageWords;
                    for (var j = 0; j < pageWords.length; j++) {
                        pageWord = pageWords[j];
                        searchHighlightNumString = "";
                        if (typeof pageWord.searchHighlightNum != "undefined") {
                            searchHighlightNumString = "name='search_highlight" + pageWord.searchHighlightNum + "'";
                        }
                        var highlightElementString = window.jGroupdocs.stringExtensions.format(this.searchTemplate, this.pagePrefix + pageId + "-search-highlight-" + j, "", pageWord.top(), pageWord.height(), pageWord.width(), pageWord.left(), searchHighlightNumString);
                        var highlightElementJquery = $(highlightElementString);
                        searchHitsForPage.pageWordsScaledRelativeToBeginning[j].domElement = pageWord.domElement = highlightElementJquery.get(0);
                        if (searchHitsForPage.pageWordsScaledRelativeToBeginning[j].isCurrent)
                            highlightElementJquery.addClass("current_search_highlight");
                        $('#' + this.pagePrefix + pageId + ' div.search-pane').append(highlightElementJquery);
                    }
                }
            }
        },

        changeSearchStyle: function (proportions) {
            if (this.options.useVirtualScrolling || this.search.length == 0)
                return;

            var search = this.search;
            var searchHitsForPage;
            var len = search.length;
            var searchProportions = this.searchProportions;
            
            var pageWord;
            for (var pageIndex = 0; pageIndex < len; pageIndex++) {
                searchHitsForPage = search[pageIndex];
                var pageWords = searchHitsForPage.pageWords;
                var pageWordsLen = pageWords.length;
                for (var wordIndex = 0; wordIndex < pageWordsLen; wordIndex++) {
                    pageWord = pageWords[wordIndex];
                    var w = Math.round(Math.round(pageWord.width() / searchProportions) * proportions);
                    var h = Math.round(Math.round(pageWord.height() / searchProportions) * proportions);
                    var t = Math.round(Math.round(pageWord.top() / searchProportions) * proportions);
                    var l = Math.round(((pageWord.left()) / searchProportions) * proportions);
                    $(pageWord.domElement).css({ left: l + "px", top: t + "px",
                                                 width: w + "px", height: h + "px" });
                }
            }
        },

        recalculateSearchPositions: function (proportions) {
            if (!this.options.useVirtualScrolling || this.search.length == 0)
                return;
            this.initHighlightSearchPaneContainer();

            var search = this.search;
            var len = search.length;
            for (var pageIndex = 0; pageIndex < len; pageIndex++) {
                var searchPage = search[pageIndex];
                var pageLocation = this.pageLocations[pageIndex];
                var pageWordsUnscaled = searchPage.pageWordsUnscaled;
                var pageWordsLen = pageWordsUnscaled.length;
                var w, h, t, l;
                for (var wordIndex = 0; wordIndex < pageWordsLen; wordIndex++) {
                    l = Math.round(pageWordsUnscaled[wordIndex].left() * proportions);
                    w = Math.round(pageWordsUnscaled[wordIndex].width() * proportions);
                    t = Math.round(pageWordsUnscaled[wordIndex].top() * proportions);
                    h = Math.round(pageWordsUnscaled[wordIndex].height() * proportions);
                    searchPage.pageWords[wordIndex].set(l, t, l + w, t + h);
                    var locationRelativeToPage = searchPage.pageWords[wordIndex].clone();
                    locationRelativeToPage.add(pageLocation);
                    searchPage.pageWordsScaledRelativeToBeginning[wordIndex].rect = locationRelativeToPage;
                }
            }
            this.sortHighlightedSearchAreas();
        },

        clearAllTimeOuts: function () {
            var timeouts = this.timeouts;
            var len = timeouts.length;
            if (len > 0) {
                for (var i = len; i--;) {
                    clearTimeout(timeouts[i]);
                }
                timeouts = [];
            }
        },

        _getElementsByClassName: function (classname, node) {
            if (!node) node = document.getElementsByTagName("body")[0];
            var a = [];
            var re = new RegExp('\\b' + classname + '\\b');
            var els = node.getElementsByTagName("*");
            for (var i = 0, j = els.length; i < j; i++)
                if (re.test(els[i].className)) a.push(els[i]);
            return a;
        },

        highlightTemplateAreas: function (data, proportion) {
            this.customArea = $.extend(true, [], data);
            this.changeCustomAreasStyle(proportion);
        },

        changeCustomAreasStyle: function (proportions) {
            if (typeof (this.customArea) === "undefined") {
                return;
            }
            if (this.customArea.length == 0)
                return;
            //this.prevCustomTemplateProportions
            var self = this;
            var area = this.customArea;
            var dif = 31;
            var len = area.length;

            $('#' + this.options.docSpace.attr('id') + '-pages-container .custom-pane').html('');

            var pageIndex = 0;
            var result = '';

            (function changeCustomAreasStyleAsync() {
                var fields = area[pageIndex].fields;
                var fieldsLen = fields.length;
                var pageId = area[pageIndex].PageId;

                for (var fieldsIndex = 0; fieldsIndex < fieldsLen; fieldsIndex++) {
                    var w = Math.round(Math.round(fields[fieldsIndex].Width) * proportions);
                    var h = Math.round(Math.round(fields[fieldsIndex].Height) * proportions);
                    var t = Math.round(Math.round(fields[fieldsIndex].Y) * proportions);
                    var l = Math.round(((fields[fieldsIndex].X - dif)) * proportions + dif);

                    var extraStyles = (self.cAreaPageIndex == pageIndex && self.cAreaFieldIndex == fieldsIndex ? 'border-color:blue' : '');
                    result += "<div id=" + this.pagePrefix + pageIndex + "-custom-highlight-" + fieldsIndex + " index=" + pageIndex + "/" + fieldsIndex + " class='input-overlay1' style='position:absolute; cursor:pointer; padding: 0px; top: " + t + "px; height: " + h + "px; width: " + w + "px; left: " + l + "px;" + extraStyles + "'></div>";

                    var customAreaHtml = window.jGroupdocs.stringExtensions.format(self.addTemplate, this.pagePrefix + pageIndex + "-custom-check-" + fieldsIndex, t - 5, l + w - 8, fields[fieldsIndex].iconType == 1 ? "selection-check" : "selection-del", pageIndex + "/" + fieldsIndex);
                    result += customAreaHtml;
                    //result += self.addTemplate.format(this.pagePrefix + pageIndex + "-custom-check-" + fieldsIndex, t - 5, l + w - 8, fields[fieldsIndex].iconType == 1 ? "selection-check" : "selection-del", pageIndex + "/" + fieldsIndex);
                }

                ++pageIndex;
                var nextPageId = (pageIndex < len ? area[pageIndex].PageId : -1);

                if (result != '' && nextPageId != pageId) {
                    $('#' + this.pagePrefix + pageId + ' .custom-pane').html(result);
                    self.bindCustomHandler(pageId);
                    result = '';
                }

                if (pageIndex < len) {
                    setTimeout(changeCustomAreasStyleAsync, 0);
                }
            })();
        },

        bindCustomHandler: function (pageId) {
            var self = this;
            $("#" + this.pagePrefix + pageId + " div.input-overlay1, #" + this.pagePrefix + pageId + " div.selection-check, #" + this.pagePrefix + pageId + " div.selection-del").bind({
                click: function () {
                    var index = $(this).attr('index');
                    var dvViewModel = $('#doc-space').docAssemblyViewer('getViewModel');
                    if (typeof (index) !== "undefined") {
                        var indexArray = index.split("/");
                        var pageIndex = indexArray[0];
                        var fieldIndex = indexArray[1];
                        self.cAreaPageIndex = pageIndex;
                        self.cAreaFieldIndex = fieldIndex;
                        dvViewModel.moveTo({ groupIndex: parseInt(pageIndex), fieldIndex: parseInt(fieldIndex) });
                        return false;
                    }
                }
            });
            $("#" + this.pagePrefix + pageId + " div.input-overlay1").bind({
                mouseover: function (e) {
                    var index = $(this).attr('index');
                    var dvViewModel = $('#doc-space').docAssemblyViewer('getViewModel');
                    if (typeof (index) !== "undefined") {
                        var indexArray = index.split("/");
                        var pageIndex = indexArray[0];
                        var fieldIndex = indexArray[1];
                        dvViewModel.mouseover(e, { groupIndex: parseInt(pageIndex), fieldIndex: parseInt(fieldIndex) });
                    }
                },
                mouseout: function (e) {
                    var index = $(this).attr('index');
                    var dvViewModel = $('#doc-space').docAssemblyViewer('getViewModel');
                    if (typeof (index) !== "undefined") {
                        var indexArray = index.split("/");
                        var pageIndex = indexArray[0];
                        var fieldIndex = indexArray[1];
                        dvViewModel.mouseout(e, { groupIndex: parseInt(pageIndex), fieldIndex: parseInt(fieldIndex) });
                    }
                }
            });
        },

        setCustomAreaIndex: function (data) {
            var pageIndex = data.pageIndex;
            var fieldIndex = data.fieldIndex;
            this.cAreaPageIndex = pageIndex;
            this.cAreaFieldIndex = fieldIndex;
        },

        changeTemplateAreaIcon: function (data) {
            var customArea = this.customArea;
            var fields = customArea[data.pageIndex].fields;
            var elementIdTemplate = this.pagePrefix + "{0}-custom-check-{1}";
            var elementId = window.jGroupdocs.stringExtensions.format(elementIdTemplate, data.pageIndex, data.fieldIndex);
            //var elementId = elementIdTemplate.format(data.pageIndex, data.fieldIndex);
            $('#' + elementId).attr('class', data.iconType == 1 ? "selection-check" : "selection-del");
            fields[data.fieldIndex].iconType = data.iconType;
        },

        findSelectedPages: function (isStatic, clickHandler, selectionCounter, color, hoverHandlers) {
            if (this._mode != this.SelectionModes.SelectText && this._mode != this.SelectionModes.SelectTextToStrikeout) {
                return;
            }

            if (typeof selectionCounter == "undefined")
                selectionCounter = this.selectionCounter;
            var rects = this._getDocumentHighlightRects(selectionCounter);
            if (!rects || rects.length == 0) {
                return;
            }

            var highlightPane = null, lastPageId = null;
            var template = "<div id='{0}' class='highlight selection-highlight' style='top: {1}px; height: {2}px;'></div>";
            var rect;
            for (var i = 0; i < rects.length; i++) {
                rect = rects[i];
                var bounds = rect.bounds;
                var pageId = rect.page + 1;
                var rowId = rect.row + 1;
                if (highlightPane == null || (lastPageId != null && lastPageId != pageId)) {
                    highlightPane = this.element.find('#' + this.pagePrefix + pageId + ' div.highlight-pane');
                    lastPageId = pageId;
                }

                var pageRowId = this.pagePrefix + pageId + "-highlight-" + rowId + "-" + selectionCounter;
                var pageRow = highlightPane.find("#" + pageRowId);

                if (pageRow.length == 0) {
                    var div = $(window.jGroupdocs.stringExtensions.format(template, pageRowId, bounds.top() + this._selectionTopIncreaseWhenCreatingAreas, bounds.height()));

                    highlightPane.append(div);
                    pageRow = div;
                }

                pageRow.data("gd-rect", rect); // gd means Groupdocs

                if (clickHandler) {
                    var ev = $._data(pageRow.get(0), 'events');
                    if (!ev || !ev.click) {
                        pageRow.click(clickHandler);
                    }
                }

                if (hoverHandlers) {
                    var ev = $._data(pageRow.get(0), 'events');
                    if (!ev || !ev.mouseover)
                        pageRow.hover(hoverHandlers.mouseenter, hoverHandlers.mouseleave);
                }

                if (isStatic) {
                    pageRow.addClass("static");

                    if (color)
                        pageRow.css('background-color', color);
                }

                pageRow.css({ "left": bounds.left(), "width": bounds.width(), "height": bounds.height() });

                if (!this.options.bookLayout) {
                    var page = this.pages[rects[i].page];
                    var pageRotation = page.rotation;
                    if (typeof pageRotation == "undefined")
                        pageRotation = 0;
                    var perpendicular = pageRotation % 180 > 0;
                    if (perpendicular)
                        pageRow.css({ "top": bounds.top() });
                }
            }
        },

        _getDocumentHighlightRects: function (selectionCounter) {
            var pages = this.pages;
            if (pages.length == 0)
                return null;

            var self = this;
            var lasso = self.lasso;
            var rects = [];

            for (var i = 0; i < pages.length; i++) {
                if (pages[i] && lasso.intersects(pages[i].rect)) {
                    var r = self._getPageHighlightRects(i, selectionCounter);
                    if (r && r.length) {
                        rects = rects.concat(r);
                    }
                }
            }

            return rects;
        },

        _getPageHighlightRects: function (pageIndex, selectionCounter) {
            var lasso = this.lasso;
            var rows = this.pages[pageIndex].rows;
            var rects = [];

            for (var i = 0; i < rows.length; i++) {
                if (!lasso.intersects(rows[i].rect)) {
                    if (this.dragged) {
                        $("#" + this.pagePrefix + (pageIndex + (this.options.bookLayout ? this.options.startNumbers.start : 1)) +
                          "-highlight-" + (i + 1) + "-" + selectionCounter + ":not(.static)").remove();
                    }

                    continue;
                }

                var rowRect = rows[i].rect;
                if ((lasso.left() < rowRect.left() && lasso.bottom() > rowRect.bottom()) ||
                    (lasso.right() > rowRect.right() && lasso.top() < rowRect.top()) ||
                    (lasso.bottom() > rowRect.bottom() && lasso.top() < rowRect.top())) {

                    var bounds = new jSaaspose.Rect(rowRect.left(), rowRect.top() + this._selectionTopIncreaseWhenFindingRects, rowRect.right(), rowRect.bottom() + this._selectionBottomIncrease);
                    bounds.subtract(rows[i].pageLocation);

                    var r = {
                        bounds: bounds,
                        originalRect: rows[i].originalRect,
                        text: '',
                        page: pageIndex + (this.options.bookLayout ? this.options.startNumbers.start - 1 : 0),
                        row: i,
                        position: -1,
                        length: 0
                    };
                    rects.push(r);

                    if (!this.dragged) {
                        var lastWord = rows[i].words[rows[i].words.length - 1];
                        r.text = rows[i].text;
                        r.position = rows[i].words[0].position;
                        r.length = (lastWord.position + lastWord.text.length - r.position);
                    }
                }
                else {
                    var r = this._getRowHighlightRect(pageIndex, i);
                    if (r != null) {
                        rects.push(r);
                    }
                    else
                        if (this.dragged) {
                            $("#" + this.pagePrefix + (pageIndex + (this.options.bookLayout ? this.options.startNumbers.start : 1)) +
                            "-highlight-" + (i + 1) + "-" + selectionCounter + ":not(.static)").remove();
                        }
                }
            }

            return rects;
        },

        _getRowHighlightRect: function (pageIndex, rowIndex) {
            var lasso = this.lasso;

            var lassoTop = Math.min(lasso.top(), lasso.bottom()),
                lassoBottom = Math.max(lasso.top(), lasso.bottom());

            var page = this.pages[pageIndex];
            var pageRotation = page.rotation;
            if (typeof pageRotation == "undefined")
                pageRotation = 0;
            var perpendicular = pageRotation % 180 > 0;

            var row = page.rows[rowIndex],
                rowTop = row.rect.top(),
                rowBottom = row.rect.bottom();

            var objectsToSelect = (this._textSelectionByCharModeEnabled && row.chars) ? row.chars : row.words;

            var selectToEnd = (rowTop < lassoTop && lassoTop < rowBottom && lassoBottom >= rowBottom) && !perpendicular,
                selectFromStart = (lassoTop <= rowTop && rowTop < lassoBottom && lassoBottom < rowBottom),
                increment = (selectFromStart ? -1 : 1),
                i = (selectFromStart ? objectsToSelect.length - 1 : 0);

            for (; i < objectsToSelect.length && i >= 0 && !lasso.intersects(objectsToSelect[i].rect) ; i += increment) {
                objectsToSelect[i].shown = false;
            }

            if (i == objectsToSelect.length || i < 0) {
                return null;
            }

            var objectToSelect = objectsToSelect[i];
            var right = 0, bottom = 0;
            var left = objectToSelect.rect.left(),
                top = objectToSelect.rect.top();
            var originalLeft = objectToSelect.originalRect.left(),
                originalTop = objectToSelect.originalRect.top();
            var originalRight = 0, originalBottom = 0;
            var result = {
                bounds: null,
                text: '',
                page: pageIndex + (this.options.bookLayout ? this.options.startNumbers.start - 1 : 0),
                row: rowIndex,
                position: objectToSelect.position,
                length: objectToSelect.text.length
            };

            for (; i < objectsToSelect.length && i >= 0 && (selectFromStart || selectToEnd || lasso.intersects(objectsToSelect[i].rect)) ; i += increment) {
                objectToSelect = objectsToSelect[i];
                objectToSelect.shown = true;

                if (!this.dragged) {

                    if (!this._textSelectionByCharModeEnabled) {
                        if (selectFromStart)
                            result.text = objectToSelect.text + " " + result.text;
                        else
                            result.text += objectToSelect.text + " ";
                    }
                    else if (this._textSelectionByCharModeEnabled) {
                        result.text += objectToSelect.text;
                        if (objectToSelect.isLastWordChar) {
                            result.text += ' ';
                        }
                    }
                }

                left = Math.min(left, objectToSelect.rect.left());
                top = Math.min(top, objectToSelect.rect.top());
                right = Math.max(right, objectToSelect.rect.right());
                bottom = Math.max(bottom, objectToSelect.rect.bottom());

                originalLeft = Math.min(originalLeft, objectToSelect.originalRect.left());
                originalTop = Math.min(originalTop, objectToSelect.originalRect.top());
                originalRight = Math.max(originalRight, objectToSelect.originalRect.right());
                originalBottom = Math.max(originalBottom, objectToSelect.originalRect.bottom());
            }

            for (; i < objectsToSelect.length && i >= 0; i += increment) {
                objectsToSelect[i].shown = false;
            }

            var bounds = new jSaaspose.Rect(left, top + this._selectionTopIncreaseWhenFindingRects, right, bottom + this._selectionBottomIncrease);
            bounds.subtract(page.rect.topLeft);
            result.bounds = bounds;

            var originalBounds = new jSaaspose.Rect(originalLeft, originalTop + this._selectionTopIncreaseWhenFindingRects, originalRight, originalBottom + this._selectionBottomIncrease);
            result.originalRect = originalBounds;

            // result.length = (objectToSelect.position - result.position + objectToSelect.text.length);
            result.length = (objectToSelect.position + objectToSelect.text.length);

            return result;
        },

        _findPageAt: function (point) {

            if (this.pages != null) {
                for (var i = 0; i < this.pages.length; i++) {
                    if (this.pages[i].rect.contains(point)) {
                        return this.pages[i];
                    }
                }
            }

            return null;
        },

        _findPageNearby: function (point) {
            var minHorizontalDifference = 0, minVerticalDifference = 0, pageNumber = null;
            var foundVerticalMatch = false, foundHorizontalMatch = false;

            for (var i = 0; i < this.pages.length; i++) {
                if (this.pages[i].rect.contains(point)) {
                    return this.pages[i];
                }
                else if (point.y >= this.pages[i].rect.top() && point.y <= this.pages[i].rect.bottom()) {
                    var horizontalDifference = Math.abs(point.x - this.pages[i].rect.left());
                    if (!foundVerticalMatch || horizontalDifference < minHorizontalDifference) {
                        minHorizontalDifference = horizontalDifference;
                        foundVerticalMatch = true;
                        pageNumber = i;
                    }
                }
                else if (point.x >= this.pages[i].rect.left() && point.x <= this.pages[i].rect.right()) {
                    var verticalDifference = Math.abs(point.y - this.pages[i].rect.top());
                    if (!foundHorizontalMatch || verticalDifference < minVerticalDifference) {
                        minVerticalDifference = verticalDifference;
                        foundHorizontalMatch = true;
                        pageNumber = i;
                    }
                }
            }

            return this.pages[pageNumber];
        },

        findPageAtVerticalPosition: function (y) {
            for (var i = 0; i < this.pages.length; i++) {
                if ((y >= this.pages[i].rect.top() && y <= this.pages[i].rect.bottom())
                    || (y >= this.pages[i].rect.bottom() && (i + 1) >= this.pages.length)
                    || (y >= this.pages[i].rect.bottom() && y <= this.pages[i + 1].rect.top())) {
                    return this.pages[i];
                }
            }
            return null;
        },

        setTextSelectionMode: function (mode) {
            this._textSelectionByCharModeEnabled = mode;
        },

        setMode: function (mode) {
            this._mode = mode;

            if (mode == this.SelectionModes.SelectText || mode == this.SelectionModes.SelectTextToStrikeout) {
                if (this._lassoCssElement == null)
                    this._lassoCssElement = $('<style type="text/css">.ui-selectable-helper { visibility: hidden; }</style>').appendTo('head');
            }
            else
                if (this._lassoCssElement) {
                    this._lassoCssElement.remove();
                    this._lassoCssElement = null;
                }
        },

        getMode: function () {
            return this._mode;
        },

        getRowsFromRect: function (bounds) {
            this.initStorage();

            var rect = null;
            this.lasso = bounds.clone();
            this.lasso = new jSaaspose.Rect(Math.round(this.lasso.left()), Math.round(this.lasso.top()) + 0.001,
                                            Math.round(this.lasso.right()), Math.round(this.lasso.bottom()) - 0.001);

            var rects = this._getDocumentHighlightRects();
            for (var i = 0; i < rects.length; i++) {
                rect = rects[i].bounds;
                var pageOffsetX = this.pages[rects[i].page].rect.topLeft.x - this.pages[0].rect.topLeft.x;
                var pageOffsetY = this.pages[rects[i].page].rect.topLeft.y; // -this.pages[0].rect.topLeft.y;
                rect.add(new jSaaspose.Point(pageOffsetX, pageOffsetY));
            }
            return rects;
        }
    });
})(jQuery);
ko.bindingHandlers.fileDnD = {
    _enabled: true,

    init: function (element, valueAccessor) {
        var options = valueAccessor();
        var self = this;

        $(element).bind('dragover', function (e) {
            var evt = e.originalEvent;
            if (self._enabled && evt.dataTransfer) {
                evt.stopPropagation();
                evt.preventDefault();
                evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
            }
        });

        $(element).bind('drop', function (e) {
            var evt = e.originalEvent;
            if (self._enabled && evt.dataTransfer) {
                evt.stopPropagation();
                evt.preventDefault();

                var params;
                if (evt.dataTransfer.items) {
                    var webkit = evt.dataTransfer.items[0].webkitGetAsEntry();
                    if (webkit.isFile) {
                        params = evt.dataTransfer.files
                    }
                    else if (evt.currentTarget.className != "step1_dropfile") { //reject folders if is assembly app
                        params = evt.dataTransfer.items
                    }
                }
                else {
                    params = evt.dataTransfer.files;
                }

                $(element).trigger('onFilesDragged', [params]);
            }
        });
    },

    update: function (element, valueAccessor, allBindingsAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()) || {};
        var enabledValue = ko.utils.unwrapObservable(value['enabled']);
        this._enabled = (enabledValue === null || enabledValue === undefined || enabledValue === true);
    }
};
