import { addAsync, bookAdded, bookUpdate, updateAsync } from "../slices/slice"
import { all, delay, put, takeEvery, takeLatest} from 'redux-saga/effects'
function* addBookAsync(action) {
  yield delay(1000)
  yield put(bookAdded(action.payload))
}
function* watchAddBookAsync() {
  yield takeEvery(addAsync, addBookAsync)
}

function* updateBookAsync(action) {
  yield delay(1000)
  yield put(bookUpdate(action.payload))
}
function* watchUpdateBookAsync() {
  yield takeLatest(updateAsync ,updateBookAsync)
}

export default function* rootSaga() {
  yield all([
    watchAddBookAsync(),
    watchUpdateBookAsync(),
  ])
}