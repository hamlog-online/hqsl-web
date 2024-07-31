<script lang="ts">
    import { getContext } from "svelte";
    import { HQSL, HQSLOpenPGP, HQSLState } from "hqsl-ts";

    import ADIF from "./ADIF.svelte";
    import PrintButton from "./PrintButton.svelte";
    import QrCode from "./QRCode.svelte";
    import NowrapDate from "./NowrapDate.svelte";
    import CallLink from "./CallLink.svelte";
    import GridMap from "./GridMap.svelte";
    import Spinner from "./Spinner.svelte";
    import VerificationResult from "./VerificationResult.svelte";
    import Clipboard from "./Clipboard.svelte";
    import Zones from "./Zones.svelte";

    export let qslString: string;
    const trustedKeys: string[] = getContext("trustedkeys");
    const keyservers: string[] = getContext("keyservers");
    const verifier: string = getContext("verifier");

    let client: HQSLOpenPGP;
    let card: HQSL;
    let malformedQsl: boolean = false;
    let parsingError: unknown;
    let map: GridMap;
    let cardLink: string = "";
    let fullyValid = false;

    const updateCard = async () => {
        if (!client) {
            client = await HQSLOpenPGP.setup(trustedKeys, keyservers, 2000);
        }
        // Do not start up processing on an empty card.
        if (!qslString) {
            return;
        }
        try {
            card = HQSL.fromString(qslString);
            // And then try to verify it, which will cause an assignment with.
            // verification result...
            card = await client.verify(card);
            if (card.verification?.verdict == HQSLState.Valid) {
                fullyValid = true;
                // Change document title to match, which will also set a file name for print to pdf.
                document.title = `HQSL: ${card.to} de ${card.from} on ${card.displayDate}`;
                // Set a card link.
                cardLink = `${verifier}#${card.toString()}`;
            }
        } catch (error) {
            console.log(error);
            malformedQsl = true;
            fullyValid = false;
            parsingError = error;
        }
    };

    $: if (qslString) {
        updateCard();
    }
</script>

