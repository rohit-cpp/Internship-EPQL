
import './App.css'


import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './MainLayout'
import Login from './auth/login'
import Signup from './auth/Signup'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // children: [{
    //   path:"/login"
  // },
    },
      {
        path: "login",
        element:<Login/>
      },
      {
        path: "signup",
        element:<Signup/>
      },
    
    ]
  
)
function App() {


  return (
    <main>
      <RouterProvider router={appRouter}/> 
  
    </main>
      
 
  )
}

export default App
