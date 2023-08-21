function CheckArrayForPalindromes(arr) {
    function ReverseNumber(num) {
        let reversed = 0;
        while (num != 0) {
            reversed = reversed * 10 + num % 10;
            num = Math.floor(num / 10);
        }
        return reversed;
    }
    
    function IsPalindrome(num) {
        return num === ReverseNumber(num);
    }

    for (let num of arr) {
        console.log(IsPalindrome(num));
    }
}

CheckArrayForPalindromes([123,323,421,121]);
console.log()
CheckArrayForPalindromes([32,2,232,1010]);