//Get All Users - PowerBI
app.get("/users", async (req, res) => {
    var users = [];
    const snapshot = await db.collection("users").get();
    snapshot.forEach(doc => {
      users.push(doc.data());
    });
    return res.status(200).send(users);
  });
  
  //Get All Clients - PowerBI
  app.get("/clients", async (req, res) => {
    var clients = [];
    const snapshot = await db.collection("clients").get();
    snapshot.forEach(doc => {
      clients.push(doc.data());
    });
    return res.status(200).send(clients);
  });
  
  //Get All Students - PowerBI
  app.get("/students", async (req, res) => {
    var students = [];
    const snapshot = await db.collection("students").get();
    snapshot.forEach(doc => {
      students.push(doc.data());
    });
    return res.status(200).send(students);
  });
  
  //Get All Vetted - PowerBI
  app.get("/vetted", async (req, res) => {
    var vetted = [];
    const snapshot = await db.collection("vetted").get();
    snapshot.forEach(doc => {
      vetted.push(doc.data());
    });
    return res.status(200).send(vetted);
  });
  
  //Get All Jobs - PowerBI
  app.get("/jobs", async (req, res) => {
    var jobs = [];
    const snapshot = await db.collection("jobs").get();
    snapshot.forEach(doc => {
      jobs.push(doc.data());
    });
    return res.status(200).send(jobs);
  });
  
  //Get All Micros - PowerBI
  app.get("/micros", async (req, res) => {
    var micros = [];
    const snapshot = await db.collection("micros").get();
    snapshot.forEach(doc => {
      micros.push(doc.data());
    });
    return res.status(200).send(micros);
  });
  
  //Get All Skills - PowerBI
  app.get("/skills", async (req, res) => {
    var skills = [];
    const snapshot = await db.collection("skills").get();
    snapshot.forEach(doc => {
      skills.push(doc.data());
    });
    return res.status(200).send(skills);
  });
  
  //Get All Payments - PowerBI
  app.get("/payments", async (req, res) => {
    var payments = [];
    const snapshot = await db.collection("payments").get();
    snapshot.forEach(doc => {
      payments.push(doc.data());
    });
    return res.status(200).send(payments);
  });
  
  //Get All Applications - PowerBI
  app.get("/applications", async (req, res) => {
    var applications = [];
    const snapshot = await db.collection("applications").get();
    snapshot.forEach(doc => {
      applications.push(doc.data());
    });
    return res.status(200).send(applications);
  });
  
  //Get All Support - PowerBI
  app.get("/support", async (req, res) => {
    var support = [];
    const snapshot = await db.collection("support").get();
    snapshot.forEach(doc => {
      support.push(doc.data());
    });
    return res.status(200).send(support);
  });
  
  //Get All Feedback - PowerBI
  app.get("/feedback", async (req, res) => {
    var feedback = [];
    const snapshot = await db.collection("feedback").get();
    snapshot.forEach(doc => {
      feedback.push(doc.data());
    });
    return res.status(200).send(feedback);
  });
  
  //Get All StudentRatings - PowerBI
  app.get("/studentRatings", async (req, res) => {
    var studentRatings = [];
    const snapshot = await db.collection("studentRatings").get();
    snapshot.forEach(doc => {
      studentRatings.push(doc.data());
    });
    return res.status(200).send(studentRatings);
  });
  
  //Get All ClientRatings - PowerBI
  app.get("/clientRatings", async (req, res) => {
    var clientRatings = [];
    const snapshot = await db.collection("clientRatings").get();
    snapshot.forEach(doc => {
      clientRatings.push(doc.data());
    });
    return res.status(200).send(clientRatings);
  });
  
  //Get All Communication - PowerBI
  app.get("/communication", async (req, res) => {
    var communication = [];
    const snapshot = await db.collection("communication").get();
    snapshot.forEach(doc => {
      communication.push(doc.data());
    });
    return res.status(200).send(communication);
  });
  
  //Get All ProblemSolving - PowerBI
  app.get("/problemSolving", async (req, res) => {
    var problemSolving = [];
    const snapshot = await db.collection("problemSolving").get();
    snapshot.forEach(doc => {
      problemSolving.push(doc.data());
    });
    return res.status(200).send(problemSolving);
  });
  
  //Get All Leadership - PowerBI
  app.get("/leadership", async (req, res) => {
    var leadership = [];
    const snapshot = await db.collection("leadership").get();
    snapshot.forEach(doc => {
      leadership.push(doc.data());
    });
    return res.status(200).send(leadership);
  });
  
  //Get All Organisation - PowerBI
  app.get("/organisation", async (req, res) => {
    var organisation = [];
    const snapshot = await db.collection("organisation").get();
    snapshot.forEach(doc => {
      organisation.push(doc.data());
    });
    return res.status(200).send(organisation);
  });
  
  //Get All Cancel - PowerBI
  app.get("/cancel", async (req, res) => {
    var cancel = [];
    const snapshot = await db.collection("cancel").get();
    snapshot.forEach(doc => {
      cancel.push(doc.data());
    });
    return res.status(200).send(cancel);
  });
  
  //Get All Incomplete - PowerBI
  app.get("/incomplete", async (req, res) => {
    var incomplete = [];
    const snapshot = await db.collection("incomplete").get();
    snapshot.forEach(doc => {
      incomplete.push(doc.data());
    });
    return res.status(200).send(incomplete);
  });
  
  //Get All Dissatisfied - PowerBI
  app.get("/dissatisfied", async (req, res) => {
    var dissatisfied = [];
    const snapshot = await db.collection("dissatisfied").get();
    snapshot.forEach(doc => {
      dissatisfied.push(doc.data());
    });
    return res.status(200).send(dissatisfied);
  });
  
  //Get All Errors - PowerBI
  app.get("/errors", async (req, res) => {
    var errors = [];
    const snapshot = await db.collection("errors").get();
    snapshot.forEach(doc => {
      errors.push(doc.data());
    });
    return res.status(200).send(errors);
  });
  
  //Get All Netcash - PowerBI
  app.get("/netcash", async (req, res) => {
    var netcash = [];
    const snapshot = await db.collection("netcash").get();
    snapshot.forEach(doc => {
      netcash.push(doc.data());
    });
    return res.status(200).send(netcash);
  });