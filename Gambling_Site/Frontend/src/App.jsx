import { Outlet } from "react-router-dom"
function App() {

  return (
    <div className="flex mt-24 items-center flex-col w-full h-full">
      <Outlet />
    </div>
  )
}

export default App
