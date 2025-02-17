import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mocksAdmins } from '../mocks/mocksAdmins';
import { mocksRoles } from '../mocks/mocksRoles';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        const user = mocksAdmins.find(
            (u) => u.email === email && u.password === password
        );
        if (user) {
            const role = mocksRoles.find((r) => r.id === user.roleId);
            return { email: user.email, role: role || null, name: user.name };
        } else {
            return rejectWithValue('Неправильный email или пароль');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        isAuthenticated: false,
        status: 'idle',
        error: null, 
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.status = 'idle';
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
                state.user = action.payload;
                state.token = action.payload.token || null;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
