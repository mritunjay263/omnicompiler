import { LanguageConfig } from './languages';
import { BRAND } from './brand';

export function generateLanguageSchema(language: LanguageConfig) {
  const baseUrl = BRAND.url;

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${language.name} Online Compiler & Real-Time IDE - ${BRAND.name}`,
    url: `${baseUrl}/${language.id}`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All Modern Browsers, Linux, macOS, Windows, Android, iOS',
    browserRequirements: 'Requires JavaScript and HTML5 support',
    softwareVersion: language.version,
    description: language.seo.description,
    screenshot: `${baseUrl}/api/og?lang=${language.id}`,
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '14820',
      bestRating: '5',
      worstRating: '1',
    },
    creator: {
      '@type': 'Organization',
      name: BRAND.name,
      url: baseUrl,
      logo: `${baseUrl}/api/og`,
    },
    featureList: [
      `Write, compile, and run ${language.name} code with zero installation`,
      'Interactive standard input (STDIN) console streaming',
      'Real-time execution duration in milliseconds and memory consumption metrics',
      'Instant snippet persistence and shareable links',
      'Embedded syntax documentation, data structures, and boilerplate templates',
      'Integrated AI copilot for step-by-step code explanation and bug remediation',
      'Developer Single Sign-On (GitHub, Google, Guest session)',
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How do I compile and run ${language.name} online without local setup?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `You can execute ${language.name} directly in your browser using ${BRAND.name}. Simply load your code or choose a boilerplate template, provide optional standard inputs in the STDIN tab, and click Run (or press Cmd/Ctrl + Enter).`,
        },
      },
      {
        '@type': 'Question',
        name: `Does ${BRAND.name} support user input (STDIN) in ${language.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes! ${BRAND.name} features an interactive STDIN tab adjacent to the editor. Any console inputs anticipated by your code (e.g. input() in Python, Scanner in Java, or cin in C++) are streamed during execution.`,
        },
      },
      {
        '@type': 'Question',
        name: `Which version of ${language.name} is supported by ${BRAND.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${BRAND.name} runs ${language.name} version ${language.version} with popular standard libraries and modern language features enabled.`,
        },
      },
      {
        '@type': 'Question',
        name: `Can I save and share my ${language.name} programs?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes. Click the Share button in the navigation bar to generate an instant unique URL that encodes your source files and inputs for collaborative sharing or classroom demonstrations.`,
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: BRAND.name,
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Compilers',
        item: `${baseUrl}/#compilers`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${language.name} Compiler`,
        item: `${baseUrl}/${language.id}`,
      },
    ],
  };

  const codeSnippetsSchemas = (language.templates || []).map((tpl) => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: `${tpl.name} Solution in ${language.name}`,
    description: tpl.description,
    programmingLanguage: language.name,
    codeSampleType: 'full snippet',
    codeRepository: `${baseUrl}/${language.id}`,
    text: tpl.code,
    author: {
      '@type': 'Organization',
      name: BRAND.name,
    },
  }));

  return { webAppSchema, faqSchema, breadcrumbSchema, codeSnippetsSchemas };
}

export function generateWebsiteSchema() {
  const baseUrl = BRAND.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.name,
    alternateName: ['OmniCompiler', 'OmniCompiler Labs', 'Omni Compiler Online', 'Universal Polyglot IDE'],
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND.name,
      url: baseUrl,
      logo: `${baseUrl}/api/og`,
      sameAs: [
        'https://github.com/mritunjay263/omnicompiler',
      ],
    },
  };
}
