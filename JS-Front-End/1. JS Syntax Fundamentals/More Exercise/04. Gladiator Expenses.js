function calculateFightsPrice(lostFights, helmetPrice, swordPrice, shieldPrice, armorPrice) {
    const FIGHTS_NEEDED_TO_BREAK_HELMET = 2;
    const brokenHelmets = Math.floor(lostFights / FIGHTS_NEEDED_TO_BREAK_HELMET);
    const FIGHTS_NEEDED_TO_BREAK_SWORD = 3;
    const brokenSwords = Math.floor(lostFights / FIGHTS_NEEDED_TO_BREAK_SWORD);
    
    function gcd(num1, num2) {
        while (num2 !== 0) {
            let t = num2;
            num2 = num1 % num2;
            num1 = t;
        }
        return num1;
    }


    function lcm(num1, num2) {
        return Math.abs(num1 * num2) / gcd(num1, num2);
    }

    const FIGHTS_NEEDED_TO_BREAK_SHIELD = lcm(FIGHTS_NEEDED_TO_BREAK_HELMET, FIGHTS_NEEDED_TO_BREAK_SWORD);
    const brokenShields = Math.floor(lostFights / FIGHTS_NEEDED_TO_BREAK_SHIELD);
    const FIGHTS_NEEDED_TO_BREAK_ARMOR = FIGHTS_NEEDED_TO_BREAK_SHIELD * 2;
    const brokenArmor = Math.floor(lostFights / FIGHTS_NEEDED_TO_BREAK_ARMOR);

    const expenses = brokenHelmets * helmetPrice + brokenSwords * swordPrice + brokenShields * shieldPrice + brokenArmor * armorPrice;
    console.log(`Gladiator expenses: ${expenses.toFixed(2)} aureus`);
}

calculateFightsPrice(7, 2, 3, 4, 5);
calculateFightsPrice(23, 12.50, 21.50, 40, 200);