const levels = {
    1: { theme: ["formal"], rules: ["no high heels"] },
    2: { theme: ["casual"], rules: ["warm"] },
    3: { theme: ["formal", "casual"], rules: [] }
};

const clothingItems = {
    tops: [
        { name: "top_1.PNG", category: "top", theme: ["casual", "formal"], rules: ["warm"] },
        { name: "top_2.PNG", category: "top", theme: ["casual"], rules: [] },
        { name: "top_3.PNG", category: "top", theme: ["formal"], rules: ["no high heels"] },
    ],
    bottoms: [
        { name: "bottom_1.PNG", category: "bottom", theme: ["casual"], rules: [] },
        { name: "bottom_2.PNG", category: "bottom", theme: ["formal"], rules: ["warm"] },
    ],
    shoes: [
        { name: "shoes_1.PNG", category: "shoes", theme: ["casual"], rules: [] },
        { name: "shoes_2.PNG", category: "shoes", theme: ["formal"], rules: ["no high heels"] },
    ]
};

// ✅ Function to calculate score based on selected clothes and level number
export function calculateScore(outfit, levelNumber) {
    let level = levels[levelNumber]; // Get level data based on number
    if (!level) {
        console.error(`Invalid level number: ${levelNumber}`);
        return 0;
    }

    let score = 0;

    Object.values(outfit).forEach(item => {
        if (!item) return; // Skip if no item is selected

        // Find item details
        let itemData = Object.values(clothingItems).flat().find(i => i.name === item);
        if (!itemData) return;

        // ✅ Matches theme
        if (level.theme.some(theme => itemData.theme.includes(theme))) {
            score += 10;
        }

        // ❌ Breaks a rule
        if (level.rules.some(rule => itemData.rules.includes(rule))) {
            score -= 5;
        }
    });

    return score;
}
