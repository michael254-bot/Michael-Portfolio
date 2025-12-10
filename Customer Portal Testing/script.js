// A global array to hold signature data.
// simulating a database by storing this in localStorage.
let signaturesData = [];
const SIGNATURES_STORAGE_KEY = 'signaturesData';

// --- Functions to load and save signature data from/to localStorage ---
function loadSignatures() {
    const storedSignatures = localStorage.getItem(SIGNATURES_STORAGE_KEY);
    if (storedSignatures) {
        // We'll map over the signatures to ensure the ID is a number
        signaturesData = JSON.parse(storedSignatures).map(sig => ({
            ...sig,
            id: parseInt(sig.id)
        }));
    } else {
        signaturesData = [];
    }
}

function saveSignatures() {
    localStorage.setItem(SIGNATURES_STORAGE_KEY, JSON.stringify(signaturesData));
}

// Mock Data
const mockPortalUsers = [
    { id: 'alice@example.com', name: 'Alice Wonderland', phone: '555-0101', imageUrl: 'https://i.pravatar.cc/150?u=alice@example.com', text: 'Alice W. (alice@example.com)' },
    { id: 'bob@example.com', name: 'Bob The Builder', phone: '555-0102', imageUrl: null, text: 'Bob B. (bob@example.com)' },
    { id: 'carol@example.com', name: 'Carol Danvers', phone: '555-0103', imageUrl: 'https://i.pravatar.cc/150?u=carol@example.com', text: 'Carol D. (carol@example.com)' },
    { id: 'dave@example.com', name: 'David Grohl', phone: '555-0104', imageUrl: 'https://i.pravatar.cc/150?u=dave@example.com', text: 'Dave G. (dave@example.com)' },
    { id: 'eve@example.com', name: 'Eve Polastri', phone: '555-0105', imageUrl: null, text: 'Eve P. (eve@example.com)' },
    { id: 'frank@example.com', name: 'Frank Underwood', phone: '555-0106', imageUrl: 'https://i.pravatar.cc/150?u=frank@example.com', text: 'Frank U. (frank@example.com)' },
    { id: 'grace@example.com', name: 'Grace Hopper', phone: '555-0107', imageUrl: 'https://i.pravatar.cc/150?u=grace@example.com', text: 'Grace H. (grace@example.com)' },
    { id: 'henry@example.com', name: 'Henry Ford', phone: '555-0108', imageUrl: 'https://i.pravatar.cc/150?u=henry@example.com', text: 'Henry F. (henry@example.com)' },
    { id: 'ida@example.com', name: 'Ida Wells', phone: '555-0109', imageUrl: null, text: 'Ida W. (ida@example.com)' },
    { id: 'jack@example.com', name: 'Jack Sparrow', phone: '555-0110', imageUrl: 'https://i.pravatar.cc/150?u=jack@example.com', text: 'Jack S. (jack@example.com)' },
    { id: 'karen@example.com', name: 'Karen Page', phone: '555-0111', imageUrl: 'https://i.pravatar.cc/150?u=karen@example.com', text: 'Karen P. (karen@example.com)' },
    { id: 'leo@example.com', name: 'Leo Fitz', phone: '555-0112', imageUrl: null, text: 'Leo F. (leo@example.com)' },
    { id: 'monica@example.com', name: 'Monica Geller', phone: '555-0113', imageUrl: 'https://i.pravatar.cc/150?u=monica@example.com', text: 'Monica G. (monica@example.com)'}, 
    { id: 'michaelmalaba5@gmail.com', name: 'Michael Malaba', phone: '+254703245513', imageUrl: 'https://shorturl.at/Sm57b', text: 'Michael M. (michaelmalaba5@gmail.com)'},
    { id: 'odotelyn@gmail.com', name: 'Elyn Odote', phone: '+254790305547', imageUrl: null, text: 'Elyn O. (odotelyn@gmail.com)'},
];

const DEMO_PASSWORD = "password123"; 
let delegationsData = [];

// --- START: Global UI & Helper Functions ---
function getInitials(name) { 
    if (!name) return ''; 
    const nP = name.trim().split(' '); 
    let i = nP[0] ? nP[0][0] : ''; 
    if (nP.length > 1 && nP[nP.length - 1]) { i += nP[nP.length - 1][0]; } 
    return i.toUpperCase(); 
}

