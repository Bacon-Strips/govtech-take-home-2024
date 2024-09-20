import TeamRankingPage from "./pages/TeamRankingPage"
import "./App.css"
import LogProvider from "./contexts/LogContext"

function App() {

  return (
    <LogProvider>
      <TeamRankingPage/>
    </LogProvider>
  )
}

export default App
