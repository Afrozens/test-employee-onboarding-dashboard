import { PropsWithChildren } from "react"
import { Toaster } from "sonner"

interface Props extends PropsWithChildren {}

const Provider = ({ children }: Props) => {
  return (
    <>
      <Toaster richColors />
      {children}
    </>
  )
}

export default Provider
