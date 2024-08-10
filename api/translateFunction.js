const { translate } = require('./translate');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const { text, source_lang, target_lang } = req.body;

    try {
        const result = await translate(text, source_lang, target_lang);
        const responseData = {
            alternatives: result.alternatives,
            code: 200,
            data: result.text, // Take the first translation result
            id: Math.floor(Math.random() * 10000000000), // Generate a random ID
            method: 'Free',
            source_lang,
            target_lang,
        };

        res.json(responseData);
    } catch (error) {
        res.status(500).json({ error: 'Translation failed' });
    }
};