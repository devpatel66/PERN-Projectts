import jwt from 'jsonwebtoken'

const generatesAccessToken = async (id, name, email) => {
    let token = await jwt.sign({
        id: id,
        name: name,
        email: email
    },
        "dev12",
        {
            expiresIn: "15 days"
        }
    )

    return token

}

const generatesRefreshTToken = async (id) => {
    let token = await jwt.sign({
        id: id
    },
        "dev124",
        {
            expiresIn: "1 days"
        }
    )

    return token
}

export {generatesAccessToken,generatesRefreshTToken}