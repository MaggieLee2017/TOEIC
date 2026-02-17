#!/usr/bin/env python3
"""TOEIC Vocabulary Generator - 10000+ words with sentences and questions"""
import json, os, random, hashlib, sys

try:
    import eng_to_ipa as ipa
    HAS_IPA = True
except ImportError:
    HAS_IPA = False

def get_kk_phonetic(word):
    """Generate KK phonetic transcription for a word"""
    if HAS_IPA:
        result = ipa.convert(word)
        if result and result != word and '*' not in result:
            return f'/{result}/'
    return ''

sys.path.insert(0, os.path.dirname(__file__))
from words_extra1 import WORDS_EXTRA_1
from words_extra2 import WORDS_EXTRA_2
from words_extra3 import WORDS_EXTRA_3
from words_expand import WORDS_EXPAND
from words_expand2 import WORDS_EXPAND_2
from words_expand3 import WORDS_EXPAND_3
from words_family import WORD_FAMILIES
from words_general import WORDS_GENERAL
from words_mega import WORDS_MEGA
from words_mega2 import WORDS_MEGA_2
from words_derived import DERIVED_WORDS

CATEGORIES = [
    ("cat01", "商務管理", ["management", "leadership", "strategy"]),
    ("cat02", "財務會計", ["accounting", "investment", "budgeting"]),
    ("cat03", "行銷業務", ["marketing", "advertising", "sales"]),
    ("cat04", "人力資源", ["recruitment", "training", "benefits"]),
    ("cat05", "製造品質", ["manufacturing", "quality", "production"]),
    ("cat06", "科技資訊", ["technology", "software", "innovation"]),
    ("cat07", "法律合規", ["legal", "contracts", "compliance"]),
    ("cat08", "辦公行政", ["office", "administration", "scheduling"]),
    ("cat09", "旅遊物流", ["travel", "logistics", "transportation"]),
    ("cat10", "醫療保健", ["healthcare", "insurance", "wellness"]),
    ("cat11", "不動產", ["realestate", "construction", "property"]),
    ("cat12", "餐飲服務", ["dining", "hospitality", "catering"]),
    ("cat13", "銀行金融", ["banking", "loans", "fintech"]),
    ("cat14", "媒體傳播", ["media", "journalism", "publishing"]),
    ("cat15", "教育訓練", ["education", "certification", "workshop"]),
]

