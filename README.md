# Kaiware

Note: Very much a work in progress

## Running

1. Clone repo
2. `npm install`
3. Connect your phone to your computer and make sure it shows up with `adb devices`
4. Forward if you haven't done so already. `adb forward tcp:6000 localfilesystem:/data/local/debugger-socket`
5. `npm start`
