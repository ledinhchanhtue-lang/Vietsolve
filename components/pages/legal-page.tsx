"use client"

import { useLanguage } from "@/lib/i18n"
import { PageHero } from "@/components/kit/page-hero"
import { Container, Section } from "@/components/kit/section"
import { siteConfig, readVerified } from "@/lib/site-config"

/**
 * Legal pages.
 *
 * The previous footer linked Privacy / Terms / Cookie to href="#", and the
 * contact page linked to /privacy, which returned 404.
 *
 * The content below describes what this site ACTUALLY does — the contact form
 * fields, the language preference in localStorage, and the absence of analytics
 * or advertising cookies. It is accurate to the codebase as built.
 *
 * ⚠️ TO THE SITE OWNER: have these reviewed by legal counsel before relying on
 * them, and update them whenever you add analytics, a CRM integration or any
 * third-party script.
 */

type Block = { heading: string; body: string[] }

export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const { t, lang } = useLanguage()
  const email = readVerified(siteConfig.contact.email)
  const contactLine =
    lang === "vi"
      ? email
        ? `Mọi câu hỏi liên quan đến nội dung này, vui lòng liên hệ ${email}.`
        : "Mọi câu hỏi liên quan đến nội dung này, vui lòng liên hệ qua biểu mẫu trên trang Liên hệ."
      : email
        ? `For any question about this page, please contact ${email}.`
        : "For any question about this page, please use the contact form."

  const content: Record<"privacy" | "terms", { title: string; blocks: Block[] }> =
    lang === "vi"
      ? {
          privacy: {
            title: t.footer.privacy,
            blocks: [
              {
                heading: "Thông tin chúng tôi thu thập",
                body: [
                  "Khi bạn gửi yêu cầu qua biểu mẫu liên hệ, chúng tôi nhận được những thông tin bạn chủ động cung cấp: họ tên, email, số điện thoại, tên doanh nghiệp, mô tả nhu cầu, loại giải pháp quan tâm, thời gian và ngân sách dự kiến.",
                  "Website không yêu cầu tạo tài khoản và không thu thập thông tin thanh toán.",
                ],
              },
              {
                heading: "Cách chúng tôi sử dụng thông tin",
                body: [
                  "Thông tin bạn gửi chỉ được sử dụng để phản hồi yêu cầu của bạn và trao đổi về phạm vi hợp tác. Chúng tôi không bán, không cho thuê và không chia sẻ thông tin của bạn cho bên thứ ba vì mục đích tiếp thị.",
                ],
              },
              {
                heading: "Cookie và lưu trữ cục bộ",
                body: [
                  "Website lưu lựa chọn ngôn ngữ (Tiếng Việt hoặc English) trong localStorage của trình duyệt để ghi nhớ tùy chọn của bạn giữa các lần truy cập. Đây là dữ liệu kỹ thuật, không chứa thông tin định danh cá nhân.",
                  "Website hiện không sử dụng cookie quảng cáo hoặc cookie theo dõi hành vi của bên thứ ba.",
                ],
              },
              {
                heading: "Lưu trữ và bảo mật",
                body: [
                  "Yêu cầu liên hệ được lưu trong hệ thống email doanh nghiệp của VietSolve. Chúng tôi chỉ giữ thông tin trong thời gian cần thiết để xử lý và theo dõi trao đổi với bạn.",
                ],
              },
              {
                heading: "Quyền của bạn",
                body: [
                  "Bạn có quyền yêu cầu xem, chỉnh sửa hoặc xóa thông tin bạn đã gửi cho chúng tôi.",
                  contactLine,
                ],
              },
            ],
          },
          terms: {
            title: t.footer.terms,
            blocks: [
              {
                heading: "Phạm vi",
                body: [
                  "Nội dung trên website này được cung cấp nhằm giới thiệu năng lực và dịch vụ của VietSolve. Việc sử dụng website đồng nghĩa với việc bạn đồng ý với các điều khoản dưới đây.",
                ],
              },
              {
                heading: "Nội dung và quyền sở hữu trí tuệ",
                body: [
                  "Toàn bộ nội dung, hình ảnh, thiết kế giao diện và biểu tượng thương hiệu trên website thuộc quyền sở hữu của VietSolve, trừ khi được ghi chú khác. Vui lòng không sao chép hoặc sử dụng lại cho mục đích thương mại khi chưa có sự đồng ý bằng văn bản.",
                ],
              },
              {
                heading: "Tính chính xác của thông tin",
                body: [
                  "Chúng tôi cố gắng giữ thông tin trên website chính xác và cập nhật. Các mô tả về năng lực và quy trình mang tính giới thiệu; phạm vi công việc, thời gian và chi phí cụ thể của từng dự án được xác định trong hợp đồng riêng.",
                  "Các mô phỏng workflow trên website là minh họa giao diện, không phải hệ thống đang vận hành thực tế của khách hàng.",
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
        }
      : {
          privacy: {
            title: t.footer.privacy,
            blocks: [
              {
                heading: "Information we collect",
                body: [
                  "When you submit the contact form we receive the information you choose to provide: name, email, phone number, company, a description of your problem, the type of solution you're interested in, and your expected timeline and budget.",
                  "The site does not require an account and does not collect payment information.",
                ],
              },
              {
                heading: "How we use it",
                body: [
                  "We use what you send only to respond to your enquiry and discuss a possible scope of work. We do not sell, rent or share your information with third parties for marketing.",
                ],
              },
              {
                heading: "Cookies and local storage",
                body: [
                  "The site stores your language choice (Vietnamese or English) in your browser's localStorage so the preference persists between visits. This is technical data and contains nothing personally identifying.",
                  "The site currently uses no advertising cookies and no third-party behavioural tracking.",
                ],
              },
              {
                heading: "Storage and security",
                body: [
                  "Enquiries are held in VietSolve's business email system. We keep them only as long as needed to handle and follow up on your request.",
                ],
              },
              {
                heading: "Your rights",
                body: [
                  "You may ask to see, correct or delete the information you have sent us.",
                  contactLine,
                ],
              },
            ],
          },
          terms: {
            title: t.footer.terms,
            blocks: [
              {
                heading: "Scope",
                body: [
                  "The content on this site is provided to introduce VietSolve's capabilities and services. By using the site you agree to the terms below.",
                ],
              },
              {
                heading: "Content and intellectual property",
                body: [
                  "All content, imagery, interface design and brand marks on this site are owned by VietSolve unless stated otherwise. Please do not copy or reuse them commercially without written permission.",
                ],
              },
              {
                heading: "Accuracy",
                body: [
                  "We work to keep the site accurate and current. Descriptions of capabilities and process are introductory; the specific scope, timeline and cost of any project are set out in a separate agreement.",
                  "The workflow simulations on this site are interface illustrations, not live customer systems.",
                ],
              },
              {
                heading: "External links",
                body: [
                  "The site may link to external pages. VietSolve is not responsible for their content or policies.",
                ],
              },
              {
                heading: "Contact",
                body: [contactLine],
              },
            ],
          },
        }

  const page = content[kind]

  return (
    <>
      <PageHero eyebrow="LEGAL" heading={page.title} />

      <Section surface="dark" className="pt-0">
        <Container>
          <div className="prose-column space-y-12">
            {page.blocks.map((block) => (
              <section key={block.heading}>
                <h2 className="font-display text-xl font-medium text-ivory lg:text-2xl">
                  {block.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {block.body.map((p) => (
                    <p key={p} className="text-[15px] leading-relaxed text-vs-steel text-pretty">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
