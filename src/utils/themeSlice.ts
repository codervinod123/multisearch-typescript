import { createSlice } from "@reduxjs/toolkit";

const themeSlice=createSlice({
     name:"themeSlice",
     initialState:{
         isThemeOn:false,
     },
     reducers:{
         toggleTheme:(state)=>{
           state.isThemeOn=!state.isThemeOn;
         }
     }

})

export const  {toggleTheme} =themeSlice.actions;
export default themeSlice.reducer;