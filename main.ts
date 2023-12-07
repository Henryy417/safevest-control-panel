radio.setGroup(1)
radio.setTransmitPower(7)
radio.setFrequencyBand(0)

radio.onReceivedString(function (msg) {
    music.ringTone(Note.C);
    let msgArray = msg.split(":");
    basic.showString("SafeVest " + msgArray[0] + " has detected " + msgArray[1] + ".");
})

// Button click counter
let buttonClickCount = 0;
let lastButtonClick = 0;
input.onButtonPressed(Button.A, () => {
    if (input.runningTime() - lastButtonClick > 2000) {
        lastButtonClick = 0;
    }
    buttonClickCount++;
    lastButtonClick = input.runningTime();
});
function getButtonClickCount(): number | void {
    if (input.runningTime() - lastButtonClick > 2000) {
        let temp = buttonClickCount;
        buttonClickCount = 0;
        return temp;
    }
}

basic.forever(() => {
    let notifyID = getButtonClickCount();
    if (typeof notifyID == "number" && notifyID > 0)
    {
        radio.sendNumber(notifyID);
        basic.showString("SafeVest " + notifyID + " notified.");
        pause(5000);
        basic.clearScreen();
    }
});