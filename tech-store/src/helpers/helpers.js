const rating = (itemRating) => {
    if (!Number.isInteger(itemRating)) {
        return 'n\\a';
    }

    return '&#x2605;'.repeat(itemRating);
}

export default {
    rating
};