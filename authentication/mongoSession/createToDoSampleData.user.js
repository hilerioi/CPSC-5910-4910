db = db.getSiblingDB('toDoSample')
db.createCollection('users')
usersCollection = db.getCollection("users")
usersCollection.remove({})
usersCollection.insert(
{
	fName: 'User',
	lName: '1',
	username: 'user1',
	email: 'israelhilerio@hotmail.com',
	extra: 'hotmail info',
	hashed_pwd: 'n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg='
}
)
usersCollection.insert(
{
	fName: 'User',
	lName: '2',
	username: 'user2',
	email: 'israel_hilerio@msn.com',
	extra: 'msn info',
	hashed_pwd: 'n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg='
}
)
usersCollection.insert(
{
	fName: 'User',
	lName: '3',
	username: 'user3',
	email: 'hilerioi@seattleu.edu',
	extra: 'school info',
	hashed_pwd: 'n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg='
}
)

user1 = usersCollection.findOne({username: 'user1'})
user1Id = user1._id.valueOf();
user2 = usersCollection.findOne({username: 'user2'})
user2Id = user2._id.valueOf();
user3 = usersCollection.findOne({username: 'user3'})
user3Id = user3._id.valueOf();

db.createCollection('lists')
listsCollection = db.getCollection("lists")
listsCollection.remove({})
listsCollection.insert(
{
	  name: "Grocery List",
	  description: "Grocery List for home.",
	  listId: '1',
	  due: "04-27-2015",
	  state: "A",
	  owner: user1Id
}
)
listsCollection.insert(
{
	  name: "Car Shopping List",
	  description: "Cars I need to try before buying a car.",
	  listId: '2',
	  due: "05-27-2015",
	  state: "A",
	  owner: user2Id
}
)
listsCollection.insert(
{
	  name: "School Supply List",
	  description: "Supply list for school classes.",
	  listId: '3',
	  due: "08-27-2015",
	  state: "A",
	  owner: user3Id
}
)
db.createCollection('tasks')
tasksCollection = db.getCollection("tasks")
tasksCollection.remove({})
tasksCollection.insert(
{
	listId : '1',
	owner: user1Id,
	tasks : [
	 {
	  description: "Pick up 2 cans of tomato",
	  taskId: '1',
	  shared: "N",
	  status: "I"
	 },
	 {
	  description: "Pick up 2 onions",
	  taskId: '2',
	  shared: "N",
	  status: "I"
	 },
	 {
	  description: "Pick up 1 box of spagetti",
	  taskId: '3',
	  shared: "N",
	  status: "I"
	 },
	 {
	  description: "Pick up 1 (3 litter) Coke",
	  taskId: '4',
	  shared: "N",
	  status: "I"
	 },
	 {
	  description: "Cook recipe http://recipe.com/spagetti",
	  taskId: '5',
	  shared: "wife",
	  status: "I"
	 }
	]
}
)
tasksCollection.insert(
{
	listId : '2',
	owner: user2Id,
	tasks : [
	 {
	  description: "Test drive a Porsche Boxter",
	  taskId: '1',
	  shared: "N",
	  status: "I"
	 },
	 {
	  description: "To be gas consious, test drive a Tesla",
	  taskId: '2',
	  shared: "N",
	  status: "I"
	 },
	 {
	  description: "Ask your friend to give you a ride in his Lotus",
	  taskId: '3',
	  shared: "N",
	  status: "I"
	 },
	 {
	  description: "Ask to barrow the Mustang from my mom :-)",
	  taskId: '4',
	  shared: "N",
	  status: "I"
	 },
	 {
	  description: "Rent a Corvette",
	  taskId: '5',
	  shared: "N",
	  status: "I"
	 }
	]	
}
)
tasksCollection.insert(
{
	listId : '3',
	owner: user3Id,
	tasks : [
	 {
	  description: "Pick drawing boards from friend",
	  taskId: '1',
	  shared: "N",
	  status: "I"
	 },
	 {
	  description: "Buy pencils, pens, and notebooks from Staples",
	  taskId: '2',
	  shared: "N",
	  status: "I"
	 },
	 {
	  description: "Go to the MS Store to buy a new Surface 3",
	  taskId: '3',
	  shared: "N",
	  status: "I"
	 },
	 {
	  description: "Pick up a printer at Frys",
	  taskId: '4',
	  shared: "N",
	  status: "I"
	 },
	 {
	  description: "Get a couple of XBox Games to relax",
	  taskId: '5',
	  shared: "N",
	  status: "I"
	 }
	]	
}
)