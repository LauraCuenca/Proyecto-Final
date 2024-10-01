const promosref = document.getElementById("promos")
let promosarray=[]
function getpromos(){
    fetch("/js/promo.json")
    .then((data)=>{
        return data.json()
    })
    .then((data)=>{
        promosarray= data
        renderpromos(promosarray)
    })
}

function renderpromos(promos) {
    promos.map((item) => {
        promosref.innerHTML += `
        <div class="promocontainer">
            <h2>${item.name}</h2>
            <img src="${item.img}" alt="Imagen de ${item.name}">
            <ul>
                ${item.promociones.map((promoItem, index) => {
                    return `
                    <li key="${index}">
                        <h3>${promoItem.lugar}</h3>
                        <h4>${promoItem.promo}</h4>
                        <p>${promoItem.detalles}</p>
                        <p>${promoItem.inversiones}</p>
                    </li>`;
                }).join('')}
            </ul>
        </div>`;
    });
}

getpromos()