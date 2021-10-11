const productContainer = document.querySelector('.product-container');
const customerContainer = document.querySelector('.users-container');
const stickyHeader = document.querySelector('header');
const barsBtn = document.querySelector('.fa-bars');
const closeBtn = document.querySelector('.fa-times');
const navList = document.querySelector('ul');
const menuBtn = document.querySelector('.mobile-nav');
const topBtn = document.querySelector('.top');

const openMenu = () => {
    barsBtn.style.display = 'none';
    closeBtn.style.display = 'block';
}

const closeMenu = () => {
    barsBtn.style.display = 'block';
    closeBtn.style.display = 'none';
}

menuBtn.addEventListener('click', () => {
    navList.classList.toggle('list');

    if(navList.classList.contains('list')) {
        openMenu()
    } else {
        closeMenu();
    }

})


window.addEventListener('scroll', () => {
    const scrollHeight = window.pageYOffset;
    const headerHeight = stickyHeader.offsetHeight;
    
    if(scrollHeight > headerHeight) {
        stickyHeader.classList.add('sticky')
    } else {
        stickyHeader.classList.remove('sticky')
    }

    if(scrollHeight > 100) {
        topBtn.classList.add('show-top-btn')
    } else {
        topBtn.classList.remove('show-top-btn')
    }
    
})

topBtn.addEventListener('click', () => {
    document.documentElement.scrollTop = 0;
})


async function getProducts() {
    const results = await fetch('https://fakestoreapi.com/products');
    const data = await results.json();

    data.forEach(product => {
        const productEl = document.createElement('div');
        productEl.classList.add('product');
        productEl.innerHTML = `
        <div class="product-img">
            <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="product-info">
            <h4 class="price">${product.title}</h4>
            <p class="description">${product.description}</p>
            <div class="overlay">
                <h3>Product ID: ${product.id}</h3>
                <p>Category: ${product.category}</p>
                <p>Rating ${product.rating.rate}</p>
                <p>Count ${product.rating.count}</p>
            </div>
        </div>
        `;
    
        productContainer.appendChild(productEl);
    })
}

async function getCustomers() {
    const resCustomers = await fetch('https://randomuser.me/api/?results=5');
    const { results } = await resCustomers.json();

    results.forEach(customer => {
        const customerEl = document.createElement('div');
        customerEl.classList.add('customer');
        customerEl.innerHTML = `
        <img src=${customer.picture.medium} alt=${customer.name.first} class="customer-img"/>
        <h4>${customer.name.first} ${customer.name.last}</h4>
        <p>${customer.email}</p>
        `
        
        customerContainer.appendChild(customerEl)
    })
}

getProducts();
getCustomers();