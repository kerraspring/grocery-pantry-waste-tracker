const User = require("../models/User");

module.exports = {
    getListItems: async (req, res) => {
        try {
            if (req.user && req.user.id) {
                const user = await User.findById(req.user.id);
                if (user) {
                    const items = user.items;

                    if (items !== undefined) {
                        // If items are found, send them in the response
                        return res.status(200).json({ items });
                    } 
                } else {
                    // User not found
                    return res.status(404).json({ message: "User not found." });
                }
            } else {
                // User not authenticated
                return res.status(401).json({ message: "User not authenticated." });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error." });
        }
    },

    addNewItem: async (req, res) => {
        try {
            if (req.user && req.user.id) {
                const user = await User.findById(req.user.id);
                const newItem = req.body.item;
                if (user && newItem !== undefined) {
                    user.items.push(newItem);
                    await user.save();
                    return res.status(200).json({ message: "Item added successfully." });
                
                } else if(!newItem) {
                    return res.status(404).json({message:"unable to add item"});
                } else {
                    // User not found
                    return res.status(404).json({ message: "User not found." });
                } 
            } else {
                // User not authenticated
                return res.status(401).json({ message: "User not authenticated." });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error." });
        }
    }
};