# Format: (word, pos, meanings_zh, collocations, difficulty)
# Each category ~670 words to reach ~10000 total
WORDS = {
"cat01": [
("accomplish","v",["完成","達成"],"accomplish a goal",1),
("achievement","n",["成就","成績"],"notable achievement",1),
("acquire","v",["獲得","取得"],"acquire a company",2),
("acquisition","n",["收購","取得"],"corporate acquisition",2),
("administer","v",["管理","執行"],"administer a program",2),
("administration","n",["行政","管理"],"business administration",1),
("administrative","adj",["行政的","管理的"],"administrative duties",1),
("administrator","n",["管理者","行政人員"],"system administrator",1),
("adopt","v",["採用","採納"],"adopt a strategy",1),
("adoption","n",["採用","採納"],"technology adoption",2),
("advance","v",["推進","前進"],"advance a project",1),
("advancement","n",["進步","晉升"],"career advancement",1),
("agenda","n",["議程","日程"],"meeting agenda",1),
("aggressive","adj",["積極的","有企圖心的"],"aggressive strategy",2),
("agreement","n",["協議","合約"],"reach an agreement",1),
("allocate","v",["分配","撥出"],"allocate resources",2),
("allocation","n",["分配","撥款"],"budget allocation",2),
("ambitious","adj",["有野心的","雄心的"],"ambitious plan",1),
("analyze","v",["分析","研究"],"analyze data",1),
("analysis","n",["分析","解析"],"market analysis",1),
("analyst","n",["分析師","分析員"],"financial analyst",1),
("annual","adj",["年度的","每年的"],"annual report",1),
("annually","adv",["每年地"],"reviewed annually",1),
("appoint","v",["任命","指派"],"appoint a director",2),
("appointment","n",["任命","約會"],"schedule an appointment",1),
("appraisal","n",["評估","鑑定"],"performance appraisal",2),
("approach","n",["方法","途徑"],"strategic approach",1),
("approval","n",["批准","認可"],"get approval",1),
("approve","v",["批准","核准"],"approve a proposal",1),
("aspire","v",["渴望","追求"],"aspire to lead",2),
("assess","v",["評估","評定"],"assess the situation",2),
("assessment","n",["評估","評量"],"risk assessment",2),
("assign","v",["分配","指派"],"assign a task",1),
("assignment","n",["任務","作業"],"work assignment",1),
("assist","v",["協助","幫助"],"assist a colleague",1),
("assistance","n",["協助","援助"],"technical assistance",1),
("associate","n",["夥伴","同事"],"business associate",1),
("assume","v",["承擔","假設"],"assume responsibility",2),
("attain","v",["達到","獲得"],"attain a goal",2),
("attainable","adj",["可達到的"],"attainable target",2),
("attempt","v",["嘗試","企圖"],"attempt to improve",1),
("attribute","v",["歸因於"],"attribute success to",2),
("audit","n",["審計","稽核"],"internal audit",2),
("authority","n",["權力","權威"],"have authority",1),
("authorize","v",["授權","批准"],"authorize payment",2),
("automate","v",["自動化"],"automate processes",2),
("benchmark","n",["基準","標竿"],"industry benchmark",2),
("board","n",["董事會","委員會"],"board of directors",1),
("brainstorm","v",["腦力激盪"],"brainstorm ideas",1),
("brief","v",["簡報","說明"],"brief the team",1),
("briefing","n",["簡報","說明會"],"morning briefing",1),
("budget","n",["預算"],"annual budget",1),
("capability","n",["能力","才能"],"core capability",2),
("capacity","n",["能力","產能"],"production capacity",1),
("capital","n",["資本","資金"],"raise capital",2),
("capitalize","v",["利用","資本化"],"capitalize on opportunities",2),
("career","n",["職業","生涯"],"career path",1),
("centralize","v",["集中化"],"centralize operations",2),
("chair","v",["主持"],"chair a meeting",1),
("chairman","n",["主席","董事長"],"board chairman",1),
("challenge","n",["挑戰"],"face a challenge",1),
("chief","adj",["主要的","首席的"],"chief executive",1),
("circulate","v",["流通","傳閱"],"circulate a memo",2),
("clarify","v",["釐清","闡明"],"clarify a point",1),
("collaborate","v",["合作","協作"],"collaborate on projects",1),
("collaboration","n",["合作","協作"],"team collaboration",1),
("colleague","n",["同事"],"a close colleague",1),
("commence","v",["開始","著手"],"commence operations",2),
("commission","n",["佣金","委員會"],"sales commission",2),
("commit","v",["承諾","致力"],"commit to a plan",1),
("commitment","n",["承諾","奉獻"],"strong commitment",1),
("committee","n",["委員會"],"advisory committee",1),
("communicate","v",["溝通","傳達"],"communicate effectively",1),
("communication","n",["溝通","通訊"],"business communication",1),
("compensation","n",["補償","薪酬"],"fair compensation",2),
("compete","v",["競爭"],"compete in the market",1),
("competent","adj",["有能力的","稱職的"],"competent employee",1),
("competition","n",["競爭","競賽"],"fierce competition",1),
("competitive","adj",["有競爭力的"],"competitive advantage",1),
("competitor","n",["競爭者","對手"],"main competitor",1),
("compile","v",["彙編","收集"],"compile a report",2),
("comply","v",["遵守","順從"],"comply with regulations",2),
("compliance","n",["合規","遵從"],"regulatory compliance",2),
("comprehensive","adj",["全面的","綜合的"],"comprehensive plan",2),
("conceive","v",["構想","設想"],"conceive a plan",3),
("concentrate","v",["集中","專注"],"concentrate efforts",1),
("concern","n",["關注","擔憂"],"raise a concern",1),
("conclude","v",["結論","結束"],"conclude a deal",1),
("conclusion","n",["結論","結尾"],"reach a conclusion",1),
("conduct","v",["進行","執行"],"conduct a survey",1),
("confer","v",["商議","授予"],"confer with colleagues",2),
("conference","n",["會議","研討會"],"annual conference",1),
("confidential","adj",["機密的"],"confidential information",2),
("confirm","v",["確認","證實"],"confirm an order",1),
("confirmation","n",["確認","證實"],"order confirmation",1),
("conflict","n",["衝突","矛盾"],"resolve conflict",1),
("consecutive","adj",["連續的"],"consecutive quarters",2),
("consensus","n",["共識","一致"],"reach consensus",2),
("consequence","n",["後果","結果"],"serious consequence",1),
("consider","v",["考慮","認為"],"consider options",1),
("considerable","adj",["相當大的"],"considerable effort",1),
("consideration","n",["考量","體諒"],"take into consideration",1),
("consistent","adj",["一致的","穩定的"],"consistent performance",1),
("consolidate","v",["合併","鞏固"],"consolidate operations",2),
("constitute","v",["構成","組成"],"constitute a majority",2),
("consult","v",["諮詢","顧問"],"consult an expert",1),
("consultant","n",["顧問"],"management consultant",1),
("consultation","n",["諮詢","協商"],"free consultation",2),
("contribute","v",["貢獻","捐獻"],"contribute to growth",1),
("contribution","n",["貢獻","捐獻"],"significant contribution",1),
("convention","n",["大會","慣例"],"trade convention",2),
("convene","v",["召集","開會"],"convene a meeting",2),
("cooperate","v",["合作","配合"],"cooperate with partners",1),
("cooperation","n",["合作","配合"],"international cooperation",1),
("coordinate","v",["協調","統籌"],"coordinate efforts",1),
("coordination","n",["協調","統籌"],"project coordination",1),
("corporate","adj",["企業的","公司的"],"corporate culture",1),
("corporation","n",["公司","企業"],"multinational corporation",1),
("correspond","v",["對應","通信"],"correspond with clients",2),
("correspondence","n",["信件","通訊"],"business correspondence",2),
("costly","adj",["昂貴的","代價高的"],"costly mistake",1),
("council","n",["委員會","理事會"],"city council",2),
("counterpart","n",["對應者","同行"],"international counterpart",2),
("criterion","n",["標準","準則"],"selection criterion",2),
("crucial","adj",["關鍵的","至關重要的"],"crucial decision",1),
("deadline","n",["截止日期"],"meet a deadline",1),
("debate","n",["辯論","討論"],"heated debate",1),
("decentralize","v",["分散化"],"decentralize management",3),
("decision","n",["決定","決策"],"make a decision",1),
("decisive","adj",["果斷的","決定性的"],"decisive action",2),
("decline","v",["下降","拒絕"],"decline an offer",1),
("dedicate","v",["奉獻","致力"],"dedicate time to",1),
("delegate","v",["委派","授權"],"delegate tasks",2),
("delegation","n",["代表團","授權"],"trade delegation",2),
("deliberate","adj",["故意的","審慎的"],"deliberate effort",2),
("deliver","v",["交付","發表"],"deliver results",1),
("demand","n",["需求","要求"],"meet demand",1),
("demonstrate","v",["展示","證明"],"demonstrate skills",1),
("department","n",["部門"],"sales department",1),
("deputy","n",["副手","代理人"],"deputy director",2),
("designate","v",["指定","指派"],"designate a leader",2),
("determine","v",["決定","確定"],"determine the cause",1),
("develop","v",["發展","開發"],"develop a plan",1),
("development","n",["發展","開發"],"product development",1),
("devise","v",["設計","想出"],"devise a strategy",2),
("devote","v",["奉獻","致力"],"devote resources",1),
("dimension","n",["面向","層面"],"new dimension",2),
("diligent","adj",["勤奮的","認真的"],"diligent worker",1),
("direct","v",["指導","指揮"],"direct a project",1),
("director","n",["主管","總監"],"managing director",1),
("discipline","n",["紀律","學科"],"maintain discipline",1),
("discretion","n",["自由裁量權","審慎"],"use discretion",2),
("dismiss","v",["解僱","駁回"],"dismiss an employee",2),
("dispatch","v",["派遣","發送"],"dispatch a team",2),
("dispose","v",["處置","安排"],"dispose of assets",2),
("distinguish","v",["區分","辨別"],"distinguish between",2),
("distribute","v",["分配","分發"],"distribute resources",1),
("distribution","n",["分配","分銷"],"product distribution",1),
("diverse","adj",["多元的","多樣的"],"diverse team",1),
("diversity","n",["多元化","多樣性"],"workplace diversity",1),
("division","n",["部門","分部"],"marketing division",1),
("document","v",["記錄","建檔"],"document changes",1),
("documentation","n",["文件","記錄"],"proper documentation",1),
("domain","n",["領域","範圍"],"area of domain",2),
("dominate","v",["主導","支配"],"dominate the market",2),
("downsize","v",["縮編","裁員"],"downsize operations",2),
("draft","v",["草擬","起草"],"draft a proposal",1),
("drive","v",["驅動","推動"],"drive innovation",1),
("due","adj",["到期的","應有的"],"due date",1),
("dynamic","adj",["動態的","有活力的"],"dynamic market",1),
("economize","v",["節約","節省"],"economize on costs",2),
("effective","adj",["有效的","生效的"],"effective strategy",1),
("effectiveness","n",["有效性","效力"],"cost effectiveness",1),
("efficiency","n",["效率"],"improve efficiency",1),
("efficient","adj",["高效的"],"efficient process",1),
("elaborate","v",["詳述","闡明"],"elaborate on a point",2),
("eliminate","v",["消除","排除"],"eliminate waste",1),
("emerge","v",["出現","浮現"],"emerge as a leader",2),
("emphasis","n",["重點","強調"],"place emphasis on",1),
("emphasize","v",["強調","著重"],"emphasize quality",1),
("employ","v",["僱用","使用"],"employ workers",1),
("employee","n",["員工","僱員"],"full-time employee",1),
("employer","n",["雇主"],"potential employer",1),
("employment","n",["僱用","就業"],"employment rate",1),
("empower","v",["授權","賦能"],"empower employees",2),
("enable","v",["使能夠","啟用"],"enable growth",1),
("encounter","v",["遇到","碰到"],"encounter problems",1),
("encourage","v",["鼓勵","激勵"],"encourage innovation",1),
("endeavor","n",["努力","事業"],"business endeavor",2),
("endorse","v",["背書","認可"],"endorse a product",2),
("enforce","v",["執行","實施"],"enforce a policy",2),
("engage","v",["參與","從事"],"engage stakeholders",1),
("engagement","n",["參與","約定"],"employee engagement",1),
("enhance","v",["增強","提升"],"enhance performance",1),
("enhancement","n",["增強","提升"],"system enhancement",2),
("enterprise","n",["企業","事業"],"private enterprise",1),
("entrepreneur","n",["企業家","創業家"],"serial entrepreneur",2),
("establish","v",["建立","設立"],"establish a business",1),
("establishment","n",["設立","機構"],"business establishment",2),
("estimate","v",["估計","評估"],"estimate costs",1),
("evaluate","v",["評估","評價"],"evaluate performance",1),
("evaluation","n",["評估","評價"],"performance evaluation",1),
("evidence","n",["證據","跡象"],"provide evidence",1),
("exceed","v",["超越","超出"],"exceed expectations",1),
("excel","v",["擅長","超越"],"excel at work",1),
("excellence","n",["卓越","優秀"],"achieve excellence",1),
("exceptional","adj",["卓越的","出色的"],"exceptional talent",1),
("execute","v",["執行","實施"],"execute a plan",1),
("execution","n",["執行","實施"],"flawless execution",2),
("executive","n",["主管","執行官"],"senior executive",1),
("exempt","adj",["免除的","豁免的"],"tax exempt",2),
("exercise","v",["行使","運用"],"exercise authority",2),
("expand","v",["擴展","擴大"],"expand operations",1),
("expansion","n",["擴展","擴張"],"market expansion",1),
("expedite","v",["加速","促進"],"expedite the process",2),
("expertise","n",["專業知識","專長"],"technical expertise",1),
("facilitate","v",["促進","協助"],"facilitate communication",2),
("feasible","adj",["可行的"],"feasible plan",2),
("fiscal","adj",["財政的","會計的"],"fiscal year",2),
("fluctuate","v",["波動","變動"],"prices fluctuate",2),
("focus","v",["聚焦","專注"],"focus on results",1),
("forecast","n",["預測","預報"],"sales forecast",1),
("formulate","v",["制定","擬定"],"formulate a plan",2),
("foster","v",["培養","促進"],"foster growth",2),
("foundation","n",["基礎","基金會"],"strong foundation",1),
("framework","n",["框架","架構"],"policy framework",2),
("fulfill","v",["履行","實現"],"fulfill obligations",1),
("function","n",["功能","職能"],"key function",1),
("fundamental","adj",["基本的","根本的"],"fundamental change",1),
("generate","v",["產生","創造"],"generate revenue",1),
("genuine","adj",["真正的","真誠的"],"genuine concern",1),
("govern","v",["治理","管理"],"govern an organization",2),
("governance","n",["治理","管理"],"corporate governance",2),
("grant","v",["授予","準予"],"grant permission",1),
("guarantee","v",["保證","擔保"],"guarantee quality",1),
("guidance","n",["指導","指引"],"provide guidance",1),
("guideline","n",["指導方針","準則"],"follow guidelines",1),
("headquarters","n",["總部"],"company headquarters",1),
("hierarchy","n",["層級","組織架構"],"corporate hierarchy",2),
("highlight","v",["強調","突顯"],"highlight achievements",1),
("hire","v",["僱用","聘請"],"hire employees",1),
("honor","v",["尊重","兌現"],"honor a commitment",1),
("ideal","adj",["理想的","完美的"],"ideal candidate",1),
("identify","v",["識別","認出"],"identify problems",1),
("impact","n",["影響","衝擊"],"positive impact",1),
("implement","v",["實施","執行"],"implement changes",1),
("implementation","n",["實施","執行"],"plan implementation",1),
("implication","n",["含義","影響"],"financial implication",2),
("impose","v",["實施","強加"],"impose restrictions",2),
("incentive","n",["激勵","獎勵"],"financial incentive",2),
("incorporate","v",["納入","合併"],"incorporate feedback",2),
("incur","v",["招致","遭受"],"incur expenses",2),
("indicate","v",["指出","表明"],"indicate a trend",1),
("indicator","n",["指標"],"key indicator",1),
("industry","n",["產業","工業"],"service industry",1),
("influence","v",["影響"],"influence decisions",1),
("inform","v",["通知","告知"],"inform stakeholders",1),
("infrastructure","n",["基礎設施"],"IT infrastructure",2),
("initiate","v",["發起","開始"],"initiate a project",2),
("initiative","n",["倡議","主動性"],"new initiative",1),
("innovate","v",["創新"],"innovate constantly",2),
("innovation","n",["創新"],"drive innovation",1),
("innovative","adj",["創新的"],"innovative solution",1),
("input","n",["投入","意見"],"provide input",1),
("inquiry","n",["詢問","調查"],"customer inquiry",1),
("inspect","v",["檢查","巡視"],"inspect a facility",2),
("inspection","n",["檢查","檢驗"],"quality inspection",2),
("institute","v",["建立","制定"],"institute a policy",2),
("institution","n",["機構","制度"],"financial institution",1),
("instruct","v",["指示","教導"],"instruct employees",1),
("instruction","n",["指示","說明"],"written instruction",1),
("integral","adj",["不可或缺的"],"integral part",2),
("integrate","v",["整合","融合"],"integrate systems",2),
("integration","n",["整合","融合"],"system integration",2),
("intend","v",["打算","意圖"],"intend to expand",1),
("interim","adj",["臨時的","暫時的"],"interim report",2),
("internal","adj",["內部的"],"internal affairs",1),
("interpret","v",["解釋","口譯"],"interpret data",2),
("intervene","v",["介入","干預"],"intervene in a dispute",2),
("inventory","n",["庫存","存貨"],"manage inventory",1),
("invest","v",["投資"],"invest in technology",1),
("investigate","v",["調查","研究"],"investigate a claim",1),
("involve","v",["涉及","參與"],"involve stakeholders",1),
("issue","n",["問題","議題"],"address an issue",1),
("joint","adj",["聯合的","共同的"],"joint venture",2),
("justify","v",["證明...正當","辯護"],"justify expenses",2),
("launch","v",["推出","發起"],"launch a product",1),
("lead","v",["領導","帶領"],"lead a team",1),
("leadership","n",["領導力","領導層"],"strong leadership",1),
("lease","n",["租約","租賃"],"sign a lease",1),
("legitimate","adj",["合法的","正當的"],"legitimate concern",2),
("leverage","v",["利用","槓桿"],"leverage resources",2),
("liability","n",["責任","負債"],"legal liability",2),
("liaison","n",["聯絡人"],"company liaison",2),
("logistics","n",["物流","後勤"],"supply chain logistics",2),
("lucrative","adj",["有利可圖的"],"lucrative deal",2),
("maintain","v",["維持","保持"],"maintain standards",1),
("maintenance","n",["維護","保養"],"equipment maintenance",1),
("manage","v",["管理","經營"],"manage a team",1),
("management","n",["管理","經營層"],"senior management",1),
("mandate","v",["要求","授權"],"mandate compliance",2),
("mandatory","adj",["強制性的","必要的"],"mandatory training",2),
("manipulate","v",["操控","處理"],"manipulate data",2),
("margin","n",["邊際","利潤"],"profit margin",1),
("maximize","v",["最大化"],"maximize profits",1),
("measure","n",["措施","量度"],"take measures",1),
("mediate","v",["調解","斡旋"],"mediate a dispute",2),
("mentor","n",["導師","顧問"],"professional mentor",1),
("merge","v",["合併","融合"],"merge companies",2),
("merger","n",["合併"],"corporate merger",2),
("method","n",["方法","方式"],"effective method",1),
("methodology","n",["方法論"],"research methodology",2),
("milestone","n",["里程碑"],"project milestone",1),
("minimize","v",["最小化","減少"],"minimize risk",1),
("mission","n",["使命","任務"],"company mission",1),
("modify","v",["修改","調整"],"modify a plan",1),
("monitor","v",["監控","監督"],"monitor progress",1),
("motivate","v",["激勵"],"motivate employees",1),
("motivation","n",["動機","激勵"],"employee motivation",1),
("mutual","adj",["共同的","相互的"],"mutual agreement",1),
("negotiate","v",["談判","協商"],"negotiate a deal",1),
("negotiation","n",["談判","協商"],"salary negotiation",1),
("network","v",["建立人脈"],"network at events",1),
("networking","n",["人脈經營"],"professional networking",1),
("nominate","v",["提名","任命"],"nominate a candidate",2),
("notable","adj",["顯著的","值得注意的"],"notable progress",1),
("notify","v",["通知","告知"],"notify employees",1),
("objective","n",["目標","目的"],"key objective",1),
("obligation","n",["義務","責任"],"legal obligation",2),
("observe","v",["觀察","遵守"],"observe regulations",1),
("obtain","v",["獲得","取得"],"obtain approval",1),
("occupy","v",["佔據","從事"],"occupy a position",1),
("operate","v",["經營","運作"],"operate a business",1),
("operation","n",["營運","作業"],"daily operations",1),
("opportunity","n",["機會"],"business opportunity",1),
("optimize","v",["最佳化"],"optimize performance",2),
("option","n",["選項","選擇"],"available options",1),
("organize","v",["組織","安排"],"organize a meeting",1),
("orientation","n",["培訓","方向"],"new employee orientation",1),
("outcome","n",["結果","成果"],"desired outcome",1),
("outline","v",["概述","列出"],"outline a plan",1),
("output","n",["產出","輸出"],"increase output",1),
("outsource","v",["外包"],"outsource production",2),
("overall","adj",["整體的","全面的"],"overall performance",1),
("overcome","v",["克服","戰勝"],"overcome challenges",1),
("overlook","v",["忽略","俯視"],"overlook a detail",1),
("oversee","v",["監督","監管"],"oversee operations",2),
("overview","n",["概述","總覽"],"provide an overview",1),
("participate","v",["參與","參加"],"participate in meetings",1),
("participation","n",["參與","參加"],"active participation",1),
("partnership","n",["合作關係","合夥"],"strategic partnership",1),
("pending","adj",["待定的","未決的"],"pending approval",2),
("perceive","v",["認為","感知"],"perceive as valuable",2),
("perform","v",["執行","表現"],"perform well",1),
("performance","n",["績效","表現"],"high performance",1),
("permit","v",["允許","許可"],"permit access",1),
("persist","v",["堅持","持續"],"persist in efforts",2),
("perspective","n",["觀點","角度"],"new perspective",1),
("phase","n",["階段","時期"],"initial phase",1),
("pioneer","v",["開創","先驅"],"pioneer a method",2),
("pivotal","adj",["關鍵的","核心的"],"pivotal role",2),
("pledge","v",["承諾","保證"],"pledge support",2),
("policy","n",["政策","方針"],"company policy",1),
("portfolio","n",["投資組合","作品集"],"product portfolio",2),
("potential","n",["潛力","可能性"],"growth potential",1),
("practice","n",["慣例","做法"],"best practice",1),
("precede","v",["在...之前"],"precede a meeting",2),
("predict","v",["預測","預言"],"predict trends",1),
("preliminary","adj",["初步的","預備的"],"preliminary review",2),
("premise","n",["前提","場所"],"business premises",2),
("prepare","v",["準備","編製"],"prepare a report",1),
("prerequisite","n",["先決條件"],"job prerequisite",2),
("present","v",["呈現","報告"],"present findings",1),
("presentation","n",["簡報","報告"],"give a presentation",1),
("preserve","v",["保存","維持"],"preserve quality",1),
("preside","v",["主持","主管"],"preside over a meeting",2),
("prevail","v",["盛行","占上風"],"prevail in negotiations",2),
("prevent","v",["防止","預防"],"prevent errors",1),
("previous","adj",["先前的","以往的"],"previous experience",1),
("principal","adj",["主要的","首要的"],"principal concern",2),
("principle","n",["原則","準則"],"guiding principle",1),
("priority","n",["優先事項"],"top priority",1),
("prioritize","v",["排定優先順序"],"prioritize tasks",1),
("probation","n",["試用期"],"probation period",2),
("procedure","n",["程序","步驟"],"standard procedure",1),
("proceed","v",["進行","繼續"],"proceed with caution",1),
("process","n",["流程","過程"],"hiring process",1),
("productive","adj",["有生產力的"],"productive meeting",1),
("productivity","n",["生產力"],"increase productivity",1),
("profession","n",["專業","職業"],"legal profession",1),
("professional","adj",["專業的","職業的"],"professional development",1),
("proficiency","n",["精通","熟練"],"language proficiency",1),
("profit","n",["利潤","盈利"],"net profit",1),
("profitable","adj",["有利潤的"],"profitable business",1),
("program","n",["計畫","方案"],"training program",1),
("progress","n",["進展","進度"],"make progress",1),
("project","n",["計畫","專案"],"manage a project",1),
("projection","n",["預測","推算"],"sales projection",2),
("promote","v",["促進","升遷"],"promote growth",1),
("promotion","n",["升遷","促銷"],"earn a promotion",1),
("prompt","adj",["及時的","迅速的"],"prompt response",1),
("proposal","n",["提案","建議"],"submit a proposal",1),
("propose","v",["提議","建議"],"propose a change",1),
("prospect","n",["前景","潛在客戶"],"business prospect",1),
("prospective","adj",["未來的","潛在的"],"prospective client",2),
("prosper","v",["繁榮","興旺"],"prosper in business",2),
("protocol","n",["協議","規範"],"safety protocol",2),
("provision","n",["條款","規定"],"contract provision",2),
("pursuit","n",["追求","追尋"],"pursuit of excellence",2),
("qualify","v",["合格","使有資格"],"qualify for a role",1),
("quarter","n",["季度"],"fiscal quarter",1),
("quota","n",["配額","定額"],"sales quota",2),
("ratify","v",["批准","認可"],"ratify an agreement",3),
("reckon","v",["認為","估計"],"reckon costs",2),
("recognize","v",["認可","識別"],"recognize achievements",1),
("recommend","v",["推薦","建議"],"recommend a candidate",1),
("recommendation","n",["推薦","建議"],"strong recommendation",1),
("recruit","v",["招募","招聘"],"recruit talent",1),
("recruitment","n",["招募","招聘"],"recruitment process",1),
("reduce","v",["減少","降低"],"reduce costs",1),
("reduction","n",["減少","降低"],"cost reduction",1),
("reform","v",["改革","革新"],"reform policies",2),
("regard","v",["視為","看待"],"regard as essential",1),
("register","v",["登記","註冊"],"register for a course",1),
("regulate","v",["規範","管制"],"regulate the industry",2),
("regulation","n",["規定","法規"],"government regulation",1),
("reimburse","v",["報銷","償還"],"reimburse expenses",2),
("reinforce","v",["強化","加強"],"reinforce commitment",2),
("relevant","adj",["相關的","切題的"],"relevant experience",1),
("reluctant","adj",["不願意的","勉強的"],"reluctant to change",2),
("rely","v",["依賴","信賴"],"rely on data",1),
("remedy","n",["補救措施","解決方法"],"find a remedy",2),
("render","v",["提供","使成為"],"render services",2),
("renew","v",["更新","續約"],"renew a contract",1),
("reorganize","v",["重組","改組"],"reorganize the team",2),
("report","v",["報告","匯報"],"report findings",1),
("represent","v",["代表","表示"],"represent the company",1),
("representative","n",["代表"],"sales representative",1),
("reputable","adj",["有信譽的"],"reputable firm",2),
("request","v",["要求","請求"],"request information",1),
("require","v",["需要","要求"],"require approval",1),
("requirement","n",["要求","條件"],"job requirement",1),
("resign","v",["辭職","辭去"],"resign from a position",1),
("resignation","n",["辭職","辭呈"],"letter of resignation",1),
("resolve","v",["解決","決議"],"resolve an issue",1),
("resolution","n",["決議","解決"],"conflict resolution",1),
("resource","n",["資源"],"human resources",1),
("respond","v",["回應","回覆"],"respond to inquiries",1),
("response","n",["回應","回覆"],"prompt response",1),
("responsibility","n",["責任"],"take responsibility",1),
("responsible","adj",["負責的"],"responsible for",1),
("restore","v",["恢復","修復"],"restore confidence",2),
("restructure","v",["重組","重建"],"restructure the company",2),
("result","n",["結果","成果"],"deliver results",1),
("retain","v",["保留","留住"],"retain employees",1),
("retention","n",["保留","留任"],"employee retention",2),
("retire","v",["退休"],"retire early",1),
("retirement","n",["退休"],"retirement plan",1),
("retrieve","v",["取回","檢索"],"retrieve information",2),
("revenue","n",["收入","營收"],"annual revenue",1),
("review","v",["檢討","審查"],"review performance",1),
("revise","v",["修訂","修改"],"revise a plan",1),
("revision","n",["修訂","修改"],"policy revision",1),
("reward","n",["獎勵","報酬"],"employee reward",1),
("role","n",["角色","職務"],"leadership role",1),
("roster","n",["名冊","輪值表"],"staff roster",2),
("routine","n",["例行事務","慣例"],"daily routine",1),
("sanction","n",["制裁","批准"],"impose sanctions",2),
("scale","v",["擴展","調整"],"scale up operations",1),
("scenario","n",["情境","方案"],"best-case scenario",1),
("schedule","n",["時間表","排程"],"meeting schedule",1),
("scope","n",["範圍","範疇"],"project scope",1),
("scrutinize","v",["仔細檢查","審查"],"scrutinize details",2),
("sector","n",["部門","行業"],"private sector",1),
("secure","v",["確保","取得"],"secure funding",1),
("segment","n",["部分","區段"],"market segment",1),
("select","v",["選擇","挑選"],"select candidates",1),
("senior","adj",["資深的","高級的"],"senior manager",1),
("session","n",["會議","場次"],"training session",1),
("shift","n",["轉變","班次"],"paradigm shift",1),
("significant","adj",["重大的","顯著的"],"significant improvement",1),
("simplify","v",["簡化"],"simplify processes",1),
("simulate","v",["模擬"],"simulate a scenario",2),
("sole","adj",["唯一的","單獨的"],"sole proprietor",2),
("solicit","v",["徵求","請求"],"solicit feedback",2),
("solution","n",["解決方案"],"innovative solution",1),
("specify","v",["指定","明確說明"],"specify requirements",1),
("sponsor","v",["贊助","支持"],"sponsor an event",1),
("stability","n",["穩定性","穩定"],"financial stability",1),
("staff","n",["員工","工作人員"],"staff members",1),
("stakeholder","n",["利害關係人","股東"],"key stakeholder",1),
("standardize","v",["標準化"],"standardize procedures",2),
("status","n",["狀態","地位"],"project status",1),
("strategic","adj",["策略的","戰略的"],"strategic planning",1),
("strategy","n",["策略","戰略"],"business strategy",1),
("streamline","v",["簡化","精簡"],"streamline operations",2),
("strengthen","v",["加強","強化"],"strengthen relationships",1),
("structure","n",["結構","架構"],"organizational structure",1),
("submit","v",["提交","呈送"],"submit a report",1),
("subordinate","n",["下屬","部屬"],"direct subordinate",2),
("substantial","adj",["大量的","實質的"],"substantial growth",1),
("substitute","v",["替代","代替"],"substitute for",1),
("succeed","v",["成功","繼任"],"succeed in business",1),
("succession","n",["繼任","接替"],"succession planning",2),
("sufficient","adj",["足夠的","充分的"],"sufficient resources",1),
("summarize","v",["總結","概述"],"summarize findings",1),
("supervise","v",["監督","管理"],"supervise staff",1),
("supervisor","n",["主管","監督者"],"direct supervisor",1),
("supplement","v",["補充","增補"],"supplement income",2),
("surplus","n",["盈餘","剩餘"],"budget surplus",2),
("survey","n",["調查","問卷"],"conduct a survey",1),
("sustain","v",["維持","支撐"],"sustain growth",1),
("sustainable","adj",["可持續的","永續的"],"sustainable development",1),
("tackle","v",["處理","應對"],"tackle a problem",1),
("talent","n",["人才","才能"],"attract talent",1),
("target","n",["目標","對象"],"sales target",1),
("task","n",["任務","工作"],"assign a task",1),
("team","n",["團隊","小組"],"project team",1),
("tenure","n",["任期","聘用"],"long tenure",2),
("terminate","v",["終止","結束"],"terminate a contract",2),
("thorough","adj",["徹底的","周全的"],"thorough review",1),
("thrive","v",["興盛","蓬勃發展"],"thrive in competition",2),
("timeline","n",["時間線","時程"],"project timeline",1),
("track","v",["追蹤","記錄"],"track progress",1),
("trademark","n",["商標"],"registered trademark",2),
("transform","v",["轉變","改造"],"transform the business",1),
("transition","n",["轉型","過渡"],"smooth transition",1),
("transparent","adj",["透明的","公開的"],"transparent process",1),
("trend","n",["趨勢","潮流"],"market trend",1),
("turnover","n",["營業額","人員流動"],"high turnover",1),
("unanimous","adj",["一致的","無異議的"],"unanimous decision",2),
("undergo","v",["經歷","承受"],"undergo training",2),
("undertake","v",["承擔","從事"],"undertake a project",2),
("unveil","v",["揭示","公布"],"unveil a plan",2),
("update","v",["更新","報告"],"update stakeholders",1),
("upgrade","v",["升級","提升"],"upgrade systems",1),
("uphold","v",["維護","支持"],"uphold standards",2),
("utilize","v",["利用","使用"],"utilize resources",1),
("validate","v",["驗證","確認"],"validate data",2),
("value","n",["價值","價值觀"],"core values",1),
("venture","n",["創業","冒險"],"joint venture",2),
("verify","v",["驗證","核實"],"verify information",1),
("viable","adj",["可行的","可存活的"],"viable option",2),
("vision","n",["願景","遠見"],"company vision",1),
("vital","adj",["至關重要的"],"vital role",1),
("volume","n",["量","容量"],"sales volume",1),
("volunteer","v",["自願","志願"],"volunteer for a task",1),
("warrant","v",["保證","授權"],"warrant attention",2),
("welfare","n",["福利","福祉"],"employee welfare",1),
("wholesale","adj",["批發的"],"wholesale price",2),
("workforce","n",["勞動力","員工"],"skilled workforce",1),
("workshop","n",["工作坊","研討會"],"leadership workshop",1),
("yield","v",["產生","讓步"],"yield results",2),
],
}

