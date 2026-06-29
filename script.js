// ============ PRODUCT DATA ============
const products = [
    // Obsidian Series
    { id: 'tshirt-obsidian', name: 'OBSIDIAN CORE TEE', category: 'tshirt', price: 299.00, image: 'assets/tshirt_obsidian_1782631442773.png', colors: ['black', 'silver'], description: 'Futuristic obsidian t-shirt with subtle silver accents and premium dark-mode aesthetic.' },
    { id: 'jacket-obsidian', name: 'OBSIDIAN ARMOR PUFFER', category: 'jacket', price: 1899.00, image: 'assets/jacket_obsidian_1782631459404.png', colors: ['black', 'silver'], description: 'High fashion futuristic winter puffer jacket in obsidian black with silver detailing.' },
    { id: 'glasses-obsidian', name: 'OBSIDIAN SNOW GOGGLES', category: 'glasses', price: 450.00, image: 'assets/glasses_obsidian_1782631472638.png', colors: ['black', 'silver'], description: 'Futuristic snow goggles with obsidian black frame and reflective silver lens.' },
    { id: 'boots-obsidian', name: 'OBSIDIAN ALPINE BOOTS', category: 'boots', price: 899.00, image: 'assets/boots_obsidian_1782631484890.png', colors: ['black', 'silver'], description: 'Futuristic winter snow boots in obsidian black with silver hardware.' },
    
    // Crimson Series
    { id: 'tshirt-crimson', name: 'CRIMSON CORE TEE', category: 'tshirt', price: 299.00, image: 'assets/tshirt_crimson_1782631505651.png', colors: ['black'], description: 'Deep crimson red t-shirt with black accents.' },
    { id: 'jacket-crimson', name: 'CRIMSON ARMOR PUFFER', category: 'jacket', price: 1899.00, image: 'assets/jacket_crimson_1782631523489.png', colors: ['black'], description: 'Deep crimson red puffer jacket with black accents and reinforced shell.' },
    { id: 'glasses-crimson', name: 'CRIMSON SNOW GOGGLES', category: 'glasses', price: 450.00, image: 'assets/glasses_crimson_1782631535185.png', colors: ['black'], description: 'Deep crimson red snow goggles with black frame.' },
    { id: 'boots-crimson', name: 'CRIMSON ALPINE BOOTS', category: 'boots', price: 899.00, image: 'assets/boots_crimson_1782631548714.png', colors: ['black'], description: 'Deep crimson red snow boots with reinforced black sole.' },
    
    // Arctic Series
    { id: 'tshirt-arctic', name: 'ARCTIC CORE TEE', category: 'tshirt', price: 299.00, image: 'assets/tshirt_arctic_1782631590900.png', colors: ['blue', 'white'], description: 'Arctic blue t-shirt with icy white accents.' },
    { id: 'jacket-arctic', name: 'ARCTIC ARMOR PUFFER', category: 'jacket', price: 1899.00, image: 'assets/jacket_arctic_1782631601795.png', colors: ['blue', 'white'], description: 'Arctic blue puffer jacket with icy white thermal baffling.' },
    { id: 'glasses-arctic', name: 'ARCTIC SNOW GOGGLES', category: 'glasses', price: 450.00, image: 'assets/glasses_arctic_1782631615197.png', colors: ['blue', 'white'], description: 'Arctic blue snow goggles with white frame.' },
    { id: 'boots-arctic', name: 'ARCTIC ALPINE BOOTS', category: 'boots', price: 899.00, image: 'assets/boots_arctic_1782631627401.png', colors: ['blue', 'white'], description: 'Arctic blue snow boots with icy white detailing.' },
    
    // Neon Series
    { id: 'tshirt-neon', name: 'NEON CORE TEE', category: 'tshirt', price: 349.00, image: 'assets/tshirt_neon_1782631647721.png', colors: ['black'], description: 'Neon green t-shirt with cybernetic black patterns.' },
    { id: 'jacket-neon', name: 'NEON ARMOR PUFFER', category: 'jacket', price: 1999.00, image: 'assets/jacket_neon_1782631660288.png', colors: ['black'], description: 'Neon green puffer jacket with cybernetic black patterns.' },
    { id: 'glasses-neon', name: 'NEON SNOW GOGGLES', category: 'glasses', price: 499.00, image: 'assets/glasses_neon_1782631669997.png', colors: ['black'], description: 'Neon green snow goggles with cybernetic lens coating.' },
    { id: 'boots-neon', name: 'NEON ALPINE BOOTS', category: 'boots', price: 949.00, image: 'assets/boots_neon_1782631682129.png', colors: ['black'], description: 'Neon green snow boots with cybernetic accents.' },
    
    // Stealth Series
    { id: 'tshirt-stealth', name: 'STEALTH CORE TEE', category: 'tshirt', price: 349.00, image: 'assets/tshirt_stealth_1782631700681.png', colors: ['black'], description: 'Stealth black t-shirt with geometric matte accents.' }
];

