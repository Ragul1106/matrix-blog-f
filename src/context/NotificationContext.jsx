import React, {createContext, useState} from 'react'
export const NotificationContext = createContext()
export function NotificationProvider({ children }){
  const [message, setMessage] = useState(null)
  const show = (msg) => {
    setMessage(msg)
    setTimeout(()=> setMessage(null), 4000)
  }
  return (
    <NotificationContext.Provider value={{ message, show }}>
      {children}
      {message && <div className="fixed bottom-4 right-4 bg-green-600 text-white p-3 rounded">{message}</div>}
    </NotificationContext.Provider>
  )
}
