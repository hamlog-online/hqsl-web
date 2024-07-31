import { booleanPointInPolygon } from "@turf/boolean-point-in-polygon";

import { geo } from "../geodata/geodata";
import { maidenheadToBoundingBox } from "@hamset/maidenhead-locator";

export function GridZone(zoneName: string, grid: string): any {
    // If we don't actually have a zone list like that we always return null.
    if (Object.getOwnPropertyNames(geo).includes(zoneName)) {
        // First we convert maidenhead to point.
        const box = maidenheadToBoundingBox(grid);
        // Note: turf expects [longitude, latitude], not [lat, lng],
        // so we need to flip it.
        const point = [
            (box[0][1] + box[1][1]) / 2,
            (box[0][0] + box[1][0]) / 2,
        ];

        // Then we just go through our list of zones.
        for (const zone of geo[zoneName].features) {
            // We have a FeatureCollection and all the entries actually are
            // Polygons or MultiPolygons.
            // @ts-expect-error
            if (booleanPointInPolygon(point, zone)) {
                return zone.properties!.zone;
            }
        }
    }
    // We return null if we couldn't find a zone like this,
    // but otherwise we return whatever the zone property on the source geojson data
    // contained.
    return null;
}
