use("sigmadb")

console.log(db)

// db.createCollection("managers")

// db.managers.insertOne({
//     "name": "Shubham",
//     "salary":60000,
//     "LovesProgramming": true,
//     "prog_lang": ["Python","C","Java"],
//     "projects": 45
// })

// db.managers.insertOne({
//     "name": "Debosmita",
//     "salary":70000,
//     "LovesProgramming": true,
//     "prog_lang": ["Python","C","Java","Ruby"],
//     "projects": 56
// })

// db.managers.insertMany([
//         {
//             "name": "Shubham",
//             "salary": 60000,
//             "LovesProgramming": true,
//             "prog_lang": ["Python", "C", "Java"],
//             "projects": 45
//         },
//         {
//             "name": "Anjali",
//             "salary": 72000,
//             "LovesProgramming": true,
//             "prog_lang": ["JavaScript", "Python"],
//             "projects": 38
//         },
//         {
//             "name": "Rahul",
//             "salary": 65000,
//             "LovesProgramming": false,
//             "prog_lang": ["C++", "Java"],
//             "projects": 50
//         },
//         {
//             "name": "Priya",
//             "salary": 59000,
//             "LovesProgramming": true,
//             "prog_lang": ["Python", "R"],
//             "projects": 60
//         },
//         {
//             "name": "Arjun",
//             "salary": 81000,
//             "LovesProgramming": true,
//             "prog_lang": ["Go", "JavaScript"],
//             "projects": 42
//         },
//         {
//             "name": "Kavya",
//             "salary": 73000,
//             "LovesProgramming": false,
//             "prog_lang": ["Java", "C#", "Python"],
//             "projects": 29
//         },
//         {
//             "name": "Deepak",
//             "salary": 50000,
//             "LovesProgramming": true,
//             "prog_lang": ["Ruby", "Perl"],
//             "projects": 33
//         },
//         {
//             "name": "Sakshi",
//             "salary": 62000,
//             "LovesProgramming": true,
//             "prog_lang": ["PHP", "JavaScript"],
//             "projects": 45
//         },
//         {
//             "name": "Vikram",
//             "salary": 55000,
//             "LovesProgramming": false,
//             "prog_lang": ["C++", "Python"],
//             "projects": 27
//         },
//         {
//             "name": "Ritu",
//             "salary": 88000,
//             "LovesProgramming": true,
//             "prog_lang": ["Swift", "Kotlin"],
//             "projects": 55
//         },
//         {
//             "name": "Nikhil",
//             "salary": 63000,
//             "LovesProgramming": true,
//             "prog_lang": ["C", "Java"],
//             "projects": 48
//         },
//         {
//             "name": "Sneha",
//             "salary": 54000,
//             "LovesProgramming": false,
//             "prog_lang": ["Python", "JavaScript"],
//             "projects": 36
//         },
//         {
//             "name": "Amit",
//             "salary": 70000,
//             "LovesProgramming": true,
//             "prog_lang": ["C#", "F#"],
//             "projects": 41
//         },
//         {
//             "name": "Neha",
//             "salary": 75000,
//             "LovesProgramming": true,
//             "prog_lang": ["Python", "Julia"],
//             "projects": 34
//         },
//         {
//             "name": "Rohan",
//             "salary": 67000,
//             "LovesProgramming": false,
//             "prog_lang": ["Java", "Scala"],
//             "projects": 49
//         },
//         {
//             "name": "Ishita",
//             "salary": 56000,
//             "LovesProgramming": true,
//             "prog_lang": ["Python", "C++"],
//             "projects": 39
//         },
//         {
//             "name": "Manish",
//             "salary": 78000,
//             "LovesProgramming": true,
//             "prog_lang": ["Ruby", "JavaScript"],
//             "projects": 31
//         },
//         {
//             "name": "Swati",
//             "salary": 60000,
//             "LovesProgramming": false,
//             "prog_lang": ["PHP", "Python"],
//             "projects": 22
//         },
//         {
//             "name": "Akash",
//             "salary": 83000,
//             "LovesProgramming": true,
//             "prog_lang": ["Rust", "C++"],
//             "projects": 53
//         },
//         {
//             "name": "Meera",
//             "salary": 66000,
//             "LovesProgramming": true,
//             "prog_lang": ["Python", "JavaScript"],
//             "projects": 40
//         }

