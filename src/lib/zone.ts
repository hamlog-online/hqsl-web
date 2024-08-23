import { booleanPointInPolygon } from "@turf/boolean-point-in-polygon";

import { geo } from "../geodata/geodata";
import { gridToPoint } from "@hamlog/maidenhead";

export function GridZone(zoneName: string, grid: string): any {
    // If we don't actually have a zone list like that we always return null.
    if (Object.getOwnPropertyNames(geo).includes(zoneName)) {
        // First we convert maidenhead to point.
        const gridPoint = gridToPoint(grid);
        // Note: turf expects [longitude, latitude], not [lat, lng].
        const point = [gridPoint.lon, gridPoint.lat];

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