function showGlobalSuccessModal(message) { 
    $('#successModalMessage').text(message); 
    const modalElement = document.getElementById('successDelegationModal');
    let modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (!modalInstance) {
        modalInstance = new bootstrap.Modal(modalElement);
    }
    modalInstance.show(); 
}
function showGlobalDangerModal(message) { 
    $('#dangerModalMessage').text(message); 
    const modalElement = document.getElementById('dangerDelegationModal');
    let modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (!modalInstance) {
        modalInstance = new bootstrap.Modal(modalElement);
    }
    modalInstance.show(); 
}
// --- END: Global UI & Helper Functions ---

// --- START: Core Portal Functions ---
function showLoginScreen() {
    $('#loginContainer').show();
    $('#appContainer').hide();
    $('#loginError').hide();
    $('#loginEmail').val(''); 
    $('#loginPassword').val('');
}

function showAppScreen() {
    $('#loginContainer').hide();
    $('#appContainer').show();
}

function updateSidebarUser(userEmail) {
    const user = mockPortalUsers.find(u => u.id === userEmail);
    if (user) {
        $('#sidebarUserName').text(user.name || 'User');
        $('#sidebarUserRole').text('User'); 
        const imgContainer = $('#sidebarUserProfileImgContainer');
        imgContainer.empty(); 
        if (user.imageUrl) {
            imgContainer.html(`<img src="${user.imageUrl}" alt="${user.name}" class="w-100 h-100 object-fit-cover">`);
        } else {
            imgContainer.text(getInitials(user.name)); 
        }
    } else { 
        $('#sidebarUserName').text('User');
        $('#sidebarUserRole').text('Role');
        $('#sidebarUserProfileImgContainer').empty().text('U');
    }
}
// --- END: Core Portal Functions ---

// --- START: Delegation Page Specific Functions ---
window.renderPeoplePage = function() {
    const container = $('#peopleGridContainer');
    if (!container.length) return;
    container.empty();
    mockPortalUsers.forEach(person => {
        const pC = person.imageUrl ? `<img src="${person.imageUrl}" alt="${person.name}">` : `<span>${getInitials(person.name)}</span>`;
        const pH = `<div class="person-card"><div class="profile-image-container">${pC}</div><h5>${person.name}</h5><p class="person-email"><a href="mailto:${person.email}">${person.email}</a></p><p class="person-phone">${person.phone || 'N/A'}</p></div>`;
        container.append(pH);
    });
}
window.populateDelegationUserSelects = function() {
    const delegatorSelect = $('#delegatorEmail');
    const delegateSelect = $('#delegateEmail'); 
    if (delegatorSelect.length) {
        const currentDelegatorVal = delegatorSelect.val();
        delegatorSelect.empty().append($('<option></option>')); 
        mockPortalUsers.forEach(user => {
            delegatorSelect.append(new Option(user.text, user.id));
        });
        delegatorSelect.val(currentDelegatorVal || '').trigger('change.select2');
    }
    if (delegateSelect.length) {
        const currentDelegateVals = delegateSelect.val();
        delegateSelect.empty(); 
        mockPortalUsers.forEach(user => {
            delegateSelect.append(new Option(user.text, user.id));
        });
        delegateSelect.val(currentDelegateVals).trigger('change.select2');
    }
}

