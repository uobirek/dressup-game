const levels = {
    1: { theme: "casual", rules: ["no high heels", "no white"] },
    2: { theme: "comfy", rules: ["no shoes"] },
    3: { theme: "fancy", rules: [] }
};

const clothingItems = {
    tops: [
        { name: "top_1.PNG", points: { casual: 4, comfy: 2, fancy: 3 }, rules: [] },
        { name: "top_2.PNG", points: { casual: 2, comfy: 5, fancy: 1 }, rules: [] },
        { name: "top_3.PNG", points: { casual: 4, comfy: 3, fancy: 1 }, rules: [] },
        { name: "top_4.PNG", points: { casual: 3, comfy: 1, fancy: 5 }, rules: [] },
        { name: "top_5.PNG", points: { casual: 4, comfy: 2, fancy: 4 }, rules: [] },
        { name: "top_6.PNG", points: { casual: 4, comfy: 2, fancy: 5 }, rules: ["no white"] },
        { name: "top_7.PNG", points: { casual: 3, comfy: 2, fancy: 2 }, rules: [] },

    ],
    bottoms: [
        { name: "bottom_1.png", points: { casual: 3, comfy: 5, fancy: 1 }, rules: [] },
        { name: "bottom_2.png", points: { casual: 4, comfy: 2, fancy: 4 }, rules: [] },
        { name: "bottom_3.png", points: { casual: 5, comfy: 1, fancy: 4 }, rules: [] },
        { name: "bottom_4.png", points: { casual: 3, comfy: 5, fancy: 1 }, rules: [] },

    ],
    shoes: [
        { name: "shoes_1.png", points: { casual: 4, comfy: 3, fancy: 1 }, rules: ["no shoes"] },
        { name: "shoes_2.png", points: { casual: 2, comfy: 1, fancy: 5 }, rules: ["no high heels", "no shoes"] },
        { name: "shoes_3.png", points: { casual: 3, comfy: 1, fancy: 4 }, rules: ["no high heels", "no shoes"] },

    ],
    socks:
        [
            { name: "socks_1.png", points: { casual: 5, comfy: 3, fancy: 2 }, rules: [] },
            { name: "socks_2.png", points: { casual: 4, comfy: 4, fancy: 3 }, rules: [] },
            { name: "socks_3.png", points: { casual: 2, comfy: 2, fancy: 5 }, rules: [] },

        ],
    accessories: [
        { name: "accessory_1.png", category: "accessories", points: { casual: 5, comfy: 3, fancy: 2 }, rules: [] },
        { name: "accessory_2.png", category: "accessories", points: { casual: 3, comfy: 2, fancy: 4 }, rules: [] },
        { name: "accessory_3.png", category: "accessories", points: { casual: 5, comfy: 2, fancy: 4 }, rules: [] },
        { name: "accessory_4.png", category: "accessories", points: { casual: 4, comfy: 5, fancy: 1 }, rules: [] },
        { name: "accessory_5.png", category: "accessories", points: { casual: 4, comfy: 5, fancy: 2 }, rules: [] },
        { name: "accessory_6.png", category: "accessories", points: { casual: 4, comfy: 3, fancy: 5 }, rules: [] },
        { name: "accessory_7.png", category: "accessories", points: { casual: 4, comfy: 3, fancy: 3 }, rules: [] },

    ]

};

// Function to calculate score based on selected clothes and level number
export function calculateScore(outfit, levelNumber) {
    let level = levels[levelNumber];
    if (!level) {
        console.error(`Invalid level number: ${levelNumber}`);
        return 0;
    }

    let score = 0;
    console.log("we cleaned score: ", score);
    if (!outfit.top || !outfit.bottom) {
        console.error("Both a top and a bottom must be worn!");
        return 0;
    }

    Object.values(outfit).forEach(item => {
        console.log("item: ", item);
        if (!item) return; // Skip if no item is selected
        let itemData = Object.values(clothingItems).flat().find(i => i.name === item);
        if (!itemData) return;

        //Calculate category score for the specified theme
        let itemPoints = itemData.points[level.theme] || 0;
        score += itemPoints;

        //Breaks a rule
        if (level.rules.some(rule => itemData.rules.includes(rule))) {
            score -= 5;
        }

    });
    score *= 10;
    console.log("Calculated score:", score);
    return score;
}
