/**
 * Created by agustin on 3/19/15.
 */

var map = L.map('map').setView([51.505, -0.09], 13);

var plotlayers=[];

// create the tile layer with correct attribution
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {minZoom: 11, maxZoom: 15, attribution: osmAttrib});


var plotlist = [{"name":"Tunbridge Wells, Langton Road, Burnt Cottage",
    "lon":"-27.4511985779",
    "lat":"-58.9865379334",
    "details":"A Grade II listed five bedroom wing in need of renovation."}];

for (i=0;i<plotlist.length;i++) {
    var plotll = new L.LatLng(plotlist[i].lat,plotlist[i].lon, true);
    var plotmark = new L.Marker(plotll);

    plotmark.data=plotlist[i];
    map.addLayer(plotmark);
    plotmark.bindPopup("<h3>"+plotlist[i].name+"</h3>"+plotlist[i].details);
    plotlayers.push(plotmark);
}

// start the map in South-East England
map.setView(new L.LatLng(-27.4511985779, -58.9865379334), 13);
map.addLayer(osm);