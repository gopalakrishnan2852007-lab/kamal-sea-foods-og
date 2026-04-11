const fs = require('fs');

let html_content = fs.readFileSync('code.html', 'utf-8');

const products = [
    {
        name: "I Cube Prawn",
        desc: "Premium selection, peeled and deveined.",
        price: "₹850",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWY94Vrf9adWb-n9Sczii5i3wI7zGRsR1Zd8Jl61FjceYH6RdUR1YemLTrlwE_f4dQlro2iB7Bidpj5LF-9WIZCFXD1ILeHH_WcloeVtsCmQjXKwYQ7s9sMm6XripsL_n7us311AQ4we2HCegFiP2lTcv2AnlLq_ZcvU2hejuTUlj03KQqWpwD1ItAg8w8-gELtmu0A9jBF7-lYTB4iDitww4u2-Z2K79rIDwC_nI740R-AbQZMZeZFcyRR7947e0N4_JZ-kHEQmVZ"
    },
    {
        name: "Small Prawn",
        desc: "Perfect for curries",
        price: "₹450",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBug-l2s80K88ZJLvnpF0yWhhfjGoN49WhksndHlZp3EEhQDAvgEZ2Ue3qfjIfI3EIvNA7PsEYtToFs_izqB4-GD2ARiHM0fTYKieM487yPDunx1ndOm4GaSsETnKOeM2h8YJiy8cKYg5j1eRx1YFblRKHlW0lztdMx-C2mKWYHAiLkkFESpI-aCq9YQK1WpixxUYuJy-kwdb0C53kICHqExqjCzgZIzqA5nCKWy0Mbov8ENrSqB9akMM0eQBlaOgDaYP-G87QX-4bX"
    },
    {
        name: "Medium Prawn",
        desc: "Ideal for grilling",
        price: "₹650",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBT11EfoEGKEjb9PCp4AGCHH1mijPIPIIp8wbbMhez8RY9RQ92-QPI-H6rDfZY5RuJphA72IiHbR6YD9sGSSGWwdFy3J-AkiUZq_xqtSME-0BE46F69dk94IRLSZbB_nXGup3_lmf25IAKQA6cPraA8vRZdCLKGIy4Zz0c0CrgxIDUS7I10OVhCVmuIH_0gmQCxPNPSqPEbRy5KGqk4-Xe_qGL7f_gmCfiSYDebS53IGsQvStSlzKJJtHbQ_ahININl4OCOWZo0Nzgm"
    },
    {
        name: "Mathi",
        desc: "Omega-3 rich sardines",
        price: "₹180",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjpyj8XGOsUX7w9qk9I1Bw5BOWBvHEDvnXZF2Otn30VEtakFB5yxSDQ_B-ikdN0UIxi50k3qREOte1jGMhQ06HabZ58PZTGAyCS8Ot6XNDvwTtU8sCxBm1PwQn56bORNOr24L92uGZkuSLMkCEzEv5MLhV2ZHmTlN_uTPHK2MA3S7O97msdEFbxJYD5KW5pHYDzbuiCwhaAZJc-XX0YwkFSbxIqWKwwZ32CUtUwdB05BNhkIKOv0-dObeGfVmlzxVu9PlbhJyxVm59"
    },
    {
        name: "Vanjaram (Seer Fish)",
        desc: "The King of Atlantic Fish. Firm texture, rich in natural oils.",
        price: "₹1200",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPxbDhOyiIlIGHIxoszmiYopIUZ3-F-7vyVLOByV2Da6qO8kxHm_0oknnBrRppnAY30P90px8qhUfuuu0X4jsu8am3AEfIi_H5LgrBpMG958RVSDrxXbYQMR1TC1aOnwu5ZOPYiBx0gTpVtRzbl8UJ-X0oYH2t1fxoJyQ5wMY81bVgfpAsi313M7T7sGbP5pP7hQ_GkQBosksti-GswjATb4Pe5BNGabGVI44ygwC7yFreQB8vOX_iTaLHa1vwr_x2gMmbpjDLCNfR"
    },
    {
        name: "Basha Fillet",
        desc: "Boneless, tender",
        price: "₹380",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIR7vY8LFE01CLmDcskOEyx6oxjrFTpLBzedBqZZOeTrHeRA4NaICF4TxwBUeYCATQANtQdauIBaHH6YPAXEqG2ES7YChXK_hHxhT5e8vUJ9ssf4myQbesnckfoPbyK6U1jbPIcG5DgXLaulnvqliN8Q_2p30vrwaiyRtPYfTruBDuPbZScGbpCx-MQkEV4VYBfpDrMmUM_3rKQ0ykj_BAOv8JaFixcWfWm5Z6myHs9ZICsxN_VFyHLCRXe4NX3cEKXJ7jm8B9GNzS"
    },
    {
        name: "Crab Lollipop",
        desc: "Gourmet appetizer",
        price: "₹520",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGZ7cgv3VtWTnPsKl74N8KvCGFXfJstht4KXKBvnb6FmI7NNIhh9W3qBO2ASf1rn58kNOcG8gCFFva0eCdUhmUSO6hy2VNE3oxJXYoKps-dLLrBmPLEUyZ6dNh3c0dUZ5PonupsZ9IYSEjVfL-qGkA53BvmXx1no9nRGGEFsqo9hNJJzp4Wh88psqMHygETHTf1OBimd4a6XH3PmzSMb24KYp9c3alXWyt1oaFJVpseLjM-H-qAS7X5yFpdyYt6nwDDS_rkgJLOIE1"
    }
];

