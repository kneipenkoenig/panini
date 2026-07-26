const PIN_STORAGE_KEY = "sticker-tausch-2026-pin";
const SHARE_PARAM = "share";
const TEAM_PARAM = "team";
const APP_VERSION = "0.5.7";
const HISTORY_LIMIT = 8;

const TEAMS = [
  { id: "fwc", label: "Sondersticker", group: "Spezial", aliases: ["fwc", "fcw", "sondersticker", "intro", "legenden", "specials", "historie"], flag: "⭐" },
  { id: "mex", label: "Mexiko", group: "Gruppe A", aliases: ["mx", "mex", "mexiko"], flag: "🇲🇽" },
  { id: "rsa", label: "Südafrika", group: "Gruppe A", aliases: ["rsa", "suedafrika", "südafrika"], flag: "🇿🇦" },
  { id: "kor", label: "Südkorea", group: "Gruppe A", aliases: ["kor", "suedkorea", "südkorea", "korea"], flag: "🇰🇷" },
  { id: "cze", label: "Tschechien", group: "Gruppe A", aliases: ["cze", "tschechien"], flag: "🇨🇿" },
  { id: "can", label: "Kanada", group: "Gruppe B", aliases: ["can", "kanada"], flag: "🇨🇦" },
  { id: "bih", label: "Bosnien-Herzegowina", group: "Gruppe B", aliases: ["bih", "bosnien", "bosnien-herzegowina"], flag: "🇧🇦" },
  { id: "qat", label: "Katar", group: "Gruppe B", aliases: ["qat", "katar"], flag: "🇶🇦" },
  { id: "sui", label: "Schweiz", group: "Gruppe B", aliases: ["sui", "schweiz"], flag: "🇨🇭" },
  { id: "usa", label: "USA", group: "Gruppe C", aliases: ["us", "usa", "vereinigte staaten"], flag: "🇺🇸" },
  { id: "par", label: "Paraguay", group: "Gruppe D", aliases: ["par", "paraguay"], flag: "🇵🇾" },
  { id: "aus", label: "Australien", group: "Gruppe D", aliases: ["aus", "australien"], flag: "🇦🇺" },
  { id: "tur", label: "Türkei", group: "Gruppe D", aliases: ["tur", "tuerkei", "türkei"], flag: "🇹🇷" },
  { id: "bra", label: "Brasilien", group: "Gruppe D", aliases: ["br", "bra", "brasilien"], flag: "🇧🇷" },
  { id: "mar", label: "Marokko", group: "Gruppe D", aliases: ["ma", "mar", "marokko"], flag: "🇲🇦" },
  { id: "hai", label: "Haiti", group: "Gruppe C", aliases: ["hai", "haiti"], flag: "🇭🇹" },
  { id: "sco", label: "Schottland", group: "Gruppe D", aliases: ["sco", "schottland"], flag: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}" },
  { id: "ger", label: "Deutschland", group: "Gruppe E", aliases: ["de", "ger", "deutschland"], flag: "🇩🇪" },
  { id: "cuw", label: "Curaçao", group: "Gruppe E", aliases: ["cuw", "curacao", "curaçao"], flag: "🇨🇼" },
  { id: "civ", label: "Elfenbeinküste", group: "Gruppe E", aliases: ["civ", "elfenbeinkueste", "elfenbeinküste"], flag: "🇨🇮" },
  { id: "ecu", label: "Ecuador", group: "Gruppe E", aliases: ["ecu", "ecuador"], flag: "🇪🇨" },
  { id: "ned", label: "Niederlande", group: "Gruppe F", aliases: ["ned", "holland", "niederlande"], flag: "🇳🇱" },
  { id: "jpn", label: "Japan", group: "Gruppe F", aliases: ["jp", "jpn", "japan"], flag: "🇯🇵" },
  { id: "swe", label: "Schweden", group: "Gruppe F", aliases: ["swe", "schweden"], flag: "🇸🇪" },
  { id: "tun", label: "Tunesien", group: "Gruppe F", aliases: ["tun", "tunesien"], flag: "🇹🇳" },
  { id: "bel", label: "Belgien", group: "Gruppe G", aliases: ["bel", "belgien"], flag: "🇧🇪" },
  { id: "egy", label: "Ägypten", group: "Gruppe G", aliases: ["egy", "aegypten", "ägypten"], flag: "🇪🇬" },
  { id: "irn", label: "Iran", group: "Gruppe G", aliases: ["irn", "iran"], flag: "🇮🇷" },
  { id: "nzl", label: "Neuseeland", group: "Gruppe G", aliases: ["nzl", "neuseeland"], flag: "🇳🇿" },
  { id: "esp", label: "Spanien", group: "Gruppe H", aliases: ["es", "esp", "spanien"], flag: "🇪🇸" },
  { id: "cpv", label: "Kap Verde", group: "Gruppe H", aliases: ["cpv", "kap verde", "cabo verde"], flag: "🇨🇻" },
  { id: "ksa", label: "Saudi-Arabien", group: "Gruppe H", aliases: ["ksa", "saudi", "saudi-arabien"], flag: "🇸🇦" },
  { id: "uru", label: "Uruguay", group: "Gruppe H", aliases: ["uru", "uruguay"], flag: "🇺🇾" },
  { id: "fra", label: "Frankreich", group: "Gruppe I", aliases: ["fr", "fra", "frankreich"], flag: "🇫🇷" },
  { id: "sen", label: "Senegal", group: "Gruppe I", aliases: ["sen", "senegal"], flag: "🇸🇳" },
  { id: "irq", label: "Irak", group: "Gruppe I", aliases: ["irq", "irak"], flag: "🇮🇶" },
  { id: "nor", label: "Norwegen", group: "Gruppe I", aliases: ["nor", "norwegen"], flag: "🇳🇴" },
  { id: "arg", label: "Argentinien", group: "Gruppe J", aliases: ["ar", "arg", "argentinien"], flag: "🇦🇷" },
  { id: "alg", label: "Algerien", group: "Gruppe J", aliases: ["alg", "algerien"], flag: "🇩🇿" },
  { id: "aut", label: "Österreich", group: "Gruppe J", aliases: ["aut", "oesterreich", "österreich"], flag: "🇦🇹" },
  { id: "jor", label: "Jordanien", group: "Gruppe J", aliases: ["jor", "jordanien"], flag: "🇯🇴" },
  { id: "por", label: "Portugal", group: "Gruppe K", aliases: ["pt", "por", "portugal"], flag: "🇵🇹" },
  { id: "cod", label: "DR Kongo", group: "Gruppe K", aliases: ["cod", "dr kongo", "kongo dr", "demokratische republik kongo"], flag: "🇨🇩" },
  { id: "uzb", label: "Usbekistan", group: "Gruppe K", aliases: ["uzb", "usbekistan"], flag: "🇺🇿" },
  { id: "col", label: "Kolumbien", group: "Gruppe K", aliases: ["col", "kolumbien"], flag: "🇨🇴" },
  { id: "eng", label: "England", group: "Gruppe L", aliases: ["uk", "eng", "england"], flag: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}" },
  { id: "cro", label: "Kroatien", group: "Gruppe L", aliases: ["cro", "kroatien"], flag: "🇭🇷" },
  { id: "gha", label: "Ghana", group: "Gruppe L", aliases: ["gha", "ghana"], flag: "🇬🇭" },
  { id: "pan", label: "Panama", group: "Gruppe L", aliases: ["pan", "panama"], flag: "🇵🇦" }
];

