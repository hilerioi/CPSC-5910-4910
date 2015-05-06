db = db.getSiblingDB('classSample')
collection = db.getCollection("newCollection")
collection.insert(
{
	vehicle: "camaro",
	speed: "120mph",
}
)
collection.insert(
{
	vehicle: "ferrari",
	speed: "180mph",
}
)
collection.insert(
{
	vehicle: "space shipt",
	speed: "500mph",
}
)