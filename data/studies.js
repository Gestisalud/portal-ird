// ============================================================
//  DATA: ESTUDIOS DE AYUDAS DIAGNÓSTICAS — CÓDIGOS CUPS
//  Radiología, Ecografía, Tomografía, Resonancia Magnética,
//  Mamografía, Densitometría, Medicina Nuclear
// ============================================================

const STUDIES_LIST = [

  // ═══════════════════════════════════════════════
  //  RADIOLOGÍA CONVENCIONAL (Rayos X)
  // ═══════════════════════════════════════════════
  { cups: "870411", nombre: "Rx Tórax AP y lateral",                 tipo: "Radiografía",           icono: "🩻", area: "Tórax"         },
  { cups: "870421", nombre: "Rx Tórax AP (una posición)",            tipo: "Radiografía",           icono: "🩻", area: "Tórax"         },
  { cups: "870439", nombre: "Rx Columna cervical (2 posiciones)",    tipo: "Radiografía",           icono: "🩻", area: "Columna"       },
  { cups: "870449", nombre: "Rx Columna dorsal (2 posiciones)",      tipo: "Radiografía",           icono: "🩻", area: "Columna"       },
  { cups: "870429", nombre: "Rx Columna lumbar (2–3 posiciones)",    tipo: "Radiografía",           icono: "🩻", area: "Columna"       },
  { cups: "872911", nombre: "Rx Pelvis AP",                          tipo: "Radiografía",           icono: "🩻", area: "Pelvis"        },
  { cups: "873211", nombre: "Rx Cadera (AP + lateral)",              tipo: "Radiografía",           icono: "🩻", area: "Cadera"        },
  { cups: "873111", nombre: "Rx Rodilla AP y lateral",               tipo: "Radiografía",           icono: "🩻", area: "Rodilla"       },
  { cups: "873311", nombre: "Rx Tobillo AP y lateral",               tipo: "Radiografía",           icono: "🩻", area: "Tobillo"       },
  { cups: "873411", nombre: "Rx Pie AP y lateral",                   tipo: "Radiografía",           icono: "🩻", area: "Pie"           },
  { cups: "873511", nombre: "Rx Pierna (tibia/peroné)",              tipo: "Radiografía",           icono: "🩻", area: "Pierna"        },
  { cups: "873611", nombre: "Rx Fémur AP y lateral",                 tipo: "Radiografía",           icono: "🩻", area: "Muslo"         },
  { cups: "874111", nombre: "Rx Mano AP y oblicua",                  tipo: "Radiografía",           icono: "🩻", area: "Mano"          },
  { cups: "874211", nombre: "Rx Muñeca AP y lateral",                tipo: "Radiografía",           icono: "🩻", area: "Muñeca"        },
  { cups: "874311", nombre: "Rx Antebrazo AP y lateral",             tipo: "Radiografía",           icono: "🩻", area: "Antebrazo"     },
  { cups: "874411", nombre: "Rx Codo AP y lateral",                  tipo: "Radiografía",           icono: "🩻", area: "Codo"          },
  { cups: "874511", nombre: "Rx Brazo/Húmero AP y lateral",          tipo: "Radiografía",           icono: "🩻", area: "Brazo"         },
  { cups: "875011", nombre: "Rx Hombro AP y lateral",                tipo: "Radiografía",           icono: "🩻", area: "Hombro"        },
  { cups: "871111", nombre: "Rx Cráneo AP y lateral",                tipo: "Radiografía",           icono: "🩻", area: "Cráneo"        },
  { cups: "871211", nombre: "Rx Senos paranasales",                  tipo: "Radiografía",           icono: "🩻", area: "Cráneo"        },
  { cups: "872011", nombre: "Rx Abdomen simple",                     tipo: "Radiografía",           icono: "🩻", area: "Abdomen"       },

  // ═══════════════════════════════════════════════
  //  ECOGRAFÍA
  // ═══════════════════════════════════════════════
  { cups: "880111", nombre: "Ecografía abdominal total",             tipo: "Ecografía",             icono: "📡", area: "Abdomen"       },
  { cups: "880121", nombre: "Ecografía hepática y vías biliares",    tipo: "Ecografía",             icono: "📡", area: "Abdomen"       },
  { cups: "880131", nombre: "Ecografía obstétrica I trimestre",      tipo: "Ecografía",             icono: "📡", area: "Obstetricia"   },
  { cups: "880141", nombre: "Ecografía obstétrica II–III trimestre", tipo: "Ecografía",             icono: "📡", area: "Obstetricia"   },
  { cups: "880151", nombre: "Ecografía obstétrica Doppler color",    tipo: "Ecografía Doppler",     icono: "📡", area: "Obstetricia"   },
  { cups: "880211", nombre: "Ecografía renal y vías urinarias",      tipo: "Ecografía",             icono: "📡", area: "Riñones"       },
  { cups: "880301", nombre: "Ecografía pélvica transvaginal",        tipo: "Ecografía",             icono: "📡", area: "Pelvis"        },
  { cups: "880311", nombre: "Ecografía pélvica transabdominal",      tipo: "Ecografía",             icono: "📡", area: "Pelvis"        },
  { cups: "880411", nombre: "Ecografía tiroidea",                    tipo: "Ecografía",             icono: "📡", area: "Cuello"        },
  { cups: "880421", nombre: "Ecografía mamaria bilateral",           tipo: "Ecografía",             icono: "📡", area: "Mama"          },
  { cups: "880431", nombre: "Ecografía testicular",                  tipo: "Ecografía",             icono: "📡", area: "Genitourinario"},
  { cups: "880511", nombre: "Ecografía de tejidos blandos",          tipo: "Ecografía",             icono: "📡", area: "General"       },
  { cups: "881011", nombre: "Eco Doppler venoso miembros inferiores",tipo: "Ecografía Doppler",     icono: "📡", area: "Vascular"      },
  { cups: "881021", nombre: "Eco Doppler arterial miembros inf.",    tipo: "Ecografía Doppler",     icono: "📡", area: "Vascular"      },
  { cups: "881031", nombre: "Eco Doppler carotídeo",                 tipo: "Ecografía Doppler",     icono: "📡", area: "Vascular"      },

  // ═══════════════════════════════════════════════
  //  TOMOGRAFÍA AXIAL COMPUTARIZADA (TAC / TC)
  // ═══════════════════════════════════════════════
  { cups: "924191", nombre: "TAC de cráneo sin contraste",           tipo: "Tomografía",            icono: "🧠", area: "Cráneo"        },
  { cups: "924192", nombre: "TAC de cráneo con contraste",           tipo: "Tomografía",            icono: "🧠", area: "Cráneo"        },
  { cups: "924193", nombre: "TAC de cráneo con y sin contraste",     tipo: "Tomografía",            icono: "🧠", area: "Cráneo"        },
  { cups: "924311", nombre: "TAC de columna cervical",               tipo: "Tomografía",            icono: "🧠", area: "Columna"       },
  { cups: "924321", nombre: "TAC de columna lumbar",                 tipo: "Tomografía",            icono: "🧠", area: "Columna"       },
  { cups: "924331", nombre: "TAC de columna dorsal",                 tipo: "Tomografía",            icono: "🧠", area: "Columna"       },
  { cups: "921311", nombre: "TAC de tórax sin contraste",            tipo: "Tomografía",            icono: "🧠", area: "Tórax"         },
  { cups: "921321", nombre: "TAC de tórax con contraste",            tipo: "Tomografía",            icono: "🧠", area: "Tórax"         },
  { cups: "921391", nombre: "TAC de abdomen sin contraste",          tipo: "Tomografía",            icono: "🧠", area: "Abdomen"       },
  { cups: "921392", nombre: "TAC de abdomen con contraste",          tipo: "Tomografía",            icono: "🧠", area: "Abdomen"       },
  { cups: "921393", nombre: "TAC abdomen y pelvis con contraste",    tipo: "Tomografía",            icono: "🧠", area: "Abdomen"       },
  { cups: "924411", nombre: "TAC de macizo facial/senos",            tipo: "Tomografía",            icono: "🧠", area: "Cráneo"        },
  { cups: "924511", nombre: "TAC de cuello con contraste",           tipo: "Tomografía",            icono: "🧠", area: "Cuello"        },
  { cups: "921411", nombre: "Angio TAC pulmonar (TEP)",              tipo: "Angio-Tomografía",      icono: "🧠", area: "Tórax"         },
  { cups: "924611", nombre: "TAC de rodilla",                        tipo: "Tomografía",            icono: "🧠", area: "Rodilla"       },

  // ═══════════════════════════════════════════════
  //  RESONANCIA MAGNÉTICA (RM)
  // ═══════════════════════════════════════════════
  { cups: "930181", nombre: "RM cerebral sin contraste",             tipo: "Resonancia Magnética",  icono: "🧲", area: "Cerebro"       },
  { cups: "930182", nombre: "RM cerebral con contraste",             tipo: "Resonancia Magnética",  icono: "🧲", area: "Cerebro"       },
  { cups: "930183", nombre: "RM cerebral con y sin contraste",       tipo: "Resonancia Magnética",  icono: "🧲", area: "Cerebro"       },
  { cups: "930191", nombre: "Angio RM cerebral (TOF)",               tipo: "Angio-RM",              icono: "🧲", area: "Cerebro"       },
  { cups: "930261", nombre: "RM columna lumbar sin contraste",       tipo: "Resonancia Magnética",  icono: "🧲", area: "Columna"       },
  { cups: "930262", nombre: "RM columna lumbar con contraste",       tipo: "Resonancia Magnética",  icono: "🧲", area: "Columna"       },
  { cups: "930271", nombre: "RM columna cervical sin contraste",     tipo: "Resonancia Magnética",  icono: "🧲", area: "Columna"       },
  { cups: "930281", nombre: "RM columna dorsal sin contraste",       tipo: "Resonancia Magnética",  icono: "🧲", area: "Columna"       },
  { cups: "930381", nombre: "RM rodilla sin contraste",              tipo: "Resonancia Magnética",  icono: "🧲", area: "Rodilla"       },
  { cups: "930382", nombre: "RM rodilla con contraste",              tipo: "Resonancia Magnética",  icono: "🧲", area: "Rodilla"       },
  { cups: "930391", nombre: "RM hombro sin contraste",               tipo: "Resonancia Magnética",  icono: "🧲", area: "Hombro"        },
  { cups: "930392", nombre: "RM hombro con contraste",               tipo: "Resonancia Magnética",  icono: "🧲", area: "Hombro"        },
  { cups: "930401", nombre: "RM cadera sin contraste",               tipo: "Resonancia Magnética",  icono: "🧲", area: "Cadera"        },
  { cups: "930411", nombre: "RM codo sin contraste",                 tipo: "Resonancia Magnética",  icono: "🧲", area: "Codo"          },
  { cups: "930421", nombre: "RM muñeca/mano sin contraste",          tipo: "Resonancia Magnética",  icono: "🧲", area: "Muñeca"        },
  { cups: "930431", nombre: "RM tobillo/pie sin contraste",          tipo: "Resonancia Magnética",  icono: "🧲", area: "Tobillo"       },
  { cups: "930501", nombre: "RM abdomen sin contraste",              tipo: "Resonancia Magnética",  icono: "🧲", area: "Abdomen"       },
  { cups: "930511", nombre: "RM de tórax sin contraste",             tipo: "Resonancia Magnética",  icono: "🧲", area: "Tórax"         },
  { cups: "930521", nombre: "RM de pelvis sin contraste",            tipo: "Resonancia Magnética",  icono: "🧲", area: "Pelvis"        },
  { cups: "930531", nombre: "RM de mama bilateral",                  tipo: "Resonancia Magnética",  icono: "🧲", area: "Mama"          },

  // ═══════════════════════════════════════════════
  //  MAMOGRAFÍA
  // ═══════════════════════════════════════════════
  { cups: "879111", nombre: "Mamografía bilateral diagnóstica",      tipo: "Mamografía",            icono: "🔬", area: "Mama"          },
  { cups: "879112", nombre: "Mamografía bilateral de tamizaje",      tipo: "Mamografía",            icono: "🔬", area: "Mama"          },
  { cups: "879113", nombre: "Mamografía unilateral",                 tipo: "Mamografía",            icono: "🔬", area: "Mama"          },

  // ═══════════════════════════════════════════════
  //  DENSITOMETRÍA ÓSEA
  // ═══════════════════════════════════════════════
  { cups: "880611", nombre: "Densitometría ósea columna y cadera",   tipo: "Densitometría",         icono: "🦴", area: "Óseo"          },
  { cups: "880621", nombre: "Densitometría ósea cuerpo total",       tipo: "Densitometría",         icono: "🦴", area: "Óseo"          },

];
