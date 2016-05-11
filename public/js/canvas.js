var imageId = 'backgroundleft';
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

window.onload = function() {
    var img = document.getElementById("hideimage");
    ctx.drawImage(img, 0, 0,500,400);
    setImage('backgroundleft');
}


function setImage(id) {
    var img = document.getElementById(id);
    ctx.drawImage(img, 0, 0,200,150);
}


$( "#backgroundleft" ).click(function() {
  setImage('backgroundleft');
  imageId = 'backgroundleft';
});


$( "#backgroundmiddle" ).click(function() {
  setImage('backgroundmiddle');
  imageId = 'backgroundmiddle';
});

$( "#backgroundright" ).click(function() {
  setImage('backgroundright');
  imageId = 'backgroundright';
});

function makeParagraph(ctx, text, x,y,maxWidth, lineHeight){
	var wordArray = text.split(" ");
	var formattedText = "";
	wordArray.forEach(function(word , index,array){
		formattedText += word+" " 
		if(formattedText.length>20){
			ctx.fillText(formattedText, x, y, maxWidth, lineHeight);
			formattedText = "";
			y = y+30;
		}
	})
}

$("#textbox-button").click(function(){
	 var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
	var textContent = document.getElementById("the-textbox").value;
	var img = document.getElementById("hideimage");
    ctx.drawImage(img, 0, 0,500,400);
    setImage(imageId);
	ctx.font='800 italic 24px Arial';
    ctx.fillStyle = 'black';
	makeParagraph(ctx, textContent, 250,100, 250, 100)
});