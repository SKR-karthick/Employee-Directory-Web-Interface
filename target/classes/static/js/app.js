/**
 * Employee Directory Application
 * Handles all UI interactions, data management, and business logic
 */

class EmployeeDirectory {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.filteredEmployees = [...employees];
        this.currentSort = '';
        this.isEditMode = false;
        this.currentEmployeeId = null;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderEmployees();
        this.updatePagination();
    }

    bindEvents() {
        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchEmployees(e.target.value);
        });

        // Filter sidebar - Note: No closeSidebar button in current HTML, so we'll handle it differently
        document.getElementById('filterBtn').addEventListener('click', () => {
            this.toggleFilterSidebar();
        });

        document.getElementById('applyFilter').addEventListener('click', () => {
            this.applyFilters();
        });

        document.getElementById('resetFilter').addEventListener('click', () => {
            this.resetFilters();
        });

        // Sorting
        document.getElementById('sortBy').addEventListener('change', (e) => {
            this.sortEmployees(e.target.value);
        });

        // Items per page
        document.getElementById('showCount').addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value);
            this.currentPage = 1;
            this.renderEmployees();
            this.updatePagination();
        });

        // Modal functionality
        document.getElementById('addEmployeeBtn').addEventListener('click', () => {
            this.openAddModal();
        });

        const modalClose = document.querySelector('.modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.closeModal();
            });
        }

        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('employeeModal').addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });

        // Form submission
        document.getElementById('employeeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });

        // ESC key to close modal/sidebar
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                this.closeFilterSidebar();
            }
        });
    }

    // Search functionality
    searchEmployees(query) {
        if (!query.trim()) {
            this.filteredEmployees = [...employees];
        } else {
            const searchTerm = query.toLowerCase();
            this.filteredEmployees = employees.filter(emp => 
                emp.firstName.toLowerCase().includes(searchTerm) ||
                emp.lastName.toLowerCase().includes(searchTerm) ||
                emp.email.toLowerCase().includes(searchTerm)
            );
        }
        
        this.currentPage = 1;
        this.renderEmployees();
        this.updatePagination();
    }

    // Filter functionality
    toggleFilterSidebar() {
        const sidebar = document.querySelector('.filter-sidebar');
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
    }

    closeFilterSidebar() {
        const sidebar = document.querySelector('.filter-sidebar');
        if (sidebar) {
            sidebar.classList.remove('open');
        }
    }

    applyFilters() {
        const firstName = document.getElementById('filterFirstName').value.toLowerCase();
        const department = document.getElementById('filterDepartment').value;
        const role = document.getElementById('filterRole').value.toLowerCase();

        this.filteredEmployees = employees.filter(emp => {
            const matchesFirstName = !firstName || emp.firstName.toLowerCase().includes(firstName);
            const matchesDepartment = !department || emp.department === department;
            const matchesRole = !role || emp.role.toLowerCase().includes(role);
            
            return matchesFirstName && matchesDepartment && matchesRole;
        });

        this.currentPage = 1;
        this.renderEmployees();
        this.updatePagination();
        this.closeFilterSidebar();
    }

    resetFilters() {
        document.getElementById('filterFirstName').value = '';
        document.getElementById('filterDepartment').value = '';
        document.getElementById('filterRole').value = '';
        document.getElementById('searchInput').value = '';
        
        this.filteredEmployees = [...employees];
        this.currentPage = 1;
        this.renderEmployees();
        this.updatePagination();
        this.closeFilterSidebar();
    }

    // Sorting functionality
    sortEmployees(sortBy) {
        if (!sortBy) {
            this.filteredEmployees = [...this.filteredEmployees];
            this.renderEmployees();
            return;
        }

        this.filteredEmployees.sort((a, b) => {
            const aValue = a[sortBy].toLowerCase();
            const bValue = b[sortBy].toLowerCase();
            return aValue.localeCompare(bValue);
        });

        this.renderEmployees();
    }

    // Render employees
    renderEmployees() {
        const container = document.querySelector('.employee-grid');
        if (!container) return;
        
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const pageEmployees = this.filteredEmployees.slice(start, end);

        if (pageEmployees.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No employees found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = pageEmployees.map(emp => `
            <div class="employee-card fade-in" data-id="${emp.id}">
                <h3 class="employee-name">${emp.firstName} ${emp.lastName}</h3>
                <p class="employee-email"><strong>Email:</strong> ${emp.email}</p>
                <p class="employee-department"><strong>Department:</strong> ${emp.department}</p>
                <p class="employee-role"><strong>Role:</strong> ${emp.role}</p>
                <div class="employee-actions">
                    <button class="btn btn-edit" onclick="editEmployee(${emp.id})">Edit</button>
                    <button class="btn btn-delete" onclick="deleteEmployee(${emp.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }

    // Pagination (simplified since no pagination controls in HTML)
    updatePagination() {
        // Since there are no pagination controls in the current HTML,
        // we'll just show all filtered employees
        this.currentPage = 1;
        this.itemsPerPage = this.filteredEmployees.length;
    }

    // Modal functionality
    openAddModal() {
        this.isEditMode = false;
        this.currentEmployeeId = null;
        
        document.getElementById('modalTitle').textContent = 'Add Employee';
        document.getElementById('submitBtn').textContent = 'Add';
        
        this.resetForm();
        this.showModal();
    }

    editEmployee(id) {
        const employee = employees.find(emp => emp.id === id);
        if (!employee) return;

        this.isEditMode = true;
        this.currentEmployeeId = id;
        
        document.getElementById('modalTitle').textContent = 'Edit Employee';
        document.getElementById('submitBtn').textContent = 'Update';
        
        this.populateForm(employee);
        this.showModal();
    }

    showModal() {
        document.getElementById('employeeModal').classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Set up real-time validation
        this.setupRealTimeValidation();
        
        // Focus first input
        setTimeout(() => {
            document.getElementById('firstName').focus();
        }, 100);
    }

    closeModal() {
        document.getElementById('employeeModal').classList.remove('show');
        document.body.style.overflow = '';
        this.resetForm();
    }

    populateForm(employee) {
        document.getElementById('employeeId').value = employee.id;
        document.getElementById('firstName').value = employee.firstName;
        document.getElementById('lastName').value = employee.lastName;
        document.getElementById('email').value = employee.email;
        document.getElementById('department').value = employee.department;
        document.getElementById('role').value = employee.role;
    }

    resetForm() {
        document.getElementById('employeeForm').reset();
        this.clearErrors();
    }

    showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        document.body.appendChild(successDiv);

        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    // Form validation and submission
    validateForm() {
        const errors = {};
        
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const department = document.getElementById('department').value;
        const role = document.getElementById('role').value;

        // Validate required fields
        if (!firstName) {
            errors.firstName = 'First name is required';
        } else if (firstName.length < 2) {
            errors.firstName = 'First name must be at least 2 characters';
        } else if (!/^[a-zA-Z\s'-]+$/.test(firstName)) {
            errors.firstName = 'First name can only contain letters, spaces, hyphens, and apostrophes';
        }

        if (!lastName) {
            errors.lastName = 'Last name is required';
        } else if (lastName.length < 2) {
            errors.lastName = 'Last name must be at least 2 characters';
        } else if (!/^[a-zA-Z\s'-]+$/.test(lastName)) {
            errors.lastName = 'Last name can only contain letters, spaces, hyphens, and apostrophes';
        }

        if (!email) {
            errors.email = 'Email is required';
        } else if (!this.isValidEmail(email)) {
            errors.email = 'Please enter a valid email address (e.g., user@example.com)';
        } else if (email.length > 254) {
            errors.email = 'Email address is too long (maximum 254 characters)';
        }

        if (!department) {
            errors.department = 'Department is required';
        }

        if (!role) {
            errors.role = 'Role is required';
        }

        // Check for duplicate email (excluding current employee in edit mode)
        if (email && this.isValidEmail(email)) {
            const existingEmployee = employees.find(emp => 
                emp.email.toLowerCase() === email.toLowerCase() && 
                emp.id !== this.currentEmployeeId
            );
            if (existingEmployee) {
                errors.email = 'This email address is already registered to another employee';
            }
        }

        return errors;
    }

    isValidEmail(email) {
        // More comprehensive email validation regex
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        
        // Additional checks
        if (!emailRegex.test(email)) return false;
        if (email.startsWith('.') || email.endsWith('.')) return false;
        if (email.includes('..')) return false;
        if (email.split('@').length !== 2) return false;
        
        const [localPart, domain] = email.split('@');
        if (localPart.length > 64) return false;
        if (domain.length > 253) return false;
        if (!domain.includes('.')) return false;
        
        return true;
    }

    displayErrors(errors) {
        this.clearErrors();
        
        Object.keys(errors).forEach(field => {
            const errorElement = document.getElementById(`${field}Error`);
            const inputElement = document.getElementById(field);
            
            if (errorElement && inputElement) {
                errorElement.textContent = errors[field];
                inputElement.classList.add('error-state');
                inputElement.classList.remove('success-state');
            }
        });

        // Focus first field with error
        const firstErrorField = Object.keys(errors)[0];
        if (firstErrorField) {
            const firstErrorInput = document.getElementById(firstErrorField);
            if (firstErrorInput) {
                firstErrorInput.focus();
                firstErrorInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        const inputElements = document.querySelectorAll('.error-state, .success-state');
        
        errorElements.forEach(el => el.textContent = '');
        inputElements.forEach(el => {
            el.classList.remove('error-state');
            el.classList.remove('success-state');
        });
    }

    // Real-time validation feedback
    setupRealTimeValidation() {
        const inputs = ['firstName', 'lastName', 'email', 'department', 'role'];
        
        inputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (!input) return;

            input.addEventListener('blur', () => {
                this.validateField(inputId);
            });

            input.addEventListener('input', () => {
                // Clear error state when user starts typing
                input.classList.remove('error-state');
                const errorElement = document.getElementById(`${inputId}Error`);
                if (errorElement) {
                    errorElement.textContent = '';
                }
            });
        });

        // Special handling for email field
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('input', (e) => {
                const email = e.target.value.trim();
                if (email && this.isValidEmail(email)) {
                    e.target.classList.add('success-state');
                    e.target.classList.remove('error-state');
                }
            });
        }
    }

    validateField(fieldName) {
        const input = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}Error`);
        
        if (!input || !errorElement) return;

        const value = input.value.trim();
        let error = '';

        switch (fieldName) {
            case 'firstName':
            case 'lastName':
                if (!value) {
                    error = `${fieldName === 'firstName' ? 'First' : 'Last'} name is required`;
                } else if (value.length < 2) {
                    error = `${fieldName === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
                } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                    error = `${fieldName === 'firstName' ? 'First' : 'Last'} name can only contain letters, spaces, hyphens, and apostrophes`;
                }
                break;
            case 'email':
                if (!value) {
                    error = 'Email is required';
                } else if (!this.isValidEmail(value)) {
                    error = 'Please enter a valid email address';
                } else {
                    const existingEmployee = employees.find(emp => 
                        emp.email.toLowerCase() === value.toLowerCase() && 
                        emp.id !== this.currentEmployeeId
                    );
                    if (existingEmployee) {
                        error = 'This email address is already registered';
                    }
                }
                break;
            case 'department':
                if (!value) {
                    error = 'Department is required';
                }
                break;
            case 'role':
                if (!value) {
                    error = 'Role is required';
                }
                break;
        }

        if (error) {
            errorElement.textContent = error;
            input.classList.add('error-state');
            input.classList.remove('success-state');
        } else {
            errorElement.textContent = '';
            input.classList.remove('error-state');
            if (value) {
                input.classList.add('success-state');
            }
        }
    }

    handleFormSubmission() {
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate async operation
        setTimeout(() => {
            const errors = this.validateForm();
            
            if (Object.keys(errors).length > 0) {
                this.displayErrors(errors);
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                return;
            }

            const formData = {
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                email: document.getElementById('email').value.trim(),
                department: document.getElementById('department').value,
                role: document.getElementById('role').value
            };

            if (this.isEditMode) {
                this.updateEmployee(formData);
            } else {
                this.addEmployee(formData);
            }

            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }, 300);
    }

    addEmployee(data) {
        const newEmployee = {
            id: getNextId(),
            ...data
        };

        employees.push(newEmployee);
        this.filteredEmployees = [...employees];
        
        this.closeModal();
        this.renderEmployees();
        this.updatePagination();
        
        this.showSuccessMessage('Employee added successfully!');
    }

    updateEmployee(data) {
        const index = employees.findIndex(emp => emp.id === this.currentEmployeeId);
        if (index !== -1) {
            employees[index] = { id: this.currentEmployeeId, ...data };
            this.filteredEmployees = [...employees];
            
            this.closeModal();
            this.renderEmployees();
            this.updatePagination();
            
            this.showSuccessMessage('Employee updated successfully!');
        }
    }

    deleteEmployee(id) {
        const employee = employees.find(emp => emp.id === id);
        if (!employee) return;

        if (confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
            const index = employees.findIndex(emp => emp.id === id);
            employees.splice(index, 1);
            this.filteredEmployees = [...employees];
            
            // Adjust current page if necessary
            const totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
            if (this.currentPage > totalPages && totalPages > 0) {
                this.currentPage = totalPages;
            }
            
            this.renderEmployees();
            this.updatePagination();
            
            this.showSuccessMessage('Employee deleted successfully!');
        }
    }

    showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        document.body.appendChild(successDiv);

        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.employeeApp = new EmployeeDirectory();
});

// Global functions for inline event handlers (backward compatibility)
function editEmployee(id) {
    if (window.employeeApp) {
        window.employeeApp.editEmployee(id);
    }
}

function deleteEmployee(id) {
    if (window.employeeApp) {
        window.employeeApp.deleteEmployee(id);
    }
}