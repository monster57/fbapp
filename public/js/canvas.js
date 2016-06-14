
var isDragging = false;
var isClicked = false;
var isBackgroundClicked = false;
var isUserPhotoClicked = false;
var isTextClicked = false;
var mousePosition = {};
var backgroundImage = 'backgroundleft';
var c = document.getElementById("myCanvas");
var coverImage = document.getElementById("hideimage");
var ctx = c.getContext("2d");
var userImage = "";
var canvasText = "";
var mouseClickPosition = {};
var backgroundImageDetails = canvasBackgroundImageDetails();
var canvasDetails = canvasDetails(c);
var userImageCoOrdinates = { x:0, y:0 };
var textCoOrdinates = {InitialX:250, InitialY: 100, x:250,y:100, maxX:0,maxY:0}
var userImageDetails = canvasUserImageDetails(backgroundImageDetails , userImageCoOrdinates);
var canvasTextDetail = getCanvasTextDetails(textCoOrdinates);

window.onload = function() {
  console.log(canvasDetails , "--------------")
  ctx.drawImage(coverImage, canvasDetails.x, canvasDetails.y,
    canvasDetails.width,canvasDetails.height);
  setCover('backgroundleft');
}

function drawUserImage( userImage, userImageDetails ){
  ctx.drawImage( userImage, userImageDetails.x, userImageDetails.y, userImageDetails.width, userImageDetails.height );
}

function canvasDetails( canvas ){
  return { width: canvas.width , height:canvas.height, x:0, y:0 }
}

function getCanvasTextDetails(textCoOrdinates){
  return {x:textCoOrdinates.x, y:textCoOrdinates.y, width:250, height:300 };
}

function canvasBackgroundImageDetails(){
  return {x:0, y:0, width:400, height:270 };
}

function canvasUserImageDetails(backgroundImageDetails , userImageCoOrdinates){
  var userImage = {};
  userImage.x = backgroundImageDetails.x+userImageCoOrdinates.x;
  userImage.y = backgroundImageDetails.y+userImageCoOrdinates.y;
  userImage.width = 150;
  userImage.height = 100;

  return  userImage;
}

function getTextHeight(event, textCoOrdinates, textDetails, canvasDetails, mousePosition){
      
  var currentHeight = textCoOrdinates.y +(event.clientY - mousePosition.y);
  mousePosition.y = event.clientY;
  if(currentHeight < canvasDetails.y+30) currentHeight = canvasDetails.y+30;
  if(currentHeight > (canvasDetails.height - textCoOrdinates.maxY)) 
    currentHeight = canvasDetails.height - textCoOrdinates.maxY;

  return currentHeight;
}



function getTextWidth(event, textCoOrdinates, textDetails, canvasDetails, mousePosition){
  var currentWidth = textCoOrdinates.x +(event.clientX - mousePosition.x);
  mousePosition.x = event.clientX;
  if(currentWidth < canvasDetails.x) currentWidth = canvasDetails.x;
  if(currentWidth >= (canvasDetails.width - textDetails.width)) 
    currentWidth = canvasDetails.width - textDetails.width;

  return currentWidth;
}

function dragText(event){
  if(!isClicked){
    mouseClickPosition.x = event.clientX;
    mouseClickPosition.y= event.clientY;
    isClicked = true;
  }
  textCoOrdinates.y = getTextHeight(event, textCoOrdinates, canvasTextDetail, canvasDetails, mouseClickPosition)
  textCoOrdinates.x = getTextWidth(event, textCoOrdinates, canvasTextDetail, canvasDetails, mouseClickPosition)
  ctx.drawImage(coverImage, canvasDetails.x, canvasDetails.y, canvasDetails.width,canvasDetails.height);
  if(canvasText !== "") makeParagraph(ctx, canvasText, canvasTextDetail);
  setCover(backgroundImage);  
  userImageDetails = canvasUserImageDetails(backgroundImageDetails , userImageCoOrdinates)
  if(userImage !== "") drawUserImage(userImage, userImageDetails )

}

function getBackgroundHeight(event, imageDetails, canvasDetails, mousePosition){
      
  var currentHeight = imageDetails.y +(event.clientY - mousePosition.y);
  mousePosition.y = event.clientY;
  if(currentHeight < canvasDetails.y) currentHeight = canvasDetails.y;
  if(currentHeight > (canvasDetails.height - imageDetails.height)) 
    currentHeight = canvasDetails.height - imageDetails.height;

  return currentHeight;
}

function getBackgroundWidth(event, imageDetails, canvasDetails, mousePosition){
  var currentWidth = imageDetails.x +(event.clientX - mousePosition.x);
  mousePosition.x = event.clientX;
  if(currentWidth < canvasDetails.x) currentWidth = canvasDetails.x;
  if(currentWidth >= (canvasDetails.width - imageDetails.width)) 
    currentWidth = canvasDetails.width - imageDetails.width;

  return currentWidth;
}

