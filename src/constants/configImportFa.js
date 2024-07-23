// tabData.js
export const listTabTableFa = [
    //fundCert
    {
        id: 0,
        name: "fundCertificates",
        label: "listTabImportFa.fundCertificates",
    },
    //depositContract
    {
        id: 1,
        name: "td",
        label: "listTabImportFa.td",
    },
    //fundCertDeposit
    {
        name: "cd",
        label: "listTabImportFa.cd",
    },
    //fundStockInvest
    {
        name: "tradingLs",
        label: "listTabImportFa.tradingLs",
    },
    //fundOtc
    {
        name: "tradingUs",
        label: "listTabImportFa.tradingUs",
    },
    //fundDerivatives
    {
        name: "derivatives",
        label: "listTabImportFa.derivatives",
    },
    //loanContract
    {
        name: "loanContracts",
        label: "listTabImportFa.loanContracts",
    },
    //fundCertInvest
    {
        name: "tradingFundCert",
        label: "listTabImportFa.tradingFundCert",
    },
    //oddLotTrading
    {
        name: "oddLotsOrder",
        label: "listTabImportFa.oddLotsOrder",
    },
    //2 sheet có trong excel cho user nhập thêm các thông tinm ngân hàng, đối tác
    {
        name: "listBank",
        label: "listTabImportFa.listBank",
    },
    {
        name: "listOrganization",
        label: "listTabImportFa.listOrganization",
    },
];

