<img src="./src/assets/first.png" alt="earth" id="earth"  >
<div class="container.is-max-desktop is-fluid">
</div>

<ImageCarousel images={images} />
<style>
    #earth {
        width: 100%;
        height: 100%;
    }

</style>


<script>
    import ImageCarousel from "./components/ImageCarousel.svelte";

    // sample images urls in an array from google
    let images = [
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        "https://www.gettyimages.at/gi-resources/images/500px/983794168.jpg",
    ]
</script>