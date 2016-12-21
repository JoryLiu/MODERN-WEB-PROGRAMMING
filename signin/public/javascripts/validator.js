var validator = {
    form: {
        name: {
            status: false,
            errorMessage: '6-18 letters numbers or underlines, and must start with a letter'
        },
        password: {
            status: false,
            errorMessage: '6-18 letters, numbers, hyphens or underlines'
        },
        repeatPassword: {
            status: false,
            errorMessage: 'Two different passwords are entered'
        },
        id: {
            status: false,
            errorMessage: '8-digit number, can not start with 0'
        },
        email: {
            status: false,
            errorMessage: 'Please input a valid E-mail address'
        },
        phone: {
            status: false,
            errorMessage: '11-digit number, can not start with 0'
        }
    },

    findFormatErrors: function (user) {
        var errorMessages = [];
        for (var key in user) {
            if (user[key] != undefined) {
                if (!validator.isFieldValid(key, user[key])) errorMessages.push(validator.form[key].errorMessage);
            }
        }
        errorMessages.length > 0 ? new Error(errorMessages.join('<br />')) : null;
    },

    isNameValid: function (name) {
        return this.form.name.status = /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/.test(name);
    },

    isPasswordValid: function (password) {
        this.password = password;
        return this.form.password.status = /^[a-zA-Z0-9_\-]{6,18}$/.test(password);
    },

    isRepeatPasswordValid: function (repeatPassword) {
        return this.form.repeatPassword.status = this.password == repeatPassword;
    },

    isIdValid: function (id) {
        return this.form.id.status = /^[1-9][0-9]{7,7}$/.test(id);
    },

    isEmailValid: function (email) {
        return this.form.email.status = /^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/.test(email);
    },

    isPhoneValid: function (phone) {
        return this.form.phone.status = /^[1-9][0-9]{10,10}$/.test(phone);
    },

    isFieldValid: function (fieldname, value) {
        var CapFiledname = fieldname[0].toUpperCase() + fieldname.slice(1, fieldname.length);
        return this["is" + CapFiledname + 'Valid'](value);
    },

    isFormValid: function () {
        return this.form.name.status && this.form.password.status && this.form.repeatPassword.status && this.form.id.status && this.form.email.status && this.form.phone.status;
    },

    getErrorMessage: function (fieldname) {
        return this.form[fieldname].errorMessage;
    },

    isAttrValueUnique: function (registry, user, attr) {
        for (var key in registry) {
            if (registry[key] != undefined && registry[key][attr] == user[attr]) return false;
        }
        return true;
    }
}

if (typeof module == 'object') {
    module.exports = validator
}