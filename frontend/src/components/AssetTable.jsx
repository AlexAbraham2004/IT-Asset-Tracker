const formatDate = (dateString) => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString()
}

function AssetTable({ assets, onCheckout }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 text-left border-b border-gray-200">
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Checkout Date</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {assets.map((asset, index) => (
            <tr key={asset.id} className={index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}>
              <td className="px-6 py-4 text-sm text-gray-800 font-medium">{asset.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{asset.type}</td>
              <td className="px-6 py-4 text-sm text-gray-600 font-mono">{asset.serial_number}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  asset.status === 'available' ? 'bg-green-100 text-green-800' :
                  asset.status === 'checked out' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {asset.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{asset.assignee || '—'}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{formatDate(asset.checkout_date)}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{formatDate(asset.due_date)}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onCheckout(asset)}
                  className={`text-xs font-medium px-3 py-1 rounded-lg ${
                    asset.status === 'checked out'
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}
                >
                  {asset.status === 'checked out' ? 'Return' : 'Checkout'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AssetTable