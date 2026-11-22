# Sala de test · Enoturismo Chile

Herramienta para hacer los test de usabilidad del prototipo de Figma. Registra lo que pasa en el prototipo, transcribe la voz en vivo y arma la ficha por usuario y la matriz de hallazgos con el formato de la pauta. No graba video: cada sesión pesa unos pocos KB.

## Qué hay en esta carpeta

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La sala de test. Se abre en Chrome. |
| `mapa.js` | Nombres legibles de las pantallas y botones del prototipo (exportado del Figma el 21 nov 2026). |
| `extension-respaldo/` | Extensión de Chrome de respaldo (opción 2). |

## Probar ahora (sin configurar nada)

Abre `index.html` en Chrome y presiona **Probar en modo demostración**. Simula una sesión de 30 segundos. Después presiona **Terminar sesión** para ver la ficha y la matriz.

## Configurar para un test real (una sola vez)

1. **Publicar la sala con https.** La forma más simple es GitHub Pages:
   1. Crea un repositorio (por ejemplo `sala-de-test`) y sube `index.html` y `mapa.js`.
   2. En **Settings › Pages**, publica la rama `main`.
   3. La sala queda en `https://TU-USUARIO.github.io/sala-de-test/`.

   El micrófono y la transcripción solo funcionan con https.
2. **Crear la app de Figma** (sirve para que el prototipo envíe sus avisos):
   1. Entra a la página de apps para desarrolladores de Figma y crea una app con nombre, sitio web y logo.
   2. Copia el **Client ID**.
   3. En la configuración del **Embed API** de la app, agrega en *Allowed origins* el origen de la sala, por ejemplo `https://TU-USUARIO.github.io`.
3. **Instalar el respaldo** (opcional, recomendado):
   1. En Chrome, abre `chrome://extensions`.
   2. Activa el **Modo de desarrollador**.
   3. Presiona **Cargar descomprimida** y elige la carpeta `extension-respaldo`.

## Modo remoto en vivo (link para el participante)

1. En la sala, elige **Remota en vivo (link)**, revisa las tareas y su **pantalla de éxito**, y presiona **Crear link para el participante**.
2. Copia el link y envíaselo. El participante necesita Chrome en computador.
3. Al abrir el link, el participante acepta, comparte **esta pestaña** y el micrófono, y hace las tareas una por una (Empezar · Terminé · Me rindo). Si llega a la pantalla de éxito, la tarea se marca sola.
4. Tú ves en vivo su pantalla, escuchas su voz, y en la sala ves los clics, la transcripción y el **mapa de calor** (pestaña Calor). Puedes enviarle mensajes y reiniciar su prototipo.
5. Cuando termine, presiona **Terminar sesión**: ficha, matriz y mapa de calor (descargable en PNG).

La conexión es directa entre los dos navegadores (PeerJS). No se graba video ni audio. Tu pestaña debe quedar abierta durante el test.

**Mapa de calor:** se dibuja sobre un esquema de cada pantalla (bloques y zonas con clic, exportados del Figma en `pantallas.js`). Si los puntos aparecen corridos en páginas largas, desactiva "Sumar scroll".

**Client ID del equipo:** pégalo en la constante `CID_EQUIPO` de `index.html` para que venga cargado siempre. El botón "Mi app en Figma ↗" abre la página donde se copia.

## Hacer una sesión (presencial)

1. Abre la sala publicada.
2. Pega el link del prototipo, el Client ID, el participante y las tareas (vienen T1 a T3 cargadas).
3. Presiona **Iniciar sesión** y permite el micrófono.
4. En la barra de arriba, revisa los tres indicadores:
   - **Figma** en verde: llegan los avisos del prototipo.
   - **Respaldo** en verde: la extensión está activa.
   - **Voz** en verde: está transcribiendo.
5. Por cada tarea:
   1. Lee el escenario en voz alta.
   2. Presiona **Iniciar**.
   3. Al terminar, marca **Completada**, **Con dificultad** o **No completada**.
6. Cuando veas una duda o un error, presiona **Marcar fricción**. Guarda el minuto, la pantalla y lo que la persona dijo en los últimos 15 segundos.
7. Presiona **Terminar sesión**, corrige lo que haga falta en las tablas y descarga:
   - `sesion-P1.json`: la sesión completa, para consolidar después;
   - `ficha-P1.csv`: la ficha por usuario, con los campos de la pauta;
   - `matriz-P1.csv`: problema, severidad, frecuencia, acción en Figma y evidencia.

   **Copiar para IA** copia el registro con instrucciones. Puedes pegarlo en Claude para pedir un resumen redactado.
8. Después de todas las sesiones, usa **Consolidar sesiones**: carga los `.json` y obtienes la matriz con la frecuencia real (por ejemplo, "Constante (4/5)") y el éxito por tarea.

## Exploración libre al final

Viene activada por defecto (casilla bajo las tareas, con tiempo sugerido de 2, 3 o 5 min). Después de las tareas, el participante recorre el sitio sin instrucciones y piensa en voz alta. No tiene éxito ni fracaso ni escala de facilidad: al terminar solo se le pregunta qué le llamó la atención.

- Todo se registra aparte, con la etiqueta "Libre": recorrido de pantallas en orden, clics, clics sin respuesta, voz y comentario.
- En la ficha aparece como fila propia ("Exploración libre (sin tarea)").
- En el mapa de calor del resumen y del consolidado puedes ver "Solo tareas", "Solo exploración libre" o ambos.
- En el consolidado: qué pantallas visitó cada participante y adónde fueron primero.
- En remoto, a los minutos sugeridos le aparece un aviso suave: "Cuando quieras, presiona Terminé".

## Qué registra y qué no

- **Registra:**
  - pantallas recorridas;
  - clics, y si tuvieron respuesta o no (los clics sin respuesta muestran fricción);
  - cambios de estado (filtros, contador, pestañas);
  - texto de la voz;
  - marcas de quien modera;
  - tiempos.
- **No registra:** video, audio ni capturas de pantalla.
- **Respaldo (extensión):** solo registra la posición de los clics y los cambios de pantalla. No sabe si un clic cayó en un botón. Se usa únicamente si Figma no envía avisos.
- **Hallazgos propuestos:** salen de reglas simples, no de IA. Por ejemplo:
  - "2 o más clics sin respuesta en la misma pantalla";
  - "15 segundos o más sin acción";
  - "tarea no completada".

  El equipo revisa, corrige y completa la "Acción en Figma".

## Cosas para probar el primer día

- **Si la persona no tiene sesión en Figma:** el foro de Figma reporta casos en que el prototipo no envía avisos. Si pasa, la sala muestra una alerta. Pídele entrar con una cuenta gratuita, o sigue con el respaldo.
- **Si Figma pide iniciar sesión o contraseña:** queda anotado en el registro.
- **Consentimiento:** la transcripción usa el reconocimiento de voz de Chrome, que procesa el audio en servidores de Google. Inclúyelo en el consentimiento.

## Si cambian el prototipo

Los botones nuevos aparecen como "elemento 123:456" hasta que se vuelva a exportar `mapa.js` desde el Figma.
