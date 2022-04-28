import { nanoid } from "nanoid";
import { Link } from "../models/Link.js";

export const getLinks = async (req, res) => {
    try {
        const links = await Link.find().lean();
        return res.json({ links });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export const getLink = async (req, res) => {
    try {
        const { id } = req.params;
        const link = await Link.findById(id).lean();

        if (!link) {
            throw { code: 404, message: "No existe el link" };
        }

        return res.json({ link });
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(400).json({ error: "id incorrecto" });
        }
        return res.status(error.code || 500).json({ error: error.message });
    }
};

export const addLinks = async (req, res) => {
    try {
        // const { longlink } = req.body;
        const longlink = req.longlink;
        // console.log(req.longlink);
        const nanolink = nanoid(6);

        const link = new Link({ longlink, nanolink, uid: req.uid });
        await link.save();

        return res.json({ link });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export const updateLinks = async (req, res) => {
    try {
        const { id } = req.params;
        const { longlink } = req.body;
        const link = await Link.findById(id);

        if (!link) {
            throw { code: 404, message: "No existe el link" };
        }

        // if(link.uid !== req.uid){
        //     throw {code: 401, message: "no es tu link, no autorizado 🐞"}
        // }
        if (!link.uid.equals(req.uid)) {
            throw { code: 401, message: "no es tu link, payaso 🐞" };
        }

        // await link.updateOne({ longlink }); => no devuelve nada
        const newlink = await Link.findByIdAndUpdate(
            id,
            { longlink },
            { new: true, runValidators: true }
        ).lean();

        return res.json({ newlink });
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(400).json({ error: "id incorrecto" });
        }
        return res.status(error.code || 500).json({ error: error.message });
    }
};

export const removeLinks = async (req, res) => {
    try {
        const { id } = req.params;
        const link = await Link.findById(id);

        if (!link) {
            throw { code: 404, message: "No existe el link" };
        }

        if (!link.uid.equals(req.uid)) {
            throw { code: 401, message: "no es tu link, payaso 🐞" };
        }

        await link.remove();
        return res.json({ ok: true });
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(400).json({ error: "id incorrecto" });
        }
        return res.status(error.code || 500).json({ error: error.message });
    }
};

export const redirect = async (req, res) => {
    try {
        const { nanolink } = req.params;
        console.log(nanolink);
        const link = await Link.findOne({ nanolink });
        if (!link) {
            throw { code: 404, message: "No existe el link" };
        }
        return res.redirect(link.longlink);
    } catch (error) {
        console.log(error);
        return res.status(error.code || 500).json({ error: error.message });
    }
};
