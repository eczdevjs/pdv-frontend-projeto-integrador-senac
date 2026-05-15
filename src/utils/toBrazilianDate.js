export const toBrazilianDate = (date) => {
    
    if(!validate(date)) return;
    
    const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short'
    });

    return dateFormatter.format(date);
}

const validate = (date) => {
    return date instanceof Date && !isNaN(date);
}