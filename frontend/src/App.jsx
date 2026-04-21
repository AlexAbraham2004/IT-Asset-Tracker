import { useState, useEffect } from "react";

function App(){
  const [assets, setAssets] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/assets')
      .then(res => res.json())
      .then(data => setAssets(data))
      .catch(err => console.error('Error fetching assets:', err))
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">IT Asset Tracker</h1>
      <pre>{JSON.stringify(assets, null, 2)}</pre>
    </div>
  )
}

export default App;