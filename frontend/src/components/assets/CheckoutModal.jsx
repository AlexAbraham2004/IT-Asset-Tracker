import { useState } from 'react'

function CheckoutModal({ asset, onClose, onUpdated }) {
  const [form, setForm] = useState({
    assignee: asset.assignee || '',
    due_date: asset.due_date ? asset.due_date.split('T')[0] : ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCheckout = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/assets/${asset.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...asset,
        status: 'checked out',
        assignee: form.assignee,
        checkout_date: new Date().toISOString().split('T')[0],
        due_date: form.due_date
      })
    })
      .then(res => res.json())
      .then(updatedAsset => {
        onUpdated(updatedAsset)
        onClose()
      })
  }

  const handleReturn = () => {
    fetch(`http://localhost:3000/assets/${asset.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...asset,
        status: 'available',
        assignee: null,
        checkout_date: null,
        due_date: null
      })
    })
      .then(res => res.json())
      .then(updatedAsset => {
        onUpdated(updatedAsset)
        onClose()
      })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg border border-gray-200 p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">{asset.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-medium">✕</button>
        </div>

        {asset.status === 'checked out' ? (
          <div>
            <p className="text-sm text-gray-600 mb-1">Currently checked out to</p>
            <p className="font-medium text-gray-800 mb-1">{asset.assignee}</p>
            <p className="text-sm text-gray-500 mb-6">Due back: {new Date(asset.due_date).toLocaleDateString()}</p>
            <button
              onClick={handleReturn}
              className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 font-medium text-sm"
            >
              Mark as Returned
            </button>
          </div>
        ) : (
          <form onSubmit={handleCheckout} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Assignee</label>
              <input
                name="assignee"
                value={form.assignee}
                onChange={handleChange}
                placeholder="Who is taking this?"
                required
                className="border border-gray-300 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Due Date</label>
              <input
                name="due_date"
                value={form.due_date}
                onChange={handleChange}
                type="date"
                required
                className="border border-gray-300 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 font-medium text-sm mt-2"
            >
              Check Out
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default CheckoutModal