//dataColumns
export const dataColumnsFa = [
    //fundCert
    [
        {
            name: "fund",
            align: "left",
            label: "field.fund.label",
            field: "FUND_CODE",
            sortable: false,
        },
        {
            name: "custodyCd",
            align: "left",
            label: "field.custodyCd.label",
            field: "CUSTODYCD",
            sortable: false,
        },
        {
            name: "fullName",
            align: "center",
            label: "field.fullName.label",
            field: "FULLNAME",
            sortable: false,
        },
        {
            name: "dbCode",
            align: "left",
            label: "field.dbCode.label",
            field: "DBCODE",
            sortable: false,
        },
        {
            name: "bankAcName",
            align: "center",
            label: "field.bankAcName.label",
            field: "BANKACCNAME",
            sortable: false,
        },
        {
            name: "cityBank",
            align: "center",
            label: "field.cityBank.label",
            field: "CITYBANK",
            sortable: false,
        },
        {
            name: "bankAcc",
            align: "center",
            label: "field.bankAcc.label",
            field: "BANKACC",
            sortable: false,
        },
        {
            name: "tradingId",
            align: "center",
            label: "field.tradingId.label",
            field: "TRADING_ID",
            sortable: false,
        },
        {
            name: "execName",
            align: "center",
            label: "field.execName.label",
            field: "EXECNAME",
            sortable: false,
        },
        {
            name: "txDate",
            align: "center",
            label: "field.txDate.label",
            field: "TXDATE",
            sortable: false,
        },
        {
            name: "matchQtty",
            align: "right",
            label: "field.matchQtty.label",
            field: "MATCHQTTY",
            sortable: false,
        },
        {
            name: "nav",
            align: "right",
            label: "field.nav.label",
            field: "NAV",
            sortable: false,
        },
        {
            name: "matchAmt",
            align: "right",
            label: "field.matchAmt.label",
            field: "MATCHAMT",
            sortable: false,
        },
        {
            name: "taxAmt",
            align: "right",
            label: "field.taxAmt.label",
            field: "TAXAMT",
            sortable: false,
        },
        {
            name: "feeAmc",
            align: "right",
            label: "field.feeAmc.label",
            field: "FEEAMC",
            sortable: false,
        },
        {
            name: "feeDxx",
            align: "right",
            label: "field.feeDxx.label",
            field: "FEEDXX",
            sortable: false,
        },
        {
            name: "feeFund",
            align: "right",
            label: "field.feeFund.label",
            field: "FEEFUND",
            sortable: false,
        },
    ],
    //depositContract
    [
        {
            name: "fund",
            align: "left",
            label: "field.fund.label",
            field: "FUND",
            sortable: false,
        },
        {
            name: "contractNumber",
            align: "left",
            label: "field.contractNumber.label",
            field: "CONTRACT_NUMBER",
            sortable: false,
        },
        {
            name: "contractDate",
            align: "left",
            label: "field.contractDate.label",
            field: "CONTRACT_DATE",
            sortable: false,
        },
        {
            name: "valueDate",
            align: "center",
            label: "field.valueDate.label",
            field: "VALUE_DATE",
            sortable: false,
        },
        {
            name: "depositoryBank",
            align: "left",
            label: "field.depositoryBank.label",
            field: "DEPOSITORY_BANK",
            sortable: false,
        },
        {
            name: "principal",
            align: "right",
            label: "field.principal.label",
            field: "PRINCIPAL",
            sortable: false,
        },
        {
            name: "maturityDate",
            align: "center",
            label: "field.maturityDate.label",
            field: "MATURITY_DATE",
            sortable: false,
        },
        {
            name: "interestRate",
            align: "right",
            label: "field.interestRate.label",
            field: "INTEREST_RATE",
            sortable: false,
        },
        {
            name: "currency",
            align: "left",
            label: "field.currency.label",
            field: "CURRENCY",
            sortable: false,
        },
        {
            name: "dayBasic",
            align: "right",
            label: "field.dayBasic.label",
            field: "DAY_BASIC",
            sortable: false,
        },
        {
            name: "interestPeriod",
            align: "left",
            label: "field.interestPeriod.label",
            field: "INTEREST_PERIOD",
            sortable: false,
        },
        {
            name: "interestAccrualMethod",
            align: "left",
            label: "field.interestAccrualMethod.label",
            field: "INTEREST_ACCRUAL_METHOD",
            sortable: false,
        },
        {
            name: "interestFrequency",
            align: "left",
            label: "field.interestFrequency.label",
            field: "INTEREST_FREQUENCY",
            sortable: false,
        },
        {
            name: "contractExchangeRate",
            align: "right",
            label: "field.contractExchangeRate.label",
            field: "CONTRACT_EXCHANGE_RATE",
            sortable: false,
        },
        {
            name: "description",
            align: "left",
            label: "field.descriptionFa.label",
            field: "DESCRIPTION",
            sortable: false,
        },
    ],
    //fundCertDeposit
    [
        {
            name: "fund",
            align: "left",
            label: "field.fund.label",
            field: "FUND",
            sortable: false,
        },
        {
            name: "contractNumber",
            align: "left",
            label: "field.contractNumber.label",
            field: "CONTRACT_NUMBER",
            sortable: false,
        },
        {
            name: "valueDate",
            align: "center",
            label: "field.valueDate.label",
            field: "VALUE_DATE",
            sortable: false,
        },
        {
            name: "secCode",
            align: "left",
            label: "field.CdCode.label",
            field: "SECCODE",
            sortable: false,
        },
        {
            name: "transType",
            align: "left",
            label: "field.contractType.label",
            field: "TRANSTYPE",
            sortable: false,
        },
        {
            name: "interestAccrualMethod",
            align: "left",
            label: "field.interestAccrualMethod.label",
            field: "INTEREST_ACTUAL_METHOD",
            sortable: false,
        },
        {
            name: "quantity",
            align: "right",
            label: "field.quantity.label",
            field: "QUANTITY",
            sortable: false,
        },
        {
            name: "amount",
            align: "right",
            label: "field.amount.label",
            field: "CONTRACT_VALUE",
            sortable: false,
        },
        {
            name: "cleanAmount",
            align: "right",
            label: "field.cleanAmount.label",
            field: "CLEAN_AMOUNT",
            sortable: false,
        },
        {
            name: "coupon",
            align: "right",
            label: "field.coupon.label",
            field: "COUPON",
            sortable: false,
        },
        {
            name: "tradeDate",
            align: "center",
            label: "field.contractDate.label",
            field: "TRADEDATE",
            sortable: false,
        },
        {
            name: "settlementDate",
            align: "center",
            label: "field.settlementDate.label",
            field: "SETTLEMENT_DATE",
            sortable: false,
        },
        {
            name: "ownerTransferFee",
            align: "right",
            label: "field.ownerTransferFee.label",
            field: "OWNER_TRANSFER_FEE",
            sortable: false,
        },
        {
            name: "currency",
            align: "left",
            label: "field.currency.label",
            field: "CURRENCY",
            sortable: false,
        },
        {
            name: "contractExchangeRate",
            align: "right",
            label: "field.contractExchangeRate.label",
            field: "CONTRACT_EXCHANGE_RATE",
            sortable: false,
        },
        {
            name: "tax",
            align: "right",
            label: "field.tax.label",
            field: "TAX",
            sortable: false,
        },
        {
            name: "counterParty",
            align: "left",
            label: "field.counterParty.label",
            field: "COUNTER_PARTY",
            sortable: false,
        },
        {
            name: "description",
            align: "left",
            label: "field.descriptionFa.label",
            field: "DESCRIPTION",
            sortable: false,
        },
    ],
    //fundStockInvest
    [
        {
            name: "brokerCode",
            align: "left",
            label: "field.brokerCode.label",
            field: "BROKER_CODE",
            sortable: false,
        },
        {
            name: "transType",
            align: "left",
            label: "field.transType.label",
            field: "TRANS_TYPE",
            sortable: false,
        },
        {
            name: "fund",
            align: "left",
            label: "field.fund.label",
            field: "FUND",
            sortable: false,
        },
        {
            name: "secCode",
            align: "left",
            label: "field.secCode.label",
            field: "SECCODE",
            sortable: false,
        },
        {
            name: "tradeDate",
            align: "center",
            label: "field.tradeDate.label",
            field: "TRADE_DATE",
            sortable: false,
        },
        {
            name: "settlementDate",
            align: "center",
            label: "field.settlementDate.label",
            field: "SETTLEMENT_DATE",
            sortable: false,
        },
        {
            name: "quantity",
            align: "right",
            label: "field.quantity.label",
            field: "QUANTITY",
            sortable: false,
        },
        {
            name: "price",
            align: "right",
            label: "field.price.label",
            field: "PRICE",
            sortable: false,
        },
        {
            name: "grossAmount",
            align: "right",
            label: "field.grossAmount.label",
            field: "GROSS_AMOUNT",
            sortable: false,
        },
        {
            name: "brokerFee",
            align: "right",
            label: "field.brokerFee.label",
            field: "BROKER_FEE",
            sortable: false,
        },
        {
            name: "tax",
            align: "right",
            label: "field.tax.label",
            field: "TAX",
            sortable: false,
        },
        {
            name: "netAmount",
            align: "right",
            label: "field.netAmount.label",
            field: "NET_AMOUNT",
            sortable: false,
        },
        {
            name: "cleanAmount",
            align: "right",
            label: "field.cleanAmount.label",
            field: "CLEAN_AMOUNT",
            sortable: false,
        },
        {
            name: "coupon",
            align: "right",
            label: "field.coupon.label",
            field: "COUPON",
            sortable: false,
        },
        {
            name: "transFee",
            align: "right",
            label: "field.transFee.label",
            field: "TRANSACTION_PROCESS_FEE",
            sortable: false,
        },
        {
            name: "tradeType",
            align: "left",
            label: "field.statementType.label",
            field: "TRADE_TYPE",
            sortable: false,
        },
        {
            name: "eTFDate",
            align: "center",
            label: "field.eTFDate.label",
            field: "ETF_DATE",
            sortable: false,
        },
        {
            name: "ap",
            align: "left",
            label: "field.ap.label",
            field: "AP",
            sortable: false,
        },
    ],
    //fundOtc
    [
        {
            name: "fund",
            align: "left",
            label: "field.fund.label",
            field: "FUND",
            sortable: false,
        },
        {
            name: "contractNumber",
            align: "left",
            label: "field.contractNumber.label",
            field: "CONTRACT_NUMBER",
            sortable: false,
        },
        {
            name: "transType",
            align: "left",
            label: "field.transType.label",
            field: "TRANS_TYPE",
            sortable: false,
        },
        {
            name: "secCode",
            align: "left",
            label: "field.secCode.label",
            field: "SECCODE",
            sortable: false,
        },
        {
            name: "tradeDate",
            align: "center",
            label: "field.tradeDate.label",
            field: "TRADE_DATE",
            sortable: false,
        },
        {
            name: "settlementDate",
            align: "center",
            label: "field.settlementDate.label",
            field: "SETTLEMENT_DATE",
            sortable: false,
        },
        {
            name: "quantity",
            align: "right",
            label: "field.quantity.label",
            field: "QUANTITY",
            sortable: false,
        },
        {
            name: "settlementAmount",
            align: "right",
            label: "field.settlementAmount.label",
            field: "SETTLEMENT_AMOUNT",
            sortable: false,
        },
        {
            name: "cleanAmount",
            align: "right",
            label: "field.cleanAmount.label",
            field: "CLEAN_AMOUNT",
            sortable: false,
        },
        {
            name: "coupon",
            align: "right",
            label: "field.coupon.label",
            field: "COUPON",
            sortable: false,
        },
        {
            name: "tax",
            align: "right",
            label: "field.tax.label",
            field: "TAX",
            sortable: false,
        },
        {
            name: "transferFee",
            align: "right",
            label: "field.transferFee.label",
            field: "TRANSFER_FEE",
            sortable: false,
        },
        {
            name: "counterParty",
            align: "left",
            label: "field.counterParty.label",
            field: "COUNTER_PARTY",
            sortable: false,
        },
    ],
    //fundDerivatives
    [
        {
            name: "fund",
            align: "left",
            label: "field.fund.label",
            field: "FUND",
            sortable: false,
        },
        {
            name: "tradeDate",
            align: "center",
            label: "field.tradeDate.label",
            field: "TRADE_DATE",
            sortable: false,
        },
        {
            name: "secCode",
            align: "left",
            label: "field.ticker.label",
            field: "SECCODE",
            sortable: false,
        },
        {
            name: "broker",
            align: "left",
            label: "field.broker.label",
            field: "BROKER",
            sortable: false,
        },
        {
            name: "position",
            align: "left",
            label: "field.position.label",
            field: "POSITION",
            sortable: false,
        },
        {
            name: "type",
            align: "left",
            label: "field.type.label",
            field: "TYPE",
            sortable: false,
        },
        {
            name: "quantity",
            align: "right",
            label: "field.quantity.label",
            field: "QUANTITY",
            sortable: false,
        },
        {
            name: "brokerFee",
            align: "right",
            label: "field.brokerFee.label",
            field: "BROKER_FEE",
            sortable: false,
        },
        {
            name: "vsdFee",
            align: "right",
            label: "field.vsdFee.label",
            field: "VSD_FEE",
            sortable: false,
        },
        {
            name: "hnxFee",
            align: "right",
            label: "field.hnxFee.label",
            field: "HNX_FEE",
            sortable: false,
        },
        {
            name: "tax",
            align: "right",
            label: "field.tax.label",
            field: "TAX",
            sortable: false,
        },
        {
            name: "openPositionPrice",
            align: "right",
            label: "field.openPositionPrice.label",
            field: "OPEN_POSITION_PRICE",
            sortable: false,
        },
        {
            name: "endingPrice",
            align: "right",
            label: "field.endingPrice.label",
            field: "ENDING_PRICE",
            sortable: false,
        },
        {
            name: "description",
            align: "left",
            label: "field.descriptionFa.label",
            field: "DESCRIPTION",
            sortable: false,
        },
    ],
    //loanContract
    [
        {
            name: "fund",
            align: "left",
            label: "field.fund.label",
            field: "FUND",
            sortable: false,
        },
        {
            name: "contractNumber",
            align: "left",
            label: "field.contractNumber.label",
            field: "CONTRACT_NUMBER",
            sortable: false,
        },
        {
            name: "counterParty",
            align: "left",
            label: "field.counterParty.label",
            field: "COUNTER_PARTY",
            sortable: false,
        },
        {
            name: "principal",
            align: "right",
            label: "field.principal.label",
            field: "PRINCIPAL",
            sortable: false,
        },
        {
            name: "placementDate",
            align: "center",
            label: "field.placementDate.label",
            field: "PLACEMENT_DATE",
            sortable: false,
        },
        {
            name: "valueDate",
            align: "center",
            label: "field.valueDate.label",
            field: "VALUE_DATE",
            sortable: false,
        },
        {
            name: "maturityDate",
            align: "center",
            label: "field.maturityDate.label",
            field: "MATURITY_DATE",
            sortable: false,
        },
        {
            name: "interestRate",
            align: "right",
            label: "field.interestRate.label",
            field: "INTEREST_RATE",
            sortable: false,
        },
        {
            name: "currency",
            align: "left",
            label: "field.currency.label",
            field: "CURRENCY",
            sortable: false,
        },
        {
            name: "contractExchangeRate",
            align: "right",
            label: "field.contractExchangeRate.label",
            field: "CONTRACT_EXCHANGE_RATE",
            sortable: false,
        },
        {
            name: "description",
            align: "left",
            label: "field.descriptionFa.label",
            field: "DESCRIPTION",
            sortable: false,
        },
    ],
    //fundCertInvest
    [
        {
            name: "fund",
            align: "left",
            label: "field.fund.label",
            field: "FUND",
            sortable: false,
        },
        {
            name: "ticker",
            align: "left",
            label: "field.ccqCode.label",
            field: "SYMBOL",
            sortable: false,
        },
        {
            name: "counterParty",
            align: "left",
            label: "field.counterParty.label",
            field: "COUNTER_PARTY",
            sortable: false,
        },
        {
            name: "transType",
            align: "left",
            label: "field.transType.label",
            field: "TRANS_TYPE",
            sortable: false,
        },
        {
            name: "tradeDate",
            align: "center",
            label: "field.tradeDate.label",
            field: "TRADE_DATE",
            sortable: false,
        },
        {
            name: "allocatedDate",
            align: "center",
            label: "field.allocatedDate.label",
            field: "ALLOCATED_DATE",
            sortable: false,
        },
        {
            name: "quantity",
            align: "right",
            label: "field.quantity.label",
            field: "QUANTITY",
            sortable: false,
        },
        {
            name: "price",
            align: "right",
            label: "field.price.label",
            field: "PRICE",
            sortable: false,
        },
        {
            name: "tradeAmount",
            align: "right",
            label: "field.tradeAmount.label",
            field: "TRADE_AMOUNT",
            sortable: false,
        },
        {
            name: "fee",
            align: "right",
            label: "field.fee.label",
            field: "FEE_AMOUNT",
            sortable: false,
        },
        {
            name: "note",
            align: "left",
            label: "field.descriptionFa.label",
            field: "DESCRIPTION",
            sortable: false,
        },
    ],
    //oddLotTrading
    [
        {
            name: "brokerCode",
            align: "left",
            label: "field.brokerCode.label",
            field: "BROKER_CODE",
            sortable: false,
        },
        {
            name: "transType",
            align: "left",
            label: "field.transType.label",
            field: "TRANS_TYPE",
            sortable: false,
        },
        {
            name: "fund",
            align: "left",
            label: "field.fund.label",
            field: "FUND",
            sortable: false,
        },
        {
            name: "secCode",
            align: "left",
            label: "field.secCode.label",
            field: "SYMBOL",
            sortable: false,
        },
        {
            name: "tradeDate",
            align: "center",
            label: "field.tradeDate.label",
            field: "TRADE_DATE",
            sortable: false,
        },
        {
            name: "quantity",
            align: "right",
            label: "field.quantity.label",
            field: "QUANTITY",
            sortable: false,
        },
        {
            name: "price",
            align: "right",
            label: "field.price.label",
            field: "PRICE",
            sortable: false,
        },
        {
            name: "grossAmount",
            align: "right",
            label: "field.grossAmount.label",
            field: "GROSS_AMOUNT",
            sortable: false,
        },
        {
            name: "fee",
            align: "right",
            label: "field.fee.label",
            field: "FEE",
            sortable: false,
        },
        {
            name: "tax",
            align: "right",
            label: "field.tax.label",
            field: "TAX",
            sortable: false,
        },
        {
            name: "note",
            align: "left",
            label: "field.descriptionFa.label",
            field: "DESCRIPTION",
            sortable: false,
        },
    ],
    [
        {
            name: "bankCode",
            align: "left",
            label: "field.bankCode.label",
            field: "BankCode",
            sortable: false,
        },
        {
            name: "bankName",
            align: "left",
            label: "field.bankName.label",
            field: "BankName",
            sortable: false,
        },
    ],
    [
        {
            name: "organizationCode",
            align: "left",
            label: "field.organizationCode.label",
            field: "OrganizationCode",
            sortable: false,
        },
        {
            name: "organizationName",
            align: "left",
            label: "field.organizationName.label",
            field: "OrganizationName",
            sortable: false,
        },
        {
            name: "abbreviations",
            align: "left",
            label: "field.abbreviations.label",
            field: "Abbreviations",
            sortable: false,
        },
    ],
];

