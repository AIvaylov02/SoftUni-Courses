function DetermineAgeRange(age) {
    const MIN_VALID_AGE = 0;
    const BABY_MAX_AGE = 2;
    const CHILD_MAX_AGE = 13;
    const TEEN_MAX_AGE = 19;
    const ADULT_MAX_AGE = 65;

    if (age < MIN_VALID_AGE)
        console.log("out of bounds")
    else if (age <= BABY_MAX_AGE)
        console.log("baby")
    else if (age <= CHILD_MAX_AGE)
        console.log("child")
    else if (age <= TEEN_MAX_AGE)
        console.log("teenager")
    else if (age <= ADULT_MAX_AGE)
        console.log("adult")
    else 
        console.log("elder")
}