//Access Summary overview i.e user grants.... and user has been granted.....
function populateUserAccessSummarySelect() {
    const selectElement = $('#userAccessSummarySelect');
    if (!selectElement.length) return;
    const currentValue = selectElement.val(); 
    selectElement.empty().append(new Option('Select a user to see their access summary...', '', true, true));
    mockPortalUsers.forEach(user => {
        selectElement.append(new Option(user.text, user.id)); 
    });
    selectElement.val(currentValue); 
    if (!selectElement.data('select2')) { 
        selectElement.select2({
            placeholder: "Select a user...",
            allowClear: true,
            width: '100%'
        });
    } else {
        selectElement.trigger('change.select2');
    }
}
// User delegation i.e account to be accessed... and User  to grant access to.....
function generateDelegationId(d, de) { return `${d.replace(/[^a-zA-Z0-9]/g, '')}_${de.replace(/[^a-zA-Z0-9]/g, '')}_${Date.now()}`; }
function displayDelegatesForEntry(delegatorEmail, container, isCurrentlyExpanded) {
    container.empty(); 
    const delegatorEntry = delegationsData.find(d => d.delegatorEmail === delegatorEmail);
    if (!delegatorEntry || !delegatorEntry.delegates || delegatorEntry.delegates.length === 0) {
        container.append($('<span class="text-muted fst-italic">No delegates assigned.</span>'));
        return;
    }
    //Display count in every delegator....
    const delegates = delegatorEntry.delegates;
    const initialDisplayCount = 3; 
    let delegatesToDisplay = (isCurrentlyExpanded || delegates.length <= initialDisplayCount) ? delegates : delegates.slice(0, initialDisplayCount); 
    delegatesToDisplay.forEach(del => {
        const delegateUser = mockPortalUsers.find(u => u.id === del.delegateEmail);
        const delegateDisplayText = delegateUser ? delegateUser.text : del.delegateEmail;
        const delegateSpan = $('<span class="delegate-item"></span>').text(delegateDisplayText);
        const removeBtn = $('<button type="button" class="btn btn-danger btn-sm remove-specific-delegate-btn" title="Remove this delegate"><i class="fas fa-times"></i></button>');
        removeBtn.on('click', () => removeSpecificDelegate(delegatorEmail, del.delegationId));
        delegateSpan.append(removeBtn);
        container.append(delegateSpan);
    });
    // Add delegation button
    if (delegates.length > initialDisplayCount) {
        let buttonIconClass = isCurrentlyExpanded ? "fas fa-chevron-up" : "fas fa-chevron-down"; 
        let buttonTitle = isCurrentlyExpanded ? "Show fewer delegates" : `Show all ${delegates.length} delegates`;
        let nextExpansionState = !isCurrentlyExpanded; 
        const toggleButton = $(`<span class="delegate-item delegate-toggle-control" style="cursor: pointer; padding: 0.3rem 0.6rem;" title="${buttonTitle}"><i class="${buttonIconClass}"></i></span
    `);
        toggleButton.data({'delegator-email': delegatorEmail, 'target-expansion-state': nextExpansionState});
        container.append(toggleButton);
    }
}
window.renderDelegations = function() {
    const tableBody = $('#delegationsTable tbody');
    if (!tableBody.length) return;
    tableBody.empty();
    if (delegationsData.length === 0) {
        tableBody.append('<tr><td colspan="2" class="text-center py-4 text-muted">No delegations found. Add one above!</td></tr>');
        return;
    }
    delegationsData.forEach(entry => {
        const delegatorUser = mockPortalUsers.find(u => u.id === entry.delegatorEmail);
        const delegatorDisplayText = delegatorUser ? delegatorUser.text : entry.delegatorEmail;
        const row = $('<tr></tr>').append($('<td></td>').text(delegatorDisplayText));
        const delegatesCell = $('<td></td>');
        const delegatorIdSafe = entry.delegatorEmail.replace(/[^a-zA-Z0-9-_]/g, '');
        const delegatesListContainerId = `delegates-list-for-${delegatorIdSafe}`;
        const delegatesListDiv = $(`<div class="delegates-list" id="${delegatesListContainerId}"></div>`);
        if (entry.delegates && entry.delegates.length > 0) {
            displayDelegatesForEntry(entry.delegatorEmail, delegatesListDiv, false); 
        } else { 
            delegatesListDiv.append($('<span class="text-muted fst-italic">No delegates assigned.</span>'));
        }
        delegatesCell.append(delegatesListDiv);
        row.append(delegatesCell);
        tableBody.append(row);
    });
};
//delete function in every delegator
function removeSpecificDelegate(delegatorEmail, delegationIdToRemove) {
    let delegatorEntry = delegationsData.find(d => d.delegatorEmail === delegatorEmail);
    if (delegatorEntry) {
        const initialCount = delegatorEntry.delegates.length;
        delegatorEntry.delegates = delegatorEntry.delegates.filter(dl => dl.delegationId !== delegationIdToRemove);
        if (delegatorEntry.delegates.length < initialCount) { 
            showGlobalDangerModal('Delegation removed successfully.');
        }
    }
    renderDelegations(); 
    if ($('#userAccessSummarySelect').val() && $('#userAccessSummarySelect').val() !== "") {
        $('#userAccessSummarySelect').trigger('change');
    }
}
// --- END: Delegation Page Specific Functions ---

