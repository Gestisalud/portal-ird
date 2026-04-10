// ============================================================
//  DATA: EPS DE COLOMBIA (vigentes 2025-2026)
//  Régimen Contributivo y Subsidiado
// ============================================================

const EPS_LIST = [
  // ---- RÉGIMEN CONTRIBUTIVO ----
  { id: "SURA",         nombre: "Sura EPS",                     regimen: "Contributivo" },
  { id: "NUEVA_EPS",    nombre: "Nueva EPS",                    regimen: "Contributivo" },
  { id: "SANITAS",      nombre: "Sanitas EPS",                  regimen: "Contributivo" },
  { id: "COMPENSAR",    nombre: "Compensar EPS",                regimen: "Contributivo" },
  { id: "FAMISANAR",    nombre: "Famisanar EPS",                regimen: "Contributivo" },
  { id: "SALUD_TOTAL",  nombre: "Salud Total EPS",              regimen: "Contributivo" },
  { id: "ALIANSALUD",   nombre: "Aliansalud EPS",               regimen: "Contributivo" },
  { id: "COMFENALCO_V", nombre: "Comfenalco Valle EPS",         regimen: "Contributivo" },
  { id: "COOMEVA",      nombre: "Coomeva EPS",                  regimen: "Contributivo" },
  { id: "SOS",          nombre: "SOS EPS",                      regimen: "Contributivo" },
  // ---- RÉGIMEN SUBSIDIADO ----
  { id: "COOSALUD",     nombre: "Coosalud EPS-S",               regimen: "Subsidiado"   },
  { id: "MUTUAL_SER",   nombre: "Mutual SER EPS-S",             regimen: "Subsidiado"   },
  { id: "EMSSANAR",     nombre: "Emssanar EPS-S",               regimen: "Subsidiado"   },
  { id: "CAPITAL_SALUD",nombre: "Capital Salud EPS-S",          regimen: "Subsidiado"   },
  { id: "CAJACOPI",     nombre: "Cajacopi EPS-S (Atlántico)",   regimen: "Subsidiado"   },
  { id: "COMFACHOCO",   nombre: "Comfachocó EPS-S",             regimen: "Subsidiado"   },
  { id: "COMFAORIENTE", nombre: "Comfaoriente EPS-S",           regimen: "Subsidiado"   },
  { id: "ASMET_SALUD",  nombre: "Asmet Salud EPS-S",            regimen: "Subsidiado"   },
  { id: "PIJAOS",       nombre: "Pijaos Salud EPS-SI",          regimen: "Subsidiado"   },
  // ---- ESPECIALES ----
  { id: "POLICIA",      nombre: "Sanidad Policial (SSNPC)",     regimen: "Especial"     },
  { id: "EJERCITO",     nombre: "Sanidad Ejército (SSME)",      regimen: "Especial"     },
  { id: "MAGISTERIO",   nombre: "Magisterio (Fiduprevisora)",   regimen: "Especial"     },
  { id: "ECOPETROL",    nombre: "Ecopetrol (IPS Propia)",       regimen: "Especial"     },
  { id: "PARTICULAR",   nombre: "Particular / Pago de bolsillo",regimen: "Particular"   },
  { id: "OTRO",         nombre: "Otra EPS / No aplica",         regimen: "Otro"         },
];