{#if card}
    <div class="container hqsl mx-auto">
        <div class="row">
            <div class="col header">
                {#if fullyValid}
                    <div class="copy-button d-print-none">
                        <Clipboard text={cardLink} />
                    </div>
                    <div class="print-button d-print-none">
                        <ADIF {card} />
                        <PrintButton />
                    </div>
                {/if}
                <p class="sender">
                    <CallLink call={card.from} />
                </p>
                <p><a href="https://hqsl.net">confirms QSO with</a></p>
            </div>
            <div class="col verification d-none d-print-block">
                {#if card.verification?.verdict == undefined}
                    <Spinner
                        cls="text-success"
                        title="Verifying signature..."
                    />
                {:else}
                    <VerificationResult
                        result={card.verification}
                        from={card.from}
                    />
                {/if}
            </div>
            <div class="col d-none d-print-block qrcode">
                <QrCode text={cardLink} size={120} />
            </div>
        </div>
        <div
            class="row align-items-start justify-content-center print-hug-bottom"
        >
            <div class="col-md-8 col-sm-12 table-column">
                <div class="d-none d-md-block d-print-block">
                    <table class="table table-striped-columns table-bordered">
                        <thead>
                            <tr>
                                <th>Station</th>
                                <th>UTC</th>
                                <th>Mode</th>
                                <th>MHz</th>
                                <th
                                    on:click={map.recenter}
                                    style="cursor:pointer;">Location</th
                                >
                                <th>Report</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><CallLink call={card.to} /></td>
                                <td><NowrapDate date={card.displayDate} /></td>
                                <td>{card.mode}</td>
                                <td>{card.freq} ({card.band})</td>
                                <td
                                    on:click={map.recenter}
                                    style="cursor:pointer;"
                                    >{card.where}
                                    <Zones grid={card.where} />
                                </td>
                                <td>{card.signal}</td>
                            </tr>
                            {#if card.extra}
                                <tr>
                                    <td colspan="6">
                                        <b>Extra information:</b>
                                        {card.extra.replace("_", " ")}
                                    </td>
                                </tr>
                            {/if}
                        </tbody>
                    </table>
                </div>

                <div class="d-md-none d-print-none">
                    <table class="table vertable table-bordered pb-2 vertable">
                        <tbody>
                            <tr>
                                <td class="thcol">Station</td>
                                <td><CallLink call={card.to} /></td>
                            </tr>
                            <tr>
                                <td class="thcol">UTC</td>
                                <td>{card.displayDate}</td>
                            </tr>
                            <tr>
                                <td class="thcol">Mode</td>
                                <td>{card.mode}</td>
                            </tr>
                            <tr>
                                <td class="thcol">MHz</td>
                                <td>{card.freq} ({card.band})</td>
                            </tr>
                            <tr on:click={map.recenter} style="cursor:pointer;">
                                <td class="thcol">Location</td>
                                <td
                                    >{card.where}
                                    <Zones grid={card.where} />
                                </td>
                            </tr>
                            <tr>
                                <td class="thcol">Report</td>
                                <td>{card.signal}</td>
                            </tr>

                            {#if card.extra}
                                <tr>
                                    <td class="thcol">Extra:</td>
                                    <td>
                                        {card.extra.replace("_", " ")}
                                    </td>
                                </tr>
                            {/if}
                        </tbody>
                    </table>
                </div>

                <div class="pt-md-4 verification d-print-none">
                    {#if card.verification?.verdict == undefined}
                        <Spinner
                            cls="text-success"
                            title="Verifying signature..."
                        />
                    {:else}
                        <VerificationResult
                            result={card.verification}
                            from={card.from}
                        />
                    {/if}
                </div>
            </div>
            <div class="col-md-4 col-sm-12 d-print-none">
                <div class="pb-2">
                    <GridMap grid={card.where} height="300px" bind:this={map} />
                </div>
            </div>
        </div>
    </div>
{:else if malformedQsl}
    <div class="container">
        <div class="row">
            <p>Malformed HQSL. Something broke in transit!</p>
            <p>{parsingError}</p>
        </div>
    </div>
{:else if qslString}
    <Spinner cls="text-primary" />
{:else}
    <div class="container">
        <div class="row">
            <p>No HQSL was supplied, nothing to verify.</p>
        </div>
    </div>
{/if}

<style lang="scss">
    .sender {
        font-size: 200%;
        font-weight: bold;
    }
    .hqsl {
        border: 1px solid black;
        padding: 1em;
        margin: 2em;
    }
    .vertable {
        td {
            text-align: left;
        }
        tr:nth-child(even) {
            // Actually it would be $table-striped-bg, but svelte's preprocessor is being wonky,
            // and bootstrap is being wonky too.
            --bs-table-bg-type: var(--bs-table-striped-bg);
        }
    }
    .thcol {
        font-weight: bold;
    }

    .header {
        position: relative; // Needed to pin the button to the top right corner
    }

    // This is more than a bit messy, but seems to work.
    @media print {
        .hqsl {
            width: 140mm;
            height: 90mm;
            min-width: 140mm;
            min-height: 90mm;
            border: 1pt dashed black;
            padding: 5mm;
            position: absolute;
            left: 0;
            top: 0;
            margin: 0;

            text-align: left;
            .sender {
                margin-bottom: 0 !important;
                font-size: 25pt;
            }
            .verification {
                padding-top: 1.6mm !important;
                font-size: 10pt;
            }

            table {
                font-size: 9pt;
                margin-left: 0 !important;
                border-color: #000;
            }

            .table-column {
                width: 100%;
            }

            .qrcode {
                text-align: right;
            }

            .print-hug-bottom {
                position: absolute;
                bottom: 0;
                right: 0;
                padding-left: 3mm;
                padding-right: 3mm;
            }
        }
    }
    .print-button {
        position: absolute;
        top: 0;
        right: 0.5em;
        padding: 0;
    }
    .copy-button {
        position: absolute;
        top: 0;
        left: 0.5em;
        padding: 0;
    }
</style>
