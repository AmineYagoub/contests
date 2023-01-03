import { useRouter } from 'next/router';
import DOMPurify from 'isomorphic-dompurify';
import { RefObject, useEffect, useRef } from 'react';
import { Tag } from 'antd';
import { MessageType } from '@/graphql/graphql';

const getTagContent = (type: MessageType) => {
  const tag = {
    label: '',
    color: '',
  };
  switch (type) {
    case MessageType.Alert:
      tag.label = 'تنبيه';
      tag.color = 'gold';
      break;
    case MessageType.Announce:
      tag.label = 'إعلان';
      tag.color = 'red';
      break;
    case MessageType.Info:
      tag.label = 'إشعار';
      tag.color = 'blue';
      break;
    case MessageType.Report:
      tag.label = 'بلاغ';
      tag.color = 'red';
      break;
    case MessageType.Request:
      tag.label = 'طلب إشراف';
      tag.color = 'green';
      break;

    default:
      break;
  }
  return tag;
};

export default function HtmlContent({
  html,
  type,
}: {
  html: string;
  type: MessageType;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useLinkClickHandlers(ref);
  const tag = getTagContent(type);
  return (
    <>
      <Tag color={tag.color}>{tag.label}</Tag>
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
        ref={ref}
      />
    </>
  );
}

function useLinkClickHandlers(ref: RefObject<HTMLDivElement>) {
  const router = useRouter();

  useEffect(() => {
    if (!ref.current) return;

    const links = ref.current.querySelectorAll('a');
    links.forEach((link) => link.addEventListener('click', handleLinkClick));

    return () => {
      links.forEach((link) =>
        link.removeEventListener('click', handleLinkClick)
      );
    };

    function handleLinkClick(event: MouseEvent) {
      const link = event.currentTarget as HTMLAnchorElement;
      const href = link.getAttribute('href');
      const target = link.getAttribute('target');
      const url = new URL(href || '', window.location.origin);

      const isInternalLink = url.origin === window.location.origin;
      const isOpenedInSameWindow = !target || target === '_self';
      const isLeftButtonClick = event.button === 0;

      // E.g. Ctrl-clicking a link opens it in a new tab
      // so let the browser handle such clicks
      const isModifierKeyPressed =
        event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;

      if (
        isInternalLink &&
        isOpenedInSameWindow &&
        isLeftButtonClick &&
        !isModifierKeyPressed
      ) {
        event.preventDefault();
        router.push(url.pathname + url.search + url.hash);
      }
    }
  }, [router, ref]);
}
