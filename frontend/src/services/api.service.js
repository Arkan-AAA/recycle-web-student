const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const REQUEST_TIMEOUT = 10000;

class ApiService {
    async request(endpoint, options = {}) {
        const token = localStorage.getItem('token');
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers
            },
            signal: controller.signal,
            ...options
        };

        try {
            const response = await fetch(`${API_URL}${endpoint}`, config);
            clearTimeout(timeoutId);
            
            const data = await response.json();

            if (!response.ok) {
                return { success: false, error: data.error || 'Ошибка запроса' };
            }

            return data;
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                return { success: false, error: 'Превышено время ожидания ответа' };
            }
            
            console.error('API Error:', error.message);
            return { success: false, error: 'Не удалось подключиться к серверу' };
        }
    }

    get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    post(endpoint, body) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body)
        });
    }

    put(endpoint, body) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body)
        });
    }

    delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}

export default new ApiService();
