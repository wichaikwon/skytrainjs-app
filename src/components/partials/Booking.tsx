import { useRouter } from 'next/navigation'
import { Fragment, useContext, useEffect, useState } from 'react'
import cn from 'classnames'
import { LayoutContext } from '@/contexts/layout'
import Datepicker from '../inputs/Datepicker'
import stations from '@/constants/stations'
import { DataContext } from '@/contexts/data'
import SquareRoundedMinusSVG from '../svg/SquareRoundedMinusSVG'
import SquareRoundedPlusSVG from '../svg/SquareRoundedPlusSVG'
import { formatDate } from '@/utils/date'
import { Station } from '@/types/dto'
import { calculateNumberOfStationsBetweenStations, calculatePrice, uuid } from '@/utils/data'
import InfoButton from '../buttons/InfoButton'
import Button from '../buttons/Button'
import Select from '../inputs/Select'
import BahtSVG from '../svg/BahtSVG'
import TicketSVG from '../svg/TicketSVG'
import CalendarSVG from '../svg/CalendarSVG'
import Input from '../inputs/Input'
import QrCodeSVG from '../svg/QrCodeSVG'
import CreditCardSVG from '../svg/CreditCardSVG'
import BankSVG from '../svg/BankSVG'
import ReverseSVG from '../svg/ReverseSVG'
import '@/i18n'
import { useTranslation } from 'react-i18next'

