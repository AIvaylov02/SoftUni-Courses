function lockedProfile() {
    const buttons = document.getElementsByTagName('button');
    
    for (const button of buttons) {
        button.addEventListener('click', manipulateProfileInfo)
        button.parentElement.getElementsByTagName('div')[0].hidden = true; // set the initial display style of the buttons to none
    }

    function isProfileLocked(profile) {
        return profile.querySelector('input[type="radio"]').checked === true;
    }

    function isProfileExpanded(profile) {
        return profile.getElementsByTagName('div')[0].hidden !== true;
    }

    function manipulateProfileInfo(event) {
        const button = event.currentTarget;
        const profile = button.parentElement;
        console.log(document.getElementById("user1HiddenFields").hidden);
        if (isProfileLocked(profile))
            return;

        // if it is already expanded, shrink it
        if (isProfileExpanded(profile)) {
            // change the button title to show more and shrink the display style
            profile.getElementsByTagName('div')[0].hidden = true;
            button.textContent = "Show more";
        }
        else {
            profile.getElementsByTagName('div')[0].hidden = false;
            button.textContent = "Hide it";
        }
    }

    
}