// --- START: Signature Management Functions ---
// Renders the list of signatures on the "List Signatures" page.
function renderSignaturesList() {
    loadSignatures();
    const signaturesList = $('#signaturesList');
    const managementPreview = $('#managementSignaturePreview');
    const managementActions = $('#managementSignatureActions');
    signaturesList.empty();
    managementPreview.empty();
    managementActions.empty();

    const managementSignature = signaturesData.find(sig => sig.isManagementSignature);
    const availableSignatures = signaturesData.filter(sig => !sig.isManagementSignature);

    // Render Management Signature
    if (managementSignature) {
        const statusText = managementSignature.isActive ? 'Active' : 'Inactive';
        const statusBadge = managementSignature.isActive ? 
            `<span class="badge bg-success">${statusText}</span>` : 
            `<span class="badge bg-secondary">${statusText}</span>`;

        const buttonStyle = `
            padding: 0.2rem 0.6rem;
            font-size: 0.8rem;
            line-height: 1.5;
            border-radius: 0.2rem;
            white-space: nowrap;
        `;
        
        managementActions.html(`
            <div class="d-flex align-items-center me-2">${statusBadge}</div>
            <button class="btn btn-warning deactivate-signature" data-id="${managementSignature.id}" style="${buttonStyle}">${managementSignature.isActive ? '<i class="fas fa-toggle-off me-1"></i>Deactivate' : '<i class="fas fa-toggle-on me-1"></i>Activate'}</button>
            <button class="btn btn-primary apply-domain-wide" data-id="${managementSignature.id}" style="${buttonStyle}"><i class="fas fa-globe me-1"></i>Apply Domain Wide</button>
            <button class="btn btn-secondary apply-dept-wide" data-id="${managementSignature.id}" style="${buttonStyle}"><i class="fas fa-building me-1"></i>Apply Dept Wide</button>
            <button class="btn btn-danger delete-signature" data-id="${managementSignature.id}" style="${buttonStyle}"><i class="fas fa-trash-alt me-1"></i>Delete</button>
        `);
        
        managementPreview.html(managementSignature.html);

    } else {
        // No Management Signature, so we show a placeholder
        managementActions.html(`
            <button class="btn btn-primary create-management-signature" style="padding: 0.2rem 0.6rem; font-size: 0.8rem; line-height: 1.5; border-radius: 0.2rem; white-space: nowrap;"><i class="fas fa-plus me-1"></i>Create Signature</button>
        `);
        managementPreview.html('<p class="text-muted text-center my-3">No management signature saved yet.</p>');
    }

    // Render Available Signatures List
    if (availableSignatures.length === 0) {
        signaturesList.append('<li class="list-group-item text-muted text-center">No signatures found. Create one to get started.</li>');
    } else {
        availableSignatures.forEach(signature => {
            const statusText = signature.isActive ? 'Active' : 'Inactive';
            const statusBadge = signature.isActive ? 
                `<span class="badge bg-success">${statusText}</span>` : 
                `<span class="badge bg-secondary">${statusText}</span>`;

            const buttonStyle = `
                padding: 0.2rem 0.6rem;
                font-size: 0.8rem;
                line-height: 1.5;
                border-radius: 0.2rem;
                white-space: nowrap;
            `;
            
            const listItem = $(`
                <li class="list-group-item">
                    <div class="signature-actions-container">
                        <div>
                            <strong>Signature:</strong> ${statusBadge}
                        </div>
                        <div class="signature-actions">
                            <button class="btn btn-primary edit-available-signature" data-id="${signature.id}" style="${buttonStyle}"><i class="fas fa-edit me-1"></i>Edit</button>
                            <button class="btn btn-warning deactivate-signature" data-id="${signature.id}" style="${buttonStyle}">${signature.isActive ? '<i class="fas fa-toggle-off me-1"></i>Deactivate' : '<i class="fas fa-toggle-on me-1"></i>Activate'}</button>
                            <button class="btn btn-primary apply-domain-wide" data-id="${signature.id}" style="${buttonStyle}"><i class="fas fa-globe me-1"></i>Apply Domain Wide</button>
                            <button class="btn btn-secondary apply-dept-wide" data-id="${signature.id}" style="${buttonStyle}"><i class="fas fa-building me-1"></i>Apply Dept Wide</button>
                            <button class="btn btn-danger delete-signature" data-id="${signature.id}" style="${buttonStyle}"><i class="fas fa-trash-alt me-1"></i>Delete</button>
                        </div>
                    </div>
                    <div class="signature-preview-content">
                        ${signature.html}
                    </div>
                </li>
            `);
            signaturesList.append(listItem);
        });
    }
}

// Initializes the signature editor page for a new or existing signature.
function initializeSignatureEditor(signatureHtml = '', signatureId = null) {
    const signatureCodeTextarea = $('#signatureCode');
    const signaturePreviewDiv = $('#signaturePreview');
    const saveButton = $('#saveSignatureBtn');
    
    signatureCodeTextarea.off('input');
    saveButton.off('click');
    
    signatureCodeTextarea.on('input', function() {
        signaturePreviewDiv.html($(this).val());
    });
    
    signatureCodeTextarea.val(signatureHtml);
    saveButton.data('id', signatureId);
    saveButton.text(signatureId !== null ? 'Update Signature' : 'Save Signature');

    signatureCodeTextarea.trigger('input');
    
    saveButton.on('click', saveSignature);
}

