import { call, put, takeLatest } from 'redux-saga/effects';

import {
  FETCH_RESOURCES,
  FETCH_RESOURCES_SUCCESS,
  FETCH_RESOURCES_FAILURE,
} from './constants';
import Api from './api';

function* fetchResources(action) {
  try {
    const response = yield call(Api.fetchResources, action.payload);
    if (response.status !== 200) {
      yield put({
        type: FETCH_RESOURCES_FAILURE,
        errorMessage: response.message,
      });
    } else {
      yield put({
        type: FETCH_RESOURCES_SUCCESS,
        payload: response,
      });
    }
  } catch (error) {
    yield put({ type: FETCH_RESOURCES_FAILURE, errorMessage: error });
  }
}

export default function* mobileResourcesContainerSaga() {
  yield takeLatest(FETCH_RESOURCES, fetchResources);
}
