const simpleRequest = (req,res)=>{
    res.json({
        "name":"hello world"
    })
}
const simpleRequest2 = (req,res)=>{
    res.json({
        "name":"hello earth"
    })
}

export {simpleRequest,simpleRequest2}