import { call, put, takeLatest } from 'redux-saga/effects';

import {
  SEARCH_POI,
  SEARCH_POI_SUCCESS,
  SEARCH_POI_FAILURE,
} from './constants';
import Api from './api';

function* searchPoi(action) {
  try {
    const response = yield call(Api.searchPoi, action.payload);
    console.log("response", response);
    if (false) {
      yield put({
        type: SEARCH_POI_FAILURE,
        errorMessage: response.message,
      });
    } else {
      yield put({
        type: SEARCH_POI_SUCCESS,
        payload: response,
      });
    }
  } catch (error) {
    yield put({ type: SEARCH_POI_FAILURE, errorMessage: error });
  }
}

export default function* searchContainerSaga() {
  yield takeLatest(SEARCH_POI, searchPoi);
}
