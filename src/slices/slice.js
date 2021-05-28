import {
  createEntityAdapter,
  createSlice,
  configureStore,
  current,
} from '@reduxjs/toolkit'

const bookAdapter = createEntityAdapter()

const initialBookState = {
  entities: {
    '1': {
      id: "1",
      name: "Book A",
      title: "Outliers",
    }
  },
  ids: ['1']

}
const booksSlice = createSlice({
  name: 'books',
  initialState: initialBookState,
  reducers: {
    bookAdded(state, action) {
      const { newName, newTitle } = action.payload
      const lastId = (Number(state.ids[state.ids.length - 1]) || 0)
      const newID = (lastId + 1).toString();
      state.ids = [...state.ids, newID]
      state.entities = { ...state.entities, [newID]: { id: newID, name: newName, title: newTitle } }

    },
    bookUpdate(state, action) {
      const { updateId, changes: { newName, newTitle } } = action.payload
      if (state.entities[updateId]) {
        state.entities[updateId].title = newTitle
        state.entities[updateId].name = newName
      }

    },
    bookDelete(state, action) {
      const deleteID = action.payload
      state.ids = state.ids.filter(id => 
         id !== deleteID
      );

      // console.log(newArr);
      delete state.entities[deleteID];
    },
    getDetail(state, action) {
      console.log("ONE");


    },
    bookSetAll(state, action) {
      console.log(state.ids);
      state.ids = []
      state.entities = {}

      state.ids = action.payload.map((element, index) => (index + 1).toString())
      action.payload.forEach((element, index) => {
        state.entities[(index + 1).toString()] = element
      })
    },
    addAsync(state, action) {
      return state
    },
    updateAsync(state, action) {
      return state
    }

  },
})


export const { bookAdded, bookUpdate, bookDelete, booksReceived, getDetail, bookSetAll, clickDeleteBook, addAsync, updateAsync } = booksSlice.actions

export default booksSlice.reducer