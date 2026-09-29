import { useState } from 'react'

import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Filter from './components/Filter/Filter.jsx'
import Catalog from './components/Catalog/Catalog.jsx'
import CreateAccount from './components/CreateAccount/CreateAccount.jsx'
import { DEFAULT_FILTERS } from './components/Filter/filterConfig.js'


export default App


function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false)

  return (
    <>
      <Header onProfile={() => setIsCreateAccountOpen(true)} />
      <main>
        
        <Filter filters={filters} onChange={setFilters} />
        <Catalog filters={filters} />
        
      </main>
      <Footer />
      {isCreateAccountOpen && (
        <CreateAccount onClose={() => setIsCreateAccountOpen(false)} />
      )}
    </>
  )
}
