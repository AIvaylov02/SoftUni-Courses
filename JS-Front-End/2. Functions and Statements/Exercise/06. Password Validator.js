function isPasswordValid(password) {
    let problems = [];
    if (password.length < 6 || password.length > 10)
        problems.push("Password must be between 6 and 10 characters");
    
    if (!password.match("^[A-Za-z0-9]+$"))
        problems.push("Password must consist only of letters and digits");

    leftDigits = password.match(/\d+/g);
    let digitsCount = 0;
    if (leftDigits)
        digitsCount = leftDigits.join("").length;

    if (digitsCount < 2)
        problems.push("Password must have at least 2 digits");

    if (problems.length == 0)
        console.log("Password is valid");
    else {
        for (let problem of problems)
            console.log(problem);
    }
}

isPasswordValid('logIn');
isPasswordValid('MyPass123');
isPasswordValid('Pa$s$s1')