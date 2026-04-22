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
            <input name="name" value = {form.name} onChange={handleChange} placeholder="Asset name" required className="border p-2 rounded" />
            <input name="type" value={form.type} onChange={handleChange} placeholder="Type (laptop, monitor...)" required className="border p-2 rounded" />
            <input name="serial_number" value={form.serial_number} onChange={handleChange} placeholder="Serial Number" required className="border p-2 rounded" />
            <select name = "status" value = {form.status} onChange = {handleChange} className="border p-2 rounded">
                <option value = "available">Available</option>
                <option value = "checked out">Checked Out</option>
                <option value = "in repair">In Repair</option>
            </select>
            <input name="assignee" value={form.assignee} onChange={handleChange} placeholder="Assignee" className="border p-2 rounded" />
            <input name="checkout_date" value={form.checkout_date} onChange={handleChange} placeholder="date" className="border p-2 rounded" />
            <input name="due_date" value={form.due_date} onChange={handleChange} type="date" className="border p-2 rounded" />
            <button type="submit" className="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                Add Asset
            </button>
        </form>
    )
}

export default AssetForm