# Merge extra word data
for extra in [WORDS_EXTRA_1, WORDS_EXTRA_2, WORDS_EXTRA_3, WORDS_EXPAND, WORDS_EXPAND_2, WORDS_EXPAND_3, WORD_FAMILIES, WORDS_GENERAL, WORDS_MEGA, WORDS_MEGA_2, DERIVED_WORDS]:
    for cat_id, words in extra.items():
        if cat_id in WORDS:
            WORDS[cat_id].extend(words)
        else:
            WORDS[cat_id] = list(words)

# Deduplicate words per category (keep first occurrence)
for cat_id in WORDS:
    seen = set()
    deduped = []
    for w in WORDS[cat_id]:
        if w[0] not in seen:
            seen.add(w[0])
            deduped.append(w)
    WORDS[cat_id] = deduped

# === Auto-derivation engine ===
# Use safe, common derivation rules
DERIVATION_RULES = [
    # Adjective -> Adverb (-ly) - very safe transformation
    {"from_pos": "adj", "to_pos": "adv", "rules": [
        (lambda w: w + "ly" if not w.endswith("ly") and not w.endswith("y") and not w.endswith("le") and len(w) > 4 else None, "...地"),
        (lambda w: w[:-1] + "ily" if w.endswith("y") and not w.endswith("ly") and not w.endswith("ey") and len(w) > 4 else None, "...地"),
        (lambda w: w[:-2] + "ly" if w.endswith("le") and len(w) > 5 else None, "...地"),
    ]},
    # Adjective -> Adverb (-ly) - safest transformation
    {"from_pos": "adj", "to_pos": "adv", "rules": [
        (lambda w: w + "ly" if not w.endswith("ly") and not w.endswith("y") and not w.endswith("le") and len(w) > 4 else None, "...地"),
        (lambda w: w[:-1] + "ily" if w.endswith("y") and not w.endswith("ly") and not w.endswith("ey") and len(w) > 4 else None, "...地"),
        (lambda w: w[:-2] + "ly" if w.endswith("le") and len(w) > 5 else None, "...地"),
    ]},
    # Removed risky derivations (-ing, -ment, -ness, -able, -ed) to avoid incorrect words 
    # like 'incuring', 'transformment', 'confidentness', etc.

]

