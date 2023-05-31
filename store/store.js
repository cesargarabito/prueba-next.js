import { compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './rootreducer';
import { configureStore } from '@reduxjs/toolkit';

//root reducer

const middlewares = [logger];

const composeEnhancers = compose(applyMiddleware(...middlewares));

export const store = configureStore({reducer: rootReducer, 
    undefined, composeEnhancers});