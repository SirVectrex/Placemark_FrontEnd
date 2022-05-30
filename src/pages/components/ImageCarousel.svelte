<script>

    import {onMount} from "svelte";
    import {SelectedPOI} from "../../services/stores.js";


    export let images = [];
    let currentImage = "";
    let counter = 0;

    function next(){
        console.log("next");
        if (counter < images.length - 1) {
            counter++;
        } else {
            counter = 0;
        }
        currentImage = images[counter];
    }

    SelectedPOI.subscribe(poi => {
        try {
            images = poi.img;
            if (typeof images === "string") {
                currentImage = images;

            }
            else    {
                currentImage = images[0];
            }
        } catch (e) {
            console.log(e);
        }


    });

    function before(){
        console.log("before");
        if (counter > 0) {
            counter--;
        } else {
            counter = images.length - 1;
        }
        currentImage = images[counter];

    }


</script>


{#if images.length > 0}
<div class="card">
    <img class="card-img-top" src="{currentImage}" alt="Card image cap">
    {#if images.length > 1 && typeof images !== "string"}
    <div class="box" >
        <a on:click={before} >  <i class="fa fa-arrow-left" aria-hidden="true" ></i></a>
        <a on:click={next}>  <i class="fa fa-arrow-right is-pulled-right" aria-hidden="true"></i></a>

    </div>
    {/if}
</div>
{/if}