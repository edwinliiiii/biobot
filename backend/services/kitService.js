const Kit = require('../schemas/kitSchema.js');

module.exports = {
    getKits: async (req, res) => {
        try {
            const kits = await Kit.find();
            res.json(kits);
        } catch (err) {
            res.status(500).json({ 'message': err.message });
        }
    }
};
