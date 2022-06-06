
{#if stat}
<div class="navbar box">
    <div class="navbar-start">
        {#if selectedPOI != null}
        <button class="button" on:click={openReview}>Review</button>
        <button class="button" on:click={openImageUpload}>Add Photo</button>
        {/if}
    </div>
    <div class="navbar-end">
        <button class="button" on:click={hide_new} >Add new POI</button>
    </div>

</div>
    {/if}
{#if !stat}
<div class="navbar box">
    <p>
    Please login to create a new POI or review an existing POI.
    </p>
</div>
    {/if}

<div class="tile is-ancestor" style="height: 81vh">
    {#if show_new }
        <div class="tile is-4 is-vertical is-parent">
            <div class="tile is-child box">
                <!-- include NewPOISidebar.svelte-->
                <NewPOISidebar/>
            </div>
        </div>
    {/if}
    {#if selectedPOI != null}
        <div class="tile is-4 is-vertical is-parent scrollthing"  >
            <div class="tile is-child box">

                <DetailsSidebar/>
            </div>
        </div>
    {/if}
    {#if setimage != null}
        <div class="tile is-4 is-vertical is-parent">
            <div class="tile is-child box">
                <Image_Sidebar/>
            </div>
        </div>
    {/if}
    {#if review != null}
        <div class="tile is-4 is-vertical is-parent">
            <div class="tile is-child box">
                <ReviewSidebar/>
            </div>
        </div>
    {/if}

    <div class="tile is-parent container container.is-fullhd">
            <POIMap/>

    </div>
</div>


<script>
    import NewPOISidebar from './components/NewPOISidebar.svelte';
    import DetailsSidebar from './components/DetailsSidebar.svelte';
    import Image_Sidebar from "./components/Image_Sidebar.svelte";
    import ReviewSidebar from "./components/ReviewSidebar.svelte";
    import POIMap from "./components/POIMap.svelte";
    import {loggedin, newPOI, SelectedPOI, setImage, showReviews} from "../services/stores.js";

    let stat
    let selectedPOI
    let setimage
    let review
    let show_new

    function openImageUpload() {
        if(setimage == null) {
            setImage.set(true)
        }
        else {
            setImage.set(null)
        }
    }

    function openReview() {
        if (review === true) {
            showReviews.set(null)
        } else {
            showReviews.set(true)
        }
    }

    function hide_new() {
        if (show_new === true) {
            newPOI.set(false)
        } else {
            newPOI.set(true)
        }
    }

    newPOI.subscribe(function (value) {
        show_new = value
    })

    loggedin.subscribe(value => {
        stat = value;
    });
    showReviews.subscribe(value => {
        review = value;
    });

    SelectedPOI.subscribe(value => {
        selectedPOI = value;
    });

    setImage.subscribe(value => {
        setimage = value;
    });

    let sidebar_show = false;
    let details = false;
</script>

<style>
    .scrollthing {

        overflow-y: scroll; /* Add the ability to scroll */
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    .scrollthing::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .scrollthing {
        -ms-overflow-style: none;  /* IE and Edge */
    }
</style>