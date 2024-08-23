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
    import { gridToBox, gridToPoint } from "@hamlog/maidenhead";
    import type { GridBox } from "@hamlog/maidenhead";
    import { afterUpdate, onMount } from "svelte";

    export let grid = "";
    export let height = "100px";
    export let mapOptions: L.MapOptions = {};

    let mapDiv: HTMLElement;
    let mapObject: MapOptions.Map;
    let box: GridBox;

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
        box = gridToBox(grid);

        rectangle(
            [
                [box[0].lat, box[0].lon],
                [box[1].lat, box[1].lon],
            ],
            {
                color: "#00f8",
                weight: 1,
            }
        ).addTo(mapObject);

        const center = gridToPoint(grid);

        marker([center.lat, center.lon] as LatLngTuple).addTo(mapObject);
        recenter();
    }

    export function recenter() {
        mapObject.fitBounds([
            [box[0].lat, box[0].lon],
            [box[1].lat, box[1].lon],
        ]);
    }
</script>

<div bind:this={mapDiv} style="height: {height}; width: 100%;"></div>
