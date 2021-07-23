const express = require('express')
const app = express()
const fs = require('fs')

app.set('view engine', 'pug')

const DB = './data/notes.json' 

// dev process
app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.render('home')
})

app.get('/create', (req, res) => {
	res.render('create')
})

app.post('/create', (req, res) => {
	const title = req.body.title
	const desc = req.body.desc
	const title = req.body.email

	if (title.trim() !== '' && desc.trim() !== '' && email.trim() !== '') {
		
		fs.readFile(DB, (err, data) => {
			if (err) throw err

			const notes = JSON.parse(data)

			notes.push({
				id: id(),
				title: title,
				description: desc,
				email: email,
			})

			fs.writeFile(DB, JSON.stringify(notes), err => {
				if (err) throw err

				res.render('create', { success: true })
			})

		})

	} else {
		res.render('create', { error: true })
	}	
})


app.get('/notes', (req, res) => {

	fs.readFile(DB, (err, data) => {
		if (err) throw err

		const notes = JSON.parse(data)

		res.render('notes', { noteList: notes })
	})
})

app.get('/notes/:id', (req, res) => {

	const id = req.params.id

	fs.readFile(DB, (err, data) => {
		if (err) throw err

		const notes = JSON.parse(data)

		const note = notes.filter(note => note.id == id)[0]
	
        res.render('detail', { noteDetail: note })

		
	})
})

app.listen(8000, err => {
	if(err) throw err

	console.log('App is running on port 8000...')
})


function id () {
  return '_' + Math.random().toString(36).substr(2, 9);
}