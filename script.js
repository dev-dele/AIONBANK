// User accounts data
const accounts = {
    'john_premium': {
        username: 'vivian_blake',
        password: 'Bradv2020!',
        name: 'Vivian Blake',
        accountTypes: [
            {
                type: 'USD Account',
                balance: 2000000,
                accountNumber: '******7462',
                currency: 'USD',
                historyTransactions: [
                    { description: 'Salary Deposit', amount: 15000, date: '2024-01-15', type: 'credit' },
                    { description: 'Investment Return', amount: 25000, date: '2024-01-10', type: 'credit' },
                    { description: 'Online Purchase', amount: -299, date: '2024-01-08', type: 'debit' },
                    { description: 'Utility Payment', amount: -450, date: '2024-01-05', type: 'debit' }
                ],
                pendingTransactions: [
                    { description: 'Pending Wire Transfer', amount: 5000, date: '2024-01-16', type: 'credit' },
                    { description: 'Pending Payment to Vendor', amount: -1200, date: '2024-01-16', type: 'debit' }
                ]
            },
            {
                type: 'EUR Account',
                balance: 0,
                accountNumber: '******8421',
                currency: 'EUR',
                historyTransactions: [
                    
                ],
                pendingTransactions: [
                    
                ]
            },
            {
                type: 'GBP Account',
                balance: 0,
                accountNumber: '******9156',
                currency: 'GBP',
                historyTransactions: [
                     ],
                pendingTransactions: [
                    
                ]
            }
        ]
    },
    'sarah_elite': {
        username: 'sarah_elite',
        password: 'Elite1500#',
        name: 'Sarah',
        accountTypes: [
            {
                type: 'USD Account',
                balance: 1500000,
                accountNumber: '******7892',
                currency: 'USD',
                historyTransactions: [
                    { description: 'Business Transfer', amount: 50000, date: '2024-01-12', type: 'credit' },
                    { description: 'Dividend Payment', amount: 8500, date: '2024-01-09', type: 'credit' },
                    { description: 'Restaurant Bill', amount: -125, date: '2024-01-07', type: 'debit' },
                    { description: 'Gas Station', amount: -75, date: '2024-01-06', type: 'debit' }
                ],
                pendingTransactions: [
                    { description: 'Pending Investment', amount: 10000, date: '2024-01-16', type: 'credit' },
                    { description: 'Pending Subscription', amount: -99, date: '2024-01-16', type: 'debit' }
                ]
            },
            {
                type: 'EUR Account',
                balance: 1350000,
                accountNumber: '******4567',
                currency: 'EUR',
                historyTransactions: [
                    { description: 'European Contract', amount: 35000, date: '2024-01-11', type: 'credit' },
                    { description: 'Travel Expenses', amount: -890, date: '2024-01-08', type: 'debit' }
                ],
                pendingTransactions: [
                    { description: 'Pending EU Contract', amount: 15000, date: '2024-01-16', type: 'credit' }
                ]
            },
            {
                type: 'GBP Account',
                balance: 980000,
                accountNumber: '******3421',
                currency: 'GBP',
                historyTransactions: [
                    { description: 'UK Property Sale', amount: 45000, date: '2024-01-10', type: 'credit' },
                    { description: 'Legal Fees', amount: -1200, date: '2024-01-07', type: 'debit' }
                ],
                pendingTransactions: [
                    { description: 'Pending Property Transfer', amount: 25000, date: '2024-01-16', type: 'credit' }
                ]
            }
        ]
    }
};

let currentUser = null;
let currentAccountIndex = 0;

// DOM Elements
const loginPage = document.getElementById('loginPage');
const dashboardPage = document.getElementById('dashboardPage');
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const logoutBtn = document.getElementById('logoutBtn');
const accountBalance = document.getElementById('accountBalance');
const accountNumber = document.getElementById('accountNumber');
const accountType = document.getElementById('accountType');
const currencyDisplay = document.getElementById('currencyDisplay');
const userGreeting = document.getElementById('userGreeting');
const accountInfo = document.getElementById('accountInfo');
const historyTransactionList = document.getElementById('historyTransactionList');
const pendingTransactionList = document.getElementById('pendingTransactionList');
const closedAccountModal = document.getElementById('closedAccountModal');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser && accounts[savedUser]) {
        currentUser = savedUser;
        showDashboard();
    }

    // Login form submission
    loginForm.addEventListener('submit', handleLogin);

    // Logout functionality
    logoutBtn.addEventListener('click', handleLogout);

    // Add event listeners for dashboard buttons
    addDashboardEventListeners();

    // Add profile icon event listener
    addProfileIconEventListener();

    // Add tab functionality
    addTabEventListeners();

    // Add swipe functionality
    addSwipeEventListeners();

    // Add indicator click functionality
    addIndicatorEventListeners();

    // Modal close functionality
    const closeModal = document.querySelector('.close');
    closeModal.addEventListener('click', function() {
        closedAccountModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === closedAccountModal) {
            closedAccountModal.style.display = 'none';
        }
    });
});

// Handle login
function handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Clear previous error messages
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';

    console.log('Login attempt:', username, password); // Debug log
    console.log('Available accounts:', Object.keys(accounts)); // Debug log

    // Validate credentials
    if (accounts[username] && accounts[username].password === password) {
        console.log('Login successful'); // Debug log
        currentUser = username;
        currentAccountIndex = 0; // Reset to first account
        localStorage.setItem('currentUser', username);
        showDashboard();
    } else {
        console.log('Login failed'); // Debug log
        errorMessage.textContent = 'Invalid username or password. Please try again.';
        errorMessage.style.display = 'block';
    }
}

// Handle logout
function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showLogin();
}

