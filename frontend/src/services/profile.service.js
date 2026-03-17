import apiService from './api.service';

class ProfileService {
    async getProfile() {
        return await apiService.get('/users/profile');
    }

    async updateProfile(profileData) {
        return await apiService.put('/users/profile', profileData);
    }

    async uploadAvatar(data) {
        return await apiService.post('/users/avatar', data);
    }
}

export default new ProfileService();