// Saves a new signature or updates an existing one.
function saveSignature() {
    const signatureCodeTextarea = $('#signatureCode');
    const signatureHtml = signatureCodeTextarea.val();
    const signatureId = $('#saveSignatureBtn').data('id');

    if (!signatureHtml.trim()) {
        showGlobalDangerModal('Please enter some HTML code before saving!');
        return;
    }
    
    let message = '';
    const isManagementSignature = (signatureId !== null && signatureId !== undefined && typeof signatureId !== 'string') ? signaturesData.find(sig => sig.id === parseInt(signatureId))?.isManagementSignature : false;

    if (signatureId !== null) {
        // Update an existing signature
        const index = signaturesData.findIndex(sig => sig.id === parseInt(signatureId));
        if (index > -1) {
            signaturesData[index].html = signatureHtml;
            message = 'Signature updated successfully!';
        }
    } else {
        // Create a new signature (always a regular one, not management)
        const newSignature = {
            id: Date.now(),
            html: signatureHtml,
            isActive: false,
            isManagementSignature: false,
        };
        signaturesData.push(newSignature);
        message = 'Signature saved successfully!';
    }
    
    // Check if the signature being updated is the management signature
    if (isManagementSignature) {
        // Find the management signature and update its HTML content
        const managementSig = signaturesData.find(sig => sig.isManagementSignature);
        if (managementSig) {
            managementSig.html = signatureHtml;
            message = 'Management signature updated successfully!';
        } else {
            // This case should ideally not happen if a management signature is being edited, but we'll handle it just in case.
            const newManagementSignature = {
                id: Date.now(),
                html: signatureHtml,
                isActive: false,
                isManagementSignature: true,
            };
            signaturesData.push(newManagementSignature);
            message = 'Management signature created successfully!';
        }
    }
    
    // Check if a new signature is being created for the management section
    if (signatureId === 'new-management') {
        const newManagementSignature = {
            id: Date.now(),
            html: signatureHtml,
            isActive: false,
            isManagementSignature: true,
        };
        signaturesData.push(newManagementSignature);
        message = 'Management signature created successfully!';
    }


    saveSignatures();
    showGlobalSuccessModal(message);
    
    setTimeout(() => {
        window.location.hash = 'list-signatures';
    }, 1000);
}


// Event handler for clicking the 'Create Signature' button in the menu
$(document).on('click', '.sidebar-menu a[data-page="create-signature"]', function() {
    initializeSignatureEditor('', null);
});


// Event handler for the special 'Create' button for management signature
$(document).on('click', '.create-management-signature', function() {
    window.location.hash = 'create-signature';
    setTimeout(() => initializeSignatureEditor('', 'new-management'), 100);
});


// Event handler for clicking the 'Edit Signature' button.
$(document).on('click', '.edit-available-signature', function() {
    const id = $(this).data('id');
    const signature = signaturesData.find(sig => sig.id === parseInt(id));
    
    if (signature) {
        window.location.hash = 'create-signature';
        setTimeout(() => initializeSignatureEditor(signature.html, signature.id), 100);
    }
});

$(document).on('click', '.management-signature .card-header .btn-primary', function(e) {
    e.preventDefault();
    const managementSignature = signaturesData.find(sig => sig.isManagementSignature);
    if (managementSignature) {
        window.location.hash = 'create-signature';
        setTimeout(() => initializeSignatureEditor(managementSignature.html, managementSignature.id), 100);
    } else {
        window.location.hash = 'create-signature';
        setTimeout(() => initializeSignatureEditor('', 'new-management'), 100);
    }
});

// Event handler for clicking the 'Deactivate/Activate' button.
$(document).on('click', '.deactivate-signature', function() {
    const id = parseInt($(this).data('id'));
    const signature = signaturesData.find(sig => sig.id === id);
    if (signature) {
        signature.isActive = !signature.isActive;
        saveSignatures();
        renderSignaturesList();
        showGlobalSuccessModal(`Signature ${signature.isActive ? 'activated' : 'deactivated'} successfully.`);
    }
});

// Event handler for clicking the 'Apply Domain Wide' button.
$(document).on('click', '.apply-domain-wide', function() {
    const id = parseInt($(this).data('id'));
    showGlobalSuccessModal(`Action: Applying signature with ID ${id} to the entire domain.`);
});

// Event handler for clicking the 'Apply Dept Wide' button.
$(document).on('click', '.apply-dept-wide', function() {
    const id = parseInt($(this).data('id'));
    showGlobalSuccessModal(`Action: Applying signature with ID ${id} to the entire department.`);
});

