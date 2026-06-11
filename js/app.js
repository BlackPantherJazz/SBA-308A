import { fetchAllHeroes } from "./api.js";
import { renderHeroGrid, renderHeroDetail, showGrid } from "./ui.js";

const searchInput = document.getElementById("search-input");
const publisherFilter = document.getElementById("publisher-filter");
const alignmentFilter = document.getElementById("alignment-filter");
const heroGrid = document.getElementById("hero-grid");
const heroDetail = document.getElementById("hero-detail");

let allHeroes = [];

async function init() {
    try {
        allHeroes = await fetchAllHeroes();
        renderHeroGrid(allHeroes, heroGrid);
    } catch (error) {
        heroGrid.innerHTML = `
            <div class="no-results">
                <p>Failed to load heroes. Please try again later.</p>
            </div>
        `;
    }
}

function filterHeroes() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const publisher = publisherFilter.value;
    const alignment = alignmentFilter.value;

    let filtered = allHeroes;

    if (searchTerm) {
        filtered = filtered.filter(hero =>
            hero.name.toLowerCase().includes(searchTerm)
        );
    }

    if (publisher !== "all") {
        filtered = filtered.filter(hero =>
            hero.biography.publisher === publisher
        );
    }

    if (alignment !== "all") {
        filtered = filtered.filter(hero =>
            hero.biography.alignment === alignment
        );
    }

    renderHeroGrid(filtered, heroGrid);
}

searchInput.addEventListener("input", filterHeroes);
publisherFilter.addEventListener("change", filterHeroes);
alignmentFilter.addEventListener("change", filterHeroes);

heroGrid.addEventListener("click", async (event) => {
    const card = event.target.closest(".hero-card");
    if (!card) return;

    const heroId = card.dataset.id;

    try {
        const hero = allHeroes.find(h => h.id === Number(heroId));
        renderHeroDetail(hero);
    } catch (error) {
        console.error("Error loading hero detail:", error);
    }
});

heroDetail.addEventListener("click", (event) => {
    if (event.target.id === "back-btn") {
        showGrid();
    }
});

init();