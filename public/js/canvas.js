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
		if(formattedText.length > 20 || array[array.length - 1] == word){
			ctx.fillText(formattedText, x, y, maxWidth, lineHeight);
			formattedText = "";
			y += 30;
		}
	})
};

$("#textbox-button").click(function(){
	var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
	var textContent = document.getElementById("the-textbox").value;
	var img = document.getElementById("hideimage");
    ctx.drawImage(img, 0, 0,500,400);
    setImage(imageId);
	ctx.font='800 italic 24px Arial';
    ctx.fillStyle = 'black';
	makeParagraph(ctx, textContent, 250,100, 250, 300)
});

$("#save-button").click(function(){
	var c = document.getElementById("myCanvas");
	var src = c.toDataURL("image/png");
	var w=window.open('about:blank','image from canvas');
	w.document.write("<img src='"+src+"' alt='from canvas'/>");
});

function readImage() {
    if ( this.files && this.files[0] ) {
        var FR= new FileReader();
        FR.onload = function(e) {
           var img = new Image();
           img.onload = function() {
             ctx.drawImage(img, 0, 0, 150, 50);
           };
           img.src = e.target.result;
        };       
        FR.readAsDataURL( this.files[0] );
    }
}

document.getElementById("file-input").addEventListener("change", readImage, false);