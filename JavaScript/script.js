//shoes-->
let totalHargaShoes = 0;
let shoes = [
    {
        name:`Sneakers 1`,
        stok: 4,
        harga: 250000,
        image: 'images/gambar1.jpeg'
    },
    {
        name:`Sneakers 2`,
        stok: 0,
        harga: 200000,
        image: 'images/gambar2.jpeg'
    },
    {
        name:`Sneakers 3`,
        stok: 16,
        harga: 275000,
        image: 'images/gambar3.jpeg'
    },
    {
        name:`Sneakers 4`,
        stok: 12,
        harga: 300000,
        image: 'images/gambar4.jpeg'

    },
    {
        name:`Sneakers 5`,
        stok: 24,
        harga: 150000,
        image: 'images/gambar5.jpeg'

    },
	{
        name:`Sneakers 6`,
        stok: 8,
        harga: 180000,
        image: 'images/gambar6.jpeg'

    },
]

let cart = [

];

let pembelian =[

];

function debug(){
    console.log(pembelian); 
}

function checkAvailable(){
    var available = true;
    for(var i = 0; i<cart.length; i++){
        for(var j = 0; j<shoes.length; j++){
            if(cart[i].name === shoes[j].name){
                if(shoes[j].stok < cart[i].jumlah){
                    available = false;
                    alert(`Stok ${shoes[j].name} tinggal ${shoes[j].stok}`);
                    break;
                }
            }  
        }
        if(!available){
            break;
        }
    }

    return available
}

function orderShoes(){
    // for(var i = 0; i<cart.length; i++){
    //     var notAvailable = false;
    //     for(var j = 0; j<shoes.length; j++){
    //         if(cart[i].name === shoes[j].name){
    //             if(shoes[j].stok < cart[i].jumlah){
    //                 notAvailable = true;
    //                 alert(`Stok ${shoes[j].name} tinggal ${shoes[j].stok}`);
    //                 break;
    //             }
    //             // if(!notAvailable){
    //             //     shoes[j].stok -= cart[i].jumlah;
    //             // }      
    //         }  
    //     }
    //     if(notAvailable){
    //         break;
    //     }
    // }
    if(checkAvailable()){
        for(var x = 0; x<cart.length; x++){
            for(var y = 0; y<shoes.length; y++){
                if(cart[x].name === shoes[y].name){  
                        shoes[y].stok -= cart[x].jumlah;
                }
            }
        }
        var cartList = document.getElementById('cartList');

        // UNTUK MATIKAN CARTLIST
        cartList.setAttribute('style','display:none');
        alert(`Pesanan telah diterima. Total Harga : Rp${toRupiah(totalHargaShoes)},00`);
        cart.push(totalHargaShoes);
        pembelian.push(cart);
        totalHargaShoes = 0;
        cart = [];
        generateData();    
    }
    console.log(pembelian); 
    console.log(shoes);
}

function addtoCart(index) {
    console.log(shoes[index].name);
    var hasExist = false;
    var hasEmpty = false;
    if(shoes[index].stok <= 0){
        alert(`${shoes[index].name} habis, silahkan pesan produk lainnya.`);
        hasEmpty = true;
    }
    for(var i = 0; i<cart.length; i++){
        if(shoes[index].name === cart[i].name){
            if(shoes[index].stok - cart[i].jumlah <=0){
                alert(`${shoes[index].name} habis, silahkan pesan produk lainnya.`);
                hasEmpty = true;
                break;
            }else{
                totalHargaShoes += cart[i].harga;
                //console.log(totalHargaShoes);
                cart[i].jumlah ++;
                hasExist = true;
                break;
            }      
        }
    }
    if(!hasExist && !hasEmpty){
        let obj ={
            name: shoes[index].name,
            harga: shoes[index].harga,
            jumlah: 1,
            image: shoes[index].image,
        }
        totalHargaShoes +=shoes[index].harga;
        cart.push(obj);
    }
    generateData();
    var cartlist = document.getElementById('cartList');
    if(cart.length !== 0){
        cartlist.setAttribute('style', 'display:inline-block');
    }
}

function removeShoes(value){
    
    //console.log(cart[value].jumlah);
    if(cart[value].jumlah > 0){
        totalHargaShoes -=cart[value].harga;
        cart[value].jumlah--;
    }   
    if(cart[value].jumlah === 0){
        cart.splice(value,1);
        
    }
    generateData();
    var cartlist = document.getElementById('cartList');
    if(cart.length !== 0){
        cartlist.setAttribute('style', 'display:inline-block');
    }else{

        // UNTUK MATIKAN CARTLIST
        
        cartlist.setAttribute('style', 'display:none');
    }
}

