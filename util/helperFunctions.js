// Funciones de ayuda

// Obtener fecha de HD formato estandar YYYY-MM-DD
exports.getToday = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

//Genera la cabecera del reporte de ingresos
exports.generateHeader = (doc) => {
    doc     
      .text("Restaurant Siglo XXI", 110, 57)
      .fontSize(10)
      .text("Restaurant Siglo XXI", 200, 50, { align: "right" })
      .text("452 Holzapfel", 200, 65, { align: "right" })
      .text("Pucón, Chile, 10025", 200, 80, { align: "right" })
      .moveDown();
  }

 exports.generateCustomerInformation = (doc, invoice) => {
    doc
      .fillColor("#444444")
      .fontSize(20)
      .text("Ganancia Mensual", 50, 160);
  
    generateHr(doc, 185);
  
    const customerInformationTop = 200;
  
    doc
      .fontSize(10)
      .text("Cantidad de Ordenes:", 50, customerInformationTop)
      .font("Helvetica-Bold")
      .text(invoice.quantity, 150, customerInformationTop)
      .font("Helvetica")
      .text("Fecha de reporte:", 50, customerInformationTop + 15)
      .text(formatDate(new Date()), 150, customerInformationTop + 15)
      .text("Total de ganancias:", 50, customerInformationTop + 30)
      .text(invoice.subtotal,
        150,
        customerInformationTop + 30
      )
  }


  exports.generateInvoiceTable = (doc, invoice)  => {
    let i;
    const invoiceTableTop = 330;
  
    doc.font("Helvetica-Bold");
    generateTableRow(
      doc,
      invoiceTableTop,
      "Fecha",
      "Cantidad de Pedidos",
      "Monto Generado"
    );
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");
  
    for (i = 0; i < invoice.items.length; i++) {
      const item = invoice.items[i];
      const position = invoiceTableTop + (i + 1) * 30;
      generateTableRow(
        doc,
        position,
        item.date,
        item.quantityOrders,
        item.amount
      );
  
      generateHr(doc, position + 20);
    }
  
   
  
  }
  function generateTableRow(
    doc,
    y,
    fecha,
    quantityOrders,
    amount
  ) {
    doc
      .fontSize(10)
      .text(fecha, 50, y)
      .text(quantityOrders, 240, y)
      .text(amount, 0, y, {  align: "right" })
    
  }

  function generateHr(doc, y) {
    doc
      .strokeColor("#aaaaaa")
      .lineWidth(1)
      .moveTo(50, y)
      .lineTo(550, y)
      .stroke();
  }

  function generateHr2(doc, y) {
    doc
      .strokeColor("#aaaaaa")
      .lineWidth(1)
      .moveTo(50, y)
      .lineTo(370, y)
      .stroke();
  }
  function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    return year + "/" + month + "/" + day;
  }