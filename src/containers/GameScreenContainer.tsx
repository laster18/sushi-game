import React, { FC, useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
/* action, reducer */
import { RootStateType } from '../reducers/index';
import {
  upStart,
  upStop,
  downStart,
  downStop,
  leftStart,
  leftStop,
  rightStart,
  rightStop,
} from '../actions/keyboard';
import { prepareBullet } from '../actions/playerBullet';
import { PlayerState } from '../reducers/player';
import { Bullet } from '../reducers/playerBullet';
import { Enemy } from '../reducers/enemy';
/* component */
import GameScreen from '../components/GameScreen';

interface StateProps {
  killCount: number;
  level: number;
  player: PlayerState;
  playerBullets: Bullet[];
  enemies: Enemy[];
}

interface DispatchProps {
  upStart: () => void;
  upStop: () => void;
  downStart: () => void;
  downStop: () => void;
  leftStart: () => void;
  leftStop: () => void;
  rightStart: () => void;
  rightStop: () => void;
  prepareBullet: () => void;
}

type EnhancedGameScreenProps = StateProps & DispatchProps;

const mapStateToProps = (state: RootStateType): StateProps => ({
  killCount: state.app.killCount,
  level: state.app.level,
  player: state.player,
  playerBullets: state.playerBullet.bullets,
  enemies: state.enemy.enemies,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      upStart: () => upStart(),
      upStop: () => upStop(),
      downStart: () => downStart(),
      downStop: () => downStop(),
      leftStart: () => leftStart(),
      leftStop: () => leftStop(),
      rightStart: () => rightStart(),
      rightStop: () => rightStop(),
      prepareBullet: () => prepareBullet(),
    },
    dispatch,
  );

/* eslint no-shadow: 0 */
const GameScreenContainer: FC<EnhancedGameScreenProps> = ({
  killCount,
  level,
  player,
  playerBullets,
  enemies,
  upStart,
  upStop,
  downStart,
  downStop,
  leftStart,
  leftStop,
  rightStart,
  rightStop,
  prepareBullet,
}) => {
  useEffect(() => {
    window.addEventListener('keydown', e => {
      switch (e.code) {
        case 'ArrowLeft':
          leftStart();
          break;
        case 'ArrowRight':
          rightStart();
          break;
        case 'ArrowUp':
          upStart();
          break;
        case 'ArrowDown':
          downStart();
          break;
        case 'KeyZ':
          prepareBullet();
          break;
        default:
          break;
      }
    });

    window.addEventListener('keyup', e => {
      switch (e.code) {
        case 'ArrowLeft':
          leftStop();
          break;
        case 'ArrowRight':
          rightStop();
          break;
        case 'ArrowUp':
          upStop();
          break;
        case 'ArrowDown':
          downStop();
          break;
        case 'KeyZ':
          break;
        default:
          break;
      }
    });
  }, []);

  return (
    <GameScreen {...{ killCount, level, player, playerBullets, enemies }} />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameScreenContainer);
