import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../store";

export const selectAuthState = createSelector(
  [(state: RootState) => state],
  state => state.auth
)
