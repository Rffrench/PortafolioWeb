# PortafolioWeb

This was my last college project that I had to do to graduate as a Software Engineer. It is meant to be a software for a restaurant that has a set of unique functionalities depending on your user role.

**Normal user**
- Login/Signup
- Order online with your account once you have been asigned a table
- Order extra functionality
- Pay the bill with cash or card depending wtih a tip option
- Create a reserveation
- Cancel a reservation

**Finance user**
- Generate a monthly income report in PDF
- Approve and manage payment orders with cash (this will also send an email to the user with a PDF receipt)


**Warehouse user**
- Create new recipes (for the kitchen)
- Restock ingredients/goods
- View the stock of all the goods
- Update stock
- Approve stock orders of other users
- View stock orders
- Manage stock orders


In addition to these user roles we have admins, waiters and cooks. Each one of these roles has a different app to interact with (not part of this repository): 
The *admin* user interacts with a C# desktop application that can manage users, update the inventory, approve inventory orders, etc. 
The *waiter* uses a Quasar totem that is basically used to assign a table to a customer, manage reservations, and receive alerts when customers want to pay their orders. 
The *kitchen* has a basic app that receives live orders and sorts them so that the cooks can decide what to start preparing first.

The above apps can be found as part of my forked repositories. I mention them because they are a crucial part of the system and the architecture, all the apps communicate directly with the Orchestrator microservice which handles most of the logic.


# Deploy Diagram

<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/DEPLOY-DIAGRAM.png">
<br>


# Screenshots User

### Home
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/home.png">
<br>

### Home responsive
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/home-responsive.png">
<br>

### Login
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/login.png">
<br>

### Reservations menu
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/reservations.png">
<br>

### Orders menu
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/orders.png">
<br>

### Create reservation
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/create-reservation.png">
<br>

### Create reservation confirmation message
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/create-reservation-confirmed.png">
<br>

### Cancel reservation
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/cancel-reservation.png">
<br>

### New order
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/new-order.png">
<br>

### New order responsive
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/new-order-responsive.png">
<br>

### Order extra responsive
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/order-extra-responsive.png">
<br>

### Pay order
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/pay-order.png">
<br>

### Pay order responsive
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/pay-order-responsive.png">
<br>

### Payment requested
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/payment-requested.png">
<br>

### Payment confirmed
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/payment-confirmed.png">
<br>


# Screenshots Finance

### Approve orders
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/approve-orders.png">
<br>

### Approve orders details
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/approve-order-details.png">
<br>

### Reports
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/reports.png">
<br>

### Report example in PDF
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/report-example.png">
<br>


# Screenshots Warehouse

### Create recipe
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/create-recipe.png">
<br>

### Inventory menu
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/inventory-menu.png">
<br>

### Create stock order
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/create-stock-order.png">
<br>

### Stock order
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/stock-order.png">
<br>

### Restock
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/restock.png">
<br>

### Restock detail
<img src="https://github.com/Rffrench/PortafolioWeb/blob/master/Screenshots/restock-detail.png">
<br>












