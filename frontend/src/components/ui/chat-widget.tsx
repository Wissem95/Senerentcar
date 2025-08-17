"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  MessageCircle, 
  X, 
  Send, 
  User, 
  Bot,
  Minimize2,
  Maximize2,
  Phone,
  Mail
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: 'text' | 'quick_reply' | 'contact'
}

interface QuickReply {
  id: string
  text: string
  response: string
}

const quickReplies: QuickReply[] = [
  {
    id: '1',
    text: '📍 Où récupérer ma voiture ?',
    response: 'Nos bureaux sont situés à Dakar, Avenue Cheikh Anta Diop. Nous proposons aussi la livraison à l\'aéroport et dans certains hôtels.'
  },
  {
    id: '2', 
    text: '💳 Modes de paiement',
    response: 'Nous acceptons les cartes bancaires, les virements et le paiement mobile (Orange Money, Wave). Un acompte de 30% est requis à la réservation.'
  },
  {
    id: '3',
    text: '🛡️ Assurance incluse ?',
    response: 'Oui ! Toutes nos locations incluent une assurance responsabilité civile. Assurance tous risques disponible en option.'
  },
  {
    id: '4',
    text: '📄 Documents requis',
    response: 'Permis de conduire valide, pièce d\'identité et carte bancaire. Pour les étrangers : permis international recommandé.'
  },
  {
    id: '5',
    text: '⏰ Horaires d\'ouverture',
    response: 'Nous sommes ouverts du lundi au vendredi 8h-18h, samedi 9h-16h. Service client 24h/7j au +221 77 654 32 10.'
  }
]

const botResponses = {
  greeting: "Bonjour ! 👋 Je suis l'assistant virtuel de Senerentcar. Comment puis-je vous aider aujourd'hui ?",
  default: "Je ne suis pas sûr de comprendre. Pouvez-vous reformuler votre question ? Ou contactez notre équipe au +221 33 823 45 67.",
  farewell: "Merci d'avoir contacté Senerentcar ! N'hésitez pas à revenir si vous avez d'autres questions. Bon voyage au Sénégal ! 🇸🇳"
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Message de bienvenue initial
      addMessage(botResponses.greeting, 'bot')
    }
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const addMessage = (content: string, sender: 'user' | 'bot', type: 'text' | 'quick_reply' | 'contact' = 'text') => {
    const newMessage: Message = {
      id: Math.random().toString(36).substring(7),
      content,
      sender,
      timestamp: new Date(),
      type
    }
    setMessages(prev => [...prev, newMessage])
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    addMessage(userMessage, 'user')
    setInputValue('')
    setShowQuickReplies(false)

    // Simuler une réponse du bot après un délai
    setTimeout(() => {
      const response = generateBotResponse(userMessage)
      addMessage(response, 'bot')
    }, 1000)
  }

  const handleQuickReply = (reply: QuickReply) => {
    addMessage(reply.text, 'user', 'quick_reply')
    setShowQuickReplies(false)
    
    setTimeout(() => {
      addMessage(reply.response, 'bot')
    }, 1000)
  }

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    // Mots-clés pour différentes réponses
    if (message.includes('prix') || message.includes('tarif') || message.includes('coût')) {
      return "Nos tarifs varient selon le véhicule et la durée. À partir de 15,000 XOF/jour pour une économique. Consultez notre catalogue pour voir tous les prix !"
    }
    
    if (message.includes('disponib') || message.includes('libre')) {
      return "Pour vérifier la disponibilité, utilisez notre formulaire de recherche en indiquant vos dates. Ou appelez-nous au +221 33 823 45 67."
    }
    
    if (message.includes('aéroport') || message.includes('airport')) {
      return "Oui, nous proposons la livraison/récupération à l'aéroport LSS de Dakar pour 5,000 XOF. Prévenez-nous 24h à l'avance."
    }
    
    if (message.includes('annul') || message.includes('modif')) {
      return "Annulation gratuite jusqu'à 24h avant. Modification possible selon disponibilité. Contactez-nous au +221 33 823 45 67."
    }
    
    if (message.includes('merci') || message.includes('au revoir') || message.includes('bye')) {
      return botResponses.farewell
    }

    return botResponses.default
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setIsMinimized(false)
    }
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={toggleChat}
          className="w-14 h-14 rounded-full bg-senegal-green hover:bg-senegal-green/90 shadow-lg"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        <Badge 
          variant="destructive" 
          className="absolute -top-2 -right-2 px-2 py-1 text-xs animate-pulse"
        >
          Aide
        </Badge>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className={cn(
        "w-80 transition-all duration-300 shadow-xl",
        isMinimized ? "h-16" : "h-96"
      )}>
        {/* Header */}
        <CardHeader className="p-3 bg-senegal-green text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-sm">Support Senerentcar</CardTitle>
                <p className="text-xs text-green-100">
                  <span className="inline-block w-2 h-2 bg-green-300 rounded-full mr-1"></span>
                  En ligne
                </p>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-6 h-6 p-0 text-white hover:bg-white/20"
                onClick={toggleMinimize}
              >
                {isMinimized ? (
                  <Maximize2 className="w-3 h-3" />
                ) : (
                  <Minimize2 className="w-3 h-3" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-6 h-6 p-0 text-white hover:bg-white/20"
                onClick={toggleChat}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="p-0 h-64 overflow-y-auto">
              <div className="p-3 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.sender === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] p-2 rounded-lg text-sm",
                        message.sender === 'user'
                          ? "bg-senegal-green text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      )}
                    >
                      <p>{message.content}</p>
                      <p className={cn(
                        "text-xs mt-1",
                        message.sender === 'user' 
                          ? "text-green-100" 
                          : "text-gray-500"
                      )}>
                        {message.timestamp.toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Quick Replies */}
                {showQuickReplies && messages.length <= 1 && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 text-center">
                      Questions fréquentes :
                    </p>
                    {quickReplies.map((reply) => (
                      <Button
                        key={reply.id}
                        variant="outline"
                        size="sm"
                        className="w-full text-left text-xs h-auto py-2 px-3"
                        onClick={() => handleQuickReply(reply)}
                      >
                        {reply.text}
                      </Button>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Input */}
            <div className="p-3 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Tapez votre message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  size="sm"
                  className="px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Contact rapide */}
              <div className="flex justify-center space-x-4 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={() => window.open('tel:+221338234567')}
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Appeler
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={() => window.open('mailto:contact@senerentcar.com')}
                >
                  <Mail className="w-3 h-3 mr-1" />
                  Email
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}