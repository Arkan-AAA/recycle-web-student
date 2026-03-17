class KnowledgeBaseService {
    constructor() {
        this.knowledge = '';
        this.isLoaded = false;
        this.files = [
            '01-about.md',
            '02-specialties.md',
            '03-admission.md',
            '04-schedule.md',
            '05-pricing.md',
            '06-academic.md',
            '07-infrastructure.md',
            '08-documents.md',
            '09-international.md',
            '10-faq-short.md'
        ];
    }

    async loadKnowledge() {
        if (this.isLoaded) return;

        const safeFile = (file) => /^[\w-]+\.md$/.test(file) ? file : null;
        
        try {
            const contents = await Promise.all(
                this.files.map(file => {
                    const safe = safeFile(file);
                    if (!safe) return Promise.resolve('');
                    return fetch(`/knowledge-base/${safe}`)
                        .then(r => {
                            if (!r.ok) throw new Error(`HTTP ${r.status}`);
                            return r.text();
                        })
                        .catch(e => {
                            console.error(`❌ Ошибка загрузки ${safe}:`, e.message);
                            return '';
                        });
                })
            );
            
            this.knowledge = contents.filter(c => c).join('\n\n---\n\n');
            this.isLoaded = true;
            console.log('✅ База знаний загружена:', this.knowledge.length, 'символов');
            console.log('📚 Первые 300 символов:', this.knowledge.substring(0, 300));
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
