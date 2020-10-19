parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"xwXl":[function(require,module,exports) {
function e(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}module.exports=e;
},{}],"ixeg":[function(require,module,exports) {
function n(n,r){(null==r||r>n.length)&&(r=n.length);for(var e=0,l=new Array(r);e<r;e++)l[e]=n[e];return l}module.exports=n;
},{}],"fk2o":[function(require,module,exports) {
var r=require("./arrayLikeToArray");function a(a){if(Array.isArray(a))return r(a)}module.exports=a;
},{"./arrayLikeToArray":"ixeg"}],"rp83":[function(require,module,exports) {
function e(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}module.exports=e;
},{}],"IOZJ":[function(require,module,exports) {
var r=require("./arrayLikeToArray");function t(t,e){if(t){if("string"==typeof t)return r(t,e);var o=Object.prototype.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?r(t,e):void 0}}module.exports=t;
},{"./arrayLikeToArray":"ixeg"}],"v5FO":[function(require,module,exports) {
function e(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}module.exports=e;
},{}],"YtCi":[function(require,module,exports) {
var r=require("./arrayWithoutHoles"),e=require("./iterableToArray"),u=require("./unsupportedIterableToArray"),a=require("./nonIterableSpread");function o(o){return r(o)||e(o)||u(o)||a()}module.exports=o;
},{"./arrayWithoutHoles":"fk2o","./iterableToArray":"rp83","./unsupportedIterableToArray":"IOZJ","./nonIterableSpread":"v5FO"}],"ZBnv":[function(require,module,exports) {
function n(n,o){if(!(n instanceof o))throw new TypeError("Cannot call a class as a function")}module.exports=n;
},{}],"NoOd":[function(require,module,exports) {
function e(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function r(r,n,t){return n&&e(r.prototype,n),t&&e(r,t),r}module.exports=r;
},{}],"qwFP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.randomMovement=a,exports.LEVEL=exports.CLASS_LIST=exports.OBJECT_TYPE=exports.DIRECTIONS=exports.CELL_SIZE=exports.GRID_SIZE=void 0;var e=i(require("@babel/runtime/helpers/defineProperty")),t=i(require("@babel/runtime/helpers/toConsumableArray")),o=i(require("@babel/runtime/helpers/classCallCheck")),r=i(require("@babel/runtime/helpers/createClass"));function i(e){return e&&e.__esModule?e:{default:e}}var n=function(){function e(t){(0,o.default)(this,e),this.dotCount=0,this.grid=[],this.DOMGrid=t}return(0,r.default)(e,[{key:"showGameStatus",value:function(e){var t=document.createElement("div");t.classList.add("game-status"),t.innerHTML="".concat(e?"WIN!":"GAME OVER!"),this.DOMGrid.appendChild(t)}},{key:"createGrid",value:function(e){var t=this;this.dotCount=0,this.grid=[],this.DOMGrid.innerHTML="",this.DOMGrid.style.cssText="grid-template-columns: repeat(".concat(d,", ").concat(l,"px);"),e.forEach(function(e,o){var r=document.createElement("div");r.classList.add("square",v[e]),r.style.cssText="width: ".concat(l,"px; height: ").concat(l,"px;"),t.DOMGrid.appendChild(r),t.grid.push(r),v[e]===c.DOT&&t.dotCount++})}},{key:"addObject",value:function(e,o){var r;(r=this.grid[e].classList).add.apply(r,(0,t.default)(o))}},{key:"removeObject",value:function(e,o){var r;(r=this.grid[e].classList).remove.apply(r,(0,t.default)(o))}},{key:"objectExist",value:function(e,t){return this.grid[e].classList.contains(t)}},{key:"rotateDiv",value:function(e,t){this.grid[e].style.transform="rotate(".concat(t,"deg)")}},{key:"moveCharacter",value:function(e){if(e.shouldMove()){var t=e.getNextMove(this.objectExist.bind(this)),o=t.nextMovePos,r=t.direction,i=e.makeMove(),n=i.classesToRemove,s=i.classesToAdd;e.rotation&&o!==e.pos&&(this.rotateDiv(o,e.dir.rotation),this.rotateDiv(e.pos,0)),this.removeObject(e.pos,n),this.addObject(o,s),e.setNewPos(o,r)}}}],[{key:"createGameBoard",value:function(e,t){var o=new this(e);return o.createGrid(t),o}}]),e}(),s=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5,r=arguments.length>1?arguments[1]:void 0,i=arguments.length>2?arguments[2]:void 0,n=arguments.length>3?arguments[3]:void 0;(0,o.default)(this,e),this.name=n,this.movement=i,this.startPos=r,this.pos=r,this.dir=L.ArrowRight,this.speed=t,this.timer=0,this.isScared=!1,this.rotation=!1}return(0,r.default)(e,[{key:"shouldMove",value:function(){if(this.timer===this.speed)return this.timer=0,!0;this.timer++}},{key:"getNextMove",value:function(e){var t=this.movement(this.pos,this.dir,e);return{nextMovePos:t.nextMovePos,direction:t.direction}}},{key:"makeMove",value:function(){var e=[c.GHOST,c.SCARED,this.name],o=[c.GHOST,this.name];return this.isScared&&(o=[].concat((0,t.default)(o),[c.SCARED])),{classesToRemove:e,classesToAdd:o}}},{key:"setNewPos",value:function(e,t){this.pos=e,this.dir=t}}]),e}();function a(e,t,o){for(var r=t,i=e+r.movement,n=Object.keys(L);o(i,c.WALL)||o(i,c.WALLUR)||o(i,c.WALLUL)||o(i,c.WALLULR)||o(i,c.WALLDR)||o(i,c.WALLDL)||o(i,c.WALLDLR)||o(i,c.WALLUDR)||o(i,c.WALLUDl)||o(i,c.GHOST);){var s=n[Math.floor(Math.random()*n.length)];i=e+(r=L[s]).movement}return{nextMovePos:i,direction:r}}var u=function(){function t(r,i){var n=this;(0,o.default)(this,t),(0,e.default)(this,"handleKeyInput",function(e,t){var o;e.keyCode>=37&&e.keyCode<=40&&(o=L[e.key],t(n.pos+o.movement,c.WALL)||(n.dir=o))}),this.pos=i,this.speed=r,this.dir=null,this.timer=0,this.powerPill=!1,this.rotation=!0}return(0,r.default)(t,[{key:"shouldMove",value:function(){if(this.dir)return this.timer===this.speed?(this.timer=0,!0):void this.timer++}},{key:"getNextMove",value:function(e){var t=this.pos+this.dir.movement;return(e(t,c.WALL)||e(t,c.WALLUR)||e(t,c.WALLUL)||e(t,c.WALLULR)||e(t,c.WALLDR)||e(t,c.WALLDL)||e(t,c.WALLDLR)||e(t,c.WALLUDR)||e(t,c.WALLUDl)||e(t,c.GHOSTLAIR))&&(t=this.pos),{nextMovePos:t,direction:this.dir}}},{key:"makeMove",value:function(){return{classesToRemove:[c.PACMAN],classesToAdd:[c.PACMAN]}}},{key:"setNewPos",value:function(e){this.pos=e}}]),t}(),d=21;exports.GRID_SIZE=d;var l=20;exports.CELL_SIZE=l;var L={ArrowLeft:{code:37,movement:-1,rotation:180},ArrowUp:{code:38,movement:-d,rotation:270},ArrowRight:{code:39,movement:1,rotation:0},ArrowDown:{code:40,movement:d,rotation:90}};exports.DIRECTIONS=L;var c={BLANK:"blank",WALL:"wall",WALLUR:"wallur",WALLUL:"wallul",WALLULR:"wallulr",WALLDR:"walldr",WALLDL:"walldl",WALLDLR:"walldlr",WALLUDR:"walludr",WALLUDl:"walludl",DOT:"dot",BLINKY:"blinky",PINKY:"pinky",INKY:"inky",CLYDE:"clyde",PILL:"pill",PACMAN:"pacman",GHOST:"ghost",SCARED:"scared",GHOSTLAIR:"lair"};exports.OBJECT_TYPE=c;var v=[c.BLANK,c.WALL,c.DOT,c.BLINKY,c.PINKY,c.INKY,c.CLYDE,c.PILL,c.PACMAN,c.GHOSTLAIR,c.WALLUR,c.WALLUL,c.WALLULR,c.WALLDR,c.WALLDL,c.WALLDLR,c.WALLUDR,c.WALLUDl];exports.CLASS_LIST=v;var h=[11,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,10,1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1,1,2,11,10,2,11,1,1,10,2,1,2,11,1,1,10,2,11,10,2,1,1,7,13,14,2,13,1,1,14,2,15,2,13,1,1,14,2,13,14,7,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,17,16,2,12,2,17,1,1,1,1,1,16,2,12,2,17,16,2,1,1,2,2,2,2,1,2,2,2,2,1,2,2,2,2,1,2,2,2,2,1,13,1,1,10,2,1,1,1,16,0,15,0,17,1,1,1,2,11,1,1,14,0,0,0,1,2,1,0,0,0,0,0,0,0,0,0,1,2,1,0,0,0,0,0,0,1,2,1,0,12,9,9,9,9,9,12,0,1,2,1,0,0,0,11,1,1,14,2,15,0,1,9,9,9,9,9,1,0,15,2,13,1,1,10,1,0,0,0,2,0,0,1,9,9,9,9,9,1,0,0,2,0,0,0,1,13,1,1,10,2,12,0,1,9,9,9,9,9,1,0,12,2,11,1,1,14,0,0,0,1,2,1,0,13,1,1,1,1,1,14,0,1,2,1,0,0,0,0,0,0,1,2,1,0,0,0,0,0,0,0,0,0,1,2,1,0,0,0,11,1,1,14,2,15,0,17,1,1,1,1,1,16,0,15,2,13,1,1,10,1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1,1,2,17,10,2,17,1,1,16,2,15,2,17,1,1,16,2,11,16,2,1,1,7,2,1,2,2,2,2,2,2,0,2,2,2,2,2,2,1,2,7,1,1,16,2,15,2,12,2,17,1,1,1,1,1,16,2,12,2,15,2,17,1,1,2,2,2,2,1,2,2,2,2,1,2,2,2,2,1,2,2,2,2,1,1,2,17,1,1,1,1,1,16,2,15,2,17,1,1,1,1,1,16,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,13,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,14];exports.LEVEL=h;var m=document.querySelector("#game"),p=document.querySelector("#score"),A=document.querySelector("#start-button"),f=1e4,w=80,D=n.createGameBoard(m,h),y=0,E=null,W=!1,C=!1,R=null,I=new Audio("./sounds/eat_ghost.wav"),M=new Audio("./sounds/munch.wav"),O=new Audio("./sounds/pill.wav"),P=new Audio("./sounds/game_start.wav"),T=new Audio("./sounds/death.wav");function x(e){new Audio(e).play()}function b(e,t){T.play(),document.removeEventListener("keydown",function(t){return e.handleKeyInput(t,D.objectExist.bind(D))}),D.showGameStatus(W),clearInterval(E),A.classList.remove("hide")}function S(e,t){var o=t.find(function(t){return e.pos===t.pos});o&&(e.powerPill?(x(I),D.removeObject(o.pos,[c.GHOST,c.SCARED,o.name]),o.pos=o.startPos,y+=100):(D.removeObject(e.pos,[c.PACMAN]),D.rotateDiv(e.pos,0),b(e,m)))}function k(e,t){D.moveCharacter(e),S(e,t),t.forEach(function(e){return D.moveCharacter(e)}),S(e,t),D.objectExist(e.pos,c.DOT)&&(x(M),D.removeObject(e.pos,[c.DOT]),D.dotCount--,y+=10),D.objectExist(e.pos,c.PILL)&&(x(O),D.removeObject(e.pos,[c.PILL]),e.powerPill=!0,y+=50,clearTimeout(R),R=setTimeout(function(){return e.powerPill=!1},f)),e.powerPill!==C&&(C=e.powerPill,t.forEach(function(t){return t.isScared=e.powerPill})),0===D.dotCount&&(W=!0,b(e,m)),p.innerHTML=y}function N(){x(P),W=!1,C=!1,y=0,A.classList.add("hide"),D.createGrid(h);var e=new u(2,388);D.addObject(388,[c.PACMAN]),document.addEventListener("keydown",function(t){return e.handleKeyInput(t,D.objectExist.bind(D))});var t=[new s(6,200,a,c.BLINKY),new s(2,199,a,c.PINKY),new s(3,198,a,c.INKY),new s(2,197,a,c.CLYDE)];E=setInterval(function(){return k(e,t)},w)}A.addEventListener("click",N);
},{"@babel/runtime/helpers/defineProperty":"xwXl","@babel/runtime/helpers/toConsumableArray":"YtCi","@babel/runtime/helpers/classCallCheck":"ZBnv","@babel/runtime/helpers/createClass":"NoOd"}]},{},["qwFP"], null)
//# sourceMappingURL=/pacman.eef22eb7.js.map