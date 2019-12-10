
function onlyAlphabets(e, t) {
    try {
        if (window.event) {
            var charCode = window.event.keyCode;
        }
        else if (e) {
            var charCode = e.which;
        }
        else { return true; }
        if (charCode == 0 || charCode == 8 || charCode == 17 || charCode == 20 || charCode == 32 || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123))
            return true;
        else
            return false;
    }
    catch (err) {

        var charCode = e.charCode;

        if (charCode == 0 || charCode == 8 || charCode == 17 || charCode == 20 || charCode == 32 || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123))
            return true;
        else
            return false;
      //  alert(err.Description);
    }
}

function ToUpper(ctrl) {

    var t = ctrl.value;

    ctrl.value = t.toUpperCase();

}

function onlyAlphabetsWithoutSpace(e, t) {
    try {
        if (window.event) {
            var charCode = window.event.keyCode;
        }
        else if (e) {
            var charCode = e.which;
        }
        else { return true; }
        if (charCode == 0 || charCode == 8 || charCode == 17 || charCode == 20  || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123))
            return true;
        else
            return false;
    }
    catch (err) {
        //alert(err.Description);
        var charCode = e.charCode;

        if (charCode == 0 || charCode == 8 || charCode == 17 || charCode == 20 || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123))
            return true;
        else
            return false;
    }
}

function minmax(value, min, max, elementd) {
    if (parseInt(value) < min || isNaN(value)) {
        return 0;
    }
    else if (parseInt(value) > max) {
        return 0;
    }
    else {
        return value;
    }
}

function onlyNumberAlphabets(e, t) {
    try {
        if (window.event) {
            var charCode = window.event.keyCode;
        }
        else if (e) {
            var charCode = e.which;
        }
        else { return true; }
        if (charCode == 0 || charCode == 8 || charCode == 17 || charCode == 20 || charCode == 32 || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) ||(charCode >47 &&  charCode<58))
            return true;
        else
            return false;
    }
    catch (err) {
       // alert(err.Description);
        var charCode = e.charCode;

        if (charCode == 0 || charCode == 8 || charCode == 17 || charCode == 20 || charCode == 32 || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode > 47 && charCode < 58))
            return true;
        else
            return false;
    }
}


function onlyAlphabetsSpecificCharacter(e, t) {
    try {
        if (window.event) {
            var charCode = window.event.keyCode;
        }
        else if (e) {
            var charCode = e.which;
        }
        else { return true; }
        if (charCode == 0 || charCode == 8 || charCode == 17 || charCode == 20 || charCode == 32 ||
            (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) ||
            (charCode > 47 && charCode < 58)
            ||charCode==58 || charCode==47 ||charCode==45 || charCode==40 || charCode==41)
            return true;
        else
            return false;
    }
    catch (err) {
       // alert(err.Description);
        var charCode = e.charCode;

        if (charCode == 0 || charCode == 8 || charCode == 17 || charCode == 20 || charCode == 32 ||
            (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) ||
            (charCode > 47 && charCode < 58)
            || charCode == 58 || charCode == 47 || charCode == 45 || charCode == 40 || charCode == 41)
            return true;
        else
            return false;
    }
}

function allowSpecialonlyAlphabets(e, t) {
    try {
        if (window.event) {

            var charCode = window.event.keyCode;
        }
        else if (e) {
            var charCode = e.which;
        }
        else {
            return true;
        }
        if (charCode == 0 || charCode == 8 || charCode == 17 || charCode == 20 || charCode == 32 || charCode == 47 || charCode == 42 || charCode == 45 || charCode == 44 || charCode == 46 || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123))
            return true;
        else
            return false;
    }
    catch (err) {
       // alert(err.Description);
        var charCode = e.charCode;

        if (charCode == 0 || charCode == 8 || charCode == 17 || charCode == 20 || charCode == 32 || charCode == 47 || charCode == 42 || charCode == 45 || charCode == 44 || charCode == 46 || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123))
            return true;
        else
            return false;
    }
}

