export default {
    CommonStatus: {
        WAITING: "Waiting",
        REJECT: "Reject ",
        APPROVED: "Approved",
    },
    OwnerPermissionStatus: {
        SHARED: "Allocate completed",
        CLOSED: "Confirmed the list of shareholders with VSDC",
    },
    RoleType: {
        ADMIN: "Admin",
        MAJOR: "Major",
    },
    RegistrationInformation: {
        Option1:
            "Submit directly to focal point of VPBank, through the Forwarder with the information registered below.",
        Option2: "Send by post (express delivery.",
        Option3: "The issuer hands over to VPBank",
    },
    TransactionWithdrawType: {
        VSD: "Request to withdraw securities from VSDC (Vietnamese securities depositoty)",
        VPB: "Request to withdraw securities from VPBank",
    },
    OrderAfmastType: {
        OrderAfmast: "Total cash amount to be paid for right subscription",
    },
    TransactionDepositoryType: {
        VSD: "Proposal for securities deposit at VSDC (Vietnamese securities depositoty)",
        VPB: "Requirements for VPB’s securities depository",
    },
    PlaceWithdrawDepositoryType: {
        VSD: "VSD",
        VPB: "VPB",
    },
    StockType: {
        WAITING_TRANSACTION: "Waiting for trading date",
        TRANSACTION: "Transferable",
    },
    StatementType: {
        BUY: "Buy",
        SELL: "Sell",
    },
    StatementImportType: {
        CUSTOMER_1: "Form type 1",
        CUSTOMER_2: "Form type 2",
    },
    DOCUMENT_TYPE: {
        DOCUMENT_1: "Identity card",
        DOCUMENT_2: "Passport",
        DOCUMENT_3: "Business registration certificate",
        DOCUMENT_4: "Establishment licenses",
    },
    ReceiveWay: {
        ReceiveWay_fromVPB: "Received directly from VPBank",
        ReceiveWay_fromPost: "Received by post",
    },
    orderbyTime: {
        ASCENDING: "Ascending",
        DECREASE: "Decreasing",
    },
    ThqType: {
        DIVIDEND_CASH: "Cash dividend",
        DIVIDEND_STOCK: "Stock dividend",
        GIFT_STOCK: "Bonus issue",
        SPLIT_STOCK: "Stock split",
        MERGE_STOCK: "Stock merge",
        BUY_STOCK: "Right issue",
        BUY_OTHER_STOCK: "Share conversion",
        EXCHANGE_BONDS: "Bond conversion",
        PAY_INTEREST: "Bond coupons and redemption",
        SHAREHOLDER: "Proxy voting - Postal Ballot",
        MEETING_SHAREHOLDER: "Proxy voting - AGM/EGM",
    },
    LookupStatementStatus: {
        WAITING: "Waiting for approval",
        APPROVED: "Approved",
        WAITING_CONFIRM: "Waiting for confirmation",
        REJECT: "Reject",
        WAITING_ACTION: "Waiting for implementation",
        MATCHING: "Partial match",
        MATCHING_ALL: "All match",
        CANCEL: "Cancel",
        PAY: "Paid",
        EXPIRE: "Expired",
    },
    LookupOwnerPermissionStatus: {
        WAITING: "Waiting for approval",
        APPROVED: "APPROVED",
        REPORTED: "Confirmed the list of shareholders with VSDC",
        RIGHT_ALLOCATED: "Allocate rights",
        RIGHT_REPORTED:
            "Confirmed the list of shareholders with VSDC on right issue event",
        DONE: "Complete the registration to buy additional issued securities",
        ALLOCATION_PENDING: "Waiting for implementation",
        COMPLETED: "Completed",
        REJECT: "Reject",
        WAITING_STOCK:
            "Waiting for approval of securities waiting for trading to trade",
        APPROVED_STOCK: "Approved securities waiting for trading to trade",
    },
    system: {
        messageTryAgain: "An error occurred. Please try again later.",
        result: "result",
        results: "results",
    },
    validation: {
        required: "is required",
        number: "is a number",
        string: "is a string",
        maxQuantity: "greater than the available balance",
        isInteger: "is an integer",
        password: "must include letters and numbers",
        passwordLength: "Minimum of 8 characters",
        phone: "invalid",
        email: "invalid",
        passwordValidate:
            "must include special characters, lowercase letters, uppercase letters and numbers",
        username: "invalid",
        numberPaper: "invalid",
        passwordRepeat: "Re-entered password is not correct",
    },
    auth: {
        license: "© 2020 VPBank – Copyright is protected",
        logout: {
            label: "Log out",
        },
        login: {
            title: "Login",
            username: {
                label: "Account",
                placeholder: "Enter account",
            },
            password: {
                label: "Password",
                placeholder: "enter password",
            },
            btn: "Log in",
        },
        resetPassword: {
            title: "Reset password",
            username: {
                label: "User name",
                placeholder: "Enter user name",
            },
            email: {
                label: "Email",
                placeholder: "Enter email",
            },
            phone: {
                label: "Phone number",
                placeholder: "Enter phone number",
            },
            btn: "Confirm",
            success: {
                title: "Password reset successful",
                message:
                    "Your password has been sent to your email, please check and login again",
                btn: "Back to login screen",
            },
        },
        changePassword: {
            title: "Change password",
            passwordCurrent: {
                label: "Current password",
                placeholder: "Enter current password",
            },
            passwordNew: {
                label: "New password",
                placeholder: "Enter new password",
            },
            passwordRepeat: {
                label: "Enter a new password",
                placeholder: "Enter a new password",
            },
            btn: "Confirm",
            success: {
                title: "Change password successfully",
                message:
                    "You have successfully changed your password, please login again",
                btn: "Back to login screen",
            },
        },
    },
    user: {
        profile: {
            label: "Information",
        },
        approveAutoLabel: "auto approve",
    },
    role: {
        roleChooseTitle: "Select feature for permission group",
        listApproveWaiting: "Waiting list for approval",
    },
    transaction: {
        userTitle: "User information",
        infoTHQTitle: "Corporate Actions Information",
        infoRegisterTitle: "Register information",
        requestDepositoryVPBTitle: "Requirements to deposit securities at VPB",
        requestDepositoryVSDTitle: "Requirements to deposit securities at VSD",
        requestWithdrawChooseVPBTitle: "Choose securities deposit",
        requestWithdrawVPBTitle:
            "Confirmation of securities deposit information",
        requestWithdrawVSDTitle: "Request to withdraw securities at VSD",
        importFormTitle: "File information",
        infoMoneyAccount: "Money account information",
        requestWithdrawVPBTitleII:
            "Register information to receive the original Book/Certificate of securities ownership",
    },
    field: {
        username: {
            label: "Login name",
            placeholder: "Enter login name",
        },
        name: {
            label: "User name",
            placeholder: "Enter user name",
        },
        email: {
            label: "Email",
            placeholder: "Enter Email",
        },
        phone: {
            label: "Phone number",
            placeholder: "Enter phone number",
        },
        password: {
            label: "Password",
            placeholder: "Enter password",
        },
        depositoryAccount: {
            label: "Related custodial account",
            placeholder: "Select the relevant Depository Account",
        },
        depositoryAccountName: {
            label: "Depository account name",
            placeholder: "Enter depository account name",
        },
        typePaper: {
            label: "Type of paper",
            placeholder: "Select type of paper",
        },
        numberPaper: {
            label: "Number of paper",
            placeholder: "Enter number of paper",
        },
        status: {
            label: "Status",
            placeholder: "Select status",
        },
        depositoryAccountNumber: {
            label: "Securities depository account",
            placeholder: "Select deposit account number",
        },
        createdBy: {
            label: "Maker",
            placeholder: "Enter name of Maker",
        },
        approveDenyBy: {
            label: "Checker",
            placeholder: "Enter name of Checker",
        },
        transactionDate: {
            label: "Transaction date",
            placeholder: "DD/MM/YYYY",
        },
        registerTransactionDate: {
            label: "Registration Date",
            placeholder: "DD/MM/YYYY",
        },
        transactionCode: {
            label: "Securities code",
            placeholder: "Enter securities code",
        },
        transactionType: {
            label: "Type of transaction",
            placeholder: "Select Type of transaction",
        },
        transactionId: {
            label: "Transaction code",
            placeholder: "Enter transaction code",
        },
        stockType: {
            label: "Securities type",
            placeholder: "Select Securities type",
        },
        roleName: {
            label: "Permission group name",
            placeholder: "Enter permission group name",
        },
        roleType: {
            label: "Type of rights group",
            placeholder: "Select type of rights group",
        },
        registration: {
            label: "Registration of information on original handover of Book/Certificate of securities ownership (in case of securities depository)",
            placeholder:
                "Select information to hand over the original Book/Certificate of securities ownership",
        },
        autoApprove: {
            label: "Auto approve",
            placeholder: "Auto approve",
        },
        accountName: {
            label: "Customer's name",
            placeholder: "Enter account's name",
        },
        address: {
            label: "Address",
            placeholder: "Enter address",
        },
        thqCode: {
            label: "CA Event ID",
            placeholder: "Select CA Event ID",
        },
        thqName: {
            label: "Type of CA",
            placeholder: "Enter type of CA",
        },
        stockCode: {
            label: "Securities code",
            placeholder: "Select securities code",
        },
        registerDate: {
            label: "Record date",
            placeholder: "DD/MM/YYYY",
        },
        expiredDate: {
            label: "Deadline for right subscription",
            placeholder: "Select deadline for right subscription",
        },
        ratio: {
            label: "Exercise rate",
            placeholder: "Enter exercise rate",
        },
        purchasePrice: {
            label: "Subscription price",
            placeholder: "Enter subscription price",
        },
        permissionQuantity: {
            label: "Number of owned rights",
            placeholder: "Enter number of owned rights",
        },
        numberOfSecuritiesPurchased: {
            label: "Number of new shares to purchase",
            placeholder: "Enter Number of new shares to purchase",
        },
        paidQuantity: {
            label: "Number of securities purchased",
            placeholder: "Enter number of securities purchased",
        },
        numberOfEntitlements: {
            label: "Number of remaining rights",
            placeholder: "Enter number of remaining rights",
        },
        registerPermissionQuantity: {
            label: "Number of registration rights",
            placeholder: "Enter number of registration rights",
        },
        registerStockQuantity: {
            label: "Number of securities registered",
            placeholder: "Enter number of securities registered",
        },
        remainingRights: {
            label: "Number of remaining rights",
            placeholder: "Enter number of remaining rights",
        },
        payAmount: {
            label: "Subscription amount",
            placeholder: "Enter subscription amount",
        },
        paymentAmount: {
            label: "Cash amount to be paid",
            placeholder: "Enter cash amount to be paid",
        },
        note: {
            label: "Note",
            placeholder: "Enter note",
        },
        noteRegisterBuyingStock: {
            label: "Note: You can only register right issue to buy additional shares before the deadline for right subscription",
            placeholder:
                "Note: You can only register right issue to buy additional shares before the deadline for right subscription",
        },
        voucherNumber: {
            label: "Number of vouchers",
            placeholder: "Enter number of vouchers",
        },
        TDCNQuantity: {
            label: "Freely transferable quantity",
            placeholder: "Enter freely transferable quantity",
        },
        HCCNQuantity: {
            label: "Limited number of transfers",
            placeholder: "Enter limited number of transfers",
        },
        importDate: {
            label: "Import date",
            placeholder: "DD/MM/YYYY",
        },
        approveDate: {
            label: "Approve/reject date",
            placeholder: "DD/MM/YYYY",
        },
        depositoryPlace: {
            label: "Place to request deposit",
            placeholder: "Select place to request deposit",
        },
        serialNumber: {
            label: "Serial number",
            placeholder: "Enter serial number",
        },
        stockQuantity: {
            label: "Value",
            placeholder: "Enter value",
        },
        stockValue: {
            label: "Value",
            placeholder: "Enter value",
        },
        costPrice: {
            label: "Cost of capital",
            placeholder: "Enter Cost of capital",
        },
        releaseCode: {
            label: "Release code",
            placeholder: "Enter Release code",
        },
        withdrawPlace: {
            label: "Place to request withdrawal",
            placeholder: "Select place to request withdrawal",
        },
        file: {
            label: "File",
            placeholder: "Select file",
        },
        companyCode: {
            label: "Code of securities company placing orders",
            placeholder: "Code of securities company placing orders",
        },
        statementType: {
            label: "Type of order",
            placeholder: "Type of order",
        },
        payDate: {
            label: "Payment date",
            placeholder: "Payment date",
        },
        price: {
            label: "Price",
            placeholder: "Price",
        },
        totalPrice: {
            label: "Total transaction value",
            placeholder: "Total transaction value",
        },
        userQuantity: {
            label: "The amount of people in charge",
            placeholder: "The amount of people in charge",
        },
        userApproveWaiting: {
            label: "The amount of people waiting for approval",
            placeholder: "The amount of people waiting for approval",
        },
        roleQuantity: {
            label: "Number of rights groups",
            placeholder: "Number of rights groups",
        },
        THQType: {
            label: "Type of CA",
            placeholder: "Type of CA",
        },
        moneyAccount: {
            label: "Bank account no.",
            placeholder: "Bank account no.",
        },
        surplus: {
            label: "Surplus",
            placeholder: "Account Balance",
        },
        pendingBalance: {
            label: "Pending balance",
            placeholder: "Pending balance",
        },
        availableBalances: {
            label: "Available balance",
            placeholder: "Available balance",
        },
        permissionStockNumber: {
            label: "Entitled holding",
            placeholder: "Entitled holding",
        },
        amountMoney: {
            label: "Cash amount before tax",
            placeholder: "Cash amount before tax",
        },
        amountAfterTax: {
            label: "Cash amount after tax",
            placeholder: "Cash amount after tax",
        },
        stockNewQuantity: {
            label: "Number of new shares",
            placeholder: "Number of new shares",
        },
        moneyExchange: {
            label: "Payment for fractional shares",
            placeholder: "Payment for fractional shares",
        },
        KHQTransactionFrom: {
            label: "Ex-Dividend starting date",
            placeholder: "Ex-Dividend starting date",
        },
        KHQTransactionTo: {
            label: "Ex-Dividend ending date",
            placeholder: "Ex-Dividend ending date",
        },
        THQDate: {
            label: "Payment date",
            placeholder: "Payment date",
        },
        ratioExchangeStockToPermission: {
            label: "Right allocation",
            placeholder: "Right allocation",
        },
        ratioExchangePermissionToStock: {
            label: "Right execution",
            placeholder: "Right execution",
        },
        ratioExchangePermissionToMoney: {
            label: "Payment rate (%)",
            placeholder: "Payment rate (%)",
        },
        ratioBonds: {
            label: "Bond interest rate (%)",
            placeholder: "Bond interest rate (%)",
        },
        exchangeStockToPermission: {
            label: "Fractional shares",
            placeholder: "Fractional shares",
        },
        transferPermission: {
            label: "Right transfer",
            placeholder: "Right transfer",
        },
        transferFromDate: {
            label: "Transfer rights starting date",
            placeholder: "Transfer rights starting date",
        },
        transferToDate: {
            label: "Transfer rights ending date",
            placeholder: "Transfer rights ending date",
        },
        statementImportType: {
            label: "Command Type",
            placeholder: "Select command type",
        },
        commissionFee: {
            label: "Brokerage fees",
            placeholder: "Brokerage fees",
        },
        transFee: {
            label: "Transaction fee",
            placeholder: "Transaction fee",
        },
        tax: {
            label: "Tax",
            placeholder: "Tax",
        },
        netAmount: {
            label: "Net amount",
            placeholder: "Net amount",
        },
        description: {
            label: "Description",
            placeholder: "Description",
        },
        tickerCode: {
            label: "TickerCode",
            placeholder: "TickerCode",
        },
        ccy: {
            label: "Unit",
            placeholder: "Unit",
        },
        isinCode: {
            label: "ISIN code",
            placeholder: "ISIN code",
        },
        orderNo: {
            label: "Order number",
            placeholder: "Order number",
        },
        pendAmount: {
            label: "Amount to be paid/multiplied",
            placeholder: "Amount to be paid/multiplied",
        },
        purchaseNewPrice: {
            label: "Subscription price",
            placeholder: "Subscription price",
        },
        taxCollect: {
            label: "Tax collection code",
            placeholder: "Tax collection code",
        },
        clearDay: {
            label: "Payment cycle",
            placeholder: "Payment cycle",
        },
        orderNumber: {
            label: "Order Number",
            placeholder: "Order Number",
        },
        orderbyTime: {
            label: "Sort",
            placeholder: "Sort",
        },
        ascending: {
            label: "Ascending",
            placeholder: "Ascending",
        },
        decrease: {
            label: "Decreasing",
            placeholder: "Decreasing",
        },
        indexNumber: {
            label: "STT",
            placeholder: "STT",
        },
        startDate: { label: "Start date", placeholder: "Start date" },
        endDate: { label: "End date", placeholder: "End date" },
        bookNumber: {
            label: "Book number/certificate of securities ownership",
            placeholder:
                "Enter Book number/certificate of securities ownership",
        },
        receiver: {
            label: "Receiver",
            placeholder: "Enter the recipient's name",
        },
        numberCitizenIdentification: {
            label: "ID number/passport",
            placeholder: "ID number/passport ",
        },
        receiveWay: {
            label: "Choose way to receive",
            placeholder: "Choose way to receive",
        },
        fund: {
            label: "Fund Code",
            placeholder: "Fund Code",
        },
        contractNumber: {
            label: "Contract Number",
            placeholder: "Contract Number",
        },
        transType: {
            label: "Transaction Type",
            placeholder: "Transaction Type",
        },
        contractType: {
            label: "Contract Type",
            placeholder: "Contract Type",
        },
        CdCode: {
            label: "CD Code",
            placeholder: "CD Code",
        },
        secCode: {
            label: "Security Code",
            placeholder: "Security Code",
        },
        settlementAmount: {
            label: "Settlement Amount",
            placeholder: "Settlement Amount",
        },
        cleanAmount: {
            label: "Clean Amount",
            placeholder: "Clean Amount",
        },
        coupon: {
            label: "Coupon",
            placeholder: "Coupon",
        },
        transferFee: {
            label: "Transfer Fee",
            placeholder: "Transfer Fee",
        },
        counterParty: {
            label: "Counter Party",
            placeholder: "Counter Party",
        },
        custodyCd: {
            label: "Custody Cd",
            placeholder: "Custody Cd",
        },
        fullName: {
            label: "Full Name",
            placeholder: "Full Name",
        },
        dbCode: {
            label: "Db Code",
            placeholder: "Db Code",
        },
        bankAcName: {
            label: "Bank Ac Name",
            placeholder: "Bank Ac Name",
        },
        cityBank: {
            label: "City Bank",
            placeholder: "City Bank",
        },
        bankAcc: {
            label: "Bank Acc",
            placeholder: "Bank Acc",
        },
        tradingId: {
            label: "Trading Id",
            placeholder: "Trading Id",
        },
        execName: {
            label: "Exec Name",
            placeholder: "Exec Name",
        },
        txDate: {
            label: "Tx Date",
            placeholder: "NTx Date",
        },
        matchQtty: {
            label: "Match Qtty",
            placeholder: "Match Qtty",
        },
        nav: {
            label: "Nav",
            placeholder: "Nav",
        },
        matchAmt: {
            label: "Match Amt",
            placeholder: "Match Amt",
        },
        taxAmt: {
            label: "Tax Amt",
            placeholder: "Tax Amt",
        },
        feeAmc: {
            label: "Fee Amc",
            placeholder: "Fee Amc",
        },
        feeDxx: {
            label: "Fee Dxx",
            placeholder: "Fee Dxx",
        },
        feeFund: {
            label: "Fee Fund",
            placeholder: "Fee Fund",
        },
        contractDate: {
            label: "Contract Date",
            placeholder: "Contract Date",
        },
        valueDate: {
            label: "Value Date",
            placeholder: "Value Date",
        },
        depositoryBank: {
            label: "Depository Bank",
            placeholder: "Depository Bank",
        },
        principal: {
            label: "Principal",
            placeholder: "Principal",
        },
        maturityDate: {
            label: "Maturity Date",
            placeholder: "Maturity Date",
        },
        interestRate: {
            label: "Interest Rate",
            placeholder: "Interest Rate",
        },
        currency: {
            label: "Currency",
            placeholder: "Currency",
        },
        dayBasic: {
            label: "Day Basic",
            placeholder: "Day Basic",
        },
        interestPeriod: {
            label: "Interest Period",
            placeholder: "Interest Period",
        },
        interestAccrualMethod: {
            label: "Interest Accrual Method",
            placeholder: "Interest Accrual Method",
        },
        interestFrequency: {
            label: "Interest Frequency",
            placeholder: "Interest Frequency",
        },
        contractExchangeRate: {
            label: "Contract Exchange Rate",
            placeholder: "Contract Exchange Rate",
        },
        quantity: {
            label: "Quantity",
            placeholder: "Quantity",
        },
        amount: {
            label: "Amount",
            placeholder: "Amount",
        },
        tradeDate: {
            label: "Trade Date",
            placeholder: "Trade Date",
        },
        settlementDate: {
            label: "Settlement Date",
            placeholder: "Settlement Date",
        },
        ownerTransferFee: {
            label: "Owner Transfer Fee",
            placeholder: "Owner Transfer Fee",
        },
        brokerCode: {
            label: "Broker Code",
            placeholder: "Broker Code",
        },
        grossAmount: {
            label: "Gross Amount",
            placeholder: "Gross Amount",
        },
        brokerFee: {
            label: "Broker Fee",
            placeholder: "Broker Fee",
        },
        eTFDate: {
            label: "ETF Date",
            placeholder: "ETF Date",
        },
        ap: {
            label: "AP Code",
            placeholder: "AP Code",
        },
        broker: {
            label: "Broker",
            placeholder: "Broker",
        },
        position: {
            label: "Position",
            placeholder: "Position",
        },
        type: {
            label: "Type",
            placeholder: "Type",
        },
        vsdFee: {
            label: "VSD Fee",
            placeholder: "VSD Fee",
        },
        hnxFee: {
            label: "HNX Fee",
            placeholder: "HNX Fee",
        },
        openPositionPrice: {
            label: "Open Position Price",
            placeholder: "Open Position Price",
        },
        endingPrice: {
            label: "Ending Price",
            placeholder: "Ending Price",
        },
        placementDate: {
            label: "Placement Date",
            placeholder: "Placement Date",
        },
        maturityDate: {
            label: "Maturity Date",
            placeholder: "Maturity Date",
        },
        ticker: {
            label: "Ticker",
            placeholder: "Ticker",
        },
        allocatedDate: {
            label: "Allocated Date",
            placeholder: "Allocated Date",
        },
        tradeAmount: {
            label: "Trade Amount",
            placeholder: "Trade Amount",
        },
        fee: {
            label: "Fee",
            placeholder: "Fee",
        },
        bankCode: {
            label: "Bank Code",
            placeholder: "Bank Code",
        },
        bankName: {
            label: "Bank Name",
            placeholder: "Bank Name",
        },
        organizationCode: {
            label: "Organization Code",
            placeholder: "Organization Code",
        },
        organizationName: {
            label: "Organization Name",
            placeholder: "Organization Name",
        },
        abbreviations: {
            label: "Abbreviations",
            placeholder: "Abbreviations",
        },
        descriptionFa: {
            label: "Description",
            placeholder: "Description",
        },
        ccqCode: {
            label: "CCQ Code",
            placeholder: "CCQ Code",
        },
    },
    listTabImportFa: {
        fundCertificates: "Fund Certificates",
        td: "Investment TD",
        cd: "Investment CD",
        tradingLs: "Trading Ls",
        tradingUs: "Trading Us",
        derivatives: "Derivatives",
        loanContracts: "Loan Contracts",
        tradingFundCert: "Trading Fund Cert",
        oddLotsOrder: "OddLots Order",
        listBank: "List Bank",
        listOrganization: "List Organization",
    },
    menu: {
        lookupBalance: "Looking up the balance",
        lookupStatement: "Looking up the statement",
        lookupPermission: "Look up Corporate Actions",
        lookupInfoPermission: "Look up Corporate Event Announcement",
        lookupOwnerPermission: "Look up Corporate Event Entitlement",
        manage: "Management",
        manageUser: "User management",
        manageUserApprove: "User information approval",
        manageRole: "Manage group permissions",
        manageRoleApprove: "Approve permission group information",
        manageRoleUser: "User permissions",
        approveTransaction: "Transaction approval",
        order: "Register Right issue",
        import: "Import order confirmation",
        requestDepository: "Securities deposit required",
        requestWithdraw: "Request to withdraw stock",
        transaction: "Transaction",
        lookupTransaction: "Look up Transaction",
        fundAdmin: "Fund admin",
        fundAdminImport: "Import data transaction",
        fundAdminApprove: "Approve imported data",
        fundAdminDetail: "Details of entered data",
    },
    button: {
        add: "Add",
        addUser: "Add user",
        addRole: "Add role",
        addImport: "Add import",
        faImport: "import transaction",
        search: "Search",
        reset: "Reset",
        confirm: "Confirm",
        save: "SWave",
        delete: "Delete confirmation",
        reject: "Reject",
        approve: "Approve",
        downloadTemplate: "Download",
        next: "Next",
        nextUpdate: "Continue to edit",
        authorizationUser: "User authorization",
        back: "Back",
        understand: "Understood",
        getActiveCode: "Get active code",
        notification: "Notification",
        goHome: "Go home",
        logout: "Logout",
        refresh: "Refresh",
        download: "Download",
        downloadHTML: "Download HTML",
        downloadXML: "Download XML",
        downloadHTML_XML: "Download HTML/XML",
        downloadFileImportFa: "Download file import",
    },
    title: {
        addUser: "Add user",
        addRole: "Add new permission group",
        addOrder: "Register Right Issue",
        addRequestDepository: "Add New: Securities Deposit Request",
        addRequestWithdraw: "Add New: Request to withdraw securities",
        order: "Register Right Issue",
        update: "update",
        detail: "detail",
        delete: "delete",
        approve: "Approve/ Reject",
        import: "Order confirmation",
        sreachAfmast: "Related custodial account",
        functional: "Functional",
        notify: "Notification",
        from: "From",
        to: "To",
        importTransaction: "Import transaction data",
    },
    permission: {
        view: "View",
        update: "Fix",
        delete: "Delete",
        create: "Add new",
        approve: "Approve/reject",
    },
    message: {
        confirmDeleteUserFromRole:
            "Do you want to remove this person from right groups?",
        confirmApproveUserToRole:
            "Do you want to approve this person to the right groups?",
        confirmRejectUserToRole:
            "Do you want to reject this person to the right groups?",
    },
    errorPage: {
        forbidden: {
            title: "You do not have access. Please check with the administrator again.",
            titleNothing:
                "You do not have access to any functionality. Please check with the administrator again",
        },
        notFound: {
            title: "Not found",
        },
    },
    maintenancePage: {
        title: "The website is under maintenance. Please come back later.",
        des: "Website is in maintenance phase.",
    },
    function: {
        choosePicture: "Choose picture",
        search: "Search",
    },
    commonLabel: {
        totalRecord: "Total",
        display: "Display",
        status: "Status",
        all: "All",
    },
    verify: {
        activeCodeLabel:
            "We have sent the active code to your email, please check your email and enter the active code into the app",
        smartOTP: "VPBank Smart OTP",
        otpLabel1: "We have sent OTP to the app",
        otpLabel2:
            'If you do not have an OTP, please use the function "Get active code"',
        confirm: "confirm",
    },
    importFile: {
        fileSize: "Maximum allowed files ",
        fileSize2: "The file size exceeds the limit allowed for file ",
        fileFormat: "File only supports .xls, .xlsx format",
        validateFile:
            "The file is not in the correct format as the sample file",
        emptyFile: "The file has empty data. Please check again",
        errorAtCol: "Error formatting date column",
        valiateAfmast:
            "Each order confirmation is only done with 1 type of deposit member can be confirm at a time  ",
        validateFileFa: "is not in the correct format as the sample file",
    },
    lookupBalance: {
        depositoryAccountNumber: "Depository account number",
        stockCode: "Securities code",
        marketPrice: "Market price",
        availableBalances: "Available Balances",
        surplusHccn: "Transfer restriction balance",
        marginBalance: "Margin balance",
        blockadeBalance: "Blockade balance",
        balanceWaitingReturn: "Balance waiting for return",
        balancePendingPayment: "Balance Pending Payment",
        balancePendingExercise: "Balance Pending Exercise",
        depositQtty: "Balance pending deposit",
        blockedOrder: "Blockade orders",
        mortageqtty: "Mortgage balance",
        totalOwnership: "Total volume of ownership",
        stockValue: "Stock value",
    },
    responseMessage: {
        success: "Success",
        tryAgainLater: "Please try again later!",
        overTimeOTP: "The number of times to enter OTP is over the limit!",
        errorOccurred: "An error occurred!",
        loginToContinue: "Please login to continue!",
        tryAgainLater2: "An error occurred, please try again later",
        otpFail: "Invalid OTP",
        expiredOTP: "Expired OTP",
    },
    changePasswordAtFirstTime: {
        requestTitle: "Reset Password",
        successTitle: "Notice",
        cancelText: "For later",
        onOkText: "I got it",
        requestDes:
            "You need to change your password to continue using your account",
        successDes:
            "Password changed successfully, please use this password in the next logins",
    },
};
