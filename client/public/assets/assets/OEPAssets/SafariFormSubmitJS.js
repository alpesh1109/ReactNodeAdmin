$("form").submit(function (e) {

    var ref = $(this).find("[required]");

    $(ref).each(function () {
        if ($(this).val() === '') {
            alert("Required field should not be blank.");

            $(this).focus();

            e.preventDefault();
            return false;
        }
    }); return true;
});


//$('form :input:visible[required="required"]').each(function () {
//    if ($.trim($(this).val()) === '') {
//        $(this).val('');
//        this.setCustomValidity('Please fill out this field');
//        return false;
//    }
//    else {
//        this.setCustomValidity('');
//        return true;
//    }
//});


function validateForm(Formname) {
    var status = true;
    debugger;
    $('#' + Formname + ' :visible[required="required"]').each(function () {
        debugger;
        if (!this.validity.valid) {
            console.log(this);

            if (this.type.indexOf('select') >= 0) {
                $(this).next().css('border', 'solid 1px red')
              //  $(this).on("focus", function () { $(this).css('border', '1px solid #d5d5d5') });
            }
            else {
                $(this).css('border', 'solid 1px red')
                $(this).on("focus", function () { $(this).css('border', '1px solid #d5d5d5') });
            }
            status = false;

        }
    });

    return status;
}


function validateFormNumeric(Formname) {

    var status = true;
    $('#' + Formname + ' :visible[required="required"]').each(function () {
        debugger;
        if (!this.validity.valid || this.value === '0' || (isNumber(this.value) && Math.ceil(this.value) == 0)) {
            if (this.value != 'on') {
                this.value = '';
            }
            if (this.type.indexOf('select') >= 0) {
                $(this).next().css('border', 'solid 1px red')
                //  $(this).on("focus", function () { $(this).css('border', '1px solid #d5d5d5') });
            }
        }

    });

    return status;
}


function validateFormSubmit(Formname) {
    var status = true;
    $('#' + Formname + ' :visible[required="required"]').each(function () {
        debugger;
        if (!this.validity.valid) {
            status = false;
        }
    });

    return status;
}

/******************Checking input text with only space********************/
function ValidationFormInput() {
    $('input:visible[type="text"]').each(function () {
        debugger;
        if ($.trim($(this).val()) === '') {
            $(this).val('');
            this.setCustomValidity('Please fill out this field');
            return false;
        }
        else {
            this.setCustomValidity('');
        }
    });
    return true;
}
/*************************************************************************/