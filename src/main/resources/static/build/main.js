webpackJsonp([0],{

/***/ 112:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 112;

/***/ }),

/***/ 154:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 154;

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TitlePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_socket_socket__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TitlePage = /** @class */ (function () {
    function TitlePage(navCtrl, socketProvider) {
        this.navCtrl = navCtrl;
        this.socketProvider = socketProvider;
        this.connected = false;
        this.name = 'niles';
    }
    TitlePage.prototype.createGame = function () {
        this.socketProvider.isHost = true;
        this.socketProvider.name = this.name;
        console.log("creating game");
        this.socketProvider.sendMessage({
            name: this.name,
            action: 'create'
        });
    };
    TitlePage.prototype.joinGame = function () {
        this.socketProvider.name = this.name;
        this.socketProvider.setRoomNumber(this.gameNumber);
        console.log("joining game");
        this.socketProvider.sendMessage({
            name: this.name,
            action: 'join',
            room: this.gameNumber
        });
    };
    TitlePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-title',template:/*ion-inline-start:"/Users/s0hyman/projects/game-jam-2019-fe/src/pages/title/title.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      title\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding id="page1">\n  <form id="title-form1">\n    <ion-item id="title-input1">\n      <ion-input type="text" placeholder="Enter Name" name="name" [(ngModel)]="name"></ion-input>\n    </ion-item>\n    <ion-item id="title-input1">\n      <ion-input type="text" placeholder="Enter Room Number" name="room number" [(ngModel)]="gameNumber"></ion-input>\n    </ion-item>\n  </form>\n  \n  <div class="btn-row">\n    <div class="taped-btn-group">\n      <div class="tape"></div>\n      <button id="title-button1" class="taped-btn" color="positive" block (click)="joinGame()">\n        Join Game\n      </button>\n    </div>\n    <div class="taped-btn-group">\n      <div class="tape"></div>\n      <button id="title-button2" class="taped-btn" color="positive" block (click)="createGame()">\n        Create Game\n      </button>\n    </div>\n  </div>\n  \n  \n</ion-content>\n'/*ion-inline-end:"/Users/s0hyman/projects/game-jam-2019-fe/src/pages/title/title.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_socket_socket__["a" /* SocketProvider */]])
    ], TitlePage);
    return TitlePage;
}());

//# sourceMappingURL=title.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoomPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_socket_socket__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RoomPage = /** @class */ (function () {
    function RoomPage(navCtrl, navParams, socketProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.socketProvider = socketProvider;
        this.roomNumber = this.socketProvider.roomNumber;
        this.socketProvider.sendMessage({
            action: "list"
        });
        this.name = this.socketProvider.name;
    }
    RoomPage.prototype.startGame = function () {
        this.socketProvider.sendMessage({
            action: "start"
        });
    };
    RoomPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-room',template:/*ion-inline-start:"/Users/s0hyman/projects/game-jam-2019-fe/src/pages/room/room.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      room {{socketProvider.roomNumber}}\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding id="page2">\n    <h1>Tell your friends to join room {{socketProvider.roomNumber}}!</h1>\n    <br>\n    <hr>\n  <ion-list id="room-list1">\n    <h1>Who\'s already here?</h1>\n    <ion-item color="none" id="room-list-item4" *ngFor="let player of socketProvider.players">\n      {{player}} {{(player === socketProvider.name ? \'(me!)\' : \'\')}}\n    </ion-item>\n  </ion-list>\n  <div class="taped-btn-group" *ngIf="socketProvider.isHost">\n      <div class="tape"></div>\n      <button id="title-button2" class="taped-btn" color="positive" block (click)="startGame()">\n        Everyone\'s here!\n      </button>\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/s0hyman/projects/game-jam-2019-fe/src/pages/room/room.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_socket_socket__["a" /* SocketProvider */]])
    ], RoomPage);
    return RoomPage;
}());

