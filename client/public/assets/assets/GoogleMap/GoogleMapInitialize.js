function SetLocation(a,cenLatId,cenLongId) {
    debugger;
    var cenLat = $('#' + cenLatId).val();
    var cenLong = $('#' + cenLongId).val();

    if (cenLat != '' && cenLat != null && cenLong != '' && cenLong != null) {
        SetMarker(cenLat, cenLong);
    }
    else   if (navigator.geolocation) {
        //navigator.geolocation.getCurrentPosition(success);
        navigator.geolocation.getCurrentPosition(success, error);
    }
    else {
        alert("Geo Location is not supported on your current browser!");
    }

    function GoogleMapAjaxCall(lat, lng) {
        var URL = "https://maps.googleapis.com/maps/api/geocode/json?key=" + a + "&latlng=" + lat + "," + lng + "&sensor=true";

        $.ajax({
            type: "POST",
            url: URL,
            data: {},
            success: function (result) {
                debugger;
                if (result != null && result.results != null && result.results.length > 0) {
                    address = result.results[0].formatted_address;
                    latVal = result.results[0].geometry.location.lat;
                    lngVal = result.results[0].geometry.location.lng;
                    console.log(address);
                }
                else {
                    alert("Geo Location is not supported on your current browser!");
                }
            }
        });
    }

    function SetMarker(ln,lg) {
        setTimeout(function () {
            var lat = ln;
            var lng = lg;

            var myLatlng = new google.maps.LatLng(lat, lng);

            var myOptions = {
                center: myLatlng,
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

            var marker = new google.maps.Marker({
                position: myLatlng,
                title: "lat: " + lat + " long: " + lng,
                draggable: true,

            });

            marker.setMap(map);
            marker.addListener('dragend', function (event) {
                var lat = event.latLng.lat();
                var lng = event.latLng.lng();
                debugger;

                GoogleMapAjaxCall(lat, lng);

            });

           
        }, 1000);

    }

    function success(position) {
        setTimeout(function () {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            var city = position.coords.locality;

            var myLatlng = new google.maps.LatLng(lat, lng);

            var myOptions = {
                center: myLatlng,
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

            var marker = new google.maps.Marker({
                position: myLatlng,
                title: "lat: " + lat + " long: " + lng,
                draggable: true,

            });

            marker.setMap(map);
            marker.addListener('dragend', function (event) {
                var lat = event.latLng.lat();
                var lng = event.latLng.lng();
                debugger;


                GoogleMapAjaxCall(lat, lng);

            });

            //debugger;
            //var URL = "https://maps.googleapis.com/maps/api/geocode/json?key=" + a + "&latlng=" + lat + "," + lng + "&sensor=true";
            //$.ajax({
            //    type: "POST",
            //    url: URL,
            //    data: {},
            //    success: function (result) {
            //        debugger;
            //        if (result != null && result.results != null && result.results.length > 0) {
            //            address = result.results[0].formatted_address;
            //            console.log(address);
            //        }
            //    }
            //});
        }, 1000);

    }
    function error(error) {
        console.log(error);
        alert("Geo Location is not supported on your current browser!");
    }
}



onclick = "return SetLocation(a);"