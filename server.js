//require express for running as service
const express = require("express");
const session = require("express-session");
//offload routes to controllers directory reference
const routes = require("./controllers");
//include handlebars for templating
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
//specify db connection for orm
const sequelize = require("./config/connection");
//init session state
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require("path");

const app = express();
//setup port for local or heroku operation
const PORT = process.env.PORT || 3001;

//setup session object
const sess = {
	secret: "14-mvc-secret",
	cookie: { maxAge: 86400000 },
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

//point express to the session object
app.use(session(sess));

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });
// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//enable POST handling in express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
	app.listen(process.env.PORT, () => console.log("Now listening"));
});
