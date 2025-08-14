// Utilidad para generar PDF del pedido
// Requiere jspdf y jspdf-autotable
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export async function generateOrderPDF({ pedidoId, fecha, nombreUsuario, cartItems, deliveryType, deliveryVenezuela, client_id, order_origin, imgs, links, state }) {
  const doc = new jsPDF();

  // Encabezado principal enfocado al cliente
  doc.setFillColor(255,255,255);
  doc.rect(10, 10, 190, 18, 'F');
  doc.setFontSize(18);
  doc.setTextColor(200, 0, 0);
  doc.text('Resumen de Pedido', 14, 22);

  // Datos del cliente (solo ID, destacado)
  doc.setFillColor(245, 245, 245);
  doc.rect(10, 32, 190, 12, 'F');
  doc.setFontSize(11);
  doc.setTextColor(200, 0, 0);
  doc.text('Datos del Cliente', 14, 39);
  doc.setFontSize(10);
  doc.setTextColor(40, 40, 80);
  doc.setFont(undefined, 'bold');
  doc.text(`ID Cliente:`, 80, 39);
  doc.setFont(undefined, 'normal');
  doc.text(` ${nombreUsuario || ''}`, 105, 39);

  // Datos generales del pedido
  doc.setFillColor(255, 255, 255);
  doc.rect(10, 46, 190, 18, 'F');
  doc.setFontSize(11);
  doc.setTextColor(200, 0, 0);
  doc.text('Datos del Pedido', 14, 53);
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 80);
  // Mejorar formato de fecha
  let fechaLegible = fecha;
  if (fecha && fecha.length === 8) {
    // Si viene como '20250813'
    fechaLegible = `${fecha.slice(6,8)}/${fecha.slice(4,6)}/${fecha.slice(0,4)}`;
  }
  doc.text(`ID Pedido: ${pedidoId}`, 14, 59);
  doc.text(`Fecha: ${fechaLegible}`, 80, 59);
  doc.text(`Tipo de Envío: ${deliveryType}`, 140, 59);
  doc.text(`Entrega en Venezuela: ${deliveryVenezuela}`, 14, 64);
  doc.text(`Origen: ${order_origin || ''}`, 80, 64);
  doc.text(`Estado: ${state || ''}`, 140, 64);

  // Encabezado tabla productos
  let startY = 70;
  doc.setFillColor(200, 0, 0);
  doc.rect(10, startY, 190, 10, 'F');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text('PRODUCTOS', 14, startY + 7);

  // Tabla de productos estilo factura
  let y = startY + 13;
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    // Imagen
    let imgY = y;
    let imgX = 14;
    let imgWidth = 30;
    let imgHeight = 30;
    if (item.productImage && typeof item.productImage !== 'string') {
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(item.productImage);
      });
      doc.addImage(base64, 'JPEG', imgX, imgY, imgWidth, imgHeight);
    }
    // Detalles del producto
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 80);
    doc.setFont(undefined, 'bold');
    doc.text(`Modelo:`, imgX + imgWidth + 5, y + 5);
    doc.setFont(undefined, 'normal');
    // Si es producto con URL, mostrar guion en modelo
    let modelo = item.productUrl ? '-' : (item.productDescription || '');
    doc.text(modelo, imgX + imgWidth + 25, y + 5);
    doc.text(`Cantidad: ${item.quantity}`, imgX + imgWidth + 5, y + 12);
    doc.text(`URL: ${item.productUrl || ''}`, imgX + imgWidth + 5, y + 19);
    doc.text(`Especificaciones: ${item.technicalSpecs || ''}`, imgX + imgWidth + 5, y + 26);
    // Línea divisoria
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.3);
    doc.line(10, y + imgHeight + 2, 200, y + imgHeight + 2);
    y += imgHeight + 8;
  }

  return doc.output('blob');
}