let grid_html = '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">\n';

for (const p of products) {
    grid_html += `<div class="product-card group flex flex-col bg-surface-container-lowest rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(45,52,53,0.08)] border border-slate-100 dark:border-slate-800/80">
    <div class="aspect-[4/3] relative overflow-hidden bg-surface-container-low">
        <img class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" alt="${p.name}" src="${p.img}"/>
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
    <div class="flex flex-col flex-grow p-6 md:p-8">
        <h3 class="text-xl font-bold text-on-surface mb-2 tracking-tight group-hover:text-primary transition-colors">${p.name}</h3>
        <p class="text-on-surface-variant text-sm flex-grow mb-8 leading-relaxed line-clamp-2">${p.desc}</p>
        <div class="flex justify-between items-end mt-auto pt-5 border-t border-slate-100 dark:border-slate-800/50">
            <div class="flex flex-col">
                <span class="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70 mb-1.5">Price</span>
                <span class="text-2xl font-extrabold text-primary leading-none tracking-tight">${p.price}<span class="text-xs font-semibold opacity-60 ml-1 tracking-normal">/kg</span></span>
            </div>
            <a href="https://wa.me/919865668125" class="bg-[#25D366] text-white px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2.5 hover:bg-[#20bd5a] hover:-translate-y-0.5 transition-all shadow-sm hover:shadow-[0_8px_16px_rgba(37,211,102,0.25)] ring-1 ring-inset ring-black/5" target="_blank">
                <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.403 0 6.556-5.332 11.891-11.891 11.891-2.007 0-3.974-.509-5.712-1.472l-6.181 1.69zm6.014-4.222l.432.256c1.616.958 3.473 1.465 5.39 1.465 5.733 0 10.395-4.661 10.395-10.395s-4.662-10.395-10.395-10.395c-5.732 0-10.394 4.661-10.394 10.395 0 2.053.601 4.05 1.737 5.759l.282.424-1.104 4.035 4.145-1.137zm10.305-6.17c-.337-.17-1.991-.983-2.3-1.096-.309-.113-.533-.17-.757.17-.224.339-.869 1.096-1.066 1.321-.197.225-.394.253-.731.084-.337-.17-1.423-.524-2.71-1.672-1.002-.894-1.678-2.001-1.874-2.339-.197-.338-.021-.521.148-.689.152-.151.338-.395.506-.592.169-.197.225-.338.338-.563.112-.225.056-.423-.028-.592-.084-.169-.757-1.826-1.037-2.503-.273-.659-.551-.57-.757-.581-.196-.011-.421-.013-.646-.013s-.59.084-.899.423c-.309.338-1.18 1.155-1.18 2.817 0 1.661 1.208 3.267 1.377 3.493.169.225 2.378 3.631 5.761 5.087.805.347 1.433.553 1.922.709.808.257 1.543.221 2.124.135.647-.094 1.991-.815 2.272-1.603.281-.789.281-1.464.197-1.603-.084-.141-.309-.225-.646-.395z"/></svg> 
                Order
            </a>
        </div>
    </div>
</div>\n`;
}
grid_html += '</div>';

// Find from <div class="bento-grid"> up to the closure just before </section>
const pattern = /<div class="bento-grid">([\s\S]*?)<\/section>/;
html_content = html_content.replace(pattern, grid_html + '\n</section>');

// Replace .bento-grid CSS blocks globally using regex capturing from .bento-grid { to closing } and any media queries targeting it
const cssPattern = /\.bento-grid\s*\{[^}]*\}\s*/g;
html_content = html_content.replace(cssPattern, '');

const mediaPattern = /@media[^{]*\{\s*\.bento-grid[^}]*\}[^}]*\}/g;
html_content = html_content.replace(mediaPattern, '');

// Also fix the JS observer query
html_content = html_content.replace('.bento-grid > div', '.product-card');

fs.writeFileSync('code.html', html_content, 'utf-8');
console.log("Successfully rebuilt grid.");
