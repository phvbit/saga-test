
// const store = configureStore({
//   reducer: {
//     books: booksSlice.reducer,
//   },
// })


// export default store


// Can create a set of memoized selectors based on the location of this entity state
// const booksSelectors = booksAdapter.getSelectors((state) => state.books)

// And then use the selectors to retrieve values
// const allBooks = booksSelectors.selectAll(store.getState())

import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/saga';
import bookReducer, { booksReceived } from '../slices/slice';

const sagaMiddleware = createSagaMiddleware();


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
);
const store = createStore(bookReducer, enhancer);
sagaMiddleware.run(rootSaga);
export default store;