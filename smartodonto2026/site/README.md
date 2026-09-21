# SmartOdonto — site institucional

Projeto completo do site institucional da SmartOdonto, composto por frontend responsivo e backend Node.js sem dependências externas.

## Estrutura

```text
smartodonto/
├── assets/smartodonto/  # Logo e imagens clínicas fornecidas
├── index.html           # Estrutura e conteúdo do frontend
├── styles.css           # Estilos-base
├── overrides.css        # Ajustes de layout e galeria horizontal
├── viewer.css           # Modal de imagem e zoom
├── script.js            # Menu mobile, animações e visualização ampliada
├── server.js            # Backend HTTP + API pública
└── package.json
```

## Executar localmente

Requer Node.js 18 ou superior.

```bash
npm start
```

Em seguida, abra `http://localhost:4173`.

## Rotas do backend

- `GET /api/health` — status do serviço.
- `GET /api/clinic` — dados públicos da clínica usados pela aplicação.

O agendamento abre diretamente o WhatsApp da clínica. Não há banco de dados, autenticação ou coleta de dados de pacientes nesta versão, pois esses recursos não foram solicitados.
