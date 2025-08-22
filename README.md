## Tecnologias

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Heroicons (para ícones)

## Getting Started

1. Clone o repo: `git clone https://github.com/WaismanDourado/plataforma-credito-rural-frontend.git`
2. Instale dependências: `npm install`
3. Rode o dev server: `npm run dev`
4. Abra http://localhost:3000

## Estrutura

plataforma-credito-rural-frontend/
├── app/ # Rotas e páginas do App Router (obrigatório no Next.js)
│ ├── layout.tsx # Layout raiz global (já existe)
│ ├── page.tsx # Página principal (landing page, já existe)
│ ├── **api/** # Rotas de API (para server-side fetching, ex: proxy para backend ML)
│ │ └── **proxy.ts** # Exemplo: Rota para chamar API de previsão de crédito
│ ├── **dashboard/** # Nova página para dashboard de análises ML (futuro)
│ │ └── page.tsx
│ └── **error.tsx** # Página de erro global (sugestão para robustez)
├── components/ # Componentes reutilizáveis (movidos de app/components/)
│ ├── Header.tsx # Cabeçalho (já existe)
│ ├── Footer.tsx # Rodapé (já existe)
│ ├── **Button.tsx** # Componente genérico de botão (sugestão para reutilização)
│ └── **FormInput.tsx** # Componente para inputs de formulários (útil para dados agrícolas)
├── sections/ # Seções específicas da landing page (movidos de app/sections/)
│ ├── HeroSection.tsx # Seção hero (já existe)
│ ├── FeaturesSection.tsx # Seção de features (já existe)
│ ├── HowItWorksSection.tsx # Seção de como funciona (já existe)
│ ├── TestimonialsSection.tsx # Seção de depoimentos (já existe)
│ └── CTASection.tsx # Seção de chamada para ação (já existe)
├── lib/ # Funções utilitárias e lógica de negócios (nova pasta!)
│ ├── **api.ts** # Funções para chamadas API (ex: fetch para modelo ML no backend)
│ ├── **utils.ts** # Funções helper (ex: formatação de dados rurais)
│ └── **types.ts** # Definições de tipos TypeScript (ex: interface para dados de crédito)
├── public/ # Assets estáticos (já existe)
│ ├── favicon.ico # Ícone do site (sugestão: adicione um personalizado)
│ └── **images/** # Pasta para imagens (ex: logos agrícolas, ícones de ML)
│ └── logo.png
├── styles/ # Estilos globais e Tailwind (já existe)
│ └── globals.css # CSS global (já existe)
├── **hooks/** # Custom hooks React (nova pasta para interatividade)
│ └── **useAuth.ts** # Exemplo: Hook para autenticação (se precisar integrar login)
├── **services/** # Serviços para integração externa (nova, focada em ML)
│ └── **mlService.ts** # Serviço para chamar previsões de ML do backend
├── .env.local # Variáveis de ambiente (já existe)
├── .gitignore # Arquivos ignorados pelo Git (já existe)
├── eslint.config.mjs # Configuração ESLint (já existe)
├── next.config.ts # Configuração Next.js (já existe)
├── package-lock.json # Lockfile de dependências (já existe)
├── package.json # Dependências e scripts (já existe)
├── postcss.config.js # Configuração PostCSS (já existe)
├── README.md # Documentação do projeto (já atualizado por você!)
├── tailwind.config.js # Configuração Tailwind (já existe)
├── tsconfig.json # Configuração TypeScript (já existe)
└── **tests/** # Pasta para testes (nova sugestão, use Jest ou Vitest)
└── **page.test.tsx** # Exemplo: Teste para a landing page

## Integração com Backend
