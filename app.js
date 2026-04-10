// ============================================================
//  APP.JS  –  Portal de Citas | Imagen Radiológica Diagnóstica
//  Firebase Firestore + local fallback
// ============================================================

// ── THEME ────────────────────────────────────────────────────
const themeToggleBtn = document.getElementById('theme-toggle');
const themeLabel     = document.getElementById('theme-label');

function applyTheme(mode) {
  document.body.classList.remove('light-mode', 'dark-mode');
  document.body.classList.add(mode === 'dark' ? 'dark-mode' : 'light-mode');
  themeLabel.textContent = mode === 'dark' ? 'Modo claro' : 'Modo oscuro';
  localStorage.setItem('ird-theme', mode);
}
const savedTheme = localStorage.getItem('ird-theme') || 'light';
applyTheme(savedTheme);
themeToggleBtn.addEventListener('click', () => {
  applyTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark');
});

// ── DOM REFS ─────────────────────────────────────────────────
const splash          = document.getElementById('splash-screen');
const app             = document.getElementById('app');
const searchSection   = document.getElementById('search-section');
const apptSection     = document.getElementById('appointment-section');
const searchForm      = document.getElementById('search-form');
const docTypeEl       = document.getElementById('doc-type');
const docNumberEl     = document.getElementById('doc-number');
const searchBtn       = document.getElementById('search-btn');
const searchError     = document.getElementById('search-error');
const errorMsg        = document.getElementById('error-msg');

const patientAvatar   = document.getElementById('patient-avatar');
const patientName     = document.getElementById('patient-fullname');
const infoDoctype     = document.getElementById('info-doctype');
const infoDocnumber   = document.getElementById('info-docnumber');
const infoAge         = document.getElementById('info-age');
const infoSex         = document.getElementById('info-sex');
const infoEps         = document.getElementById('info-eps');
const infoPhone       = document.getElementById('info-phone');
const infoAddress     = document.getElementById('info-address');
const studyIcon       = document.getElementById('study-icon');
const infoStudyCups   = document.getElementById('info-study-cups');
const infoStudyType   = document.getElementById('info-study-type');
const infoStudyDetail = document.getElementById('info-study-detail');
const infoDate        = document.getElementById('info-date');
const infoTime        = document.getElementById('info-time');
const infoLocation    = document.getElementById('info-location');
const infoDoctor      = document.getElementById('info-doctor');

const confirmSection  = document.getElementById('confirm-section');
const confirmedBanner = document.getElementById('confirmed-banner');
const reportBanner    = document.getElementById('report-banner');
const btnConfirm      = document.getElementById('btn-confirm');
const btnReport       = document.getElementById('btn-report');
const btnBack         = document.getElementById('btn-back');
const firebaseNotice  = document.getElementById('firebase-notice');
const localNotice     = document.getElementById('local-notice');

document.getElementById('year').textContent = new Date().getFullYear();

// ── FIREBASE INIT ────────────────────────────────────────────
import { initializeApp }     from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

let db = null;
let useFirebase = false;

if (typeof FIREBASE_ENABLED !== 'undefined' && FIREBASE_ENABLED) {
  try {
    const fbApp = initializeApp(FIREBASE_CONFIG);
    db = getFirestore(fbApp);
    useFirebase = true;
    if (firebaseNotice) firebaseNotice.classList.remove('hidden');
    if (localNotice)    localNotice.classList.add('hidden');
    console.log('✅ Firebase conectado');
  } catch (e) {
    console.warn('⚠️ Firebase no se pudo inicializar, usando datos locales:', e);
  }
} else {
  console.log('ℹ️ Firebase no configurado, usando datos demo locales');
}

// ── PATIENT SEARCH ───────────────────────────────────────────
async function findPatient(docType, docNumber) {
  const key = `${docType.toUpperCase()}-${docNumber.trim()}`;

  // 1. Try Firestore
  if (useFirebase && db) {
    try {
      const snap = await getDoc(doc(db, 'patients', key));
      if (snap.exists()) return snap.data();
    } catch (e) {
      console.warn('Error en Firestore, usando datos locales:', e);
    }
  }

  // 2. Fall back to local patients.js
  if (typeof PATIENTS_DB !== 'undefined' && PATIENTS_DB[key]) {
    return PATIENTS_DB[key];
  }

  return null;
}

