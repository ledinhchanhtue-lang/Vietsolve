import Link from "next/link"
import { Container } from "@/components/kit/section"

export default function NotFound() {
  return (
    <section className="surface-dark flex min-h-[70vh] items-center pt-24">
      <Container>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-vs-red">404</p>
        <h1 className="mt-6 max-w-2xl font-display text-h2 font-semibold text-ivory">
          Trang này không tồn tại.
        </h1>
        <p className="mt-5 max-w-md text-body-lg text-vs-steel">
          This page doesn&apos;t exist. Có thể đường dẫn đã thay đổi.
        </p>
        <div className="mt-9 flex flex-wrap gap-6">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center rounded-full bg-vs-red px-6 text-[15px] font-medium text-white transition-colors duration-hover hover:bg-[#c81727]"
          >
            Về trang chủ
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center rounded-full border border-white/20 px-6 text-[15px] text-ivory transition-colors duration-hover hover:bg-white/5"
          >
            Liên hệ
          </Link>
        </div>
      </Container>
    </section>
  )
}
