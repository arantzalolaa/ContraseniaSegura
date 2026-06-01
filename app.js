// =============================================
//  Programa de Contraseña Segura — Lógica
//  Arantza Lizárraga Somoza | TI-9-1
// =============================================

// --- Navegación entre pantallas ---
function goTo(nombre) {
  ['home', 'gen', 'val'].forEach(function(id) {
    document.getElementById('s-' + id).classList.toggle('active', id === nombre);
  });

  if (nombre === 'gen') {
    document.getElementById('pass-results').style.display = 'none';
    ['w1', 'w2', 'w3'].forEach(function(id) {
      document.getElementById(id).value = '';
    });
  }

  if (nombre === 'val') {
    document.getElementById('valInput').value = '';
    validatePw();
  }
}

// Tecla Enter/Espacio en tarjetas de inicio
document.querySelectorAll('.nav-card').forEach(function(card) {
  card.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') card.click();
  });
});


// =============================================
//  MÓDULO 1: GENERADOR DE CONTRASEÑAS
// =============================================

var SYMBOLS = ['!', '@', '#', '$', '%', '&', '*', '-', '_', '=', '+', ';', ':', '?'];
var LEET    = { a:'4', e:'3', i:'1', o:'0', s:'5', t:'7' };

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickNum() {
  // número de 2 dígitos
  return String(Math.floor(Math.random() * 90 + 10));
}

function pickYear() {
  return pick(['2024', '2025', '2026', '07', '99', '23']);
}

// Primera letra mayúscula
function cap(w) {
  return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
}

// Alterna mayúsculas y minúsculas por posición
function alt(w) {
  return w.split('').map(function(c, i) {
    return i % 2 === 0 ? c.toUpperCase() : c.toLowerCase();
  }).join('');
}

// Sustituye letras por números (leet-speak)
function leet(w) {
  return w.split('').map(function(c) {
    var lower = c.toLowerCase();
    return LEET[lower] !== undefined ? LEET[lower] : c;
  }).join('');
}

// Garantiza que la contraseña cumpla todos los requisitos
function cumpleRequisitos(pw) {
  return (
    pw.length >= 12 &&
    /[A-Z]/.test(pw) &&
    /[a-z]/.test(pw) &&
    /[0-9]/.test(pw) &&
    /[^A-Za-z0-9]/.test(pw)
  );
}

// Agrega caracteres faltantes si es necesario
function completar(pw) {
  var todos = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';
  while (pw.length < 12) {
    pw += todos[Math.floor(Math.random() * todos.length)];
  }
  return pw;
}

// Construye una contraseña según el estilo (0, 1 o 2)
function buildPassword(words, estilo) {
  var sym1 = pick(SYMBOLS);
  var sym2 = pick(SYMBOLS);
  var pw = '';

  var a = words[0] || 'clave';
  var b = words[1] || a;
  var c = words[2] || b;

  if (estilo === 0) {
    // Estilo: Cap + símbolo + Cap + año + símbolo
    // Ejemplo: Casa#Azul2025!
    pw = cap(a) + sym1 + cap(b) + pickYear() + sym2;

  } else if (estilo === 1) {
    // Estilo: Cap + símbolo + Cap + 2 dígitos + símbolo
    // Ejemplo: Azul&Casa91$
    pw = cap(b) + sym1 + cap(a) + pickNum() + sym2;

  } else {
    // Estilo: alternado + símbolo + leet + símbolo + cap
    // Ejemplo: AzUl_C4s4!Sol
    pw = alt(a) + sym1 + leet(b) + sym2 + cap(c);
  }

  // Si quedó corta, completar hasta 12 caracteres
  pw = completar(pw);
  return pw;
}

