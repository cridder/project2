const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const dbInit = require("./config/dbInit");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// initialize the database if it doesn't exist
dbInit();
const app = express();
//setup port for local or heroku operation
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
	// secret: "Super secret secret",
	secret: process.env.COOKIE_SECRET,
	cookie: {
		maxAge: 86400000,
		httpOnly: true,
		secure: false,
		sameSite: "strict",
	},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
	app.listen(process.env.APP_PORT, () => console.log("Now listening"));
});
