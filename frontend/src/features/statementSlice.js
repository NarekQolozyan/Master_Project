import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchStatements = createAsyncThunk(
  'statements/fetchStatements',
  async () => {
    const response = await fetch('http://localhost:3005/all_statement');
    const data = await response.json();
    return data;
  }
);

export const fetchStatementById = createAsyncThunk(
  'statements/fetchStatementById',
  async (id) => {
    const response = await fetch(`http://localhost:3005/statement/${id}`);
    const data = await response.json();
    return data;
  }
);

export const createStatements = createAsyncThunk(
  'statements/createStatement',
  async (statementData) => {
    try {
      const response = await fetch('http://localhost:3005/create_statement', {
        method: 'POST',
        body: JSON.stringify(statementData),
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
      throw new Error('There was an error creating: ' + error.message);
    }
  }
);

const statementsSlice = createSlice({
  name: 'statements',
  initialState: {
    statements: [],
    createStatements: [],
    statementsById: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatements.fulfilled, (state, action) => {
        state.loading = false;
        state.statements = action.payload; // Update the statements array in the state
      })
      .addCase(fetchStatements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchStatementById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatementById.fulfilled, (state, action) => {
        state.loading = false;
        state.statementsById = action.payload; 
      })
      .addCase(fetchStatementById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createStatements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStatements.fulfilled, (state, action) => {
        state.loading = false;
        state.createStatements.push(action.payload); // Add the created statement to the statements array in the state
      })
      .addCase(createStatements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const {} = statementsSlice.actions;
export const selectAllStatements = (state) => state.statements.statements;

export default statementsSlice.reducer;
