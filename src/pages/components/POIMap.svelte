<script>
    import 'leaflet/dist/leaflet.css';
    import {LeafletMap} from "/src/services/mapservice.js";
    import {getContext, onMount} from "svelte";

    const placemarkService = getContext("PlacemarkService");


    const mapConfig = {
        location: {lat: 51.20688339486562, lng: 10.085676936704893},
        zoom: 6,
        minZoom: 1,
    };
    let map = null;

    onMount(async () => {
        map = new LeafletMap("map", mapConfig);
        map.showZoomControl();
        map.showLayerControl();

        const pois = await placemarkService.getPois();
        pois.forEach(poi => {
            map.addMarker({lat: poi.location.coordinates[0], lng: poi.location.coordinates[1]}, poi._id, poi.name);
        });
    })

</script>

<div class="box container is-fullhd" id="map" style="height:800px">
</div>