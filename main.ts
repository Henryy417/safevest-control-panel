radio.setGroup(1)
radio.setTransmitPower(7)
radio.setFrequencyBand(0)

radio.onReceivedString(function (msg) {
    let msgArray = msg.split(":");
    basic.showString("Safevest " + msgArray[0] + " has detected " + msgArray[1] + ".")
})