class Wallet{
    constructor(){
        this.url = "http://localhost:8000/api/v1/wallet/"
    }

    async createWallet(amount = 0){
        try {
            let res = await fetch(this.url+"createWallet",{
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                credentials:"include",
                body:JSON.stringify({amount})
            })
    
            res = await res.json();
            console.log(res)
            return res;
        } catch (error) {
            console.log("Error || ",error.message);
        }
        
    }

    async addAmount(amount){
        try {
            let res = await fetch(this.url+"addAmount",{
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                credentials:"include",
                body:JSON.stringify({amount})
            })
    
            res = await res.json();
            console.log(res)
            return res;
        } catch (error) {
            console.log("Error || ",error.message);
        }
        
    }


    async dedcutAmount(amt,walletId){
        try {
            console.log(amt,walletId)
            let res = await fetch(this.url+"deductAmt",{
                method:"POST",
                credentials:"include",
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify({amt,walletId})
            })
    
            res = await res.json();
            console.log("Wallet Dedcute : ",res)
            return res.data;
        } catch (error) {
            console.log("Error || ",error.message);
        }
    }

    async getWallet(){
        try {
            let res = await fetch(this.url+"getWalletInfo",{
                method:"GET",
                credentials: 'include', 
            }) || {};
            res = await res.json();
            console.log(res.data)
            return res.data || {}
        } catch (error) {
            // console.log("Error while retriving Wallet Info || ",error.message)
            return {}
        }
    }

}

export const wallet = new Wallet();