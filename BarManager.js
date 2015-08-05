"use strict";

MY_GLOBAL.barManager = {
    bar: null, 
    rangeLeft: 0, 
    rangeRight: 0, 
    
    /*
    init this.bar, this.rangeLeft, this.rangeRight and place the plans
    */
    initWithBarAndRange: function(b, l, r) {
        MY_GLOBAL.typeChecker.assertIsObject(b);
        MY_GLOBAL.typeChecker.assertIsInteger(l);
        MY_GLOBAL.typeChecker.assertIsInteger(r);
        MY_GLOBAL.assert(l <= r);
        
        this.bar = b;
        this.rangeLeft = l;
        this.rangeRight = l - 1; //init as no plans on screen
        
        var i;
        for (i=this.rangeLeft; i <= r; i++) { // don't forget the =
            this.addNewPlanAtRight();
        }
        
        console.log("left: "+ this.rangeLeft.toString());
        console.log("right: " + this.rangeRight.toString());
    }, 
    
    /*
    does not move the bar
    */
    selectIndex: function(planIndex) {
        MY_GLOBAL.typeChecker.assertIsInteger(planIndex, 'planIndex not int');
        
        // unselect all plans on screen
        this.bar.children().removeClass("selected");
        this.bar.children().addClass("unselected");
        // select plan
        this.bar.children().eq(planIndex - this.rangeLeft).removeClass("unselected");
        this.bar.children().eq(planIndex - this.rangeLeft).addClass("selected");
        
        console.log("select #" + planIndex.toString());
    },
    
    /*
    moves the bar with animation. Adds and deletes plans so that the number of plans on screen stays the same
    */
    moveBarLeftByOnePlan: function() {
        this.bar.addClass("leftShiftting");
        this.bar.one('animationend', function() {
            MY_GLOBAL.barManager.deletePlanAtLeft();
            MY_GLOBAL.barManager.addNewPlanAtRight();
            MY_GLOBAL.barManager.bar.removeClass("leftShiftting");
        });
    },
    /*
    moves the bar with animation. Adds and deletes plans so that the number of plans on screen stays the same
    */
    moveBarRightByOnePlan: function() {
        this.bar.addClass("rightShiftting");
        this.bar.one('animationend', function() {
            MY_GLOBAL.barManager.deletePlanAtRight(); //"this" no longer works here
            MY_GLOBAL.barManager.addNewPlanAtLeft();
            MY_GLOBAL.barManager.bar.removeClass("rightShiftting");
        });
    }, 
    
    addNewPlanAtLeft: function() {
        this.rangeLeft--;
        var newPlan = MY_GLOBAL.dataManager.getPlanAtIndex(this.rangeLeft);
        
        this.bar.prepend(MY_GLOBAL.planRenderer.renderDivFromPlan(newPlan));
        
        console.log("left: "+ this.rangeLeft.toString());
    }, 
    addNewPlanAtRight: function() {
        this.rangeRight++;
        var newPlan = MY_GLOBAL.dataManager.getPlanAtIndex(this.rangeRight);
        
        this.bar.append(MY_GLOBAL.planRenderer.renderDivFromPlan(newPlan));
        
        console.log("right: " + this.rangeRight.toString());
    }, 
    deletePlanAtLeft: function() {
        this.rangeLeft++;
        this.bar.children().eq(0).remove();
        console.log("left: "+ this.rangeLeft.toString());
    }, 
    deletePlanAtRight: function() {
        this.rangeRight--;
        this.bar.children().last().remove();
        console.log("right: " + this.rangeRight.toString());
    }
};
