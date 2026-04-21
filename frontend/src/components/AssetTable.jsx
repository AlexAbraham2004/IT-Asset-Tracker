function AssetTable({ assets }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Type</th>
            <th className="p-3 border">Serial Number</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Assignee</th>
            <th className="p-3 border">Checkout Date</th>
            <th className="p-3 border">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {assets.map(asset => (
            <tr key={asset.id} className="border-b hover:bg-gray-50">
              <td className="p-3 border">{asset.name}</td>
              <td className="p-3 border">{asset.type}</td>
              <td className="p-3 border">{asset.serial_number}</td>
              <td className="p-3 border">
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                  asset.status === 'available' ? 'bg-green-100 text-green-800' :
                  asset.status === 'checked out' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {asset.status}
                </span>
              </td>
              <td className="p-3 border">{asset.assignee || '—'}</td>
              <td className="p-3 border">{asset.checkout_date || '—'}</td>
              <td className="p-3 border">{asset.due_date || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AssetTable