# Global word tracker across all categories
all_existing = set()
for cat_id in WORDS:
    for w in WORDS[cat_id]:
        all_existing.add(w[0])

TARGET_TOTAL = 10500
current_total = len(all_existing)
max_derivations = max(0, TARGET_TOTAL - current_total)

derived_count = 0
for cat_id in sorted(WORDS.keys()):
    if derived_count >= max_derivations:
        break
    existing_in_cat = {w[0] for w in WORDS[cat_id]}
    cat_size = len(WORDS[cat_id])
    # Cap per category: derive at most 2x the existing size
    cat_max = min(cat_size * 2, max_derivations - derived_count)
    cat_derived = 0
    new_words = []
    for word_tuple in list(WORDS[cat_id]):
        if cat_derived >= cat_max:
            break
        word, pos = word_tuple[0], word_tuple[1]
        meanings = word_tuple[2]
        colloc = word_tuple[3]
        diff = word_tuple[4]
        for rule_set in DERIVATION_RULES:
            if cat_derived >= cat_max:
                break
            if rule_set["from_pos"] != pos:
                continue
            to_pos = rule_set["to_pos"]
            for rule_fn, zh_hint in rule_set["rules"]:
                if cat_derived >= cat_max:
                    break
                try:
                    derived = rule_fn(word)
                except:
                    continue
                if derived is None:
                    continue
                if len(derived) < 5 or len(derived) > 20:
                    continue
                if derived in existing_in_cat or derived in all_existing:
                    continue
                # Exclude awkward derivations
                if derived == "confidentness":
                    continue
                # Construct the derived word tuple
                base_meaning = meanings[0] if isinstance(meanings, list) else meanings
                new_meaning_str = zh_hint
                
                # Smart meaning transformation
                if rule_set["from_pos"] == "adj" and to_pos == "n" and derived.endswith("ness"):
                    if base_meaning.endswith("的"):
                        new_meaning_str = base_meaning[:-1]
                    else:
                        new_meaning_str = base_meaning + "性"
                elif rule_set["from_pos"] == "adj" and to_pos == "adv":
                    if base_meaning.endswith("的"):
                        new_meaning_str = base_meaning[:-1] + "地"
                    else:
                        new_meaning_str = base_meaning + "地"
                elif rule_set["from_pos"] == "v" and to_pos == "n":
                    if derived.endswith("er") or derived.endswith("r"):
                        new_meaning_str = base_meaning + "者"
                    elif derived.endswith("ment"):
                        new_meaning_str = base_meaning 
                elif rule_set["from_pos"] == "v" and to_pos == "adj":
                    if not base_meaning.endswith("的"):
                        new_meaning_str = base_meaning + "的"
                    else:
                         new_meaning_str = base_meaning
                
                new_meaning = [new_meaning_str]
                new_colloc = f"{derived} effectively" if to_pos == "adv" else f"{derived}"
                new_tuple = (derived, to_pos, new_meaning, new_colloc, min(diff + 1, 3))
                new_words.append(new_tuple)
                existing_in_cat.add(derived)
                all_existing.add(derived)
                derived_count += 1
                cat_derived += 1
    WORDS[cat_id].extend(new_words)

