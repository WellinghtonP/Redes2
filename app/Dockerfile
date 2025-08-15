FROM node:18-alpine

# Instalar git para clonar repositório
RUN apk add --no-cache git

# Definir diretório de trabalho
WORKDIR /usr/src/app

# Variável de ambiente para o repositório Git
ARG GIT_REPO
ENV GIT_REPO=${GIT_REPO}

# Clonar o repositório (descomente quando tiver o repositório)
# RUN git clone ${GIT_REPO} .

# Por enquanto, copiar os arquivos locais
COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Expor a porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]