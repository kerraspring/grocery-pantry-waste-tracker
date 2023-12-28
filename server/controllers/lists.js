const User = require("../models/User");

module.exports = {
    getListItems: async (req, res) => {
        try {
            if (req.user && req.user._id) {
                const user = await User.findById(req.user._id);
                if (user) {
                    const items = user.items;

                    if (items && items.length > 0) {
                        // If items are found, send them in the response
                        return res.status(200).json({ items });
                    } else {
                        // If no items are found, send a response indicating so
                        return res.status(404).json({ message: "No items found." });
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
    }
};
