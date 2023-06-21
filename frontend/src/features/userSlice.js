import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
  'user/login',
  async ({ firstName, lastName, password }) => {
    try {
      const response = await fetch('http://localhost:3005/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      localStorage.setItem('userId', data.user.id)
      localStorage.setItem('jwt', data.jwt);
      
      return data;
    } catch (error) {
      throw new Error('There was an error logging in: ' + error.message);
    }
  }
);

export const register = createAsyncThunk(
    'user/register',
    async ({ firstName, lastName, password }) => {
      try {
        const response = await fetch('http://localhost:3005/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ firstName, lastName, password }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        throw new Error('There was an error registered in: ' + error.message);
      }
    }
  );

  export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({ firstName, lastName, password }) => {
      const id = localStorage.getItem('userId')
      try {
        const response = await fetch(`http://localhost:3005/updateUser/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ firstName, lastName, password }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('There was an error updating user: ' + error.message);
      }
    }
  );

  export const logOut = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('userId')
        return {type: 'user/logout'}
  }

  export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async () => {
      const id = localStorage.getItem('userId');
      try {
        const response = await fetch(`http://localhost:3005/deleteUser/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('There was an error deleting the user: ' + error.message);
      }
    }
  );

const initialState = {
  user: null,
  updateUser: null,
  registerUser: null,
  deleteUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.registerUser = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.updateUser = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.updateUser = null;
        state.registerUser = null;
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logOut, (state) => {
        state.user = null;
        state.updateUser = null;
        state.registerUser = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export default userSlice.reducer;
