export const extractActiveDays = (days) => {
    
    const activeDaysObj = days.filter(day => day.checked);

    const activeDays = activeDaysObj.map(day => day.name);
    
    return activeDays;

} 


