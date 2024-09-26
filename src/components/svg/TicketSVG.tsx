import React from 'react'

const TicketSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" {...props}>
    <path
      fill="currentColor"
      d="M29.126 7.125a1.125 1.125 0 1 1 0-2.25H30V2H18v2.875h.875a1.125 1.125 0 0 1 0 2.25H18V10h12V7.125Z"
    />
    <path
      fill="currentColor"
      d="M22 13v3H6v-6h9V8H6.186a2.995 2.995 0 0 1 2.816-2h6V4H9a5.006 5.006 0 0 0-5 5v12a4.99 4.99 0 0 0 3.582 4.77L5.77 30h2.176l1.714-4h8.681l1.714 4h2.176l-1.812-4.23A4.99 4.99 0 0 0 24 21v-8Zm0 7h-3v2h2.816a2.995 2.995 0 0 1-2.815 2H9a2.995 2.995 0 0 1-2.816-2H9v-2H6v-2h16Z"
    />
  </svg>
)
export default TicketSVG
