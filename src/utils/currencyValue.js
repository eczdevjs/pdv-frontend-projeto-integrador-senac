export const toCurrency = (amount) => {
    if (isNaN(Number(amount))) return;
    return Intl.NumberFormat('pt-BR', { style: "currency", currency: 'BRL' }).format(amount);
}



