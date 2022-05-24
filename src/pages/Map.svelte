
{#if stat}
<div class="box">
    <button class="button" on:click={() => newpoi = !newpoi}>Add new POI</button>
    <button class="button" on:click={() => details = !details}>Show Details</button>
</div>
    {/if}
<div class="tile is-ancestor">
    {#if newpoi }
        <div class="tile is-4 is-vertical is-parent">
            <div class="tile is-child box">
                <!-- include NewPOISidebar.svelte-->
                <NewPOISidebar/>
            </div>
        </div>
    {/if}
    {#if selectedPOI != null}
        <div class="tile is-4 is-vertical is-parent">
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



    <div class="tile is-parent container container.is-fullhd">
            <POIMap/>

    </div>
</div>


<script>
    import NewPOISidebar from './components/NewPOISidebar.svelte';
    import DetailsSidebar from './components/DetailsSidebar.svelte';
    import Image_Sidebar from "./components/Image_Sidebar.svelte";
    import POIMap from "./components/POIMap.svelte";
    import {loggedin, SelectedPOI, setImage} from "../services/stores.js";

    let stat
    let selectedPOI
    let setimage
    loggedin.subscribe(value => {
        stat = value;
    });

    SelectedPOI.subscribe(value => {
        selectedPOI = value;
    });

    setImage.subscribe(value => {
        setimage = value;
    });



    let sidebar_show = false;
    let newpoi = false;
    let details = false;
</script>
