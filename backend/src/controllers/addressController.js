const Address = require('../models/Address');

exports.getAddresses = async (req, res) => {
    try {
        const addresses = await Address.findAll({ where: { userId: req.user.id } });
        res.json(addresses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.addAddress = async (req, res) => {
    const { type, fullName, mobile, street, city, state, zip, country } = req.body;
    try {
        const newAddress = await Address.create({
            userId: req.user.id,
            type,
            fullName,
            mobile,
            street,
            city,
            state,
            zip,
            country
        });
        res.json(newAddress);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateAddress = async (req, res) => {
    const { type, fullName, mobile, street, city, state, zip, country } = req.body;
    try {
        let address = await Address.findByPk(req.params.id);

        if (!address) {
            return res.status(404).json({ msg: 'Address not found' });
        }

        // Ensure user owns address
        if (address.userId !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        address.type = type || address.type;
        address.fullName = fullName || address.fullName;
        address.mobile = mobile || address.mobile;
        address.street = street || address.street;
        address.city = city || address.city;
        address.state = state || address.state;
        address.zip = zip || address.zip;
        address.country = country || address.country;

        await address.save();
        res.json(address);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteAddress = async (req, res) => {
    try {
        let address = await Address.findByPk(req.params.id);

        if (!address) {
            return res.status(404).json({ msg: 'Address not found' });
        }

        // Ensure user owns address
        if (address.userId !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await address.destroy();
        res.json({ msg: 'Address removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
