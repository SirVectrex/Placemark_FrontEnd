<script>

    import Chart from 'svelte-frappe-charts';
    import {getContext, onDestroy, onMount} from "svelte";
    const placemarkservice = getContext("PlacemarkService");

    onMount(async () => {
        load_category_data();
        load_user_data();
    });

    async function load_user_data() {
        user_data = {
            labels: [],
            datasets: [
                {
                    values: []
                }
            ]
        };
        const userdata = await placemarkservice.getUserStats();
        userdata.forEach(placemark => {
            user_data.labels.push(placemark._id)
            user_data.datasets[0].values.push(placemark.count);
        })
        console.log(user_data);
    }

    async function load_category_data() {
        const rawdata = await placemarkservice.getCategoryStats();
        // console.log(rawdata.categoryAmount);
        // map received data to category_data
        category_data = {
            labels: [],
            datasets: [
                {
                    values: []
                }
            ]
        };
        rawdata.categoryAmount.forEach(category => {
            category_data.labels.push(category._id)
            category_data.datasets[0].values.push(category.count);
        })
    }

    let category_data, user_data;



</script>

<div class="columns">
    <div class="column">
        <Chart data={category_data} type="pie" />
    </div>
    <div class="column">
        <Chart data={user_data} type="pie" />
    </div>
    <div class="column">
        Third column: Chart to follow
    </div>
</div>