//# sourceMappingURL=room.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WaitPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WaitPage = /** @class */ (function () {
    function WaitPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    WaitPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-wait',template:/*ion-inline-start:"/Users/s0hyman/projects/game-jam-2019-fe/src/pages/wait/wait.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      wait\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding id="page3"></ion-content>'/*ion-inline-end:"/Users/s0hyman/projects/game-jam-2019-fe/src/pages/wait/wait.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]])
    ], WaitPage);
    return WaitPage;
}());

//# sourceMappingURL=wait.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SnapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_socket_socket__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SnapPage = /** @class */ (function () {
    function SnapPage(navCtrl, socketProvider, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.socketProvider = socketProvider;
        this.navParams = navParams;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
                _this.video = stream;
            });
        }
        this.prompt = this.navParams.get('prompt');
    }
    SnapPage.prototype.takePic = function () {
        this.context = this.myCanvas.nativeElement.getContext('2d');
        this.context.drawImage(this.myVideo.nativeElement, -125, -100, 400, 300);
        var data = this.myCanvas.nativeElement.toDataURL('image/png');
        this.socketProvider.sendMessage({
            action: 'snap',
            image: data,
            slot: this.navParams.get('slot')
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('myCanvas'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], SnapPage.prototype, "myCanvas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('myVideo'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], SnapPage.prototype, "myVideo", void 0);
    SnapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-snap',template:/*ion-inline-start:"/Users/s0hyman/projects/game-jam-2019-fe/src/pages/snap/snap.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      snap\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding id="page4">\n  <h1 id="snap-heading1" style="color:#000000;text-align:center;">\n    {{prompt}}\n  </h1>\n  <div class="video-container">\n    <div class="view-finder"><img src="../../assets/imgs/face_guideline.png" alt=""></div>\n      <video id="video"  width="400" height="300" [srcObject]="video" autoplay #myVideo>\n      </video>\n  </div>\n  \n  <canvas hidden #myCanvas width="150" height="150"></canvas>\n  <button (click)="takePic()" >take pic</button>\n</ion-content>'/*ion-inline-end:"/Users/s0hyman/projects/game-jam-2019-fe/src/pages/snap/snap.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_socket_socket__["a" /* SocketProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], SnapPage);
    return SnapPage;
}());

//# sourceMappingURL=snap.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JudgePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_socket_socket__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_scene_scene__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var JudgePage = /** @class */ (function () {
    function JudgePage(navCtrl, socketProvider, navParams, sceneProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.socketProvider = socketProvider;
        this.navParams = navParams;
        this.sceneProvider = sceneProvider;
        this.loaded = false;
        this.image1data = {};
        this.image2data = {};
        this.player1image = this.navParams.get('image1');
        this.player2image = this.navParams.get('image2');
        this.player1name = this.navParams.get('player1');
        this.player2name = this.navParams.get('player2');
        this.sceneKey = this.navParams.get('scene');
        this.sceneProvider.getImageData(this.sceneKey).subscribe(function (data) {
            _this.sceneData = data;
            console.log('sceneData', data);
            _this.loaded = true;
            _this.image1data = data[0].faceRectangle;
            _this.image2data = data[1].faceRectangle;
        });
    }
    JudgePage.prototype.vote = function (option) {
        this.socketProvider.sendMessage({
            vote: option
        });
    };
    JudgePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-judge',template:/*ion-inline-start:"/Users/s0hyman/projects/game-jam-2019-fe/src/pages/judge/judge.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      judge\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding id="page5">\n  <div class="scene-img">\n      <img class="scene" src="../../assets/imgs/{{sceneKey}}" alt="">\n      <img class="slot" [src]="player1image" alt="" \n        [style.top.px]="image1data.top" \n        [style.left.px]="image1data.left" \n        [style.width.px]="image1data.width" \n        [style.height.px]="image1data.height">\n      <img class="slot" [src]="player2image" alt="" \n        [style.top.px]="image2data.top"  \n        [style.left.px]="image2data.left" \n        [style.width.px]="image2data.width" \n        [style.height.px]="image2data.height">\n  </div>\n  \n  <div class="judge-btn-group">\n    <div class="taped-btn-group">\n      <div class="tape"></div>\n      <button id="title-button2" class="polaroid-btn" color="positive" block (click)="vote(1)">\n          <img [src]="player1image" alt="">\n      </button>\n    </div>\n    <div class="taped-btn-group">\n      <div class="tape"></div>\n      <button id="title-button2" class="polaroid-btn" color="positive" block (click)="vote(2)">\n        <img [src]="player2image" alt="">\n      </button>\n    </div>\n  </div>\n  \n</ion-content>'/*ion-inline-end:"/Users/s0hyman/projects/game-jam-2019-fe/src/pages/judge/judge.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_scene_scene__["a" /* SceneProvider */], __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_socket_socket__["a" /* SocketProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_scene_scene__["a" /* SceneProvider */]])
    ], JudgePage);
    return JudgePage;
}());

