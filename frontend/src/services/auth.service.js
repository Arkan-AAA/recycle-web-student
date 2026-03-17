import apiService from './api.service';

class AuthService {
    async register(userData) {
        const response = await apiService.post('/auth/register', userData);
        if (response.success && response.data?.token) {
            this.setToken(response.data.token);
            this.setUser(response.data.user);
        }
        return response;
    }

    async login(credentials) {
        const response = await apiService.post('/auth/login', credentials);
        if (response.success && response.data?.token) {
            this.setToken(response.data.token);
            this.setUser(response.data.user);
        }
        return response;
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    async getProfile() {
        return await apiService.get('/auth/me');
    }

    setToken(token) {
        if (token && typeof token === 'string') {
            localStorage.setItem('token', token);
        }
    }

    getToken() {
        return localStorage.getItem('token');
    }

    setUser(user) {
        if (user && typeof user === 'object') {
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch (error) {
                console.error('Failed to save user:', error.message);
            }
        }
    }

    getUser() {
        try {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Failed to parse user:', error.message);
            return null;
        }
    }

    isAuthenticated() {
        const token = this.getToken();
        if (!token) return false;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 > Date.now();
        } catch {
            return false;
        }
    }

    getUserRole() {
        const user = this.getUser();
        return user?.role || null;
    }

    isAdmin() {
        return this.getUserRole() === 'admin';
    }

    isTeacher() {
        return this.getUserRole() === 'teacher';
    }

    isStudent() {
        return this.getUserRole() === 'student';
    }
}

export default new AuthService();
