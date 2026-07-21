"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { siteConfig, readVerified } from "@/lib/site-config"
import { cn } from "@/lib/utils"

/* Section heading → stable anchor id */
const slug = (h: string) =>
  h
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

/**
 * Privacy / Terms — white theme, matching the rest of the site.
 *
 * These routes exist because the footer previously linked Privacy, Terms and
 * Cookie Policy to href="#", and the contact page linked to /privacy, which
 * 404'd.
 *
 * The wording describes what this site actually does: the contact-form fields,
 * the language preference in localStorage, and the absence of analytics or
 * advertising cookies.
 *
 * ⚠️ TO THE SITE OWNER: have these reviewed by legal counsel before relying on
 * them, and update them whenever you add analytics, a CRM integration or any
 * third-party script.
 */
export default function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const email = readVerified(siteConfig.contact.email)
  const contactLine = email
    ? `Mọi câu hỏi liên quan đến nội dung này, vui lòng liên hệ ${email}.`
    : "Mọi câu hỏi liên quan đến nội dung này, vui lòng dùng biểu mẫu ở trang Liên hệ."

  const content = {
    privacy: {
      title: "Chính sách bảo mật",
      intro:
        "VietSolve tôn trọng quyền riêng tư của bạn. Trang này mô tả những thông tin chúng tôi nhận được qua website và cách chúng tôi sử dụng.",
      blocks: [
        {
          heading: "Thông tin chúng tôi thu thập",
          body: [
            "Khi bạn gửi yêu cầu qua biểu mẫu liên hệ, chúng tôi nhận được những thông tin bạn chủ động cung cấp: họ tên, email, số điện thoại, tên doanh nghiệp, lĩnh vực quan tâm và nội dung tin nhắn.",
            "Website không yêu cầu tạo tài khoản và không thu thập thông tin thanh toán.",
          ],
        },
        {
          heading: "Cách chúng tôi sử dụng thông tin",
          body: [
            "Thông tin bạn gửi chỉ được dùng để phản hồi yêu cầu và trao đổi về khả năng hợp tác. Chúng tôi không bán, không cho thuê và không chia sẻ thông tin của bạn cho bên thứ ba vì mục đích tiếp thị.",
          ],
        },
        {
          heading: "Cookie và lưu trữ cục bộ",
          body: [
            "Website lưu lựa chọn ngôn ngữ (Tiếng Việt hoặc English) trong localStorage của trình duyệt để ghi nhớ tùy chọn giữa các lần truy cập. Đây là dữ liệu kỹ thuật, không chứa thông tin định danh cá nhân.",
            "Website hiện không sử dụng cookie quảng cáo hoặc cookie theo dõi hành vi của bên thứ ba.",
          ],
        },
        {
          heading: "Lưu trữ và bảo mật",
          body: [
            "Yêu cầu liên hệ được lưu trong hệ thống email doanh nghiệp của VietSolve và chỉ được giữ trong thời gian cần thiết để xử lý.",
          ],
        },
        {
          heading: "Quyền của bạn",
          body: [
            "Bạn có quyền yêu cầu xem, chỉnh sửa hoặc xóa thông tin đã gửi cho chúng tôi.",
            contactLine,
          ],
        },
      ],
    },
    terms: {
      title: "Điều khoản sử dụng",
      intro:
        "Nội dung trên website này được cung cấp nhằm giới thiệu năng lực và dịch vụ của VietSolve. Việc sử dụng website đồng nghĩa với việc bạn đồng ý với các điều khoản dưới đây.",
      blocks: [
        {
          heading: "Quyền sở hữu trí tuệ",
          body: [
            "Toàn bộ nội dung, hình ảnh, thiết kế giao diện và biểu tượng thương hiệu trên website thuộc quyền sở hữu của VietSolve, trừ khi được ghi chú khác. Vui lòng không sao chép hoặc sử dụng lại cho mục đích thương mại khi chưa có sự đồng ý bằng văn bản.",
          ],
        },
        {
          heading: "Tính chính xác của thông tin",
          body: [
            "Chúng tôi cố gắng giữ thông tin trên website chính xác và cập nhật. Các mô tả về năng lực và quy trình mang tính giới thiệu; phạm vi công việc, thời gian và chi phí cụ thể của từng dự án được xác định trong hợp đồng riêng.",
            "Hình ảnh minh họa và giao diện demo trên website nhằm mục đích trình bày, không phải kết quả của một khách hàng cụ thể.",
          ],
        },
        {
          heading: "Liên kết bên ngoài",
          body: [
            "Website có thể chứa liên kết đến các trang bên ngoài. VietSolve không chịu trách nhiệm về nội dung hoặc chính sách của những trang đó.",
          ],
        },
        {
          heading: "Liên hệ",
          body: [contactLine],
        },
      ],
    },
  }[kind]

  /* Reading progress (thin LED line under the header) + active TOC section */
  const [progress, setProgress] = useState(0)
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    /* One scroll handler drives both: progress width, and the active section
       (the last heading above the 35%-viewport line — a band-style observer
       misses headings entirely when body text fills the band). */
    const headings = [...document.querySelectorAll<HTMLElement>("#legal-body h2[id]")]
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)

      const line = window.innerHeight * 0.35
      let current = headings[0]?.id ?? ""
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= line) current = h.id
        else break
      }
      setActiveId(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
    // Re-run when switching privacy ↔ terms
  }, [kind])

  return (
    <main id="main" className="bg-white">
      {/* Reading progress — a functional LED line, not decoration */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[70] h-0.5 bg-transparent"
      >
        <div
          className="h-full bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_6px_rgba(220,38,38,0.5)] transition-[width] duration-150 ease-out"
          style={{ width: `${(progress * 100).toFixed(1)}%` }}
        />
      </div>

      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-gradient-to-br from-white via-red-50/30 to-gray-50/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">{content.title}</h1>
          <p className="mt-5 max-w-3xl text-lg text-gray-600 leading-relaxed">{content.intro}</p>
          {/* These documents were written for this site in July 2026 */}
          <p className="mt-5 text-sm font-medium text-gray-400">Cập nhật: 07/2026</p>
        </div>
      </section>

      <section id="legal-body" className="py-14 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
            {/* Sticky TOC — desktop; on mobile the sections are short enough
                that a dropdown would cost more than it saves */}
            <nav aria-label="Mục lục" className="hidden lg:block">
              <div className="sticky top-28">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-900">Mục lục</p>
                <ul className="mt-4 space-y-1 border-l border-gray-200">
                  {content.blocks.map((block) => {
                    const id = slug(block.heading)
                    const active = activeId === id
                    return (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          aria-current={active ? "true" : undefined}
                          className={cn(
                            "-ml-px flex min-h-11 items-center border-l-2 pl-4 text-sm transition-colors",
                            active
                              ? "border-red-600 font-semibold text-red-700"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900",
                          )}
                        >
                          {block.heading}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </nav>

            <div className="max-w-3xl space-y-11">
              {content.blocks.map((block) => {
                const id = slug(block.heading)
                return (
                  <div key={block.heading}>
                    <h2 id={id} className="scroll-mt-28 text-xl lg:text-2xl font-bold text-gray-900">
                      {block.heading}
                    </h2>
                    <div className="mt-3 space-y-3">
                      {block.body.map((para) => (
                        <p key={para} className="text-gray-600 leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                )
              })}

              <div className="pt-2">
                <a
                  href="#main"
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 rounded-sm"
                >
                  <ArrowUp className="h-4 w-4" aria-hidden="true" />
                  Về đầu trang
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
