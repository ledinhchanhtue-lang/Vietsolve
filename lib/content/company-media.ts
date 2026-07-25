/**
 * Real VietSolve company photography — team and production shoots supplied by
 * the owner. These are genuine brand assets (the team in branded shirts, real
 * gear on real shoots), used to show VietSolve's own people and production
 * capability.
 *
 * NOT to be captioned as a specific client's result. They depict how VietSolve
 * works, not an outcome claim. Every alt text is descriptive and honest.
 *
 * Dimensions are the encoded WebP sizes (public/images/company), set on
 * next/image to avoid layout shift.
 */

export type CompanyPhoto = {
  src: string
  w: number
  h: number
  /** Descriptive alt — what the photo actually shows. */
  alt: string
  /** Short on-image caption. */
  caption: string
}

/** Production / on-set shoots — the Media & Creative evidence. */
export const productionPhotos: CompanyPhoto[] = [
  {
    src: "/images/company/prod-podcast2.webp",
    w: 832,
    h: 1248,
    alt: "Ê-kíp VietSolve quay một buổi podcast trong studio",
    caption: "Podcast studio",
  },
  {
    src: "/images/company/prod-tvc.webp",
    w: 1024,
    h: 1024,
    alt: "Ê-kíp VietSolve quay TVC ngoài trời với máy quay và ánh sáng",
    caption: "TVC ngoài trời",
  },
  {
    src: "/images/company/prod-cooking.webp",
    w: 900,
    h: 600,
    alt: "Ê-kíp VietSolve quay chương trình nấu ăn tại bối cảnh bếp",
    caption: "Sản xuất nội dung",
  },
  {
    src: "/images/company/prod-news.webp",
    w: 1200,
    h: 800,
    alt: "Ê-kíp VietSolve ghi hình chương trình trong phòng thu",
    caption: "Ghi hình studio",
  },
  {
    src: "/images/company/prod-product-food.webp",
    w: 1100,
    h: 734,
    alt: "Nhiếp ảnh gia VietSolve chụp sản phẩm ẩm thực với đèn studio",
    caption: "Chụp sản phẩm",
  },
  {
    src: "/images/company/prod-product-bag.webp",
    w: 1000,
    h: 1000,
    alt: "Buổi chụp sản phẩm túi xách trong studio ánh sáng của VietSolve",
    caption: "Chụp sản phẩm",
  },
  {
    src: "/images/company/bts-studio.webp",
    w: 832,
    h: 1248,
    alt: "Hậu trường quay dựng của VietSolve với ánh sáng studio",
    caption: "Hậu trường",
  },
  {
    src: "/images/company/prod-office-live.webp",
    w: 1000,
    h: 1000,
    alt: "Ê-kíp VietSolve ghi hình livestream tại văn phòng",
    caption: "Livestream",
  },
]

/** Team / workspace — credibility imagery for the About page. */
export const teamHero: CompanyPhoto = {
  src: "/images/company/team-hero.webp",
  w: 1024,
  h: 1024,
  alt: "Toàn thể đội ngũ VietSolve tại văn phòng",
  caption: "Đội ngũ VietSolve",
}

export const teamPhotos: CompanyPhoto[] = [
  {
    src: "/images/company/team-editor-company.webp",
    w: 1024,
    h: 1024,
    alt: "Đội ngũ VietSolve làm việc quanh bàn dựng phim tại văn phòng",
    caption: "Phối hợp sản xuất",
  },
  {
    src: "/images/company/cap-editor.webp",
    w: 1000,
    h: 1000,
    alt: "Đội editor VietSolve dựng video trên hệ thống nhiều màn hình",
    caption: "Đội Editor",
  },
  {
    src: "/images/company/cap-data.webp",
    w: 1000,
    h: 1000,
    alt: "Đội kỹ thuật và dữ liệu VietSolve làm việc tại bàn nhiều màn hình",
    caption: "Đội kỹ thuật & dữ liệu",
  },
]
