'use client'
import Button from '@/components/buttons/Button'
import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'

const Contact = () => {
  const { t } = useTranslation()
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const handleSubmit = () => {
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <Fragment>
      <div className="flex justify-center p-4">
        <div className="w-1/3 bg-blue-900 rounded-md">
          <h1 className="p-4 text-center text-3xl text-white">{t('contact_us.title')}</h1>
          <div className="flex items-center justify-center bg-white p-2">
            <span className="w-20 text-center">{t('contact_us.field.name.label')}</span>
            <input
              className="flex-1 rounded-md border p-2"
              placeholder={t('contact_us.field.name.placeholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center bg-white p-2">
            <span className="w-20 text-center">{t('contact_us.field.email.label')}</span>
            <input
              className="flex-1 rounded-md border p-2"
              placeholder={t('contact_us.field.email.placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center bg-white p-2">
            <span className="w-20 text-center">{t('contact_us.field.message.label')}</span>
            <textarea
              className="flex-1 resize-none rounded-md border p-2"
              placeholder={t('contact_us.field.message.placeholder')}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="p-2 bg-white rounded-b-md">
            <Button
              disabled={message === '' || email === '' || name === ''}
              onClick={() => handleSubmit()}>
              {t('contact_us.submit')}
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Contact
