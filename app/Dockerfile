FROM node:18-alpine

# Instalar git e wget para health checks
RUN apk add --no-cache git wget

# Definir diretório de trabalho
WORKDIR /usr/src/app

# Copiar arquivos da aplicação (preferencialmente usar arquivos locais)
COPY package*.json ./
COPY server.js ./

# Instalar dependências da aplicação
RUN npm ci --only=production

# Expor a porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]
