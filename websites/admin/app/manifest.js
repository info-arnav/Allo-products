export default function manifest() {
  return {
    name: "Allo Admin - Admin Portal",
    short_name: "Allo Admin",
    description: "Internal administration portal for Allo employees",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
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
  };
}
