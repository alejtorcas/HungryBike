
 export const useId = () => {

    const generateId = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        let id = ""
        for (let i = 0; i < 20; i++) {id += chars.charAt(Math.floor(Math.random() * chars.length))}
        return id
    }

    const generateCode = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUWXYZ1234567890"
        let code = ""
        for (let i = 0; i < 6; i++) {code += chars.charAt(Math.floor(Math.random() * chars.length))}
        return code
    }

    return { generateId, generateCode }
}