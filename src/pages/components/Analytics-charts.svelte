<script>

    import Chart from 'svelte-frappe-charts';
    import {getContext, onMount} from "svelte";
    const placemarkservice = getContext("PlacemarkService");

    let chart = "pie";
    let category_data;
    let user_data;
    let star_data;

    onMount(async () => {
        await load_user_data();
        await load_category_data();
        await load_rating_data();

    });

    async function load_rating_data() {
        const response = await placemarkservice.getRatingStats();
        star_data = {
            labels: response.labels,
            datasets: [
                {
                    values: response.data
                }
            ]
        };
        console.log(star_data);
    }

    async function load_user_data() {
        const rawdata = await placemarkservice.getUserStats();
        user_data = {
            labels: [],
            datasets: [
                {
                    values: []
                }
            ]
        };
        console.log(rawdata)
        rawdata.forEach(placemark => {
            user_data.labels.push(placemark._id)
            user_data.datasets[0].values.push(placemark.count);
        })
        console.log(user_data);
    }

    async function load_category_data() {
        const rawdata = await placemarkservice.getCategoryStats();
        category_data = {
            labels: [],
            datasets: [
                {
                    values: []
                }
            ]
        };
        console.log(rawdata)
        rawdata.categoryAmount.forEach(category => {
            category_data.labels.push(category._id)
            category_data.datasets[0].values.push(category.count);
        })
    }

    function toggleView(){
        if (chart == "pie") {
            chart = "bar";
        } else {
            chart = "pie";
        }
    }



</script>

<div class="columns">
    {#key chart}
    <div class="column">
        <div class="title is-5" >Categories</div>
        <Chart data={category_data} type="{chart}" />
    </div>
    <div class="column">
        <div class="title is-5" >Most active Users</div>
        <Chart data={user_data} type="{chart}" />
    </div>
    <div class="column">
        <div class="title is-5" >Ratings</div>
        <Chart data={star_data} type="{chart}"/>
    </div>
    {/key}
    <br>
    <br>
    <div class="field">
        <input id="switchSmall" on:change={toggleView} type="checkbox" name="switchSmall" class="switch is-small">
        <label for="switchSmall">Pie- / Bar-Chart</label>
    </div>
</div>