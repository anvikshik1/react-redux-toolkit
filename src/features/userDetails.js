import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// create action
export const userData = createAsyncThunk("createuser", async (data, {rejectWithValue}) =>{
    const response = fetch('https://635e201103d2d4d47ae8296c.mockapi.io/users/crud',{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify(data)
    })
    try {
        const result = await response.json();
        return result;
    } catch (error) {
       return rejectWithValue(error)
    }
})

// show action
export const showData = createAsyncThunk("showdata",async (args,{rejectWithValue})=>{
    const response = await fetch("https://635e201103d2d4d47ae8296c.mockapi.io/users/crud");
    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error)
    }
})

// Delete action
export const deleteUser = createAsyncThunk("deleteUser",async (id,{rejectWithValue})=>{
    const response = await fetch(`https://635e201103d2d4d47ae8296c.mockapi.io/users/crud/${id}`,
        {method:"DELETE"}
    );
    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error)
    }
})

// update action
export const updateUser = createAsyncThunk("updateUser",async (data,{rejectWithValue})=>{
    const response = await fetch(`https://635e201103d2d4d47ae8296c.mockapi.io/users/crud/${data.id}`,{
        method:"PUT",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify(data)
    });
    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error)
    }
})

const userDetails = createSlice({
    name:"userDetail",
    initialState:{
        user:[],
        error:null,
        loading:false,
        searchData: [],
    },

    reducers: {
        searchUser: (state, action) => {
          state.searchData = action.payload;
        },
    },

    extraReducers: builder => {
        builder.addCase(userData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(userData.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        builder.addCase(userData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(showData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(showData.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        builder.addCase(showData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            const {id} = action.payload;
            if(id){
                state.user = state.user.filter((ele) => ele !== id);
            }
        })
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(updateUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = state.user.map((ele) => ele.id === action.payload.id ? action.payload : ele);
        })
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});


export default userDetails.reducer;
export const { searchUser } = userDetails.actions;