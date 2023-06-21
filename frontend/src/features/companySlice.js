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

  export const updateCompany = createAsyncThunk(
    "company/update",
    async ({ companyId, name, email, password }) => {
      try {
        const response = await fetch(`http://localhost:3005/update_company/${companyId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error("There was an error updating: " + error.message);
      }
    }
  );

  export const deleteCompany = createAsyncThunk(
    "company/delete",
    async (companyId) => {
      try {
        const response = await fetch(`http://localhost:3005/delete_company/${companyId}`, {
          method: "DELETE",
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error("There was an error deleting: " + error.message);
      }
    }
  );
  
  
const initialState = {
  company: null,
  updateCompany: null,
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
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload.company;
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.company = null
        state.updateCompany = null
        state.registerCompany = null
        state.error = null
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default companySlice.reducer;