const ALBUM_TOTAL_STICKERS = 980;
const TEAM_STICKER_LIMIT = 20;
const STATUS_LABELS = {
  wanted: "Gesucht",
  duplicate: "Doppelt",
  owned: "Vorhanden"
};

const state = {
  mode: "edit",
  activeSection: "teams",
  currentView: "all",
  filterTeam: "all",
  teamStickerFilter: "all",
  teamSortBy: "label",
  searchTerm: "",
  teamSearchTerm: "",
  stickers: {},
  history: [],
  authPin: "",
  authError: "",
  shareSlug: "",
  ownerName: "",
  me: null,
  matches: null,
  people: null,
  editingPersonId: null,
  isSaving: false,
  isReady: false
};

const elements = {
  wantedCount: document.querySelector("#wantedCount"),
  duplicateCount: document.querySelector("#duplicateCount"),
  fillPercent: document.querySelector("#fillPercent"),
  versionNote: document.querySelector("#versionNote"),
  teamFilter: document.querySelector("#teamFilter"),
  searchInput: document.querySelector("#searchInput"),
  shareButton: document.querySelector("#shareButton"),
  copyShareButton: document.querySelector("#copyShareButton"),
  copyWantedButton: document.querySelector("#copyWantedButton"),
  copyDuplicateButton: document.querySelector("#copyDuplicateButton"),
  shareBox: document.querySelector("#shareBox"),
  shareUrl: document.querySelector("#shareUrl"),
  listContainer: document.querySelector("#listContainer"),
  listSummary: document.querySelector("#listSummary"),
  activeFilters: document.querySelector("#activeFilters"),
  toast: document.querySelector("#toast"),
  teamCardTemplate: document.querySelector("#teamCardTemplate"),
  pillTemplate: document.querySelector("#pillTemplate"),
  teamOverviewGrid: document.querySelector("#teamOverviewGrid"),
  teamOverviewSummary: document.querySelector("#teamOverviewSummary"),
  teamQuickSearch: document.querySelector("#teamQuickSearch"),
  teamSearchResults: document.querySelector("#teamSearchResults"),
  teamSortButtons: document.querySelectorAll("[data-team-sort]"),
  teamPagePanel: document.querySelector("#teamPagePanel"),
  teamDetailGroup: document.querySelector("#teamDetailGroup"),
  teamDetailTitle: document.querySelector("#teamDetailTitle"),
  teamDetailStats: document.querySelector("#teamDetailStats"),
  teamStickerGrid: document.querySelector("#teamStickerGrid"),
  teamStickerButtons: document.querySelectorAll("[data-team-sticker-filter]"),
  backToTeamsButton: document.querySelector("#backToTeamsButton"),
  teamCopyLinkButton: document.querySelector("#teamCopyLinkButton"),
  teamCopyWantedButton: document.querySelector("#teamCopyWantedButton"),
  teamCopyDuplicateButton: document.querySelector("#teamCopyDuplicateButton"),
  teamCopyBothButton: document.querySelector("#teamCopyBothButton"),
  pinGate: document.querySelector("#pinGate"),
  authForm: document.querySelector("#authForm"),
  authPinInput: document.querySelector("#authPinInput"),
  authStatus: document.querySelector("#authStatus"),
  syncStatus: document.querySelector("#syncStatus"),
  meStatus: document.querySelector("#meStatus"),
  historyStrip: document.querySelector("#historyStrip"),
  historyLog: document.querySelector("#historyLog"),
  undoButton: document.querySelector("#undoButton"),
  stickerCheckInput: document.querySelector("#stickerCheckInput"),
  stickerCheckResult: document.querySelector("#stickerCheckResult"),
  stickerCheckCopyButton: document.querySelector("#stickerCheckCopyButton"),
  peopleNavButton: document.querySelector("#peopleNavButton"),
  matchesRefreshButton: document.querySelector("#matchesRefreshButton"),
  matchesStatus: document.querySelector("#matchesStatus"),
  matchesCanGet: document.querySelector("#matchesCanGet"),
  matchesCanGive: document.querySelector("#matchesCanGive"),
  peopleForm: document.querySelector("#peopleForm"),
  peopleNameInput: document.querySelector("#peopleNameInput"),
  peoplePinInput: document.querySelector("#peoplePinInput"),
  peopleRefreshButton: document.querySelector("#peopleRefreshButton"),
  peopleStatus: document.querySelector("#peopleStatus"),
  peopleListContainer: document.querySelector("#peopleListContainer")
};

init().catch(error => {
  console.error(error);
  showToast("Die App konnte nicht gestartet werden.");
});

async function init() {
  renderVersion();
  populateTeamOptions();
  wireEvents();
  registerServiceWorker();

  const params = new URLSearchParams(window.location.search);
  const shareSlug = params.get(SHARE_PARAM);

  if (shareSlug) {
    state.mode = "share";
    state.shareSlug = shareSlug;
    await loadPublicCollection(shareSlug);
    const teamParam = params.get(TEAM_PARAM);
    if (teamParam && TEAMS.some(team => team.id === teamParam)) {
      state.filterTeam = teamParam;
      state.activeSection = "team";
    }
  } else {
    const storedPin = window.localStorage.getItem(PIN_STORAGE_KEY) || "";
    elements.authPinInput.value = storedPin;
    if (storedPin) {
      await authenticateAndLoad(storedPin, true);
    }
  }

  state.isReady = true;
  render();
  document.body.classList.remove("app-booting");
}

function renderVersion() {
  elements.versionNote.textContent = `Version v${APP_VERSION}`;
}

function populateTeamOptions() {
  const allTeamsOption = [{ value: "all", label: "Alle Teams" }, ...TEAMS.map(team => ({ value: team.id, label: team.label }))];
  elements.teamFilter.innerHTML = allTeamsOption.map(team => `<option value="${team.value}">${team.label}</option>`).join("");
}

