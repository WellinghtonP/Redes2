FROM node:18-alpine

# Adiciona git e curl
RUN apk add --no-cache git curl

# Definir diretório de trabalho
WORKDIR /usr/src/app

# Variável de ambiente para o repositório Git
ARG GIT_REPO=https://github.com/WellinghtonP/Redes2.git
ENV GIT_REPO=${GIT_REPO}

# Clonar o repositório Git para dentro do container
RUN git clone ${GIT_REPO} /tmp/repo && \
    cp -r /tmp/repo/app/* . && \
    rm -rf /tmp/repo

# Instalar dependências da aplicação
RUN npm ci --only=production

# Expor a porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]
