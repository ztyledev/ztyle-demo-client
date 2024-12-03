export const extractActiveFields = (fields) => {
    
    const activeFieldsObj = fields.filter(field => field.checked);

    const activeFields = activeFieldsObj.map(field => field.name);
    
    return activeFields;

} 