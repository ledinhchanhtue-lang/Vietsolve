"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Lang = "vi" | "en"
/** @deprecated use `Lang` */
export type Language = Lang

/* ================================================================
 *  DICTIONARY
 *  `vi` defines the shape; `en` is type-forced to match it exactly,
 *  so a missing translation is a build-time error, not a silent gap.
 * ================================================================ */

const vi = {
  nav: {
    capabilities: "Năng lực",
    aiSystems: "Hệ thống AI",
    work: "Dự án",
    about: "Về VietSolve",
    insights: "Góc nhìn",
    cta: "Trao đổi dự án",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    skipToContent: "Chuyển tới nội dung chính",
  },

  hero: {
    eyebrow: "AI-POWERED GROWTH AGENCY",
    titleLine1: "AI không chỉ để thử.",
    titleLine2: "AI phải",
    titleAccent: "tạo ra tăng trưởng",
    subheadline:
      "VietSolve thiết kế hệ thống AI, automation và trải nghiệm số giúp doanh nghiệp Việt bán hàng nhanh hơn, vận hành tinh gọn hơn và tăng trưởng có thể đo lường.",
    ctaPrimary: "Nhận AI Growth Audit",
    ctaSecondary: "Xem hệ thống thực tế",
    trustLine: "Strategy · Creative · AI Systems",
    systemLabel: "Hệ thống đang chạy",
  },

  /**
   * Hero system canvas — four headline states.
   * The finer steps live in each node's tooltip, not as a long visible list.
   */
  system: {
    node1: "Lead mới",
    node1Detail: "Khách nhắn tin qua website hoặc mạng xã hội",
    node2: "AI phân tích",
    node2Detail: "Xác định nhu cầu, phân loại yêu cầu và trích xuất thông tin",
    node3: "CRM & workflow xử lý",
    node3Detail: "Tạo hồ sơ, đồng bộ dữ liệu và chạy các bước tự động",
    node4: "Sale nhận kết quả",
    node4Detail: "Nhân sự tiếp nhận đúng lúc, với đầy đủ ngữ cảnh",
  },

  collaborations: {
    eyebrow: "SELECTED COLLABORATIONS",
    heading: "Đồng hành cùng những doanh nghiệp đang muốn thay đổi.",
    note: "Một số dự án tiêu biểu VietSolve đã thực hiện.",
  },

  os: {
    eyebrow: "HOW WE BUILD",
    heading: "Từ bài toán kinh doanh đến một hệ thống có thể vận hành.",
    deliverables: "Kết quả bàn giao",
  },

  capabilities: {
    eyebrow: "WHAT WE BUILD",
    heading: "Chiến lược, sáng tạo và công nghệ trong cùng một hệ thống.",
    includes: "Bao gồm",
    discuss: "Trao đổi về năng lực này",
    /** Condensed replacement for the old standalone "The real problem" section */
    intro:
      "Doanh nghiệp không thiếu công cụ. Vấn đề là marketing, sale, dữ liệu và vận hành vẫn đang hoạt động rời rạc.",
    gap1: "Lead xử lý chậm",
    gap2: "Dữ liệu không kết nối",
    gap3: "Quy trình còn thủ công",
    explore: "Xem chi tiết năng lực",
    viewAll: "Xem tất cả năng lực",
  },

  workflow: {
    eyebrow: "LIVE SYSTEM DEMO",
    heading: "Xem một workflow AI hoạt động như thế nào.",
    description:
      "Một yêu cầu của khách hàng có thể đi từ tin nhắn đến dữ liệu, hành động và kết quả mà không cần xử lý thủ công ở từng bước.",
    tabRetail: "Bán lẻ",
    tabService: "Dịch vụ",
    tabB2B: "B2B",
    run: "Chạy workflow",
    replay: "Chạy lại",
    running: "Đang xử lý",
    done: "Hoàn tất",
    idle: "Sẵn sàng",
    logTitle: "Nhật ký hệ thống",
    outputTitle: "Kết quả",
    demoNote: "Đây là mô phỏng giao diện minh họa luồng xử lý.",
    retail: {
      s1: "Khách gửi hình ảnh sản phẩm",
      s2: "AI nhận diện nhu cầu",
      s3: "Kiểm tra thông tin sản phẩm",
      s4: "Đề xuất lựa chọn phù hợp",
      s5: "Tạo đơn hàng",
      s6: "Cập nhật CRM",
      s7: "Gửi thông báo cho nhân viên",
      output: "Đơn hàng đã được tạo và chuyển cho nhân viên phụ trách.",
    },
    service: {
      s1: "Khách mô tả vấn đề",
      s2: "AI phân loại yêu cầu",
      s3: "Thu thập thông tin còn thiếu",
      s4: "Đặt lịch",
      s5: "Tạo hồ sơ khách hàng",
      s6: "Nhắc lịch",
      s7: "Tổng hợp báo cáo",
      output: "Lịch hẹn đã được xác nhận và hồ sơ khách hàng được lưu.",
    },
    b2b: {
      s1: "Doanh nghiệp gửi yêu cầu",
      s2: "AI đọc tài liệu",
      s3: "Phân tích nhu cầu",
      s4: "Tạo bản tóm tắt",
      s5: "Đề xuất giải pháp",
      s6: "Chuyển cho business development",
      s7: "Theo dõi trạng thái",
      output: "Bản tóm tắt và đề xuất đã sẵn sàng cho đội ngũ phụ trách.",
    },
  },

  work: {
    eyebrow: "SELECTED WORK",
    heading: "Giải pháp được thiết kế cho từng bài toán cụ thể.",
    subheading:
      "Những dự án nơi chiến lược, sáng tạo và công nghệ được kết nối để giải quyết một bài toán cụ thể.",
    viewProject: "Xem dự án",
    viewAll: "Xem tất cả dự án",
    delivered: "Đã triển khai",
    industry: "Lĩnh vực",
    year: "Năm",
    filterAll: "Tất cả",
    filterAiSystems: "AI Systems",
    filterDigitalProducts: "Digital Products",
    filterBrandGrowth: "Brand & Growth",
    filterMedia: "Media",
  },

  why: {
    eyebrow: "WHY VIETSOLVE",
    heading: "Không chỉ đưa ra ý tưởng. Chúng tôi xây hệ thống để ý tưởng hoạt động.",
    p1Title: "Business-first",
    p1Body: "Mọi giải pháp bắt đầu từ bài toán kinh doanh, không bắt đầu từ công cụ.",
    p2Title: "Strategy and execution",
    p2Body: "Chiến lược, sáng tạo, phát triển và tích hợp được thực hiện trong cùng một hệ thống.",
    p3Title: "AI with purpose",
    p3Body: "Chỉ ứng dụng AI khi nó giúp tăng tốc, giảm chi phí hoặc tạo ra trải nghiệm tốt hơn.",
    p4Title: "Built for Vietnamese businesses",
    p4Body:
      "Giải pháp được thiết kế dựa trên nguồn lực, hành vi khách hàng và điều kiện vận hành của doanh nghiệp Việt.",
  },

  insights: {
    eyebrow: "INSIGHTS",
    heading: "Góc nhìn về AI, tăng trưởng và sáng tạo.",
    pageHeading: "Ý tưởng, hệ thống và góc nhìn giúp doanh nghiệp ứng dụng AI hiệu quả hơn.",
    readMore: "Đọc tiếp",
    readingTime: "phút đọc",
    catAiSystems: "AI Systems",
    catGrowth: "Growth",
    catCreativeTechnology: "Creative Technology",
    catFoundersView: "Founder's View",
  },

  finalCta: {
    eyebrow: "START A PROJECT",
    heading: "Có một bài toán đáng để giải quyết?",
    body: "Hãy cùng VietSolve biến bài toán đó thành một hệ thống có thể vận hành, đo lường và tiếp tục phát triển.",
    primary: "Trao đổi với VietSolve",
    secondary: "Gửi brief dự án",
  },

  footer: {
    tagline: "AI-powered Growth Agency cho doanh nghiệp Việt Nam.",
    capabilities: "Năng lực",
    company: "Công ty",
    connect: "Kết nối",
    contactCta: "Trao đổi dự án",
    copyright: "Bảo lưu mọi quyền.",
    privacy: "Chính sách bảo mật",
    terms: "Điều khoản sử dụng",
  },

  /* ---------------- Pages ---------------- */

  servicesPage: {
    eyebrow: "CAPABILITIES",
    heading: "Đội ngũ sáng tạo, chiến lược và công nghệ trong cùng một hệ thống.",
    description:
      "VietSolve giúp doanh nghiệp từ xác định bài toán, xây thương hiệu, phát triển nền tảng số đến triển khai AI và automation.",
    overviewTitle: "Bốn năng lực cốt lõi",
    engagementEyebrow: "ENGAGEMENT MODELS",
    engagementHeading: "Cách chúng ta có thể làm việc cùng nhau.",
    engagementNote: "Phạm vi và chi phí được xác định sau khi hiểu rõ bài toán của doanh nghiệp.",
    bestFor: "Phù hợp với",
    typicalScope: "Phạm vi điển hình",
    engagementCta: "Trao đổi phạm vi",
    processEyebrow: "PROCESS",
    processHeading: "Quy trình năm bước từ bài toán đến hệ thống vận hành.",
    projectEyebrow: "SELECTED PROJECT",
  },

  aiSystemsPage: {
    eyebrow: "AI SYSTEMS",
    heading: "AI được kết nối với quy trình mới tạo ra giá trị.",
    description:
      "VietSolve thiết kế AI Agent và automation dựa trên hoạt động thực tế của doanh nghiệp — từ bán hàng, chăm sóc khách hàng đến vận hành và báo cáo.",
    s1Title: "AI Agent",
    s1Body:
      "Agent được thiết kế theo vai trò cụ thể: tư vấn bán hàng, chăm sóc khách hàng, xử lý yêu cầu nội bộ. Mỗi agent hiểu ngữ cảnh doanh nghiệp và giọng thương hiệu.",
    s2Title: "Workflow Automation",
    s2Body:
      "Tự động hóa các chuỗi tác vụ lặp lại giữa marketing, sale và vận hành — từ tiếp nhận yêu cầu đến cập nhật trạng thái và báo cáo.",
    s3Title: "CRM & Data Integration",
    s3Body:
      "Kết nối dữ liệu khách hàng giữa website, kênh bán, CRM và công cụ phân tích để mọi bộ phận làm việc trên cùng một nguồn dữ liệu.",
    s4Title: "AI Website",
    s4Body:
      "Website có khả năng cá nhân hóa nội dung, tư vấn tự động và chuyển dữ liệu trực tiếp vào quy trình kinh doanh.",
    useCasesTitle: "Ứng dụng thực tế",
    useCase1: "Phản hồi khách hàng ngoài giờ làm việc",
    useCase2: "Phân loại và định tuyến yêu cầu đến đúng bộ phận",
    useCase3: "Tạo báo giá và tài liệu từ dữ liệu có sẵn",
    useCase4: "Đồng bộ đơn hàng giữa kênh bán và hệ thống vận hành",
    useCase5: "Tổng hợp báo cáo định kỳ tự động",
    useCase6: "Hỗ trợ đội ngũ tra cứu thông tin nội bộ",
    controlTitle: "Con người vẫn giữ quyền kiểm soát",
    controlBody:
      "AI được triển khai với giới hạn rõ ràng. Hệ thống hỗ trợ đội ngũ, không thay thế quyết định của con người.",
    control1: "AI chỉ được cấp quyền trong phạm vi công việc cụ thể",
    control2: "Các bước quan trọng có bước phê duyệt của con người",
    control3: "Mọi hoạt động đều được ghi log và có thể truy vết",
    control4: "Workflow có thể được chỉnh sửa khi quy trình thay đổi",
    processTitle: "Quá trình triển khai",
  },

  aboutPage: {
    eyebrow: "ABOUT VIETSOLVE",
    heading: "Giải bài toán doanh nghiệp bằng sáng tạo, trí tuệ và đổi mới.",
    description:
      "VietSolve được xây dựng với niềm tin rằng công nghệ chỉ có giá trị khi nó giúp doanh nghiệp vận hành tốt hơn, thương hiệu mạnh hơn và con người làm việc hiệu quả hơn.",
    storyEyebrow: "OUR STORY",
    storyHeading: "Một agency được xây dựng cho giai đoạn tiếp theo.",
    storyBody:
      "VietSolve là agency sáng tạo và công nghệ được xây dựng để đồng hành cùng doanh nghiệp Việt trong quá trình phát triển thương hiệu, sản phẩm và hệ thống tăng trưởng.",
    lacEyebrow: "OUR SYMBOL",
    lacHeading: "Một biểu tượng Việt Nam trong kỷ nguyên số.",
    lacBody:
      "Chim Lạc đại diện cho tinh thần sáng tạo, khát vọng tiến về phía trước và bản sắc Việt Nam. Tại VietSolve, biểu tượng này được chuyển hóa thành những luồng kết nối giữa chiến lược, con người, dữ liệu và công nghệ.",
    valuesEyebrow: "OUR VALUES",
    valuesHeading: "Sáng tạo · Trí tuệ · Đổi mới",
    v1Title: "Sáng tạo",
    v1En: "Creative",
    v1Body: "Biến chiến lược thành thương hiệu, nội dung và trải nghiệm khác biệt.",
    v2Title: "Trí tuệ",
    v2En: "Intelligence",
    v2Body: "Kết hợp dữ liệu, insight, tư duy chiến lược và AI để đưa ra quyết định tốt hơn.",
    v3Title: "Đổi mới",
    v3En: "Innovation",
    v3Body: "Xây dựng website, digital product, AI Agent và automation tạo ra hiệu quả thật.",
    howEyebrow: "HOW WE WORK",
    howHeading: "Một quy trình, năm bước, kết quả có thể vận hành.",
  },

  contactPage: {
    eyebrow: "START A PROJECT",
    heading: "Cho chúng tôi biết bạn đang muốn xây dựng điều gì.",
    description:
      "Mô tả bài toán, mục tiêu hoặc ý tưởng của bạn. VietSolve sẽ liên hệ để cùng xác định hướng triển khai phù hợp.",
    emailLabel: "Email",
    phoneLabel: "Hotline",
    addressLabel: "Địa chỉ",
    formTitle: "Thông tin dự án",
    fName: "Họ và tên",
    fEmail: "Email",
    fPhone: "Số điện thoại",
    fCompany: "Doanh nghiệp",
    fProblem: "Bạn đang muốn giải quyết vấn đề gì?",
    fSolution: "Loại giải pháp quan tâm",
    fTimeline: "Thời gian dự kiến",
    fBudget: "Ngân sách dự kiến",
    fDetails: "Nội dung chi tiết",
    fConsent: "Tôi đồng ý để VietSolve liên hệ về yêu cầu này.",
    optional: "không bắt buộc",
    select: "Chọn một lựa chọn",
    submit: "Gửi yêu cầu",
    submitting: "Đang gửi...",
    successTitle: "Đã nhận được yêu cầu của bạn.",
    successBody: "VietSolve sẽ liên hệ lại qua email bạn đã cung cấp.",
    errorRequired: "Vui lòng điền thông tin này.",
    errorEmail: "Email chưa đúng định dạng.",
    errorConsent: "Vui lòng đồng ý để chúng tôi liên hệ với bạn.",
    errorSubmit: "Chưa gửi được. Bạn có thể gửi email trực tiếp cho chúng tôi.",
    solAiAgent: "AI Agent & Automation",
    solWebsite: "Website & Digital Product",
    solBranding: "Branding & Growth",
    solMedia: "Media & Creative",
    solUndecided: "Chưa xác định",
    timeAsap: "Càng sớm càng tốt",
    time1to3: "Trong 1–3 tháng",
    time3to6: "Trong 3–6 tháng",
    timePlanning: "Đang lên kế hoạch",
    budgetU50: "Dưới 50 triệu",
    budget50to100: "50 – 100 triệu",
    budget100to300: "100 – 300 triệu",
    budgetO300: "Trên 300 triệu",
    budgetAdvise: "Cần VietSolve đề xuất",
  },

  readiness: {
    eyebrow: "AI READINESS",
    heading: "Doanh nghiệp của bạn đã sẵn sàng ứng dụng AI đến đâu?",
    description:
      "Năm câu hỏi ngắn để xác định điểm bắt đầu phù hợp. Không thu thập thông tin cá nhân.",
    q1: "Doanh nghiệp đang sử dụng CRM chưa?",
    q2: "Dữ liệu khách hàng có được tập trung ở một nơi không?",
    q3: "Có tác vụ nào đang lặp lại mỗi ngày không?",
    q4: "Sale có phản hồi khách hàng trong thời gian đo lường được không?",
    q5: "Doanh nghiệp đã có người phụ trách hệ thống chưa?",
    yes: "Có",
    no: "Chưa",
    result: "Kết quả",
    restart: "Làm lại",
    exploringTitle: "Exploring",
    exploringBody:
      "Doanh nghiệp đang ở giai đoạn đầu. Bước phù hợp là xác định bài toán và chuẩn hóa dữ liệu trước khi triển khai AI.",
    readyTitle: "Ready",
    readyBody:
      "Nền tảng đã đủ để bắt đầu. Bước phù hợp là chọn một quy trình cụ thể để tự động hóa và đo lường kết quả.",
    scalableTitle: "Scalable",
    scalableBody:
      "Doanh nghiệp đã có nền tảng tốt. Bước phù hợp là mở rộng AI sang nhiều quy trình và tích hợp sâu vào hệ thống hiện có.",
    discuss: "Trao đổi về kết quả này",
    start: "Bắt đầu đánh giá",
    hide: "Thu gọn",
  },

  common: {
    loading: "Đang tải",
    close: "Đóng",
    back: "Quay lại",
    next: "Tiếp theo",
  },
}

