// ============================================================
//  ADMIN.JS  –  Módulo Administrador de Citas
//  Firebase Firestore writes + patient management
// ============================================================

// ── IMPORTS ──────────────────────────────────────────────────
import { initializeApp }
  from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore, collection, doc,
  setDoc, deleteDoc, getDocs, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// ── THEME ────────────────────────────────────────────────────
const themeBtn   = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');
function applyTheme(m) {
  document.body.classList.remove('light-mode', 'dark-mode');
  document.body.classList.add(m === 'dark' ? 'dark-mode' : 'light-mode');
  themeLabel.textContent = m === 'dark' ? 'Modo claro' : 'Modo oscuro';
  localStorage.setItem('ird-theme', m);
}
applyTheme(localStorage.getItem('ird-theme') || 'light');
themeBtn.addEventListener('click', () =>
  applyTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark'));

document.getElementById('year').textContent = new Date().getFullYear();

// ── FIREBASE INIT ─────────────────────────────────────────────
let db = null;
let fbEnabled = false;

if (typeof FIREBASE_ENABLED !== 'undefined' && FIREBASE_ENABLED) {
  try {
    const fbApp = initializeApp(FIREBASE_CONFIG);
    db = getFirestore(fbApp);
    fbEnabled = true;
    document.getElementById('firebase-notice').classList.remove('hidden');
    document.getElementById('local-notice').classList.add('hidden');
    setupRealtimeList();
  } catch (e) {
    console.error('Firebase init error:', e);
  }
}

// ── POPULATE EPS DROPDOWN ─────────────────────────────────────
const epsSelect  = document.getElementById('f-eps');
const epsSearch  = document.getElementById('eps-search');

function renderEps(filter = '') {
  const q = filter.toLowerCase();
  epsSelect.innerHTML = '<option value="" disabled>Seleccionar EPS…</option>';
  (typeof EPS_LIST !== 'undefined' ? EPS_LIST : []).forEach(e => {
    if (!q || e.nombre.toLowerCase().includes(q) || e.regimen.toLowerCase().includes(q)) {
      const opt = new Option(`${e.nombre} — ${e.regimen}`, e.nombre);
      epsSelect.appendChild(opt);
    }
  });
}
renderEps();
epsSearch.addEventListener('input', () => renderEps(epsSearch.value));

// ── POPULATE STUDIES DROPDOWN ─────────────────────────────────
const studySelect  = document.getElementById('f-study');
const studySearch  = document.getElementById('study-search');
const studyPreview = document.getElementById('study-preview');
const prevIcon     = document.getElementById('study-prev-icon');
const prevCups     = document.getElementById('study-prev-cups');
const prevName     = document.getElementById('study-prev-name');

function renderStudies(filter = '') {
  const q = filter.toLowerCase();
  studySelect.innerHTML = '<option value="" disabled>Seleccionar estudio…</option>';

  // Group by tipo
  const groups = {};
  (typeof STUDIES_LIST !== 'undefined' ? STUDIES_LIST : []).forEach(s => {
    if (!q ||
        s.nombre.toLowerCase().includes(q) ||
        s.cups.includes(filter) ||
        s.tipo.toLowerCase().includes(q)) {
      if (!groups[s.tipo]) groups[s.tipo] = [];
      groups[s.tipo].push(s);
    }
  });

  Object.keys(groups).forEach(tipo => {
    const og = document.createElement('optgroup');
    og.label = tipo;
    groups[tipo].forEach(s => {
      const opt = new Option(`[${s.cups}] ${s.nombre}`, s.cups);
      og.appendChild(opt);
    });
    studySelect.appendChild(og);
  });
}

renderStudies();
studySearch.addEventListener('input', () => renderStudies(studySearch.value));

studySelect.addEventListener('change', () => {
  const cups = studySelect.value;
  const study = (STUDIES_LIST || []).find(s => s.cups === cups);
  if (study) {
    prevIcon.textContent = study.icono;
    prevCups.textContent = `CUPS ${study.cups}`;
    prevName.textContent = `${study.tipo} — ${study.nombre}`;
    studyPreview.classList.remove('hidden');
  }
});

// ── FORM SUBMIT ───────────────────────────────────────────────
const saveBtn  = document.getElementById('save-btn');
const clearBtn = document.getElementById('clear-btn');
const toast    = document.getElementById('form-toast');

document.getElementById('patient-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  hideToast();

  const docType  = document.getElementById('f-doctype').value;
  const docNum   = document.getElementById('f-docnum').value.trim();
  const cups     = document.getElementById('f-study').value;
  const study    = (typeof STUDIES_LIST !== 'undefined' ? STUDIES_LIST : []).find(s => s.cups === cups);

  if (!docType || !docNum) { showToast('Tipo y número de documento son obligatorios.', 'error'); return; }

  // Format date and time for display
  const fechaRaw = document.getElementById('f-fecha').value;
  const horaRaw  = document.getElementById('f-hora').value;
  const fechaDisplay = fechaRaw
    ? new Date(fechaRaw + 'T12:00:00').toLocaleDateString('es-CO', { weekday:'long', day:'numeric', month:'long', year:'numeric' })
    : '';
  const horaDisplay = horaRaw
    ? (() => {
        const [h, m] = horaRaw.split(':');
        const hNum = parseInt(h);
        const ampm = hNum >= 12 ? 'p.m.' : 'a.m.';
        const h12  = hNum % 12 || 12;
        return `${String(h12).padStart(2,'0')}:${m} ${ampm}`;
      })()
    : '';

  const key = `${docType}-${docNum}`;

  // Build patient object (flat format for Firestore)
  const patient = {
    nombres:         document.getElementById('f-nombres').value.trim(),
    apellidos:       document.getElementById('f-apellidos').value.trim(),
    docType,
    docNumber:       docNum,
    edad:            parseInt(document.getElementById('f-edad').value) || 0,
    sexo:            document.getElementById('f-sexo').value,
    eps:             document.getElementById('f-eps').value,
    celular:         document.getElementById('f-celular').value.trim(),
    direccion:       document.getElementById('f-direccion').value.trim(),
    estudio_icono:   study?.icono   || '🩻',
    estudio_tipo:    study?.tipo    || '',
    estudio_detalle: document.getElementById('f-study-detail').value.trim() || study?.nombre || '',
    estudio_cups:    cups,
    cita_fecha:      fechaDisplay,
    cita_hora:       horaDisplay,
    cita_sede:       document.getElementById('f-sede').value.trim(),
    cita_medico:     document.getElementById('f-medico').value.trim(),
    updatedAt:       new Date().toISOString(),
  };

  // Save
  saveBtn.disabled = true;

  if (fbEnabled && db) {
    try {
      await setDoc(doc(db, 'patients', key), patient);
      showToast(`✅ Cita guardada en Firebase: ${patient.nombres} ${patient.apellidos}`, 'success');
      clearForm();
    } catch (err) {
      showToast('❌ Error al guardar en Firebase: ' + err.message, 'error');
    }
  } else {
    // Show what would be saved (demo mode)
    showToast(`⚠️ Firebase no configurado. En modo demo los datos no se guardan. Clave: "${key}"`, 'error');
  }

  saveBtn.disabled = false;
});