function toRupiah(harga){
    var result = '';
    harga = String(harga);
    var arr = [];
    var count = 0;
    for(var i = harga.length-1; i>=0; i--){
        if(count === 3 && harga[i] !=undefined){
            arr.push('.');
            arr.push(harga[i]);
            count = 1;
            // console.log(count,i,'MASUK'); 
        }else{
            arr.push(harga[i]);
            count++;
            //console.log(count,i-1);
        }
    }
    //console.log(arr);
    for(var i = arr.length-1; i>=0; i--){
        result += arr[i];
    }
    return result;
}

//console.log(toRupiah(1910450));

function generateData(){
    const shoesList = document.getElementById('shoesList');
    const cartList = document.getElementById('cartList');
    shoesList.innerHTML = '';
    cartList.innerHTML = '';
    
    for(var i =0; i<shoes.length; i++){
        let name = shoes[i].name;
        let stok = shoes[i].stok;
        let harga = shoes[i].harga;
        let image = shoes[i].image;
      
        let divCard = document.createElement('div');
        divCard.classList.add('card')

    
        let imageData = document.createElement('img')
        imageData.setAttribute("src",image);
        divCard.appendChild(imageData);
    
        let title = document.createElement('p');
        title.innerHTML = name;
        divCard.appendChild(title);

        let divAction = document.createElement('div');
        divAction.classList.add('action');

        let spanData = document.createElement('span');
        spanData.innerHTML = `Rp ${toRupiah(harga)},00 | Stok : ${stok}`;
        divAction.appendChild(spanData);

        let buttonAdd = document.createElement('button');
        buttonAdd.innerHTML = '<i class="fas fa-cart-plus"></i> Order';
        buttonAdd.setAttribute('value', i);
        buttonAdd.setAttribute('onclick', 'addtoCart(this.value)');
        divAction.appendChild(buttonAdd);
        divCard.appendChild(divAction);
        //console.log(divCard);
        shoesList.appendChild(divCard);
    
    }

    let totalDiv = document.createElement('div');
    totalDiv.classList.add('total');

    let totalh1 = document.createElement('h1');
    totalh1.innerHTML = `TOTAL : Rp${toRupiah(totalHargaShoes)},00`;
    totalDiv.appendChild(totalh1);

    let totalhr = document.createElement('hr');
    totalDiv.appendChild(totalhr);
    //console.log(totalDiv);
    cartList.appendChild(totalDiv);

    //console.log('BelumMasuk');
    for(var x =0; x<cart.length; x++){
        
        let name = cart[x].name;
        let jumlah = cart[x].jumlah;
        let harga = cart[x].harga;
        let image = cart[x].image;
        //console.log('MASUK');
        let divCardx = document.createElement('div');
        divCardx.classList.add('card-order') ;  
        //console.log(divCardx);

        let divCardDetail = document.createElement('div');
        divCardDetail.classList.add('detail');

        let imageData = document.createElement('img')
        imageData.setAttribute("src",image);
        divCardDetail.appendChild(imageData);
        
        let shoesName = document.createElement('p');
        // shoesName.setAttribute('id','nameCart')
        shoesName.innerHTML = name;
        divCardDetail.appendChild(shoesName);

        let shoesJumlah = document.createElement('span');
        shoesJumlah.innerHTML = jumlah;
        divCardDetail.appendChild(shoesJumlah);
        
        divCardx.appendChild(divCardDetail);

        let buttonCancel = document.createElement('button');
        buttonCancel.setAttribute('value', x );
        buttonCancel.setAttribute('id', 'cancelCart' );
        buttonCancel.setAttribute('onclick', 'removeShoes(this.value)');
        buttonCancel.innerHTML = '<i class="fas fa-trash"></i> Hapus';
        divCardx.appendChild(buttonCancel);
        //console.log(divCardx);
    
        cartList.appendChild(divCardx);
    }

    let divbutton = document.createElement('div');
    divbutton.classList.add("card-finish");

    let buttonOrder = document.createElement('button');
    //buttonOrder.classList.add('order');
    buttonOrder.setAttribute('onclick', 'orderShoes()');
    buttonOrder.innerHTML = 'ORDER SEKARANG';
    divbutton.appendChild(buttonOrder);
    cartList.appendChild(divbutton);

}
generateData()