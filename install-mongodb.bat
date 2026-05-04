@echo off
echo Downloading MongoDB Community for Windows...
powershell -Command "Invoke-WebRequest -Uri 'https://fastdl.mongodb.org/windows/mongodb-community-7.0.14/mongodb-community-7.0.14-1-x86_64.msi' -OutFile mongodb-installer.msi"
echo Install mongodb-installer.msi manually - Complete Setup - Add to PATH
echo After install, run: mkdir data\db
echo mongod --dbpath .\data\db
echo Then run start-server.bat
pause

