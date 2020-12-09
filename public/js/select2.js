$( document ).ready(function() {
    $.ajax({
        type: "GET",
        
        url: 'http://18.229.150.241:3001/api/v1/admin/products',
        data: "check",
        success: function(data){
        let products = (data.products);
        $("#products").select2();
        products.forEach(product => {
            var newOption = new Option(product.name,product.id,false,false);
            $('#products').append(newOption).trigger('change');
        });
        
    
    
        }
    });
});
