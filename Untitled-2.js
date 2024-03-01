let prices=document.getElementById('prices');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let title=document.getElementById('title');
let count=document.getElementById('count');
let category=document.getElementById('category');
let temp;
let mode='create';

let submite=document.getElementById('submite')
function getTotal(){
    if (prices.value != ''){
        let x=+prices.value+ +taxes.value+ +ads.value- +discount.value;
        total.innerHTML=x;
        total.style.background="green";
    }else{
        total.innerText='';
        total.style.background="rgba(182, 5, 5, 0.659)";
    }
    
}
let dataProd;
if(localStorage.product != null){
     dataProd=JSON.parse(localStorage.product);
}else{
    dataProd=[];
    console.log("hi");
}

function Create(){
    
    let newProd={
        title:capitalize(title.value),
        prices:prices.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value, 
        total:total.innerHTML,
        category:capitalize(category.value),   
    }
    if(title.value!=0 && prices.value!=0 && category.value!=0 && count.value<100){
        if(mode=='create') {
            if(+count.value>1){
                for(let i=0;i<+count.value;i++){
                    dataProd.push(newProd);
                }
            }else{dataProd.push(newProd);}
        }else{
            dataProd[temp].title=title.value;
            dataProd[temp].prices= +prices.value;
            dataProd[temp].taxes= +taxes.value;
            dataProd[temp].ads= +ads.value;
            dataProd[temp].discount= +discount.value;
            dataProd[temp].category=category.value;
            dataProd[temp].total=total.innerText;
            
       
           count.style.display='block';
           mode='create';
           submite.innerText='create';
    
    
        }
        clearData();
   
    }
    
    localStorage.setItem('product',JSON.stringify(dataProd))
    
    showData();
    
    
}

function clearData(){
    title.value='';
    prices.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    count.value='';
    category.value='';
    total.innerHTML='';
    total.style.background="rgba(182, 5, 5, 0.659)";
}


function showData(){
let table='';

    for (let i=0;i<dataProd.length;i++) {
         table+=`
        <tr> 
             <td>${i+1}</td>
             <td>${dataProd[i].title}</td>
             <td>${dataProd[i].prices}</td>
             <td>${dataProd[i].taxes}</td>
             <td>${dataProd[i].ads}</td>
             <td>${dataProd[i].discount}</td>
             <td>${dataProd[i].total}</td>
             <td>${dataProd[i].category}</td>
             <td><button onclick="upDate(${i})">UPDATE</button></td>
             <td><button onclick=deleteData(${i})>DELETE</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML=table;
    if(dataProd.length>0){
        let btn=`<button id="deleteAll" onclick="deleteAll()" >Delete All</button>`;
        document.getElementById('btnDeleteAll').innerHTML=btn;
    }else{
        document.getElementById('btnDeleteAll').innerHTML='';
    }

}
showData();

function deleteData(i){
    dataProd.splice(i,1);
    localStorage.product=JSON.stringify(dataProd);
    showData();
}
function deleteAll(){
    localStorage.removeItem('product');
    dataProd.splice(0);
    showData();
}


function upDate(i){
    title.value=dataProd[i].title;
    prices.value=dataProd[i].prices;
    taxes.value=dataProd[i].taxes;
    ads.value=dataProd[i].ads;
    discount.value=dataProd[i].discount;
    category.value=dataProd[i].category;
    total.innerText=dataProd[i].total;
    if (total.innerText != ''){
        total.style.background="green";
    }
    count.style.display='none';
    submite.innerText='update';
    mode='update';

    temp=i;
    scroll({top:0,behavior:"smooth"})
}
let search=document.getElementById('search')
let searchMood='';
function getSearchMood(id){

    if(id =="searchTitle"){
        searchMood="Title";
    }else{
        searchMood="Category";
    }
    showData();
    search.placeholder='Search by '+searchMood;
    search.focus();
    search.value='' ;
}
function getSearch(value){
    value=capitalize(value);
    let table='';
    if(searchMood=="Title"){
        for(let i=0;i<dataProd.length;i++){
            if(dataProd[i].title.includes(value)){
                table+=`
             <tr> 
                 <td>${i}</td>
                 <td>${dataProd[i].title}</td>
                 <td>${dataProd[i].prices}</td>
                 <td>${dataProd[i].taxes}</td>
                 <td>${dataProd[i].ads}</td>
                 <td>${dataProd[i].discount}</td>
                 <td>${dataProd[i].total}</td>
                 <td>${dataProd[i].category}</td>
                 <td><button onclick="upDate(${i})">UPDATE</button></td>
                 <td><button onclick=deleteData(${i})>DELETE</button></td>
             </tr>
             `}

        }
       
    }else{
        for(let i=0;i<dataProd.length;i++){
            if(dataProd[i].category.includes(value)){
                table+=`
             <tr> 
                 <td>${i}</td>
                 <td>${dataProd[i].title}</td>
                 <td>${dataProd[i].prices}</td>
                 <td>${dataProd[i].taxes}</td>
                 <td>${dataProd[i].ads}</td>
                 <td>${dataProd[i].discount}</td>
                 <td>${dataProd[i].total}</td>
                 <td>${dataProd[i].category}</td>
                 <td><button onclick="upDate(${i})">UPDATE</button></td>
                 <td><button onclick=deleteData(${i})>DELETE</button></td>
             </tr>
             `

            }
            

    }
   
    
}document.getElementById('tbody').innerHTML=table;
}
function capitalize(str) {
    
    // Check if the input string is not empty
    if (str.length ===0) {
      return str;
    }
    str=str.toLowerCase();
    // Capitalize the first letter and concatenate the rest of the string
    return (str.charAt(0).toUpperCase() + str.slice(1));
  }
  
