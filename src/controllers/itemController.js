const Item = require("../models/itemModal");

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find(req.query);
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.createItem = async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json({ message: "Item created", item });
  } catch (error) {
    console.error("Error creating item:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id, req.body, { new: true });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item updated", item });
  } catch (error) {
    console.error("Error updating item:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    console.error("Error deleting item:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