function isTextDataClicked(textDetails , mousePosition){
  return textDetails.x <= mousePosition.x && 
    mousePosition.x <= ( textDetails.width + textDetails.x ) &&
  textDetails.y <= mousePosition.y  &&
  mousePosition.y <= ( textDetails.height + textDetails.y );
}

function isImageClicked(ImageDetails , mousePosition){
  return ImageDetails.x <= mousePosition.x && 
    mousePosition.x <= ( ImageDetails.width + ImageDetails.x ) &&
  ImageDetails.y <= mousePosition.y  &&
  mousePosition.y <= ( ImageDetails.height + ImageDetails.y );
}

function changeBackgroundImage(event){
  if(!isClicked){
    mouseClickPosition.x = event.clientX;
    mouseClickPosition.y= event.clientY;
    isClicked = true;
  }
  backgroundImageDetails.y = getBackgroundHeight(event, backgroundImageDetails, canvasDetails, mouseClickPosition);
  backgroundImageDetails.x = getBackgroundWidth(event, backgroundImageDetails, canvasDetails, mouseClickPosition);
  ctx.drawImage(coverImage, canvasDetails.x, canvasDetails.y, canvasDetails.width,canvasDetails.height);
  if(canvasText !== "") makeParagraph(ctx, canvasText, canvasTextDetail);
  setCover(backgroundImage);  
  userImageDetails = canvasUserImageDetails(backgroundImageDetails , userImageCoOrdinates)
  if(userImage !== "") drawUserImage(userImage, userImageDetails )

}

function getUserImageHeight(event, userImageDetails, userImageCoOrdinates, backgroundImageDetails, mousePosition){
      
  var currentHeight = userImageCoOrdinates.y +(event.clientY - mousePosition.y);
  mousePosition.y = event.clientY;
  if(currentHeight < 0) currentHeight = 0;
  if(currentHeight > ( backgroundImageDetails.height - userImageDetails.height)) 
    currentHeight =  backgroundImageDetails.height - userImageDetails.height;

  return currentHeight;
}

function getUserImageWidth(event, userImageDetails, userImageCoOrdinates, backgroundImageDetails, mousePosition){
  var currentWidth = userImageCoOrdinates.x +(event.clientX - mousePosition.x);
  mousePosition.x = event.clientX;
  if(currentWidth < 0) currentWidth = 0;
  if(currentWidth > (backgroundImageDetails.width - userImageDetails.width)) 
    currentWidth = backgroundImageDetails.width - userImageDetails.width;

  return currentWidth;
}

function dragUserImage(event){
   if(!isClicked){
    mouseClickPosition.x = event.clientX;
    mouseClickPosition.y= event.clientY;
    isClicked = true;
  }
  userImageCoOrdinates.y = getUserImageHeight(event , userImageDetails, userImageCoOrdinates, backgroundImageDetails, mouseClickPosition );
  userImageCoOrdinates.x = getUserImageWidth(event , userImageDetails, userImageCoOrdinates, backgroundImageDetails, mouseClickPosition );
  ctx.drawImage(coverImage, canvasDetails.x, canvasDetails.y, canvasDetails.width,canvasDetails.height);
  if(canvasText !== "") makeParagraph(ctx, canvasText, canvasTextDetail);
  setCover(backgroundImage);  
  userImageDetails = canvasUserImageDetails(backgroundImageDetails , userImageCoOrdinates)
  if(userImage !== "") drawUserImage(userImage, userImageDetails )
}

function setCover(id) {
  var img = document.getElementById(id);
  // ctx.drawImage(coverImage, canvasDetails.x, canvasDetails.y, canvasDetails.width,canvasDetails.height);
  ctx.drawImage(img, backgroundImageDetails.x, backgroundImageDetails.y,
    backgroundImageDetails.width, backgroundImageDetails.height);
}

function makeParagraph(ctx, text, textDetail){
  canvasTextDetail = getCanvasTextDetails(textCoOrdinates);
  var wordArray = text.split(" ");
  var formattedText = "";
  wordArray.forEach(function(word , index,array){
    formattedText += word+" " 
    if(formattedText.length > 20 || array[array.length - 1] == word){
      ctx.fillText(formattedText, textDetail.x, textDetail.y, textDetail.width, textDetail.height);
      formattedText = "";
      textDetail.y += 30;
    }
  })
};

function printText(ctx, text, textDetail){
  canvasTextDetail = getCanvasTextDetails(textCoOrdinates);
  console.log(canvasTextDetail , "------ canvasTextdetails")
  var wordArray = text.split(" ");
  var formattedText = "";
  wordArray.forEach(function(word , index,array){
    formattedText += word+" " 
    if(formattedText.length > 20 || array[array.length - 1] == word){
      ctx.fillText(formattedText, textDetail.x, textDetail.y, textDetail.width, textDetail.height);
      formattedText = "";
      textDetail.y += 30;
      textCoOrdinates.maxY =textDetail.y - textCoOrdinates.InitialY;
    }
  })
  console.log(textCoOrdinates , "     --- this is textCoOrdinates")
};