# Re-deduplicate after derivation
for cat_id in WORDS:
    seen = set()
    deduped = []
    for w in WORDS[cat_id]:
        if w[0] not in seen:
            seen.add(w[0])
            deduped.append(w)
    WORDS[cat_id] = deduped

print(f"Auto-derived {derived_count} additional word forms")

# Sentence templates per POS
TEMPLATES = {
    "v": [
        "The company decided to {word} in order to improve overall performance.",
        "Management plans to {word} before the end of the fiscal year.",
        "It is important to {word} when dealing with complex business situations.",
        "The director asked the team to {word} as part of the new initiative.",
        "In today's competitive market, companies must {word} to stay ahead.",
        "The board voted to {word} the proposed changes immediately.",
        "Employees are expected to {word} according to company guidelines.",
        "The CEO emphasized the need to {word} during the quarterly meeting.",
    ],
    "n": [
        "The {word} was discussed thoroughly during the board meeting.",
        "Effective {word} is essential for any successful organization.",
        "The company's {word} has improved significantly this quarter.",
        "A detailed {word} was submitted to the management team.",
        "The {word} will be reviewed by the committee next week.",
        "Good {word} can lead to higher employee satisfaction.",
        "The annual {word} showed promising results for the company.",
        "Proper {word} is a key factor in business success.",
    ],
    "adj": [
        "The {word} approach helped the company achieve its goals.",
        "A {word} strategy is necessary for long-term success.",
        "The manager praised the team for their {word} performance.",
        "The {word} results exceeded everyone's expectations.",
        "It is {word} to maintain high standards in the workplace.",
        "The company adopted a more {word} policy this year.",
        "The {word} solution resolved the issue quickly and efficiently.",
        "Investors were pleased with the {word} outcome of the project.",
    ],
    "adv": [
        "The project was {word} completed ahead of schedule.",
        "The team worked {word} to meet the tight deadline.",
        "Sales have {word} increased over the past quarter.",
        "The policy was {word} enforced across all departments.",
    ],
}

