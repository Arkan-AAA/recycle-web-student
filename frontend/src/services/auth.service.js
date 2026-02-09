import apiService from './api.service';

class AuthService {
    async register(userData) {
        const response = await apiService.post('/auth/register', userData);
        if (response.success && response.data.token) {
            this.setToken(response.data.token);
            this.setUser(response.data.user);
        }
        return response;
    }

    async login(credentials) {
        const response = await apiService.post('/auth/login', credentials);
        if (response.success && response.data.token) {
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
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    isAuthenticated() {
        return !!this.getToken();
    }
}

export default new AuthService();
