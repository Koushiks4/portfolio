import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Koushik Sathish — Senior Technical Architect',
  description:
    'Senior Technical Architect at Confluent specializing in Apache Kafka, Apache Flink, real-time data streaming, and cloud-native systems. Based in Bengaluru, India.',
  keywords: [
    'Koushik Sathish',
    'Apache Kafka',
    'Apache Flink',
    'Data Streaming',
    'Senior Technical Architect',
    'Confluent',
    'Cloud Native',
    'Software Engineer',
    'Bengaluru',
  ],
  authors: [{ name: 'Koushik Sathish' }],
  openGraph: {
    title: 'Koushik Sathish — Senior Technical Architect',
    description:
      'Real-time data streaming expert. Apache Kafka & Flink specialist. Senior Technical Architect at Confluent.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
