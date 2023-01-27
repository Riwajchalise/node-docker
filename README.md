# node-docker
This docker repo is reference to the note I have create to understend concept of docker for absolute beginner to full production workflow and is under progress.

If you are running locally and have docker installed:
Prod: ```docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d```
Dev: ```docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d```

# API end point for signup

http://localhost:3000/api/v1/users/signup

{
    "username": "riwaj",
    "password": "thisispass"
}

# Api endpoint for login 

http://localhost:3000/api/v1/users/login

{
    "username": "riwaj",
    "password": "thisispass"
}
