import { configureStore } from '@reduxjs/toolkit';
import statementsReducer from '../features/statementSlice';
import userReducer from '../features/userSlice';
import companyReducer from '../features/companySlice'

export const store = configureStore({
  reducer: {
    statements: statementsReducer,
    user: userReducer,
    company: companyReducer
  },
});
