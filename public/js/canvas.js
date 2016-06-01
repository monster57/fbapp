
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
  return {x:0, y:0, width:200, height:150 };
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

function makeFacebookPhotoURL( id, accessToken ) {
  return 'https://graph.facebook.com/' + id + '/picture?access_token=' + accessToken;
}

function getAlbums( callback ) {
  FB.api(
    '/me/albums',
    {fields: 'id,cover_photo'},
    function(albumResponse) {
      if (callback) {
        callback(albumResponse);
      }
    }
  );
}

function getPhotosForAlbumId( albumId, callback ) {
  FB.api(
    '/'+albumId+'/photos',
    {fields: 'id'},
    function(albumPhotosResponse) {
      if (callback) {
        callback( albumId, albumPhotosResponse );
      }
    }
  );
}

function getLikesForPhotoId( photoId, callback ) {
  FB.api(
    '/'+albumId+'/photos/'+photoId+'/likes',
    {},
    function(photoLikesResponse) {
      if (callback) {
        callback( photoId, photoLikesResponse );
      }
    }
  );
}

function getPhotos(callback) {

  var allPhotos = [];

  var accessToken = '';

  FB.getLoginStatus(function(loginResponse) {
      accessToken = loginResponse.authResponse.accessToken || '';
      getAlbums(function(albumResponse) {
          var i, album, deferreds = {}, listOfDeferreds = [];

          for (i = 0; i < albumResponse.data.length; i++) {
            album = albumResponse.data[i];
            deferreds[album.id] = $.Deferred();
            listOfDeferreds.push( deferreds[album.id] );
            getPhotosForAlbumId( album.id, function( albumId, albumPhotosResponse ) {
                var i, facebookPhoto;
                for (i = 0; i < albumPhotosResponse.data.length; i++) {
                  facebookPhoto = albumPhotosResponse.data[i];
                  allPhotos.push({
                    'id'  : facebookPhoto.id,
                    'added' : facebookPhoto.created_time,
                    'url' : makeFacebookPhotoURL( facebookPhoto.id, accessToken )
                  });
                }
                deferreds[albumId].resolve();
              });
          }

          $.when.apply($, listOfDeferreds ).then( function() {
            if (callback) {
              callback( allPhotos );
            }
          }, function( error ) {
            if (callback) {
              callback( allPhotos, error );
            }
          });
        });
    });
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
      canvasText = textContent;
      var img = document.getElementById("hideimage");
      ctx.drawImage(img, 0, 0,500,400);
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
     var canvasImage  = new Image(500, 500);
     var canvasImage.src = src;
     // $.cookie("image", imageSource, { expires: 7 });
     // $.removeCookie("image");
     // console.log($.cookie("image"));
     // setCookie("image" , src , 1)
      // var myImage = new Image(100, 200);
      // myImage.src = 'picture.jpg';
      console.log(canvasImage);
      // console.log(getCookie(image));
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