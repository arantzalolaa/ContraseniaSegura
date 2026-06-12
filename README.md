# Programa de Contraseña Segura

## Descripción del proyecto

Este proyecto consiste en una página web interactiva para generar y validar contraseñas seguras. La práctica fue desarrollada con una interfaz en HTML y CSS, mientras que la lógica principal del programa se implementó en Python usando Brython, una herramienta que permite ejecutar código Python directamente en el navegador.

El sistema cuenta con dos módulos principales:

1. **Generador de contraseñas seguras**  
   Permite ingresar de una a tres palabras base y, a partir de ellas, genera diferentes opciones de contraseñas con letras mayúsculas, minúsculas, números y símbolos especiales.

2. **Validador de contraseñas**  
   Analiza una contraseña escrita por el usuario y verifica si cumple con los requisitos mínimos de seguridad.

---

## Objetivo de la práctica

El objetivo de esta práctica es desarrollar una aplicación funcional utilizando Python como lenguaje principal para la lógica del programa, integrándolo en una página web publicada mediante GitHub Pages.

Además, se busca reforzar el uso de buenas prácticas de seguridad informática relacionadas con la creación de contraseñas robustas.

---

## Tecnologías utilizadas

- **HTML5:** estructura de la página web.
- **CSS3:** diseño visual y estilos de la interfaz.
- **Python:** lógica del generador y validador de contraseñas.
- **Brython:** ejecución de Python dentro del navegador.
- **GitHub:** almacenamiento del proyecto.
- **GitHub Pages:** publicación de la página web.

---

## Estructura del proyecto

```txt
ContraseniaSegura/
│
├── index.html      # Estructura principal de la página
├── style.css       # Estilos visuales del proyecto
├── app.py          # Lógica del programa desarrollada en Python
└── README.md       # Documentación de la práctica
```

---

## Funcionamiento del programa

### Pantalla principal

Al abrir la página, el usuario puede elegir entre dos opciones:

- **Generador**
- **Validador**

Cada opción dirige a una sección diferente de la aplicación.

---

### Generador de contraseñas

El usuario puede escribir entre una y tres palabras. El programa utiliza esas palabras para crear tres contraseñas diferentes aplicando combinaciones como:

- Uso de mayúsculas y minúsculas.
- Sustitución de letras por números.
- Agregado de símbolos especiales.
- Agregado de números o años.
- Longitud mínima de 12 caracteres.

Ejemplo de una contraseña generada:

```txt
Casa#Azul2026!
```

---

### Validador de contraseñas

El usuario escribe una contraseña y el sistema revisa si cumple con los siguientes requisitos:

- Mínimo 12 caracteres.
- Al menos una letra mayúscula.
- Al menos una letra minúscula.
- Al menos un número.
- Al menos un símbolo especial.

Dependiendo del cumplimiento de los requisitos, el sistema muestra el nivel de seguridad:

- Débil
- Media
- Fuerte

Cuando la contraseña cumple todos los requisitos, se muestra un mensaje indicando que es segura.

---

## Archivo principal de Python

La lógica del programa se encuentra en el archivo `app.py`. En este archivo se programaron las funciones para:

- Cambiar entre pantallas.
- Generar contraseñas seguras.
- Validar los requisitos de seguridad.
- Mostrar el nivel de seguridad.
- Copiar contraseñas generadas.
- Mostrar u ocultar la contraseña escrita.

---

## Publicación en GitHub Pages

Para publicar el proyecto en GitHub Pages se deben seguir estos pasos:

1. Subir todos los archivos al repositorio de GitHub.
2. Entrar a la configuración del repositorio.
3. Ir a la sección **Pages**.
4. Seleccionar la rama `main`.
5. Elegir la carpeta `/root`.
6. Guardar los cambios.

Después de unos minutos, la página queda disponible en una URL similar a:

```txt
https://arantzalolaa.github.io/ContraseniaSegura/
```

---

## Conclusión

Esta práctica permitió desarrollar una aplicación web funcional utilizando Python dentro del navegador. El proyecto demuestra cómo se puede combinar una interfaz web con lógica programada en Python para crear una herramienta útil relacionada con la seguridad informática.

El resultado final es una página publicada en GitHub Pages que permite generar contraseñas más seguras y validar si una contraseña cumple con los requisitos recomendados.

---

## Autor

**Arantza Lizárraga Somoza**  
Grupo: **TI-9-1**  
Materia: **Seguridad Informática**
