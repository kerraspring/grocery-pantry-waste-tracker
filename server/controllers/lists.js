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
    },

    updateItem: async (req, res) => {
        try {
            if (req.user && req.user.id) {
                const user = await User.findById(req.user.id);
    
                if (!user) {
                    return res.status(404).json({ message: "User not found." });
                }
    
                const itemList = req.body.items || [req.body.item].filter(Boolean);
    
                if (!itemList || !Array.isArray(itemList)) {
                    return res.status(400).json({ message: "Invalid item list provided." });
                }
    
                itemList.forEach(updatedItemInfo => {
                    const itemId = updatedItemInfo.id;
                    const userItem = user.items.find(item => item.id === itemId);
    
                    if (!userItem) {
                        return res.status(404).json({ message: `Item with ID ${itemId} not found for the user.` });
                    }
    
                    userItem.quantity = updatedItemInfo.quantity;
                    userItem.cost = updatedItemInfo.cost;
                    userItem.listType = updatedItemInfo.listType;
                });
    
                await user.save();
                return res.status(200).json({ message: "Items updated successfully." });
            } else {
                return res.status(401).json({ message: "User not authenticated." });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error." });
        }
    },

    deleteItem: async (req, res) => {
        try {
            if (req.user && req.user.id) {
                const user = await User.findById(req.user.id);
    
                if (!user) {
                    return res.status(404).json({ message: "User not found." });
                }
    
                const itemId = req.body.itemId;
                const userItemList = user.items;
                const userItemIndex = userItemList.findIndex(item => item.id === itemId);
    
                if (userItemIndex !== -1) {
                    userItemList.splice(userItemIndex, 1);
                } else {
                    return res.status(404).json({ message: "Item not found for the user." });
                }
    
                await user.save();
                return res.status(200).json({ message: "Item successfully deleted." });
            } else {
                return res.status(401).json({ message: "User not authenticated." });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error." });
        }
    },
    
        
};
