const router = require("./routers/router");

const exp = require("express");
const app = exp();
const cors = require("cors");
const path = require("path");

const PORT = process.PORT || 3031;

app.use(exp.urlencoded({ extended: true }));
app.use(exp.json());
app.use(cors());
app.use(exp.static(path.join(__dirname, "../carOwners/dist/carOwners")));

app.use("/api", router);

app.listen(PORT, () => console.log(`Server listened on port ${PORT}`));

app.use((req, res, next) => {
	next(createError(404));
});

app.get("/", (req, res) => {
	res.send("invalid endpoint");
});

app.get("*", (req, res) => {
	res.sendFile(
		path.join(__dirname, "../carOwners/dist/carOwners/", "index.html")
	);
});

app.use((err, req, res) => {
	console.error(`nedo error message: ${err.message}`);

	if (!err.statusCode) err.statusCode = 500;

	res.status(err.statusCode).send(err.message);
});
