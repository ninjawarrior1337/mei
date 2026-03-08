#!/bin/sh

echo "Installing Rustup..."
# Install Rustup (compiler)
export RUSTUP_INIT_SKIP_PATH_CHECK=yes

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
# Adding binaries to path
. "/rust/env"

echo "Installing wasm-pack..."
# Install wasm-pack
curl https://drager.github.io/wasm-pack/installer/init.sh -sSf | sh

echo "Starting native build"
pnpm native-build

echo "Starting frontend build"
astro build
