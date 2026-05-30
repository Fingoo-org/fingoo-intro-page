/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/privacy",
        destination: "https://coherent-beak-abf.notion.site/FINGOO_-16a1d4287d748109a6d6c80db1a2156f",
        permanent: false,
      },
      {
        source: "/terms",
        destination: "https://coherent-beak-abf.notion.site/FINGOO_-24c1d4287d7480ce92b8dcd34318d892",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