# Second set of sentence templates for generating two sentences per word
TEMPLATES_2 = {
    "v": [
        "The department needs to {word} the new policy before the deadline.",
        "We should {word} every opportunity to expand our market share.",
        "The supervisor asked the staff to {word} the updated procedures.",
        "It would be beneficial to {word} this matter with the client directly.",
        "The organization plans to {word} several key objectives this quarter.",
        "Senior management decided to {word} a new approach to the problem.",
        "All departments are required to {word} in accordance with regulations.",
        "The consultant recommended that we {word} our current strategy.",
    ],
    "n": [
        "The {word} played a crucial role in the company's recent success.",
        "A comprehensive {word} was presented at the annual shareholders meeting.",
        "The importance of {word} cannot be overstated in modern business.",
        "The team prepared a detailed {word} for the upcoming presentation.",
        "Understanding {word} is essential for career advancement.",
        "The recent {word} has had a significant impact on our operations.",
        "Effective {word} requires careful planning and consistent execution.",
        "The committee reviewed the {word} and approved it unanimously.",
    ],
    "adj": [
        "The {word} decision led to a significant increase in revenue.",
        "Maintaining a {word} attitude is important for professional growth.",
        "The report highlighted several {word} factors affecting productivity.",
        "A {word} perspective can help resolve complex workplace issues.",
        "The survey revealed that employees prefer a {word} work environment.",
        "The {word} proposal received strong support from all stakeholders.",
        "Developing a {word} mindset is crucial for effective leadership.",
        "The company's {word} reputation attracted top talent from around the world.",
    ],
    "adv": [
        "The new system was {word} implemented across all departments.",
        "Revenue has {word} grown since the restructuring took effect.",
        "The guidelines were {word} followed by all team members.",
        "Customer feedback was {word} positive regarding the new service.",
    ],
}