// ============ STATE ============
let cart = [];

// ============ SAFE DOM HELPERS ============
function $(id) { return document.getElementById(id); }

// ============ RENDER PRODUCTS ============
function renderProducts(filter = 'all') {
    const grid = $('catalogGrid') || $('productGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    
    filtered.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.productId = p.id;
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) ${index * 0.05}s`;

        const colorsHTML = p.colors ? p.colors.map(c => `<span class="dot ${c}" title="${c}"></span>`).join('') : '';

        card.innerHTML = `
            <div class="image-wrapper">
                <img src="${p.image}" alt="${p.name}">
            </div>
            <div class="product-info">
                <h3>${p.name}</h3>
                <p>${p.category.toUpperCase()}</p>
                <div class="colors">${colorsHTML}</div>
                <span class="price">$${p.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
        `;

        card.addEventListener('click', () => openProductModal(p.id));
        grid.appendChild(card);

        // Trigger fade-in
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        });
    });
}

// ============ FILTER BUTTONS ============
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const filter = e.target.getAttribute('data-filter') || 'all';
        renderProducts(filter);
    });
});

// ============ PRODUCT MODAL ============
let currentProductId = null;

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    const modal = $('productModal');
    const modalImg = $('modalImg');
    const modalTitle = $('modalTitle');
    const modalCategory = $('modalCategory');
    const modalDesc = $('modalDesc');
    const modalPrice = $('modalPrice');
    const modalColors = $('modalColors');
    const modalSizes = $('modalSizes');
    
    if (!product || !modal) return;

    currentProductId = productId;
    if (modalImg) { modalImg.src = product.image; modalImg.alt = product.name; }
    if (modalTitle) modalTitle.textContent = product.name;
    if (modalCategory) modalCategory.textContent = product.category.toUpperCase();
    if (modalDesc) modalDesc.textContent = product.description;
    if (modalPrice) modalPrice.textContent = `$${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

    // Render color dots
    if (modalColors && product.colors) {
        modalColors.innerHTML = product.colors
            .map(c => `<span class="dot ${c}" title="${c}"></span>`)
            .join('');
    }

    // Reset size selection
    if (modalSizes) {
        modalSizes.querySelectorAll('button').forEach((btn, i) => {
            btn.classList.toggle('active', i === 1);
        });
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = $('productModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
    currentProductId = null;
}

// Modal close button
const modalCloseBtn = $('modalClose');
if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProductModal);

// Click outside modal
const productModal = $('productModal');
if (productModal) {
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) closeProductModal();
    });
}

// Modal size selector
const modalSizes = $('modalSizes');
if (modalSizes) {
    modalSizes.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            modalSizes.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        }
    });
}

