var initials = [];
initials.push({ id: 0, text: '' });

function is_valid_url(url) {
    return /^(http(s)?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(url);
}


function NotApplicableButton(text) {
    var dataFinal = '';
    dataFinal = "<label class='btn btn-sm btn-info'>"+text+"</label>";
    return dataFinal;
}
function ActiveInActiveDisableButton(boolVal) {
    var dataFinal = '';
    if (boolVal == true || boolVal == "true" || boolVal == "True") {

        dataFinal = "<label class='btn btn-sm btn-palegreen disabled'><i class='btn-label glyphicon glyphicon-ok'></i>Active</label>";
    }
    else {
        dataFinal = "<label class='btn btn-sm btn-darkorange disabled'><i class='btn-label fa fa-exclamation'></i>In Active</label>";
    }

    return dataFinal;
}
function YesNoButton(boolVal,text) {
    var dataFinal = '';
    if (boolVal == true) {
        if (text == '') {
            text = 'Yes';
        }
        dataFinal = "<label class='btn btn-sm btn-primary'>" + text + "</label>";
    }
    else {
        if (text == '') {
            text = 'No';
        }
        dataFinal = "<label class='btn btn-sm btn-info'>" + text + "</label>";
    }
   
    return dataFinal;
}

function EditDeleteButton(allowEdit, allowDelete, urlEdit, urlDel, btnEdit, btnDelete, parName, ID, showNA) {


    var dataFinal = '';
    if (allowEdit.toLowerCase() == 'true' || allowDelete.toLowerCase() == 'true') {
        if (allowEdit.toLowerCase() == 'true') {
            dataFinal = dataFinal + "<a class='btn btn-xs delete' href='" + urlEdit + "?" + parName + "=" + ID + "'><i class='fa fa-edit'></i>" + btnEdit + "</a>";
        }
        if (allowDelete.toLowerCase() == 'true') {
            dataFinal = dataFinal + "<a class='btn btn-xs delete' style='background-color:red;color:white;' href='" + urlDel + "?" + parName + "=" + ID + "' onclick='return confirm(\"Are you sure to delete the record?\");'> <i class='fa fa-delete'></i>" + btnDelete + "</a>";
        }
    }
    else {
        if (showNA == '' || showNA == null) {
            dataFinal = "<label class='btn btn-sm btn-info'>N/A</label>";
        }
    }
    return dataFinal;
}
function EditDeleteButtonWithPost(allowEdit, allowDelete, funName, urlDel, btnEdit, btnDelete, parName, ID, showNA) {
    //"<a title='Edit' href='javascript:void(0)' onclick='return EditCountry("+full.couId+");'><span> Edit </span></a>"
    var dataFinal = '';
    if (allowEdit.toLowerCase() == 'true' || allowDelete.toLowerCase() == 'true') {
        if (allowEdit.toLowerCase() == 'true') {
            dataFinal = dataFinal + "<a class='btn btn-xs delete' href='javascript:void(0)' onclick='return " + funName + "(" + ID + ");'><i class='fa fa-edit'></i>" + btnEdit + "</a>";
        }
        if (allowDelete.toLowerCase() == 'true') {
            dataFinal = dataFinal + "<a class='btn btn-xs delete' style='background-color:red;color:white;' href='" + urlDel + "?" + parName + "=" + ID + "' onclick='return confirm(\"Are you sure to delete the record?\");'> <i class='fa fa-delete'></i>" + btnDelete + "</a>";
        }
    }
    else {
        if (showNA == '' || showNA == null) {
            dataFinal = "<label class='btn btn-sm btn-info'>N/A</label>";
        }
    }
    return dataFinal;
}

function MCQDelete(allowEdit, allowDelete, funName, urlDel, btnEdit, btnDelete, parCourseName, couId,parSubName,subId) {
    //"<a title='Edit' href='javascript:void(0)' onclick='return EditCountry("+full.couId+");'><span> Edit </span></a>"
    var dataFinal = '';
    if (allowEdit.toLowerCase() == 'true' || allowDelete.toLowerCase() == 'true') {
        //if (allowEdit.toLowerCase() == 'true') {
        //    dataFinal = dataFinal + "<a class='btn btn-xs delete' href='javascript:void(0)' onclick='return " + funName + "(" + ID + ");'><i class='fa fa-edit'></i>" + btnEdit + "</a>";
        //}
        if (allowDelete.toLowerCase() == 'true') {
            dataFinal = dataFinal + "<a class='btn btn-xs delete' style='background-color:red;color:white;' href='" + urlDel + "?" + parCourseName + "=" + couId + "&" + parSubName + "=" + subId + "' onclick='return confirm(Are you sure to delete the record?);'> <i class='fa fa-delete'></i>" + btnDelete + "</a>";
        }
    }
    return dataFinal;
}

function UpdateStatus(ID, URL, curObject) {
   
    $.ajax({
        type: "POST",
        url: URL,
        data: { Id: ID },
        success: function (result) {

            if (result === true) {

                $(curObject).removeAttr("class");
                $(curObject).attr("class", "btn btn-sm btn-palegreen");
                $(curObject).html('<i class="btn-label glyphicon glyphicon-ok"></i>Active');

            }
            else {
                $(curObject).removeAttr("class");
                $(curObject).attr("class", "btn btn-sm btn-darkorange");
                $(curObject).html('<i class="btn-label fa fa-exclamation"></i>In Active');

              
            }
            $("#message").empty();
        }
    });
}



function UpdateStatusButton(Id, urlUpdateStatus, valIsActive, allowEdit) {

    let fnUpdateStatusURL = 'return UpdateStatus(' + Id + ',"' + urlUpdateStatus + '",this)';

    valIsActive = valIsActive + '';

    var dataFinal = '';
    if (allowEdit == '' || allowEdit.toLowerCase() == 'true') {
        if (valIsActive == 'true') {
            dataFinal = dataFinal + "<a href='javascript:void(0)' class='btn btn-sm btn-palegreen' title='' id='active_" + Id + "' onclick='" + fnUpdateStatusURL + "'>";
            dataFinal = dataFinal + '<i class="btn-label glyphicon glyphicon-ok" id="icon_' + Id + '"></i>Active</a>';
        }
        else {
            dataFinal = dataFinal + "<a href='javascript:void(0)' class='btn btn-sm btn-darkorange' title='' id='active_" + Id + "'onclick='" + fnUpdateStatusURL + "'>";
            dataFinal = dataFinal + '<i class="btn-label fa fa-exclamation" id="icon_' + Id + '"></i>In Active</a>';
        }
    }
    else {
        dataFinal = ActiveInActiveDisableButton(valIsActive);
    }
    return dataFinal;
}

//function UpdateStatusButton(Id, fnUpdateStatusURL, valIsActive) {
//    var dataFinal = '';
//    fnUpdateStatusURL = "alert('hi')";//"return alert('hi');";
//    if (valIsActive == true) {
//        dataFinal = dataFinal + "<a href='javascript:void(0)' class='btn btn-sm btn-palegreen UpdateStatusLink' title='' id='active_" + Id + "'onclick='" + fnUpdateStatusURL + "'>";
//        dataFinal = dataFinal + '<i class="btn-label glyphicon glyphicon-ok" id="icon_' + Id + '"></i><span id="sp_' + Id + '">Active</span></a>';
//    }
//    else {
//        dataFinal = dataFinal + "<a href='javascript:void(0)' class='btn btn-sm btn-darkorange UpdateStatusLink' title='' id='active_" + Id + "'onclick='" + fnUpdateStatusURL + "'>";
//        dataFinal = dataFinal + '<i class="btn-label fa fa-exclamation" id="icon_' + Id + '"></i><span id="sp_' + Id + '">In Active</span></a>';
//    }
//    return dataFinal;
//}


function ControlOnChangeEvent(URL, mainValue, childName, strDefaultText, resIDName, resName) {

    $("#" + childName).empty();
    if (mainValue !== "" && mainValue !== null && mainValue !== "0") {
        $.ajax({
            type: 'POST',
            url: URL,
            datatype: 'json',
            data: { Id: mainValue },
            success: function (result) {

                $("#" + childName).append('<option value="">' + "Select " + strDefaultText + '</option>');
                $.each(result, function (i, res) {
                    var addoption = $('<option value="' + res[resIDName] + '">' + res[resName] + '</option>');
                    $("#" + childName).append(addoption);
                });

                $("#" + childName).selectpicker('refresh');
            },
            error: function (result) {

                $("#" + childName).append('<option value="">' + "Select " + strDefaultText + '</option>');
                $.each(result, function (i, res) {
                    var addoption = $('<option value="' + res[resIDName] + '">' + res[resName] + '</option>');
                    $("#" + childName).append(addoption);
                });

                $("#" + childName).selectpicker('refresh');
            }
        });
    }
    else {
        $("#" + childName).empty();
        $("#" + childName).append('<option value="">' + "Select " + strDefaultText + '</option>');
        $("#" + childName).selectpicker('refresh');
    }

}



function PublishStatus(ID, URL, curObject) {
    $.ajax({
        type: "POST",
        url: URL,
        data: { Id: ID },
        success: function (result) {

            if (result === true) {
                debugger;
                $(curObject).removeAttr("class");
                $(curObject).attr("class", "btn btn-sm btn-primary mb1 bg-blue");
                $(curObject).html('<i class="btn-label glyphicon glyphicon-ok"></i>Publish');

                var d = new Date();
                $("#date_" + ID).html(d.getDate() + '/'+ (d.getMonth() + 1)  + '/' + d.getFullYear());

            }
            else {
                $(curObject).removeAttr("class");
                $(curObject).attr("class", "btn btn-sm btn-darkorange");
                $(curObject).html('<i class="btn-label fa fa-exclamation"></i>In Publish');
                $("#date_" + ID).empty();
               
            }
            $("#message").empty();
        }
    });
}


function PublishStatusDisableButton(boolVal) {
    var dataFinal = '';
    if (boolVal == true || boolVal == "true" || boolVal == "True") {

        dataFinal = "<label class='btn btn-sm btn-primary mb1 bg-blue disabled'><i class='btn-label glyphicon glyphicon-ok'></i>Publish</label>";
    }
    else {
        dataFinal = "<label class='btn btn-sm btn-darkorange disabled'><i class='btn-label fa fa-exclamation'></i>In Publish</label>";
    }

    return dataFinal;
}

function PublishStatusButton(Id, fnPublishStatusURL, valIsPublish, allowEdit) {
    var dataFinal = '';

    if (allowEdit == '' || allowEdit.toLowerCase() == 'true') {
        if (valIsPublish == true) {

            dataFinal = dataFinal + "<a href='" + fnPublishStatusURL + "' class='btn btn-sm btn-primary mb1 bg-blue' title='' id='publish_" + Id + "' onclick='return confirm(\"Are you sure?\");'>";
            dataFinal = dataFinal + '<i class="btn-label glyphicon glyphicon-ok" id="icon_' + Id + '"></i>Publish</a>';

        }
        else {

            dataFinal = dataFinal + "<a href='" + fnPublishStatusURL + "' class='btn btn-sm btn-darkorange' title='' id='publish_" + Id + "' onclick='return confirm(\"Are you sure?\");'>";
            dataFinal = dataFinal + '<i class="btn-label fa fa-exclamation" id="icon_' + Id + '"></i>In Publish</a>';
        }
    } else {
        dataFinal = PublishStatusDisableButton(valIsPublish);
    }
    return dataFinal;
}

function CheckSummerNoteLength(Id, len, height, width) {
    $('#' + Id).summernote({
        height: height,
        width: 'inherit',
        onkeydown: function (e) {

            var num = $('#' + Id).code().replace(/(<([^>]+)>)/ig, "").length;

            var key = e.keyCode;
            allowed_keys = [8]
            if ($.inArray(key, allowed_keys) != -1)
                return true
            else if (num >= len) {
                e.preventDefault();
                e.stopPropagation();
            }
        },

        onpaste: function (e) {
            var t = e.currentTarget.innerText;
            var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
            e.preventDefault();
            var all = t + bufferText;
            document.execCommand('insertText', false, all.trim().substring(0, len));

        },
    });
}



function ImageLightPopup(srcData, imgDataOrg,Type,id) {
    var dataStr = '';
    dataStr = '<div class="portfolio-post-container" style="height: 50px; width: 90px">';
    dataStr = dataStr + '<div class="portfolio-post" style="height: 50px; width: 90px">';
  //  dataStr = dataStr + '<img class="lazy" data-src="' + srcData + '" src="assets/img/ajax-loader.gif" alt="" style="height: 50px; width: 90px" > ';
    dataStr = dataStr + '<img src="' + srcData+'" alt="" style="height: 50px; width: 90px" > ';
    dataStr = dataStr + '<div class="hover-box">';

    dataStr = dataStr + '<div class="inner-hover">  ';
    dataStr = dataStr + '<div class="middle">';
    dataStr = dataStr + '<div class="portfolio-post-btn">';
    if (Type == 'image') {
        dataStr = dataStr + '<a class="link" href="' + imgDataOrg + '" data-lightbox="portfolio-4" target="_blank">Zoom </a> ';
    }
    else if (Type == 'video') {
        dataStr = dataStr + '<a class="link" href="#lb-gallery1-0" data-slide-to="' + id + '" data-toggle="modal" onclick="return SetVideoActive(' + id + ')">Zoom </a> ';
    }
    else if (Type == 'pdf') {
        //var fn = "ShowPDF('" + imgDataOrg + "'," + id + ");";
        //dataStr = dataStr + '<a class="link" href="#lb-gallery1-0_pdf" data-slide-to="' + id + '" data-toggle="modal" onclick="' + fn+'">Zoom </a> ';
        dataStr = dataStr + '<a class="link" href="' + imgDataOrg + '" data-lightbox="portfolio-4" target="_blank">Zoom </a> ';
    }
    dataStr = dataStr + '</div> </div></div> </div></div > </div >';

    return dataStr;
}


function VideoLightPopup(crtlId, srcData, imgDataOrg, Id, Activeclass) {
    debugger;
    
    var dataStr = '';
    dataStr = dataStr + '<div class="carousel-item ' + Activeclass+' carousel-item_' + Id + '">';
    dataStr = dataStr + '<video width="100%" height="100%" id="video-player" preload="metadata" controls>';
    dataStr = dataStr + '<source src="' + imgDataOrg + '" type="video/mp4">';
    dataStr = dataStr + '</video></div>';
   
    $('#'+crtlId).append(dataStr);
}


function ExportAjaxCall(urlPath) {
    $.ajax({
        type: 'POST',
        url: urlPath,
        datatype: 'json',
        async: true,
        timeout: 0,

        beforeSend: function () {
            ajaxindicatorstart('loading...');
        },
        success: function (result) {

        },
        error: function (result) {

        },
        complete: function (result) {
            debugger;
            if (result.responseText != "") {
                window.open(result.responseText, '_self');
            }
            ajaxindicatorstop();
        }
    });

}




function DropDownBind(urlPath, ddlClassName, defaultText, reset, resetValue) {
    if (reset == true) {
        $("." + ddlClassName).val(resetValue).select2({
            data: initials,
            ajax: {
                url: urlPath,
                dataType: 'json',
                delay: 250,
                data: function (params) {

                    return {
                        q: params.term, // search term
                        page: params.page || 1
                    };
                },
                processResults: function (data, params) {
                    params.page = params.page || 1;
                    if (data == null || data.length <= 0) {
                        return {
                            results: [],
                            pagination: {
                                more: 0
                            }
                        };
                    }
                    return {
                        results: data,
                        pagination: {
                            //more: (params.page * 50) < (data == null || data[0] == null) ? 0 : data[0].Records
                            more: (params.page * 50) < data[0].Records ? data[0].Records : 0
                        }
                    };
                },
                cache: true
            },
            placeholder: defaultText,
        });
    }
    else {
        $("." + ddlClassName).select2({
            data: initials,
            ajax: {
                url: urlPath,
                dataType: 'json',
                delay: 250,
                data: function (params) {

                    return {
                        q: params.term, // search term
                        page: params.page || 1
                    };
                },
                processResults: function (data, params) {
                    params.page = params.page || 1;
                    if (data == null || data.length <= 0) {
                        return {
                            results: [],
                            pagination: {
                                more: 0
                            }
                        };
                    }
                    return {
                        results: data,
                        pagination: {
                            //more: (params.page * 50) < (data == null || data[0] == null) ? 0 : data[0].Records
                            more: (params.page * 50) < data[0].Records ? data[0].Records : 0
                        }
                    };
                },
                cache: true
            },
            placeholder: defaultText,
        });
    }
}

function DropDownBindWithChange(urlPath, ddlClassName, defaultText, reset, callback, resetValue) {
    debugger;
    if (reset == true) {
        $("." + ddlClassName).val(resetValue).select2({
            data: initials,
            ajax: {
                url: urlPath,
                dataType: 'json',
                delay: 250,
                data: function (params) {

                    return {
                        q: params.term, // search term
                        page: params.page || 1
                    };
                },
                processResults: function (data, params) {
                    params.page = params.page || 1;
                    if (data == null || data.length <= 0) {
                        return {
                            results: [],
                            pagination: {
                                more: 0
                            }
                        };
                    }
                    return {
                        results: data,
                        pagination: {
                            //more: (params.page * 50) < (data == null || data[0] == null) ? 0 : data[0].Records
                            more: (params.page * 50) < data[0].Records ? data[0].Records : 0
                        }
                    };
                },
                cache: true
            },
            placeholder: defaultText,
        }).on("change", function (e) {
            callback();
        });
    }
    else {
        $("." + ddlClassName).select2({
            data: initials,
            ajax: {
                url: urlPath,
                dataType: 'json',
                delay: 250,
                data: function (params) {

                    return {
                        q: params.term, // search term
                        page: params.page || 1
                    };
                },
                processResults: function (data, params) {
                    params.page = params.page || 1;
                    if (data == null || data.length <= 0) {
                        return {
                            results: [],
                            pagination: {
                                more: 0
                            }
                        };
                    }
                    return {
                        results: data,
                        pagination: {
                            //more: (params.page * 50) < (data == null || data[0] == null) ? 0 : data[0].Records
                            more: (params.page * 50) < data[0].Records ? data[0].Records : 0
                        }
                    };
                },
                cache: true
            },
            placeholder: defaultText,
        }).on("change", function (e) {
            callback();
        });
    }
}
















