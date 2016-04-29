
function changeCoverImage () {
    var imagePath = $('input[type=file]').val();
    imagePath = imagePath.split('\\').pop();
    $("#coverImage").attr("src", "/images/"+imagePath);
}