// ])

// const cursor = db.managers.find({})
// console.log(cursor)

// const cursor = db.managers.find({salary:60000})



// console.log(cursor)

// const cur2 = db.managers.find({salary:{$gte: 60000},
//     LovesProgramming:true})

const cur3 = db.managers.find({
    $or: [
        {
            salary: { $gt: 70000 }
        },
        {
            LovesProgramming: true
        }
    ]
}).projection({ name: true, salary: true })
console.log(cur3)

// db.managers.find({salary:{$gte: 80000},LovesProgramming:true})

// db.managers.find({prog_lang :"Python"})


// db.createCollection("inventory")


// db.inventory.find({tags:  ["red","blank"]})

let inventoryRec = db.getCollection("inventory").find({ tags: { $all: ["red", "blank"] } }).projection({ item: 1, tags: 1 })
console.log(inventoryRec.count())
console.log(inventoryRec.toArray())
// db.inventory.find()

// db.getCollection("inventory").find({tags: "red"})

// db.inventory.insertMany([
//     {
//       "item": "journal",
//       "qty": 25,
//       "tags": ["blank", "red"],
//       "dim_cm": [14, 21]
//     },
//     {
//       "item": "notebook",
//       "qty": 50,
//       "tags": ["lined", "blue"],
//       "dim_cm": [18, 24]
//     },
//     {
//       "item": "diary",
//       "qty": 30,
//       "tags": ["ruled", "green"],
//       "dim_cm": [13, 19]
//     },
//     {
//       "item": "planner",
//       "qty": 15,
//       "tags": ["dated", "black"],
//       "dim_cm": [16, 22]
//     },
//     {
//       "item": "sketchbook",
//       "qty": 20,
//       "tags": ["blank", "white"],
//       "dim_cm": [20, 25]
//     },
//     {
//       "item": "ledger",
//       "qty": 10,
//       "tags": ["lined", "yellow"],
//       "dim_cm": [21, 29]
//     },
//     {
//       "item": "notepad",
//       "qty": 45,
//       "tags": ["dotted", "purple"],
//       "dim_cm": [12, 18]
//     },
//     {
//       "item": "scrapbook",
//       "qty": 5,
//       "tags": ["blank", "orange"],
//       "dim_cm": [23, 28]
//     },
//     {
//       "item": "composition book",
//       "qty": 60,
//       "tags": ["ruled", "pink"],
//       "dim_cm": [19, 24]
//     },
//     {
//       "item": "logbook",
//       "qty": 40,
//       "tags": ["gridded", "cyan"],
//       "dim_cm": [15, 20]
//     },
//     {
//       "item": "recipe book",
//       "qty": 35,
//       "tags": ["lined", "cream"],
//       "dim_cm": [17, 22]
//     },
//     {
//       "item": "guestbook",
//       "qty": 25,
//       "tags": ["blank", "maroon"],
//       "dim_cm": [16, 21]
//     },
//     {
//       "item": "project book",
//       "qty": 30,
//       "tags": ["dotted", "brown"],
//       "dim_cm": [18, 23]
//     },
//     {
//       "item": "field book",
//       "qty": 12,
//       "tags": ["ruled", "navy"],
//       "dim_cm": [20, 27]
//     },
//     {
//       "item": "travel journal",
//       "qty": 50,
//       "tags": ["blank", "teal"],
//       "dim_cm": [14, 20]
//     },
//     {
//       "item": "science notebook",
//       "qty": 35,
//       "tags": ["gridded", "blue"],
//       "dim_cm": [22, 29]
//     },
//     {
//       "item": "meeting notes",
//       "qty": 25,
//       "tags": ["lined", "gray"],
//       "dim_cm": [15, 22]
//     },
//     {
//       "item": "garden journal",
//       "qty": 40,
//       "tags": ["dotted", "green"],
//       "dim_cm": [18, 24]
//     },
//     {
//       "item": "expense tracker",
//       "qty": 20,
//       "tags": ["lined", "red"],
//       "dim_cm": [16, 21]
//     },
//     {
//       "item": "art journal",
//       "qty": 10,
//       "tags": ["blank", "purple"],
//       "dim_cm": [21, 30]
//     }
//   ]
//   )

