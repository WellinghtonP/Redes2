FROM nginx:alpine

# Remover configuração padrão
RUN rm /etc/nginx/nginx.conf

# Copiar nossa configuração
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar arquivos HTML para o diretório padrão do Nginx
COPY html/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]