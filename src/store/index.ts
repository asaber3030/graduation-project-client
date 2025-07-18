import { configureStore } from "@reduxjs/toolkit"

import appReducer from "./slices/app.slice"
import adminSidebarReducer from "./slices/adminSidebar.slice"
import { useDispatch, useSelector, useStore } from "react-redux"

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: appReducer,
      adminSidebar: adminSidebarReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()
