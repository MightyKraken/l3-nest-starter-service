# Prerequisite installations

1. Nodejs(Optional) : https://nodejs.org/en/download
2. Deno(Optional) : https://deno.com/
3. Bun(Optional): https://bun.sh/
4. Docker (Required): https://www.docker.com/
5. Git (Required): https://git-scm.com/downloads
6. VScode (Optional): https://code.visualstudio.com/

# Starter Guide.

1. clone: git clone https://github.com/MightyKraken/l3-nest-starter-service.git (must have git installed)
2. install: `npm install`
3. run: `npm run start`
4. test: `npm run test`
5. lint: `npm run lint`
6. lint:fix: `npm run lint:fix`
7. format: `npm run prettier`
8. build: `npm run build`
9. docker-image-create: `npm run docker-build` or `docker build -t l3-angular-starter-application -f Dockerfile.prod .`
10. run-docker-container: `npm run docker-run` or `docker run --detach --publish 80:80 --name l3-angular-starter-application l3-angular-starter-application`
11. stop-docker-container: `npm run docker-stop` or `docker stop l3-angular-starter-application`
12. delete-docker-container: `npm run docker-container-remove` or `docker rm -f l3-angular-starter-application`
13. delete-docker-image: `npm run docker-image-remove` or `docker rmi -f l3-angular-starter-application`

# Features With Starter Repo

✔

- Nestjs with Docker file ✔
- Prettier eslint setup ✔
- commitlint husky lint-staged support ✔
- Tsconfig configured ✔
- Generic modules and components
- environment setup
- vscode debugger setup ✔
- testing setup
- mongo support
- angular support for mvc

# Important Branches

- nestjs_v11 -> nestjs v11 version compatible
