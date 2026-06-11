const BASE_URL = "https://akabab.github.io/superhero-api/api";

let heroCache = null;

export async function fetchAllHeroes() {
    if (heroCache){
        return heroCache
    }

    try {
        const response = await fetch(`${BASE_URL}/all.json`)

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        heroCache = data;
        return data;
    } catch (error) {
        console.error("FAILED TO FETCH HEROES:", error);
        throw error;
    }
}

export async function fetchHeroById(id) {
    try {
        const response = await fetch(`${BASE_URL}/id/${id}.json`);

        if (!response.ok) {
            throw new Error(`Hero not found: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`FAILED TO FETCH HERO ${id}:`, error);
        throw error;
    }
}