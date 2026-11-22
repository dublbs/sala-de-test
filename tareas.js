// Banco de tareas del prototipo Enoturismo Chile (uso interno del equipo).
// escenario: lo que lee el participante. criterio: cómo saber que la logró (solo moderación).
// exito: pantalla de escritorio que la marca como completada sola (la sala usa la equivalente en tablet y celular). Vacío = se marca a mano.
// ruta: camino más corto en el prototipo. perfil: a quién representa.
window.BANCO = [
  // ---------- Navegación general ----------
  { id: 'N1', area: 'Navegación', perfil: 'Todos', escenario: 'Estás en la página de un valle. Vuelve a la página de inicio.', criterio: 'Vuelve a la landing con el logo, "Inicio" o el menú', exito: '329:16266', ruta: 'Valle › Logo o Inicio › Landing' },
  { id: 'N2', area: 'Navegación', perfil: 'Todos', escenario: 'Quieres ver todas las experiencias disponibles. Llega a esa sección usando el menú.', criterio: 'Abre Explorar › Experiencias desde el menú', exito: '680:5000', ruta: 'Menú › Experiencias' },
  { id: 'N3', area: 'Navegación', perfil: 'Todos', escenario: 'Bajaste hasta el final de la página. Vuelve arriba sin hacer scroll.', criterio: 'Usa el botón "↑ Arriba"', exito: '', ruta: 'Botón flotante ↑ Arriba' },
  { id: 'N4', area: 'Navegación', perfil: 'Celular y tablet', escenario: 'Abre el menú del sitio, revisa las secciones y ciérralo.', criterio: 'Abre y cierra la hoja del menú', exito: '', ruta: '☰ Menú › ✕' },
  { id: 'N5', area: 'Navegación', perfil: 'Todos', escenario: 'Estás viendo experiencias. Cambia a ver los packs sin volver al inicio.', criterio: 'Usa las pestañas de Explorar', exito: '680:5604', ruta: 'Explorar › pestaña Packs' },
  // ---------- Búsqueda ----------
  { id: 'B1', area: 'Búsqueda', perfil: 'Planifica una escapada', escenario: 'Quieres hacer algo en el Valle de Colchagua. Usa el buscador para ver qué hay.', criterio: 'Elige Colchagua en "Valle" y presiona Buscar', exito: '680:5000', ruta: 'Buscador › Valle › Colchagua › Buscar' },
  { id: 'B2', area: 'Búsqueda', perfil: 'Planifica una escapada', escenario: 'Quieres saber qué eventos hay en las próximas fechas. Búscalo desde el inicio.', criterio: 'Llega a la agenda desde "Cuándo" o "Ver agenda"', exito: '680:5213', ruta: 'Buscador › Cuándo, o Ver agenda' },
  { id: 'B3', area: 'Búsqueda', perfil: 'Todos', escenario: 'Buscas una cata o un tour. Usa el campo "¿Qué buscas?".', criterio: 'Llega a Explorar › Experiencias desde el campo', exito: '680:5000', ruta: 'Buscador › ¿Qué buscas?' },
  // ---------- Valles ----------
  { id: 'V1', area: 'Valles', perfil: 'Explora por territorio', escenario: 'Recorre los valles de norte a sur y detente en uno del sur del país.', criterio: 'Cambia de valle en la línea hasta uno del sur (Itata, Biobío u otro)', exito: '', ruta: 'Línea de valles (o Cambiar valle en celular)' },
  { id: 'V2', area: 'Valles', perfil: 'Explora por territorio', escenario: 'Elige un valle que te llame la atención y entra a conocerlo en detalle.', criterio: 'Abre la página del valle', exito: '680:5721', ruta: 'Línea de valles › Conocer el valle' },
  { id: 'V3', area: 'Valles', perfil: 'Explora por territorio', escenario: 'Estás en la página de un valle. Mira qué experiencias tiene ese valle.', criterio: 'Usa "Ver experiencias del valle"', exito: '680:5000', ruta: 'Valle › Ver experiencias' },
  { id: 'V4', area: 'Valles', perfil: 'Planifica una escapada', escenario: 'Quieres ir este fin de semana al Valle de Colchagua. Busca qué evento hay y resérvalo.', criterio: 'Llega a Colchagua y abre la reserva del evento', exito: '639:5295', ruta: 'Línea de valles › Colchagua › Reservar' },
  { id: 'V5', area: 'Valles', perfil: 'Explora por territorio', escenario: 'Estás viendo un valle. Vuelve a la lista de todos los valles.', criterio: 'Usa "Volver a la línea de valles"', exito: '329:16266', ruta: 'Valle › Volver a los valles' },
  // ---------- Vendimias ----------
  { id: 'F1', area: 'Vendimias', perfil: 'Va a vendimias', escenario: 'Quieres saber qué fiestas de la vendimia hay cerca de Santiago. Míralas por zona.', criterio: 'Abre "Vendimias por zona"', exito: '639:5332', ruta: 'Mosaico › Ver vendimias por zona' },
  { id: 'F2', area: 'Vendimias', perfil: 'Va a vendimias', escenario: 'Quieres ir a una fiesta de la vendimia en marzo. Encuentra una y revisa su fecha y lugar.', criterio: 'Abre la ficha de una fiesta', exito: '651:3028', ruta: 'Mosaico › una fiesta' },
  { id: 'F3', area: 'Vendimias', perfil: 'Va a vendimias', escenario: 'Elige una fiesta de la vendimia y compra tu entrada.', criterio: 'Desde la ficha, llega a la reserva', exito: '639:5295', ruta: 'Mosaico › fiesta › Reservar entrada' },
  { id: 'F4', area: 'Vendimias', perfil: 'Va a vendimias', escenario: 'Viste una fiesta que te gustó. Búscala en la agenda para ver qué más hay esos días.', criterio: 'Usa "Ver en la agenda" desde la ficha', exito: '680:5213', ruta: 'Ficha › Ver en la agenda' },
  // ---------- Agenda ----------
  { id: 'A1', area: 'Agenda', perfil: 'Va a vendimias', escenario: 'En la agenda, muestra solo las fiestas de la vendimia.', criterio: 'Activa el filtro "Vendimias"', exito: '', ruta: 'Agenda › Vendimias' },
  { id: 'A2', area: 'Agenda', perfil: 'Planifica una escapada', escenario: 'Te interesan las ferias y catas. Encuentra una y anótala (dinos su fecha).', criterio: 'Filtra "Ferias y catas" y dice la fecha', exito: '', ruta: 'Agenda › Ferias y catas' },
  { id: 'A3', area: 'Agenda', perfil: 'Planifica una escapada', escenario: 'Desde la agenda, reserva un evento de febrero.', criterio: 'Abre la reserva desde una fila de la agenda', exito: '639:5295', ruta: 'Agenda › fila › Reservar' },
  // ---------- Experiencias ----------
  { id: 'E1', area: 'Experiencias', perfil: 'Planifica una escapada', escenario: 'Muestra solo las experiencias del Valle de Casablanca.', criterio: 'Filtra por Casablanca', exito: '', ruta: 'Explorar › chip Casablanca' },
  { id: 'E2', area: 'Experiencias', perfil: 'Planifica una escapada', escenario: 'Tienes poco presupuesto. Encuentra la experiencia más barata y resérvala.', criterio: 'Elige la de menor precio y abre su reserva', exito: '639:5295', ruta: 'Experiencias › comparar precios › Reservar' },
  { id: 'E3', area: 'Experiencias', perfil: 'Planifica una escapada', escenario: 'Busca una experiencia que incluya almuerzo y resérvala.', criterio: 'Encuentra "Tour + Almuerzo" y abre la reserva', exito: '639:5295', ruta: 'Experiencias › Tour + Almuerzo › Reservar' },
  // ---------- Packs ----------
  { id: 'P1', area: 'Packs', perfil: 'Quiere todo resuelto', escenario: 'Quieres un viaje con todo incluido. Compara los packs y revisa qué incluye uno.', criterio: 'Abre el detalle de un pack', exito: '639:5315', ruta: 'Packs › Ver pack' },
  { id: 'P2', area: 'Packs', perfil: 'Quiere todo resuelto', escenario: 'Tienes un presupuesto acotado. Compara los packs y reserva el que más te convenga.', criterio: 'Abre el detalle de un pack y llega a la reserva', exito: '639:5295', ruta: 'Packs › Ver pack › Reservar pack' },
  // ---------- Reserva ----------
  { id: 'R1', area: 'Reserva', perfil: 'Todos', escenario: 'Reserva una experiencia para 4 personas en el horario de la tarde (18:00) y sigue hasta pagar.', criterio: 'Ajusta personas y horario y continúa a Enoticket', exito: '684:8199', ruta: 'Reserva › 18:00 › + personas › Continuar' },
  { id: 'R2', area: 'Reserva', perfil: 'Todos', escenario: 'Empezaste a reservar, pero te arrepentiste. Cancela sin reservar.', criterio: 'Cierra la ventana de reserva', exito: '', ruta: 'Reserva › ✕ o fuera' },
  { id: 'R3', area: 'Reserva', perfil: 'Todos', escenario: 'Completa una reserva y vuelve al sitio después de pagar.', criterio: 'Llega a Enoticket y vuelve; ve el aviso de reserva enviada', exito: '706:9525', ruta: 'Reserva › Continuar › Volver al sitio' },
  // ---------- Viñas (comercial) ----------
  { id: 'S1', area: 'Para viñas', perfil: 'Viña que quiere sumarse', escenario: 'Tienes una viña y quieres aparecer en el sitio. Envía tu solicitud.', criterio: 'Completa el formulario y llega a "Solicitud enviada"', exito: '639:5379', ruta: 'Para viñas › Súmate a la red › Enviar' },
  { id: 'S2', area: 'Para viñas', perfil: 'Viña que quiere sumarse', escenario: 'Averigua si sumar tu viña a la red tiene costo.', criterio: 'Encuentra "Sumarte es gratuito" o la pregunta frecuente', exito: '', ruta: 'Franja Para viñas, o Preguntas frecuentes' },
  // ---------- Información y contacto ----------
  { id: 'C1', area: 'Información', perfil: 'Todos', escenario: 'Tienes una duda sobre el programa. Escríbele a Enoturismo Chile.', criterio: 'Envía el formulario de contacto', exito: '723:7373', ruta: 'Footer › Contacto › Enviar mensaje' },
  { id: 'C2', area: 'Información', perfil: 'Todos', escenario: 'Averigua si Enoturismo Chile te cobra las experiencias o si pagas a la viña.', criterio: 'Encuentra la respuesta en Preguntas frecuentes', exito: '724:7505', ruta: 'Footer › Preguntas frecuentes' },
  { id: 'C3', area: 'Información', perfil: 'Todos', escenario: 'Quieres saber qué hacen con tus datos personales. Encuéntralo.', criterio: 'Llega a Términos (punto 9) o a la pregunta frecuente', exito: '724:7609', ruta: 'Footer › Términos y condiciones' },
  { id: 'C4', area: 'Información', perfil: 'Todos', escenario: '¿Dónde queda la oficina de Enoturismo Chile? Encuentra la dirección.', criterio: 'La encuentra en el footer o en Contacto', exito: '', ruta: 'Footer, o Contacto' },
  { id: 'C5', area: 'Información', perfil: 'Todos', escenario: 'Quieres seguir a Enoturismo Chile en redes. Encuentra su Instagram.', criterio: 'Hace clic en Instagram (abre fuera del prototipo)', exito: '', ruta: 'Footer › Instagram' },
  // ---------- Temporada ----------
  { id: 'T1', area: 'Temporada', perfil: 'Todos', escenario: 'Mira qué recomienda el sitio para esta temporada.', criterio: 'Usa el banner de temporada (Ver agenda)', exito: '680:5213', ruta: 'Banner de temporada › Ver agenda' }
];
// Las 3 de la pauta (EVA 3.2)
window.BANCO_RECOMENDADAS = ['V4', 'F2', 'P2'];
