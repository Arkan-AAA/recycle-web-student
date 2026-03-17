class KnowledgeBaseService {
    constructor() {
        this.knowledge = '';
        this.isLoaded = false;
        this.urls = [
            '/knowledge-base/01-about.md',
            '/knowledge-base/02-specialties.md',
            '/knowledge-base/03-admission.md',
            '/knowledge-base/04-schedule.md',
            '/knowledge-base/05-pricing.md',
            '/knowledge-base/06-academic.md',
            '/knowledge-base/07-infrastructure.md',
            '/knowledge-base/08-documents.md',
            '/knowledge-base/09-international.md',
            '/knowledge-base/10-faq-short.md'
        ];
    }

    async loadKnowledge() {
        if (this.isLoaded) return;

        try {
            const contents = await Promise.all(
                this.urls.map(url =>
                    fetch(url)
                        .then(r => {
                            if (!r.ok) throw new Error(`HTTP ${r.status}`);
                            return r.text();
                        })
                        .catch(e => {
                            console.error(`❌ Ошибка загрузки ${url}:`, e.message);
                            return '';
                        })
                )
            );

            this.knowledge = contents.filter(c => c).join('\n\n---\n\n');
            this.isLoaded = true;
            console.log('✅ База знаний загружена:', this.knowledge.length, 'символов');
        } catch (error) {
            console.error('❌ Ошибка загрузки базы знаний:', error);
            this.knowledge = '';
        }
    }

    async getKnowledge() {
        if (!this.isLoaded) {
            await this.loadKnowledge();
        }
        return this.knowledge;
    }
}

export default new KnowledgeBaseService();
