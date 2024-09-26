import React, { Fragment, useContext, useState } from 'react'
import cn from 'classnames'
import stations from '@/constants/stations'
import { DataContext } from '@/contexts/data'
import { useTranslation } from 'react-i18next'

interface SelectProps {
  selectingStation: 'from' | 'to'
  isStationNameF: string
  isStationNameT: string
  setIsStationNameF: (name: string) => void
  setIsStationNameT: (name: string) => void
  setOptionOpen: (open: boolean) => void
}

const Select: React.FC<SelectProps> = ({
  selectingStation,
  isStationNameF,
  isStationNameT,
  setIsStationNameF,
  setIsStationNameT,
  setOptionOpen,
}) => {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const [selectedIdx, setSelectedIdx] = useState(0)
  const { interchanges } = useContext(DataContext)

  const handleStationSelection = (stationName: string) => {
    if (selectingStation === 'from') {
      setIsStationNameF(stationName)
    } else {
      setIsStationNameT(stationName)
    }
    setOptionOpen(false)
  }

  return (
    <Fragment>
      <div className="grid grid-cols-3 gap-4 pb-4 text-center">
        {stations.map((item, idx) => (
          <div key={idx}>
            <button
              onClick={() => setSelectedIdx(idx)}
              type="button"
              className={cn('w-full rounded-md p-2 text-white', { 'font-bold': selectedIdx === idx })}
              style={{ backgroundColor: item.color }}>
              <span className="text-xl">{item.name[language as 'th' | 'en']}</span>
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        {stations[selectedIdx]?.stations.map((item, idx) => (
          <div
            key={idx}
            className={cn(
              'cursor-pointer border-b border-black',
              (selectingStation === 'from' ? isStationNameF : isStationNameT) === item.name.th ? 'font-bold' : 'hover:text-gray-500'
            )}
            onClick={() => {
              handleStationSelection(item.name.th)
            }}>
            <button
              disabled={item.unavailable}
              key={idx}
              className={cn(
                'gap-4 p-2 text-lg disabled:text-gray-300'
              )}>
              {`${item.name[language as 'th' | 'en']} (${item.alias || item.id})`}
              {interchanges.some((interchange) => interchange === item.id) && '*'}
            </button>
          </div>
        ))}
        
      </div>
      <span className="flex pt-10 text-xs italic text-gray-500">{t('home_page.booking.step.0.interchange')}</span>
    </Fragment>
  )
}
export default Select
