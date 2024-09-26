import { LayoutContext } from '@/contexts/layout'
import cn from 'classnames'
import { useRouter } from 'next/navigation'
import { Fragment, useCallback, useContext, useEffect, useRef } from 'react'
import TicketSVG from '../svg/TicketSVG'
import InformationSVG from '../svg/InformationSVG'
import InboxSVG from '../svg/InboxSVG'
import PhoneSVG from '../svg/PhoneSVG'
import HomeSVG from '../svg/HomeSVG'
import MenuSVG from '../svg/MenuSVG'
import { useTranslation } from 'react-i18next'
import { DataContext } from '@/contexts/data'

const Sidebar: React.FC = () => {
  const {
    t,
    i18n: { language, changeLanguage },
  } = useTranslation()
  const router = useRouter()
  const { isMenuOpen, closeMenu, openMenu, onChangeState } = useContext(LayoutContext)
  const { histories } = useContext(DataContext)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const getIcon = (path: string) => {
    switch (path) {
      case 'myticket':
        return (
          <TicketSVG
            className={cn(
              isMenuOpen ? 'opacity-100' : 'fixed -translate-x-40 opacity-0',
              'h-10 w-10 transition-all duration-500'
            )}
          />
        )
      case 'inbox':
        return (
          <InboxSVG
            className={cn(
              isMenuOpen ? 'opacity-100' : 'fixed -translate-x-40 opacity-0',
              'h-10 w-10 transition-all duration-500'
            )}
          />
        )
      case 'contact':
        return (
          <PhoneSVG
            className={cn(
              isMenuOpen ? 'opacity-100' : 'fixed -translate-x-40 opacity-0',
              'h-10 w-10 transition-all duration-500'
            )}
          />
        )
      case 'faq':
        return (
          <InformationSVG
            className={cn(
              isMenuOpen ? 'opacity-100' : 'fixed -translate-x-40 opacity-0',
              'h-10 w-10 transition-all duration-500'
            )}
          />
        )
      default:
        return (
          <HomeSVG
            className={cn(
              isMenuOpen ? 'opacity-100' : 'fixed -translate-x-40 opacity-0',
              'h-10 w-10 transition-all duration-500'
            )}
          />
        )
    }
  }

  const handleClickOutside = useCallback(() => {}, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])
  return (
    <Fragment>
      <div
        ref={sidebarRef}
        className={cn(
          'z-40 flex items-center justify-center bg-blue-950 p-2 text-white transition-[width] duration-500',
          isMenuOpen ? 'w-72' : 'w-20'
        )}>
        <button className="flex flex-col gap-10" onClick={openMenu}>
          <MenuSVG
            className={cn(
              isMenuOpen ? 'fixed -translate-x-40' : 'opacity-100',
              'h-10 w-10 transition-all duration-500'
            )}
          />
        </button>
        <div
          className={cn('flex flex-col gap-10', isMenuOpen ? 'opacity-100' : 'fixed -translate-x-40')}
          onClick={(e) => e.stopPropagation()}>
          <button className="flex items-center gap-4" onClick={() => router.push('/')}>
            <HomeSVG
              className={cn(
                isMenuOpen ? 'opacity-100' : 'fixed -translate-x-40 opacity-0',
                'h-10 w-10 transition-all duration-500'
              )}
            />
            <span
              className={cn(
                isMenuOpen ? 'opacity-100' : 'fixed -translate-x-40 opacity-0',
                'text-xl',
                'w-32 flex-grow text-left transition-all duration-500'
              )}>
              {t(`layout.sidebar.home_page`)}
            </span>
          </button>

          {['myticket', 'inbox', 'contact', 'faq'].map((item, idx) => (
            <button
              key={idx}
              className="flex items-center gap-4"
              onClick={() => {
                onChangeState(item), router.push(`/${item}`)
              }}>
              {getIcon(`${item}`)}
              <span
                className={cn(
                  isMenuOpen ? 'opacity-100 translate-x-0' : 'fixed -translate-x-40 opacity-0',
                  'w-32 flex-grow text-left text-xl transition-all duration-500'
                )}>
                {t(`layout.sidebar.${item}`)}
              </span>
              {item === 'inbox' && histories.filter((ticket) => !ticket.readAt).length > 0 && (
                <div
                  className={cn(
                    isMenuOpen ? 'opacity-100 ' : 'fixed -translate-x-40 opacity-0',
                    'flex h-4 w-4 items-center justify-center rounded-full bg-red-500 transition-all duration-500'
                  )}>
                  <span className="text-xs text-white">{histories.filter((ticket) => !ticket.readAt).length}</span>
                </div>
              )}
            </button>
          ))}

          {language === 'th' ? (
            <button onClick={() => changeLanguage('en')}>
              <img className="h-6 w-6 rounded-full" src="/us-flag.gif" alt="us" />
            </button>
          ) : (
            <button onClick={() => changeLanguage('th')}>
              <img className="h-6 w-6 rounded-full" src="/th-flag.gif" alt="th" />
            </button>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default Sidebar
