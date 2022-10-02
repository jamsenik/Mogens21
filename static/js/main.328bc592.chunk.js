(this.webpackJsonpmogens21=this.webpackJsonpmogens21||[]).push([[0],{133:function(t,e,n){},143:function(t,e,n){"use strict";n.r(e);var r=n(0),i=n.n(r),s=n(35),a=n.n(s),c=(n(133),n(54)),u=n(4),o=n(5),l=n(38),h=n(18),d=n(19),f=n(25),b=n(23),j=function(){function t(){Object(u.a)(this,t),this.rounds=void 0,this.left=void 0,this.right=void 0;var e=[new v(1),new v(2),new v(3),new v(4),new v(5),new v(6)];e.push(new k([2])),e.push(new k([2,2])),e.push(new k([2,2,2])),e.push(new k([3])),e.push(new k([4])),e.push(new k([3,3])),e.push(new y([1,2,3,4,5],0)),e.push(new y([2,3,4,5,6],0)),e.push(new y([1,2,3,4,5,6],9)),e.push(new k([3,2])),e.push(new p),e.push(new k([6],100)),this.rounds=e,this.left=null,this.right=null}return Object(o.a)(t,[{key:"setLeft",value:function(t){this.left=t}},{key:"setRight",value:function(t){this.right=t}},{key:"verify",value:function(){var t=this.roundsPlayed();if(null!==this.left&&0!==t){var e=this.left.roundsPlayed();if(e!==t&&e!==t+1)return!1}if(null!==this.right){var n=this.right.roundsPlayed();if(0!==n&&n!==t-1&&n!==t)return!1}return!0}},{key:"roundsPlayed",value:function(){return this.playedRounds().length}},{key:"round",value:function(t){return this.rounds[t]}},{key:"score",value:function(){return this.rounds.filter((function(t){return!t.blank()})).reduce((function(t,e){return t+e.score()}),0)+this.bonus()}},{key:"bonus",value:function(){return this.isTopSet()&&this.rounds.slice(0,6).reduce((function(t,e){return t+e.score()}),0)>=0?50:0}},{key:"isTopSet",value:function(){return this.rounds.slice(0,6).every((function(t){return!t.blank()}))}},{key:"playedRounds",value:function(){return this.rounds.filter((function(t){return!t.blank()}))}},{key:"allCubes",value:function(){return this.rounds.map((function(t){return{cubes:t.cubes,scratched:t.scrathed}}))}},{key:"setCubes",value:function(t){for(var e=this,n=function(n){var r=t[n];r.scratched?e.rounds[n].scratch():r.cubes.forEach((function(t){e.rounds[n].add(t)}))},r=0;r<t.length;r++)n(r)}}]),t}(),p=function(){function t(){Object(u.a)(this,t),this.cubes=void 0,this.scrathed=void 0,this.cubes=[],this.scrathed=!1}return Object(o.a)(t,[{key:"score",value:function(){return this.scrathed?0:this.cubes.reduce((function(t,e){return t+e}),0)}},{key:"blank",value:function(){return 0===this.cubes.length&&!this.scrathed}},{key:"add",value:function(t){this.cubes.push(t),this.scrathed=!1}},{key:"scratch",value:function(){this.cubes=[],this.scrathed=!0}},{key:"clear",value:function(){this.cubes=[],this.scrathed=!1}},{key:"back",value:function(){this.cubes.pop(),this.scrathed&&this.clear()}},{key:"toArray",value:function(){return this.cubes.join("")}},{key:"toString",value:function(){return this.scrathed?"X":this.blank()?"\xa0":this.score().toString()}},{key:"bonus",value:function(){return 0}},{key:"canBeNext",value:function(t){return this.cubes.length<6}},{key:"isIncomplete",value:function(){return this.cubes.length>0&&this.cubes.length<6}}]),t}(),v=function(t){Object(h.a)(n,t);var e=Object(d.a)(n);function n(t){var r;return Object(u.a)(this,n),(r=e.call(this)).kind=void 0,r.kind=t,r}return Object(o.a)(n,[{key:"add",value:function(t){t===this.kind&&Object(f.a)(Object(b.a)(n.prototype),"add",this).call(this,t)}},{key:"score",value:function(){return Object(f.a)(Object(b.a)(n.prototype),"score",this).call(this)-4*this.kind}},{key:"bouns",value:function(){return this.score()}},{key:"canBeNext",value:function(t){return Object(f.a)(Object(b.a)(n.prototype),"canBeNext",this).call(this,t)&&t===this.kind}},{key:"isIncomplete",value:function(){return!1}}]),n}(p),k=function(t){Object(h.a)(n,t);var e=Object(d.a)(n);function n(t){var r,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Object(u.a)(this,n),(r=e.call(this)).pattern=void 0,r.kind=void 0,r.bonusPoints=void 0,r.index=void 0,r.pattern=t,r.kind=Array(t.length).fill(0),r.bonusPoints=i,r.index=0,r}return Object(o.a)(n,[{key:"add",value:function(t){if(console.log("Adding: "+t),!(this.isAPreviousValue(t)||this.index>=this.pattern.length)){for(var e=0;e<this.pattern[this.index];e++)Object(f.a)(Object(b.a)(n.prototype),"add",this).call(this,t);this.kind[this.index]=t,this.index+=1}}},{key:"canBeNext",value:function(t){return Object(f.a)(Object(b.a)(n.prototype),"canBeNext",this).call(this,t)&&!this.isAPreviousValue(t)&&this.index<this.pattern.length}},{key:"isAPreviousValue",value:function(t){return this.kind.includes(t)}},{key:"clear",value:function(){Object(f.a)(Object(b.a)(n.prototype),"clear",this).call(this),this.kind=Array(this.pattern.length).fill(0),this.index=0}},{key:"back",value:function(){if(0!==this.index){this.index-=1,this.kind[this.index]=0;for(var t=0;t<this.pattern[this.index];t++)Object(f.a)(Object(b.a)(n.prototype),"back",this).call(this)}else this.clear()}},{key:"score",value:function(){return(this.index===this.pattern.length?this.bonusPoints:0)+Object(f.a)(Object(b.a)(n.prototype),"score",this).call(this)}},{key:"scratch",value:function(){this.clear(),Object(f.a)(Object(b.a)(n.prototype),"scratch",this).call(this)}},{key:"isIncomplete",value:function(){return 0!==this.index&&this.index<this.pattern.length}}]),n}(p),y=function(t){Object(h.a)(n,t);var e=Object(d.a)(n);function n(t,r){var i;return Object(u.a)(this,n),(i=e.call(this)).bonusPoints=void 0,i.set=void 0,i.pattern=void 0,i.pattern=t,i.bonusPoints=r,i.set=!1,i}return Object(o.a)(n,[{key:"add",value:function(t){var e=this;this.pattern.includes(t)&&!this.set&&(this.pattern.forEach((function(t){return Object(f.a)(Object(b.a)(n.prototype),"add",e).call(e,t)})),this.set=!0)}},{key:"canBeNext",value:function(t){return!this.set&&this.pattern.includes(t)}},{key:"clear",value:function(){Object(f.a)(Object(b.a)(n.prototype),"clear",this).call(this),this.set=!1}},{key:"back",value:function(){var t=this;this.pattern.forEach((function(e){return Object(f.a)(Object(b.a)(n.prototype),"back",t).call(t)})),this.set=!1}},{key:"scratch",value:function(){Object(f.a)(Object(b.a)(n.prototype),"scratch",this).call(this),this.set=!1}},{key:"score",value:function(){return(this.set?this.bonusPoints:0)+Object(f.a)(Object(b.a)(n.prototype),"score",this).call(this)}},{key:"ssIncomplete",value:function(){return!1}}]),n}(p),O=n(205),x=n(204),g=n(3);function S(t){var e;return Object(g.jsx)(x.a,{onClick:t.onClick,sx:{paddingX:0,paddingY:0,minWidth:"10px",fontSize:"2.2vh",bgcolor:t.Round===t.CurrentRound?"primary.main":null},align:"center",children:(null===(e=t.Round)||void 0===e?void 0:e.toString())+" "})}function m(t){return Object(g.jsxs)(O.a,{selected:t.rounds.some((function(e){return e===t.currentRound})),sx:{},children:[Object(g.jsx)(x.a,{align:"left",sx:{color:t.available?"text.primary":"ghostwhite",paddingY:"0px",fontSize:"2.3vh"},children:t.Slags}),C(0,t),C(1,t),C(2,t),C(3,t),C(4,t),C(5,t)]})}function C(t,e){return Object(g.jsx)(S,{onClick:function(){return e.onClick(t)},Round:e.rounds[t],CurrentRound:e.currentRound})}function z(t){return Object(g.jsx)(x.a,{sx:{paddingX:0,paddingY:0,minWidth:"10px",fontSize:"2.2vh"},align:"center",children:t.Value})}function w(t){return Object(g.jsxs)(O.a,{children:[Object(g.jsx)(x.a,{align:"left",sx:{paddingY:"2px",fontSize:"2.2vh"},children:t.Slags}),R(0,t),R(1,t),R(2,t),R(3,t),R(4,t),R(5,t)]})}function R(t,e){return Object(g.jsx)(z,{Value:e.Tal[t].toString()})}var N=n(199),Y=n(208);function B(t,e){var n=e.names[t];return Object(g.jsx)(x.a,{sx:{paddingX:"2px",paddingY:"px",minWidth:"10px",paddingTop:0,maxHeight:"2vh"},children:Object(g.jsx)(N.a,{variant:"filled",value:n,error:!e.valid[t],helperText:e.valid[t]?"":"FEJL",size:"small",onFocus:function(t){t.target.select()},inputProps:{style:{padding:5}},onChange:function(n){return e.updateName(n.target.value,t)},children:"  "})})}function E(t){return Object(g.jsx)(Y.a,{children:Object(g.jsxs)(O.a,{children:[Object(g.jsx)(x.a,{sx:{paddingX:"1px",paddingY:"0px",minWidth:"10px",maxHeight:"1vh"}}),B(0,t),B(1,t),B(2,t),B(3,t),B(4,t),B(5,t)]})})}var P=n(17),A=n(214),I=n(215),G=n(218),T=n(105),F=n.n(T),D=n(216),X=n(104),H=n.n(X),W=n(103),V=n.n(W),J=n(211),K=n(217),L=n(196),M=n(110),U=n(202),_=n(106),Z=n.n(_),q=n(209),Q=n(210),$=n(197),tt=n(101),et=n.n(tt);function nt(t){var e=r.useState(!1),n=Object(P.a)(e,2),i=n[0],s=n[1],a=function(){s(!1)};return Object(g.jsxs)("div",{children:[Object(g.jsx)(U.a,{onClick:function(){s(!0)},children:Object(g.jsx)(L.a,{children:Object(g.jsx)(et.a,{fontSize:"large"})})}),Object(g.jsxs)(q.a,{open:i,onClose:a,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[Object(g.jsx)($.a,{children:"Slet spil?"}),Object(g.jsxs)(Q.a,{children:[Object(g.jsx)(J.a,{onClick:a,children:"N\xe5hr, nej"}),Object(g.jsx)(J.a,{onClick:function(){t.clear(),a()},autoFocus:!0,children:"\xc6gte!"})]})]})]})}var rt=n(102),it=n.n(rt),st=n(212),at=n(213);function ct(t){var e=r.useState(!1),n=Object(P.a)(e,2),i=n[0],s=n[1],a=r.useState(""),c=Object(P.a)(a,2),u=c[0],o=c[1],l=function(){s(!1)};return Object(g.jsxs)("div",{children:[Object(g.jsx)(U.a,{onClick:function(){s(!0)},children:Object(g.jsx)(L.a,{children:Object(g.jsx)(it.a,{fontSize:"large"})})}),Object(g.jsxs)(q.a,{open:i,onClose:l,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[Object(g.jsx)($.a,{children:"Hvilken gruppe"}),Object(g.jsxs)(st.a,{children:[Object(g.jsx)(at.a,{children:"Hvad kalder I den gruppe der spiller?"}),Object(g.jsx)(N.a,{autoFocus:!0,margin:"dense",id:"name",fullWidth:!0,variant:"standard",onChange:function(t){return o(t.target.value)},defaultValue:t.currentGroup})]}),Object(g.jsxs)(Q.a,{children:[Object(g.jsx)(J.a,{onClick:l,children:"Bliv"}),Object(g.jsx)(J.a,{onClick:function(){t.setGroup(u),l()},children:"Skift"})]})]})]})}var ut="min(6vw, 1cm)",ot=n(138);function lt(t){var e=i.a.useState(null),n=Object(P.a)(e,2),r=n[0],s=n[1],a=Boolean(r),c=function(){s(null)};return Object(g.jsx)(A.a,{position:"fixed",color:"primary",sx:{top:"auto",bottom:0},children:Object(g.jsxs)(I.a,{disableGutters:!0,children:[Object(g.jsx)(D.a,{sx:{flexGrow:1}}),Object(g.jsxs)(K.a,{variant:"text",size:"small",children:[ht(1,t),ht(2,t),ht(3,t),ht(4,t),ht(5,t),ht(6,t),Object(g.jsx)(G.a,{color:"inherit",edge:"start",onClick:function(){return t.scratch()},children:Object(g.jsx)(V.a,{style:{fontSize:ut}})}),Object(g.jsx)(G.a,{color:"inherit",edge:"start",onClick:function(){return t.backspace()},children:Object(g.jsx)(H.a,{style:{fontSize:ut}})}),Object(g.jsx)(G.a,{color:"inherit",edge:"start",onClick:function(t){s(t.currentTarget)},children:Object(g.jsx)(F.a,{style:{fontSize:ut}})})]}),Object(g.jsxs)(M.a,{id:"basic-menu",anchorEl:r,open:a,onClose:c,MenuListProps:{"aria-labelledby":"basic-button"},children:[Object(g.jsx)(ct,{setGroup:function(e){t.setGroup(e),c()},currentGroup:t.groupName}),Object(g.jsx)(nt,{clear:function(){t.clear(),c()}}),Object(g.jsx)(U.a,{onClick:function(){ot.isEnabled&&ot.toggle(),c()},children:Object(g.jsx)(L.a,{children:Object(g.jsx)(Z.a,{fontSize:"large"})})})]}),Object(g.jsx)(D.a,{sx:{flexGrow:1}})]})})}function ht(t,e){return Object(g.jsx)(J.a,{variant:"contained",sx:{fontSize:ut,fontFamily:"Mogens Dice"},onClick:function(){return e.diceClick(t)},disabled:!e.diceEnabled(t),size:"small",children:t})}var dt=n(219),ft=n(207),bt=n(220),jt=n(221),pt=n(107);function vt(t){var e={ONE:function(e){console.log("One"),e&&e.preventDefault(),t.diceClick(1)},TWO:function(){console.log("Two"),t.diceClick(2)},THREE:function(){t.diceClick(3)},FOUR:function(){t.diceClick(4)},FIVE:function(){t.diceClick(5)},SIX:function(){t.diceClick(6)},BACK_SPACE:function(){t.backspace()},NEXT:function(){console.log("Next"),t.next()}};return Object(g.jsx)(pt.GlobalHotKeys,{keyMap:{ONE:"1",TWO:"2",THREE:"3",FOUR:"4",FIVE:"5",SIX:"6",BACK_SPACE:"del backspace",NEXT:"space ctrl+m"},handlers:e})}var kt,yt=n(2),Ot=n(7),xt=n(108),gt=n(56);function St(){return mt.apply(this,arguments)}function mt(){return(mt=Object(Ot.a)(Object(yt.a)().mark((function t(){return Object(yt.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log("Getting address"),void 0!==kt){t.next=7;break}return t.next=4,fetch("https://api.ipify.org?format=json");case 4:return t.next=6,t.sent.json();case 6:kt=t.sent;case 7:return console.log("Ip address",kt),t.abrupt("return",kt.ip);case 9:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var Ct,zt=Object(xt.a)({apiKey:"AIzaSyDXKRP_mnNEJF5wkWkZ0fGFmPUAIZvE7Js",authDomain:"mogens-357414.firebaseapp.com",projectId:"mogens-357414",storageBucket:"mogens-357414.appspot.com",messagingSenderId:"290609839228",appId:"1:290609839228:web:94a29c55cb630c9df49df9"}),wt=Object(gt.b)(zt),Rt="empty";function Nt(t,e,n){var r=Object(gt.a)(wt,"YatzySets",t);void 0!==Ct&&(console.log("Already subscribed"),Ct()),Ct=Object(gt.c)(r,(function(t){var r=t.data();if(void 0===r)return console.log("No existing document"),void n(e);console.log("Existing document: ",t);var i=JSON.parse(r.state);n(i)}))}function Yt(){return(Yt=Object(Ot.a)(Object(yt.a)().mark((function t(e){return Object(yt.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(gt.d)(Object(gt.a)(wt,"YatzySets",Rt),{state:JSON.stringify(e)});case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function Bt(){for(var t=Array(6).fill(null).map((function(){return new j})),e=1;e<t.length;e++){var n=t[e-1],r=t[e];n.setRight(r),r.setLeft(n)}return t}St().then((function(t){return Rt=t}));var Et=function(t){Object(h.a)(n,t);var e=Object(d.a)(n);function n(t){var r;Object(u.a)(this,n),r=e.call(this,t);var i=Bt();return r.state={YatzySets:i,currentSet:0,currentRound:0,names:["Spiller 1","Spiller 2","Spiller 3","Spiller 4","Spiller 5","Spiller 6"],groupName:void 0},function(t){console.log("Group is IP");var e={cubes:Array(0),scratched:!1},n={names:Array(6).fill("Spiller"),rounds:Array(6).fill(Array(17).fill(e)),currentPlayer:0,currentRound:0};console.log("New state: ",n),St().then((function(e){return Nt(e,n,t)}))}((function(t){return r.updateState(t)})),console.log("End of constructor",Object(l.a)(r)),r}return Object(o.a)(n,[{key:"updateState",value:function(t){var e=t.rounds;console.log("As promised: ",t);for(var n=Bt(),r=0;r<e.length;r++){var i=e[r];n[r].setCubes(i)}this.setState({YatzySets:n,currentSet:t.currentPlayer,currentRound:t.currentRound,names:t.names})}},{key:"handleClick",value:function(t,e){var n=this;console.log("Call back player: "+t+" round: "+e),this.state.YatzySets[t].round(e);var r={YatzySets:this.state.YatzySets,currentSet:t,currentRound:e,names:this.state.names};this.setState(r,(function(){return n.storeBoard()}))}},{key:"rowFunc",value:function(t){var e=this;return function(n){return e.handleClick(n,t)}}},{key:"rowRounds",value:function(t){return this.state.YatzySets.map((function(e){return e.round(t)}))}},{key:"addDice",value:function(t){var e=this,n=this.state.YatzySets[this.state.currentSet].round(this.state.currentRound);n.canBeNext(t)&&(n.add(t),this.setState(this.state,(function(){return e.storeBoard()})))}},{key:"removeDice",value:function(){var t=this;console.log("Back"),this.state.YatzySets[this.state.currentSet].round(this.state.currentRound).back(),this.setState(this.state,(function(){return t.storeBoard()}))}},{key:"scratch",value:function(){var t=this;console.log("Scratch"),this.state.YatzySets[this.state.currentSet].round(this.state.currentRound).scratch(),this.setState(this.state,(function(){return t.storeBoard()}))}},{key:"clearBoard",value:function(){var t=this;console.log("Clear board");var e={YatzySets:Bt(),currentSet:0,currentRound:0,names:this.state.names};this.setState(e,(function(){return t.storeBoard()}))}},{key:"updateName",value:function(t,e){var n=this,r=Object(c.a)({},this.state);r.names[e]=t,this.setState(r,(function(){return n.storeBoard()}))}},{key:"updateGroupName",value:function(t){var e,n,r,i=this;e=function(t){return i.updateState(t)},n=this.getState(),r=t,console.log("Group is",r),Rt=r,Nt(r,n,e);var s=Object(c.a)({},this.state);s.groupName=t,this.setState(s)}},{key:"storeBoard",value:function(){console.log("Store board"),function(t){Yt.apply(this,arguments)}(this.getState())}},{key:"getState",value:function(){var t=this.state.YatzySets.map((function(t){return t.allCubes()})),e={};return e.names=this.state.names,e.rounds=t,e.currentPlayer=this.state.currentSet,e.currentRound=this.state.currentRound,e}},{key:"terning",value:function(t){var e=this;return Object(g.jsxs)("button",{className:"terning",disabled:!this.state.YatzySets[this.state.currentSet].round(this.state.currentRound).canBeNext(t),onClick:function(){return e.addDice(t)},children:[",",t]})}},{key:"next",value:function(){var t=this.state.currentSet%6;this.setState({YatzySets:this.state.YatzySets,currentSet:t,currentRound:0})}},{key:"r\xe6kke",value:function(t,e){return Object(g.jsx)(m,{Slags:e,onClick:this.rowFunc(t),rounds:this.rowRounds(t),available:this.state.YatzySets[this.state.currentSet].round(t).blank(),currentRound:this.state.YatzySets[this.state.currentSet].round(this.state.currentRound)})}},{key:"render",value:function(){var t,e=this;return Object(g.jsxs)("div",{children:[Object(g.jsx)(vt,{diceClick:function(t){e.addDice(t)},backspace:function(){return e.removeDice()},next:function(){return e.next()}}),Object(g.jsx)(dt.a,{component:ft.a,children:Object(g.jsxs)(bt.a,{size:"small",sx:{minWidth:200},"aria-label":"simple table",children:[Object(g.jsx)(E,{valid:this.state.YatzySets.map((function(t){return t.verify()})),names:this.state.names,updateName:function(t,n){return e.updateName(t,n)}}),Object(g.jsxs)(jt.a,{children:[this.r\u00e6kke(0,"1"),this.r\u00e6kke(1,"2"),this.r\u00e6kke(2,"3"),this.r\u00e6kke(3,"4"),this.r\u00e6kke(4,"5"),this.r\u00e6kke(5,"6"),Object(g.jsx)(w,{Slags:"Bonus",Tal:this.state.YatzySets.map((function(t){return t.bonus()}))}),this.r\u00e6kke(6,"1 par"),this.r\u00e6kke(7,"2 par"),this.r\u00e6kke(8,"3 par"),this.r\u00e6kke(9,"3 ens"),this.r\u00e6kke(10,"4 ens"),this.r\u00e6kke(11,"2 x 3 ens"),this.r\u00e6kke(12,"Lav"),this.r\u00e6kke(13,"H\xf8j"),this.r\u00e6kke(14,"Cameron"),this.r\u00e6kke(15,"Hus"),this.r\u00e6kke(16,"Chance"),this.r\u00e6kke(17,"Yatzy"),Object(g.jsx)(w,{Slags:"Total",Tal:this.state.YatzySets.map((function(t){return t.score()}))})]})]})}),Object(g.jsx)("div",{className:"nederst",children:Object(g.jsx)("div",{className:"slag",children:this.state.YatzySets[this.state.currentSet].round(this.state.currentRound).toArray()})}),Object(g.jsx)(lt,{diceClick:function(t){e.addDice(t)},diceEnabled:function(t){return e.state.YatzySets[e.state.currentSet].round(e.state.currentRound).canBeNext(t)},backspace:function(){return e.removeDice()},scratch:function(){return e.scratch()},clear:function(){return e.clearBoard()},setGroup:function(t){return e.updateGroupName(t)},groupName:null!==(t=this.state.groupName)&&void 0!==t?t:""})]})}}]),n}(i.a.Component);a.a.render(Object(g.jsx)(Et,{}),document.getElementById("root"))}},[[143,1,2]]]);
//# sourceMappingURL=main.328bc592.chunk.js.map