//# sourceMappingURL=judge.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SceneProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the SceneProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var SceneProvider = /** @class */ (function () {
    function SceneProvider(http, platform) {
        this.http = http;
        this.platform = platform;
        console.log('Hello SceneProvider Provider');
        if (this.platform.is('cordova')) {
            this.levelPath = '../www/assets/imgs/';
        }
        else {
            this.levelPath = '../../assets/imgs/';
        }
    }
    SceneProvider.prototype.getImageData = function (key) {
        var num = key.split('.')[0];
        return this.http.get(this.levelPath + num + '.json');
    };
    SceneProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Platform */]])
    ], SceneProvider);
    return SceneProvider;
}());

//# sourceMappingURL=scene.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScorePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ScorePage = /** @class */ (function () {
    function ScorePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ScorePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-score',template:/*ion-inline-start:"/Users/s0hyman/projects/game-jam-2019-fe/src/pages/score/score.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      score\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding id="page6">\n  <div style="width:100%;height:220px;margin:0px 0px;line-height:250px;background-color:#e8ebef;text-align:center;">\n    <i class="icon ion-image" style="font-size:64px;color:#888;vertical-align:middle;"></i>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/s0hyman/projects/game-jam-2019-fe/src/pages/score/score.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]])
    ], ScorePage);
    return ScorePage;
}());

//# sourceMappingURL=score.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FinalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FinalPage = /** @class */ (function () {
    function FinalPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    FinalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-final',template:/*ion-inline-start:"/Users/s0hyman/projects/game-jam-2019-fe/src/pages/final/final.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      final\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding id="page7">\n  <div style="width:100%;height:220px;margin:0px 0px;line-height:250px;background-color:#e8ebef;text-align:center;">\n    <i class="icon ion-image" style="font-size:64px;color:#888;vertical-align:middle;"></i>\n  </div>\n  <ion-list id="final-list2">\n    <ion-item color="none" id="final-list-item7">\n      <ion-thumbnail item-left>\n        <img />\n      </ion-thumbnail>\n      <h2>\n        Item\n      </h2>\n    </ion-item>\n    <ion-item color="none" id="final-list-item8">\n      <ion-thumbnail item-left>\n        <img />\n      </ion-thumbnail>\n      <h2>\n        Item\n      </h2>\n    </ion-item>\n    <ion-item color="none" id="final-list-item9">\n      <ion-thumbnail item-left>\n        <img />\n      </ion-thumbnail>\n      <h2>\n        Item\n      </h2>\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/s0hyman/projects/game-jam-2019-fe/src/pages/final/final.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]])
    ], FinalPage);
    return FinalPage;
}());