function readImage() {
    if ( this.files && this.files[0] ) {
        var FR= new FileReader();
        FR.onload = function(e) {
           var img = new Image();
           userImage = img;
           img.onload = function() {
             if(userImage !== "")  drawUserImage(img, userImageDetails);
           };
           img.src = e.target.result;
        };       
        FR.readAsDataURL( this.files[0] );
    }
};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function ImgApi(){
    this.apiUrl = 'https://localhost:3000';
}

ImgApi.prototype = {
  _requst : function( method, path, body ){
      body = body || {};

      var args = {
        url:  path,
        method: method,
      };

      if( method == 'post' ){
        args.contentType = false;
        args.processData = false;
        args.data = new FormData(  );
        Object.keys( body ).forEach( function( v ){
          args.data.append( v, body[v] );
        });
      }

      return $.ajax( args );
  },

  dataURItoBlob: function (dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
  },

  saveImage: function( dataUrl ){
    var blob = this.dataURItoBlob( dataUrl );
    console.log(blob ,"---------------------")
    return this._requst( 'post', '/project/'+getCookie("projectId")+"/save", { imgData: blob } );
  }
}



$( document ).ready(function() {
   

    $( "#backgroundleft" ).click(function() {
      setCover('backgroundleft');
      if(userImage !== "") drawUserImage(userImage, userImageDetails)
      backgroundImage = 'backgroundleft';
    });

    $( "#backgroundmiddle" ).click(function() {
      setCover('backgroundmiddle');
      if(userImage !== "") drawUserImage(userImage, userImageDetails)
      backgroundImage = 'backgroundmiddle';
    });

    $( "#backgroundright" ).click(function() {
      setCover('backgroundright');
      if(userImage !== "") drawUserImage(userImage, userImageDetails)
      backgroundImage = 'backgroundright';
    });

    $("#textbox-button").click(function(){
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      var textContent = document.getElementById("the-textbox").value;
      console.log( textContent ,"-------- this is text content")
      canvasText = textContent;
      var img = document.getElementById("hideimage");
      ctx.drawImage(img, canvasDetails.x, canvasDetails.y,
    canvasDetails.width,canvasDetails.height);
      ctx.font='800 italic 24px Arial';
      ctx.fillStyle = 'black';
      printText(ctx, textContent, canvasTextDetail);
      setCover(backgroundImage);
      if(userImage !== "") drawUserImage(userImage, userImageDetails)
    });

    document.getElementById("file-input").addEventListener("change", readImage, false);

    $('#facebook-input').click(function(){
      $("#oksubmit").hide();
      getPhotos( function( photos ) {
        photos.forEach(function(photo){
          var element = document.createElement('img');
          element.src = photo.url;
          element.crossOrigin = "anonymous";
          element.height = 100;
          element.width = 100;
          $(element).click( function(){
            $("#selected").removeAttr('id');
            $(this).attr('id',"selected");
            $("#oksubmit").show();
          });

          $('#facebook-image-holder').append(element);
        });
      });
    });

    $("#oksubmit").click(function(){
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      var image = document.getElementById("selected");
      userImage = image;
      if(userImage !== "") drawUserImage(image , userImageDetails);
      $("#selected").removeAttr('id');
    });

    $("#save-button").click(function(){
     var c = document.getElementById("myCanvas");
     var src = c.toDataURL("image/png");
     
     ImgApi.prototype.saveImage(src).then(function(data){
        console.log(data , "------------------")
        window.location.replace( "/project/"+data.project_id+"/"+data.result_image+"/preview" );
     });
    });

    $("#myCanvas").mousedown(function(event){
        isDragging = true;
        var canvas = document.getElementById('myCanvas');
        var rect = canvas.getBoundingClientRect();  // get element's abs. position
        mousePosition.x = event.clientX - rect.left;              // get mouse x and adjust for el.
        mousePosition.y = event.clientY - rect.top;               // get mouse y and adjust for el.
        if(isImageClicked(userImageDetails , mousePosition) && userImage !=="") isUserPhotoClicked = true;
        if(isImageClicked(backgroundImageDetails , mousePosition) &&  !isUserPhotoClicked)
          isBackgroundClicked = true;
        console.log(isTextDataClicked(canvasTextDetail , mousePosition))
        if(isTextDataClicked(canvasTextDetail , mousePosition) && !isUserPhotoClicked && !isBackgroundClicked)
          isTextClicked = true;
    });

    $(window).mouseup(function(){
        isDragging = false;
        isClicked = false;
        isBackgroundClicked = false;
        isUserPhotoClicked = false;
        isTextClicked = false;
    });

    $(window).mousemove(function(event) {
        if( isDragging == true )
        { 
          if(isUserPhotoClicked ){
            dragUserImage(event);
          }
          else if(isBackgroundClicked && !isUserPhotoClicked ){
            changeBackgroundImage(event);
          }
          else if(!isBackgroundClicked && !isUserPhotoClicked && isTextClicked){
            dragText(event);
          }
        }
    });
});