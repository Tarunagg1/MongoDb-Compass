const router = require('express').Router();
const db = require('../config/db');


// Create collection
router.post('/', async (req, res) => {
    try {
        const collection = await db();
        const resp = await collection.insertOne({ uid: `T${new Date().getTime()}`, ...req.body });
        return res.status(201).json({ message: "user created", status: true, resp });
    } catch (error) {
        return res.status(400).json({ message: error.message, status: false });
    }
})


// Edit collection
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const collection = await db();
        const resp = await collection.updateOne({ uid: id }, { $set: req.body });
        return res.status(201).json({ message: "user data", status: true, resp });
    } catch (error) {
        return res.status(400).json({ message: error.message, status: false });
    }
})

// delete model
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const collection = await db();
        const resp = await collection.deleteOne({ uid: id });
        return res.status(201).json({ message: "user data deleted", status: true, resp });
    } catch (error) {
        return res.status(400).json({ message: error.message, status: false });
    }
})

// Import Csv
router.post('/imprtJson', async (req, res) => {
    try {
        const collection = await db();
        const resp = await collection.insertMany(req.body);
        return res.status(201).json({ message: "user created", status: true, resp });
    } catch (error) {
        return res.status(400).json({ message: error.message, status: false });
    }
})
// Import Json

router.post('/importCsv', async (req, res) => {
    let resultArr = [];
    fs.createReadStream('data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            // console.log(results);
            resultArr = results;
        });
    const collection = await db();
    const resp = await collection.insertMany(results);
    return res.status(201).json({ message: "user created", status: true, resp });
})



// get Database

router.get('/', async (req, res) => {
    try {
        const collection = await db();
        const resp = await collection.find({}).toArray();
        return res.status(200).json({ message: "user data", status: true, resp });
    } catch (error) {
        return res.status(400).json({ message: error.message, status: false });
    }
})


module.exports = router;