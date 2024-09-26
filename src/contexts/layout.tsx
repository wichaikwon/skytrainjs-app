'use client'
import Sidebar from '@/components/navigations/Sidebar'
import { createContext, useState } from 'react'
import '@/i18n'
import { useTranslation } from 'react-i18next'
import Footer from '@/components/navigations/Footer'
import NotSupported from '@/components/navigations/Notsuported'

interface LayoutContextProps {
  isMenuOpen: boolean
  openMenu: () => void
  closeMenu: () => void
  currentState: string
  onChangeState: (state: string) => void
}

export const LayoutContext = createContext<LayoutContextProps>({
  isMenuOpen: false,
  openMenu: () => {},
  closeMenu: () => {},
  currentState: 'home_page',
  onChangeState: () => {},
})

interface LayoutProviderProps {
  children: React.ReactNode
}

export const LayoutContextProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [state, setState] = useState('home_page')

  const openMenu = () => setIsMenuOpen(true)
  const closeMenu = () => setIsMenuOpen(false)

  const onChangeState = (state: string) => {
    setState(state)
  }

  const getBannerText = () => {
    switch (state) {
      case 'myticket':
        return 'myticket'
      case 'inbox':
        return 'inbox'
      case 'contact':
        return 'contact'
      case 'faq':
        return 'faq'
      default:
        return 'home_page'
    }
  }

  return (
    <LayoutContext.Provider
      value={{
        isMenuOpen,
        openMenu,
        closeMenu,
        currentState: state,
        onChangeState,
      }}>
      <div className="flex min-h-screen flex-col bg-gray-100 max-xl:hidden">
        <div className="flex flex-grow">
          <Sidebar />
          <NotSupported />
          <div className="flex w-full flex-col">
            <div className="relative">
              <img src="/banner.jpg" className="h-48 w-full object-cover brightness-75" alt='banner' />
              <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl text-white">
                {t(`layout.sidebar.${getBannerText()}`)}
              </h1>
            </div>
            <div className="text-center" onClick={closeMenu}>{children}</div>
          </div>
        </div>
        <Footer className="sticky" />
      </div>
    </LayoutContext.Provider>
  )
}
