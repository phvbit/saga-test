import './App.css';
import {Provider} from 'react-redux';
import Book from './book/Book';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Book />
      </div>
  
    </Provider>
  );
}

export default App;


// import React from 'react';
// import { Provider, useDispatch, useSelector, shallowEqual } from 'react-redux';
// import {
//   configureStore,
//   createSlice,
//   createEntityAdapter
// } from '@reduxjs/toolkit';

// const todosAdapter = createEntityAdapter();

// const { reducer, actions, name } = createSlice({
//   name: 'todos',
//   initialState: todosAdapter.getInitialState(),
//   reducers: {
//     add: todosAdapter.addOne
//   }
// });

// const store = configureStore({
//   reducer: {
//     [name]: reducer
//   }
// });

// const { add } = actions;

// const Adapter = () => {
//   const dispatch = useDispatch();
//   const todos = useSelector(state => state.todos, shallowEqual);
//   console.log('todos: ', todos);
//   // { "ids": [ 1 ], "entities": { "1": { "id": 1, "todo": "one" } } }
//   // Can't get the original value

//   // I have to parse the value every time
//   const todosSelectors = todosAdapter.getSelectors(state => state.todos);
//   const todos2 = useSelector(
//     state => todosSelectors.selectAll(state),
//     shallowEqual
//   );
//   console.log('todos2: ', todos2);
//   // [ { "id": 1, "todo": "one" } ]
//   // It took me some steps to get the result I want.

//   return (
//     <div>
//       <button onClick={() => dispatch(add({ id: 1, todo: 'one' }))}>Add</button>
//       <p>{JSON.stringify(todos, null, '  ')}</p>
//       <p>{JSON.stringify(todos2, null, '  ')}</p>
//     </div>
//   );
// };

// export default () => (
//   <Provider store={store}>
//     <Adapter />
//   </Provider>
// );