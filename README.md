# 🚗 Estoque Concessionária — Front-end

Interface web em **Angular** para o sistema de gestão de carros, marcas e acessórios em uma concessionária, com autenticação JWT e controle de acesso por perfil de usuário.

> **Back-end:** [carros-back](https://github.com/rizzoka/back-Estoque-de-Concessionaria) — necessário rodar em `http://localhost:8080`

## 🛠️ Tecnologias

- Angular 17+ / TypeScript
- MDB Angular UI Kit (Bootstrap 5)
- SweetAlert2
- jwt-decode

### Instalação
 
```bash
# Clone o repositório
git clone https://github.com/rizzoka/Estoque-de-Concessionaria.git
cd biblioteca-aula
 
# Instale as dependências
npm install
 
# Inicie o servidor de desenvolvimento
ng serve
```

## Configuração do Servidor

Edite `src/environments/environment.development.ts`:

```typescript
export const environment = {
  SERVIDOR: "http://localhost:8080"
};
```

## Perfis de Acesso

| Perfil | Acesso |
|--------|--------|
| `ADMIN` | Carros, Marcas e Acessórios |
| `USER`  | Marcas e Acessórios |

## 📁 Estrutura do Projeto
 
```
src/
├── app/
│   ├── auth/                        # Módulo de autenticação
│   │   ├── login.ts                 # Modelo de credenciais
│   │   ├── usuario.ts               # Modelo de usuário
│   │   ├── login.service.ts         # Serviço de login e JWT
│   │   ├── login.guard.ts           # Guard de rotas protegidas
│   │   └── http-interceptor.service.ts  # Interceptor com token Bearer
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── login/               # Tela de login
│   │   │   ├── menu/                # Navbar responsiva
│   │   │   └── principal/           # Layout base com router-outlet
│   │   │
│   │   ├── carros/
│   │   │   ├── carroslist/          # Listagem com modal de edição
│   │   │   └── carrosdetails/       # Formulário de cadastro/edição
│   │   │
│   │   ├── marcas/
│   │   │   ├── marcaslist/          # Listagem com modal de edição
│   │   │   └── marcasdetails/       # Formulário de cadastro/edição
│   │   │
│   │   └── acessorios/
│   │       ├── acessoriolist/       # Listagem com modal de edição
│   │       └── acessoriodetails/    # Formulário de cadastro/edição
│   │
│   ├── models/
│   │   ├── carro.ts                 # Entidade Carro (com Marca e Acessórios)
│   │   ├── marca.ts                 # Entidade Marca
│   │   └── acessorio.ts             # Entidade Acessório
│   │
│   ├── services/
│   │   ├── carro.service.ts         # HTTP client para /api/carro
│   │   ├── marca.service.ts         # HTTP client para /api/marca
│   │   └── acessorio.service.ts     # HTTP client para /api/acessorio
│   │
│   ├── app.routes.ts                # Definição de rotas
│   └── app.config.ts                # Configuração global (HTTP, animações)
│
└── environments/
    └── environment.development.ts   # URL do servidor back-end
```

### Créditos

Projeto desenvolvido acompanhando o canal [Wellington de Oliveira](https://www.youtube.com/@wellfoz) no YouTube.
