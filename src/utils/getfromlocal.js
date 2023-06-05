const storeInLocal = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};
const getFromLocal = (key) => {
    let val = localStorage.getItem(key);
    // let val = localStorage.getItem(key) ?? `{}`;
    return JSON.parse(val);
};
const removeFromLocal = (key) => {
    localStorage.removeItem(key);
};

export { storeInLocal, getFromLocal, removeFromLocal };

