# Kaiware

**Hey! This version of Kaiware is deprecated. Don't worry though, I'm rewriting it with the same features plus a lot more! Check it out over here: [github.com/NothingSpecialDev/kaiware](https://github.com/NothingSpecialDev/kaiware)**

![Screenshot](/promo/screenshot1.png?raw=true)

Note: Very much a work in progress

## Running

Make sure you have the following dependencies installed:

- nodejs `version = 16` (if you manage your nodejs versions with [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm), you can just run `nvm use` or `fnm use` in the repo folder respectively)
- adb

1. Clone repo
2. `npm install`
3. Connect your phone to your computer and make sure it shows up with `adb devices`
4. Forward if you haven't done so already. `adb forward tcp:6000 localfilesystem:/data/local/debugger-socket`
5. `npm start`
