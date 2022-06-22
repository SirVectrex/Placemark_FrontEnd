<script>

    import {SelectedPOI, setImage} from "../../services/stores.js";
    import {getContext, onMount} from "svelte";
    import Message from "./Message.svelte";
    const placemarkservice = getContext("PlacemarkService");

    let url;
    $: loading = false;
    $: error = false;
    $: currentstate = null;
    $: filename =""

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

    // tell a joke:



    let files;
    async function uploadImage(){
        // check if file size > 5 MB
        if(files[0].size > 5000000) {
            currentstate = {
                message: "Image is too big.",
                klass: "is-danger is-light",
                type: "error",
                show: true
            }
            return;
        }

        try {
            currentstate = {
                message: "Currently uploading image...",
                klass: "is-warning is-light",
                type: "loading",
                show: true
            }
            var formData = new FormData();
            console.log(files)
            formData.append("image", files[0]);
            console.log(formData)
            let success = await placemarkservice.addImage(current._id, formData)
            console.log(success)
            await updatePOI()
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

    function updateFilename(){
        // wait for 1s
        setTimeout(() => {
            console.log(files);
            filename = files[0].name;
        }, 100);



    }

</script>
{#if current!=null}
    <div class="card-content">
        <div class="">
        <div class="title is-5"> Upload a new image! <button class="is-inline is-pulled-right" on:click|once={cancel}><i class="fa fa-times" aria-hidden="true" style="font-size:30px;"></i></button>
        </div>
            <br>
            <div class="">
            <form on:submit|preventDefault>
                <div id="file-select" class="file has-name is-fullwidth">
                    <label class="file-label ">
                            <input class="file-input" on:change={updateFilename} name="imagefile" bind:files id="imagefile" type="file" accept="image/png, image/jpeg">
                            <span class="file-cta ">
                         <span class="file-icon">
                           <i class="fas fa-upload "></i>
                         </span>
                         <span class="file-label">
                           Choose a file…
                         </span>
                        </span>
                    </label>
                    <button type="submit" class="button is-info" on:click={uploadImage} >Upload</button>
                </div>
                </form>
                <br>
                <span class="">You have selected: <br> {filename}</span>

            </div>
        </div>
        <span class="">Maximum Size: 5 MB</span>

        {#if currentstate != null}
            <Message message={currentstate.message} klass={currentstate.klass} type={currentstate.type}/>
        {/if}
        <br>

    </div>

{/if}



