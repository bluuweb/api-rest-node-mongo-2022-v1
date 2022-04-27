import jwt from "jsonwebtoken";

export const generateToken = (id) => {
    const expiresIn = 15 * 60 * 1000;

    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn,
    });

    return { token, expiresIn };
};

export const generateRefreshToken = (id, res) => {
    const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH, {
        expiresIn: "30d",
    });

    // 30 días
    const expires = new Date(Date.now() + 30 * 60 * 60 * 1000);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        expires,
        secure: !(process.env.MODO === "developer"),
    });
};
