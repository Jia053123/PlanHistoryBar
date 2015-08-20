MY_GLOBAL.plansManager.plansRenderer = {
    plansContainer: null, 
    midXPosArray:[], 
    
    initWithContainer: function(c) {
        MY_GLOBAL.typeChecker.assertIsJQueryObject(c);
        
        this.thumbnailsRenderer.initWithContainer($("#thumbnailsBar"));
        this.graphsRenderer.initWithGraphsContainerInString('#graphsContainer');
        
        this.plansContainer = c;
    }, 
    
    highlightPlanOnScreenAtIndex: function(index) {
        for (var i=0; i<this.midXPosArray.length; i++) {
            if (i < index) {
                this.midXPosArray[i] -= MY_GLOBAL.selectedThumbnailPadding;
            } else if(i > index) {
                this.midXPosArray[i] += MY_GLOBAL.selectedThumbnailPadding;
            }
        }
        this.centerXPosRelativeToPlan(index);
        
        this.thumbnailsRenderer.syncAllThumbnailsXPosWithArray(this.midXPosArray);
        this.graphsRenderer.syncAllDataPointsXPosWithArray(this.midXPosArray);
    }, 
    
    unhighlightAllPlansOnScreen: function() {
        for (var i=1; i<this.midXPosArray.length; i++) {
            if (this.midXPosArray[i] - this.midXPosArray[i-1] 
                > MY_GLOBAL.thumbnailPadding + MY_GLOBAL.thumbnailWidth) {
                // ...[][][] space []...
                for (var j=0; j < i; j++) { //j from 0 to i-1
                    this.midXPosArray[j] += (this.midXPosArray[i] - this.midXPosArray[i-1]) 
                                            - (MY_GLOBAL.thumbnailWidth + MY_GLOBAL.thumbnailPadding);
                }
            }
        }
        this.thumbnailsRenderer.syncAllThumbnailsXPosWithArray(this.midXPosArray);
        this.graphsRenderer.syncAllDataPointsXPosWithArray(this.midXPosArray);
    },
    
    appendPlan: function(p) {
        MY_GLOBAL.typeChecker.assertIsObjectWithProto(p, MY_GLOBAL.planProto);
        
        var newXPos;
        if (this.midXPosArray.length === 0) {
            // the first plan. Put at the center
            newXPos = this.plansContainer.width()/2;
        } else {
            // follow the last entry
            newXPos = this.midXPosArray[this.midXPosArray.length - 1] 
                + MY_GLOBAL.thumbnailWidth 
                + MY_GLOBAL.thumbnailPadding;
        }
        this.midXPosArray.push(newXPos);
        
        this.thumbnailsRenderer.appendThumbnailFromPlanAtMidXPos(p, newXPos);
        this.graphsRenderer.appendDataPointFromPlanAtMidXPos(p, newXPos);
        
        this.thumbnailsRenderer.syncAllThumbnailsXPosWithArray(this.midXPosArray);
        this.graphsRenderer.syncAllDataPointsXPosWithArray(this.midXPosArray);
    }, 
    
    prependPlan: function(p) {
        MY_GLOBAL.typeChecker.assertIsObjectWithProto(p, MY_GLOBAL.planProto);
        
        var newXPos;
        if (this.midXPosArray.length === 0) {
            // the first plan. Put at the center
            newXPos = this.plansContainer.width()/2;
        } else {
            // before the first entry
            newXPos = this.midXPosArray[0] 
                - MY_GLOBAL.thumbnailWidth 
                - MY_GLOBAL.thumbnailPadding;
        }
        this.midXPosArray.unshift(newXPos);
    
        this.thumbnailsRenderer.prependThumbnailFromPlanAtMidXPos(p, newXPos);
        this.graphsRenderer.prependDataPointFromPlanAtMidXPos(p, newXPos);
        
        this.thumbnailsRenderer.syncAllThumbnailsXPosWithArray(this.midXPosArray);
        this.graphsRenderer.syncAllDataPointsXPosWithArray(this.midXPosArray);
    }, 
    
    removeHeadPlan: function() {
        this.midXPosArray.shift();
        this.thumbnailsRenderer.removeHeadThumbnail();
        this.graphsRenderer.removeHeadDataPoint();
    }, 
    
    removeTailPlan: function() {
        this.midXPosArray.pop();
        this.thumbnailsRenderer.removeTailThumbnail();
        this.graphsRenderer.removeTailDataPoint();
    }, 
    
    centerXPosRelativeToPlan: function(index) {
        if (isNaN(index) 
            || typeof(this.midXPosArray[index]) === 'undefined') {
            console.log('ATTENTION: index is NAN')
            this.centerXPosArrayRelativeToContainer();
        } else {
            // based on formula: translation = midX - selectedPlan.midX
            var midX = this.plansContainer.width()/2;
            var translation = midX - this.midXPosArray[index];

            for (var i=0; i<this.midXPosArray.length; i++) {
                this.midXPosArray[i] += translation;
            }
        }
    }, 
    
    centerXPosArrayRelativeToContainer: function() {
        // based on formula: mid-(x1+t) + mid-(x2+t) + ... + mid-(xn+t) = 0
        var sum = 0;
        for (var i=0; i<this.midXPosArray.length; i++) {
            sum += this.midXPosArray[i];
        }
        var midX = this.plansContainer.width()/2;
        var translation = (midX * this.midXPosArray.length - sum) / this.midXPosArray.length;

        for (var i=0; i<this.midXPosArray.length; i++) {
            this.midXPosArray[i] += translation;
        }
    }
};