// Show login page
function showLogin() {
    loginPage.classList.add('active');
    dashboardPage.classList.remove('active');
    
    // Clear form
    loginForm.reset();
    errorMessage.textContent = '';
}

// Show dashboard
function showDashboard() {
    loginPage.classList.remove('active');
    dashboardPage.classList.add('active');
    
    // Update dashboard with user data
    updateDashboard();
}

// Update dashboard with current user data
function updateDashboard() {
    if (!currentUser || !accounts[currentUser]) return;

    const user = accounts[currentUser];
    const currentAccount = user.accountTypes[currentAccountIndex];

    // Update user greeting
    userGreeting.textContent = `Hello, ${user.name}`;

    // Update account info
    accountType.textContent = currentAccount.type;
    accountBalance.textContent = currentAccount.balance.toLocaleString();
    accountNumber.textContent = currentAccount.accountNumber;
    currencyDisplay.textContent = currentAccount.currency;

    // Update indicators
    updateIndicators();

    // Update transactions
    updateHistoryTransactions(currentAccount.historyTransactions);
    updatePendingTransactions(currentAccount.pendingTransactions);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Update history transactions list
function updateHistoryTransactions(transactions) {
    historyTransactionList.innerHTML = '';

    transactions.forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';

        const amountClass = transaction.type === 'credit' ? 'positive' : 'negative';
        const amountPrefix = transaction.type === 'credit' ? '+' : '';

        transactionItem.innerHTML = `
            <div class="transaction-details">
                <h4>${transaction.description}</h4>
                <p>${transaction.date}</p>
            </div>
            <div class="transaction-amount ${amountClass}">
                ${amountPrefix}${formatCurrency(Math.abs(transaction.amount))}
            </div>
        `;

        historyTransactionList.appendChild(transactionItem);
    });
}

// Update pending transactions list
function updatePendingTransactions(transactions) {
    pendingTransactionList.innerHTML = '';

    transactions.forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';

        const amountClass = transaction.type === 'credit' ? 'positive' : 'negative';
        const amountPrefix = transaction.type === 'credit' ? '+' : '';

        transactionItem.innerHTML = `
            <div class="transaction-details">
                <h4>${transaction.description}</h4>
                <p>${transaction.date}</p>
            </div>
            <div class="transaction-amount ${amountClass}">
                ${amountPrefix}${formatCurrency(Math.abs(transaction.amount))}
            </div>
        `;

        pendingTransactionList.appendChild(transactionItem);
    });
}

// Add event listeners for dashboard buttons
function addDashboardEventListeners() {
    // Quick action buttons - show the alert functionality
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', showClosedAccountMessage);
    });
}

// Add profile icon event listener
function addProfileIconEventListener() {
    const profileIcon = document.querySelector('.profile-icon');
    if (profileIcon) {
        profileIcon.addEventListener('click', showClosedAccountMessage);
    }
}

// Update indicators
function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentAccountIndex);
    });
}

// Switch account
function switchAccount(index) {
    if (!currentUser || !accounts[currentUser]) return;

    const user = accounts[currentUser];
    if (index >= 0 && index < user.accountTypes.length) {
        currentAccountIndex = index;
        updateDashboard();
    }
}

// Add swipe event listeners
function addSwipeEventListeners() {
    let startX = 0;
    let startY = 0;
    let isSwipe = false;

    accountInfo.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwipe = true;
    });

    accountInfo.addEventListener('touchmove', function(e) {
        if (!isSwipe) return;

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = startX - currentX;
        const diffY = startY - currentY;

        // If vertical movement is greater than horizontal, don't treat as swipe
        if (Math.abs(diffY) > Math.abs(diffX)) {
            isSwipe = false;
            return;
        }

        e.preventDefault();
    });

    accountInfo.addEventListener('touchend', function(e) {
        if (!isSwipe) return;

        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;

        // Minimum swipe distance
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - next account
                const nextIndex = (currentAccountIndex + 1) % accounts[currentUser].accountTypes.length;
                switchAccount(nextIndex);
            } else {
                // Swipe right - previous account
                const prevIndex = currentAccountIndex === 0 ?
                    accounts[currentUser].accountTypes.length - 1 :
                    currentAccountIndex - 1;
                switchAccount(prevIndex);
            }
        }

        isSwipe = false;
    });

    // Mouse events for desktop
    let mouseStartX = 0;
    let isMouseSwipe = false;

    accountInfo.addEventListener('mousedown', function(e) {
        mouseStartX = e.clientX;
        isMouseSwipe = true;
        e.preventDefault();
    });

    accountInfo.addEventListener('mousemove', function(e) {
        if (!isMouseSwipe) return;
        e.preventDefault();
    });

    accountInfo.addEventListener('mouseup', function(e) {
        if (!isMouseSwipe) return;

        const diffX = mouseStartX - e.clientX;

        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - next account
                const nextIndex = (currentAccountIndex + 1) % accounts[currentUser].accountTypes.length;
                switchAccount(nextIndex);
            } else {
                // Swipe right - previous account
                const prevIndex = currentAccountIndex === 0 ?
                    accounts[currentUser].accountTypes.length - 1 :
                    currentAccountIndex - 1;
                switchAccount(prevIndex);
            }
        }

        isMouseSwipe = false;
    });
}

// Add indicator event listeners
function addIndicatorEventListeners() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            switchAccount(index);
        });
    });
}

// Add tab event listeners
function addTabEventListeners() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab + 'Tab').classList.add('active');
        });
    });
}

// Show closed account message
function showClosedAccountMessage() {
    closedAccountModal.style.display = 'block';
}

// Console log for debugging - show available accounts
console.log('Available test accounts:');
console.log('Username: vivian_blake, Password: Bradv2020! (Balance: $2,000,000)');
console.log('Username: sarah_elite, Password: Elite1500# (Balance: $1,500,000)');