const Booking: React.FC = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation()
  const router = useRouter()
  const { createTicket } = useContext(DataContext)
  const [step, setStep] = useState(1)
  const [date, setDate] = useState(new Date().toISOString())
  const { onChangeState ,closeMenu} = useContext(LayoutContext)
  const [isStationNameF, setIsStationNameF] = useState('')
  const [isStationNameT, setIsStationNameT] = useState('')
  const [selectingStation, setSelectingStation] = useState<'from' | 'to'>('from')
  const [isOptionOpen, setOptionOpen] = useState(false)
  const [amount, setAmount] = useState(1)
  const [payment, setPayment] = useState('')
  const [price, setPrice] = useState(0)
  const [from, setFrom] = useState<Station>()
  const [to, setTo] = useState<Station>()
  const [id, setId] = useState('')

  useEffect(() => {
    const fromStation = stations
      .flatMap((stationGroup) => stationGroup.stations)
      .find((station) => station.name.th === isStationNameF)

    const toStation = stations
      .flatMap((stationGroup) => stationGroup.stations)
      .find((station) => station.name.th === isStationNameT)

    setFrom(fromStation)
    setTo(toStation)

    if (fromStation && toStation) {
      const { numberOfStations } = calculateNumberOfStationsBetweenStations(fromStation.id, toStation.id)
      const calculatedPrice = calculatePrice(numberOfStations)
      setPrice(calculatedPrice)
    }
  }, [isStationNameF, isStationNameT])

  const onSubmitStep = (step: number) => {
    if (step === 1) {
      if (from && to) {
        const id = uuid()
        setId(id)
      }
    }

    if (step === 3) {
      if (from && to) {
        const dto = {
          id,
          fromId: from.id,
          toId: to.id,
          date,
          amount,
          price,
          payment,
        }
        createTicket(dto)
        onChangeState('myticket')
        router.push('/myticket')
      }
    }

    if (step < 3) setStep(step + 1)
  }

  const toggleOptionMenu = (stationType: 'from' | 'to') => {
    setSelectingStation(stationType)
    setOptionOpen(!isOptionOpen)
  }
  const getIcon = (id: string) => {
    switch (id) {
      case 'promptpay':
        return <QrCodeSVG className="absolute left-3 h-4 w-4" />
      case 'creditcard':
        return <CreditCardSVG className="absolute left-3 h-4 w-4" />
      case 'banktransfer':
        return <BankSVG className="absolute left-3 h-4 w-4" />
    }
  }
  return (
    <Fragment>
      <div className="h-full p-2" onClick={closeMenu}>
        <span className="text-4xl text-blue-900" onClick={() => router.push('/contact')}>
          {t(`home_page.head.title`)}
        </span>
        <div className="flex justify-center p-5">
          <div className="flex w-3/4 items-center">
            {[1, 2, 3].map((item) => (
              <Fragment key={item}>
                <button
                  disabled={item > step - 1}
                  onClick={() => setStep(item)}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full text-white transition-all duration-500',
                    item > step ? 'bg-gray-300' : 'bg-blue-800'
                  )}>
                  {item}
                </button>
                {item < 3 && (
                  <div
                    className={cn(
                      'flex h-1 flex-1 transition-all duration-500',
                      item > step - 1 ? 'bg-gray-300' : 'bg-blue-800'
                    )}
                  />
                )}
              </Fragment>
            ))}
          </div>
        </div>

        <div className="flex justify-center p-2">
          <div className="relative h-96 w-3/4 rounded-md bg-white shadow-2xl">
            {step === 1 && (
              <Fragment>
                <div className="p-4">
                  <div className="flex justify-center">
                    <div className="flex w-full items-center justify-evenly gap-5">
                      <div className="relative flex w-full rounded-md border">
                        <label className="border-r p-4">{t('home_page.booking.step.0.field.from.label')}</label>
                        <Input
                          value={isStationNameF}
                          placeholder={t('home_page.booking.step.0.field.from.placeholder')}
                          className="w-full p-4"
                          onClick={() => toggleOptionMenu('from')}
                          onChange={(e) => setIsStationNameF(e.target.value)}
                        />
                      </div>
                      <button
                        className="cursor-pointer p-4 hover:animate-spin"
                        onClick={() => {
                          setIsStationNameF(isStationNameT), setIsStationNameT(isStationNameF)
                        }}>
                        <ReverseSVG />
                      </button>
                      <div className="relative flex w-full rounded-md border">
                        <label className="min-w-fit border-r p-4">{t('home_page.booking.step.0.field.to.label')}</label>
                        <Input
                          value={isStationNameT}
                          placeholder={t('home_page.booking.step.0.field.from.placeholder')}
                          className="w-full p-4"
                          onClick={() => toggleOptionMenu('to')}
                          onChange={(e) => setIsStationNameT(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full p-4">
                    <span className="text-3xl">{t('home_page.booking.step.0.field.date.label')}</span>
                  </div>
                  <div className="flex w-full">
                    <div className="flex items-center rounded-md border">
                      <label className="border-r p-4">{t('home_page.booking.step.0.field.date.text')}</label>
                      <Datepicker value={date} onChange={(date) => setDate(new Date(date).toISOString())} />
                    </div>
                  </div>
                  <div className="flex p-4">
                    <span className="text-2xl">{t('home_page.booking.step.0.field.amount.label')}</span>
                  </div>
                  <div className="flex gap-10">
                    <button onClick={() => setAmount(amount - 1)} disabled={amount === 1}>
                      <SquareRoundedMinusSVG
                        className={cn('text-red-500', amount === 1 ? 'pointer-events-none' : 'hover:text-red-700')}
                      />
                    </button>
                    <span className="text-xl">{amount}</span>
                    <button onClick={() => setAmount(amount + 1)}>
                      <SquareRoundedPlusSVG className={cn('text-blue-500 hover:text-blue-700')} />
                    </button>
                  </div>
                  <div className="absolute bottom-4 flex w-full">
                    <Button disabled={!isStationNameF || !isStationNameT} onClick={() => onSubmitStep(1)}>
                      {t('home_page.booking.step.0.submit')}
                    </Button>
                  </div>
                </div>
              </Fragment>
            )}
            {step === 2 && (
              <Fragment>
                <div className="p-4">
                  <div className="flex justify-around">
                    <div className="flex items-center gap-52">
                      <div className="">
                        <div className="flex items-center gap-4">
                          <span className="flex h-3 w-3 justify-center rounded-full bg-[#666666]" />
                          <span className="text-2xl">{`${from?.name[language as 'th' | 'en']}`}</span>
                        </div>
                        <div className="flex">
                          <div className="flex w-full items-center gap-8">
                            <div className="flex h-52">
                              <div className="absolute ml-1 mt-2 flex h-48 w-0.5 items-center justify-center bg-[#666666]" />
                              <div className="flex items-center">
                                <div className="flex flex-col pl-20">
                                  <div className="flex flex-col gap-4 pt-2">
                                    <div className="flex items-center gap-4">
                                      <CalendarSVG className="h-8 w-8" /> {formatDate(date)}
                                    </div>
                                    <div className="flex items-center gap-4 text-left">
                                      <TicketSVG className="h-8 w-8" /> <span>{amount}</span>
                                      <span>{t('home_page.booking.step.0.field.amount.unit')}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-left">
                                      <BahtSVG className="h-8 w-8" /> <span>{amount * price}</span>
                                      <span>{t('home_page.booking.step.0.field.price.unit')}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="flex h-3 w-3 justify-center rounded-full bg-[#666666]" />
                          <span className="text-2xl">{`${to?.name[language as 'th' | 'en']}`}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <span className="flex items-center gap-2 text-sm">
                        <InfoButton fromId={from?.id} toId={to?.id} />
                      </span>
                    </div>
                    <div className="flex">
                      <div className="p-2">
                        <span className="text-2xl">{t('home_page.booking.step.1.field.payment_method.label')}</span>
                        <div className="flex flex-col gap-5 p-2">
                          {['promptpay', 'creditcard', 'banktransfer'].map((item, idx) => (
                            <div key={idx} className="relative">
                              <button
                                className="flex w-full items-center justify-center rounded-md border p-2 shadow-md"
                                onClick={() => setPayment(item)}>
                                {getIcon(item)}
                                <span className={cn(item === payment ? 'font-bold text-blue-500' : 'font-normal')}>
                                  {t(`home_page.booking.step.1.field.payment_method.options.${item}`)}
                                </span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 flex w-full">
                    <Button disabled={payment === ''} onClick={() => onSubmitStep(2)}>
                      {t('home_page.booking.step.1.submit')}
                    </Button>
                  </div>
                </div>
              </Fragment>
            )}
            {step === 3 && (
              <Fragment>
                <div className="p-4 ">
                  <div className="flex flex-col items-center justify-center gap-4">
                      <img src="/qr-code.png" className=' w-32' alt='qrcode' />
                    <div className="flex flex-col gap-5">
                      <span>{t('home_page.booking.step.2.message.0')}</span>
                      <span>{t('home_page.booking.step.2.message.1', { bookingId: id })}</span>
                      <span>{t('home_page.booking.step.2.message.2')}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 flex w-full">
                    <Button
                      onClick={() => onSubmitStep(3)}>
                      {t('home_page.booking.step.2.submit')}
                    </Button>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>

      <div
        onClick={() => setOptionOpen(false)}
        className={cn(
          isOptionOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
          'fixed inset-0 z-10 bg-black bg-opacity-50 transition-opacity duration-500'
        )}>
        <div
          className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white p-4"
          onClick={(e) => e.stopPropagation()}>
          <Select
            setOptionOpen={setOptionOpen}
            selectingStation={selectingStation}
            setIsStationNameF={setIsStationNameF}
            setIsStationNameT={setIsStationNameT}
            isStationNameF={isStationNameF}
            isStationNameT={isStationNameT}
          />
        </div>
      </div>
    </Fragment>
  )
}
export default Booking
