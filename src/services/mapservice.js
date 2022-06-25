import * as L from "leaflet";
import {PointOnMap, SelectedPOI, newPOI } from "./stores.js"
import {getContext} from "svelte";
import {placemarkService} from "./placemarkService.js";
import { SearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import {control, Point} from "leaflet/dist/leaflet-src.esm.js";
import {enableTextSelection} from "leaflet/src/dom/DomUtil.js";

let newIsActive = false;
newPOI.subscribe( (newPOI) => {
    newIsActive = newPOI;
})

function getActive(){
    return newIsActive;
}

function getNow() {
    return "now"
}

export class LeafletMap {

    imap = {};
    clickMarker = null;
    control = {};
    overlays = {};

    // https://leaflet-extras.github.io/leaflet-providers/preview/

    baseLayers = {
        Terrain: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 17,
            attribution:
                'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        }),
        Satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
            attribution:
                "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
        }),
    };



    constructor(id, descriptor, activeLayer = "") {
        let defaultLayer = this.baseLayers.Terrain;
        let clickMarker = null;
        if (activeLayer) {
            defaultLayer = this.baseLayers[activeLayer];
        }

        this.imap = L.map(id, {
            center: [descriptor.location.lat, descriptor.location.lng],
            zoom: descriptor.zoom,
            minZoom: descriptor.minZoom,
            zoomControl: false,
            layers: [defaultLayer],
            // click event
        });
        let map = this.imap

        const searchControl = new SearchControl({
            style: 'button',
            provider: new OpenStreetMapProvider(),
        });

        this.imap.addControl(searchControl, this.baseLayers, this.overlays);
        this.imap.invalidateSize();

        let hiddenMethodMap = this.imap;
        hiddenMethodMap._onResize();

        this.imap.on('click', function (e) {
            // console.log(newIsActive)
            if (newIsActive) {
                if (clickMarker !== null) {
                    clickMarker.remove();
                }
                clickMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
                PointOnMap.set(e.latlng);
            }
        });



        this.imap.on('geosearch/showlocation', function (e) {
            let LatLng = {
                lat: e.location.y,
                lng: e.location.x
            }
            PointOnMap.set(
                LatLng
            )
            console.log(LatLng);
        });


    }


    addLayerControl() {
        let overlayMaps = {};
        for (let key in this.overlays) {
            this.overlays[key].addTo(this.imap);
            overlayMaps[key] = this.overlays[key];
        }
        L.control.layers(this.baseLayers, overlayMaps).addTo(this.imap);
    }


    addLayer(title, layer) {
        this.overlays[title] = layer;
    }

    addLayerGroup(title) {
        this.imap.addLayer(this.overlays[title]);
    }

    showLayerControl(title) {
        this.control = L.control.layers(this.baseLayers, this.overlays[title]).addTo(this.imap);
    }

    showZoomControl(position = "topleft") {
        L.control
            .zoom({
                position: position,
            })
            .addTo(this.imap);
    }

    moveTo(zoom, location) {
        this.imap.setZoom(zoom);
        this.imap.panTo(new L.LatLng(location.lat, location.lng));
    }

    zoomTo(location) {
        this.imap.setView(new L.LatLng(location.lat, location.lng), 8);
    }

   addMarker(location, id, popupText = "", layerTitle = "default", ) {
       // add to map
       let group = {};
        let marker = L.marker([location.lat, location.lng]);
        marker.id = id;
        if (popupText) {
            var popup = L.popup({autoClose: false, closeOnClick: false});
            popup.setContent(popupText);
            marker.bindPopup(popup);
            marker.on('mouseover', function (e) {
                this.openPopup();
            });
            marker.on('mouseout', function (e) {
                this.closePopup();
            });
        }
        if (!this.overlays[layerTitle]) {
            group = L.layerGroup([]);
            this.overlays[layerTitle] = group;
        } else {
            group = this.overlays[layerTitle];
        }
        marker.on('click', this.fireMarkerClick)
        marker.addTo(group);

        return marker;
    }

    fireMarkerClick(e) {
        console.log(e.target.id);
        placemarkService.getPoi(e.target.id).then(poi => {
            SelectedPOI.set(poi);
        });
    }

    invalidateSize() {
        this.imap.invalidateSize();
        let hiddenMethodMap = this.imap;
        hiddenMethodMap._onResize();
    }

    // create a click event
    addClickEvent(callback) {
        this.imap.on("click", callback);
    }


}