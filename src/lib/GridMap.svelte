<script lang="ts">
    import {
        map,
        tileLayer,
        rectangle,
        marker,
        type LatLngTuple,
    } from "leaflet";
    import type MapOptions from "leaflet";
    import "leaflet/dist/leaflet.css";
    import { maidenheadToBoundingBox } from "@hamset/maidenhead-locator";
    import { afterUpdate, onMount } from "svelte";

    export let grid = "";
    export let height = "100px";
    export let mapOptions: L.MapOptions = {};

    let mapDiv: HTMLElement;
    let mapObject: MapOptions.Map;
    let box: MapOptions.LatLngBoundsExpression;

    onMount(() => {
        mapObject = map(mapDiv, mapOptions).setView([0, 0], 13);
        tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(mapObject);
    });

    afterUpdate(() => {
        drawGridSquare();
    });

    function drawGridSquare() {
        box = maidenheadToBoundingBox(grid);

        rectangle(box, {
            color: "#00f8",
            weight: 1,
        }).addTo(mapObject);

        const center = [
            (box[0][0] + box[1][0]) / 2,
            (box[0][1] + box[1][1]) / 2,
        ];

        marker(center as LatLngTuple).addTo(mapObject);
        recenter();
    }

    export function recenter() {
        mapObject.fitBounds(box);
    }
</script>

<div bind:this={mapDiv} style="height: {height}; width: 100%;"></div>
