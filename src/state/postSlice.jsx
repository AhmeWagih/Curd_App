import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
const initialState = { records: [], loading: false, error: null, record: null };
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch("http://localhost:3005/posts");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await fetch(`http://localhost:3005/posts/${id}`, {
          method: "DELETE",
        });
        return id;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    } else {
      fetchPosts();
    }
  }
);
export const insertPost = createAsyncThunk(
  "posts/insertPost",
  async (item, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState();
    item.userId = auth.id;
    item.userName = auth.name;
    try {
      const res = await fetch("http://localhost:3005/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(item),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getPost = createAsyncThunk(
  "posts/getPost",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:3005/posts/${id}`);
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const editPost = createAsyncThunk(
  "posts/editPost",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:3005/posts/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(item),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    cleanRecord: (state) => {
      state.record = null;
    },
  },
  extraReducers: (builder) => {
    // fetch all posts
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.records = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    // get post
    builder.addCase(getPost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.record = action.payload;
      state.loading = false;
    });
    builder.addCase(getPost.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    // delete post
    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.records = state.records.filter((el) => el.id !== action.payload);
      state.loading = false;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    // create post
    builder.addCase(insertPost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(insertPost.fulfilled, (state, action) => {
      state.loading = false;
      state.records.push(action.payload);
      //state.records= [action.payload, ...state.records];
    });
    builder.addCase(insertPost.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    // edit post
    builder.addCase(editPost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      state.loading = false;
      state.record = action.payload;
    });
    builder.addCase(editPost.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { cleanRecord } = postSlice.actions;
export default postSlice.reducer;
