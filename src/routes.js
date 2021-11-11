const router = require('express').Router()
let quotesDB = require('./data/data')

// GET

// ALL QUOTES
router.get('/quotes', (req, res) => {
    res.status(200).json(quotesDB)
})

// BY ID
router.get('/quotes/id/:id', (req, res) => {
    const quote = quotesDB.find((quote) => quote.id === Number(req.params.id))

    if (!quote) {
        return res.status(404).json({ error: 'QUOTE NOT FOUND' })
    }

    return res.status(200).json({ quote })
})

// BY PERSON
router.get('/quotes/person/:person', (req, res) => {

    let search_person = req.params.person

    // capitalizes the first letter of persons name to match in database
    search_person = search_person[0].toUpperCase()

    // check if person is in database
    let peopleinQuotes = quotesDB.filter((quote) => {
        if (quote.person.includes(search_person)) {
            return quote
        }
    })
    res.status(200).json(peopleinQuotes)
})

// TOTAL NUMBER OF QUOTES
router.get('/quotes/total', (req, res) => {
    const total = quotesDB.length
    return res.status(200).json(`Total number of quotes: ${total}`)
})

// RANDOM QUOTE
router.get('/quotes/random', (req, res) => {
    const random = quotesDB[Math.floor(Math.random() * quotesDB.length)]

    res.status(200).json({ quote })
})

// POST
router.post('/quotes', (req, res) => {

    let num = Object.keys(quotesDB).length

    // if ID already exists
    if (quotesDB.find((quote) =>
        Number(quote.id) === Number(req.body.id)
    )) {
        return res.status(404).json({ error: "ID ALREADY EXISTS" })
    }

    // if quote info is empty
    if (!req.body.quote || !req.body.person) {
        return res.status(404).json({ error: 'QUOTE AND PERSON CANNOT BE EMPTY' })
    }

    quotesDB.push({
        id: req.body.id || ++num,
        quote: req.body.quote,
        person: req.body.person
    })

    return res.status(201).json(`QUOTE HAS BEEN ADDED\n id:${req.body.id} quote: ${req.body.quote} person:${req.body.person}`)

})

// PATCH
router.patch('/quotes/id/:id', (req, res) => {
    const quote_id = req.params.id
    const quote_update = req.body

    let target_quote = quotesDB.find((quote) => quote.id === Number(req.params.id))

    // if quote id does not exist
    if (!target_quote) {
        return res.status(404).json(`QUOTE WITH ID ${req.params.id} DOES NOT EXIST`)
    }
    // if user tries to update id
    if (Object.keys(quote_update).includes('id')) {
        return res.status(405).json(`IT IS NOT ALLOWED TO UPDATE ID`)
    }
    // if quote and person are empty
    if (!quote_update.quote || quote_update.person) {
        return res.status(404).json(`QUOTE AND PERSON CANNOT BE EMPTY`)
    }

    // update in database
    quotesDB[target_quote] = { ...quotesDB[target_quote], ...quote_update }


    return res.status(200).json(`QUOTE SUCCESSFULLY UPDATED\n quote: ${quotesDB[target_quote]}`)
})


// DELETE

router.delete('/quotes/id/:id', (req, res) => {
    const quote = quotesDB.filter((quote) => {
        Number(quote.id) === Number(req.params.id)
    })

    if (!quote) {
        return res.status(404).json(`NO QUOTE WITH ID OF ${req.params.id}`)
    }

    const newQuotes = people.filter((person) => person.id !== Number(req.params.id))

    quotesDB = newQuotes

    return res.status(200).json(`DELETED`)
})

module.exports = router