import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import api from '../utils/api';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/auth/signin`, { email, password });
            const token = response.data.result;
            const decodedToken = jwtDecode(token);
            const role = decodedToken.role;
 
            sessionStorage.setItem('token', token); 
            sessionStorage.setItem('role', role); 
            return { token, role };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Неправильный логин или пароль')
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || null,
        role: sessionStorage.getItem('role') || null,
        isAuthenticated: !!sessionStorage.getItem('token'),
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.role = null;
            state.isAuthenticated = false;
            sessionStorage.removeItem('token'); 
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
                state.role = action.payload.role;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.error("Ошибка авторизации:", action);
                state.status = 'failed';
                state.error = action.payload;
            })
    }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;