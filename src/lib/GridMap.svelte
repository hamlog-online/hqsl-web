<script lang="ts">
    import {
        map,
        tileLayer,
        rectangle,
        //marker,
        type LatLngTuple,
    } from "leaflet";
    import type MapOptions from "leaflet";
    import "leaflet/dist/leaflet.css";
    import {
        gridToBox,
        //gridToPoint
    } from "@hamlog/maidenhead";
    import type { GridBox } from "@hamlog/maidenhead";
    import { afterUpdate, onMount } from "svelte";

    export let grid = "";
    export let height = "100px";
    export let mapOptions: L.MapOptions = {};

    const color = "#00f8";

    let mapDiv: HTMLElement;
    let mapObject: MapOptions.Map;
    let box: GridBox;

    onMount(() => {
        if (grid === "") {
            return;
        }
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
        if (grid === "") {
            return;
        }
        box = gridToBox(grid);

        rectangle(
            [
                [box[0].lat, box[0].lon],
                [box[1].lat, box[1].lon],
            ],
            {
                color: color,
                weight: 1,
            }
        ).addTo(mapObject);

        /*
        const center = gridToPoint(grid);
        marker([center.lat, center.lon] as LatLngTuple).addTo(mapObject);
        */
        recenter();
    }

    export function recenter() {
        if (grid === "") {
            return;
        }
        mapObject.fitBounds([
            [box[0].lat, box[0].lon],
            [box[1].lat, box[1].lon],
        ]);
    }
</script>

{#if grid !== ""}
    <div bind:this={mapDiv} style="height: {height}; width: 100%;"></div>
{:else}
    <div style="height: {height}; width: 100%;">
        <svg xmlns="http://www.w3.org/2000/svg" style="width:100%;height:{height};" viewBox="0 0 462.94 462.94"
            ><g style="stroke:{color}"
                ><g style="stroke:{color}"
                    ><path
                        d="M0 100c-3.156 0-5.715-44.772-5.715-100S-3.156-100 0-100"
                        style="fill:none;stroke:{color}"
                        transform="rotate(2.297 -5605.134 5885.45)scale(2.0936)"
                    /><path
                        d="M0 100c-14.729 0-26.67-44.772-26.67-100S-14.729-100 0-100"
                        style="fill:none;stroke:{color}"
                        transform="rotate(11.172 -1056.863 1297.463)scale(2.0936)"
                    /><path
                        d="M0 100c-25.299 0-45.807-44.772-45.807-100S-25.299-100 0-100"
                        style="fill:none;stroke:{color}"
                        transform="rotate(21.151 -498.557 734.281)scale(2.0936)"
                    /><path
                        d="M0 100c-34.144 0-61.823-44.772-61.823-100S-34.144-100 0-100"
                        style="fill:none;stroke:{color}"
                        transform="rotate(33.418 -266.348 500.045)scale(2.0936)"
                    /><path
                        d="M0 100c-40.662 0-73.626-44.772-73.626-100S-40.662-100 0-100"
                        style="fill:none;stroke:{color}"
                        transform="rotate(49.624 -132.372 364.899)scale(2.0936)"
                    /><path
                        d="M0 100c-44.41 0-80.411-44.772-80.411-100S-44.41-100 0-100"
                        style="fill:none;stroke:{color}"
                        transform="rotate(71.279 -44.269 276.026)scale(2.0936)"
                    /><path
                        d="M0-100c45.131 0 81.717 44.772 81.717 100S45.131 100 0 100"
                        style="fill:none;stroke:{color}"
                        transform="rotate(-83.049 245.191 -15.961)scale(2.0936)"
                    /><path
                        d="M0-100c42.776 0 77.453 44.772 77.453 100S42.776 100 0 100"
                        style="fill:none;stroke:{color}"
                        transform="rotate(-59.023 318.282 -89.69)scale(2.0936)"
                    /><path
                        d="M0-100c37.507 0 67.912 44.772 67.912 100S37.507 100 0 100"
                        style="fill:none;stroke:{color}"
                        transform="rotate(-40.377 427.565 -199.927)scale(2.0936)"
                    /><path
                        d="M0-100c29.681 0 53.742 44.772 53.742 100S29.681 100 0 100"
                        style="fill:none;stroke:{color}"
                        transform="rotate(-26.501 602.69 -376.581)scale(2.0936)"
                    /><path
                        d="M0-100c19.833 0 35.91 44.772 35.91 100S19.833 100 0 100"
                        style="fill:none;stroke:{color}"
                        transform="rotate(-15.629 951.29 -728.226)scale(2.0936)"
                    /><path
                        d="M0-100c8.633 0 15.631 44.772 15.631 100S8.633 100 0 100"
                        style="fill:none;stroke:{color}"
                        transform="rotate(-6.362 2179.156 -1966.813)scale(2.0936)"
                    /></g
                ><g style="stroke:{color}"
                    ><path
                        d="M15.682 98.764c-10.262 1.63-21.102 1.63-31.364 0"
                        style="fill:none;stroke:{color}"
                        transform="translate(231.362 229.36)scale(2.0936)"
                    /><path
                        d="M50.483 86.323c-27.345 15.992-72.114 16.242-99.995.557q-.49-.276-.971-.557"
                        style="fill:none;stroke:{color}"
                        transform="translate(231.362 229.36)scale(2.0936)"
                    /><path
                        d="M69.65 71.756C46.92 93.82-2.69 101.14-41.16 88.099c-11.746-3.982-21.548-9.604-28.49-16.343"
                        style="fill:none;stroke:{color}"
                        transform="translate(231.362 229.36)scale(2.0936)"
                    /><path
                        d="M83.237 55.422C65.681 81.79 14.182 95.003-31.793 84.932c-23.685-5.189-42.397-15.922-51.444-29.51"
                        style="fill:none;stroke:{color}"
                        transform="translate(231.362 229.36)scale(2.0936)"
                    /><path
                        d="M92.612 37.724C80.661 67.062 29.51 85.288-21.638 78.434c-35.232-4.722-62.742-20.501-70.974-40.71"
                        style="fill:none;stroke:{color}"
                        transform="translate(231.362 229.36)scale(2.0936)"
                    /><path
                        d="M98.16 19.097c-6.05 31.096-54.902 53.49-109.11 50.02-45.879-2.936-82.09-23.706-87.21-50.02"
                        style="fill:none;stroke:{color}"
                        transform="translate(231.362 229.36)scale(2.0936)"
                    /><path
                        d="M100 0c0 31.678-44.772 57.359-100 57.359S-100 31.678-100 0"
                        style="fill:none;stroke:{color}"
                        transform="translate(231.362 229.36)scale(2.0936)"
                    /><path
                        d="M98.16-19.097c6.05 31.095-32.994 59.116-87.206 62.586s-103.06-18.925-109.11-50.02a32.7 32.7 0 0 1 0-12.566"
                        style="fill:none;stroke:{color}"
                        transform="translate(231.362 229.36)scale(2.0936)"
                    /><path
                        d="M92.612-37.724C104.56-8.386 72.786 20.953 21.638 27.808s-102.3-11.372-114.25-40.71c-3.326-8.164-3.326-16.658 0-24.822"
                        style="fill:none;stroke:{color}"
                        transform="translate(231.362 229.36)scale(2.0936)"
                    /><path
                        d="M83.237-55.422C100.79-29.054 77.759.485 31.789 10.555s-97.47-3.142-115.03-29.51c-7.818-11.742-7.818-24.725 0-36.467"
                        style="fill:none;stroke:{color}"
                        transform="translate(231.362 229.36)scale(2.0936)"
                    /><path
                        d="M69.65-71.756c22.731 22.064 9.974 50.52-28.493 63.558s-88.077 5.72-110.81-16.343c-15.002-14.562-15.002-32.653 0-47.215"
                        style="fill:none;stroke:{color}"
                        transform="translate(231.362 229.36)scale(2.0936)"
                    /><path
                        d="M50.483-86.322c27.345 15.992 26.91 41.672-.971 57.356s-72.65 15.435-99.995-.557c-26.97-15.773-26.97-41.026 0-56.799"
                        style="fill:none;stroke:{color}"
                        transform="translate(231.362 229.36)scale(2.0936)"
                    /><path
                        d="M15.682-98.764c31.286 4.968 49.627 23.543 40.966 41.488-8.66 17.945-41.044 28.466-72.33 23.498s-49.627-23.543-40.966-41.488c5.51-11.417 21.062-20.337 40.966-23.498"
                        style="fill:none;stroke:{color}"
                        transform="translate(231.362 229.36)scale(2.0936)"
                    /><path
                        d="M45.399-72.987c0 14.382-20.326 26.041-45.399 26.041s-45.399-11.659-45.399-26.041S-25.073-99.028 0-99.028s45.399 11.659 45.399 26.041z"
                        style="fill:none;stroke:{color}"
                        transform="translate(231.362 229.36)scale(2.0936)"
                    /><path
                        d="M30.902-77.906c0 9.79-13.835 17.725-30.902 17.725s-30.902-7.936-30.902-17.725S-17.067-95.631 0-95.631s30.902 7.936 30.902 17.725z"
                        style="fill:none;stroke:{color}"
                        transform="translate(231.362 229.36)scale(2.0936)"
                    /><path
                        d="M15.643-80.907c0 4.956-7.004 8.974-15.643 8.974s-15.643-4.018-15.643-8.974S-8.639-89.881 0-89.881s15.643 4.018 15.643 8.974z"
                        style="fill:none;stroke:{color}"
                        transform="translate(231.362 229.36)scale(2.0936)"
                    /></g
                ><path
                    d="M100 0c0 55.228-44.772 100-100 100S-100 55.228-100 0-55.228-100 0-100 100-55.228 100 0z"
                    style="fill:none;stroke:{color}"
                    transform="translate(231.362 229.36)scale(2.0936)"
                /></g
            ><path
                d="M-577.515 500.605c0 48.308 17.82 86.427 43.434 122.348l-12.458-62.892zm44.677-134.396 27.402-6.813c23.232-35.302 52.58-52.418 82.364-57.992l-43.644 32.6 46.463-11.768 33.359-19.199-7.58-15.878c-54.803 7.432-105.601 35.697-138.364 79.05m30.38 133.776 19.658 40.876 58.378 5.574 31.571 123.867h38.72l44.081-55.74-2.383-34.683c19.062-15.483 33.955-34.682 39.911-59.456l-29.784 7.432-38.72-63.172 8.935-6.193 38.125 55.74 37.528-34.064c-19.658-2.477-32.763-12.386-38.124-29.728l67.909 11.148 24.423 52.025 10.722-69.366 30.38 37.16c-2.866-96.54-70.887-167.22-154.283-190.135 0 21.057-11.318 38.398-27.402 48.308l-21.445-13.006-41.102 24.773 14.296 14.245 22.04-27.251-4.17 33.444c-26.805 0-39.91 4.335-56.59 13.625l-3.574 17.342-18.466-4.336-7.744 21.677 16.084 4.955c8.935-11.768 16.083-19.2 33.358-23.535l17.87 20.438-10.722 3.716 6.553 5.574 9.531-11.767-13.7-19.819c13.7 0 21.444 8.67 26.21 30.347l24.423-37.16 29.784 13.006-2.978 8.052-35.146 3.096v13.626l26.806 1.858-8.34 22.296c-48.846 0-63.143-1.239-73.27-24.154l-40.506-2.478c-29.785 18.58-44.677 42.734-48.847 71.843m57.782-128.202 23.828 6.193v-24.773zm132.243 24.154 11.914-6.813 16.084 34.683-10.723 2.477zm6.553 247.114 10.722 4.336 17.87-42.734-22.635 14.864z"
                style="fill:{color};"
                transform="translate(599.675 -265.203)"
            /></svg
        >
    </div>
{/if}
