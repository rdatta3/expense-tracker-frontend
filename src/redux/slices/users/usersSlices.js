import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

//login action
export const loginUserAction = createAsyncThunk(
'user/login',
async(payload,{rejectWithValue,getState ,dispatch})=>{
    const config ={
        headers:{
            "Content_type":"application/json",
        },
    };
    try{
//make http call
        const {data} =await axios.post(
        `${baseURL}/users/login`,
        payload,
        config
        );
        //save user into local storage
        localStorage.setItem("userInfo",JSON.stringify(data));    

        return data;
    }catch(error){
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
}
);

//register action

export const registerUserAction = createAsyncThunk(
'user/register',
async(payload,{rejectWithValue,getState ,dispatch})=>{
    const config ={
        headers:{
            "Content_type":"application/json",
        },
    };
    try{
//make http call
        const {data} =await axios.post(
        `${baseURL}/users/register`,
        payload,
        config
        );
        return data;
    }catch(error){
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
}
);
//Logout action
export const logoutAction = createAsyncThunk(
  "/user/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      localStorage.removeItem("userInfo");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);



//profile action

export const userProfileAction = createAsyncThunk(
'user/profile',
async(payload,{rejectWithValue,getState ,dispatch})=>{
 //get user token from store
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    try{
//make http call
        const {data} =await axios.get(
        `${baseURL}/users/profile`,
        config
        );
        return data;
    }catch(error){
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
}
);

//profile update action

export const updateProfileAction = createAsyncThunk(
'user/update',
async(payload,{rejectWithValue,getState ,dispatch})=>{
 //get user token from store
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    try{
//make http call
        const {data} =await axios.put(
        `${baseURL}/users/update`,
        {firstname:payload?.firstname,
        lastname:payload?.lastname,
        email:payload?.email,
        },
        config
        );
        return data;
    }catch(error){
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
}
);


//slices

//get user from local storage and place it inside our store
const userLoginFromStorage = localStorage.getItem('userInfo') ? 
JSON.parse(localStorage.getItem('userInfo')):undefined;
const userSlices = 
createSlice({
    name:"users",
    initialState:{
        userAuth:userLoginFromStorage,
    },
    extraReducers:(builder)=>{
        //login
    //handle pending 
        builder.addCase(loginUserAction.pending,(state,action)=>{
            state.userLoading=true;
            state.userAppErr=undefined;
            state.userServerErr=undefined;
        });
        //handle success
        builder.addCase(loginUserAction.fulfilled,(state,action)=>{
            state.userAuth=action?.payload;
            state.userLoading=false;
             state.userAppErr=undefined;
            state.userServerErr=undefined;
        });
        //handle rejected
        builder.addCase(loginUserAction.rejected,(state,action)=>{
            state.userLoading=false;
             state.userAppErr=action?.payload?.msg;
            state.userServerErr=action?.error?.msg;
        });

        //register
        //handle pending 
        builder.addCase(registerUserAction.pending,(state,action)=>{
            state.userLoading=true;
            state.userAppErr=undefined;
            state.userServerErr=undefined;
        });
        //handle success
        builder.addCase(registerUserAction.fulfilled,(state,action)=>{
            state.isRegistered=true;
            state.userLoading=false;
             state.userAppErr=undefined;
            state.userServerErr=undefined;
        });
        //handle rejected
        builder.addCase(registerUserAction.rejected,(state,action)=>{
            state.userLoading=false;
             state.userAppErr=action?.payload?.msg;
            state.userServerErr=action?.error?.msg;
        });
        //logout
    builder.addCase(logoutAction.pending, (state, action) => {
      state.userLoading = false;
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.userAuth = undefined;
      state.userLoading = false;
      state.userAppErr = undefined;
      state.userServerErr = undefined;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.userAppErr = action?.payload?.message;
      state.userServerErr = action?.error?.message;
      state.userLoading = false;
    });
    //profile
        //handle pending 
        builder.addCase(userProfileAction.pending,(state,action)=>{
            state.Loading=true;
            state.AppErr=undefined;
            state.ServerErr=undefined;
        });
        //handle success
        builder.addCase(userProfileAction.fulfilled,(state,action)=>{
            state.profile=action?.payload;
            state.Loading=false;
             state.AppErr=undefined;
            state.ServerErr=undefined;
        });
        //handle rejected
        builder.addCase(userProfileAction.rejected,(state,action)=>{
            state.Loading=false;
             state.AppErr=action?.payload?.msg;
            state.ServerErr=action?.error?.msg;
        });
        //update 
        //handle pending 
        builder.addCase(updateProfileAction.pending,(state,action)=>{
            state.Loading=true;
            state.AppErr=undefined;
            state.ServerErr=undefined;
        });
        //handle success
        builder.addCase(updateProfileAction.fulfilled,(state,action)=>{
            state.userUpdate=action?.payload;
            state.isEdited=true;
            state.Loading=false;
             state.AppErr=undefined;
            state.ServerErr=undefined;
        });
        //handle rejected
        builder.addCase(updateProfileAction.rejected,(state,action)=>{
            state.Loading=false;
             state.AppErr=action?.payload?.msg;
            state.ServerErr=action?.error?.msg;
        });
    },
});



export default userSlices.reducer;
