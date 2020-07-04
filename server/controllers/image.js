const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: '4e83808e62f7413e8ef5649e049e7f6a'
});


const imageUrlApiCall = (req, res) => {
    const { input } = req.body;
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json({error:'unable to work with api'}))
}

const image = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}
module.exports = {
    image,
    imageUrlApiCall
}