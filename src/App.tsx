import './styles/app.scss'
import {Routes, Route} from 'react-router-dom'
import Game from './pages/Game'
import { Sidebar } from './components/sidebar'
import { useEffect, useState } from 'react'
import { ConfirmationModal } from './components/confirmationModal'
import { useGameStore } from './store/gameStore'
const App:React.FC = () => {
  const [mode, setMode]= useState('6x4');
  const [theme,setTheme] = useState<string | null>(null)
  const [openModal, setOpenModal]=useState<boolean>(true)
  const {resetGame,startGame} = useGameStore();
  useEffect(()=>{
    const storedTheme = localStorage.getItem("theme");
    if(storedTheme){
      setTheme(storedTheme);
    }else{
      setTheme('halloween');
      localStorage.setItem("theme", 'halloween');
    }
  },[])
  const handleModeChange = (newMode: string)=>{
    setMode(newMode);
    resetGame();
  }
  const handleToggleTheme = (newTheme:string) =>{
    setTheme(newTheme)
    resetGame();
  }
  const handleStartGame = () => {
    startGame();
    setOpenModal(false);
  };
  return (
    <div className='app-container'>
      <Sidebar onModeChange={handleModeChange} onToggle={handleToggleTheme}/>
        <ConfirmationModal 
            isOpen={openModal} 
            onClose={() => setOpenModal(false)} 
            onConfirm={handleStartGame} 
            title="Ready to Play?" 
            message="Get ready to test your memory skills! Click the button below to start the game." 
            confirmLabel="START GAME" 
        />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Game mode={mode} theme={theme} />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