export const listHeadersFa = [
    //fundCert
    [
        "FUND",
        "CUSTODYCD",
        "FULLNAME",
        "DBCODE",
        "BANKACNAME",
        "CITYBANK",
        "BANKACC",
        "TRADINGID",
        "EXECNAME",
        "TXDATE " + "(yyyymmdd)",
        "MATCHQTTY",
        "NAV",
        "MATCHAMT",
        "TAXAMT",
        "FEEAMC",
        "FEEDXX",
        "FEEFUND",
    ],
    //depositContract
    [
        "Fund",
        "Contract number",
        "Contract date (yyyymmdd)",
        "Value date (yyyymmdd)",
        "Depository Bank",
        "Principal",
        "Maturity date (yyyymmdd)",
        "Interest rate",
        "Currency",
        "Day basic",
        "Interest period",
        "Interest accrual method",
        "Interest frequency",
        "Contract Exchange rate",
        "Description",
    ],
    //fundCertDeposit
    [
        "Fund",
        "Contract number",
        "Value date (yyyymmdd)",
        "Sec code",
        "Trans type",
        "Interest accrual method",
        "Quantity",
        "Contract value (Amount)",
        "Clean amount",
        "Coupon",
        "Trade date (yyyymmdd)",
        "Settlement date (yyyymmdd)",
        "Owner transfer fee",
        "Currency",
        "Contract Exchange rate",
        "Tax",
        "Counter party",
        "Description",
    ],
    //fundStockInvest
    [
        "Broker Code",
        "Trans Type",
        "Fund",
        "Sec code",
        "Trade date (yyyymmdd)",
        "Settle date (yyyymmdd)",
        "Quantity(shs)",
        "Price(VND)",
        "Gross Amount(VND)",
        "Broker Fee(VND)",
        "Tax",
        "Net Amount(VND)",
        "Clean amount",
        "Coupon",
        "Transaction processing fee",
        "Trade type",
        "ETF date",
        "AP",
    ],
    //fundOtc
    [
        "Fund",
        "Contract number",
        "Trans Type",
        "Sec code",
        "Trade date (yyyymmdd)",
        "Settle date (yyyymmdd)",
        "Quantity(shs)",
        "Settlement amount",
        "Clean amount",
        "Coupon",
        "Tax",
        "Transfer fee",
        "Counter party",
    ],
    //fundDerivatives
    [
        "Fund",
        "Trade date (yyyymmdd)",
        "Ticker",
        "Broker",
        "Position",
        "Type",
        "Quantity",
        "Broker fee",
        "VSD fee",
        "HNX fee",
        "Tax",
        "Open position price",
        "Ending price",
        "Description",
    ],
    //loanContract
    [
        "Fund",
        "Contract number",
        "Counter party",
        "Principal",
        "Placement date (yyyymmdd)",
        "Value date (yyyymmdd)",
        "Maturity date (yyyymmdd)",
        "Interest Rate",
        "Currency",
        "Contract Exchange Rate",
        "Description",
    ],
    //fundCertInvest
    [
        "Fund",
        "Ticker",
        "Trans type",
        "Counter party",
        "Trade date (yyyymmdd)",
        "Allocated date (yyyymmdd)",
        "Quantity(shs)",
        "Price",
        "Trade amount",
        "Fee amount",
        "Description",
    ],
    //oddLotTrading
    [
        "Fund",
        "Broker Code",
        "Trans Type",
        "Sec code",
        "Trade date (yyyymmdd)",
        "Quantity(shs)",
        "Price(VND)",
        "Gross Amount(VND)",
        "Fee(VND)",
        "Tax",
        "Description",
    ],
    // ["Bank Code", "Bank Name"],
    // ["Organization Code", "Organization Name", "Abbreviations"],
    ["Mã ngân hàng", "Tên ngân hàng"],
    ["Mã tổ chức", "Tên tổ chức cung cấp dịch vụ", "Tên viết tắt"],
];

