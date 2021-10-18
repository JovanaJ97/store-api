// Selectors
const productContainer = document.querySelector('.product-container');
const customerContainer = document.querySelector('.users-container');
const stickyHeader = document.querySelector('header');
const barsBtn = document.querySelector('.fa-bars');
const closeBtn = document.querySelector('.fa-times');
const navList = document.querySelector('ul');
const menuBtn = document.querySelector('.mobile-nav');
const topBtn = document.querySelector('.top');
const question = document.querySelectorAll('.question')
const toggle = document.querySelector('.fa-lightbulb');
const tabs = document.querySelectorAll('.tab-single')

// Dark theme switcher
toggle.addEventListener('click',() => {
    document.body.classList.toggle('dark-theme')

    if(document.body.classList.contains('dark-theme')) {
        toggle.classList.add('far');
        toggle.classList.remove('fas');
    } else {
        toggle.classList.remove('far');
        toggle.classList.add('fas');
    }

})

// Functions for mobile navigation
const openMenu = () => {
    barsBtn.style.display = 'none';
    closeBtn.style.display = 'block';
}

const closeMenu = () => {
    barsBtn.style.display = 'block';
    closeBtn.style.display = 'none';
}

// Mobile nav
menuBtn.addEventListener('click', () => {
    navList.classList.toggle('list');

    if(navList.classList.contains('list')) {
        openMenu()
    } else {
        closeMenu();
    }

})

//Sticky header and scroll to top
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

// Fetching products
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
            <h3>${product.title}</h3>
            <p class="description">${product.description}</p>
            <h4 class="price">${product.price}$</h4>
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

// Fetching customers
async function getCustomers() {
    const resCustomers = await fetch('https://randomuser.me/api/?results=5');
    const { results } = await resCustomers.json();

    results.forEach(customer => {
        const customerEl = document.createElement('div');
        customerEl.classList.add('customer');
        customerEl.innerHTML = `
        <img src=${customer.picture.medium} alt=${customer.name.first} class="customer-img"/>
        <h3>${customer.name.first} ${customer.name.last}</h3>
        <p>${customer.location.country}</p>
        <div class="customer-info">
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
            </p>
        </div>
        `
        
        customerContainer.appendChild(customerEl)
    })
}

// FAQ
let oldEl = null;

tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        let currentTab = e.currentTarget;

        if(oldEl !== null & oldEl !== currentTab) {
            oldEl.classList.remove('show');

            oldEl = tab;
        }

        const openTab = () => {
            tab.classList.add('show')
        }

        const closeTab = () => {
            tab.classList.remove('show')
        }

        if(tab.classList.contains('show')) {
            closeTab();
            
            oldEl = null;

        } else {
            openTab()

            oldEl = tab;
        }
    })
})


getProducts();
getCustomers();