
function changeCoverImage () {
    var imagePath = $('#coverImagePicker').val();
    imagePath = imagePath.split('\\').pop();
    $("#coverImage").attr("src", "/images/"+imagePath);
}
