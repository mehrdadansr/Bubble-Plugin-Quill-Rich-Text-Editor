function(instance, context) {
	instance.data.divName = "id"+Math.round(Math.random()*1000000) + 1;
    var newDiv = $('<div id="'+instance.data.divName+'" calss="ql-container"></div>');
    instance.data.newDiv = newDiv
    instance.canvas.append(newDiv);
	//newDiv.css("width", "100%");
	//newDiv.css("height", "100%");
    instance.data.kardam = 0;
	instance.data.round = 0;
	instance.data.parentID = "P"+instance.data.divName;
}