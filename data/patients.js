// ============================================================
//  DATOS DE PACIENTES (editar aquí para agregar / modificar)
//  Clave: "<TipoDoc>-<NumDoc>" (todo en mayúsculas)
// ============================================================

const PATIENTS_DB = {

  "CC-1023456789": {
    nombres:    "Valentina",
    apellidos:  "Gómez Restrepo",
    docType:    "CC",
    docNumber:  "1023456789",
    edad:       34,
    sexo:       "Femenino",
    eps:        "SURA EPS",
    celular:    "3187654321",
    direccion:  "Cra 15 # 82-14, Bogotá D.C.",
    estudio: {
      tipo:     "Resonancia Magnética",
      detalle:  "Hombro derecho – sin contraste",
      icono:    "🧲"
    },
    cita: {
      fecha:    "viernes, 18 de abril de 2026",
      hora:     "08:30 a.m.",
      sede:     "Sede Centro – Sala RM-2",
      medico:   "Dr. Andrés Molina Suárez"
    }
  },

  "CC-98765432": {
    nombres:    "Carlos Andrés",
    apellidos:  "Martínez López",
    docType:    "CC",
    docNumber:  "98765432",
    edad:       52,
    sexo:       "Masculino",
    eps:        "Nueva EPS",
    celular:    "3001234567",
    direccion:  "Av. El Dorado # 68C-61, Bogotá D.C.",
    estudio: {
      tipo:     "Tomografía Computarizada",
      detalle:  "Cerebro – con y sin contraste",
      icono:    "🧠"
    },
    cita: {
      fecha:    "lunes, 14 de abril de 2026",
      hora:     "10:00 a.m.",
      sede:     "Sede Norte – Sala TC-1",
      medico:   "Dra. Lucía Herrera Cano"
    }
  },

  "TI-1016789123": {
    nombres:    "Sebastián",
    apellidos:  "Torres Jiménez",
    docType:    "TI",
    docNumber:  "1016789123",
    edad:       17,
    sexo:       "Masculino",
    eps:        "Compensar",
    celular:    "3156789012",
    direccion:  "Cll 127 # 53-26, Bogotá D.C.",
    estudio: {
      tipo:     "Radiografía",
      detalle:  "Columna lumbar – AP y lateral",
      icono:    "🩻"
    },
    cita: {
      fecha:    "miércoles, 16 de abril de 2026",
      hora:     "02:00 p.m.",
      sede:     "Sede Sur – Sala RX-3",
      medico:   "Dr. Felipe Arango Ríos"
    }
  },

  "CC-52340876": {
    nombres:    "María Fernanda",
    apellidos:  "Ruiz Sepúlveda",
    docType:    "CC",
    docNumber:  "52340876",
    edad:       41,
    sexo:       "Femenino",
    eps:        "Sanitas",
    celular:    "3209876543",
    direccion:  "Cl 93 # 19-55 Apto 402, Bogotá D.C.",
    estudio: {
      tipo:     "Ecografía",
      detalle:  "Abdominal total",
      icono:    "📡"
    },
    cita: {
      fecha:    "jueves, 17 de abril de 2026",
      hora:     "09:15 a.m.",
      sede:     "Sede Chapinero – Sala Eco-1",
      medico:   "Dra. Sandra Ospina Vera"
    }
  },

  "CE-987654": {
    nombres:    "Jean Pierre",
    apellidos:  "Moreau Delacroix",
    docType:    "CE",
    docNumber:  "987654",
    edad:       38,
    sexo:       "Masculino",
    eps:        "Aliansalud",
    celular:    "3112345678",
    direccion:  "Cra 7 # 32-16 Of. 201, Bogotá D.C.",
    estudio: {
      tipo:     "Resonancia Magnética",
      detalle:  "Rodilla izquierda – protocolo completo",
      icono:    "🧲"
    },
    cita: {
      fecha:    "martes, 15 de abril de 2026",
      hora:     "11:30 a.m.",
      sede:     "Sede Centro – Sala RM-1",
      medico:   "Dr. Ricardo Peña Montoya"
    }
  }

};
