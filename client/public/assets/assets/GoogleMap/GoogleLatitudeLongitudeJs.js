var autocomplete=null, id;
var countrySortName = '';
var lat, lng;
var options = null;
function initAutocomplete() {
    var input = document.getElementById(id);
    if (countrySortName != '' && countrySortName != null && countrySortName != 'undefined') {
        options = {
            types: ['(cities)'],
            componentRestrictions: { 'country': countrySortName }
        };
        autocomplete = new google.maps.places.Autocomplete(input, options);
    }
    else {
        autocomplete = new google.maps.places.Autocomplete(input);
    }
    autocomplete.addListener('place_changed', fillInAddress);
}
function fillInAddress() {

    var place = autocomplete.getPlace();
    $("#" + lat).val(place.geometry.location.lat);
    $("#" + lng).val(place.geometry.location.lng);
}
function geolocate(addressId, latitudeId, longitudeId, couSortName) {
    debugger;
    id = addressId;
    lat = latitudeId;
    lng = longitudeId;
    try {
        countrySortName = $('#' + couSortName).val();
    } catch (e) {

    }
    if (autocomplete != null) {
        if (countrySortName != '' && countrySortName != null && countrySortName != 'undefined') {
            autocomplete.setComponentRestrictions({ 'country': countrySortName });
        }
    }
    else {
        initAutocomplete();
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}

