import { configureStore } from '@reduxjs/toolkit'
import HeaderReducer from '../components/Header/HeaderSlice'
import HomepageReducer from '../components/HomePage/HomePageSlice'

export const store = configureStore({
  reducer: {
    headerFunctions : HeaderReducer,
    homePageStates : HomepageReducer,
  },
})