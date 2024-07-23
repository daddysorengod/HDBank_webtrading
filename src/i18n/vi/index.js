export default {
    CommonStatus: {
        WAITING: "Chờ duyệt",
        REJECT: "Từ chối",
        APPROVED: "Đã duyệt",
    },
    OwnerPermissionStatus: {
        SHARED: "Đã phân bổ",
        CLOSED: "Đã chốt DS",
    },
    RoleType: {
        ADMIN: "Quản trị",
        MAJOR: "Nghiệp vụ",
    },
    RegistrationInformation: {
        Option1:
            "Nộp trực tiếp cho đầu mối của VPBank, thông qua Người giao nhận có thông tin đăng ký dưới đây",
        Option2: "Gửi qua dịch vụ bưu chính (chuyển phát nhanh)",
        Option3: "Tổ chức phát hành chứng khoán thực hiện bàn giao với VPBank",
    },
    TransactionWithdrawType: {
        VSD: "Yêu cầu rút chứng khoán tại VSDC",
        VPB: "Yêu cầu rút chứng khoán tại VPB",
    },
    OrderAfmastType: {
        OrderAfmast: "Nộp tiền mua chứng khoán phát hành thêm",
    },
    TransactionDepositoryType: {
        VSD: "Đề nghị lưu ký chứng khoán VSDC",
        VPB: "Yêu cầu ký gửi chứng khoán VPB",
    },
    PlaceWithdrawDepositoryType: {
        VSD: "VSD",
        VPB: "VPB",
    },
    StockType: {
        WAITING_TRANSACTION: "Chờ giao dịch",
        TRANSACTION: "Giao dịch",
    },
    StatementType: {
        BUY: "Mua",
        SELL: "Bán",
    },
    StatementImportType: {
        CUSTOMER_1: "Mẫu loại 1",
        CUSTOMER_2: "Mẫu loại 2",
    },
    DOCUMENT_TYPE: {
        DOCUMENT_1: "CMND",
        DOCUMENT_2: "Hộ chiếu",
        DOCUMENT_3: "Giấy CN ĐKKD",
        DOCUMENT_4: "GPTL",
    },
    ReceiveWay: {
        ReceiveWay_fromVPB: "Nhận trực tiếp từ VPBank",
        ReceiveWay_fromPost: "Nhận qua dịch vụ bưu chính",
    },
    orderbyTime: {
        ASCENDING: "Tăng dần",
        DECREASE: "Giảm dần",
    },
    ThqType: {
        DIVIDEND_CASH: "Cổ tức bằng tiền",
        DIVIDEND_STOCK: "Cổ tức bằng cổ phiếu",
        GIFT_STOCK: "Cổ phiếu thưởng",
        SPLIT_STOCK: "Tách cổ phiếu",
        MERGE_STOCK: "Gộp cổ phiếu",
        BUY_STOCK: "Quyền mua CP phát hành thêm",
        BUY_OTHER_STOCK: "Hoán đổi cổ phiếu",
        EXCHANGE_BONDS: "Chuyển đổi trái phiếu sang chứng khoán khác",
        PAY_INTEREST: "Thanh toán lãi, vốn gốc trái phiếu",
        SHAREHOLDER: "Xin ý kiến cổ đông bằng văn bản",
        MEETING_SHAREHOLDER: "Quyền tham dự họp ĐHCĐ",
    },
    LookupStatementStatus: {
        WAITING: "Chờ duyệt",
        APPROVED: "Đã duyệt",
        WAITING_CONFIRM: "Chờ xác nhận",
        REJECT: "Từ chối",
        WAITING_ACTION: "Chờ thực hiện",
        MATCHING: "Khớp một phần",
        MATCHING_ALL: "Khớp hết",
        CANCEL: "Hủy",
        PAY: "Đã thanh toán",
        EXPIRE: "Hết hiệu lực",
    },
    LookupOwnerPermissionStatus: {
        WAITING: "Chờ duyệt",
        APPROVED: "Đã duyệt",
        REPORTED: "Chốt danh sách",
        RIGHT_ALLOCATED: "Phân bổ quyền",
        RIGHT_REPORTED: "Chốt quyền",
        DONE: "Hoàn tất đăng ký mua",
        ALLOCATION_PENDING: "Chờ thực hiện",
        COMPLETED: "Đã hoàn thành",
        REJECT: "Từ chối",
        WAITING_STOCK: "Chờ duyệt chứng khoán chờ giao dịch sang giao dịch",
        APPROVED_STOCK: "Đã duyệt chứng khoán chờ giao dịch sang giao dịch",
    },
    system: {
        messageTryAgain: "Đã xảy ra lỗi. Vui lòng thử lại sau",
        result: "kết quả",
        results: "kết quả",
    },
    validation: {
        required: "là bắt buộc",
        number: "là một số",
        string: "là một chuỗi",
        maxQuantity: "lớn hơn số dư hiện có",
        isInteger: "là một số nguyên",
        password: "phải bao gồm ký tự và chữ số",
        passwordLength: "tối thiểu 8 ký tự",
        phone: "không hơp lệ",
        email: "không hơp lệ",
        passwordValidate:
            "Mật khẩu phải tối thiểu 8 ký tự, bao gồm ký tự đặc biệt, chữ thường, chữ in hoa và số.",
        username: "không hơp lệ",
        numberPaper: "không hơp lệ",
        passwordRepeat: "Mật khẩu nhập lại chưa chính xác",
    },
    auth: {
        license: "© 2020 VPBank – Bản quyền đã được bảo hộ",
        logout: {
            label: "Đăng xuất",
        },
        login: {
            title: "Đăng nhập",
            username: {
                label: "Tài khoản",
                placeholder: "Nhập tài khoản",
            },
            password: {
                label: "Mật khẩu",
                placeholder: "Nhập mật khẩu",
            },
            btn: "Đăng nhập",
        },
        resetPassword: {
            title: "Reset mật khẩu",
            username: {
                label: "Tên đăng nhập",
                placeholder: "Nhập tên đăng nhập",
            },
            email: {
                label: "Email",
                placeholder: "Nhập Email",
            },
            phone: {
                label: "SĐT",
                placeholder: "Nhập SĐT",
            },
            btn: "Xác nhận",
            success: {
                title: "Reset mật khẩu thành công",
                message:
                    "Mật khẩu của bạn đã được gửi đến email, vui lòng kiểm tra và đăng nhập lại",
                btn: "Quay lại màn đăng nhập",
            },
        },
        changePassword: {
            title: "Đổi mật khẩu",
            passwordCurrent: {
                label: "Mật khẩu hiện tại",
                placeholder: "Nhập mật khẩu hiện tại",
            },
            passwordNew: {
                label: "Mật khẩu mới",
                placeholder: "Nhập mật khẩu mới",
            },
            passwordRepeat: {
                label: "Nhập lại mật khẩu mới",
                placeholder: "Nhập lại mật khẩu mới",
            },
            btn: "Xác nhận",
            success: {
                title: "Đổi mật khẩu thành công",
                message:
                    "Bạn đã đổi mật khẩu thành công, vui lòng đăng nhập lại",
                btn: "Quay lại màn đăng nhập",
            },
        },
    },
    user: {
        profile: {
            label: "Thông tin",
        },
        approveAutoLabel: "Duyệt tự động",
    },
    role: {
        roleChooseTitle: "Chọn tính năng cho nhóm quyền",
        listApproveWaiting: "Danh sách chờ duyệt",
    },
    transaction: {
        userTitle: "Thông tin người dùng",
        infoTHQTitle: "Thông tin đợt THQ",
        infoRegisterTitle: "Thông tin đăng ký",
        requestDepositoryVPBTitle: "Yêu cầu ký gửi chứng khoán tại VPB",
        requestDepositoryVSDTitle: "Yêu cầu ký gửi chứng khoán tại VSD",
        requestWithdrawChooseVPBTitle: "Chọn khoản ký gửi chứng khoán",
        requestWithdrawVPBTitle:
            "Xác nhận thông tin của khoản ký gửi chứng khoán",
        requestWithdrawVSDTitle: "Yêu cầu rút chứng khoán tại VSD",
        importFormTitle: "Thông tin file",
        infoMoneyAccount: "Thông tin tài khoản tiền",
        requestWithdrawVPBTitleII:
            "Đăng ký thông tin nhận bản gốc Sổ/Giấy chứng nhận sở hữu chứng khoán",
    },
    field: {
        username: {
            label: "Tên đăng nhập",
            placeholder: "Nhập tên đăng nhập",
        },
        name: {
            label: "Tên người dùng",
            placeholder: "Nhập tên người dùng",
        },
        email: {
            label: "Email",
            placeholder: "Nhập Email",
        },
        phone: {
            label: "SĐT",
            placeholder: "Nhập SĐT",
        },
        password: {
            label: "Mật khẩu",
            placeholder: "Nhập mật khẩu",
        },
        depositoryAccount: {
            label: "TKLK liên quan",
            placeholder: "Chọn TKLK liên quan",
        },
        depositoryAccountName: {
            label: "Tài khoản",
            placeholder: "Nhập tên tài khoản",
        },
        typePaper: {
            label: "Loại giấy tờ",
            placeholder: "Chọn loại giấy tờ",
        },
        numberPaper: {
            label: "Số giấy tờ",
            placeholder: "Nhập số giấy tờ",
        },
        status: {
            label: "Trạng thái",
            placeholder: "Chọn trạng thái",
        },
        depositoryAccountNumber: {
            label: "Tài khoản lưu ký chứng khoán",
            placeholder: "Chọn STK lưu ký",
        },
        createdBy: {
            label: "Người tạo",
            placeholder: "Nhập tên người tạo",
        },
        approveDenyBy: {
            label: "Người duyệt/từ chối",
            placeholder: "Nhập tên người duyệt/từ chối",
        },
        transactionDate: {
            label: "Ngày giao dịch",
            placeholder: "DD/MM/YYYY",
        },
        registerTransactionDate: {
            label: "Ngày đăng ký",
            placeholder: "DD/MM/YYYY",
        },
        transactionCode: {
            label: "Mã CK",
            placeholder: "Nhập mã CK",
        },
        transactionType: {
            label: "Loại giao dịch",
            placeholder: "Chọn loại giao dịch",
        },
        transactionId: {
            label: "Mã giao dịch",
            placeholder: "Nhập mã giao dịch",
        },
        stockType: {
            label: "Loại chứng khoán",
            placeholder: "Chọn loại chứng khoán",
        },
        roleName: {
            label: "Tên nhóm quyền",
            placeholder: "Nhập tên nhóm quyền",
        },
        roleType: {
            label: "Loại nhóm quyền",
            placeholder: "Chọn loại nhóm quyền",
        },
        registration: {
            label: "Đăng ký thông tin giao bản gốc Sổ/Giấy chứng nhận sở hữu chứng khoán (trường hợp ký gửi chứng khoán)",
            placeholder:
                "Chọn thông tin giao bản gốc Sổ/Giấy chứng nhận sở hữu chứng khoán",
        },
        autoApprove: {
            label: "Duyệt tự động",
            placeholder: "Duyệt tự động",
        },
        accountName: {
            label: "Tên Khách hàng",
            placeholder: "Nhập Tên TK",
        },
        address: {
            label: "Địa chỉ",
            placeholder: "Nhập địa chi",
        },
        thqCode: {
            label: "Mã đợt THQ",
            placeholder: "Chọn mã đợt THQ",
        },
        thqName: {
            label: "Tên đợt THQ",
            placeholder: "Nhập tên đợt THQ",
        },
        stockCode: {
            label: "Mã CK",
            placeholder: "Chọn mã CK",
        },
        registerDate: {
            label: "Ngày ĐKCC",
            placeholder: "DD/MM/YYYY",
        },
        expiredDate: {
            label: "Ngày hết hạn đăng ký mua",
            placeholder: "Chọn Ngày hết hạn đăng ký mua",
        },
        ratio: {
            label: "Tỉ lệ",
            placeholder: "Nhập tỉ lệ",
        },
        purchasePrice: {
            label: "Giá đặt mua",
            placeholder: "Nhập giá đặt mua",
        },
        permissionQuantity: {
            label: "SL quyền sở hữu",
            placeholder: "Nhập SL quyền được hưởng",
        },
        numberOfSecuritiesPurchased: {
            label: "SL CK được mua",
            placeholder: "SL CK được mua",
        },
        paidQuantity: {
            label: "SL đã nộp tiền",
            placeholder: "Nhập SL đã nộp tiền",
        },
        numberOfEntitlements: {
            label: "SL quyền còn lại",
            placeholder: "Nhập SL quyền còn lại",
        },
        registerPermissionQuantity: {
            label: "SL quyền đăng ký",
            placeholder: "Nhập SL quyền đăng ký",
        },
        registerStockQuantity: {
            label: "SL CK đăng ký mua",
            placeholder: "Nhập SL CK đăng ký mua",
        },
        remainingRights: {
            label: "SL quyền còn lại",
            placeholder: "Nhập SL quyền còn lại",
        },
        payAmount: {
            label: "Số tiền phải nộp",
            placeholder: "Nhập Số tiền phải nộp",
        },
        paymentAmount: {
            label: "Số tiền phải thanh toán",
            placeholder: "Nhập Số tiền phải thanh toán",
        },
        note: {
            label: "Ghi chú",
            placeholder: "Nhập ghi chú",
        },
        noteRegisterBuyingStock: {
            label: "Lưu ý: Quý khách chỉ có thể đăng ký quyền mua trước ngày hết hạn đăng ký mua cuối cùng",
            placeholder:
                "Lưu ý: Quý khách chỉ có thể đăng ký quyền mua trước ngày hết hạn đăng ký mua cuối cùng",
        },
        voucherNumber: {
            label: "Số chứng từ",
            placeholder: "Nhập số chứng từ",
        },
        TDCNQuantity: {
            label: "SL TDCN",
            placeholder: "Nhập SL TDCN",
        },
        HCCNQuantity: {
            label: "SL HCCN",
            placeholder: "Nhập SL HCCN",
        },
        importDate: {
            label: "Ngày import",
            placeholder: "DD/MM/YYYY",
        },
        approveDate: {
            label: "Ngày duyệt/từ chối",
            placeholder: "DD/MM/YYYY",
        },
        depositoryPlace: {
            label: "Nơi yêu cầu ký gửi",
            placeholder: "Chọn nơi yêu cầu ký gửi",
        },
        serialNumber: {
            label: "Số serial",
            placeholder: "Nhập số serial",
        },
        stockQuantity: {
            label: "Số lượng",
            placeholder: "Nhập số lượng",
        },
        stockValue: {
            label: "Giá trị",
            placeholder: "Nhập giá trị",
        },
        costPrice: {
            label: "Giá vốn",
            placeholder: "Nhập giá vốn",
        },
        releaseCode: {
            label: "Mã đợt phát hành",
            placeholder: "Nhập Mã đợt phát hành",
        },
        withdrawPlace: {
            label: "Nơi yêu cầu rút",
            placeholder: "Chọn nơi yêu cầu rút",
        },
        file: {
            label: "File",
            placeholder: "Chọn file",
        },
        companyCode: {
            label: "Mã CTCK đặt lệnh",
            placeholder: "Mã CTCK đặt lệnh",
        },
        statementType: {
            label: "Loại lệnh",
            placeholder: "Loại lệnh",
        },
        payDate: {
            label: "Ngày thanh toán",
            placeholder: "Ngày thanh toán",
        },
        price: {
            label: "Giá",
            placeholder: "Giá",
        },
        totalPrice: {
            label: "Tổng giá trị giao dịch",
            placeholder: "Tổng giá trị giao dịch",
        },
        userQuantity: {
            label: "Số người thuộc nhóm quyền",
            placeholder: "Số người thuộc nhóm quyền",
        },
        userApproveWaiting: {
            label: "Số người chờ duyệt",
            placeholder: "Số người chờ duyệt",
        },
        roleQuantity: {
            label: "SL nhóm quyền",
            placeholder: "SL nhóm quyền",
        },
        THQType: {
            label: "Loại THQ",
            placeholder: "Loại THQ",
        },
        moneyAccount: {
            label: "Số TK tiền",
            placeholder: "Số tiền trong tài khoản",
        },
        surplus: {
            label: "Số dư",
            placeholder: "Số dư trong tài khoản",
        },
        pendingBalance: {
            label: "Số dư chờ xử lý",
            placeholder: "Số dư chờ xử lý",
        },
        availableBalances: {
            label: "Số dư khả dụng",
            placeholder: "Số dư khả dụng",
        },
        permissionStockNumber: {
            label: "Số ck chốt quyền",
            placeholder: "Số ck chốt quyền",
        },
        amountMoney: {
            label: "Số tiền trước thuế",
            placeholder: "Số tiền trước thuế",
        },
        amountAfterTax: {
            label: "Số tiền sau thuế",
            placeholder: "Số tiền sau thuế",
        },
        stockNewQuantity: {
            label: "SL CK mới",
            placeholder: "SL CK mới",
        },
        moneyExchange: {
            label: "Tiền quy đổi lẻ",
            placeholder: "Tiền quy đổi lẻ",
        },
        KHQTransactionFrom: {
            label: "GD KHQ từ ngày",
            placeholder: "GD KHQ từ ngày",
        },
        KHQTransactionTo: {
            label: "GD KHQ đến ngày",
            placeholder: "GD KHQ đến ngày",
        },
        THQDate: {
            label: "Ngày THQ",
            placeholder: "Ngày THQ",
        },
        ratioExchangeStockToPermission: {
            label: "T.lệ quy đổi CK thành quyền",
            placeholder: "T.lệ quy đổi CK thành quyền",
        },
        ratioExchangePermissionToStock: {
            label: "T.lệ quy đổi quyền thành CK",
            placeholder: "T.lệ quy đổi quyền thành CK",
        },
        ratioExchangePermissionToMoney: {
            label: "T.lệ quy đổi quyền thành tiền",
            placeholder: "T.lệ quy đổi quyền thành tiền",
        },
        ratioBonds: {
            label: "Tỉ lệ lãi suất trái phiếu",
            placeholder: "Tỉ lệ lãi suất trái phiếu",
        },
        exchangeStockToPermission: {
            label: "Chuyển CK lẻ thành tiền",
            placeholder: "Chuyển CK lẻ thành tiền",
        },
        transferPermission: {
            label: "Chuyển nhượng quyền mua",
            placeholder: "Chuyển nhượng quyền mua",
        },
        transferFromDate: {
            label: "Chuyển nhượng từ ngày",
            placeholder: "Chuyển nhượng từ ngày",
        },
        transferToDate: {
            label: "Chuyển nhượng đến ngày",
            placeholder: "Chuyển nhượng đến ngày",
        },
        statementImportType: {
            label: "Loại lệnh",
            placeholder: "Chọn loại lệnh",
        },
        commissionFee: {
            label: "Phí MG",
            placeholder: "Phí môi giới",
        },
        transFee: {
            label: "Phí giao dịch",
            placeholder: "Phí giao dịch",
        },
        tax: {
            label: "Thuế",
            placeholder: "Thuế",
        },
        netAmount: {
            label: "Giá trị net",
            placeholder: "Giá trị net",
        },
        description: {
            label: "Mô tả",
            placeholder: "Mô tả",
        },
        tickerCode: {
            label: "tickerCode",
            placeholder: "tickerCode",
        },
        ccy: {
            label: "Đơn vị",
            placeholder: "Đơn vị",
        },
        isinCode: {
            label: "Mã ISIN",
            placeholder: "Mã ISIN",
        },
        orderNo: {
            label: "Số hiệu lệnh",
            placeholder: "Số hiệu lệnh",
        },
        pendAmount: {
            label: "Tiền phải trả/nhân về",
            placeholder: "Tiền phải trả/nhân về",
        },
        purchaseNewPrice: {
            label: "Giá mua CK mới",
            placeholder: "Giá mua CK mới",
        },
        taxCollect: {
            label: "Mã nơi thu thuế",
            placeholder: "Mã nơi thu thuế",
        },
        clearDay: {
            label: "Chu kỳ TT",
            placeholder: "Chu kỳ TT",
        },
        orderNumber: {
            label: "Order Number",
            placeholder: "Order Number",
        },
        orderbyTime: {
            label: "Sắp xếp",
            placeholder: "Sắp xếp",
        },
        ascending: {
            label: "Tăng dẫn",
            placeholder: "Tăng dần",
        },
        decrease: {
            label: "Giảm dần",
            placeholder: "Giảm dần",
        },
        indexNumber: {
            label: "STT",
            placeholder: "STT",
        },
        startDate: { label: "Ngày bắt đầu", placeholder: "Ngày bắt đầu" },
        endDate: { label: "Ngày kết thúc", placeholder: "Ngày kết thúc" },
        bookNumber: {
            label: "Số sổ/Giấy CNSHCK",
            placeholder: "Nhập số sổ/giấy CNSHCK",
        },
        receiver: { label: "Nguời nhận", placeholder: "Nhập tên người nhận" },
        numberCitizenIdentification: {
            label: "Số CMND/CCCD/Hộ chiếu/ID",
            placeholder: "Nhập số CMND/CCCD/Hộ chiếu/ID ",
        },
        receiveWay: {
            label: "Chọn cách nhận",
            placeholder: "Chọn cách nhận",
        },
        fund: {
            label: "Mã quỹ",
            placeholder: "Mã quỹ",
        },
        contractNumber: {
            label: "Số hợp đồng",
            placeholder: "Số hợp đồng",
        },
        transType: {
            label: "Loại giao dịch",
            placeholder: "Loại giao dịch",
        },
        contractType: {
            label: "Loại hợp đồng",
            placeholder: "Loại hợp đồng",
        },
        CdCode: {
            label: "Mã CD",
            placeholder: "Mã CD",
        },
        secCode: {
            label: "Mã chứng khoán",
            placeholder: "Mã chứng khoán",
        },
        settlementAmount: {
            label: "Giá trị thanh toán",
            placeholder: "Giá trị thanh toán",
        },
        cleanAmount: {
            label: "Giá trị clean",
            placeholder: "Giá trị clean",
        },
        coupon: {
            label: "Coupon",
            placeholder: "Coupon",
        },
        transferFee: {
            label: "Phí chuyển nhượng",
            placeholder: "Phí chuyển nhượng",
        },
        counterParty: {
            label: "Đối tác",
            placeholder: "Đối tác",
        },
        custodyCd: {
            label: "Tài khoản NĐT",
            placeholder: "Tài khoản NĐT",
        },
        fullName: {
            label: "Tên NĐT",
            placeholder: "Tên NĐT",
        },
        dbCode: {
            label: "Mã đại lý phân phối",
            placeholder: "Mã đại lý phân phối",
        },
        bankAcName: {
            label: "Ngân hàng thụ hưởng",
            placeholder: "Ngân hàng thụ hưởng",
        },
        cityBank: {
            label: "Chi nhánh Ngân hàng",
            placeholder: "Chi nhánh Ngân hàng",
        },
        bankAcc: {
            label: "STK thụ hưởng",
            placeholder: "STK thụ hưởng",
        },
        tradingId: {
            label: "Mã phiên giao dịch",
            placeholder: "Mã phiên giao dịch",
        },
        execName: {
            label: "Loại giao dịch",
            placeholder: "Loại giao dịch",
        },
        txDate: {
            label: "Ngày giao dịch CCQ",
            placeholder: "Ngày giao dịch CCQ",
        },
        matchQtty: {
            label: "Số lượng khớp",
            placeholder: "Số lượng khớp",
        },
        nav: {
            label: "NAV/CCQ",
            placeholder: "NAV/CCQ",
        },
        matchAmt: {
            label: "Giá trị khớp lệnh",
            placeholder: "Giá trị khớp lệnh",
        },
        taxAmt: {
            label: "Thuế",
            placeholder: "Thuế",
        },
        feeAmc: {
            label: "Phí AMC",
            placeholder: "Phí AMC",
        },
        feeDxx: {
            label: "Phí ĐLPP",
            placeholder: "Phí ĐLPP",
        },
        feeFund: {
            label: "Phí quỹ",
            placeholder: "Phí quỹ",
        },
        contractDate: {
            label: "Ngày chứng từ",
            placeholder: "Ngày chứng từ",
        },
        valueDate: {
            label: "Ngày hiệu lực",
            placeholder: "Ngày hiệu lực",
        },
        depositoryBank: {
            label: "Ngân hàng",
            placeholder: "Ngân hàng",
        },
        principal: {
            label: "Giá trị gốc HĐ",
            placeholder: "Giá trị gốc HĐ",
        },
        maturityDate: {
            label: "Ngày đáo hạn",
            placeholder: "Ngày đáo hạn",
        },
        interestRate: {
            label: "Lãi suất/Năm",
            placeholder: "Lãi suất/Năm",
        },
        currency: {
            label: "Loại tiền tệ",
            placeholder: "Loại tiền tệ",
        },
        dayBasic: {
            label: "Số ngày cơ sở",
            placeholder: "Số ngày cơ sở",
        },
        interestPeriod: {
            label: "Chu kỳ trả lãi",
            placeholder: "Chu kỳ trả lãi",
        },
        interestAccrualMethod: {
            label: "Phương pháp cộng dồn lãi suất",
            placeholder: "Phương pháp cộng dồn lãi suất",
        },
        interestFrequency: {
            label: "Tần suất trả lãi",
            placeholder: "Tần suất trả lãi",
        },
        contractExchangeRate: {
            label: "Tỷ giá hợp đồng",
            placeholder: "Tỷ giá hợp đồng",
        },
        quantity: {
            label: "Số lượng",
            placeholder: "Số lượng",
        },
        amount: {
            label: "Giá trị hợp đồng",
            placeholder: "Giá trị hợp đồng",
        },
        tradeDate: {
            label: "Ngày giao dịch",
            placeholder: "Ngày giao dịch",
        },
        settlementDate: {
            label: "Ngày thanh toán",
            placeholder: "Ngày thanh toán",
        },
        ownerTransferFee: {
            label: "Phí chuyển nhượng",
            placeholder: "Phí chuyển nhượng",
        },
        brokerCode: {
            label: "Mã CTCK",
            placeholder: "Mã CTCK",
        },
        grossAmount: {
            label: "Giá trị",
            placeholder: "Giá trị",
        },
        brokerFee: {
            label: "Phí môi giới",
            placeholder: "Phí môi giới",
        },
        eTFDate: {
            label: "Ngày giao dịch ETF",
            placeholder: "Ngày giao dịch ETF",
        },
        ap: {
            label: "Mã AP",
            placeholder: "Mã AP",
        },
        broker: {
            label: "CTCK đặt lệnh",
            placeholder: "CTCK đặt lệnh",
        },
        position: {
            label: "Vị thế",
            placeholder: "Vị thế",
        },
        type: {
            label: "Trạng thái hợp đồng",
            placeholder: "Trạng thái hợp đồng",
        },
        vsdFee: {
            label: "Phí VSD",
            placeholder: "Phí VSD",
        },
        hnxFee: {
            label: "Phí HNX",
            placeholder: "Phí HNX",
        },
        openPositionPrice: {
            label: "Giá mở vị thế",
            placeholder: "Giá mở vị thế",
        },
        endingPrice: {
            label: "Giá đóng vị thế (giá cuối ngày)",
            placeholder: "Giá đóng vị thế (giá cuối ngày)",
        },
        placementDate: {
            label: "Ngày hợp đồng",
            placeholder: "Ngày hợp đồng",
        },
        maturityDate: {
            label: "Ngày đáo hạn",
            placeholder: "Ngày đáo hạn",
        },
        ticker: {
            label: "Mã chỉ số hợp đồng",
            placeholder: "Mã chỉ số hợp đồng",
        },
        allocatedDate: {
            label: "Ngày phân bổ",
            placeholder: "Ngày phân bổ",
        },
        tradeAmount: {
            label: "Giá trị giao dịch",
            placeholder: "Giá trị giao dịch",
        },
        fee: {
            label: "Phí",
            placeholder: "Phí",
        },
        bankCode: {
            label: "Mã ngân hàng",
            placeholder: "Mã ngân hàng",
        },
        bankName: {
            label: "Tên ngân hàng",
            placeholder: "Tên ngân hàng",
        },
        organizationCode: {
            label: "Mã tổ chức CCDV",
            placeholder: "Mã tổ CCDV",
        },
        organizationName: {
            label: "Tên tổ chức CCDV",
            placeholder: "Tên tổ chức CCDV",
        },
        abbreviations: {
            label: "Tên viết tắt",
            placeholder: "Tên viết tắt",
        },
        descriptionFa: {
            label: "Diễn giải",
            placeholder: "Diễn giải",
        },
        ccqCode: {
            label: "Mã CCQ",
            placeholder: "Mã CCQ",
        },
    },
    listTabImportFa: {
        fundCertificates: "Giao dịch CCQ huy động vốn",
        td: "Đầu tư TD",
        cd: "Đầu tư CD",
        tradingLs: "Đầu tư chứng khoán niêm yết",
        tradingUs: "Đầu tư CK OTC",
        derivatives: "Giao dịch phái sinh",
        loanContracts: "Vay ngắn hạn",
        tradingFundCert: "Đầu tư CCQ",
        oddLotsOrder: "Giao dịch lô lẻ",
        listBank: "Danh sách ngân hàng",
        listOrganization: "Danh sách tổ chức",
    },
    menu: {
        lookupBalance: "Tra cứu số dư",
        lookupStatement: "Tra cứu sổ lệnh",
        lookupPermission: "Tra cứu quyền",
        lookupInfoPermission: "Tra cứu thông tin thực hiện quyền",
        lookupOwnerPermission: "Tra cứu quyền được hưởng",
        manage: "Quản lý",
        manageUser: "Quản lý người dùng",
        manageUserApprove: "Duyệt thông tin người dùng",
        manageRole: "Quản lý nhóm quyền",
        manageRoleApprove: "Duyệt thông tin nhóm quyền",
        manageRoleUser: "Phân quyền người dùng",
        approveTransaction: "Duyệt giao dịch",
        order: "Đăng ký thực hiện quyền mua",
        import: "Import xác nhận lệnh",
        requestDepository: "Yêu cầu ký gửi chứng khoán",
        requestWithdraw: "Yêu cầu rút chứng khoán",
        transaction: "Giao dịch",
        lookupTransaction: "Tra cứu giao dịch",
        fundAdmin: "Quản trị quỹ",
        fundAdminImport: "Import dữ liệu giao dịch",
        fundAdminApprove: "Duyệt import dữ liệu giao dịch",
        fundAdminDetail: "Tra cứu import dữ liệu",
    },
    button: {
        add: "Thêm mới",
        addUser: "Thêm mới người dùng",
        addRole: "Thêm mới nhóm quyền",
        addImport: "Thêm mới(import lệnh)",
        faImport: "Thêm mới(import giao dịch)",
        search: "Tìm kiếm",
        reset: "Đặt lại",
        confirm: "Xác nhận",
        save: "Lưu",
        delete: "Xác nhận xóa",
        reject: "Từ chối",
        approve: "Duyệt",
        downloadTemplate: "Tải file mẫu",
        next: "Tiếp tục",
        nextUpdate: "Tiếp tục sửa",
        authorizationUser: "Phân quyền người dùng",
        back: "Quay lại",
        understand: "Đã hiểu",
        getActiveCode: "Nhận active code",
        notification: "Thông báo",
        goHome: "Về trang chủ",
        logout: "Đăng xuất",
        refresh: "Làm m",
        download: "Tải về",
        downloadHTML: "Tải về HTML",
        downloadXML: "Tải về XML",
        downloadHTML_XML: "Tải về HTML/XML",
        downloadFileImportFa: "Tải về file đã import",
    },
    title: {
        addUser: "Thêm mới người dùng",
        addRole: "Thêm mới nhóm quyền",
        addOrder: "Đăng ký thực hiện quyền mua",
        addRequestDepository: "Thêm mới: Yêu cầu ký gửi chứng khoán",
        addRequestWithdraw: "Thêm mới: Yêu cầu rút chứng khoán",
        order: "Đăng ký đặt mua chứng khoán phát hành thêm",
        update: "Cập nhật",
        detail: "Chi tiết",
        delete: "Xóa",
        approve: "Duyệt/Từ chối",
        import: "Xác nhận lệnh",
        sreachAfmast: "TKLK liên quan",
        functional: "Chức năng",
        notify: "Thông báo",
        from: "Từ",
        to: "Đến",
        importTransaction: "Import dữ liệu giao dịch",
    },
    permission: {
        view: "Xem",
        update: "Sửa",
        delete: "Xóa",
        create: "Thêm mới",
        approve: "Duyệt/Từ chối",
    },
    message: {
        confirmDeleteUserFromRole:
            "Bạn muốn xóa người dùng này khỏi nhóm quyền ?",
        confirmApproveUserToRole:
            "Bạn muốn duyệt người dùng này vào nhóm quyền ?",
        confirmRejectUserToRole:
            "Bạn muốn từ chối người dùng này vào nhóm quyền ?",
    },
    errorPage: {
        forbidden: {
            title: "Bạn không có quyền truy cập. Vui lòng kiểm tra lại với quản trị viên.",
            titleNothing:
                "Bạn không có quyền truy cập chức năng nào. Vui lòng kiểm tra lại với quản trị viên.",
        },
        notFound: {
            title: "Không tìm thấy",
        },
    },
    maintenancePage: {
        title: "Website đang bảo trì. Vui lòng quay lại sau.",
        des: "Website trong giai đoạn bảo trì.",
    },
    function: {
        choosePicture: "Chọn ảnh",
        search: "Tìm kiếm",
    },
    commonLabel: {
        totalRecord: "Tổng",
        display: "Hiển thị",
        status: "Trạng thái",
        all: "Tất cả",
    },
    verify: {
        activeCodeLabel:
            "Chúng tôi đã gửi active code vào email của bạn, hãy kiểm tra email và nhập active code vào ứng dụng",
        smartOTP: "VPBank Smart OTP",
        otpLabel1: "Chúng tôi đã gửi OTP vào ứng dụng",
        otpLabel2:
            "Nếu bạn chưa có mã OTP vui lòng sử dụng chức năng “Nhận active code”",
        confirm: "Xác nhận",
    },
    importFile: {
        fileSize: "File cho phép tối đa ",
        fileSize2: "Kích cỡ file vượt quá cho phép đối với file",
        fileFormat: "File chỉ hỗ trợ định dạng .xls, .xlsx",
        validateFile: "File không đúng định dạng như file mẫu",
        emptyFile: "File có dữ liệu trống. Vui lòng kiểm tra lại",
        errorAtCol: "Lỗi định dạng date cột",
        valiateAfmast: "Mỗi lần xác nhận lệnh chỉ thực hiện với 1 loại tklk",
        validateFileFa: "không đúng định dạng như file mẫu",
    },
    lookupBalance: {
        depositoryAccountNumber: "STK lưu ký",
        stockCode: "Mã CK",
        marketPrice: "Giá thị trường",
        availableBalances: "Số dư khả dụng",
        surplusHccn: "Số dư HCCN",
        marginBalance: "Số dư ký quỹ",
        blockadeBalance: "Số dư P.tỏa",
        balanceWaitingReturn: "Số dư chờ về",
        balancePendingPayment: "Số dư chờ T.toán",
        balancePendingExercise: "Số dư chờ THQ",
        depositQtty: "Số dư chờ lưu ký",
        blockedOrder: "Phong toả đặt lệnh",
        mortageqtty: "Số dư cầm cố",
        totalOwnership: "Tổng KL sở hữu",
        stockValue: "Giá trị CK",
    },
    responseMessage: {
        success: "Thành công",
        tryAgainLater: "Vui lòng thử lại sau!",
        overTimeOTP: "Số lần nhập OTP quá giới hạn!",
        errorOccurred: "Có lỗi xảy ra!",
        loginToContinue: "Vui lòng đăng nhập để tiếp tục sử dụng!",
        tryAgainLater2: "Đã có lỗi xảy ra, vui lòng thử lại sau",
        otpFail: "Mã OTP không hợp lệ!",
        expiredOTP: "Mã OTP hết hạn",
    },
    changePasswordAtFirstTime: {
        requestTitle: "Đặt lại mật khẩu",
        successTitle: "Thông báo",
        // cancelText:"Để sau",
        onOkText: "Tiếp tục",
        requestDes: "Bạn cần đổi mật khẩu để tiếp tục sử dụng tài khoản",
        successDes:
            "Đổi mật khẩu thành công, bạn hãy sử dụng mật khẩu này trong những lần đăng nhập sau",
    },
};
