export const formatDate = (isoString) => {
    if(!isoString) return "-";
    const date = new Date(isoString);
    if(Number.isNaN(date.getTime())) return "-";

    return date.toLocaleDateString("az-AZ", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};