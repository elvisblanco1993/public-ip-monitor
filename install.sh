#!/bin/sh

echo "+--------------------------------------------------+";
echo "+ You are about to install the following software: +";
echo "+ - NodeJS                                         +";
echo "+ - NPM                                            +";
echo "+ - Wine                                           +";
echo "+--------------------------------------------------+";

sudo apt install wine npm nodejs;
npm install;
