function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    CSV = '';
}


// Builds the HTML Table out of myList.
function buildHtmlTable(selector, myList) {

    var row$ = null;
    var rowSet = [];
    var rowAllSet = [];
    debugger;
    var columns = addAllColumnHeaders(myList, selector);
   
    for (var i = 0; i < myList.length; i++) {
        row$ = $('<tr/>');
        rowSet = [];
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = myList[i][columns[colIndex]];
            if (cellValue == null) cellValue = "";
            row$.append($('<td/>').html(cellValue));
            rowSet.push(cellValue);
        }
        $(selector).append(row$);
        rowAllSet.push(rowSet);
    }


    var doc = new jsPDF();
    // You can use html:
    //doc.autoTable({ html: selector});
  //  alert("row$" + rowSet);
    // Or JavaScript:
    doc.autoTable({
        head: [columns],
        body: 
            rowAllSet
       
    });
    doc.save(ExportFileName+'.pdf');

    columns = null;
    row$ = null;
    rowSet = [];
    rowAllSet = [];
    //html2canvas($('#excelDataTable')[0], {
    //    onrendered: function (canvas) {
    //        var data = canvas.toDataURL();
    //        var docDefinition = {
    //            content: [{
    //                image: data,
    //                width: 500
    //            }]
    //        };
    //        pdfMake.createPdf(docDefinition).download("Table.pdf");
    //    }
    //});
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records.
function addAllColumnHeaders(myList, selector) {
    var columnSet = [];
    var headerTr$ = $('<tr/>');

    for (var i = 0; i < myList.length; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
                headerTr$.append($('<th/>').html(key));
            }
        }
    }
    $(selector).append(headerTr$);

    return columnSet;
}


function CreatePDF(myList) {
    var jsonData = JSON.parse(myList);

    buildHtmlTable('#excelDataTable', jsonData);

    $('#excelDataTable').empty();
    jsonData = null;
}