// db.managers.updateOne({
//     _id: ObjectId('668abc1288ccb3e3fd928534')},{$set: {salary: 90000}})

// db.managers.find({ _id: ObjectId('668abc1288ccb3e3fd928534')})


// db.managers.updateMany({salary: 30000},{$set: {salary: 100000,projects:58}})

// db.managers.insertMany([
//     {
//         name: "Vrinda",
//         salary: 90000,
//         prog_lang: ["Python", "C", "Ruby", "Java", "Javascript"],
//         frameworksKnown: {
//             JavaScript: ["React", "Angular", "Vue"],
//             Python: ["Django", "Flask", "Bootstrap", "Tailwind CSS"]
//         }
//     },
//     {
//         name: "Shaarav",
//         salary: 78000,
//         prog_lang: ["Python", "C", "Ruby", "Javascript"],
//         frameworksKnown: {
//             JavaScript: ["React", "Angular", "Nuxt"],
//             Python: ["Django", "Flask", "Tailwind CSS"]
//         },
//     },
//     {
//         name: "Arnav Kumar",
//         salary: 76000,
//         prog_lang: ["Python", "C", "Ruby", "Rust", "Scala"],
//         frameworksKnown: {
//             JavaScript: ["React", "Angular"],
//             Python: ["Django", "Flask", "Tailwind CSS", "Express"]
//         },
//     },

//     {
//         name: "Jayesh Yadav",
//         salary: 60000,
//         prog_lang: ["Python", "C", "Ruby", "Rust", "Scala"],
//         frameworksKnown: {
//             JavaScript: ["React", "Angular", "Vue"],
//             Python: ["Django", "Flask", "Bootstrap", "Tailwind CSS", "Sails"]
//         },
//     },
// ])

// db.managers.find({salary: 78000})

// db.managers.findOne({salary: 90000})

// db.inventory.insertMany([
//     {
//         item: 'journal',
//         qty: 25,
//         size: { h: 14, w: 21, uom: 'cm' },
//         status: 'A'
//       },
//       {
//         item: 'notebook',
//         qty: 50,
//         size: { h: 8.5, w: 11, uom: 'in' },
//         status: 'A'
//       },
//       {
//         item: 'paper',
//         qty: 100,
//         size: { h: 8.5, w: 11, uom: 'in' },
//         status: 'D'
//       },
//       {
//         item: 'planner',
//         qty: 75,
//         size: { h: 22.85, w: 30, uom: 'cm' },
//         status: 'D'
//       },
//       {
//         item: 'postcard',
//         qty: 45,
//         size: { h: 10, w: 15.25, uom: 'cm' },
//         status: 'A'
//       }
// ])

// db.inventory.find({"size.uom" : "in"})


// db.inventory.find({"size.h": {$lt: 15}})

// db.getCollection("inventory").find({
//     "size.h": {$lte: 15}
// })

db.getCollection("inventory").find({
    "size.h": {$lt: 15},
    "size.uom" : "in",
    status: "D"
})

db.getCollection("inventory").updateMany({"size.h": {$lt: 15}},{$set:
    {"size.h": 27}
})

db.getCollection("inventory").deleteMany({"size.w": {$gte: 30 }})

// db.getCollection("inventory").deleteMany({tags: ["ruled","navy"]})

// db.getCollection("inventory").deleteMany({
//     tags : ["blank","red"]
// })

// db.getCollection("inventory").deleteMany({
//     tags : {$all: ["blank","red"]}
// })

db.getCollection("inventory").deleteMany({qty: {$gte: 40}})
