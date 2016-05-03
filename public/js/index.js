$(function() {
	$("input[type='file'].filepicker").filepicker();
	$('select').material_select();
	$('.collapsible').collapsible({
		accordion : true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
	});
	$('.dropdown-button').dropdown({
				inDuration: 300,
				outDuration: 225,
				constrain_width: false, // Does not change width of dropdown to that of the activator
				gutter: 0, // Spacing from edge
				belowOrigin: false, // Displays dropdown below the button
				alignment: 'right' // Displays dropdown with edge aligned to the left of button
			}
	);
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

