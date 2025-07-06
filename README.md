# 💱 Movement Token Swap CLI Tool

A CLI-based tool for **automated token swapping** on the [Movement Network](https://movementlabs.xyz), using the **Mosaic Router** smart contract. This tool allows you to swap:
- `MOVE → USDT.e`
- `MOVE → USDC.e`

with options for repeated execution and randomized delay between swaps.

---

## ⚙️ Requirements

- Node.js `v20.15.0`
- NPM `v10+`
- Git (for cloning repo)

---

## 📦 Installation & Setup Guide

### 1. Install Node.js (v20.15.0)
### 2. Download project:
```bash
git clone https://github.com/18110282/movement-chain-mosaic-swap.git
```
### 3. Open folder in cmd or terminal in Visual Code, run:
```bash
npm install
```
### 4. Configure your account: Edit the config.js file and paste your private key
 `   RAW_PRIVATE_KEY: "YOUR_PRIVATE_KEY",`

## ▶️ Usage
Once installed and configured, simply run:
```bash
node ./swap.js
```

***If multiple swaps are chosen, the tool adds random delays (20–45 seconds) between swaps (except the last one).




