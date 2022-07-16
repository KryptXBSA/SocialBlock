import { createContext, useContext, useReducer, useState, useMemo } from 'react'

function reducer(state, newAlert) {
  
  let currentAlerts = state.alerts
  // let push = true
  // // var duplicateIndex = currentAlerts.map(function (x) { return x.id; }).indexOf(newAlert.id);
  // let duplicateIndex = currentAlerts.findIndex(a => {
  //   return a.for === newAlert.alert.for
  // })

  // if (duplicateIndex >= 0) {
  //   push = false
  //   currentAlerts[duplicateIndex].id = newAlert.id
  //   return { alerts: currentAlerts ? currentAlerts : [] };
  // }
  if (newAlert.action === 'close') {
    return { alerts: currentAlerts ? currentAlerts : [] };
  }
  if (newAlert?.action === 'remove') {
    currentAlerts = currentAlerts.filter(a => a.id !== newAlert.id)
    return { alerts: currentAlerts ? currentAlerts : [] };
  } else if (newAlert.action === 'push') {
    let duplicateIndex = currentAlerts.findIndex(a => a.for === newAlert.alert.for);
    if (duplicateIndex >= 0) {
      currentAlerts[duplicateIndex].id = newAlert.alert.id
      return { alerts: currentAlerts ? currentAlerts : [] };
    } else {
      currentAlerts.push(newAlert.alert)
      return { alerts: currentAlerts ? currentAlerts : [] };
    }
  }

}

const AlertContext = createContext()
export function AlertWrapper({ children }) {
  let initialState = { alerts: [] }
  useMemo(() => changeAlertState, [state])
  const [state, changeAlertState] = useReducer(reducer, initialState);
  function closeAlert(id) {
    let alertIndex = state.alerts.findIndex(a => a.id === id)
    if (state.alerts[alertIndex]) {

      state.alerts[alertIndex].closing = true
      changeAlertState({ action: 'close' })
    }
  }
  return (
    <AlertContext.Provider value={{ alertState: state, changeAlertState, closeAlert }}>
      {children}
    </AlertContext.Provider>
  )
}

export function UseAlertContext() {
  return useContext(AlertContext)
}

function pause(milliseconds) {
  var dt = new Date();
  while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}