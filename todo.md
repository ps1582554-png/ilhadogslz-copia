# Project TODO

- [x] Definir identidade visual responsiva com grafite, preto, laranja e amarelo mostarda
- [x] Aplicar a logo fornecida na navegação e na composição visual da página inicial
- [x] Integrar as fotos fornecidas dos cachorros-quentes via armazenamento do projeto
- [x] Criar página inicial pública com hero, proposta de valor e chamadas para pedido
- [x] Criar cardápio público contendo exclusivamente itens da categoria cachorro-quente
- [x] Adicionar botão de pedido pelo WhatsApp em cada item e nos principais CTAs
- [x] Implementar seções públicas de localização, horários, delivery, FAQ e contato
- [x] Criar estrutura de banco para itens do cardápio e conteúdo editável do site
- [x] Criar procedimentos públicos para leitura do cardápio e conteúdo
- [x] Criar procedimentos protegidos por administrador para adicionar, editar e remover itens e seções
- [x] Criar área administrativa protegida para gerenciar produtos, preços, descrições e fotos
- [x] Criar área administrativa para editar textos e seções da página inicial
- [x] Adicionar testes Vitest para regras de cardápio exclusivo e permissões administrativas
- [x] Validar responsividade em desktop e mobile
- [x] Validar links e mensagens pré-preenchidas do WhatsApp
- [x] Revisar acessibilidade, estados vazios, carregamento e erros
- [x] Salvar checkpoint final após todas as tarefas concluídas
- [x] Orientar o cliente sobre como acessar e editar o site pelo painel

## Histórico

- Escopo atualizado para vender exclusivamente cachorro-quente; demais categorias e itens ficam fora do produto.
- Cliente solicitou área administrativa protegida para alterar, adicionar e remover itens, preços, descrições, fotos e textos/seções.

## Dados confirmados

- Marca: IlhaDogSLZ
- Telefone/WhatsApp: (98) 98404-2852
- Endereço: Estrada de Ribamar, nº 470, Anil, dentro da Vila Gastrô Anil, São Luís/MA
- Horários: terça a quinta e domingo, 18h–23h; sexta e sábado, 18h–0h; fechado às segundas
- Entrega: São Luís
- Pedido mínimo: R$ 20,00
- Pagamentos: dinheiro, Pix e cartão
- Canais adicionais: Anota AI e iFood
- Depoimentos: não inserir avaliações fictícias; aguardar conteúdo real autorizado
- Categorias permitidas no cardápio: somente cachorro-quente
- Imagens fornecidas pelo cliente: logo e três fotos de cachorro-quente

## Decisões de implementação

- O pedido será finalizado externamente pelo WhatsApp; o site não processará pagamentos nem armazenará dados bancários.
- O painel usará autenticação existente e procedimentos administrativos com controle de função.
- Fotos serão armazenadas fora do diretório público do projeto e referenciadas pelas URLs persistentes do armazenamento.
- O cardápio inicial será composto por dados editoriais da marca, sem avaliações, preços ou itens inventados como depoimentos reais.

- [x] Implementar seção pública de FAQ com as perguntas confirmadas
- [x] Expandir conteúdo editável para múltiplas seções da página inicial
- [x] Fortalecer a regra e os testes de cardápio exclusivo de cachorro-quente
- [x] Executar captura e revisão específica em viewport mobile
- [x] Adicionar estados de carregamento, erro e vazio e tratamento de erro nas mutações administrativas

- [x] Implementar validação real no backend para aceitar somente itens de cachorro-quente
- [x] Adicionar estados explícitos de vazio e erro no Home e no Admin sem depender de fallback visual

- [x] Implementar restrição estrutural fixa para que o cardápio aceite somente cachorro-quente
- [x] Remover fallback visual da Home em erro/loading e exibir estados dedicados

- [x] Corrigir o link do WhatsApp para abrir diretamente a conversa da loja em dispositivos móveis e desktop
- [x] Exibir acesso claro ao painel administrativo e instruções dentro do próprio site
- [x] Permitir adicionar fotos pelo painel com upload seguro para o armazenamento do projeto
- [x] Melhorar os controles de adicionar, editar, ativar/desativar e remover itens do cardápio
- [x] Adicionar testes para o link do WhatsApp e upload/edição do cardápio

- [x] Adicionar controle explícito para ativar ou desativar itens do cardápio
- [x] Criar testes Vitest para upload de imagem e mutations de criação/edição do cardápio

- [x] Adicionar testes das mutations menu.create e menu.update para permissão e payload inválido
- [x] Adicionar teste da mutation media.uploadImage para controle de acesso e caminho feliz com upload simulado

- [x] Adicionar teste Vitest para menu.update com categoria inválida e erro BAD_REQUEST

- [x] Tornar o fluxo de troca de foto mais visível e guiado dentro do painel
- [x] Adicionar um guia de acesso sem código para painel, código e GitHub
- [x] Verificar e documentar o status de permissão administrativa do usuário

## Registro desta cópia independente

- [x] Registrar que este projeto é uma cópia independente, sem continuidade automática de tarefas do projeto de origem
- [x] Confirmar o escopo funcional atualmente presente: cardápio exclusivo de hot dogs, pedidos por WhatsApp, painel administrativo protegido e upload de imagens
- [x] Confirmar a base técnica atualmente presente: React 19, Tailwind 4, Express 4, tRPC 11, Drizzle ORM/MySQL e Manus OAuth
- [ ] Aguardar a próxima solicitação do usuário antes de iniciar novas alterações nesta cópia

> Os itens herdados do projeto de origem permanecem como histórico; nenhuma nova tarefa será executada sem solicitação explícita.

- [x] Conectar esta cópia independente ao GitHub e verificar o resultado da integração
- [ ] Criar um repositório privado no GitHub para esta cópia e enviar o código atual
