class Laptop {
    constructor(info, quality) {
        this.info = JSON.parse(JSON.stringify(info));
        this.isOn = false;
        this.quality = quality;
    }

    
    turnOn() {
        const SWITCH_PENALTY = 1;
        this.isOn = true;
        this.quality -= SWITCH_PENALTY;
    }
    turnOff() {
        const SWITCH_PENALTY = 1;
        this.isOn = false;
        this.quality -= SWITCH_PENALTY;
    }

    showInfo() {
        return JSON.stringify(this.info);
    }

    get price() {
        const START_VALUE = 800;
        const AGE_MULTIPLIER = 2;
        const QUALITY_MULTIPLIER = 0.5;
        return START_VALUE - this.info.age * AGE_MULTIPLIER + this.quality * QUALITY_MULTIPLIER;
    }
}

let info = {producer: "Dell", age: 2, 
brand: "XPS"}
let laptop = new Laptop(info, 10)
laptop.turnOn()
console.log(laptop.showInfo())
laptop.turnOff()
console.log(laptop.quality)
laptop.turnOn()
console.log(laptop.isOn)
console.log(laptop.price)

console.log('\n');
let info1 = {producer: "Lenovo", age: 1, 
brand: "Legion"}
let laptop1 = new Laptop(info1, 10)
laptop1.turnOn()
console.log(laptop1.showInfo())
laptop1.turnOff()
laptop1.turnOn()
laptop1.turnOff()
console.log(laptop1.isOn)
