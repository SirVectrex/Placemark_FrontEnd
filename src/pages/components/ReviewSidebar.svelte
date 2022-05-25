<script>

    import {SelectedPOI, showReviews} from "../../services/stores.js";

    import {getContext, onMount} from "svelte";
    import {push} from "svelte-spa-router";
    const placemarkservice = getContext("PlacemarkService");

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

    $: stars = 3
    let ratingerror = null
    async function giveStars(){
        let success = await placemarkservice.giveRating(current._id, stars);
            if (success) {
                console.log(success)
                ratingerror = "Thank you for your feedback!"
            } else {
                ratingerror = "Something went wrong, please try again later."
                console.log("error")
            }
        }

    let username
    let comment
    let commenterror = null
    async function giveComment() {
        let success = await placemarkservice.giveComment(current._id, username, comment);
        if (success) {
            console.log(success)
            commenterror = "Thank you for your feedback!"
        } else {
            console.log(success)
            commenterror = "Something went wrong, please try again later."
        }
    }

    function cancel() {
        showReviews.set(null)
    }


</script>
{#if current!=null}
<div class="container">
    <div>
        <h1 class="is-inline title is-5">Leave your opinion!</h1> <button class="is-inline is-pulled-right" on:click|once={cancel}><i class="fa fa-times" aria-hidden="true" style="font-size:30px;"></i></button>
    </div>
    <div class="card-content box">
        <!-- <form action="{url}/api/uploadimage/{current._id}" method="POST" enctype="multipart/form-data"> -->
        <p class="is-title is-3">
            Give this POI a Rating!
        </p>
        <br>
        <form  id="starform" on:submit|preventDefault={giveStars}>
            <input class="slider is-inline is-fullwidth has-output" bind:value={stars} step="1" min="0" max="5" type="range">
            <p class="is-inline">{stars}</p>
            <br>
            <button type="submit" class="button  is-info">Submit</button>

            <br>
        </form>
        {#if ratingerror}
            <div class="section">
                {ratingerror}
            </div>
        {/if}
    </div>


    <div class="card-content box">
        <p class="is-title is-3">
            Give this POI a Comment!
        </p>
        <br>

        <form  id="commentform" on:submit|preventDefault={giveComment}>
            <input class="input" bind:value={username} type="text" placeholder="Username">
            <br>
            <input class="input textarea" bind:value={comment} type="textarea" placeholder="Comment">
            <br>
            <button type="submit" class="button is-info">Create</button>
        </form>
        {#if commenterror}
            <div class="section">
                {commenterror}
            </div>
        {/if}
    </div>

</div>
{/if}



