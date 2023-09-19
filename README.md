# Hub Nest-App template
## Description

Nest framework TypeScript starter repository with hub2 pipeline integration. 


## Development - Local

### Requirements 

- Docker (https://docs.docker.com/get-docker/)
- make (build-essential for debian like, xcode command line tools for macos)

## Running the app

```bash

# In the project root directory :

# Start app 
make run

# get container status
make ps

# Stop app
make stop

# Watch logs
make watch-logs

# Build/rebuild image from scratch
make build

```

## Tests

Test are automatically launched via CI pipeline

## Deployment

Deployment in staging, preprod and prod env is managed via Gitlab CI/CD menu


## Create a project from this template

- Clone this project
```bash
git clone git@gitlab.com:hub_2/templates/nest-app.git your-new-app-name
```

- Remove git
```bash
rm -rf .git
```

- Remove changelog
```bash
rm -rf CHANGELOG.md
```

- Change the project name in the following files
    1) In package.json and package-lock.json, replace nest-app by your new app name
    2) In .gitlab-ci.yml replace
        - All occurences of nest-app-runner (ask your DevOps for the runner name) 
        - APP_NAME variable (the public app name that will be used in the app public url)
    3) In infra/deploy/hub2-local/docker-compose.yml replace nest-app by your app name
    4) In infra/deploy/{preprod,prod,staging}/deployment.tmpl replace all occurances of nest-app by your app name (please validate with DevOps first) 
    5) Update sonar-project.properties according to your app name dans details

- Replace the content of README.md (change description, remove unused parts etc.)

- Init git
```bash
git init
```

- Create the git repository on gitlab
- Add remote and create develop branch
```bash
git remote add origin git@gitlab.com:hub_2/your-new-app-name.git
git add .
git commit -m "Initial commit"
git push -u origin master
git checkout -b develop
git push -u origin develop
```

- Add CI variables

In your project Gitlab page, got to settings > CI/CD > Variables and add the following variables :

    USER_CI_DOCKER_LOGIN => technology@hub2.io
    USER_CI_USERNAME => hub.2

(Uncheck mask and proctect for both)

- DevOps tasks : (Ask your DevOps)
    1) Add ingress rules for staging, preprod and prod clusters (02-ingress.yml)
    2) Add hostnames for ssl certificate generation for staging, preprod and prod clusters (02-ingress.yml)
    3) Create the service files for staging, preprod and prod clusters
    4) Create thte secret files for the environment variables

(Ask your DevOps to create kubernetes services or do it if you have access to Infra project)

