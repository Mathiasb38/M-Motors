import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Filter from './components/Filter/Filter.jsx'
import Catalog from './components/Catalog/Catalog.jsx'


export default App


function App() {
  return (
    <>
      <Header />
      <main>
        
        <Filter />
        <Catalog />
        
      </main>
      <Footer />
    </>
  )
}
