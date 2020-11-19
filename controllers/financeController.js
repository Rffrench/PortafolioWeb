const axios = require('axios');
const sendErrors = require('../util/errorFunctions');
const PDFDocument =  require('pdfkit');
const helperFunctions = require('../util/helperFunctions');
const mensajero = require('../controllers/receivePayment')

  exports.getIncomeReport = async function(req, res, next) {

    const date = req.query.date;
   
    month = date.substring(0,2);
    year = date.substring(3,7);

    let totalOrders=0;
    let sum = 0;

    const Income = {
        date: date,
        quantity:0,
        items: [],
        subtotal: 0     
      };


    axios.get(`${process.env.ORCHESTRATOR}/finance/income/${month}/${year}`)
    .then(response => {

      Income.items=response.data.dailyIncome;
      
      for (i = 0; i < Income.items.length; i++) {
        sum=sum+Income.items[i].amount;      
        totalOrders=totalOrders+Income.items[i].orders;   
      }

      Income.subtotal=sum;
      Income.quantity=totalOrders;

      var myDoc = new PDFDocument({bufferPages: true});    
      let buffers = [];
      myDoc.on('data', buffers.push.bind(buffers));
      myDoc.on('end', () => {        
        let pdfData = Buffer.concat(buffers);
        res.writeHead(200, {
        'Content-Length': Buffer.byteLength(pdfData),
        'Content-Type': 'application/pdf',
        'Content-disposition': 'attachment;filename=ganancias_restaurant_'+date+'.pdf',})
        .end(pdfData);      
      });

      
      helperFunctions.generateHeader(myDoc);
      helperFunctions.generateCustomerInformation(myDoc, Income);
      helperFunctions.generateInvoiceTable(myDoc,Income);  
      myDoc.end();          
    })
    .catch(err => {
      sendErrors(err.response, res);
      return;

    })


    
    };

    function recibir(req){
      mensajero.receivePayment(req)
    }

exports.getIncomesView = (req, res, next) => {
    const token = req.cookies.jwt;

    axios.get(`${process.env.ORCHESTRATOR}/finance/income`,
        {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(response => {
            console.log(response.data);
            res.render('finance/incomes', { pageTitle: 'Reportes de Ingresos', incomeDates: response.data.incomeDates});
        })
        .catch(err => {
            sendErrors(err.response, res);
            return;

        })
}

exports.getCheckoutView = (req, res, next) => {
  const token = req.cookies.jwt;
  
  axios.get(`${process.env.ORCHESTRATOR}/finance/income`,
      {
          headers: { 'Authorization': 'Bearer ' + token }
      })
      .then(response => {
          console.log(response.data);
          recibir(req);
          res.render('finance/checkout', { pageTitle: 'Caja'});
      })
      .catch(err => {
          sendErrors(err.response, res);
          return;

      })
}

exports.getCheckouts = (req, res, next) =>{
  var cliente = req.body.cliente
  console.log(cliente)
}

