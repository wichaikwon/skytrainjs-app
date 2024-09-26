'use client'
import { History, Line, Station, Ticket } from '@/types/dto'
import { interchanges, lines, stations, uuid } from '@/utils/data'
import { compareDesc } from 'date-fns'
import { createContext, useState } from 'react'

interface DataContextProps {
  lines: Line[]
  stations: Station[]
  interchanges: string[]
  tickets: Ticket[]
  histories: History[]
  findStation: (id: string) => Station | undefined
  findTicket: (id: string) => Ticket | undefined
  createTicket: (values: {
    id: string
    fromId: string
    toId: string
    date: string
    amount: number
    price: number
    payment: string
  }) => void
  updateTicket: (id: string, values: { status: 'pending' | 'paid' | 'cancelled' }) => void
  updateHistory: (id: string) => void
}

export const DataContext = createContext<DataContextProps>({
  lines: [],
  stations: [],
  interchanges: [],
  tickets: [],
  histories: [],
  findStation: () => undefined,
  findTicket: () => undefined,
  createTicket: () => {},
  updateTicket: () => {},
  updateHistory: () => {},
})

interface DataProviderProps {
  children: React.ReactNode
}

export const DataContextProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [histories, setHistories] = useState<History[]>([])

  const findStation = (id: string) => stations.find((station) => station.id === id)
  const findTicket = (id: string) => tickets.find((item) => item.id === id)

  const createTicket = (values: {
    id: string
    fromId: string
    toId: string
    date: string
    amount: number
    price: number
    payment: string
  }) => {
    const ticket: Ticket = {
      status: 'pending',
      ...values,
      createAt: new Date().toISOString(),
    }
    setTickets([...tickets, ticket])

    const history: History = {
      id: uuid(),
      ticketId: ticket.id,
      status: ticket.status,
      createAt: new Date().toISOString(),
    }
    setHistories([...histories, history])
  }

  const updateTicket = (id: string, values: { status: 'pending' | 'paid' | 'cancelled' }) => {
    const ticket = tickets.find((ticket) => ticket.id === id)
    if (ticket) {
      if (ticket.status === values.status) return
      const newTicket: Ticket = {
        ...ticket,
        ...values,
        updateAt: new Date().toISOString(),
      }
      setTickets([...tickets.filter((ticket) => ticket.id !== id), newTicket])

      const history: History = {
        id: uuid(),
        ticketId: newTicket.id,
        status: newTicket.status,
        createAt: new Date().toISOString(),
      }
      setHistories([...histories, history])
    }
  }

  const updateHistory = (id: string) => {
    const history = histories.find((history) => history.id === id)
    if (history) {
      const newHistory: History = {
        ...history,
        readAt: new Date().toISOString(),
      }
      setHistories([...histories.filter((history) => history.id !== id), newHistory])
    }
  }

  return (
    <DataContext.Provider
      value={{
        lines,
        stations,
        interchanges,
        tickets: tickets.sort((a, b) => compareDesc(new Date(a.createAt), new Date(b.createAt))),
        histories: histories.sort((a, b) => compareDesc(new Date(a.createAt), new Date(b.createAt))),
        findStation,
        findTicket,
        createTicket,
        updateTicket,
        updateHistory,
      }}>
      {children}
    </DataContext.Provider>
  )
}