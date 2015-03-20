/**
 * Created by agustin on 3/19/15.
 */

var map;
var layerControl;
var points = [];
var layers = [];

function busLines() {
    var gpxLines = [
        {
            "url": "./data/linea-104.gpx",
            "name": "Linea 104",
            "colorLine": "red"
        }
    ];
    var layer;
    var name;

    $.each(gpxLines, function(i, gpx) {
        layer = new L.GPX(gpx.url, {
            "async": false,
            "marker_options": {
                "startIconUrl": "./img/no-icon.png",
                "endIconUrl": "./img/no-icon.png",
                "shadowUrl": "./img/no-icon.png"
            },
            "polyline_options": {
                "color": gpx.colorLine
            }
        });
        name = "<img src='./img/" + gpx.colorLine + "-line.png' /> <span>" + gpx.name + "</span>";
        layerControl.addOverlay(layer, name);
    });
}

$(document).ready(function () {
    map = L.map('map',  {
            fullscreenControl: true
        }).setView([51.505, -0.09], 13);

    // create the tile layer with correct attribution
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 11, maxZoom: 17, attribution: osmAttrib});

    // start the map in South-East England
    map.setView(new L.LatLng(-27.451389, -58.986667), 13);
    map.addLayer(osm);

    map.on('overlayadd', function(e) {
        map.fitBounds(e.layer);
    });

    layerControl = L.control.layers(null, null, {collapsed: false});
    layerControl.addTo(map);

    busLines();
});