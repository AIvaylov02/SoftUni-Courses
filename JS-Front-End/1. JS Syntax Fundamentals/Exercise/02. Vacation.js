function CalculatePrice (groupSize, groupType, weekDay) {
    const FRIDAY_STUDENTS_PRICE_PER_PERSON = 8.45;
    const FRIDAY_BUSINESS_PRICE_PER_PERSON = 10.90;
    const FRIDAY_REGULAR_PRICE_PER_PERSON = 15.0;

    const SATURDAY_STUDENTS_PRICE_PER_PERSON = 9.80;
    const SATURDAY_BUSINESS_PRICE_PER_PERSON = 15.60;
    const SATURDAY_REGULAR_PRICE_PER_PERSON = 20;

    const SUNDAY_STUDENTS_PRICE_PER_PERSON = 10.46;
    const SUNDAY_BUSINESS_PRICE_PER_PERSON = 16;
    const SUNDAY_REGULAR_PRICE_PER_PERSON = 22.50;

    let personPrice = 0.0;

    switch (groupType) {
        case "Students":
            switch (weekDay) {
                case "Friday":
                    personPrice = FRIDAY_STUDENTS_PRICE_PER_PERSON
                break;
                case "Saturday":
                    personPrice = SATURDAY_STUDENTS_PRICE_PER_PERSON;
                    break;
                default:
                    personPrice = SUNDAY_STUDENTS_PRICE_PER_PERSON;
            }

            const MIN_STUDENTS_NEEDED = 30;
            if (groupSize >= MIN_STUDENTS_NEEDED) {
                const STUDENTS_DISCOUNT_PERCENT = 0.15;
                personPrice *= (1-STUDENTS_DISCOUNT_PERCENT);
            }
            break;

        case "Regular":
            switch (weekDay) {
                case "Friday":
                    personPrice = FRIDAY_REGULAR_PRICE_PER_PERSON
                break;
                case "Saturday":
                    personPrice = SATURDAY_REGULAR_PRICE_PER_PERSON;
                    break;
                default:
                    personPrice = SUNDAY_REGULAR_PRICE_PER_PERSON;
            }

            const REGULAR_PEOPLE_LOWER_BOUND = 10;
            const REGULAR_PEOPLE_UPPER_BOUND = 20;
            if (groupSize >= REGULAR_PEOPLE_LOWER_BOUND && groupSize <= REGULAR_PEOPLE_UPPER_BOUND) {
                const STUDENTS_DISCOUNT_PERCENT = 0.05;
                personPrice *= (1-STUDENTS_DISCOUNT_PERCENT);
            }

            break;

        default:  // BUSINESS
            switch (weekDay) {
                case "Friday":
                    personPrice = FRIDAY_BUSINESS_PRICE_PER_PERSON
                break;
                case "Saturday":
                    personPrice = SATURDAY_BUSINESS_PRICE_PER_PERSON;
                    break;
                default:
                    personPrice = SUNDAY_BUSINESS_PRICE_PER_PERSON;
            }

            const MIN_BUSINESSMEN_NEEDED = 100;
            if (groupSize >= MIN_BUSINESSMEN_NEEDED )
                groupSize -= 10;
    }

    let totalPrice = personPrice * groupSize;
    console.log(`Total price: ${totalPrice.toFixed(2)}`);
}