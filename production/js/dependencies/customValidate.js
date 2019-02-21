$(document).ready(function(){


    $('#sign-up-form').validate({
        rules: {
	    username: {
		required: true,
		minlength: 4
	    },
	    
            name: {
                required: true
            },

            email: {
                required: true,
                email: true
            },

	    house: {
		required: true,
		number: true
	    },

	    stickercode: {
		required: true,
		minlength: 8,
		maxlength: 8
	    },

            password: {
                minlength: 5,
                required: true
            },

            confirmation: {
                minlength: 5,
                equalTo: "#password"
            }
        },

        success: function(element){
            element
            .text("Ok!").addclass('valid');
        }
    });
});
