<template>
  <div class="admin-page">
    <div class="container">
      <div class="page-hero">
        <h1>{{ $t('admin.title') }}</h1>
      </div>

      <!-- Секция новостей -->
      <div class="admin-section">
        <div class="section-head">
          <h2 class="section-title">
            <i class="fab fa-instagram"></i>
            {{ $t('admin.news.title') }}
          </h2>
          <button class="btn btn-primary" @click="showAddModal = true">
            <i class="fas fa-plus"></i> {{ $t('admin.news.add') }}
          </button>
        </div>

        <div v-if="loadingPosts" class="state-msg">
          <i class="fas fa-spinner fa-spin"></i> {{ $t('common.loading') }}
        </div>

        <div v-else-if="!posts.length" class="state-empty">
          <i class="fab fa-instagram"></i>
          <p>{{ $t('admin.news.empty') }}</p>
        </div>

        <div v-else class="posts-table-wrap">
          <table class="posts-table">
            <thead>
              <tr>
                <th>#</th>
                <th>{{ $t('admin.news.cover') }}</th>
                <th>{{ $t('admin.news.link') }}</th>
                <th>{{ $t('admin.news.added') }}</th>
                <th>{{ $t('common.actions') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(post, i) in posts" :key="post.id">
                <td class="num">{{ i + 1 }}</td>
                <td class="cover-cell">
                  <img
                    v-if="post.cover_url"
                    :src="proxyImage(post.cover_url)"
                    class="cover-thumb"
                    @error="e => e.target.style.display='none'"
                  />
                  <div v-else class="no-cover"><i class="fab fa-instagram"></i></div>
                </td>
                <td class="url-cell">
                  <a :href="post.instagram_url" target="_blank" class="post-link">
                    {{ shortUrl(post.instagram_url) }}
                    <i class="fas fa-external-link-alt"></i>
                  </a>
                </td>
                <td class="date-cell">{{ formatDate(post.created_at) }}</td>
                <td>
                  <div class="action-btns">
                    <button class="btn-refresh" @click="refreshCover(post)" :disabled="post._refreshing" :title="$t('admin.news.refresh')">
                      <i :class="post._refreshing ? 'fas fa-spinner fa-spin' : 'fas fa-sync-alt'"></i>
                    </button>
                    <button class="btn-delete" @click="confirmDelete(post)">
                      <i class="fas fa-trash"></i> {{ $t('admin.news.delete') }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Модал добавления поста -->
    <div v-if="showAddModal" class="modal-overlay" @click.self="closeAdd">
      <div class="modal">
        <div class="modal-header">
          <h3><i class="fab fa-instagram"></i> {{ $t('admin.news.add') }}</h3>
          <button class="close-btn" @click="closeAdd">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>{{ $t('admin.news.urlLabel') }}</label>
            <input
              v-model="addUrl"
              type="url"
              :placeholder="$t('admin.news.urlPlaceholder')"
              class="form-input"
              @keyup.enter="addPost"
            />
            <p class="form-hint">{{ $t('admin.news.urlHint') }}</p>
          </div>
          <div v-if="addError" class="form-error">{{ addError }}</div>
          <div class="modal-actions">
            <button class="btn-cancel" @click="closeAdd">{{ $t('common.cancel') }}</button>
            <button class="btn-save" @click="addPost" :disabled="adding">
              <i v-if="adding" class="fas fa-spinner fa-spin"></i>
              {{ adding ? $t('common.loading') : $t('common.save') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Модал подтверждения удаления -->
    <div v-if="deleteTarget" class="modal-overlay" @click.self="deleteTarget = null">
      <div class="modal modal-sm">
        <div class="modal-header">
          <h3><i class="fas fa-trash"></i> {{ $t('admin.news.deleteConfirmTitle') }}</h3>
          <button class="close-btn" @click="deleteTarget = null">&times;</button>
        </div>
        <div class="modal-body">
          <p class="confirm-text">{{ $t('admin.news.deleteConfirm') }}</p>
          <a :href="deleteTarget.instagram_url" target="_blank" class="confirm-link">
            {{ shortUrl(deleteTarget.instagram_url) }}
          </a>
          <div class="modal-actions">
            <button class="btn-cancel" @click="deleteTarget = null">{{ $t('common.cancel') }}</button>
            <button class="btn-danger" @click="deletePost" :disabled="deleting">
              <i v-if="deleting" class="fas fa-spinner fa-spin"></i>
              {{ deleting ? $t('common.loading') : $t('common.delete') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '../services/api.service';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export default {
  name: 'AdminPage',
  data() {
    return {
      posts: [],
      loadingPosts: true,
      showAddModal: false,
      addUrl: '',
      addError: '',
      adding: false,
      deleteTarget: null,
      deleting: false
    };
  },
  async mounted() {
    await this.loadPosts();
  },
  methods: {
    async loadPosts() {
      this.loadingPosts = true;
      try {
        const res = await apiService.get('/news');
        this.posts = res.success ? res.data : [];
      } catch {
        this.posts = [];
      } finally {
        this.loadingPosts = false;
      }
    },
    async addPost() {
      this.addError = '';
      if (!this.addUrl.trim()) { this.addError = 'Введите ссылку'; return; }
      if (!this.addUrl.includes('instagram.com')) { this.addError = 'Введите ссылку на Instagram'; return; }
      this.adding = true;
      try {
        const res = await apiService.post('/news', { instagram_url: this.addUrl.trim() });
        if (res.success) {
          this.closeAdd();
          await this.loadPosts();
        } else {
          this.addError = res.error === 'Post already exists' ? 'Этот пост уже добавлен' : (res.error || 'Ошибка');
        }
      } catch {
        this.addError = 'Ошибка подключения';
      } finally {
        this.adding = false;
      }
    },
    closeAdd() {
      this.showAddModal = false;
      this.addUrl = '';
      this.addError = '';
    },
    confirmDelete(post) {
      this.deleteTarget = post;
    },
    async deletePost() {
      this.deleting = true;
      try {
        const res = await apiService.delete(`/news/${this.deleteTarget.id}`);
        if (res.success) {
          this.deleteTarget = null;
          await this.loadPosts();
        }
      } catch {
        // ignore
      } finally {
        this.deleting = false;
      }
    },
    proxyImage(url) {
      return url || '';
    },
    async refreshCover(post) {
      post._refreshing = true;
      try {
        const res = await apiService.patch(`/news/${post.id}/refresh`);
        if (res.success) {
          post.cover_url = res.data.cover_url;
        }
      } catch { /* ignore */ } finally {
        post._refreshing = false;
      }
    },
    shortUrl(url) {
      return url.replace('https://www.instagram.com/', 'instagram.com/').replace('https://instagram.com/', 'instagram.com/');
    },
    formatDate(d) {
      if (!d) return '';
      return new Date(d).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
    }
  }
}
</script>

<style scoped>
.admin-page { padding: 2rem 0 4rem; }

.page-hero { padding: 1rem 0 2rem; }
.page-hero h1 { font-size: 2rem; font-weight: 800; color: var(--text-primary); }

.admin-section {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.section-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0;
}
.section-title i { color: var(--primary); }

.state-msg {
  padding: 3rem;
  text-align: center;
  color: var(--text-hint);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.state-empty {
  padding: 4rem;
  text-align: center;
  color: var(--text-hint);
}
.state-empty i { font-size: 2.5rem; margin-bottom: 0.75rem; display: block; }

.posts-table-wrap { overflow-x: auto; }

.posts-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.posts-table th {
  background: #1e1e1e;
  color: #fff;
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 500;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.posts-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
  vertical-align: middle;
}

.posts-table tbody tr:hover { background: var(--bg-input); }

.num { color: var(--text-hint); font-size: 0.75rem; width: 40px; }

.cover-thumb {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  display: block;
}
.no-cover {
  width: 60px; height: 60px;
  background: var(--bg-input);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  color: var(--text-hint);
  font-size: 1.5rem;
}

.post-link {
  color: var(--primary);
  text-decoration: none;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.post-link:hover { text-decoration: underline; }
.post-link i { font-size: 0.7rem; }

.date-cell { color: var(--text-secondary); font-size: 0.8rem; white-space: nowrap; }

.action-btns { display: flex; align-items: center; gap: 0.5rem; }

.btn-refresh {
  width: 34px; height: 34px;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s;
  flex-shrink: 0;
}
.btn-refresh:hover { border-color: var(--primary); color: var(--primary); }
.btn-refresh:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-delete {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(213,0,50,0.08);
  color: var(--primary);
  border: 1px solid rgba(213,0,50,0.2);
  border-radius: 6px;
  padding: 0.4rem 0.875rem;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  font-family: inherit;
  transition: all 0.2s;
  white-space: nowrap;
}
.btn-delete:hover { background: var(--primary); color: white; }

/* Модалы */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 2000; padding: 1rem;
}
.modal {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  width: 100%; max-width: 480px;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
}
.modal-sm { max-width: 380px; }

.modal-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
}
.modal-header h3 {
  font-size: 1rem; font-weight: 700;
  color: var(--text-primary); margin: 0;
  display: flex; align-items: center; gap: 0.5rem;
}
.modal-header h3 i { color: var(--primary); }
.close-btn { background: none; border: none; font-size: 1.4rem; cursor: pointer; color: var(--text-hint); line-height: 1; }
.close-btn:hover { color: var(--text-primary); }

.modal-body { padding: 1.5rem; }

.form-group { margin-bottom: 1rem; }
.form-group label { display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.5px; }
.form-input {
  width: 100%; padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 0.9rem; font-family: inherit;
  transition: border-color 0.2s;
  box-sizing: border-box;
}
.form-input:focus { outline: none; border-color: var(--primary); }
.form-hint { font-size: 0.75rem; color: var(--text-hint); margin-top: 0.4rem; }

.form-error {
  background: rgba(213,0,50,0.08);
  color: var(--primary);
  border-radius: 6px;
  padding: 0.6rem 0.875rem;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.confirm-text { color: var(--text-secondary); margin-bottom: 0.5rem; font-size: 0.9rem; }
.confirm-link { font-size: 0.8rem; color: var(--primary); word-break: break-all; display: block; margin-bottom: 1.5rem; }

.modal-actions { display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1.5rem; }

.btn-cancel {
  padding: 0.6rem 1.25rem;
  border: 1px solid var(--border-color);
  background: var(--bg-input);
  border-radius: 6px; cursor: pointer;
  font-size: 0.875rem; color: var(--text-secondary);
  font-family: inherit; transition: background 0.2s;
}
.btn-cancel:hover { background: var(--border-color); }

.btn-save {
  padding: 0.6rem 1.25rem;
  background: var(--primary); color: white;
  border: none; border-radius: 6px; cursor: pointer;
  font-size: 0.875rem; font-weight: 600;
  font-family: inherit; transition: background 0.2s;
  display: flex; align-items: center; gap: 0.4rem;
}
.btn-save:hover { background: var(--primary-dark); }
.btn-save:disabled { opacity: 0.6; cursor: not-allowed; }

.btn-danger {
  padding: 0.6rem 1.25rem;
  background: var(--primary); color: white;
  border: none; border-radius: 6px; cursor: pointer;
  font-size: 0.875rem; font-weight: 600;
  font-family: inherit; transition: background 0.2s;
  display: flex; align-items: center; gap: 0.4rem;
}
.btn-danger:hover { background: var(--primary-dark); }
.btn-danger:disabled { opacity: 0.6; cursor: not-allowed; }

@media (max-width: 768px) {
  .section-head { flex-direction: column; align-items: flex-start; gap: 1rem; }
  .url-cell { max-width: 160px; overflow: hidden; text-overflow: ellipsis; }
}
</style>
