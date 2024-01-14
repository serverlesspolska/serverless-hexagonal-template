#!/usr/bin/env bash

# This is an example, should be customize to meet ones needs
# Powered by `ajv-cmd`
# $ ajv --help

bundle () {
  ajv validate ${1} --valid \
    --strict true --coerce-types array --all-errors true --use-defaults empty
  ajv transpile ${1} \
  --strict true --coerce-types array --all-errors true --use-defaults empty -o ${1%.json}.js
}

for file in src/*/schema.*.json; do
  bundle $file
done
