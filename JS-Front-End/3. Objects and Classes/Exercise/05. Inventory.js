function HeroesRegister(arr) {
    function createHero(line) {
        [name, level, items] = line.split(' / ');
        return {name, level, items};
    }
    
    function printHero(hero) {
        console.log(`Hero: ${hero.name}`);
        console.log(`level => ${hero.level}`);
        console.log(`items => ${hero.items}`);
    }

    // function merge(arr, left, mid, right) {
    //     let leftArraySize = mid - left + 1;
    //     let rightArraySize = right - mid;

    //     let leftArray = [];
    //     let rightArray = [];

    //     // make deep copy of the items in order to replace them in the original array without information mixing
    //     for (let i = 0; i < leftArraySize; i++)
    //         leftArray[i] = JSON.parse(JSON.stringify(arr[left + i]));
    //     for (let i = 0; i < rightArraySize; i++)
    //         rightArray[i] = JSON.parse(JSON.stringify(arr[mid + 1 + i]));

    //     let leftCurrIndex = 0;
    //     let rightCurrIndex = 0;

    //     while (leftCurrIndex < leftArraySize && rightCurrIndex < rightArraySize) {
    //         const comparingResult = leftArray[leftCurrIndex].level - rightArray[rightCurrIndex].level;
    //         if (comparingResult <= 0) {
    //             arr[leftCurrIndex + rightCurrIndex] = leftArray[leftCurrIndex];
    //             leftCurrIndex++;
    //         } else {
    //             arr[leftCurrIndex + rightCurrIndex] = rightArray[rightCurrIndex];
    //             rightCurrIndex++;
    //         }
    //     }

    //     while (leftCurrIndex < leftArraySize) {
    //         arr[leftCurrIndex + rightCurrIndex] = leftArray[leftCurrIndex];
    //         leftCurrIndex++;
    //     }
    //     while (rightCurrIndex < rightArraySize) {
    //         arr[leftCurrIndex + rightCurrIndex] = rightArray[rightCurrIndex];
    //         rightCurrIndex++;
    //     }

    // }

    // function mergeSort(arr, left, right) {
    //     if (left >= right)
    //         return;
    //     let mid = Math.floor(left + (right - left) / 2);
    //     mergeSort(arr, left, mid);
    //     mergeSort(arr, mid + 1, right);
    //     merge(arr, left, mid, right);
    // }

    let heroes = []
    for (let line of arr)
        heroes.push(createHero(line));
    const sortedHeroes = heroes.sort((a, b) => a.level - b.level);
    //mergeSort(heroes, 0, heroes.length - 1); // bug with test case 2
    for (let hero of sortedHeroes)
        printHero(hero);
}

HeroesRegister([
    'Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara'
    ]
    );
console.log('\n');
HeroesRegister([
    'Batman / 2 / Banana, Gun',
    'Superman / 18 / Sword',
    'Poppy / 28 / Sentinel, Antara'
    ]
    );