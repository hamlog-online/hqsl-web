<script lang="ts">
    import { HQSLState, type HQSLVerification } from "hqsl-ts";

    import KeyLink from "./KeyLink.svelte";

    export let result: HQSLVerification;
    export let from: string | undefined;

    let certifierName: string;
    let certifierFingerprint: string;
    let signerFingerprint: string;
    let signerName: string;

    const getKeyData = async () => {
        if (result.certifierKey) {
            certifierName =
                (await result.certifierKey?.getPrimaryUser()).user.userID
                    ?.userID || "";
            certifierFingerprint = result.certifierKey.getFingerprint();
        }
        if (result.signerKey) {
            signerFingerprint = result.signerKey.getFingerprint();

            // We default to reporting the primary UserID here.
            signerName =
                (await result.signerKey.getPrimaryUser()).user.userID?.userID ||
                "";

            // But for UX purposes, we should supply the relevant call sign userID
            // if possible, so let's try doing that.
            const keyCalls = result.signerKey
                .getUserIDs()
                .filter((x) => x.startsWith("Amateur Radio Callsign: "));

            if (!from) {
                return;
            }
            outerLoop: for (const chunk of from.split("/")) {
                for (const callUID of keyCalls) {
                    const call = callUID.split(": ")[1];
                    if (call == chunk) {
                        signerName = callUID;
                        break outerLoop;
                    }
                }
            }
        }
    };

    $: if (result) {
        getKeyData();
    }
</script>

{#if result.verdict == HQSLState.Valid}
    <p class="text-success">
        Signed by:<br /><span class="font-monospace"
            ><KeyLink fp={signerFingerprint} uid={signerName} /></span
        ><br />
        Certified by: <br /><span class="font-monospace"
            ><KeyLink fp={certifierFingerprint} uid={certifierName} /></span
        >
    </p>
{:else if result.verdict == HQSLState.NotSigned}
    <p class="text-info">This HQSL is not signed.</p>
{:else if result.verdict == HQSLState.Invalid}
    <p class="text-danger">
        Signature could not be verified:<br />
        The QSL data was altered after signing or signature was made incorrectly.
    </p>
{:else if result.verdict == HQSLState.KeyNotFound}
    <p class="text-warning">
        Signature could not be verified:<br />
        {#if !window.navigator.onLine}
            Keyservers cannot be queried while offline.
        {:else}
            Signer key not available.
        {/if}
    </p>
{:else if result.verdict == HQSLState.KeyNotCertified}
    <p class="text-warning">
        Signed by:<br /><span class="font-monospace"
            ><KeyLink fp={signerFingerprint} uid={signerName} /></span
        >.
        <br />
        This key is not certified for this callsign and QSO time.
    </p>
{/if}
