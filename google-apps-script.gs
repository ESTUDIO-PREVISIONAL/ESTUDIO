/**
 * CÓDIGO PARA GOOGLE APPS SCRIPT
 * Guarda cada consulta del formulario web como una fila en esta planilla,
 * y además te manda un email de notificación.
 *
 * PASOS PARA INSTALARLO (una sola vez):
 *
 * 1) Andá a https://sheets.google.com y creá una planilla nueva.
 *    Nombrala, por ejemplo, "Consultas Web - Estudio Gonzalez".
 *
 * 2) En la primera fila, escribí estos encabezados (uno por columna):
 *    Fecha | Nombre | Contacto | Tema | Mensaje
 *
 * 3) En el menú de la planilla, andá a Extensiones → Apps Script.
 *
 * 4) Borrá el código de ejemplo que aparece y pegá TODO este archivo.
 *
 * 5) Arriba a la derecha, hacé clic en "Implementar" → "Nueva implementación".
 *    - Tipo: "Aplicación web"
 *    - Ejecutar como: "Yo" (tu cuenta)
 *    - Quién puede acceder: "Cualquier usuario"
 *    Hacé clic en "Implementar" y autorizá los permisos que te pida Google
 *    (va a decir que "no es seguro" porque es un script propio — es normal,
 *    hacé clic en "Ir a (nombre del proyecto)" y luego "Permitir").
 *
 * 6) Te va a dar una URL que termina en "/exec". Copiala.
 *
 * 7) Pegá esa URL en el archivo contacto.html, reemplazando la línea:
 *    <form action="https://formspree.io/f/mqerpvqo" method="POST">
 *    por:
 *    <form action="PEGAR_ACA_LA_URL_DEL_APPS_SCRIPT" method="POST">
 *
 * Listo. Cada consulta nueva va a aparecer como fila en tu planilla,
 * y vos vas a recibir un email avisándote.
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Hoja 1") 
              || SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

  var nombre = e.parameter.nombre || "";
  var contacto = e.parameter.contacto || "";
  var tema = e.parameter.tema || "";
  var mensaje = e.parameter.mensaje || "";
  var fecha = new Date();

  sheet.appendRow([fecha, nombre, contacto, tema, mensaje]);

  // Email de notificación a tu casilla
  var destinatario = "gonzalezyasociadoslegales@gmail.com";
  var asunto = "Nueva consulta web: " + nombre + " (" + tema + ")";
  var cuerpo = "Nombre: " + nombre + "\n" +
               "Contacto: " + contacto + "\n" +
               "Tema: " + tema + "\n" +
               "Mensaje: " + mensaje + "\n\n" +
               "Se guardó automáticamente en tu planilla de consultas.";

  MailApp.sendEmail(destinatario, asunto, cuerpo);

  return ContentService.createTextOutput(
    JSON.stringify({ result: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}
