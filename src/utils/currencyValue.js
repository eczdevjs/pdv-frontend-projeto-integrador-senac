export  const toCurrency =(amount)  => {
    if(!Number(amount)) return;
    return Intl.NumberFormat('en-US', { style: "currency", currency: 'BRL' }).format(amount);
}


