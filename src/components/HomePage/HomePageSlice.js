import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  drafts: [],
  current_build: [],
}

export const postsSlice = createSlice({
  name: 'active_header',
  initialState,
  reducers: {
    saveDraft  : (state, action) => {
      state.drafts =  [...state.drafts, action.payload];
    },
    currentBuild  : (state, action) => {
      state.current_build =  action.payload;
    },
   
    updateDraft: (state, action) => {
      state.drafts =  action.payload;
    }
  },
})

export const { saveDraft, currentBuild, updateDraft } = postsSlice.actions
export default postsSlice.reducer