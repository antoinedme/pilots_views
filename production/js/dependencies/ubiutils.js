/*
 * Set of useful and reusable frontend functions
 *
 */

// clone content between '#template' identified tags
var cloneTemplate = function(wrapper, options) {
    var divToInject = wrapper.children('#template').clone().removeClass('hide').addClass('clone').removeAttr('id');
    if(options) {
	if(options.stringsToReplace) {
	    var newText = divToInject.html();
	    $.each(options.stringsToReplace, function(stringToReplace, newString) {
		newText = newText.replace(RegExp(stringToReplace,'g'), newString);
	    });
	    divToInject.html(newText);
	}
	if(options.valuesToSet) {
	    $.each(options.valuesToSet, function(name, value){
		var component = divToInject.find("[name='"+name+"']:first");
		if(component.prop("tagName") === "SELECT")
		    component.find("[value='"+value+"']:first").prop('selected',true);
		else
		    component.attr("value", value);
	    });
	}
	if(!options.keepDisabledInputs) {
	    // remove 'disabled' attribute for select and input tags
	    divToInject.find('select').removeAttr('disabled');
	    divToInject.find('input').removeAttr('disabled');
	}
    } else {
	// remove 'disabled' attribute for select and input tags
	divToInject.find('select').removeAttr('disabled');
	divToInject.find('input').removeAttr('disabled');
    }
    wrapper.append(divToInject);
    return divToInject;
};
