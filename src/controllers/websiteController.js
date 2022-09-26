import WebsiteModel from "../models/websiteModel.js";
import ResellWebsiteModel from "../models/resellWebsiteModel.js";

const getWebsite = async (req, res) => {
    const websites = await WebsiteModel.find().select();
    res.status(200).json(websites);
};

const getResellWebsite = async (req, res) => {
    const websites = await ResellWebsiteModel.find().select();
    res.status(200).json(websites);
};

const addWebsite = async (req, res) => {
    const newWebsite = new WebsiteModel({
        name: req.body.name,
        img: req.body.img
    });

    try {
        const website = await newWebsite.save();
        return res.status(201).json(website);
    } catch (err) {
        return res.status(400).send(err);
    }
};

const addResellWebsite = async (req, res) => {
    const newResellWebsite = new ResellWebsiteModel({
        name: req.body.name,
        img: req.body.img
    });

    try {
        const resellWebsite = await newResellWebsite.save();
        return res.status(201).json(resellWebsite);
    } catch (err) {
        return res.status(400).send(err);
    }
};

export { getWebsite, getResellWebsite, addWebsite, addResellWebsite };