function wireEvents() {
  document.querySelectorAll("[data-section-tab]").forEach(button => {
    button.addEventListener("click", () => {
      state.activeSection = button.dataset.sectionTab;
      if (state.activeSection === "list") {
        state.currentView = "all";
      }
      renderSectionTabs();
      if (state.activeSection === "matches" && !state.matches) {
        loadMatches();
      }
      if (state.activeSection === "people" && !state.people) {
        loadPeople();
      }
    });
  });

  elements.teamStickerButtons.forEach(button => {
    button.addEventListener("click", () => {
      state.teamStickerFilter = button.dataset.teamStickerFilter;
      renderTeamDetail();
    });
  });

  elements.teamQuickSearch.addEventListener("input", event => {
    state.teamSearchTerm = event.target.value.trim().toLowerCase();
    renderTeamOverview();
  });

  elements.teamSortButtons.forEach(button => {
    button.addEventListener("click", () => {
      state.teamSortBy = button.dataset.teamSort;
      updateTeamSortToggle();
      renderTeamOverview();
    });
  });

  elements.backToTeamsButton.addEventListener("click", () => {
    state.filterTeam = "all";
    state.activeSection = "teams";
    elements.teamFilter.value = "all";
    render();
  });

  elements.authForm.addEventListener("submit", async event => {
    event.preventDefault();
    const pin = elements.authPinInput.value.trim();
    await authenticateAndLoad(pin, false);
  });

  elements.authPinInput.addEventListener("input", () => {
    if (state.authError) {
      state.authError = "";
      renderMode();
    }
  });

  elements.searchInput.addEventListener("input", event => {
    state.searchTerm = event.target.value.trim().toLowerCase();
    renderList();
  });

  elements.teamFilter.addEventListener("change", event => {
    state.filterTeam = event.target.value;
    renderList();
  });

  elements.shareButton.addEventListener("click", async () => {
    const ok = await ensureShareSlug();
    if (!ok) {
      return;
    }
    elements.shareUrl.value = buildShareUrl();
    elements.shareBox.classList.remove("is-hidden");
    elements.shareBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    showToast("Freigabelink bereit.");
  });

  elements.copyShareButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(elements.shareUrl.value);
      showToast("Link kopiert.");
    } catch (error) {
      showToast("Kopieren nicht möglich. Link bitte manuell kopieren.");
    }
  });

  elements.copyWantedButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildWhatsappList("wanted"));
      showToast("Gesucht-Liste kopiert.");
    } catch (error) {
      showToast("Gesucht-Liste konnte nicht kopiert werden.");
    }
  });

  elements.copyDuplicateButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildWhatsappList("duplicate"));
      showToast("Doppelt-Liste kopiert.");
    } catch (error) {
      showToast("Doppelt-Liste konnte nicht kopiert werden.");
    }
  });

  const teamCopyHandlers = [
    [elements.teamCopyWantedButton, "wanted", "Fehlende"],
    [elements.teamCopyDuplicateButton, "duplicate", "Doppelte"],
    [elements.teamCopyBothButton, "both", "Fehlende & Doppelte"]
  ];
  teamCopyHandlers.forEach(([button, kind, label]) => {
    button.addEventListener("click", async () => {
      if (state.filterTeam === "all") {
        return;
      }
      try {
        await navigator.clipboard.writeText(buildTeamWhatsappText(state.filterTeam, kind));
        showToast(`${label} (${teamLabel(state.filterTeam)}) kopiert.`);
      } catch (error) {
        showToast("Liste konnte nicht kopiert werden.");
      }
    });
  });

  elements.teamCopyLinkButton.addEventListener("click", async () => {
    if (state.filterTeam === "all") {
      return;
    }
    const ok = await ensureShareSlug();
    if (!ok) {
      return;
    }
    try {
      await navigator.clipboard.writeText(buildShareUrl(state.filterTeam));
      showToast(`Link für ${teamLabel(state.filterTeam)} kopiert.`);
    } catch (error) {
      showToast("Link konnte nicht kopiert werden.");
    }
  });

  elements.undoButton.addEventListener("click", () => {
    undoLastAction();
  });

  elements.stickerCheckInput.addEventListener("input", () => {
    renderStickerCheck();
  });

  elements.stickerCheckCopyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildStickerCheckResultText());
      showToast("Ergebnis kopiert.");
    } catch (error) {
      showToast("Ergebnis konnte nicht kopiert werden.");
    }
  });

  elements.matchesRefreshButton.addEventListener("click", () => {
    loadMatches();
  });

  elements.peopleRefreshButton.addEventListener("click", () => {
    loadPeople();
  });

  elements.peopleForm.addEventListener("submit", async event => {
    event.preventDefault();
    await createPersonRequest();
  });
}

async function authenticateAndLoad(pin, silent) {
  if (!pin) {
    updateSyncStatus("Bitte PIN eingeben.");
    if (!silent) {
      showToast("Bitte zuerst eine PIN eingeben.");
    }
    return;
  }

    updateSyncStatus("Verbinde mit der Sammlung …");
    try {
      const response = await fetch("/api/collection", {
        headers: authHeaders(pin)
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status >= 500) {
          throw new Error("Server-Konfiguration fehlt. Bitte Cloudflare DB/PIN prüfen.");
        }
        throw new Error(payload.error || "PIN ungültig");
      }

    state.authPin = pin;
    state.authError = "";
    state.stickers = payload.stickers || {};
    state.shareSlug = payload.shareSlug || "";
    state.me = payload.me || null;
    state.matches = null;
    state.people = null;
    window.localStorage.setItem(PIN_STORAGE_KEY, pin);
    updateSyncStatus("Sammlung geladen und bereit.");
    render();
    if (!silent) {
      showToast("Sammlung entsperrt.");
    }
  } catch (error) {
    state.authPin = "";
    state.authError = error.message || "Verbindung fehlgeschlagen.";
    state.stickers = {};
    state.me = null;
    window.localStorage.removeItem(PIN_STORAGE_KEY);
    updateSyncStatus(error.message || "Verbindung fehlgeschlagen.");
    render();
    if (!silent) {
      showToast(error.message || "PIN oder Server nicht erreichbar.");
    }
  }
}

async function loadPublicCollection(shareSlug) {
  updateSyncStatus("Öffentliche Liste wird geladen …");
  const response = await fetch(`/api/public?share=${encodeURIComponent(shareSlug)}`);
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || "Freigabe konnte nicht geladen werden.");
  }
  state.stickers = payload.stickers || {};
  state.ownerName = payload.ownerName || "";
  updateSyncStatus(state.ownerName ? `Öffentliche Liste von ${state.ownerName} geladen.` : "Öffentliche Liste geladen.");
}

function updateTeamStickerToggle() {
  elements.teamStickerButtons.forEach(button => {
    button.classList.toggle("is-active", button.dataset.teamStickerFilter === state.teamStickerFilter);
  });
}

