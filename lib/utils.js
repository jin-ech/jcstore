export const getUuid = (randomLength = 8) => {
    return Number(Math.random().toString().substr(3, randomLength) + Date.now()).toString(36);
};

export const isEqual = (obj1, obj2) => {
    if (typeof obj1 !== typeof obj2) {
        return false;
    }
    if (typeof obj1 !== 'object') {
        return obj1 === obj2;
    }
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
    if (obj1Keys.length !== obj2Keys.length) {
        return false;
    }
    for (let key of obj1Keys) {
        if (!isEqual(obj1[key], obj2[key])) {
            return false;
        }
    }
    return true;
};