// Modal add to cart
const modalAddBtn = $('modalAddBtn');
if (modalAddBtn) {
    modalAddBtn.addEventListener('click', () => {
        if (!currentProductId) return;
        const product = products.find(p => p.id === currentProductId);
        const sizes = $('modalSizes');
        const size = sizes ? (sizes.querySelector('.active')?.textContent || 'M') : 'M';
        addToCart(product, size);
        closeProductModal();
    });
}

// ============ CART ============
function addToCart(product, size = 'M') {
    const existingIndex = cart.findIndex(item => item.id === product.id && item.size === size);
    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: size,
            qty: 1
        });
    }
    updateCart();
    showToast(`${product.name} added to bag`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItemsEl = $('cartItems');
    const cartTotalEl = $('cartTotal');
    const cartCountEl = $('cartCount');
    
    if (!cartItemsEl) return;
    
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    if (cartCountEl) {
        cartCountEl.textContent = totalItems;
        cartCountEl.classList.toggle('visible', totalItems > 0);
    }

    if (cartTotalEl) {
        cartTotalEl.textContent = `$${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    }

    if (cart.length === 0) {
        cartItemsEl.innerHTML = `
            <div class="cart-empty">
                <i class="ri-shopping-bag-line"></i>
                <p>Your bag is empty</p>
            </div>
        `;
    } else {
        cartItemsEl.innerHTML = cart.map((item, i) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span>Size: ${item.size} · Qty: ${item.qty}</span>
                    <strong>$${(item.price * item.qty).toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
                </div>
                <button class="cart-item-remove" data-index="${i}" aria-label="Remove item">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
        `).join('');

        cartItemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.dataset.index);
                removeFromCart(idx);
            });
        });
    }
}

function openCart() {
    const overlay = $('cartOverlay');
    if (overlay) { overlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
}

function closeCart() {
    const overlay = $('cartOverlay');
    if (overlay) { overlay.classList.remove('active'); document.body.style.overflow = ''; }
}

const cartIcon = $('cartIcon');
if (cartIcon) cartIcon.addEventListener('click', openCart);

const cartCloseBtn = $('cartClose');
if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);

const cartOverlay = $('cartOverlay');
if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) closeCart();
    });
}

// ============ TOAST ============
function showToast(message) {
    const toast = $('toast');
    const toastMsg = $('toastMsg');
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ============ HERO INTERACTIONS (only on index.html) ============
const heroCartBtn = $('heroCartBtn');
const heroImage = $('heroImage');

if (heroCartBtn) {
    heroCartBtn.addEventListener('click', () => {
        addToCart({
            id: 'artic-01',
            name: 'ARTIC 01™',
            price: 899.99,
            image: 'assets/hero_puffer_1782579518516.png'
        }, document.querySelector('.size-selector .active')?.textContent || 'M');
    });
}

if (heroImage) {
    heroImage.addEventListener('click', () => openProductModal('jacket-obsidian'));
}

// Thumbnail clicks
document.querySelectorAll('.thumbnails img').forEach(thumb => {
    thumb.addEventListener('click', () => {
        const id = thumb.dataset.productId;
        if (id) openProductModal(id);
    });
});

// Size and Color selector interactions (hero section)
document.querySelectorAll('.size-selector button, .color-selector button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const parent = e.target.parentElement;
        parent.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
    });
});

// ============ SCROLL ANIMATION (300 FRAMES — BATCH PRELOADING) ============
const scrollSection = $('scrollAnimation');
const canvas = $('frameCanvas');
const context = canvas ? canvas.getContext('2d') : null;

