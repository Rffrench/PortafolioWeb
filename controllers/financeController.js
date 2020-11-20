const axios = require('axios');
const sendErrors = require('../util/errorFunctions');
const PDFDocument =  require('pdfkit');
const helperFunctions = require('../util/helperFunctions');
const mensajero = require('./messenger')


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//Cargar vista de ordenes listas para pagar
exports.getCustomerOrdersView = (req, res, next) => {
  const token = req.cookies.jwt;

  axios.get(`${process.env.ORCHESTRATOR}/finance/customer-orders`,
      {
          headers: { 'Authorization': 'Bearer ' + token }
      })
      .then(response => {
          console.log(response.data);
          res.render('finance/customer-orders', { pageTitle: 'Reportes de Ingresos', orders: response.data.customerOrders});
      })
      .catch(err => {
          sendErrors(err.response, res);
          return;

      })
}

exports.getOrderDetailsView = (req, res, next) => {
  const token = req.cookies.jwt;
  const orderId = req.params.orderId;

  axios.all([
    axios.get(`${process.env.ORCHESTRATOR}/finance/customer-order/${orderId}`),
    axios.get(`${process.env.ORCHESTRATOR}/finance/customer-order/items/${orderId}`)])        
    .then(axios.spread((customerOrder, orderItems) => {
        console.log(customerOrder.data);        
        console.log(orderItems.data);
        res.render('finance/orderDetails', { pageTitle: 'Detalle de Orden', items:orderItems.data.orderItems, order:customerOrder.data.customerOrder  });

    }))
    .catch((err) => {

        sendErrors(err.response, res);

        return;
    });
}


exports.sendInvoice = (req, res ,next) => {
  const orderId = req.body.orderId;
  const Invoice = {
    name:'',
    items: [],
    subtotal: 0     
  };
 

  axios.all([
    axios.get(`${process.env.ORCHESTRATOR}/finance/customer-order/${orderId}`),
    axios.get(`${process.env.ORCHESTRATOR}/finance/customer-order/items/${orderId}`)])        
    .then(axios.spread((customerOrder, orderItems) => {
      //Generar PDF
    
      Invoice.name = customerOrder.data.customerOrder[0].name + ' ' + customerOrder.data.customerOrder[0].lastName;
      Invoice.subtotal = customerOrder.data.customerOrder[0].monto;
      Invoice.items = orderItems.data.orderItems;

      
      var myDoc = new PDFDocument({bufferPages: true});    
      let buffers = [];
      myDoc.on('data', buffers.push.bind(buffers));
      myDoc.on('end', () => {        
        let pdfData = Buffer.concat(buffers);
        res.writeHead(200, {
        'Content-Length': Buffer.byteLength(pdfData),
        'Content-Type': 'application/pdf',
        'Content-disposition': 'attachment;filename=detalle_pedido.pdf',})
        .end(pdfData);      
      });

      
      helperFunctions.generateHeader(myDoc);
      helperFunctions.generateInvoiceInformation(myDoc, Invoice);
      helperFunctions.generateInvoiceTable2(myDoc,Invoice);  
      myDoc.end();          





      //Enviar correo

   




        
    //res.render('finance/orderDetails', { pageTitle: 'Detalle de Orden', items:orderItems.data.orderItems, order:customerOrder.data.customerOrder  });

    }))
    .catch((err) => {

        sendErrors(err.response, res);

        return;
    });


}

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
      mensajero.receive(req)
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

