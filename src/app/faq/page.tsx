'use client'
import { LayoutContext } from '@/contexts/layout'
import { Fragment, useContext } from 'react'
import { useTranslation } from 'react-i18next'

const Faq = () => {
  const { t } = useTranslation()
  const {closeMenu} = useContext(LayoutContext)
  return (
    <Fragment>
      <div className="flex w-full flex-col gap-2 text-white p-2" onClick={closeMenu}>
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div key={index} className="flex justify-center">
            <div className="flex w-2/3 flex-col gap-2 overflow-hidden rounded-lg bg-blue-900 px-10 py-4 shadow-lg">
              <div className="flex w-full items-center justify-between">
                <div className="text-2xl font-bold">{t(`faq.questions.${index}.question`)}?</div>
              </div>
              <div className="w-fulltext-lg font-medium">{t(`faq.questions.${index}.answer`)}</div>
            </div>
          </div>
        ))}
        <span className="text-right text-sm text-gray-500">*{t('faq.remark')}</span>
      </div>
    </Fragment>
  )
}

export default Faq