// map data submit
export const mappingDataFa = [
    //fundCert
    {
        0: "FUND_CODE",
        1: "CUSTODYCD",
        2: "FULLNAME",
        3: "DBCODE",
        4: "BANKACCNAME",
        5: "CITYBANK",
        6: "BANKACC",
        7: "TRADING_ID",
        8: "EXECNAME",
        9: "TXDATE",
        10: "MATCHQTTY",
        11: "NAV",
        12: "MATCHAMT",
        13: "TAXAMT",
        14: "FEEAMC",
        15: "FEEDXX",
        16: "FEEFUND",
    },
    //depositContract
    {
        0: "FUND",
        1: "CONTRACT_NUMBER",
        2: "CONTRACT_DATE",
        3: "VALUE_DATE",
        4: "DEPOSITORY_BANK",
        5: "PRINCIPAL",
        6: "MATURITY_DATE",
        7: "INTEREST_RATE",
        8: "CURRENCY",
        9: "DAY_BASIC",
        10: "INTEREST_PERIOD",
        11: "INTEREST_ACCRUAL_METHOD",
        12: "INTEREST_FREQUENCY",
        13: "CONTRACT_EXCHANGE_RATE",
        14: "DESCRIPTION",
    },
    //fundCertDeposit
    {
        0: "FUND",
        1: "CONTRACT_NUMBER",
        2: "VALUE_DATE",
        3: "SECCODE",
        4: "TRANSTYPE",
        5: "INTEREST_ACTUAL_METHOD",
        6: "QUANTITY",
        7: "CONTRACT_VALUE",
        8: "CLEAN_AMOUNT",
        9: "COUPON",
        10: "TRADEDATE",
        11: "SETTLEMENT_DATE",
        12: "OWNER_TRANSFER_FEE",
        13: "CURRENCY",
        14: "CONTRACT_EXCHANGE_RATE",
        15: "TAX",
        16: "COUNTER_PARTY",
        17: "DESCRIPTION",
    },
    //fundStockInvest
    {
        0: "BROKER_CODE",
        1: "TRANS_TYPE",
        2: "FUND",
        3: "SECCODE",
        4: "TRADE_DATE",
        5: "SETTLEMENT_DATE",
        6: "QUANTITY",
        7: "PRICE",
        8: "GROSS_AMOUNT",
        9: "BROKER_FEE",
        10: "TAX",
        11: "NET_AMOUNT",
        12: "CLEAN_AMOUNT",
        13: "COUPON",
        14: "TRANSACTION_PROCESS_FEE",
        15: "TRADE_TYPE",
        16: "ETF_DATE",
        17: "AP",
    },
    //fundOtc
    {
        0: "FUND",
        1: "CONTRACT_NUMBER",
        2: "TRANS_TYPE",
        3: "SECCODE",
        4: "TRADE_DATE",
        5: "SETTLEMENT_DATE",
        6: "QUANTITY",
        7: "SETTLEMENT_AMOUNT",
        8: "CLEAN_AMOUNT",
        9: "COUPON",
        10: "TAX",
        11: "TRANSFER_FEE",
        12: "COUNTER_PARTY",
    },
    //fundDerivatives
    {
        0: "FUND",
        1: "TRADE_DATE",
        2: "SECCODE",
        3: "BROKER",
        4: "POSITION",
        5: "TYPE",
        6: "QUANTITY",
        7: "BROKER_FEE",
        8: "VSD_FEE",
        9: "HNX_FEE",
        10: "TAX",
        11: "OPEN_POSITION_PRICE",
        12: "ENDING_PRICE",
        13: "DESCRIPTION",
    },
    //loanContract
    {
        0: "FUND",
        1: "CONTRACT_NUMBER",
        2: "COUNTER_PARTY",
        3: "PRINCIPAL",
        4: "PLACEMENT_DATE",
        5: "VALUE_DATE",
        6: "MATURITY_DATE",
        7: "INTEREST_RATE",
        8: "CURRENCY",
        9: "CONTRACT_EXCHANGE_RATE",
        10: "DESCRIPTION",
    },
    //fundCertInvest
    {
        0: "FUND",
        1: "SYMBOL",
        2: "TRANS_TYPE",
        3: "COUNTER_PARTY",
        4: "TRADE_DATE",
        5: "ALLOCATED_DATE",
        6: "QUANTITY",
        7: "PRICE",
        8: "TRADE_AMOUNT",
        9: "FEE_AMOUNT",
        10: "DESCRIPTION",
    },
    //oddLotTrading
    {
        0: "FUND",
        1: "BROKER_CODE",
        2: "TRANS_TYPE",
        3: "SYMBOL",
        4: "TRADE_DATE",
        5: "QUANTITY",
        6: "PRICE",
        7: "GROSS_AMOUNT",
        8: "FEE",
        9: "TAX",
        10: "DESCRIPTION",
    },
    {
        0: "BankCode",
        1: "BankName",
    },
    {
        0: "OrganizationCode",
        1: "OrganizationName",
        2: "Abbreviations",
    },
];

