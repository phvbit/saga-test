import React from 'react';
// import { useEffect } from 'react';
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { selectBookList, selectListId } from '../selector';
import { bookAdded, bookUpdate, bookDelete, booksAdapter, booksReceived, bookSetAll, getDetail, clickDeleteBook, addAsync, updateAsync } from '../slices/slice';
import './Book.css'

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newBook: { name: '', title: '' }, onAddBook: true, currentId: '1' }
    this.onAddSync = this.onAddSync.bind(this)
  }
  componentDidMount() {
    console.log(this.state.newBook);
  }
  componentDidUpdate() {
    console.log(this.state);
    console.log(this.state.newBook);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      this.setState((state) => ({
        newBook: {name: value, title: state.newBook.title}
      }))
      // this.setState(this.state.newBook.name = value)

    }
    else if (name === 'title') {
      this.setState( (state) => ({
        newBook: {name: state.newBook.name, title: value}
      }))
    }
  }


  onAddSync() {
    const dispatch = this.props.dispatch
    dispatch(addAsync({ newName: this.state.newBook.name, newTitle: this.state.newBook.title }))
  }
  handleAddBook = () => {
    // this.setState({ newBook: { name: '', value: '' }, onAddBook: true })
    this.setState( {
      newBook: {name: '', title: ''},
      onAddBook: true
    })
  }
  onUpdateAsync = () => {
    const dispatch = this.props.dispatch
    dispatch(updateAsync({ updateId: this.state.currentId, changes: { newName: this.state.newBook.name, newTitle: this.state.newBook.title } }))
  }
  // handleUpdateBook(id) {
  //   (event) => {
  //     const bookList = this.props.bookList
  //     this.setState({ newBook: { name: bookList[id].name, title: bookList[id].title }, onAddBook: false, currentId: id })
  //   }
  // }
  handleUpdateBook = (id) => {
    return (e) => {
      const bookList = this.props.bookList
      // this.setState({ newBook: { name: bookList[id].name, title: bookList[id].title }, onAddBook: false, currentId: id })
      this.setState( {
        newBook: { name: bookList[id].name, 
        title: bookList[id].title },
        onAddBook: false, currentId: id
      })
    }
  }


  render() {
    return (
      <div className="book">
        <h3 className='list--title'>Book List</h3>
        <div className="d-flex">
          <div>
            <button className="button button__add" onClick={this.handleAddBook}>Add Book</button>
            <table className="table table__book">
              <tr className="table__row">
                <th className='table--id'>ID</th>
                <th>Name</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
              {this.props.listID.map((id, index) => (
                <tr className='table__row' key={index}>
                  <td className="table__data table--id">{id}</td>
                  <td className='table__data'>{this.props.bookList[id].name}</td>
                  <td className='table__data'>{this.props.bookList[id].title}</td>
                  <td className='table__data'>
                    <button className="button button__edit" onClick={this.handleUpdateBook(id)}>Edit</button>
                    <button className="button button__delete" onClick={() => {
                      const dispatch = this.props.dispatch
                      dispatch(bookDelete(id))
                    }}>Delete</button>
                  </td>
                </tr>
              ))}
            </table>
          </div>

          <div className="book__modify">
            <h4>{this.state.onAddBook ? 'Add Book' : 'Update Book'}</h4>
            <input className='modify__input' onChange={this.handleChange} type="text" name="name" placeholder="Name" value={this.state.newBook.name} /><br />
            <input className='modify__input' onChange={this.handleChange} type="text" name="title" placeholder="Title" value={this.state.newBook.title} /><br />
            <button className="button button__add" onClick={this.state.onAddBook ? this.onAddSync : this.onUpdateAsync}>{this.state.onAddBook ? 'Add Async' : 'Update Async'}</button>
          </div>

        </div>

      </div>
    )


  }
}
const mapStateToProps = (state) => {
  return {
    bookList: state.entities || {},
    listID: state.ids || []
  }
}
const mapDispatchToProps = () => {
  return {
    bookAdded,
    bookUpdate,
    bookDelete,
    booksReceived,
    getDetail,
    bookSetAll,
    clickDeleteBook,
    addAsync,
    updateAsync
  }
}

export default connect(mapStateToProps)(Book)