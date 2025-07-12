<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title!"Employee Directory"}</title>
    <link rel="stylesheet" href="src/main/resources/static/css/style.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <h1>Employee Directory</h1>
        <div class="header-controls">
            <input type="text" id="searchInput" placeholder="Search by name or email" class="search-input">
            <button id="filterBtn" class="btn btn-secondary">Filter</button>
            <button id="addEmployeeBtn" class="btn btn-primary">Add Employee</button>
        </div>
    </header>

    <!-- Main Content Wrapper -->
    <div class="main-wrapper">
        <!-- Left Side - Controls and Employee Grid -->
        <div class="content-left">
            <!-- Controls Bar -->
            <div class="controls-bar">
                <div class="controls-left">
                    <label for="sortBy">Sort:</label>
                    <select id="sortBy" class="control-select">
                        <option value="">--Select--</option>
                        <option value="firstName">First Name</option>
                        <option value="lastName">Last Name</option>
                        <option value="department">Department</option>
                        <option value="email">Email</option>
                    </select>
                    <label for="showCount">Show:</label>
                    <select id="showCount" class="control-select">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </div>

            <!-- Employee Grid -->
            <div class="employee-grid">
                <#list employees as employee>
                <div class="employee-card" data-id="${employee.id}">
                    <h3 class="employee-name">${employee.firstName} ${employee.lastName}</h3>
                    <p class="employee-email"><strong>Email:</strong> ${employee.email}</p>
                    <p class="employee-department"><strong>Department:</strong> ${employee.department}</p>
                    <p class="employee-role"><strong>Role:</strong> ${employee.role}</p>
                    <div class="employee-actions">
                        <button class="btn btn-edit" onclick="editEmployee(${employee.id})">Edit</button>
                        <button class="btn btn-delete" onclick="deleteEmployee(${employee.id})">Delete</button>
                    </div>
                </div>
                </#list>
            </div>
        </div>
        
        <!-- Right Side - Filter Section -->
        <div class="filter-sidebar">
            <h3 class="filter-title">Filter Employees</h3>
            
            <div class="filter-group">
                <label for="filterFirstName">First Name:</label>
                <input type="text" id="filterFirstName" class="filter-input" placeholder="">
            </div>
            
            <div class="filter-group">
                <label for="filterDepartment">Department:</label>
                <input type="text" id="filterDepartment" class="filter-input" placeholder="">
            </div>
            
            <div class="filter-group">
                <label for="filterRole">Role:</label>
                <input type="text" id="filterRole" class="filter-input" placeholder="">
            </div>
            
            <div class="filter-actions">
                <button id="applyFilter" class="btn btn-apply">Apply</button>
                <button id="resetFilter" class="btn btn-reset">Reset</button>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <p>&copy; 2025 Employee Directory App. All rights reserved.</p>
    </footer>

    <!-- Add/Edit Employee Modal -->
    <div id="employeeModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modalTitle">Add Employee</h2>
                <span class="modal-close">&times;</span>
            </div>
            <form id="employeeForm" class="employee-form">
                <input type="hidden" id="employeeId">
                
                <div class="form-group">
                    <label for="firstName">First name</label>
                    <input type="text" id="firstName" name="firstName" required>
                    <span class="error-message" id="firstNameError"></span>
                </div>

                <div class="form-group">
                    <label for="lastName">Last name</label>
                    <input type="text" id="lastName" name="lastName" required>
                    <span class="error-message" id="lastNameError"></span>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                        <span class="error-message" id="emailError"></span>
                    </div>

                    <div class="form-group">
                        <label for="department">Department</label>
                        <select id="department" name="department" required>
                            <option value="">Select Department</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Sales">Sales</option>
                            <option value="HR">HR</option>
                            <option value="Finance">Finance</option>
                            <option value="IT">IT</option>
                        </select>
                        <span class="error-message" id="departmentError"></span>
                    </div>
                </div>

                <div class="form-group">
                    <label for="role">Role</label>
                    <select id="role" name="role" required>
                        <option value="">Select Role</option>
                        <option value="Manager">Manager</option>
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                        <option value="Analyst">Analyst</option>
                        <option value="Coordinator">Coordinator</option>
                        <option value="Specialist">Specialist</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Marketing Manager">Marketing Manager</option>
                        <option value="Sales Representative">Sales Representative</option>
                    </select>
                    <span class="error-message" id="roleError"></span>
                </div>

                <div class="form-actions">
                    <button type="button" id="cancelBtn" class="btn btn-secondary">Cancel</button>
                    <button type="submit" id="submitBtn" class="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    </div>

    <script src="src/main/resources/static/js/data.js"></script>
    <script src="src/main/resources/static/js/app.js"></script>
</body>
</html>