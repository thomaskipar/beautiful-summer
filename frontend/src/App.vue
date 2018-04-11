<template>
    <div id="app" v-if="data">
        <div class="header">
            <h1>How's this summer in {{data.city}}?</h1>
            <p>
                <span class="em">{{data.warmestDays.days}} days </span>in a row so far <span
                    class="em">above {{data.minTemperature}}&#8451;</span> in {{data.year}}.
        </p>
        </div>

        <div class="history">
            How's it been in previous years?

            <ul>
                <li v-for="h in data.historic">
                    {{ h.year }} - {{ h.warmestDays.days }} day<span v-if="h.warmestDays.days != 1">s</span>&nbsp;<span
                        v-if="h.warmestDays.date" class="additional">from {{formatDate(h.warmestDays.date)}}</span>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';

    export default {
        name: 'app',
        data: function () {
            return {
                data: undefined
            };
        },
        methods: {
            fetchData: function () {
                axios
                    .get('http://localhost:8081/api/data')
                    .then(response => {
                        response.data.historic.reverse();
                        this.data = response.data;
                    })
            },
            formatDate: function (date) {
                return moment(date, "YYYYMMDD").format("DD. MM.")
            }

        },
        mounted: function () {
            this.fetchData()
        },
    }
</script>

<style>
    @import './assets/style.css'
</style>