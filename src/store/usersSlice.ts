import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../types/user';

interface UsersState {
  users: User[];
  filteredUsers: User[];
  loading: boolean;
  error: string | null;
  filters: {
    name: string;
    username: string;
    email: string;
    phone: string;
  };
}

const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: null,
  filters: {
    name: '',
    username: '',
    email: '',
    phone: '',
  },
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<{ field: keyof UsersState['filters']; value: string }>) {
      state.filters[action.payload.field] = action.payload.value;

      state.filteredUsers = state.users.filter((user) => {
        return (
          user.name.toLowerCase().includes(state.filters.name.trim().toLowerCase()) &&
          user.username.toLowerCase().includes(state.filters.username.trim().toLowerCase()) &&
          user.email.toLowerCase().includes(state.filters.email.trim().toLowerCase()) &&
          user.phone.toLowerCase().includes(state.filters.phone.trim().toLowerCase())
        );
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { setFilter } = usersSlice.actions;
export default usersSlice.reducer;
