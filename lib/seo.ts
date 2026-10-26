import { LanguageConfig } from './languages';

export function generateLanguageSchema(language: LanguageConfig) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://onecompiler.com';

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${language.name} Online Compiler & Interpreter`,
    url: `${baseUrl}/${language.id}`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    description: language.seo.description,
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
    featureList: [
      `Write, compile, and run ${language.name} online with zero setup`,
      'Standard input (STDIN) support for interactive programs',
      'Instant real-time execution with CPU time and memory metrics',
      'Download code and share snippets with custom URLs',
      'Interactive syntax help, tutorials, and boilerplate templates',
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How do I run ${language.name} code online without installation?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `You can write, compile, and run ${language.name} programs directly in your browser using OneCompiler. Simply select your template, write your code, provide optional STDIN inputs, and click the green 'Run' button.`,
        },
      },
      {
        '@type': 'Question',
        name: `Can I provide standard inputs (stdin) to ${language.name} programs?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes! OneCompiler includes a dedicated STDIN tab right next to the code editor. Any interactive inputs expected by your program will be read directly from this input area.`,
        },
      },
      {
        '@type': 'Question',
        name: `What version of ${language.name} is supported?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `OneCompiler supports ${language.name} version ${language.version} with popular standard libraries and modern language features enabled.`,
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
        name: 'Home',
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
        name: language.name,
        item: `${baseUrl}/${language.id}`,
      },
    ],
  };

  return { webAppSchema, faqSchema, breadcrumbSchema };
}