//# sourceMappingURL=final.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(227);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_title_title__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_room_room__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_wait_wait__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_snap_snap__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_judge_judge__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_score_score__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_final_final__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_socket_socket__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_scene_scene__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_common_http__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_title_title__["a" /* TitlePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_room_room__["a" /* RoomPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_wait_wait__["a" /* WaitPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_snap_snap__["a" /* SnapPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_judge_judge__["a" /* JudgePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_score_score__["a" /* ScorePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_final_final__["a" /* FinalPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_title_title__["a" /* TitlePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_room_room__["a" /* RoomPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_wait_wait__["a" /* WaitPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_snap_snap__["a" /* SnapPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_judge_judge__["a" /* JudgePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_score_score__["a" /* ScorePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_final_final__["a" /* FinalPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_13__providers_socket_socket__["a" /* SocketProvider */],
                __WEBPACK_IMPORTED_MODULE_14__providers_scene_scene__["a" /* SceneProvider */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_title_title__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_socket_socket__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_room_room__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_wait_wait__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_snap_snap__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_judge_judge__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_score_score__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_final_final__ = __webpack_require__(205);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, socketProvider) {
        this.socketProvider = socketProvider;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_title_title__["a" /* TitlePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        this.socketProvider.getStateSubject().subscribe(this.handleData.bind(this));
    }
    MyApp.prototype.handleData = function (data) {
        console.log(data);
        if (data.connected === "ok") {
            console.log("connected");
        }
        else if (data.players) {
            this.socketProvider.players = data.players;
            console.log(this.socketProvider.players);
        }
        else if (data.state === "lobby") {
            this.socketProvider.setRoomNumber(data.room);
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_room_room__["a" /* RoomPage */], {
                roomId: data.room || this.socketProvider.roomNumber
            });
        }
        else if (data.state === "wait") {
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_wait_wait__["a" /* WaitPage */]);
        }
        else if (data.state === "snap") {
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__pages_snap_snap__["a" /* SnapPage */], __assign({}, data));
        }
        else if (data.state === "judge") {
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_judge_judge__["a" /* JudgePage */], __assign({}, data));
        }
        else if (data.state === "results") {
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_10__pages_score_score__["a" /* ScorePage */], __assign({}, data));
        }
        else if (data.state === "final") {
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_11__pages_final_final__["a" /* FinalPage */], __assign({}, data));
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/s0hyman/projects/game-jam-2019-fe/src/app/app.html"*/'<ion-nav #mainContent [root]="rootPage"></ion-nav>'/*ion-inline-end:"/Users/s0hyman/projects/game-jam-2019-fe/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_5__providers_socket_socket__["a" /* SocketProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the SocketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var SocketProvider = /** @class */ (function () {
    function SocketProvider() {
        this.url = 'ws://snaplibs-ws-spring-boot.herokuapp.com/';
        this.dataSubject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.isHost = false;
        console.log('Hello SocketProvider Provider');
        this.connect();
    }
    SocketProvider.prototype.setName = function (name) {
        this.name = name;
    };
    SocketProvider.prototype.setRoomNumber = function (number) {
        this.roomNumber = number;
    };
    SocketProvider.prototype.setPlayers = function (players) {
        this.players = players;
    };
    SocketProvider.prototype.getStateSubject = function () {
        return this.dataSubject;
    };
    SocketProvider.prototype.connect = function () {
        this.socket = new WebSocket(this.url + "/game");
        this.socket.onmessage = this.handleMessage.bind(this);
    };
    SocketProvider.prototype.disconnect = function () {
        if (this.socket !== null) {
            this.socket.close();
        }
        console.log("Disconnected");
    };
    SocketProvider.prototype.handleMessage = function (data) {
        console.log('received: ', data);
        this.dataSubject.next(JSON.parse(data.data));
    };
    SocketProvider.prototype.sendMessage = function (message) {
        console.log('message sent: ', message);
        this.socket.send(JSON.stringify(message));
    };
    SocketProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], SocketProvider);
    return SocketProvider;
}());

//# sourceMappingURL=socket.js.map

/***/ })

},[206]);
//# sourceMappingURL=main.js.map