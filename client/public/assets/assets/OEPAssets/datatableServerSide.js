var cnt = 0;
function colGen(isStatus, isAction, statusName, actionId) {
    var c = [];

    c.push({ "data": actionId, "name": actionId, "autoWidth": false, "width": "1%" });
    for (var j = 0; j < colArray.length; j++) {
        c.push({ "data": colArray[j], "name": colArray[j], "autoWidth": true });
    }
    if (isStatus == true) {
        c.push({ "data": statusName, "name": statusName, "autoWidth": false, "width": "1%" });
    }
    if (isAction == true) {
        c.push({ "data": actionId, "name": actionId, "autoWidth": false, "width": "3%" });
    }
    return c;
}



function GenerateRow(isStatus, isAction, statusName, actionId, allowEdit, allowDelete, isEditPost, EditPostName, isView) {
    debugger;

    let r = {
        'targets': targetSort,
        'orderable': false,
    };
    row.push(r);
    r = {
        "targets": 0,
        "data": null,
        "render": function (data, type, full, meta) {
            cnt++;
            return meta.settings._iDisplayStart + meta.row + 1;
        }
    };
    row.push(r);
    if (isStatus == true) {
        r = {
            "targets": totCol - 1,
            "data": null,
            "render": function (data, type, full, meta) {
                var dataFinal = "";
                dataFinal = UpdateStatusButton(full[actionId], urlUpdateStatus, full[statusName], allowEdit);
                return dataFinal;
            }
        };
        row.push(r);
    }
    if (isAction == true) {
        r = {
            "targets": totCol,
            "data": null,
            "render": function (data, type, full, meta) {
                var dataFinal = '';

                if (isView == true) {
                    dataFinal = dataFinal + "<a class='btn btn-xs delete' href='" + urlView + "?" + actionId + "=" + full[actionId] + "'><i class='fa fa-search'></i>" + btnView + "</a>";
                }
                if (isEditPost == true) {
                    dataFinal = dataFinal + EditDeleteButtonWithPost(allowEdit, allowDelete, EditPostName, urlDel, btnEdit, btnDelete, actionId, full[actionId]);
                }
                else {
                    dataFinal = dataFinal + EditDeleteButton(allowEdit, allowDelete, urlEdit, urlDel, btnEdit, btnDelete, actionId, full[actionId]);
                }
                return dataFinal;
            }
        };
        row.push(r);
    }

    return row;
}

function GetRecords(isStatus, isAction, statusName, actionId,
    allowEdit, allowDelete, isEditPost, EditPostName, isView) {

    var cnt = 0;
    url = urlData;
    $(".serverDataTable").DataTable({
        responsive: true,
        "iDisplayLength": 50,
        "processing": true, // for show progress bar
        "language": {
            "processing": '<div><img src="assets/img/loader_blue.gif" style="width:100px;height:100px;position:fixed;text-align:center"><div>'
        },
        "serverSide": true, // for process server side
        "stateSave": true, // restore table state on page reload.
        "filter": true, // this is for disable filter (search box)
        "orderMulti": false, // for disable multiple column at once
        "order": [],
        "initComplete": function (settings, json) {
            //var dt = this;
            $('.dataTables_filter input').unbind('keypress');
            $('.dataTables_filter input').bind('keypress', function (e) {
                if (DataTableSearchFilter(e, this) == true) {
                    //dt.fnFilter(this.value);
                    return true;
                }
                return false;
            });
        },
        "ajax": {
            "url": url,
            "type": "POST",
            "datatype": "json",
            "error": function (result) {

            },
            "complete": function (xhr, status) {

                if (status == 'error') {
                    window.location.href = urlError;
                }
            }
        },

        "columns": colGen(isStatus, isAction, statusName, actionId),
        "columnDefs": GenerateRow(isStatus, isAction, statusName, actionId, allowEdit, allowDelete, isEditPost, EditPostName, isView),
    });
    return;
}



function GetRecords_WithExport(isStatus, isAction, statusName, actionId,
    allowEdit, allowDelete, isEditPost, EditPostName, isView) {
    var cnt = 0;
    url = urlData;
    $(".serverDataTable").DataTable({
        responsive: true,
        "iDisplayLength": 50,
        "processing": true, // for show progress bar
        "language": {
            "processing": '<div><img src="assets/img/loader_blue.gif" style="width:100px;height:100px;position:fixed;text-align:center"><div>'
        },
        "serverSide": true, // for process server side
        "stateSave": true, // restore table state on page reload.
        "filter": true, // this is for disable filter (search box)
        "orderMulti": false, // for disable multiple column at once
        "order": [],
        "initComplete": function (settings, json) {
            //var dt = this;
            $('.dataTables_filter input').unbind('keypress');
            $('.dataTables_filter input').bind('keypress', function (e) {
                if (DataTableSearchFilter(e, this) == true) {
                    //dt.fnFilter(this.value);
                    return true;
                }
                return false;
            });
        },
        "ajax": {
            "url": url,
            "type": "POST",
            "datatype": "json",
            "error": function (result) {

            },
            "complete": function (xhr, status) {
                //alert('error');
                //debugger;
                if (status == 'error') {
                    window.location.href = urlError;
                }
            }
        },

        "columns": colGen(isStatus, isAction, statusName, actionId),
        "columnDefs": GenerateRow(isStatus, isAction, statusName, actionId, allowEdit, allowDelete, isEditPost, EditPostName, isView),
        dom: 'lBfrtip',
        buttons: [
            {
                //extend: 'excelHtml5',
                text: 'Export Excel',
                action: function (e, dt, node, config) {
                    debugger;
                    $.ajax({
                        "url": dt.ajax.url() + '?isExport=1',
                        "data": dt.ajax.params(),
                        "contentType": 'application/json',
                        "beforeSend": function () {
                            ajaxindicatorstart('loading...');
                        },
                        "success": function (res, status, xhr) {
                            if (res == '')
                                return;
                            JSONToCSVConvertor(res, ExportFileName, true);
                        },
                        "error": function (res, status, xhr) {

                        },
                        "complete": function (res, status, xhr) {
                            ajaxindicatorstop();
                        }
                    });
                }
            }
            //,
            //{
            //    //extend: 'pdfHtml5',
            //    text: 'PDF',
            //    messageTop: 'PDF created by PDFMake with Buttons for DataTables.',
            //    pageSize: 'A4',
            //    action: function (e, dt, node, config) {
            //        debugger;
            //        $.ajax({
            //            "url": dt.ajax.url() + '?isExport=1',
            //            "data": dt.ajax.params(),
            //            "contentType": 'application/json',
            //            "beforeSend": function () {
            //                ajaxindicatorstart('loading...');
            //            },
            //            "success": function (res, status, xhr) {
            //                if (res == '')
            //                    return;
            //                CreatePDF(res);
            //                return '';
            //            },
            //            "error": function (res, status, xhr) {

            //            },
            //            "complete": function (res, status, xhr) {
            //                ajaxindicatorstop();
            //            }
            //        });
            //    }
            //}
        ]

    });
    return;
}

