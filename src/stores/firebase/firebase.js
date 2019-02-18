import app from 'firebase/app'
import 'firebase/database'
import { observable, action, computed } from 'mobx'

const config = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DB_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_ID
}

class Firebase {
	@observable year = new Date().getFullYear()
	@observable month = new Date().getMonth() + 1
	@observable articles = []
	@observable books = []
	@observable videos = []

	constructor() {
		app.initializeApp(config)
		this.db = app.database()

		this.db
			.ref(`${this.year}/${this.month}/articles`)
			.on('value', this.setCollection('articles'))

		this.db
			.ref(`${this.year}/${this.month}/books`)
			.on('value', this.setCollection('books'))

		this.db
			.ref(`${this.year}/${this.month}/videos`)
			.on('value', this.setCollection('videos'))
	}

	// *** PUBLIC METHODS ***

	@action.bound
	setYear(year) {
		this.year = year
	}

	@action.bound
	setMonth(month) {
		this.month = month
	}

	@action.bound
	setCollection(collection) {
		return snapshot => {
			this[collection] = Object.values(snapshot.val())
		}
	}

	@action.bound
	addToCollection({ collection, title, description, date = Date.now() }) {
		const dateObj = new Date(date)
		const year = dateObj.getFullYear()
		const month = dateObj.getMonth() + 1

		console.log(collection, title, description)

		this.db.ref(`${year}/${month}/${collection}`).push({
			title,
			description,
			date: dateObj.getTime()
		})
	}

	// FIXME: convert to observable for easy management and clean code.
	getYears() {
		return this.db.ref('/')
	}

	getMonths() {
		return this.db.ref(`/${this.year}`)
	}
}

export default Firebase
