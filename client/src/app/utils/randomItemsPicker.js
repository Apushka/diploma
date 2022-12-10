export const randomItemsPicker = (array, amount) => {
    let count = 0;
    const result = [];

    while (count < amount) {
        const item = array[Math.floor(Math.random() * array.length)];
        if (!result.includes(item)) {
            result.push(item);
            count++;
        }
    }
    return result;
};
