$(function() {
$("input[type='file'].filepicker").filepicker();
$('select').material_select();
});

function changePermissions(len){

	console.log('f called');
	var e = document.getElementById('selectOption0');
	var optionVal = e.options[e.selectedIndex].value;
	var OptionStr = e.options[e.selectedIndex].text;
	var jsArr = [];
	var obj1 = {
		data: jsArr
	};
	for(var i=0; i< len; i++){
		var e = document.getElementById('selectOption'+i);
		var optionVal = e.options[e.selectedIndex].value;
		var OptionStr = e.options[e.selectedIndex].text;
		if(OptionStr == "Admin"){
			OptionStr = "admin";
		}
		else{
			OptionStr = "user";
		}
		var obj = {
			facebook_id: optionVal,
			role: OptionStr
		}
		jsArr.push(obj);
	}
	console.log('jsArr val Before sending:-- ', jsArr[0]);
	$.ajax({
	type: "POST",
	url: '/members/privilages',
	data: obj1,
	// success: function(){ alert('Success')},
	dataType: 'JSON'
	});
	// $.post("/members/privilages", jsArr, function(data, status){
 //        alert("Data: " + data + "\nStatus: " + status);
 //    });
}

