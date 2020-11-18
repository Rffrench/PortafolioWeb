const axios = require('axios');
const sendErrors = require('../util/errorFunctions');
const PDFDocument =  require('pdfkit');
const helperFunctions = require('../util/helperFunctions');


  exports.getIncomeReport = async function(req, res, next) {
    const Income = {
        date: '11/2020',
        quantity:91,
        items: [
          {
            date: "01/11/2020",
            quantityOrders: 90,
            amount: 607000
          },
          {
            date: "01/11/2020",
            quantityOrders: 1,
            amount: 1
          }
        ],
        subtotal: 607001        
      };

    var myDoc = new PDFDocument({bufferPages: true});
    
    let buffers = [];
    myDoc.on('data', buffers.push.bind(buffers));
    myDoc.on('end', () => {
    
        let pdfData = Buffer.concat(buffers);
        res.writeHead(200, {
        'Content-Length': Buffer.byteLength(pdfData),
        'Content-Type': 'application/pdf',
        'Content-disposition': 'attachment;filename=test.pdf',})
        .end(pdfData);
    
    });
    helperFunctions.generateHeader(myDoc);
    helperFunctions.generateCustomerInformation(myDoc, Income);
    helperFunctions.generateInvoiceTable(myDoc,Income);
    
    myDoc.end();
    };

exports.getIncomesView = (req, res, next) => {
    const token = req.cookies.jwt;

    axios.get(`${process.env.ORCHESTRATOR}/finance/incomes`,
        {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(response => {
            console.log(response.data);
            res.render('finance/incomes', { pageTitle: 'Reportes de Ingresos'});
        })
        .catch(err => {
            sendErrors(err.response, res);
            return;

        })
}
