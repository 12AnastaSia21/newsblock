import './App.sass'
import TheNewsBlock from './components/TheNewsBlock'

function App() {

  return (
    <>
      <div className='news-background'>
        <div className='news-container'>
          <TheNewsBlock></TheNewsBlock>
        </div>
      </div>
    </>
  )
}

export default App
