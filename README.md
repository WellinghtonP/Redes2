# 🌐 Sistema de Usuários - Arquitetura 3-Camadas Containerizada

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)](https://nginx.org/)

> 📋 **Aplicação web completa demonstrando arquitetura 3-camadas com containerização Docker, implementando sistema de gerenciamento de usuários com API REST e persistência de dados.**

## 🏗️ Arquitetura do Sistema

```mermaid
graph TB
    subgraph "🌐 Camada de Apresentação"
        A[Nginx Reverse Proxy<br/>:80]
        B[Interface Web HTML]
    end
    
    subgraph "⚙️ Camada Lógica"
        C[Express.js API<br/>:3000]
        D[Endpoints REST]
    end
    
    subgraph "🗄️ Camada de Dados"
        E[PostgreSQL<br/>:5432]
        F[Tabela Usuários]
    end
    
    subgraph "🔧 Ferramentas"
        G[Adminer<br/>:8080]
    end
    
    A --> C
    C --> E
    G --> E
    
    style A fill:#e1f5fe
    style C fill:#f3e5f5
    style E fill:#e8f5e8
    style G fill:#fff3e0
```

## ✨ Características Principais

- 🐳 **100% Containerizado** - Deploy completo com Docker Compose
- 🔄 **Arquitetura 3-Camadas** - Separação clara de responsabilidades
- 🚀 **API REST Completa** - CRUD de usuários com validações
- 🔐 **Conexão Segura** - Pool de conexões PostgreSQL
- ⚡ **Proxy Reverso** - Nginx com balanceamento e health checks
- 📊 **Interface de Administração** - Adminer para gerenciar dados
- 🔍 **Health Monitoring** - Endpoints de status e verificação
- 🌍 **Variáveis de Ambiente** - Configuração flexível

## 🚀 Quick Start

### Pré-requisitos
- Docker e Docker Compose instalados
- Portas 80, 3000, 5432, 8080 disponíveis

### 1️⃣ Clonar e Iniciar
```bash
# Clonar o repositório
git clone <repository-url>
cd projeto-redes2

# Iniciar todos os serviços
docker-compose up -d

# Verificar status dos containers
docker-compose ps
```

### 2️⃣ Verificar Funcionamento
```bash
# API Status
curl http://localhost/api/status

# Listar usuários
curl http://localhost/api/usuarios

# Interface web
# Abrir http://localhost no navegador

# Adminer (gerenciar banco)
# Abrir http://localhost:8080 no navegador
```

## 📡 API Endpoints

| Método | Endpoint | Descrição | Exemplo de Body |
|--------|----------|-----------|-----------------|
| `GET` | `/` | 📖 Documentação da API | - |
| `GET` | `/api/status` | ❤️ Status da conexão | - |
| `GET` | `/api/usuarios` | 👥 Listar todos os usuários | - |
| `GET` | `/api/usuarios/:id` | 👤 Buscar usuário por ID | - |
| `POST` | `/api/usuarios` | ➕ Criar novo usuário | `{"nome": "João", "email": "joao@email.com"}` |
| `DELETE` | `/api/usuarios/:id` | ❌ Remover usuário | - |

### 💡 Exemplos de Uso

```bash
# Criar usuário
curl -X POST http://localhost/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome": "Maria Silva", "email": "maria@email.com"}'

# Buscar usuário específico
curl http://localhost/api/usuarios/1

# Remover usuário
curl -X DELETE http://localhost/api/usuarios/1
```

## 🔧 Configuração e Personalização

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Configurações do Banco de Dados
DB_NAME=meuapp
DB_USER=admin
DB_PASSWORD=senha123

# Configuração da Aplicação
PORT=3000
```

### Estrutura de Diretórios

```
projeto-redes2/
├── 🐳 docker-compose.yml      # Orquestração dos containers
├── 📁 app/                    # Aplicação Node.js
│   ├── 🐳 Dockerfile         # Build da aplicação
│   ├── 📦 package.json       # Dependências Node.js
│   └── 🚀 server.js          # Servidor Express
├── 📁 nginx/                  # Proxy reverso
│   ├── 🐳 Dockerfile         # Build do Nginx
│   ├── ⚙️ nginx.conf         # Configuração proxy
│   └── 📁 html/              # Arquivos estáticos
└── 📁 init.sql/              # Scripts inicialização BD
```

## 🐳 Comandos Docker Úteis

### Gerenciamento de Containers
```bash
# Ver logs em tempo real
docker-compose logs -f app

# Reconstruir containers
docker-compose build --no-cache

# Parar todos os serviços
docker-compose down

# Parar e remover volumes
docker-compose down -v

# Executar comandos no container
docker-compose exec app npm install
docker-compose exec postgres psql -U appuser -d appdb
```

### Desenvolvimento
```bash
# Modo desenvolvimento (com hot reload)
docker-compose exec app npm run dev

# Instalar nova dependência
docker-compose exec app npm install express-validator
```

## 🗄️ Banco de Dados

### Schema da Tabela `usuarios`
```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Acesso Direto ao PostgreSQL
```bash
# Via Docker
docker-compose exec postgres psql -U appuser -d appdb

# Via Adminer (Interface Web)
# http://localhost:8080
# Servidor: postgres
# Usuário: appuser
# Senha: apppassword
# Base de dados: appdb
```

## 🔍 Monitoramento e Logs

### Health Checks
- **Nginx**: `http://localhost/health`
- **API**: `http://localhost/api/status`
- **PostgreSQL**: Interno via `pg_isready`

### Visualização de Logs
```bash
# Logs de todos os serviços
docker-compose logs

# Logs específicos
docker-compose logs nginx
docker-compose logs app
docker-compose logs postgres

# Logs em tempo real
docker-compose logs -f --tail=50
```

## 🛡️ Segurança e Boas Práticas

### Configurações de Segurança
- ✅ Variáveis de ambiente para credenciais
- ✅ Rede isolada entre containers
- ✅ Health checks para alta disponibilidade
- ✅ Restart automático dos serviços
- ✅ Validação de entrada de dados
- ✅ Tratamento de erros SQL (duplicação, etc.)

### Recomendações para Produção
```yaml
# Adicionar ao docker-compose.yml
environment:
  NODE_ENV: production
  
# Remover portas de debug
ports:
  - "80:80"  # Manter apenas HTTP
  
# Configurar volumes persistentes
volumes:
  - postgres-data:/var/lib/postgresql/data
```

## 🚀 Deploy e Produção

### Deploy Rápido
```bash
# Produção com build otimizado
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Backup do banco
docker-compose exec postgres pg_dump -U appuser appdb > backup.sql

# Restore do banco
docker-compose exec -T postgres psql -U appuser appdb < backup.sql
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

- 📧 **Issues**: [GitHub Issues](https://github.com/seu-usuario/projeto-redes2/issues)
- 📚 **Documentação**: Este README.md
- 🐳 **Docker**: [Documentação Oficial](https://docs.docker.com/)
- 🟢 **Node.js**: [Documentação Express](https://expressjs.com/)

---

<div align="center">

**🎯 Desenvolvido com foco em arquitetura limpa e boas práticas de containerização**

[![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/seu-usuario)
[![Docker](https://img.shields.io/badge/Powered%20by-Docker-blue.svg)](https://www.docker.com/)

</div>