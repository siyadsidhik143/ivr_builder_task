import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  saveCliked : false,
  newBuild:true
}

export const HeaderSlice = createSlice({
  name: 'active_header',
  initialState,
  reducers: {
    saveDraftBtnClick: (state, action) => {
      state.saveCliked = action.payload
    },
    NewBuildBtn: (state, action) => {
      state.newBuild = action.payload
    },
  },
})

export const { saveDraftBtnClick, NewBuildBtn } = HeaderSlice.actions
export default HeaderSlice.reducer