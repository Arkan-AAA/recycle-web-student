const API_URL = import.meta.env.VITE_API_URL || '/api';
const REQUEST_TIMEOUT = 5000;

class ApiService {
    async request(endpoint, options = {}) {
        if (typeof endpoint !== 'string' || !endpoint.startsWith('/') || /^https?:\/\//i.test(endpoint)) {
            return { success: false, error: 'Недопустимый endpoint' };
        }

        const token = localStorage.getItem('token');
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
        
        const { method, body } = options;
        const config = {
            method,
            body,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` })
            },
            signal: controller.signal
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
