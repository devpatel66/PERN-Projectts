class User{
    constructor(){
        this.url = "http://localhost:8000/api/v1/user/"
    }

    async login(data){
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
    }
}

export const user = new User()