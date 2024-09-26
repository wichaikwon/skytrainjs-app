import { ButtonHTMLAttributes, forwardRef } from 'react'
import cx from 'classnames'

const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cx(
          'rounded-md bg-blue-800 p-4 text-white hover:bg-blue-900 hover:opacity-90 disabled:opacity-50',
          className
        )}
        {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button