function updateTeamSortToggle() {
  elements.teamSortButtons.forEach(button => {
    button.classList.toggle("is-active", button.dataset.teamSort === state.teamSortBy);
  });
}

function renderSectionTabs() {
  document.querySelectorAll(".bottom-nav__item").forEach(button => {
    if (!button.dataset.sectionTab) {
      return;
    }
    button.classList.toggle("is-active", button.dataset.sectionTab === state.activeSection);
  });

  document.querySelectorAll("[data-section-panel]").forEach(panel => {
    const section = panel.getAttribute("data-section-panel");
    panel.classList.toggle("is-active", section === state.activeSection);
  });
  elements.teamPagePanel.classList.toggle("is-hidden", !(state.activeSection === "team" && state.filterTeam !== "all"));
}

function render() {
  renderSectionTabs();
  updateTeamStickerToggle();
  updateTeamSortToggle();
  renderMode();
  renderSummary();
  renderTeamOverview();
  renderList();
  renderStickerCheck();
  renderHistory();
  renderMatches();
  renderPeople();
}

function renderMode() {
  const editMode = state.mode === "edit";
  const isAuthenticated = canEdit();

  elements.shareButton.style.display = editMode && isAuthenticated ? "" : "none";
  elements.authStatus.textContent = isAuthenticated
    ? "Bearbeitung entsperrt."
    : (state.authError || "Zum Bearbeiten bitte deine persönliche PIN eingeben.");
  elements.authStatus.classList.toggle("auth-status--error", !isAuthenticated && Boolean(state.authError));
  const showGate = editMode && !isAuthenticated;
  elements.pinGate.classList.toggle("is-visible", showGate);
  document.body.classList.toggle("is-gated", showGate);

  elements.meStatus.textContent = state.me ? `Angemeldet als ${state.me.name}` : "";
  elements.peopleNavButton.classList.toggle("is-hidden", !state.me?.isAdmin);

  renderSectionTabs();
}

function renderSummary() {
  const overview = buildTeamOverviewData();
  const wanted = overview.reduce((total, team) => total + team.missingCount, 0);
  const duplicates = overview.reduce((total, team) => total + team.duplicateCount, 0);
  const haveCount = overview.reduce((total, team) => total + team.haveCount, 0);
  const fillPercent = Math.round((haveCount / ALBUM_TOTAL_STICKERS) * 100);

  elements.wantedCount.textContent = `${wanted}/${ALBUM_TOTAL_STICKERS}`;
  elements.duplicateCount.textContent = String(duplicates);
  elements.fillPercent.textContent = `${fillPercent}%`;
  elements.listSummary.textContent = wanted + duplicates === 0
    ? "Noch keine Sticker eingetragen."
    : `${wanted} gesucht, ${duplicates} doppelte Sticker in ${overview.filter(team => team.hasActivity).length} Teamblöcken.`;
}

function renderTeamOverview() {
  const overview = sortTeams(buildTeamOverviewData().filter(matchesTeamSearch));
  const selectedTeam = state.filterTeam !== "all" ? teamLabel(state.filterTeam) : "kein Team";
  elements.teamOverviewSummary.textContent = overview.length
    ? `${overview.length} Teams in dieser Ansicht. Ausgewählt: ${selectedTeam}.`
    : "Für diesen Filter gibt es aktuell kein Team.";

  if (!overview.length) {
    elements.teamOverviewGrid.innerHTML = "";
    elements.teamSearchResults.innerHTML = '<div class="empty-state">Kein Team passt zu deiner Suche oder dem Filter.</div>';
  } else {
    elements.teamOverviewGrid.innerHTML = overview.map(team => `
      <button class="team-tile" type="button" data-team-tile="${team.id}" data-flag="${team.flag}" style="background-color: ${completionTint(team.haveCount / team.expectedCount)};">
        <span class="team-tile__code">${team.id.toUpperCase()}</span>
        <span class="team-tile__name">${team.label}</span>
        <span class="team-tile__stats">${team.haveCount}/${team.expectedCount}</span>
        ${team.missingCount ? `<span class="team-tile__badge team-tile__badge--need">${team.missingCount}</span>` : ""}
        ${team.duplicateCount ? `<span class="team-tile__badge team-tile__badge--duplicate">+${team.duplicateCount}</span>` : ""}
      </button>
    `).join("");

    elements.teamSearchResults.innerHTML = "";
    elements.teamOverviewGrid.querySelectorAll("[data-team-tile]").forEach(tile => {
      tile.addEventListener("click", () => openTeam(tile.dataset.teamTile));
    });
  }

  renderTeamDetail();
}

function renderTeamDetail() {
  updateTeamStickerToggle();
  if (state.filterTeam === "all") {
    elements.teamPagePanel.classList.add("is-hidden");
    return;
  }

  const team = TEAMS.find(entry => entry.id === state.filterTeam);
  if (!team) {
    elements.teamPagePanel.classList.add("is-hidden");
    return;
  }

  elements.teamPagePanel.classList.remove("is-hidden");
  elements.teamDetailGroup.textContent = team.group || "Spezial";
  elements.teamDetailTitle.textContent = `${team.label} (${team.id.toUpperCase()})`;

  const detail = buildTeamOverviewData().find(entry => entry.id === team.id);
  elements.teamDetailStats.innerHTML = `
    <span class="mini-pill mini-pill--have">habe ${detail.haveCount}/${detail.expectedCount}</span>
    <span class="mini-pill mini-pill--need">offen ${detail.missingCount}</span>
    <span class="mini-pill mini-pill--duplicate">doppelt ${detail.duplicateCount}</span>
    ${detail.isComplete ? '<span class="mini-pill mini-pill--complete">komplett</span>' : `<span class="mini-pill mini-pill--need">fehlen ${detail.missingCount}</span>`}
  `;

  const cards = buildTeamStickerCards(team).filter(matchesTeamStickerFilter);
  if (!cards.length) {
    elements.teamStickerGrid.innerHTML = '<div class="empty-state">Kein Sticker passt zu diesem Statusfilter.</div>';
    return;
  }

  elements.teamStickerGrid.innerHTML = cards.map(renderTeamStickerCard).join("");
  elements.teamStickerGrid.querySelectorAll("[data-sticker-card]").forEach(cardElement => {
    cardElement.addEventListener("click", async () => {
      if (!canEdit()) {
        showToast("Bitte zuerst mit PIN entsperren.");
        return;
      }

      const teamId = cardElement.dataset.teamId;
      const number = cardElement.dataset.number;
      const prevEntry = cloneEntry(state.stickers[teamId]?.[number]);
      const next = nextStickerState(teamId, number);
      applyStickerState(teamId, number, next);
      const label = `${teamId.toUpperCase()} ${number} → ${statusText(next.status)}${next.quantity > 2 ? ` x${next.quantity - 1}` : ""}`;
      pushHistory({ teamId, number, prevEntry, label });
      render();
      await persistCollection(`Sticker ${teamId.toUpperCase()} ${number} ist jetzt ${statusText(next.status)}${next.quantity > 2 ? ` x${next.quantity - 1}` : ""}.`);
    });
  });

  elements.teamStickerGrid.querySelectorAll("[data-reset-sticker]").forEach(button => {
    button.addEventListener("click", async event => {
      event.stopPropagation();
      if (!canEdit()) {
        showToast("Bitte zuerst mit PIN entsperren.");
        return;
      }
      const teamId = button.dataset.teamId;
      const number = button.dataset.number;
      const prevEntry = cloneEntry(state.stickers[teamId]?.[number]);
      removeSticker(teamId, number);
      pushHistory({ teamId, number, prevEntry, label: `${teamId.toUpperCase()} ${number} → gesucht` });
      render();
      await persistCollection(`Sticker ${teamId.toUpperCase()} ${number} wieder auf gesucht gesetzt.`);
    });
  });
}

