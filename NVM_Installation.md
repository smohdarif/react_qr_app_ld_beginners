# Node Version Manager (NVM) Installation Guide

Follow these steps to install and use NVM and Node.js on your Mac:

---

## 1. Install NVM using Homebrew

```sh
brew install nvm
```

---

## 2. Update Your Shell Profile

Add the following lines to your `~/.zshrc` or `~/.bash_profile`:

```sh
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # Loads nvm
[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # Loads nvm completion
```

Then, reload your shell:

```sh
source ~/.zshrc
# or
source ~/.bash_profile
```

---

## 3. Install Node.js (Latest LTS Version)

```sh
nvm install node
```

---

## 4. Verify Installations

```sh
nvm --version
node --version
npm --version
```

---

## 5. List Available Node Versions

```sh
nvm list
```

---

## 6. Switch to a Specific Node Version (e.g., 16.18)

```sh
nvm use 16.18
```

---

## 7. Install Project Dependencies

Run this inside your project directory:

```sh
npm i
```

---

## 8. (If Needed) Install with Legacy Peer Deps

```sh
npm install --legacy-peer-