/**
 * Shape of the dictionary, derived from `vi`.
 * Note: no `as const` above — we want widened `string` types here so `en` can
 * supply different text while still being checked for a matching key structure.
 */
export type Translations = typeof vi

const en: Translations = {
  nav: {
    capabilities: "Capabilities",
    aiSystems: "AI Systems",
    work: "Work",
    about: "About",
    insights: "Insights",
    cta: "Start a project",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skipToContent: "Skip to main content",
  },

  hero: {
    eyebrow: "AI-POWERED GROWTH AGENCY",
    titleLine1: "AI isn't for experimenting.",
    titleLine2: "AI has to",
    titleAccent: "create growth",
    subheadline:
      "VietSolve designs AI systems, automation and digital experiences that help Vietnamese businesses sell faster, operate leaner and grow measurably.",
    ctaPrimary: "Get an AI Growth Audit",
    ctaSecondary: "See a real system",
    trustLine: "Strategy · Creative · AI Systems",
    systemLabel: "System running",
  },

  system: {
    node1: "New lead",
    node1Detail: "A customer messages through the website or social channels",
    node2: "AI analyses",
    node2Detail: "Identifies the need, classifies the request and extracts the details",
    node3: "CRM & workflow run",
    node3Detail: "Creates the record, syncs the data and runs the automated steps",
    node4: "Sales gets the result",
    node4Detail: "The right person picks it up at the right time, with full context",
  },

  collaborations: {
    eyebrow: "SELECTED COLLABORATIONS",
    heading: "Working with businesses ready to change.",
    note: "A selection of projects VietSolve has delivered.",
  },

  os: {
    eyebrow: "HOW WE BUILD",
    heading: "From a business problem to a system that runs.",
    deliverables: "Deliverables",
  },

  capabilities: {
    eyebrow: "WHAT WE BUILD",
    heading: "Strategy, creative and technology inside one system.",
    includes: "Includes",
    discuss: "Discuss this capability",
    intro:
      "Businesses aren't short on tools. The problem is that marketing, sales, data and operations still run separately.",
    gap1: "Slow lead response",
    gap2: "Disconnected data",
    gap3: "Manual processes",
    explore: "See capability detail",
    viewAll: "View all capabilities",
  },

  workflow: {
    eyebrow: "LIVE SYSTEM DEMO",
    heading: "See how an AI workflow actually runs.",
    description:
      "A customer request can travel from a message to data, action and outcome without a manual step at every stage.",
    tabRetail: "Retail",
    tabService: "Services",
    tabB2B: "B2B",
    run: "Run workflow",
    replay: "Run again",
    running: "Processing",
    done: "Complete",
    idle: "Ready",
    logTitle: "System log",
    outputTitle: "Output",
    demoNote: "This is an interface simulation illustrating the processing flow.",
    retail: {
      s1: "Customer sends a product photo",
      s2: "AI identifies the intent",
      s3: "Checks product information",
      s4: "Recommends suitable options",
      s5: "Creates the order",
      s6: "Updates the CRM",
      s7: "Notifies the team",
      output: "The order was created and routed to the responsible team member.",
    },
    service: {
      s1: "Customer describes the issue",
      s2: "AI classifies the request",
      s3: "Collects the missing details",
      s4: "Books the appointment",
      s5: "Creates the customer record",
      s6: "Sends a reminder",
      s7: "Compiles the report",
      output: "The appointment is confirmed and the customer record is saved.",
    },
    b2b: {
      s1: "Company submits a request",
      s2: "AI reads the documents",
      s3: "Analyses the requirement",
      s4: "Produces a summary",
      s5: "Proposes a solution",
      s6: "Hands off to business development",
      s7: "Tracks the status",
      output: "The summary and proposal are ready for the team.",
    },
  },

  work: {
    eyebrow: "SELECTED WORK",
    heading: "Solutions designed for a specific problem.",
    subheading:
      "Projects where strategy, creative and technology were connected to solve one concrete problem.",
    viewProject: "View project",
    viewAll: "View all projects",
    delivered: "Delivered",
    industry: "Industry",
    year: "Year",
    filterAll: "All",
    filterAiSystems: "AI Systems",
    filterDigitalProducts: "Digital Products",
    filterBrandGrowth: "Brand & Growth",
    filterMedia: "Media",
  },

  why: {
    eyebrow: "WHY VIETSOLVE",
    heading: "We don't just bring ideas. We build the system that makes them work.",
    p1Title: "Business-first",
    p1Body: "Every solution starts from the business problem, not from a tool.",
    p2Title: "Strategy and execution",
    p2Body: "Strategy, creative, development and integration happen inside one system.",
    p3Title: "AI with purpose",
    p3Body:
      "We apply AI only where it speeds something up, lowers a cost or creates a better experience.",
    p4Title: "Built for Vietnamese businesses",
    p4Body:
      "Solutions designed around the resources, customer behaviour and operating conditions of Vietnamese companies.",
  },

  insights: {
    eyebrow: "INSIGHTS",
    heading: "Perspectives on AI, growth and creative work.",
    pageHeading: "Ideas, systems and perspectives to help businesses apply AI better.",
    readMore: "Read more",
    readingTime: "min read",
    catAiSystems: "AI Systems",
    catGrowth: "Growth",
    catCreativeTechnology: "Creative Technology",
    catFoundersView: "Founder's View",
  },

  finalCta: {
    eyebrow: "START A PROJECT",
    heading: "Got a problem worth solving?",
    body: "Let's turn it into a system you can operate, measure and keep growing.",
    primary: "Talk to VietSolve",
    secondary: "Send a project brief",
  },

  footer: {
    tagline: "AI-powered Growth Agency for Vietnamese businesses.",
    capabilities: "Capabilities",
    company: "Company",
    connect: "Connect",
    contactCta: "Start a project",
    copyright: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
  },

  servicesPage: {
    eyebrow: "CAPABILITIES",
    heading: "Creative, strategy and technology inside one team.",
    description:
      "VietSolve takes businesses from defining the problem to building the brand, the digital platform, and the AI and automation behind it.",
    overviewTitle: "Four core capabilities",
    engagementEyebrow: "ENGAGEMENT MODELS",
    engagementHeading: "How we can work together.",
    engagementNote: "Scope and cost are defined once we understand the problem properly.",
    bestFor: "Best for",
    typicalScope: "Typical scope",
    engagementCta: "Discuss scope",
    processEyebrow: "PROCESS",
    processHeading: "Five steps from the business problem to a system that runs.",
    projectEyebrow: "SELECTED PROJECT",
  },

  aiSystemsPage: {
    eyebrow: "AI SYSTEMS",
    heading: "AI creates value once it's connected to the process.",
    description:
      "VietSolve designs AI agents and automation around how the business actually runs — sales, customer care, operations and reporting.",
    s1Title: "AI Agent",
    s1Body:
      "Agents designed for a specific role: sales advice, customer care, internal request handling. Each one understands your business context and brand voice.",
    s2Title: "Workflow Automation",
    s2Body:
      "Automating repetitive chains of work across marketing, sales and operations — from intake through status updates to reporting.",
    s3Title: "CRM & Data Integration",
    s3Body:
      "Connecting customer data across the website, sales channels, CRM and analytics so every team works from one source of truth.",
    s4Title: "AI Website",
    s4Body:
      "A website that personalises content, advises automatically and pushes data straight into the business process.",
    useCasesTitle: "Real use cases",
    useCase1: "Responding to customers outside working hours",
    useCase2: "Classifying and routing requests to the right team",
    useCase3: "Generating quotes and documents from existing data",
    useCase4: "Syncing orders between sales channels and operations",
    useCase5: "Compiling recurring reports automatically",
    useCase6: "Helping the team find internal information",
    controlTitle: "People stay in control",
    controlBody:
      "AI is deployed with clear limits. The system supports the team; it does not replace human judgement.",
    control1: "AI is granted permissions only within a defined scope of work",
    control2: "Critical steps require human approval",
    control3: "Every action is logged and auditable",
    control4: "Workflows can be edited as the process changes",
    processTitle: "Implementation process",
  },

  aboutPage: {
    eyebrow: "ABOUT VIETSOLVE",
    heading: "Solving business problems with creativity, intelligence and innovation.",
    description:
      "VietSolve was built on the belief that technology only matters when it helps a business run better, a brand grow stronger and people work more effectively.",
    storyEyebrow: "OUR STORY",
    storyHeading: "An agency built for what comes next.",
    storyBody:
      "VietSolve is a creative and technology agency built to work alongside Vietnamese businesses as they develop their brand, their products and their growth systems.",
    lacEyebrow: "OUR SYMBOL",
    lacHeading: "A Vietnamese symbol for the digital era.",
    lacBody:
      "The Lạc bird represents creativity, the drive to move forward, and Vietnamese identity. At VietSolve, that symbol becomes the flows connecting strategy, people, data and technology.",
    valuesEyebrow: "OUR VALUES",
    valuesHeading: "Creative · Intelligence · Innovation",
    v1Title: "Creative",
    v1En: "Sáng tạo",
    v1Body: "Turning strategy into a brand, content and experiences that stand apart.",
    v2Title: "Intelligence",
    v2En: "Trí tuệ",
    v2Body: "Combining data, insight, strategic thinking and AI to make better decisions.",
    v3Title: "Innovation",
    v3En: "Đổi mới",
    v3Body:
      "Building websites, digital products, AI agents and automation that deliver real results.",
    howEyebrow: "HOW WE WORK",
    howHeading: "One process, five steps, a result that runs.",
  },

  contactPage: {
    eyebrow: "START A PROJECT",
    heading: "Tell us what you're building.",
    description:
      "Describe the problem, the goal or the idea. VietSolve will get in touch to work out the right way forward.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    addressLabel: "Address",
    formTitle: "Project details",
    fName: "Full name",
    fEmail: "Email",
    fPhone: "Phone number",
    fCompany: "Company",
    fProblem: "What problem are you trying to solve?",
    fSolution: "Type of solution",
    fTimeline: "Expected timeline",
    fBudget: "Expected budget",
    fDetails: "Tell us more",
    fConsent: "I agree to be contacted by VietSolve about this request.",
    optional: "optional",
    select: "Choose an option",
    submit: "Send request",
    submitting: "Sending...",
    successTitle: "We've got your request.",
    successBody: "VietSolve will reply to the email address you provided.",
    errorRequired: "Please fill this in.",
    errorEmail: "That email doesn't look right.",
    errorConsent: "Please agree so we can contact you.",
    errorSubmit: "Couldn't send. You can email us directly instead.",
    solAiAgent: "AI Agent & Automation",
    solWebsite: "Website & Digital Product",
    solBranding: "Branding & Growth",
    solMedia: "Media & Creative",
    solUndecided: "Not sure yet",
    timeAsap: "As soon as possible",
    time1to3: "Within 1–3 months",
    time3to6: "Within 3–6 months",
    timePlanning: "Still planning",
    budgetU50: "Under 50M VND",
    budget50to100: "50 – 100M VND",
    budget100to300: "100 – 300M VND",
    budgetO300: "Over 300M VND",
    budgetAdvise: "I'd like VietSolve to advise",
  },

  readiness: {
    eyebrow: "AI READINESS",
    heading: "How ready is your business for AI?",
    description: "Five short questions to find the right starting point. No personal data collected.",
    q1: "Are you using a CRM?",
    q2: "Is customer data kept in one place?",
    q3: "Are there tasks repeating every day?",
    q4: "Do sales respond to customers within a measurable time?",
    q5: "Is someone responsible for your systems?",
    yes: "Yes",
    no: "Not yet",
    result: "Result",
    restart: "Start again",
    exploringTitle: "Exploring",
    exploringBody:
      "You're at an early stage. The right next step is defining the problem and organising your data before deploying AI.",
    readyTitle: "Ready",
    readyBody:
      "The foundations are there. The right next step is picking one specific process to automate and measure.",
    scalableTitle: "Scalable",
    scalableBody:
      "You have a strong base. The right next step is extending AI across more processes and integrating deeper into existing systems.",
    discuss: "Discuss this result",
    start: "Start the assessment",
    hide: "Collapse",
  },

  common: {
    loading: "Loading",
    close: "Close",
    back: "Back",
    next: "Next",
  },
}

const translations: Record<Lang, Translations> = { vi, en }

/* ================================================================
 *  PROVIDER
 * ================================================================ */

type LanguageContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = "lang"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("vi")

  // Restore the saved preference after mount so the static HTML stays stable
  // (avoids a hydration mismatch on the pre-rendered Vietnamese markup).
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved === "vi" || saved === "en") setLangState(saved)
    } catch {
      /* storage unavailable — keep the default */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      window.localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* non-fatal */
    }
  }

  const toggle = () => setLang(lang === "vi" ? "en" : "vi")

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>")
  return ctx
}
