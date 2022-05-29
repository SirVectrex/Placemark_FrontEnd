<script>

    import {SelectedPOI, setImage} from "../../services/stores.js";
    import {getContext, onMount} from "svelte";
    import Message from "./Message.svelte";
    import axios from "axios";
    const placemarkservice = getContext("PlacemarkService");

    let url;
    $: loading = false;
    $: error = false;
    $: currentstate = null;

    onMount(async () => {
        url = await placemarkservice.getbaseUrl()
        console.log(url)
    });


    async function updatePOI(){
        // get newest data from server
        let poi = await placemarkservice.getPoi(current._id)   // getPOI(current.id);
        // update store
        SelectedPOI.set(poi);

    }

    let files;
    async function uploadImage(){
        try {
            currentstate = {
                message: "Currently uploading image...",
                klass: "is-warning is-light",
                type: "loading",
                show: true
            }
            var formData = new FormData();
            var imagefile = document.querySelector('#imagefile');
            console.log(files)
            formData.append("image", files[0]);
            console.log(formData)
            let success = await placemarkservice.addImage(current._id, formData)
            console.log(success)
            currentstate = {
                message: "Image uploaded",
                klass: "is-success is-light",
                type: "success",
                show: true
            }
        } catch (error) {
            currentstate = {
                message: "Error uploading image",
                klass: "is-danger is-light",
                type: "error",
                show: true
            }
        }
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

    function  cancel(){
        setImage.set(null);
    }

</script>
{#if current!=null}
    <iframe name="dummyframe" id="dummyframe" style="display: none;"></iframe>
    <div class="card-content">
        <!-- <form action="{url}/api/uploadimage/{current._id}" method="POST" enctype="multipart/form-data"> -->
        <form on:submit|preventDefault>
            <!-- <form action="{url}/api/uploadimage/{current._id}" method="POST" enctype="multipart/form-data" target="dummyframe"> -->
            <div id="file-select" class="file has-name is-fullwidth">
                <label class="file-label">
                    <input class="file-input" name="imagefile" bind:files id="imagefile" type="file" accept="image/png, image/jpeg">
                    <span class="file-cta">
                 <span class="file-icon">
                   <i class="fas fa-upload"></i>
                 </span>
                 <span class="file-label">
                   Choose a file…
                 </span>
                </span>
                    <span class="file-name"></span>
                </label>
                <button type="submit" class="button is-info" on:click|once={uploadImage} >Upload</button>
            </div>
        </form>
        {#if currentstate != null}
            <Message message={currentstate.message} klass={currentstate.klass} type={currentstate.type}/>
        {/if}

        <div class="field is-grouped *b *r">
            <button class="button is-link" on:click|once={cancel}>Close</button>
        </div>
    </div>

{/if}



