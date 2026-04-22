import { useState, useEffect } from "react";
import AssetTable from "./components/AssetTable"
import AssetForm from "./components/AssetForm"

function App(){
  const [assets, setAssets] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/assets')
      .then(res => res.json())
      .then(data => setAssets(data))
      .catch(err => console.error('Error fetching assets:', err))
  }, [])

  const handleAssetAdded = (newAsset) => {
    setAssets([newAsset, ...assets])
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">IT Asset Tracker</h1>
      <AssetForm onAssetAdded={handleAssetAdded} />
      <AssetTable assets={assets} />
    </div>
  )
}

export default App;