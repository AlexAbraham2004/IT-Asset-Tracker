// API calls to backend

const API_URL = import.meta.env.VITE_API_URL

// Get all assets
export const getAssets = async () =>{
    const response = await fetch(`${API_URL}/assets`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json' }
    })
    if (!response.ok){
        throw new Error(`Failed to fetch assets: ${response.status}`)
    }
    
    return response.json()
}

// Upload Asset
export const uploadAsset = async (assetData) => {
    const response = await fetch(`${API_URL}/assets`, {
        method:'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(assetData) 
    })

    if (!response.ok){
        throw new Error(`Failed to upload asset: ${response.status}`)
    }
    return response.json()
}


// Update Asset
export const updateAsset = async (id, data) => {
    console.log('Updating asset with ID:', id, 'Data:', data)
    const response = await fetch(`${API_URL}/assets/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    if (!response.ok){
        throw new Error(`Failed to update asset: ${response.status}`)
    }  


    return response.json()
}