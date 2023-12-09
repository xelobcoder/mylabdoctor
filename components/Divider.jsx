import Navbar from "./Navbar"

export default function Divider({ children }) {
  return (
    <>
      <div className="app-divider">
        <Navbar />
        <main className="main-wrapper">{children}</main>
      </div>
    </>
  )
}
