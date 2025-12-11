// API Route pour chatbot IA sécurisé avec Supabase Knowledge Base
// Chemin: /api/chat-ai.ts

interface VercelRequest {
  method?: string
  body: any
}

interface VercelResponse {
  status: (code: number) => VercelResponse
  json: (data: any) => void
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

// ==================== INTERFACES ====================

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface ChatRequest {
  message: string
  conversationHistory?: ChatMessage[]
  knowledgeBase?: any[]
}

interface ChatResponse {
  success: boolean
  reply?: string
  error?: string
  configured?: boolean
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string
    }
    finish_reason: string
  }>
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

// ==================== SYSTEM PROMPT ====================

/**
 * Créer le contexte système avec la base de connaissances Supabase
 */
const createSystemPrompt = (knowledgeBase: any[]): string => {
  // Construire la base de connaissances formatée
  const knowledge = knowledgeBase
    .map((item) => {
      const tags = item.tags ? ` [Tags: ${item.tags.join(', ')}]` : ''
      return `📌 ${item.title}${tags}\n${item.content}\n`
    })
    .join('\n---\n\n')

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

Réponds toujours en français, de manière structurée et claire.`
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Appel à l'API OpenAI
 */
const callOpenAI = async (
  messages: ChatMessage[]
): Promise<{ content: string; usage?: any } | null> => {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY

  if (!OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY is not configured')
    return null
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Modèle rapide et économique
        messages,
        temperature: 0.7,
        max_tokens: 500,
        top_p: 0.9,
        presence_penalty: 0.6,
        frequency_penalty: 0.3,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('❌ Erreur OpenAI:', response.status, errorData)

      if (response.status === 401) {
        throw new Error('Clé API OpenAI invalide. Vérifiez votre configuration.')
      } else if (response.status === 429) {
        throw new Error('Limite de requêtes atteinte. Réessayez dans quelques instants.')
      } else if (response.status === 500) {
        throw new Error('Erreur serveur OpenAI. Veuillez réessayer.')
      }

      throw new Error(`Erreur API OpenAI: ${response.status}`)
    }

    const data: OpenAIResponse = await response.json()
    const content = data.choices[0]?.message?.content

    if (!content) {
      throw new Error('Réponse vide de l\'API OpenAI')
    }

    // Log des tokens utilisés
    if (data.usage) {
      const cost = (data.usage.total_tokens / 1000000 * 0.15).toFixed(6)
      console.log('📊 Tokens utilisés:', {
        prompt: data.usage.prompt_tokens,
        completion: data.usage.completion_tokens,
        total: data.usage.total_tokens,
        estimatedCost: cost + ' $'
      })
    }

    return {
      content: content.trim(),
      usage: data.usage
    }
  } catch (error) {
    console.error('❌ Erreur appel OpenAI:', error)
    throw error
  }
}

/**
 * Limiter l'historique de conversation
 */
const limitConversationHistory = (
  history: ChatMessage[],
  maxMessages: number = 10
): ChatMessage[] => {
  // Garder seulement les X derniers messages
  return history.slice(-maxMessages)
}

/**
 * Validation du message
 */
const validateMessage = (message: string): { valid: boolean; error?: string } => {
  if (!message || typeof message !== 'string') {
    return { valid: false, error: 'Message must be a string' }
  }

  const trimmed = message.trim()
  if (trimmed.length === 0) {
    return { valid: false, error: 'Message cannot be empty' }
  }

  if (trimmed.length > 1000) {
    return { valid: false, error: 'Message too long (max 1000 characters)' }
  }

  return { valid: true }
}

// ==================== MAIN HANDLER ====================

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Gérer CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({})
  }

  // Autoriser seulement POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    })
  }

  try {
    const { message, conversationHistory = [], knowledgeBase = [] } = req.body as ChatRequest

    console.log('💬 New chat request received')

    // Vérifier si OpenAI est configuré
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ OPENAI_API_KEY not configured')
      return res.status(503).json({
        success: false,
        configured: false,
        error: 'Le service IA n\'est pas configuré. Veuillez contacter l\'administrateur.',
      })
    }

    // Validation du message
    const validation = validateMessage(message)
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: validation.error,
      })
    }

    // Créer le prompt système avec la base de connaissances
    const systemPrompt = createSystemPrompt(knowledgeBase)

    // Construire l'historique de conversation
    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...limitConversationHistory(conversationHistory),
      { role: 'user', content: message.trim() },
    ]

    // Appel à OpenAI
    const result = await callOpenAI(messages)

    if (!result) {
      return res.status(500).json({
        success: false,
        error: 'Erreur lors de la génération de la réponse. Veuillez réessayer.',
      })
    }

    console.log('✅ Reply generated successfully')

    return res.status(200).json({
      success: true,
      configured: true,
      reply: result.content,
      usage: result.usage,
    })
  } catch (error: any) {
    console.error('❌ Erreur globale:', error)

    // Messages d'erreur utilisateur friendly
    let userMessage = 'Une erreur interne est survenue'

    if (error.message?.includes('API')) {
      userMessage = 'Erreur de connexion à l\'API. Veuillez réessayer.'
    } else if (error.message?.includes('Limite')) {
      userMessage = error.message
    }

    return res.status(500).json({
      success: false,
      error: userMessage,
    })
  }
}
