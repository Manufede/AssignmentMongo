var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mysq";
var prompt = require('prompt');
var readline = require('readline');



showMenu()

function showMenu() {
  prompt.start();
  console.log('Select your choice:\n1)Insert\n2)Remove\n3)Update\n4)Show\n5)Exit');
  prompt.get(["Choice"], function (err, result) {
    if (err) console.log('Sorry impossibile to connect to MongoDB. Errore:', err);
    switch (result.Choice) {
      case "1": insertData();
        break;
      case "2": deleteData();
        break;
      case "3": updateData();
        break;
      case "4": showData();
        break;
      case "5": exit();
        break;    
    }
  })
}

function insertData() {
  MongoClient.connect(url, function (err, db) {
    if (err) console.log('Sorry impossibile to connect to MongoDB. Errore:', err);

    var r1 = readline.createInterface(
      {
        input: process.stdin,
        output: process.stdout
      });

       
    r1.on('close', function () {
      
      console.log('What would you like to do? ');
      showMenu();
      //process.exit(0);
      
    });
    
      
    r1.question('Enter the smarthphone brand:', function (brand) {
      r1.question('Enter the model:', function (type) {

        db.collection('smartphone').insert({ 'brand': brand, 'type': type });
        console.log("Done");
       
        db.close();
        r1.close();
        
      });
    });

  });
}

function deleteData() {
  MongoClient.connect(url, function (err, db) {
    if (err) console.log('Sorry impossibile to connect to MongoDB. Errore:', err);

    var r1 = readline.createInterface(
      {
        input: process.stdin,
        output: process.stdout
      });
       
    r1.on('close', function () {

      console.log('What would you like to do? ');
      showMenu();
      //process.exit(0);
        });

    r1.question('Enter the smarthphone brand you want remove:', function (brand) {
      r1.question('Enter the model:', function (type) {

        db.collection('smartphone').deleteOne({ 'brand': brand, 'type': type });
        //var collection = db.collection('smartphone').find();
        console.log("Done");
        db.close();
        r1.close();

      });
    });
  });
}

function showData() {

  MongoClient.connect(url, function (err, db) {
    if (err) console.log('Sorry impossibile to connect to MongoDB. Errore:', err);

    var r1 = readline.createInterface(
      {
        input: process.stdin,
        output: process.stdout
      });


    r1.on('close', function () {
      console.log('What would you like to do? ');
      showMenu();
      //process.exit(0);
    });

    db.collection("smartphone").find({}, { _id: false }).limit(10).toArray(function (err, result) {
      if (err) console.log('Sorry impossibile to connect to MongoDB. Errore:', err);
      console.log(result);
      db.close();
      r1.close();
    });
  });
}

function updateData() {

  MongoClient.connect(url, function (err, db) {
    if (err) console.log('Sorry impossibile to connect to MongoDB. Errore:', err);
   
    var r1 = readline.createInterface(
      {
        input: process.stdin,
        output: process.stdout
      });

       r1.on('close', function () {
      console.log('What would you like to do? ');
      showMenu();
      //process.exit(0);
        });

r1.question('Enter the brand and model you want to change:', function (type) {
      r1.question('Enter the new model:', function (type1) {
        query='{"brand":"'+type.split(',')[0]+'","type":"'+type.split(',')[1]+'"}'
        //creating file jason 
        console.log(query);
        
        query1='{"brand":"'+type1.split(',')[0]+'","type":"'+type1.split(',')[1]+'"}'
        
        console.log(query1);
        db.collection('smartphone').update(JSON.parse(query),JSON.parse(query1))
        var collection = db.collection('smartphone').find();
        
        console.log("Done");
        db.close();
        r1.close();

      });
    });
  });
}

function exit() {

  MongoClient.connect(url, function (err, db) {
    if (err) console.log('Sorry impossibile to connect to MongoDB. Errore:', err);
   
    var r1 = readline.createInterface(
      {
        input: process.stdin,
        output: process.stdout
      });

       r1.on('close', function () {
      console.log('Goodbye!');
      process.exit(0);
        });
        
        db.close();
        r1.close();

      });
  
}
