import { LayoutContext } from '@/contexts/layout'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

interface NotFoundProps {
  type?: 'under_construction' | 'not_supported' | 'not_found' | 'no_data'
}

const NotFound: React.FC<NotFoundProps> = ({ type = 'not_found' }) => {
  const { t } = useTranslation()
  const {closeMenu} = useContext(LayoutContext)
  return (
    <div className="flex w-full animate-pulse flex-col items-center justify-center p-10" onClick={closeMenu}>
      <span className="italic text-gray-500">{t(`misc.${type}`)}</span>
    </div>
  )
}

export default NotFound