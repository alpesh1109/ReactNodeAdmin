function load_image(a, ToImg) {

    if (validateExtension(a.value) === false) {

        alert("Upload only JPEG OR JPG OR PNG format ");
        $(a).val('');
        $(a).attr('src', null);
        $('#' + ToImg.id).attr('src', 'Content/Img/No_Image.jpg');
        return false;
    }
    var fileUpload = $("#" + a.id)[0];
    var fsize = $('#' + a.id)[0].files[0].size;

    $('#filesize').val(fsize);

    var ftype = $('#' + a.id)[0].files[0].type;
    if (fsize > 2097152) //do something if file size more than 1 mb (1048576)
    {
        alert("Image Size must be less than 2mb!!");
        $(a).val('');
        $(a).attr('src', null);
        $('#' + ToImg.id).attr('src', 'Content/Img/No_Image.jpg');
        return false;
    }
    else {
        readURL(a, ToImg);
    }

}
function readURL(input, ToImg) {
    debugger;
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#' + ToImg).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}


function validateExtension(v) {
    
    var allowedExtensions = new Array("jpg", "JPG", "jpeg", "JPEG", "png", "PNG");
    for (var ct = 0; ct < allowedExtensions.length; ct++) {
        sample = v.lastIndexOf(allowedExtensions[ct]);
        if (sample != -1) { return true; }
    }


    return false;
}


function validateExtensionImagePDF(v) {

    var allowedExtensions = new Array("jpg", "JPG", "jpeg", "JPEG", "png", "PNG","pdf");
    for (var ct = 0; ct < allowedExtensions.length; ct++) {
        sample = v.lastIndexOf(allowedExtensions[ct]);
        if (sample != -1) { return true; }
    }


    return false;
}



function validateDigitalMagazineExtension(v, lblError, canvasId, imgId) {
    debugger;
    var filename = v.value;
    var allowedExtensions = new Array("pdf");
    for (var ct = 0; ct < allowedExtensions.length; ct++) {
        sample = filename.lastIndexOf(allowedExtensions[ct]);
        if (sample != -1) {
            var fsize = $('#' + v.id)[0].files[0].size;
            var mb5 = (1048576 * 10);
            if (fsize > mb5) //do something if file size more than 1 mb (1048576)
            {
                v.value = null;
                $('#' + lblError).show();
                return false;
            }
            $('#' + lblError).hide();
            GeneratePDFThumbnail(v, canvasId, imgId)
            return true;
        }
    }

    $('#' + lblError).show();
    $(v).val('');
    $(v).attr('src', null);

    return false;
}

function validateCourseFileExtension(v, lblError, thumbImage, pdfcanvas, listVideos) {
    debugger;
    var filename = v.value;
    var allowedExtensions = new Array("pdf", "zip", "mp4");
    var pdfThumbNailExtensions = new Array("pdf");
    var videoThumbNailExtensions = new Array("mp4");

    for (var ct = 0; ct < allowedExtensions.length; ct++) {
        sample = filename.lastIndexOf(allowedExtensions[ct]);
        if (sample != -1) {

            var fsize = $('#' + v.id)[0].files[0].size;
            var mb5 = (1048576 * 5);
            if (fsize > mb5) //do something if file size more than 1 mb (1048576)
            {
                v.value = null;
                $('#' + lblError).show();
                return false;
            }

            /***************************PDF Thumbnail************************************/
            for (var ct = 0; ct < pdfThumbNailExtensions.length; ct++) {
                sample = filename.lastIndexOf(pdfThumbNailExtensions[ct]);
                if (sample != -1) {
                    GeneratePDFThumbnail(v, pdfcanvas, thumbImage);
                }
            }
            /***************************************************************************/
            /***************************Video Thumbnail************************************/
            for (var ct = 0; ct < videoThumbNailExtensions.length; ct++) {
                sample = filename.lastIndexOf(videoThumbNailExtensions[ct]);
                if (sample != -1) {
                    handleVideoSelect(v, thumbImage, listVideos);
                }
            }
            /****************************************************************************/

            $('#' + lblError).hide();
            return true;
        }
    }
    v.value = null;
    $('#' + lblError).show();
    return false;
}

function validateCourseModuleFileExtension(v, lblError) {
    debugger;
    var filename = v.value;
    var allowedExtensions = new Array("zip");
    for (var ct = 0; ct < allowedExtensions.length; ct++) {
        sample = filename.lastIndexOf(allowedExtensions[ct]);
        if (sample != -1) {

            var fsize = $('#' + v.id)[0].files[0].size;
            var mb5 = (1048576 * 20);
            if (fsize > mb5) //do something if file size more than 1 mb (1048576)
            {
                v.value = null;
                $('#' + lblError).show();
                return false;
            }
            $('#' + lblError).hide();
            return true;
        }
    }
    v.value = null;
    $('#' + lblError).show();
    return false;
}

var imageData;
function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

function handleVideoSelect(evt, strThumbDataId, prevThumImageID) {
    debugger;
    var files = evt.files; // FileList object

    // Loop through the FileList and render video files as thumbnails.
    for (var i = 0; i < files.length; i++) {
        var f = files[i];
        // Only process video files.
        if (!f.type.match('video.*')) {
            continue;
        }
        createVideoCanvas(f, strThumbDataId, prevThumImageID);
        // ConvertImageFile();
    }
}

function createVideoCanvas(f, strThumbDataId, prevThumImageID) {
    debugger;
    var vid = document.createElement('video');
    vid.src = window.URL.createObjectURL(f);
    var canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    canvas.getContext("2d").drawImage(vid, 0, 0, 500, 500);
    vid.addEventListener('loadeddata', function () {
        canvas.getContext("2d").drawImage(vid, 0, 0, 500, 500);
        imageData = canvas.toDataURL('image/png');
        $('#' + strThumbDataId).val(imageData);
    }, false);
    window.URL.revokeObjectURL(f);
    document.getElementById(prevThumImageID).appendChild(canvas);


}



/**********************Generate PDF Thumbnail****************************/
var __PDF_DOC,
    __CURRENT_PAGE,
    __TOTAL_PAGES,
    __PAGE_RENDERING_IN_PROGRESS = 0;


function showPDF(pdf_url, canvasId, imgId) {
    PDFJS.getDocument({ url: pdf_url }).then(function (pdf_doc) {
        __PDF_DOC = pdf_doc;
        __TOTAL_PAGES = __PDF_DOC.numPages;
        // Show the first page
        showPage(1, canvasId, imgId);
    }).catch(function (error) {
        alert(error.message);
    });


}

function showPage(page_no, canvasId, imgId) {
    __PAGE_RENDERING_IN_PROGRESS = 1;
    __CURRENT_PAGE = page_no;

    var __CANVAS = $('#' + canvasId).get(0),
        __CANVAS_CTX = __CANVAS.getContext('2d');

    // While page is being rendered hide the canvas and show a loading message
    $("#" + canvasId).hide();

    // Fetch the page
    __PDF_DOC.getPage(page_no).then(function (page) {
        // As the canvas is of a fixed width we need to set the scale of the viewport accordingly
        var scale_required = __CANVAS.width / page.getViewport(1).width;

        // Get viewport of the page at required scale
        var viewport = page.getViewport(scale_required);

        // Set canvas height
        __CANVAS.height = viewport.height;

        var renderContext = {
            canvasContext: __CANVAS_CTX,
            viewport: viewport
        };

        // Render the page contents in the canvas
        page.render(renderContext).then(function () {
            __PAGE_RENDERING_IN_PROGRESS = 0;

            $("#" + canvasId).show();

            GenerateCanvasImage(canvasId, imgId);
        });
    });
}

function GenerateCanvasImage(canvasId, imgId) {
    debugger;
    var canvas = document.getElementById(canvasId);

    imageData = canvas.toDataURL('image/png');

    $('#' + imgId).val(imageData);

    //var img = document.getElementById(imgId);
    //var img = new Image();
    //img.src = can.toDataURL('image/png');
    //alert(img.src);
    //$('#' + imgId).val(img.src);

}
function GeneratePDFThumbnail(pdfFile, canvasId, imgId) {
    showPDF(URL.createObjectURL($(pdfFile).get(0).files[0]), canvasId, imgId);
}
/*************************************************/

function validateVideoExtension(v) {
    alert('video');
    debugger;
    var allowedExtensions = new Array("mp4");
    for (var ct = 0; ct < allowedExtensions.length; ct++) {
        sample = v.lastIndexOf(allowedExtensions[ct]);
        if (sample != -1) {
            return true;
        }
    }
    return false;
}


function load_Video(a, ToVideo) {

    if (validateVideoExtension(a.value) === false) {
        alert("Upload only Video(mp4) format ");
        $(a).val('');
        $(a).attr('src', null);
        $('#' + ToVideo.id).attr('src', '');
        return false;
    }
    var fileUpload = $("#" + a.id)[0];
    var fsize = $('#' + a.id)[0].files[0].size;

    $('#filesize').val(fsize);

    var ftype = $('#' + a.id)[0].files[0].type;
    var mb5 = (1048576 * 20);
    if (fsize > mb5) //do something if file size more than 1 mb (1048576)
    {
        alert("Video Size must be less than 2mb!!");
        $(a).val('');
        $(a).attr('src', null);
        $('#' + ToVideo.id).attr('src', '');
        return false;
    }
    else {
        readURL(a, ToVideo);
        handleVideoSelect(a, 'thumbImage', 'listVideos');
    }
}

/***********************************************************************************/


function load_image_EditorTemplate(a) {
    debugger;
    var imgCntl = $(a).parent().parent().parent().parent().find('.imgSrc');
    if (validateExtensionImagePDF(a.value) === false) {

        alert("Upload only JPEG OR JPG OR PNG format ");
        $(a).val('');
        $(a).attr('src', null);


        $(imgCntl).attr('src', 'assets/img/No_Image.jpg');
        return false;
    }
    var fileUpload = $("#" + a.id)[0];
    var fsize = $('#' + a.id)[0].files[0].size;

    $('#filesize').val(fsize);

    var ftype = $('#' + a.id)[0].files[0].type;
    var mb5 = (1048576 * 10);
    if (fsize > mb5) //do something if file size more than 1 mb (1048576)
    {
        alert("Image Size must be less than 2mb!!");
        $(a).val('');
        $(a).attr('src', null);
        $(imgCntl).attr('src', 'assets/img/No_Image.jpg');
        return false;
    }
    else {
        readURL_EditorTemplate(a);
    }

}

function readURL_EditorTemplate(input) {
    debugger;
    var imgCntl = $(input).parent().parent().parent().parent().find('.imgSrc');
    var imgChange = $(input).parent().parent().parent().parent().parent().find('.imgChange');
    // alert($(imgChange).val());
    $(imgChange).val('true');
    // alert($(imgChange).val());
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $(imgCntl).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}


function readURL_EditorTemplateType(input, type) {
    debugger;


    var imgChange = $(input).parent().parent().parent().parent().find('.imgChange');
    // alert($(imgChange).val());
    $(imgChange).val('true');
    // alert($(imgChange).val());
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            // alert('load');
            debugger;
            var previewCntrl = $(input).parent().parent().parent().parent().find('.link');
            // 
            $(previewCntrl).data('showsrc', e.target.result);
            $(previewCntrl).data('type', 'video');
            if (type == 1) {
                $(previewCntrl).attr('href', e.target.result);
                $(previewCntrl).data('type', 'image');
                var imgCntl = $(input).parent().parent().parent().parent().find('.imgSrc');
                $(imgCntl).attr('src', e.target.result);
                $(imgCntl).show();

            }
            else {
                //   alert('type : ' + type);
                var imgCntl = $(input).parent().parent().parent().parent().find('.videoSrc');
                $(imgCntl).attr('src', e.target.result);
                $(imgCntl).show();
            }
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function createVideoCanvas_EditorTemplate(f, ThumbDataObj, prevThumImageID, curObj) {
    debugger;
    var vid = document.createElement('video');
    vid.src = window.URL.createObjectURL(f);
    var canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    canvas.getContext("2d").drawImage(vid, 0, 0, 500, 500);
    vid.addEventListener('loadeddata', function () {
        debugger;
        //  alert('loaddd');
        var previewCntrl = $(curObj).parent().parent().parent().parent().find('.link');
        $(previewCntrl).data('type', 'video');


        canvas.getContext("2d").drawImage(vid, 0, 0, 500, 500);
        imageData = canvas.toDataURL('image/png');
        //  $(ThumbDataObj).val(imageData);
        // $(ThumbDataObj).attr('src', imageData);
        // GetImageFromString(imageData, ThumbDataObj);

        $(ThumbDataObj).val(imageData);
        $(previewCntrl).data('href', imageData);
        // var data = canvas.toDataURL('image/png');
        //$(ThumbDataObj).fileupload('option', 'formData').file = data;
        //$(ThumbDataObj).fileupload('add', { files: [data] });
    }, false);
    window.URL.revokeObjectURL(f);
    $('#' + prevThumImageID).appendChild(canvas);
}
function handleVideoSelect_EditorTemplate(evt, ThumbDataObj, prevThumImageID) {
    debugger;
    var files = evt.files; // FileList object

    // Loop through the FileList and render video files as thumbnails.
    for (var i = 0; i < files.length; i++) {
        var f = files[i];
        // Only process video files.
        if (!f.type.match('video.*')) {
            continue;
        }
        createVideoCanvas_EditorTemplate(f, ThumbDataObj, prevThumImageID, evt);
        // ConvertImageFile();
    }
}
function load_image_EditorTemplateWithType(a) {
    debugger;
    var imgCntl = $(a).parent().parent().parent().parent().find('.imgSrc');

    var imgType = $(a).parent().parent().parent().parent().find('input[class="imgType"]:checked').val();

    var thumbImage = $(a).parent().parent().parent().find('.ThumbnailFile');

    if (imgType == 1) {
        if (validateExtensionImage(a.value) === false) {

            alert("Upload only JPEG OR JPG OR PNG format ");
            $(a).val('');
            $(a).attr('src', null);
            $(a).prop('required', true);

            $(imgCntl).attr('src', 'Content/Img/No_Image.jpg');
            return false;
        }
    }
    else if (imgType == 2) {
        if (validateExtensionVideo(a.value) === false) {

            alert("Upload only JPEG OR JPG OR PNG format ");
            $(a).val('');
            $(a).attr('src', null);
            $(a).prop('required', true);

            $(imgCntl).attr('src', 'Content/Img/No_Image.jpg');
            return false;
        }
    }


    var fileUpload = $("#" + a.id)[0];
    var fsize = $('#' + a.id)[0].files[0].size;

    $('#filesize').val(fsize);

    var ftype = $('#' + a.id)[0].files[0].type;
    if (fsize > 2097152) //do something if file size more than 1 mb (1048576)
    {
        alert("Image Size must be less than 2mb!!");
        $(a).val('');
        $(a).attr('src', null);
        $(imgCntl).attr('src', 'Content/Img/No_Image.jpg');
        return false;
    }
    else {
        readURL_EditorTemplateType(a, imgType);
        /***************************Video Thumbnail************************************/
        if (imgType == 2) {
            handleVideoSelect_EditorTemplate(a, thumbImage, listVideos);
        }
        /****************************************************************************/
    }

}