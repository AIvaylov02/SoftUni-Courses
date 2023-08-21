function toggle() {
    let buttonElement = document.getElementsByClassName('button')[0];
    if (buttonElement.textContent === "More") {
        // we are now at shrunk form, we need to expand
        buttonElement.textContent = "Less";
        document.getElementById("extra").style.display = 'block';
    }
    else {
        buttonElement.textContent = "More";
        document.getElementById("extra").style.display = 'none';
    }
}