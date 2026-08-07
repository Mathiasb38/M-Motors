import { useState } from 'react'

import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Filter from './components/Filter/Filter.jsx'
import Catalog from './components/Catalog/Catalog.jsx'


export default App


function App() {
  const [filters, setFilters] = useState({})

  return (
    <>
      <Header />
      <main>
        
        <Filter onChange={setFilters} />
        <Catalog filters={filters} />
        
      </main>
      <Footer />
    </>
  )
}
