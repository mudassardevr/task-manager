const API_URL = "http://localhost:5000/api/tasks";

const getToken = () => localStorage.getItem("token");


//FETCH TASKs
export const fetchTasksAPI = async() => {
    const response = await fetch(`${API_URL}/get` , {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "auth-token" : getToken(),
        }
    });
    
    return response.json();
};

// ADD TASKS
export const addTaskAPI = async(taskText) => {
    const response = await fetch(`${API_URL}/add` , {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "auth-token" : getToken()
        },
        body : JSON.stringify({ title : taskText})
    });

    if(!response.ok){
        throw new Error("faild request on add tasks")

    }
    return response.json();
};

//DELETE TASKS
export const deleteTaskAPI = async(id) => {
    const response = await fetch(`${API_URL}/delete/${id}`, {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json",
            "auth-token" : getToken(),
        }
    });
    return response.json();
}


// TOGGLE TASK CHECKBOX

export const toggleTaskAPI = async (task) => {
    const response = await fetch(`${API_URL}/update/${task._id}`,{
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
            "auth-token" : getToken()
        },
        body :JSON.stringify({
            completed : !task.completed
        }),
    });

    return response.json();

}