function renderList() {
  const grouped = filteredGroups();
  renderActiveFilters();

  if (!grouped.length) {
    elements.listContainer.innerHTML = `<div class="empty-state">${state.mode === "edit" && !canEdit() ? "Bitte zuerst mit PIN entsperren, damit deine Sammlung geladen werden kann." : "Noch nichts für diese Ansicht gefunden. Passe Filter oder Eingaben an."}</div>`;
    return;
  }

  elements.listContainer.innerHTML = "";
  grouped.forEach(group => {
    const card = elements.teamCardTemplate.content.firstElementChild.cloneNode(true);
    card.querySelector(".team-card__eyebrow").textContent = group.team.id.toUpperCase();
    card.querySelector("h3").textContent = group.team.label;

    const counts = card.querySelector(".team-card__counts");
    if (group.wanted.length) {
      counts.appendChild(buildCountBadge("wanted", `${group.wanted.length} gesucht`));
    }
    if (group.duplicate.length) {
      counts.appendChild(buildCountBadge("duplicate", `${group.duplicate.length} doppelt`));
    }

    const lists = card.querySelector(".team-card__lists");
    if (group.wanted.length) {
      lists.appendChild(buildListGroup("Gesucht", group.wanted, "wanted"));
    }
    if (group.duplicate.length) {
      lists.appendChild(buildListGroup("Doppelt", group.duplicate, "duplicate"));
    }

    elements.listContainer.appendChild(card);
  });
}

function buildCountBadge(kind, text) {
  const badge = document.createElement("span");
  badge.className = `count-badge count-badge--${kind}`;
  badge.textContent = text;
  return badge;
}

function buildListGroup(title, items, status) {
  const wrapper = document.createElement("section");
  wrapper.className = "list-group";

  const heading = document.createElement("div");
  heading.className = "list-group__title";
  heading.textContent = title;
  wrapper.appendChild(heading);

  const row = document.createElement("div");
  row.className = "pill-row";

  items.forEach(item => {
    const pill = elements.pillTemplate.content.firstElementChild.cloneNode(true);
    pill.classList.add(`sticker-pill--${status}`);
    pill.textContent = status === "duplicate" ? `${item.number}${item.quantity > 2 ? ` x${item.quantity - 1}` : ""}` : item.number;
    if (state.mode === "edit" && canEdit()) {
      pill.title = "Tippen zum Entfernen";
      pill.addEventListener("click", async () => {
        const prevEntry = cloneEntry(state.stickers[item.teamId]?.[item.number]);
        removeSticker(item.teamId, item.number);
        pushHistory({ teamId: item.teamId, number: item.number, prevEntry, label: `${item.teamId.toUpperCase()} ${item.number} → gesucht` });
        render();
        await persistCollection(`Sticker ${item.number} entfernt.`);
      });
    }
    row.appendChild(pill);
  });

  wrapper.appendChild(row);
  return wrapper;
}

function renderActiveFilters() {
  const chips = [];
  if (state.currentView !== "all") {
    chips.push(`Ansicht: ${STATUS_LABELS[state.currentView]}`);
  }
  if (state.filterTeam !== "all") {
    chips.push(`Team: ${teamLabel(state.filterTeam)}`);
  }
  if (state.searchTerm) {
    chips.push(`Suche: ${state.searchTerm}`);
  }
  if (state.shareSlug && state.mode === "edit") {
    chips.push(`Freigabe: ${state.shareSlug}`);
  }

  elements.activeFilters.innerHTML = chips.map(chip => `<span class="filter-chip">${chip}</span>`).join("");
}

function buildWhatsappList(kind) {
  const title = kind === "wanted" ? "Gesuchte Sticker:" : "Doppelte Sticker:";
  const grouped = groupEntries();
  const lines = grouped
    .map(group => {
      const entries = kind === "wanted" ? group.wanted : group.duplicate;
      if (!entries.length) {
        return "";
      }
      const values = entries.map(item => kind === "duplicate" && item.quantity > 2 ? `${item.number}x${item.quantity - 1}` : item.number);
      return `${group.team.id.toUpperCase()} ${values.join(", ")}`;
    })
    .filter(Boolean);

  return lines.length ? `${title}\n${lines.join("\n")}` : `${title}\nKeine Einträge.`;
}

function buildTeamWhatsappText(teamId, kind = "both") {
  const team = TEAMS.find(entry => entry.id === teamId);
  const cards = buildTeamStickerCards(team);
  const wanted = cards.filter(card => card.status === "missing").map(card => card.number);
  const duplicate = cards
    .filter(card => card.status === "duplicate")
    .map(card => card.quantity > 2 ? `${card.number}x${card.quantity - 1}` : card.number);

  const lines = [`${team.label} (${team.id.toUpperCase()}):`];
  if (kind === "wanted" || kind === "both") {
    lines.push(`Gesucht: ${wanted.length ? wanted.join(", ") : "keine"}`);
  }
  if (kind === "duplicate" || kind === "both") {
    lines.push(`Doppelt: ${duplicate.length ? duplicate.join(", ") : "keine"}`);
  }
  return lines.join("\n");
}

function groupEntries() {
  return TEAMS.map(team => {
    const source = state.stickers[team.id] || {};
    const wanted = buildMissingEntries(team);
    const duplicate = Object.values(source).filter(item => item.status === "duplicate").sort(sortByNumber);
    return { team, wanted, duplicate };
  }).filter(group => group.wanted.length || group.duplicate.length);
}

