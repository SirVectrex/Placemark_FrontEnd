<script>

import StarRating from 'svelte-star-rating';
import {SelectedPOI} from "../../services/stores.js";
import ImageCarousel from "./ImageCarousel.svelte";
import {getContext} from "svelte";
import {loggedin,showReviews , setImage} from "../../services/stores.js";
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
    console.log(poi)

});

let stat;
loggedin.subscribe(value => {
    stat = value;
});

function cancel() {
    SelectedPOI.set(null);
    setImage.set(null)
    showReviews.set(null)
}

function copyLink(){
    const link =  "https://wahi.vercel.app/#/map/" + current._id;
    let data = [new ClipboardItem({ "text/plain": new Blob([link], { type: "text/plain" }) })];
    navigator.clipboard.write(data).then(function() {
        alert("Link copied to clipboard");
    });
}

function open() {
    setImage.set(true)
}

function openReview() {
    showReviews.set(true)
}

const style = 'display: inline-flex';

</script>
<div>
    <div>
    <h1 class="is-inline title is-3">{current.name}</h1> <button class="is-inline is-pulled-right" on:click|once={cancel}><i class="fa fa-times" aria-hidden="true" style="font-size:36px;"></i></button>
    </div>
    <br>
    {#if current.photos !== undefined && current.photos.length > 0}
        <ImageCarousel />
        <br>
    {:else}
        <p>No image uploaded yet.</p>
        <br>
    {/if}
    <p class="">Category: {current.category}</p>
    <br>
    <p class="">Description: {current.description}</p>
    <br>

    {#if current.stats !== undefined}
    <div class="container is-inline">
         <StarRating rating={current.stats.avgRating} {style}/> ({current.stats.numRatings})
    </div>
    {/if}
    {#if current.comments !== undefined}
        {#each current.comments as comment}
        <div class="box">
            <p class="is-size-7">{comment.username} wrote:</p>
            <p class="">{comment.comment}</p>

        </div>
        {/each}
    {/if}
    <button class=" button is-primary is-inline is-pulled-right" on:click={copyLink}>Share this POI.</button>
</div>
<br>

<div class="field is-grouped *b *r">
    <!-- {#if stat}
    <button class="button is-link" on:click={open}>New Photo</button>
    <button class="button is-link" on:click={openReview}>Reviews</button>
    {/if}

    <button class="button is-link" on:click|once={cancel}>Close</button>
    -->
</div>
