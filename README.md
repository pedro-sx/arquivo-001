ARQUIVO 001 — GUIA RÁPIDO (ACODE + VERCEL)
==========================================

ARQUIVOS PRINCIPAIS
- index.html: estrutura das telas.
- style.css: visual retrô e adaptação para celular.
- phases.js: textos, perguntas e resposta da fase.
- script.js: validações, navegação e progresso salvo no navegador.

TESTAR NO ACODE
1. Extraia o ZIP para uma pasta chamada arquivo-001.
2. Abra essa pasta no Acode como projeto.
3. Abra index.html e use a pré-visualização.
4. Teste em retrato e paisagem no celular; confirme os campos e botões.
5. Mantenha os nomes dos arquivos exatamente como estão.

PUBLICAR NA VERCEL (RECOMENDADO: GITHUB + VERCEL)
1. Crie um repositório no GitHub chamado arquivo-001.
2. Envie os arquivos index.html, style.css, script.js e phases.js para a raiz do repositório.
   O README.md é opcional. Não deixe os arquivos dentro de uma segunda pasta.
3. Acesse https://vercel.com e entre com sua conta GitHub.
4. Selecione Add New → Project e importe o repositório.
5. Como é um site estático, escolha Other se for solicitado; deixe Build Command vazio.
6. Clique em Deploy. Ao finalizar, abra o endereço .vercel.app no celular e teste tudo.
7. Para atualizar depois, altere os arquivos no Acode, envie as mudanças ao GitHub e a Vercel publicará de novo.

PROGRESSO
- O progresso é guardado no localStorage do navegador do mesmo dispositivo.
- Ao reabrir o site no mesmo navegador, a pessoa continua no ponto alcançado.
- Não sincroniza entre aparelhos ou navegadores diferentes. Limpar os dados do navegador pode apagar o progresso.
- “Fechar correio” volta à tela inicial sem apagar o progresso.

IMPORTANTE SOBRE SEGURANÇA
Este é um site estático: a senha FAC e o identificador da música ficam no JavaScript e podem ser encontrados por alguém que inspecione os arquivos. É adequado para um jogo pessoal casual, não para proteger informações privadas.

CONTEÚDO PRESERVADO
- Fase 01: pergunta aprovada; senha FAC; dica mostra apenas o preço de um beijo, sem revelar resposta.
- Fase 02: valida link HTTPS do Spotify com o ID 3RA49IdQ7YFBebZ78mLgcf; parâmetros de compartilhamento são aceitos.
- Encerramento com os textos de suspense aprovados; nenhum conteúdo de fase futura foi inventado.
