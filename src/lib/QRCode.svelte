<script lang="ts">
    import { afterUpdate } from "svelte";
    import makeSvg from "tiny-qrcode-svg";

    export let text = "";
    export let foreground = "#000";
    export let size = 300;

    let svg = "";

    afterUpdate(() => {
        svg = makeSvg(text, { color: foreground, size: size });
    });
</script>

{@html svg}
