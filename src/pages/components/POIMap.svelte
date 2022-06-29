<script>

    // import 'leaflet/dist/leaflet.css';
    import {LeafletMap} from "/src/services/mapservice.js";
    import {getContext, onMount} from "svelte";

    const placemarkService = getContext("PlacemarkService");

    let center = {lat: 48.12681635190671, lng: 11.558303833007814};

    const mapConfig = {
        location: center,
        zoom: 8,
        minZoom: 1,
    };
    let map = null;

    onMount(async () => {
        map = new LeafletMap("map", mapConfig);
        map.showZoomControl();
        // map.showLayerControl();


        const pois = await placemarkService.getPois();

        center = findCenter(pois);

        pois.forEach(poi => {
            map.addMarker({lat: poi.location.coordinates[0], lng: poi.location.coordinates[1]}, poi._id, poi.name, poi.category);
        });
        map.addLayerControl();
        map.moveTo(8, center);
    })

    function findCenter(markers) {
        let lat = 0;
        let lng = 0;

        markers.forEach(poi => {
            lat += poi.location.coordinates[0]
            lng += poi.location.coordinates[1];
        });

        lat /= markers.length;
        lng /= markers.length;

        return {lat: lat, lng: lng}
    }


</script>

<div class="box container is-fullhd" id="map" style="height: 100%">
</div>