if (scrollSection && canvas && context) {
    const frameCount = 300;
    const currentFramePath = index => `assets/frames/frame_${index.toString().padStart(4, '0')}.webp`;
    
    // 1280x720 canvas: sharp enough for display, 75% fewer pixels than 2K = much faster redraws
    canvas.width = 1280;
    canvas.height = 720;

    const imageCache = new Array(frameCount).fill(null);
    let lastDrawnIndex = -1;
    let loadingSet = new Set(); 
    
    // Asynchronous decoding prevents main thread freezes (lag) when images are drawn to canvas
    async function loadFrame(idx) {
        if (imageCache[idx] || loadingSet.has(idx)) return;
        loadingSet.add(idx);
        try {
            const img = new Image();
            img.src = currentFramePath(idx);
            await img.decode(); 
            imageCache[idx] = img;
            
            // If the user is currently parked on this frame but it was drawn blank/stale, draw it now
            if (idx === pendingFrameToDraw) {
                drawFrame(idx, true);
            }
        } catch (e) {
            // Silent fail
        } finally {
            loadingSet.delete(idx);
        }
    }
    
    function preloadRange(centerIndex, radius) {
        const start = Math.max(0, centerIndex - radius);
        const end = Math.min(frameCount - 1, centerIndex + radius);
        for (let i = start; i <= end; i++) {
            loadFrame(i);
        }
    }
    
    // Aggressive background loading to get all 15MB of frames into memory quickly
    function backgroundLoadAll() {
        const globalLoader = $('globalLoader');
        const loaderBar = $('loaderBar');
        
        if (globalLoader) {
            document.body.classList.add('loading');
        }
        
        let loadedCount = 0;
        const updateProgress = () => {
            loadedCount++;
            if (loaderBar) {
                loaderBar.style.width = `${(loadedCount / frameCount) * 100}%`;
            }
            if (loadedCount === frameCount && globalLoader) {
                setTimeout(() => {
                    globalLoader.classList.add('hidden');
                    document.body.classList.remove('loading');
                }, 400); // slight delay for visual smoothness
            }
        };

        // Fire all requests in parallel. The browser's network stack will multiplex them optimally.
        for (let i = 0; i < frameCount; i++) {
            if (!imageCache[i] && !loadingSet.has(i)) {
                loadFrame(i).then(updateProgress);
            } else {
                updateProgress();
            }
        }
    }
    
    let pendingFrameToDraw = -1;
    function drawFrame(index, force = false) {
        if (index === lastDrawnIndex && !force) return;
        pendingFrameToDraw = index;
        
        const img = imageCache[index];
        if (img) {
            lastDrawnIndex = index;
            context.clearRect(0, 0, canvas.width, canvas.height);
            
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.min(hRatio, vRatio);
            
            const cx = (canvas.width - img.width * ratio) / 2;
            const cy = (canvas.height - img.height * ratio) / 2;
            
            context.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
        } else {
            // Draw closest available frame to prevent flashing empty canvas
            let closestImg = null;
            let minDiff = Infinity;
            for (let i = Math.max(0, index - 20); i <= Math.min(frameCount - 1, index + 20); i++) {
                if (imageCache[i]) {
                    const diff = Math.abs(i - index);
                    if (diff < minDiff) { minDiff = diff; closestImg = imageCache[i]; }
                }
            }
            if (closestImg) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                const hRatio = canvas.width / closestImg.width;
                const vRatio = canvas.height / closestImg.height;
                const ratio = Math.min(hRatio, vRatio);
                const cx = (canvas.width - closestImg.width * ratio) / 2;
                const cy = (canvas.height - closestImg.height * ratio) / 2;
                context.drawImage(closestImg, 0, 0, closestImg.width, closestImg.height, cx, cy, closestImg.width * ratio, closestImg.height * ratio);
            }
        }
        
        // Always prioritize loading the window around the current scroll
        preloadRange(index, 15);
    }

    // Start loading everything
    backgroundLoadAll();

    // Handle scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(() => {
                const rect = scrollSection.getBoundingClientRect();
                const sectionHeight = scrollSection.clientHeight - window.innerHeight;
                
                let scrollProgress = (-rect.top) / sectionHeight;
                scrollProgress = Math.max(0, Math.min(1, scrollProgress));
                
                const frameIndex = Math.min(frameCount - 1, Math.floor(scrollProgress * frameCount));
                drawFrame(frameIndex);
                
                ticking = false;
            });
        }
    });
}