# Question templates
Q_TEMPLATES_CLOZE = [
    "The company decided to ____ {context}.",
    "It is important for the team to ____ {context}.",
    "The manager wants to ____ {context}.",
    "All employees should ____ {context}.",
]

def gen_id(prefix, word, idx):
    h = hashlib.md5(f"{prefix}-{word}-{idx}".encode()).hexdigest()[:6]
    return f"{prefix}-{h}"

def generate_sentence(word_entry, idx):
    word, pos = word_entry[0], word_entry[1]
    meanings = word_entry[2]
    collocation = word_entry[3]
    
    templates = TEMPLATES.get(pos, TEMPLATES["n"])
    template = templates[idx % len(templates)]
    sentence_en = template.format(word=word)
    
    # Chinese translations for TEMPLATES
    zh_templates = {
        "v": [
            "公司決定{word}以提升整體績效。",
            "管理層計劃在本財年結束前{word}。",
            "在處理複雜的商業情況時，{word}是很重要的。",
            "主管要求團隊{word}作為新計畫的一部分。",
            "在當今競爭激烈的市場中，公司必須{word}才能保持領先。",
            "董事會投票決定立即{word}提議的變更。",
            "員工應按照公司準則{word}。",
            "執行長在季度會議上強調需要{word}。",
        ],
        "n": [
            "在董事會會議上徹底討論了{word}。",
            "有效的{word}對任何成功的組織都至關重要。",
            "公司的{word}在本季度有顯著改善。",
            "向管理團隊提交了詳細的{word}。",
            "{word}將在下週由委員會審查。",
            "良好的{word}可以提高員工滿意度。",
            "年度{word}顯示公司前景看好。",
            "適當的{word}是商業成功的關鍵因素。",
        ],
        "adj": [
            "{word}的方法幫助公司實現了目標。",
            "{word}的策略對長期成功是必要的。",
            "經理稱讚團隊{word}的表現。",
            "{word}的結果超出了所有人的預期。",
            "在工作場所保持高標準是{word}的。",
            "公司今年採用了更{word}的政策。",
            "{word}的解決方案快速有效地解決了問題。",
            "投資者對專案{word}的結果感到滿意。",
        ],
        "adv": [
            "專案{word}提前完成。",
            "團隊{word}工作以滿足緊迫的期限。",
            "銷售額在過去一季{word}增長。",
            "該政策在所有部門{word}執行。",
        ],
    }
    
    zh_template_list = zh_templates.get(pos, zh_templates["n"])
    meaning_str = meanings[0] if isinstance(meanings, list) else meanings
    sentence_zh = zh_template_list[idx % len(zh_template_list)].format(word=meaning_str)
    
    return {
        "id": gen_id("s", word, idx),
        "vocab_id": gen_id("v", word, 0),
        "level": ["easy", "medium", "hard"][word_entry[4] - 1] if word_entry[4] <= 3 else "easy",
        "sentence_en": sentence_en,
        "sentence_zh": sentence_zh,
        "collocations": [collocation],
    }

def generate_sentence_2(word_entry, idx):
    word, pos = word_entry[0], word_entry[1]
    meanings = word_entry[2]
    collocation = ""
    
    templates = TEMPLATES_2.get(pos, TEMPLATES_2["n"])
    template = templates[idx % len(templates)]
    sentence_en = template.format(word=word)
    
    # Chinese translations for TEMPLATES_2
    zh_templates_2 = {
        "v": [
            "部門需要在截止日期前{word}新政策。",
            "我們應該{word}每個機會來擴大市場份額。",
            "主管要求員工{word}更新的程序。",
            "直接與客戶{word}這件事會很有幫助。",
            "組織計劃本季度{word}幾個關鍵目標。",
            "高層管理決定{word}新方法來解決問題。",
            "所有部門都必須按照規定{word}。",
            "顧問建議我們{word}目前的策略。",
        ],
        "n": [
            "{word}在公司最近的成功中發揮了關鍵作用。",
            "在年度股東大會上提出了全面的{word}。",
            "{word}在現代商業中的重要性不容小覷。",
            "團隊為即將到來的簡報準備了詳細的{word}。",
            "理解{word}對職業發展至關重要。",
            "最近的{word}對我們的營運產生了重大影響。",
            "有效的{word}需要仔細規劃和持續執行。",
            "委員會審查了{word}並一致通過。",
        ],
        "adj": [
            "{word}的決定導致收入大幅增加。",
            "保持{word}的態度對專業成長很重要。",
            "報告強調了影響生產力的幾個{word}因素。",
            "{word}的觀點可以幫助解決複雜的職場問題。",
            "調查顯示員工更喜歡{word}的工作環境。",
            "{word}的提案獲得了所有利益相關者的大力支持。",
            "培養{word}的心態對有效領導至關重要。",
            "公司{word}的聲譽吸引了來自世界各地的頂尖人才。",
        ],
        "adv": [
            "新系統在所有部門{word}實施。",
            "自重組生效以來，收入{word}增長。",
            "所有團隊成員{word}遵守了準則。",
            "客戶對新服務的反饋{word}是正面的。",
        ],
    }
    
    zh_template_list = zh_templates_2.get(pos, zh_templates_2["n"])
    meaning_str = meanings[0] if isinstance(meanings, list) else meanings
    sentence_zh = zh_template_list[idx % len(zh_template_list)].format(word=meaning_str)
    
    return {
        "id": gen_id("s2", word, idx),
        "vocab_id": gen_id("v", word, 0),
        "level": ["easy", "medium", "hard"][word_entry[4] - 1] if word_entry[4] <= 3 else "easy",
        "sentence_en": sentence_en,
        "sentence_zh": sentence_zh,
        "collocations": [],
    }

