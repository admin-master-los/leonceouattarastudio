// src/services/openaiService.ts

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class OpenAIService {
  private apiKey: string;
  private baseURL = 'https://api.openai.com/v1/chat/completions';
  private model = 'gpt-4o-mini'; // Modèle rapide et économique

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Créer le contexte système avec la base de connaissances Supabase
   */
  private createSystemPrompt(knowledgeBase: any[]): string {
    // Construire la base de connaissances formatée
    const knowledge = knowledgeBase
      .map((item) => {
        const tags = item.tags ? ` [Tags: ${item.tags.join(', ')}]` : '';
        return `📌 ${item.title}${tags}\n${item.content}\n`;
      })
      .join('\n---\n\n');

    return `Tu es Larry, l'assistant virtuel intelligent de Leonce Ouattara Studio (lOS), une plateforme spécialisée dans la digitalisation de processus et la conception de solutions digitales sur-mesure.

🎯 TON RÔLE
Tu assistes les visiteurs du site web en répondant à leurs questions sur nos services, tarifs, processus, délais et expertise technique. Tu es professionnel, sympathique et orienté solution.

📚 BASE DE CONNAISSANCES DE L'ENTREPRISE
${knowledge}

✅ DIRECTIVES DE RÉPONSE
1. Utilise UNIQUEMENT les informations de la base de connaissances ci-dessus
2. Réponds de manière concise (3-4 phrases maximum sauf si demande détaillée)
3. Utilise un ton professionnel mais chaleureux
4. Ajoute des emojis occasionnellement pour rendre la conversation agréable (1-2 par réponse max)
5. Si tu ne connais pas la réponse, oriente vers le lien de la page de rendez-vous https://leonceouattarastudiogroup.site/reserver
6. Termine chaque réponse par une question ou suggestion d'action (exemple: "Souhaitez-vous un devis personnalisé ?")
7. Pour les questions techniques détaillées, propose de planifier un RDV avec l'équipe
8. Mets en valeur l'expertise en intégration de paiements (Orange Money, Wave, MTN, Moov, Visa/Mastercard)

❌ NE PAS FAIRE
- Ne jamais inventer d'informations non présentes dans la base de connaissances
- Ne pas donner de tarifs précis sans dire "à partir de" ou "selon le projet"
- Ne pas promettre de délais sans contexte du projet
- Ne pas répondre aux questions hors du périmètre de l'agence

🎯 OBJECTIF PRINCIPAL
Qualifier les leads et les orienter vers :
- Demande de devis personnalisé
- Prise de RDV découverte
- Contact direct par email 

💡 STYLE DE COMMUNICATION
- Professionnel mais accessible
- Orienté résultats et solutions concrètes
- Valorise l'expertise technique de l'agence
- Rassurant sur la sécurité, RGPD, et qualité

Réponds toujours en français, de manière structurée et claire.`;
  }

  /**
   * Envoyer un message à OpenAI et obtenir une réponse intelligente
   */
  async sendMessage(
    userMessage: string,
    conversationHistory: ChatMessage[],
    knowledgeBase: any[]
  ): Promise<string> {
    try {
      // Créer le prompt système avec les connaissances
      const systemPrompt = this.createSystemPrompt(knowledgeBase);

      // Construire le tableau de messages complet
      const messages: ChatMessage[] = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory,
        { role: 'user', content: userMessage },
      ];

      // Appel API OpenAI
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: messages,
          temperature: 0.7, // Créativité modérée
          max_tokens: 500, // Limiter la longueur des réponses
          top_p: 0.9,
          presence_penalty: 0.6, // Éviter les répétitions
          frequency_penalty: 0.3,
        }),
      });

      // Gérer les erreurs HTTP
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('OpenAI API Error:', response.status, errorData);
        
        if (response.status === 401) {
          throw new Error('Clé API OpenAI invalide. Vérifiez votre configuration.');
        } else if (response.status === 429) {
          throw new Error('Limite de requêtes atteinte. Réessayez dans quelques instants.');
        } else if (response.status === 500) {
          throw new Error('Erreur serveur OpenAI. Veuillez réessayer.');
        }
        
        throw new Error(`Erreur API OpenAI: ${response.status}`);
      }

      // Parser la réponse
      const data: OpenAIResponse = await response.json();
      
      // Extraire le contenu de la réponse
      const content = data.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('Réponse vide de l\'API OpenAI');
      }

      // Log des tokens utilisés (utile pour le monitoring des coûts)
      if (data.usage) {
        console.log('📊 Tokens utilisés:', {
          prompt: data.usage.prompt_tokens,
          completion: data.usage.completion_tokens,
          total: data.usage.total_tokens,
          estimatedCost: (data.usage.total_tokens / 1000000 * 0.15).toFixed(6) + ' $'
        });
      }

      return content.trim();

    } catch (error) {
      console.error('❌ Erreur dans OpenAIService.sendMessage:', error);
      
      // Relancer l'erreur pour que le composant ChatBot puisse la gérer
      throw error;
    }
  }

  /**
   * Changer le modèle OpenAI utilisé
   */
  setModel(model: 'gpt-4o' | 'gpt-4o-mini' | 'gpt-3.5-turbo') {
    this.model = model;
  }

  /**
   * Obtenir le modèle actuel
   */
  getModel(): string {
    return this.model;
  }
}

export default OpenAIService;