// Event handler for clicking the 'Delete' button.
$(document).on('click', '.delete-signature', function() {
    const id = parseInt($(this).data('id'));
    if (confirm('Are you sure you want to delete this signature?')) {
        const indexToDelete = signaturesData.findIndex(sig => sig.id === id);
        if (indexToDelete !== -1) {
            signaturesData.splice(indexToDelete, 1);
            saveSignatures();
            renderSignaturesList();
            showGlobalDangerModal('Signature deleted successfully.');
        } else {
             showGlobalDangerModal('Signature not found.');
        }
    }
});

// --- Master Page Controller ---
function showPage(pageId, isInitialLoad = false) {
    if (sessionStorage.getItem('isLoggedIn') !== 'true' && pageId !== 'logout') {
        showLoginScreen(); 
        return;
    }
    if (pageId === 'logout') {
        $('.page-content').hide(); 
        $('#logoutPageContent').show(); 
        setTimeout(() => {
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('loggedInUserEmail');
            window.location.hash = ''; 
            showLoginScreen();
            $('#logoutPageContent').hide(); 
        }, 1000); 
        return;
    }
    $('.page-content').hide();
    const targetPageContent = $('#' + pageId + "PageContent");
    if (targetPageContent.length) {
        targetPageContent.show();
    } else {
        console.warn("Page content for '" + pageId + "' not found. Defaulting to dashboard.");
        $('#dashboardPageContent').show(); 
        pageId = 'dashboard'; 
    }
    $('.sidebar-menu a.nav-link').removeClass('active-sidebar-link');
    const activeLink = $('.sidebar-menu a.nav-link[data-page="' + pageId + '"]');
    activeLink.addClass('active-sidebar-link');
    $('.sidebar-menu .card a[data-bs-toggle="collapse"]').removeClass('active-sidebar-link');
    if (activeLink.closest('.collapse').length && !activeLink.closest('.collapse').hasClass('show')) {
        activeLink.closest('.collapse').collapse('show');
        activeLink.closest('.card').find('a[data-bs-toggle="collapse"]').addClass('active-sidebar-link');
    } else if (activeLink.attr('data-bs-toggle') === 'collapse') {
        activeLink.addClass('active-sidebar-link');
    }
    let pageTitle = "Customer Portal";
    const pageName = pageId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    if (pageId) pageTitle += " - " + pageName;
    document.title = pageTitle;
    if (pageId === 'delegation') {
        if (typeof populateDelegationUserSelects === 'function') populateDelegationUserSelects();
        if (typeof renderDelegations === 'function') renderDelegations(); 
        if (typeof populateUserAccessSummarySelect === 'function') {
            if ($('#userAccessSummarySelect').val() && $('#userAccessSummarySelect').val() !== "") {
                $('#userAccessSummarySelect').trigger('change');
            } else {
                $('#grantsAccessToCount').text('N/A').removeClass('text-danger text-success').addClass('text-primary');
                $('#hasAccessToCount').text('N/A').removeClass('text-danger text-success').addClass('text-primary');
            }
        }
    } else if (pageId === 'people') {
        if (typeof renderPeoplePage === 'function') renderPeoplePage();
    } else if (pageId === 'create-signature') {
        if (typeof initializeSignatureEditor === 'function') initializeSignatureEditor();
    } else if (pageId === 'list-signatures') {
        if (typeof renderSignaturesList === 'function') renderSignaturesList();
    }
}
// --- End Master Page Controller ---

