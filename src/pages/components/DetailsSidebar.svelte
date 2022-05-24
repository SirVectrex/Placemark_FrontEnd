<script>

import StarRating from 'svelte-star-rating';
import {SelectedPOI} from "../../services/stores.js";
import {getContext} from "svelte";
import {loggedin, setImage} from "../../services/stores.js";
const placemarkservice = getContext("PlacemarkService");

let isOpenModal = false;
function openModal() {
    setImage.set(true)

}


let current;
SelectedPOI.subscribe(async function (poi) {
    try {
        current = poi;
    }
    catch (e) {
        //console.error(e);
    }
    //console.log(poi)

});

let stat;
loggedin.subscribe(value => {
    stat = value;
});

function cancel() {
    SelectedPOI.set(null);
}

function open() {
    setImage.set(true)
}

</script>
<div>
    <h1 class="title is-3"> Name: {current.name}</h1>
    <br>
    <img src={current.img} alt="image"/>
    <br>
    <p class="">Description: {current.description}</p>
    <br>

    <StarRating rating={3.35} />
</div>
<br>


<div class="field is-grouped *b *r">
    <button class="button is-link" on:click={open}>New Photo</button>
    <button class="button is-link" on:click|once={cancel}>Close</button>
</div>
