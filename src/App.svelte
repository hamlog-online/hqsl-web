<script lang="ts">
    import { setContext } from "svelte";
    import HQSL from "./lib/HQSL.svelte";

    // Read in configuration variables.

    function fetchConfig(
        source: string,
        name: string,
        def: any,
        mode: "id" | "class"
    ) {
        switch (mode) {
            case "id":
                const target = document.getElementById(source);
                setContext(name, def);
                if (target) {
                    setContext(name, JSON.parse(target.innerText));
                }
                break;
            case "class":
                let collection: string[] = [];
                for (const chunk of document.getElementsByClassName(source)) {
                    collection.push(
                        chunk.innerHTML
                            .split(/\r?\n/)
                            .map((x) => x.trim())
                            .join("\n")
                    );
                }
                if (collection.length == 0) {
                    collection = def;
                }
                setContext(name, collection);
                break;
            default:
                break;
        }
    }

    fetchConfig("trusted-key", "trustedkeys", [], "class");

    fetchConfig(
        "used-keyservers",
        "keyservers",
        ["https://" + window.location.hostname],
        "id"
    );

    fetchConfig("callbook", "callbook", "https://www.qrz.com/db/", "id");
    fetchConfig("verifier", "verifier", "https://hqsl.net/h", "id");
</script>

<div class="d-flex align-items-center min-vh-100">
    <!-- slice(1) because window.location.hash includes the # itself. -->
    <HQSL qslString={window.location.hash.slice(1)} />
</div>
