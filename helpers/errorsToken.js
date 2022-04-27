export const errorsToken = (error) => {
    let data;
    switch (error.message) {
        case "jwt malformed":
            data = "Formato no válido";
            break;
        case "invalid token":
        case "jwt expired":
        case "invalid signature":
            data = "Token no válido";
            break;
        default:
            data = error.message;
    }
    return data;
};
