(() => {
  "use strict";
  const phases = window.GAME_PHASES || [];
  const $ = (id) => document.getElementById(id);
  const STORAGE_KEY = "arquivo001-progress-v1";
  const TRACK_ID = "3RA49IdQ7YFBebZ78mLgcf";
  const welcome = $("welcome-window"), inbox = $("inbox-window");
  let phaseIndex = 0;
  let progress = loadProgress();
  const normalized = (s) => String(s).trim().toLocaleUpperCase("pt-BR");

  function loadProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return { phase1: saved.phase1 === true, phase2: saved.phase2 === true };
    } catch (_) { return { phase1: false, phase2: false }; }
  }
  function saveProgress() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch (_) { /* o jogo continua nesta sessão */ }
  }
  function showWelcome() { inbox.classList.add("hidden"); welcome.classList.remove("hidden"); }
  function showInbox() { welcome.classList.add("hidden"); inbox.classList.remove("hidden"); }
  function showEnding() {
    showInbox();
    $("mail-subject").textContent = "Sincronização concluída.";
    $("mail-intro").textContent = "";
    $("mail-clue").textContent = "";
    $("phase-label").textContent = "STATUS DO SISTEMA";
    $("phase-subtitle").textContent = "Registros disponíveis";
    $("question").textContent = "";
    $("answer-form").classList.add("hidden");
    $("hint-button").classList.add("hidden");
    $("feedback").textContent = "";
    $("attachment").classList.add("hidden");
    $("next-phase").classList.add("hidden");
    const card = document.querySelector(".puzzle-card");
    card.innerHTML = `<div class="puzzle-heading"><span>✓</span><div><strong>Sincronização concluída.</strong><small>Os registros disponíveis foram recuperados com sucesso.</small></div></div><div class="file-status"><p>✓ Arquivo 001 — Recuperado</p><p>✓ Arquivo 002 — Recuperado</p><p>… Próximo registro — Indisponível</p></div><p>Existem arquivos que ainda não foram disponibilizados.</p><p>Volte em outro momento para verificar se há novas mensagens.</p><button class="classic-button" id="close-ending" type="button">Fechar correio</button>`;
    $("status-text").textContent = "Sincronização concluída.";
    $("inbox-count").textContent = "0";
    $("close-ending").addEventListener("click", showWelcome);
  }
  function renderPhase() {
    const p = phases[phaseIndex];
    if (!p) return;
    $("phase-label").textContent = p.label;
    $("phase-subtitle").textContent = p.subtitle;
    $("mail-subject").textContent = p.subject;
    $("mail-intro").textContent = p.intro;
    $("mail-clue").textContent = p.clue;
    $("question").textContent = p.question;
    $("reward-title").textContent = p.rewardTitle;
    $("reward-text").textContent = p.rewardText;
    $("answer").value = "";
    $("answer").type = p.type === "spotify" ? "url" : "text";
    $("answer").inputMode = p.type === "spotify" ? "url" : "text";
    $("answer").placeholder = p.type === "spotify" ? "https://open.spotify.com/track/..." : "Digite a resposta...";
    $("answer").autocomplete = p.type === "spotify" ? "url" : "off";
    $("feedback").textContent = "";
    $("feedback").className = "feedback";
    $("attachment").classList.add("hidden");
    $("next-phase").classList.add("hidden");
    $("answer-form").classList.remove("hidden");
    $("hint-button").classList.toggle("hidden", p.type !== "answer");
    $("hint-button").disabled = false;
    $("hint-button").textContent = "Solicitar dica";
    $("status-text").textContent = `Mensagem ${phaseIndex + 1} de ${phases.length}`;
    $("inbox-count").textContent = String(phaseIndex === 0 ? (progress.phase1 ? 1 : 2) : 1);
  }

  $("open-mail").addEventListener("click", () => {
    if (progress.phase2) { showEnding(); return; }
    phaseIndex = progress.phase1 ? 1 : 0;
    showInbox(); renderPhase();
  });
  $("close-mail").addEventListener("click", showWelcome);
  $("hint-button").addEventListener("click", () => {
    $("feedback").textContent = "🔒 Dica bloqueada\nPreço da dica: um beijo 😘";
    $("feedback").className = "feedback hint-feedback";
    $("hint-button").disabled = true;
    $("hint-button").textContent = "Dica solicitada";
  });
  $("answer-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const p = phases[phaseIndex];
    const value = $("answer").value.trim();
    if (!value) return;
    let accepted = false;
    if (p.type === "spotify") {
      try {
        const url = new URL(value);
        accepted = url.protocol === "https:" && ["open.spotify.com", "www.open.spotify.com"].includes(url.hostname) && url.pathname.split("/").includes(TRACK_ID);
      } catch (_) { accepted = false; }
    } else {
      accepted = p.answers.some((answer) => normalized(answer) === normalized(value));
    }
    if (!accepted) {
      $("feedback").textContent = p.type === "spotify" ? "× Este link não corresponde ao arquivo esperado. Confira o link do Spotify e tente novamente." : "× Senha incorreta. Tente novamente ou solicite uma dica.";
      $("feedback").className = "feedback";
      return;
    }
    if (phaseIndex === 0) { progress.phase1 = true; saveProgress(); }
    if (phaseIndex === 1) { progress.phase2 = true; saveProgress(); }
    $("feedback").textContent = p.rewardTitle;
    $("feedback").className = "feedback success";
    $("reward-title").textContent = p.rewardTitle;
    $("reward-text").textContent = p.rewardText;
    $("attachment").classList.remove("hidden");
    $("answer-form").classList.add("hidden");
    $("hint-button").classList.add("hidden");
    const next = $("next-phase");
    next.classList.remove("hidden");
    next.textContent = phaseIndex === 0 ? "Continuar" : "Concluir sincronização";
    next.onclick = () => {
      if (phaseIndex === 0) { phaseIndex = 1; renderPhase(); }
      else { showEnding(); }
    };
  });

  function updateClock() {
    const d = new Date(), days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    $("clock").textContent = `${days[d.getDay()]} ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
  }
  updateClock();
  if (progress.phase2) showEnding(); else showWelcome();
})();
