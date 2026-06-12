from js import document, window, navigator, setTimeout
import random
import re

SYMBOLS = ['!', '@', '#', '$', '%', '&', '*', '-', '_', '=', '+', ';', ':', '?']
LEET = {
    'a': '4',
    'e': '3',
    'i': '1',
    'o': '0',
    's': '5',
    't': '7'
}


def element(id_name):
    return document.getElementById(id_name)


def go_to(nombre):
    pantallas = ['home', 'gen', 'val']

    for pantalla in pantallas:
        element(f's-{pantalla}').classList.toggle('active', pantalla == nombre)

    if nombre == 'gen':
        element('pass-results').style.display = 'none'
        element('pass-results').innerHTML = ''

        for input_id in ['w1', 'w2', 'w3']:
            element(input_id).value = ''

    if nombre == 'val':
        element('valInput').value = ''
        validate_password(None)


def pick(lista):
    return random.choice(lista)


def pick_num():
    return str(random.randint(10, 99))


def pick_year():
    return pick(['2024', '2025', '2026', '07', '99', '23'])


def cap(palabra):
    if not palabra:
        return ''
    return palabra[0].upper() + palabra[1:].lower()


def alt(palabra):
    resultado = ''

    for i, letra in enumerate(palabra):
        if i % 2 == 0:
            resultado += letra.upper()
        else:
            resultado += letra.lower()

    return resultado


def leet(palabra):
    resultado = ''

    for letra in palabra:
        minuscula = letra.lower()
        resultado += LEET.get(minuscula, letra)

    return resultado


def cumple_requisitos(password):
    return (
        len(password) >= 12 and
        re.search(r'[A-Z]', password) and
        re.search(r'[a-z]', password) and
        re.search(r'[0-9]', password) and
        re.search(r'[^A-Za-z0-9]', password)
    )


def completar(password):
    caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*'

    while len(password) < 12:
        password += random.choice(caracteres)

    return password


def build_password(words, estilo):
    sym1 = pick(SYMBOLS)
    sym2 = pick(SYMBOLS)

    a = words[0] if len(words) > 0 else 'clave'
    b = words[1] if len(words) > 1 else a
    c = words[2] if len(words) > 2 else b

    if estilo == 0:
        password = cap(a) + sym1 + cap(b) + pick_year() + sym2

    elif estilo == 1:
        password = cap(b) + sym1 + cap(a) + pick_num() + sym2

    else:
        password = alt(a) + sym1 + leet(b) + sym2 + cap(c)

    password = completar(password)

    return password


def generate_passwords(event=None):
    words = []

    for input_id in ['w1', 'w2', 'w3']:
        palabra = element(input_id).value.strip().lower()
        if palabra:
            words.append(palabra)

    if len(words) == 0:
        window.alert('Ingresa al menos una palabra para generar contraseñas.')
        return

    generadas = []
    usadas = set()

    for estilo in range(3):
        password = build_password(words, estilo)
        intentos = 0

        while password in usadas and intentos < 20:
            password = build_password(words, estilo) + pick(SYMBOLS) + str(random.randint(0, 9))
            intentos += 1

        usadas.add(password)
        generadas.append(password)

    mostrar_contrasenias(generadas)


def copiar_password(password, index):
    def copiar(event=None):
        navigator.clipboard.writeText(password)

        mensaje = element(f'cok{index}')
        mensaje.classList.add('show')

        def ocultar():
            mensaje.classList.remove('show')

        setTimeout(ocultar, 2200)

    return copiar


def mostrar_contrasenias(lista):
    container = element('pass-results')
    container.innerHTML = ''
    container.style.display = 'grid'

    for i, password in enumerate(lista):
        div = document.createElement('div')
        div.className = 'pass-card'

        div.innerHTML = f"""
            <div class="pass-label">Opción {i + 1}</div>
            <div class="pass-value" id="pv{i}">{password}</div>
            <div class="copy-row">
                <button class="btn-copy" id="cbtn{i}">
                    <i class="ti ti-copy"></i> Copiar
                </button>
                <span class="copy-ok" id="cok{i}">
                    <i class="ti ti-check"></i> ¡Copiada!
                </span>
            </div>
        """

        container.appendChild(div)

        element(f'cbtn{i}').addEventListener('click', copiar_password(password, i))


def toggle_visibility(event=None):
    input_password = element('valInput')
    icono = element('eyeIco')

    if input_password.type == 'password':
        input_password.type = 'text'
        icono.className = 'ti ti-eye-off'
    else:
        input_password.type = 'password'
        icono.className = 'ti ti-eye'


def set_req(id_name, cumple):
    requisito = element(id_name)
    icono = requisito.querySelector('.ri')

    if cumple:
        requisito.className = 'req pass'
        icono.className = 'ti ti-check ri'
    else:
        requisito.className = 'req fail'
        icono.className = 'ti ti-x ri'


def validate_password(event=None):
    password = element('valInput').value

    checks = {
        'len': len(password) >= 12,
        'up': re.search(r'[A-Z]', password) is not None,
        'lo': re.search(r'[a-z]', password) is not None,
        'num': re.search(r'[0-9]', password) is not None,
        'sym': re.search(r'[^A-Za-z0-9]', password) is not None
    }

    set_req('r-len', checks['len'])
    set_req('r-up', checks['up'])
    set_req('r-lo', checks['lo'])
    set_req('r-num', checks['num'])
    set_req('r-sym', checks['sym'])

    score = sum(1 for valor in checks.values() if valor)

    fill = element('strFill')
    badge = element('strBadge')
    ok_msg = element('okMsg')

    if len(password) == 0:
        fill.style.width = '0%'
        fill.style.backgroundColor = ''
        badge.textContent = '—'
        badge.className = 'str-badge d'
        ok_msg.classList.remove('show')
        return

    if score <= 2:
        fill.style.width = '28%'
        fill.style.backgroundColor = '#e8708a'
        badge.textContent = 'Débil'
        badge.className = 'str-badge d'

    elif score <= 4:
        fill.style.width = '62%'
        fill.style.backgroundColor = '#c89020'
        badge.textContent = 'Media'
        badge.className = 'str-badge m'

    else:
        fill.style.width = '100%'
        fill.style.backgroundColor = '#2d8a5e'
        badge.textContent = 'Fuerte'
        badge.className = 'str-badge f'

    ok_msg.classList.toggle('show', score == 5)


def preparar_eventos():
    element('btnGen').addEventListener('click', lambda event: go_to('gen'))
    element('btnVal').addEventListener('click', lambda event: go_to('val'))

    element('btnGenerate').addEventListener('click', generate_passwords)
    element('btnToggle').addEventListener('click', toggle_visibility)
    element('valInput').addEventListener('input', validate_password)

    botones_home = document.querySelectorAll('.btnHome')
    for boton in botones_home:
        boton.addEventListener('click', lambda event: go_to('home'))

    tarjetas = document.querySelectorAll('.nav-card')
    for tarjeta in tarjetas:
        def key_event(event, card=tarjeta):
            if event.key == 'Enter' or event.key == ' ':
                card.click()

        tarjeta.addEventListener('keydown', key_event)


preparar_eventos()