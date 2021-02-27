export const customers = [
  {
    id: "1",
    name: "أحمد كريم",
    phone: "66666666",
    address: "بغداد",
  },
  {
    id: "2",
    name: "ستار جابر",
    address: "كركوك",
    phone: "545454",
  },
  {
    id: "3",
    name: "مها سليم",
    address: "الموصل",
  },
  {
    id: "4",
    name: "محمود هادي",
    phone: "764623674",
    address: "البصرة",
  },
  {
    id: "5",
    name: "مروان سمير",
    address: "بغداد",
  },
  {
    id: "6",
    name: "شاكر نعمان",
    address: "بغداد",
  },
  {
    id: "7",
    name: "سلمان جابر",
    address: "الموصل",
  },
  {
    id: "8",
    name: "ندى حسن",
    address: "بابل",
  },
  {
    id: "9",
    name: "عدنان أحمد",
    address: "بغداد",
  },
];

export function getCustomers() {
  return customers;
}

export function getCustomer(id) {
  return customers.find((c) => c.id === id);
}

export function saveCustomer(customer) {
  const customerInDb = customers.find((c) => c.id === customer.id) || {};

  customerInDb.name = customer.name;
  customerInDb.phone = customer.phone;
  customerInDb.address = customer.address;

  if (!customer.id) {
    customerInDb.id = Date.now().toString();
    customers.push(customerInDb);
  }

  return customerInDb;
}

export function deleteCustomer(id) {
  const customerInDb = customers.find((c) => c.id === id);
  customers.splice(customers.indexOf(customerInDb), 1);

  return customerInDb;
}
