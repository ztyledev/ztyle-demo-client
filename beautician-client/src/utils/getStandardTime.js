export const getStandardTime = (time) => {
    
    var timeSplit = time.split(':');
    
    var hours = timeSplit[0];
    var minutes = timeSplit[1];
    var meridian;

    if (hours > 12) {
        meridian = 'PM';
        hours -= 12;

    }
    else {
        meridian = 'AM';

    }

    const stdTime = `${hours}:${minutes}:${meridian}`;
    
    return stdTime

}