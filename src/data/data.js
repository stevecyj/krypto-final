export const proposalTypeOptions = [
    { id: "type1", value: "council", label: "Council" },
    { id: "type2", value: "proposal", label: "Proposal" },
    { id: "type3", value: "treasury", label: "Treasury" },
    { id: "type4", value: "masterTreasury", label: "Master Treasury"}
];

export const councilOptions = [
    { id: "council1",label: "理事會競選", value: 0 },
    { id: "council2",label: "理事會罷免",value: 1 },
    { id: "council3",label: "參與競選之候選人質押Trend Token門檻", value: 2 },
    { id: "council4",label: "理事會活動最低參與投票的門檻", value: 3,},
    { id: "council5",label: "理事會人數上限值", value: 4},
    { id: "council6",label: "取得投票力的質押Trend Token門檻", value: 5},
    { id: "council7",label: "當選理事會的所需獲得之得票力門檻", value: 6 },
    { id: "council8",label: "競選各階段時間間隔", value: 7 },
    { id: "council9",label: "罷免各階段時間間隔", value: 8 }
];

export const proposalOptions = [
    { id: "proposal1",label: "提案者質押Trend Token門檻",  value: 9 },
    { id: "proposal2",label: "提案需取得多少投票力才算提案通過", value: 10 },
    { id: "proposal3",label: "提案各階段時間間隔", value: 11 },
    { id: "proposal4",label: "取得投票力的質押Trend Token門檻",  value: 12}
];

export const treasuryOptions = [
    { id: "treasury1",label: "Confirm次數", value: 13 }
];
export const masterTreasuryOptions = [
    { id: "mtreasury1",label: "Confirm次數", value: 14 }
];
export const typePrint = [
    "Council","Council","Council","Council","Council","Council","Council","Council","Council",
    "Proposal","Proposal","Proposal","Proposal",
    "Treasury",
    "Master Treasury"]
export const detailPrint = [
    "理事會競選",
    "理事會罷免",
    "參與競選之候選人質押Trend Token門檻",
    "理事會活動最低參與投票的門檻",
    "理事會人數上限值",
    "取得投票力的質押Trend Token門檻",
    "當選理事會的所需獲得之得票力門檻",
    "競選各階段時間間隔",
    "罷免各階段時間間隔",
    "提案者質押Trend Token門檻",
    "提案需取得多少投票力才算提案通過",
    "提案各階段時間間隔",
    "取得投票力的質押Trend Token門檻",
    "Confirm次數",
    "Confirm次數"
]
export const proposalState= [
    "準備中",
    "投票進行中",
    "結算中",
    "已執行",
    "已否決"
]
export const transactionTypeOptions = [
    { id: "tx1",label: "開啟TREND / WETH 資金池（僅限一次）",  value: 4 },
    { id: "tx2",label: "提供流動性", value: 2 },
    { id: "tx3",label: "移除流動性", value: 3 },
    { id: "tx4",label: "投資",  value: 0},
    { id: "tx5",label: "賣出",  value: 1}
]
export const transactionTypePrint= [
    "投資",
    "賣出",
    "提供流動性",
    "移除流動性",
    "開啟TREND / WETH 資金池" 
]
export const transactionTypeOptionsForMaster = [
    { id: "tx4",label: "投資",  value: 0},
    { id: "tx5",label: "賣出",  value: 1}
]
export const transactionTypePrintForMaster= [
    "投資",
    "賣出"
]

export const tabs = [
    { id: "tab1",label: "競選活動",  value: 0 },
    { id: "tab2",label: "罷免活動", value: 1 }
]
export const campaignPhasePrint = [
    "CLOSED",
    "CANDIDATE_ATTENDING",
    "VOTING",
    "CONFIRMING"
]
export const recallPhasePrint = [
    "CLOSED",
    "VOTING",
    "CONFIRMING"
]