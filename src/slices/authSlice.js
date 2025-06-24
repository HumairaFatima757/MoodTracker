import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../database/supabaseClient";


export const loginUser = createAsyncThunk( "loginUser",async({email,password},{ rejectWithValue})=>{
const {data,error} = await supabase.auth.signInWithPassword({email,password})
if(error) return rejectWithValue(error.message)
  return data.user;

});

export const signupUser = createAsyncThunk( "signupUser",async({email,password,name,phone},{ rejectWithValue})=>{
const {data,error} = await supabase.auth.signUp({email,password})
if(error) return rejectWithValue(error.message)
  
  const {user}= data;
  await supabase.from("profiles").insert([{ id: user.id, email, name, phone }]);
  return user;

})

export const signUpWithGoogle = createAsyncThunk("signUpWithGoogle" , async(_,{rejectWithValue})=>{

try {
  const { data, error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) return rejectWithValue(error.message);
    return data;
  
} catch (error) {
  return rejectWithvalue(error.message)
}


})



export const logoutUser = createAsyncThunk("logoutUser", async () => {
  await supabase.auth.signOut();
});


 export const sendMagicLink = createAsyncThunk(
  "sendMagicLink",
  async (email, {rejectWithValue}) => {
     const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      return rejectWithValue(error.message);
    }
    return "Magic link sent";
  }
);   
  


const authSlice = createSlice({
name:  "auth",
initialState:{
  user: null,
  loading: false,
  error: null,
}
,
reducers:{
   logout: (state)=>{
    supabase.auth.signOut();
    state.user= null
   },

 extraReducers: (builder) => {
  builder
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

.addCase(signUpWithGoogle.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(signUpWithGoogle.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload?.user || null;
    })
    .addCase(signUpWithGoogle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(sendMagicLink.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(sendMagicLink.fulfilled, (state, action) => {
  state.loading = false;
  // You can optionally add a success message
})
.addCase(sendMagicLink.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

}}
})

export const {logout}= authSlice.actions;
export default authSlice.reducer;