import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const registerCompany = createAsyncThunk(
  "company/register",
  async ({ name, email, password, image }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", image);

      const response = await fetch("http://localhost:3005/register_company", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
    } catch (error) {
      throw new Error("There was an error registering: " + error.message);
    }
  }
);

export const companyLogin = createAsyncThunk(
    'company/login',
    async ({ name, email, password }) => {
      try {
        const response = await fetch('http://localhost:3005/login_company', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        localStorage.setItem('companyId', data.company.id)
        localStorage.setItem('jwt', data.jwt);
        
        return data;
      } catch (error) {
        throw new Error('There was an error logging in: ' + error.message);
      }
    }
  );

  export const companyLogOut = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('companyId')
        return {type: 'user/logout'}
  }

const initialState = {
  company: null,
  loading: false,
  error: null,
  registerCompany: null
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.registerCompany = action.payload;
      })
      .addCase(registerCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(companyLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(companyLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload.company;
      })
      .addCase(companyLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default companySlice.reducer;