function generatePasswords() {
  var words = [
    document.getElementById('w1').value.trim().toLowerCase(),
    document.getElementById('w2').value.trim().toLowerCase(),
    document.getElementById('w3').value.trim().toLowerCase()
  ].filter(function(w) { return w !== ''; });

  if (words.length === 0) {
    alert('Ingresa al menos una palabra para generar contraseñas.');
    return;
  }

  var generadas = [];
  var usadas    = new Set();

  for (var estilo = 0; estilo < 3; estilo++) {
    var pw = buildPassword(words, estilo);
    var intentos = 0;
    // Re-intentar si sale duplicada
    while (usadas.has(pw) && intentos < 20) {
      pw = buildPassword(words, estilo) + pick(SYMBOLS) + Math.floor(Math.random() * 9);
      intentos++;
    }
    usadas.add(pw);
    generadas.push(pw);
  }

  mostrarContrasenias(generadas);
}

function mostrarContrasenias(lista) {
  var container = document.getElementById('pass-results');
  container.innerHTML = '';
  container.style.display = 'grid';

  lista.forEach(function(pw, i) {
    var div = document.createElement('div');
    div.className = 'pass-card';
    div.innerHTML =
      '<div class="pass-label">Opción ' + (i + 1) + '</div>' +
      '<div class="pass-value" id="pv' + i + '">' + pw + '</div>' +
      '<div class="copy-row">' +
        '<button class="btn-copy" id="cbtn' + i + '">' +
          '<i class="ti ti-copy"></i> Copiar' +
        '</button>' +
        '<span class="copy-ok" id="cok' + i + '">' +
          '<i class="ti ti-check"></i> ¡Copiada!' +
        '</span>' +
      '</div>';
    container.appendChild(div);

    // Evento del botón copiar
    (function(contrasena, idx) {
      document.getElementById('cbtn' + idx).addEventListener('click', function() {
        navigator.clipboard.writeText(contrasena).then(function() {
          var ok = document.getElementById('cok' + idx);
          ok.classList.add('show');
          setTimeout(function() { ok.classList.remove('show'); }, 2200);
        });
      });
    })(pw, i);
  });
}


// =============================================
//  MÓDULO 2: VALIDADOR DE CONTRASEÑAS
// =============================================

function toggleVis() {
  var inp = document.getElementById('valInput');
  var ico = document.getElementById('eyeIco');
  if (inp.type === 'password') {
    inp.type = 'text';
    ico.className = 'ti ti-eye-off';
  } else {
    inp.type = 'password';
    ico.className = 'ti ti-eye';
  }
}

function setReq(id, cumple) {
  var el   = document.getElementById(id);
  var icon = el.querySelector('.ri');
  el.className  = 'req ' + (cumple ? 'pass' : 'fail');
  icon.className = (cumple ? 'ti ti-check' : 'ti ti-x') + ' ri';
}

function validatePw() {
  var v = document.getElementById('valInput').value;

  var checks = {
    len: v.length >= 12,
    up:  /[A-Z]/.test(v),
    lo:  /[a-z]/.test(v),
    num: /[0-9]/.test(v),
    sym: /[^A-Za-z0-9]/.test(v)
  };

  setReq('r-len', checks.len);
  setReq('r-up',  checks.up);
  setReq('r-lo',  checks.lo);
  setReq('r-num', checks.num);
  setReq('r-sym', checks.sym);

  var score = Object.values(checks).filter(Boolean).length;

  var fill  = document.getElementById('strFill');
  var badge = document.getElementById('strBadge');
  var okMsg = document.getElementById('okMsg');

  if (v.length === 0) {
    fill.style.width           = '0%';
    fill.style.backgroundColor = '';
    badge.textContent          = '—';
    badge.className            = 'str-badge d';
    okMsg.classList.remove('show');
    return;
  }

  if (score <= 2) {
    fill.style.width           = '28%';
    fill.style.backgroundColor = '#e8708a';
    badge.textContent          = 'Débil';
    badge.className            = 'str-badge d';
  } else if (score <= 4) {
    fill.style.width           = '62%';
    fill.style.backgroundColor = '#c89020';
    badge.textContent          = 'Media';
    badge.className            = 'str-badge m';
  } else {
    fill.style.width           = '100%';
    fill.style.backgroundColor = '#2d8a5e';
    badge.textContent          = 'Fuerte';
    badge.className            = 'str-badge f';
  }

  okMsg.classList.toggle('show', score === 5);
}