function allowSpecificCharacteronlyAlphabets(e, t) {
    try {
        if (window.event) {

            var charCode = window.event.keyCode;
        }
        else if (e) {
            var charCode = e.which;
        }
        else {
            return true;
        }
        if (charCode == 0 || charCode == 8 || charCode == 17 || charCode == 20 || charCode == 32 || charCode == 47 || charCode == 42 || charCode == 45 ||
            charCode == 44 || charCode == 46 || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)
            || charCode == 58 || charCode == 47 || charCode == 45 || charCode == 40 || charCode == 41)
            return true;
        else
            return false;
    }
    catch (err) {
       // alert(err.Description);
        var charCode = e.charCode;

        if (charCode == 0 || charCode == 8 || charCode == 17 || charCode == 20 || charCode == 32 || charCode == 47 || charCode == 42 || charCode == 45 ||
            charCode == 44 || charCode == 46 || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)
            || charCode == 58 || charCode == 47 || charCode == 45 || charCode == 40 || charCode == 41)
            return true;
        else
            return false;
    }
}


function isNumber(e, t) {
    debugger;
    try {
        if (window.event) {

            var charCode = window.event.keyCode;
        }
        else if (e) {
            var charCode = e.which;
        }
        else {
            return true;
        }
        if (charCode >= 0 && charCode <= 31)
            return true;
        if (
            // (charCode != 45 || $(element).val().indexOf('-') != -1) &&
            (charCode != 46 || $(t).val().indexOf('.') != -1) &&
            (charCode < 48 || charCode > 57) && charCode != 8)
            return false;

        return true;
    }
    catch (err) {
       // alert(err.Description);
        var charCode = e.charCode;
        if (charCode >= 0 && charCode <= 31)
            return true;
        if (
            // (charCode != 45 || $(element).val().indexOf('-') != -1) &&
            (charCode != 46 || $(t).val().indexOf('.') != -1) &&
            (charCode < 48 || charCode > 57) && charCode != 8)
            return false;

        return true;
    }
}

function isPhoneCode(e, t) {
    debugger;
    try {
        if (window.event) {

            var charCode = window.event.keyCode;
        }
        else if (e) {
            var charCode = e.which;
        }
        else {
            return true;
        }
        if (
            (charCode >= 48 && charCode <= 57) || (charCode >= 0 && charCode<=31))
            return true;

        return false;
    }
    catch (err) {
       // alert(err.Description);
        var charCode = e.charCode;

        if (
            (charCode >= 48 && charCode <= 57) && (charCode >= 0 && charCode <= 31))
            return true;

        return false;
    }

   
}

function ValidateMaxLength(maxLenght, t) {
    
    if (t.value.length > maxLenght) {
        var Id = $("#" + t.Id).next().next().attr('id');
        
        return false;
    }
    else
    {
        return true;
    }
}

function DataTableSearchFilter(e, t) {

    try {
        if (window.event) {

            var charCode = window.event.keyCode;
        }
        else if (e) {
            var charCode = e.which;
        }
        else {
            return true;
        }
        if (charCode == 0 || charCode == 8 || charCode == 17 || charCode == 20 || charCode == 32 || charCode == 46 || charCode == 47 || charCode == 64 || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode > 47 && charCode < 58))
            return true;
        else
            return false;
    }
    catch (err) {
        // alert(err.Description);
        var charCode = e.charCode;

        if (charCode == 0 || charCode == 8 || charCode == 17 || charCode == 20 || charCode == 32 || charCode == 46 || charCode == 47 || charCode == 64 || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode > 47 && charCode < 58))
            return true;
        else
            return false;
    }
}
function onlyNumberAlphabets(e, t) {

    try {
        if (window.event) {

            var charCode = window.event.keyCode;
        }
        else if (e) {
            var charCode = e.which;
        }
        else {
            return true;
        }
        if (charCode == 0 || charCode == 8 || charCode == 17 || charCode == 20 || charCode == 32 || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode > 47 && charCode < 58))
            return true;
        else
            return false;
    }
    catch (err) {
        // alert(err.Description);
        var charCode = e.charCode;

        if (charCode == 0 || charCode == 8 || charCode == 17 || charCode == 20 || charCode == 32 || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode > 47 && charCode < 58))
            return true;
        else
            return false;
    }
}