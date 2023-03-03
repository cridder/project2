// 
// requires
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

//  session requires
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//  app
const app = express();
const PORT = process.env.PORT || 3001;

// handlebars custom helpers
const hbs = exphbs.create({ helpers });

// session settings
const sess = {
	secret: "Zj&o*@*GjBbpvQssuwpcU%DSj@sDDJo7",
	cookie: {
		maxAge: 300000,
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

// use this template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

//  server port message start
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log("Now listening"));
});

