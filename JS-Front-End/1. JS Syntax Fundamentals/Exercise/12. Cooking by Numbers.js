function CookNumbers(numberRaw, ...operations) {
    let number = parseInt(numberRaw);

    for (let operation of operations) {
        switch (operation) {
            case 'dice':
                number = Math.sqrt(number);
                break;
            case 'spice':
                number++;
                break;
            case 'chop':
                number /= 2;
                break;
            case 'bake':
                number *= 3;
                break;
            case 'fillet':
                number *= 0.8;
                break;
        }
        console.log(number);
    }
}