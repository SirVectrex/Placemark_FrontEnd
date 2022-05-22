<script>

import StarRating from 'svelte-star-rating';
import {SelectedPOI} from "../../services/stores.js";
import {getContext} from "svelte";
const placemarkservice = getContext("PlacemarkService");


let current;
SelectedPOI.subscribe(async function (poi) {
    try {
        current = poi;
        console.log(await placemarkservice.getPoi(poi._id))
    }
    catch (e) {
        //console.error(e);
    }
    //console.log(poi)

});

function cancel() {
    SelectedPOI.set(null);
}

</script>
<div>
    <h1 class="title is-2">NOTE: This section is currently being worked on.</h1>
    <div class="is-divider" data-content="Coming soon"></div>
    <h1 class="title is-3"> Name: {current.name}</h1>
    <br>
    <p class="">Description: {current.description}</p>
    <br>

    <StarRating rating={3.35} />
</div>
<br>

<div class="field is-grouped *b *r">
    <button class="button is-link" on:click|once={cancel}>Close</button>
</div>

