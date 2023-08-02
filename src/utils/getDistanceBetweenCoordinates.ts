
interface Props {
    lat1: number;
    lon1: number;
    lat2: number;
    lon2: number;
}

function getDistanceBetweenCoordinates({ lat1, lon1, lat2, lon2, }: Props) {
    const R = 6371; // Radius of the earth in kilometers
    const dLat = deg2rad(lat2 - lat1); // Convert latitude difference to radians
    const dLon = deg2rad(lon2 - lon1); // Convert longitude difference to radians

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

export default getDistanceBetweenCoordinates