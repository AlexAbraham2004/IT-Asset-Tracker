import { useState } from "react";

function AssetForm({ onAssetAdded }) {
    const [form, setForm] = useState({ 
        name: '',
        type: '', 
        serial_number: '',
        status: 'available',
        assignee: '', 
        checkout_date: '',
        due_date: ''
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/assets', {
            method: 'POST' ,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
            })
                .then(res => res.json())
                .then(newAsset => {
                    console.log('Asset added:', newAsset)
                    onAssetAdded(newAsset)
                    setForm({
                        name:'',
                        type: '',
                        serial_number: '',
                        status: 'available',
                        assignee: '',
                        checkout_date: '',
                        due_date: ''
                    })
                })
    }

    return (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-8 grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Asset Name</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Dell Laptop 01" required className="border border-gray-300 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Type</label>
                <input name="type" value={form.type} onChange={handleChange} placeholder="e.g. Laptop, Monitor" required className="border border-gray-300 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Serial Number</label>
                <input name="serial_number" value={form.serial_number} onChange={handleChange} placeholder="e.g. SN-ABC123" required className="border border-gray-300 p-2 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="border border-gray-300 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="available">Available</option>
                    <option value="checked out">Checked Out</option>
                    <option value="in repair">In Repair</option>
                </select>
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Assignee</label>
                <input name="assignee" value={form.assignee} onChange={handleChange} placeholder="e.g. John Smith" className="border border-gray-300 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Checkout Date</label>
                <input name="checkout_date" value={form.checkout_date} onChange={handleChange} type="date" className="border border-gray-300 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Due Date</label>
                <input name="due_date" value={form.due_date} onChange={handleChange} type="date" className="border border-gray-300 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button type="submit" className="col-span-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 font-medium text-sm mt-2">
                Add Asset
            </button>
        </form>
    )
}

export default AssetForm
