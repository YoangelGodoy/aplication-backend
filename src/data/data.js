export const data = {
    users: [
        {
          id: "1",
          name: "yoangel",
          lastname: "godoy",
          email: "yg@example.com",
          password: "1245",
          phone: "444-555-6666",
        },
        {
          id: "2",
          name: "Manager User",
          lastname: "chacon",
          email: "manager@example.com",
          password: "managerpass",
          phone: "444-555-6666",
        },
        {
          id: "3",
          name: "Employee User",
          lastname: "lopez",
          email: "employee@example.com",
          password: "employeepass",
          phone: "777-888-9999",
        }
      ],
      towTrucks: [
        {
            id: "1",
            modelo: "cheyenne",
            marca: "chevrolet",
            año: "2020",
            tipo: "gancho",
            status: "activa"
        },
        {
            id: "2",
            modelo: "350",
            marca: "ford",
            año: "2019",
            tipo: "plataforma",
            status: "activa"
        },
        {
            id: "3",
            modelo: "350",
            marca: "ford",
            año: "2021",
            tipo: "gancho",
            status: "inactiva"
        }
      ],
      drivers: [
        { id: "1", 
          name: "Juan", 
          lastname: "Pérez", 
          phone: "123456789", 
          municipio: "Municipio A", 
          status: "activo" 
        },
        { id: "2", 
          name: "María", 
          lastname: "Gómez", 
          phone: "987654321", 
          municipio: "Municipio B", 
          status: "inactivo" 
        },
    ],
};


export const findUserByEmail = (email) => { return data.users.find(user => user.email === email); };