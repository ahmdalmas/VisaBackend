const router = require('express').Router()
const mongoose = require('mongoose')


// Models
const countryVisa = require('../models/CountryVisa')

// Middleware function to get a specific visa detail by ID
async function getVisa(req, res, next) {
    try {
        const visaId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(visaId)) {
            return res.status(400).json({ message: 'Invalid visa ID' });
        }
        const visa = await countryVisa.findById(req.params.id);
        if (visa == null) {
            return res.status(404).json({ message: 'Visa detail not found' });
        }
        res.visa = visa;
        next();
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

// GET | /api/visa/ | public | get all visas 
router.get('/', async (req, res) => {
    try {
        const visas = await countryVisa.find()
        return res.status(200).json({
            status: "success",
            data: visas
            
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            success: false
        })
    }
})


// GET | /api/visa/:id | public | get a single visa by id
router.get('/:id', getVisa, async (req, res) => {
    try {
        res.status(200).json({
            data: visaId,
            success: true
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false })
    }
})

// POST | /api/visa/add-new| public | add a new visa
router.post('/add-new', async (req, res) => {
    const visa = new countryVisa(req.body);
    try {
        // const newVisa = await visa.create({
        //     UserId: req.user.id,
        //     title: req.body.title,
        //     description: req.body.description,
        //     post_image: req.body.image_url,
        // })
        const newVisa = await visa.save();
        res.status(201).json({
            data: newVisa,
            success: true
        })
    } catch (err) {
        res.status(400).json({
            message: err.message,
            success: false
        })
    }
})

// PATCH | /api/visa/:id| Private | Edit a visa
router.patch('/:id', getVisa, async (req, res) => {
    const allowedUpdates = ['country_image', 'country_name', 'guaranteed_on', 'visa_fees', 'ibixvisa_fees', 'validity_period', 'entry_type', 'documents_required'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates!' });
    }

    // if (req.body.country_image != null) {
    //     res.visa.country_image = req.body.country_image;
    // }
    // if (req.body.country_name != null) {
    //     res.visa.country_name = req.body.country_name;
    // }
    // if (req.body.guaranteed_on != null) {
    //     res.visa.guaranteed_on = req.body.guaranteed_on;
    // }
    // if (req.body.visa_fees != null) {
    //     res.visa.visa_fees = req.body.visa_fees;
    // }
    // if (req.body.ibixvisa_fees != null) {
    //     res.visa.ibixvisa_fees = req.body.ibixvisa_fees;
    // }
    // if (req.body.validity_period != null) {
    //     res.visa.validity_period = req.body.validity_period;
    // }
    // if (req.body.entry_type != null) {
    //     res.visa.entry_type = req.body.entry_type;
    // }
    // if (req.body.documents_required != null) {
    //     res.visa.documents_required = req.body.documents_required;
    // }

    try {
        updates.forEach((update) => {
            res.visa[update] = req.body[update];
        });
        await res.visa.save();

        res.json(res.visa);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// DELETE | /api/visa/post/delete-post/:id | Private | delete a post
router.delete('/:id', getVisa, async (req, res) => {
    try {

        await res.visa.deleteOne();
        res.status(200).json({
            message: 'Visa detail deleted',
            success: true
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: err.message,
            success: false
        })
    }
})

// Delete all visa details
router.delete('/', async (req, res) => {
    try {
        await countryVisa.deleteMany({});
        res.status(200).json({
            message: 'All visa details deleted',
            success: true
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message,
            success: false
        });
    }
});
module.exports = router