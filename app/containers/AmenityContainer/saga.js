import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_AMENITY_DETAIL,
  GET_AMENITY_DETAIL_SUCCESS,
  GET_AMENITY_DETAIL_FAILURE,
  FETCH_TAGS,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
  GET_POI_REVIEWS,
  GET_POI_REVIEWS_SUCCESS,
  GET_POI_REVIEWS_FAILURE,
  ADD_REVIEW,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAILURE,
  DOWNLOAD_DATA,
  DOWNLOAD_DATA_SUCCESS,
  DOWNLOAD_DATA_FAILURE,
} from './constants';
import Api from './api';
import { getPoiReviewsAction } from './actions';

function* getAmenityDetail(action) {
  try {
    const response = yield call(Api.getAmenityDetail, action.payload);
    if (response.status !== 200) {
      yield put({
        type: GET_AMENITY_DETAIL_FAILURE,
        errorMessage: response.message,
      });
    } else {
      yield put({
        type: GET_AMENITY_DETAIL_SUCCESS,
        payload: response,
      });
    }
  } catch (error) {
    yield put({ type: GET_AMENITY_DETAIL_FAILURE, errorMessage: error });
  }
}

function* fetchTags() {
  try {
    const response = yield call(Api.fetchTags);
    if (response.status !== 200) {
      yield put({
        type: FETCH_TAGS_FAILURE,
        errorMessage: response.message,
      });
    } else {
      yield put({
        type: FETCH_TAGS_SUCCESS,
        payload: response,
      });
    }
  } catch (error) {
    yield put({ type: FETCH_TAGS_FAILURE, errorMessage: error });
  }
}

function* getPoiReviews(action) {
  try {
    const response = yield call(Api.getPoiReviews, action.payload);
    if (false) {
      yield put({
        type: GET_POI_REVIEWS_FAILURE,
        errorMessage: response.message,
      });
    } else {
      yield put({
        type: GET_POI_REVIEWS_SUCCESS,
        payload: response,
      });
    }
  } catch (error) {
    yield put({ type: GET_POI_REVIEWS_FAILURE, errorMessage: error });
  }
}

function* addReview(action) {
  try {
    const response = yield call(Api.addReview, action.payload);
    if (false) {
      yield put({
        type: ADD_REVIEW_FAILURE,
        errorMessage: response.message,
      });
    } else {
      yield put({
        type: ADD_REVIEW_SUCCESS,
        payload: response,
      });
      yield put(getPoiReviewsAction(action.payload.reviewObject.service_id));
    }
  } catch (error) {
    yield put({ type: ADD_REVIEW_FAILURE, errorMessage: error });
  }
}

function* downloadData(action) {
  try {
    const response = yield call(Api.downloadData, action.payload);
    if (false) {
      yield put({
        type: DOWNLOAD_DATA_FAILURE,
        errorMessage: response.message,
      });
    } else {
      yield put({
        type: DOWNLOAD_DATA_SUCCESS,
        payload: response,
      });
      window.location.assign(`http://178.128.59.143:8080/${response.csvlink}`);
    }
  } catch (error) {
    yield put({ type: DOWNLOAD_DATA_FAILURE, errorMessage: error });
  }
}

export default function* amenityContainerSaga() {
  yield takeLatest(GET_AMENITY_DETAIL, getAmenityDetail);
  yield takeLatest(FETCH_TAGS, fetchTags);
  yield takeLatest(GET_POI_REVIEWS, getPoiReviews);
  yield takeLatest(ADD_REVIEW, addReview);
  yield takeLatest(DOWNLOAD_DATA, downloadData);
}
