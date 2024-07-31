// Build the single TopoJSON file from GeoJSON originals we're working from.
// This packs every GeoJSON file into a separate TopoJSON object,
// named as the file, so they can be then used directly as is.

import { exec } from "child_process";
import fs from "fs";

const maps = [];

for (const fn of fs.readdirSync("geojson")) {
    if (fn.endsWith(".json")) {
        console.log(fn);
        maps.push("geojson/" + fn);
    }
}

exec(`geo2topo -o src/geodata/topology.json ${maps.join(" ")}`);
