// "http://localhost:5000/api/auth"; local API 

const API_URL = "https://your-backend.onrender.com/api/auth"; // deploy api to github


//LOGIN API
export const loginAPI = async (credentials) => {
    
    const response = await fetch(`${API_URL}/login`, {
        method : "POST" ,
        headers : {
            "Content-Type" : "application/json",
        }, 
        body : JSON.stringify(credentials)
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.error || "Failed Login ");
    }

    return data;

};

// REGISTER API
export const registerAPI = async (credentials) => {
    const response = await fetch(`${API_URL}/register`, {
        method : "POST" , 
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(credentials)
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.error || "Regsiter failed");
    }

    return data;

};
