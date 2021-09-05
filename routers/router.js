const { Router } = require("express");
const router = Router();
const fs = require("fs");
const path = require("path");

router.route("/").get((req, res) => {
	fs.readFile(
		path.join(__dirname, "../dataStorage/ownerData.json"),

		(err, buffer) => {
			if (err) {
				console.log(err);
				throw err;
			}

			if (buffer.length) {
				res.send(JSON.parse(buffer));
			}

			res.end();
		}
	);
});

router
	.route("/add")
	.get((req, res) => {
		res.status(200).send({ status: "Ok" });
	})
	.post((req, res) => {
		fs.readFile(
			path.join(__dirname, "../dataStorage/ownerData.json"),
			(err, data) => {
				if (err) {
					console.log(err);
					throw err;
				}

				if (data.length) {
					const dataJson = JSON.parse(data);
					dataJson.push(req.body);

					fs.writeFile(
						path.join(__dirname, "../dataStorage/ownerData.json"),
						JSON.stringify(dataJson),
						"utf8",
						(err) => {
							if (err) {
								console.log(err);
								throw err;
							}
						}
					);

					res.end();
				} else {
					const owner = [];
					owner.push(req.body);

					fs.appendFile(
						path.join(__dirname, "../dataStorage/ownerData.json"),
						JSON.stringify(owner),
						(err) => {
							if (err) {
								console.log(err);
								throw err;
							}

							res.send(owner);
						}
					);
				}
			}
		);
	});

router.route("/edit/:id").put((req, res) => {
	const { id } = req.params;

	const owner = req.body;

	fs.readFile(
		path.join(__dirname, "../dataStorage/ownerData.json"),
		(err, buffer) => {
			if (err) throw err;

			const owners = JSON.parse(buffer);
			let pos;

			owners.forEach((owner, idx) => {
				if (owner.id === id) {
					pos = idx;
				}
			});

			console.log(id === owners[pos].id);

			if (id === owners[pos].id) {
				owners[pos] = owner;
			}

			console.log(owner);

			fs.writeFile(
				path.join(__dirname, "../dataStorage/ownerData.json"),
				JSON.stringify(owners),
				(err) => {
					if (err) throw err;
				}
			);

			res.send(owners);
		}
	);
});

router.route("/delete/:id").delete((req, res) => {
	const { id } = req.params;

	fs.readFile(
		path.join(__dirname, "../dataStorage/ownerData.json"),

		(err, buffer) => {
			if (err) {
				console.log(err);
				throw err;
			}

			if (buffer.length) {
				const owner = JSON.parse(buffer);

				console.log(id);

				const newOwner = owner.filter((item) => item.id !== id);

				console.log(newOwner);

				fs.writeFile(
					path.join(__dirname, "../dataStorage/ownerData.json"),
					JSON.stringify(newOwner),
					(err) => {
						if (err) throw err;
					}
				);

				res.send(newOwner);
			}

			res.end();
		}
	);
});

module.exports = router;
