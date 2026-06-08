const normalizeGameData = (data) => {
    const gameData = { ...data };

    const normalizeArray = (value) => {
        if (!value) return value;

        if (Array.isArray(value)) {
            return value.map((v) => v.trim()).filter(Boolean);
        }

        return value
            .split(",")
            .map((v) => v.trim())
            .filter(Boolean);
    };

    if (gameData.price !== undefined) {
        const priceValue = String(gameData.price).trim();

        if (priceValue.toLowerCase() === "free") {
            gameData.price = "Free";
            gameData.sale = null;
            gameData.salePrice = null;
        } else {
            const numericPrice = Number(priceValue);

            if (!Number.isNaN(numericPrice)) {
                gameData.price = numericPrice;
            }
        }
    }

    if (gameData.sale !== undefined && gameData.sale !== null) {
        gameData.sale = Number(gameData.sale);
    }

    if (gameData.salePrice !== undefined && gameData.salePrice !== null) {
        gameData.salePrice = Number(gameData.salePrice);
    }

    if (gameData.rank !== undefined && gameData.rank !== null) {
        gameData.rank = Number(gameData.rank);
    }

    if (gameData.tag) {
        gameData.tag = normalizeArray(gameData.tag);
    }

    if (gameData.badge) {
        gameData.badge = normalizeArray(gameData.badge);
    }

    if (gameData.comment) {
        gameData.comment = normalizeArray(gameData.comment);
    }

    return gameData;
};

module.exports = normalizeGameData;