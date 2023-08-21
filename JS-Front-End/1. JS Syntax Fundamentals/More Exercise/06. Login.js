function login(inputArr) {
    const username = inputArr[0];

    function reverseString(str) {
        return (str.split('').reverse()).join('');
    }

    const searchedPassword = reverseString(username);
    const ALLOWED_PASSWORD_GUESSES = 4;
    for (let i = 1; i < inputArr.length; i++) {
        if (inputArr[i] === searchedPassword) {
            console.log(`User ${username} logged in.`);
            break;
        }
        else {
            if (ALLOWED_PASSWORD_GUESSES === i) {
                console.log(`User ${username} blocked!`)
                return;
            }
            else {
                console.log("Incorrect password. Try again.");
            }
        }
    }
}

login(['Acer','login','go','let me in','recA']);
login(['momo','omom']);
login(['sunny','rainy','cloudy','sunny','not sunny']);