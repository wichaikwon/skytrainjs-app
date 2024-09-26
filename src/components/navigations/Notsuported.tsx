import NotFound from "../partials/Notfound"

export const NotSupported = () => {
  return (
    <div className="hidden max-xl:flex">
      <div className="flex h-screen w-full animate-pulse items-center justify-center p-10">
        <NotFound type="not_supported" />
      </div>
    </div>
  )
}

export default NotSupported