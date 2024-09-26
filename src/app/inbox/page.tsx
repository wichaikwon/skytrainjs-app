'use client'
import NotFound from '@/components/partials/Notfound'
import { DataContext } from '@/contexts/data'
import cx from 'classnames'
import { Fragment, useContext } from 'react'
import { useTranslation } from 'react-i18next'

interface InboxProps {}

const Inbox: React.FC<InboxProps> = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const { histories, findStation, findTicket, updateHistory } = useContext(DataContext)

  return (
    <Fragment>
      <div className="flex w-full flex-col gap-4">
        {histories.length > 0 ? (
          histories.map((item, index) => {
            const ticket = findTicket(item.ticketId)
            return (
              ticket && (
                <div key={index} className="flex justify-center">
                  <button
                    key={index}
                    disabled={!!item.readAt}
                    onClick={() => {
                      if (!item.readAt) {
                        updateHistory(item.id)
                      }
                    }}
                    className={cx(
                      'flex w-2/3 justify-between overflow-hidden rounded-lg px-10 py-4 shadow-lg transition-all duration-500',
                      item.status === 'paid'
                        ? 'bg-green-500'
                        : item.status === 'cancelled'
                          ? 'bg-red-500'
                          : 'bg-yellow-500',
                      item.readAt ? 'opacity-50' : 'opacity-100'
                    )}>
                    <div className="flex items-center text-lg">
                      {t('inbox.message', {
                        from: findStation(ticket.fromId)?.name[language as 'th' | 'en'],
                        to: findStation(ticket.toId)?.name[language as 'th' | 'en'],
                        action: t(`inbox.action.${item.status}`),
                        interpolation: { escapeValue: false },
                      })}
                    </div>
                  </button>
                </div>
              )
            )
          })
        ) : (
          <NotFound type="no_data" />
        )}
      </div>
    </Fragment>
  )
}

export default Inbox
