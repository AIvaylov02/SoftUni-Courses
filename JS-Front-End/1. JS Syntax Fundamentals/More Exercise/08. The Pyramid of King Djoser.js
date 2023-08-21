function calculateMaterials(baseLength, incrementHeight) {
    const INCREMENT_STEP = 2;
    let lapisPlacementTracker = 1; // will track if the current layer needs to be made out of lapis instead of marble
    let neededStone = 0;
    let neededMarble = 0;
    let neededLapis = 0;
    let neededGold = 0;

    // alternative solution may be to make an array of size (n / 2) + 1, which will hold the area for each level. We will use it's length to get the total height and calculate the materials from its values.

    const SINGLE_BLOCK_LENGHT = 1;
    let currentLayerBase = baseLength;
    let layersCount = 1; // offset with one, will be compensated by the gold level
    while (currentLayerBase > INCREMENT_STEP) {
        const layerArea = currentLayerBase * currentLayerBase;
        const stoneArea = (currentLayerBase - 2 * SINGLE_BLOCK_LENGHT) * (currentLayerBase - 2 * SINGLE_BLOCK_LENGHT);
        const decoratedArea = layerArea - stoneArea;

        neededStone += stoneArea * incrementHeight;
        if (lapisPlacementTracker % 5 === 0) {
            neededLapis += decoratedArea * incrementHeight;
            lapisPlacementTracker = 0;
        }
        else {
            neededMarble += decoratedArea * incrementHeight;
        }

        layersCount++;
        lapisPlacementTracker++;
        currentLayerBase-=INCREMENT_STEP;
    }

    neededGold = currentLayerBase * currentLayerBase * incrementHeight;

    console.log(`Stone required: ${Math.ceil(neededStone)}`);
    console.log(`Marble required: ${Math.ceil(neededMarble)}`);
    console.log(`Lapis Lazuli required: ${Math.ceil(neededLapis)}`);
    console.log(`Gold required: ${Math.ceil(neededGold)}`);
    console.log(`Final pyramid height: ${Math.floor(layersCount * incrementHeight)}`);
}

calculateMaterials(11, 1);
console.log('\n');
calculateMaterials(11, 0.75);
console.log('\n');
calculateMaterials(12, 1);
console.log('\n');
calculateMaterials(23, 0.5);