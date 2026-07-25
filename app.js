const PIN_STORAGE_KEY = "sticker-tausch-2026-pin";
const SHARE_PARAM = "share";
const APP_VERSION = "0.3.0";

const TEAMS = [
  { id: "fwc", label: "Sondersticker", group: "Spezial", aliases: ["fwc", "fcw", "sondersticker", "intro", "legenden", "specials", "historie"] },
  { id: "mex", label: "Mexiko", group: "Gruppe A", aliases: ["mx", "mex", "mexiko"] },
  { id: "rsa", label: "Südafrika", group: "Gruppe A", aliases: ["rsa", "suedafrika", "südafrika"] },
  { id: "kor", label: "Südkorea", group: "Gruppe A", aliases: ["kor", "suedkorea", "südkorea", "korea"] },
  { id: "cze", label: "Tschechien", group: "Gruppe A", aliases: ["cze", "tschechien"] },
  { id: "can", label: "Kanada", group: "Gruppe B", aliases: ["can", "kanada"] },
  { id: "bih", label: "Bosnien-Herzegowina", group: "Gruppe B", aliases: ["bih", "bosnien", "bosnien-herzegowina"] },
  { id: "qat", label: "Katar", group: "Gruppe B", aliases: ["qat", "katar"] },
  { id: "sui", label: "Schweiz", group: "Gruppe B", aliases: ["sui", "schweiz"] },
  { id: "usa", label: "USA", group: "Gruppe C", aliases: ["us", "usa", "vereinigte staaten"] },
  { id: "par", label: "Paraguay", group: "Gruppe D", aliases: ["par", "paraguay"] },
  { id: "aus", label: "Australien", group: "Gruppe D", aliases: ["aus", "australien"] },
  { id: "tur", label: "Türkei", group: "Gruppe D", aliases: ["tur", "tuerkei", "türkei"] },
  { id: "bra", label: "Brasilien", group: "Gruppe D", aliases: ["br", "bra", "brasilien"] },
  { id: "mar", label: "Marokko", group: "Gruppe D", aliases: ["ma", "mar", "marokko"] },
  { id: "hai", label: "Haiti", group: "Gruppe C", aliases: ["hai", "haiti"] },
  { id: "sco", label: "Schottland", group: "Gruppe D", aliases: ["sco", "schottland"] },
  { id: "ger", label: "Deutschland", group: "Gruppe E", aliases: ["de", "ger", "deutschland"] },
  { id: "cuw", label: "Curaçao", group: "Gruppe E", aliases: ["cuw", "curacao", "curaçao"] },
  { id: "civ", label: "Elfenbeinküste", group: "Gruppe E", aliases: ["civ", "elfenbeinkueste", "elfenbeinküste"] },
  { id: "ecu", label: "Ecuador", group: "Gruppe E", aliases: ["ecu", "ecuador"] },
  { id: "ned", label: "Niederlande", group: "Gruppe F", aliases: ["ned", "holland", "niederlande"] },
  { id: "jpn", label: "Japan", group: "Gruppe F", aliases: ["jp", "jpn", "japan"] },
  { id: "swe", label: "Schweden", group: "Gruppe F", aliases: ["swe", "schweden"] },
  { id: "tun", label: "Tunesien", group: "Gruppe F", aliases: ["tun", "tunesien"] },
  { id: "bel", label: "Belgien", group: "Gruppe G", aliases: ["bel", "belgien"] },
  { id: "egy", label: "Ägypten", group: "Gruppe G", aliases: ["egy", "aegypten", "ägypten"] },
  { id: "irn", label: "Iran", group: "Gruppe G", aliases: ["irn", "iran"] },
  { id: "nzl", label: "Neuseeland", group: "Gruppe G", aliases: ["nzl", "neuseeland"] },
  { id: "esp", label: "Spanien", group: "Gruppe H", aliases: ["es", "esp", "spanien"] },
  { id: "cpv", label: "Kap Verde", group: "Gruppe H", aliases: ["cpv", "kap verde", "cabo verde"] },
  { id: "ksa", label: "Saudi-Arabien", group: "Gruppe H", aliases: ["ksa", "saudi", "saudi-arabien"] },
  { id: "uru", label: "Uruguay", group: "Gruppe H", aliases: ["uru", "uruguay"] },
  { id: "fra", label: "Frankreich", group: "Gruppe I", aliases: ["fr", "fra", "frankreich"] },
  { id: "sen", label: "Senegal", group: "Gruppe I", aliases: ["sen", "senegal"] },
  { id: "irq", label: "Irak", group: "Gruppe I", aliases: ["irq", "irak"] },
  { id: "nor", label: "Norwegen", group: "Gruppe I", aliases: ["nor", "norwegen"] },
  { id: "arg", label: "Argentinien", group: "Gruppe J", aliases: ["ar", "arg", "argentinien"] },
  { id: "alg", label: "Algerien", group: "Gruppe J", aliases: ["alg", "algerien"] },
  { id: "aut", label: "Österreich", group: "Gruppe J", aliases: ["aut", "oesterreich", "österreich"] },
  { id: "jor", label: "Jordanien", group: "Gruppe J", aliases: ["jor", "jordanien"] },
  { id: "por", label: "Portugal", group: "Gruppe K", aliases: ["pt", "por", "portugal"] },
  { id: "cod", label: "DR Kongo", group: "Gruppe K", aliases: ["cod", "dr kongo", "kongo dr", "demokratische republik kongo"] },
  { id: "uzb", label: "Usbekistan", group: "Gruppe K", aliases: ["uzb", "usbekistan"] },
  { id: "col", label: "Kolumbien", group: "Gruppe K", aliases: ["col", "kolumbien"] },
  { id: "eng", label: "England", group: "Gruppe L", aliases: ["uk", "eng", "england"] },
  { id: "cro", label: "Kroatien", group: "Gruppe L", aliases: ["cro", "kroatien"] },
  { id: "gha", label: "Ghana", group: "Gruppe L", aliases: ["gha", "ghana"] },
  { id: "pan", label: "Panama", group: "Gruppe L", aliases: ["pan", "panama"] }
];

