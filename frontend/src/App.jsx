import { useState, useEffect } from "react";
import AssetTable from "./components/AssetTable"
import AssetForm from "./components/AssetForm"
import CheckoutModal from "./components/CheckoutModal"

function App(){
  const [assets, setAssets] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState('all')
  const [selectedAsset, setSelectedAsset] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/assets')
      .then(res => res.json())
      .then(data => setAssets(data))
      .catch(err => console.error('Error fetching assets:', err))
  }, [])

  const handleAssetAdded = (newAsset) => {
    setAssets([newAsset, ...assets])
    setShowForm(false)
  }

  const handleAssetUpdated = (updatedAsset) => {
    setAssets(assets.map(a => a.id === updatedAsset.id ? updatedAsset : a))
  }

  const total = assets.length
  const available = assets.filter(a => a.status === 'available').length
  const checkedOut = assets.filter(a => a.status === 'checked out').length
  const inRepair = assets.filter(a => a.status === 'in repair').length

  const filteredAssets = filter === 'all' ? assets : assets.filter(a => a.status === filter)

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">IT Asset Tracker</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          {showForm ? 'Cancel' : '+ Add Asset'}
        </button>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-semibold text-gray-800">{total}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Available</p>
            <p className="text-2xl font-semibold text-green-600">{available}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Checked Out</p>
            <p className="text-2xl font-semibold text-red-600">{checkedOut}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-500">In Repair</p>
            <p className="text-2xl font-semibold text-yellow-600">{inRepair}</p>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Asset</h2>
            <AssetForm onAssetAdded={handleAssetAdded} />
          </div>
        )}

        <div className="flex gap-2 mb-4">
          {['all', 'available', 'checked out', 'in repair'].map(option => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                filter === option
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Asset Inventory</h2>
          </div>
          <AssetTable assets={filteredAssets} onCheckout={setSelectedAsset} />
        </div>
      </div>

      {selectedAsset && (
        <CheckoutModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          onUpdated={handleAssetUpdated}
        />
      )}
    </div>
  )
}

export default App