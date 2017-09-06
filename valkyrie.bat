@echo off

if "%1" == "" (
	echo notice: you need to set destination slack subdomain.
)
if "%2" == "" (
	echo notice: you need to set your email address.
)

node main.js
emojipacks.cmd -s "%1" -e "%2" -y exported.yaml

