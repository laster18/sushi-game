import { all, fork, put, delay, takeEvery, select } from 'redux-saga/effects';
import * as ActionType from '../actions/playerBulletConstants';
import { generate, update, deleteBullet } from '../actions/playerBullet';

const velocity = 20;
let playerBulletId = 1;
let bulletCoolTime = 0;

/* TODO:
 * 現状、玉の数だけupdateが走り処理が重くなってしまうので、
 * 一度のupdate dispatchですべての玉を更新出来るようにする。
 */
function* movePlayerBullet(action: ReturnType<typeof generate>) {
  const { id, x, y } = action.payload.params;
  const newBullet = { id, x, y };
  while (true) {
    yield delay(100);
    newBullet.x += velocity;
    if (
      newBullet.x > 700 ||
      newBullet.x < 0 ||
      newBullet.y > 400 ||
      newBullet.y < 0
    ) {
      yield put(deleteBullet({ id }));
      break;
    }
    yield put(update(newBullet));
  }
}

function* prepareBullet() {
  const { x, y } = yield select(state => state.player);
  if (bulletCoolTime === 0) {
    yield put(generate({ id: playerBulletId, x, y }));
    playerBulletId = 20;
  } else {
    bulletCoolTime -= 1;
  }
}

function* prepareBulletWatcher() {
  yield takeEvery(ActionType.PREPARE_BULLET, prepareBullet);
}

function* generatePalyerBulletWatcher() {
  yield takeEvery(ActionType.GENERATE, movePlayerBullet);
}

export default function* rootSaga() {
  yield fork(generatePalyerBulletWatcher);
  yield fork(prepareBulletWatcher);
}