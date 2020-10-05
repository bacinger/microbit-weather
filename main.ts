input.onButtonPressed(Button.A, function () {
    basic.clearScreen()
    basic.showString("T:" + AQbit.readBMETemperature() + " C")
})
input.onButtonPressed(Button.AB, function () {
    basic.clearScreen()
    basic.showString("P:" + AQbit.readPressure() + " hPa")
})
input.onButtonPressed(Button.B, function () {
    basic.clearScreen()
    basic.showString("PM:" + AQbit.readPMS() + " ppm")
})
AQbit.putPMSInPassiveMode()
basic.showIcon(IconNames.Tortoise)
AQbit.connectToWiFiNetwork("Network", "Password")
let Tsr = 0
let Hsr = 0
let Psr = 0
let PMsr = 0
let n = 0
let y = 1
basic.showIcon(IconNames.Pitchfork)
AQbit.sendData(
AQbit.readBMETemperature(),
AQbit.readPressure(),
AQbit.readHumidity(),
AQbit.readPMS(),
"j87jBrEN"
)
basic.showIcon(IconNames.Yes)
basic.pause(1000)
basic.clearScreen()
basic.forever(function () {
    led.plot(0, 1)
    led.plot(4, 3)
    for (let index = 0; index < 13; index++) {
        Tsr = Tsr + AQbit.readBMETemperature()
        Hsr = Hsr + AQbit.readHumidity()
        Psr = Psr + AQbit.readPressure()
        PMsr = PMsr + AQbit.readPMS()
        led.unplot(n, y)
        n = n + 1
        if (n == 5) {
            n = 0
            y = y + 1
        }
        led.plot(0, 1)
        led.plot(4, 3)
        led.plot(n, y)
        basic.pause(60000)
        basic.clearScreen()
    }
    Tsr = Tsr / 13
    Hsr = Hsr / 13
    Psr = Psr / 13
    PMsr = PMsr / 13
    basic.showIcon(IconNames.Pitchfork)
    AQbit.sendData(
    Tsr,
    Psr,
    Hsr,
    PMsr,
    "j87jBrEN"
    )
    Tsr = 0
    Hsr = 0
    Psr = 0
    PMsr = 0
    n = 0
    y = 1
    basic.showIcon(IconNames.Yes)
    basic.pause(1000)
    basic.clearScreen()
})
control.inBackground(function () {
    AQbit.preventSensorBlocking()
})
