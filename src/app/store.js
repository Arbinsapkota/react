import { configureStore } from "@reduxjs/toolkit";



export const store = configureStore({
  reducer:{

  },
  middleware: (getDefaultMiddleWare)=> getDefaultMiddleWare().concat([

  ])
})