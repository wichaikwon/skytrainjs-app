export type Station = {
    id: string
    alias?: string
    unavailable?: boolean
    name: {
      en: string
      th: string
    }
  }
  
  export type Line = {
    id: string
    color: string
    name: {
      en: string
      th: string
    }
    stations: Station[]
  }
  
  export type Ticket = {
    id: string
    fromId: string
    toId: string
    date: string
    amount: number
    price: number
    payment: string
    status: 'pending' | 'paid' | 'cancelled'
    createAt: string
    updateAt?: string
  }
  
  export type History = {
    id: string
    ticketId: string
    status: 'pending' | 'paid' | 'cancelled'
    createAt: string
    readAt?: string
  }