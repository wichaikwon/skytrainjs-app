'use client'
import { DataContext } from '@/contexts/data'
import { Ticket } from '@/types/dto'
import { isExpired, formatDate } from '@/utils/date'
import React, { Fragment, useContext, useState } from 'react'
import ArrowNarrowRightSVG from '@/components/svg/ArrowNarrowRightSVG'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import Img from 'next/image'
import NotFound from '@/components/partials/Notfound'
interface TicketDetailProps {
  ticket?: Ticket
  isFull?: boolean
  onClose: () => void
}
const TicketDetail: React.FC<TicketDetailProps> = ({ ticket, isFull, onClose }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const { findStation, updateTicket } = useContext(DataContext)
  return (
    ticket && (
      <Fragment>
        <div className="flex w-full items-center justify-center gap-2 rounded-t-md bg-blue-900 p-2 text-white">
          {findStation(ticket.fromId)?.name[language as 'th' | 'en']}
          <ArrowNarrowRightSVG />
          {findStation(ticket.toId)?.name[language as 'th' | 'en']}
        </div>
        <div className="flex w-full items-center justify-evenly gap-2 p-2">
          <div className="flex flex-col">
            {isFull && <span>{t('my_ticket.message.0', { ticketId: ticket.id })}</span>}
            <span>
              {t('my_ticket.message.1', {
                amount: ticket.amount,
              })}
            </span>
            {isFull && (
              <span>
                {t('my_ticket.message.2', {
                  paymentMethod: t(`home_page.booking.step.1.field.payment_method.options.${ticket.payment}`),
                })}
              </span>
            )}
            <span>{t('my_ticket.message.3') + ' ' + formatDate(ticket.date)}</span>
          </div>
          {isFull && (
            <div className="flex flex-col gap-2 justify-center items-center">
              <Img src="/qr-code.png" className='w-32' alt='qrcode' />
              <div className="flex justify-evenly gap-4">
                {ticket.status === 'pending' && (
                  <button
                    onClick={() => {
                      updateTicket(ticket.id, { status: 'paid' }), onClose()
                    }}
                    className="rounded-md bg-green-500 p-1 text-sm text-white hover:bg-green-700">
                    {t('my_ticket.test.button.paid')}
                  </button>
                )}
                {ticket.status === 'pending' && (
                  <button
                    onClick={() => {
                      updateTicket(ticket.id, { status: 'cancelled' }), onClose()
                    }}
                    className="rounded-md bg-red-500 p-1 text-sm text-white hover:bg-red-700">
                    {t('my_ticket.test.button.cancelled')}
                  </button>
                )}
              </div>
              {ticket.status === 'pending' && (
                <span className="text-xs text-gray-400">{t('my_ticket.test.label')}</span>
              )}
            </div>
          )}
        </div>

        <div className="flex w-full items-center justify-between rounded-b-md bg-blue-900 p-2 text-xs text-white">
          <span
            className={classNames(
              'rounded-md p-1',
              ticket.status === 'pending' ? 'bg-yellow-500' : ticket.status === 'paid' ? 'bg-green-500' : 'bg-gray-500'
            )}>
            {t(`misc.status.${ticket.status}`)}
          </span>
          <span>{`${ticket.price * ticket.amount}` + ' ' + t('home_page.booking.step.0.field.price.unit')}</span>
        </div>
      </Fragment>
    )
  )
}
const MyTicket = () => {
  const { tickets } = useContext(DataContext)
  const [isOpenTicket, setIsOpenTicket] = useState(false)
  const [ticket, setTicket] = useState<Ticket>()
  const openTicket = (id: string) => {
    const ticket = tickets.find((item) => item.id === id)
    setTicket(ticket)
    setIsOpenTicket(true)
  }
  const onClose = () => {
    setIsOpenTicket(false)
  }
  return tickets.length > 0 ? (
    <Fragment>
      <div
        className={classNames(
          'fixed inset-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-50 text-lg shadow-lg transition-all duration-500',
          isOpenTicket ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setIsOpenTicket(false)}>
        <div
          className="flex w-2/5 flex-col items-center justify-center overflow-hidden rounded-lg bg-gray-300 shadow-lg"
          onClick={(e) => e.stopPropagation()}>
          <TicketDetail ticket={ticket} isFull onClose={onClose} />
        </div>
      </div>
        <div className="grid w-full grid-cols-4 items-center justify-center gap-4 p-2">
          {tickets.map((item, idx) => (
            <button
              key={idx}
              className="flex w-3/4 grid-cols-4 flex-col items-center justify-center gap-2 rounded-lg shadow-lg"
              disabled={isExpired(new Date(item.date))}
              onClick={() => openTicket(item.id)}>
              <TicketDetail ticket={item} onClose={onClose} />
            </button>
          ))}
        </div>
    </Fragment>
  ) : (
    <NotFound type="no_data" />
  )
}
export default MyTicket