// --- Document Ready Initializations ---
$(document).ready(function() {
    loadSignatures();
    
    if (document.getElementById('successDelegationModal')) {
        new bootstrap.Modal(document.getElementById('successDelegationModal'));
    }
    if (document.getElementById('dangerDelegationModal')) {
        new bootstrap.Modal(document.getElementById('dangerDelegationModal'));
    }
    
    function initializeSelect2Fields() {
        if ($('#delegatorEmail').data('select2')) $('#delegatorEmail').select2('destroy');
        if ($('#delegateEmail').data('select2')) $('#delegateEmail').select2('destroy');
        if ($('#userAccessSummarySelect').data('select2')) $('#userAccessSummarySelect').select2('destroy');
        if ($('#delegatorEmail').length) { $('#delegatorEmail').select2({ placeholder: "Select Delegator Email...", allowClear: true, width: '100%', searchInputPlaceholder: "Search Delegator Email..." }); }
        if ($('#delegateEmail').length) { $('#delegateEmail').select2({ placeholder: "Search and select delegate(s)...", allowClear: true, width: '100%', searchInputPlaceholder: "Search Delegate Email..." }); }
        if (typeof populateUserAccessSummarySelect === 'function') { populateUserAccessSummarySelect(); }
    }

    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        const userEmail = sessionStorage.getItem('loggedInUserEmail');
        updateSidebarUser(userEmail);
        showAppScreen();
        initializeSelect2Fields(); 
        $(window).trigger('hashchange'); 
    } else {
        showLoginScreen();
    }
    
    $('#loginForm').on('submit', function(event) {
        event.preventDefault();
        const email = $('#loginEmail').val();
        const password = $('#loginPassword').val();
        const loginError = $('#loginError');
        const user = mockPortalUsers.find(u => u.id === email);
        if (user && password === DEMO_PASSWORD) {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('loggedInUserEmail', user.id);
            updateSidebarUser(user.id);
            showAppScreen();
            initializeSelect2Fields(); 
            if (!window.location.hash || window.location.hash === "#" || window.location.hash === "#logout") {
                window.location.hash = 'dashboard';
            } else {
                $(window).trigger('hashchange');
            }
        } else {
            loginError.text('Invalid email or password. (Hint: use password123)').show();
        }
    });

    $('.sidebar-menu a.nav-link').on('click', function(e) {
        const page = $(this).data('page');
        if (page && $(this).attr('href').startsWith('#')) { 
            e.preventDefault(); 
            if(window.location.hash !== '#' + page || page === 'logout') { 
                window.location.hash = page;
            } else {
                showPage(page); 
            }
        } else if (!page && $(this).attr('href') === '/') { 
            e.preventDefault();
            if(window.location.hash !== '#dashboard') { 
                window.location.hash = 'dashboard';
            } else {
                showPage('dashboard');
            }
        }
    });
    
    $(window).on('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (sessionStorage.getItem('isLoggedIn') === 'true') {
            showPage(hash || 'dashboard', true);
        } else if (hash === 'logout') { 
            showPage('logout');
        } else {
            showLoginScreen(); 
        }
    });

    const addDelegationForm = $('#addDelegationForm');
    if (addDelegationForm.length) {
        addDelegationForm.on('submit', function(event) {
            event.preventDefault();
            const delegatorEmail = $('#delegatorEmail').val();
            const selectedDelegateEmails = $('#delegateEmail').val(); 
            const alertPlaceholder = $('#alertPlaceholder');
            function showInlineAlert(message, type = 'warning') {
                if(!alertPlaceholder.length) return;
                const alertId = 'inline-alert-' + Date.now();
                const alertHtml = $(`<div id="${alertId}" class="alert alert-${type} alert-dismissible fade show mt-3" role="alert"></div>`).html(message.replace(/\n/g, '<br>')).prepend('<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>');
                alertPlaceholder.html(alertHtml); 
                setTimeout(() => { $('#' + alertId).fadeOut(500, function() { $(this).remove(); }); }, 5000); 
            }
            if (!delegatorEmail) { showInlineAlert('Delegator Email must be selected.'); return; }
            if (!selectedDelegateEmails || selectedDelegateEmails.length === 0) { showInlineAlert('At least one Delegate must be selected.'); return; }
            let successfulDelegationsCount = 0;
            let processingMessages = []; 
            let delegatorEntry = delegationsData.find(d => d.delegatorEmail === delegatorEmail);
            if (!delegatorEntry) {
                delegatorEntry = { delegatorEmail: delegatorEmail, delegates: [] };
                delegationsData.push(delegatorEntry);
            }
            selectedDelegateEmails.forEach(delegateEmail => {
                if (delegatorEmail === delegateEmail) { processingMessages.push(`Skipped: Delegator and Delegate cannot be the same (${delegateEmail}).`); return; }
                if (delegatorEntry.delegates.some(dl => dl.delegateEmail === delegateEmail)) { processingMessages.push(`Skipped: ${delegateEmail} is already a delegate for ${delegatorEmail}.`); return; }
                delegatorEntry.delegates.push({ delegateEmail: delegateEmail, delegationId: generateDelegationId(delegatorEmail, delegateEmail) });
                successfulDelegationsCount++;
            });
            if (successfulDelegationsCount > 0) {
                renderDelegations(); 
                let successMsg = `${successfulDelegationsCount} user(s) successfully delegated for ${delegatorEmail}.`;
                if (processingMessages.length > 0) { successMsg += ` Some users were skipped.`; console.warn("Delegation processing issues:\n" + processingMessages.join("\n")); }
                showGlobalSuccessModal(successMsg);
                $('#delegatorEmail').val(null).trigger('change.select2');
                $('#delegateEmail').val(null).trigger('change.select2'); 
                alertPlaceholder.empty(); 
                if ($('#userAccessSummarySelect').val() && $('#userAccessSummarySelect').val() !== "") $('#userAccessSummarySelect').trigger('change');
            } else if (processingMessages.length > 0) { showInlineAlert("No new delegations were added. Issues encountered:\n" + processingMessages.join("\n"), 'warning');
            } else { showInlineAlert("No action taken. Please check your selections.", 'info'); }
        });
    }

    $('#delegationsTable tbody').on('click', '.delegate-toggle-control', function() {
        const delegatorEmail = $(this).data('delegator-email');
        const targetExpansionState = $(this).data('target-expansion-state'); 
        const container = $(this).closest('.delegates-list'); 
        if (container.length) displayDelegatesForEntry(delegatorEmail, container, targetExpansionState);
        else console.error("Could not find .delegates-list container for delegator:", delegatorEmail);
    });
    $('#userAccessSummarySelect').on('change', function() {
        const selectedUserEmail = $(this).val();
        const grantsAccessToCountSpan = $('#grantsAccessToCount');
        const hasAccessToCountSpan = $('#hasAccessToCount');
        if (!selectedUserEmail) {
            grantsAccessToCountSpan.text('N/A').removeClass('text-danger text-success').addClass('text-primary');
            hasAccessToCountSpan.text('N/A').removeClass('text-danger text-success').addClass('text-primary');
            return;
        }
        let grantsAccessCount = 0;
        const delegatorEntry = delegationsData.find(d => d.delegatorEmail === selectedUserEmail);
        if (delegatorEntry && delegatorEntry.delegates) grantsAccessCount = delegatorEntry.delegates.length;
        grantsAccessToCountSpan.text(grantsAccessCount).removeClass('text-primary text-danger text-success').addClass(grantsAccessCount > 0 ? 'text-success' : 'text-danger');
        let hasAccessCount = 0;
        delegationsData.forEach(entry => { if (entry.delegates && entry.delegates.some(delegate => delegate.delegateEmail === selectedUserEmail)) hasAccessCount++; });
        hasAccessToCountSpan.text(hasAccessCount).removeClass('text-primary text-danger text-success').addClass(hasAccessCount > 0 ? 'text-success' : 'text-danger');
    });
    //Management signature preview
    $(document).on('click', '#managementSignaturePreview .btn-primary', function(e) {
        e.preventDefault();
        const managementSignature = signaturesData.find(sig => sig.isManagementSignature);
        if (managementSignature) {
            window.location.hash = 'create-signature';
            setTimeout(() => initializeSignatureEditor(managementSignature.html, managementSignature.id), 100);
        } else {
            window.location.hash = 'create-signature';
            setTimeout(() => initializeSignatureEditor('', null), 100);
        }
    });
    //Edit Signature
    $(document).on('click', '.edit-signature', function() {
        const id = $(this).data('id');
        const signature = signaturesData.find(sig => sig.id === parseInt(id));
        if (signature) {
            window.location.hash = 'create-signature';
            setTimeout(() => initializeSignatureEditor(signature.html, signature.id), 100);
        }
    });
    //Activate/Deactivate Signature
    $(document).on('click', '.deactivate-signature', function() {
        const id = parseInt($(this).data('id'));
        const signature = signaturesData.find(sig => sig.id === id);
        if (signature) {
            signature.isActive = !signature.isActive;
            saveSignatures();
            renderSignaturesList();
            showGlobalSuccessModal(`Signature ${signature.isActive ? 'activated' : 'deactivated'} successfully.`);
        }
    });
    //Apply Signature domain wide
    $(document).on('click', '.apply-domain-wide', function() {
        const id = parseInt($(this).data('id'));
        showGlobalSuccessModal(`Action: Applying signature with ID ${id} to the entire domain.`);
    });
    //Apply signature departmental wide
    $(document).on('click', '.apply-dept-wide', function() {
        const id = parseInt($(this).data('id'));
        showGlobalSuccessModal(`Action: Applying signature with ID ${id} to the entire department.`);
    });
    //Signature delete function
    $(document).on('click', '.delete-signature', function() {
        const id = parseInt($(this).data('id'));
        if (confirm('Are you sure you want to delete this signature?')) {
            const indexToDelete = signaturesData.findIndex(sig => sig.id === id);
            if (indexToDelete !== -1) {
                signaturesData.splice(indexToDelete, 1);
                saveSignatures();
                renderSignaturesList();
                showGlobalDangerModal('Signature deleted successfully.');
            }
            
        }
    });
});