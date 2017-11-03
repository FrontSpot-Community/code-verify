import mongoose from 'mongoose';
import config from '../configuration';
/* eslint-disable no-console */

mongoose.connect(config.get('db:connection'), {useMongoClient: true});
mongoose.Promise = Promise;

const connection = mongoose.connection;

connection.on('error', function(error) {
    console.log('db connection error', error);
});

connection.once('open', function() {
    console.log('db is connected');
});
connection.once('close', function() {
    console.log('db is closed');
});
export default connection;


export const createModel = (modelName, schema, ...staticMethods) => {
    return mongoose.model(
        modelName,
        addStaticMethodsToSchema(schema, staticMethods)
    );
};


const addStaticMethodsToSchema = (schema, staticMethods) => {
    const reducer = (accumulator, method) => {
        accumulator.statics[method.name] = method;
        return accumulator;
    };

    staticMethods.length > 0 && staticMethods.reduce(reducer, schema);

    return schema;
};
