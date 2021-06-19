module.exports = {
  images: {
    domains: [`${process.env.NEXT_PUBLIC_STRAPI_API_URL}`],
    loader: "imgix",
    path: "",
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 64, 96, 128],
  },
}