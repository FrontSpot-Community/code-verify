export const removeDupblicateValuesFromArray = (array) => {
    return array.filter((item, index, sourceArray) => {
       return sourceArray.indexOf(item) === index;
    });
};


export const composeQuery = (req, DataModel) => {
    const queryToDb = [];
    const request = {...req};
    let {query} = request;
    query = removeSkipLimit(query);

    if (Object.keys(query).length) {
        // some logic
    }

    return queryToDb;
};

const removeSkipLimit = (obj) => {
    if (obj && obj.skip && obj.limit) {
        delete obj.skip;
        delete obj.limit;
    }
    return obj;
};

export const getSkipLimit = (obj) => {
    return obj && {skip: obj.skip || null, limit: obj.limit || null};
};
