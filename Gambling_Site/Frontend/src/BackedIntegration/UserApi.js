class User{
    constructor(){
        this.url = "http://localhost:8000/api/v1/user/"
    }

    async login(data){
        try {
            console.log(JSON.stringify(data))
            let res = await fetch(this.url+"login",{
                method:"Post",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials':true
                },
                credentials:"include",
                body:JSON.stringify(data)
            })
    
            let jsonResponse = await res.json();
    
            console.log(jsonResponse)
    
            return jsonResponse
        } catch (error) {
            console.log("Login Error || ",error.message)
        }
    }

    async register(data){
        try {
            console.log(JSON.stringify(data))
            let res = await fetch(this.url+"register",{
                method:"Post",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials':true
                },
                credentials:"include",
                body:JSON.stringify(data)
            })
    
            let jsonResponse = await res.json();
    
            console.log(jsonResponse)
    
            return jsonResponse
        } catch (error) {
            console.log("Register Error",error.message)
        }
    }
    async logout(){
        try {
            let res = await fetch(this.url+"logout",{
                method:"Post",
                headers: {
                    'Access-Control-Allow-Credentials':true
                },
                credentials:"include"
            })
    
            let jsonResponse = await res.json();
    
            console.log(jsonResponse)
    
            return jsonResponse
        } catch (error) {
            console.log("Logout Error",error.message)
        }
    }
}

export const user = new User()