"use strict";

var MY_GLOBAL = {};

MY_GLOBAL.thumbnailWidth = 80; 
MY_GLOBAL.thumbnailPadding = 3; 
MY_GLOBAL.selectedThumbnailPadding = 45; 
MY_GLOBAL.animationDurationInS = 0.25;
MY_GLOBAL.animationDurationInMS = MY_GLOBAL.animationDurationInS * 1000;

MY_GLOBAL.scaleFactor = 3.0;
MY_GLOBAL.initialPreviewWindowHeight = 400;
MY_GLOBAL.previewWindowHeightSmall = MY_GLOBAL.initialPreviewWindowHeight / MY_GLOBAL.scaleFactor;
MY_GLOBAL.canvasHeightSmall = 140;
MY_GLOBAL.totalCanvasHeight = MY_GLOBAL.canvasHeightSmall * MY_GLOBAL.scaleFactor;
MY_GLOBAL.thumbnailsBarHeight = 75;
MY_GLOBAL.plansOuterContainerHeightSmall = MY_GLOBAL.canvasHeightSmall + MY_GLOBAL.thumbnailsBarHeight;
MY_GLOBAL.plansOuterContainerHeightLarge = MY_GLOBAL.canvasHeightSmall * MY_GLOBAL.scaleFactor + MY_GLOBAL.thumbnailsBarHeight;
MY_GLOBAL.thumbnailsBarTopMargin = (MY_GLOBAL.totalCanvasHeight - MY_GLOBAL.canvasHeightSmall) * -1;

MY_GLOBAL.typeChecker = {
    assertIsString: function(data, potentialErrorMessage) {
       if (typeof(data) !== 'string') {
           this.throwTypeExceptionWithMessage(data, 'string', potentialErrorMessage);
       }
    }, 
    assertIsNumber: function(data, potentialErrorMessage) {
        if (typeof(data) !== 'number') {
            this.throwTypeExceptionWithMessage(data, 'number', potentialErrorMessage);
        }
    }, 
    assertIsInteger: function(data, potentialErrorMessage) {
        if ((typeof(data) !== 'number') || Math.floor(data) !== data) {
            this.throwTypeExceptionWithMessage(data, 'integer', potentialErrorMessage);
        }
    },
    assertIsFunction: function(data, potentialErrorMessage) {
        if (typeof(data) !== 'function') {
            this.throwTypeExceptionWithMessage(data, 'object', potentialErrorMessage);
        }
    }, 
    assertIsObjectWithProto: function(data, proto, potentialErrorMessage) {
        if (!(proto.isPrototypeOf(data))) {
            this.throwTypeExceptionWithMessage(data, proto.toString(), potentialErrorMessage);
        }
    }, 
    assertIsJQueryObject: function(data, potentialErrorMessage) {
        if (!(data instanceof jQuery)) {
            this.throwTypeExceptionWithMessage(data, 'jQuery', potentialErrorMessage);
        }
    }, 
    assertIsBoolean: function(data, potentialErrorMessage) {
        if (typeof(data)!== 'boolean') {
            this.throwTypeExceptionWithMessage(data, 'boolean', potentialErrorMessage);
        }
    }, 
    assertIsDate: function(data, potentialErrorMessage) {
       if (!(data instanceof Date)) {
           this.throwTypeExceptionWithMessage(data, 'Date', potentialErrorMessage);
       } 
    }, 
    assertIsPlan: function(data, potentialErrorMessage) {
       if (!(MY_GLOBAL.planProto.isPrototypeOf(data))) {
           this.throwTypeExceptionWithMessage(data, 'Plan', potentialErrorMessage);
       } 
    }, 
    throwTypeExceptionWithMessage: function(value, targetType, mess) {
        this.assertIsString(targetType);
        if (typeof(mess) !== 'undefined') {
            throw 'TypeError: ' + value.toString() +' is not of ' + targetType + ' (' + mess.toString() + ')';
        } else if(typeof(value) !== 'undefined'){
            throw 'TypeError: ' + value.toString() +' is not of ' + targetType;
        } else {
            throw 'TypeError: undefined' +' is not of ' + targetType;
        }
    }
};

MY_GLOBAL.assert = function(condition, potentialErrorMessage) {
    MY_GLOBAL.typeChecker.assertIsBoolean(condition);
    
    if (!condition) {
        if (typeof(potentialErrorMessage) !== 'undefined') {
            throw 'AssertionFailure: ' + potentialErrorMessage.toString();
        } else {
            throw 'AssertionFailure';
        }
    }
};
