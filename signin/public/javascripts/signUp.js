(function() {

    jQuery.validator.addMethod("nameCheck", function(value, element) {
        return this.optional(element) || /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/.test(value);
    }, "6-18 letters, numbers or underlines, and must start with a letter");

	jQuery.validator.addMethod("passwordCheck", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9_\-]{6,18}$/.test(value);
    }, "6-18 letters, numbers, hyphens or underlines");

    jQuery.validator.addMethod("idCheck", function(value, element) {
        return this.optional(element) || /^[1-9][0-9]{7,7}$/.test(value);
    }, "8-digit number, can not start with 0");

	jQuery.validator.addMethod("emailCheck", function(value, element) {
        return this.optional(element) || /^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/.test(value);
    }, "Please input a valid E-mail address");

    jQuery.validator.addMethod("phoneCheck", function(value, element) {
        return this.optional(element) || /^[1-9][0-9]{10,10}$/.test(value);
    }, "11-digit number, can not start with 0");

	$(document).ready(function() {

		$.validator.setDefaults({
    	    submitHandler: function(form) {
      	    	form.submit();
    	    }
		});

		$("form").validate({
			rules: {
	            name: {
					required: true,
                    nameCheck: true,
				},
				password: {
					required: true,
					passwordCheck: true,
				},
				repeatPassword: {
					required: true,
					equalTo: "#password",
				},
	            id: {
					required: true,
                    idCheck: true,
				},
	            email: {
	                required: true,
	                emailCheck: true
	            },
                phone: {
					required: true,
                    phoneCheck: true,
				},
	        },
	        messages: {
				name: {
	                required: "Please input your name",
	                nameCheck: "6-18 letters numbers or underlines, and must start with a letter"
	            },
				password: {
	                required: "Please input your password",
	                passwordCheck: "6-18 letters, numbers, hyphens or underlines"
	            },
				repeatPassword: {
	                required: "Please input your password",
	                equalTo: "Two different passwords are entered"
	            },
                id: {
	                required: "Please input your student id",
	                idCheck: "8-digit number, can not start with 0"
	            },
                email: {
	                required: "Please input your E-mail address",
	                phoneCheck: "Please input a valid E-mail address"
	            },
                phone: {
	                required: "Please input your cell phone number",
	                phoneCheck: "11-digit number, can not start with 0"
	            },
		    },
            errorPlacement: function(error, element) {
                error.appendTo( element.next() );
            }
		});

	});
})();