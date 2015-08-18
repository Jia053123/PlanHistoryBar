"use strict";

MY_GLOBAL.plansManager = {
    size: 0,
    rangeLeft: 0, 
    rangeRight: -1, 

    /*
    init this.thumbnailsBar, this.rangeLeft, this.rangeRight and place the plans
    */
    initWithSize: function(s) {
        MY_GLOBAL.typeChecker.assertIsInteger(s);
        this.size = s;

        for (var i=0; i < s; i++) { // try get full size
            this.tryAddNewPlanAtRight();
        }
    }, 
    
    /*
    does not move the thumbnailsBar
    */
    selectIndex: function(planIndex) {
        if ((planIndex <= this.rangeRight) && (planIndex >= this.rangeLeft)) {
            MY_GLOBAL.typeChecker.assertIsInteger(planIndex, 'planIndex not int');

            MY_GLOBAL.plansRenderer.unhighlightAllPlansOnScreen();
            var planIndexInOnScreen =  planIndex - this.rangeLeft;
            MY_GLOBAL.plansRenderer.highlightPlanOnScreenAtIndex(planIndexInOnScreen);
            console.log('selected' + planIndex.toString());
            return true;
        }
        return false;
    },
    
    /*
    moves the thumbnailsBar with animation. Adds and deletes plans so that the number of plans on screen stays the same
    */
    moveBarLeftByOnePlan: function() {
        this.tryAddNewPlanAtRight();
        this.tryDeletePlanAtLeft();
        console.log('l:' + this.rangeLeft.toString() + ',' + 'r:' + this.rangeRight.toString());
    },
    /*
    moves the thumbnailsBar with animation. Adds and deletes plans so that the number of plans on screen stays the same
    */
    moveBarRightByOnePlan: function() {
        this.tryAddNewPlanAtLeft();
        this.tryDeletePlanAtRight();
//        console.log('moving right');
        console.log('l:' + this.rangeLeft.toString() + ',' + 'r:' + this.rangeRight.toString());
    }, 
    
    tryAddNewPlanAtLeft: function() {
        if (this.rangeLeft > 0) {
            var newPlan = MY_GLOBAL.dataManager.getPlanAtIndex(this.rangeLeft - 1);
            if ((newPlan !== null) && (typeof(newPlan) !== 'undefined')) {
                MY_GLOBAL.plansRenderer.prependPlan(newPlan);
                this.rangeLeft--;
//                console.log('added' + (this.rangeLeft-1).toString());
            }
        }
    }, 
    
    tryAddNewPlanAtRight: function() {
        var newPlan = MY_GLOBAL.dataManager.getPlanAtIndex(this.rangeRight + 1);
        if((newPlan !== null) && (typeof(newPlan) !== 'undefined')) {
            MY_GLOBAL.plansRenderer.appendPlan(newPlan);   
            this.rangeRight++;
//            console.log('added' + (this.rangeRight+1).toString());
        }
    }, 
    
    tryDeletePlanAtLeft: function() {
        // only when at full size
        if (this.rangeRight - this.rangeLeft >= this.size - 1) {
            this.rangeLeft++;
            MY_GLOBAL.plansRenderer.removeHeadPlan();
//            console.log('removed' + (this.rangeLeft - 1).toString());
        }
    }, 
    
    tryDeletePlanAtRight: function() {
        // only when at full size
        if (this.rangeRight - this.rangeLeft >= this.size - 1) {
            this.rangeRight--;
            MY_GLOBAL.plansRenderer.removeTailPlan();
//            console.log('removed' + (this.rangeRight + 1).toString());
        }
    }
};
