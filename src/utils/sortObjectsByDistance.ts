interface Coordinates {
    latitude: number;
    longitude: number;
}

interface MyObject {
    lng: number;
    lat: number;
}

function sortObjectsByDistance(objects: MyObject[], myLatitude: number, myLongitude: number): MyObject[] {
    const distance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const radius = 6371; // Earth's radius in kilometers
        const latDiff = toRadian(lat2 - lat1);
        const lonDiff = toRadian(lon2 - lon1);

        const a =
            Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
            Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) * Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return radius * c; // Distance in kilometers
    };

    const toRadian = (value: number) => {
        return (value * Math.PI) / 180; // Converts degree to radian
    };

    // Sort objects by distance
    return objects.sort((obj1, obj2) => {
        const distanceToObj1 = distance(myLatitude, myLongitude, obj1.lat, obj1.lng);
        const distanceToObj2 = distance(myLatitude, myLongitude, obj2.lat, obj2.lng);

        return distanceToObj1 - distanceToObj2;
    });
}

export {
    sortObjectsByDistance
}