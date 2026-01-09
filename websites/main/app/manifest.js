export default function manifest() {
  return {
    name: "Allo - Hyperlocal E-Commerce Platform",
    short_name: "Allo",
    description:
      "Order from local stores in Greater Kailash & Vasant Vihar. Fast delivery of groceries, essentials, and more.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#F6B215",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/logo-circle-128x128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/logo-circle.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    categories: ["shopping", "food", "lifestyle", "business"],
    shortcuts: [
      {
        name: "Order Now",
        short_name: "Order",
        description: "Order on WhatsApp",
        url: "https://wa.me/918800716273",
        icons: [{ src: "/logo-circle-128x128.png", sizes: "128x128" }],
      },
    ],
  };
}
