
function makeFacebookPhotoURL( id, accessToken ) {
  return 'https://graph.facebook.com/' + id + '/picture?access_token=' + accessToken;
}

function getAlbums( accessToken , callback ) {
  FB.api(
    '/me/albums?accessToken='+accessToken,
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
      getAlbums(accessToken , function(albumResponse ) {
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