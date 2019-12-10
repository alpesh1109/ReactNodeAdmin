jQuery.postJSON = function (url, data, success, error, complete, antiForgeryToken, dataType) {
    debugger;
    if (dataType === void 0) { dataType = "json"; }
    if (typeof (data) === "object") { data = SJSON.stringify(data); }
    var ajax = {
        url: url,
        type: "POST",
        //contentType: "application/json; charset=utf-8",
        //dataType: dataType,
        data: data,
        success: success,
        error: error,
        complete: complete
    };
    if (antiForgeryToken) {
        ajax.headers = {
            "__RequestVerificationToken": antiForgeryToken
        };
    };


    return jQuery.ajax(ajax);
};