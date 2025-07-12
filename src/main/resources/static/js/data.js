// Mock Employee Data
let employees = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@company.com",
        department: "Engineering",
        role: "Senior Developer"
    },
    {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@company.com",
        department: "Marketing",
        role: "Marketing Manager"
    },
    {
        id: 3,
        firstName: "Mike",
        lastName: "Johnson",
        email: "mike.johnson@company.com",
        department: "Sales",
        role: "Sales Representative"
    },
    {
        id: 4,
        firstName: "Alice",
        lastName: "Williams",
        email: "alice.williams@company.com",
        department: "HR",
        role: "Manager"
    },
    {
        id: 5,
        firstName: "Bob",
        lastName: "Brown",
        email: "bob.brown@company.com",
        department: "IT",
        role: "Developer"
    },
    {
        id: 6,
        firstName: "Charlie",
        lastName: "Lee",
        email: "charlie.lee@company.com",
        department: "Finance",
        role: "Analyst"
    },
    {
        id: 7,
        firstName: "Diana",
        lastName: "Davis",
        email: "diana.davis@company.com",
        department: "Engineering",
        role: "Developer"
    },
    {
        id: 8,
        firstName: "Edward",
        lastName: "Wilson",
        email: "edward.wilson@company.com",
        department: "Marketing",
        role: "Specialist"
    },
    {
        id: 9,
        firstName: "Fiona",
        lastName: "Garcia",
        email: "fiona.garcia@company.com",
        department: "Sales",
        role: "Manager"
    },
    {
        id: 10,
        firstName: "George",
        lastName: "Martinez",
        email: "george.martinez@company.com",
        department: "HR",
        role: "Coordinator"
    }
];

// Get next available ID
function getNextId() {
    return Math.max(...employees.map(emp => emp.id)) + 1;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { employees, getNextId };
}