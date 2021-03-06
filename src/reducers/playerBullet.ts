import { Reducer } from 'redux';
import * as ActionType from '../actions/playerBulletConstants';
import { PlayerBulletAction } from '../actions/playerBullet';

export interface Bullet {
  id: number;
  x: number;
  y: number;
}

export interface PlayerBulletState {
  bullets: Bullet[];
}

const initialState: PlayerBulletState = {
  bullets: [],
};

const playerBulletReducer: Reducer<PlayerBulletState, PlayerBulletAction> = (
  state: PlayerBulletState = initialState,
  action: PlayerBulletAction,
) => {
  switch (action.type) {
    case ActionType.PREPARE_BULLET:
      return state;
    case ActionType.GENERATE:
      return {
        ...state,
        bullets: [...state.bullets, action.payload.params],
      };
    case ActionType.UPDATE: {
      /* idが同じbulletを置き換えている。もっといい書き方があるはず。 */
      const newBullet = action.payload.params;
      const newBullets = state.bullets.map(bullet => {
        if (bullet.id === newBullet.id) return newBullet;

        return bullet;
      });

      return {
        ...state,
        bullets: newBullets,
      };
    }
    case ActionType.UPDATE_BULLETS:
      return {
        ...state,
        bullets: action.payload.params.bullets,
      };
    case ActionType.DELETE_BULLETS: {
      const deleteBulletIds = action.payload.params.ids;

      return {
        ...state,
        bullets: state.bullets.filter(
          bullet => !deleteBulletIds.includes(bullet.id),
        ),
      };
    }
    default: {
      /* eslint @typescript-eslint/no-unused-vars: 0 */
      const _: never = action;

      return state;
    }
  }
};

export default playerBulletReducer;