clearBtn.addEventListener('click', () => { clearForm(); hideToast(); });

function clearForm() {
  document.getElementById('patient-form').reset();
  studyPreview.classList.add('hidden');
  epsSearch.value   = '';
  studySearch.value = '';
  renderEps();
  renderStudies();
}

// ── TOAST ─────────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  toast.textContent = msg;
  toast.className = `form-toast ${type}`;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 6000);
}
function hideToast() { toast.classList.add('hidden'); }

// ── PATIENT LIST ──────────────────────────────────────────────
const listEl       = document.getElementById('patient-list');
const listCount    = document.getElementById('list-count');
const refreshBtn   = document.getElementById('refresh-btn');
const listSearch   = document.getElementById('list-search');

let allPatients = [];

function renderList(filter = '') {
  const q = filter.toLowerCase();
  const filtered = allPatients.filter(p =>
    !q ||
    `${p.nombres} ${p.apellidos}`.toLowerCase().includes(q) ||
    p.docNumber?.toString().includes(q) ||
    p.eps?.toLowerCase().includes(q)
  );

  listEl.innerHTML = '';

  if (filtered.length === 0) {
    listEl.innerHTML = '<p class="list-empty">No se encontraron pacientes.</p>';
    return;
  }

  filtered.forEach(p => {
    const initials = ((p.nombres || '?')[0] + (p.apellidos || '?')[0]).toUpperCase();
    const div = document.createElement('div');
    div.className = 'patient-item';
    div.innerHTML = `
      <div class="patient-item-avatar">${initials}</div>
      <div class="patient-item-info">
        <div class="patient-item-name">${p.nombres} ${p.apellidos}</div>
        <div class="patient-item-meta">${p.docType} ${p.docNumber} · ${p.eps || '—'}</div>
        <div class="patient-item-study">${p.estudio_tipo || ''} — ${p.estudio_detalle || ''} · ${p.cita_fecha || '—'}</div>
      </div>
      <div class="patient-actions">
        <button class="btn-edit" data-key="${p.docType}-${p.docNumber}" title="Editar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="btn-delete" data-key="${p.docType}-${p.docNumber}" title="Eliminar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
        </button>
      </div>`;
    listEl.appendChild(div);
  });

  // Edit handler
  listEl.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = allPatients.find(x => `${x.docType}-${x.docNumber}` === btn.dataset.key);
      if (p) loadPatientToForm(p);
    });
  });

  // Delete handler
  listEl.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('¿Eliminar esta cita permanentemente?')) return;
      if (fbEnabled && db) {
        try {
          await deleteDoc(doc(db, 'patients', btn.dataset.key));
          showToast('🗑️ Cita eliminada.', 'success');
        } catch (err) {
          showToast('Error al eliminar: ' + err.message, 'error');
        }
      } else {
        showToast('Firebase no configurado, no se puede eliminar.', 'error');
      }
    });
  });
}

