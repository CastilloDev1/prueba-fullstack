db = db.getSiblingDB('usuarios_db');

db.users.insertMany([
  { _id: "u1", name: "Andres", email: "andres@test.com", role: "admin" },
  { _id: "u2", name: "Maria",  email: "maria@test.com",  role: "user"  }
]);