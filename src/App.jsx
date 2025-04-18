import './App.sass'
import TheNewsBlock from './components/TheNewsBlock'
import { mockNewsData } from './data/mockNewsData'

function App() {

  return (
    <>
      <div className='news-background'>
        <div className='news-container'>
        {mockNewsData.map(news => (
        <TheNewsBlock key={news.ID} news={news} />
      ))}
        </div>
      </div>
    </>
  )
}

export default App