// ── FORM SUBMIT ──────────────────────────────────────────────
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  hideError();

  const docType   = docTypeEl.value;
  const docNumber = docNumberEl.value.trim();
  if (!docType || !docNumber) return;

  searchBtn.classList.add('loading');
  searchBtn.disabled = true;

  try {
    const patient = await findPatient(docType, docNumber);
    if (!patient) {
      showError('No se encontró ninguna cita con el tipo y número de documento ingresados. Verifica los datos e intenta de nuevo.');
    } else {
      populateAppointment(patient);
      showAppointment();
    }
  } catch (err) {
    showError('Error de conexión. Intenta de nuevo en unos segundos.');
    console.error(err);
  } finally {
    searchBtn.classList.remove('loading');
    searchBtn.disabled = false;
  }
});

// ── POPULATE APPOINTMENT ─────────────────────────────────────
function populateAppointment(p) {
  // Support both Firestore flat format and local nested format
  const nombres   = p.nombres   || '';
  const apellidos = p.apellidos || '';
  const fullName  = `${nombres} ${apellidos}`.trim();

  // Avatar
  const initials = (nombres[0] || '?') + (apellidos[0] || '');
  patientAvatar.textContent = initials.toUpperCase();

  patientName.textContent     = fullName;
  infoDoctype.textContent     = formatDocType(p.docType);
  infoDocnumber.textContent   = p.docNumber;
  infoAge.textContent         = `${p.edad} años`;
  infoSex.textContent         = p.sexo;
  infoEps.textContent         = p.eps;
  infoPhone.textContent       = formatPhone(p.celular);
  infoAddress.textContent     = p.direccion;

  // Study — support both nested (local) and flat (Firestore) formats
  const esIcono  = p.estudio?.icono  || p.estudio_icono  || '🩻';
  const esTipo   = p.estudio?.tipo   || p.estudio_tipo   || '—';
  const esDetalle= p.estudio?.detalle|| p.estudio_detalle|| '—';
  const esCups   = p.estudio?.cups   || p.estudio_cups   || '';

  studyIcon.textContent       = esIcono;
  infoStudyType.textContent   = esTipo;
  infoStudyDetail.textContent = esDetalle;
  infoStudyCups.textContent   = esCups ? `CUPS ${esCups}` : '';
  infoStudyCups.style.display = esCups ? '' : 'none';

  // Appointment — support both nested and flat
  infoDate.textContent        = p.cita?.fecha   || p.cita_fecha   || '—';
  infoTime.textContent        = p.cita?.hora    || p.cita_hora    || '—';
  infoLocation.textContent    = p.cita?.sede    || p.cita_sede    || '—';
  infoDoctor.textContent      = p.cita?.medico  || p.cita_medico  || '—';

  // Reset banners
  confirmSection.classList.remove('hidden');
  confirmedBanner.classList.add('hidden');
  reportBanner.classList.add('hidden');
}

// ── HELPERS ──────────────────────────────────────────────────
function formatDocType(code) {
  const map = {
    CC: 'Cédula de Ciudadanía (CC)', CE: 'Cédula de Extranjería (CE)',
    TI: 'Tarjeta de Identidad (TI)', PA: 'Pasaporte (PA)',
    RC: 'Registro Civil (RC)',       NIT: 'NIT'
  };
  return map[code] || code;
}

function formatPhone(num) {
  if (!num) return '—';
  const c = String(num).replace(/\D/g, '');
  return c.length === 10
    ? `+57 ${c.slice(0,3)} ${c.slice(3,6)} ${c.slice(6)}`
    : num;
}

// ── NAVIGATION ───────────────────────────────────────────────
function showAppointment() {
  searchSection.classList.add('hidden');
  apptSection.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showSearch() {
  apptSection.classList.add('hidden');
  searchSection.classList.remove('hidden');
  searchForm.reset();
  hideError();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── ERROR ────────────────────────────────────────────────────
function showError(msg) {
  errorMsg.textContent = msg;
  searchError.classList.remove('hidden');
  searchError.style.animation = 'none';
  searchError.offsetHeight;
  searchError.style.animation = '';
}
function hideError() { searchError.classList.add('hidden'); }

// ── CONFIRM / REPORT ─────────────────────────────────────────
btnConfirm.addEventListener('click', () => {
  confirmSection.classList.add('hidden');
  reportBanner.classList.add('hidden');
  confirmedBanner.classList.remove('hidden');
  confirmedBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

btnReport.addEventListener('click', () => {
  confirmSection.classList.add('hidden');
  confirmedBanner.classList.add('hidden');
  reportBanner.classList.remove('hidden');
  reportBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

btnBack.addEventListener('click', showSearch);

// ── INPUT CLEANUP ────────────────────────────────────────────
docNumberEl.addEventListener('input', () => {
  docNumberEl.value = docNumberEl.value.replace(/[^0-9A-Za-z\-]/g, '');
});
docTypeEl.addEventListener('change', hideError);
docNumberEl.addEventListener('input', hideError);
