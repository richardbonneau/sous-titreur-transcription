(this["webpackJsonpsous-titres"]=this["webpackJsonpsous-titres"]||[]).push([[0],{163:function(e,t,n){},168:function(e,t,n){},211:function(e,t,n){"use strict";n.r(t);var i,r,a,c,s,o=n(0),u=n(19),l=n.n(u),d=(n(163),n(6)),b=n(9),j=n(8),p="DATA_REQUEST",f="DATA_SUCCESS",h="MODIFY_SINGLE_CAPTION",O="ADD_NEW_CAPTION",m="DELETE_CAPTION",x="CURRENTLY_SELECTED",g="MODIFY_MULTIPLE_CAPTIONS",v="CURRENT_TIME",y=function(e,t){return{type:h,subIndex:t,newCaption:e}},w=function(e){return{type:m,subIndex:e}},_=function(e){return{type:x,subIndex:e}},T=(n(168),n(10)),k=n(20),S=n(214),C=n(25),E="SEEKING",I="VERTICAL_ZOOM",z="HORIZONTAL_ZOOM",M=n(1),N=T.a.div(i||(i=Object(b.a)(["\n  padding: 0.01em;\n  .bp3-card {\n    display: flex;\n    margin: 5px;\n  }\n  .bp3-icon-trash {\n    width: 3em;\n    display: flex;\n    justify-content: center;\n    cursor: pointer;\n    margin: -2em -2em 0 0;\n    padding: 1em;\n    height: 45px;\n  }\n"]))),R=T.a.div(r||(r=Object(b.a)(["\n  font-size: 1.3em;\n  opacity: 0.4;\n  padding-bottom: 0.5em;\n  cursor: pointer;\n"]))),D=T.a.div(a||(a=Object(b.a)(["\n  width: 110px;\n  display: flex;\n  flex-direction: column;\n  .subtime {\n    opacity: 0.5;\n    display: flex;\n  }\n  input {\n    padding-right: 1em;\n    border: none;\n  }\n  input:focus {\n    border: 1px solid black;\n  }\n"]))),A=T.a.div(c||(c=Object(b.a)(["\n  width: 100%;\n  display: flex;\n  align-items: flex-end;\n  textarea {\n    height: 100%;\n    width: 99%;\n    text-align: center;\n    resize: none;\n    border: none;\n  }\n"]))),F=T.a.div(s||(s=Object(b.a)(["\n  opacity: 0.5;\n"])));var U,L,Z=function(e){var t=e.subIndex,n=e.subData,i=e.openDeleteCaptionDialog,r=Object(j.b)(),a=Object(o.useRef)(),c=Object(o.useState)(!1),s=Object(k.a)(c,2),u=s[0],l=s[1],b=Object(o.useState)(""),p=Object(k.a)(b,2),f=p[0],h=p[1],m=Object(o.useState)(""),x=Object(k.a)(m,2),g=x[0],v=x[1],T=Object(o.useState)(""),I=Object(k.a)(T,2),z=I[0],U=I[1],L=Object(o.useState)([]),Z=Object(k.a)(L,2),X=Z[0],B=Z[1],K=Object(j.c)((function(e){return e.data.subtitles})),V=Object(j.c)((function(e){return e.data.currentlySelected}));Object(o.useEffect)((function(){var e=n.lines.map((function(e){return e.length}));B(e);var t=n.lines.join("\n");U(t),h(new Date(1e3*n.start).toISOString().substr(11,12)),v(new Date(1e3*n.end).toISOString().substr(11,12))}),[K]),Object(o.useEffect)((function(){V===t&&a.current.scrollIntoView({behavior:"smooth"})}),[V]);var P=function(e){var t=e.split(":");return 3600*t[0]+60*t[1]+ +t[2]},H=function(){var e,i,a=P(f),c=P(g),s=t>0?K[t-1].end:0,o=t<K.length-1?K[t+1].start:9999;e=a>s&&a<n.end?a:a>n.end?n.end:s,i=c<o&&c>n.start?c:c<n.start?n.start:o;var u=Object(d.a)({},n);isNaN(e)||(u.start=e),isNaN(i)||(u.end=i),r(y(u,t))},W=function(e){"Enter"===e.key&&H()};return Object(M.jsx)(N,{ref:a,children:Object(M.jsxs)(S.b,{elevation:C.a.ONE,style:V===t?{border:"2px solid black"}:{},onClick:function(){var e;r(_(t)),r((e=n.start+1e-4,{type:E,seekingTime:e}))},children:[Object(M.jsxs)(D,{children:[Object(M.jsx)(R,{children:t+1}),Object(M.jsxs)("div",{className:"subtime",children:[Object(M.jsx)(S.d,{icon:"double-chevron-right"}),Object(M.jsx)("input",{value:f,onKeyUp:W,onChange:function(e){return h(e.target.value)},onBlur:H})]}),Object(M.jsxs)("div",{className:"subtime",children:[Object(M.jsx)(S.d,{icon:"double-chevron-left"}),Object(M.jsx)("input",{value:g,onKeyUp:W,onChange:function(e){return v(e.target.value)},onBlur:H})]})]}),Object(M.jsx)(A,{children:Object(M.jsx)("textarea",{onKeyDown:function(e){var i=n.lines.join("\n");if("Shift"===e.key)l(!0);else if(u||"Enter"!==e.key)"Backspace"===e.key&&""===z&&r(w(t));else{e.preventDefault();var a=i.substr(0,e.target.selectionStart).split("\n"),c=i.substr(e.target.selectionStart).split("\n");r(function(e,t,n){return{type:O,oldCaption:e,subIndex:n,newCaption:t}}(a,c,t))}},onKeyUp:function(e){"Shift"===e.key&&l(!1)},type:"text",onChange:function(e){return U(e.target.value)},onBlur:function(){var e=z.split("\n"),i=Object(d.a)(Object(d.a)({},n),{},{lines:e});r(y(i,t))},value:z})}),Object(M.jsx)(F,{children:X.map((function(e,t){return Object(M.jsx)("div",{children:e},"char"+t)}))}),Object(M.jsx)(S.d,{icon:"trash",onClick:function(){return i(t)}})]})})},X=T.a.div(U||(U=Object(b.a)(["\n  width: 100%;\n  min-width: 700px;\n  height: 100%;\n  overflow-y: scroll;\n  overflow-x: hidden;\n  flex: 1;\n"]))),B=T.a.div(L||(L=Object(b.a)(["\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  margin-top: 30px;\n  button {\n    margin: 1em;\n  }\n"])));var K,V,P=function(){var e=Object(j.b)(),t=Object(o.useState)(!1),n=Object(k.a)(t,2),i=n[0],r=n[1],a=Object(o.useState)(null),c=Object(k.a)(a,2),s=c[0],u=c[1],l=Object(j.c)((function(e){return e.data.subtitles})),d=function(e){u(e),r(!0)};return Object(M.jsxs)(X,{children:[l.map((function(e,t){return Object(M.jsx)(Z,{subIndex:t,subData:e,openDeleteCaptionDialog:d},"sub"+t)})),Object(M.jsx)(S.c,{icon:"info-sign",onClose:function(){return r(!1)},title:"Supprimer ce sous-titre",isOpen:i,children:Object(M.jsxs)(B,{children:[Object(M.jsx)("div",{children:"\xcates-vous s\xfbr de vouloir supprimer ce sous-titre?"}),Object(M.jsxs)("div",{children:[Object(M.jsx)(S.a,{intent:"success",onClick:function(){r(!1),e(w(s))},children:"Oui"}),Object(M.jsx)(S.a,{intent:"danger",onClick:function(){return r(!1)},children:"Non"})]})]})})]})},H=n(104),W=n.n(H);function G(e){e.draggable=!0,this._options=e}function J(e){return new G(e)}G.prototype.init=function(e){var t=this._options.startMarker?0:-15,n=this._options.startMarker?-24:24,i=this._options.startMarker?this._options.segment.startTime:this._options.segment.endTime;this._label=new window.Konva.Text({x:n,y:0,text:this._options.layer.formatTime(i),fontFamily:this._options.fontFamily,fontSize:this._options.fontSize,fontStyle:this._options.fontStyle,fill:"#000",textAlign:"center"}),this._label.hide(),this._handle=new window.Konva.Rect({x:t,y:0,width:15,height:30,fill:this._options.color,stroke:this._options.color,strokeWidth:1}),this._caption=new window.Konva.Text({x:n+40,y:15,text:this._options.segment._id+1+": "+this._options.segment.attributes.label,fontFamily:this._options.fontFamily,fontSize:this._options.fontSize,fontStyle:this._options.fontStyle,fill:"#000",textAlign:"left"}),this._line=new window.Konva.Line({x:0,y:0,stroke:this._options.color,strokeWidth:1}),e.add(this._label),e.add(this._line),e.add(this._handle),this._options.startMarker&&e.add(this._caption),this.fitToView(),this.bindEventHandlers(e)},G.prototype.bindEventHandlers=function(e){var t=this;setTimeout((function(){t.resizeCaption(),function(e,t){t.attrs.dragBoundFunc=function(e){return function(t){e.resizeCaption();var n=e._options.layer._segmentShapes[e._options.segment._id].getStartMarker(),i=e._options.layer._segmentShapes[e._options.segment._id].getEndMarker(),r=e._options.layer._segmentShapes[e._options.segment._id+1],a={min:0,max:9999};if(e._options.startMarker){var c=e._options.layer._segmentShapes[e._options.segment._id-1];i&&(a.max=i.getX()-i.getWidth()),c&&(a.min=c.getStartMarker().getX(),c.getEndMarker().getX()>=t.x&&t.x>a.min&&(c.getEndMarker().setX(t.x),c._segment._setEndTime(c._view.pixelsToTime(c._view.getFrameOffset()+t.x)),c.getEndMarker()._marker.resizeCaption()))}else n&&(a.min=n.getX()+n.getWidth()),r&&(a.max=r.getEndMarker().getX(),r.getStartMarker().getX()<=t.x&&t.x<a.max&&(r.getStartMarker().setX(t.x),r._segment._setStartTime(r._view.pixelsToTime(r._view.getFrameOffset()+t.x)),r.getStartMarker()._marker.resizeCaption()));return{x:t.x>a.max?a.max:t.x<a.min?a.min:t.x,y:0}}}(e)}(t,e)}),50)},G.prototype.resizeCaption=function(){var e=this._options.layer._segmentShapes[this._options.segment._id];if(e){var t=e.getStartMarker(),n=e.getEndMarker(),i=t._group.children[3];i&&i.setWidth(n.getX()-t.getX()-30),this._options.layer.draw()}},G.prototype.fitToView=function(){var e=this._options.layer.getHeight();this._label.y(e/2-5),this._handle.y(e/2-10.5),this._line.points([.5,0,.5,e])},G.prototype.timeUpdated=function(e){this._label.setText(this._options.layer.formatTime(e))};var Y=T.a.div(K||(K=Object(b.a)(["\n  height: 240px;\n  width: 100%;\n  .bp3-spinner {\n    position: absolute;\n    transform: translate(50vw, 50%);\n  }\n  .zoomview-container {\n    box-shadow: 3px 3px 20px #919191;\n    -moz-box-shadow: 3px 3px 20px #919191;\n    -webkit-box-shadow: 3px 3px 20px #919191;\n    margin: 5px 0;\n    line-height: 0;\n  }\n\n  .overview-container {\n    box-shadow: 3px 3px 20px #919191;\n    -moz-box-shadow: 3px 3px 20px #919191;\n    -webkit-box-shadow: 3px 3px 20px #919191;\n    line-height: 0;\n    height: 85px;\n  }\n"]))),q=T.a.div(V||(V=Object(b.a)(["\n  width: 100%;\n  height: 100%;\n  background: #ced9e0;\n  z-index: 100;\n  position: fixed;\n"])));var Q,$=function(){var e=Object(j.b)(),t=Object(o.useState)(!1),n=Object(k.a)(t,2),i=n[0],r=n[1],a=Object(j.c)((function(e){return e.data.peaksUrl})),c=Object(j.c)((function(e){return e.media.verticalZoom})),s=Object(j.c)((function(e){return e.media.horizontalZoom})),u=Object(j.c)((function(e){return e.data.currentlySelected})),l=Object(j.c)((function(e){return e.data.subtitles})),b=Object(o.useRef)(),p=Object(o.useRef)(),f=Object(o.useRef)(),h=Object(o.useRef)(),O=Object(o.useRef)(),m=Object(o.useRef)();Object(o.useEffect)((function(){a&&v()}),[a]),Object(o.useEffect)((function(){b.current&&b.current.views.getView("zoomview").setAmplitudeScale(c)}),[c]),Object(o.useEffect)((function(){b.current&&(b.current.zoom.setZoom(s),b.current.segments.removeAll(),x())}),[s]),Object(o.useEffect)((function(){O.current=l}),[l]),Object(o.useEffect)((function(){m.current=u}),[u]),Object(o.useEffect)((function(){if(b.current){var e=b.current.segments.getSegments();e.length!==l.length?x():l.forEach((function(t,n){var i=null;t.start!==e[n].startTime?i={startTime:t.start}:t.end!==e[n].endTime?i={endTime:t.end}:t.lines.join("\n")!==e[n].attributes.label&&(i={attributes:{label:t.lines.join("\n")}}),i&&e[n].update(i)}))}}),[l]);var x=function(){b.current.segments.removeAll(),b.current.segments.add(l.map((function(e,t){return{startTime:e.start,endTime:e.end,editable:!0,id:t,attributes:{label:e.lines.join("\n"),visibleMarkers:!1}}})))},v=function(){h.current=document.querySelector(".video-react-video");var e={containers:{overview:f.current,zoomview:p.current},mediaElement:h.current,dataUri:{arraybuffer:a},zoomLevels:[256,512,1024,2048,4096],keyboard:!0,logger:console.error.bind(console),randomizeSegmentColor:!1,zoomWaveformColor:"#6a6a6a",segmentColor:"#f8f8f8",segmentStartMarkerColor:"#00ff11",segmentEndMarkerColor:"#ff0000",overviewHighlightColor:"blue",emitCueEvents:!0,height:150};W.a.init(e,(function(e,t){e&&console.error("err",e),b.current=t,t.options.createSegmentMarker=J,t.on("segments.enter",w),t.on("segments.dragend",y),x(),r(!0)}))},y=function(t,n){var i=n?t.id-1:t.id+1,r=t._peaks.segments._segmentsById[i],a=[];if(r)if(n){if(r.endTime<O.current[i].end){var c=Object(d.a)({},O.current[i]);c.end=r.endTime,a.push({newCaption:c,index:i})}}else if(r.startTime>O.current[i].start){var s=Object(d.a)({},O.current[i]);s.start=r.startTime,a.push({newCaption:s,index:i})}var o=Object(d.a)({},O.current[t.id]);o.start=t._startTime,o.end=t.endTime,a.push({newCaption:o,index:t.id}),e({type:g,newCaptions:a})},w=function(t){t.id!==m.current&&e(_(t.id))};return Object(M.jsxs)(Y,{children:[!i&&Object(M.jsx)(q,{children:Object(M.jsx)(S.h,{})}),Object(M.jsx)("div",{className:"zoomview-container",ref:p}),Object(M.jsx)("div",{className:"overview-container",ref:f})]})},ee=T.a.div(Q||(Q=Object(b.a)(["\n  background: #ced9e0;\n  width: 100%;\n\n  @media (min-width: 1040px) {\n    display: block;\n  }\n"])));var te,ne=function(){return Object(M.jsx)(ee,{children:Object(M.jsx)($,{})})},ie=n(32),re=T.a.div(te||(te=Object(b.a)(["\n  margin-bottom: 0.5em;\n  .bp3-navbar {\n    background-color: #293742;\n    color: white;\n  }\n  .bp3-button {\n    color: white;\n    border: 1px solid white;\n    margin: 0 5px;\n  }\n"])));var ae,ce=function(){var e=Object(j.c)((function(e){return e.data.ident})),t=Object(j.c)((function(e){return e.data.subtitles}));return Object(M.jsx)(re,{children:Object(M.jsxs)(S.f,{children:[Object(M.jsx)(S.f.Group,{align:ie.a.LEFT,children:Object(M.jsx)(S.f.Heading,{children:"Sous-Titreur"})}),Object(M.jsx)(S.f.Group,{align:ie.a.RIGHT,children:Object(M.jsx)(S.a,{outlined:!0,icon:"floppy-disk",text:"Sauvegarder",onClick:function(){fetch("https://api.soustitreur.com/customer/save-srt",{headers:{Accept:"application/json","Content-Type":"application/json"},method:"post",body:JSON.stringify({ident:e,subtitles:t})}).then((function(e){return e.json()})).then((function(e){console.log(e)}))}})})]})})},se=n(105),oe=n(52),ue=n(107),le=T.a.div(ae||(ae=Object(b.a)(["\n  max-width: 600px;\n  padding: 0 1em;\n  width: 100%;\n"])));var de,be,je,pe,fe=function(e){var t=e.playbackSpeed,n=Object(j.b)(),i=Object(o.useRef)(),r=Object(o.useRef)(),a=Object(j.c)((function(e){return e.data.videoUrl})),c=Object(j.c)((function(e){return e.data.subtitles})),s=Object(j.c)((function(e){return e.media.seekingTime}));return Object(ue.a)("ctrl+space",(function(){return r.current?i.current.pause():i.current.play()}),{enableOnTags:["TEXTAREA"]}),Object(o.useEffect)((function(){i.current.subscribeToStateChange((function(e){var t;r.current!==!e.paused&&(r.current=!e.paused),n((t=e.currentTime,{type:v,time:t}))}))}),[]),Object(o.useEffect)((function(){if(i.current){var e,t=i.current.video.video,n=Object(se.a)(t.textTracks);try{for(n.s();!(e=n.n()).done;){e.value.mode="disabled"}}catch(a){n.e(a)}finally{n.f()}var r=t.addTextTrack("captions");r.mode="showing",c.forEach((function(e){var t=new VTTCue(e.start,e.end,e.lines.join("\n"));r.addCue(t)}))}}),[c]),Object(o.useEffect)((function(){0!==s&&i.current.seek(s)}),[s]),Object(o.useEffect)((function(){i.current.playbackRate=t}),[t]),Object(M.jsx)(le,{children:Object(M.jsxs)(oe.Player,{ref:i,aspectRatio:"16:9",children:[Object(M.jsx)("source",{src:a}),Object(M.jsx)(oe.ControlBar,{})]})})},he=T.a.div(de||(de=Object(b.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 100%;\n  width: 100%;\n  flex: 1;\n"]))),Oe=T.a.div(be||(be=Object(b.a)(["\n  display: flex;\n  width: 100%;\n  padding: 1em 0;\n\n  flex-wrap: wrap;\n\n  justify-content: space-around;\n\n  input {\n    margin-top: 6px;\n  }\n\n  .bp3-label {\n    margin-left: 5px;\n    margin-right: 5px;\n  }\n"]))),me=T.a.div(je||(je=Object(b.a)(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n"]))),xe=T.a.div(pe||(pe=Object(b.a)(["\n  display: flex;\n\n  padding: 1em;\n\n  justify-content: space-around;\n  .shortcut-label {\n    font-size: 10px;\n    border-bottom: 1px solid black;\n    text-align: center;\n  }\n  .shortcut-key {\n    margin-bottom: 1em;\n    text-align: center;\n  }\n"])));var ge,ve,ye=function(){var e=Object(j.b)(),t=Object(o.useState)(1),n=Object(k.a)(t,2),i=n[0],r=n[1],a=Object(o.useState)(0),c=Object(k.a)(a,2),s=c[0],u=c[1],l=Object(o.useState)(0),d=Object(k.a)(l,2),b=d[0],p=d[1],f=Object(o.useState)(""),h=Object(k.a)(f,2),O=h[0],m=h[1],x=Object(o.useState)(-1),g=Object(k.a)(x,2),v=g[0],y=g[1],w=Object(j.c)((function(e){return e.data.subtitles}));return Object(M.jsxs)(he,{children:[Object(M.jsx)(fe,{playbackSpeed:i}),Object(M.jsxs)(me,{children:[Object(M.jsxs)(Oe,{children:[Object(M.jsxs)(S.e,{children:["Vitesse",Object(M.jsx)("div",{class:"bp3-select .modifier",children:Object(M.jsxs)("select",{onChange:function(e){return r(e.target.value)},children:[Object(M.jsx)("option",{value:.5,children:"0.5x"}),Object(M.jsx)("option",{selected:!0,value:1,children:"1x"}),Object(M.jsx)("option",{value:1.5,children:"1.5x"})]})})]}),Object(M.jsx)("div",{children:Object(M.jsxs)(S.e,{children:["Recherche",Object(M.jsx)("div",{}),Object(M.jsx)("input",{value:O,onChange:function(e){m(e.target.value),y(-1)},onKeyUp:function(t){return"Enter"===t.key?function(){var t;w.forEach((function(e,n){!t&&n>v&&-1!==e.lines.join("\n").toLowerCase().search(O.toLowerCase())&&(t=n,y(n))})),t||y(-1),e(_(t))}():null}})]})}),Object(M.jsxs)(S.e,{children:["Zoom Vertical",Object(M.jsx)(S.g,{min:0,max:4,labelValues:[],stepSize:1,onRelease:function(t){return e({type:I,newZoom:t+1})},onChange:function(e){return u(e)},value:s})]}),Object(M.jsxs)(S.e,{children:["Zoom Horizontal",Object(M.jsx)(S.g,{min:0,max:4,labelValues:[],stepSize:1,onRelease:function(t){return e({type:z,newZoom:t})},onChange:function(e){return p(e)},value:b})]})]}),Object(M.jsxs)(xe,{children:[Object(M.jsxs)("div",{children:[" ",Object(M.jsx)("div",{className:"shortcut-label",children:"Jouer/Pauser la vid\xe9o"}),Object(M.jsx)("div",{className:"shortcut-key",children:"CTRL + Espace"})]}),Object(M.jsxs)("div",{children:[Object(M.jsx)("div",{className:"shortcut-label",children:"Bouger la chronologie globale de gauche \xe0 droite"}),Object(M.jsx)("div",{className:"shortcut-key",children:"Fl\xe8ches gauche et droite"})]})]})]})]})},we=T.a.div(ge||(ge=Object(b.a)(["\n  @media (min-width: 1040px) {\n  }\n"]))),_e=T.a.div(ve||(ve=Object(b.a)(["\n  display: flex;\n\n  height: calc(100vh - 303px);\n\n  align-items: center;\n  flex-direction: row;\n\n  align-items: flex-start;\n"])));var Te=function(){var e=Object(j.b)();return Object(o.useEffect)((function(){var t=window.location.href.split("/"),n=t[t.length-1];console.log("ident: ",n),e({type:p}),fetch("https://api.soustitreur.com/customer/get-srt",{headers:{Accept:"application/json","Content-Type":"application/json"},method:"post",body:JSON.stringify({ident:n})}).then((function(e){return e.json()})).then((function(t){console.log("body",t),e(function(e){return{type:f,data:e}}(Object(d.a)(Object(d.a)({},t.data),{},{ident:n})))}))}),[]),Object(M.jsxs)(we,{children:[Object(M.jsx)(ce,{}),Object(M.jsxs)(_e,{children:[" ",Object(M.jsx)(P,{}),Object(M.jsx)(ye,{})]}),Object(M.jsx)(ne,{})]})},ke=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,215)).then((function(t){var n=t.getCLS,i=t.getFID,r=t.getFCP,a=t.getLCP,c=t.getTTFB;n(e),i(e),r(e),a(e),c(e)}))},Se=n(24),Ce=n(38),Ee=Object(Se.combineReducers)({data:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{isFetching:!1,ident:"",peaksUrl:null,videoUrl:null,subtitles:[],vttFile:null,currentlySelected:null,currentTime:0,waveformData:[]},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case p:return Object(d.a)(Object(d.a)({},e),{},{isFetching:!0});case f:return Object(d.a)(Object(d.a)({},e),{},{isFetching:!1,peaksUrl:t.data.waveform,videoUrl:t.data.videolink,subtitles:t.data.subtitles,ident:t.data.ident,waveformData:t.data.waveformobj});case h:var n=Object(Ce.a)(e.subtitles);return n[t.subIndex]=t.newCaption,Object(d.a)(Object(d.a)({},e),{},{subtitles:n});case g:var i=Object(Ce.a)(e.subtitles);return t.newCaptions.forEach((function(e){i[e.index]=e.newCaption})),Object(d.a)(Object(d.a)({},e),{},{subtitles:i});case O:var r=Object(Ce.a)(e.subtitles),a=r[t.subIndex].start,c=r[t.subIndex].end,s=0;s=e.currentTime>a&&e.currentTime<c?e.currentTime:(c-a)/2+a;var o={start:r[t.subIndex].start,end:s,lines:t.oldCaption},u={start:s,end:c,lines:t.newCaption};return r[t.subIndex]=o,r.splice(t.subIndex+1,0,u),Object(d.a)(Object(d.a)({},e),{},{subtitles:r});case m:var l=e.subtitles.filter((function(e,n){return n!==t.subIndex}));return Object(d.a)(Object(d.a)({},e),{},{subtitles:l});case x:return Object(d.a)(Object(d.a)({},e),{},{currentlySelected:t.subIndex});case v:return Object(d.a)(Object(d.a)({},e),{},{currentTime:t.time});default:return e}},media:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{seekingTime:0,horizontalZoom:0,verticalZoom:0,currentTime:0},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case E:return Object(d.a)(Object(d.a)({},e),{},{seekingTime:t.seekingTime});case I:return Object(d.a)(Object(d.a)({},e),{},{verticalZoom:t.newZoom});case z:return Object(d.a)(Object(d.a)({},e),{},{horizontalZoom:t.newZoom});default:return e}}}),Ie=n(106),ze=Object(Se.createStore)(Ee,void 0,Object(Ie.composeWithDevTools)());n(207),n(208),n(209),n(210);l.a.render(Object(M.jsx)(j.a,{store:ze,children:Object(M.jsx)(Te,{})}),document.getElementById("root")),ke()}},[[211,1,2]]]);
//# sourceMappingURL=main.46bd0dd0.chunk.js.map