function loadPatientToForm(p) {
  document.getElementById('f-nombres').value   = p.nombres   || '';
  document.getElementById('f-apellidos').value = p.apellidos || '';
  document.getElementById('f-doctype').value   = p.docType   || '';
  document.getElementById('f-docnum').value    = p.docNumber || '';
  document.getElementById('f-edad').value      = p.edad      || '';
  document.getElementById('f-sexo').value      = p.sexo      || '';
  document.getElementById('f-celular').value   = p.celular   || '';
  document.getElementById('f-direccion').value = p.direccion || '';
  document.getElementById('f-sede').value      = p.cita_sede   || '';
  document.getElementById('f-medico').value    = p.cita_medico || '';
  document.getElementById('f-study-detail').value = p.estudio_detalle || '';

  renderEps();
  document.getElementById('f-eps').value = p.eps || '';

  renderStudies();
  if (p.estudio_cups) {
    document.getElementById('f-study').value = p.estudio_cups;
    studySelect.dispatchEvent(new Event('change'));
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── REAL-TIME LIST (Firestore) ─────────────────────────────────
function setupRealtimeList() {
  onSnapshot(collection(db, 'patients'), snapshot => {
    allPatients = snapshot.docs.map(d => d.data());
    listCount.textContent = `${allPatients.length} paciente${allPatients.length === 1 ? '' : 's'} registrado${allPatients.length === 1 ? '' : 's'}`;
    renderList(listSearch.value);
  });
}

async function loadListManual() {
  if (!fbEnabled || !db) {
    listCount.textContent = 'Firebase no configurado';
    listEl.innerHTML = '<p class="list-empty">Configura Firebase para ver y gestionar citas en la nube.</p>';
    return;
  }
  try {
    const snap = await getDocs(collection(db, 'patients'));
    allPatients = snap.docs.map(d => d.data());
    listCount.textContent = `${allPatients.length} paciente${allPatients.length === 1 ? '' : 's'} registrado${allPatients.length === 1 ? '' : 's'}`;
    renderList();
  } catch (e) {
    listEl.innerHTML = '<p class="list-empty">Error al cargar la lista.</p>';
  }
}

if (!fbEnabled) loadListManual();

refreshBtn.addEventListener('click', loadListManual);
listSearch.addEventListener('input', () => renderList(listSearch.value));
