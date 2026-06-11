export function renderHeroGrid(heroes, container) {
    container.innerHTML = "";

    if (heroes.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <p>No heroes found. Try a different search.</p>
            </div>
        `;
        return;
    }

    heroes.forEach(hero => {
        const card = document.createElement("div");
        card.classList.add("hero-card");
        card.dataset.id = hero.id;

        card.innerHTML = `
            <img 
                src="${hero.images.md}" 
                alt="${hero.name}"
                loading="lazy"
            >
            <div class="hero-card-info">
                <h3>${hero.name}</h3>
                <span class="publisher">${hero.biography.publisher || "Unknown"}</span>
            </div>
        `;

        container.appendChild(card);
    });
}

export function renderHeroDetail(hero) {
    const section = document.getElementById("hero-detail");

    const stats = hero.powerstats;

    section.innerHTML = `
        <button id="back-btn" class="back-btn">Back</button>
        <div class="detail-layout">
            <div class="detail-image">
                <img src="${hero.images.lg}" alt="${hero.name}">
            </div>
            <div class="detail-info">
                <h2>${hero.name}</h2>
                <p class="real-name">${hero.biography.fullName || "Unknown"}</p>
                <p class="first-appearance">${hero.biography.firstAppearance || "Unknown"}</p>
                <p class="publisher-tag">${hero.biography.publisher || "Unknown"}</p>
                <p class="alignment-tag ${hero.biography.alignment}">${hero.biography.alignment || "Unknown"}</p>

                <div class="stats">
                    <div class="stat-bar">
                        <label>Intelligence</label>
                        <div class="bar-bg"><div class="bar-fill" style="width: ${stats.intelligence}%"></div></div>
                        <span>${stats.intelligence}</span>
                    </div>
                    <div class="stat-bar">
                        <label>Strength</label>
                        <div class="bar-bg"><div class="bar-fill" style="width: ${stats.strength}%"></div></div>
                        <span>${stats.strength}</span>
                    </div>
                    <div class="stat-bar">
                        <label>Speed</label>
                        <div class="bar-bg"><div class="bar-fill" style="width: ${stats.speed}%"></div></div>
                        <span>${stats.speed}</span>
                    </div>
                    <div class="stat-bar">
                        <label>Durability</label>
                        <div class="bar-bg"><div class="bar-fill" style="width: ${stats.durability}%"></div></div>
                        <span>${stats.durability}</span>
                    </div>
                    <div class="stat-bar">
                        <label>Power</label>
                        <div class="bar-bg"><div class="bar-fill" style="width: ${stats.power}%"></div></div>
                        <span>${stats.power}</span>
                    </div>
                    <div class="stat-bar">
                        <label>Combat</label>
                        <div class="bar-bg"><div class="bar-fill" style="width: ${stats.combat}%"></div></div>
                        <span>${stats.combat}</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    section.classList.remove("hidden");
    document.getElementById("hero-grid").classList.add("hidden");
    document.querySelector(".controls").classList.add("hidden");
}

export function showGrid() {
    document.getElementById("hero-detail").classList.add("hidden");
    document.getElementById("hero-grid").classList.remove("hidden");
    document.querySelector(".controls").classList.remove("hidden");
}