function buildTeamOverviewData() {
  return TEAMS.map(team => {
    const source = state.stickers[team.id] || {};
    const entries = Object.values(source);
    const duplicateEntries = entries.filter(item => item.status === "duplicate");
    const ownedEntries = entries.filter(item => item.status === "owned");
    const haveCount = ownedEntries.length + duplicateEntries.length;
    const expectedCount = team.id === "fwc" ? 28 : TEAM_STICKER_LIMIT;
    const missingCount = Math.max(0, expectedCount - haveCount);
    const duplicateCount = duplicateEntries.reduce((total, item) => total + Math.max(1, (item.quantity || 2) - 1), 0);

    return {
      ...team,
      expectedCount,
      haveCount,
      wantedCount: missingCount,
      duplicateCount,
      missingCount,
      hasActivity: entries.length > 0,
      isComplete: haveCount >= expectedCount
    };
  });
}

function buildTeamStickerCards(team) {
  if (team.id === "fwc") {
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"];
    return numbers.map(number => buildStickerCard(team, number));
  }
  return Array.from({ length: TEAM_STICKER_LIMIT }, (_, index) => buildStickerCard(team, String(index + 1)));
}

function buildStickerCard(team, number) {
  const entry = state.stickers[team.id]?.[number];
  const status = entry?.status || "missing";
  return {
    teamId: team.id,
    number,
    status,
    quantity: entry?.quantity || 0
  };
}

function renderTeamStickerCard(card) {
  const statusLabel = {
    owned: "Vorhanden",
    duplicate: `Doppelt${card.quantity > 2 ? ` x${card.quantity - 1}` : ""}`,
    missing: "Gesucht"
  }[card.status] || card.status;

  return `
    <article class="team-sticker-card team-sticker-card--${card.status}" data-sticker-card="true" data-team-id="${card.teamId}" data-number="${card.number}">
      <div class="team-sticker-card__top">
        <div class="team-sticker-card__number">${card.number}</div>
        ${card.status !== "missing" ? `<button class="team-sticker-card__reset" type="button" data-reset-sticker="true" data-team-id="${card.teamId}" data-number="${card.number}" aria-label="Sticker zurücksetzen">×</button>` : ""}
      </div>
      <div class="team-sticker-card__meta">
        <span class="mini-pill mini-pill--${card.status === "missing" ? "need" : card.status === "owned" ? "have" : card.status}">${statusLabel}</span>
      </div>
    </article>
  `;
}

function filteredGroups() {
  return groupEntries()
    .filter(group => state.filterTeam === "all" || group.team.id === state.filterTeam)
    .map(group => {
      const wanted = group.wanted.filter(matchesFilter);
      const duplicate = group.duplicate.filter(matchesFilter);
      return { ...group, wanted, duplicate };
    })
    .filter(group => {
      if (state.currentView === "wanted") {
        return group.wanted.length;
      }
      if (state.currentView === "duplicate") {
        return group.duplicate.length;
      }
      return group.wanted.length || group.duplicate.length;
    });
}

function matchesFilter(item) {
  if (!state.searchTerm) {
    return true;
  }
  const haystack = `${item.teamId} ${teamLabel(item.teamId)} ${item.number}`.toLowerCase();
  return haystack.includes(state.searchTerm);
}

function matchesTeamSearch(team) {
  if (!state.teamSearchTerm) {
    return true;
  }
  const haystack = `${team.label} ${team.id} ${team.group || ""}`.toLowerCase();
  return haystack.includes(state.teamSearchTerm);
}

function matchesTeamStickerFilter(card) {
  if (state.teamStickerFilter === "all") {
    return true;
  }
  if (state.teamStickerFilter === "missing") {
    return card.status === "missing";
  }
  return card.status === state.teamStickerFilter;
}

function upsertSticker(teamId, number, status, quantity) {
  state.stickers[teamId] = state.stickers[teamId] || {};
  state.stickers[teamId][number] = {
    teamId,
    number,
    status,
    quantity: status === "duplicate" ? quantity : 1
  };
}

function removeSticker(teamId, number) {
  if (!state.stickers[teamId]) {
    return;
  }
  delete state.stickers[teamId][number];
  if (!Object.keys(state.stickers[teamId]).length) {
    delete state.stickers[teamId];
  }
}

function applyStickerState(teamId, number, next) {
  if (next.status === "missing") {
    removeSticker(teamId, number);
    return;
  }
  upsertSticker(teamId, number, next.status, next.quantity);
}

function cloneEntry(entry) {
  return entry ? { ...entry } : null;
}

function pushHistory(entry) {
  state.history.push(entry);
  if (state.history.length > HISTORY_LIMIT) {
    state.history.shift();
  }
}

async function undoLastAction() {
  const entry = state.history.pop();
  if (!entry) {
    return;
  }
  if (entry.prevEntry) {
    state.stickers[entry.teamId] = state.stickers[entry.teamId] || {};
    state.stickers[entry.teamId][entry.number] = entry.prevEntry;
  } else {
    removeSticker(entry.teamId, entry.number);
  }
  render();
  await persistCollection(`Rückgängig: ${entry.teamId.toUpperCase()} ${entry.number}.`);
}

function renderHistory() {
  const hasHistory = state.history.length > 0 && canEdit();
  elements.historyStrip.classList.toggle("is-hidden", !hasHistory);
  if (!hasHistory) {
    return;
  }
  elements.historyLog.textContent = [...state.history].slice(-5).reverse().map(entry => entry.label).join(" · ");
}

async function ensureShareSlug() {
  if (!canEdit()) {
    showToast("Bitte zuerst mit PIN entsperren.");
    return false;
  }
  if (state.shareSlug) {
    return true;
  }

  const response = await fetch("/api/share", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(state.authPin)
    }
  });
  const payload = await response.json();
  if (!response.ok) {
    showToast(payload.error || "Freigabelink konnte nicht erstellt werden.");
    return false;
  }
  state.shareSlug = payload.shareSlug;
  render();
  return true;
}

function buildShareUrl(teamId) {
  const url = new URL(window.location.href);
  url.searchParams.set(SHARE_PARAM, state.shareSlug);
  if (teamId) {
    url.searchParams.set(TEAM_PARAM, teamId);
  } else {
    url.searchParams.delete(TEAM_PARAM);
  }
  url.hash = "";
  return url.toString();
}

async function persistCollection(successMessage) {
  if (!canEdit()) {
    return;
  }
  state.isSaving = true;
  updateSyncStatus("Speichere Änderungen …");

  try {
    const response = await fetch("/api/collection", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(state.authPin)
      },
      body: JSON.stringify({
        stickers: state.stickers
      })
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Speichern fehlgeschlagen.");
    }
    state.shareSlug = payload.shareSlug || state.shareSlug;
    updateSyncStatus("Alle Änderungen gespeichert.");
    showToast(successMessage);
  } catch (error) {
    updateSyncStatus(error.message || "Speichern fehlgeschlagen.");
    showToast(error.message || "Speichern fehlgeschlagen.");
  } finally {
    state.isSaving = false;
    render();
  }
}

