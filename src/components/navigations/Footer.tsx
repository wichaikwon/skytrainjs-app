import { Fragment } from "react"
interface FooterProps {
    className?: string
}
const Footer: React.FC<FooterProps> = ({className}) => {
    return (
        <Fragment>
            <div className={`${className} absolute bg-gray-200 z-20 bottom-0 w-full  text-right py-1 px-10`}>&#169; 2024 - All Rights Reserved</div>
        </Fragment>
    )
}
export default Footer