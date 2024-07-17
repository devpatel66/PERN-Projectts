import { Outlet } from "react-router-dom"
import Header from "./components/header"
import Footer from "./components/footer"
function App() {

  return (
    <>
    <Header/>
    <div className="flex mt-24 items-center flex-col w-full h-full">
      <Outlet />
    </div>
    <Footer/>
    </>
  )
}

export default App