function canEdit() {
  return state.mode === "edit" && Boolean(state.authPin);
}

function authHeaders(pin) {
  return {
    "X-Person-Pin": pin
  };
}

async function loadMatches() {
  if (!canEdit()) {
    return;
  }
  elements.matchesStatus.textContent = "Lade Abgleich …";
  try {
    const response = await fetch("/api/matches", { headers: authHeaders(state.authPin) });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.error || "Abgleich konnte nicht geladen werden.");
    }
    state.matches = { canGet: payload.canGet || [], canGive: payload.canGive || [] };
    renderMatches();
  } catch (error) {
    elements.matchesStatus.textContent = error.message || "Abgleich konnte nicht geladen werden.";
  }
}

function renderMatches() {
  if (!state.matches) {
    elements.matchesCanGet.innerHTML = "";
    elements.matchesCanGive.innerHTML = "";
    return;
  }

  const { canGet, canGive } = state.matches;

  elements.matchesStatus.textContent = canGet.length || canGive.length
    ? `${canGet.length} Sticker für dich, ${canGive.length} Sticker kannst du abgeben.`
    : "Aktuell gibt es keine Treffer zwischen den Sammlungen.";

  elements.matchesCanGet.innerHTML = canGet.length
    ? canGet.map(item => buildMatchRow(item, `von ${escapeHtml(item.fromName)}`)).join("")
    : '<div class="empty-state">Niemand hat gerade einen doppelten Sticker, den du suchst.</div>';

  elements.matchesCanGive.innerHTML = canGive.length
    ? canGive.map(item => buildMatchRow(item, `gesucht von ${item.wantedBy.map(person => escapeHtml(person.name)).join(", ")}`)).join("")
    : '<div class="empty-state">Aktuell sucht niemand einen deiner doppelten Sticker.</div>';
}

function buildMatchRow(item, whoText) {
  return `
    <div class="match-row">
      <span class="sticker-pill sticker-pill--duplicate">${teamLabel(item.teamId)} ${item.number}${item.quantity > 2 ? ` x${item.quantity - 1}` : ""}</span>
      <span class="match-row__who">${whoText}</span>
    </div>
  `;
}

async function loadPeople() {
  if (!state.me?.isAdmin) {
    return;
  }
  elements.peopleStatus.textContent = "Lade Personen …";
  try {
    const response = await fetch("/api/people", { headers: authHeaders(state.authPin) });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.error || "Personen konnten nicht geladen werden.");
    }
    state.people = payload.people || [];
    renderPeople();
  } catch (error) {
    elements.peopleStatus.textContent = error.message || "Personen konnten nicht geladen werden.";
  }
}

function renderPeople() {
  if (!state.people) {
    elements.peopleListContainer.innerHTML = "";
    return;
  }

  elements.peopleStatus.textContent = `${state.people.length}/10 Personen.`;

  elements.peopleListContainer.innerHTML = state.people.map(person => {
    if (state.editingPersonId === person.id) {
      return buildPersonEditRow(person);
    }
    return `
      <div class="people-row" data-person-id="${person.id}">
        <div class="people-row__meta">
          <strong>${escapeHtml(person.name)}${person.isAdmin ? " (Admin)" : ""}</strong>
          <span class="people-row__pin">PIN: ${escapeHtml(person.pin)}</span>
        </div>
        <div class="people-row__actions">
          <button class="ghost-button" type="button" data-edit-person="${person.id}">Bearbeiten</button>
          ${person.isAdmin ? "" : `<button class="ghost-button" type="button" data-remove-person="${person.id}">Entfernen</button>`}
        </div>
      </div>
    `;
  }).join("");

  elements.peopleListContainer.querySelectorAll("[data-edit-person]").forEach(button => {
    button.addEventListener("click", () => {
      state.editingPersonId = button.dataset.editPerson;
      renderPeople();
    });
  });

  elements.peopleListContainer.querySelectorAll("[data-cancel-edit]").forEach(button => {
    button.addEventListener("click", () => {
      state.editingPersonId = null;
      renderPeople();
    });
  });

  elements.peopleListContainer.querySelectorAll("[data-save-person]").forEach(button => {
    button.addEventListener("click", async () => {
      const id = button.dataset.savePerson;
      const row = button.closest("[data-person-id]");
      const name = row.querySelector(".people-edit-name").value.trim();
      const pinInput = row.querySelector(".people-edit-pin");
      const pin = pinInput.disabled ? "" : pinInput.value.trim();
      await updatePersonRequest(id, name, pin);
    });
  });

  elements.peopleListContainer.querySelectorAll("[data-remove-person]").forEach(button => {
    button.addEventListener("click", async () => {
      const id = button.dataset.removePerson;
      const person = state.people.find(entry => entry.id === id);
      if (!window.confirm(`${person?.name || "Person"} wirklich entfernen? Ihre Sammlung geht dabei verloren.`)) {
        return;
      }
      await deletePersonRequest(id);
    });
  });
}

function buildPersonEditRow(person) {
  return `
    <div class="people-row people-row--editing" data-person-id="${person.id}">
      <div class="people-row__edit-fields">
        <label class="field">
          <span class="field__label">Name</span>
          <input class="people-edit-name" type="text" value="${escapeHtml(person.name)}" maxlength="40">
        </label>
        <label class="field">
          <span class="field__label">PIN</span>
          <input class="people-edit-pin" type="text" inputmode="numeric" value="${person.isAdmin ? "" : escapeHtml(person.pin)}" maxlength="12" placeholder="${person.isAdmin ? "über ADMIN_PIN gesetzt" : ""}" ${person.isAdmin ? "disabled" : ""}>
        </label>
      </div>
      <div class="people-row__actions">
        <button class="secondary-button" type="button" data-save-person="${person.id}">Speichern</button>
        <button class="ghost-button" type="button" data-cancel-edit="${person.id}">Abbrechen</button>
      </div>
    </div>
  `;
}

async function createPersonRequest() {
  const name = elements.peopleNameInput.value.trim();
  const pin = elements.peoplePinInput.value.trim();
  if (!name || !pin) {
    showToast("Bitte Name und PIN eingeben.");
    return;
  }

  try {
    const response = await fetch("/api/people", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(state.authPin)
      },
      body: JSON.stringify({ name, pin })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.error || "Person konnte nicht angelegt werden.");
    }
    elements.peopleForm.reset();
    showToast(`${name} wurde hinzugefügt.`);
    await loadPeople();
  } catch (error) {
    showToast(error.message || "Person konnte nicht angelegt werden.");
  }
}

