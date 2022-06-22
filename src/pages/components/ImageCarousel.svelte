<script>

    import {SelectedPOI} from "../../services/stores.js";

    import { Splide, SplideSlide } from '@splidejs/svelte-splide';
    // Default theme
    import '@splidejs/svelte-splide/css';


    export let images = [];
    let currentImage = "";
    let counter = 0;

    function next(){
        // console.log("next");
        if (counter < images.length - 1) {
            counter++;
        } else {
            counter = 0;
        }
        currentImage = images[counter];
    }

    SelectedPOI.subscribe(poi => {
        try {
            images = poi.photos;
            // console.log(images)
            currentImage = images[0];
        } catch (e) {
            // console.log(e);
        }


    });

    function before(){
        // console.log("before");
        if (counter > 0) {
            counter--;
        } else {
            counter = images.length - 1;
        }
        currentImage = images[counter];

    }


</script>

<!-- for multiple photos-->
{#if images.length > 1}
<Splide aria-label="My Favorite Images">
    {#each images as image}
    <SplideSlide>
        <img src="{image}" alt="Image"/>
    </SplideSlide>
    {/each}
</Splide>
{/if}


<!-- for single photos -->
{#if images.length > 0 && images.length < 2}
<div class="card">
    <img class="card-img-top" src="{currentImage}" alt="Card image cap">
</div>
{/if}


<!--- old implementation

<div class="card">
    <img class="card-img-top" src="{currentImage}" alt="Card image cap">
    {#if images.length > 1 && typeof images !== "string"}
    <div class="box" >
        <a on:click={before} >  <i class="fa fa-arrow-left" aria-hidden="true" ></i></a>
        <a on:click={next}>  <i class="fa fa-arrow-right is-pulled-right" aria-hidden="true"></i></a>

    </div>
    {/if}
</div


-->