// validate Date
export const dateFieldsFa = [
    "TXDATE",
    "CONTRACT_DATE",
    "VALUE_DATE",
    "MATURITY_DATE",
    "SETTLEMENT_DATE",
    "ETF_DATE",
    "PLACEMENT_DATE",
    "MATURITY_DATE",
    "ALLOCATED_DATE",
    "TRADE_DATE",
    "TRADEDATE",
];

// format value number
export const numberFieldsFa = [
    "MATCHQTTY",
    "NAV",
    "MATCHAMT",
    "TAXAMT",
    "FEEAMC",
    "FEEDXX",
    "FEEFUND",
    "PRINCIPAL",
    "INTEREST_RATE",
    "QUANTITY",
    "CONTRACT_VALUE",
    "CLEAN_AMOUNT",
    "COUPON",
    "OWNER_TRANSFER_FEE",
    "CONTRACT_EXCHANGE_RATE",
    "TAX",
    "PRICE",
    "GROSS_AMOUNT",
    "BROKER_FEE",
    "NET_AMOUNT",
    "TRANSACTION_PROCESS_FEE",
    "SETTLEMENT_AMOUNT",
    "TRANSFER_FEE",
    "VSD_FEE",
    "HNX_FEE",
    "OPEN_POSITION_PRICE",
    "ENDING_PRICE",
    "TRADE_AMOUNT",
    "FEE_AMOUNT",
    "FEE",
];