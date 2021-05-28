import React, { useState } from 'react';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { selectBookList, selectListId } from '../selector';
import { bookAdded, bookUpdate, bookDelete, booksAdapter, booksReceived, bookSetAll, getDetail, clickDeleteBook, addAsync, updateAsync } from '../slices/slice';
import './Book.css'
function Book() {

  const bookList = useSelector(selectBookList)
  const listID = useSelector(selectListId)
  const dispatch = useDispatch();
  const [newBook, setNewBook] = useState({ name: "", title: "" })
  function handleChange(event) {
    const { name, value } = event.target;
    setNewBook(prevValue => {
      if (name === 'name') {
        return {
          name: value,
          title: prevValue.title
        }
      }
      else if (name === 'title') {
        return {
          name: prevValue.name,
          title: value
        }
      }
    })
  }
  const [isAddBook, setIsAddBook] = useState(true)
  function onAddAsync() {
    dispatch(addAsync({ newName: newBook.name, newTitle: newBook.title }))
  }
  const [currentId, setCurrentId] = useState('1')

  function handleAddBook() {
    setIsAddBook(true)
    setNewBook({ name: '', title: '' })
  }

  function onUpdateAsync() {
    // dispatch(updateAsync({ newName: newBook.name, newTitle: newBook.title }))
    dispatch(updateAsync({ updateId: currentId, changes: { newName: newBook.name, newTitle: newBook.title } }))
  }

  const handleUpdateBook = (id) => (e) => {
    console.log(id);
    setCurrentId(id)
    setIsAddBook(false)
    setNewBook({ name: bookList[id].name, title: bookList[id].title })
  }

  useEffect(() => {
    setNewBook({ name: bookList[currentId].name, title: bookList[currentId].title })
  }, [currentId])

  return (
    <div className="book">
      <h3 className='list--title'>Book List</h3>
      <div className="d-flex">
        <div>
          <button className="button button__add" onClick={handleAddBook}>Add Book</button>
          <table className="table table__book">
            <tr className="table__row">
              <th className='table--id'>ID</th>
              <th>Name</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
            {listID.map((id, index) => (
              <tr className='table__row' key={index}>
                <td className="table__data table--id">{id}</td>
                <td className='table__data'>{bookList[id].name}</td>
                <td className='table__data'>{bookList[id].title}</td>
                <td className='table__data'>
                  <button className="button button__edit" onClick={handleUpdateBook(id)}>Edit</button>
                  <button className="button button__delete" onClick={() => dispatch(bookDelete(id))}>Delete</button>
                </td>
              </tr>
            ))}
          </table>
        </div>

        <div className="book__modify">
          <h4>{isAddBook ? 'Add Book' : 'Update Book'}</h4>
          <input className='modify__input' onChange={handleChange} type="text" name="name" placeholder="Name" value={newBook.name} /><br />
          <input className='modify__input' onChange={handleChange} type="text" name="title" placeholder="Title" value={newBook.title} /><br />
          <button className="button button__add" onClick={isAddBook ? onAddAsync : onUpdateAsync}>{isAddBook ? 'Add Async' : 'Update Async'}</button>
        </div>

      </div>

    </div>
  );
}
export default Book;