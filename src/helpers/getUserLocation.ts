

export const getUserLocation = async (): Promise<[number, number]> => {

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            ({coords}) => {
                resolve([coords.longitude, coords.latitude]),
                console.log({coords}, 'coords')
            },
            (err) => {
                alert('error on get location');
                console.error(err);
                reject();
            }
        )
    });
}