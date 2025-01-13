const getInitials = (fullName) => {
    
    if (!fullName || typeof (fullName) !== "string") {
        return "";
    }

    const names = fullName.trim().split(/\s+/);
    const allinitials = names.map(name => name.charAt(0).toUpperCase());
    const initials = allinitials.slice(0,2);
    
    return initials.join("");



}

module.exports =getInitials