interface HighlightMatchProps {
  text: string;
  searchValue: string;
}

/**
 * Highlights the matching portion of text by making it bold.
 * Case-insensitive matching.
 */
export function HighlightMatch({
  text,
  searchValue,
}: HighlightMatchProps): JSX.Element {
  if (!searchValue) {
    return <span>{text}</span>;
  }

  const lowerText = text.toLowerCase();
  const lowerSearch = searchValue.toLowerCase();
  const index = lowerText.indexOf(lowerSearch);

  if (index === -1) {
    return <span>{text}</span>;
  }

  const before = text.slice(0, index);
  const match = text.slice(index, index + searchValue.length);
  const after = text.slice(index + searchValue.length);

  return (
    <span>
      {before}
      <strong>{match}</strong>
      {after}
    </span>
  );
}
