// src/actions/game.js
import * as request from "superagent";
import { CREATE_GAME, MOVE, SEND_TO_DB_SUCCESS } from './types'
import { fillBoard } from '../lib/game'

const baseUrl = "http://localhost:4002";

export const createGame = (rows = 6) => dispatch => {
  const [board, locked] = fillBoard(rows)
  request
    .post(`${baseUrl}/games`)
    .send({ board, locked })
    .then(result => {
      dispatch({
        type: SEND_TO_DB_SUCCESS,
        payload: result.body
      });
    })
   .then( result => {
     dispatch({
       type: CREATE_GAME,
       payload: {
         board,
         locked
       }
     })
   })
}


export const move = (row, col) => ({
  type: MOVE,
  payload: {
    row,
    col
  }
})

export const sendBoard = (board, locked, userId) => dispatch => {
   request
    .post(`${baseUrl}/games`)
    .send({ board, locked, userId })
    .then(result => {
      dispatch({
        type: SEND_TO_DB_SUCCESS,
        payload: result.body
      });
    })
};
