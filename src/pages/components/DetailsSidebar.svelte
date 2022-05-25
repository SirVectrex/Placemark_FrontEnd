<script>

import StarRating from 'svelte-star-rating';
import {SelectedPOI} from "../../services/stores.js";
import ReviewSidebar from "./ReviewSidebar.svelte";
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
    //console.log(poi)

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
    <img src={current.img} alt="image"/>
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
</div>
<br>

<div class="modal">
    test
</div>


<div class="field is-grouped *b *r">
    <!-- {#if stat}
    <button class="button is-link" on:click={open}>New Photo</button>
    <button class="button is-link" on:click={openReview}>Reviews</button>
    {/if}

    <button class="button is-link" on:click|once={cancel}>Close</button>
    -->
</div>