async function updatePersonRequest(id, name, pin) {
  if (!name && !pin) {
    showToast("Bitte Name oder PIN ändern.");
    return;
  }

  try {
    const response = await fetch("/api/people", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(state.authPin)
      },
      body: JSON.stringify({ id, name, pin })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.error || "Person konnte nicht aktualisiert werden.");
    }
    if (id === state.me?.id && name) {
      state.me = { ...state.me, name };
    }
    state.editingPersonId = null;
    showToast("Person aktualisiert.");
    await loadPeople();
    render();
  } catch (error) {
    showToast(error.message || "Person konnte nicht aktualisiert werden.");
  }
}

async function deletePersonRequest(id) {
  try {
    const response = await fetch(`/api/people?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: authHeaders(state.authPin)
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.error || "Person konnte nicht entfernt werden.");
    }
    showToast("Person entfernt.");
    await loadPeople();
  } catch (error) {
    showToast(error.message || "Person konnte nicht entfernt werden.");
  }
}

function nextStickerState(teamId, number) {
  const current = state.stickers[teamId]?.[number];
  const status = current?.status || "missing";
  const quantity = current?.quantity || 0;

  if (status === "missing") {
    return { status: "owned", quantity: 1 };
  }
  if (status === "owned") {
    return { status: "duplicate", quantity: 2 };
  }
  if (status === "duplicate") {
    return { status: "duplicate", quantity: Math.max(3, quantity + 1) };
  }
  return { status: "owned", quantity: 1 };
}

function openTeam(teamId) {
  state.filterTeam = teamId;
  elements.teamFilter.value = teamId;
  state.activeSection = "team";
  render();
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function sortByNumber(a, b) {
  return Number.parseInt(a.number, 10) - Number.parseInt(b.number, 10);
}

function completionTint(ratio) {
  const clamped = Math.max(0, Math.min(1, ratio));
  const hue = Math.round(clamped * 120);
  return `hsla(${hue}, 80%, 45%, 0.38)`;
}

function sortTeams(list) {
  const sorted = [...list];
  if (state.teamSortBy === "id") {
    sorted.sort((a, b) => a.id.localeCompare(b.id, "de"));
  } else if (state.teamSortBy === "mostOpen") {
    sorted.sort((a, b) => b.missingCount - a.missingCount || a.label.localeCompare(b.label, "de"));
  } else if (state.teamSortBy === "leastOpen") {
    sorted.sort((a, b) => a.missingCount - b.missingCount || a.label.localeCompare(b.label, "de"));
  } else {
    sorted.sort((a, b) => a.label.localeCompare(b.label, "de"));
  }
  return sorted;
}

function teamLabel(teamId) {
  return TEAMS.find(team => team.id === teamId)?.label || teamId;
}

function statusText(status) {
  return {
    missing: "gesucht",
    owned: "vorhanden",
    duplicate: "doppelt"
  }[status] || status;
}

function buildMissingEntries(team) {
  const cards = buildTeamStickerCards(team).filter(card => card.status === "missing");
  return cards.map(card => ({
    teamId: team.id,
    number: card.number,
    status: "missing",
    quantity: 0
  }));
}

function updateSyncStatus(message) {
  elements.syncStatus.textContent = message;
}

const TEAM_CODE_LOOKUP = new Map();
TEAMS.forEach(team => {
  TEAM_CODE_LOOKUP.set(team.id, team.id);
  team.aliases.forEach(alias => {
    if (alias.length <= 4) {
      TEAM_CODE_LOOKUP.set(alias.toLowerCase(), team.id);
    }
  });
});

function parseStickerRefs(text) {
  const refs = [];
  let currentTeam = null;

  text.split(/\n+/).forEach(line => {
    line.split(/[,;]+/).map(token => token.trim()).filter(Boolean).forEach(token => {
      token.split(/\s+/).filter(Boolean).forEach(word => {
        const cleanWord = word.replace(/[():]/g, "");
        const comboMatch = cleanWord.match(/^([a-zA-ZÀ-ÿ]{2,})[-_]?(\d{1,2})$/);
        if (comboMatch && TEAM_CODE_LOOKUP.has(comboMatch[1].toLowerCase())) {
          currentTeam = TEAM_CODE_LOOKUP.get(comboMatch[1].toLowerCase());
          refs.push({ teamId: currentTeam, number: String(Number.parseInt(comboMatch[2], 10)) });
          return;
        }

        const teamId = TEAM_CODE_LOOKUP.get(cleanWord.toLowerCase());
        if (teamId) {
          currentTeam = teamId;
          return;
        }

        const numberMatch = cleanWord.match(/^(\d{1,2})(?:x\d+)?$/i);
        if (numberMatch && currentTeam) {
          refs.push({ teamId: currentTeam, number: String(Number.parseInt(numberMatch[1], 10)) });
        }
      });
    });
  });

  return refs;
}

function computeStickerCheckMatches() {
  const refs = parseStickerRefs(elements.stickerCheckInput.value);
  const seen = new Set();
  const needed = [];
  refs.forEach(ref => {
    const key = `${ref.teamId}-${ref.number}`;
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    const entry = state.stickers[ref.teamId]?.[ref.number];
    if (!entry || entry.status === "missing") {
      needed.push(ref);
    }
  });
  return { total: seen.size, needed };
}

function groupRefsByTeam(refs) {
  const grouped = new Map();
  refs.forEach(ref => {
    if (!grouped.has(ref.teamId)) {
      grouped.set(ref.teamId, []);
    }
    grouped.get(ref.teamId).push(ref.number);
  });
  return [...grouped.entries()].map(([teamId, numbers]) => `${teamId.toUpperCase()} ${numbers.join(", ")}`);
}

function renderStickerCheck() {
  if (!elements.stickerCheckInput.value.trim()) {
    elements.stickerCheckResult.textContent = "Noch keine Liste geprüft.";
    return;
  }

  const { total, needed } = computeStickerCheckMatches();
  if (!total) {
    elements.stickerCheckResult.textContent = "Keine erkennbaren Team-Kürzel mit Nummern gefunden.";
  } else if (!needed.length) {
    elements.stickerCheckResult.textContent = `Von ${total} erkannten Stickern brauchst du keinen davon mehr.`;
  } else {
    elements.stickerCheckResult.textContent = `Du brauchst noch ${needed.length} von ${total}:\n${groupRefsByTeam(needed).join("\n")}`;
  }
}

function buildStickerCheckResultText() {
  const { needed } = computeStickerCheckMatches();
  if (!needed.length) {
    return "Keine passenden Sticker gefunden.";
  }
  return `Ich brauche noch:\n${groupRefsByTeam(needed).join("\n")}`;
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(error => {
      console.warn("Service Worker konnte nicht registriert werden.", error);
    });
  });
}

let toastTimer = null;
function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    elements.toast.classList.remove("is-visible");
  }, 2200);
}
