const fs = require('fs');

let html = fs.readFileSync('code.html', 'utf-8');

// Replace the grid content with an empty div identified by id="product-grid"
const gridPattern = /<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">[\s\S]*?<\/div>\s*<\/section>/;
const newGrid = `<div id="product-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    <!-- Products will be injected here dynamically -->
</div>
</section>`;
html = html.replace(gridPattern, newGrid);

// Embed Supabase JS SDK into the HEAD
if (!html.includes('supabase-js')) {
    html = html.replace('</head>', `
<!-- Supabase SDK -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="config.js"></script>
</head>`);
}

// Add our fetching script before closing </body>
const fetchScript = `
<script>
async function loadProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '<div class="col-span-full py-20 text-center text-slate-500 flex flex-col items-center"><div class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div><p>Loading fresh catalog...</p></div>';

    try {
        const { data: products, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        if (!products || products.length === 0) {
            grid.innerHTML = '<p class="col-span-full text-center text-slate-500 py-12">No products available at the moment.</p>';
            return;
        }

        let htmlContent = '';
        products.forEach(p => {
            htmlContent += \`
            <div class="product-card group flex flex-col bg-surface-container-lowest rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(45,52,53,0.08)] border border-slate-100 dark:border-slate-800/80">
                <div class="aspect-[4/3] relative overflow-hidden bg-surface-container-low">
                    <img class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" alt="\${p.name}" src="\${p.image_url}"/>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div class="flex flex-col flex-grow p-6 md:p-8">
                    <h3 class="text-xl font-bold text-on-surface mb-2 tracking-tight group-hover:text-primary transition-colors">\${p.name}</h3>
                    <p class="text-on-surface-variant text-sm flex-grow mb-8 leading-relaxed line-clamp-2">\${p.description}</p>
                    <div class="flex justify-between items-end mt-auto pt-5 border-t border-slate-100 dark:border-slate-800/50">
                        <div class="flex flex-col">
                            <span class="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70 mb-1.5">Price</span>
                            <span class="text-2xl font-extrabold text-primary leading-none tracking-tight">₹\${p.price_per_kg}<span class="text-xs font-semibold opacity-60 ml-1 tracking-normal">/kg</span></span>
                        </div>
                        <a href="https://wa.me/919865668125" class="bg-[#25D366] text-white px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2.5 hover:bg-[#20bd5a] hover:-translate-y-0.5 transition-all shadow-sm hover:shadow-[0_8px_16px_rgba(37,211,102,0.25)] ring-1 ring-inset ring-black/5" target="_blank">
                            <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.403 0 6.556-5.332 11.891-11.891 11.891-2.007 0-3.974-.509-5.712-1.472l-6.181 1.69zm6.014-4.222l.432.256c1.616.958 3.473 1.465 5.39 1.465 5.733 0 10.395-4.661 10.395-10.395s-4.662-10.395-10.395-10.395c-5.732 0-10.394 4.661-10.394 10.395 0 2.053.601 4.05 1.737 5.759l.282.424-1.104 4.035 4.145-1.137zm10.305-6.17c-.337-.17-1.991-.983-2.3-1.096-.309-.113-.533-.17-.757.17-.224.339-.869 1.096-1.066 1.321-.197.225-.394.253-.731.084-.337-.17-1.423-.524-2.71-1.672-1.002-.894-1.678-2.001-1.874-2.339-.197-.338-.021-.521.148-.689.152-.151.338-.395.506-.592.169-.197.225-.338.338-.563.112-.225.056-.423-.028-.592-.084-.169-.757-1.826-1.037-2.503-.273-.659-.551-.57-.757-.581-.196-.011-.421-.013-.646-.013s-.59.084-.899.423c-.309.338-1.18 1.155-1.18 2.817 0 1.661 1.208 3.267 1.377 3.493.169.225 2.378 3.631 5.761 5.087.805.347 1.433.553 1.922.709.808.257 1.543.221 2.124.135.647-.094 1.991-.815 2.272-1.603.281-.789.281-1.464.197-1.603-.084-.141-.309-.225-.646-.395z"/></svg> 
                            Order
                        </a>
                    </div>
                </div>
            </div>
            \`;
        });
        grid.innerHTML = htmlContent;

        // Re-attach scroll observers
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                } else {
                    entry.target.classList.remove('revealed');
                }
            });
        }, { threshold: 0.1, rootMargin: "0px" });
        
        document.querySelectorAll('.product-card').forEach((el) => {
            el.classList.add('reveal-on-scroll');
            observer.observe(el);
        });

    } catch (err) {
        console.error('Error loading products:', err.message);
        grid.innerHTML = '<p class="col-span-full text-center text-red-500 py-12">Failed to load products. Please check your connection or database setup.</p>';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Initial reveals
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            } else {
                entry.target.classList.remove('revealed');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px" });
    
    document.querySelectorAll('h1, h2, h3, p:not(.product-card p)').forEach((el) => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
    });

    // Fire fetch
    loadProducts();
});
</script>
</body>`;

// Remove previous Intersection observer logic at end of body cleanly
const jsPattern = /<script>\s*document\.addEventListener\("DOMContentLoaded"[\s\S]*?<\/script>\s*<\/body>/;
html = html.replace(jsPattern, fetchScript);

fs.writeFileSync('code.html', html, 'utf-8');
console.log('Successfully injected layout fetching logic.');
