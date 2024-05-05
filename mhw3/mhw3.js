
const button = document.querySelector('#bottone');
const menu = document.querySelector('#apromenu');
const button_sushi = document.querySelector('#btnSushi');
const menu_sushi = document.querySelector('#container_sushi');
const button_pizza = document.querySelector('#btnPizza');
const menu_pizza = document.querySelector('#container_pizza');
const button_antipasti = document.querySelector('#btnAntipasti');
const menu_antipasti = document.querySelector('#container_antipasti');

function onClick()
{
    if (menu.classList.contains('hidden'))
     {
        menu.classList.remove('hidden');
    }
     else
      {
        menu.classList.add('hidden');
        menu_sushi.classList.add('hidden');
        menu_pizza.classList.add('hidden');
        menu_antipasti.classList.add('hidden');
    }
}

function onClickSushi()
{
    if (menu_sushi.classList.contains('hidden'))
     {
        menu_sushi.classList.remove('hidden');
    } 
    else 
    {
        menu_sushi.classList.add('hidden');
    }
}

function onClickPizza()
{
    if (menu_pizza.classList.contains('hidden'))
     {
        menu_pizza.classList.remove('hidden');
    } 
    else 
    {
        menu_pizza.classList.add('hidden');
    }
}

function onClickAntipasti()
{
    if (menu_antipasti.classList.contains('hidden'))
     {
        menu_antipasti.classList.remove('hidden');
    } 
    else 
    {
        menu_antipasti.classList.add('hidden');
    }
}

function onDOMContentLoaded()
 {
    const flexItems = document.querySelectorAll('.flex-item');
    const modalView = document.getElementById('modal-view');

    flexItems.forEach(function(item) {
        item.addEventListener('click', function() 
        {
            const imgSrc = this.querySelector('img').getAttribute('src');
            const modalImg = document.createElement('img');
            modalImg.setAttribute('src', imgSrc);
            modalView.innerHTML = '';
            modalView.appendChild(modalImg);
            modalView.classList.remove('hidden');
        });
    });

    modalView.addEventListener('click', function() {
        modalView.classList.add('hidden');
    });
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);


button.addEventListener("click", onClick);
button_sushi.addEventListener("click", onClickSushi);
button_pizza.addEventListener("click", onClickPizza);
button_antipasti.addEventListener("click", onClickAntipasti);


