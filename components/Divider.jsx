import ApplicationWrapper from "./ApplicationWrapper.jsx"
import { AuthenticationContext } from "./AuthenticationContext.js"

export default function Divider({ children }) {
  return (
    <AuthenticationContext>
      <ApplicationWrapper>{children}</ApplicationWrapper>
    </AuthenticationContext>
  )
}
