type Props = { html: string };

export default function HtmlContent({ html }: Props) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
