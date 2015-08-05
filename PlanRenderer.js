MY_GLOBAL.planRenderer = {
    renderDivFromPlan: function(plan) {
        MY_GLOBAL.typeChecker.assertIsPlan(plan);
        
        var div = $('<div>');
        div.addClass('planDiv');
        div.addClass('unselected');
        
        // render thumbnail img
        var thumbnail = $('<img>');
        thumbnail.attr('src', plan.thumbnailSrc);
        thumbnail.addClass("thumbnail");
        div.append(thumbnail); 
        
        // render timestamp
        var timeStampLabel = $('<p>');
        timeStampLabel.text(plan.timeStamp.getHours() + ':' + plan.timeStamp.getMinutes());
        timeStampLabel.addClass('timeStamp');
        div.append(timeStampLabel);
        
        // TODO: render name
        var nameLabel = $('<p>');
        nameLabel.text(plan.saveName);
        nameLabel.addClass('saveName');
        div.append(nameLabel);
        
        return div;
    }, 
    
    calcLineCoordsFromPlan: function(plan) {
        // FUTURE: call line renderer with coords
    }
}