def generate_question(word_entry, all_words_in_cat, idx):
    word, pos = word_entry[0], word_entry[1]
    meanings = word_entry[2]
    collocation = word_entry[3]
    
    # Get distractors (same POS)
    same_pos = [w for w in all_words_in_cat if w[1] == pos and w[0] != word]
    if len(same_pos) < 3:
        same_pos = [w for w in all_words_in_cat if w[0] != word]
    
    distractors = random.sample(same_pos, min(3, len(same_pos)))
    
    choices = [word] + [d[0] for d in distractors]
    random.shuffle(choices)
    answer_index = choices.index(word)
    
    meaning_str = "、".join(meanings)
    first_meaning = meanings[0] if isinstance(meanings, list) else meanings
    
    
    # Use sentence templates for cloze questions
    templates = TEMPLATES.get(pos, TEMPLATES["n"])
    zh_templates = {
        "v": [
            "公司決定{word}以提升整體績效。",
            "管理層計劃在本財年結束前{word}。",
            "在處理複雜的商業情況時，{word}是很重要的。",
            "主管要求團隊{word}作為新計畫的一部分。",
            "在當今競爭激烈的市場中，公司必須{word}才能保持領先。",
            "董事會投票決定立即{word}提議的變更。",
            "員工應按照公司準則{word}。",
            "執行長在季度會議上強調需要{word}。",
        ],
        "n": [
            "在董事會會議上徹底討論了{word}。",
            "有效的{word}對任何成功的組織都至關重要。",
            "公司的{word}在本季度有顯著改善。",
            "向管理團隊提交了詳細的{word}。",
            "{word}將在下週由委員會審查。",
            "良好的{word}可以提高員工滿意度。",
            "年度{word}顯示公司前景看好。",
            "適當的{word}是商業成功的關鍵因素。",
        ],
        "adj": [
            "{word}的方法幫助公司實現了目標。",
            "{word}的策略對長期成功是必要的。",
            "經理稱讚團隊{word}的表現。",
            "{word}的結果超出了所有人的預期。",
            "在工作場所保持高標準是{word}的。",
            "公司今年採用了更{word}的政策。",
            "{word}的解決方案快速有效地解決了問題。",
            "投資者對專案{word}的結果感到滿意。",
        ],
        "adv": [
            "專案{word}提前完成。",
            "團隊{word}工作以滿足緊迫的期限。",
            "銷售額在過去一季{word}增長。",
            "該政策在所有部門{word}執行。",
        ],
    }
    
    # Select template based on index
    template_idx = idx % len(templates)
    sentence_template = templates[template_idx]
    zh_template_list = zh_templates.get(pos, zh_templates["n"])
    zh_sentence = zh_template_list[template_idx % len(zh_template_list)].format(word=first_meaning)
    
    # Create cloze question by replacing word with blank
    full_sentence = sentence_template.format(word=word)
    cloze_sentence = sentence_template.format(word="____")
    
    # Detailed Explanation Generation
    pos_explanations = {
        "v": "此處需要填入動詞，以完成句子的動作描述。",
        "n": "此處需要名詞，通常作為句子的主詞或受詞。",
        "adj": "此處需要形容詞，用來修飾後面的名詞或作為補語。",
        "adv": "此處需要副詞，用來修飾動詞、形容詞或整句。",
    }
    grammar_hint = pos_explanations.get(pos, "請選擇最適合上下文的單字。")

    # Collect meanings for all choices to generate detailed analysis
    choice_details = {}
    # Correct answer
    choice_details[word] = meaning_str
    # Distractors
    for d in distractors:
        d_meanings = d[2]
        d_meaning_str = "、".join(d_meanings) if isinstance(d_meanings, list) else d_meanings
        choice_details[d[0]] = d_meaning_str
        
    choices_analysis = []
    for choice in choices:
        is_correct = (choice == word)
        meanings = choice_details.get(choice, "")
        marker = "✅" if is_correct else "❌"
        choices_analysis.append(f"{marker} {choice} ({pos}): {meanings}")
    
    choices_str = "\n".join(choices_analysis)

    # Rich Explanation with word meaning, full sentence, Chinese translation, and detailed analysis
    explanation = (
        f"正確答案：{word}\n"
        f"意思：{meaning_str}\n\n"
        f"【題目解析】\n"
        f"完整句子：{full_sentence}\n"
        f"中文翻譯：{zh_sentence}\n"
        f"💡 語法提示：{grammar_hint}\n\n"
        f"【選項分析】\n"
        f"{choices_str}"
    )
    
    return {
        "id": gen_id("q", word, idx),
        "vocab_id": gen_id("v", word, 0),
        "type": "cloze",
        "prompt_en": cloze_sentence,
        "full_sentence": full_sentence,
        "prompt_zh": zh_sentence,
        "choices": choices,
        "answer_index": answer_index,
        "explanation_zh": explanation,
        "level": ["easy", "medium", "hard"][word_entry[4] - 1] if word_entry[4] <= 3 else "easy",
        "word": word,
        "meaning": meaning_str,
    }

def main():
    output_dir = os.path.join(os.path.dirname(__file__), "..", "public", "data")
    os.makedirs(output_dir, exist_ok=True)
    
    all_categories = []
    all_vocab = []
    all_sentences = []
    all_questions = []
    
    for cat_id, cat_name, subgroups in CATEGORIES:
        all_categories.append({
            "id": cat_id,
            "title_zh": cat_name,
            "subgroups": [{"id": sg, "title_zh": sg} for sg in subgroups],
        })
        
        words = WORDS.get(cat_id, [])
        for i, w in enumerate(words):
            phonetic = get_kk_phonetic(w[0])
            vocab_item = {
                "id": gen_id("v", w[0], 0),
                "word": w[0],
                "pos": w[1],
                "meaning_zh": w[2],
                "phonetic": phonetic,
                "category_id": cat_id,
                "subgroup_id": subgroups[i % len(subgroups)] if subgroups else "general",
                "notes_zh": f"多益常見搭配：{w[3]}",
                "tags": ["toeic", cat_name],
            }
            all_vocab.append(vocab_item)
            
            # Generate 2 sentences per word
            sent1 = generate_sentence(w, i)
            all_sentences.append(sent1)
            sent2 = generate_sentence_2(w, i)
            all_sentences.append(sent2)
            
            # Generate 2 questions per word
            for qi in range(2):
                q = generate_question(w, words, qi)
                all_questions.append(q)
    
    output = {
        "categories": all_categories,
        "vocab_items": all_vocab,
        "sentences": all_sentences,
        "questions": all_questions,
    }
    
    outpath = os.path.join(output_dir, "toeic_part1.json")
    with open(outpath, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    
    print(f"Generated {len(all_vocab)} vocab items")
    print(f"Generated {len(all_sentences)} sentences")
    print(f"Generated {len(all_questions)} questions")
    print(f"Output: {outpath}")

if __name__ == "__main__":
    main()