const ALBUM_TOTAL_STICKERS = 980;
const TEAM_STICKER_LIMIT = 20;
const FWC_ALLOWED_NUMBERS = new Set(["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1", "2", "3", "4", "5", "6", "7", "8"]);

const STATUS_LABELS = {
  wanted: "Gesucht",
  duplicate: "Doppelt",
  owned: "Vorhanden"
};

const state = {
  mode: "edit",
  activeSection: "teams",
  selectedStatus: "wanted",
  currentView: "all",
  filterTeam: "all",
  teamStatusFilter: "all",
  teamStickerFilter: "all",
  searchTerm: "",
  teamSearchTerm: "",
  stickers: {},
  authPin: "",
  shareSlug: "",
  isSaving: false,
  isReady: false
};

const elements = {
  modeBadge: document.querySelector("#modeBadge"),
  wantedCount: document.querySelector("#wantedCount"),
  duplicateCount: document.querySelector("#duplicateCount"),
  teamCount: document.querySelector("#teamCount"),
  versionBadge: document.querySelector("#versionBadge"),
  versionNote: document.querySelector("#versionNote"),
  resetButton: document.querySelector("#resetButton"),
  teamSelect: document.querySelector("#teamSelect"),
  teamFilter: document.querySelector("#teamFilter"),
  stickerNumber: document.querySelector("#stickerNumber"),
  duplicateQuantity: document.querySelector("#duplicateQuantity"),
  singleEntryForm: document.querySelector("#singleEntryForm"),
  batchForm: document.querySelector("#batchForm"),
  batchInput: document.querySelector("#batchInput"),
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
  segmentedButtons: document.querySelectorAll(".segmented__item"),
  teamCardTemplate: document.querySelector("#teamCardTemplate"),
  pillTemplate: document.querySelector("#pillTemplate"),
  teamOverviewGrid: document.querySelector("#teamOverviewGrid"),
  teamOverviewSummary: document.querySelector("#teamOverviewSummary"),
  teamStatusButtons: document.querySelectorAll("[data-team-status]"),
  teamQuickSearch: document.querySelector("#teamQuickSearch"),
  teamSearchResults: document.querySelector("#teamSearchResults"),
  teamPagePanel: document.querySelector("#teamPagePanel"),
  teamDetailGroup: document.querySelector("#teamDetailGroup"),
  teamDetailTitle: document.querySelector("#teamDetailTitle"),
  teamDetailStats: document.querySelector("#teamDetailStats"),
  teamStickerGrid: document.querySelector("#teamStickerGrid"),
  teamStickerButtons: document.querySelectorAll("[data-team-sticker-filter]"),
  backToTeamsButton: document.querySelector("#backToTeamsButton"),
  teamWhatsappButton: document.querySelector("#teamWhatsappButton"),
  pinGate: document.querySelector("#pinGate"),
  authForm: document.querySelector("#authForm"),
  authPinInput: document.querySelector("#authPinInput"),
  authStatus: document.querySelector("#authStatus"),
  syncStatus: document.querySelector("#syncStatus"),
  installButton: document.querySelector("#installButton")
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
  wireInstallPrompt();

  const params = new URLSearchParams(window.location.search);
  const shareSlug = params.get(SHARE_PARAM);

  if (shareSlug) {
    state.mode = "share";
    state.shareSlug = shareSlug;
    await loadPublicCollection(shareSlug);
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
  const versionText = `v${APP_VERSION}`;
  elements.versionBadge.textContent = versionText;
  elements.versionNote.textContent = `Version ${versionText}`;
}

function populateTeamOptions() {
  const allTeamsOption = [{ value: "all", label: "Alle Teams" }, ...TEAMS.map(team => ({ value: team.id, label: team.label }))];
  elements.teamSelect.innerHTML = TEAMS.map(team => `<option value="${team.id}">${team.group ? `${team.group} · ${team.label}` : team.label}</option>`).join("");
  elements.teamFilter.innerHTML = allTeamsOption.map(team => `<option value="${team.value}">${team.label}</option>`).join("");
  elements.teamCount.textContent = String(ALBUM_TOTAL_STICKERS);
}

function wireEvents() {
  document.querySelectorAll("[data-section-tab]").forEach(button => {
    button.addEventListener("click", () => {
      state.activeSection = button.dataset.sectionTab;
      if (state.activeSection === "list") {
        state.currentView = "all";
      }
      renderSectionTabs();
    });
  });

  elements.segmentedButtons.forEach(button => {
    button.addEventListener("click", () => {
      state.selectedStatus = button.dataset.status;
      updateStatusToggle();
      render();
    });
  });

  elements.teamStatusButtons.forEach(button => {
    button.addEventListener("click", () => {
      state.teamStatusFilter = button.dataset.teamStatus;
      render();
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

  elements.singleEntryForm.addEventListener("submit", async event => {
    event.preventDefault();
    if (!canEdit()) {
      showToast("Bitte zuerst mit PIN entsperren.");
      return;
    }

    const teamId = elements.teamSelect.value;
    const number = normalizeNumber(elements.stickerNumber.value);
    const quantity = Math.max(1, Number.parseInt(elements.duplicateQuantity.value || "1", 10));

    if (!number) {
      showToast("Bitte zuerst eine Sticker-Nummer eintragen.");
      elements.stickerNumber.focus();
      return;
    }

    if (!isValidStickerNumber(teamId, number)) {
      showToast(validationMessage(teamId));
      elements.stickerNumber.focus();
      return;
    }

    upsertSticker(teamId, number, state.selectedStatus, quantity);
    elements.stickerNumber.value = "";
    if (state.selectedStatus !== "duplicate") {
      elements.duplicateQuantity.value = "2";
    }
    render();
    await persistCollection(`Sticker ${teamLabel(teamId)} ${number} gespeichert.`);
  });

  elements.batchForm.addEventListener("submit", async event => {
    event.preventDefault();
    if (!canEdit()) {
      showToast("Bitte zuerst mit PIN entsperren.");
      return;
    }

    const result = parseBatchInput(elements.batchInput.value);
    if (!result.entries.length) {
      showToast("Die Batch-Eingabe konnte nicht erkannt werden.");
      return;
    }

    const validEntries = result.entries.filter(entry => isValidStickerNumber(entry.teamId, entry.number));
    if (!validEntries.length) {
      showToast("In der Batch-Eingabe waren keine gültigen Sticker enthalten.");
      return;
    }

    validEntries.forEach(entry => upsertSticker(entry.teamId, entry.number, state.selectedStatus, 2));
    render();
    elements.batchInput.value = "";
    await persistCollection(`${validEntries.length} Sticker übernommen.`);
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
    await ensureShareLink();
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

  elements.teamWhatsappButton.addEventListener("click", async () => {
    if (state.filterTeam === "all") {
      return;
    }
    try {
      await navigator.clipboard.writeText(buildTeamWhatsappText(state.filterTeam));
      showToast(`${teamLabel(state.filterTeam)}-Liste kopiert.`);
    } catch (error) {
      showToast("Liste konnte nicht kopiert werden.");
    }
  });

  elements.resetButton.addEventListener("click", async () => {
    if (!canEdit()) {
      return;
    }
    if (!window.confirm("Wirklich alle Sticker-Einträge löschen?")) {
      return;
    }
    state.stickers = {};
    render();
    await persistCollection("Liste geleert.");
  });

  document.querySelectorAll("[data-step]").forEach(button => {
    button.addEventListener("click", () => {
      const next = Math.max(1, Number.parseInt(elements.duplicateQuantity.value || "1", 10) + Number.parseInt(button.dataset.step, 10));
      elements.duplicateQuantity.value = String(next);
    });
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
    state.stickers = payload.stickers || {};
    state.shareSlug = payload.shareSlug || "";
    window.localStorage.setItem(PIN_STORAGE_KEY, pin);
    updateSyncStatus("Sammlung geladen und bereit.");
    render();
    if (!silent) {
      showToast("Sammlung entsperrt.");
    }
  } catch (error) {
    state.authPin = "";
    state.stickers = {};
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
  updateSyncStatus("Öffentliche Liste geladen.");
}

function updateStatusToggle() {
  elements.segmentedButtons.forEach(button => {
    button.classList.toggle("is-active", button.dataset.status === state.selectedStatus);
  });
}

function updateTeamStatusToggle() {
  elements.teamStatusButtons.forEach(button => {
    button.classList.toggle("is-active", button.dataset.teamStatus === state.teamStatusFilter);
  });
}

function updateTeamStickerToggle() {
  elements.teamStickerButtons.forEach(button => {
    button.classList.toggle("is-active", button.dataset.teamStickerFilter === state.teamStickerFilter);
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
    let visible = section === state.activeSection;
    if (section === "capture" && panel.id === "authPanel" && state.activeSection === "capture") {
      visible = true;
    }
    panel.classList.toggle("is-active", visible);
  });
  elements.teamPagePanel.classList.toggle("is-hidden", !(state.activeSection === "team" && state.filterTeam !== "all"));
}

function render() {
  renderSectionTabs();
  updateStatusToggle();
  updateTeamStatusToggle();
  updateTeamStickerToggle();
  renderMode();
  renderSummary();
  renderTeamOverview();
  renderList();
}

function renderMode() {
  const editMode = state.mode === "edit";
  const isAuthenticated = canEdit();
  elements.modeBadge.textContent = editMode ? (isAuthenticated ? "Bearbeiten" : "Gesperrt") : "Freigabe";

  document.querySelector("#capturePanel").style.display = editMode && isAuthenticated ? "" : "none";
  elements.shareButton.style.display = editMode && isAuthenticated ? "" : "none";
  elements.authStatus.textContent = isAuthenticated
    ? "Bearbeitung entsperrt."
    : "Zum Bearbeiten bitte deine PIN eingeben.";
  const showGate = editMode && !isAuthenticated;
  elements.pinGate.classList.toggle("is-visible", showGate);
  document.body.classList.toggle("is-gated", showGate);
  renderSectionTabs();
}

function renderSummary() {
  const overview = buildTeamOverviewData();
  const wanted = overview.reduce((total, team) => total + team.missingCount, 0);
  const duplicates = overview.reduce((total, team) => total + team.duplicateCount, 0);

  elements.wantedCount.textContent = String(wanted);
  elements.duplicateCount.textContent = String(duplicates);
  elements.listSummary.textContent = wanted + duplicates === 0
    ? "Noch keine Sticker eingetragen."
    : `${wanted} gesucht, ${duplicates} doppelte Sticker in ${overview.filter(team => team.hasActivity).length} Teamblöcken.`;
}

function renderTeamOverview() {
  const overview = buildTeamOverviewData()
    .filter(matchesTeamStatusFilter)
    .filter(matchesTeamSearch);
  const selectedTeam = state.filterTeam !== "all" ? teamLabel(state.filterTeam) : "kein Team";
  elements.teamOverviewSummary.textContent = overview.length
    ? `${overview.length} Teams in dieser Ansicht. Ausgewählt: ${selectedTeam}.`
    : "Für diesen Filter gibt es aktuell kein Team.";

  if (!overview.length) {
    elements.teamOverviewGrid.innerHTML = "";
    elements.teamSearchResults.innerHTML = '<div class="empty-state">Kein Team passt zu deiner Suche oder dem Filter.</div>';
  } else {
    elements.teamOverviewGrid.innerHTML = overview.map(team => `
      <button class="team-tile" type="button" data-team-tile="${team.id}">
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
      const next = nextStickerState(teamId, number);
      applyStickerState(teamId, number, next);
      render();
      await persistCollection(`Sticker ${teamId.toUpperCase()} ${number} ist jetzt ${statusText(next.status)}${next.quantity > 1 ? ` x${next.quantity}` : ""}.`);
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
      removeSticker(teamId, number);
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
    pill.textContent = status === "duplicate" ? `${item.number} x${item.quantity}` : item.number;
    if (state.mode === "edit" && canEdit()) {
      pill.title = "Tippen zum Entfernen";
      pill.addEventListener("click", async () => {
        removeSticker(item.teamId, item.number);
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
  if (state.teamStatusFilter !== "all") {
    chips.push(`Teamstatus: ${teamStatusLabel(state.teamStatusFilter)}`);
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
      const values = entries.map(item => kind === "duplicate" && item.quantity > 1 ? `${item.number}x${item.quantity}` : item.number);
      return `${group.team.id.toUpperCase()} ${values.join(", ")}`;
    })
    .filter(Boolean);

  return lines.length ? `${title}\n${lines.join("\n")}` : `${title}\nKeine Einträge.`;
}

function buildTeamWhatsappText(teamId) {
  const team = TEAMS.find(entry => entry.id === teamId);
  const cards = buildTeamStickerCards(team);
  const wanted = cards.filter(card => card.status === "missing").map(card => card.number);
  const duplicate = cards
    .filter(card => card.status === "duplicate")
    .map(card => card.quantity > 1 ? `${card.number}x${card.quantity}` : card.number);

  const lines = [`${team.label} (${team.id.toUpperCase()}):`];
  lines.push(`Gesucht: ${wanted.length ? wanted.join(", ") : "keine"}`);
  lines.push(`Doppelt: ${duplicate.length ? duplicate.join(", ") : "keine"}`);
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
    quantity: entry?.quantity || 0,
    role: stickerRole(team.id, number)
  };
}

function renderTeamStickerCard(card) {
  const statusLabel = {
    owned: "Vorhanden",
    duplicate: `Doppelt${card.quantity > 1 ? ` x${card.quantity}` : ""}`,
    missing: "Gesucht"
  }[card.status] || card.status;

  return `
    <article class="team-sticker-card team-sticker-card--${card.status}" data-sticker-card="true" data-team-id="${card.teamId}" data-number="${card.number}">
      <div class="team-sticker-card__top">
        <div class="team-sticker-card__number">${card.number}</div>
        ${card.status !== "missing" ? `<button class="team-sticker-card__reset" type="button" data-reset-sticker="true" data-team-id="${card.teamId}" data-number="${card.number}" aria-label="Sticker zurücksetzen">×</button>` : ""}
      </div>
      <div class="team-sticker-card__role">${card.role}</div>
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
  const haystack = `${teamLabel(item.teamId)} ${item.number}`.toLowerCase();
  return haystack.includes(state.searchTerm);
}

function matchesTeamStatusFilter(team) {
  if (state.teamStatusFilter === "have") {
    return team.haveCount > 0;
  }
  if (state.teamStatusFilter === "need") {
    return team.wantedCount > 0 || team.missingCount > 0;
  }
  if (state.teamStatusFilter === "duplicate") {
    return team.duplicateCount > 0;
  }
  if (state.teamStatusFilter === "complete") {
    return team.isComplete;
  }
  return true;
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
  state.stickers[teamId] ||= {};
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

async function ensureShareLink() {
  if (!canEdit()) {
    showToast("Bitte zuerst mit PIN entsperren.");
    return;
  }

  if (!state.shareSlug) {
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
      return;
    }
    state.shareSlug = payload.shareSlug;
    render();
  }

  const url = new URL(window.location.href);
  url.searchParams.set(SHARE_PARAM, state.shareSlug);
  url.hash = "";
  elements.shareUrl.value = url.toString();
  elements.shareBox.classList.remove("is-hidden");
  elements.shareBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  showToast("Freigabelink bereit.");
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
    "X-Admin-Pin": pin
  };
}

function parseBatchInput(rawText) {
  const cleaned = rawText.trim();
  if (!cleaned) {
    return { entries: [] };
  }

  const [left, right] = cleaned.includes(":") ? cleaned.split(":") : cleaned.split(/\s+/, 2);
  const teamId = findTeamId(left);
  const numbersSource = cleaned.includes(":") ? right : cleaned.slice(left.length);
  if (!teamId) {
    return { entries: [] };
  }

  const numbers = (numbersSource || "")
    .match(/\d+/g)
    ?.map(normalizeNumber)
    .filter(Boolean) || [];

  return {
    entries: numbers.map(number => ({ teamId, number }))
  };
}

function findTeamId(input) {
  const normalized = (input || "").trim().toLowerCase();
  const team = TEAMS.find(entry =>
    entry.label.toLowerCase() === normalized ||
    entry.id === normalized ||
    entry.aliases.includes(normalized)
  );
  return team ? team.id : null;
}

function normalizeNumber(value) {
  const match = String(value || "").match(/\d+/);
  if (!match) {
    return "";
  }
  const raw = match[0];
  if (raw.length > 1 && raw.startsWith("0")) {
    return raw;
  }
  return String(Number.parseInt(raw, 10));
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
  elements.teamSelect.value = teamId;
  state.activeSection = "team";
  render();
}

function isValidStickerNumber(teamId, number) {
  if (teamId === "fwc") {
    return FWC_ALLOWED_NUMBERS.has(String(number));
  }
  const numeric = Number.parseInt(number, 10);
  return Number.isInteger(numeric) && numeric >= 1 && numeric <= TEAM_STICKER_LIMIT;
}

function validationMessage(teamId) {
  return teamId === "fwc"
    ? "Für FWC sind die Intro-Sticker 1-8 und die Spezialsticker 00-19 vorgesehen."
    : "Teamsticker laufen von 1 bis 20.";
}

function sortByNumber(a, b) {
  return Number.parseInt(a.number, 10) - Number.parseInt(b.number, 10);
}

function teamLabel(teamId) {
  return TEAMS.find(team => team.id === teamId)?.label || teamId;
}

function teamStatusLabel(status) {
  return {
    all: "Alle",
    have: "Habe ich",
    need: "Brauche ich",
    duplicate: "Doppelt",
    complete: "Komplett"
  }[status] || status;
}

function stickerRole(teamId, number) {
  if (teamId === "fwc") {
    const specialMap = {
      "1": "Trophäe / Turniermotiv",
      "2": "Offizielles Turnierlogo",
      "3": "Maskottchen",
      "4": "Slogan We Are 26",
      "5": "Spielball",
      "6": "Host Kanada",
      "7": "Host Mexiko",
      "8": "Host USA"
    };
    return specialMap[number] || "Historie & Legenden";
  }

  const numeric = Number.parseInt(number, 10);
  if (numeric === 1) {
    return "Wappen";
  }
  if (numeric >= 2 && numeric <= 12) {
    return "Torhüter & Abwehr";
  }
  if (numeric === 13) {
    return "Teamfoto";
  }
  return "Mittelfeld & Sturm";
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

function wireInstallPrompt() {
  if (!elements.installButton) {
    return;
  }

  const isStandalone = window.matchMedia("(display-mode: standalone)").matches
    || window.navigator.standalone === true;
  if (isStandalone) {
    return;
  }

  let deferredPrompt = null;

  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    deferredPrompt = event;
    elements.installButton.classList.remove("is-hidden");
  });

  elements.installButton.addEventListener("click", async () => {
    if (!deferredPrompt) {
      const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
      showToast(isIOS
        ? "In Safari: Teilen-Symbol antippen, dann „Zum Home-Bildschirm“."
        : "Installation im Browser-Menü verfügbar.");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      showToast("App wird installiert.");
    }
    deferredPrompt = null;
    elements.installButton.classList.add("is-hidden");
  });

  window.addEventListener("appinstalled", () => {
    elements.installButton.classList.add("is-hidden");
    showToast("StickerTausch ist jetzt installiert.");
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