// ============ SCROLL TEXT BLOCKS ANIMATION ============
const textBlocks = document.querySelectorAll('.scroll-text-block');
if (textBlocks.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.5
    });
    
    textBlocks.forEach(block => observer.observe(block));
}

// ============ HERO PARALLAX ============
if (heroImage) {
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 1024) {
            const x = (window.innerWidth / 2 - e.pageX) / 40;
            const y = (window.innerHeight / 2 - e.pageY) / 40;
            heroImage.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
        }
    });
}

// ============ SEARCH OVERLAY ============
const searchIcon = $('searchIcon');
const searchOverlay = $('searchOverlay');
const searchClose = $('searchClose');
const searchInput = $('searchInput');
const searchResults = $('searchResults');

function openSearch() {
    if (searchOverlay) {
        searchOverlay.classList.add('active');
        if (searchInput) {
            setTimeout(() => searchInput.focus(), 100);
            searchInput.value = '';
            searchResults.innerHTML = '';
        }
    }
}

function closeSearch() {
    if (searchOverlay) {
        searchOverlay.classList.remove('active');
    }
}

if (searchIcon) searchIcon.addEventListener('click', openSearch);
if (searchClose) searchClose.addEventListener('click', closeSearch);

if (searchInput && searchResults) {
    const categories = ['jacket', 'tshirt', 'glasses', 'boots'];
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (!query) {
            searchResults.innerHTML = '';
            return;
        }

        let html = '';
        
        // 1. Check for category matches
        const matchedCategories = categories.filter(c => c.includes(query) || (c === 'tshirt' && query.includes('tee')));
        if (matchedCategories.length > 0) {
            html += matchedCategories.map(c => `
                <div class="search-result-item category-result" data-category="${c}">
                    <div class="search-result-info" style="padding-left: 0.5rem;">
                        <h4 style="font-size: 0.9rem;">Shop all ${c.toUpperCase()}S</h4>
                        <span style="color: #22c55e;">Category</span>
                    </div>
                    <i class="ri-arrow-right-line" style="opacity: 0.5;"></i>
                </div>
            `).join('');
        }

        // 2. Check for product matches
        const matchedProducts = products.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query)
        );

        if (matchedProducts.length > 0) {
            html += matchedProducts.map(p => `
                <div class="search-result-item product-result" data-id="${p.id}">
                    <img src="${p.image}" alt="${p.name}">
                    <div class="search-result-info">
                        <h4>${p.name}</h4>
                        <span>${p.category}</span>
                    </div>
                    <div class="search-result-price">$${p.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                </div>
            `).join('');
        }

        if (!html) {
            searchResults.innerHTML = '<div class="search-no-results">No matches found</div>';
        } else {
            searchResults.innerHTML = html;

            // Add click listeners to all results
            searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    closeSearch();
                    if (item.classList.contains('category-result')) {
                        window.location.href = `products.html?category=${item.dataset.category}`;
                    } else if (item.classList.contains('product-result')) {
                        if (!$('productModal')) {
                            window.location.href = `products.html?modal=${item.dataset.id}`;
                        } else {
                            openProductModal(item.dataset.id);
                        }
                    }
                });
            });
        }
    });

    // Enter key submits the first result
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const firstResult = searchResults.querySelector('.search-result-item');
            if (firstResult) {
                firstResult.click();
            }
        }
    });
}

// ============ KEYBOARD SHORTCUTS ============
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
        closeCart();
        closeSearch();
    }
});

// ============ INIT ============
const urlParams = new URLSearchParams(window.location.search);
const initialCategory = urlParams.get('category') || 'all';

// Update filter buttons active state based on URL
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === initialCategory);
});

renderProducts(initialCategory);

// Auto-open modal if URL param exists
const modalToOpen = urlParams.get('modal');
if (modalToOpen && $('productModal')) {
    setTimeout(() => openProductModal(modalToOpen), 100);
}

updateCart();
