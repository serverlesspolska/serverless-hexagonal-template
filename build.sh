#!/usr/bin/env bash

# This build script finds all files with name in format schema.*.json and pre-transpiles the schemas
# from json into mjs files using ajv-cmd. The output files are in the same directory as the source
# json files. They have the same name but different extension.

bundle () {
  ajv validate ${1} --valid \
    --strict=true --coerce-types=array --all-errors --use-defaults=empty
  ajv transpile ${1} \
  --strict=true --coerce-types=array --all-errors --use-defaults=empty -o ${1%.json}.mjs
}

for file in src/*/schema.*.json; do
  bundle $file
done
