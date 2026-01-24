/* 
 * JSON-LD Structured Data Component for SEO
 */

export function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Persona - Free CV Builder',
    description: 'Create a professional resume in minutes. Free, private, and no sign-up required. Build, preview, and print your CV instantly.',
    url: 'https://maat5.github.io',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Live preview',
      'Print to PDF',
      'No account needed',
      'Privacy-focused',
      'Free to use',
      'No sign-up required',
    ],
    screenshot: 'https://maat5.github.io/og-image.png',
    softwareVersion: '1.0',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '1',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
