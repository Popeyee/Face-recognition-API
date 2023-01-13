const Clarifai = require ('clarifai');

const app = new Clarifai.App({
    apiKey: 'e54d48d21ca347c4b769cafc74abf683',
   });


const handleApiCall = (req, res) => {
    app.models
    .predict('53e1df302c079b3db8a0a36033ed2d15',req.body.input)
    .then(data => {
        console.log(data.outputs[0].data.regions[0].region_info.bounding_box)
        res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API'))

}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
 	.increment('entries', 1)
 	.returning('entries')
 	.then(entries => {
 		res.json(entries[0].entries);
 	})
 	.catch(err => res.status(400).json('Unable to get entries'))
  }

  module.exports = {
    handleImage,
    handleApiCall
  }