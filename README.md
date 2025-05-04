# 🎮 furia-webapp

Frontend do desafio da vaga de estágio na FURIA — **Know Your Fan**.

Este projeto representa a interface web para engajar e conhecer melhor os fãs da organização, permitindo login com redes sociais, preferências de jogos e eventos, e conectando a comunidade FURIA em um só lugar.

---

## 🚀 Tecnologias

Este projeto foi desenvolvido com:

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)
- [Fort Awesome](https://fortawesome.com/)

---

## 🛠️ Funcionalidades

- Login com Discord e Twitch
- Conexão de redes sociais
- Cadastro e personalização de perfil com:
  - Dados pessoais
  - Endereço
  - Jogos de interesse
  - Tipos de eventos preferidos (Online, Campeonatos, Meetups)
- Interface responsiva e com identidade visual FURIA
- Integração com API REST

---



## ⚙️ Instalação

Clone o projeto e acesse a pasta:

```bash
git clone https://github.com/seu-usuario/furia-webapp.git
cd furia-webapp
```

Instale as dependências:

```bash
npm install
```

Configure as variáveis de ambiente (exemplo no arquivo .env.example)

Execute o servidor localmente:

```bash
npm run dev
```

## 🔐 Autenticação

A autenticação é feita por OAuth2 com redirecionamento. O backend lida com o fluxo e retorna um token que é armazenado no front localmente (sessionStorage).

## 🧠 Estrutura de pastas

```bash
src/
│
├── components/         # Componentes reutilizáveis
├── pages/              # Páginas principais
├── hooks/              # Custom hooks
├── services/           # Requisições à API
├── context/            # Contexto de autenticação
├── mocks/              # Arquivos mockados
└── Routes.tsx          # Arquivo de rotas
└── index.css           # Estilos globais
└── App.tsx             # Arquivo principal
```

## 🙋‍♂️ Autor
Feito com 💜 por Samuel Bernardes para o desafio da FURIA.

