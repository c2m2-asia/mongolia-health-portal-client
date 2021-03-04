import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_EDIT_TAGS,
  FETCH_EDIT_TAGS_SUCCESS,
  FETCH_EDIT_TAGS_FAILURE,
} from './constants';
import Api from './api';

function* fetchEditTags() {
  try {
    const response = yield call(Api.fetchEditTags);
    if (response.status !== 200) {
      yield put({
        type: FETCH_EDIT_TAGS_FAILURE,
        errorMessage: response.message,
      });
    } else {
      yield put({
        type: FETCH_EDIT_TAGS_SUCCESS,
        payload: response,
      });
    }
  } catch (error) {
    yield put({ type: FETCH_EDIT_TAGS_FAILURE, errorMessage: error });
  }
}
export default function* editContainerSaga() {
  yield takeLatest(FETCH_EDIT_TAGS, fetchEditTags);
}
