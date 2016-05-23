var imageId = 'backgroundleft';
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var userImage = "";

window.onload = function() {
    var img = document.getElementById("hideimage");
    ctx.drawImage(img, 0, 0,500,400);
    setCover('backgroundleft');
}


function setCover(id) {
    var img = document.getElementById(id);
    ctx.drawImage(img, 0, 0,200,150);
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
             ctx.drawImage(img, 0, 0, 150, 50);
           };
           img.src = e.target.result;
        };       
        FR.readAsDataURL( this.files[0] );
    }
};

function makeFacebookPhotoURL( id, accessToken ) {
  return 'https://graph.facebook.com/' + id + '/picture?access_token=' + accessToken;
}

function login( callback ) {
  FB.login(function(response) {
    if (response.authResponse) {
      //console.log('Welcome!  Fetching your information.... ');
      if (callback) {
        callback(response);
      }
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  },{scope: 'user_photos'} );
}

function getAlbums( callback ) {
  FB.api(
      '/me/albums',
      {fields: 'id,cover_photo'},
      function(albumResponse) {
        //console.log( ' got albums ' );
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
        //console.log( ' got photos for album ' + albumId );
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
      ctx.drawImage(userImage, 0, 0, 150, 50);
      imageId = 'backgroundleft';
    });

    $( "#backgroundmiddle" ).click(function() {
      setCover('backgroundmiddle');
      ctx.drawImage(userImage, 0, 0, 150, 50);
      imageId = 'backgroundmiddle';
    });

    $( "#backgroundright" ).click(function() {
      setCover('backgroundright');
      ctx.drawImage(userImage, 0, 0, 150, 50);
      imageId = 'backgroundright';
    });

    $("#textbox-button").click(function(){
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      var textContent = document.getElementById("the-textbox").value;
      var img = document.getElementById("hideimage");
      ctx.drawImage(img, 0, 0,500,400);
      setCover(imageId);
      ctx.font='800 italic 24px Arial';
      ctx.fillStyle = 'black';
      makeParagraph(ctx, textContent, 250,100, 250, 300);
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
      ctx.drawImage(image, 0, 0, 150, 50)
      $("#selected").removeAttr('id');
    });

    $("#save-button").click(function(){
     var c = document.getElementById("myCanvas");
     var src = c.toDataURL("image/png");
     var w=window.open('about:blank','image from canvas');
     w.document.write("<img src='"+src+"' alt='from canvas'/>");
    });
});