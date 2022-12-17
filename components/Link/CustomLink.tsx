import Link from 'next/link';

interface Props {
  className?: string;
  label: string;
  url: string;
  [x: string]: any;
}

const CustomLink = ({ className, label, url, ...rest }: Props) => {
  return (
    <>
      <Link href={url} className="link__default">
        {label}
      </Link>
    </>
  );
};

export default CustomLink;
