function(instance, context) {
	instance.data.divName = "id"+Math.round(Math.random()*1000000) + 1;
    var newDiv = $('<div id="'+instance.data.divName+'"></div>');
    instance.data.newDiv = newDiv
    instance.canvas.append(newDiv);
	//newDiv.css("width", "100%");
	//newDiv.css("height", "100%");

}