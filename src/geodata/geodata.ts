import type { FeatureCollection } from "geojson";
import zonedata from "./topology.json";
import { feature } from "topojson-client";

export const geo: { [key: string]: FeatureCollection } = {};

for (const zoneName in zonedata.objects) {
    // Ok, I give up fighting typescript on this,
    // @types/topojson-client might simply be wrong.
    // This really returns a FeatureCollection given the assumed data.

    // @ts-expect-error
    geo[zoneName] = feature(zonedata, zoneName);
}

export const zones = Object.getOwnPropertyNames(geo);
