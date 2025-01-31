// Function to fetch and display products dynamically
async function fetchProducts(category = 'all', target = 'home-product-list') {
    let url = 'https://fakestoreapi.com/products'; // Default to all products

    if (category !== 'all') {
        url = `https://fakestoreapi.com/products/category/${category}`; // Fetch category-specific products
    }

    try {
        const response = await fetch(url);
        const products = await response.json();
        displayProducts(products, target); // Pass target container ID
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Function to shorten title to 4-5 words with "..."
function shortenTitle(title) {
    const words = title.split(" "); // Split title into words
    return words.slice(0, 4).join(" ") + (words.length > 4 ? "..." : ""); // Return the first 5 words and append "..."
}

// Function to create a more detailed description for products based on category
function generateDescription(product) {
    let description = "";
    if (product.category === "electronics") {
        description = "This is a high-performance gadget designed for tech lovers and enthusiasts. It features the latest features and technology.";
    } else if (product.category === "jewelery") {
        description = "This is a stylish piece of jewelry, crafted with precision and perfect for special occasions and daily wear.";
    } else if (product.category === "men's clothing" || product.category === "women's clothing") {
        description = "This is a trendy outfit, perfect for casual wear and versatile enough for a variety of occasions.";
    } else if (product.category === "bags") {
        description = "This is a versatile bag designed for everyday use, providing both style and practicality.";
    } else {
        description = "This is a must-have product designed for everyday needs, combining utility with style.";
    }

    // Limit the description to the first 10 words
    const descWords = description.split(" ");
    return descWords.slice(0, 6).join(" ") + (descWords.length > 6 ? "..." : "");
}

// Function to display products dynamically in the specified section
function displayProducts(products, target) {
    const productList = document.getElementById(target); // Identify the target container
    productList.innerHTML = ''; // Clear previous products

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        // Shorten the product name to 4-5 words
        const shortenedTitle = shortenTitle(product.title);
        // Create a description for the product
        const description = generateDescription(product);
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}" style="width: 100%; height: 150px; object-fit: cover;">
            <h3>${shortenedTitle}</h3>
            <p>${description}</p>
            <p>$${product.price}</p>
            <button class="btn btn-primary" onclick="addToCart('${product.id}', '${product.title}', '${product.image}', '${product.price}')">Add to Cart</button>
        `;
        productList.appendChild(productElement);
    });
}

// Function to filter products based on category
function filterProducts(category, target) {
    fetchProducts(category, target); // Fetch products for the specified section
}

// Ensure navigation works between sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'block'; // Show the selected section
            if (sectionId === 'products') {
                fetchProducts('all', 'products-list'); // Fetch all products for Products section
            } else if (sectionId === 'home') {
                fetchProducts('all', 'home-product-list'); // Fetch all products for Home section
            } else if (sectionId === 'cart') {
                loadCart(); // Load the cart when navigating to the cart section
            }
        } else {
            section.style.display = 'none'; // Hide other sections
        }
    });
}
// Load Home section products on page load
window.onload = function () {
    fetchProducts('all', 'home-product-list'); // Load Home section products by default
};
