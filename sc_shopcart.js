$(document).ready(function(){	
		$(".form-item").submit(function(e){
			var form_data = $(this).serialize();
			var button_content = $(this).find('button[type=submit]');
			button_content.html('Add...'); //Loading button text 

			$.ajax({ //request ajax ke cart_process.php
				url: "http://www.shmilycomputer.com/_lib/cart_process.php",
				type: "POST",
				dataType:"json", 
				data: form_data
			}).done(function(data){ //Jika Ajax berhasil
				$("#cart-info").html(data.items); //total items di cart-info element
				button_content.html('<i class="fa fa-shopping-cart"></i>'); //
				alert("Item telah dimasukan ke keranjang belanja anda"); 
				if($(".shopping-cart-box").css("display") == "block"){
					$(".cart-box").trigger( "click" ); 
				}
			})
			e.preventDefault();
		});
		
	//menampilkan item ke keranjang belanja
	$( ".cart-box").click(function(e) { 
		e.preventDefault(); 
		$("#shopping-cart-results").html('<img src="_img/bx_loader.gif">'); //menampilkan loading gambar
		$("#shopping-cart-results" ).load( "http://www.shmilycomputer.com/_lib/cart_process.php", {"load_cart":"1"}); //membuat permintaan ajax menggunakan dengan jQuery Load() & update
	});
	
	
	//Menghapus item dari keranjang
	$("#shopping-cart-results").on('click', 'a.remove-item', function(e) {
		e.preventDefault(); 
		var pcode = $(this).attr("data-code"); //mendapatkan get produk
		$(this).parent().fadeOut(); //menghapus elemen item dari kotak
		$.getJSON( "http://www.shmilycomputer.com/_lib/cart_process.php", {"remove_code":pcode} , function(data){ //mendapatkan Harga Barang dari Server
			$("#cart-info").html(data.items); //update Menjullahkan item pada cart-info
			$(".cart-box").trigger( "click" ); //trigger click on cart-box to untuk memperbarui daftar item
		});
	});

});
