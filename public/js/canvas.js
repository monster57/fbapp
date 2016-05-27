
var isDragging = false;
var isClicked = false;
var isBackgroundClicked = false;
var isUserPhotoClicked = false;
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
var userImageDetails = canvasUserImageDetails(backgroundImageDetails , userImageCoOrdinates);

window.onload = function() {
  ctx.drawImage(coverImage, canvasDetails.initialX, canvasDetails.initialY,
    canvasDetails.x,canvasDetails.y);
  setCover('backgroundleft');
}

function drawUserImage( userImage, userImageDetails ){
  ctx.drawImage( userImage, userImageDetails.x, userImageDetails.y, userImageDetails.maxX, userImageDetails.maxY );
}

function canvasDetails( canvas ){
  return { x: canvas.width , y:canvas.height, initialX:0, initialY:0 }
}

function canvasBackgroundImageDetails(){
  return {x:0, y:0, maxX:200, maxY:150 };
}

function canvasUserImageDetails(backgroundImageDetails , userImageCoOrdinates){
  var userImage = {};
  userImage.x = backgroundImageDetails.x+userImageCoOrdinates.x;
  userImage.y = backgroundImageDetails.y+userImageCoOrdinates.y;
  userImage.maxX = 150;
  userImage.maxY = 100;

  return  userImage;
}

function getBackgroundHeigt(event, imageDetails, canvasDetails, mousePosition){
      
  var currentHeight = imageDetails.y +(event.clientY - mousePosition.y);
  mousePosition.y = event.clientY;
  if(currentHeight < canvasDetails.initialY) currentHeight = canvasDetails.initialY;
  if(currentHeight > (canvasDetails.y - imageDetails.maxY)) 
    currentHeight = canvasDetails.y - imageDetails.maxY;

  return currentHeight;
}

function getBackgroundWidth(event, imageDetails, canvasDetails, mousePosition){
  var currentWidth = imageDetails.x +(event.clientX - mousePosition.x);
  mousePosition.x = event.clientX;
  if(currentWidth < canvasDetails.initialX) currentWidth = canvasDetails.initialX;
  if(currentWidth >= (canvasDetails.x - imageDetails.maxX)) 
    currentWidth = canvasDetails.x - imageDetails.maxX;

  return currentWidth;
}


function isImageClicked(ImageDetails , mousePosition){
  return ImageDetails.x <= mousePosition.x && 
    mousePosition.x <= ( ImageDetails.maxX + ImageDetails.x ) &&
  ImageDetails.y <= mousePosition.y  &&
  mousePosition.y <= ( ImageDetails.maxY + ImageDetails.y );
}

function changeBackgroundImage(event){
  if(!isClicked){
    mouseClickPosition.x = event.clientX;
    mouseClickPosition.y= event.clientY;
    isClicked = true;
  }
  backgroundImageDetails.y = getBackgroundHeigt(event, backgroundImageDetails, canvasDetails, mouseClickPosition)
  backgroundImageDetails.x = getBackgroundWidth(event, backgroundImageDetails, canvasDetails, mouseClickPosition)
  ctx.drawImage(coverImage, canvasDetails.initialX, canvasDetails.initialY, canvasDetails.x,canvasDetails.y);
  if(canvasText !== "") makeParagraph(ctx, canvasText, 250,100, 250, 300);
  setCover(backgroundImage);  
  userImageDetails = canvasUserImageDetails(backgroundImageDetails , userImageCoOrdinates)
  if(userImage !== "") drawUserImage(userImage, userImageDetails )

}
function getUserImageHeight(event, userImageDetails, backgroundImageDetails, mousePosition){
      
  var currentHeight = userImageDetails.y +(event.clientY - mousePosition.y);
  mousePosition.y = event.clientY;
  if(currentHeight < backgroundImageDetails.y) currentHeight = backgroundImageDetails.y;
  if(currentHeight > (backgroundImageDetails.y - userImageDetails.maxY)) 
    currentHeight = backgroundImageDetails.y - userImageDetails.maxY;

  return currentHeight;
}

function getUserImageWidth(event, userImageDetails, backgroundImageDetails, mousePosition){
  var currentWidth = userImageDetails.x +(event.clientX - mousePosition.x);
  mousePosition.x = event.clientX;
  if(currentWidth < backgroundImageDetails.initialX) currentWidth = backgroundImageDetails.initialX;
  if(currentWidth >= (backgroundImageDetails.x - userImageDetails.maxX)) 
    currentWidth = backgroundImageDetails.x - userImageDetails.maxX;

  return currentWidth;
}

function changeUserImage(event){
   if(!isClicked){
    mouseClickPosition.x = event.clientX;
    mouseClickPosition.y= event.clientY;
    isClicked = true;
  }
  // userImageDetails.y = getUserImageHeight(event , userImageDetails, backgroundImageDetails, mouseClickPosition );
  // userImageDetails.x = getUserImageWidth(event , userImageDetails, backgroundImageDetails, mouseClickPosition );
  // console.log(userImageDetails.y+"------------"+userImageDetails.x+"  this is user image ")
  // console.log(backgroundImageDetails.x+"----------------------"+backgroundImageDetails.y+ "this is background image")
}

function setCover(id) {
  var img = document.getElementById(id);
  ctx.drawImage(img, backgroundImageDetails.x, backgroundImageDetails.y,
    backgroundImageDetails.maxX, backgroundImageDetails.maxY);
}

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
      makeParagraph(ctx, textContent, 250,100, 250, 300);
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
     var w=window.open('about:blank','image from canvas');
     w.document.write("<img src='"+src+"' alt='from canvas'/>");
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
    });

    $(window).mouseup(function(){
        isDragging = false;
        isClicked = false;
        isBackgroundClicked = false;
        isUserPhotoClicked = false;

    });

    $(window).mousemove(function(event) {
        if( isDragging == true )
        { 
          if(isUserPhotoClicked ){
            changeUserImage(event)
          }
          else if(isBackgroundClicked && !isUserPhotoClicked ){
            changeBackgroundImage(event)
          }
        }
    });
});