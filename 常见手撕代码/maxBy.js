const maxBy = (list, keyBy) =>
    list.reduce((x, y) => (keyBy(x) > keyBy(y) ? x : y));

const allMaxBy = (list, keyBy) => {
    return list.slice(1).reduce(
        (acc, x) => {
            if (keyBy(x) > keyBy(acc[0])) {
                return [x];
            }
            if (keyBy(x) === keyBy(acc[0])) {
                return [...acc, x];
            }
            return acc;
        },
        [list[0]]
    );
};

const data = [{ value: 6 }, { value: 2 }, { value: 4 }, { value: 6 }];

const res = maxBy(data, x => x.value);

console.log(res);